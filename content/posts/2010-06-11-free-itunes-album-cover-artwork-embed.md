---
title: Free iTunes Album Cover Artwork + Embed Artwork Image to MP3 via iTunes COM API SDK w/JavaScript
author: Beej
type: post
date: 2010-06-12T02:29:00+00:00
url: /2010/06/free-itunes-album-cover-artwork-embed.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 7248963592038299807
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 1
blogger_permalink:
  - /2010/06/free-itunes-album-cover-artwork-embed.html
blogger_thumbnail:
  - http://lh4.ggpht.com/_XlySlDLkdOc/TBKOUjN_ZzI/AAAAAAAAEtY/VgTs_2ocysU/image_thumb2.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
dsq_thread_id:
  - 5508631633
categories:
  - Uncategorized
tags:
  - Music

---
Misc Notes:

  * Given: iTunes has some pretty high quality cover art for many albums (all images are standard 600 x 600 pixels). 
  * The basic trick here is that you can sign up for a free iTunes account (without providing any credit card or other personal info)… 
  * And use that account to download the cover artwork for free. 
  * Then run my script which will automate iTunes to extract the cover from iTunes’ special stash and save it as a real local image file 
  * -AND- then embed that image back into the MP3 file so that it stays with the MP3 file no matter where it gets transferred. 
  * The iTunes API is clean, the .CHM based API document that comes with the SDK is easy to navigate and is readily understandable… this really opens a lot of possibility with some quick javascript. 
      * <a href="http://connect.apple.com/cgi-bin/WebObjects/MemberSite.woa/wo/5.1.17.2.1.3.3.1.0.1.1.0.3.3.3.3.1" target="_blank">Obtain the iTunes COM for Windows SDK here (you&#8217;ll need an "Apple ID", it&#8217;s free to sign up)</a> 
      * To be clear, **you don’t need to download or install anything to use my script**… iTunes comes ready to be scripted out of the box. 
  * Note: if you’re experiencing the kind of trouble where the MP3 tag changes simply don’t take no matter what you do, try entirely wiping out the existing tags and start from scratch… for me, the “APE” metatag format always seemed to be a culprit (vs. “ID3” which is much more common) 
  * [MP3Tag][1] is an excellent tool for bulk tag cleanup efforts like this… tons of good wizard driven actions you can perform on mp3 files names & tags… remove string, mixed case conversion, etc. 
  * <a href="http://manufacturedenvironments.com/2008/04/organizing-itunes-simplify-your-genre-list/" target="_blank">Standard list of iTunes genres</a> for handy reference
  * Image size increasing MP3 size – if you’re trying to cram your music on a smart phone this could matter and I was asked about it.&#160; Taking a quick random sampling of my covers I saw from 50k to 80k per 600 x 600 pixel JPG artwork added to each file.&#160; Rounding up to 100k and assuming an average of 4MB’s per MP3 means for every 40 MP3’s you’re adding the size of an additional MP3 to your library.&#160; A 16GB SSD would hold ~4 thousand MP3’s… adding images would knock that down by ~100.

Steps:

<ol style="margin-top: 3px">
  <li>
    Follow steps below to create free iTunes account… thus providing free artwork download capability
  </li>
  <li>
    in iTunes press CTRL-A to select all your tracks <ul>
      <li>
        now ONLY IF YOU WANT TO REPLACE all your existing artwork with iTunes covers&#8230; with your entire library selected in iTunes, right mouse and select “Get Info”, and then check the box next to the blank cover image and hit OK, this will clear the artwork from all your MP3 files!&#160; Make sure you save any of the ones you care to keep ahead of time. It will take quite a while to complete that wipe, of course depending on the size of your library.
      </li>
    </ul>
  </li>
  
  <li>
    Right-mouse and select “Get Album Artwork” &#8211; this will download covers for every MP3 file that doesn’t already have artwork embedded in the file. `
  </li>
  <li>
    Now run my script from CMD.EXE <ol>
      <li>
        cscript EmbediTunesDLArtwork.js
      </li>
      <li>
        I’ll be honest, a handful of albums always proved stubborn, the scripted image embedding simply wouldn’t take for no apparent reasons, no errors… just had to do those few by hand.
      </li>
    </ol>
  </li>
  
  <li>
    That’s basically it, go have a look!
  </li>
</ol>

Enjoy!

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:9ce6104f-a9aa-4a17-a79f-3a39532ebf7c:0c391971-f360-4cbb-9893-a29b651f9a63" class="wlWriterSmartContent">
  <div class="le-pavsc-container">
    <div class="le-pavsc-titleblock">
      EmbediTunesDLArtwork.js
    </div>
    
    <div style="background: #fff; max-height: 300px; overflow: auto">
      <ol style="padding-bottom: 0px; margin: 0px; padding-left: 5px; padding-right: 0px; background: #ffffff; padding-top: 0px">
        <li>
          var tracks = WScript.CreateObject("iTunes.Application").LibraryPlaylist.Tracks;
        </li>
        <li class="even">
          var fso = WScript.CreateObject("Scripting.FileSystemObject");
        </li>
        <li>
          WScript.Echo("Tracks to analyze: " + tracks.Count);
        </li>
        <li class="even">
        </li>
        <li>
          forEach(tracks, function (track)
        </li>
        <li class="even">
          {
        </li>
        <li>
          &#160; if (track.Kind == 1 && track.VideoKind == 0)
        </li>
        <li class="even">
          &#160; {
        </li>
        <li>
          &#160;&#160;&#160; //"VideoKind: " + track.VideoKind + ", Kind: " + track.Kind + ", KindAsString: " + track.KindAsString +
        </li>
        <li class="even">
          &#160;&#160;&#160; //"Index: " + track.Index + ", PlayOrderIndex : " + track.PlayOrderIndex +
        </li>
        <li>
        </li>
        <li class="even">
          &#160;&#160;&#160; /* uncomment to collect missing artwork into a big group that&#8217;s easily grouped together in the iTunes GUI by sorting on the "Show" column header
        </li>
        <li>
          &#160;&#160;&#160; if (track.Artwork.Count == 0)
        </li>
        <li class="even">
          &#160;&#160;&#160; {
        </li>
        <li>
          &#160;&#160;&#160; track.Show = "!!missing artwork!!";
        </li>
        <li class="even">
          &#160;&#160;&#160; WScript.Echo("Missing artwork &#8211; Artist: " + track.Artist + ", Album: " + track.Album + ", Name: " + track.Name);
        </li>
        <li>
          &#160;&#160;&#160; }
        </li>
        <li class="even">
          &#160;&#160;&#160; continue;
        </li>
        <li>
          &#160;&#160;&#160; */
        </li>
        <li class="even">
        </li>
        <li>
          &#160;&#160;&#160; //now for all downloaded artwork, save it to an image file and then write it back into the mp3 file so that we&#8217;re free to carry music with artwork out of iTunes
        </li>
        <li class="even">
          &#160;&#160;&#160; var AlbumFolderName = fso.GetParentFolderName(track.Location) + "";
        </li>
        <li>
          &#160;&#160;&#160; forEach(track.Artwork, function (art)
        </li>
        <li class="even">
          &#160;&#160;&#160; {
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160; //debug:WScript.Echo("&#160; IsDownloadedArtwork: " + art.IsDownloadedArtwork + ", Format: " + art.Format + ", Description: " + art.Description);
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160; var AlbumArtworkFullPath = AlbumFolderName + track.Album.replace(new RegExp("[:?$/@*]", "g"), ".") + ArtworkFormatAsString(art.Format);
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160; if (art.IsDownloadedArtwork)
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160; {
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160;&#160;&#160; try
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160;&#160;&#160; {
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; if (!fso.FileExists(AlbumArtworkFullPath))
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; WScript.Echo("*** Saving Art to file: " + AlbumArtworkFullPath + " ***");
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; art.SaveArtworkToFile(AlbumArtworkFullPath);
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; WScript.Echo("&#160;&#160;&#160; Saving art to MP3: " + track.Location);
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; art.SetArtworkFromFile(AlbumArtworkFullPath);
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160;&#160;&#160; }
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160;&#160;&#160; catch (ex)
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160;&#160;&#160; {
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; WScript.Echo("&#160;&#160;&#160;&#160;&#160;&#160;&#160; Error: " + ex.message);
        </li>
        <li class="even">
          &#160;&#160;&#160;&#160;&#160;&#160;&#160; }
        </li>
        <li>
          &#160;&#160;&#160;&#160;&#160; }
        </li>
        <li class="even">
          &#160;&#160;&#160; });
        </li>
        <li>
          &#160; }
        </li>
        <li class="even">
          });
        </li>
        <li>
        </li>
        <li class="even">
          function ArtworkFormatAsString(format)
        </li>
        <li>
          {
        </li>
        <li class="even">
          &#160; switch (format)
        </li>
        <li>
          &#160; {
        </li>
        <li class="even">
          &#160;&#160;&#160; case 0: return (".unk"); break;
        </li>
        <li>
          &#160;&#160;&#160; case 1: return (".jpg"); break;
        </li>
        <li class="even">
          &#160;&#160;&#160; case 2: return (".png"); break;
        </li>
        <li>
          &#160;&#160;&#160; case 3: return (".bmp"); break;
        </li>
        <li class="even">
          &#160; }
        </li>
        <li>
          }
        </li>
        <li class="even">
          &#160;
        </li>
        <li>
          function forEach(enumerable, delegate)
        </li>
        <li class="even">
          {
        </li>
        <li>
          &#160; for (var enumerator = new Enumerator(enumerable); !enumerator.atEnd(); enumerator.moveNext())
        </li>
        <li class="even">
          &#160; {
        </li>
        <li>
          &#160;&#160;&#160; delegate(enumerator.item());
        </li>
        <li class="even">
          &#160; }
        </li>
        <li>
          }
        </li>
      </ol>
    </div>
  </div>
</div>

<div style="margin-bottom: 5px; font-size: 180%">
  Register for free iTunes account:
</div>

<div style="border-bottom: grey 1px solid; border-left: grey 1px solid; max-height: 300px; overflow: auto; border-top: grey 1px solid; border-right: grey 1px solid">
  <table style="margin-top: 10px" border="0" cellspacing="0" cellpadding="2">
    <tr>
      <td valign="top" width="353">
        Enter iTunes App Store Select “Free Apps” (currently in lower right page gutter)
      </td>
      
      <td valign="top">
        <a href="http://lh3.ggpht.com/_XlySlDLkdOc/TBKOTlU-ohI/AAAAAAAAEtU/msLZvGWtknk/s1600-h/image6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh4.ggpht.com/_XlySlDLkdOc/TBKOUjN_ZzI/AAAAAAAAEtY/VgTs_2ocysU/image_thumb2.png?imgmax=800" width="393" height="401" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        Select “Free App”
      </td>
      
      <td valign="top">
        <a href="http://lh4.ggpht.com/_XlySlDLkdOc/TBKOVpI7c5I/AAAAAAAAEtc/4wLxneCcigs/s1600-h/image%5B11%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh5.ggpht.com/_XlySlDLkdOc/TBKOWmUsLvI/AAAAAAAAEtg/Fb9ZWkP1Oy0/image_thumb%5B5%5D.png?imgmax=800" width="395" height="382" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        Create New Account
      </td>
      
      <td valign="top">
        <a href="http://lh6.ggpht.com/_XlySlDLkdOc/TBKOXVna2hI/AAAAAAAAEtk/022y85xUngM/s1600-h/image%5B6%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh4.ggpht.com/_XlySlDLkdOc/TBKOX4OuolI/AAAAAAAAEto/kY1WjxCe6Yk/image_thumb%5B2%5D.png?imgmax=800" width="424" height="289" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        Continue
      </td>
      
      <td valign="top">
        <a href="http://lh4.ggpht.com/_XlySlDLkdOc/TBKOYvnjzGI/AAAAAAAAEts/gLK5S4O32FM/s1600-h/image%5B18%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh3.ggpht.com/_XlySlDLkdOc/TBKOZHXo28I/AAAAAAAAEtw/sd2fJvvuHaI/image_thumb%5B8%5D.png?imgmax=800" width="429" height="304" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        Accept & Continue
      </td>
      
      <td valign="top">
        <a href="http://lh3.ggpht.com/_XlySlDLkdOc/TBKOZ_n1e9I/AAAAAAAAEt0/vbm9JflM7fI/s1600-h/image%5B22%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh4.ggpht.com/_XlySlDLkdOc/TBKOaWA8RoI/AAAAAAAAEt4/1Z5kaeKbOIM/image_thumb%5B10%5D.png?imgmax=800" width="436" height="337" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        Enter Personal Info and Continue
      </td>
      
      <td valign="top">
        <a href="http://lh4.ggpht.com/_XlySlDLkdOc/TBKObCzZwXI/AAAAAAAAEt8/4e29CBy7lhQ/s1600-h/image%5B26%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh6.ggpht.com/_XlySlDLkdOc/TBKOb1eIATI/AAAAAAAAEuA/SOLWg1nkFM0/image_thumb%5B12%5D.png?imgmax=800" width="442" height="359" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        This is the big enchilada… Select “None” for payment type. Note: this option only shows up when you start by selecting a free download.
      </td>
      
      <td valign="top">
        <a href="http://lh5.ggpht.com/_XlySlDLkdOc/TBKOcWsNzlI/AAAAAAAAEuE/jyPsVYdhc5Q/s1600-h/image%5B30%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh3.ggpht.com/_XlySlDLkdOc/TBKOc8WxMOI/AAAAAAAAEuI/zNCJiFRpk9o/image_thumb%5B14%5D.png?imgmax=800" width="446" height="410" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        Done
      </td>
      
      <td valign="top">
        <a href="http://lh3.ggpht.com/_XlySlDLkdOc/TBKOdaBn1PI/AAAAAAAAEuM/_kkK64Eu714/s1600-h/image%5B34%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh4.ggpht.com/_XlySlDLkdOc/TBKOdylO62I/AAAAAAAAEuQ/FDf0U51tf28/image_thumb%5B16%5D.png?imgmax=800" width="457" height="241" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        Confirm the verification eMail via embedded link
      </td>
      
      <td valign="top">
        <a href="http://lh6.ggpht.com/_XlySlDLkdOc/TBKOel7djiI/AAAAAAAAEuU/k1Eoa7TN3BI/s1600-h/image%5B77%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh3.ggpht.com/_XlySlDLkdOc/TBKOfaoPKrI/AAAAAAAAEuc/q8M-TP84jHg/image_thumb%5B37%5D.png?imgmax=800" width="605" height="388" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        Pop the little iTunes download thingy and sign in <finally>
      </td>
      
      <td valign="top">
        <a href="http://lh5.ggpht.com/_XlySlDLkdOc/TBKOf_Pb1oI/AAAAAAAAEug/AnSwY-qoz-o/s1600-h/image%5B37%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh6.ggpht.com/_XlySlDLkdOc/TBKOgO8L6uI/AAAAAAAAEuk/wBZxXB7hS1E/image_thumb%5B17%5D.png?imgmax=800" width="174" height="244" /></a> <a href="http://lh5.ggpht.com/_XlySlDLkdOc/TBKOgiMkD_I/AAAAAAAAEuo/6iza61SA0B0/s1600-h/image%5B68%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh5.ggpht.com/_XlySlDLkdOc/TBKOhCTiYlI/AAAAAAAAEus/ObZ11hqBj6U/image_thumb%5B32%5D.png?imgmax=800" width="409" height="218" /></a>
      </td>
    </tr>
    
    <tr>
      <td valign="top" width="353">
        If all has gone according to plan… you should be greeted with this pleasantry You now have an album art download capable yet free iTunes account 🙂
      </td>
      
      <td valign="top">
        <a href="http://lh4.ggpht.com/_XlySlDLkdOc/TBKOhwryt5I/AAAAAAAAEuw/9eoBalzrQU0/s1600-h/image%5B80%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh4.ggpht.com/_XlySlDLkdOc/TBKOipp_EcI/AAAAAAAAEu0/9A8FUJ3OAH4/image_thumb%5B40%5D.png?imgmax=800" width="591" height="449" /></a>
      </td>
    </tr>
  </table>
</div>

 [1]: http://www.mp3tag.de/en/