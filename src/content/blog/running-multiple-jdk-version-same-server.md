---
title: Running multiple jdk version in same server
excerpt: Sometime we would need to run multiple jdk version on same machine, this is the guide on how to do it on linux ubuntu24.04 machine. Tested works.
publishDate: 'Jan 09 2025'
tags:
  - linux
  - tips-and-tricks
seo:
  image:
    src: '/private-public-network-guide-with-real-project-example-bastion-setup.PNG'
    alt: understanding aws public private network with diagram and example
---

Have you ever installed the latest version of Oracle JDK, only to find that a specific application refuses to run successfully on it? The solution often lies in using a compatible JDK version. However, this presents two options: either uninstall the latest version and replace it with the required one or configure multiple JDK versions on the same server.
In this guide, we’ll focus on how to install and manage multiple versions of Oracle JDK on the same server, allowing you to switch between versions as needed.

Note: While tools exist to simplify version switching (e.g., SDKMAN) or containerize applications using Docker, our goal here is to configure multiple JDKs directly on the server.

## How to Install Oracle JDK on Linux
Follow these steps to install Oracle JDK on a Linux server:

**Step 1: Download the JDK**
Visit the official Oracle JDK downloads page and get the required JDK version. Alternatively, use the following command to download it directly:

```wget https://download.oracle.com/java/23/latest/jdk-23_linux-x64_bin.deb```

**Step 2: Install the Downloaded JDK**
Run the following command to install the downloaded JDK:
```sudo apt install ./jdk-23_linux-x64_bin.deb -y```

**Step 3: Update the Environment File**
Edit the environment file at /etc/environment and add the following lines to set up the Java environment variables:

```
export JAVA_HOME=/usr/lib/jvm/jdk-23.0.1-oracle-x64
export PATH="$PATH:${JAVA_HOME}/bin"
```

**Step 4: Apply Changes**
Run the source command to apply the changes to the current session:

```
source /etc/environment
```
After completing these steps, the JAVA_HOME variable will point to JDK version 23.0.1. This setup was tested on Ubuntu 24.04.

## How to Install and Configure Multiple Oracle JDK Versions
If you need to install another version of Oracle JDK without removing the existing one, follow these steps:

- Download the desired JDK version (repeat Step 1 above with the link for the new version).
- Install the new JDK (repeat Step 2 above).
- Update the environment variables (repeat Step 3, replacing JAVA_HOME with the path to the new JDK version).
- Apply the changes (repeat Step 4).
**You can repeat these steps to install and configure as many JDK versions as you need.**

### How to Switch Between JDK Versions, final steps
Once multiple JDK versions are installed, you can switch between them using the update-alternatives command. Here’s how:

```
sudo update-alternatives --config java
```
You’ll see a list of all installed JDK versions. Each version will have a number associated with it.
Select the desired version by entering the corresponding number.
After completing this step, the selected JDK version will be the default for your system.

### Conclusion
Installing and managing multiple Oracle JDK versions on the same server can be crucial for testing, troubleshooting, or running applications with specific requirements. By following the steps outlined above, you can successfully install and switch between multiple JDK versions on a Linux server.
For more tips on managing JDK installations and resolving application compatibility issues, stay tuned to our blog!

