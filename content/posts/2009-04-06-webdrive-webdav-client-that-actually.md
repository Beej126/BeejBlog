---
title: WebDrive (WebDAV client… that actually works!)
author: Beej
type: post
date: 2009-04-07T06:35:00+00:00
year: "2009"
month: "2009/04"
url: /2009/04/webdrive-webdav-client-that-actually.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 3551289152061271271
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 1
blogger_permalink:
  - /2009/04/webdrive-webdav-client-that-actually.html
blogger_thumbnail:
  - https://lh6.ggpht.com/_XlySlDLkdOc/SdqRvnBRMqI/AAAAAAAACs0/Og8icqoaIUc/image%5B22%5D.png?imgmax=800
dsq_thread_id:
  - 5508631465
snapEdIT:
  - 1
snapTW:
  - |
    s:195:"a:1:{i:0;a:7:{s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";
categories:
tags:
  - IIS
  - Software

---
i was having a heck of a time trying to get “net use * [https://myhost.com][1]” type WebDAV client mounts to connect… all that would ever work would be [https://localhost][2] … nothing i tried would connect to my WAN ip… always something like “System error 5… access is denied”… then i thought, ah what the heck, gotta google it… and sure enough… loaded the trial of <a href="https://www.webdrive.com/products/webdrive/index.html" target="_blank">WebDrive from South River Technologies</a> simple little gui popped up, hit ok and two seconds later i was sitting on a W: drive in explorer… Right Mouse > New > Text Document worked, so i had write capability… obviously i had to twiddle some bits on the IIS end too but that was mainly just a matter following any <a href="https://learn.iis.net/page.aspx/350/installing-and-configuring-webdav-on-iis-70/" target="_blank">typical IIS WebDAV walkthrough guide</a>… cool, $60 for a one off license is reasonable…oh yeah, it’ll also map a drive letter to an FTP Server, Amazon S3 and SharePoint… i leave you with… ahhhhh yes the logo
  
[<img alt="image" border="0" src="https://lh6.ggpht.com/_XlySlDLkdOc/SdqRvnBRMqI/AAAAAAAACs0/Og8icqoaIUc/image%5B22%5D.png?imgmax=800" height="116" style="border-bottom-width: 0px; border-left-width: 0px; border-right-width: 0px; border-top-width: 0px; display: inline;" title="image" width="173" />][3]
  
UPDATE: plain vanilla “net use…” command worked straight away from an XP machine at work… so the security bits somehow weren’t lined up to let me be a WebDAV client on the Windows 7 instance i was testing with as my WebDAV IIS host… moving along…nothing to see here ;)
  
UPDATE 2: still gotta hand it to WebDrive… plain vanilla “net use” mounted WebDAV drives are running through Microsoft’s “WebDAV redirector” layer (aka the “WebClient” NT Service)… and it does work for small files, but large files (e.g. 250MB) tend to go off in lala land while doing the transfer (i.e. progress bar was useless) and failed consistently… WebDrive has a much more robust caching/chunky upload facility with a slick UI that shows actual progress bar… it did still fail after multiple attempts of my big test file so i had to split up into smaller chunks (e.g. 30MB) but the progress visibility WebDrive provides along with automatic retries is definitely worth something.

 [1]: https://myhost.com/
 [2]: https://localhost/
 [3]: https://www.webdrive.com/products/webdrive/index.html