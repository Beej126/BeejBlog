---
title: PowerShell Photo Slideshow
author: Beej
type: post
date: 2015-12-21T02:20:00+00:00
year: "2015"
month: "2015/12"
url: /2015/12/powershell-photo-slideshow.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4839225418711139337
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2015/12/powershell-photo-slideshow.html
blogger_thumbnail:
  - https://2.bp.blogspot.com/-XWNHk4bUjmw/VnZCbx0p_RI/AAAAAAAAR6Y/hjDvvY8mkqE/s1600/Screen%2BShot%2B2015-12-19%2Bat%2B9.36.43%2BPM.png
dsq_thread_id:
  - 5508631346
categories:
  - Highlights
tags:
  - Photography
  - PowerShell

---
## [GitHub Source][1]

#### Project Description

Photo slideshow implemented in PowerShell -> Windows Forms

Simply target a (nested) folder of images. Local or LAN UNC path supported. &nbsp;
  
&nbsp;  


#### Features:

![][2]

  * **task tray icon** to start slideshow on demand...
  * otherwise kicks off after user defined **idle timeout** (honors running video)
  * **good randomization** - one soon realizes pleasantly random photos are the key want of a photo slideshow ... fortunately PowerShell has a readily available _random_ commandlet that seems to do quite well
      * persists "lastShown" for each subfolder and avoids re-showing within XX days (currently 1 month)
  * image **fade-in and slide** for ambience
  * several **hotkeys** functional:
      * <kbd>o</kbd>pen current image folder
      * <kbd>c</kbd>opy current image to _My Photos_
      * <kbd>r</kbd>otate current image (and save) - _generally honors EXIF rotation metadata where present, this option allows for manual correction where EXIF is missing_
      * reverse to previously shown photo (<kbd>left cursor</kbd>)
      * pause/play (<kbd>space</kbd>)
      * hotkey legend pops up on any other keypress
  * screen click functions:
      * double click in center hides slideshow
      * single click in center pauses slideshow
      * click arrows on far left and right for prev/next image
  * skips _.hidden_ folders
  * plays videos via VLC
  * open to modification - it's just PowerShell 🙂 no compiling tools required

#### Install - basically just launch the ps1... here's some tips:

  1. only the ps1 and ico files are needed, download them to a folder
  2. ensure VLC.exe is in your path
  3. (see screenshot below) **create a shortcut** to the ps1 and tweak the target to include `powershell` before the ps1 filename... 
  4. example full shorcut command line: `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -WindowStyle Hidden \\beejquad\Dev\_PersonalProjects\PoShSlideshow\PoShSlideshow.ps1 -photoPath \\beejquad\photos -idleTimeout 2`
  5. select Run: <kbd>Minimized</kbd> to make script launch more polished
  6. add `-WindowStyle Hidden` after powershell.exe on target command line for further polish
  7. then hit the <kbd>Advanced</kbd> button and select <kbd>Run as administrator</kbd> - _this is only required for the `powercfg /requests` used to identify running video and avoid starting slideshow after user input idle timeout (wouldn't mind hearing a slicker approach???)_
  8. script parameters:
      * add `-photoPath {path\to\your\images}` to the end of the shortcut path - UNC shared folder fair game, **write permissions required to persist folder cache flat file**
      * add `-idleTimeout 2` to the end of the shortcut path - units are in minutes
  9. Copy this shortcut to `shell:startup` in Windows FileExplorer to automatically launch this script when you login to your desktop

![][3]

#### Wishlist

  1. [done] <s>show videos as well - thinking VLC convenient</s>
  2. Right mouse to show commands menu same as keyboard
  3. Implement a Hide button akin to the forward back buttons
  4. Email current photo - on screen keyboard? fire gmail to get contacts
  5. [blog request][4]: Automatically update folder cache upon new items... to be clear, current approach automatically recognizes new files in existing folders since it only caches the list of folders from which it randomly grabs the next image. Thoughts - Seems pretty straightforward to throw in [PowerShell FileWatcher][5] configured to call the existing `updateFolderCache` function.

 [1]: https://github.com/Beej126/PoShSlideshow
 [2]: https://2.bp.blogspot.com/-XWNHk4bUjmw/VnZCbx0p_RI/AAAAAAAAR6Y/hjDvvY8mkqE/s1600/Screen%2BShot%2B2015-12-19%2Bat%2B9.36.43%2BPM.png
 [3]: https://3.bp.blogspot.com/-fON1N7pNVps/VnbndLY3ipI/AAAAAAAAR7A/p1T8oja9fso/s1600/Screen%2BShot%2B2015-12-20%2Bat%2B9.26.42%2BAM.png
 [4]: https://www.beejblog.com/2015/12/powershell-photo-slideshow.html#comment-424
 [5]: https://stackoverflow.com/a/29067433/813599