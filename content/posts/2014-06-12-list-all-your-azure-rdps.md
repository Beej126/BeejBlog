---
title: List all your Azure RDP’s
author: Beej
type: post
date: 2014-06-12T02:04:00+00:00
year: "2014"
month: "2014/06"
url: /2014/06/list-all-your-azure-rdps.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 8078903857204771413
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2014/06/list-all-your-azure-rdps.html
tags:
  - Azure
  - PowerShell
  - SysAdmin

---
<pre class="prettyprint linenums lang-powershell">Get-AzureVM | #this first one gets the entire list of VMs in subscription
    Get-AzureVM | # this one gets the detailed object for each specific VM
    %{
        $port = ($_ | Get-AzureEndpoint | ? {$_.name -like "Remote*"})[0].Port;
        $null = $_.DNSName -match 'http://(.*?)/'
        write-host "$($_.Name) - $($matches[1]):$($port)"
    }
</pre>