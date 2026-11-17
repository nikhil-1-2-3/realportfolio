# ==============================================================================
# TERRAFORM REMOTE STATE CONFIGURATION
# S3 Bucket for State Storage & DynamoDB for Distributed State Locking
# ==============================================================================

# Uncomment this block once you have provisioned your S3 bucket and DynamoDB table:
#
# terraform {
#   backend "s3" {
#     bucket         = "portfolio-terraform-state-690943883930"
#     key            = "prod/terraform.tfstate"
#     region         = "ap-south-1"
#     encrypt        = true
#     dynamodb_table = "portfolio-terraform-state-lock"
#   }
# }

