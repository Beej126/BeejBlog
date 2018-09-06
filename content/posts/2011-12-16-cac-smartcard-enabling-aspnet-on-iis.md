---
title: CAC (SmartCard) Enabling ASP.Net on IIS
author: Beej
type: post
date: 2011-12-16T16:31:00+00:00
year: "2011"
month: "2011/12"
url: /2011/12/cac-smartcard-enabling-aspnet-on-iis.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 9002148795918164479
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 2
blogger_permalink:
  - /2011/12/cac-smartcard-enabling-aspnet-on-iis.html
blogger_thumbnail:
  - https://lh4.ggpht.com/-wI03RdKtKWs/TusB39wZG-I/AAAAAAAAE9Y/mCLHvs8_Fzg/image_thumb%25255B5%25255D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:174:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";
dsq_thread_id:
  - 5508631479
categories:
  - Uncategorized
tags:
  - DotNetFramework
  - IIS
  - Security

---
  * The only configuration settings required are (IIS7 screenshots below): 
      * Require SSL (this represents server side) 
      * and either Accept or Require Client Certificates … “Accept” will populate the SmartCard’s cert info to your ASP.Net Request object (if it’s provided) but won’t deny access if one hasn’t been provided, “Require” will deny access unless a valid SmartCard Cert has been provided. 

Tips:

  * One key thing to be aware of how this works is that the server will send a list of Trusted Root Certificates down to the client/browser and then the browser will compare that list to the Trusted Roots represented by the CAC present and only if there’s a match will it prompt for the Certificate and PIN input.&#160; Therefore, both the Server and the client must have the same Trusted Root Certs installed for this to work, the easiest way to do this for the DoD CAC’s is to grab the latest install_root.exe and fire that up. 
      * DoD root certs: [https://iase.disa.mil/pki-pke/function_pages/tools.html#trust][1] 
  * Another key thing I discovered was that after you get the certs installed, go ahead and do a reboot, I was still getting 403 access denied errors that simply disappeared after I rebooted. 
  * Throw these lines in a ASP.Net wizard generated project’s Default.aspx to see the basic Cert info… the .Subject property is the juiciest looking info, there may be other properties of value. 
      * <%=Page.Request.ClientCertificate.IsPresent%> 
      * <%=Page.Request.ClientCertificate.Subject%> 
  * It’s probably also helpful to go ahead and make sure your server side SSL cert is properly named & not expired, such that you don’t get any warnings when you browse to the page… I was getting some errors related to that when I was working with the Client Cert’s required.
  * <a href="https://www.sslshopper.com/article-how-to-create-a-self-signed-certificate-in-iis-7.html" target="_blank">this reference was helpful</a>, see the section titled “Generate a Self Signed Certificate with the Correct Common Name”
  * this is the basic command you need to generate your own SSL cert for testing: SelfSSL /N:CN=www.whatever.com /V:9999
  * find SelfSSL in the <a href="https://www.microsoft.com/download/en/confirmation.aspx?id=17275" target="_blank">IIS6 Reskit</a>

[<img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://lh4.ggpht.com/-wI03RdKtKWs/TusB39wZG-I/AAAAAAAAE9Y/mCLHvs8_Fzg/image_thumb%25255B5%25255D.png?imgmax=800" width="496" height="379" />][2]&#160;[<img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="https://lh5.ggpht.com/-gQf1ZE4EC0I/TusB5IFd5OI/AAAAAAAAE9o/hBD5diMpub4/image_thumb%25255B3%25255D.png?imgmax=800" width="481" height="215" />][3]

 [1]: https://iase.disa.mil/pki-pke/function_pages/tools.html#trust "https://iase.disa.mil/pki-pke/function_pages/tools.html#trust"
 [2]: https://lh3.ggpht.com/-KJPMlhOZEAY/TusB3J87fjI/AAAAAAAAE9U/3Lsup3GXUEo/s1600-h/image%25255B11%25255D.png
 [3]: https://lh6.ggpht.com/-S_lF7eqlF0s/TusB4TtN-lI/AAAAAAAAE9g/ZJ-3_bI61Aw/s1600-h/image%25255B7%25255D.png