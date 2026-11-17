variable "ubuntu_ami_id" {
  type        = string
  description = "Ubuntu 22.04 AMI ID (defaults to automatic lookup if blank)"
  default     = ""
}

variable "project_name" {
  type        = string
  description = "Project name prefix"
}

variable "public_subnet_a_id" {
  type        = string
  description = "Public subnet AZ-A ID for Backend Instance"
}

variable "private_app_subnet_a_id" {
  type        = string
  description = "Private application subnet AZ-A ID"
  default     = ""
}

variable "private_app_subnet_b_id" {
  type        = string
  description = "Private application subnet AZ-B ID"
  default     = ""
}

variable "backend_sg_id" {
  type        = string
  description = "Security Group ID for Backend Instance"
  default     = ""
}

variable "bastion_sg_id" {
  type        = string
  description = "Security Group ID for Bastion"
  default     = ""
}

variable "k8s_control_sg_id" {
  type        = string
  description = "Security Group ID for K8s Control Plane"
  default     = ""
}

variable "k8s_worker_sg_id" {
  type        = string
  description = "Security Group ID for K8s Worker"
  default     = ""
}

variable "ssm_instance_profile_name" {
  type        = string
  description = "IAM instance profile for SSM"
  default     = null
}

variable "backend_instance_type" {
  type        = string
  description = "Instance type for Backend EC2 (Free Tier eligible: t3.micro)"
  default     = "t3.micro"
}

variable "bastion_instance_type" {
  type        = string
  description = "Instance type for Bastion (t3.micro)"
  default     = "t3.micro"
}

variable "k8s_instance_type" {
  type        = string
  description = "Instance type for Kubernetes nodes"
  default     = "t3.micro"
}

variable "k8s_ebs_volume_size" {
  type        = number
  description = "gp3 root volume size in GB"
  default     = 20
}
