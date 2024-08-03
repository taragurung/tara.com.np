---
title: "Health check with Uptime Kuma, complete setup guide in kubernetes "
meta_title: "learn to setup uptime kuma an opensource tool in kubernetes and send notification to Teams"
description: "Uptime kuma is the best health check tools, easy to install and setup necessary health check. we will do the setup in AWS eks cluster with helm chart and also see how it works and sents notifications to Teams Channel with workflow setup."
date: 2024-07-31T11:10:00Z
image: "/images/uptime-kuma-kubernetes-helm.png"
categories: ["Uptime-kuma","Monitoring","DevOps"]
author: "Tara Prasad Gurung"
tags: ["uptime-kuma", "uptime-kume teams-alert","healcheck and monitoring"]
draft: false
---

I have been this situation a lot. The services we set up went down for some reason and we are not aware of it. The customer knows about it the first and let us know. This is one of the worst situation to be in. All the services that we setup should be under our control or we should be the one to know about it or we should know about the failure as soon as things goes wrong. 

The application we deploy might go wrong any time and it's possible that we are not aware of it. To bring us all out of this worst situation we need to setup a monitoring tools that will continuously monitor our sytem or appliation and let us know as soon as something goes wrong.

### There are multiple ways to do it:
- you can write script of your own, which needs a way more time investment
- install monitoring tools nagios, prometheus with alertmanager and grafana 
- use third party services like NewRelic, DataDog and many more in the market
- setup an opensource tool like uptime kuma.

The choice is yours which one you prefer. It also depends on the budget you have. Here we are going to use the opensource tool called *uptime kuma* which I found to be the best tool so far for the purpose.

## Why uptime kuma?
- I find it way easier to setup then any other tools available
- The configuration part is pretty easy and has many options available.
- It's opensource

## Our Goal 
- We will setup uptime kuma using helm chart
- we will setup a simple nginx service and try to monitor it in uptime kuma
- The notification will be sent to MicroSoft teams as an alert.


### Installing uptime kuma with helm chart:
Adding helm chart repo and installing it on uptime-kuma namespace
```
helm repo add uptime-kuma https://helm.irsigler.cloud
helm install uptime-kuma uptime-kuma/uptime-kuma -n uptime-kuma --create-namespace 
```
### Make necessary changes in kuberenetes:
These are few things you can do for setting up domain for the uptime kuma.
- update helm chart to enable ingress and setup proper domain for the service
- update helm chart to add proper domain to set for the ingress 

Here: we will simply check by port-forwarding the service

#### simple nginx deployment and service for testing purpose
Simply create a deployment and service for testing purpose. I will be creating it on "testing" namespace.

deployment.yaml
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

service.yaml

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


## Setting up workflow in Teams
The way we used to setup webhook in microsoft teams is deprecated now, so we do it via workflow instead. We choose a flow which will trigger an action when post request is received on the webhook as shown in the screenshot image. 

![Alt text](public/images/teams-workflow-webhookreqest-received.PNG)

Do the necessary settings as requested like setting up flow-name, choosing the channel name and many more. 
> We get a webhook url , put it safe which we would need and thats where all the post request will be done for notifications. 


## Finally configuring the uptime kuma setting up monitor and notification:
- add the new monitor in uptime kuma
- for us as we are monitoring the kubernetes service with no external url or might not even have it in case of kubernetes so we would choose to do health check with TCP protocol
- set the proper names for monitor, for url for our case it will be nginx-service.testing.svc.cluster.local`

#### notification settings 
```
 {
       "type":"message",
       "attachments":[
          {
         "contentType":"application/vnd.microsoft.card.adaptive",
             "contentUrl":null,
             "content":{
                "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
                "type":"AdaptiveCard",
                "version":"1.2",
                "body":[
                    {
                    "type": "TextBlock",
                    "text": "{{msg}}",
                    "description": 
                     "size": "large",
                      "weight": "bolder"
                      
                    }
                ]
             }
          }
       ]
    }
```

