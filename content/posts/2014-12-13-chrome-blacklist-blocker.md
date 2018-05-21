---
title: Chrome Blacklist Blocker (PowerShell)
author: Beej
type: post
date: 2014-12-14T05:31:00+00:00
url: /2014/12/chrome-blacklist-blocker.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 6715127496823372847
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2014/12/Chrome-Blacklist-Blocker.html
dsq_thread_id:
  - 5521600624
categories:
  - Uncategorized
tags:
  - PowerShell
  - Security

---
If you need this, you'll know why ;)

Save <a href="https://raw.githubusercontent.com/Beej126/PowerShell/master/ChromeBlacklistBlocker/ChromeBlacklistBlocker.ps1" target="_blank">ChromeBlacklistBlocker.ps1</a> somewhere local.

You can run it via right mouse > "Run with PowerShell".
  
<strike>It will dump out some event text whenever it notices a registry change.</strike>
  
(this is currently commented out and latest code hides the powershell console window after launch)

Or more permanently, put a shortcut like this into your "shell:startup" folder:
  
`powershell.exe -ExecutionPolicy Bypass {path}ChromeBlacklistBlocker.ps1`

It will monitor the HKLMSoftwarePolicies registry branch and delete the value named "1" under GoogleChromeExtensionInstallBlacklist.
  
This value is specific to my scenario but is of course editable to your specific needs.

You can test it is working by creating the "1" value yourself and it should disappear.

Another good way to test is to fire gpupdate.exe force a group policy update &#8211; again, if you need this, that should make sense 🙂

More Google search keywords: block registry key