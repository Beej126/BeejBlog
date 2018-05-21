---
title: Migrate from Delicious to Diigo
author: Beej
type: post
date: 2016-04-30T19:13:27+00:00
url: /2016/04/migrate-from-delicious-to-diigo.html
dsq_thread_id:
  - 5569890296
tags:
  - Productivity

---
Delicious set the standard but they've been a bit of a bumpy ride lately with reliability... according to their <s>[blog][1]</s> [blog][2] they recently moved back to old code base and Del.icio.us domain (ah memories :)... and then _just_ as of today just got their settings page operational such that I could successfully export my bookmarks and hop to another free link lily pad... the export yields a simple html file full of links.
  
&nbsp;

I've initially setted on [Diigo][3]... it's pretty slick... there's a nicely robust [Chrome plugin][4].
  
&nbsp;

Below is a little jQuery i threw together to truncate my Delicious links at a certain cutoff date so I'm not loading a bunch of old junk.
  
Edit the exported html file and add jquery in the head like so and F5 refresh the page.

    <head>
      <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
    </head>
    

then run this JS straight from the F12 developer tools console in Chrome, or whatever you prefer

    // this approach works on "bookmark file" format. e.g. what Delicious.com exports
    // basically just an html file full of <a> tags wrapped with <dt>'s inside one big <dl>
    // key attributes: ADD_DATE="1461441710" TAGS="BestStuffEver"
    // the date format is in seconds... to make it JS Date compatible just multiply value by 1000 (i.e. milliseconds)
    
    // find the "add_date" of the oldest entry you want to keep
    var cutoffDate = new Date(1345307846000)
    
    // this then deletes all the links older than cutoffDate
    $("a").each(function(idx, el) {
      if( new Date($(el).attr("add_date")*1000) < cutoffDate ) { var par = $(el).parent(); par.next("dd").remove(); par.remove(); }
    });
    
    // then just save-as that page
    
    // and import to Diigo :)
    // https://www.diigo.com/tools/import_all

 [1]: http://blog.delicious.com
 [2]: http://blog.del.icio.us/
 [3]: http://diigo.com
 [4]: https://chrome.google.com/webstore/detail/diigo-web-collector-captu/pnhplgjpclknigjpccbcnmicgcieojbh?hl=en