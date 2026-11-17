variable "project_name" {
  type        = string
  description = "Project name prefix"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the dedicated VPC"
}

variable "aws_region" {
  type        = string
  description = "AWS region"
}

