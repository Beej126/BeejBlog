---
title: KeePass + Cloud Storage = (near) Password Nirvana
author: Beej
type: post
date: 2013-12-23T06:55:00+00:00
year: "2013"
month: "2013/12"
url: /2013/12/keepass-cloud-storage-near-password.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4826853279959822751
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2014/01/keepass-cloud-storage-near-password.html
blogger_thumbnail:
  - https://2.bp.blogspot.com/-lbflleKV6Is/VgjkWZE2JJI/AAAAAAAARoQ/r8RsIzK3duM/s1600/KeePassHttp-remote-host.png
dsq_thread_id:
  - 5526005395
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
  - Android
  - Life
  - Mac
  - Security

---
[![][1]][1]

Update 2015-09-27: Neato! In June of 2015 [the author has applied a mod][2] which allows for KeePassHttp to be served from somewhere other than localhost... there are security implications to be considered here but as long as you know how to cover your bases it opens some nice possibilities to have a single KeepPass instance provide password resolution to multiple clients... e.g. a VM guest, other machines in your home, etc. Not provided in ready to run plgx file yet but following the self compile instructions [found in the readme][3] was fairly trivial.

[KeePass2][4] &#8211; Password management application

  * 10 years mature
  * Free
  * Windows, Linux, Mac, Android and iOS versions
  * DropBox compatible (Google Drive, etc)
  * Autofill [browser plugins][5]
  * Rich text area for notes (e.g. challenge phrases and other reminders)
  * [Open source][6] (.Net)

![][7]

  * Mac (and Linux) can run the Windows.exe via Mono
  * Initially ran native [KyPass Companion][8] on the Mac side (~$8). Have since switched back to the free mainstream build (see below)</p> 
  * On Android phone using [Keepass2Android][9] (free) with solid results

  * Provides special keyboard which facilitates autofill

  * DropBox and other cloud drives well supported (synchronize)
  * Handy yet still secure Quick Unlock feature
  * Consider a good android lock screen as additional layer of protection

I’m glad I finally took the time.&nbsp; I (forced ;) my wife to run the Windows version on her desktop and we share the same database file with our financial, healthcare, etc logins. So either of us can get into whatever we need wherever we are. It gives me peace of mind that she would have ready access to those important things in case I was somehow unavailable (knock wood). If you're putting up with some other convoluted hodge podge as I was, please give this general idea a shot by wading in slowly and see if it makes your life easier as it has for me.

&nbsp;2013-01-01: My main password file was corrupted

![][10]

and I couldn't log in.

  * Turns out I had a wonky entry that kept growing upon subsequent saves. Maybe compression algorithm was backfiring or something like that.
  * The offending entry was under KeePassHttp which just stores the authorized connection for each particular browser, so it was a no brainer to kill and recreate.
  * My kdbx file had grown to 28MB! after deleting it was back down to a measly 16k.
  * KyPass Companion was doing the most recent suspect saves causing massive growth so I can't help but wonder.

![][11]

DropBox really shines

  * Thanks to DropBox's inherent versioning I could readily fallback to a working copy
  * Dropbox also showed the disturbing progression in larger file sizes over short amount of time
  * as well as which client that was driving those suspect saves &#8211; KyPass on my Mac
  * really gotta hand it to that product team, top notch stuff

KyPass's questionable involvement gave me a reason to give the mainline KeePass2 another look...

![][12]

Banging [KeePass2 for OS X][13] into shape

  * Updated from current v2.23 build to the latest official v2.24 build by dropping the latest KeePass.exe from the Windows zip bundle into the Contents/MacOS folder. This is promising; hopefully to never suffer the envy of a more recent build.
  * Contents/MacOS is also where plugins like KeePassHttp.plgx should be dropped.
  * KeePassHttp is working just fine for me running under this mono version.
  * Make sure to disable "Show a notification when credentials are requested" under Tools > KeePassHttp Options. Otherwise both KeePass and browser would freeze upon every login page request.

Nice to have's in KeePass not currently available in KyPass Companion:

  * Automatic save-on-change ([via triggers facility][14])
  * Autoload of the MRU kdbx file upon launch
  * Synchronization

![][15]

**[SOLVED] Error: "The following plugin is incompatible with the current KeePass version"**
  
(/user/{username}/.local/share/KeePass/PluginCache/{unique}/KeePassHttp.dll)

  * **Running on Mac via mono**, turns out [lldb][16] is somehow the process forked by mono which hosts the KeePassHttp listener on port 19455
  * In my situation this pesky error was apparently caused by a crashed orphan lldb holding onto the port and blocking subsequent launches of KeePassHttp
  * Simply "KILLALL lldb" from terminal to resolve

Debug notes:

  * mono>debug.txt -v /Applications/KeePass{version}/Contents/MacOS/keepass.exe
  * Noticed SocketException well into the KeePassHttp plugin's constructors call stack and started to realize the error message was misleading
  * [Xamarin Studio][17] will debug the running instance:
  * First, enable debugger break on SocketException: Run > Exceptions > enter SocketException in the search
  * Run > Debug Application > browse to keepass.exe

  * Xamarin Studio will also reverse gen back to C# source (not that we need it in this case but it's good to know for future) &#8211; just create a new project and add the assembly (DLL or EXE) as a reference and click into it to see the readable source conversion of all classes.

 [1]: /wp-content/uploads/2013/12/KeePassHttp-remote-host.png
 [2]: https://github.com/pfn/keepasshttp/pull/217
 [3]: https://github.com/pfn/keepasshttp#compile-at-your-own
 [4]: https://keepass.info/download.html
 [5]: https://keepass.info/plugins.html#chromeipass
 [6]: https://sourceforge.net/projects/keepass/
 [7]: /wp-content/uploads/2013/12/main_big.jpg
 [8]: https://itunes.apple.com/us/app/kypass-companion/id555293879?mt=12
 [9]: https://play.google.com/store/apps/details?id=keepass2android.keepass2android
 [10]: /wp-content/uploads/2013/12/unnamed.jpg
 [11]: /wp-content/uploads/2013/12/Screen-Shot-2013-12-31-at-11.43.40-AM.png
 [12]: /wp-content/uploads/2013/12/Screen-Shot-2014-01-01-at-7.56.14-PM.png
 [13]: https://keepass2.openix.be/
 [14]: https://www.mydigitallife.info/how-to-auto-save-the-database-in-keepass-password-safe/
 [15]: /wp-content/uploads/2013/12/Screen-Shot-2014-01-01-at-5.54.33-PM.png
 [16]: https://en.wikipedia.org/wiki/LLDB_%28debugger%29
 [17]: https://monodevelop.com/download