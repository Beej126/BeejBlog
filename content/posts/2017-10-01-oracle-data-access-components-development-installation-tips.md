---
title: Oracle Data Access Components – Development Installation Tips
author: admin
type: post
date: 2017-10-01T21:56:17+00:00
url: /2017/10/oracle-data-access-components-development-installation-tips.html
snap_isAutoPosted:
  - 1
snapTW:
  - 's:190:"a:1:{i:0;a:4:{s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"914609943017177088";s:7:"postURL";s:53:"https://twitter.com/BeejSEA/status/914609943017177088";s:5:"pDate";s:19:"2017-10-01 21:56:19";}}";'
dsq_thread_id:
  - 6184372096
categories:
  - Uncategorized
tags:
  - Database
  - Oracle

---
### aka ODAC

## [start here for latest downloads][1]

## Oracle Provider for OLE DB

  * I initially found a free generic database object browser tool called [Oracle Maestro][2]&#8230; 
      * i actually wound up landing on a much better tool, [linked below][3], but getting Maestro to work walked me through some troubleshooting which would come up for anything requiring OLEDB connectivity
      * Maestro happened to be 32bit only and as usual, the bitness of our runtime is a fun factor&#8230;
  * the need for an OLEDB connection string prompted my handy trick of creating a &#8220;test.udl&#8221; file and then double clicking it to get into a helpful OLD DB Config Wizard UI&#8230; once you&#8217;ve configured a connection, just notepad that UDL file to copy/paste the connection string, nice!
  * i didn&#8217;t have any Oracle providers loaded on my naked win10 instance so i hit the download site above and initially loaded the [64-bit ODAC 12.2c Release 1 (12.2.0.1.0) for Windows x64][4]
  * back to test.udl&#8230; now the Oracle provider was listed but immediately upon hitting &#8220;next&#8221; i got &#8220;**Provider is no longer available. Ensure that the provider is installed properly.**&#8220;&#8230; 
      * using [SysInternals ProcMon][5] i saw it seemed to be failing to find oci.dll &#8230; started smelling like a binaries path issue&#8230; eventually i flip flopped the order of $\oraclehome64\ & $\oraclehome64\bin in my system path and that went away&#8230; perhaps also simply because of a reboot
  * i had a connection string now&#8230;
  * however, firing up Oracle Maestro, the Oracle Provider was not listed&#8230; that&#8217;s when i remembered the deal with 32bit and 64bit OLEDB stacks&#8230;
  * now loaded &#8220;32-bit ODAC 12.2c Release 1 and Oracle Developer Tools for Visual Studio (12.2.0.1.0)&#8221;
  * and back to test.udl, here&#8217;s where i use another trick&#8230; launching c:\windows\SysWow64\cmd.exe and then `start test.udl` from there makes sure i&#8217;m launching the 32bit OLEDB config UI which happens to be via a C:\Windows\SysWOW64\rundll32.exe command line vs C:\Windows\System32\rundll32.exe
  * here is an example &#8220;TNS-less&#8221; DataSource for OLE DB based connections: (DESCRIPTION = (ADDRESS\_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = ABC.org)(PORT = 1521)) ) (CONNECT\_DATA = (SID = XYZ) ) )

![][6]

## .Net Core Projects and &#8220;ODP.NET Managed Driver&#8221; aka ManagedDataAccess

  * Just reference through Nuget <span class="hl">however it is not .Net Core Runtime compatible yet</span> ([supposedly .Net Core 2.0 savvy version coming end of 2017][7])&#8230; 
  * Must run on top of traditional .Net Framework until Oracle releases their .Net Core 2.0 compatible update 
  * Under VS2017 the ASP.Net Core MVC project template is friendly to this mix (see next screenshot below) 
      * which also gives us the necessary clue to spin up other less flexible Core project templates and manually edit the csproj to <TargetFramework>net461</TargetFramework>

![][8]

### nPoco requiring DbProviderFactory vs direct instantiation UNDER .Net Core

  * typical error message: System.ArgumentException: &#8216;Unable to find the requested .Net Framework Data Provider. It may not be installed.&#8217;
  * the gist is the current Core incompatible ODP.Net is expecting to configure our project&#8217;s app.config or web.config &#8230;
  * yet as we know, Core has shifted to appsettings.json, no .config file present&#8230; which leads me to next heading&#8230;
  * yet, in this case, there&#8217;s simply a 3rd parameter where we can pass the factory like so:
  
    `new NPoco.Database(ConnectionString, NPoco.DatabaseType.OracleManaged, Oracle.ManagedDataAccess.Client.OracleClientFactory.Instance)`

### Tip &#8211; Generally fixing .Net Framework based Nuget lib&#8217;s configuration under .Net Core projects

  1. spin up a quick traditional framework console app
  2. nuget reference the culprit Nuget lib as usual (&#8220;Oracle.ManagedDataAccess&#8221; in this case)
  3. copy the pertinent sections in the resulting app.config to your `C:\Windows\Microsoft.Net\Framework(64)\v4.0.30319\Config\machine.config` 
      * [this stack-o clued me in][9] to remember there is both a `Framework` and `Framework64` folder&#8230;
      * i&#8217;ve noticed, in my environment anyway, an ASP.Net MVC Core site launches under a 32bit process requiring the settings to be present in `\Framework`
      * while a .Net Core Console app will launch a 64bit process requiring the `\Framework64` settings

machine.config entries i wound up editing in as of current version

  ```xml
  <configuration>
    <configSections>
      <section name="oracle.manageddataaccess.client"
        type="OracleInternal.Common.ODPMSectionHandler, Oracle.ManagedDataAccess, Version=4.122.1.0, Culture=neutral, PublicKeyToken=89b483f429c47342"/>
    
    ...
    
    <system.data>
      <DbProviderFactories>
        <remove invariant="Oracle.ManagedDataAccess.Client"/>
        <add name="ODP.NET, Managed Driver" invariant="Oracle.ManagedDataAccess.Client" description="Oracle Data Provider for .NET, Managed Driver"
            type="Oracle.ManagedDataAccess.Client.OracleClientFactory, Oracle.ManagedDataAccess, Version=4.122.1.0, Culture=neutral, PublicKeyToken=89b483f429c47342"/>
      </DbProviderFactories>
    </system.data>
    
  </configuration>
  ``` 

### snapshot of the nuget install

![][10]

### snapshot of the DbProviderFactory error

![][11]

# 3rd Party Tools

  * [Devart&#8217;s dbForge Studio for Oracle free Express edition][12] looks like a winner&#8230; no OLEDB ODAC required??

 [1]: http://www.oracle.com/technetwork/topics/dotnet/downloads/index.html
 [2]: https://www.sqlmaestro.com/products/oracle/maestro/
 [3]: #3rdPartyTools
 [4]: http://www.oracle.com/technetwork/database/windows/downloads/index-090165.html
 [5]: https://docs.microsoft.com/en-us/sysinternals/downloads/procmon
 [6]: https://www.beejblog.com/wp-content/uploads/2017/10/snap217.png
 [7]: http://www.maherjendoubi.io/odp-net-on-microsoft-net-core/
 [8]: https://www.beejblog.com/wp-content/uploads/2017/10/snap218.png
 [9]: https://stackoverflow.com/a/26039859
 [10]: https://www.beejblog.com/wp-content/uploads/2017/10/snap220.png
 [11]: https://www.beejblog.com/wp-content/uploads/2017/10/snap219.png
 [12]: https://www.devart.com/dbforge/oracle/studio/download.html