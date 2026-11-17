# ==============================================================================
# NETWORKING MODULE: Dedicated VPC, Multi-AZ Subnets, Route Tables & Gateways
# ==============================================================================

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

# ------------------------------------------------------------------------------
# Public Subnets (AZ-A & AZ-B)
# ------------------------------------------------------------------------------
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, 1) # 10.30.1.0/24
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name                     = "${var.project_name}-public-subnet-a"
    "kubernetes.io/role/elb" = "1"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, 2) # 10.30.2.0/24
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = {
    Name                     = "${var.project_name}-public-subnet-b"
    "kubernetes.io/role/elb" = "1"
  }
}

# ------------------------------------------------------------------------------
# Private Application Subnets for Kubernetes (AZ-A & AZ-B)
# ------------------------------------------------------------------------------
resource "aws_subnet" "private_app_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, 10) # 10.30.10.0/24
  availability_zone = "${var.aws_region}a"

  tags = {
    Name                              = "${var.project_name}-private-app-a"
    "kubernetes.io/role/internal-elb" = "1"
  }
}

resource "aws_subnet" "private_app_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, 20) # 10.30.20.0/24
  availability_zone = "${var.aws_region}b"

  tags = {
    Name                              = "${var.project_name}-private-app-b"
    "kubernetes.io/role/internal-elb" = "1"
  }
}

# ------------------------------------------------------------------------------
# Private Database Subnets for Amazon RDS MySQL (AZ-A & AZ-B)
# ------------------------------------------------------------------------------
resource "aws_subnet" "private_db_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, 30) # 10.30.30.0/24
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = "${var.project_name}-private-db-a"
  }
}

resource "aws_subnet" "private_db_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, 40) # 10.30.40.0/24
  availability_zone = "${var.aws_region}b"

  tags = {
    Name = "${var.project_name}-private-db-b"
  }
}

# ------------------------------------------------------------------------------
# Route Tables & Associations
# ------------------------------------------------------------------------------
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "${var.project_name}-public-rt"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-private-rt"
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private_app_a" {
  subnet_id      = aws_subnet.private_app_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_app_b" {
  subnet_id      = aws_subnet.private_app_b.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_db_a" {
  subnet_id      = aws_subnet.private_db_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_db_b" {
  subnet_id      = aws_subnet.private_db_b.id
  route_table_id = aws_route_table.private.id
}

# ------------------------------------------------------------------------------
# RDS DB Subnet Group across AZ-A and AZ-B
# ------------------------------------------------------------------------------
resource "aws_db_subnet_group" "db_subnet_group" {
  name        = "${var.project_name}-db-subnet-group"
  description = "Dedicated private database subnet group for MySQL"
  subnet_ids  = [aws_subnet.private_db_a.id, aws_subnet.private_db_b.id]

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

