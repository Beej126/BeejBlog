---
title: Nuget Cheatsheet
author: Beej
type: post
date: 2017-03-02T03:58:03+00:00
url: /2017/03/nuget-cheatsheet.html
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:218:"a:1:{i:0;a:8:{s:2:"do";i:0;s:9:"timeToRun";s:0:"";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
dsq_thread_id:
  - 5596156347
categories:
  - Uncategorized
tags:
  - VisualStudio
  - WebDev

---
| tip                                     | command line                                                                                                                                               |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uninstall all packages matching pattern | `get-package | ? {$_.Id -like "Human*" } | % { uninstall-package $_.id }` <sup id="fnref-1785-1"><a href="#fn-1785-1" class="jetpack-footnote">1</a></sup> |

<li id="fn-1785-1">
  speaking of Humanzier, just install Humanizer.Core to get English only&#160;<a href="#fnref-1785-1">&#8617;</a> </fn></footnotes>