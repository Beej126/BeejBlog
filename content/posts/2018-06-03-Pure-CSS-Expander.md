---
url: /2018/06/pure-css-expander.html
title: "Minimal Pure CSS Expand/Collapse Widget"
author: Beej
type: post
description: ""
date: 2018-06-03T14:16:00-07:00
year: "2018"
month: "2018/06"
thumbnail: ""
categories:
tags:
  - WebDev
---

The gist here is leveraging a hidden checkbox to maintain expand/collapse state and css `:before {content: "xyz" }` to add the expand/collapse widget which keeps the additional markup minimal.

### Markdown compatible :)
```markdown
<p></p><input type="checkbox" class="expander">
#### Expandified Heading
* bullet 
* bullet
* <input type="checkbox" class="expander"><i>another expander</i>
  * nested content that will be expanded
```
<!--more-->

_yeah i know, what's up with the the extra &lt;p&gt; tag pal?! those sprinkles on my minimalist day parade are the only way i could get my blog's markdown renderer ([Hugo](https://gohugo.io/) &gt; "[Blackfriday](https://github.com/russross/blackfriday)") to not mangle the expander input under a p tag which ruins using css sibling selector used target the show/hide content_

### [Demo post (rendered via Markdown)](/2015/04/osx-v2p.html)

[Not an original idea](https://css-tricks.com/the-checkbox-hack/#article-header-id-1) ... just boiling it down for my specific usage

For the record, it's not valid html to apply :before/after psuedo elements to form elements like &lt;input&gt; because they're not technically "content" ([stack-o reference](https://stackoverflow.com/questions/12831620/is-the-before-pseudo-element-allowed-on-an-inputtype-checkbox)), bummer... webkit (chrome, safari) actually do render directly on &lt;input&gt; but firefox & explorer don't... oh well, it's not much more to rely on one more element right after &lt;input&gt;... i'm using the &lt;i&gt; tag as popularized by font-awesome but this is arbitrary.


Look ma, no JS! :)
<script async src="//jsfiddle.net/h3c3cb3m/110/embed/result,css,html/dark/"></script>

<br/>
Previous 2015-07-18 jQuery based solution:
<script async src="//jsfiddle.net/h3c3cb3m/91/embed/js,html,css,result/dark/"></script>

