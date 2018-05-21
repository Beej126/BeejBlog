---
title: Fixing OpenSSL on WordPress Windows PHP 5.6+
author: Beej
type: post
date: 2017-01-31T08:03:24+00:00
url: /2017/01/fixing-openssl-on-wordpress-windows-php-5-6.html
snap_isAutoPosted:
  - 1
dsq_thread_id:
  - 5508678036
snapEdIT:
  - 1
snapTW:
  - |
    s:218:"a:1:{i:0;a:8:{s:9:"timeToRun";s:0:"";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";
categories:
  - Uncategorized
tags:
  - Blogging
  - PHP
  - Security
  - WordPress

---
### Background:

i ran into OpenSSL errors during the Disqus plugin setup.
  
there's tons of hits suggesting various solutions, below is the very simple solution that worked for me...

### Sample error messages:

`SSL routines:SSL3_GET_SERVER_CERTIFICATE:certificate verify failed<br />
Failed to enable crypto in ...`

### TL;DR:

  1. download latest [cacert.pem][1]
  2. place it in a pertinent folder (e.g. $\wp-includes\certificates)
  3. edit your php.ini > `openssl.cafile={full path to cacert.pem}`

 [1]: https://curl.haxx.se/ca/cacert.pem