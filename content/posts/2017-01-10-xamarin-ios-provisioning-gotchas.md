---
title: Xamarin iOS Provisioning Gotchas
author: Beej
type: post
date: 2017-01-11T03:55:35+00:00
url: /2017/01/xamarin-ios-provisioning-gotchas.html
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:324:"a:1:{i:0;a:11:{s:2:"do";s:1:"1";s:9:"timeToRun";s:0:"";s:10:"SNAPformat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"819030015492796416";s:5:"pDate";s:19:"2017-01-11 03:55:49";}}";
dsq_thread_id:
  - 5508647724
categories:
  - Uncategorized
tags:
  - iOS
  - Xamarin

---
I managed to create scenario where debugging from **Visual Studio 2017** to iOS Simulator was giving me absolute fits because the error messages are so unhelpful&#8230; as usual, it was my own fault of course, but gosh it&#8217;s scary how easily one can fall in that deep dark pit where hopes and dreams go to die ; )

### Example Error Messages

  * `Application X need to be rebuilt due to an inconsistency between the connected Mac and the local app`
  * `Visual Studio cannot start the application automatically because it was signed with a Distribution provisioning profile. Please start it by tapping the application icon on the device`

### TL;DR

In my case it was because the &#8220;Bundle ID&#8221; aka &#8220;App ID&#8221; set in my info.plist was incompatible with the provisioning profiles actually available on my Mac build host and selected in the iOS project settings.

### More background

  1. My Provisioning Certificates had expired (as we know, issued from http://Developer.Apple.com) &#8230; that did throw me off for a bit but eventually I got the clue and went through the Apple Developer account renewal process&#8230; 
  2. Funny thing, I&#8217;d been waiting for our Apple Enterprise Developer aka In House distribution account to finalize&#8230; I noticed it had finally opened up (_there&#8217;s a big yellow sign indicating 2wk delay between approval and the corresponding &#8220;In House&#8221; radio button becoming available on the provisioning profile page_) and decided to just run with that vs my personal Developer keys&#8230;
  3. This meant I was creating all the necessary provisioning bits from scratch&#8230;
  4. First up, creating my App ID aka Bundle Id record (_cue foreboding thunderclap_)&#8230; &#8216;course when you&#8217;re establishing a new name, it&#8217;s always fun to apply your more current understanding of just what that name should be&#8230; here&#8217;s where I messed up, this <span class="hl">App ID gets embedded in the provisioning profile which must then be the same as what&#8217;s in your iOS project&#8217;s info.plist > CFBundleIdentifier entry !!</span>
  5. So while I did realize I needed to go select those new Identity/Provisioning profile entries in the iOS project settings > iOS Bundle Signing page, there&#8217;s nothing obvious in the error messaging to smack us in the head about App Id conflict.

### Saving Grace

reading [this post][1]&#8230; suggested <u>compiling under Xamarin Studio on the Mac for more error visibility</u>&#8230; that&#8217;s a good basic technique reminder&#8230; I also use Xcode for this at times&#8230; at this point we&#8217;ve got <span class="hl">Visual Studio for Mac so i fired that up and it did indeed provide significantly more helpful messaging, which got me back on track</span> &#8211; Good to know !

### Developer vs Distribution Profile &#8211; what&#8217;s the difference?

Somehow I&#8217;d never really run smack into this but one pertinent difference _during development_ is that choosing a _Distribution_ Profile will require you to manually launch your app on the iOS Simulator vs Visual Studio being able to launch it for you&#8230; so choose a Developer profile until you&#8217;re really in the mode to push builds out to real end user devices.

[![image][2]][2]

 [1]: http://stackoverflow.com/a/17999469/813599
 [2]: https://cloud.githubusercontent.com/assets/6301228/21834849/4225598a-d76d-11e6-87b1-6188a28f600a.png