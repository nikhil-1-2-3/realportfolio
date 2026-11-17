# ==============================================================================
# DATABASE MODULE: Amazon RDS MySQL 8 (Single-AZ, Private Subnet, Encrypted)
# ==============================================================================

resource "aws_db_instance" "mysql" {
  identifier        = "${var.project_name}-rds-mysql"
  engine            = "mysql"
  engine_version    = "8.0"
  instance_class    = var.db_instance_class
  allocated_storage = var.db_allocated_storage
  storage_type      = var.storage_type

  # Cost Optimization: Single-AZ for Free Tier compatibility
  multi_az = false

  # Security & Isolation
  publicly_accessible    = false
  db_subnet_group_name   = var.db_subnet_group_name
  vpc_security_group_ids = [var.rds_sg_id]
  storage_encrypted      = true

  # Database Credentials & Database Initialization
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  # Backups & Maintenance (Set to 0 for strict AWS Free Tier compatibility)
  backup_retention_period    = var.backup_retention_period
  backup_window              = "03:00-04:00"
  maintenance_window         = "sun:04:30-sun:05:30"
  auto_minor_version_upgrade = true
  skip_final_snapshot        = true
  deletion_protection        = false

  tags = {
    Name = "${var.project_name}-rds-mysql"
  }
}

