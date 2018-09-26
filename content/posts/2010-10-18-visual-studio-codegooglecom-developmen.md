---
title: TortoiseSVN + Code.Google.com = development LOCATION nirvana
author: Beej
type: post
date: 2010-10-19T00:11:00+00:00
year: "2010"
month: "2010/10"
url: /2010/10/visual-studio-codegooglecom-developmen.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 106744356451742521
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2010/10/visual-studio-codegooglecom-development.html
blogger_thumbnail:
  - https://lh4.ggpht.com/_XlySlDLkdOc/TLx_tmJdGqI/AAAAAAAAE0A/BlqbXriRHJw/wlEmoticon-smile%5B2%5D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
dsq_thread_id:
  - 5542136091
categories:
tags:
  - VCS

---
Over the last couple days I took a stab at throwing my source code up into a [Google Code][1] repository. There are several options to choose from with regards to accessing your code base… “the Google” will host your code via either <a href="https://en.wikipedia.org/wiki/Mercurial" target="_blank">Mercurial</a> or <a href="https://en.wikipedia.org/wiki/Apache_Subversion" target="_blank">Subversion</a> standards… quickly browsing for recommendations, I felt like Subversion was better represented. and then quickly landed on the much recommend TortoiseSVN.&#160; <a href="https://TortoiseSVN" target="_blank">TortoiseSVN</a> adds Subversion related context menus to Windows Explorer (or whatever your preferred “Finder” equivalent is). Now when I wake up in the middle of the night with an the itch to toss an idea into my current project, I don’t have to suffer through firing up my corporate Vista (ugh) laptop, waiting for a VPN connection, waiting for the remote desktop to open up… I can just pop into my VS2010 project on my main desktop (always running) and check in some code that will be right there ready to merge back into my project when I get back to my desk at work. I’ve just started using it but I’ve been back and forth a couple times and its working.   
I think that’s pretty cool. Notes:

  * I was initially concerned about how peppy the interaction with a cloud hosted source library would be… after using it for about a year and a half now, I can confidently say that it’s not even an issue… you generally blast away on local work copies of your files so there’s no impact… then when you’re finally ready to send up some changes you hit “SVN Commit”… it does some obvious bit chugging over the wire for a few moments but not too bad and then you get a big list of what it plans on uploading to Google…then you hit OK and it chugs through that… so the time spent on source maintenance is well contained and makes sense… good time to take a breather  <img style="border-bottom-style: none; border-left-style: none; border-top-style: none; border-right-style: none" class="wlEmoticon wlEmoticon-smile" alt="Smile" src="https://lh4.ggpht.com/_XlySlDLkdOc/TLx_tmJdGqI/AAAAAAAAE0A/BlqbXriRHJw/wlEmoticon-smile%5B2%5D.png?imgmax=800" />
  * I believe Subversion works on more of a branch and merge methodology vs. exclusive checkout locks like I’m used to with VSS so I’ll have to see how that goes in practice. 
  * When you want to first connect your Google Code Repository with Tortoise, remember to simply select the “Checkout” context menu on your desired folder… it’ll prompt you for the SVN URL, login name (your Gmail address) & <a href="https://code.google.com/hosting/settings" target="_blank">special password found via this URL</a>. 

<img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" src="https://lh4.ggpht.com/_XlySlDLkdOc/TLx_uzu47KI/AAAAAAAAE0I/WJzXOdy_tu0/image%5B17%5D.png?imgmax=800" width="462" height="583" />

 [1]: https://code.google.com/p/itraacv2/source/browse/#svn/trunk