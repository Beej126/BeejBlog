---
title: YASBE – Open Source Code Incremental Backup Windows WPF Application
author: Beej
type: post
date: 2011-03-03T07:46:00+00:00
year: "2011"
month: "2011/03"
url: /2011/03/yasbe-open-source-code-incremental.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 2584202116028905886
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2011/03/yasbe-open-source-code-incremental.html
blogger_thumbnail:
  - https://lh3.ggpht.com/_XlySlDLkdOc/TW7WwiNKDRI/AAAAAAAAE4A/lllxfhmoIlQ/image_thumb%5B7%5D.png?imgmax=800
dsq_thread_id:
  - 5542099156
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
  - Uncategorized
tags:
  - DotNetFramework
  - Database
  - WPF

---
The reason I started this little project is none of the premier backup packages currently support Blu_ray… I know that sounds amazing but [check out the help forums for stuff like Acronis][1] and Paragon and Yosemite… it’s not a pretty picture out there currently with regards to Blu_ray… and of course, I had already bought my BD drive before I started to realize how dismal this all was… so I was inclined to find a solution 🙂

I’ll admit right up front, the UI is a a bit cluttered and terse… classic, good_enough_for_own_purposes_in_the_time_i*had syndrome

[![image][2]][3]

  * <strike><a href="https://code.google.com/p/yasbe/source/browse/#svn%2Ftrunk%2FApp%253Fstate%253Dclosed" target="_blank">full source svn repo</a></strike> Update 3/24/15 * Google is shutting down code.google.com 🙁 but provided easy migration to github: [New source link][4].
  * Basically, it just works like a champ… I really like how it came together… WPF is awesome… it all feels _very_ peppy & responsive on my “aging” Quad Core 2…
  * currently implemented on sql server 2008 (express)… should be relatively database agnostic in theory, but…
  * The one big sql server 2008 dependency that I do use is _[SQL Server table*valued stored proc parameters][5]._
  * install the default database structure via [.BAK file][6]
  * This SQL Server table proc parm approach is a particularly fun optimization I’ve been itching to implement to see how it hangs together in lieu of using it elsewhere (whenever I can finally get my work to upgrade to SQL Server 2008!!! 🙂
  * Anyway, as far as the actual application goes, see screenshot, it’s WPF 4 code with a lot of little tricks I’ve learned along the way with my other much larger scope [WPF LOB project at work][7].
  * YASBE (“Yet Another Simple Backup Enabler”) immediately presents the typical checkboxed include/exclude filesystem tree where you select which folders are in and out… you can of course simply select a root drive letter if you’re organized to have everything you care about on one big data drive.
  * I underestimated the complexity of rolling my own folders treeview but [I like the work I achieved in the .Net IO FileSystem code][8] & [the corresponding WPF TreeView XAML here][9] (search for “TreeView”)… I’ve seen other examples of loading a WPF TreeView (telerik knowledge base etc)… but I feel like i did mine a little tighter… easier to copy/understand I think… the tree is efficiently _lazy loading_… ie it only scans the next set of folders down when you expand a parent
  * Then one would typically hit the “Select Next Disc's Worth Of Files” button and YASBE cranks down the list until it’s included 25GB worth of new/changed files that are candidates for going to a Blu*ray disk.
  * the .Net DirectoryInfo.GetFiles() appears to be adequately performant on my average desktop hardware … it scans my 200GB+ of photos and other important documents in <u><16 seconds</u>… actually it scans all those files, –AND\* uploads it to sql server (via table stored proc parameter) and does the comparison to all the previously recorded date stamps to determine what is new/changed… –AND\* sends that recordset back to the client and displays it on a datagrid, all that in 16 seconds… I’m absolutely pleased with that… I feel that the master blast of all those file records up to SQL Server using the table valued stored proc parm really nicely optimizes that step.
  * Then one would hit “copy to staging folder”… wait quite a bit longer to copy 25 GB to your Blu*ray’s staging folder (actually it’s effectively more around 23GB max from what I’ve read)
  * Then I highly recommend you burn your Blu*ray by drag/dropping your burn staging folder into Nero BurnLite ([which is free][10])
  * Nero BurnLite has been 100% reliable for me and it’s a perfectly bare bones data disc burning software, exactly what I want, without any other fluff.
  * I had _major_ reliability problems with Windows 7's built*in disc burning facility!!!… I coastered 5 out of 6 tries before I bailed and went to Nero… it becomes mentally painful trial and error at 25GB a pop for a cheap arse like me :)… Yet Win7 seems absolutely fine for DVD/CD burning… I’ve burned those successfully w/o a glitch.
  * Here’s the interesting anecdotal evidence, after the burn, Nero spews out a list of mandatory renames for files that somehow wouldn’t fit the disc’s file system… which is UDF I believe… I’m wondering if Win7 doesn’t perform that kind of necessary bulletproofing and that’s why the burns would always fail several minutes in, after wildly jumping around between random %complete estimates and a schizophrenic progress bar.
  * Nero methodically clicks off percent*completes nice & fast … seems like 25GB only takes about 15mins… very doable… I did 8 x 25GB discs to cover my whole photo library while working on other things and it went by like clockwork.

 [1]: https://forum.acronis.com/forum/14860
 [2]: https://lh3.ggpht.com/_XlySlDLkdOc/TW7WwiNKDRI/AAAAAAAAE4A/lllxfhmoIlQ/image_thumb%5B7%5D.png?imgmax=800 "image"
 [3]: https://lh5.ggpht.com/_XlySlDLkdOc/TW7WvBi6lOI/AAAAAAAAE38/sca1Hz*yjqs/s1600*h/image%5B13%5D.png
 [4]: https://github.com/Beej126/yasbe/
 [5]: /2011/12/sql*server*table*valued*stored.html
 [6]: https://code.google.com/p/yasbe/source/browse/#svn%2Ftrunk%2FDB
 [7]: /2010/10/wpf*net*40*application*framework.html
 [8]: https://code.google.com/p/yasbe/source/browse/trunk/App/FileSystemNode.cs
 [9]: https://code.google.com/p/yasbe/source/browse/trunk/App/MainWindow.xaml
 [10]: https://www.nero.com/eng/downloads*nbl*free.php