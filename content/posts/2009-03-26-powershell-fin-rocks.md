---
title: PowerShell f’in rocks!
author: Beej
type: post
date: 2009-03-26T23:43:00+00:00
url: /2009/03/powershell-fin-rocks.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 1701126082226539111
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2009/03/powershell-fin-rocks.html
blogger_thumbnail:
  - http://lh6.ggpht.com/_XlySlDLkdOc/ScvX--jTD_I/AAAAAAAACr0/qvC1p_EPgmw/image_thumb%5B8%5D.png?imgmax=800
dsq_thread_id:
  - 5531236622
snapEdIT:
  - 1
snapTW:
  - |
    s:199:"a:1:{i:0;a:7:{s:2:"do";s:1:"1";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";}}";
categories:
  - Uncategorized
tags:
  - PowerShell
  - SysAdmin

---
  * <a href="http://www.microsoft.com/windowsserver2003/technologies/management/powershell/default.mspx" target="_blank">Main Microsoft landing page for PowerShell</a>… download and install it!!&#160; (if you’re running Windows Server 2008, it’s already loaded) 
  * Out of the box executing PowerShell scripts is completely disabled for security… there’s a couple immediate tasks to enable… 
      * Go find the PowerShell icon and fire it up… Vista (booo hiss!) > Start > Programs > Windows PowerShell 1.0 … Win7 (yay!) > Start > Programs > Accessories > Windows PowerShell 
      * Turn on ability to run PowerShell script files via 
  
        “Set-ExecutionPolicy RemoteSigned” … you’ll need to do this right up front (only once) since this is locked down by default 
      * Download and install the <a href="http://www.codeplex.com/Pscx" target="_blank">PowerShell Community Extensions</a> (PSCX)… all kinds of baseline goodies 
      * The PSCX install will establish a default “profile.ps1” script that establishes a bunch of handy default shell and script functionality 
      * Profile.ps1 lives here: “%USERPROFILE%My DocumentsWindowsPowerShellProfile.ps1” (don’t worry, Vista maps “My Documents” to the appropriate new physical folder for backwards compatibility with XP) 
  * One of the main advantages that PowerShell provides beyond previously existing scripting technologies (Windows or otherwise) is this: they’ve taken the power of command line piping and implemented it at an object oriented level versus simple flat text… this alone makes PowerShell game changingly more powerful than what Unix/OS X/Linux could lay claim to fame. 
      * For an immeidate mental example to take in how profound this is… take a common task like piping _LS_ to _SORT_ so that you can sort by <u>file size</u> (ls does not support file size sorting via an argument)… eg: 
      * ls -al | sort +4nr 
      * the problem is (<a href="http://linux-journal.blogspot.com/2005/04/ls-sort-files.html" target="_blank">as this immediate Google hit proves</a>) that this depends on hard coding which column of the flat text output you want operate on 
      * PowerShell elegantly eliminates this issue by allowing us to pass true <u>data structures</u> along the pipeline such that we can cleanly sort on the “size” property!!&#160; not some random column of flat text… eg: 
      * PS C:> dir | sort-object Length –descending 
      * Is that not freaking beautiful or what!?!?&#160; They’ve really taken some effort to make the commands and syntax humanly readable… i think that is giving a big nod to the fact that the unfortunate evolution of Windows has created a class of so called Sys Admins that are dismally dependent on clicking pretty buttons rather than automating away their recurring issues 
  * We get full access to everything in the .Net Framework from a friendly script syntax… there’s already a gaggle of PowerShell wrappers (aka “_cmdlets_”) that hide the uglier details of accessing Windows Registry, Web Services, XML, WMI, Active Directory, Exchange Server, SQL Server Admin, SharePoint… on and on 
  * Cmdlets are just more PowerShell code bundled in a subroutine (plus .Net “snapin” DLLs where needed) so there has been tons of rapid adoption where folks are creating nice pretty PowerShell cmdlet wrappers around _everything_ with more and more publicly available cmdlet libraries all the time. 
  * Windows Forms via PowerShell is pretty cool… PowerShell’s script is a pretty easy flowing syntax that washes away the usual pain of stuff like declaring variables of the proper type and has loads of friendly libraries available to do all the heavy lifting… marry that with .Net Forms GUIs and you can get some nifty stuff rolling in a day… 
  * See my first script below… it does a nice batch of meat and potatoes ditch work in about 75 short lines of fairly readable code 
  * “<a href="http://www.leeholmes.com/blog/GetTheOwnerOfAProcessInPowerShellPInvokeAndRefOutParameters.aspx" target="_blank">Invoke-Win32</a>” &#8211; The code gods have already built us an awesome “_function which uses code generation to dynamically create a .Net P/Invoke definition_” so that we can fire Win32 API’s on a whim! Toss just the Invoke-Win32 function from that page into your Profile.ps1 right after everything else. 
  * <a href="http://www.vistax64.com/powershell/190763-possible-run-powershell-script-no-taskbar-window.html" target="_blank">Hide-PowerShell()</a> – (code posted below) very handy for hiding the PowerShell console when all you really want to see is the Window Forms stuff you threw together… just toss this short code into your Profile.ps1 as well 
  * <a href="http://www.idera.com/Products/PowerShell/" target="_blank">PowerShellPlus</a> – very nice IDE with gonzo Intellisense & context Help for E-VER-Y-THING in _da Shell_… love it… running 2.1.0.45 Beta, hasn’t crashed once. [Update: 21 Sep 2010] Looks like they’re already up to v3.5 
  * [Update: 21 Sep 2010] Windows 7 includes a very decent IDE for free: Start > Program > Accessories > Windows PowerShell > Windows PowerShell ISE 

