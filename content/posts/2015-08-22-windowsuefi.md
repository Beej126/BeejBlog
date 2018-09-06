---
title: Installing Windows in UEFI Mode
author: Beej
type: post
date: 2015-08-22T11:27:00+00:00
year: "2015"
month: "2015/08"
url: /2015/08/windowsuefi.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 1667649704978745398
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2015/08/WindowsUEFI.html
dsq_thread_id:
  - 5526321196
tags:
  - Hardware
  - Windows 8+

---
##### Motivation &#8211; Booting Windows in UEFI mode offers a couple mild advantages:

  1. it’s more compatible with Clover if you’re booting OS X this way already
  2. it’s supposedly the fastest boot sequence

##### For motherboard: **Gigabyte GA-X99-UD4**

#### Notes / Lessons Learned:

  * **Disconnect all other drives than the one installing to** 
      1. existing windows drives get targeted for reusing their boot partition and wouldn’t create [all 4 “ideal” GPT UEFI partitions][1] present on a cleanly installed drive (Recovery, System, [MSR][2], Primary)
      2. having my Mac Clover drive connected during these attempts allowed the setup utility to clobber my Clover boot with the Windows bootloader … 
          * reinstalling Clover via VMware OS X guest DID NOT put the UEFI Clover bootloader back in charge!
          * had to delete/rename efiwindows folder and only then did the old EFI option start showing back up on the "BBS” bios boot volume picklist (<kbd>F12</kbd>)
  * [Rufus][3] flash usb boot tool &#8211; for my mobo, wound up working best with **mbr** and **uefi-csm** (counter to prevalent recommendation)
  * what really seemed to matter was **putting the usb stick in a certain USB port!** i used the chassis USB header with 2x USB3 and 2x USB2… going from left to right it was the second USB3 port that worked; the left port most never did
  * BIOS settings 
      * **fast boot** didn’t seem to matter either on or off
      * **legacy usb** worked in **disabled** mode
      * worked with **“other OS”** selected
      * disabled [CSM][4] never worked &#8211; machine would not display bios after reboot (contrary to most UEFI guides' recommendation)

#### [To Confirm][5]:

##### from “WinPE” environment:

  * <kbd>Shift F10</kbd> to open command window
  * `wpeutil UpdateBootInfo`
  * `reg query HKLMSystemCurrentControlSetControl /v PEFirmwareType`
  * Looking for 0x2 = UEFI (0x1 = legacy)

##### from real Windows:

  * msinfo32.exe > System Summary > “BIOS Mode” – looking for “UEFI” (“Legacy” means not UEFI)

 [1]: https://www.tenforums.com/tutorials/1950-windows-10-clean-install.html
 [2]: https://en.wikipedia.org/wiki/Microsoft_Reserved_Partition
 [3]: https://rufus.akeo.ie/
 [4]: https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface#CSM_booting
 [5]: https://www.eightforums.com/tutorials/29504-bios-mode-see-if-windows-boot-uefi-legacy-mode.html