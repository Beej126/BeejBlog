---
title: Ode to Griffin AirClick USB – Radio Frequency PC Media Remote
author: Beej
type: post
date: 2011-06-26T01:30:00+00:00
url: /2011/06/ode-to-griffin-airclick-usb-radio.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 7070206531348036053
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 7
blogger_permalink:
  - /2011/06/ode-to-griffin-airclick-usb-radio.html
blogger_thumbnail:
  - http://lh5.ggpht.com/-QP95wE_SF5w/TgYpWc35PSI/AAAAAAAAE8o/QaQTsTDgHuw/AirClick%25255B5%25255D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:195:"a:1:{i:0;a:7:{s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";
dsq_thread_id:
  - 5508631521
categories:
  - Uncategorized
tags:
  - Hardware
  - Music

---
This little bugger just so totally rocks!!!&#160; IMHO the most compelling aspects are:

  * It’s cheap :). They tend to go for around $10-$25. There are still some out there on <a href="http://shop.ebay.com/i.html?_nkw=airclick+usb" target="_blank">eBay</a> from time to time (not now) and also <a href="http://www.amazon.com/s/ref=nb_sb_noss?url=field-keywords=airclick+usb" target="_blank">Amazon</a> at the moment. 
  * It’s Radio Frequency technology – so you can zap iTunes to the next song from around the corner or out in the yard!!&#160; Even my fancy <a href="http://www.soundgraph.com/vfd-feature-en/" target="_blank">iMON VFD</a> remote is <a href="http://en.wikipedia.org/wiki/Infrared_Data_Association" target="_blank">Infrared</a> based (limited by line-of-site) and that winds up being a deal breaker in my environment… couch faces projector wall away from the PC, IR = major fail! 🙁 
  * It’s simple! – there are only the 5 most critical buttons to distract you… none of that typical Windows Media Center remote overload to worry about here… Play/Pause, Previous, Next & Volume Up/Down, that’s it. 

