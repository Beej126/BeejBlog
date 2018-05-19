---
title: Zenphoto – Hide ‘Dot’ Files
author: Beej
type: post
date: 2012-11-26T12:41:00+00:00
url: /2012/11/zenphoto-hide-dot-files.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 509819073797864167
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2012/11/zenphoto-hide-dot-files.html
categories:
  - Uncategorized
tags:
  - Zenphoto

---
Pretty annoying there’s no easy built in way to not show images based on hidden file attribute. Best I could determine, one must implement dos “attrib” command or equivalent from PHP “exec” on _every file_ in order to respect hidden file attribute (that sounds like way too much overhead to add on to my already pokey image gallery). I’m floored file attribs aren’t part of a more robust PHP file object but I guess this kind of stuff is hard to support in an OS neutral way. I decided to run with renaming to .file.jpg and then hide those. Using ‘dot’ to represent hidden is very standard and pretty straightforward to accomplish the hiding via Zenphoto’s image\_filter plugin API. Zenphoto team provides generic image\_filter sample to start with here: <http://www.zenphoto.org/news/filter-file_searches> My dot file specific implementation (zero rocket science here): <https://docs.google.com/open?id=0B5htuLP66oWlOFRnSElPVktlVTA> Drop php file in your zenphotoplugins folder and enable via admin > plugins tab.