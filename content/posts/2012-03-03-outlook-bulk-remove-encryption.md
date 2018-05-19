---
title: Outlook Bulk Remove Encryption
author: Beej
type: post
date: 2012-03-04T05:06:00+00:00
url: /2012/03/outlook-bulk-remove-encryption.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 6570582896007839120
blogger_author:
  - g108669953529091704409
blogger_comments:
  - 2
blogger_permalink:
  - /2012/03/outlook-bulk-remove-encryption.html
dsq_thread_id:
  - 5508631620
categories:
  - Uncategorized
tags:
  - PowerShell
  - Security

---
PowerShell Script to scan through specified Outlook folder and remove the encryption flag on each email.

Background: We tend to cycle smart cards over the years in my environment. The old certs from those cards must be maintained in order to be able to pull up old emails sent to you which were encrypted with your old public key(s). This also makes it interesting to hand off a PST full of emails piled up as a simple knowledge base to someone else, since you really wouldn’t want to give them your certs of course.&#160; Removing the encryption flag via the Outlook COM API turns out to be pleasantly trivial… literally just one line of code and a resave. The rest of this script is a simple UI and the optional folder recursion logic. If you don’t have a particular cert loaded, the script will output the subject of the failed message and then it’s a matter of getting that missing cert loaded on your system and retrying.

<pre class="prettyprint">[System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null 
$notes = "Drill down into subfolders?`r`rThis works for Outlook 2010 at least.`rMake sure to have Outlook running.`rand manually open an encrypted email before running this script.`r(this will cache your pin# so it will apply to scripted access)" 
$recursive = [Windows.Forms.MessageBox]::Show($notes, "Process Subfolders?", "yesnocancel") 
if ($recursive -eq "Cancel") { exit } 

$outlook = new-object -com Outlook.Application 
$f = $outlook.Session.PickFolder() 
if ($f -eq $null) { exit } 

$PR_SECURITY_FLAGS = "http://schemas.microsoft.com/mapi/proptag/0x6E010003" 
$cr = [char]0x2028 
function RemoveCrypto($folder) 
{ 
  $txt.AppendText($folder.folderpath + $cr); 
  
  if ($recursive -eq "Yes") { $folder.folders | foreach-object { RemoveCrypto($_) } } 
  
  $folder.items | foreach-object { 
    $mailitem = $_ 
    try { 
      ############################################ 
      # here's the beef. too easy! 
      # thanks to this post: http://support.microsoft.com/kb/2636465 
      $mailitem.PropertyAccessor.SetProperty($PR_SECURITY_FLAGS, 0) 
      $mailitem.save() 
      ############################################ 
    } 
    catch { 
      $txt.AppendText($mailitem.subject + $cr); 
    } 
  } 
} 

# Create Window 
$form = new-object System.Windows.Forms.Form 
$form.Size = new-object System.Drawing.Size @(600,600) 
$form.topmost = $true 
$form.text = "Folder progress & messages that couldn't be decrypted" 

############################################################### 
# this is what kicks off the loop 
$form.add_shown({ RemoveCrypto($f) }) 
############################################################### 

$txt = new-object System.Windows.Forms.RichTextBox 
$txt.Dock = "Fill" 
$txt.AutoSize = "True" 
$txt.Font = new-object System.Drawing.Font("cambria", 13) 
$form.Controls.Add($txt) 

$close = New-Object System.Windows.Forms.Button 
$close.Dock = "Bottom" 
$close.AutoSize = "True" 
$close.Text = "Close" 
$close.add_click({ 
$form.Close() 
}) 
$form.Controls.Add($close) 

# Show window 
$form.showdialog() 
$form.dispose()
</pre>