---
title: Aurelia – initial paper cuts
author: Beej
type: post
date: 2017-01-10T08:46:34+00:00
url: /2017/01/aurelia-initial-paper-cuts.html
snap_isAutoPosted:
  - 1
dsq_thread_id:
  - 5509938447
snapEdIT:
  - 1
snapTW:
  - |
    s:400:"a:1:{i:0;a:13:{s:9:"timeToRun";s:0:"";s:10:"SNAPformat";s:29:"%TITLE%
    %URL%
    
    %EXCERPT%
    ";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:2:"do";i:0;s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"818905376351358976";s:5:"pDate";s:19:"2017-01-10 19:40:32";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
  - Uncategorized
tags:
  - DotNetCore
  - Aurelia

---
#### Baseline Wishlist for Dev Tools & Architecture

  * JS Framework: **Aurelia** (_i'm coming from KnockoutJS most recently and keep hearing good things about Durandal v2, aka Aurelia ... namely, clean conventions based on vNext web standards, etc._) 
      * JS "evolution": **TypeScript** (_i'm jacked TS v2.1 finally achieved transpiled async/await support for ES5_)
  * IDE: **Visual Studio 2017** (currently RC2)
  * Web Server: **Asp.Net Core**, and generally try to track on .Net Standard / Core

#### Base Installs

(_followed [this guide][1] up to the create project step_)

  * [latest **nodeJs**][2], this brings npm (`node -v`, i'm on v7.3.0)
  * latest **jspm**: `npm install -g jspm` (`jspm -v` = 0.16.48)
  * latest **typescript**: `npm install -g typescript` (`tsc -v` = Version 2.1.4)
  * latest **typings**: `npm install -g typings` (`typings -v` = 2.1.0)
  * [latest **.Net Core**][3] ([equivalent github downloads page][4]) (`dotnet --version`: 1.0.0-preview4-004233) 
      * However, my yeoman generated csproj was complaining about missing asp.net core 1.1.0 dependencies so needed to get new bits... after installing .Net Core v1.1.0, `dir C:\Program Files\dotnet\shared\Microsoft.NETCore.App` showed i had a new 1.1.0 folder but `dotnet --version` still shows 1.0.0-preview4-004233 ... need to be a little more enlightened about how this stuff sits

#### Project Starter Template

went looking for a more streamlined template project story than what was current as of the above guide...

  * unfortunately there's a few distractions out there that initially look promising but are rather dated upon closer inspection (e.g. 2yr old [AshleyGrant/aspnet-skeleton-navigation][5])... 
  * finally found [github aurelia/skeleton-navigation][6]...
  * then noticed issue comment ["Do we even need the ASP .Net Core Skeletons any more?"][7] which directs to...
    
    

<i class="fa fa-hand-o-right"></i> [Microsoft ASP.NET Core JavaScript Services][8] which, AWESOME, includes yeoman generator specifically for Aurelia -AND- Visual Studio 2017 CSPROJ style, no way!!
    
(_nice! they just updated the [JS Services docs][9] to include Aurelia 4 days ago :_)
      
  ```shell
  npm install -g yo generator-aspnetcore-spa
  cd your_new_empty_project_directory
  yo aspnetcore-spa
  ```

[![image][10]][10]

#### Debugging on iOS Chrome

No iOS browser provides any debugger tools -BUT- on Mac, we can fire up the Xcode iOS Simulator => Browser and attach Mac Safari to get full debug tooling!

  * Install [Xcode from the App Store (free)][11]
  * Launch Simulator from Xcode > Xcode main menu > Open Developer Tool > Simulator 
      * fire up your url in iOS Chrome/Safari
  * [Stack-o post][12] for Mac Safari remote debug config &#8211; the gist: 
      * Mac Safari > Preferences > Advanced > "Show Develop menu in menu bar"
      * Mac Safari > Develop menu > Simulator > choose desired browser tab by url

[![image][13]][13]

#### Aurelia Fetch Client and _uncle_ PolyFill

  * i needed above js debug because my app skeleton's "Fetch data" page worked on Windows Chrome but failed on iOS Chrome...
  * wound up finding this [issue (over 1yr old)][14]...
  
    referring to [fetch polyfill][15] <i class="fa fa-hand-o-right"></i> `npm install whatwg-fetch --save`... which sure enough, along with Aurelia's [Bring your own polyfill docs][16], wound up resolving my issue &#8211; yay!
  
    `$\ClientApp\app\components\fetchdata\fetchdata.ts`
    ```ts
    import 'whatwg-fetch'; //this is the new line
    import { HttpClient } from 'aurelia-fetch-client';
    ...
    ```

#### Misc Configs

  * handy reminder, enable external access to IISExpress site (e.g. so a mobile on your LAN can get to it): 
      * first add site binding:
  
        `$\.vs\config\applicationhost.config`
        ```xml
        <configuration>
          <system.applicationHost>
            <sites>
              <site name="StarBeast" id="2">
                <bindings>
                  <binding protocol="http" bindingInformation="*:6541:localhost" />
                  <binding protocol="http" bindingInformation="*:6541:BeejBergVM" />
                  <binding protocol="http" bindingInformation="*:6541:192.168.1.8" />
                </bindings>
              </site>
        ...
        ```
      * then from command line: `netsh http add urlacl url=http://address:port/ user=everyone`

#### Off to the races?
  <i class="far fa-check-square"></i> basic working project.

  <i class="far fa-check-square"></i> working server side debug.

  <i class="far fa-check-square"></i> working client side debug.

  <i class="far fa-check-square"></i> working ajax call.

  <i class="far fa-check-square"></i> fresh copy of "[Learning Aurelia][17]" on the Kindle

I'm gone like the wind!

 [1]: http://tutaurelia.net/2016/07/02/getting-started-with-aurelia-and-typescript-in-visual-studio-2015-update-3/
 [2]: https://nodejs.org/en/
 [3]: https://www.microsoft.com/net/download/core#/current
 [4]: https://github.com/dotnet/cli#installers-and-binaries
 [5]: https://github.com/AshleyGrant/aspnet-skeleton-navigation
 [6]: https://github.com/aurelia/skeleton-navigation#typescript-skeletons
 [7]: https://github.com/aurelia/skeleton-navigation/issues/757#issuecomment-270949641
 [8]: https://github.com/aspnet/JavaScriptServices
 [9]: https://github.com/aspnet/JavaScriptServices/issues/561#issuecomment-270968331
 [10]: https://cloud.githubusercontent.com/assets/6301228/21798875/9f49cdc8-d6cb-11e6-9abf-2a4b5a7cb8cc.png
 [11]: https://itunes.apple.com/us/app/xcode/id497799835?mt=12#
 [12]: http://stackoverflow.com/a/16203106/813599
 [13]: https://cloud.githubusercontent.com/assets/6301228/21831718/b8d1b2d0-d75a-11e6-94df-61121db9ea24.png
 [14]: https://github.com/aurelia/fetch-client/issues/13#issuecomment-137876549
 [15]: https://github.com/github/fetch#installation
 [16]: https://github.com/aurelia/fetch-client/blob/master/doc/article/en-US/http-services.md#bring-your-own-polyfill
 [17]: //www.amazon.com/Learning-Aurelia-Manuel-Guilbault-ebook/dp/B01K6VVBX2