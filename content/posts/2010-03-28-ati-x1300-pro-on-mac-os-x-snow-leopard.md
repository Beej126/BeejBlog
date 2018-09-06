---
title: Hacking ATI x1300 into Mac OS X (Latest = Snow Leopard v10.6.8)
author: Beej
type: post
date: 2010-03-28T20:55:00+00:00
year: "2010"
month: "2010/03"
url: /2010/03/ati-x1300-pro-on-mac-os-x-snow-leopard.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 7540634767486175383
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 83
blogger_permalink:
  - /2010/03/ati-x1300-pro-on-mac-os-x-snow-leopard.html
dsq_thread_id:
  - 5508631415
tags:
  - Hardware
  - Mac

---
[Update: 2012 March 29] A commenter has his 7146 X1300 running Lion via EvoEnabler and no other mods… if you have a x1300 card that’s not cooperating with Lion, it would be interesting to try patching your bios to report a 7146 deviceid and see what happens… see the related comments below for links to corresponding tools. 

[Update: 2011 Sep 3] <a href="/2012/03/ati-5450-with-hackintosh-lion-107x.html" target="_blank">See here</a> for my successful transition to cheap, fanless, 3 Display capable replacement for the x1300. 

<div style="margin-bottom: 5px;">
  Here are the main tweaks in a nutshell (“S/L/E” = System / Library / Extensions path on your OSX system drive):
