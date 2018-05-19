---
title: '[SOLVED] Certain Font Awesome icons not showing in Xamarin iOS'
author: Beej
type: post
date: 2017-01-12T08:17:36+00:00
url: /2017/01/solved-certain-font-awesome-icons-not-showing-in-xamarin-ios.html
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:324:"a:1:{i:0;a:11:{s:2:"do";s:1:"1";s:9:"timeToRun";s:0:"";s:10:"SNAPformat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"819459174568333312";s:5:"pDate";s:19:"2017-01-12 08:21:06";}}";
dsq_thread_id:
  - 5509532493
categories:
  - Uncategorized
tags:
  - Xamarin

---
### Problem

None of the icons in the FA v4.7 release were showing up for me, while all the others were&#8230; so I had a basic working scenario but not entirely.

### Background

  * I was doing a simple approach of showing the icons in a Label like so:
  
    `<Label FontFamily="FontAwesome" Text="&#xf2b5;" />`
  * I had my FontAwesome.ttf file under the iOS project&#8217;s Resources folder and via a [font explorer tool][1] I confirmed that the v4.7 icons were indeed present in that file 
      * for the record, the new v4.7 icons look to begin at unicode hex xf2b5 (&#8220;handshake-o&#8221;)
      * I also had my own FontAwesome.ttf listed under my `Info.plist > UIAppFonts` along with another custom font I was using successfully
  * From previous approach, I also had the [Iconize][2] library loaded&#8230; with it&#8217;s &#8220;iconize-fontawesome.ttf&#8221; listed in Info.plist as well

[crayon title=&#8221;broken Info.plist (excerpt)&#8221; toolbar=&#8221;always&#8221;]
  
<key>UIAppFonts</key>
  
<array>
    
<string>iconize-fontawesome.ttf</string>
    
<string>iconize-material.ttf</string>
    
<string>RichardsonBrandAccelerator.ttf</string>
    
<string>FontAwesome.ttf</string>
  
</array>
  
[/crayon]

### Solution

The clue that tipped me off was that i noticed Iconize was built with an older version of FontAwesome&#8230; so as a guess, I re-ordered my FontAwesome.ttf entry ABOVE the iconize-fontawesome.ttf like below&#8230; and wouldn&#8217;t you know it, that actually did the trick! : )

[crayon title=&#8221;WORKING Info.plist (excerpt)&#8221; toolbar=&#8221;always&#8221;]
  
<key>UIAppFonts</key>
  
<array>
    
<string>RichardsonBrandAccelerator.ttf</string>
    
<string>FontAwesome.ttf</string>
    
<string>iconize-fontawesome.ttf</string>
    
<string>iconize-material.ttf</string>
  
</array>
  
[/crayon]

 [1]: http://geticonjar.com/
 [2]: https://www.nuget.org/packages/Xam.FormsPlugin.Iconize/