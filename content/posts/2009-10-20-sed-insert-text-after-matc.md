---
title: SED – Insert text after match
author: Beej
type: post
date: 2009-10-20T19:50:00+00:00
url: /2009/10/sed-insert-text-after-matc.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 7853496036489843822
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 1
blogger_permalink:
  - /2009/10/sed-insert-text-after-match.html
dsq_thread_id:
  - 5508631652
categories:
  - Uncategorized
tags:
  - CmdLine
  - Database

---
General syntax:

  * sed “s/search-for-regex/& replace-with/” filename.txt

Example:

  * sed &#8220;s/BEGIN AS/& nnSET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED/&#8221; Plans_s.sql

Explanation:

  * s/search-for-regex/replace-with/ = search and replace command
  * & = the matched text (effectively leaves the matched text alone rather than “replacing” it)
  * n = carriage return