My First PowerShell Script (awww aint she a cutie 😉

  1. Hits SQL Server to pull a list of data via the ol’ ADO.Net APIs 
  2. Pings all those machines to determine if they’re online (currently commented out but it runs quite fast), 
  3. Throws the list into a simple Windows Forms ListBox for user selection 
  4. and finally sets a registry entry (an ODBC System DSN Server entry) based on the chosen selection & launches a an app 

This little ditty is a great example for scripting… it wrappers another legacy app with a front end that compensates for something lacking.

<pre class="prettyprint lang-powershell">Hide-PowerShell 

$cn = new-object system.data.SqlClient.SqlConnection("Data Source=blah;User ID=blah;Password=blah"); 
$ds = new-object "System.Data.DataSet" "dsTaxOffices" 
$q = "SELECT Name + ' ('+Code+')' as Name, IPAddress FROM master.dbo.TaxOffices (nolock) where Active = 1" 
$da = new-object "System.Data.SqlClient.SqlDataAdapter" ($q, $cn) 
$da.Fill($ds) 

# ping each box to see who's online 
#foreach($row in $ds.Tables[0].Rows) { 
# $ipaddress = $row["IPAddress"] 
# $ping_result = Get-WmiObject -Class Win32_PingStatus -Filter "Address='$ipaddress'" 
# if ($ping_result.StatusCode -ne "0") { 
# $row["Name"] = $row["Name"] + "`t* offline *" 
# } 
#} 

# Load Windows Forms Library 
[System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null 

#pointer for easy debug message box popups 
$mb=[Windows.Forms.MessageBox] 
#$mb::Show("you clicked me! ", "Message") 

# Create Window 
$form = new-object "System.Windows.Forms.Form" 
$form.Size = new-object System.Drawing.Size @(300,377) 
$form.topmost = $true 
$form.text = "Choose Office" 
$form.FormBorderStyle = "FixedToolWindow" 
#$form.add_load({ 
    #$mb::Show("onload", "onload") 
# $form.WindowState = "Normal" 
#}) 

# Create Flow Panel 
#$panel = new-object "System.Windows.Forms.flowlayoutpanel" 
#$panel.Dock = [System.Windows.Forms.DockStyle]::Fill 
#$form.Controls.Add($panel) 

# Create Controls 
$lst = new-object System.Windows.Forms.ListBox 
#$lst.FormattingEnabled = true; 
#$lst.TabIndex = 0; 
$lst.Location = new System.Drawing.Point(3, 3); 
$lst.Name = "listBox1"; 
$lst.Size = New-Object System.Drawing.Size @(285, 320); 

# databind list of offices to listbox 
$lst.ValueMember = "IPAddress" 
$lst.DisplayMember = "Name" 
$lst.DataSource = $ds.Tables[0] 

$btnSelect = New-Object System.Windows.Forms.Button 
$btnSelect.Location = New-Object System.Drawing.Point @(65, 325) 
$btnSelect.Name = "button1"; 
$btnSelect.Size = New-Object System.Drawing.Size @(159, 23); 
#$btnSelect.TabIndex = 1; 
$btnSelect.Text = "Select"; 
#$btnSelect.UseVisualStyleBackColor = true; 
$form.AcceptButton = $btnSelect 

$btnSelect.add_click({ 
    Set-ItemProperty hklm:softwareodbcodbc.iniitraac Server $lst.SelectedItem.IPAddress 
    Get-Process | Where-Object {$_.Name -eq "itraacw32"} | kill 
    sleep 1 #wait a sec for the old process to really drop off, otherwise new one collides and stops itself 
    start "C:Program FilesiTRAAC ConsoleiTRAACw32.exe" 
    $form.Close() 
}) 

# Add controls to Panel 
$form.Controls.Add($lst) 
$form.Controls.Add($btnSelect) 

# Show window 
$form.showdialog()
</pre>

Everybody needs a picture right?

[<img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="http://lh6.ggpht.com/_XlySlDLkdOc/ScvX--jTD_I/AAAAAAAACr0/qvC1p_EPgmw/image_thumb%5B8%5D.png?imgmax=800" width="318" height="383" />][1]

#### Hide-PowerShell() script source

<pre class="prettyprint lang-powershell">function ShowWindowAsync([IntPtr] $hWnd, [Int32] $nCmdShow) 
{ 
  $parameterTypes = [IntPtr], [Int32]  
  $parameters = $hWnd, $nCmdShow 
  Invoke-Win32 "user32.dll" ([Boolean]) "ShowWindowAsync" $parameterTypes $parameters 

    # Values for $nCmdShow 
    # SW_HIDE = 0; 
    # SW_SHOWNORMAL = 1; 
    # SW_NORMAL = 1; 
    # SW_SHOWMINIMIZED = 2; 
    # SW_SHOWMAXIMIZED = 3; 
    # SW_MAXIMIZE = 3; 
    # SW_SHOWNOACTIVATE = 4; 
    # SW_SHOW = 5; 
    # SW_MINIMIZE = 6; 
    # SW_SHOWMINNOACTIVE = 7; 
    # SW_SHOWNA = 8; 
    # SW_RESTORE = 9; 
    # SW_SHOWDEFAULT = 10; 
    # SW_MAX = 10 
} 
function Show-PowerShell() { 
  $null = ShowWindowAsync (Get-Process -Id $pid).MainWindowHandle 1  
} 
function Hide-PowerShell() {  
    $null = ShowWindowAsync (Get-Process -Id $pid).MainWindowHandle 0  
} 
function Minimize-PowerShell() {  
    $null = ShowWindowAsync (Get-Process -Id $pid).MainWindowHandle 2  
}
</pre>

 [1]: http://lh4.ggpht.com/_XlySlDLkdOc/ScvX-TcD4LI/AAAAAAAACrw/QHM_xIprQaA/s1600-h/image%5B12%5D.png