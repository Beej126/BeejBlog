---
title: 'SQL Server – [SOLVED] “Unable to initialize SSL encryption because a valid certificate could not be found, and it is not possible to create a self-signed certificate."'
author: Beej
type: post
date: 2012-02-11T18:44:00+00:00
url: /2012/02/sql-server-solved-unable-to-initialize.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4877657592610546154
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2012/02/sql-server-solved-unable-to-initialize.html
blogger_thumbnail:
  - http://lh6.ggpht.com/-GWYFCTiBYhs/Tza6-xQQACI/AAAAAAAAFB0/3XcFzrprRBg/Snap3%25255B6%25255D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:244:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:19:"%TITLE% - %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
dsq_thread_id:
  - 5508631624
categories:
  - Uncategorized
tags:
  - Database

---
### TL;DR

Generate an appropriate certificate ([see below][1]) and plug it into `SQL Server Configuration Manager > SQL Server Network Configuration > Protocols for {instance_name} > Properties > Certificate > Certificate`

![Install Cert][2]

### [TS;WM][3]

I read through dozens of folks wrestling with this issue and various suggested remedies (reinstalling, sysprep, etc) yet I found none addressing the certificate error directly in this way … so it seems worth getting this message out there.

### Root Cause

For me, my SQL Server 2008 R2 (v10.50.1600.1) install went wonky (ran into some group policy brick walls) and somehow the default self-signed certificate must've gotten wiped out. Interestingly, on other servers where the install ran without issue, this certificate entry is also blank… so that tells me we’re fortunate SQL Server is able to utilize this new one we throw in.   
<a name="cert"><i class="fa fa-anchor"></i></a>

### How to get an appropriate cert

One fairly straight shot at generating self-signed certs is with "SelfSSL.exe" from the [IIS 6.0 Resource Kit Tools][4]. Here's example command line usage:

    SelfSSL /N:CN={database server name} /V:1999999
    

  * If you're not already familiar with certs, the name following "/N:CN=" above <span class="hl">must EXACTLY match the "network" name of the machine you're installing it to</span>... otherwise it gets hidden or rejected at various levels... for example, it won’t show up in SQL Server Configuration Manager’s certificate drop down list… this name should be the “FQDN” (Fully Qualified Domain Name) aka Canonical Name... typically the “Full Computer Name” as listed under `Control Panel > System`.
  * The /V option is the #days the cert is valid for... it appears 1999999 is the max allowed… that currently pushes expiration out to the year 7487, which will hopefully last ya ;)
  * Note: SelfSSL often spews “Error opening metabase: 0x80040154” … This would probably be bad news if you wanted to use this certificate for IIS SSL but apparently it’s not a factor for SQL Server SSL.
  * Examine the certificates that have been generated this way by launching CertMgr.msc from <kbd>Win+R</kbd> and looking into the “Personal” certificate store... or if that doesn't exist, launch MMC.exe, <kbd>CTRL+M</kbd> to add the "Certificates" snap in and select “Computer account”.

![Snap1][5]

In a blatant attempt to cast a wide net on search hits, here’s a typical sql log that’ll be spewed along with the aforementioned error:

| timestamp              | type   | message                                                                                                                                                                                           |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2012-02-10 09:57:09.07 | Server | Initializing the FallBack certificate failed with error code: 1, state: 1, error number: -2146893802.                                                                                             |
| 2012-02-10 09:57:09.08 | Server | Unable to initialize SSL encryption because a valid certificate could not be found, and it is not possible to create a self-signed certificate.                                                   |
| 2012-02-10 09:57:09.08 | Server | Error: 17182, Severity: 16, State: 1.                                                                                                                                                             |
| 2012-02-10 09:57:09.08 | Server | TDSSNIClient initialization failed with error 0x80092004, status code 0x80. Reason: Unable to initialize SSL support. Cannot find object or property.                                             |
| 2012-02-10 09:57:09.08 | Server | Error: 17182, Severity: 16, State: 1.                                                                                                                                                             |
| 2012-02-10 09:57:09.08 | Server | TDSSNIClient initialization failed with error 0x80092004, status code 0x1. Reason: Initialization failed with an infrastructure error. Check for previous errors. Cannot find object or property. |
| 2012-02-10 09:57:09.09 | Server | Error: 17826, Severity: 18, State: 3.                                                                                                                                                             |
| 2012-02-10 09:57:09.09 | Server | Could not start the network library because of an internal error in the network library. To determine the cause, review the errors immediately preceding this one in the error log.               |
| 2012-02-10 09:57:09.09 | Server | Error: 17120, Severity: 16, State: 1.                                                                                                                                                             |
| 2012-02-10 09:57:09.09 | Server | SQL Server could not spawn FRunCM thread. Check the SQL Server error log and the Windows event logs for information about possible related problems.                                              |

 [1]: #cert
 [2]: //lh6.ggpht.com/-GWYFCTiBYhs/Tza6-xQQACI/AAAAAAAAFB0/3XcFzrprRBg/Snap3%25255B6%25255D.png?imgmax=800 "Snap3"
 [3]: https://twitter.com/thinkglobally/status/783435120145346560
 [4]: http://www.microsoft.com/download/en/confirmation.aspx?id=17275
 [5]: //lh4.ggpht.com/-o7bEJ_P9Hlk/Tza6_lHroPI/AAAAAAAAFCM/kZbUN1QgPbQ/Snap1%25255B13%25255D.png?imgmax=800 "Snap1"