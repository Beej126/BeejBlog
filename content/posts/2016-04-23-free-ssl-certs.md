---
title: Free SSL Certs
author: Beej
type: post
date: 2016-04-23T20:10:59+00:00
url: /2016/04/free-ssl-certs.html
categories:
  - Uncategorized
tags:
  - Networking
  - Security

---
[LetsEncrypt.org][1] is a wonderfully progressive initiative... free certs for all, to promote better internet security, nice!
  
&nbsp;

this [windows tool][2] made quick work of plugging it into IIS vs the more unix'y stuff they suggest on their home page
  
literally just seconds to launch the win tool and hitting a key to select which IIS site you want the cert for... none of the ol' CSR hassle, yay!
  
&nbsp;

Tips:

  * your web server has to be reachable on the public internet at the domain url (port 80) you wish to gen the cert for
  * the win tool will be most automatic when you plug your domain into the host-header (port 80)

Note: The LetEncrypt certs come set to expire in 90 days &#8211; BUT, the windows tool schedules a recurring task to reach out and automatically renew the certs before that expiration. Pretty slick... will have watch if that actually works come time.
  
&nbsp;

![][3]

 [1]: https://letsencrypt.org/
 [2]: https://github.com/Lone-Coder/letsencrypt-win-simple/releases
 [3]: https://4.bp.blogspot.com/-Tv2dQID6uy0/VyzFs5QhGuI/AAAAAAAAUGo/7OIzf8z-Y1gE2hxQVHP5gfVyFlJSr8RiwCLcB/s1600/RDS%2BMods%2BRound%2B2_Page_02_Image_0001.png