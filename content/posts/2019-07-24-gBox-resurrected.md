---
title: "gBox Resurrected"
date: 2019-07-24T14:19:42-08:00
type: post
author: Beej
year: "2019"
month: "2019/07"
url: /2019/07/2019-07-24-gBox-Resurrected.html
tags:
  - Hardware
---

## The Geek Love Story

<img style="height: 300px; float:right" src="https://user-images.githubusercontent.com/6301228/62012493-e71af080-b13b-11e9-9957-6ef88e03d005.jpg" />

Way back in probably about 2002 I saw this barebones kit, distributed through AMS in California under the name "gBox", in the ads section of I believe an InfoWorld magazine. I remember browsing the magazine in the company lunch room and as soon as I saw the shiny acrylic and aluminum, I knew it was fate that we would be together =)

<style>
.container {
 /*width: 1000px;*/
 overflow: hidden;
 margin: 50px auto;
 background: white;
}
  
.container img { height: 233px }

/*keyframe animations*/
.first {
 -webkit-animation: bannermove 30s linear infinite;
    -moz-animation: bannermove 30s linear infinite;
     -ms-animation: bannermove 30s linear infinite;
      -o-animation: bannermove 30s linear infinite;
         animation: bannermove 30s linear infinite;
}
 
@keyframes "bannermove" {
 0% {
    margin-left: 0px;
 }
 100% {
    margin-left: -2125px;
 }
 
}
 
@-moz-keyframes bannermove {
 0% {
   margin-left: 0px;
 }
 100% {
   margin-left: -2125px;
 }
 
}
 
@-webkit-keyframes "bannermove" {
 0% {
   margin-left: 0px;
 }
 100% {
   margin-left: -2125px;
 }
 
}
 
@-ms-keyframes "bannermove" {
 0% {
   margin-left: 0px;
 }
 100% {
   margin-left: -2125px;
 }
 
}
 
@-o-keyframes "bannermove" {
 0% {
   margin-left: 0px;
 }
 100% {
   margin-left: -2125px;
 }
 
}

.photobanner {
 /*height: 233px;*/
 width: 3550px;
 /*margin-bottom: 80px;*/
}
 
.photobanner img {
 -webkit-transition: all 0.5s ease;
 -moz-transition: all 0.5s ease;
 -o-transition: all 0.5s ease;
 -ms-transition: all 0.5s ease;
 transition: all 0.5s ease;
}
 
.photobanner img:hover {
 -webkit-transform: scale(1.1);
 -moz-transform: scale(1.1);
 -o-transform: scale(1.1);
 -ms-transform: scale(1.1);
 transform: scale(1.1);
 cursor: pointer;
 
 -webkit-box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
 -moz-box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
 box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
}
</style>

## Notables

- The "LAN box" handle makes it fairly rare even to this day. I am also drawn to the minimalist efficiency of Small Form Factor (SFF) but those are fairly plentiful on their own. The free market just seems to never have developed a taste for  the utility of computers with handles. I find it quite natural... especially for enthusiasts that fiddle with their hardware, it's very common to need to hoist it to some workbench or just flip it around to plug in a new cable.
- The original mobo was "[FlexATX](https://en.wikipedia.org/wiki/FlexATX)" which I originally thought was just an extended min-ITX but wound up realizing the mounting standoffs were indeed different spacing and had to install new ones in the right place... which I stumbled through measuring a million times and wound up getting close enough to mildly [toenail](https://en.wikipedia.org/wiki/Toenailing) in the bolts =)
- Yet FlexATX wound up also being a real blessing for extra space in the case - it provided exactly the extra 100mm+ needed to fit both push & pull fans plus the double thick radiator of Corsair H80 V2 at the front of the case... before the smaller ITX mobo eats up the remaining floor space (see photos).
- Carving out the I/O plate area in the back - since this was a kit, they did a noble move of marrying the included motherboard I/O ports to custom punchouts in the continuous aluminum back face... but this turned into the fun work of knocking out that section to be an open rectangle for a modern replacement.
- Very pleased to finally realize the SFX form factor PSUs were where I should be shopping for power. It took a long while to recognize that while SFX itself was actually too small to cover my back face opening, they also come with a standard ATX plate... the ATX face plate combined with the SFX short 100mm depth standard is a dream fit for this case... any longer than 100m plus the bundle of cables would run smack into the back of the optical drive bay... its amazing what these vendors are cramming into a box the size of a small cheeseburger... Previously I managed to find an ugly c-tier vendor supply that had somehow aged to the point of "squeeling" under zero load upon power... Thankfully we're now bathing in luxurious abundance of "SFX" form factor PSUs from mainstream manufacturers like Corsair.  They sport all the enthusiast high end features like up to 750 watts, not just gold but even platinum level 80 plus certification, powder coated paint job and modular cables including the extra ATX 12v lines needed for modern multicore boards.

All these factors come together in a super pleasing DIY blend of old and new physicalities that i still can't help smiling about when i glance over at it on my desk =)

A big part of the satisfaction comes from knowing the retrofitting puts it back on the beaten upgrade path for years to come versus covered in "what if" regret dust sidlined on a shelf.  I assume people are this way about cars =)

## Old School References

- [AMSElectronics.com CF-S868 Product Page](https://web.archive.org/web/20061029171006/http://www.amselectronics.com/Products/PC_Servers/CF-S868.html)
- [ChyangFun.com CF-S868 Product Page](https://web.archive.org/web/20020903192257/http://www.chyangfun.com/Product/S868.htm)
- [PugetSystems.com review with photos](https://www.pugetsystems.com/labs/articles/AMS-gBox-P4-DDR-Review-9/)
- [DansData.com Review with photos](http://www.dansdata.com/minipc.htm)
- [Falcon Northwest original "Fragbox"]() - It's cool that all the way here in 2019 Falcon continues to provide the still rare commodity of an SFF with handle... they were using a SilverStone case for a few years after the original Chyang... not sure what it is these days.

## Current State (2019)


<div class="container">
<div class="photobanner">
  <img src="https://user-images.githubusercontent.com/6301228/61926845-3805cb80-af27-11e9-9d45-774d6e673f3b.png" class="first" />
  <img src="https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png" />
  <img src="https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png" />
  <img src="https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png" />
  <img src="https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png" />
  <img src="https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png" />
  <img src="https://user-images.githubusercontent.com/6301228/61926845-3805cb80-af27-11e9-9d45-774d6e673f3b.png" />
  <img src="https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png" />
  <img src="https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png" />
  <img src="https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png" />
</div>
</div>
