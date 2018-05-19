---
title: Developer Blog Engine Requirements
author: Beej
type: post
date: 2016-12-28T00:39:56+00:00
url: /2016/12/blog-engine-requirements.html
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:323:"a:1:{i:0;a:11:{s:9:"timeToRun";s:0:"";s:10:"SNAPformat";s:26:"%TITLE% - %URL%
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";s:2:"do";s:1:"1";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"813907509631012864";s:5:"pDate";s:19:"2016-12-28 00:40:48";}}";
dsq_thread_id:
  - 5531847859
categories:
  - Uncategorized
tags:
  - Blogging

---
### Log

  * Currently on WordPress&#8230; 
  * Got a little itch to upgrade to Ghost from recent Twitter buzz

### Recording favored blog functionalities to consider towards switching engines

| Feature           | WordPress                                                                                                                                             | Ghost                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Self hosting      |                                                                                                                                                       | just something to keep in mind&#8230; e.g. they specifically state [not chasing nodeJS latest versions][1]   |
| Search            | Built-in works great                                                                                                                                  | [No turnkey solution yet][2], [GhostHunter][3], [Ghost-Search][4]                                            |
| Code Highlighting | [Crayon][5] is great                                                                                                                                  | drop in via css/js includes, e.g [Prism][6]                                                                  |
| Social Auto Post  | [SNAP][7] is nice                                                                                                                                     | [IFTT integration][8]                                                                                        |
| **Markdown (MD)** | Yes, but <span class="hl">biggest disappointment</span><sup id="fnref-1517-markdown"><a href="#fn-1517-markdown" class="jetpack-footnote">1</a></sup> | smooth MD editing story was my biggest temptation of TryGhost                                                |
| Speed             | a bit pokey self hosted                                                                                                                               | supposed to be peppier                                                                                       |
| Database          | MySQL                                                                                                                                                 | MySQL, PostGress or SQLite&#8230; which for example makes the compatibility footprint challenging for search |
| Comments          | you might want to fire up 3rd party comment engine like Disqus from the get go, to facilitate easy porting to another engine                          |                                                                                                              |

<li id="fn-1517-markdown">
  I&#8217;ve really had to fight to meet my expectations with MarkDown on WordPress&#8230; I still don&#8217;t have a RELIABLE live visual preview plugin (they&#8217;re all broken one way or another &#8211; <a href="https://wordpress.org/plugins/prettypress/">PrettyPress</a>, <a href="https://wordpress.org/plugins/wp-markdown-editor/">WP-Markdown</a>, etc)&#8230; managed to get working crayon highlighting nested under MD bullets syntax by using [crayon] tag instead of &#96;&#96;&#96;&#160;<a href="#fnref-1517-markdown">&#8617;</a> </fn></footnotes>

 [1]: http://support.ghost.org/supported-node-versions/#why-follow-lts?
 [2]: https://github.com/TryGhost/Ghost/issues/5321
 [3]: https://github.com/jamalneufeld/ghostHunter
 [4]: https://github.com/wnda/ghost-search
 [5]: https://wordpress.org/plugins/crayon-syntax-highlighter/
 [6]: http://blog.toast38coza.me/adding-syntax-highlighting-to-your-ghost-blog-the-easy-way/
 [7]: https://wordpress.org/plugins/social-networks-auto-poster-facebook-twitter-g/
 [8]: https://ifttt.com/applets/132489p-ghost-post-to-twitter