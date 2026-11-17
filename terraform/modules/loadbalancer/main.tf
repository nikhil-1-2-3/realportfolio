# ==============================================================================
# LOAD BALANCER MODULE: Application Load Balancer, Target Groups, Listeners & SSL
# ==============================================================================

resource "aws_lb" "main" {
  name               = "${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.alb_sg_id]
  subnets            = var.public_subnet_ids

  enable_deletion_protection = false

  tags = {
    Name = "${var.project_name}-alb"
  }
}

# ------------------------------------------------------------------------------
# Target Group: Forwarding to Backend REST API (Port 5000)
# ------------------------------------------------------------------------------
resource "aws_lb_target_group" "tg_backend" {
  name        = "${var.project_name}-tg-backend"
  port        = 5000
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "instance"

  health_check {
    enabled             = true
    path                = "/api/health"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  tags = {
    Name = "${var.project_name}-tg-backend"
  }
}

resource "aws_lb_target_group_attachment" "backend_attach" {
  target_group_arn = aws_lb_target_group.tg_backend.arn
  target_id        = var.backend_instance_id != "" ? var.backend_instance_id : var.k8s_worker_instance_id
  port             = 5000
}

# ------------------------------------------------------------------------------
# Optional ACM Certificate for HTTPS
# ------------------------------------------------------------------------------
resource "aws_acm_certificate" "cert" {
  count             = var.enable_custom_domain ? 1 : 0
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${var.project_name}-cert"
  }
}

# ------------------------------------------------------------------------------
# HTTP (Port 80) Listener
# - Direct forwarding if no custom domain
# - Automatic HTTP to HTTPS 301 Redirect if custom domain enabled
# ------------------------------------------------------------------------------
resource "aws_lb_listener" "http_80" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  dynamic "default_action" {
    for_each = var.enable_custom_domain ? [] : [1]
    content {
      type             = "forward"
      target_group_arn = aws_lb_target_group.tg_backend.arn
    }
  }

  dynamic "default_action" {
    for_each = var.enable_custom_domain ? [1] : []
    content {
      type = "redirect"
      redirect {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    }
  }
}

# ------------------------------------------------------------------------------
# HTTPS (Port 443) Listener
# ------------------------------------------------------------------------------
resource "aws_lb_listener" "https_443" {
  count             = var.enable_custom_domain ? 1 : 0
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate.cert[0].arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg_backend.arn
  }
}

