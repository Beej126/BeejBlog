---
title: '[SOLVED] Bare CNAME with MX record'
author: Beej
type: post
date: 2016-06-24T23:32:49+00:00
url: /2016/06/solved-bare-cname-with-mx-record.html
dsq_thread_id:
  - 5576413198
categories:
  - Uncategorized
tags:
  - Networking

---
just thought i'd throw this out into the interwebz since it seems to be such a well known _no-can-do_ that is actually a very handy can-do (where applicable)...

## Background

DNS admin warnings advise against doing a "bare" (no prefix) CNAME along with an MX record, [example][1]
  
![][2]

## Disclaimer

What i'm successfully demonstrating here is <span class="hl">clearly non-standard according to the specs</span>...
  
however, i've proven it does work for SOME servers implementation of the standards (including major provider Office 365 on the MX side) so it's worth trying with your servers if this provides a convenient solution for your needs... and it will be immediately verifiably working or not; no "sometimes" ambiguity to worry about.

## Solution

Very simple &#8211; just try <span class="hl">positioning the MX record <strong>ABOVE</strong> the CNAME in the record order</span>, e.g.
  
![][3]

along with a happy O365 MX record (sorry i can't slam dunk it with showing actual host names, you'll have to trust me that it really did work and i didn't make this up)
  
![][4]

I've found this "[MX ToolBox][5]" to be loads of help for double checking the various DNS responses:
  
[![][6]][5]

Cheers!

 [1]: http://serverfault.com/questions/91712/dns-using-cnames-breaks-mx-records
 [2]: https://4.bp.blogspot.com/-EX8xIk73SrQ/V23CuW3XcuI/AAAAAAAAUf8/Slmk0rcv_BUdDaNdXuL5D2q3zbjjDNzMgCLcB/s1600/Snap6.png
 [3]: https://3.bp.blogspot.com/-IhItJNP5Bbo/V23AogkK4GI/AAAAAAAAUfk/1jjN9V6i3HcETzDgT_K3CNxFP5ckwrxYQCLcB/s1600/Snap10.png
 [4]: https://4.bp.blogspot.com/-V-NtQcXicxI/V23BwygW8RI/AAAAAAAAUfw/GX8FW1u0kjEcO_i9L4RY6tZj_5oNgjzvACLcB/s1600/Snap13.png
 [5]: http://mxtoolbox.com/SuperTool.aspx
 [6]: https://4.bp.blogspot.com/-xvnPFf21yds/V23EHlqRblI/AAAAAAAAUgI/gpln4Q-0mpAiAh8pRsU9nXx5i-Dl9liNACLcB/s1600/Snap14.png