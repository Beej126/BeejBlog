---
title: HighPoint RocketRAID 620 indeed works for Hackintosh
author: Beej
type: post
date: 2011-02-24T19:20:00+00:00
year: "2011"
month: "2011/02"
url: /2011/02/highpoint-rocketraid-620-indeed-works.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 2272768634989664355
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 25
blogger_permalink:
  - /2011/02/highpoint-rocketraid-620-indeed-works.html
blogger_thumbnail:
  - http://lh4.ggpht.com/_XlySlDLkdOc/TW7eVg3roZI/AAAAAAAAE4M/QbgOABkhFcs/image_thumb%5B1%5D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - 's:162:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5508631371
categories:
  - Uncategorized
tags:
  - Hardware
  - Mac

---
Update [2011 Aug 6]: The original drivers appear to work just fine under Lion v10.7
  
[Please see here][1] for background on the “main PC = NAS” approach this hardware facilitates.
  
[And here for my other Hackintosh tribulations with getting my old graphics card to work][2].
  
I’m very satisfied for a $60 part… the drivers loaded right up under both Win7 and OS X v10.6.6 (and 10.7 currently)
  
As a side note: This all works well in tandem with Parallels Desktop v6’s Boot Camp virtualization facility where I can dual boot into my one sole Windows 7 install _natively_ or via a Parallels VM under OS X (I know VMware has something identical but from what I’ve read, Parallels still has the edge on performance).
  
The drivers on the install disc were up to date… and I’m taking it as a good sign that they haven’t found need to update them for over a year now.
  
[Windows 7 Driver][3] – currently: v1.1.9.1221, 12/21/2009
  
[OS X Driver][4] – currently: v1.1.0, 12/22/2009
  
There is the usual BIOS based boot time configuration screen you can pop into to manage your arrays.
  
And you can also install a management “Web GUI” … this is obviously driven by a mini web server that runs under your OS on a certain port… this is _NOT_ plugging an ethernet cable into the RAID card itself… it is not that sophisticated… the whole thing is very bare bones, very old school but seems to have the basics covered (time will tell)… it’s loaded via an old Installshield style setup.exe that I recognize from the early 90’s … the web screens themselves are completely boring old school stuff which stands out in a bad way these days but truly, <ValleyGirlMode> whatevers </ValleyGirlMode>.
  
looking at the benchmark from CrystalDiskMark… those sequentials look respectable but I guess the other rates are pretty poor???
  
those specs are running the RocketRAID on these drives: **<a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16822145276" target="_blank">Hitachi Deskstar HD32000 IDK /7K</a> (2TB 7200 RPM 32MB Cache SATA 3.0Gb/s 3.5&#8243; Internal)**
  
[<img alt="image" border="0" src="http://lh4.ggpht.com/_XlySlDLkdOc/TW7eVg3roZI/AAAAAAAAE4M/QbgOABkhFcs/image_thumb%5B1%5D.png?imgmax=800" height="359" style="background-image: none; border-bottom-width: 0px; border-left-width: 0px; border-right-width: 0px; border-top-width: 0px; display: inline; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="image" width="388" />][5]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [<img alt="image" border="0" src="http://lh5.ggpht.com/_XlySlDLkdOc/TWavdEt2Q_I/AAAAAAAAE3Y/8kISo2-vKGU/image_thumb%5B3%5D.png?imgmax=800" height="359" style="background-image: none; border-bottom-width: 0px; border-left-width: 0px; border-right-width: 0px; border-top-width: 0px; display: inline; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="image" width="537" />][6]
  
The card itself is very miniscule… about 2.75&#8243; inches square (see below)… it is a “1 lane” card (i.e. “X1” in the PCI-express common parlance)… but it is PCIe 2.0 so you absolutely want to put it in a 2.0 capable slot if you can and on my mobo that is a x16 lane slot… which “looks” like a waste but is totally fine for me because I’m not a gamer so I’m not using that secondary PCIe x16 slot for an SLI gfx card or anything useful anyway.
  
<a href="http://www.virgulestar.com/Photos/Hardware/HighPoint%20RocketRAID%20620/DSCF5030.JPG" target="_blank"><img alt="DSCF5030 - closeup" border="0" src="http://lh6.ggpht.com/_XlySlDLkdOc/TWgKk-tqiNI/AAAAAAAAE3o/W_U9nSnCAKE/DSCF5030%20-%20closeup%5B6%5D.jpg?imgmax=800" height="433" style="background-image: none; border-bottom-width: 0px; border-left-width: 0px; border-right-width: 0px; border-top-width: 0px; display: inline; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="DSCF5030 - closeup" width="1037" /></a>
  
Checkout this last photo… I realized the RocketRAID card’s bracket alignment was off quite a bit (too short)… after installing, the card would slide itself loose of the slot… so much so that the mobo’s electric disconnect warning light for that slot came on… the bracket for my graphics card right next door doesn’t exhibit anything close to this height deficit so I’ve got to assume the RocketRAID is a bit out of spec… after scratching my head for a minute, the obvious solution that presented itself was to move the bracket _under_ my case’s _card stability rail..._ it seems like my <a href="/2009/10/open-air-pc.html" target="_blank">Antec Skeleton</a>’s card rail particularly lends itself to this approach… I wonder if a normal case’s bracket screw down area would ?
  
[<img alt="P1050814 - closeup" border="0" src="http://lh6.ggpht.com/_XlySlDLkdOc/TWqy4CC345I/AAAAAAAAE30/0Pde2kf9TV8/P1050814%20-%20closeup_thumb%5B3%5D.jpg?imgmax=800" height="613" style="background-image: none; border-bottom-width: 0px; border-left-width: 0px; border-right-width: 0px; border-top-width: 0px; display: inline; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="P1050814 - closeup" width="793" />][7]

 [1]: /2010/09/considering-home-network-storage.html
 [2]: /2010/03/ati-x1300-pro-on-mac-os-x-snow-leopard.html
 [3]: http://www.highpoint-tech.com/BIOS_Driver/page/rr620_U.htm
 [4]: http://www.hptmac.com.cn/China/rr620c.htm
 [5]: http://lh4.ggpht.com/_XlySlDLkdOc/TW7eU3l6bKI/AAAAAAAAE4I/HZaPgFxfTzs/s1600-h/image%5B4%5D.png
 [6]: http://lh5.ggpht.com/_XlySlDLkdOc/TWavciokSHI/AAAAAAAAE3U/Xy427DEV7Tw/s1600-h/image%5B5%5D.png
 [7]: http://lh6.ggpht.com/_XlySlDLkdOc/TWqy3u7ho_I/AAAAAAAAE3w/epzuXvX4jho/s1600-h/P1050814%20-%20closeup%5B5%5D.jpg