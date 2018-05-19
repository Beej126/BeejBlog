---
title: Hacking Profiler into SSMS Express
author: Beej
type: post
date: 2012-06-25T00:25:00+00:00
url: /2012/06/hacking-profiler-into-ssms-express.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4201967420601982223
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2012/06/hacking-profiler-into-ssms-express.html
dsq_thread_id:
  - 5533362005
tags:
  - Database

---
  * We can download the SQL Server Management Studio Express installer for free which makes for a convenient source for this tool when firing up a new Windows machine that you just want to connect to some servers and get to work &#8211; <http://www.microsoft.com/en-us/download/details.aspx?id=22985>   
    But SSMS Express doesn&#8217;t provide the Profiler (aka SQL Trace) component that I can&#8217;t live without. 
  * So &#8211; If you have access to a server where these "Extended Management Tools" are already installed, you can simply copy the handful of Profiler&#8217;s binary files to your drive and it&#8217;ll run fine&#8230; here&#8217;s the list&#8230; starting with a path like "C:Program Files (x86)Microsoft SQL Server100Tools": 
      * binnPROFILER.EXE 
      * binnPROFILER.EXE.CONFIG 
      * binnPFUI.DLL 
      * binnResources1033PROFILER.rll 
  * Go ahead and add Profiler.exe to your SSMS Tools menu if you like. 
  * Lastly, to patch up the ability to save templates (stolen from here: <http://sqlserverpedia.com/blog/sql-server-bloggers/where-did-the-sql-server-profiler-template-disappear/)> &#8211; just throw a "dummy.tdf" text file into this folder: "C:Program Files (x86)Microsoft SQL Server100ToolsProfilerTemplatesMicrosoft SQL Server1050". That 1050 is the specific SQL Server version number and obviously varies so just roll with whatever yours is&#8230; just browse to some other nearby folders to find what your magic version number happens to be. All the ones you&#8217;ve saved so far will magically start appearing in the templates selection drop down after that.