</div>

  * S/L/E/**ATI1300Controller**.kext (this yielded proper resolution and dual display) 
      * **info.plist**: replace 7187 with 7183 
  * S/L/E/**ATIRadeonX1000**.kext (this enabled QE/CI … it sure is nice to see that dashboard ripple the first time! 🙂 
      * **info.plist**: replace 7187 with 7183 
      * **MacOS/ATIRadeonX1000**: replace HEX 8771 with 8371 (these are the reverse hex thingy) 
  * Extracom.apple.Boot.plist (This is absolutely crucial, it's what signals Chameleon to invoke it's magic ATI juju, this file changes to **org.chameleon.Boot.plist** in Chameleon 2.0 RC5) 
    <key>GraphicsEnabler</key>   
    <string>Yes</string>

Further info on ATIRadeonX1000.kext/MacOS/ATIRadeonX1000: 

  * it’s key to look for 81 FA prior to 87 71 (<a href="http://www.projectosx.com/forum/index.php?showtopic=9" target="_blank">explanation here</a>) 
  * V10.6.3 upgrade: offsets => 2D58F, B0C65 
  * v10.6.4 upgrade: offsets => 2D3BF, B0FEF 
  * v10.6.6 upgrade: offsets => 2D363, B1185 
  * v10.6.7 upgrade: offsets => (exactly same as v10.6.6) 
  * v10.6.8 upgrade: offsets => 2E26F & B2A27 … I required EvoEnabler.kext in addition this time around… find it on [www.kexts.com][1]: … look for the ones pre-patched for X1000 series, then replace the framebuffer string (typically “Alopias” or “Wormy”) with “Sphyrna” (<a href="http://forum.voodooprojects.org/index.php/topic,1959.45.html#msg10472" target="_blank">dual link DVI</a>) or “Caretta” (single link DVI) document.forms['kexts\_search\_form'].elements["query"].value = 'EvoEnabler';which apparently are the framebuffers compatible with our RV516 card and still supported in 10.6.8+. 

Lion 

  * v10.7.0 &#8211; ATI1300Controller.kext works as usual and readily provides full res… but unfortunately QE/CI via ATIRadeonX1000 is proving more difficult… there’s 4 possible hits on 8771 in ATIRadeonX1000, but none of them are prefixed with our tried and true ["cmp edx, 7187h" = "81 FA 87 71"][2] … the bytes @B3B6A look promising with “81 F9” prefix, which would presumably be a very similar opcode, like cmp ecx… but I got an instant KP when patched that way and kextload’ed… would of course love to hear anyone else getting this to work ... Lion looks nice, we finally get re-size grab handles on all sides/corners of a window (just like Windows)… and the little trick where it’ll reload everything back up after a reboot is kind of cool too.

Full Disclosure… These are the other tweaks in play on my Hackintosh: 

  * DSDT.aml – 
      * <strike>see DSDT Patcher GUI below</strike> – 
      * [Update: 2011 July 26] Thanks to ‘tkrotoff’, there is now a [hand crafted DSDT.aml][3] for the <a href="/2010/09/overclocking-skeletor-q9540-v10.html" target="_blank">Asus P5E3 Premium mobo</a>. 
  * Bootloader &#8211; 
      * <a href="http://netkas.org/?p=372" target="_blank"><strike>PC-EFI v10.6</strike></a><strike> (</strike><a href="http://tonymacx86.blogspot.com/2010/02/pc-efi-106-released-p55-supported-by.html" target="_blank"><strike>Tony Mac’s handy install package</strike></a><strike>)</strike> 
      * [Update: 2011 Aug 10] I’m currently running v10.6.8 & 10.7 via Chameleon 2.0 RC5 r1329 [patched by Azimutz as described here][4] 
          * Lion requires some new magic bits only found in new booters like Cham2RC5 (<a href="http://www.insanelymac.com/forum/index.php?showtopic=231075" target="_blank">friendly UI installer pkg’s here</a>; <a href="http://builds.voodooprojects.org/builds/Xcode4.0.1/" target="_blank">fresh binary-only auto-builds here</a>). 
          * Note: Cham2RC5 changes the com.apple.Boot.plist standard to **<u>org.chameleon.Boot.plist</u>** 
          * One key thing to keep in mind is that once you get an RCx of Chameleon installed via friendly package, one generally need copy only a new “/boot” file of a more recent build… all the other bits (seem to) stay the same until you hit another major RCy milestone. 
          * The next hurdle one with our kind of “legacy” ATI video card runs into is that the Chameleon team has decided to cast off the "legacy" bits that were keeping our little x1300 in the game thus far :(, presumably so they can maintain a more nimble code base going forward … can’t say I blame them. 
          * FORTUNATELY, <a href="http://forum.voodooprojects.org/index.php/topic,1959.0.html" target="_blank">Azimutz, has taken it upon himself to resurrect our legacy bits in new form</a>… the way I interpret that post, Azimutz is piggybacking an existing chameleon “plug-in” approach that runs via a new “/Extras/Modules” folder…in our case, we toss in a binary named “ATIGraphicsEnabler.dylib” which represents the missing bits of our wayward card.&nbsp; Make sure when Azimutz gives you back your new binary, that you <u>take note of which .dylib, AMD or ATI</u>, that' he actually compiles your specific DevID into. I missed that at first… nice thing is, you can simply hex edit to see where yours is… <a href="http://forge.voodooprojects.org/p/chameleon/source/tree/HEAD/branches/azimutz/trunkGraphicsEnablerModules/i386/modules/GraphicsEnabler" target="_blank">use the source code as your guide</a> 🙂 
          * Azimutz is really doing some serious community service… He is literally taking requests for missing DevID’s and feeding the huddled masses with daily builds!&nbsp; What a guy!!! 
          * I submitted the specific details of this x1300 and <strike>Azimut</strike>z got back to me with a new binary in less than a day!! 
          * NOTE: You must be logged in to see the link for the latest binary download zip file!!!&nbsp; Then, you’ll find a link like “i386\_r1223\_a.zip” at the VERY bottom of Azimutz’ first post, just above his sig block… otherwise, the link is totally missing and not called out in any way... this totally threw me at first!! 🙂 

<div style="margin-bottom: 5px;">
</div>

Terminal: kextstat | grep ATI 
  
(note, contrary to Eric’s feedback on 29 Jan 2011, ATISupport is loaded) 

69 2 0x5dfa5000 0x32000 0x31000 com.apple.kext.**ATISupport** (6.2.6) <68 14 13 7 5 4 3 1>   
81 0 0x5e0dd000 0x21000 0x20000 com.apple.kext.**ATI1300Controller** (6.2.6) <69 68 14 13 5 4 3 1>   
86 0 0x5e32b000 0x5b000 0x5a000 com.apple.**ATIRadeonX1000** (6.2.6) <82 68 14 7 6 5 4 3 1>   
91 0 0x5e286000 0x13000 0x12000 com.apple.kext.**ATIFramebuffer** (6.2.6) <69 68 14 13 7 5 4 3 1> 



<div style="margin-bottom: 5px;">
  My Hardware:
</div>

<table border="0" cellpadding="2" cellspacing="0" style="margin-left: 25px;">
  <tr>
    <td nowrap="nowrap" valign="top">
      Mobo:
    </td>
    
    <td nowrap="nowrap" valign="top">
      <strong><a href="/2010/09/overclocking-skeletor-q9540-v10.html" target="_blank">ASUS P5E3 Premium WiFi @N</a></strong>
    </td>
  </tr>
  
  <tr>
    <td valign="top">
      Video:
    </td>
    
    <td valign="top">
      Dell JJ461 Low Profile <strong>ATI x1300 Pro</strong>, 256MB DDR2, PCI-E 1.0 x16, Dev ID: 0x7183, GPU: RV516
    </td>
  </tr>
  
  <tr>
    <td valign="top">
      Displays:
    </td>
    
    <td valign="top">
      <strong>24” LCD</strong>: Soyo Privé Topaz LC MT-GW-PRLM24D4 <br /> <strong>Projector</strong>: Epson PowerLite Home Cinema 720
    </td>
  </tr>
</table>

Misc Notes: 

  * SL = Snow Leopard from here on out 
  * KP = Kernel Panic 
  * QE/CI = <a href="http://en.wikipedia.org/wiki/Quartz_Compositor" target="_blank">Quartz Extreme / Core Image</a> 
  * S/L/E = System / Library / Extensions path on your OSX system drive. 
  * E/E = Extra / Extensions path (comes into play with bootloaders like Chameleon or PC-EFI) 
  * Since there are scores of full blown install guides, I am just focusing on some pertinent observations during my little adventure to get an ATI x1300 Pro running under SL 
  * I ran down every lead I could find to get my Sapphire ATI Radeon 3870 HD fully working with QE/CI. 
      * The ATI 3870 is a really bad example of how narrow the OS X hardware compatibility path can be… 
      * it’s still a very beefy card by any means… 
      * and there are actually Mac specific 3870’s that obviously work fine 
      * but the **run of the mill _PC-only_ ATI 3870 is an <u>absolute no go</u>**… 
      * many have tried… best explanation I’ve read is that the PC version’s ROM space is 64k vs. 128k in the Mac version. 
  * The funny thing is, I notice _no_ difference between the ATI X1300 and the ATI 3870 for my actual usage… 
      * I found this X1300 card on eBay for only $31!! 
      * And it works like a champ in both OS X and Win 7 (obviously I’m not a gamer 🙂 
      * Full QE/CI does indeed work in OSX with no mouse tearing or any other known downsides 
      * Aero runs perfectly in Win 7 
      * AVI, MOV, MKV videos play great in VLC on both sides 
      * It’s fanless (literally silent) 
      * I’m kicking myself for going with the noisy, expensive ATI 3870 in the first place! Boy was I wrong about my video hardware requirements. 
      * [Update: 30 Jun 2010] Ok so Photoshop CS5 is way cool (try the new “Refine Edge” button under the Quick Selection Tool, they’ve amazingly solved the classic carving-out-hair-from-a-background problem) <strike>… anyway, PS CS5 barked at me about a few things it wasn’t going to manage in 3D mode with the AT X1300… and some other motions were a little more pokey than i’d like… so there is some reason to miss my beefier card.</strike> 
      * [Update: 14 Jul 2010] Loaded the latest ATI drivers (duh) and Photoshop CS5 was then happy with all the OpenGL bits it was previously missing… so the little ATI x1300 really is all I need. [Upate: 28 Oct 2010] Actually, enabling hardware acceleration in Photoshop <a href="/2010/10/solved-photoshop-cs5-detected-video.html" target="_blank">wasn’t quite as easy as I originally thought</a>. 
      * [Update: 01 Feb 2011] Photoshop CS5 on the Mac side has no such issues recognizing this card. 
      * [Update: 12 Aug 2011] CS5 under Win7 64bit behaved properly straight away. 
  * My main objective was iMovie which requires QE/CI. 
  * Twin DVI displays are functioning at full resolution (see <a href="http://www.madrau.com/indexSRX4.html" target="_blank">SwitchResX</a> comments below).&nbsp; My x1300 has a “<a href="http://en.wikipedia.org/wiki/DMS-59" target="_blank">DMS-59</a>” connector which is split into two standard independent DVI connectors via a Y-cable.&nbsp; Primary DVI is connected to my LCD and the secondary DVI is adapted to HDMI for my projector. 
      * for some cazy reason the settings for each display were flipped!?! the projector thought it was the LCD and vice versa… nothing helped… 
      * so i used SwitchResX to copy the low level settings from each display and apply them to the other… amazingly that worked great… i can’t change resolutions very conveniently, but i don’t care to anyway. 
  * One soon realizes the key to this silly game is <u>rapid reboots</u>… eliminate everything that delays seeing the result of another attempt… because you have to be ready for a **<u>TON</u>** of trial and error here… SSD’s help!! 🙂 
  * \*\\*\*Crucial\*\* &#8211; Make sure to have something like <a href="http://www.mediafour.com/products/macdrive/" target="_blank">MacDrive</a> at the ready (see “Handy Utils” below)… one often needs to back out an errant configuration change… accessing your Mac’s system drive from a running Windows environment is one convenient way… make sure to type in “-f” when Chameleon comes up to ignore the previously built kext cache and rebuild based on currently present kexts. 
  * <strike>I liked the BootCD based guide at: </strike>[<strike>http://tonymacx86.blogspot.com/2009/12/install-os-x-snow-leopard-directly-from.html</strike>][5]<strike> </strike> 
      * <strike>I randomly chose the alternate boot CD “iBoot-ATI-10” and it happened to work first shot (nice work Tony!):&nbsp; </strike>[<strike>http://www.tonymacx86.com/viewtopic.php?f=18&t=197&p=1246#p1246</strike>][6] 
  * [Update: 29 Oct 2010] TonyMac has been busy… these are the latest recommended guides for <a href="http://tonymacx86.blogspot.com/2010/04/iboot-multibeast-install-mac-os-x-on.html" target="_blank">streamlined install</a> and the <a href="http://tonymacx86.blogspot.com/2010/10/iboot-25-unified-graphics-support.html" target="_blank">iBoot</a>… 
      * but I sure am glad I saved my old iBoot-ATI-10 image!!! 

the new iBoots are running on recent builds of a branch of Chameleon 2.0 RC5 called “Chimera”… see my RC5 notes above, we need to hack our legacy bits back in to even get booted into iBoot/Chameleon now... so it's nice to still have an old iBoot handy that "just works" in a pinch 

  * <a href="http://heliacal.net/pmwiki/Main/SnowLeopardInstallationGuide2" target="_blank">This is also a really good no-nonsense run through of all the pertinent points</a>. 
      * Noteworthy: SL has a new mkext location, different from Leopard. 
Handy Utils:

  * <a href="http://www.suavetech.com/0xed/0xed.html" target="_blank">0xED</a> (Mac) – Is your friend when it comes to making the necessary HEX code changes to .kext files (aka “binary or bin editing”) 
  * <a href="http://www.softcircuits.com/cygnus/" target="_blank">Cygnus Hex Editor</a> (Win) – This is what I use for bin editing under Windows, anything will do.&nbsp; In Cygnus, make sure you remember to turn off “insert” mode when twiddling bytes… inserting a byte is way different than changing one 🙂 
  * <a href="http://www.icopybot.com/plist-editor.htm" target="_blank">plist Editor</a> (Win)– Windows doesn’t have a native xml value editor like Mac for editing files like info.plist’s… this one is free. But again, pretty much anything will do for these minimal edits, including good ol’ notepad. 
  * <a href="http://cheetha.net/" target="_blank">Kext Helper b7</a> (Mac) – Good stuff, but hangs up on me after it’s done, it doesn’t quit cleanly, always had to “force quit”… anybody know a more stable alternative??? 
  * Console (Mac) – find under Applications > Utility&nbsp; 
      * Select the “System.log” – my experience was that Snow Leo would immediately attempt to load new .kexts as soon as they were installed by Kext Helper… reboots still seem necessary to realize the full effect of a new kext… but by watching the system.log, I got immediate feedback if the kexts just installed ran into some kind of error… i.e. you save on some reboots, crucial to this process!!… e.g. “kernel type blah blah” message immediately made me realize I was in 64bit kernel mode and some kexts I was toying with (ATIInject perhaps) were apparently 32bit only. 
    
  * <a href="http://www.madrau.com/indexSRX4.html" target="_blank">SwitchResX</a> (Mac) – This is what allowed me to get my dual display settings working… see notes under AT1300Controller.kext above 
  * [Paragon NTFS][7] – only NTFS solution I’ve found so far to work under Lion… unfortunately it’s not free but $20 is very reasonable 
  * <a href="http://www.cocoabyss.com/" target="_blank"><strike>SL-NTFS</strike></a><strike> – NTFSMounter wasn’t cooperating for me any more under v10.6.8… SL-NTFS is slightly slicker with a prefpane and most importantly, it worked 🙂</strike> Rats, the guy supporting SL-NTFS stopped as of 10.6.8 
  * <a href="http://ntfsmounter.com/" target="_blank"><strike>NTFSMounter</strike></a> (Mac) – SL finally has the <u>native</u> ability to WRITE to NTFS. It’s disabled by default (not the most confidence inspiring ;)&nbsp; I have gotten a few CHKDSK pops when rebooting into Windows 7 after writing to the Windows main system drive but there were never any actual issues in the output… over time I’ve settled comfortably into writing to non-system NTFS drives from OSX or simply waiting ‘til I boot back into Windows and copying pending files over from my HFS drive via MacDrive. 
  * <a href="http://www.mediafour.com/products/macdrive/" target="_blank">MacDrive</a> (Win) – This is great.&nbsp; Perfectly clean access to your Mac drives from Windows. 
  * <a href="http://pcwizcomputer.com/index.php?option=com_content&task=view&id=150&Itemid=48" target="_blank">DSDT Patcher GUI</a> (Mac) – I generated my DSDT.aml and dropped it in the root folder of my Mac system drive… this seemed to eliminate an “AppleUSBUHCI” error I’d see in the flurry of messages during verbose boot. 



Unrelated:

> For my own reference… to see drives connected to the mobo’s Intel Matrix RAID controller (ICH9R) under RAID mode:
> 
>   * AppleAHCIPort.kext > info.plist > IOPCIPrimaryMatch: replace 0x3A228086 with ox28228086 
> 
> Note: as has been well documented, there are no drivers currently (nor planned??) which fully support the Intel Matrix RAID functionality (aka Intel “Rapid Storage Technology”) under OSX.&nbsp; However, non RAID –and- RAID 1 volumes connected in to this controller _in RAID mode_ do work just fine (with this little coaxing)… you obviously only want to access your RAID 1 drives in read-only mode since the Mac simply sees them as two distinct drives and any writes to either drive would immediately invalidate the mirror, perhaps to dire consequences.
  
> [Update: 2011 July 26] I finally went with a cheap <a href="/2011/02/highpoint-rocketraid-620-indeed-works.html" target="_blank">HighPoint RAID1</a> card that has Mac as well as windows drivers… I love it!!

 [1]: http://www.kexts.com/
 [2]: http://www.projectosx.com/forum/index.php?showtopic=9&view=findpost&p=726
 [3]: http://code.google.com/p/p5e3-dsdt/
 [4]: http://forum.voodooprojects.org/index.php/topic,1959.0.html
 [5]: http://tonymacx86.blogspot.com/2009/12/install-os-x-snow-leopard-directly-from.html
 [6]: http://www.tonymacx86.com/viewtopic.php?f=18&t=197&p=1246#p1246
 [7]: http://www.paragon-software.com/home/ntfs-mac/