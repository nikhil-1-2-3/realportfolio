output "alb_arn" {
  value = aws_lb.main.arn
}

output "alb_dns_name" {
  value       = aws_lb.main.dns_name
  description = "Public DNS name of the Application Load Balancer"
}

output "alb_zone_id" {
  value = aws_lb.main.zone_id
}

output "target_group_arn" {
  value = aws_lb_target_group.tg_backend.arn
}

output "acm_certificate_arn" {
  value = var.enable_custom_domain ? aws_acm_certificate.cert[0].arn : null
}

