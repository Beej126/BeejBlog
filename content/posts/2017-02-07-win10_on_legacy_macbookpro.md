---
title: Updating 2006 MacBook Pro to Windows 10
author: Beej
type: post
date: 2017-02-07T09:36:50+00:00
url: /2017/02/win10_on_legacy_macbookpro.html
snap_isAutoPosted:
  - 1
dsq_thread_id:
  - 5529424931
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
  - Mac

---
There&#8217;s a fair amount of noise to wade through out there on this topic&#8230; this post is a humble gathering of the current state, cira February 2017&#8230; once we get the various bits lined up, it&#8217;s surprisingly smooth sailing with FULL compatibility under Windows 10 x64, even the latest &#8220;Anniversary Edition&#8221;&#8230; over 10 years later something as complex as Windows maintaining this much hardware compatibility is pretty amazing in our industry.

### My Specific Hardware

  * MacBook Pro 2,1 17&#8243; Late 2006, model A1212 &#8211; Core 2 Duo T7600 &#8220;Merom&#8221;

Hopefully these basic steps are still helpful to folks with similar oldness.

### Creating Bootable Win10 Install Media

_not as easy as one might think_ &#8211; this firmware is very finicky&#8230; USB Thumbdrive based boot is a complete no-go (everybody has tried, you won&#8217;t be the first : )&#8230; we must create a **very specifically formatted boot DVD**&#8230; but it&#8217;s not that bad

  1. **[Media Creation Tool][1]** &#8211; from any other working Win10 x64 you have handy, we get to start with MSFT&#8217;s very pleasant Windows 10 download utility&#8230; this will readily get us to an ISO file &#8230; but we&#8217;ll need to jack with a bit&#8230; 
  2. **&#8220;Multi-catalog&#8221; fix** &#8211; this era of Apple machines were born with a rather anemic version of 32 bit EFI which only supports a very specific DVD ISO format ([this guy had a good explanation under &#8220;How-to: Making a standard Linux distro ISO compatible with 32-bit EFI Macs&#8221;][2])&#8230; the gist is that MSFT tends to provide especially it&#8217;s x64 media via &#8220;Multi-catalog&#8221; ISO format, intended to support both &#8220;legacy&#8221; BIOS style booting as well as EFI&#8230; but our firmware is too brain dead and even though it&#8217;s kinda EFI, it can actually only handle BIOS style booting. 
      1. first go ahead and mount that stock ISO on your working Win10 box&#8230;
      2. then the reformat is accomplished via [oscdimg.exe][3] cmdline:
  
        `oscdimg.exe -n -m -be:\boot\etfsboot.com e:\ Win10_fixed.iso`
  
        (replace `e:` above with whatever drive letter is assigned to your mounted iso)
  3. **Burn Baby !!** &#8211; now we&#8217;re clear to go ahead and burn that resulting &#8220;Win10_fixed.iso&#8221; to a DVD (I&#8217;m keen on [ImgBurn][4]).

### Pretty Boot Selector Anyone ?

  * at this point we should be able to toss that DVD into our SuperDrive and power cycle while holding **<kbd>option</kbd>** to get the Mac&#8217;s native drive selection screen&#8230;
  * but to get a little more fancy, i&#8217;m keen on the [rEFInd Boot Manager][5] for a little more cute &#8220;OS selector&#8221; screen&#8230; easy steps: 
      1. From the Mac side, [download the latest zip][6]&#8230; extract&#8230;
      2. and then from Mac Terminal: `sudo ./refind-install`

<img src="https://cloud.githubusercontent.com/assets/6301228/24815086/cd160dc8-1b88-11e7-949d-8a9a2f0f8171.png" style="height: 200px; margin: 0 auto; display: block;" />

