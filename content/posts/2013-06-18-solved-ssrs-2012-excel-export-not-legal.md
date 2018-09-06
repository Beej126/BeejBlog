---
title: '[SOLVED] SSRS (2012), Excel export, “Not a legal OleAut date” error'
author: Beej
type: post
date: 2013-06-18T18:28:00+00:00
year: "2013"
month: "2013/06"
url: /2013/06/solved-ssrs-2012-excel-export-not-legal.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 8822221466669041312
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2013/06/solved-ssrs-2012-excel-export-not-legal.html
snapEdIT:
  - 1
snapTW:
  - 's:162:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5509076209
categories:
  - Uncategorized
tags:
  - Database

---
### Cause

For my situation, it wound up being that executing TimeSerial(0,0,secs) in some vbscript code, when the "secs" param value was greater than 24 hours.

### Analysis

Somehow out of all the different formats SSRS will export to, the Excel output was the only one running into this issue.

From the [TimeSerial][1] specs I don’t see anything inherently invalid about going that high... the docs indicate it simply rolls it into the day portion of the resulting value as I would expect. Given that the error refers to "Ole", there must be some other intermediate data type conversion going on here... perhaps it passes through a time only type???

 [1]: https://msdn.microsoft.com/en-us/library/microsoft.visualbasic.dateandtime.timeserial.aspx