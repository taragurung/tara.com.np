---
title: How to Set Up a NAT Gateway in Terraform for Private Subnet Internet Access Part-2
excerpt: This is the second part of creating AWS network resources using terraform, here we will learn to create nat gateway required for communicating to internet from private network.
publishDate: 'May 15 2025'
tags:
  - iaac
  - devops
  - terraform
seo:
  image:
    src: '/creating-aws-network-vpc-sg-routetable-gateway-with-terraform.png'
    alt: creating aws networking resources with Terraform nat gateway for internet communication
---
When working with private subnets in AWS, the instances inside them cannot access the internet directly—which is great for security but a challenge for things like downloading updates or pulling dependencies. That’s where a NAT Gateway comes in.

In this guide, we’ll walk through how to configure a NAT Gateway using Terraform to allow outbound internet access from your private subnets, without exposing them publicly.

## Script repository
Code repository: [full terraform script code here ](https://github.com/taragurung/terraform-guide-aws-network.git) 


### Prerequisites
We have already created all of these resources in Part-1 of the tutorial.  
[PART-1-Here](https://tara.com.np/blog/aws-terraform-networking-resources-setup/)

Make sure you already have:
- A working VPC and subnet setup in Terraform.
- At least one public subnet (NAT Gateway lives here).
- One or more private subnets (to be routed through NAT).

## Overview: What We’ll Build 
To enable internet access for private subnets, we need to:

- Allocate an Elastic IP for the NAT Gateway.
- Create a NAT Gateway in one of the public subnets.
- Create a route table for private subnets pointing to the NAT Gateway.
- Associate that route table with each private subnet.

## Step 1: Create Elastic IP for NAT Gateway
```
resource "aws_eip" "nat_eip" {
  vpc = true

  tags = {
    Name = "${var.project_name}-nat-eip"
  }
}
```
### Why this is required:
A NAT Gateway requires a static public IP to send traffic to the internet. This is provisioned using an Elastic IP (EIP).

## Step 2: Create the NAT Gateway
```
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_subnets[0].id

  tags = {
    Name = "${var.project_name}-nat-gateway"
  }

  depends_on = [aws_internet_gateway.gw]
}
```
### Why this is required:
The NAT Gateway sits in a public subnet, connected to an Internet Gateway, and handles outbound traffic on behalf of instances in private subnets.

#### NOTE:
`We’re using the first public subnet for simplicity. In production, consider setting up multiple NAT Gateways across AZs for high availability.`

## Step 3: Create Route Table for Private Subnets
```
resource "aws_route_table" "custom_private_rt" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }

  tags = {
    Name = "${var.project_name}-private-rt"
  }
}
```

### Why this is required:
Private subnets use this custom route table to send internet-bound traffic to the NAT Gateway, not directly to the internet.

## Step 4: Associate Private Subnets with the Route Table
```
resource "aws_route_table_association" "private_subnet_associate" {
  count          = length(var.private_subnet_cidrs)
  subnet_id      = aws_subnet.private_subnets[count.index].id
  route_table_id = aws_route_table.custom_private_rt.id
}

```
### Why this is required:
Unless the route table is explicitly associated with each subnet, it won’t be applied. This ensures each private subnet knows to route traffic via NAT.

## Final Thoughts
By adding this Terraform configuration, you’ve enabled secure internet access for private subnets using a NAT Gateway. This is critical for most production workloads where servers need access to patch servers, package managers, or APIs without being directly reachable from the internet.






