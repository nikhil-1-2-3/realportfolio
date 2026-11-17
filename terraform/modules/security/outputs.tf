output "alb_sg_id" {
  value = aws_security_group.alb_sg.id
}

output "backend_sg_id" {
  value = aws_security_group.backend_sg.id
}

output "bastion_sg_id" {
  value = aws_security_group.bastion_sg.id
}

output "k8s_control_sg_id" {
  value = aws_security_group.k8s_control_sg.id
}

output "k8s_worker_sg_id" {
  value = aws_security_group.k8s_worker_sg.id
}

output "rds_sg_id" {
  value = aws_security_group.rds_sg.id
}

output "ssm_instance_profile_name" {
  value = var.enable_iam_role ? aws_iam_instance_profile.ssm_profile[0].name : null
}

output "ssm_role_arn" {
  value = var.enable_iam_role ? aws_iam_role.ssm_role[0].arn : null
}

