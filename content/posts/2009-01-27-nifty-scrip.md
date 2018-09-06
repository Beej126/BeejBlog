---
title: "Nifty 'WhatIsMyIP' Script – put current WAN IP on Clipboard"
author: Beej
type: post
date: 2009-01-27T10:44:00+00:00
year: "2009"
month: "2009/01"
url: /2009/01/nifty-scrip.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 5848620100326517545
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2009/01/nifty-script.html
tags:
  - Networking
  - SysAdmin

---
Pre-req's: 

  * 4NT &#8211; love love love that little bugger… but i guess PowerShell is probably the new cool kid in town for this kind of stuff&#160; 
      * ‘echos’ command in 4NT outputs test w/o a linefeed... so I can tack something else I wanted onto the URL… obviously the sky is your limit (can’t find the equivalent in PowerShell yet??)
  * curl &#8211; everybody's favorite web mashup tool 

echos <https://> >clip:   
curl -s "<a href="https://whatismyip.org" ?="?">https://whatismyip.org"</a> >>clip:   
echos /training >>clip: