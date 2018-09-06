---
title: PHP7 Debugging under Visual Studio 2015
author: Beej
type: post
date: 2016-04-23T21:35:39+00:00
year: "2016"
month: "2016/04"
url: /2016/04/php7-debugging-under-visual-studio-2015.html
snapEdIT:
  - 1
snapTW:
  - 's:166:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:19:"%TITLE% - %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5508903539
categories:
  - Uncategorized
tags:
  - PHP

---
1. I suggest installing PHP7 through the IIS Web Platform Installer so it does the Handler Mapping vs having to mess with that manually (i.e. assigning PHP extension to php-cgi.exe) &#8211; but there's a lot of guides out there for doing that yourself if you want.

2. That'll probably leave you with a slightly older version so then just go [install latest PHP7 bits](https://windows.php.net/download#php-7.0) over the top &#8211; we want the **non-thread-safe (NTS)** builds when running **under IIS FastCGI** (supposedly the most performant approach)
3. I recommend $pringing for [PHP Tools for Visual Studio](https://www.devsense.com/) which provides comforts like Intellisense and PHP project templates... and it conveniently **configures the necessary XDebug debugging settings for us** which seemed obscure when i initially went looking, but turns out are just some easy php.ini settings shared below.
4. so basically you just launch your site in Visual Studio debug (<kbd>F5</kbd>) and PHP Tools will ask you if you want it to configure debugging for you... the brief wrinkle here is that it then went off and installed/configured PHP_5_.x... hence the main reason I'm posting this &#8211; to affirm we can then indeed just go copy the pertinent settings from the PHP5.ini to our PHP7.ini...
5. if you go look at the php5.ini that PHP Tools set up you'll see the following settings added at the bottom (for me it went under: C:\Program Files (x86)\iis express\PHP\v5.6&#41;:
  ```ini
  [XDEBUG]
  zend\_extension="C:\Program Files (x86)\IIS Express\PHP\v5.6\ext\php\_xdebug.dll"
  xdebug.remote_enable = on
  xdebug.remote_handler = dbgp
  xdebug.remote_host = 127.0.0.1
  xdebug.remote_port = 9000
  xdebug.remote_mode = req
  ```

6. so then we need to go get [xdebug for php7](https://xdebug.org/download.php) (again, the non-thread-safe version) and drop that DLL into your "PHP7\ext" folder (mine was here: C:\Program Files\PHP\v7.0\ext)
7. and lastly just copy/paste those same settings into php7.ini **and tweak the xdebug path**

Now you can go set breakpoints and step debug! yay :)
  
Check out your web project properties page and you can see how PHP5 vs PHP7 is chosen as the runtime, easy peasy!
  
![](https://4.bp.blogspot.com/-Tw53GpKe6q8/VxvtTqx9yII/AAAAAAAATos/0Kk7cDML_zo5WgvA2bwNtfZGZnzWtAu_ACLcB/s1600/Snap1.png)
  
**Last note**: I had some screwy behavior where certain files wouldn't take breakpoints but would still step thru if I broke in a different file earlier in the call stack... I think this went away after restarting VS and/or making sure i had a clean rebuild.
