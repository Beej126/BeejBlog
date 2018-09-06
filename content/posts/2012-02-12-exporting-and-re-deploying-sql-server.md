---
title: Exporting and Re-deploying SQL Server 2008 Maintenance Plans
author: Beej
type: post
date: 2012-02-12T13:03:00+00:00
year: "2012"
month: "2012/02"
url: /2012/02/exporting-and-re-deploying-sql-server.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 7948791224975726051
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 2
blogger_permalink:
  - /2012/02/exporting-and-re-deploying-sql-server.html
dsq_thread_id:
  - 5508631333
tags:
  - Database

---
Challenge: There’s lots of chatter out there about working around various issues related to pulling an SSIS package out of an initial definition server and then reinstalling it on other servers.&nbsp; For example:

> INSERT statement conflicted with the FOREIGN KEY constraint "FK\_sysmaintplan\_log\_subplan\_id". The conflict occurred in database "msdb", table "dbo.sysmaintplan\_subplans", column 'subplan\_id'.

The following scripts are my effort to bundle all the steps into something that allows me to forget about the messy details.
  
For me this comes in handy for managing a standardized maintenance plan on many identical database instances... e.g. a bunch of replication subscribers.
  
Notes:

  * Full blown BIDS/SSIS vs Maintenance Plan wizard &#8211; My needs were met by the basic Maintenance Plan facility under the “Management” node in SQL Server Management Studio (SSMS).&nbsp; From what I understand, this supports a subset of the full SQL Server Integration Services (SSIS) functionality.&nbsp; Therefore, there is a lot of chatter about mixing and matching the two, with care.&nbsp; In my experience, once I had loaded my plan in BIDS (Business Intelligence Development Studio), attempted any modification and then tried to execute the corresponding DTSX back under Maintenance Plans, it was no longer compatible with that execution context and I simply didn’t try to decipher the errors any further.
  * I found that it’s convenient to have a “staging” server with identical SQL Server instance and database to what you care to redeploy to… therefore the maintenance plan you export is largely ready to go as-is.
  * One manual DTSX tweak that remains necessary is to delete the encrypted password node and add the password directly to the connection strings… I believe the encryption is tied to a machine based key and therefore isn’t portable but I could be wrong about that.
  * I’m using SQL Server 2008 R2.&nbsp; I’m assuming everything is 2008 “R1” compatible and could very well work on SQL Server 2005 but I haven’t tried it.

Here’s some <a href="https://code.google.com/p/itraacv2-1/source/browse/trunk/DB/Util/OvernightCleanupMaintPlan/" target="_blank">working code</a>.

  * All these scripts depend on environment variables SQLCMDUSER & SQLCMDPASSWORD being defined 
  * <a href="https://code.google.com/p/itraacv2-1/source/browse/trunk/DB/Util/OvernightCleanupMaintPlan/export_dtsx.cmd" target="_blank">export_dtsx.cmd</a> – Batch file which pulls the maintenance plan out of SQL Server to a local .DTSX file 
  * <a href="https://code.google.com/p/itraacv2-1/source/browse/trunk/DB/Util/OvernightCleanupMaintPlan/upload_dtsx.ps1" target="_blank">upload_dtsx.ps1</a> – PowerShell script which uploads the specified .dtsx file to the specified server.&nbsp; Most significantly, this logic handles pulling the pertinent GUID’s out of the dtsx XML which are required to create the corresponding scheduled job records. 
  * <a href="https://code.google.com/p/itraacv2-1/source/browse/trunk/DB/Util/OvernightCleanupMaintPlan/create_maint_plan_job.sql" target="_blank">create_maint_plan_job.sql</a> – upload_dtsx.ps1 execute this script to create the SQL Agent scheduled job corresponding to the maintenance plan… the current parameters establish an every night, midnight run.&nbsp; To determine representative arguments for your own preferred schedule, simply schedule a dummy job and “Generate Script” for that via SSMS.