---
title: GreaseMonkey hacking Gmail
author: Beej
type: post
date: 2016-08-21T14:08:13+00:00
url: /2016/08/greasemonkey-hacking-gmail.html
dsq_thread_id:
  - 5514693661
categories:
  - Uncategorized
tags:
  - WebDev

---
# motivation

i wanted to see if i could get category bundling working in gmail ala outlook... it's always been a nice mental flow for me to carve out pending events from littering my  "[inbox zero][1]" but still see them right there in front so i don't forget to check up on them vs a click away hidden under a "folder"
  
<span style="font-size: x-large">update</span> &#8211; don't miss [the google "labs" functionality][2] for doing exactly this kind of category bundling
  
# success!

the integration with gmail's normal behavior isn't perfect so this is still very experimental stages but it's a pretty satisfying quick hack...
  
# notes

  * i followed a [this tutorial][3] for getting the gmail API cooking including OAUTH2...
  * the greasemonkey end of the code has some helper functions to get all the usual libraries loaded up like bootstrap, font-awesome and knockout... currently i'm only leveraging jQuery and [Lobibox][4] (love those sexy growls!)
  * tweak the code to call gapi.client.gmail.users.labels.list vs messages to see your label Id's... they're not the names we see in the gmail UI

# roadmap

obvious next nice to haves rush to mind:

  * bundle by multiple specified categories (aka labels) 
  * clicking on message in new section actually does navigate to message since that was an easy gimme but it's not as slick in the vertical split mode... i tried tracing the code that dynamically populates the side panel with the message body and it's just to abstract, so it'll have to be a matter of popping that in myself, but shouldn't be too tough since we're already loading the whole message body behind the scenes.
  * flip to real ECMAScript 2016 module loader or whatever's clever right now... without a build engine to make things happen for script.js it seems like we're still waiting for a fully native solution... i could do require.js approach but that seems to be on the outs already???

# example screenshot

![image][5]
  

# GmailMonkey.user.js

