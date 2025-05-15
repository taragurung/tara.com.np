---
title: Creating the AWS Network resource required for all project using Terraform Part-1
excerpt:  Every application we build requires a networking component like VPC in AWS which is the foundation for every project. Here we will learn how to create those with Terraform.
publishDate: 'May 05 2025'
tags:
  - iaac
  - devops
  - terraform
seo:
  image:
    src: '/creating-aws-network-vpc-sg-routetable-gateway-with-terraform.png'
    alt: creating aws networking resources with Terraform vpc sg gateway routetable
---
This Terraform setup provides the foundational networking components for any AWS project. It includes:
- VPC
- Public and Private Subnets
- Internet Gateway
- Custom Route Table with associations
- Security Groups
- Modular design to promote reusability and environment-specific configurations

## folder structure maintaine for terraform scripts

## Step-1 Creating the VPC network with terraform:
A Virtual Private Cloud (VPC) is the foundational building block for networking in AWS. It logically isolates your AWS resources (e.g., EC2, RDS) and allows you to define IP ranges, subnets, routing, and security.

### Why it's required:
Every AWS resource that communicates with the internet or with each other within a private environment needs to live inside a VPC. Without it, you can’t define your own network structure.

```
resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

output "vpc_id" {
  value = aws_vpc.vpc.id
}
```

## Step-2 Creating the Subnets (aws subnets) with terraform:
Subnets divide a VPC’s IP space into smaller, manageable blocks. Subnets can be made public (accessible from the internet) or private (only internal access).

The /16 CIDR block 17.0.0.0/16 is divided into 4 /24 subnets:
- 17.0.0.0/24
- 17.0.1.0/24
- 17.0.2.0/24
- 17.0.3.0/24
Each of the 2 availability zones gets:
- 2 Public Subnets
- 2 Private Subnets

### Why it's required:
- Organize resources based on function (e.g., web tier in public, database tier in private).
- Improve security by restricting internet access to private subnets.
- Enable high availability by deploying subnets across multiple Availability Zones (AZs).

#### Our setup:
We use 2 Public and 2 Private subnets across 2 AZs.

```
resource "aws_subnet" "public_subnets" {
  count             = length(var.public_subnet_cidrs)
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = element(var.public_subnet_cidrs, count.index)
  availability_zone = element(var.azs, count.index)

  tags = {
    Name = "public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private_subnets" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = element(var.private_subnet_cidrs, count.index)
  availability_zone = element(var.azs, count.index)

  tags = {
    Name = "private-subnet-${count.index + 1}"
  }
}
```



## Step-3. Internet Gateway (aws_internet_gateway) with terraform
An IGW allows communication between resources in your VPC and the internet.

### Why it's required:
By default, VPCs are isolated. An IGW is required to make public subnets truly public by providing a route for internet-bound traffic.

```
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

```
## Step-4 Route Table (aws_route_table) with terraform

AWS RouteTable Defines how traffic flows within your VPC – for example, routing all 0.0.0.0/0 (i.e., internet traffic) via the IGW.

### Why it's required:
Routing must be explicitly defined in AWS. Public subnets must use a route table with a route to the IGW for internet access.

```
resource "aws_route_table" "tag_custom_rt" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "Custom RouteTable"
  }
}
```
## Step-5 Route Table Association (aws_route_table_association) with terraform
The subnet we created earlier has to be associated with the route table we created, which is made to make it as a public subnet. If not it acts like a private subnet.
The subnets for which we would want to make it act as public subnet we do the association. Here we do it for 2 subnets that we named as public.

```
resource "aws_route_table_association" "public_subnet_associate" {
  count          = length(var.public_subnet_cidrs)
  subnet_id      = element(aws_subnet.public_subnets[*].id, count.index)
  route_table_id = aws_route_table.tag_custom_rt.id
}
```

## Module variables.tf 
```
variable "aws_region" {}
variable "project_name" {}
variable "vpc_cidr" {}
```
## Root variables.tf
```
variable "aws_region" {}
variable "project_name" {}
variable "vpc_cidr" {}
```
## Root main.tf
```
terraform {
  backend "s3" {
    bucket  = "terraform-uat"
    key     = "aws/terraform.tfstate"
    region  = "eu-west-2"
    profile = "terraform_uat"
  }
}

provider "aws" {
  region  = "eu-west-2"
  profile = "terraform_uat"
}

module "vpc" {
  source       = "./modules/vpc"
  aws_region   = var.aws_region
  vpc_cidr     = var.vpc_cidr
  project_name = var.project_name
}
```

Here, profile is the AWS credential profile, set it up locally in your machine. Without that the terraform wont be able to connect to the AWS Cloud. 
Create users and generate security access_key and Secret. which is stored to `~/.aws/credentials` as a profile. 

## terraform variable to pass , prod.tfvars
```
project_name = "test-uat"
aws_region   = "eu-west-2"
vpc_cidr     = "17.0.0.0/16"
```

## Finally, plan and apply the resources

Use this commands to check resources that will be created by terraform. Once everthing looks good, use terraform apply command.

```
terraform plan -var-file=prod.tfvars
terraform apply -var-file=prod.tfvars
```

### NEXT STEP, In Part-II 
- Extend support for NAT Gateways (for private subnet internet access).


