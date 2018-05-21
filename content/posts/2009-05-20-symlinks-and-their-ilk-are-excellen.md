---
title: SymLinks (and their ilk) Are Excellent System Restore ‘Glue’
author: Beej
type: post
date: 2009-05-21T06:30:00+00:00
url: /2009/05/symlinks-and-their-ilk-are-excellen.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 3265044589724305182
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 1
blogger_permalink:
  - /2009/05/symlinks-and-their-ilk-are-excellent.html
dsq_thread_id:
  - 5508631576
categories:
  - Uncategorized
tags:
  - CmdLine

---
Ok i know this is 20+ years late for anybody that’s enjoyed any of the sweet but non mainstreamy flavors of&#160; ‘nix… but now that Vista (blech!!) and Windows 7’s version of NTFS supports SymLinks (aka Soft) & HardLinks so well we can enjoy ourselves just as much over in Mr. Bill’s backyard (or I guess it’s Mr. Ozzie’s backyard now aint it) Go get this puppy: [Link Shell Extension][1] Nevermind that his version history starts at 1999 😐 We can rest easy that Vista was the first to do an actual Symbolic Link (i.e. softies)… but yeah we’ve been missing out, hardies have been in there since NT4… so we could’ve been having some fun… the biggest downside ‘til now in my naive opinion: the hard flavor couldn’t cross drive letters… yes, just another annoying distraction that could be mitigated in other ways, but now we don’t have to think about it (even less). My main point here is… i re-re-re-re-re-load Winders at the drop of a hat (i’m kinda neurotic about it… i recommend this behavior… what was that?! don’t listen to the voices?) anyway, i' know i’m not the only one that has rallied the wagons behind saving all their precious files under one root folder and then carries that carpet bag from one system reload to another.&#160; Well SymLinks are here to help.&#160; Listen up soldier, here’s the straight doo doo: Rather than actually leaving your numerous tweaked files sitting hither and thither at "%appdata%MicrosoftInternet ExplorerQuick Launch” and “c:usersbeejfavorites” and “c:windowssystem32driversetchosts” and and and… leave them all in a nice tidy centralized folder structure of your own design and then SymLink the schnikees out of them. This shell extension lets you drag and drop to create magical “short cuts” that actually act like the real file but aren’t really there. You catchin me? No?&#160; Just load the dang thing, right mouse, drag, drop, look for the “Drop Here” menu and throw a dart at your options… there’s various ups and downs to each of the Link flavors… e.g. I noticed that soft links wouldn’t allow navigation from a shared folder entrance… who knew? Enjoy!&#160; I’m having a blast with them… all over the place.&#160; Can’t wait to re-load again! Update 09 Oct 2009:&#160; SymLinks are also coming in super handy as a way of centralizing and sharing common source code files (I have a feeling this is something graybeard coders have been doing for years but that you just don’t hear about it much)… I SymLink a “copy” of the common source file into each project folder tree where I want to reuse… obviously this is way easier to manage than keeping track of updating actual copies in every folder… it also helps keep me more honest about sticking to the “code contract” that I originally intended… if I’ve hacked something up for one project, then compiles will bomb and remind me… it forces me to keep things generic and therefore promotes more reusable code.

 [1]: http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html#history