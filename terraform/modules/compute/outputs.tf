output "backend_instance_id" {
  value = aws_instance.backend.id
}

output "backend_public_ip" {
  value = aws_eip.bastion_eip.public_ip
}

output "backend_elastic_ip" {
  value = aws_eip.bastion_eip.public_ip
}

output "backend_private_ip" {
  value = aws_instance.backend.private_ip
}

# Backward compatibility aliases
output "bastion_instance_id" {
  value = aws_instance.backend.id
}

output "bastion_elastic_ip" {
  value = aws_eip.bastion_eip.public_ip
}

output "k8s_worker_instance_id" {
  value = aws_instance.backend.id
}

output "k8s_control_instance_id" {
  value = aws_instance.backend.id
}

output "ssh_key_name" {
  value = aws_key_pair.generated_key.key_name
}

output "ssh_private_key_pem" {
  value       = tls_private_key.ssh_key.private_key_pem
  sensitive   = true
  description = "Private key for direct SSH administration"
}
