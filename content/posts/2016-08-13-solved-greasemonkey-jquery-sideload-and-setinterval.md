---
title: '[Solved] Greasemonkey/Tampermonkey jQuery sideload and setInterval'
author: Beej
type: post
date: 2016-08-13T17:19:22+00:00
url: /2016/08/solved-greasemonkey-jquery-sideload-and-setinterval.html
snapEdIT:
  - 1
snapTW:
  - 's:166:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:19:"%TITLE% - %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5515745843
categories:
  - Uncategorized
tags:
  - Music
  - WebDev

---
i was having a heck of a time keeping a reliable handle on jQuery in the Pandora page&#8230; it would be there upon initial Greasemonkey script execution but then upon subsequent setInterval executions, the jQuery global variable was undefined&#8230; fascinating&#8230;
  
&nbsp;

notable: as i was debugging, i started to see that Chrome was cycling through four ( 4 ! ) different VMxxxx &#8220;copies&#8221; of the greasemonkey script upon each setInterval execution&#8230; questions like why? and why 4? abound if anyone cares to enlighten me
  
&nbsp;

so it struck me that i just need to make sure jQuery is available in each one of those &#8220;sessions&#8221;&#8230;
  
&nbsp;

noteable: the &#8220;sideload&#8221; is accomplished via jQuery&#8217;s native &#8220;noConflict&#8221; facility&#8230; [this post][1] explains how it works&#8230; the gist is that each load of jQuery does indeed replace &#8220;$&#8221; BUT it also saves the previous into &#95;$, such that $.noConflict can restore &#8220;$&#8221; to the previous version&#8230; this is what allows Pandora&#8217;s copy of jQuery to remain as-is&#8230; crucial in this case because Pandora depends on additional add-ons that it loads as expando properties on its instance of jQuery.
  
&nbsp;

after that was in the bag, i couldn&#8217;t help dwelling on what else might be possible and had another aha moment&#8230; from tracing the pandora js execution i learned that there were pretty obvious variables getting set for allowed features (e.g. &#8220;allowSkipTrackWithoutLimit&#8221;)&#8230; i banged around quite a bit trying to replace the main pandora.js script with one where those values were tweaked&#8230; blocking the original script via [AdBlockPlus][2] was easy as well as loading the tweaked pandora.js inline <script> but that approach ran aground on not being able to load other dependency scripts in proper sequence with the replacement&#8230; [Chrome doesn&#8217;t implement the crucial window.beforescriptexecute event][3] which would probably make this feasible&#8230; the main pandora.js is wrappered in a self contained function call so we can&#8217;t monkey patch its innards&#8230;

but then it struck me, jQuery is global&#8230; and what if they&#8217;re getting these values via jQuery.ajax&#8230; such that i could override and tweak&#8230; sure enough, that approach panned all the way out!
  
&nbsp;

