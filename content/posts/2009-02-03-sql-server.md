---
title: SQL Server "CHECKSUM()"
author: Beej
type: post
date: 2009-02-03T09:34:00+00:00
url: /2009/02/sql-server.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 1615308544146131096
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2009/02/sql-server.html
tags:
  - Database

---
Absolutely crazy I hadn&#8217;t run across this little gem yet&#8230; could&#8217;ve used that bugger to get out of a couple jams.&#160; e.g. eliminating heavily duplicated xml blobs that represent incoming supply chain events/transactions.&#160; The BOL has a couple examples to get your juices flowing.&#160; e.g. Run it on a column list, CHECKSUM(*), to compare rows.&#160; There&#8217;s also BINARY\_CHECKSUM(), HashBytes() and CHECKSUM\_AGG() for different slices.