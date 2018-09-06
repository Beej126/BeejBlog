---
title: '[SOLVED] Acer Aspire One won’t boot Syslinux USB thumbdrive'
author: Beej
type: post
date: 2013-08-27T21:25:00+00:00
year: "2013"
month: "2013/08"
url: /2013/08/solved-acer-aspire-one-wont-boo.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 5711237384493192227
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2013/08/solved-acer-aspire-one-wont-boot.html
dsq_thread_id:
  - 5642392447
tags:
  - CmdLine
  - Hardware
  - Security
  - SysAdmin

---
Looks like my particular issue was the default partition size on my 16GB thumbdrive. Once I formatted the USB with a 2GB partition and installed Syslinux to that, it booted up right away where previously it would hang on the first “Syslinux Copyright Peter Anvin” message. More details: 

  * Acer Aspire One model#: 722-C62bb (looks like this is an 11” model) 
  * Always handy to have another computer to work from (for web searching, trial and error formats on the USB drive, etc) when trying to fiddle with boot issues on another… my other computer is a Win8 desktop. 
  * Syslinux actually came into my picture because I was looking to create Comodo’s Rescue Disk. Comodo (v6.2) has a convenient point and click process to push their linux based rescue disk to a USB. 
  * I used diskpart (on my Win8 box) to create the smaller partition… here’s the core commands: 
      * list vol (to get a feel for your windows drive letters and not format the wrong one 🙂 
      * list disk (same for raw physical disks) 
      * select disk X (MAKE SURE YOU CHOOSE THE RIGHT ONE!!) 
      * (MAKE SURE AGAIN) 
      * clean (THIS WIPES THE DISK!!!) 
      * create part primary size=2048 (2GB worked for me in this context) 
      * active 
      * format fs=fat label=”COMODO” quick (I chose old school FAT filesystem looking for most downlevel compatibility, not sure if it was actually necessary vs FAT32. NTFS is notably the least compatible option for linux booting. Quick means do a quick format.) 
  * Then I just let Comodo do it’s thing and that result booted up right away for me – yay 🙂