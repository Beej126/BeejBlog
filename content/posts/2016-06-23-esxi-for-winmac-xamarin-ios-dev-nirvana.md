---
title: Configuring VMware ESXi as a Workstation
author: Beej
type: post
date: 2016-06-23T23:14:27+00:00
url: /2016/06/esxi-for-winmac-xamarin-ios-dev-nirvana.html
dsq_thread_id:
  - 5512951017
snapEdIT:
  - 1
snapTW:
  - |
    s:244:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:19:"%TITLE% - %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
  - Uncategorized
tags:
  - Hardware
  - iOS
  - Mac
  - Xamarin

---
## <sup class="fa fa-quote-right fa-flip-horizontal"></sup>Only virtualizing RAM & Compute, not KVM & HDD<sup class="fa fa-quote-right"></sup>

### Overview:

  * i was looking for a single machine Mac + Win solution... working from one primary desktop and remoting to the other...
  * this is of course the general posture of all the popular VM "Workstation" products but they gave me heartburn for one reason or another (see Motivation)
  * ESXi &#8211;VMWare's FREE & very "light" HyperVisor server product&#8211; requires some mildly esoteric configurations of HDD, Video & USB to accomplish the desired **single machine** workstation footprint, hence these notes

### Motivation:

  * Hosting Mac VM side under Windows VMware Workstation i ran into very unreliable connection from Visual Studio 2015 to Xamarin's Mac Build Agent (believe me, tried all latest VS2015 update bits as well as Xamarin alpha channel)... only after MANY MANY frustrating retries would it eventually connect
  * as well as surprising Xamarin Studio NuGet package gallery connectivity roadblock with virtual Mac's network interface in NAT mode which seemed to be the only way Build Agent would ever connect... NuGet worked under Bridged but then Visual Studio couldn't connect... arrrrg
  * going the other way with Windows virtualized under Mac host via either Parallels or Fusion always took an unacceptable hit on Windows / Visual Studio performance... year after year both mainstream commercial Mac hosted virtualization products have been [riddled with issues][1] and [chronically dead ended support forum posts][2]... each new version as disappointing as the last... so I am ecstatic to finally leave all that noise behind, hopefully forever.

### Success !

  * should've tried this long ago, ESXi is a surprisingly quick and painless install
  * now Visual Studio **immediately** connects to Mac build agent and Mac NuGet is also happy
  * and both Mac and Windows VM's are nicely more snappy than what I'd get under the Workstation products... consistently low idle CPU% usage, definitely more like physical

