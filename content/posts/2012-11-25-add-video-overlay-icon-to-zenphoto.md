---
title: Add Video overlay Icon to Zenphoto Thumbnails
author: Beej
type: post
date: 2012-11-26T06:06:00+00:00
year: "2012"
month: "2012/11"
url: /2012/11/add-video-overlay-icon-to-zenphoto.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 5990585404806550942
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2012/11/add-video-overlay-icon-to-zenphoto.html
blogger_thumbnail:
  - https://lh6.ggpht.com/-Z7mqgQlMOOI/ULKan_C4lOI/AAAAAAAAFHM/pOPqz7BxIJ4/Video_Overlay_thumb%25255B2%25255D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
dsq_thread_id:
  - 5542139049
categories:
  - Uncategorized
tags:
  - Photography

---
  * Edit _zp-coretemplate-functions.php_, look for _printCustomSizedImage()_ function and edit it to switch to using _style=”background:url(‘’)”_ as shown below. 
  * Configure overlay image: 
      * Start with a completely transparent png the same height and width as your thumbnails (168 pixels in my case) 
      * Find a preferred icon for the image (perhaps via Google Image Search) and paste that into your transparent background… 
      * downsizing and hiding it in a corner is a nice effect 
      * as well as adding a little bit of transparency 

For example:
  
[<img alt="Video_Overlay" src="https://lh6.ggpht.com/-Z7mqgQlMOOI/ULKan_C4lOI/AAAAAAAAFHM/pOPqz7BxIJ4/Video_Overlay_thumb%25255B2%25255D.png?imgmax=800" height="168" style="display: inline;" title="Video_Overlay" width="168" />][1]

<pre class="prettyprint">function printCustomSizedImage($alt, $size, $width=NULL, $height=NULL, $cropw=NULL, $croph=NULL, $cropx=NULL, $cropy=NULL, $class=NULL, $id=NULL, $thumbStandin=false, $effects=NULL) {
    global $_zp_current_image;
    if (is_null($_zp_current_image)) return;
    if (!$_zp_current_image->getShow()) {
        $class .= " not_visible";
    }
    $album = $_zp_current_image->getAlbum();
    $pwd = $album->getPassword();
    if (!empty($pwd)) {
        $class .= " password_protected";
    }
    if ($size) {
        $dims = getSizeCustomImage($size);
        $sizing = ' width="'.$dims[0].'" height="'.$dims[1].'"';
    } else {
        $sizing = '';
        if ($width) $sizing .= ' width="'.$width.'"';
        if ($height) $sizing .= ' height="'.$height.'"';
    }
    if ($id) $id = ' id="'.$id.'"';
    if ($class) $id .= ' class="'.$class.'"';
    if (isImagePhoto() || $thumbStandin) {
                      /* $html = '<img src="' . pathurlencode(getCustomImageURL($size, $width, $height, $cropw, $croph, $cropx, $cropy, $thumbStandin, $effects)) . '"' . */
        $html = '<img src="' . VideoOverlayIcon(pathurlencode(getCustomImageURL($size, $width, $height, $cropw, $croph, $cropx, $cropy, $thumbStandin, $effects))) . '"' .
            ' alt="' . html_encode($alt) . '"' .
            $id .
            $sizing .
            ' />';
        $html = zp_apply_filter('custom_image_html', $html, $thumbStandin);
        echo $html;
    } else { // better be a plugin
        echo $_zp_current_image->getBody($width, $height);
    }
}
 
function VideoOverlayIcon($url)
{
    if (isImageVideo()) return '/Photos/albums/Video_Overlay.png" style="background:url(' . $url . ')';
    else return $url;
}
</pre>

 [1]: https://lh3.ggpht.com/-6u4N74pJ8-8/ULKanCkQrkI/AAAAAAAAFHE/kVg29WJKxHo/s1600-h/Video_Overlay%25255B4%25255D.png