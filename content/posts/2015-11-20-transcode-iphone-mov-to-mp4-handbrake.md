---
title: Transcode MOV to MP4
author: Beej
type: post
date: 2015-11-20T13:56:00+00:00
year: "2015"
month: "2015/11"
url: /2015/11/transcode-iphone-mov-to-mp4-handbrake.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 3009815197367005937
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2015/11/transcode-iphone-mov-to-mp4-handbrake.html
blogger_thumbnail:
  - https://4.bp.blogspot.com/-NVKxjcyswzU/Vk629MzkLSI/AAAAAAAAR2g/01McsMZEtoI/s1600/Snap6.png
snapEdIT:
  - 1
snapTW:
  - 's:162:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5526313403
categories:
tags:
  - PowerShell
  - Video

---
## [GitHub Source][1]

#### Motivation:

Digital cameras and phones typically save video to MOV (Motion JPEG) files. I share my photos & videos via a self hosted open source photo gallery ([zenPhoto][2]). MOV files must be converted to a compatible format like MP4 to stream through the readily available web video players like [Flowplayer][3].

#### Script features:

  * Handles multiple files at once… even from different folders, e.g. when part of a file explorer search result
  * Applies rotation where recognized in the EXIF metadata.
  * Touches new file datestamp to be same as original.

#### Leverages 3rd party tools:

  * <s>[FileMenu Tools (FMT)][4] - handy for creating a FileExplorer right mouse context menu for executing transcode on selected files</s>
  * [See new free approach][5] for the Context Menu piece
  * [HandBrake][6] - read something that suggested HandBrake is faster than ffmpeg and that appears true on my quick comparison
  * [MediaInfo][7] - pulls the [EXIF][8] metadata to determine if any rotation is necessary

#### Install:

  1. save [transcode.ps1][9] to a known location
  2. install FileMenu Tools and disable all the commands you don’t want.
  3. Configure a “transcode” command as shown in screenshot below... **edit for your path**

  * updated FMT Arguments: `-Command "{path}\transcode.ps1" -list %TEMPFILEPATHS% -rotate auto`

  1. install HandBrake and put HandBrakeCli in your path
  2. minimally, put MediaInfo.exe and MediaInfo.dll in your path

# Windows File Explorer UI example

![enter image description here][10]

 [1]: https://github.com/Beej126/PowerShell/blob/master/transcode.ps1
 [2]: https://www.zenphoto.org/
 [3]: https://flowplayer.org/
 [4]: https://www.lopesoft.com/en/products
 [5]: https://github.com/Beej126/SingleInstanceAccumulator
 [6]: https://handbrake.fr/downloads.php
 [7]: https://mediaarea.net/en/MediaInfo/Download/Windows
 [8]: https://en.wikipedia.org/wiki/Exchangeable_image_file_format
 [9]: https://raw.githubusercontent.com/Beej126/PowerShell/master/transcode.ps1
 [10]: https://www.BeejBlog.com/wp-content/uploads/2015/11/Snap6.png