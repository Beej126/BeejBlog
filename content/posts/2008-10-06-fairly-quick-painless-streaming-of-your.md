---
title: '(Fairly) Quick & Painless Streaming of Your Local Audio'
author: Beej
type: post
date: 2008-10-06T21:57:00+00:00
year: "2008"
month: "2008/10"
url: /2008/10/fairly-quick-painless-streaming-of-your.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4468161047881581536
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 2
blogger_permalink:
  - /2008/10/fairly-quick-painless-streaming-of-your.html
dsq_thread_id:
  - 5508631463
tags:
  - Music
  - Software

---
Here's the basic pieces I plugged together:

  * MediaMonkey is my preferred mp3 player: [www.MediaMonkey.com][1]
  1. MediaMonkey supports WinAmp API plugins which provides an excellent pool to draw nifty add-ons from

  * EdCast (formerly "OddCast") comes in various implementations, one of which is a WinAmp plugin that sends your current song to a ShoutCast (or IceCast) server: <https://www.oddsock.org/tools/edcast/> 
      1. I chose the EdCast plugin versus ShoutCast's own plugin because EdCast got the song name and artist to come through Media Monkey and ShoutCast's plugin has a known issue that this feature only works with WinAmp 
  * ShoutCast DNAS (Distributed Network Audio Server) &#8211; streams the audio out to clients: <https://www.shoutcast.com/download-files> 

Install/configure/run:

  * Drop the EdCast plugin into Program FilesMediaMonkeyPlugins 
  * Fire up your Monkey and get some tunes rolling 
  * Then in Monkey > Tools > Options > Player > DSP Plugins > edcast DSP... 
      1. Click on the meter in the middle of the dialog to turn on the
  
        broadcast 
      2. Hit "Add Encoder" and then right click the entry to configure for MP3 and
  
        localhost, change password to what you want 
      3. Personalize your stream on the YP Settings 
  * Now install the ShoutCast server and fire that up 
  * Cruise through the config file via the menu option in that GUI... it's very self explanatory and all the defaults are good... probably just have to make sure you get the password lined up with what you put in the plugin config 
  * Then just browse to <https://yourserveraddress:8000/listen.pls> from another machine and it'll fire up your local media player (if you've got .pls associated of course) 
  * There's some interesting stuff kicked out as a default web page if you browse to [https://yourserveraddress:8000][2]... including an admin page where you can monitor listeners, etc. 
  * The default DNAS config automatically publishes you to the global ShoutCast directory (so you might want to watch your intake from that vector victor 🙂
  * PS- The main reason I did this was so I could listen to my tunez at work w/minimal effort 🙂

 [1]: https://www.mediamonkey.com/
 [2]: https://yourserveraddress:8000/