### Specs:

  * [mobo: Gigabyte GA-X99-UD4 (BIOS F22)][3]
  * GPU: ATI 5450
  * ESXi 6.0.0U2 &#8211; [download][4], <span class="expander"><span class="hl">[Update: 2017-02-15] ESXi 6.5.0-4564106 was a no-go for me</span>...<br /> <span>Frozen Windows logo upon booting the Win10 RDM. Tried creating fresh VM definition and using the new SATA controller instead of SCSI with no luck... bummer because the new ESXi Host Web Client was notably better at saving the necessary settings; didn't have to resort to vSphere Client... fingers crossed future releases will resolve... for the record, the ESXi installer is thankfully smart enough to leave our datastore partition intact, conducive to quickly trying ESXi upgrades by simply REATTACHING the VM's after install<span></span></li> 
    
    <li>
      <a href="http://www.insanelymac.com/forum/topic/303311-workstation-1112-player-712-fusion-78-and-esxi-6-mac-os-x-unlocker-2/">unlocker 2.0.8</a> (there is now a <a href="https://github.com/DrDonk/unlocker">2.0.9 RC</a> targeting ESXi 6.5, the author does warn not quite ready, but there's <a href="https://ithinkvirtual.com/2017/02/12/create-macos-os-x-vm-on-vmware-esxi-6-5-vmware-workstation-12-x/">at least one successful report</a>)
    </li>
    <li>
      Windows 10 (v1607 build 14393.693)
    </li>
    <li>
      El Capitan OS X v10.11.5, now running fine on Sierra as well
    </li></ul> 
    
    <h3>
      Main Steps:
    </h3>
    
    <ol>
      <li>
        <a href="http://www.virten.net/2014/12/howto-create-a-bootable-esxi-installer-usb-flash-drive/">install ESXi</a>
      </li>
      <li>
        install <a href="http://www.insanelymac.com/forum/files/file/339-unlocker/">unlocker</a>
      </li>
      <li>
        boot up your ESXi host<br /> <em>yeah, it was just that easy : )</em>
      </li>
      <li>
        install <a href="https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2089791">vSphere Client</a> on a remote machine
      </li>
      <li>
        use client to remote into the host by ip and root/password
      </li>
      <li>
        create your VM's paying attention to the following screenshots & config notes
      </li>
    </ol>
    
    <h3>
      VM Creation Settings at a glance:
    </h3>
    
    <p>
      <em>i took these screenshots via ESXi host Web client but that actually runs into various validation errors upon save... the vSphere client is therefore the go to whenever creating/modifying settings (see <a href="#which_client">Which Client?</a> below)</em>
    </p>
    
    <p>
      <img class="hoverZoom" src="https://3.bp.blogspot.com/-qgcZ6beVm0k/V3C-LjucRtI/AAAAAAAAUj0/WLDupVxqgbMHoqxt4rI1xDzzBtoS-SLYQCLcB/s1600/Snap08.png" /><img class="hoverZoom" src="https://3.bp.blogspot.com/-FJILG9yrTJk/V3C-Kkp5b2I/AAAAAAAAUjY/AIN1DnACKJgv226XBHPdLQGD-VbaD0cZwCLcB/s1600/Snap03.png" /><img class="hoverZoom" src="https://3.bp.blogspot.com/-WjyVp-BrbMg/V3C-K77ketI/AAAAAAAAUjo/1KhEAzp92wIaSPQ3OXmHdW5Z3tCxCy9wQCLcB/s1600/Snap04.png" /><img class="hoverZoom" src="https://3.bp.blogspot.com/-RUbSa34aqD4/V3C-LFt1JXI/AAAAAAAAUjk/AgUa29yFcgsQGnlccBzKHCEUISWAh_MNgCLcB/s1600/Snap05.png" /><img class="hoverZoom" src="https://3.bp.blogspot.com/-whybJL6hWEE/V3C-KnoN70I/AAAAAAAAUjU/cawRI1gEXN8f1UlYGf7v7-ZTEAHZI5t3wCLcB/s1600/Snap02.png" /><img class="hoverZoom" src="https://4.bp.blogspot.com/-3vlrlWdjww0/V3C-L-tYqlI/AAAAAAAAUjw/8zEnYy-0WCgUjPWikE8ttxz2CmkrD-YcwCLcB/s1600/Snap09.png" /><img  class="hoverZoom" src="https://1.bp.blogspot.com/-XvXIHzhEKAQ/V3DNkJgoJ9I/AAAAAAAAUkU/nKIlzLE-dDUaL1Z0ZWbWa-tWhB_s_YMoQCLcB/s1600/Snap12.png" /><img  class="hoverZoom" src="https://4.bp.blogspot.com/-eNUYtP2vBCI/V3DavGp5sII/AAAAAAAAUlI/OjRYWBVB8OM50X211pvUIlgDc2XzAL_3gCLcB/s1600/Snap12.png" />
    </p>
    
    <h3>
      Video config:
    </h3>
    
    <ul>
      <li>
        Noteable: VT-d aka IOMMU aka DirectPath I/O aka passthrough provides direct physical connection from VM (i chose Windows) to PCIe devices for GPU and USB which allows for <span class="hl">running the Windows desktop directly on the ESXi box without typical need for a separate machine to remote in from</span>...
      </li>
      <li>
        this does mean once the VM starts up, it completely takes over the graphics card to where the ESXi host is truly "headless"... so i've actually got 2 GPUs running, an old ATI dedicated to the Windows VM and another just for getting into ESXi shell on physical host...
      </li>
      <li>
        <strong>NOTE: single GPU configuration is very viable</strong>... all settings (both host and VM) are done through remote clients (see <a href="#which_client">Which Client?</a> below)... if for some reason that wasn't an option, you could disable VM autostart via vSphere client and thereby leave a lone GPU for troubleshooting directly on the host console after boot up... i suppose if things were ever so horked up that disabling the GPU takeover autostart remotely wasn't an option, then finding another graphics card to throw in might be the only choice... but really any old card would do (i.e. temp borrow someone else's) since it's just a text based linux console.
      </li>
      <li>
        reportedly nVidia consumer grade cards like my nVidia GTX 750 Ti are specifically crippled against VT-d... nVidia reserves this for their high end $$ cards... <a href="http://www.eevblog.com/forum/chat/hacking-nvidia-cards-into-their-professional-counterparts/">clever folks are mod'ing low end cards to report VT-d compatible DeviceId's</a> but i haven't found anyone doing the 750 Ti yet... also wonder about DSDT override approaches... unfortunately Windows doesn't pay attention to bootloader magic ala Clover, otherwise <a href="https://1.bp.blogspot.com/-uWBiM74OoIA/V3CwNHbIq_I/AAAAAAAAUjA/mY_gGi9oGtQLAJxAOaRqbncIUGNr1QCSACLcB/s1600/SDdVvBO.png">FakeId</a> would be awesomely too easy... <a href="https://communities.vmware.com/thread/494835?start=0&tstart=0">ESXi does seem to support a custom DSDT</a> -or- it looks like there's a way to <a href="https://github.com/Microsoft/graphics-driver-samples/wiki/Install-Driver-in-a-Windows-VM">punch a DSDT into the registry</a> for development purposes
      </li>
      <li>
        fortunately ATI doesn't cripple their consumer GPUs... the <a href="/?p=47">5450 was a $30 card circa 2012</a> and supports 3 digital displays with completely passive cooling (i'm a sucker for fanless)
      </li>
      <li>
        more recently I'm liking the footprint of an HP 2GB ATI 7570 i picked up for $40 used on eBay also with all 3 digital port types, including the elusive DisplayPort... the HP ones with model#'s 672462, 695635, 695633 are nice small half length cards that i can report are an essentially silent fan... keep an eye on the RAM since there's a lot of 1GB ones out there but frankly 1GB probably runs everything fine anyway
      </li>
      <li>
        pretty sure could just as well run the Mac on the VT-d GPU and thereby gain full QE/CI accelerated graphics if needed (iMovie being a notable app)... VM'ing OSX with VT-d graphics providing full speed QE/CI is an interesting blend of virtual and physical versus more traditional full physical approach to the hackintosh game... i suppose it still comes down to fiddling with each of your specific I/O devices (Bluetooth, WiFi, Audio, etc)
      </li>
    </ul>
    
