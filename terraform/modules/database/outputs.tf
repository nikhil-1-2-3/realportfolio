output "db_endpoint" {
  value       = aws_db_instance.mysql.endpoint
  description = "Complete MySQL host and port endpoint"
}

output "db_address" {
  value       = aws_db_instance.mysql.address
  description = "MySQL database host address (DNS name)"
}

output "db_port" {
  value       = aws_db_instance.mysql.port
  description = "MySQL port (3306)"
}

output "db_name" {
  value = aws_db_instance.mysql.db_name
}

