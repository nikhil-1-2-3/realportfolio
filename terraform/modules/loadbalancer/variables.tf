variable "project_name" {
  type        = string
  description = "Project name prefix"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "Public subnet IDs across at least two AZs"
}

variable "alb_sg_id" {
  type        = string
  description = "Security Group ID for ALB"
}

variable "backend_instance_id" {
  type        = string
  description = "Backend EC2 instance ID for target group attachment"
  default     = ""
}

variable "k8s_worker_instance_id" {
  type        = string
  description = "Kubernetes worker EC2 instance ID for target group attachment"
  default     = ""
}

variable "domain_name" {
  type        = string
  description = "Custom domain name (optional)"
  default     = ""
}

variable "enable_custom_domain" {
  type        = bool
  description = "Enable ACM certificate and HTTPS 443 listener"
  default     = false
}

