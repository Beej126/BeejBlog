---
title: 'Easy *Native* Windows Self Extracting EXE Builder (SFX)'
author: Beej
type: post
date: 2017-08-10T20:21:25+00:00
url: /2017/08/easy-native-windows-self-extracting-exe-builder-sfx.html
dsq_thread_id:
  - 6056896687
categories:
  - Uncategorized
tags:
  - SysAdmin

---
This is an oldie but goody... the gist is that even latest Windows 10 still ships with working IExpress.exe which is a self extracting exe builder! Who knew.
<!--more-->

In my case, very handy for bundling a batch file and it's dependencies into a single exe for a buddy.

For the record, I started out with 7zip's SFX facility and eventually got it working but it's a bit more clunky... besides the steps required to build an auto launch exe, you'll get a mildly undesirable "Program Compatibility Assistant" "This program might not have installed correctly" warning... the IExpress generated exe doesn't seem to have this issue.

Launching IExpress.exe without any args will present the wizard which will walk you through building a "SED" config file with several commonly desired "setup.exe" options like user confirmation prompt, etc... importantly, this includes specifying a batch file you wish to be launched after extract.

Handy batch for recreating exe whenever you update your script:
``` cmd
::start sets appropriate working directory
::especially crucial when launched as admin (which normally defaults to c:\windows\system32)
::and allows us to use relative file references in the SED config file so that launching from any path works (including UNC)
    
start "Title" /d"%~dp0" iexpress /n Project.sed
```    

## Tips

  * The program to be launched can indeed be a .BAT/.CMD
  * The IExpress SED wizard will hard code paths, just edit afterwards and remove to be relative. It works.
  * This would of course work for PowerShell or any other script that can be launched via its runner, either bundled in the EXE or native, e.g. [ScriptCS][1]

 [1]: http://scriptcs.net/