---
url: /2018/09/github-embed.html
title: "Embed Github Content In Post"
author: Beej
type: post
description: ""
date: 2018-09-07T09:53:00-07:00
year: "2018"
month: "2018/09"
thumbnail: ""
tags:
  - Blogging
  - WebDev
---

Went looking for this quite a bit and was surprised not to find anything obvious 2nd party let alone from github. Obviously gist embedding is covered in spades... and wordpress has some github plugins... why no love for the static web? Oh well, maybe it's so easy to pull off, everybody does it without sharing. 

Currently just pulls in .md. That's what i needed first.

For the record, this is client side markdown rendering (using [ShowdownJs](http://showdownjs.com/)). So we probably don't get SEO on the content.

OH, big caveat - i'm being snooty/lazy using HTML5 "fetch" ... that means this is very modern browser dependent.

This is oriented towards Hugo but no hard dependencies.

this is how you'd reference a github readme.md in your blog post markdown

```html
* blah blah blah best post evah!

<script id="embed">
  lateLoad.push(function() { renderMarkdown("embed", "https://raw.githubusercontent.com/Beej126/PoShSlideshow/master/README.md"); });
</script>

* nailed it!
```

[Demo](/2015/12/powershell-photo-slideshow.html)
<!--more-->

Yeah the "lateLoad" stuff is gross, would love to hear cleaner alternatives.

```html
// throw this at the end of your footer.html template (you know you have one :)

<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js"></script>
<script>
function renderMarkdown(elementId, url) {
  fetch(url).then(function(resp) { resp.text().then(function(text) {
    var converter = new showdown.Converter();
    var div = document.createElement('div');
    div.innerHTML = converter.makeHtml(text);
    var referenceNode = document.getElementById(elementId);
    //https://stackoverflow.com/a/4793630/813599
    referenceNode.parentNode.insertBefore(div, referenceNode.nextSibling);
  })});
}

for(var i = 0; i < lateLoad.length; i++) { lateLoad[i](); }
</script>
```

```html
// just before the end of </head> in your header.html template
<script>lateLoad = [];</script>
```

 