update &#8211; after that last round, i realized the whole thing about sideloading jQuery was unnecessary, i just needed to use the inline script approach to make sure my code executed on the page context vs whatever weird context TamperMonkey normally does&#8230; so the following script now reflects the cleaner evolved approach

    // ==UserScript==
    // @name          Pandora - "still listening" click
    // @author        Brent Anderson
    // @homepage      /2016/08/solved-greasemonkey-jquery-sideload-and-setinterval.html
    // @match         http://www.pandora.com/*
    // @grants        none
    // @run-at        document-end
    // ==/UserScript==
    
    function recurringTweaks() {
      //this click, remove, click sequence skips embedded video ads and gets the tunes playing again
      var stillListeningButton = $("#still_listening_ignore");
      if (stillListeningButton.is(":visible")) {
        stillListeningButton.click();
        $("#videoPlayerContainer").remove();
        stillListeningButton.click();
        $(".playButton").click();
        //above brute force video ad skip leaves player controls disabled, this resolves that side effect
        $(".disabled").removeClass("disabled");
      }
    
      var adContainer = $("#ad_container");
      if (adContainer.length) {
        //remove right side ad section...
        $("#ad_container").remove();
        //and allow the album covers area to fill the space
        $(".contentContainer").css("width", "100%");
        $("#adLayout").css("width", "80%");
    
        //remove some other "upgrade" bits
        $(".registeredUser").remove();
        $("#rightColumnDivider").remove();
        $(".audioAdInfo").remove();
      }
    }
    
    
    // monkey patch jQuery.ajax so we can override some nice stuff =)
    var hijax = function() {
      if (typeof $ !== 'undefined') {
        var oldAjax = $.ajax;
        var newAjax = function(a, b) {
          var oldSuccess = a.success;
          a.success = function(data, textStatus, jqHXR) {
    
            // infinite skip! =)
            $(data).find('name:contains(allowSkipTrackWithoutLimit) + value > boolean').replaceWith('<boolean>1</boolean>');
    
            //auto skip ads
            if (a.url.indexOf("method=registerImpression") !== -1) {
              $(".skipButton a").click();
            }
    
            //debug: console.log('url: ' + a.url + ', data: '+(''+data === '[object XMLDocument]' ? data.children[0].innerHTML : data));
            oldSuccess(data, textStatus, jqHXR);
          };
          oldAjax(a, b);
        };
        $.ajax = newAjax;
    
        setInterval(recurringTweaks, 2000);
    
      }
    
    };
    
    // load <script> inline to the page so it has access to jQuery "$" global vs TamperMonkey's alternative context
    if (!document.getElementById("hijax")) {
      var hijaxScript = document.createElement("script");
      hijaxScript.setAttribute("id", "hijax");
      hijaxScript.innerHTML = recurringTweaks.toString() + "\r\n" + hijax.toString().replace(/^function.*{|}$/g, "");
      document.head.appendChild(hijaxScript);
    }
    
    
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //sorry, turning this post into a catch all for stuff that might come in handy elsewhere
    /*
    
    //the original jquery "sideload" code
    function loadJq() {
        if (!window.jq) {
            script = document.createElement("script");
            script.src = "http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js";
            script.onload = function() { window.jq = $.noConflict(true); cosmetics(); };
            document.getElementsByTagName("head")[0].appendChild(script);
        }
        else cosmetics();
    }
    
        //helpful: http://userscripts-mirror.org/scripts/show/125936
    
      window.addEventListener('beforescriptexecute', function(e) {
          if (e.target.src.indexOf("pandora.js") != -1) {
              e.preventDefault();
              //e.stopPropagation(); //??
              e.target.src = ''; //??
              e.target.innerHTML = "patched script";
          }
      }, true);
    
    var a = document.getElementsByTagName("script");
    for each (var e in a) {
      if (!e) continue; // oddly, this does sometimes grab null elements.
      var b = e.getAttribute("src");
      if (b && b.indexOf("pandora.js") != -1) {
        e.parentNode.removeChild(e);
        debugger;
        break;
      }
    }
    */
    
    // @grants         GM_xmlhttpRequest
    /*GM_xmlhttpRequest({
      method: "GET",
      url: "http://rawgit.com/Beej126/567a36f2dd1e3ce613ad8ec5846a40d4/raw/fac20b4ab17681b5da41b07c2549676ff3571fc9/dorPanda.js", //"http://www.pandora.com/pandora.js?v=440211416",
      onload: function(response) {
        debugger;
    
        //here's the beef!
        //var tweaked = response.responseText.replace("this.PC=b.allowSkipTrackWithoutLimit", "this.PC = true;");
        //$("script[src*='/pandora.js'").af
    
        var tweaked = response.responseText;
        document.head.appendChild(document.createElement('script')).innerHTML = tweaked;
      }
    });*
    
    */
    

starting the same hijinx for Spotify&#8230; they load MooTools into $ and for some reason the selector wasn&#8217;t finding obvious classes&#8230; i&#8217;ve never picked up MooTools so maybe the syntax is different than jQuery&#8230; so i just went back to the jQuery sideload approach on this one&#8230; after that, worked it down into pure DOM, no jQuery needed

    // ==UserScript==
    // @name          Spotify tweaks
    // @author        Brent Anderson
    // homepage      /2016/08/solved-greasemonkey-jquery-sideload-and-setinterval.html
    // @match         https://play.spotify.com/*
    // @grants        none
    // @run-at        document-end
    // ==/UserScript==
    
    function terminator() {
      var target = document.getElementsByClassName("ads-leaderboard-container");
      if (target.length) {
        console.log("bye bye =)");
        target[0].remove();
        clearInterval(timerId); //kill the timer once the targeted element finally shows up
      }
    }
    
    //replace main.js with hacked version
    //(block original with AdBlockPlus plugin)
    //was easy to enable "next" button during ads but it sticks to the ad anyway, would take further effort and not worth it until they actually fire enough ads to be annoying
    var scripts = document.getElementsByTagName("script");
    for(var i = 0; i<scripts.length; i++) { if(scripts[i].src.indexOf("https://play.spotify.edgekey.net/apps/player/4.2.0/main.js") != -1) {
      //debugger;
      var mainjs = document.createElement("script");
      mainjs.crossorigin = "anonymous";
      mainjs.src = "https://rawgit.com/Beej126/1501d5acb4fd20a6fcdcfe6599ce0c5e/raw/2725727f297a00444ef51c490a6009458a513e07/SpotifyMain.js";
      document.body.appendChild(mainjs);
      break;
    }}
    
    //there were multiple iframes, targeting the one that actually gets the ads
    if (document.body && document.body.classList.length && document.body.classList[0] === "non-mobile" && document.body.attributes.length === 1) {
      //setup a recurring check to see when ads get dynamically inserted into page
      var script = document.createElement("script");
      script.innerHTML = terminator.toString() + "\r\n" + "var timerId = setInterval(terminator, 2000);";
      document.head.appendChild(script);
    }

 [1]: http://stackoverflow.com/a/8852366/813599
 [2]: https://chrome.google.com/webstore/detail/adblock-plus/cfhdojbkjhnklbpkdaibdccddilifddb?hl=en-US
 [3]: https://github.com/chrisaljoudi/uBlock/issues/1255