```js
// ==UserScript==
// @name         GmailMonkey
// @namespace    http://Next-Technologies.com/
// @version      0.1
// @description  try to take over the world!
// @author       Brent Anderson
// @match        https://mail.google.com/mail/u/0/*
// @grant        none
// @run-at        document-end
// ==/UserScript==
    
    
//gmail api stuff//////////////////////////////////////////////////////////////////////////
    
function objArrayGetByProperty(array, propertyName, value) {
  var result = $.grep(array, function(e){ return e[propertyName] === value; });
  return result.length ? result[0].value : null;
}
    
function loadMessages() {
  var request = gapi.client.gmail.users.messages.list({
    "userId": "me", //nugget: special userId of me to indicate the currently authenticated user
    "labelIds": "Label_59",
    "maxResults": 200
  });
    
  request.execute(function(response) {
    if (response.error) {
      Lobibox.notify("error", { size: "mini", delay: false, msg: "[gapi.client.gmail.users.messages.list] " + response.error.message });
      return;
    }
    
    $.each(response.messages, function() {
      var messageRequest = gapi.client.gmail.users.messages.get({
        "userId": "me",
        "id": this.id
      });
    
      messageRequest.execute(function (message) {
        //debugger;
        var from = objArrayGetByProperty(message.payload.headers, "name", "From").replace(/"/g,"");
        var subj = objArrayGetByProperty(message.payload.headers, "name", "Subject");
        var date = formatDate(new Date(objArrayGetByProperty(message.payload.headers, "name", "Date")), "MMM DD");
    
        var onclick = "window.location.href += '/"+message.id+"'";
    
        mainTable.append(verticalSplit ? '\
          <tr class="zA yO apv" onclick="'+onclick+'">\
          <td colspan="2" rowspan="3"></td>\
          <td class="yX xY apy">'+from+'</td>\
          <td class="yf xY apt">'+date+'</td>\
          <td class="xY" rowspan="3"></td>\
          </tr>\
          <tr class="zA yO apv" onclick="'+onclick+'">\
          <td colspan="2" class="xY apD" style="font-weight: bold">'+subj+'</td>\
          </tr>\
          <tr class="zA yO apv apw" onclick="'+onclick+'">\
          <td colspan="2" class="xY apA apB y2">'+message.snippet+'</td>\
          </tr>\
          ': '\
          <tr class="zA yO" onclick="window.location.href += \'/'+message.id+'\'">\
          <td colspan="4"></td>\
          <td class="xY">'+from+'</td>\
          <td colspan="2" class="xY" style="overflow: hidden">'+subj+'</td>\
          <td class="xW xY">'+date+'</td>\
          </tr>'
        );
      });
    });
  });
}
    
//from here: https://www.sitepoint.com/mastering-your-inbox-with-gmail-javascript-api/
function handleAuthClick() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, function (authResult) {
    if(authResult && !authResult.error) {
      gapi.client.load("gmail", "v1", loadMessages); // <<<<<<<<<<<<<<<<<<<<<<<
      /*$("#authorize-button").remove();
      $(".table-inbox").removeClass("hidden");
    } else {
      $("#authorize-button").removeClass("hidden");
      $("#authorize-button").on("click", handleAuthClick);
      */
    }
  });
  return false;
}
    
function nextTechInit() {
  waitForIt(":2", function(found) {
    $("html, body").css("font-size", "inherit"); //override bootstrap's annoying default
    
    $(".vh").remove();
    
    Lobibox.notify.DEFAULTS.soundPath = "//cdn.rawgit.com/arboshiki/lobibox/373d1af467930db68c876e76408bd953198c428e/dist/sounds/";
    Lobibox.notify.DEFAULTS.delay = 3000;
    //Lobibox.notify("error", { size: "mini", delay: false, msg: "lobibox test" });
    
    mainTable = $(".Cp > div > table");
    verticalSplit = mainTable.find("colgroup > col").length === 5;
    
    mainTable = $(mainTable).find("tbody");
    mainTable.append(
      '<tr><td colspan="'+(verticalSplit?5:8)+'"><div style="margin-top: 1em" class="">Pending</div></td></tr>');
    
    gapi.client.setApiKey(apiKey);
    handleAuthClick();
  });
}
    
function formatDate(date, format) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
    
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
    
  return format.replace("MMM", monthNames[monthIndex].slice(0,3)).replace("DD", day);
}
    
//////////////////////////////////////////////////////////////////////////////////
    
function waitForIt(elementId, then) {
  //console.log("waitForIt: " +elementId);
  var found = document.getElementById(":2");
  if ( !found ) {
    //console.log("not found!"); 
    setTimeout(function() {waitForIt(elementId, then);}, 500);
    return;
  }
  then(found);
}
    
function loader(refsArray) {
  var element;
  for(var i = 0; i < refsArray.length; i++) {
    url = refsArray[i].toString();
    
    if (url.indexOf(".js") !== -1 || url.slice(0,8) === "function") {
      element = document.createElement("script");
      if (url.slice(0,8) === "function") { 
        element.innerHTML = url;
        document.getElementsByTagName("head")[0].appendChild(element);
        continue; //nugget! inline script doesn't fire an onload event
      }
      else element.src = url;
      if (i < refsArray.length-1) { //if we're not on the last element already, recurse on the remaining items
        var remaining = refsArray.slice(i+1);
        element.onload = function() {
          loader(remaining);
        };
      }
      document.getElementsByTagName("head")[0].appendChild(element);
      break;
    }
    
    else if (url.indexOf(".css") !== -1) {
      element = document.createElement("link");
      element.rel = "stylesheet";
      element.type = "text/css";
      element.href = url;
      document.getElementsByTagName("head")[0].appendChild(element);
    }
    
    else throw("unexpected reference extension, expecting .css or .js or a function, but got: "+url);
    
  }
}
    
//by simple convention, list all CSS first, then JS...
//each JS will subsequently load the next as a simple dependency mechanism so specify JS's in appropriate order
//further, including a function(s) will inline <script> it
loader([
  //"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css",
  //"//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css",
  //"//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css",
  "//cdn.rawgit.com/arboshiki/lobibox/master/dist/css/lobibox.min.css",
  "//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js",
  //"//cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/jquery.validate.min.js",
  //"//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min.js",
  //"//cdnjs.cloudflare.com/ajax/libs/knockout.mapping/2.4.1/knockout.mapping.min.js",
  //"//cdnjs.cloudflare.com/ajax/libs/knockout-validation/2.0.3/knockout.validation.min.js",
  "//cdn.rawgit.com/arboshiki/lobibox/master/dist/js/lobibox.min.js",
  objArrayGetByProperty.toString()+"\r\n"+
  'var mainTable;\r\n'+
  'var verticalSplit = false;\r\n'+
  'var clientId = "xxxxxxxxxxxxx.apps.googleusercontent.com";\r\n'+
  'var apiKey = "xxxxx";\r\n'+
  'var scopes = "https://www.googleapis.com/auth/gmail.readonly";\r\n\r\n'+
  loadMessages.toString()+"\r\n"+
  handleAuthClick.toString()+"\r\n"+
  waitForIt.toString()+"\r\n"+
  nextTechInit.toString()+"\r\n"+
  formatDate.toString()+"\r\n",
  "//apis.google.com/js/client.js?onload=nextTechInit"
]);
```
 [1]: http://whatis.techtarget.com/definition/inbox-zero
 [2]: http://blog.hubspot.com/sales/email-multiple-inboxes
 [3]: https://www.sitepoint.com/mastering-your-inbox-with-gmail-javascript-api/
 [4]: http://lobianijs.com/site/lobibox#notification-examples-basic
 [5]: https://cloud.githubusercontent.com/assets/6301228/17837527/720ea2be-676a-11e6-8d10-b09722c492cc.png