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

<img style="height: 300px; float:right; margin: 0.6em" src="https://user-images.githubusercontent.com/6301228/64924190-a5e7aa00-d796-11e9-880c-c9f2498ba540.png" />
<img style="height: 300px; float:right; margin: 0.6em" src="https://user-images.githubusercontent.com/6301228/62012493-e71af080-b13b-11e9-9957-6ef88e03d005.jpg" />

## The Geek Love Story

Back around 2002, I was sitting in my company lunch room, browsing the ads section of an [InfoWorld](https://en.wikipedia.org/wiki/InfoWorld) when I saw this barebones kit they were calling the "gCube". I remember instantly digging the acrylic wrapped aluminum look, similar to the Power Mac G4 Cube that got a lot of press back then.

## Old School References
I've gathered some Internet Archive (aka "Wayback Machine") links to the reviews and marketing of this case from various distributors.
- [AMSElectronics.com CF-S868 Product Page](https://web.archive.org/web/20061029171006/http://www.amselectronics.com/Products/PC_Servers/CF-S868.html)
- [ChyangFun.com CF-S868 Product Page](https://web.archive.org/web/20020903192257/http://www.chyangfun.com/Product/S868.htm)
- [PugetSystems.com review with photos](https://www.pugetsystems.com/labs/articles/AMS-gBox-P4-DDR-Review-9/)
- [DansData.com Review with photos](http://www.dansdata.com/minipc.htm)
- [Falcon Northwest original "Fragbox"](https://web.archive.org/web/20031206091154/http://www.falcon-nw.com/fragbox.asp) - Falcon switched to a SilverStone case for several years after the original Chyang; and pretty sure they're using something else these days.  It's notable even in 2019 they continue to find reason to sell something WITH A HANDLE.

## New Components
- Mobo: [ASRock z390 Phantom Gaming-ITX/ac](https://www.asrock.com/MB/Intel/Z390%20Phantom%20Gaming-ITXac/index.asp)
  - Love that ITX with built in thunderbolt-3, and dual 4k video ports is FINALLY a thing we can get.
- CPU: [Intel Core i9-9900K](https://www.intel.com/content/www/us/en/products/processors/core/i9-processors/i9-9900k.html)
  - This is <span class="hl">8 core</span>, 9th gen Coffee Lake with built in HD 630 graphics. For my needs as a developer workstation, it's nice I don't have to cram in an external video card... a small one might just barely fit if I wanted to go there.
- Cooler: [Corsair Hydro Series H80i v2](https://www.corsair.com/us/en/Categories/Products/Liquid-Cooling/Single-Radiator-Liquid-Coolers/Hydro-Series%E2%84%A2-H80i-v2-High-Performance-Liquid-CPU-Cooler/p/CW-9060024-WW)
  - Admiteddly just a 120mm and easy to overwhelm with this monster CPU but it's a double thick radiator, the fans are push+pull and it's the largest I can possibly cram into this small case size I'm drawn to.
- RAM: [Corsair Dominator Platinum 32GB (2x16GB) DDR4 3200MHz C16](https://www.corsair.com/us/en/Categories/Products/Memory/DOMINATOR%C2%AE-PLATINUM-32GB-%282-x-16GB%29-DDR4-DRAM-3200MHz-C16-Memory-Kit/p/CMD32GX4M2C3200C16)
- SSD: [Samsung 970 PRO 512GB - NVMe PCIe M.2](https://www.samsung.com/us/computing/memory-storage/solid-state-drives/ssd-970-pro-nvme-m2-512gb-mz-v7p512bw/)
  - These PCIe drives crank 3500 MB/s reads! and 5yr warranty.
- PSU: [Corsair SF600 Platinum](https://www.corsair.com/us/en/Categories/Products/Power-Supply-Units/Power-Supply-Units-Advanced/SF-Series/p/CP-9020182-NA)
  - Lots to say about this below.

<style>
div.gallery + p img {
  height: 300px;
}
</style>

<div class="gallery"></div>
![](https://www.asrock.com/mb/photo/Z390%20Phantom%20Gaming-ITXac(L4).png)
![](https://user-images.githubusercontent.com/6301228/64915747-4d2af980-d723-11e9-831d-cf6d8af2625b.png)
![](https://www.corsair.com/medias/sys_master/images/images/h8d/h78/9110765076510/-CW-9060024-WW-Gallery-H80i-01.png)
![](https://www.corsair.com/medias/sys_master/images/images/hfd/h03/9110470361118/-CMD32GX4M2C3200C16-Gallery-DOM-DDR4-PLAT-002.png)
![](https://image-us.samsung.com/SamsungUS/home/computing/memory-and-storage/solid-state-drives/pdp/mz-v7p512bw/gallery-updates-10-02-18/002_gallery_MZ-V7P512BW_10-02-18.jpg)
![](https://www.corsair.com/medias/sys_master/images/images/h07/h21/9112508497950/-CP-9020182-NA-Gallery-SF600-09.png)

## Highlights

- **<span style="float: left; font-size: 3em; margin: 0.3em 5px 0 0px; color: red">H</span>andle** - The "LAN box" handle makes it fairly rare even to this day. I am also drawn to the minimalist efficiency of Small Form Factor (SFF) but those are fairly plentiful on their own. The free market just seems to never have developed a taste for  the utility of computers with handles. I find it quite natural... especially for enthusiasts that fiddle with their hardware, it's very common to need to hoist it to some workbench or just flip it around to plug in a new cable.

- [<img style="float: right; height: 300px; margin: 0.6em;" src="https://upload.wikimedia.org/wikipedia/commons/f/fd/ATX_ITX_AT_Motherboard_Compatible_Dimensions.svg" />](https://en.wikipedia.org/wiki/ATX) The original layout of this kit was based on a short lived standard called "[FlexATX](https://en.wikipedia.org/wiki/FlexATX)". Flex is a little bit longer and wider than the plentiful mini-ITX boards available these days. This meant some extra work to add new mount posts in the case bottom, to line up with Flex's mount hole layout.

   - Yet the extra Flex space wound up being a real blessing - it provided exactly the spare case depth needed to squeeze in the giant cooling radiator and fans behind the front face. The smaller ITX mobo eats up all the remaining floor space (see photos). The fans are in push + pull configuration to get as much cooling as possible. Frankly, the 9900k CPU can still easily overwhelm this small of a cooler with overclocking.
<div><br/></div>

- Carving out the I/O plate area in the back - they did a noble design of marrying the kit's I/O ports to customized punchouts in the back face of the case... but this turned into the fun work of dremmeling out that section to be an open mouth for modern I/O plate.

- <img style="float: right; height: 300px; margin: 0.6em;" src="https://user-images.githubusercontent.com/6301228/64915665-1227c680-d721-11e9-9e59-30fa51b537aa.png" /> Very pleased to finally discover the [SFX](https://www.tomshardware.co.uk/power-supply-specifications-atx-reference,review-32338-4.html) form factor PSUs were where I should be shopping for power (wild this has been a standard since 1997!?)
  - This case absolutely requires the short 100mm depth of more recently defined "PS3" sub species of SFX... any deeper and the power cable bundle would run into the optical drive bay.  So this got me into the right depth, but the stock SFX height didn't fill out the entire opening on the back of this case :\...
  - Fortunately I then noticed these can be fitted with an <u>extension plate</u> that covers the standard ATX PSU opening, exactly what I needed! <span class="hl">The ATX face plate combined with the SFX short depth is an absolute dream fit for this case</span>.
  - The horsepower these vendors are cramming into such a small box is pretty amazing when you look at a full size ATX PSU next to it.
  - My previous PSU is an absolute dog compared to these specs. It's so nice we get a strong selection of high end supplies to choose from mainstream manufacturers like Corsair these days: up to 750 watts, gold and even platinum level 80 plus certification, powder coated paint jobs and loving the <u>modular cables</u>, of course including the extra 12v lines modern multicore boards require.

It all came together in a super pleasing DIY blend of modern components wrapped in retro =)

The ITX retrofitting puts it back on the beaten upgrade path for years to come.

## Current State (2019)

<div class="gallery"></div>
[![](https://user-images.githubusercontent.com/6301228/61926845-3805cb80-af27-11e9-9d45-774d6e673f3b.png)](https://user-images.githubusercontent.com/6301228/61926845-3805cb80-af27-11e9-9d45-774d6e673f3b.png)
[![IMG_2942](https://user-images.githubusercontent.com/6301228/64916135-1e655100-d72c-11e9-9e2e-211004a9ada3.JPG)](https://user-images.githubusercontent.com/6301228/64916135-1e655100-d72c-11e9-9e2e-211004a9ada3.JPG)
[![IMG_2940](https://user-images.githubusercontent.com/6301228/64916116-a1d27280-d72b-11e9-99fc-fb6a967ed446.JPG)](https://user-images.githubusercontent.com/6301228/64916116-a1d27280-d72b-11e9-99fc-fb6a967ed446.JPG)
[![](https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png)](https://user-images.githubusercontent.com/6301228/61926906-78fde000-af27-11e9-9a90-f62c0eca7a34.png)
[![IMG_2950](https://user-images.githubusercontent.com/6301228/64916112-718ad400-d72b-11e9-8479-7f647d2d056a.JPG)](https://user-images.githubusercontent.com/6301228/64916112-718ad400-d72b-11e9-8479-7f647d2d056a.JPG)
[![IMG_2954](https://user-images.githubusercontent.com/6301228/64916102-5b7d1380-d72b-11e9-8141-7b77573d4a07.JPG)](https://user-images.githubusercontent.com/6301228/64916102-5b7d1380-d72b-11e9-8141-7b77573d4a07.JPG)

## Mod'ing

<div class="gallery"></div>
[![IMG_2531](https://user-images.githubusercontent.com/6301228/64916167-4ef9ba80-d72d-11e9-8ceb-838ca34487e0.JPG)](https://user-images.githubusercontent.com/6301228/64916167-4ef9ba80-d72d-11e9-8ceb-838ca34487e0.JPG)
[![img_2538](https://user-images.githubusercontent.com/6301228/64916161-1823a480-d72d-11e9-9c2b-82756caa4ba2.jpg)](https://user-images.githubusercontent.com/6301228/64916161-1823a480-d72d-11e9-9c2b-82756caa4ba2.jpg)
[![IMG_2543](https://user-images.githubusercontent.com/6301228/64916185-a3049f00-d72d-11e9-995c-7d62f2b3a835.JPG)](https://user-images.githubusercontent.com/6301228/64916185-a3049f00-d72d-11e9-995c-7d62f2b3a835.JPG)
[![IMG_2541](https://user-images.githubusercontent.com/6301228/64916189-adbf3400-d72d-11e9-9ca4-4f37efdaa879.JPG)](https://user-images.githubusercontent.com/6301228/64916189-adbf3400-d72d-11e9-9ca4-4f37efdaa879.JPG)
