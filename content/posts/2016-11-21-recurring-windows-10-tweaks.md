---
title: Recurring Windows 10 Tweaks
author: Beej
type: post
date: 2016-11-21T16:54:01+00:00
year: "2016"
month: "2016/11"
url: /2016/11/recurring-windows-10-tweaks.html
dsq_thread_id:
  - 5557770469
snapEdIT:
  - 1
snapTW:
  - |
    s:240:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
  - Uncategorized
tags:
  - Windows 8+

---
once and for all 🙂

### Shortcuts for "Pin To Start"

%appdata%\Microsoft\Windows\Start Menu

### Start Menu right mouse (aka "Win+X" menu)

install [Win+X Menu Editor][1]

my faves:

| Name                       | Target                                                            |
| -------------------------- | ----------------------------------------------------------------- |
| Win+X Menu Editor          | C:\Users\beej1\Beej\bin\Win+X Menu Editor v2.7.0.0\WinXEditor.exe |
| Command Prompt             | C:\Program Files\ConEmu\ConEmu64.exe                              |
| Windows PowerShell         | powershell.exe                                                    |
| Edit Environment Variables | rundll32.exe sysdm.cpl,EditEnvironmentVariables                   |
| Uninstall Programs         | appwiz.cpl                                                        |
| Windows Features           | OptionalFeatures.exe                                              |
| Services                   | services.msc                                                      |
| Event Viewer               | eventvwr.msc                                                      |
| Device Manager             | devmgmt.msc                                                       |
| Disk Management            | diskmgmt.msc                                                      |
| Network Adapters           | C:\WINDOWS\explorer.exe ::{7007ACC7-3202-11D1-AAD2-00805FC1270E}  |
| Shared Folders             | fsmgmt.msc                                                        |
| Local Users                | lusrmgr.msc                                                       |

Stored in Reg here:
  
`KEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\ShellCompatibility\InboxApp`
  
&nbsp;

![image][2]

 [1]: https://winaero.com/download.php?view.21
 [2]: https://cloud.githubusercontent.com/assets/6301228/20513514/2b53af30-b03b-11e6-9512-4234409f5b0e.png