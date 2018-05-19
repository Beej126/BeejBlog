---
title: SQL Server Aliasing
author: Beej
type: post
date: 2014-02-08T22:55:00+00:00
url: /2014/02/sql-server-aliasing.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 416643847584891793
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2014/02/sql-server-aliasing.html
blogger_thumbnail:
  - http://4.bp.blogspot.com/-tBsvz4YcEBU/Uva1d05QNeI/AAAAAAAADmo/1iBaJmRZzK0/s1600/SQL+Server+Configuration+Manager.png
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
dsq_thread_id:
  - 5753675646
categories:
  - Uncategorized
tags:
  - Database

---
<div class="separator" style="clear: both; text-align: center;">
  <a href="http://www.BeejBlog.com/wp-content/uploads/2014/02/SQL-Server-Configuration-Manager.png" imageanchor="1" style="clear: right; float: right; margin-bottom: 1em; margin-left: 1em;"><img border="0" src="http://www.BeejBlog.com/wp-content/uploads/2014/02/SQL-Server-Configuration-Manager.png" height="557" width="640" /></a>
</div>

  * Done via &#8220;SQL Server Configuration Manager&#8221; > &#8220;SQL Native Client vXY.Z Configuration&#8221; > Aliases
  * tip: SSMS.exe is a 32bit app (because Visual Studio, upon which it is based, still has a <a href="http://blogs.msdn.com/b/ricom/archive/2009/06/10/visual-studio-why-is-there-no-64-bit-version.aspx" target="_blank">well established justification for 32bit</a>) and therefore it depends on the (32bit) Client Configuration node above to find your server alias
  * For mainstream sql server network client API based connections there is no need to put this alias anywhere else (i.e. not in DNS/hosts file nor AD computers)
  * tip: in AD trusted login context, it seems mandatory to use the name of the actual SQL Server host machine vs just the corresponding ip address; otherwise i would always get bonked with &#8220;Login failed. The login is from an untrusted domain and cannot be used with Windows authentication.&#8221;