---
url: /2018/06/self-escalating-batch.html
title: "Self Escalating Batch"
author: Beej
type: post
description: ""
date: "2018-06-09T09:53:00-07:00"
thumbnail: ""
categories:
  - ""
tags:
  - CmdLine
---

use this version of [Sudo for Windows](https://github.com/mattn/sudo)... it goes to some length to keep the activity inside the current dos console.

```cmd
@echo off
setlocal

::self escalate
net session >nul 2>&1 
if %errorlevel% NEQ 0 (sudo %0 & timeout /t 5 & exit /b)

::...rest of your logic...
```