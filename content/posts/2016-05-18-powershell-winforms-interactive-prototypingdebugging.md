---
title: PowerShell WinForms interactive Prototyping/Debugging
author: Beej
type: post
date: 2016-05-18T22:30:21+00:00
url: /2016/05/powershell-winforms-interactive-prototypingdebugging.html
dsq_thread_id:
  - 5515890377
categories:
  - Uncategorized
tags:
  - PowerShell

---
# Credits:

  * [this post is great][1]. i&#8217;m just adding a little packaging on top.

# Motivation

  * PowerShell&#8217;s interactive nature lends it to be a handy way to experiment with .Net objects&#8230; including UI elements like WinForms/WPF&#8230;
  * Yet firing up UI&#8217;s classically take over the active thread to service the user interaction (e.g. mouse events etc)&#8230;
  * Without the extra gravy below, our otherwise handy interactive powershell locks up tight until we close down the Windows Forms application thus releasing the main thread back to the command line
  * The following gravy throws a Windows Form onto a background thread such that we can continue to manipulate the UI objects WHILE THEY&#8217;RE RUNNING, yay!

# The Gravy

create RunSpaceWinForm.ps1 as such

    function RunSpaceWinForm {
        param($frm)
        if (!$frm) {return}
    
        #RunSpace is a PowerShell thread
        [System.Management.Automation.Runspaces.Runspace]$rs = [Management.Automation.Runspaces.RunspaceFactory]::CreateRunspace()
        $rs.ApartmentState = "STA"
        $rs.ThreadOptions = "ReuseThread"
        $rs.Open()
    
        # make the WinForm object instantiated in current scope also available inside the runspace
        $rs.SessionStateProxy.SetVariable("frm", $frm)
    
        $ps = [System.Management.Automation.PowerShell]::Create()
        $ps.Runspace = $rs
        $rs.SessionStateProxy.SetVariable("ps", $ps)
    
        [System.IAsyncResult]$invokeHandle = $null
        $rs.SessionStateProxy.SetVariable("invokeHandle", $invokeHandle)
    
        # nugget: here's basically where the magic sauce kicks in
        # create the script that will run on the background thread, this lets WinForm have it's WndProc message pump while freeing our current PowerShell thread to further manipulate WinForm objects
        $ps.AddScript({
          #this call will take over the thread until the application is shut down by closing the main form
          [System.Windows.Forms.Application]::Run($frm)
    
          # clean up the powershell thread objects
          $ps.Runspace.Close()
    
          #honestly not sure if these commands work and are beneficial
          $ps.EndInvoke($invokeHandle)
          $ps.Runspace.Dispose() #this will block the runspace state on "closing" until you close the interactive powershell window
          $ps.Dispose()
        }) | Out-Null
        $invokeHandle = $ps.BeginInvoke()
        return "Use Debug-Runspace -id $($rs.Id) to activate breakpoints"
    }
    

and here is simple usage&#8230; spin up a running WinForm and <span class="hl">give control back to the powershell prompt</span>

    Add-Type -AssemblyName System.Windows.Forms
    $frmMain = New-Object System.Windows.Forms.Form
    
    . "{put_your_path_here}\RunSpaceWinForm.ps1"
    RunSpaceWinForm $frmMain
    

# Breakpoints

  * by default, breakpoints will now message as: &#8220;WARNING: Breakpoint Line breakpoint on &#8216;xyz&#8217; will not be hit&#8221;
  * the above run will kick out something like the following&#8230; 

    Use "Debug-Runspace -id 4" to go into breakpoint mode
    

  * execute that debug-runspace command and your breakpoints will light up in the editor and break when the code fires
  * CTRL-BREAK your way out of that mode when you want to go back to the powershell command line and manipulate the UI objects some more

 [1]: http://poshcode.org/5520