# ==============================================================================
# TERRAFORM OUTPUTS
# Critical Infrastructure Endpoints, IPs, and Connection Strings
# ==============================================================================

output "vpc_id" {
  description = "Dedicated Portfolio VPC ID"
  value       = module.networking.vpc_id
}

output "backend_elastic_ip" {
  description = "Public Elastic IP assigned to Backend EC2 host"
  value       = module.compute.backend_elastic_ip
}

output "backend_instance_id" {
  description = "Backend EC2 Instance ID"
  value       = module.compute.backend_instance_id
}

output "backend_private_ip" {
  description = "Backend EC2 Private IP"
  value       = module.compute.backend_private_ip
}

output "alb_dns_name" {
  description = "Public DNS Name for the Application Load Balancer"
  value       = module.loadbalancer.alb_dns_name
}

output "rds_endpoint" {
  description = "Amazon RDS MySQL connection endpoint (host:port)"
  value       = module.database.db_endpoint
}

output "rds_address" {
  description = "Amazon RDS MySQL host DNS name"
  value       = module.database.db_address
}

output "rds_database_name" {
  description = "Amazon RDS MySQL Database Name"
  value       = module.database.db_name
}

# ------------------------------------------------------------------------------
# Administration Connection Helpers
# ------------------------------------------------------------------------------
output "ssh_connect_backend" {
  description = "Direct SSH command to connect to Backend EC2 using the generated PEM key"
  value       = "ssh -i portfolio-key.pem ubuntu@${module.compute.backend_elastic_ip}"
}

# Compatibility aliases
output "bastion_elastic_ip" {
  value = module.compute.backend_elastic_ip
}

output "bastion_instance_id" {
  value = module.compute.backend_instance_id
}

output "ssh_connect_bastion" {
  value = "ssh -i portfolio-key.pem ubuntu@${module.compute.backend_elastic_ip}"
}