Unfortunately, the vendor, Griffin, has chosen to discontinue this little wonder.&#160; If you’re interested in driving your PC based Media Players, make sure get the USB version, not the iPod version which appears to still be in production. Take note, the transmitters that come with the readily available iPod version are 100% compatible with the USB receiver. This is a nice way for us to obtain replacement transmitters to have around.&#160; Just check eBay… I just got a pair of clickers, including the iPod receiver and an interesting Velcro mount for $4.50, including shipping!!! Griffin is nice enough to continue hosting their support page with <a href="http://www.griffintechnology.com/support/airclick-usb" target="_blank">drivers</a> <whew>.&#160; These native drivers work on any <u>32bit</u> Windows since XP (more on 64bit support below). And <a href="http://www.dimin.net/software/airclick/" target="_blank">Dmitry Fedorov</a> has been keeping the dream alive by showing us how to build our own little application-specific .Net plugins for the basic Griffin driver API. <a href="http://www.amazon.com/s/ref=nb_sb_noss?url=field-keywords=airclick+usb" target="_blank"><img style="background-image: none; border-right-width: 0px; margin: 10px 15px 20px 0px; padding-left: 0px; padding-right: 0px; display: inline; float: left; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="AirClick" border="0" alt="AirClick" align="left" src="http://lh5.ggpht.com/-QP95wE_SF5w/TgYpWc35PSI/AAAAAAAAE8o/QaQTsTDgHuw/AirClick%25255B5%25255D.png?imgmax=800" width="282" height="348" /></a>Ok so that’s all fine and dandy, now let’s get to the good stuff!!   
I currently like iTunes and VLC and Windows 7 64bit and I’ve found a couple free wares that well, make beautiful music together (couldn’t resist 🙂 

<a href="http://itunescontrol.com/" target="_blank">iTunesControl</a> – In his infinite wisdom, Mr. Jobs hasn’t seen fit to support _global_ Windows Media Keys in iTunes … fortunately for us, Carson created iTunesControl. Within the HotKeys section, one must simply click the desired key event (e.g. “Next Track”) and then press the corresponding AirClick button to make the assignment (Don’t forget to hit the Apply button).&#160; It also provides a very nifty, super configurable Heads Up Display that I absolutely love. To be more specific, I only mapped Play/Pause, Next & Previous this way.&#160; I left volume up/down defaulted to Windows global volume which provides convenient system wide volume control no matter what’s active (see last paragraph). 

Now, the dark clouds started rolling in when I upgraded to Win 7 64bit and realized that the basic Griffin software install does not happen under 64bit, zip, nada, no-go <waaahh>… then I found this next little gem, affectionately called… 

“<a href="http://www.slothlovechunk.net/projects/airclick_interface_script.html" target="_blank">AirClick Interface Script</a>” &#8211; The way Jared explains it, fortunately for us, at least the <a href="http://en.wikipedia.org/wiki/Human_interface_device" target="_blank">HID</a> layer of the Griffin driver is operational under 64bit. So he wrote an <a href="http://www.autohotkey.com/" target="_blank">AutoHotKey</a> script which picks up on the HID messages coming from the AirClick and turns those into Windows Media Keys.&#160; The WinMedia Keys are then caught by iTunesControl and iTunes immediately does our bidding, brilliant! Jared provides his original script source as well as a convenient compiled exe version that you just run and go. 

[<img style="background-image: none; border-right-width: 0px; margin: 15px 0px 15px 14px; padding-left: 0px; padding-right: 0px; display: inline; float: right; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="AirClick_Diagram" border="0" alt="AirClick_Diagram" align="right" src="http://lh6.ggpht.com/-NfBz4th8Z2E/TgZQdOB3baI/AAAAAAAAE8w/GjrE8AtptGg/AirClick_Diagram_thumb%25255B9%25255D.png?imgmax=800" width="315" height="273" />][1]NOTE: Jared’s script maps a 4 second press of the volume-down to PC go night-night. To me this isn’t so handy and I much rather have a repetitive volume adjust when held down. So I tweaked his script a little, <a href="http://code.google.com/p/beejcode/source/browse/trunk/Griffin%20AirClick%20AutoHotKey%20Script/airclick-nosleep.ahk" target="_blank">find that here</a> (<a href="http://beejcode.googlecode.com/svn/trunk/Griffin%20AirClick%20AutoHotKey%20Script/airclick-nosleep.exe" target="_blank">ready-to-run EXE version</a>). If you wish to run this raw script or perhaps compile some of your own tweaks, then you <a href="http://www.autohotkey.com/download/" target="_blank">must use the original AutoHotKey</a>. The newer “AutoHotKey_L” branch would not work for me. The last thing I’ll mention is subtle but neato… Jared’s script actually checks to see which window is active.&#160; If none of the well knowners is focused (VLC, Winamp, MediaPlayerClassic, PowerDVD), then it defaults to firing Windows Media Key events.&#160; The nice thing is, if say VLC is active, then Jared’s script fires VLC specific play/pause, rewind & fast forward keys … so if I’m bouncing around the house, iTunes is getting the WinMedia events… if I’m sitting down watching a movie, I just have to make sure VLC is the active window and iTunes is left alone, perfectly intuitive! UPDATE 10 March 2012 It’s a nice pastime to watch a photo slideshow while listening to tunez. Previously I’d been using the Google Photo Screensaver. But we soon wanted the ability to <u>back up</u> and stare at one of the slideshow photos, <u>via the remote</u>. I found <a href="http://pssp.svoboda.biz/" target="_blank">Photo Screensaver Plus</a> by Kamil Svoboda to fit very well. Among other very robust functionality, it supports _left cursor_ to back up in the photo stream and _space_ to pause the slideshow. With that, I edited my <a href="http://beejcode.googlecode.com/svn/trunk/Griffin%20AirClick%20AutoHotKey%20Script/airclick-screensaver.ahk" target="_blank">new AutoHotKey script</a> (<a href="http://beejcode.googlecode.com/svn/trunk/Griffin%20AirClick%20AutoHotKey%20Script/airclick-screensaver.exe" target="_blank">exe</a>) to provide the following:

  * when slideshow screensaver is not running, hold down play/pause remote button to start up screensaver slideshow 
  * when slideshow is running, reverse button goes to the previous image and pauses the slideshow 
  * when slideshow is paused, play/pause restarts the slideshow 
  * otherwise all buttons pass through to media events as usual 

I really like how you can dual purpose the buttons depending on the context… that’s powerful. Kamil’s screensaver also provides a hotkey to copy the current image to a favorites folder, very cool.&#160; And a hotkey to edit the image’s EXIF metadata – Name, Description & Comment.&#160; The nifty thing there is we also publish our photos via a <a href="/2010/10/self-hosting-zenphoto-on-windows-7-iis7.html" target="_blank">Zenphoto</a> web image gallery. Once we edit the EXIF info in the screensaver, a little PowerShell script of mine refreshes ZenPhoto’s MySQL database entry for that image so the new image name and comments are immediately available for viewing and SEARCHING via the web gallery’s search facility, nice!&#160; The PowerShell script uses Microsoft’s <a href="http://archive.msdn.microsoft.com/PowerShellPack" target="_blank">PowerShellPack</a> to provide effortless FileSystemWatcher integration. We really do have everything we need to mix and match unintentional building blocks into our own satisfying hobby solutions these days with amazingly little effort. I mean, who could’ve anticipated using a screensaver of all things as a data entry front end? &#160; <a href="http://sites.google.com/site/programsforpeers/hotcorners" target="_blank">Hot Corners</a> &#8211; This free tool does the job and AutoIT source code is provided.

 [1]: http://lh3.ggpht.com/-dL-pU3fG8Hc/TgZQcVITrNI/AAAAAAAAE8s/AiXbWSp8DUo/s1600-h/AirClick_Diagram%25255B17%25255D.png