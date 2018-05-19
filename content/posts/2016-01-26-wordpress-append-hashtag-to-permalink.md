---
title: WordPress Append HashTag to PermaLink
author: Beej
type: post
date: 2016-01-26T00:13:00+00:00
url: /2016/01/wordpress-append-hashtag-to-permalink.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 8151836610676817802
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2016/01/wordpress-append-hashtag-to-permalink.html
dsq_thread_id:
  - 5517572015
tags:
  - WordPress

---
Motivation: Running a site with a big banner header &#8212; of course this decision must be weighed itself &#8212; on a user screen with low vertical res (e.g. 1024 x 768), the homepage would only show the header link of the first post summary (we&#8217;re also using [&#8220;Add Posts to Page&#8221; plugin][1], with it&#8217;s &#8216;read more&#8217; summary function)&#8230; clicking on the post would then nav to relatively same thing, staring at a big banner.

Simple potential solution: Quick inspection of page structure proved that simply jumping to #main would do dandy to scroll content well into view&#8230; it seemed like a simple matter of selecting wp-admin > Settings > Permalinks > Custom Structure and slapping #main on the end&#8230; but no, of course that&#8217;s too easy&#8230;WP strips # hash tag out upon save&#8230; searched around quite a bit and all suggested solutions are long hacky affairs of forcing the jump after the page is rendered&#8230; 

SOLVED: Skip the admin UI and simply modify the database => select * from wp\_options where option\_name like &#8216;%link%&#8217;

 [1]: https://www.webmechanix.com/resources/wordpress-plugins/add-posts-to-pages/