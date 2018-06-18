---
title: Oracle Forms 11g Development Installation Tips
author: admin
type: post
date: 2017-10-01T21:28:41+00:00
url: /2017/10/oracle-forms-11g-development-installation-tips.html
snap_isAutoPosted:
  - 1
snapTW:
  - 's:190:"a:1:{i:0;a:4:{s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"914602998038355969";s:7:"postURL";s:53:"https://twitter.com/BeejSEA/status/914602998038355969";s:5:"pDate";s:19:"2017-10-01 21:28:43";}}";'
dsq_thread_id:
  - 6186798565
categories:
  - Uncategorized
tags:
  - Database
  - Oracle

---
Yeah I actually said Oracle Forms, that product from the 90's... as one might guess, i happen to be on a legacy conversion project at work...
  
There's some rough edges getting these old bits to install and run that i wanted to capture...
<!--more-->

# Background

  * my project is tied to the Oracle Forms v11g stack... the latest 11.x version at this time appears to be 11.1.2.2.0
  * we're using the web servlet stuff which runs our forms as java applets... it's actually a pretty slick rich client arrangement for the bygone era it heralds from
  * <span class="hl">the primary breakthrough i made was getting it all installed once and then doing "xcopy" deploy of the main "Oracle Home" folder (c:\oracle\middleware) to my other team members' machines</span>... plus the appropriate registry branch (e.g. HKEY\_LOCAL\_MACHINE\SOFTWARE\ORACLE\KEY_OH1949191890)

# Java dependency

  * JDK required &#8211; JRE's not enough
  * JDK 1.6.0u35 &#8211; through painful trial and error i've settled on this fairly dated release... i've seen various components in this whole stack run on more recent JDK's but subsequent obscure runtime errors beat me into submission

### both 32 & 64bit required

  * we are running on Win10 x64 naturally preferring to install 64bit executables...
  * thereby running the 64bit Forms Builder installation which requires 64bit JDK...
  * however the servlet web site generates 32bit java <code> tag references (i'm kinda thinking IE was 32bit only at the time) so we also need the 32bit JDK installed

### Java Applet troubleshooting tips:

  * be aware that Control Panel > Java will most likely only show you the 64 bit control panel...
  * you'll need to specifically launch the 32bit panel via `C:\Program Files (x86)\Java\jdk1.6.0_35\jre\bin\javacpl.exe`
  * from there you'll want to enable the Advanced > Java Console > Show Console, to get some visibility on any exceptions firing
  * and very crucial tip here... Advanced > Default Java for browsers > Microsoft Internet Explorer is always greyed out but you can select that node and hit space bar to select it (nuts) 
      * its also probably helpful to go back to the 64bit javacpl and uncheck it there

### Browser dependency

  * IE (v11 works) is the only browser that will properly launch the 32bit java applet for us on Windows 10 x64 (not Chrome, not Firefox, not Edge)
  * IE11 can actually run in 64bit or 32bit mode depending on what each page's elements require and due to the 32bit java tags mentioned above, it spawns into a 32bit IExplore.exe process

# Main Installation Steps

  1. stop your virus checker's active file scan &#8211; we're on McAfee enterprise and everybody is pretty spooked that it interferes with these ancient installs and i had enough problems to go ahead and rule it out
  2. WebLogic Server <span class="hl">v1.0.3.6 hard dependency</span> 
      * i loosely understand weblogic as the web server backend, "servlets", which deliver the pages and java applets
      * as mentioned, we're targeting the 11g/11.x stack which drives this 1.0.3.6 version requirement... seriously, trust me, save yourself the trouble, any other version is not going to work with the 11.x Oracle Forms stack which comes next
      * [see download links at the bottom of this page][1]
      * <span class="hl">CRUCIAL &#8211; make sure to get the "Generic" jar &#8211; specifically wls1036_generic.jar</span>
      * <span class="hl">CRUCIAL &#8211; launch wls1036_generic.jar specifically via the golden JDK above under ELEVATED aka Admin command line like so</span> 
          * `C:\Program Files\Java\jdk1.6.0_35\bin -jar wls1036_generic.jar`
      * DO NOT just double click the .jar to launch, that will typically launch via JRE WHICH WILL ACTUALLY INSTALL WITHOUT ERROR AND THEN BITE YOU when it comes to the Oracle Forms piece... i know, nuts!
      * we went with the default c:\oracle "home" path... which wound up creating a single c:\oracle\middleware folder
  3. Oracle Forms 11.x ([v11.1.2.0 is current latest][2]) 
      * the x64 zips worked for us...
      * download & extract those zips and fire up the Disk1\setup.exe ELEVATED
      * the prompts are pretty straightforward... 
          * and one big important choice is to choose "Install Software &#8211; Do Not Configure"... we'll do the configure step next
          * we stuck with the default "Oracle_FRHome1" path
          * skip security updates (that ship has long since sailed ;)
      * once the install finishes then fire up c:\oracle\middleware\Oracle_FRHome1\bin\config.bat ELEVATED 
          * select "configure for development" vs deployment
          * provide the previous weblogic and oracle home paths...
          * we just went with FormInstance1 for the instance path
          * "for development only", didn't select the reports bits
          * auto port configuration = yes
  4. Lastly were specific environmental configs, [YMMV][3] 
      * copy our `default.env` file to c:\oracle\middleware\user\_projects\domains\FORMDomain\config\fmwconfig\servers\AdminServer\applications\formsapp\_11.1.2\config
      * copy our `formsweb.cfg` => c:\oracle\middleware\user\_projects\domains\FORMDomain\config\fmwconfig\servers\AdminServer\applications\formsapp\_11.1.2\config
      * copy our `tnsnames.ora` and `sqlnet.ora` => c:\oracle\middleware\FORMInstance\config
      * copy `jacob.jar` => c:\oracle\middleware\Oracle_FRHome1\forms\java
      * copy `jacob.dll` => c:\oracle\middleware\Oracle_FRHome1\forms\webutil (NOT down to either \win32|\win64)
      * CRUCIAL &#8211; update registry `HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\KEY_OH1949191890\FORMS_PATH` to include your forms ".fmb, .mmb, etc" file paths... we had separate folders for images, forms, libs & menus files to be included there 
          * this "KEY_OH1949191890" path is probably different for each installation

 [1]: http://www.oracle.com/technetwork/middleware/weblogic/downloads/wls-main-097127.html
 [2]: http://www.oracle.com/technetwork/developer-tools/forms/downloads/forms-downloads-11g-2735004.html
 [3]: https://en.wiktionary.org/wiki/your_mileage_may_vary#English