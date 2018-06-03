---
url: /2018/06/pure-css-expander.html
title: "Minimal Pure CSS Expand/Collapse Widget"
author: Beej
type: post
description: ""
date: "2018-06-03T14:16:00-07:00"
thumbnail: ""
categories:
  - ""
tags:
  - WebDev
---


The gist here is leveraging a hidden checkbox to maintain expand/collapse state and css `:before {content: "xyz" }` to add the expand/collapse widget which keeps the additional markup minimal.

[Not an original idea by any means](https://css-tricks.com/the-checkbox-hack/#article-header-id-1) ... just boiling it down for my specific usage

Update 2018-06-03: for the record, it's not valid to apply :before/after psuedo elements to form elements like &lt;input&gt; because they're not technically "content" ([stack-o reference](http://stackoverflow.com/questions/12831620/is-the-before-pseudo-element-allowed-on-an-inputtype-checkbox)), bummer... but revisting this, i realized it's very doable to just rely on the next available element after the &lt;input&gt;

nice little bonus if you use this in a markdown context, like blogging: markup like headings and lists already render the necessary element to hang the widget icon so the &lt;input&gt; is the only additional markup ... pretty dang clean for the win, yay! :)

#### Markdown example
```markdown
<p></p><input type="checkbox" class="expander">
#### Expandified Heading
* bullet 
* bullet
* <input type="checkbox" class="expander"><i>another expander</i>
  * nested content that will be expanded
```
_yeah i know, what's up with the the extra &lt;p&gt; tag pal?! unfortunately those sprinkles on my minimalist day parade are the only way i could get my markdown renderer to not nest the expander input under a p tag which ruins the approach of using css sibling selector_
  
Look ma, no JS! :)
<script async src="//jsfiddle.net/h3c3cb3m/110/embed/result,css,html/dark/"></script>

<br/>
Previous 2015-07-18 jQuery based solution:
<script async src="//jsfiddle.net/h3c3cb3m/91/embed/js,html,css,result/dark/"></script>

