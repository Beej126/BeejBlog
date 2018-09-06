---
title: Xamarin iOS Provisioning Gotchas
author: Beej
type: post
date: 2017-01-11T03:55:35+00:00
year: "2017"
month: "2017/01"
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
I managed to create scenario where debugging from **Visual Studio 2017** to iOS Simulator was giving me absolute fits because the error messages are so unhelpful... as usual, it was my own fault of course, but gosh it's scary how easily one can fall in that deep dark pit where hopes and dreams go to die ; )

### Example Error Messages

  * `Application X need to be rebuilt due to an inconsistency between the connected Mac and the local app`
  * `Visual Studio cannot start the application automatically because it was signed with a Distribution provisioning profile. Please start it by tapping the application icon on the device`

### TL;DR

In my case it was because the "Bundle ID" aka "App ID" set in my info.plist was incompatible with the provisioning profiles actually available on my Mac build host and selected in the iOS project settings.

### More background

  1. My Provisioning Certificates had expired (as we know, issued from https://Developer.Apple.com) ... that did throw me off for a bit but eventually I got the clue and went through the Apple Developer account renewal process... 
  2. Funny thing, I'd been waiting for our Apple Enterprise Developer aka In House distribution account to finalize... I noticed it had finally opened up (_there's a big yellow sign indicating 2wk delay between approval and the corresponding "In House" radio button becoming available on the provisioning profile page_) and decided to just run with that vs my personal Developer keys...
  3. This meant I was creating all the necessary provisioning bits from scratch...
  4. First up, creating my App ID aka Bundle Id record (_cue foreboding thunderclap_)... 'course when you're establishing a new name, it's always fun to apply your more current understanding of just what that name should be... here's where I messed up, this <span class="hl">App ID gets embedded in the provisioning profile which must then be the same as what's in your iOS project's info.plist > CFBundleIdentifier entry !!</span>
  5. So while I did realize I needed to go select those new Identity/Provisioning profile entries in the iOS project settings > iOS Bundle Signing page, there's nothing obvious in the error messaging to smack us in the head about App Id conflict.

### Saving Grace

reading [this post][1]... suggested <u>compiling under Xamarin Studio on the Mac for more error visibility</u>... that's a good basic technique reminder... I also use Xcode for this at times... at this point we've got <span class="hl">Visual Studio for Mac so i fired that up and it did indeed provide significantly more helpful messaging, which got me back on track</span> &#8211; Good to know !

### Developer vs Distribution Profile &#8211; what's the difference?

Somehow I'd never really run smack into this but one pertinent difference _during development_ is that choosing a _Distribution_ Profile will require you to manually launch your app on the iOS Simulator vs Visual Studio being able to launch it for you... so choose a Developer profile until you're really in the mode to push builds out to real end user devices.

[![image][2]][2]

 [1]: https://stackoverflow.com/a/17999469/813599
 [2]: https://cloud.githubusercontent.com/assets/6301228/21834849/4225598a-d76d-11e6-87b1-6188a28f600a.png