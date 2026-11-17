variable "project_name" {
  type        = string
  description = "Project name prefix"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID"
}

variable "admin_ssh_ip" {
  type        = string
  description = "Trusted IP address / CIDR for SSH access to Bastion"
}

variable "enable_iam_role" {
  type        = bool
  description = "Whether to create IAM SSM instance profile"
  default     = false
}

