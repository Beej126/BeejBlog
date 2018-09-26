---
title: Automatic Header Links
author: Beej
type: post
date: 2017-01-12T04:04:12+00:00
year: "2017"
month: "2017/01"
url: /2017/01/automatic-header-links.html
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:324:"a:1:{i:0;a:11:{s:2:"do";s:1:"1";s:9:"timeToRun";s:0:"";s:10:"SNAPformat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"819394602687827970";s:5:"pDate";s:19:"2017-01-12 04:04:35";}}";
dsq_thread_id:
  - 5517824179
categories:
tags:
  - Blogging
  - WebDev

---
I envied this little eye candy on some other blogs and it was easy to throw together.
  
&nbsp;
  
![image][1]

If you're on WordPress, a plugin like [Simple Custom CSS and JS][2] comes in handy for stuff like this.

### CSS

    a.headerLink:hover {
      color: inherit;
      opacity: 1;
    }
    a.headerLink {
      position: relative;
      transition: opacity 0.5s ease-in-out;
      cursor: pointer;
      opacity: .2;
    }
    a.headerLink i.fa {
      position: absolute;
      left: -1.5em;
    }
    a.headerLink:focus {
      color: inherit !important;
    }
    

### JS

      $(':header:not("[class]")').each(function(idx, el){
        var l = $(el);
        var name = l.text().replace(/\W+/g, "");
        l.prepend('<a name="'+name+'" class="headerLink" href=#'+name+'><i class="fa fa-chain"></i></a>');
      });

 [1]: https://cloud.githubusercontent.com/assets/6301228/21876423/a13e9ae2-d837-11e6-9016-0532c9d05bae.png
 [2]: https://wordpress.org/plugins/custom-css-js/