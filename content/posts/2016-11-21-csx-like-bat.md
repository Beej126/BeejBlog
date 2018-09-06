---
title: Launch .CSX as conveniently as .BAT files
author: Beej
type: post
date: 2016-11-22T05:33:56+00:00
year: "2016"
month: "2016/11"
url: /2016/11/csx-like-bat.html
snapEdIT:
  - 1
snapTW:
  - 's:162:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5540890490
categories:
  - Uncategorized
tags:
  - CmdLine

---
first, get [Chocolatety][1] if you don't already have... killer handy

    @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    

then make sure you have a .csx runner... either [ScriptCS][2] or [csi.exe][3] starting with Visual Studio 2015 update 3

    choco install ScriptCS
    

setup the .csx to runner file association

    assoc .csx=CSharpScript
    ftype csharpscript=C:\ProgramData\chocolatey\bin\scriptcs.exe %1 -- %~2
    

_%~2 means all args starting with #2... see [ftype docs][4] for more_

_FYI for [TCC LE][5] folks, apparently i've stumbled into a rare backwards compatibility gap... TCC LE doesn't seem to support the %~2 syntax like cmd.exe and it escapes "%" differently, so substitute that portion of the ftype line above with "%%1 &#8212; %%2 %%3 %%4"_

lastly, edit your PATHEXT system environment variable to include .CSX which allows us to leave off the extension to launch our scripts just like native commands! =)

    setx PATHEXT %PATHEXT%;.CSX /M
    refreshenv.cmd
    

TCC LE requires OPTION > Startup > PathExt for the above to work

_refreshenv comes from Chocolately... it refreshes the current command line environment from registry, which we just updated via setx_

or runas admin > `C:\Windows\System32\rundll32.exe sysdm.cpl,EditEnvironmentVariables`
  
![image][6]

with all that fun stuff in place, we can finally do something nifty like this:

    C:\> myCSXScript arg1 arg2
    

## beautiful! =)

[see my other CSX examples][7]

 [1]: https://chocolatey.org/install
 [2]: https://scriptcs.net/
 [3]: file://C:/Program+Files+(x86)/MSBuild/14.0/Bin
 [4]: https://technet.microsoft.com/en-us/library/bb490912.aspx
 [5]: https://jpsoft.com/tccle-cmd-replacement.html
 [6]: https://cloud.githubusercontent.com/assets/6301228/20498893/cd6d1340-afe3-11e6-9703-d0dddee7723a.png
 [7]: /?s=csx