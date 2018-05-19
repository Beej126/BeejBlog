---
title: HTML5 Canvas based 3d Tag Cloud
author: Beej
type: post
date: 2016-02-09T16:46:49+00:00
url: /2016/02/html5-canvas-based-3d-tag-cloud.html
dsq_thread_id:
  - 5568155472
tags:
  - Blogging

---
This [Goat1000.com][1] guy has provided an amazingly comprehensive 3d library&#8230; the configuration options are endless.

    <!--[if lt IE 9]><script type="text/javascript" src="excanvas.js"></script><![endif]-->
    <script src='//www.goat1000.com/jquery.tagcanvas.min.js' type='text/javascript'/>
    
    <script type="text/javascript">
      $('#canvas3dTagCloud').tagcanvas({
        textColour : '#000',
        outlineThickness : 2,
        maxSpeed : 0.03,
        depth : 0.75,
        zoom: 1.15,
        weight: true,
        weightFrom: "data-weight",
        weightSize: 5
      });
    </script>
    

Below needs to be edited for your particular blog engine&#8217;s syntax for looping over tags (Google Blogger sample).
  
Due to internal use of getElementById, it appears our canvas element must be targeted via an #Id selector in above jquery (i.e. can&#8217;t use a class selector)

    <canvas height='272' id='canvas3dTagCloud' width='272'>
      <p>Anything in here will be replaced on browsers that support the canvas element</p>
      <ul><b:loop values='data:labels' var='label'> <!-- this is google blogger syntax for looping over the label values -->
        <li><a expr:data-weight='data:label.cssSize' expr:href='data:label.url'><data:label.name/></a></li>
      </b:loop></ul>
    </canvas>
    

If you don&#8217;t have server side control, just apply necessary elements via jQuery prior to calling .tagcanvas() shown above &#8211; WordPress TagCloud sample

      jQuery(".tagcloud").wrap('<canvas id="canvas3dTagCloud" width="256" height="256"></canvas>');

 [1]: http://www.goat1000.com/tagcanvas.php