# ==============================================================================
# SECURITY MODULE: Security Groups & IAM Instance Profiles
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. Application Load Balancer Security Group
# ------------------------------------------------------------------------------
resource "aws_security_group" "alb_sg" {
  name        = "${var.project_name}-alb-sg"
  description = "Controls public HTTP/HTTPS access to Application Load Balancer"
  vpc_id      = var.vpc_id

  ingress {
    description = "Public HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Public HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-alb-sg"
  }
}

# ------------------------------------------------------------------------------
# 2. Dedicated Backend Instance Security Group
# ------------------------------------------------------------------------------
resource "aws_security_group" "backend_sg" {
  name        = "${var.project_name}-backend-sg"
  description = "Controls access to single EC2 Backend Instance"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH from trusted IP / admin"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_ssh_ip]
  }

  ingress {
    description     = "Port 5000 HTTP from ALB"
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  ingress {
    description = "Port 5000 Direct HTTP for API testing / Vercel"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-backend-sg"
  }
}

# ------------------------------------------------------------------------------
# 2. Bastion Host Security Group
# ------------------------------------------------------------------------------
resource "aws_security_group" "bastion_sg" {
  name        = "${var.project_name}-bastion-sg"
  description = "Restricted administration access to Bastion Host"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH from trusted IP"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_ssh_ip]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-bastion-sg"
  }
}

# ------------------------------------------------------------------------------
# 3. Kubernetes Control-Plane Security Group
# ------------------------------------------------------------------------------
resource "aws_security_group" "k8s_control_sg" {
  name        = "${var.project_name}-k8s-control-sg"
  description = "Security group for Kubernetes Control-Plane node"
  vpc_id      = var.vpc_id

  ingress {
    description     = "SSH from Bastion"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.bastion_sg.id]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-k8s-control-sg"
  }
}

# ------------------------------------------------------------------------------
# 4. Kubernetes Worker Node Security Group
# ------------------------------------------------------------------------------
resource "aws_security_group" "k8s_worker_sg" {
  name        = "${var.project_name}-k8s-worker-sg"
  description = "Security group for Kubernetes Worker node"
  vpc_id      = var.vpc_id

  ingress {
    description     = "SSH from Bastion"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.bastion_sg.id]
  }

  ingress {
    description     = "ALB Ingress NodePort HTTP"
    from_port       = 30080
    to_port         = 30080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  ingress {
    description     = "ALB Ingress NodePort HTTPS"
    from_port       = 30443
    to_port         = 30443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-k8s-worker-sg"
  }
}

# ------------------------------------------------------------------------------
# Inter-node Kubernetes & Cilium Rules (Separate rules to avoid circular refs)
# ------------------------------------------------------------------------------
resource "aws_security_group_rule" "control_plane_apiserver_worker" {
  type                     = "ingress"
  description              = "Kubernetes API Server from Worker"
  from_port                = 6443
  to_port                  = 6443
  protocol                 = "tcp"
  security_group_id        = aws_security_group.k8s_control_sg.id
  source_security_group_id = aws_security_group.k8s_worker_sg.id
}

resource "aws_security_group_rule" "control_plane_apiserver_bastion" {
  type                     = "ingress"
  description              = "Kubernetes API Server from Bastion"
  from_port                = 6443
  to_port                  = 6443
  protocol                 = "tcp"
  security_group_id        = aws_security_group.k8s_control_sg.id
  source_security_group_id = aws_security_group.bastion_sg.id
}

resource "aws_security_group_rule" "control_plane_etcd_self" {
  type              = "ingress"
  description       = "etcd internal sync"
  from_port         = 2379
  to_port           = 2380
  protocol          = "tcp"
  security_group_id = aws_security_group.k8s_control_sg.id
  self              = true
}

resource "aws_security_group_rule" "control_plane_kubelet_worker" {
  type                     = "ingress"
  description              = "Kubelet API from Worker"
  from_port                = 10250
  to_port                  = 10250
  protocol                 = "tcp"
  security_group_id        = aws_security_group.k8s_control_sg.id
  source_security_group_id = aws_security_group.k8s_worker_sg.id
}

resource "aws_security_group_rule" "worker_kubelet_control" {
  type                     = "ingress"
  description              = "Kubelet API from Control Plane"
  from_port                = 10250
  to_port                  = 10250
  protocol                 = "tcp"
  security_group_id        = aws_security_group.k8s_worker_sg.id
  source_security_group_id = aws_security_group.k8s_control_sg.id
}

# Cilium CNI eBPF / VXLAN Inter-Node Mesh
resource "aws_security_group_rule" "cilium_vxlan_control" {
  type                     = "ingress"
  description              = "Cilium VXLAN Overlay"
  from_port                = 8472
  to_port                  = 8472
  protocol                 = "udp"
  security_group_id        = aws_security_group.k8s_control_sg.id
  source_security_group_id = aws_security_group.k8s_worker_sg.id
}

resource "aws_security_group_rule" "cilium_vxlan_worker" {
  type                     = "ingress"
  description              = "Cilium VXLAN Overlay"
  from_port                = 8472
  to_port                  = 8472
  protocol                 = "udp"
  security_group_id        = aws_security_group.k8s_worker_sg.id
  source_security_group_id = aws_security_group.k8s_control_sg.id
}

resource "aws_security_group_rule" "cilium_health_control" {
  type                     = "ingress"
  description              = "Cilium Health Check"
  from_port                = 4240
  to_port                  = 4240
  protocol                 = "tcp"
  security_group_id        = aws_security_group.k8s_control_sg.id
  source_security_group_id = aws_security_group.k8s_worker_sg.id
}

resource "aws_security_group_rule" "cilium_health_worker" {
  type                     = "ingress"
  description              = "Cilium Health Check"
  from_port                = 4240
  to_port                  = 4240
  protocol                 = "tcp"
  security_group_id        = aws_security_group.k8s_worker_sg.id
  source_security_group_id = aws_security_group.k8s_control_sg.id
}

# ------------------------------------------------------------------------------
# 5. Amazon RDS MySQL Security Group
# ------------------------------------------------------------------------------
resource "aws_security_group" "rds_sg" {
  name        = "${var.project_name}-rds-sg"
  description = "Controls private database access to Amazon RDS MySQL"
  vpc_id      = var.vpc_id

  ingress {
    description     = "MySQL from Backend EC2 Instance"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.backend_sg.id]
  }

  ingress {
    description     = "MySQL from Kubernetes Worker"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.k8s_worker_sg.id]
  }

  ingress {
    description     = "MySQL from Bastion Host for migrations/admin"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.bastion_sg.id]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-rds-sg"
  }
}

# ------------------------------------------------------------------------------
# 6. IAM Role & Instance Profile for AWS Systems Manager (SSM)
# ------------------------------------------------------------------------------
resource "aws_iam_role" "ssm_role" {
  count = var.enable_iam_role ? 1 : 0
  name  = "${var.project_name}-ec2-ssm-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-ec2-ssm-role"
  }
}

resource "aws_iam_role_policy_attachment" "ssm_core" {
  count      = var.enable_iam_role ? 1 : 0
  role       = aws_iam_role.ssm_role[0].name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_profile" {
  count = var.enable_iam_role ? 1 : 0
  name  = "${var.project_name}-ec2-ssm-profile"
  role  = aws_iam_role.ssm_role[0].name
}

