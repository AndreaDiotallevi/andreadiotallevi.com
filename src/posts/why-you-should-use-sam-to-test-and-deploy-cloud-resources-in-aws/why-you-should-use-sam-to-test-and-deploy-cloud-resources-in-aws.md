---
title: "Why You Should Use The Serverless Application Model (SAM) To Test And Deploy Cloud Resources In AWS"
description: "Four reasons why you should start testing and deploying cloud resources using the Serverless Application Model to help your company become more scalable and productive."
date: "2022-12-07"
tags: ["Serverless", "AWS", "SAM"]
featuredImage: redd-f-1400x840.jpg
featuredImageUrl: "https://unsplash.com/photos/vUwJ8uu_C1M"
featuredImageAuthor: "Redd F"
color: rgb(113, 113, 113)
---

In this article, I describe 4 reasons why you should start testing and deploying cloud resources using the [Serverless Application Model](https://aws.amazon.com/serverless/sam/) to help your company become more scalable and productive.

## 1. Deployment confidence

> When was the last time you had a production bug you couldn’t reproduce locally?

I know - it’s frustrating. You can’t test a scenario with [Docker Compose](https://docs.docker.com/compose/gettingstarted/) in development if you use [Kubernetes](https://kubernetes.io/) in production. With SAM, on the other hand, you can describe the [resources](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-resources-and-properties.html) you need (queues, lambdas, policies, databases, etc.) in a readable [template](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy.html) you can use for all deployment stages.

Develop against real cloud resources to minimise discrepancies between environments and make deployments feel routines.

```yaml
# AWS SAM template for an Amazon S3 application
# https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example-use-app-spec.html

AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Resources:
    CreateThumbnail:
        Type: AWS::Serverless::Function
        Properties:
            Handler: handler
            Runtime: runtime
            Timeout: 60
            Policies: AWSLambdaExecute
            Events:
                CreateThumbnailEvent:
                    Type: S3
                    Properties:
                        Bucket: !Ref SrcBucket
                        Events: s3:ObjectCreated:*

    SrcBucket:
        Type: AWS::S3::Bucket
```

## 2. Architecture visibility

> When tasked to work on a feature you have never worked on before, can you find the related code in less than five minutes?

If the answer is no, you might have a problem with code discoverability. Having to depend on developers to remember custom infrastructure solutions is not scalable and leads to time waste. With SAM, on the other hand, templates become the unique source of truth for what is running in production, from services to policies.

Use standardised template files to minimise coupling between developers and features.

## 3. Versioned infrastructure

> Have you ever manually tested a resource on AWS and then, a month later, received an unexpected billing since you had forgotten to delete it?

It happened to me - a few times. Making changes manually from the AWS console or command line is prone to errors and doesn’t generate a viewable history. With SAM, on the other hand, you can group a set of resources under a stack name that can be updated or deleted at any time.

Use SAM templates version control to record the history of your infrastructure evolution.

## 4. Smooth onboarding

> How long do you take to get a new developer up to speed with your company development environment?

I am referring to the dependencies to install, database test data to populate and cloud permissions to obtain. You should try to automate this as much as possible and make it not reliable on operating systems and machine performances. With SAM, you can get up and running in a matter of minutes, as you only need an AWS account, the [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) and the [AWS CLI](https://aws.amazon.com/cli/).

Remove the friction between configuration and testing to make developers focus on building features.

**The level of abstraction of the tools we use continues to increase, so it’s up to you to use it to your advantage.**

Embrace this revolution in your next feature.
