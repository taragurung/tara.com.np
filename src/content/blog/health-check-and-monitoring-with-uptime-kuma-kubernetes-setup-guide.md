---
title: Health check with Uptime Kuma, complete setup guide in kubernetes
excerpt: In the competitive world of front-end development, a strong portfolio is your ticket to showcasing your skills, making a lasting impression on potential employers or clients, and advancing your career.
publishDate: 'Sep 28 2024'
tags:
  - monitoring
  - uptime
seo:
  image:
    src: '/post-2.jpg'
    alt: uptime helps to give insights of the system uptime
---

![frustrated because didn't monitor service health](/uptime-kuma-helm-setup-guide.jpg)
I have been in this situation a lot. The services we set up went down for some reason and we are not aware of it. The customer knows about it the first and let us know. This is one of the worst situation to be in. All the services that we setup should be under our control or we should be the one to know about it or we should know about the failure as soon as things goes wrong.

The application we deploy might go wrong any time and it’s possible that we are not aware of it. To bring us all out of this worst situation we need to setup a monitoring tools that will continuously monitor our sytem or appliation and let us know as soon as something goes wrong.

## how to keepup with service health (uptime)
**There are multiple ways to do it:**
- you can write script of your own, which needs a way more time investment
- install monitoring tools nagios, prometheus with alertmanager and grafana
- use third party services like NewRelic, DataDog and many more in the market
- setup an opensource tool like uptime kuma.
The choice is yours which one you prefer. It also depends on the budget you have. Here we are going to use the opensource tool called uptime kuma which I found to be the best tool so far for the purpose.

## Why uptime kuma?
- I find it way easier to setup then any other tools available
- The configuration part is pretty easy and has many options available.
- It’s opensource.
- The best part is it provides a monthly SLA report for the service being monitored.

## Our Goal
- We will setup uptime kuma using helm chart
- we will setup a simple nginx service and try to monitor it in uptime kuma
- The notification will be sent to MicroSoft teams as an alert.

## Installing uptime kuma with helm chart:
Adding helm chart repo and installing it on uptime-kuma namespace
```
helm repo add uptime-kuma https://helm.irsigler.cloud
helm install uptime-kuma uptime-kuma/uptime-kuma -n uptime-kuma --create-namespace 
```

#### Make necessary changes as per your requirements in kuberenetes values in helm chart values
These are few things you can do for setting up domain for the uptime kuma.

- update helm chart to enable ingress and setup proper domain for the service
- update helm chart to add proper domain to set for the ingress
Here: we will simply check by port-forwarding the service

## Deploy simple nginx app and monitor with uptime

Simply create a deployment and service for testing purpose. I will be creating it on “testing” namespace.

**deployment.yaml**
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: testing
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```
**service.yaml**
```
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: testing
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

### Finally configuring the uptime kuma setting up monitor and notification:
We have successfully deployed uptime using helm chart, now lets do necessary setup on uptime to monitor our nginx application. 

- add the new monitor in uptime kuma
- for us as we are monitoring the kubernetes service with no external url or might not even have it in case of kubernetes so we would choose to do health check with TCP protocol
set the proper names for monitor, for url for our case it will be `nginx-service.testing.svc.cluster.local`