### Prep your partition and Install

  1. **Create New Partition** &#8211; if you don&#8217;t already have an existing BootCamp parition &#8211; for the record, nothing specifically depends on using Mac Bootcamp Assistant tool&#8217;s magic&#8230; it&#8217;s totally fair game to use standard [Mac Disk Utility to open a new partition][7] for Windows to be installed to
  2. **INSTALL** &#8211; we&#8217;re finally ready to insert the DVD, power cycle while holding <kbd>option</kbd> and select the DVD icon to begin installing! 
      * **BIG TIP**: make sure to <span class="hl">disconnect any additional hard drives prior to going into the Win10 install</span>&#8230; the installer is notorious for [jacking with other drives&#8217; boot sectors][8]
  3. (OPTIONAL) **Format Existing Partition** &#8211; after a couple prompts, you&#8217;ll get to the Win10 installer&#8217;s &#8220;partition selection&#8221; screen&#8230; if you&#8217;ve already got a previous Windows install, there&#8217;s a decision to be made&#8230; by default the installer will leave any previous Windows files on the drive under &#8220;windows.old&#8221; folder, to facilitate migrating your personal data&#8230; in my case, my drive is so small that i knew i had to format my existing BootCamp partition to provide all the room possible&#8230; this partition screen has handy options to do many basic partition maintenance tasks including format&#8230; 
      * if you&#8217;re OCD like me, you can even jump out to a CMD.EXE prompt via <kbd>SHIFT+F10</kbd> and do things like [DISKPART to format][9] with your preferred volume label (i&#8217;m keen on &#8220;BOOTCAMP&#8221;&#8230; <span class="hl">be very careful to select the right disk and volume before executing FORMAT</span>&#8230; DISKPART has zero safety rails.

