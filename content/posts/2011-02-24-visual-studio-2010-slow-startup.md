---
title: 'Visual Studio 2010 Slow Startup [resolved]'
author: Beej
type: post
date: 2011-02-24T17:11:00+00:00
year: "2011"
month: "2011/02"
url: /2011/02/visual-studio-2010-slow-startup.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 2864277192286582001
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2011/02/visual-studio-2010-slow-startup.html
categories:
  - Uncategorized
tags:
  - VisualStudio

---
Apparently the culprit of my slowdown was the VMware debugger integration… <a href="http://www.devtopics.com/visual-studio-2010-slowdown-vmdebugger-is-the-culprit/" target="_blank">resolution here</a> I merely uninstalled the VMDebugger component via VMware Desktop setup.exe …&#160; I did \*not\* have to completely uninstall all of VMware Desktop to see an significant improvement to Visual Studio startup time… down to a few seconds now from something that felt like 30 seconds.