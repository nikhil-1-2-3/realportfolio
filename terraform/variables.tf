variable "aws_region" {
  type        = string
  description = "AWS deployment region"
  default     = "ap-south-1"
}

variable "environment" {
  type        = string
  description = "Deployment environment name"
  default     = "production"
}

variable "project_name" {
  type        = string
  description = "Project resource prefix"
  default     = "portfolio"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the dedicated portfolio VPC"
  default     = "10.30.0.0/16"
}

variable "admin_ssh_ip" {
  type        = string
  description = "Trusted IP address / CIDR for SSH access to Bastion (e.g. 203.0.113.4/32)"
  default     = "0.0.0.0/0"
}

variable "backend_instance_type" {
  type        = string
  description = "EC2 instance type for single Backend host (Free Tier eligible: t3.micro)"
  default     = "t3.micro"
}

variable "bastion_instance_type" {
  type        = string
  description = "EC2 instance type for Bastion/Management host (Free Tier eligible: t3.micro)"
  default     = "t3.micro"
}

variable "k8s_instance_type" {
  type        = string
  description = "EC2 instance type for K8s Control-Plane and Worker nodes (Free Tier eligible: m7i-flex.large or t3.small)"
  default     = "m7i-flex.large"
}

variable "k8s_ebs_volume_size" {
  type        = number
  description = "Root gp3 volume size in GB for Kubernetes nodes"
  default     = 20
}

variable "db_instance_class" {
  type        = string
  description = "RDS MySQL instance class (Free Tier eligible: db.t3.micro)"
  default     = "db.t3.micro"
}

variable "db_storage_type" {
  type        = string
  description = "Storage type for RDS MySQL (gp2 for 100% Free Tier standard)"
  default     = "gp2"
}

variable "db_allocated_storage" {
  type        = number
  description = "Allocated storage in GB for RDS MySQL (Free Tier allows up to 20GB)"
  default     = 20
}

variable "db_name" {
  type        = string
  description = "MySQL database name"
  default     = "portfolio_db"
}

variable "db_username" {
  type        = string
  description = "MySQL master username"
  default     = "portfolio_admin"
}

variable "db_password" {
  type        = string
  description = "MySQL master password (minimum 8 characters)"
  sensitive   = true
  default     = "PortfolioSecure2026!#"
}

variable "domain_name" {
  type        = string
  description = "Custom domain name for the portfolio (e.g. nikhilsingh.dev)"
  default     = ""
}

variable "enable_custom_domain" {
  type        = bool
  description = "Whether to provision ACM certificate and HTTPS listener for custom domain"
  default     = false
}


variable "ubuntu_ami_id" {
  type        = string
  description = "Ubuntu 22.04 AMI ID (defaults to automatic lookup if blank)"
  default     = ""
}

variable "backup_retention_period" {
  type        = number
  description = "RDS backup retention period in days (0 for Free Tier compliance)"
  default     = 0
}

variable "enable_iam_role" {
  type        = bool
  description = "Whether to create IAM SSM instance profile (requires iam:CreateRole)"
  default     = false
}
