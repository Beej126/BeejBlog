---
title: Android Emulator Nuggets
author: Beej
type: post
date: 2017-05-09T00:22:52+00:00
url: /2017/05/android-emulator-nuggets.html
dsq_thread_id:
  - 5799344857
categories:
  - Uncategorized
tags:
  - Android

---
### Installing Google Play

  * This worked very nicely minimally for Android v7.1.1 "with Google APIs"...
  * Need to launch emulator.exe with `-writable-system -selinux permissive` args
  * grab the version of [OpenGapps][1] you want
  * Basically follow [this guide][2] but stop at "Restarting and Creating another Image" 
      * Then `adb root & adb remount`
      * and I found that I just needed to `adb shell mkdir /system/priv-app/Phonesky & adb push Phonesky.apk /system/priv-app/Phonesky` not the other priv-apps
  * and I also didn't have to create a new image vs simply rebooting

### Root

#### one time

  * Grab [SuperSU Recovery Download][3] and extract "su"
  * `adb root & adb remount`
  * `adb push su /system/xbin/`
  * `adb shell chmod a+x /system/xbin/su`

#### create .cmd script for each launch

  * `{path}\emulator.exe -avd Nexus_9_API_25 -writable-system -selinux permissive`
  * `adb wait-for-device & adb root & adb remount & adb shell "su -ad &"` 
      * -ad stands for auto-daemon and just sounds cool... 
      * i haven't seen anybody set this up to where android automatically launches the su daemon)
  * then just go install SuperSU from the Play Store 
      * DO NOT allow it to upgrade the su binary upon prompting... that always hung my virtual device after reboot
  * and lastly fire up a Root Checker from Play Store to make sure 

### Clipboard integration

  * Android Studio (as of v2.3) directly supports Windows <=> Emulator cliboard integration ([ref][4])
  * `ADB shell input text "sample text"` is pretty handy too

### Handy Links

  * [Android Studio download][5]... main tools: 
      * SDK Manage
      * AVD Manager
      * Device Monitor &#8211; event log and GUI file explorer
  * [Google Play APK Downloader][6]
  * [ChainFire's "How To SU"][7]
  * Windows AVD Folder where the runnable virtual machines sit: %UserProfile%&#46;android\avd 
      * HOWEVER Upon running Android Studio's vs Visual Studio's version of emulator.exe will manipulate the %UserProfile%&#46;android\avd\hardware-qemu.ini to point the .img file paths to their folders
  * Android Studio puts everything here: %AppData%&#46;.\Local\Android\SDK
  * Visual Studio puts everything here: C:\Program Files (x86)\Android\android-sdk 
      * \platform-tools\adb.exe
      * \tools\emulator.exe
      * \system-images\android-25\google\_apis\x86\_64\system.img, etc.
  * AStudio emulator.exe runs better NOT elevated
  * VStudio emulator.exe runs better ELEVATED
  * AStudio emulator.exe v2.5.2 looks like it creates "copy on write" system.img.qcow2 files instead of modifying system.img directly which means you can save that qcow2 file as backup or erase it to rollback to clean baseline
  * VStudio emulator.exe v2.5.5 looks like it modifies system.img directly
  * `qemu-img.exe info file.qcow2` will show you what base .img it's linked to ([download qemu bundle][8])
  * [Install Intel HAXM directly][9] if SDK Manager is no cooperating

### My full fidelity emulator launch script

_(special [TCC/LE][10] batch syntax)_

    @echo off
    SETLOCAL 
    
    ::call tk qemu-system-x86_64
    start "Android Emulator" /inv /pgm "C:\Users\beej1\AppData\Local\Android\sdk\emulator\emulator.exe" -avd Nexus_9_API_25 -writable-system -selinux permissive
    adb wait-for-device
    adb root
    adb remount
    adb shell "su -ad &"
    
    :pasteloop
    
    echos Press any key when ready... to paste current clipboard to android^r
    pause
    
    set clipline=0
    do forever
      set cliptxt=%@clip[%clipline%]%
      if "%cliptxt%" EQ "**EOC**" LEAVE
      adb shell input text '%cliptxt%'
      set clipline=%@inc[%clipline%]%
    enddo 
    goto pasteloop

 [1]: http://opengapps.org/#downloadsection
 [2]: https://infosectrek.wordpress.com/2017/01/17/installing-the-google-play-store-app-apk-on-the-android-emulator/#comment-296
 [3]: www.supersu.com/download
 [4]: http://stackoverflow.com/a/42678005/813599
 [5]: https://developer.android.com/studio/index.html
 [6]: https://apps.evozi.com/apk-downloader/
 [7]: https://su.chainfire.eu/
 [8]: https://qemu.weilnetz.de/w64/
 [9]: https://software.intel.com/en-us/android/articles/intel-hardware-accelerated-execution-manager
 [10]: https://jpsoft.com/tccle-cmd-replacement.html