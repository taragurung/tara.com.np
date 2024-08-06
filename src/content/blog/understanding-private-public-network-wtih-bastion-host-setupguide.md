---
title: "Getting familiar with Private and Public network with real-time project (bastion host)"
meta_title: "Beginners guide to Private and Public network with realtime practical examples ovpn setup done for making things clear."
description: "Beginners guide to AWS Private and Public network, how to access private network content with bastion host, learning with example"
date: 2023-04-04T05:00:00Z
image: "/images/private-public-network-guide-with-real-project-example-bastion-setup.png"
categories: ["AWS", "DevOps"]
author: "Tara Prasad Gurung"
tags: ["networking","bastion-host","private-subnet","public-subnet"]
draft: false
---


The purpose of this article is to familiarize readers with private and public networks using examples and real-time use cases.
You might have seen many tutorials on setting up OpenVPN, but most of them lack a comprehensive guide for complete beginners. Also this will give beginners idea about privat and public network and how we can access resources from private network.

In this tutorial, we will cover everything from setting up the machine in a private subnet to configuring OpenVPN and testing the connection to ensure everything works as expected.

## Network setup: 
- Create a VPC
- Create a private and public subnet
- Make sure necessary network components are well setup in private and public subnet, like NAT Gateway and Internet Gateway
Note: These days all these setup can be automated while creating a VPC.

## how it works:
![Alt text](private-public-network-guide-with-real-project-example-bastion-setup.png)

As you can see in the image, when we run a service in a private network, it is not possible to access it publicly. However, when we have an OpenVPN setup completed and are connected to the VPN, we can connect to the service in the private network using its private IP as well.


## Making Machine ready for Bastion host and OpenVPN:
We would be setting up and using AWS for setting up the machine. 

To access the machine in a private subnet we would need one machine that would act as a single source to access it, people call it a bastion host. 

And to access the service in a private subnet in a more secure way we would set up a OpenVPN also which serves a purpose of making service in private networks available. Here in this example we would simply run a nginx server in a private network and make it accessible after connecting to a VPN server. 

### Setting up Openvpn with docker-compose:

***Installing docker and docker-compose***
```
sudo apt-get update
sudo apt-get install docker.io
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### Install openvpn

This is the official source to setup openvpn using docker:
https://github.com/kylemanna/docker-openvpn?tab=readme-ov-file

And here is the documentation to setup openvpn using docker-compose:
https://github.com/kylemanna/docker-openvpn/blob/master/docs/docker-compose.md



### Setup new EC2 on private subnet with private ip only:
- Make sure the setup has NAT Gateway , else machine in private network won't be able to connect to internet
- Connect via Bastion host to the private machine which would require key first 
- Authorise bastion host so next time won't require a private key.
- Setup nginx
- Make security group setting to allow access to port-80 from bastion host internal-IP

### Install nginx on private network created:
```
sudo apt-get update
sudo apt-get install -y nginx
```

## Alternative Setting up OpenVpn using Ovpn ami available in marketplace
You can also use the OpenVPN AMI available in the AWS Marketplace and simply set it up, following the same network concepts mentioned above.

## Conclusion:
With this example and setup process, I believe the distinction between private and public networks will become clearer.
