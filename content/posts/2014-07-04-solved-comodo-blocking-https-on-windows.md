---
title: '[SOLVED] Comodo v7 blocking HTTP/S and FTP/S on Windows 8.1 IIS 8.5'
author: Beej
type: post
date: 2014-07-04T16:19:00+00:00
year: "2014"
month: "2014/07"
url: /2014/07/solved-comodo-blocking-https-on-windows.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 6579097952946570384
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2014/07/solved-comodo-blocking-https-on-windows.html
blogger_thumbnail:
  - https://2.bp.blogspot.com/-mzHZ3srr9lM/U7bT6UaCUhI/AAAAAAAAFck/hMdJRaFnIpM/s1600/7-4-2014+12-17-55+PM.jpg
dsq_thread_id:
  - 5508631466
categories:
tags:
  - IIS
  - Networking
  - Security
  - Windows 8+

---
Besides opening incoming HTTP ports in the firewall via "Global Rules", the annoying thing for me to find was also adding an "Application Rule" for "Windows Operating System" on those same ports.

<a href="https://www.BeejBlog.com/wp-content/uploads/2014/07/7-4-2014-12-17-55-PM.jpg" imageanchor="1"><img border="0" src="https://www.BeejBlog.com/wp-content/uploads/2014/07/7-4-2014-12-17-55-PM.jpg" /></a>

Comodo v7.0.317799.4142

And [this guy][1] explains what's necessary for FTP very nicely...

  * in comodo > global settings > application rule &#8211; add 20,21 & 5000-6000 as allowed incoming TCP ports on "Windows Operating System"... you will also hopefully get prompted to allow svchost which is responsible for running the ftpsvc
  * on internet router &#8211; forward ports 20,21 and 5000-6000
  * in IIS FTP settings
  * require SSL
  * firewall support &#8211; put external wan address in&nbsp;
  * firewall support at \*SERVER\* level (not site) &#8211; set ports 5000-6000
  * point ftp site a folder
  * create login for ftp and make sure it has access to folder
  * <a href="https://manage.accuwebhosting.com/knowledgebase/941/FTP-Error-530-User-cannot-log-in-home-directory-inaccessible.html" target="_blank">when "</a>
<li style="display: inline !important;">
  <a href="https://manage.accuwebhosting.com/knowledgebase/941/FTP-Error-530-User-cannot-log-in-home-directory-inaccessible.html" target="_blank"></a><a href="https://manage.accuwebhosting.com/knowledgebase/941/FTP-Error-530-User-cannot-log-in-home-directory-inaccessible.html" target="_blank">Response: 530 User cannot log in, home directory inaccessible.&nbsp;</a>
</li>
<li style="display: inline !important;">
  <a href="https://manage.accuwebhosting.com/knowledgebase/941/FTP-Error-530-User-cannot-log-in-home-directory-inaccessible.html" target="_blank">Error: Critical error: Could not connect to server</a>"
</li>
<a href="https://manage.accuwebhosting.com/knowledgebase/941/FTP-Error-530-User-cannot-log-in-home-directory-inaccessible.html" target="_blank"><br /></a></ul> </ul> 

  * filezilla settings
  * require explicit ftp over tls</ul>

 [1]: https://grantcurell.com/2013/12/31/failed-to-retrieve-directory-listing-filezilla-connecting-to-iis-behind-nat/