output "vpc_id" {
  value       = aws_vpc.main.id
  description = "The ID of the dedicated VPC"
}

output "vpc_cidr" {
  value       = aws_vpc.main.cidr_block
  description = "The CIDR block of the VPC"
}

output "public_subnet_a_id" {
  value = aws_subnet.public_a.id
}

output "public_subnet_b_id" {
  value = aws_subnet.public_b.id
}

output "public_subnet_ids" {
  value = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

output "private_app_subnet_a_id" {
  value = aws_subnet.private_app_a.id
}

output "private_app_subnet_b_id" {
  value = aws_subnet.private_app_b.id
}

output "private_app_subnet_ids" {
  value = [aws_subnet.private_app_a.id, aws_subnet.private_app_b.id]
}

output "private_db_subnet_ids" {
  value = [aws_subnet.private_db_a.id, aws_subnet.private_db_b.id]
}

output "db_subnet_group_name" {
  value       = aws_db_subnet_group.db_subnet_group.name
  description = "RDS Subnet Group Name"
}

output "private_route_table_id" {
  value       = aws_route_table.private.id
  description = "Private Route Table ID for NAT routing"
}

