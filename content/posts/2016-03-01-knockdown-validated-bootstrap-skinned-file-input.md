---
title: Knockout, Validation, Bootstrap skinned File Input
author: Beej
type: post
date: 2016-03-01T11:55:11+00:00
url: /2016/03/knockdown-validated-bootstrap-skinned-file-input.html
snapEdIT:
  - 1
snapTW:
  - |
    s:174:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";
dsq_thread_id:
  - 5535110853
categories:
  - Uncategorized
tags:
  - Knockout

---
&nbsp;

### Visual example:

![][1]
  
&nbsp;
  
Highlights:

  * Skinning the native html <input type=&#8221;file&#8221;> by setting it&#8217;s opacity=0 and positioning above a bootstrap looking button&#8230; this way when you click the pretty button you&#8217;re really clicking on the invisible native button which launches the file open dialog.
  * [Bootstrap input-group][2] aesthetically bundles the visual elements &#8211; file button, filename box, valiation message and clear button
  * Knockout [Custom Binding][3] on the file input change event to save into VM observable
  * [Knockout-Validation][4] lib to require selected file to be an image type &#8211; nice thing here is keeping that logic in the js ViewModel vs dirtying the html with it.
  
    &nbsp;
  
    &nbsp;

### Live Demo:

<p data-height="268" data-theme-id="0" data-slug-hash="wGBmyM" data-default-tab="result" data-user="Beej2020" class='codepen'>
  See the Pen <a href='http://codepen.io/Beej2020/pen/wGBmyM/'>Knockdown, Validated, Bootstrap skinned File Input</a> by Brent Anderson (<a href='http://codepen.io/Beej2020'>@Beej2020</a>) on <a href='http://codepen.io'>CodePen</a>.
</p>

 [1]: https://3.bp.blogspot.com/-CwlzBUefOGE/VxVcAfSlPoI/AAAAAAAATTo/M5QeSHYe2MQcsprdw4WCx1-qwgaAeIN0gCLcB/s1600/Untitled.png
 [2]: http://getbootstrap.com/components/#input-groups
 [3]: http://knockoutjs.com/documentation/custom-bindings.html
 [4]: https://github.com/Knockout-Contrib/Knockout-Validation/wiki/Custom-Validation-Rules