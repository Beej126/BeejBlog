---
title: Chrome User Script – Whack page elements based on jQuery selectors
author: Beej
type: post
date: 2015-11-10T05:03:00+00:00
year: "2015"
month: "2015/11"
url: /2015/11/chrome-user-script-whack-page-elements.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 8226459775670079930
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2015/11/chrome-user-script-whack-page-elements.html
blogger_thumbnail:
  - https://2.bp.blogspot.com/-b_tH9-WysD0/VkEKhDZHIlI/AAAAAAAARzo/kmv0MBN4ufY/s1600/Snap2.png
dsq_thread_id:
  - 5537355402
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
tags:
  - WebDev

---
  * Tweaked this solution: [How can I use jQuery in Greasemonkey scripts in Google Chrome?][1]
  * Install: 
      1. save this as something.**user**.js &#8211; the “user.js” is critical for Chrome to accept
      2. navigate to chrome://extensions/
      3. drag/drop the file to the Chrome Extensions page

<pre class="prettyprint">// ==UserScript==
// @name VipLeague.se AdBlock Hack
// @match https://www.vipleague.se/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://code.jquery.com/jquery-2.1.4.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  $("span:contains('Adblock is enabled')").remove();
}

// load jQuery and execute the main function
addJQuery(main);</pre>

![enter image description here][2]</img>
  
![enter image description here][3]</img>

 [1]: https://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
 [2]: https://www.BeejBlog.com/wp-content/uploads/2015/11/Snap2.png ""
 [3]: https://www.BeejBlog.com/wp-content/uploads/2015/11/Snap4-1.png ""