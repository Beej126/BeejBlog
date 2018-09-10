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

## Intro
Went looking for this quite a bit and was surprised not to find anything obvious. Wondering why github hasn't provided this directly. Obviously gist embedding is covered in spades... and WordPress has some plugins... why no love for the static web? Maybe it's just too to easy to bother publishing ;)

## Caveats
* just for markdown so far
* client side rendering (using [ShowdownJs](http://showdownjs.com/)) - no SEO for you
* using HTML5 "fetch" - [modern browser dependency](https://caniuse.com/#feat=fetch)
* instructions are Hugo leaning but this is vanilla js stuff usable anywhere

## Example Usage

```html
* blah blah blah best post evah!

<script id="embed1"> renderMarkdown("embed1", "https://raw.githubusercontent.com/Beej126/PoShSlideshow/master/README.md") </script>

* nailed it!
```

## [Demo](/2015/12/powershell-photo-slideshow.html)
<!--more-->

## src
```js
// github-embed.js
// add this new js file to your Hugo blog's /static/js folder or equivalent

function renderMarkdown(elementId, url) {
    fetch(url).then(function(resp) { resp.text().then(function(text) {
      var div = document.createElement('div');
      var converter = new showdown.Converter();
      div.innerHTML = converter.makeHtml(text);
      //https://stackoverflow.com/a/15081441/813599
      var node = document.getElementById(elementId)
      node.parentNode.insertBefore(div, node.nextSibling);
    })});
  }
```

```html
// add references before the end of </head> in your header.html template
<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js"></script>
<script src="/js/github-embed.js"></script>
```
