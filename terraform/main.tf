# ==============================================================================
# MAIN ROOT TERRAFORM CONFIGURATION
# Modular orchestration for Nikhil Singh Portfolio AWS Kubernetes Architecture
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. Dedicated Networking Module (VPC, Subnets, Route Tables, IGW)
# ------------------------------------------------------------------------------
module "networking" {
  source       = "./modules/networking"
  project_name = var.project_name
  vpc_cidr     = var.vpc_cidr
  aws_region   = var.aws_region
}

# ------------------------------------------------------------------------------
# 2. Security Module (Security Groups & IAM Roles)
# ------------------------------------------------------------------------------
module "security" {
  source          = "./modules/security"
  project_name    = var.project_name
  vpc_id          = module.networking.vpc_id
  admin_ssh_ip    = var.admin_ssh_ip
  enable_iam_role = var.enable_iam_role
}

# ------------------------------------------------------------------------------
# 3. Compute Module (Single Dedicated EC2 Backend Instance + Elastic IP)
# ------------------------------------------------------------------------------
module "compute" {
  source                    = "./modules/compute"
  project_name              = var.project_name
  ubuntu_ami_id             = var.ubuntu_ami_id
  public_subnet_a_id        = module.networking.public_subnet_a_id
  private_app_subnet_a_id   = module.networking.private_app_subnet_a_id
  private_app_subnet_b_id   = module.networking.private_app_subnet_b_id
  backend_sg_id             = module.security.backend_sg_id
  bastion_sg_id             = module.security.bastion_sg_id
  k8s_control_sg_id         = module.security.k8s_control_sg_id
  k8s_worker_sg_id          = module.security.k8s_worker_sg_id
  ssm_instance_profile_name = module.security.ssm_instance_profile_name
  backend_instance_type     = var.backend_instance_type
  bastion_instance_type     = var.bastion_instance_type
  k8s_instance_type         = var.k8s_instance_type
  k8s_ebs_volume_size       = var.k8s_ebs_volume_size
}

# ------------------------------------------------------------------------------
# 4. Database Module (Amazon RDS MySQL 8 Single-AZ Private)
# ------------------------------------------------------------------------------
module "database" {
  source                  = "./modules/database"
  project_name            = var.project_name
  db_subnet_group_name    = module.networking.db_subnet_group_name
  rds_sg_id               = module.security.rds_sg_id
  db_instance_class       = var.db_instance_class
  db_allocated_storage    = var.db_allocated_storage
  storage_type            = var.db_storage_type
  db_name                 = var.db_name
  db_username             = var.db_username
  db_password             = var.db_password
  backup_retention_period = var.backup_retention_period
}

# ------------------------------------------------------------------------------
# 5. Load Balancer Module (Internet-Facing ALB & Target Groups)
# ------------------------------------------------------------------------------
module "loadbalancer" {
  source                 = "./modules/loadbalancer"
  project_name           = var.project_name
  vpc_id                 = module.networking.vpc_id
  public_subnet_ids      = module.networking.public_subnet_ids
  alb_sg_id              = module.security.alb_sg_id
  backend_instance_id    = module.compute.backend_instance_id
  k8s_worker_instance_id = module.compute.backend_instance_id
  domain_name            = var.domain_name
  enable_custom_domain   = var.enable_custom_domain
}

