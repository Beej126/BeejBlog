---
title: Fix Orphaned SQL Server Database Users
author: Beej
type: post
date: 2011-02-23T19:01:00+00:00
year: "2011"
month: "2011/02"
url: /2011/02/fix-orphaned-sql-server-database-users.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 7162911567133804460
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2011/02/fix-orphaned-sql-server-database-users.html
categories:
  - Uncategorized
tags:
  - Database

---
<a href="http://vyaskn.tripod.com/troubleshooting_orphan_users.htm" target="_blank">Good reference</a>

Quick examples:

<pre class="prettyprint lang-sql">sp_change_users_login 'report' -- this shows the list of orphaned users in the current database
sp_change_users_login 'update_one', 'iTRAAC_User', 'iTRAAC_User' -- this is how you remap one
</pre>