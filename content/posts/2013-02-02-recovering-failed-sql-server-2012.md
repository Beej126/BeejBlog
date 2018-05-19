---
title: Recovering failed SQL Server 2012 Installation
author: Beej
type: post
date: 2013-02-02T22:31:00+00:00
url: /2013/02/recovering-failed-sql-server-2012.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4030947132890237414
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2013/02/recovering-failed-sql-server-2012.html
dsq_thread_id:
  - 5538468925
tags:
  - Database

---
  * I have to say, SQL Server’s setup.exe seems pretty dang fragile… I realize it’s a complicated script with endless dependencies and such, just saying… year after year I continue to run into various reasons that the setup twists it’s ankle on something, bombs out midstream and leaves behind a partial installation mess that can’t be repaired or uninstalled… maybe I’m just unlucky or perhaps I’m overly hard on poor old Windows. 
  * This most recent bout was SQL Server 2012 on Windows 8… a lot of this stuff hasn’t changed all that much since SQL Server 2000… I’ve had success with most of these commands when SQL Server 2005 – 2008R2 installs have gone sour on me in the past. 
  * **This is primarily an exercise in mule headedness… I wouldn’t look to this as a real resolution to a production problem…** I wound up with a running SQL Server and SQL Agent after an hour or so of banging but God only knows what other problems and missing chunks could still be lurking when I try to fire up other peripheral services like Service Broker, Database Mail, etc. 
  * During my SS2012 install on what I thought was a fairly fresh Win8 machine, SQL Browser was the original failure… ProcessMonitor showed me that the setup script was cranky about a missing a key around here: 
      * HKEY\_LOCAL\_MACHINESOFTWARE**<u>Wow6432Node</u>**MicrosoftMicrosoft SQL Server90SQL Browser … note the interesting WoW subtree 
  * I read a fair bit about various reg keys confusing the SQL Server installer and soon found myself unable to resist the sledgehammer urge … blowing away all reg keys and c:program files under “Microsoft SQL Server” just feels right 😉 
  * of course the next install didn’t go so hot either… next error was something about “MOF” and “WMI”… Googling yielded no silver bullets… 
  * eventually realized that the main SQL Server service was actually “installed” to some degree but in a non happy state… hmmm… I’ve been here before… let’s keep throwing some wrenches at it… 
  * first up, the SQL Server service wouldn’t start … 
  * managed to get some help from launching SQL Server exe via command line: C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLBinn>sqlservr.exe –sMSSQLSERVER2012 
      * note that my chosen SQL Server instance name is “MSSQLSERVER2012” so you’ll need to substitute that with your own, or none at all if you are using default instance 
      * was getting errors like this:   
        2013-02-02 12:08:26.74 Server&#160;&#160;&#160;&#160;&#160; Error: 17058, Severity: 16, State: 1.   
        2013-02-02 12:08:26.74 Server&#160;&#160;&#160;&#160;&#160; initerrlog: Could not open error log file &#8221;. Operating system error = 3(The system cannot find the path specified.). 
  * got sqlservr.exe to run a little further by specifying the errorlog path parm: 
      * -e"C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLLOGERRORLOG" 
  * Next errors made me realize I needed to provide all the missing system databases by copying them 
      * from: C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLBinnTemplates 
      * to: C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLDATA 
      * and specify the master.mdf/ldf via command line: 
          * –m”C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLDATAmaster.mdf" 
          * -l"C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLDATAmastlog.ldf" 
  * Next errors were like this: 
    2013-02-02 12:54:59.13 spid4s&#160;&#160;&#160;&#160;&#160; Starting up database &#8216;msdb&#8217;.   
    2013-02-02 12:54:59.13 spid8s&#160;&#160;&#160;&#160;&#160; Starting up database &#8216;mssqlsystemresource&#8217;.   
    2013-02-02 12:54:59.14 spid4s&#160;&#160;&#160;&#160;&#160; Error: 17204, Severity: 16, State: 1.   
    2013-02-02 12:54:59.14 spid4s&#160;&#160;&#160;&#160;&#160; FCB::Open failed: Could not open file **<u>e:sql11\_main\_t.obj.x86releasesqlmkmastrdatabasesobjfrei386MSDBData.mdf</u>** for file number 1.&#160; OS error: 3(The system cannot find the path specified.).   
    2013-02-02 12:54:59.14 spid4s&#160;&#160;&#160;&#160;&#160; Error: 5120, Severity: 16, State: 101.   
    2013-02-02 12:54:59.14 spid4s&#160;&#160;&#160;&#160;&#160; Unable to open the physical file "e:sql11\_main\_t.obj.x86releasesqlmkmastrdatabasesobjfrei386MSDBData.mdf". Operating system error 3: "3 (The system cannot find the path specified.)".   
    2013-02-02 12:54:59.15 spid4s&#160;&#160;&#160;&#160;&#160; Error: 17207, Severity: 16, State: 1.   
    2013-02-02 12:54:59.15 spid4s&#160;&#160;&#160;&#160;&#160; FileMgr::StartLogFiles: Operating system error 2(The system cannot find the file specified.) occurred while creating or opening file &#8216;e:sql11\_main\_t.obj.x86releasesqlmkmastrdatabasesobjfrei386MSDBLog.ldf&#8217;. Diagnose and correct the operating system error, and retry the operation. </p> 
    
      * I’m gathering this “e:sql11\_main\_t.obj.x86release” path was where all the temporary files sat during installation… I haven’t been able to track down where that path is stored in order to set it right… for now I took the easy way out and simply created a <a href="http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html#contact" target="_blank">symbolic link</a> from that bogus path to my C: path and as they say, robert is your father’s brother. 
  * Next problem was that the failed installation hadn’t gotten to the point of establishing any of the sysadmins logins… so couldn’t get SSMS to connect to the instance … I’ve actually run into this before… it’s not that bad to work around \*IF\* you can log into windows as the builtin “Administrator” account… 
      * start sqlservr.exe in single user (aka maintenance mode) via: sqlservr.exe –m {plus all other parms previously mentioned} 
      * enable your local Administrator account via cmd: net user administrator /active:yes 
      * then login to Windows as Administrator (switch user) 
      * fire up SSMS under this account and you should now be able to connect to your cranky SQL Server instance 
      * add your missing sysadmin logins… e.g. sa, “BUILTINAdministrators” and anything else you want… note: the NT account browser doesn’t display “BUILTINAdministrators” in the list but it worked fine entered manually. 
      * now you can logoff your Administrator account, switch back to your preferred login, stop sqlservr.exe via CTRL-C, start it back up in normal mode (without –m) and you should be able to connect normally 
  * To get the service to start normally you could enter the –e, –d, –l parms on the service command line but I found that it is registry entries that normally provide these defaults so I went that route: 
      * HKEY\_LOCAL\_MACHINESOFTWAREMicrosoftMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLServerParameters 
          * add string value: SQLArg0 
              * -dC:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLDATAmaster.mdf 
          * SQLArg1 = –e{path} 
          * SQLArg2 = –l{path} 
  * The last annoyance laughing in my face was the SQL Agent… Service not even installed. 
      * here’s the command line that wound up having the right footprint to make SSMS recognize a happy SQL Server Agent node: 
          * sc create SQLAgent$MSSQLSERVER2012 binPath= "C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLBinnSQLAGENT.EXE -i MSSQLSERVER2012" type= own start= auto depend= netbios DisplayName= "SQL Server Agent (MSSQLSERVER2012)" 
      * I think this reg key was also crucial: 
          * HKEY\_LOCAL\_MACHINESOFTWAREMicrosoftMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012SQLServerAgent 
              * “ErrorLogFile” (String Value) = C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLLOGSQLAGENT.OUT 
      * everything seems to be fairly in order but I do see some evidence of a few remaining missing chunks when I browse the SQL Agent properties under SSMS… hopefully I don’t really care about those settings 
      * couple other tips: 
          * you can run C:Program FilesMicrosoft SQL ServerMSSQL11.MSSQLSERVER2012MSSQLBinnSQLAGENT.EXE from command line to get some clues 
          * -c tells it to run as a standalone exe outside of the service control manger 
          * -v is verbose output and looks useful 
          * -I is the SQL Server instance designation
  * One remaining annoyance is that that SQL Server Network Configuration nodes are all empty under the SQL Server Configuration Manager console… no errors, just empty… supposedly this is tied to the “Client Tools Connectivity” installation item but I’ve remove/re-installed that successfully, to no avail… would love to hear how to recover this management panel functionality.