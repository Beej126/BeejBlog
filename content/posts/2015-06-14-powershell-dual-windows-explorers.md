---
title: PowerShell Dual Windows Explorers
author: Beej
type: post
date: 2015-06-15T01:14:00+00:00
year: "2015"
month: "2015/06"
url: /2015/06/powershell-dual-windows-explorers.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 128197263314292581
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2015/06/powershell-dual-windows-explorers.html
blogger_thumbnail:
  - https://4.bp.blogspot.com/-NtEZUIcuaLQ/Vo4r9rJ8x3I/AAAAAAAAR84/3SAxaVZOGas/s1600/Snap2.png
dsq_thread_id:
  - 5515123033
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
  - Highlights
tags:
  - PowerShell
  - Productivity

---
&nbsp;

Nutshell: Hosting **two Windows File Explorers** inside a WinForm... with the potential of sprinkling some utility hotkeys on top &#8211; e.g. "copy from left to right".

&nbsp;

# [Full source on GitHub][1]

![][2]
  
&nbsp;

Highlights:

  * Always wanted to try this and just finally got around to it... and it actually works to a decent degree.
  * This is of course well covered ground with various other [file managers][3]... i just wanted to see if you could do it this poor man's way with PowerShell driving... so one could readily make it one's own with further customizations
  * I was a longtime fan of Directory Opus... I think it's significant that this meager alternative is customized via standard PowerShell vs a 3rd party scripting environment that must be learned... i.e. if you happen to already know PowerShell, you can jump right in with all that file handling power available
  * The obnoxious part is hunting down the COM interfaces necessary to pull stuff out of FileExplorer... it dips into silliness like how IE is somehow part of the equation.
  * See comments for all the good posts i drew from to cobble it together... lots of handy Shell programming nuggets to be had
  * thanks to a [handy github project][4], [Font-Awesome][5] is now in the WinForms domain &#8211; too cool
  * notes to self 
      * interop.SHDocVw.dll is generated from doing a&nbsp;Visual Studio&nbsp;reference to C:\windows\system32\shdocvmw.dll
      * interop.Shell32.dll seemed like it was going to come in handy but didn't wind up being necessary
      * these are the only real FileExplorer API calls necessary for the CopyFile piece 
          * $objFolder = $objShell.NameSpace($explorerRight_SHDocVw.LocationUrl)
          * $objFolder.CopyHere($explorerLeft_SHDocVw.Document.SelectedItems())
      * there are a few wacky interfaces behind the shell objects but the neat thing is that runtime dynamic type binding makes using real types largely irrelevant... i feel that does lose some self documentation in the balance so i've tried to include the pertinent interfaces in the comments for future reference and expansion

 [1]: https://github.com/Beej126/PoShDualExplorers
 [2]: https://www.BeejBlog.com/wp-content/uploads/2015/06/Snap2-1024x699.png
 [3]: https://lifehacker.com/399155/five-best-alternative-file-managers
 [4]: https://github.com/denwilliams/FontAwesome-WindowsForms
 [5]: https://fortawesome.github.io/Font-Awesome/icons/