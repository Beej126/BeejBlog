---
title: '[SOLVED!] Photoshop CS5 – Detected Video Card: Blank'
author: Beej
type: post
date: 2010-10-28T22:00:00+00:00
year: "2010"
month: "2010/10"
url: /2010/10/solved-photoshop-cs5-detected-video.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 2511158093845531504
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 7
blogger_permalink:
  - /2010/10/solved-photoshop-cs5-detected-video.html
blogger_thumbnail:
  - https://lh5.ggpht.com/_XlySlDLkdOc/TMpfIkCEn2I/AAAAAAAAE08/rugBj2TKpfQ/image_thumb%5B2%5D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - 's:162:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5508631502
categories:
tags:
  - Hardware
  - Photography
  - Software

---
### TL;DR

Just go into `Help > System Info` before you do anything else, that’s it.

### TS;WM

Unbelievable but this works 100% of the time on my current rig running Photoshop CS5 on Windows 7 with an ATI x1300 Pro graphics card (yeah yeah it’s far from a graphics superstar but honestly it does everything I need, including Photoshop 3D mode just fine thank you 🙂

Anyway, the area under `Edit > Preferences > Performance > GPU Settings > Detected Video Card` would always come up blank. This was absolutely driving me nuts because I want all the 3D mode stuff that only comes when Photoshop is happy with your OpenGL bits.

There are several forum posts about Photoshop being sensitive to what your video card spits out when PS does an OpenGL “capability scan”. Sure is cool to have such an easy fix… found it totally by chance. Obviously it would be nice if Adobe could find it in their hearts to run the video detect code through the System Info code but I’m sure they’ve got a ton of bigger fish to fry.

**[Update: 01 Feb 2011]** Photoshop CS5 on the Mac side has no such issues recognizing this card.

**[Update: 04 May 2011]** Photoshop CS5 64bit on Win7 seems to find the card straight away, nice. **Note: I had to install the ATI Catalyst drivers, the default Windows WDDM drivers didn’t provide the right kind of OpenGL support… for this old card [Catalyst v10.2 seems to be the “legacy” cutoff point][1].

More keywords for Google to bring home other wayward souls: Photoshop, CS5, No Detected Video Card, Enable OpenGL Drawing, Enable Graphics Hardware Acceleration is unavailable, GPU Settings

| Before           | After            |
| ---------------- | ---------------- |
| [![image][2]][3] | [![image][4]][5] |

 [1]: https://support.amd.com/us/gpudownload/windows/Legacy/Pages/radeonaiw_vista64.aspx?type=2.4.1&product=2.4.1.3.13&lang=English
 [2]: https://lh5.ggpht.com/_XlySlDLkdOc/TMpfIkCEn2I/AAAAAAAAE08/rugBj2TKpfQ/image_thumb%5B2%5D.png?imgmax=800 "image"
 [3]: https://lh6.ggpht.com/_XlySlDLkdOc/TMpfINlzJ6I/AAAAAAAAE04/efuNpVrmdx4/s1600-h/image%5B4%5D.png
 [4]: https://lh4.ggpht.com/_XlySlDLkdOc/TMpfJ_nGkmI/AAAAAAAAE1E/cChYQM9TlqA/image_thumb%5B7%5D.png?imgmax=800 "image"
 [5]: https://lh6.ggpht.com/_XlySlDLkdOc/TMpfJGlbZ3I/AAAAAAAAE1A/pHDOsunmWdw/s1600-h/image%5B11%5D.png