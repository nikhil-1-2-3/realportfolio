provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "portfolio-devops"
      ManagedBy   = "Terraform"
      Environment = var.environment
      Owner       = "Nikhil Singh"
    }
  }
}