### HD config:
    
* [this post](http://www.vm-help.com/esx40i/SATA_RDMs.php) details how to create RDM (Raw Device Mapping) vmdk's to <span class="hl">mount our <u><strong>consumer sata drives</strong></u> containing existing physical Win and Mac boot installations directly as VMs</span>, nice! ... Nutshell steps:
  ```shell
  #one time only
  md /vmfs/volumes/datastore1/RDMs
  #list your disks
  ls -l /dev/disks | grep -i "vml.*[^:][^9] ->"
  #create virtual drive mapping referencing the corresponding disk "guid"
  #edit "Sam500" for your preferences
  vmkfstools -r /vmfs/devices/disks/vml.0100000000533231484e5341464335303333354c202020202053616d73756e /vmfs/volumesdatastore1/RDMs/Sam500_Win10_RDM.vmdk
  ```
    
###  Keyboard / Mouse (surprisingly hard):
    
  <ul>
    <li>
      basically there's no way to do trivial USB device assignment ala the Workstation products' toolbar buttons... i couldn't believe this initially and went looking for a long while... yet <a href="https://communities.vmware.com/thread/466416">apparently VMware has specifically prevented mapping USB keyboard/mouse ("HID")</a>... speculatively to prevent losing complete control of your only means of input on the bare host but i haven't run across an official "why" documented in black and white... for the record, <a href="https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1021345">certain enterprise oriented dongles are specifically supported for mapping at individual USB device granularity</a>
    </li>
    <li>
      so we must VT-d passthrough a PCIe device corresponding to an entire USB bus vs individual devices...
    </li>
    <li>
      modern mobos typically rock multiple USB buses so theoretically we can simply carve one off for VM and leave one for host keyboard... Helpful <a href="http://www.breekeenbeen.nl/2012/10/03/vmware-esxi-determine-which-usb-bus-to-pass-through/">Post1</a>, <a href="http://www.virten.net/2015/10/usb-3-0-devices-detected-as-usb-2-in-esxi-6-0-and-5-5/">Post2</a>
    </li></li> 
      
    <li>
      but my default mobo config somehow had all the real USB ports clustered on a single hub address even though there were other hubs listed... after some trial & error BIOS fiddling reboots i found that setting XHCI to disabled yielded two separate PCIe entries in the passthrough settings UI like the above posts... that does mean i have no USB 3.0 for high speed transfers, so if that matters to you, it's worth considering a <a href="https://www.amazon.com/s/ref=sr_st_relevanceblender?keywords=USB+3.0+pcie+card">$15 USB card</a>
    </li>
    <li>
      navigate to the passthrough settings UI via: your host > Configuration tab > Hardware section > Advanced Settings
    </li>
  </ul>
    
    <h3>
      Network:
    </h3>
    
    <ul>
      <li>
        <span class="hl">Make sure you use VMXNET3 virtual NIC</span>
      </li>
      <li>
        the Intel E1000 default definitely sucks! it was giving me only 20 mbit downloads on my 30 mbit line
      </li>
      <li>
        <a href="http://www.virtuallyghetto.com/2016/10/vmxnet3-driver-now-included-in-mac-os-x-10-11-el-capitan.html">special instructions for Mac</a> ... i edited my VMX file directly (see <a href="#vmx_edit">vmx edit</a> tip below)
      </li>
    </ul>
    
    <h3>
      Deploying to real iOS device via Mac USB:
    </h3>
    
    <ul>
      <li>
        this basically means we gotta dedicate another whole USB bus VT-d to the Mac VM... i can confirm this does indeed work... i'm leaving my Mac VM OUT of auto startup so that one USB bus stays with the host for local keyboard ESXI shell access if i ever need it
      </li>
    </ul>
    
    <p>
      <a name="which_client"><i class="fa fa-anchor"></i></a>
    </p>
    
    <h3>
      Which Client?
    </h3>
    
    <ul>
      <li>
        it's wild how many different clients VMware has cooking... and they all have annoyances... vSphere Client, vCenter Web Client, VMware Remote Console (VMRC), ESXi Embedded Host Client and i hadn't realized VMware Workstation's UI will readily console into remote VMs in addition to its main function
      </li>
      <li>
        FYI, if you get an "HCMON" conflict error with any of the installers &#8211; just run the installer exe as admin
      </li>
      <li>
        <strong>vCenter Web Client</strong> &#8211; oft touted as the leading functionality bits (other clients warn of decreased VMware v11 hardware capability) ... <span class="expander"><span class="hl">but it requires licensed vSphere Server... </span><span>...i.e. $$ and another Windows Server or Linux box... will NOT install on Windows DESKTOP skus... previous versions we could fairly easily mod the MSI to ignore Server check, but latest v6.5's MSIs are signed and won't run after modded... AppCompat HighVersionLie shim didn't work because it's stuck on NTProductType (1=Desktop, 3=Server) not version and i was too scared to try an old tool like <a href="http://archive.oreilly.com/pub/a/oreilly//news/differences_nt.html">NTSwitch</a> on my main rig... saving that for rainy day VM excercise</span></span>
      </li>
      <li>
        <strong>VMWare Remote Console</strong> &#8211; for quick remote desktop into the Mac i've settled on (rather undoc'd) parms for <a href="http://www.virtuallyghetto.com/2014/10/standalone-vmrc-vm-remote-console-re-introduced-in-vsphere-5-5-update-2b.html#comment-41274">VMRC</a> <code>"C:\Program Files (x86)\VMwareVMware Remote Console\vmrc.exe" -H esxi_ip -U userid -P password -M vmid</code> <ul>
          <li>
            locate vmid via ESXi Shell: <code>vim-cmd vmsvc/getallvms</code>
          </li>
          <li>
            these modern clients seamlessly auto resize the mac desktop resolution just by dragging the console windows handles, nice!... just make sure to bump the paltry default 4MB VRAM via your VM > Edit Settings > Hardware tab > Video card... 64MB seems plenty... this setting supersedes the oft mentioned sVGA.vramsize vmx setting
          </li>
        </ul>
      </li>
      
      <li>
        <strong>ESXI Embedded Host Web Client</strong> &#8211; for admin/settings the <a href="https://labs.vmware.com/flings/esxi-embedded-host-client">Host Client</a> is nicely capable w/o installing anything... access via: https://esxi_ip_addr/ui/
      </li>
      <li>
        <strong>vSphere Client</strong> &#8211; for creating and modifying the VM settings, i found the vSphere Client to be more forgiving than the Embedded Host Client which would reject the provisioning submission with an "Incompatible device backing specified for device '9'" error no matter what i tried <ul>
          <li>
            configure auto-login shortcut with command line params similar but SLIGHTLY DIFFERENT to VMRC: <code>"C:\Program Files (x86)\VMware\Infrastructure\Virtual Infrastructure Client\Launcher\VpxClient.exe -u user -p password -s ip_address</code>
          </li>
          <li>
            rats! as of v6.5 release wave, <a href="https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2147929">vSphere Client is officially dropped</a>... last v6.0 revision still forwards compatible with 6.5 servers
          </li>
        </ul>
      </li>
      
      <li>
        <strong>SSH</strong> &#8211; and then <a href="http://www.thomasmaurer.ch/2011/08/enable-ssh-on-esxi-5-via-vsphere-client/">SSH'ing into the ESXi Shell</a> for any low level commands like the RDM stuff... <ul>
          <li>
            on Windows, <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html">PuTTY</a> provides great shell experience (colors, cursor keys, delete, etc all just work, no fuss, no muss)
          </li>
          <li>
            if you've got the new Ubuntu Linux Subsystem for Windows 10 loaded, that BASH has SSH built in
          </li>
        </ul>
      </li>
    </ul>
    
    <h3>
      Skipping Clover:
    </h3>
    
    <div class="expander">
      TL;DR: Add a new entry to the ESXi EFI BIOS Boot Manager for OSX's /System/Library/CoreServices/boot.efi </p> 
      
      <p>
        Background: Sometimes it's handy to actually physically boot into the Mac... one reason is to get full CG/CI video on a real GPU for something like iMovie (although could actually probably pull this off via GPU passthrough)... anyway, for booting into physical Mac I like Clover so I have that installed in the EFI partition... by default, Clover is then in the loop when booting Mac as a VMware ESXi guest as well... problem is, for me, versions of Clover beyond r3265 crash upon selecting the Mac entry... one workaround I've wriggled out is to skip Clover by putting a "direct to Mac" entry in the VMware EFI BIOS boot selection screen (i.e. the "F2" menu)...
      </p>
      
      <p>
        <img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316765/a7349f34-2821-11e7-9c99-1350fafbdbd8.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316405/b70cd170-281b-11e7-80ea-b9887756a3fa.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316407/bef2b0da-281b-11e7-87b6-848424631812.png" />
      </p>
      
      <p>
        Loading the HFS driver so we can see the OSX System partition<br /> <img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316410/c3347d7c-281b-11e7-9efe-30dad8799715.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316411/c8a71dfa-281b-11e7-894f-74f35a0b4bda.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316414/ccd9ceae-281b-11e7-8f64-66286dcf7cdd.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316416/d00d1914-281b-11e7-9ea4-4fed9696f6f8.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316417/d3339c44-281b-11e7-8b33-d49e3d9e412a.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316421/d941b404-281b-11e7-8659-17df1fb4307a.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316422/dedc057c-281b-11e7-8a4c-5bc705888bf2.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316423/e38497c4-281b-11e7-8176-83ac3346ab77.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316589/ac9a93f0-281e-11e7-9b02-6d54e97c1a94.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316598/e2d11200-281e-11e7-8a0f-ce69d4e1d5a6.png" /><br /> now hit ESC back up to the top
      </p>
      
      <p>
        Adding the Mac's boot.efi entry<br /> <img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316425/e6f906ce-281b-11e7-8081-d08d5267f664.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316427/eb36147a-281b-11e7-81bd-1702dcbd9214.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316428/ef2352a0-281b-11e7-9981-7ec9ed530033.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316433/f3e7f1c4-281b-11e7-9d56-39f48580561c.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316435/f79d7ba4-281b-11e7-8c97-e92506c0d7f4.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316436/fb7e1c6a-281b-11e7-92c0-46d48d2ec162.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316438/fec17656-281b-11e7-9f32-3ece014d10bf.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316440/01a2faac-281c-11e7-8a79-a590488c92b0.png" />
      </p>
      
      <p>
        Change the Boot Order to put it at the top to be the default<br /> <img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316623/72b04666-281f-11e7-8d9e-87de18a0c23e.png" /><img class="hoverZoom" src="https://cloud.githubusercontent.com/assets/6301228/25316687/c47c65f0-2820-11e7-99fb-75f38a76f230.png" />
      </p>
      
      <p>
        Note: originally i worked this out through the EFI Shell prompt via BCFG commands... but upon returning to retrace my steps bcfg is not present in the shell!?... i must've accidentally enabled it during experimentation and have no recollection of how... i was doing things like loading \EFI\CLOVER\TOOLS\SHELL64.efi but that didn't seem to do it this time around... would love to hear what i'm missing?? here are those bcfg commands for the record
      </p>
      
      <p>
        * we need to load an HFS driver to get to it... on my system the EFI partition where Clover is installed is mapped to FS0:, main OSX partition is FS1:, so:<br /> * `load fs0:\EFI\CLOVER\drivers64UEFI\VBoxHfs-64.efi`<br /> * `reconnect -r`<br /> * ***BCFG*** &#8211; the pertinent command for manipulating EFI BIOS menu entries:<br /> * `help bcfg` is our friend<br /> * `bcfg boot dump` to list current choices<br /> * `fs1:`<br /> * `cd \System\Library\CoreServices`<br /> * `bcfg boot add 1 boot.efi "Direct to Mac"`<br /> * if you add this as entry #1 as shown, it'll be selected by default without intervention which is convenient<br /> * you may want to add in a `bios.bootDelay = "5000"` in your Mac.vmx to give a moment to hit F2 if you find yourself needing to return to this screen often<br /> * for the google record, the error i run into with Clover beyond r3265 under VMware was *"firmware encountered an unexpected exception"*<br /> * i've just tried Clover r4061 2017-04-19 and it's still busted => seems the bug is [already reported](https://sourceforge.net/p/cloverefiboot/tickets/354/)...<br /> * and i indeed have now come to require a more recent Clover release than r3265 under physical Mac ([due to this](https://nickwoodhams.com/x99-hackintosh-osxaptiofixdrv-allocaterelocblock-error-update/))
      </p>
    </div>
    
    <h3>
      Unfiltered Tips:
    </h3>
    
    <ul>
      <li>
        consider skimming my <a href="https://www.diigo.com/user/brentanderson/ESXi">Diigo ESXi tag</a> for more helpful posts
      </li>
      <li>
        <a name="vmx_edit" style="position: relative"><i class="fa fa-anchor" style="position: absolute; left: -2.5em;"></i></a>SOME VMX settings can be applied under {your VM} > Edit Settings > Options tab > Advanced > General > Configure Parameters button... but i've found not everything sticks here and i've had to vi the VMX file directly from SSH... <code>vi /vmfs/volumes/datastore1/{your vm name}/{vm name}.vmx</code>... then <code>vim-cmd vmsvc/getallvms</code> to find your VMID and lastly <code>vim-cmd vmsvc/reload {VMID}</code> to activate any changes
      </li>
      <li>
        disable "Your Mac OS guest might run unreliably with more than one virtual core" message upon startup... this is bogus advice at this point <ul>
          <li>
            VMX setting: isolation.tools.bug328986.disable = "TRUE"
          </li>
        </ul>
      </li>
      
      <li>
        make sure you apply the smc.version = "0" tip in the unlocker notes if creating ESXi 6.0 compatibility level VM's (i.e. "Hardware Version 11")
      </li>
      <li>
        Unfortunately after most guest reboots (not all), Win10 falls into an "automated repair" blue screen cycle of doom... i've come to realize that merely deleting and recreating RDM file from CLI is all that's needed... so i created a little script for that in the host's RDM folder and SSH in to execute it whenever things go south<br /> `resetSam500&#8243; toolbar=`
```<br /> rm Sam500_Win10_RDM*.vmdk<br /> vmkfstools -r /vmfs/devices/disks/vml.0100000000533231484e5341464335303333354c202020202053616d73756e Sam500_Win10_RDM.vmdk<br /> ```
      </li>
      <li>
        Virtual Machine Startup/Shutdown needs to be configured for convenient auto booting of VMs when host spins up... UI is unintuitive, make sure to bump VM up into the Automatic Startup section
      </li>
      <li>
        i started on GA-X99-UD4 BIOS rev.F12 ... at first everything was copacetic but wound up at pitch black UEFI BIOS screens after reboot (monitor lights on so live signal, but no UI)... i found that taking either GPU out before boot would actually work so it was a dual GPU issue... up'ing to BIOS rev.F22 permanently resolved that
      </li>
      <li>
        if you're looking to jump in with turnkey hardware: this <a href="https://tinkertry.com/superservers">TinkerTry</a> guy really looks to have done all the homework... 8 core XEON (D-1541 = 2.1GHz, BGA mounted = no upgrades possible), 64GB RAM in a cute little mini-tower case, 100% VMware official compatible components, all tested out and ready to rock as a local VT-d workstation just like what i've shown here
      </li>
      <li>
        <strong>Cross Platform Clipboard</strong> &#8211; tried several, <a href="https://github.com/coralw/share-clipboard">free Share Clipboard via node</a>, CopyCopy, CrossClip, Alt-C, etc... FINALLY! <a href="https://www.nomachine.com/">NoMachine</a> to the rescue = free modern cross platform remote desktop with <strong>working clipboard</strong>, yay!! bonus points: it also enables sound in the remote Mac window... VMware doesn't have any solution for that yet... the window drag looks a little pokey vs VMRC but definitely usable
      </li>
    </ul>

 [1]: https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=why%20is%20parallels%20so%20slow
 [2]: https://forum.parallels.com/threads/windows-10-vm-in-parallels-11-extremely-slow.330154/
 [3]: /?p=11
 [4]: https://my.vmware.com/en/web/vmware/evalcenter?p=free-esxi6