### Post Install &#8211; Detailed driver links and notes

  1. **[Intel Chipset Drivers][10]** &#8211; given this mobo is [Core 2 Duo, ICH7 cira 2006][11], it most likely corresponds to Intel&#8217;s &#8220;900 series&#8221;&#8230; but there&#8217;s no real guesswork to be done here since the Intel chipset bundles cover a wide compatibility range and the most applicable one was last updated Version: 9.2.0.1030, Date: 4/21/2011&#8230; in my experience, chipset drivers can mean the difference between random crashes and rock solid stability so this install should not be skipped&#8230; if nothing else it tends to eliminate a lot of [Device Manager _red squigglies_][12]
  2. **Video** &#8211; ATI x1650 with DeviceId 71c5 &#8211; [Microsoft provides a bundle technically labeled for &#8220;ATI FireGL V5200&#8221;][13] but the corresponding INF files actually support many other related DeviceIds&#8230; make sure to go after the Win7 v8.561.0.0 bundle of the larger 20MB size (the smaller one didn&#8217;t hit for me)&#8230; 
      * <span class="hl">this is really the toughest piece to locate and get slammed in so, once you&#8217;ve got it nailed, the rest is all down hill =)</span>
  3. **BootCamp (v6)** &#8211; it appears this old model Mac hardware aligns with the drivers included with BootCamp as of v4&#8230; but it seems a few bits _might_ have been updated since then&#8230; so as one approach, start with installing v6 and then peanut butter the v4 bundle over that 
      * [BootCamp v4 & 5 are readily available via Apple Support][14] but v6 is not&#8230; if you have a working Mac install around, the Boot Camp Assistant (BCA) will download the latest bundle&#8230; in Sierra&#8217;s BCA it&#8217;ll be under the &#8220;Action&#8221; menu&#8230; I wound up with v6.0.6136 as of 2017-06-13.
      * If you don&#8217;t have access to BCA, I found [this helpful post][15] which referenced [direct Apple link to v6.0 build 6136][16]
      * unzip that BootCamp v6 rar exe and fire up $\Apple\BootCamp.msi (**as administrator** required)&#8230; this will blast thru loading a bunch of drivers&#8230; many of which won&#8217;t actually apply to this machine&#8217;s hardware but really no harm-no foul as an initial base layer&#8230; if nothing else, it&#8217;s nice to have the latest BootCamp Control Panel icon in your task tray =)
  4. **BootCamp v4** &#8211; now go back and fill in the following Win10 working drivers from BootCamp v4 bundle ([v4.0.4326][17], [direct][18]): 
      1. **Audio** = IDT SigmaTel (this&#8217;ll turn off the red light in the headphone jack : )
      2. **iSight** Web Cam
      3. **BlueTooth** &#8211; nothing kicked in till i ran Bluetooth &#8220;Enabler&#8221; Installer

## Nirvana!

  * if all goes well (doesn&#8217;t it always? ; ) you should have a clean Device Manager with ZERO red squigglies, along with fully working&#8230;
  * Hardware accelerated video
  * HiDef Audio
  * iSight WebCam
  * <s>BlueTooth</s> &#8211; spoke too soon&#8230; Bluetooth stack was present and superficially happy looking but wouldn&#8217;t successfully complete pairing with Apple Keyboard&#8230; fortunately i also had a spare Broadcom BCM20702 Bluetooth 4.0 USB dongle and it lit right up and worked straight away&#8230; i&#8217;m loosely going to chalk this up to Windows 10 not having all the bits aligned to go back to the Bluetooth 2.0 era. 
  * Working Sleep behavior via Lid Close, etc.
  * and Cute little BootCamp Control Panel tray icon

### Misc Bits

  * Macs like to run on their [Real Time Clock (RTC) corresponding to UTC][19]&#8230; so if we want to play along we can set our BootCamp Windows to do the same&#8230; just right mouse on your task tray clock into &#8220;Adjust date/time&#8221; flip off/on the &#8220;Set time automatically&#8221; toggle to force system clock to update after applying that reg setting

### It really does work! &nbsp;: )

![image][20]

 [1]: https://www.microsoft.com/en-us/software-download/windows10
 [2]: https://mattgadient.com/2016/07/11/linux-dvd-images-and-how-to-for-32-bit-efi-macs-late-2006-models
 [3]: http://www.sevenforums.com/attachments/general-discussion/32382d1256189124-make-bootable-iso-student-d-l-oscdimg.zip
 [4]: http://www.imgburn.com/index.php?act=Download
 [5]: http://www.rodsbooks.com/refind/index.html
 [6]: http://www.rodsbooks.com/refind/getting.html
 [7]: http://fgimian.github.io/blog/2016/03/12/installing-windows-10-on-a-mac-without-bootcamp/#partitioning-your-drive
 [8]: /2015/08/windowsuefi.html#NotesLessonsLearned
 [9]: https://social.technet.microsoft.com/Forums/windowsserver/en-US/ebc26d5d-09bc-43a6-a946-608c84d46f61/change-volume-label-of-system-volume?forum=winservercore
 [10]: https://downloadcenter.intel.com/download/20018/INF-Update-Utility-Primarily-for-Intel-6-5-4-3-900-Series-Chipsets-Zip-Format?product=1145
 [11]: https://en.wikipedia.org/wiki/List_of_Intel_chipsets#Core_2_chipsets
 [12]: http://images.techhive.com/images/article/2014/01/device-manager-100226208-orig.png
 [13]: http://www.catalog.update.microsoft.com/Search.aspx?q=v5200
 [14]: https://support.apple.com/en-us/HT205016
 [15]: https://digiex.net/threads/apple-windows-10-bootcamp-6-drivers-download-applebcupdate-exe-april-1st-2016.14828/
 [16]: http://swcdn.apple.com/content/downloads/16/10/031-55711/ufi4c7o3x20i5ge93l2yu869yegn222i8l/AppleBcUpdate.exe
 [17]: https://support.apple.com/kb/DL1636?locale=en_US
 [18]: http://support.apple.com/downloads/DL1636/en_US/BootCamp4.0.4326.zip
 [19]: http://superuser.com/questions/975717/does-windows-10-support-utc-as-bios-time
 [20]: https://cloud.githubusercontent.com/assets/6301228/22683281/1c793688-eccc-11e6-8ed6-c12c5034ab71.png