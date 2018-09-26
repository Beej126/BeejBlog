---
title: Volume Shadow Copy Service is Pretty Cool
author: Beej
type: post
date: 2009-01-09T18:49:00+00:00
year: "2009"
month: "2009/01"
url: /2009/01/volume-shadow-copy-service-is-pretty.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 1369638866722272309
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2009/01/volume-shadow-copy-service-is-pretty.html
blogger_thumbnail:
  - https://lh6.ggpht.com/_XlySlDLkdOc/SWcrt5E7KmI/AAAAAAAACq4/W3QaS1nSj8w/image_thumb%5B4%5D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
dsq_thread_id:
  - 5753667849
categories:
tags:
  - SysAdmin

---
(at least in Windows 2008) More specifically the "Previous Versions" functionality that leverages this service. To cut to the chase, **I didn't realize that you could browse into whole folders worth of snapshots**... screenshot below says it all... Notice that there's a funky "localhostdrive$@GMT..." syntax for getting at the old version of that folder... in this case I shadowed the entire drive starting at the root level. After Googling around a little more on this I'm starting to think us Winblows users shouldn't be quite so OSX TimeWarp jealous and that VSS although not as sexy, is perhaps even more robust. In case you have no idea what I'm talking about this is a built in file level "snapshot" feature at the OS level... we get to recover the previous version of any file that's been snapshot this way... I'm not sure yet but I think one might be able to turn it on so that a snapshot automatically occurs whenever you modify a file. [<img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="347" alt="image" src="https://lh6.ggpht.com/_XlySlDLkdOc/SWcrt5E7KmI/AAAAAAAACq4/W3QaS1nSj8w/image_thumb%5B4%5D.png?imgmax=800" width="508" border="0" />][1] It's kinda tucked away ... you have to manually go and turn it on under the Properties of your drive letters: [<img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="362" alt="image" src="https://lh6.ggpht.com/_XlySlDLkdOc/SWcrvEHCkDI/AAAAAAAACrA/gZOwwHWyOpA/image_thumb%5B2%5D.png?imgmax=800" width="345" border="0" />][2] Here we can create snapshots manually of course. And you'll want to check out the snapshot schedule under Settings button which defaults to weekly... might wanna make that more often ;) One quickly realizes the best strategy is not to simply blindly shadow your whole drive but to define a frequent schedule on your documents and development type folders ... pick and choose like that depending on the specific content. The help is quick to point out its something to be used in tandem with normal backups and is not a replacement.

 [1]: https://lh4.ggpht.com/_XlySlDLkdOc/SWcrtD50j2I/AAAAAAAACq0/AicWwxyVbZA/s1600-h/image%5B10%5D.png
 [2]: https://lh6.ggpht.com/_XlySlDLkdOc/SWcrug3QWLI/AAAAAAAACq8/XKNsB8m6hWE/s1600-h/image%5B6%5D.png