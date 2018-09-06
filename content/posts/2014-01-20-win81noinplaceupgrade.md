---
title: '[SOLVED] Win8.1 Upgrade – No “Keep Windows settings, personal files, and apps” option'
author: Beej
type: post
date: 2014-01-20T16:43:00+00:00
year: "2014"
month: "2014/01"
url: /2014/01/win81noinplaceupgrade.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 7443391053038531220
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2014/01/Win81NoInPlaceUpgrade.html
blogger_thumbnail:
  - https://1.bp.blogspot.com/-0xTAR1MFlqI/UuGBaWwZZTI/AAAAAAAADiE/IsQmRuCsdxM/s1600/before.png
snapEdIT:
  - 1
snapTW:
  - 's:166:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:19:"%TITLE% - %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5534480177
categories:
  - Uncategorized
tags:
  - Windows 8+

---
<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: right; margin-left: 1em; text-align: right;">
  <tr>
    <td style="text-align: center;">
      <a href="https://www.BeejBlog.com/wp-content/uploads/2014/01/before.png" imageanchor="1" style="clear: right; margin-bottom: 1em; margin-left: auto; margin-right: auto;"><img border="0" height="313" src="https://www.BeejBlog.com/wp-content/uploads/2014/01/before.png" width="400" /></a>
    </td>
  </tr>
  
  <tr>
    <td class="tr-caption" style="text-align: center;">
      Before
    </td>
  </tr>
</table>

I was met with only two options from the Windows 8.1 upgrade, "Keep Personal Files Only" or "Nothing". Not much of an "upgrade", I went poking around.

For me it turned out that I had been fiddling with localized development a while back and had an old en-GB language pack still installed. There are various references that the Win8.1 upgrade criteria prohibits "cross language" installs.

Apparently a language pack can't be removed from a running Windows instance, it must be "offline". One way is from the CMD.exe of a Windows DVD/USB install boot disc. Tip: Shift-F10.

<div id="irc_mimg">
  <table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; text-align: right;">
    <tr>
      <td style="text-align: center;">
        <a data-ved="0CAUQjRw" href="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&docid=-v5uE1-SNET-OM&tbnid=gvewjCgwRmJdKM:&ved=0CAUQjRw&url=http%3A%2F%2Fblogs.dirteam.com%2Fblogs%2Fdavestork%2Farchive%2F2013%2F11%2F19%2Fwindows-8-1-enterprise-upgrade-you-can-t-keep-apps.aspx&ei=AlHdUoD7GOrisASRhICYAw&bvm=bv.59568121,d.eW0&psig=AFQjCNHRhB9xY2K4NMzvryI764-AhuvbPg&ust=1390322304330627" id="irc_mil" style="border: 0px none; clear: left; margin-bottom: 1em; margin-left: auto; margin-right: auto;"><img class="irc_mut" height="352" id="irc_mi" src="https://www.BeejBlog.com/wp-content/uploads/2014/01/After.png" style="margin-top: 0px;" width="400" /></a>
      </td>
    </tr>
    
    <tr>
      <td class="tr-caption" style="text-align: center;">
        After 🙂
      </td>
    </tr>
  </table>
</div>

To find which language packs are installed ("Language" is case sensitive):

<pre class="prettyprint">dism /image:c: /get-packages | find "Language"</pre>

Which output something long like this:

<pre class="prettyprint none">Package Identity : Microsoft-Windows-Client-LanguagePack-Package~31bf3856ad364e35~amd64~en-GB~6.2.9200.16384</pre>

To remove the package:

<pre class="prettyprint">dism /image:c: /remove-package /packagename:{long_name_from_above_output}</pre>

That ran for a few minutes to completion and when I booted back into my main instance and retried the upgrade, I was met with the new desired option to preserve my applications as well &#8211; yay 🙂