---
title: Sizing a Battery Backup (aka UPS)
author: Beej
type: post
date: 2015-11-23T19:45:00+00:00
url: /2015/11/sizing-battery-backup-aka-ups.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 7360948899819762122
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2015/11/sizing-battery-backup-aka-ups.html
blogger_thumbnail:
  - http://3.bp.blogspot.com/-mqZF5vjxKzM/VmEl1-grHyI/AAAAAAAAR4M/OC2jDiZ0ARs/s1600/Snap4.png
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
dsq_thread_id:
  - 5753666602
categories:
  - Uncategorized
tags:
  - Hardware

---
I live in the Seattle area, apparently we get a nice windy storm around every Thanksgiving… sure to form, we lost power for a nice long 24 hours starting 11/17/2015… so i finally ordered a low end generator… and then i started wondering about including a UPS for computer up-time continuity during the momentary brownouts that happen when the wind is jacking with our power grid.

### Power Requirements {#power-requirements}

  * [nice reference][1]
  * Typical UPS units will be rated in VA (Volt-Amps) aka Apparent Power … and possibly in Watts aka Real Power as well
  * The difference between these two comes from concept called [Power Factor][2]… PF = Real / Apparent… quick backgrounder: 
      * a “purely resistive” load like an old school incandescent light bulb will have a PF = 1 where VA and Watts are equal
      * whereas the typical implementation of AC to DC in a PC PSU represents an [inductive load][3] which causes the Amperage sine wave to lag behind the Voltage yielding a PF < 1 where some energy is “lost” &#8211; [helpful physical analogy &#8211; see horse and boat][4] &#8211; _it does beg the question where this energy is actually lost to… in the physical horse/boat scenario it’s easy to think it goes to friction/kinetic but i don’t have it pinned down in the AC/DC scenario… perhaps wasted in underutilized electromagnetic field_
  * Ideally your UPS will be rated for both their VA & Watts capacity but if only VA, then it is common to expect a UPS to handle Watts at 60% of it’s VA rating … i.e. 1000VA UPS should support 600Watts
  * So now you need to know your power requirements… there’s a couple ways to go about this: 
      1. take your PSU at face value… but how did you size your PSU in the first place… to be honest I just threw a dart when i went shopping 
      2. add up your components’ ratings
      3. buy a cheap ([~$20][5]) device to measure actuals &#8211; this option is easy, inexpensive, satisfyingly definitive and it’s a nice bonus to go measure everything else in your house … 
          * turns out my admittedly very [non-gamer rig][6] never went above 335VA (304 Watts, PF = 0.91) with maxed CPU and Gfx (Corsair HX750i PSU, Haswell-E 6 Core 5820k, Nvidia GTX 750Ti , 30” & 24” displays, USB speaker, USB mini network switch)
          * 300 VA just CPU maxed, no Gfx
          * 215 VA fairly idle
          * 144 VA remove 30” display
          * 75 VA remove 24” display
  * Finally, working back from those numbers into a UPS means I not only need at least 335VA but I also need to watch out for 304 Watts… i CAN NOT simply go after a 335VA UPS since that would only support 201 Watts (335 * 0.6) … and we [see this in typical UPS specs &#8211; notice the 650VA/390Watts][7] &#8211; … to put another way, since my Active PFC (see below) PSU puts my overall PF nearer to 1 vs 0.6, my Wattage load is the critical dimension to satisfy vs VA… to work back to a UPS VA that would support 304 Watts => VA * 0.6 = 304 Watts… VA = 304/0.6 = 506… so at minimum I am looking for 560VA/304Watts

### Secondary Considerations {#secondary-considerations}

  * I’m an Amazon junkie, I typically check off Amazon prime and then scan similar products for a high number of positive reviews… in the consumer UPS space (+/- $100 range) it’s really a matter of CyberPower vs APC… The [APC BE550G][8] is the obvious best rated at 4.5 stars 3218 reviews… 
  * [Generator Compatibility!][9]
  * **AVR** &#8211; Automatic Voltage Regulation &#8211; like all marketing, it sounds good… smooth out your voltages in brownouts, but I couldn’t find enough concrete evidence to say whether it was significant 
  * **Replaceable battery** &#8211; the APS and CyberPowers both appear to be readily servicable
  * **Info Display** &#8211; I’m kind of a sucker for the LCD
  * **Software** &#8211; it’s tough to find specifics on the APC & CyberPower software beyond turning off the beep and setting up automatic shutdown… i was somewhat interested in something that would actually log power consumption over time to give me some “Kill A Watt” style info… since the software does show Watts it seems feasible to think i could reverse gen the USB info and record it (_like i’ll actually get around to that_ 😉 
      * Apparently CyberPower is Mac & Linux compatible whereas APC is Windows only
  * Leaning towards [CyberPower CP600LCD][10] = $65 @ 2015-11-23

### Active Power Factor Correction (APFC) {#active-power-factor-correction-apfc}

  * the PF < 1 waste drives marketing of modern PC PSUs to trend towards Active Power Factor Correction (Active PFC) which means the PSU corrects the raw electronic load back to a PF = 1… and can thereby boast higher efficiency, which sells
  * through a fun combination of physical constraints, the kind of electric equipment humans could readily produce and politics at the outset of power distribution, modern society settled on high voltage AC and the momentum of large investments required have kept it that way… 
  * further, current is most readily generated by rotating mechanisms which lead to a smooth “harmonic” curve of voltage highs and lows over time, i.e. the oft referred sine wave… hence our electric grid was founded on smooth sine wave current 
  * and it’s therefore understandable that cost effective electric equipment would actually _depend_ on a smooth sine… and apparently **_some_** Active PFC PSU’s implementations are indeed sensitive to having a pure sine wave input… 
  * yet it is also cost effective for UPS’s to convert their DC battery source into AC via electronic approximations that yield a “stepped” wave vs the smooth sine we see from our power grid … this stepped sine is what dominates the consumer end UPS space (Fig.1)
  * the main downside of this potential conflict is that the fail-over from wall to UPS battery during a power outage may still cause a PC power cycle… 
  * Nevertheless based on my quick reading, we should generally rely on contemporary hardware to be compatible and the only way to really know for sure is to find a published test or test it yourself… the simple test is to unplug the UPS and see if you get a reboot or not 🙂 
      * positive conformation for [Corsair HX750W][11]

#### Fig.1 {#fig1}

<img height="200" src="http://www.BeejBlog.com/wp-content/uploads/2015/11/Snap4.png" />

 [1]: http://www.power-solutions.com/watts-va
 [2]: https://en.wikipedia.org/wiki/Power_factor
 [3]: http://electronics.stackexchange.com/questions/91975/what-does-load-mean-and-what-are-the-different-types
 [4]: http://www.energy-in-motion.com/PFC.html
 [5]: http://www.amazon.com/P3-P4400-Electricity-Usage-Monitor/dp/B00009MDBU/ref=sr_1_1?ie=UTF8&qid=1448315611&sr=8-1&keywords=kill%20a%20watt%20usage%20monitor
 [6]: http://www.beejblog.com/2015/09/X99Build.html
 [7]: http://www.amazon.com/CyberPower-EC850LCD-Ecologic-510-Watts-Efficient/dp/B00DBAA696/ref=sr_1_5?ie=UTF8&qid=1448301527&sr=8-5&keywords=sine+wave+ups
 [8]: http://www.amazon.com/APC-BE550G-Back-UPS-8-outlet-Uninterruptible/dp/B0019804U8/ref=sr_1_2?s=pc&ie=UTF8&qid=1448319704&sr=1-2&keywords=ups%20battery%20backup
 [9]: http://www.tech-army.org/forum/forum_posts.asp?TID=1129
 [10]: http://www.amazon.com/CyberPower-CP600LCD-Intelligent-600VA-Compact/dp/B000OTEZ5I/ref=cm_cr_pr_product_top?ie=UTF8
 [11]: http://www.tomshardware.com/forum/352692-28-will-corsair-work-sinwave-square-wave#10211635