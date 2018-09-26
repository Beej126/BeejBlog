---
title: Overclocking ‘Skeletor’ Q9540 v1.0
author: Beej
type: post
date: 2010-09-23T18:44:00+00:00
year: "2010"
month: "2010/09"
url: /2010/09/overclocking-skeletor-q9540-v10.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 6028372472269837434
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2010/09/overclocking-skeletor-q9540-v10.html
blogger_thumbnail:
  - https://lh4.ggpht.com/_XlySlDLkdOc/TJvSjY6bYqI/AAAAAAAAExw/_b2V82SAEZA/image_thumb%5B2%5D.png?imgmax=800
dsq_thread_id:
  - 5516916515
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
tags:
  - Hardware

---
[Update: 14 Dec 2010] <a href="/2010/12/overclocking-skeletor-q9450-round-2.html" target="_blank">Round 2 here</a> <a href="/2009/10/open-air-pc.html" target="_blank">Photos of the rig</a> Well I just spent a few hours racking up some serious negative wifey points to see what I could see at the end of the OC rainbow 🙂 Current CPU specs: 

  * <a href="https://en.wikipedia.org/wiki/List_of_Intel_Core_2_microprocessors#.22Yorkfield.22_.2845_nm.29" target="_blank">Intel Q9450 Quad Core 2 “Yorkfield”</a> 
  * Got it for $382.48 including shipping back on 21 April 2008 (not quite a month after release 🙂 
  * LGA 775 socket 
  * stock @ 2.66GHz (333MHz FSB&#160; x 8x multiplier = 2.66GHz) 
  * The multiplier is locked on this CPU (<a href="https://en.wikipedia.org/wiki/Standard_operating_procedure" target="_blank">SOP</a> for cheaper non ‘Extreme’ Intels) so the only way I can overclock is by jacking the FSB. 
  * 2 * 6MB = 12MB L2 cache 
  * 333MHz * quad pumped = 1333MHz effective FSB 



<div>
  RAM considerations:
</div>

  * 333MHz FSB x quad pump means the minimum RAM spec is 1333MHz (= 4 x 333) to keep up with the FSB & CPU 
  * DDR &#8211; this 1333 MHz is a <a href="https://en.wikipedia.org/wiki/Double_data_rate" target="_blank">DDR</a> number meaning the RAM clock is actually half that (reference how the timings are typically rated under RAM Specs below) 
  * FSB/RAM Ratio &#8211; that 1333 MHz is bare minimum in order to stay with a 1:1 FSB/RAM clock ratio… one can lower typically jimmy with this ratio in your OC bios settings to avoid choking your RAM while still goosing your CPU… i don’t have a feel for how practical that compromise winds up being but OC’ing is all about bragging rights and 1:1 just sounds cooler doesn’t it? ;) 
  * Anyway, I decided to go with bare minimum DDR3-1333's starting out given Q2 2008 build date prices ... Hoping that I’d be able to juice them a little over spec without paying for it of course 🙂 

<div>
  &#160;
</div>

<div>
  Current RAM Specs:
</div>

  * G.SKILL &#8211; Part#: F3-10600CL9D-2GBNQ 
  * DDR3 1333MHz, PC3-10600 
  * Timings: CL 9-9-9-24 @ 666 MHz, 8-8-8-22 @ 592 MHz, 6-6-6-16 @ 444 MHz 
  * 1.5V – 1.65V 
  * 4 x 1GB Sticks (NewEgg was $110 per 2 x 1GB bundle = $220 total for G.SKILL 4GB DDR3 1333MHz back on 21 Apr 2008) 

<div>
  &#160;
</div>

<table>
  <tr>
    <td valign="top">
      <div>
        Mobo Specs:
      </div>
      
      <ul>
        <li>
          <a href="https://in.asus.com/product.aspx?P_ID=y0FpG1REOUaqwk2E" target="_blank">ASUS P5E3 PREMIUM/WIFI-AP @n</a>
        </li>
        <li>
          BIOS: AMI (09/02/08)
        </li>
        <li>
          FSB: 1600/1333/1066/800 MHz
        </li>
        <li>
          Socket: LGA775
        </li>
        <li>
          Chipset: X48
        </li>
        <li>
          HDD Controllers: <ul>
            <li>
              Intel ICH9R = 6 x SATA 3Gb/s RAID 0,1,5,10
            </li>
            <li>
              JMicron <strong>JMB363 </strong>= 2 x eSata ports & 1 PATA/IDE legacy port
            </li>
          </ul>
        </li>
        
        <li>
          Card Slots: 2 x PCIe 2.0 x16 @ x16&#160;&#160;&#160;&#160;&#160;&#160;&#160; 1 x PCIe 1.0 <a href="https://en.wikipedia.org/wiki/PCI_Express#PCI_Express_.28standard.29" target="_blank">x16 @ x4</a>, x1&#160;&#160;&#160;&#160;&#160;&#160;&#160; 1 x PCIe x1&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; 2 x PCI&#160;
        </li>
        <li>
          RAM Slots: 4 x DIMM, 8 GB, DDR3 2000/1800/1600/1333/1066/800 Non-ECC, Un-buffered, Dual Channel
        </li>
        <li>
          NICs: Dual Gigabit &#8211; Marvell 88E8056 (PCIe) & Realtek RTL8110SC (PCI)
        </li>
        <li>
          Audio: Analog Devices AD1988B @ Intel 82801IB ICH9
        </li>
      </ul>
    </td>
    
    <td>
      <a href="https://lh4.ggpht.com/_XlySlDLkdOc/TJvSiVADv5I/AAAAAAAAExs/QZ1wfrcN29g/s1600-h/image%5B4%5D.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="https://lh4.ggpht.com/_XlySlDLkdOc/TJvSjY6bYqI/AAAAAAAAExw/_b2V82SAEZA/image_thumb%5B2%5D.png?imgmax=800" width="379" height="348" /></a>
    </td>
  </tr>
</table>



<div>
  OC Reality (kind of dismal actually):
</div>

  * 466 MHz FSB x 8 = 3.72 GHz wouldn't even boot 🙂 
  * 433 MHz FSB&#160;&#160;&#160;&#160;&#160;&#160; = 3.48 GHz booted but <a href="https://en.wikipedia.org/wiki/Bsod" target="_blank">BSOD</a>’d pretty quick 🙂 
  * 400 MHz FSB&#160;&#160;&#160;&#160;&#160;&#160; = 3.21 GHz lasted through 10+ minutes of serious crank tests <yeah?> but BSOD’d right when I fired up Outlook after those tests <rats!> 
  * 380 MHz FSB&#160;&#160;&#160;&#160;&#160;&#160; = 3.05 GHz seemed to hold <meh, better than nothing i guess> 

I then realized that my BIOS OC settings were in an auto RAM ratio selection mode… at 380 MHz FSB it was choosing 456MHz core RAM clock (= 912 MHz DDR)… which compared to 1333MHz isn’t very awe inspiring… it was easy to change the BIOS OC settings from auto to a locked RAM clock to see what happens… I set my RAM clock to 1520MHz DDR (380 MHz x 4 for quad pump) to keep 1:1 with the FSB … it booted… ran for a while, still eventually BSOD’d 🙁 well, they’re rated for 1333 and apparently I got just what I paid for. Voltage:   
I'm getting mixed signals from Everest... some screens say Core CPU is 1.0xxx and others say 1.2... no sure what to take as gospel there... my ASUS P5E3 x48 mobo's got some nice auto OC optimizer logic that I believe is choosing that voltage for me... I think I've read that 1.3v is tops recommended so you don't fry it... the way I see it, once everything else like bus bandwidths are lined up, voltage is the thing to creep up for stability ... I'd like to get 3.2GHz CPU to be stable and be happy with that. Temps:   
I'm idling just under 50c right now with silent medium fan level so I'm sorta wondering if I went a little too heavy on the thermal paste... easy mistake... I really really watched it but that's my first guess... the stress test at medium fan level got right up to 70c but no higher thankfully... putting it at a reasonable but audible high fan level knocked everything down about 7c which is great to watch.

<div>
  Bottom line:
</div>

  1. Obviously I didn’t get anywhere with OC'ing yet so far 
  2. I’ve now reapplied the thermal paste… i’m pretty clueless here… looked pretty thin smooth clean, but i really don’t know 
  3. First obvious move is DDR3-1600 to keep up with 400MHz FSB = 3.2GHz CPU …&#160; 
      * <strike>Rats, Everest pulled meta data which indicates mobo only supports up to DDR3-1333… hmmm… sounds like I should just get an i7 or something ;) </strike>
      * <strike>mobo FSB is rated up to 1600 so ok there</strike> 
      * [Update: 12 Nov 2010] Stumbled into the mobo manual <duh> for another reason, RAM modules up to DDR3-1800 are listed with immediate compatibility, and even up to DDR3-2000 is listed with O.C. disclaimers (e.g. air cooling on the RAM modules is recommended) … but the guys I read on 13 Dec 2010 below have a good point… all those RAM specs at 1600+ are only 1GB populated… so they weren’t filling up all the slots during those tests 
      * i like to think the stability i saw running 10+ minutes under high utilization @ 400 MHz is promising 
      * <a href="https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&IsNodeId=1&Description=4GB%20DDR3-1600&bop=And&Order=PRICE&PageSize=20" target="_blank">NewEgg 4GB (2 x 2GB) Search</a> = <$100 ballpark (23 Sep 2010) 
      * <a href="https://www.newegg.com/Product/Product.aspx?Item=N82E16820231303&cm_re=4GB_DDR3-1600-_-20-231-303-_-Product" target="_blank">G.SKILL “RipJaws” DDR3-1600 with CL 7 timings = $75</a> (as of 13 Dec 2010, already dropped from $95 just a month ago 12 Nov 2010) … “Customer Choice Award Winner” sounds nice. 
      * <a href="https://www.newegg.com/Product/Product.aspx?Item=N82E16820231367&cm_re=ddr3_1800_4gb-_-20-231-367-_-Product" target="_blank">G.SKILL “Flare” DDR3-1800 w/CL7 timings = $140</a> (12 Nov 2010) … that might be fun… 433&#215;4 = 1732 RAM freq would run nearly 3.5GHz CPU clock… would have to try 466 = 1864 just to see of course ;)&#160; lots of helpful OC tips in the feedback for those modules … [Update: 13 Dec 2010] these seem like they’ve been discontinued… maybe they weren’t the real deal 
      * [Update: 13 Dec 2010] <a href="https://vip.asus.com/forum/view.aspx?id=20101006051940172&board_id=1&model=P5E3+Premium%2fWiFi-AP%40n&page=1&SLanguage=en-us" target="_blank">This was a great, fresh, discussion</a> that confirmed my suspicions and filled in a lot of holes for me… nutshell: 
          * they’ve had trouble going above 1333 as well 
          * they’ve been successful at 1400’ish x 4 sticks with 7-7-7-21 timings … that really doesn’t seem like much to write home about 
          * and this deep tech: “A big part of getting the board stable at higher clocks was turning C1E off and setting the Load Line Calibration to Performance to combat the Vdroop and the board switching back and forth between the 6.0 and 8.0 multiplier”… I don’t know what half of those words mean 
          * <a href="https://vip.asus.com/forum/view.aspx?id=20101207082440090&board_id=1&model=P5E3+Premium%2fWiFi-AP%40n&page=1&SLanguage=en-us" target="_blank">post#4 here</a> was good too 
          * they indicate that 2 sticks is better odds for success above 1333 … something about not “able to push enough info to all 4 slots at speeds above 1333 MHz”… 
              * so you might want to go with 2 x 4GB’s rather than 4 x 2GB’s if you’re shooting for 8GB this round 
              * or maybe think further ahead and get a 3 stick kit for Nehalem or presumably Sandy Bridge and just let than one stick hang loose for now… naww 
              * <a href="https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&N=100006519%2050008476%2040000147%20600006069%20600006156&IsNodeId=1&name=7" target="_blank">NewEgg, G.SKILL page</a>… 2 x 4GB with 7-8-7-24 timings are in the $200 ballpark but they top out at 1600 right now (as of 13 Dec 2010)… that’s a bummer… 
              * actually there is nothing out there for 1800 with CL7 timings… so it would have to be 1600 I guess 
              * so with all that, I could easily spring for the $75 1600 CL7 2 x 2GB kit and see what there is to see at 3.2 GHz… or I could always just stay put and throw everything into a 6 core Gulftown or wait and see what Sandy Bridge is all about… decisions, decisions… at least it’s good to feel more solid about where this board is at.