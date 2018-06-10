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
### Misc Notes:

  * Given: iTunes has some pretty high quality cover art for many albums (all images are standard 600 x 600 pixels). 
  * The basic trick here is that you can sign up for a free iTunes account (without providing any credit card or other personal info)… 
  * And use that account to download the cover artwork for free. 
  * Then run my script which will automate iTunes to extract the cover from iTunes’ special stash and save it as a real local image file 
  * -AND- then embed that image back into the MP3 file so that it stays with the MP3 file no matter where it gets transferred. 
  * The iTunes API is clean, the .CHM based API document that comes with the SDK is easy to navigate and is readily understandable… this really opens a lot of possibility with some quick javascript. 
      * [Obtain the iTunes COM for Windows SDK here (you'll need an "Apple ID", it's free to sign up)](http://connect.apple.com/cgi-bin/WebObjects/MemberSite.woa/wo/5.1.17.2.1.3.3.1.0.1.1.0.3.3.3.3.1) 
      * To be clear, **you don’t need to download or install anything to use my script**… iTunes comes ready to be scripted out of the box. 
  * Note: if you’re experiencing the kind of trouble where the MP3 tag changes simply don’t take no matter what you do, try entirely wiping out the existing tags and start from scratch… for me, the “APE” metatag format always seemed to be a culprit (vs. “ID3” which is much more common) 
  * [MP3Tag][http://www.mp3tag.de/en/] is an excellent tool for bulk tag cleanup efforts like this… tons of good wizard driven actions you can perform on mp3 files names & tags… remove string, mixed case conversion, etc. 
  * [Standard list of iTunes genres](http://manufacturedenvironments.com/2008/04/organizing-itunes-simplify-your-genre-list/) for handy reference
  * Image size increasing MP3 size – if you’re trying to cram your music on a smart phone this could matter and I was asked about it.&#160; Taking a quick random sampling of my covers I saw from 50k to 80k per 600 x 600 pixel JPG artwork added to each file.&#160; Rounding up to 100k and assuming an average of 4MB’s per MP3 means for every 40 MP3’s you’re adding the size of an additional MP3 to your library.&#160; A 16GB SSD would hold ~4 thousand MP3’s… adding images would knock that down by ~100.

### Steps:

1.  Follow steps below to create free iTunes account… thus providing free artwork download capability
2.  in iTunes press CTRL-A to select all your tracks
    *   now ONLY IF YOU WANT TO REPLACE all your existing artwork with iTunes covers... with your entire library selected in iTunes, right mouse and select “Get Info”, and then check the box next to the blank cover image and hit OK, this will clear the artwork from all your MP3 files!  Make sure you save any of the ones you care to keep ahead of time. It will take quite a while to complete that wipe, of course depending on the size of your library.
3.  Right-mouse and select “Get Album Artwork” – this will download covers for every MP3 file that doesn’t already have artwork embedded in the file. `
4.  Now run my script from CMD.EXE
    1.  cscript EmbediTunesDLArtwork.js
    2.  I’ll be honest, a handful of albums always proved stubborn, the scripted image embedding simply wouldn’t take for no apparent reasons, no errors… just had to do those few by hand.
5.  That’s basically it, go have a look!

Enjoy!

##### EmbediTunesDLArtwork.js
```js
var tracks = WScript.CreateObject("iTunes.Application").LibraryPlaylist.Tracks;
var fso = WScript.CreateObject("Scripting.FileSystemObject");
WScript.Echo("Tracks to analyze: " + tracks.Count);
forEach(tracks, function (track)
{
  if (track.Kind == 1 && track.VideoKind == 0)
  {
    //"VideoKind: " + track.VideoKind + ", Kind: " + track.Kind + ", KindAsString: " + track.KindAsString +
    //"Index: " + track.Index + ", PlayOrderIndex : " + track.PlayOrderIndex +
    /* uncomment to collect missing artwork into a big group that's easily grouped together in the iTunes GUI by sorting on the "Show" column header
    if (track.Artwork.Count == 0)
    {
    track.Show = "!!missing artwork!!";
    WScript.Echo("Missing artwork – Artist: " + track.Artist + ", Album: " + track.Album + ", Name: " + track.Name);
    }
    continue;
    */
    //now for all downloaded artwork, save it to an image file and then write it back into the mp3 file so that we're free to carry music with artwork out of iTunes
    var AlbumFolderName = fso.GetParentFolderName(track.Location) + "";
    forEach(track.Artwork, function (art)
    {
      //debug:WScript.Echo("  IsDownloadedArtwork: " + art.IsDownloadedArtwork + ", Format: " + art.Format + ", Description: " + art.Description);
      var AlbumArtworkFullPath = AlbumFolderName + track.Album.replace(new RegExp("[:?$/@*]", "g"), ".") + ArtworkFormatAsString(art.Format);
      if (art.IsDownloadedArtwork)
      {
        try
        {
          if (!fso.FileExists(AlbumArtworkFullPath))
          {
            WScript.Echo("*** Saving Art to file: " + AlbumArtworkFullPath + " ***");
            art.SaveArtworkToFile(AlbumArtworkFullPath);
          }
          WScript.Echo("    Saving art to MP3: " + track.Location);
          art.SetArtworkFromFile(AlbumArtworkFullPath);
        }
        catch (ex)
        {
          WScript.Echo("        Error: " + ex.message);
        }
      }
    });
  }
});
function ArtworkFormatAsString(format)
{
  switch (format)
  {
    case 0: return (".unk"); break;
    case 1: return (".jpg"); break;
    case 2: return (".png"); break;
    case 3: return (".bmp"); break;
  }
}
 
function forEach(enumerable, delegate)
{
  for (var enumerator = new Enumerator(enumerable); !enumerator.atEnd(); enumerator.moveNext())
  {
    delegate(enumerator.item());
  }
}
```

### Register for free iTunes account:

Step | Notes
--- | ---
Enter iTunes App Store Select “Free Apps” (currently in lower right page gutter) | [![](http://lh4.ggpht.com/_XlySlDLkdOc/TBKOUjN_ZzI/AAAAAAAAEtY/VgTs_2ocysU/image_thumb2.png?imgmax=800)](http://lh3.ggpht.com/_XlySlDLkdOc/TBKOTlU-ohI/AAAAAAAAEtU/msLZvGWtknk/s1600-h/image6.png)
Select “Free App” | [![](http://lh5.ggpht.com/_XlySlDLkdOc/TBKOWmUsLvI/AAAAAAAAEtg/Fb9ZWkP1Oy0/image_thumb%5B5%5D.png?imgmax=800)](http://lh4.ggpht.com/_XlySlDLkdOc/TBKOVpI7c5I/AAAAAAAAEtc/4wLxneCcigs/s1600-h/image%5B11%5D.png)
Create New Account | [![](http://lh4.ggpht.com/_XlySlDLkdOc/TBKOX4OuolI/AAAAAAAAEto/kY1WjxCe6Yk/image_thumb%5B2%5D.png?imgmax=800)](http://lh6.ggpht.com/_XlySlDLkdOc/TBKOXVna2hI/AAAAAAAAEtk/022y85xUngM/s1600-h/image%5B6%5D.png)
Continue | [![](http://lh3.ggpht.com/_XlySlDLkdOc/TBKOZHXo28I/AAAAAAAAEtw/sd2fJvvuHaI/image_thumb%5B8%5D.png?imgmax=800)](http://lh4.ggpht.com/_XlySlDLkdOc/TBKOYvnjzGI/AAAAAAAAEts/gLK5S4O32FM/s1600-h/image%5B18%5D.png)
Accept & Continue | [![](http://lh4.ggpht.com/_XlySlDLkdOc/TBKOaWA8RoI/AAAAAAAAEt4/1Z5kaeKbOIM/image_thumb%5B10%5D.png?imgmax=800)](http://lh3.ggpht.com/_XlySlDLkdOc/TBKOZ_n1e9I/AAAAAAAAEt0/vbm9JflM7fI/s1600-h/image%5B22%5D.png)
Enter Personal Info and Continue | [![](http://lh6.ggpht.com/_XlySlDLkdOc/TBKOb1eIATI/AAAAAAAAEuA/SOLWg1nkFM0/image_thumb%5B12%5D.png?imgmax=800)](http://lh4.ggpht.com/_XlySlDLkdOc/TBKObCzZwXI/AAAAAAAAEt8/4e29CBy7lhQ/s1600-h/image%5B26%5D.png)
This is the big enchilada… Select “None” for payment type. Note: this option only shows up when you start by selecting a free download. | [![](http://lh3.ggpht.com/_XlySlDLkdOc/TBKOc8WxMOI/AAAAAAAAEuI/zNCJiFRpk9o/image_thumb%5B14%5D.png?imgmax=800)](http://lh5.ggpht.com/_XlySlDLkdOc/TBKOcWsNzlI/AAAAAAAAEuE/jyPsVYdhc5Q/s1600-h/image%5B30%5D.png)
Done | [![](http://lh4.ggpht.com/_XlySlDLkdOc/TBKOdylO62I/AAAAAAAAEuQ/FDf0U51tf28/image_thumb%5B16%5D.png?imgmax=800)](http://lh3.ggpht.com/_XlySlDLkdOc/TBKOdaBn1PI/AAAAAAAAEuM/_kkK64Eu714/s1600-h/image%5B34%5D.png)
Confirm the verification eMail via embedded link | [![](http://lh3.ggpht.com/_XlySlDLkdOc/TBKOfaoPKrI/AAAAAAAAEuc/q8M-TP84jHg/image_thumb%5B37%5D.png?imgmax=800)](http://lh6.ggpht.com/_XlySlDLkdOc/TBKOel7djiI/AAAAAAAAEuU/k1Eoa7TN3BI/s1600-h/image%5B77%5D.png)
Pop the little iTunes download thingy and sign in | [![](http://lh6.ggpht.com/_XlySlDLkdOc/TBKOgO8L6uI/AAAAAAAAEuk/wBZxXB7hS1E/image_thumb%5B17%5D.png?imgmax=800)](http://lh5.ggpht.com/_XlySlDLkdOc/TBKOf_Pb1oI/AAAAAAAAEug/AnSwY-qoz-o/s1600-h/image%5B37%5D.png) [![](http://lh5.ggpht.com/_XlySlDLkdOc/TBKOhCTiYlI/AAAAAAAAEus/ObZ11hqBj6U/image_thumb%5B32%5D.png?imgmax=800)](http://lh5.ggpht.com/_XlySlDLkdOc/TBKOgiMkD_I/AAAAAAAAEuo/6iza61SA0B0/s1600-h/image%5B68%5D.png)
If all has gone according to plan… you should be greeted with this pleasantry You now have an album art download capable yet free iTunes account 🙂 | [![](http://lh4.ggpht.com/_XlySlDLkdOc/TBKOipp_EcI/AAAAAAAAEu0/9A8FUJ3OAH4/image_thumb%5B40%5D.png?imgmax=800)](http://lh4.ggpht.com/_XlySlDLkdOc/TBKOhwryt5I/AAAAAAAAEuw/9eoBalzrQU0/s1600-h/image%5B80%5D.png)