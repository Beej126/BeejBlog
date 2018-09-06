---
title: Baseline IIS Settings
author: Beej
type: post
date: 2017-02-01T17:19:12+00:00
year: "2017"
month: "2017/02"
draft: true
url: /?p=1692
snapEdIT:
  - 1
snapTW:
  - |
    s:218:"a:1:{i:0;a:8:{s:9:"timeToRun";s:0:"";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";
categories:
  - Uncategorized
tags:
  - WebDev

---
(_numbering is only for reference not specific ordering_)

### Accounts, Security & Permissions

  1. _ApplicationPoolIdentity_ &#8211; the default running process account for new application pools 
      * apply these rather hidden accounts to filesystem permissions ("ACLs") by manually s"IIS AppPool&#123;AppPoolName}"
  2. **Anonymous Authentication** &#8211; defaults to "IUSR" account, which is NOT permissioned on the corresponding filesystem folders by default... we can then either go ahead and apply IUSR to folder permissions ("ACLs") -OR- flip this to Application pool identity which might be one less moving part to manage 

https://blogs.technet.microsoft.com/tristank/2011/12/22/iusr-vs-application-pool-identity-why-use-either/