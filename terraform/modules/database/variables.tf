variable "project_name" {
  type        = string
  description = "Project name prefix"
}

variable "db_subnet_group_name" {
  type        = string
  description = "RDS private database subnet group name"
}

variable "rds_sg_id" {
  type        = string
  description = "Security Group ID for RDS MySQL"
}

variable "db_instance_class" {
  type        = string
  description = "RDS instance class (Free Tier eligible: db.t3.micro)"
  default     = "db.t3.micro"
}

variable "storage_type" {
  type        = string
  description = "RDS storage type (gp2 for 100% Free Tier standard)"
  default     = "gp2"
}

variable "db_allocated_storage" {
  type        = number
  description = "Allocated storage in GB (Free Tier: 20GB)"
  default     = 20
}

variable "db_name" {
  type        = string
  description = "Database name"
  default     = "portfolio_db"
}

variable "db_username" {
  type        = string
  description = "Database master username"
  default     = "portfolio_admin"
}

variable "db_password" {
  type        = string
  description = "Database master password"
  sensitive   = true
}

variable "backup_retention_period" {
  type        = number
  description = "Backup retention period in days (0 or 1 for Free Tier compliance)"
  default     = 0
}

