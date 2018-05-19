---
title: Minimal pure CSS Treeview with FontAwesome expanders
author: Beej
type: post
date: 2015-06-29T08:37:00+00:00
url: /2015/06/purecsstreeviewfontawesome.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 2192937157211506653
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2015/06/PureCSSTreeViewFontAwesome.html
dsq_thread_id:
  - 5521863066
categories:
  - Uncategorized
tags:
  - WebDev

---
&nbsp;

Update 2015-07-18: shux! not valid to apply ::before/after psuedo elements to <input> since it&#8217;s not technically content ([stack-o reference][1])

&nbsp;

jQuery solution:

{{< jsfiddle id="h3c3cb3m" rev="91" >}}

&nbsp;

&nbsp;

Following solution works in Chrome and Safari <span class="hl">but not Firefox or IE</span>&#8230; so i guess that means i like webkit.

&nbsp;

Look ma, no JavaScript! 🙂

Leveraging (hidden) checkbox element to maintain expand/collapse state and

<pre style="display: inline;">:before {content: "xyz" }</pre>

&nbsp;css to avoid extra elements.

[Not an original idea][2] but wanted to see of i could trim down all the extra html markup & css required.

The <input> is the only additional overhead above standard markup.

{{< jsfiddle id="h3c3cb3m" rev="45" >}}

 [1]: http://stackoverflow.com/questions/12831620/is-the-before-pseudo-element-allowed-on-an-inputtype-checkbox
 [2]: http://www.thecssninja.com/css/css-tree-menu