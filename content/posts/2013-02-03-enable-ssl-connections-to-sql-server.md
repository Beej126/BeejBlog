---
title: Enable SSL Connections to SQL Server
author: Beej
type: post
date: 2013-02-04T04:01:00+00:00
year: "2013"
month: "2013/02"
url: /2013/02/enable-ssl-connections-to-sql-server.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 3078912508509117201
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2013/02/enable-ssl-connections-to-sql-server.html
blogger_thumbnail:
  - https://lh5.ggpht.com/-0168RnSFJP4/UQ7Bv-wD6WI/AAAAAAAAFJg/rJuw9Neyd74/Fig.0%25255B2%25255D.png?imgmax=800
snapEdIT:
  - 1
snapTW:
  - |
    s:174:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";
dsq_thread_id:
  - 5527718197
categories:
  - Uncategorized
tags:
  - Database
  - Security

---
<table border="1" cellpadding="2" cellspacing="0">
  <tr>
    <td valign="top">
      “SQL Server Transport Encryption” is a good Google phrase for this technology.<br /> Reference: <a href="https://msdn.microsoft.com/en-us/library/ms191192.aspx" title="https://msdn.microsoft.com/en-us/library/ms191192.aspx">https://msdn.microsoft.com/en-us/library/ms191192.aspx</a>
    </td>
    
    <td valign="top">
    </td>
  </tr>
  
  <tr>
    <td valign="top">
      <h4>
        Obtain an SSL Certificate
      </h4>
      
      <p>
        A self signed certificate is easy and works fine... here’s one way:
      </p>
      
      <ul>
        <li>
          Get the IIS 6.0 Resource Kit Tools: <a href="https://www.microsoft.com/download/en/confirmation.aspx?id=17275">https://www.microsoft.com/download/en/confirmation.aspx?id=17275</a>
        </li>
        <li>
          All you'll need is the "SelfSSL.exe" tool so the custom install is minimal.
        </li>
        <li>
          Find SelfSSL.exe in default install path: C:Program FilesIIS Resources
        </li>
        <li>
          Good reference for SelfSSL usage: <a href="https://www.sslshopper.com/article-how-to-create-a-self-signed-certificate-in-iis-7.html">https://www.sslshopper.com/article-how-to-create-a-self-signed-certificate-in-iis-7.html</a>, scroll down to "Generate a Self Signed Certificate with the Correct Common Name"
        </li>
        <li>
          Command line example: <div class="wlWriterEditableSmartContent" id="scid:9ce6104f-a9aa-4a17-a79f-3a39532ebf7c:7d965c1e-472b-4510-b2a8-534f6536b154" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
            <div class="le-pavsc-container">
              <div style="background: #fff; overflow: auto;">
                <ol style="background: #1e1e1e; margin: 0; padding: 0 0 0 5px; white-space: nowrap;">
                  <li>
                    SelfSSL /N:CN=MWR-TRO-V2 /V:1999999
                  </li>
                </ol>
              </div>
            </div>
          </div>
          
          <ul>
            <li>
              The /V: part is the validity duration of your cert, in days. I believe 1999999 is the max, which corresponds to around 5475 years in the future (that ought'a last ya ;)
            </li>
            <li>
              The /N:CN= part is the “Common Name” this cert will be tied to… in this case that needs to be the true machine name of your database server.
            </li>
          </ul>
        </li>
        
        <li>
          “Do you want to replace the SSL settings for site 1 (Y/N)?” => No
        </li>
        <li>
          Now you have a cert registered in your “personal certificate store” &#8211; next we’ll extract it for installation on db server.
        </li>
      </ul>
    </td>
    
    <td valign="top">
    </td>
  </tr>
  
  <tr>
    <td valign="top">
      Fire up the MMC “Certificates Console” to manage your new cert </p> 
      
      <ul>
        <li>
          Good reference: <a href="https://support.microsoft.com/kb/276553)">https://support.microsoft.com/kb/276553)</a>
        </li>
        <li>
          Open the MMC console: Start > Run > mmc [enter] (or Windows-R) (MMC Fig.1)
        </li>
        <li>
          Add the cert snapin: click File > Add/Remove Snap-in (MMC Fig.2)
        </li>
        <li>
          select Certificates under Available snap-ins… and hit Add button… (MMC Fig.3)
        </li>
        <li>
          select Computer Account… then Next… (MMC Fig.4)
        </li>
        <li>
          select Local computer, and then Finish… (MMC Fig.5)
        </li>
        <li>
          lastly, hit OK (MMC Fig.6)
        </li>
      </ul>
      
      <ul>
        <li>
          You may wish to save this MMC configuration for future convenience (MMC Fig.7)
        </li>
      </ul>
    </td>
    
    <td valign="top">
      Screenshots...</p> 
      
      <div class="expandee">
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:2b3a630b-f36d-466a-bbce-6343743eca79" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh4.ggpht.com/-rZC9Z8EUpUM/UQ7Bu00evzI/AAAAAAAAFJY/8om521xT8_0/Fig.0-8x6.png?imgmax=800" rel="thumbnail" title="MMC Fig.1"><img border="0" src="https://lh5.ggpht.com/-0168RnSFJP4/UQ7Bv-wD6WI/AAAAAAAAFJg/rJuw9Neyd74/Fig.0%25255B2%25255D.png?imgmax=800" height="364" width="294" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:18b2ff5f-6851-4175-8725-92e7640f4ef8" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh4.ggpht.com/-ltkJAvoZGzM/UQ7BwNB9wbI/AAAAAAAAFJo/eJkZ8_FnOUU/fig.1-8x6.png?imgmax=800" rel="thumbnail" title="MMC Fig.1"><img border="0" src="https://lh3.ggpht.com/-IONPjQdhsrU/UQ7BwvyC5XI/AAAAAAAAFJw/BK_zdgr6oZc/fig.1%25255B69%25255D.png?imgmax=800" height="255" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:dfb63c1b-7968-4f2d-8883-50cf032dd458" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh4.ggpht.com/-5oTN_Tdnj6w/UQ7BwxZKZ1I/AAAAAAAAFJ4/BihPDfbAIPs/Fig.2-8x6.png?imgmax=800" rel="thumbnail" title="MMC Fig.3"><img border="0" src="https://lh3.ggpht.com/-pCEi8yI54FU/UQ7BxhaqwhI/AAAAAAAAFKA/VC5G5VlSYro/Fig.2%25255B5%25255D.png?imgmax=800" height="282" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:9f3b02fd-f351-4fd3-8186-06ff3ced84e9" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh6.ggpht.com/-KDYH0W6GCTk/UQ7Bx0D0E3I/AAAAAAAAFKI/J92lL5qBCZE/Fig.3-8x6.png?imgmax=800" rel="thumbnail" title="MMC Fig.4"><img border="0" src="https://lh3.ggpht.com/-iiQtyN0uyTI/UQ7BytImi9I/AAAAAAAAFKQ/hvAMHUuvPos/Fig.3%25255B4%25255D.png?imgmax=800" height="292" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:668dc8d5-ca09-461f-a4ed-c6b8be286099" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh4.ggpht.com/-MYJ8Zj-4K9c/UQ7By7e-c3I/AAAAAAAAFKY/T-1ZwPrrxHE/Fig.4-8x6.png?imgmax=800" rel="thumbnail" title="MMC Fig.5"><img border="0" src="https://lh6.ggpht.com/-Pkd6zzjWmgs/UQ7BzuPt3vI/AAAAAAAAFKg/ekP-JaFZFO4/Fig.4%25255B5%25255D.png?imgmax=800" height="292" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:c540f85f-20d3-41ba-a8be-a46f0ce1d345" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh3.ggpht.com/-RuHRnNjvSFs/UQ7Bz8fdjYI/AAAAAAAAFKo/aPP-DBTPyEg/Fig.5-8x6.png?imgmax=800" rel="thumbnail" title="MMC Fig.6"><img border="0" src="https://lh3.ggpht.com/-9f9Bmc3bgoU/UQ7B0P0oA-I/AAAAAAAAFKw/UJ82zKUg2DM/Fig.5%25255B5%25255D.png?imgmax=800" height="282" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:c88d125f-445c-4f80-b60e-3ca0220926c4" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh6.ggpht.com/-VPTqmetxNFQ/UQ7B03KM0zI/AAAAAAAAFK4/q6ZBZ78UAyU/Export%252520Fig.8-8x6.png?imgmax=800" rel="thumbnail" title="MMC Fig.7"><img border="0" src="https://lh5.ggpht.com/-PMxKLAP8hxw/UQ7B1cZBpPI/AAAAAAAAFLA/U8lZ2sd2sY4/Export%252520Fig.8%25255B3%25255D.png?imgmax=800" height="249" width="335" /></a>
        </div>
      </div>
    </td>
  </tr>
  
  <tr>
    <td valign="top">
      <h4>
        Export the cert as a pfx file
      </h4>
      
      <p>
        …to be installed on your database server
      </p>
      
      <ul>
        <li>
          Certs installed via the above process will be your "Personal > Certificates" <em>folder</em> (Export Fig.1)
        </li>
        <li>
          Right mouse desired certifcate > All Tasks > Export > Next ... (Export Fig.2)
        </li>
        <li>
          “Export the private key?” => Yes … Next… (Export Fig.3)
        </li>
        <li>
          Select PFX format, "Include all certs...", "Export extended", NOT “Delete…”, Next … (Export Fig.4)
        </li>
        <li>
          Enter a password, hit Next… (Export Fig.5) – ** REMEMBER THAT PASSWORD **
        </li>
        <li>
          Save the pfx file (Export Fig.6)
        </li>
        <li>
          Finish… OK (Export Fig.7)
        </li>
      </ul>
    </td>
    
    <td valign="top">
      Screenshots...</p> 
      
      <div class="expandee">
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:dd057907-b970-479e-918f-590a65285323" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh4.ggpht.com/-87pf9as9nTM/UQ7B1o6_D3I/AAAAAAAAFLI/XuQeqF_0MOU/Fig.6-8x6.png?imgmax=800" rel="thumbnail" title="Export Fig.1"><img border="0" src="https://lh6.ggpht.com/-xQqL2GuvB4A/UQ7B2OHXzpI/AAAAAAAAFLQ/HVmdGtolT8s/Fig.6%25255B4%25255D.png?imgmax=800" height="262" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:fec4d645-e6c9-45e0-b780-431b7917cb97" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh6.ggpht.com/-CW5y0DM1WoY/UQ7B2auCI9I/AAAAAAAAFLY/Wkmboo8mpr4/Export%252520Fig.2-8x6.png?imgmax=800" rel="thumbnail" title="Export Fig.2"><img border="0" src="https://lh5.ggpht.com/-x1uAwRWbUiU/UQ7B253fUzI/AAAAAAAAFLg/h5ah_MrHaRQ/Export%252520Fig.2%25255B2%25255D.png?imgmax=800" height="256" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:c26a30e5-a3e5-4674-bfa8-ae27b9ff368f" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh3.ggpht.com/-0KpdxFo7qic/UQ7B3cW3z_I/AAAAAAAAFLo/dTx8ujRdWa0/Export%252520Fig.3-8x6.png?imgmax=800" rel="thumbnail" title="Export Fig.3"><img border="0" src="https://lh5.ggpht.com/-1i2DeVCOIk4/UQ7B3lywILI/AAAAAAAAFLw/mkOtLy0Vi_Q/Export%252520Fig.3%25255B2%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:7893e848-d68b-4d5f-8d3b-8e3137bf632b" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh6.ggpht.com/-yDLl-x7s-XU/UQ7B4BFfeFI/AAAAAAAAFL4/_jRRwciiv8A/Export%252520Fig.4-8x6.png?imgmax=800" rel="thumbnail" title="Export Fig.4"><img border="0" src="https://lh4.ggpht.com/-WHBnHH84598/UQ7B4XKI_OI/AAAAAAAAFMA/RPsYfVQckj0/Export%252520Fig.4%25255B2%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:6f7d6687-46f5-4a20-9269-a894b0c44bf7" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh5.ggpht.com/-GDwCrF_8zYs/UQ7B4veEBTI/AAAAAAAAFMI/eikuDWJj6YA/Export%252520Fig.5-8x6.png?imgmax=800" rel="thumbnail" title="Export Fig.5"><img border="0" src="https://lh3.ggpht.com/-yPwaHTQCOq4/UQ7B5DY8dtI/AAAAAAAAFMQ/1SDLV1UJevA/Export%252520Fig.5%25255B2%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:cc606be5-ca7b-499e-910c-5b13be68bed8" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh6.ggpht.com/-QCXJ9_PDDVg/UQ7B5mA5ViI/AAAAAAAAFMY/3-w8n_VYWx8/Export%252520Fig.6-8x6.png?imgmax=800" rel="thumbnail" title="Export Fig.6"><img border="0" src="https://lh6.ggpht.com/-H18orc9Cnng/UQ7B58L4q-I/AAAAAAAAFMg/cEVlxKrTp7A/Export%252520Fig.6%25255B2%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:5e195969-9281-4966-acac-77a4ba7bf448" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh4.ggpht.com/-1pr9Ft2JoJM/UQ7B6MOJKhI/AAAAAAAAFMo/rkyV1Ul1G9s/Export%252520Fig.7-8x6.png?imgmax=800" rel="thumbnail" title="Export Fig.7"><img border="0" src="https://lh5.ggpht.com/-EXIEChRZO7Q/UQ7B6t20X8I/AAAAAAAAFMw/I4pUORvh8E8/Export%252520Fig.7%25255B2%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
      </div>
    </td>
  </tr>
  
  <tr>
    <td valign="top">
      <h4>
        Import cert on database server
      </h4>
      
      <ul>
        <li>
          Login to your DB server desktop
        </li>
        <li>
          Launch MMC Cert Console same as above
        </li>
        <li>
          Go to Personal > Certs
        </li>
        <li>
          Right mouse All Tasks > "Import"… (Import Fig.1)
        </li>
        <li>
          Next… (Import Fig.2)
        </li>
        <li>
          Browse… (Import Fig.3)
        </li>
        <li>
          Next … (Import Fig.4)
        </li>
        <li>
          Enter Password, select “Mark this key as exportable”, Next… (Import Fig.5)
        </li>
        <li>
          “Place all certificates in the following store” => Personal… Next… (Import Fig.6)
        </li>
        <li>
          Finish (Import Fig.7)
        </li>
      </ul>
      
      <ul>
      </ul>
    </td>
    
    <td valign="top">
      Screenshots...</p> 
      
      <div class="expandee">
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:cf805770-e24d-49a0-a758-cef13c9a87b3" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh3.ggpht.com/-oKYX6CjjkLI/UQ7B6_SlVYI/AAAAAAAAFM4/l2pBs-KtV5k/Import%252520Fig.1-8x6.png?imgmax=800" rel="thumbnail" title="Import Fig.1"><img border="0" src="https://lh3.ggpht.com/-vqn5vp14d9k/UQ7B7Pa8S8I/AAAAAAAAFNA/MbucCXCxiuI/Import%252520Fig.1%25255B1%25255D.png?imgmax=800" height="262" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:77258f51-d169-4be5-9bef-6073b1be1614" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh5.ggpht.com/-ZdcJINdxfR0/UQ7B7qlw81I/AAAAAAAAFNI/DB_qoRfef8s/Import%252520Fig.2-8x6.png?imgmax=800" rel="thumbnail" title="Import Fig.2"><img border="0" src="https://lh3.ggpht.com/-RWCGsjzb0_0/UQ7B75_lErI/AAAAAAAAFNQ/iDX2R1TDhA4/Import%252520Fig.2%25255B1%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:5bfb8c17-0493-468d-b0d9-542aad18c36c" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh3.ggpht.com/-JJdLWCGhaXg/UQ7B8CEsmEI/AAAAAAAAFNY/9mjFu6pDReE/Import%252520Fig.3-8x6.png?imgmax=800" rel="thumbnail" title="Import Fig.3"><img border="0" src="https://lh5.ggpht.com/-PeHt2pnRCQQ/UQ7B85JXUrI/AAAAAAAAFNg/t__-1JeKGn8/Import%252520Fig.3%25255B1%25255D.png?imgmax=800" height="254" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:42e75b74-7310-40a8-a052-c72b7288aaf4" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh5.ggpht.com/-joOfhtQfc48/UQ7B9EWG8kI/AAAAAAAAFNo/cOxbj8JmhRo/Import%252520Fig.4-8x6.png?imgmax=800" rel="thumbnail" title="Import Fig.4"><img border="0" src="https://lh5.ggpht.com/-YCAl-VoJK4Y/UQ7B9WMNRhI/AAAAAAAAFNw/oZ6KTntb8Jc/Import%252520Fig.4%25255B1%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:87808f3b-93a3-4e37-9178-b1832550d854" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh6.ggpht.com/-U57jI_Yvr_c/UQ7B9zT4rlI/AAAAAAAAFN4/J75tnPVZs9k/Import%252520Fig.5-8x6.png?imgmax=800" rel="thumbnail" title="Import Fig.5"><img border="0" src="https://lh3.ggpht.com/-NbHD0SShZEM/UQ7B-eKTc2I/AAAAAAAAFOA/I1DNWcIfoMg/Import%252520Fig.5%25255B1%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:39ad9703-f588-4a11-ae04-c8faa4d2c66e" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh3.ggpht.com/-UdUU8HV9v3s/UQ7B-nxqrXI/AAAAAAAAFOI/zDctROCG8Mk/Import%252520Fig.6-8x6.png?imgmax=800" rel="thumbnail" title="Import Fig.6"><img border="0" src="https://lh6.ggpht.com/-8JjVMmIzvu4/UQ7B_BbP9rI/AAAAAAAAFOQ/tUKRbRbX7WQ/Import%252520Fig.6%25255B1%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
        
        <div class="wlWriterEditableSmartContent" id="scid:8747F07C-CDE8-481f-B0DF-C6CFD074BF67:8aedd55c-a98b-4eb6-a8d9-28d698f0af8c" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
          <a href="https://lh5.ggpht.com/-UizG2rpJEcY/UQ7B_RCpsMI/AAAAAAAAFOY/QGMtLIYSLQg/Import%252520Fig.7-8x6.png?imgmax=800" rel="thumbnail" title="Import Fig.7"><img border="0" src="https://lh4.ggpht.com/-SYFszFqjDf8/UQ7B_vXPGWI/AAAAAAAAFOg/RUc3V6Up8W0/Import%252520Fig.7%25255B1%25255D.png?imgmax=800" height="356" width="335" /></a>
        </div>
      </div>
    </td>
  </tr>
  
  <tr>
    <td valign="top">
      <h4>
        Activate SSL encryption on DB server
      </h4>
      
      <ul>
        <li>
          Fire up SQL Server’s Network Configuration Utility <ul>
            <li>
              Start&nbsp; > All Programs > Microsoft SQL Server {version} > Configuration Tools > SQL Server Configuration Manager"&nbsp;
            </li>
          </ul>
        </li>
        
        <li>
          then under "SQL Server Network Configuration"
        </li>
        <li>
          Right click "Protocols for MSSQLServer"
        </li>
        <li>
          select "Properties"
        </li>
        <li>
          set&nbsp; "Flags tab > Force Encryption" to Yes
        </li>
        <li>
          and select the installed cert on the "Certificates" tab
        </li>
        <li>
          voila!
        </li>
        <li>
          STOP AND RESTART THE SQL SERVER SERVICE
        </li>
        <li>
          login to the instance with an SSMS Query window
        </li>
        <li>
          fire this command to verify all connections are encrypted: <div class="wlWriterEditableSmartContent" id="scid:9ce6104f-a9aa-4a17-a79f-3a39532ebf7c:74bca4ba-60f3-46e4-8e19-543f09036fe4" style="display: inline; float: none; margin: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;">
            <div class="le-pavsc-container">
              <div style="background: #fff; overflow: auto;">
                <ol style="background: #ffffff; margin: 0; padding: 0 0 0 5px; white-space: nowrap;">
                  <li>
                    SELECT encrypt_option, * FROM sys.dm_exec_connections WHERE session_id = @@SPID
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </li>
        
        <li>
          Tip: SP_WHO2 is handy for obtaining spids
        </li>
      </ul>
    </td>
    
    <td valign="top">
    </td>
  </tr>
</table>