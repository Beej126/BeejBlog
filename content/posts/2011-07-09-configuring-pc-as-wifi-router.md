---
title: Configuring a Windows 7 PC as a WiFi Router
author: Beej
type: post
date: 2011-07-09T08:15:00+00:00
year: "2011"
month: "2011/07"
url: /2011/07/configuring-pc-as-wifi-router.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 6896877672067926624
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 1
blogger_permalink:
  - /2011/07/configuring-pc-as-wifi-router.html
blogger_thumbnail:
  - http://lh6.ggpht.com/-YPLrkV-Jewc/ThgzcxQW6JI/AAAAAAAAE9Q/DMQ3G-CZCl4/Snap7_thumb%25255B4%25255D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:195:"a:1:{i:0;a:7:{s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";
dsq_thread_id:
  - 5508631626
categories:
  - Uncategorized
tags:
  - Networking

---
Update 2011-07-11: Primary WiFi client user ran into dismal buffering on video streaming… that’s primary usage scenario so PC as a Router is a NO-GO.&#160; I loaded DD-WRT (following the <a href="http://www.dd-wrt.com/wiki/index.php/Linksys_WRT310N_v1.0" target="_blank">wiki guide</a>) and it’s working much better… should have done that in the first place, thanks bro! :)&#160; (read something about a port forwarding bug in the standard build and went with the recommend <a href="ftp://dd-wrt.com/others/eko/BrainSlayer-V24-preSP2/2010/08-12-10-r14929/broadcom/" target="_blank">VPN build</a>) I finally gave up on my piece of sh_t <a href="http://homesupport.cisco.com/en-us/wireless/lbc/WRT310N" target="_blank">Linksys WRT310N</a> as a viable router… I can’t believe those guys can sell such crap… even on the latest firmware (09/09/2010 v1.0.10 build 2) it would crash and crash… I tried mixed mode, G only & N only and whenever it would have to do any significant WiFi traffic at all, it would fail… just absolute junk… amazing there’s even a market for those bricks… plus the HTTP menus were pathetically slow when you’d click around. To be fair, it is a “v1” hardware model and apparently there is a v2 out there going by the Linksys firmware downloads page. (My serial #: CSF01HB0919) Since my <a href="/2010/09/overclocking-skeletor-q9540-v10.html" target="_blank">mobo</a> has a built in WiFi NIC, I decided to see how hard it would be to just use what I already have rather than dinking around with finding another router that would actually work. As with anything, there are pros and cons… here’s a few off the top of my head:

  * PRO: you gain quite a bit of control leveraging less overall equipment (software firewalls are generally much more robust than a consumer router) 
  * CON: you have to have your central PC powered up for any household WiFi action… in our case that seems inherently ok… wifey can hop on the central PC if I’m not using it… and if I am, then WiFi is available. 

Bottom line, this works and covers all my bases so far:

<table style="border-collapse: collapse" border="1" cellspacing="0" cellpadding="4">
  <tr>
    <td valign="top" width="235">
      <a href="http://www.ishanarora.com/2009/07/29/windows-7-as-a-wireless-access-point/" target="_blank">Windows 7 as a Wireless Access Point</a>
    </td>
    
    <td valign="top" width="918">
      <ul>
        <li>
          one time: netsh wlan set hostednetwork mode=allow ssid=XYZ key=PDQ keyUsage=persistent
        </li>
        <li>
          after every reboot: netsh wlan start hostednetwork
        </li>
      </ul>
    </td>
  </tr>
  
  <tr>
    <td valign="top" width="235">
      ICS – Internet Connection Sharing
    </td>
    
    <td valign="top" width="918">
      <a href="http://lh5.ggpht.com/-hunf4y6MNfw/ThgzcI4gWAI/AAAAAAAAE9M/PBsWcBcMl7I/s1600-h/Snap7%25255B7%25255D.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="Snap7" border="0" alt="Snap7" src="http://lh6.ggpht.com/-YPLrkV-Jewc/ThgzcxQW6JI/AAAAAAAAE9Q/DMQ3G-CZCl4/Snap7_thumb%25255B4%25255D.png?imgmax=800" width="550" height="502" /></a>
    </td>
  </tr>
  
  <tr>
    <td valign="top" width="235">
      <a href="http://www.dyndns.com/support/clients/windows.html" target="_blank">DynDNS update client</a>
    </td>
    
    <td valign="top" width="918">
      The DynDNS update feature is common to all routers… it’s nice that such a simple app alternative plugs this hole so I can keep on rocking my personal domain (I host all our photos directly from my home PC via <a href="/2010/10/self-hosting-zenphoto-on-windows-7-iis7.html" target="_blank">zenPhoto</a>).
    </td>
  </tr>
  
  <tr>
    <td valign="top" width="235">
      Firewall settings
    </td>
    
    <td valign="top" width="918">
      Since I’m plugged into a cable modem now, my PC is basically swinging directly out on the net so a software firewall is much more important now than before when I’d be more safely behind the NAT barrier of the router.&#160; </p> 
      
      <p>
        I use the 100% free <a href="http://www.comodo.com/home/internet-security/free-internet-security.php" target="_blank">Comodo Internet Security</a>… the UI is clean, e.g. one can resize it’s data grid based screens to view full detail (yes I’m talking about you BitDefender 2010!), I’ve never seen it jack CPU, and it provides a good mix between wizard style prompting and completely granular manual editing of the low level firewall rules.
      </p>
      
      <p>
        Firewall configs are always “fun”… What worked for me just now was to select “Stealth Ports Wizard” and choose the “Alert me to incoming connections and make my ports stealth on a per-case basis” option.
      </p>
      
      <p>
        *PLUS* the following individual rules under Firewall > Network Security Policy > … <br />(don’t forget to move them to the top so that they override any other block rules in the same bundle)
      </p>
      
      <ul>
        <li>
          Application Rule on C:WindowsSystem32svchost.exe <ul>
            <li>
              For external HTTP/FTP hosting: <em>Allow TCP Or UDP In/Out From MAC Any To BeejQuad Where Source Port Is Any And Destination Port Is In [HTTP/FTP Ports (21,80,443)]</em>
            </li>
            <li>
              For ICS client DNS “passthrough”: <em>Allow And Log TCP Or UDP Out From In/Out [WiFi Home Access Point] To MAC Any Where Source Port Is Any And Destination Port Is In [DNS Ports (53)]</em> <ul>
                <li>
                  (interesting, normal pings would resolve fine with simple *in* enabled, but an SSL web site from the ICS client required *out* enabled as well, the firewall logs also showed a blocked packet coming from an external ip on port 53 to my central PC on a random port, but that didn’t seem to hurt… maybe my network buddy can explain this stuff)
                </li>
              </ul>
            </li>
          </ul>
        </li>
        
        <li>
          Global rule <ul>
            <li>
              For ICS client Ping/ICMP support: <em>Allow ICMP In/Out From In [WiFi Home Access Point] To MAC Any Where ICMP Message Is Any</em>
            </li>
          </ul>
        </li>
      </ul>
      
      <p>
        I use <a href="https://www.grc.com/x/ne.dll?bh0bkyd2" target="_blank">Gibson Research’s “Shields Up!”</a> (GRSU) online port scanner to check whether I’ve made any progress…
      </p>
      
      <p>
        Interestingly, Comodo immediately prompted me for port 80 when GRSU scanned, but I had to use the above Stealth Ports selection to allow my port 21 rule to take effect.
      </p>
      
      <ul>
      </ul>
    </td>
  </tr>
</table>