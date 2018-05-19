---
title: 'Self-hosting Zenphoto on Windows 7 (IIS7, PHP & MySQL)'
author: Beej
type: post
date: 2010-10-23T23:50:00+00:00
url: /2010/10/self-hosting-zenphoto-on-windows-7-iis7.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 8912860079158299742
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 5
blogger_permalink:
  - /2010/10/self-hosting-zenphoto-on-windows-7-iis7.html
blogger_thumbnail:
  - http://lh6.ggpht.com/_XlySlDLkdOc/TMMSU9BrwgI/AAAAAAAAE0w/Ft6SInH1-RM/image_thumb%5B6%5D.png?imgmax=800
dsq_thread_id:
  - 5508631365
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
  - Uncategorized
tags:
  - Zenphoto

---
I really like ZenPhoto &#8211; it&#8217;s a solid photo gallery with an easy point and click web admin GUI.   
The main thing I dig is that i can point it at my main photos folder on my hard drive (via a quick symbolic link) and it goes to town dynamically publishing whatever I drop there without any other fiddling… that&#8217;s photo sharing nirvana if you ask me. [Update: 25 Oct 2010] After running the gallery for a couple days I’d have to say Apache did a better job at popping the pages back than what I’ve got setup under IIS so far… maybe Apache just deals with these more CGI oriented modules better than IIS can for some fundamental reason… I do have PHP “FastCGI” enabled for IIS… any performance tips would be greatly appreciated 🙂 I’ll have to go find some trace tools to see where it’s spending most of its time.&#160; I guess it could still be caching images since ZenPhoto pulls a new random image for the album cover each time you refresh the page and I did wipe the cache when I migrated over to IIS. [Update: 29 Oct 2010] Setting Admin Options > Image subtab > Full image protection = Unprotected &#8211; yields a noticeable speed boost presumably because it skips a bunch of file I/O… now it feels back on par with what I was seeing in Apache… unfortunately, I just don’t remember how I had that setting under Apache. **<u>Installs:   
</u>**

  * I installed them all to c:Program Files because that&#8217;s my speedy SSD and I want this site to be as performant as possible 
      * then i simply SymLink my main photos folder (on a RAID1 volume elsewhere) over the top of c:Program Fileszenphotoalbums 
      * here&#8217;s an awesome <a href="http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html" target="_blank">SymLink utility</a> for Windows Explorer!! 
  * IIS &#8211; I&#8217;m on Win7 so it&#8217;s IIS7 &#8211; Apache&#8217;s cool and all but i saw a note somewhere that gave me the impression that on Windows, IIS + PHP via FastCGI module is&#160; going to be more performant than Apache&#8230; otherwise, I did previously run it all on Apache just fine via the nifty "XAMPP" stack that installs everything for you in minutes and it "just works" which was honestly much less trouble than getting it all to hang together under IIS7 myself. 
  * <a href="http://windows.php.net/download/)" target="_blank">PHP</a> &#8211; there&#8217;s a specific Windows/IIS “Fast CGI” version (current version: 5.3.3) (<a href="http://www.iis-aid.com/articles/my_word/difference_between_php_thread_safe_and_non_thread_safe_binaries" target="_blank">see this for Thread Safe vs Non Thread Safe binaries</a>, non thread safe + IIS FastCGI is most performant) 
  * <a href="http://dev.mysql.com/downloads/" target="_blank">MySQL</a> &#8211; and their WorkBench tool is handy (current version: 5.1.51) 
      * there&#8217;s a lot of environmental tuning questions during the install wizard but i mostly selected default settings 
      * I chose to go with a MySQL_Data subfolder for the datafiles 
      * configure for TCP/IP access (i don&#8217;t yet know how to configure PHP to connect to MySQL over named pipes) 
  * <a href="http://www.zenphoto.org/index.php" target="_blank">ZenPhoto</a> &#8211; just an unzip (current version: 1.3.1.2) 
  * <a href="http://blueskywebcreations.com/zpgalleriffic/themes/zpgalleriffic/readme.html" target="_blank">zpGallerific</a> theme (current version: 1.0) 

<u>**FIREWALL!!!**</u> turn it completely off to begin with so you know whether it&#8217;s your main problem or not 

  * I had to add these two rules to BitDefender 
  * [<img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="http://lh6.ggpht.com/_XlySlDLkdOc/TMMSU9BrwgI/AAAAAAAAE0w/Ft6SInH1-RM/image_thumb%5B6%5D.png?imgmax=800" width="958" height="46" />][1] 
  * THE ORDER OF THE RULES MATTERS&#8230; MOVE THESE TO THE VERY TOP of the list with the arrow buttons!! 
  * helpful: <http://forum.bitdefender.com/index.php?showtopic=12764> 
  * nutshell: to see what&#8217;s blocked "Increase Verbosity" and "Show Log" on Activity tab&#160; 

<u>**Folder Permissions:   
** </u>

  * grant IUSR full permissions to root zenphoto folder (IIS_IUSRS group did NOT work) 
      * it was also necessary on the true target of the symlinked albums folder 
  * <strike>something happened on my win7 box where my albums folder was no longer accessible to zenPhoto/PHP… maybe a Windows Update closed a security loophole or something… </strike> 
      * <strike>anyway, I found this: </strike>[<strike>http://www.gotknowhow.com/articles/fix-login-failed-for-user-iis-apppool-aspnet-v4-error-iis7</strike>][2]<strike> </strike>
      * <strike>the basic idea is to change the account for the AppPool that’s running your site to something specific rather than the pseudo “ASP.Net V4.0” / ApplicationPoolIdentity accounts used by default… so I changed to LocalSystem and everything started working again</strike> 

**<u>IIS Tweaks:</u>**

  * Enable 32bit PHP under IIS on 64bit Windows 
      * install IIS6.0 script compatibily 
      * cscript %SYSTEMDRIVE%inetpubadminscriptsadsutil.vbs SET W3SVC/AppPools/Enable32bitAppOnW 
  * MOD_REWRITE 
      * once I got everything fired up I realized that it’d be nice to support my old URLs that I’ve mailed out to everybody already 
      * interesting thing was, Apache was doing something cool I didn’t realize… it was mod_rewrite’ing my php urls for me so they looked like pretty folders 
      * actually zenphoto was kicking out the pretty urls and mod_rewrite was translating them back into /index.php?album=blah format behind the covers 
      * IIS doesn’t do that right out of the box but they have a nice free <a href="http://www.iis.net/download/urlrewrite" target="_blank">URL Rewrite module</a> you can drop in to do this very same thing (v2.0 currently) 
      * you have to restart IIS Manager GUI after you install to see the “URL Rewrite” icon under the “IIS” section of your web site 
      * it has a good wizard for the easy stuff which is all I needed to map “photos/(.*)/” to “photos/index.php?album={R:1}” 
      * also under conditionals, input: {REQUEST_FILENAME} => “Is Not a File” & “Is Not a Folder” was crucial to allow the real URLs for direct downloading of images and such to continue working 
      * Here&#8217; are all the rewrite rules I needed to apply: 

> <div id="scid:9ce6104f-a9aa-4a17-a79f-3a39532ebf7c:30c1d045-4a99-410d-b019-f6569c0f34ed" class="wlWriterSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
>   <div class="le-pavsc-container">
>     <div class="le-pavsc-titleblock">
>       web.config
>     </div>
>     
>     <div style="overflow: auto; background: #ddd; max-height: 200px">
>       <ol style="background: #f4f4f4; padding-bottom: 0px; padding-top: 0px; padding-left: 5px; margin: 0px 0px 0px 2.5em; padding-right: 0px">
>         <li>
>           <?xml version="1.0"?>
>         </li>
>         <li>
>           <configuration>
>         </li>
>         <li>
>           &#160;&#160;&#160; <system.webServer>
>         </li>
>         <li>
>           &#160;
>         </li>
>         <li>
>           &#160;&#160;&#160; <rewrite>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <rules>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <clear/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <rule name="RewriteUserFriendlyURL6" enabled="true" stopProcessing="true">
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <match url="^page/search/archive/(.*)$"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <conditions logicalGrouping="MatchAll" trackAllCaptures="false">
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </conditions>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <action type="Rewrite" url="index.php?p=search&date={R:1}"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </rule>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <rule name="RewriteUserFriendlyURL5" enabled="true" stopProcessing="true">
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <match url="^page/([0-9]+)/?$"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <conditions logicalGrouping="MatchAll" trackAllCaptures="false">
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </conditions>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <action type="Rewrite" url="index.php?page={R:1}"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </rule>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <rule name="RewriteUserFriendlyURL4" enabled="true" patternSyntax="ECMAScript" stopProcessing="true">
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <match url="^page/(.*?)$"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <conditions logicalGrouping="MatchAll" trackAllCaptures="false">
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </conditions>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <action type="Rewrite" url="index.php?p={R:1}" appendQueryString="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </rule>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <rule name="RewriteUserFriendlyURL1" enabled="true" stopProcessing="true">
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <match url="^(.*?)/?$"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <conditions logicalGrouping="MatchAll" trackAllCaptures="false">
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </conditions>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <action type="Rewrite" url="index.php?album={R:1}" appendQueryString="false"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </rule>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </rules>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160; </rewrite>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160; <directoryBrowse enabled="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160; </system.webServer>
>         </li>
>         <li>
>           &#160;
>         </li>
>         <li>
>           &#160; <system.web>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160; <compilation targetFramework="4.0" debug="true"/>
>         </li>
>         <li>
>           &#160;&#160;&#160;&#160;&#160;&#160;&#160; <pages controlRenderingCompatibilityVersion="3.5" clientIDMode="AutoID"/>
>         </li>
>         <li>
>           &#160; </system.web>
>         </li>
>         <li>
>           &#160;
>         </li>
>         <li>
>           </configuration>
>         </li>
>       </ol>
>     </div></p>
>   </div></p>
> </div>
> 
> [<img title="Create Self-Signed Cert IIS7" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="Create Self-Signed Cert IIS7" src="http://lh4.ggpht.com/_XlySlDLkdOc/TbxXEY9WyDI/AAAAAAAAE8M/NNqMOakeZL0/Create%20Self-Signed%20Cert%20IIS7_thumb%5B3%5D.png?imgmax=800" width="590" height="412" />][3] 

**<u>PHP Setup:</u>**

  * Map an IIS virtual directory to your zenphoto root 
  * browse to <http://{your domain}/{zenphoto virtual dir}/setup.php> 
  * it&#8217;ll probably bark about a couple settings you have to make manually&#8230; no biggie hopefully 
  * you&#8217;ll have to reset "World Wide Web Publishing Service" to refresh any PHP settings it tells you to twiddle 
  * I had to leave file/folder permissions as "loose (0777)"&#8230; all of the stricter settings blocked zenphoto subfolder permissions 
  * MySQL settings: 
      * root login & password 
      * 127.0.0.1:3306 (localhost did NOT work!?!) 
      * database name ("zenphoto") 
      * table prefix = blank (i preferred to go with a separate database w/o table prefixes) 
      * it&#8217;ll create the zenphoto database for you with a simple click once you get a successful login to MySQL server working 
      * \*GO\* 🙂 
  * i went ahead and let it delete the "zp-coresetup*.php" files 
  * set admin username & password 
  * You&#8217;re in! 

<u>**ZenPhoto admin page settings**</u>: 

  * just unzip zpGallerific folder into the zenphotothemes folder 
  * Theme&#8217;s tab &#8211; activate zpGallerific 
  * Options tab 
      * general subtab &#8211; Time zone = Europe/Berlin 
      * gallery subtab 
          * title = The Andersons 
          * description = {blank} (set Gallerific subtitle next) 
          * sorty by = filename &#8211; descending (works for me because i name all folders "yyyy-mm-dd {description}") 
      * image subtab – Full image protection = Unprotected (as long as you don’t really care who gets access, this yields a MAJOR speed boost for page rendering times) 
      * theme subtab 
          * Albums per page = 9 
          * Color = Blue 
          * Tagline = Cassidy, Anne, BJ & Friends

 [1]: http://lh5.ggpht.com/_XlySlDLkdOc/TMMSUJFFxuI/AAAAAAAAE0s/rxteppXzI1E/s1600-h/image%5B8%5D.png
 [2]: http://www.gotknowhow.com/articles/fix-login-failed-for-user-iis-apppool-aspnet-v4-error-iis7 "http://www.gotknowhow.com/articles/fix-login-failed-for-user-iis-apppool-aspnet-v4-error-iis7"
 [3]: http://lh5.ggpht.com/_XlySlDLkdOc/TbxXDgiSGlI/AAAAAAAAE8I/ZEBZWENrNtY/s1600-h/Create%20Self-Signed%20Cert%20IIS7%5B5%5D.png