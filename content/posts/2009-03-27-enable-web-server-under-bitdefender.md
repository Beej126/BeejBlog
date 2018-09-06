---
title: Enable IIS7 under BitDefender 2009 Firewall Rules
author: Beej
type: post
date: 2009-03-27T08:18:00+00:00
year: "2009"
month: "2009/03"
url: /2009/03/enable-web-server-under-bitdefender.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4446622177256693539
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2009/03/enable-web-server-under-bitdefender.html
blogger_thumbnail:
  - https://lh4.ggpht.com/_XlySlDLkdOc/Scwp0cUCRwI/AAAAAAAACsU/Q10RZHpLIJ0/image_thumb%5B18%5D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:195:"a:1:{i:0;a:7:{s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";
dsq_thread_id:
  - 5520892626
categories:
  - Uncategorized
tags:
  - IIS
  - Networking
  - SysAdmin

---
Create the following rule and make sure that it’s positioned numerically “above” (i.e. lower number) than all the service.exe related rules… especially above the main “deny” rule at the last slot… i’m assuming we’re dealing with the _System_ process because IIS7 (Windows Vista/Server 2008) moved the core listener daemon responsibility down to a lower level than W3SVC.exe[<img title="image" style="border-top-width: 0px; display: inline; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="386" alt="image" src="https://lh4.ggpht.com/_XlySlDLkdOc/Scwp0cUCRwI/AAAAAAAACsU/Q10RZHpLIJ0/image_thumb%5B18%5D.png?imgmax=800" width="420" border="0" />][1]&#160; [<img title="image" style="border-top-width: 0px; display: inline; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="290" alt="image" src="https://lh6.ggpht.com/_XlySlDLkdOc/Scwp1YZgOqI/AAAAAAAACsc/aRNNlY23vko/image_thumb%5B19%5D.png?imgmax=800" width="448" border="0" />][2] [<img title="image" style="border-top-width: 0px; display: inline; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="687" alt="image" src="https://lh5.ggpht.com/_XlySlDLkdOc/ScwpVm8-oWI/AAAAAAAACsM/KZheGTmzUU8/image_thumb%5B13%5D.png?imgmax=800" width="928" border="0" />][3]

 [1]: https://lh3.ggpht.com/_XlySlDLkdOc/Scwpz4YHCwI/AAAAAAAACsQ/3nrHJoM7TTM/s1600-h/image%5B28%5D.png
 [2]: https://lh4.ggpht.com/_XlySlDLkdOc/Scwp0408htI/AAAAAAAACsY/1c9MicSpne8/s1600-h/image%5B29%5D.png
 [3]: https://lh3.ggpht.com/_XlySlDLkdOc/ScwpUYepC8I/AAAAAAAACsI/ckMPFGQKp4Q/s1600-h/image%5B19%5D.png