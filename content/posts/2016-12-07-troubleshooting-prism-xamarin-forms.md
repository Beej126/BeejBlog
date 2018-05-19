---
title: Troubleshooting Prism Xamarin Forms
author: Beej
type: post
date: 2016-12-07T22:02:26+00:00
url: /2016/12/troubleshooting-prism-xamarin-forms.html
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - 's:312:"a:1:{i:0;a:11:{s:2:"do";s:1:"1";s:9:"timeToRun";s:0:"";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"806620550659325952";s:5:"pDate";s:19:"2016-12-07 22:05:03";}}";'
dsq_thread_id:
  - 5519379639
categories:
  - Uncategorized
tags:
  - Xamarin

---
_for the record i&#8217;m currently running with the Unity DI framework_

### totally silent app crash on NavigateAsync

this is super frustrating when you don&#8217;t get any exception stack at all to go on&#8230;
  
i can&#8217;t tell you how many times i&#8217;ve brainfarted a simple typo bug which blows up the xaml parse &#8230; so check that well before you get too cranky&#8230; e.g. i always forget the &#8220;{Binding }&#8221; around my commands!?!?
  
but if you can easily, temporarily set your initial page navigation (typically in your App.xaml.cs::App.OnInitialized) to go directly to your offending page
  
and then make sure to put a .Wait() on the end of the call&#8230; doing these two things allows the otherwise silent exceptions to show up and hopefully that&#8217;s just the clue you need

### ViewModelLocationProvider naming bug

i stumbled into naming one of my pages &#8220;PdfView&#8221; and it went haywire not binding to my &#8220;PdfViewViewModel&#8221; but instead probably the first viewmodel instantiated