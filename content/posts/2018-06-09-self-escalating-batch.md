---
url: /2018/06/self-escalating-batch.html
title: "Self Escalating Batch"
author: Beej
type: post
description: ""
date: 2018-06-09T09:53:00-07:00
year: "2018"
month: "2018/06"
thumbnail: ""
categories:
  - ""
tags:
  - CmdLine
---

this is a great spin on [Sudo for Windows](https://github.com/mattn/sudo).

it goes to some length to keep the input/output inside the current console - versus most other sudo approaches that simply launch the command in another elevated console window.

it pulls this off by clever trick of launching a hidden elevated process and capturing/forwarding it's I/O to the original console via socket.

i've seen some tools have incompatibility with the stdin capture but this technique generally works beautifully.

self escalate as concisely as possible:

```bat
:: net session is a concise way to determine elevation
:: https://stackoverflow.com/a/16285248/813599

:: || means logical "or"..
:: i.e. if net session doesn't trip ERRORLEVEL to 1 it means we're already elevated
:: and we just keep going, otherwise we fire this same file path under sudo

:: this sudo already only elevates where necessary so it would be nice
:: to eliminate the net session check but i can't think of a quicker way to
:: avoid the infinite loop... any ideas?

:: %~f1 means expand the full path of argument 1 (i.e. this script)
:: simple %1 would work in most cases but this is a good habit to get into
:: when you associate scripts to Explorer.exe context menus

:: note this doesn't pass any additional arguments
:: you could use %* for that but then you'd have to tradeoff the full path

net session >nul 2>&1 || sudo "%~f1"

::...rest of your logic...
```

<!--more-->