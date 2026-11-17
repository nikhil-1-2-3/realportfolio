# ==============================================================================
# COMPUTE MODULE: Bastion Host (EIP), K8s Control Plane, K8s Worker
# ==============================================================================

# ------------------------------------------------------------------------------
# AMI Data Source: Ubuntu 22.04 LTS (Jammy Jellyfish) in ap-south-1
# ------------------------------------------------------------------------------
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# ------------------------------------------------------------------------------
# Automated SSH Key Pair & PEM File Generation
# ------------------------------------------------------------------------------
resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = "${var.project_name}-deploy-key"
  public_key = tls_private_key.ssh_key.public_key_openssh

  tags = {
    Name = "${var.project_name}-deploy-key"
  }
}

resource "local_file" "ssh_pem" {
  filename        = "${path.root}/portfolio-key.pem"
  content         = tls_private_key.ssh_key.private_key_pem
  file_permission = "0400"
}

# ------------------------------------------------------------------------------
# Dedicated Backend EC2 Instance with Elastic IP
# ------------------------------------------------------------------------------
resource "aws_eip" "bastion_eip" {
  domain = "vpc"

  tags = {
    Name = "${var.project_name}-backend-eip"
  }
}

resource "aws_instance" "backend" {
  ami                  = var.ubuntu_ami_id != "" ? var.ubuntu_ami_id : data.aws_ami.ubuntu.id
  instance_type        = var.backend_instance_type
  subnet_id            = var.public_subnet_a_id
  key_name             = aws_key_pair.generated_key.key_name
  iam_instance_profile = var.ssm_instance_profile_name

  vpc_security_group_ids = [var.backend_sg_id]

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  user_data = <<-EOF
              #!/bin/bash
              set -e
              apt-get update -y
              apt-get install -y curl wget git jq ca-certificates gnupg lsb-release

              # Install Docker
              install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
              chmod a+r /etc/apt/keyrings/docker.gpg
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

              systemctl start docker
              systemctl enable docker
              usermod -aG docker ubuntu

              mkdir -p /home/ubuntu/app
              chown -R ubuntu:ubuntu /home/ubuntu/app
              EOF

  tags = {
    Name = "${var.project_name}-backend"
    Role = "Backend"
  }
}

resource "aws_eip_association" "backend_eip_assoc" {
  instance_id   = aws_instance.backend.id
  allocation_id = aws_eip.bastion_eip.id
}

