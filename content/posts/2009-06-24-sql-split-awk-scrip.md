---
title: SQL Split AWK Script
author: Beej
type: post
date: 2009-06-24T15:41:00+00:00
year: "2009"
month: "2009/06"
url: /2009/06/sql-split-awk-scrip.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 3681328765910879361
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2009/06/sql-split-awk-script.html
dsq_thread_id:
  - 5528972367
categories:
  - Uncategorized
tags:
  - CmdLine
  - Database

---
Split the output from SQL Server Management Studio (SSMS) > View > Object Explorer Details > “Script {function|view|procedure} as” into individual files
  
Note: The current RegEx’s are tailored around the following scripting options (see comments to change):

  * “Include descriptive headers” = true&nbsp; (this is the default after SSMS 2008 install) – located under:&nbsp; SSMS > Tools > Options > SQL Server Object Explorer > Scripting > General scripting options) 
  * “Schema qualify object names” =&nbsp; false (**NOT the default**) &#8211; under: … > Object scripting options 

Download GAWK.exe for Windows: <a href="https://sourceforge.net/project/showfiles.php?group_id=23617&package_id=16431" target="_blank">link1</a>, <a href="https://www.google.com/search?q=download+gawk+windows&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a" target="_blank">link2</a>

<pre class="prettyprint"># example: gawk -f sqlsplit.awk file-to-split.sql

BEGIN {
  outfile = "erase_me.sql" #start off with a dummy file to get the ball rolling
  IGNORECASE = 1
}

END {
  #close off last file
  print "grant "grant" on "arr[1]" to publicngon" >>outfile
  close(outfile)
}

//***** Object:/ {
  #upon matcing the "object" comment, close off the previous output file
  print "grant "grant" on "arr[1]" to publicngon" >>outfile
  close(outfile)

  #start up the new one
  match($0, /[(.*)]/, arr) #change to something like /[dbo].[(.*)]/ if you want “Schema qualify object names” enabled
  outfile = arr[1]".sql"
  print "--$Author:$n--$Date:$n--$Modtime:$n--$History:$n" > outfile
}

/^(create) +(proc|function|view)/ {

  grant = "execute"
  if ($2 == "view") grant = "select"

  printf "if not exists(select 1 from sysobjects where name = '"arr[1]"')ntexec('create "$2" "arr[1] >>outfile

  # function is a little trickier because it could be a table or scalar return type requiring slightly different create function signature
  if ($2 == "function") {
 
    lines = ""
    while((getline line) >0) {
      lines = lines line"n"
      match(line, /returns/, a)
      if (a[0] != "returns") { continue }

      #debug: printf "line = %s, a[0] = %s, a[1] = %s, a[2] = %s, a[3] = %sn", line, a[0], a[1], a[2], a[3]

      match(line, /table/, a)
      if (a[0] == "table") {
        grant = "select"
        print "() returns table as return select 1 as one')" >>outfile }
      else print "() returns int begin return 0 end')" >>outfile
      break

    }
  }

  #proc/view
  else {
    print " as select 1 as one')" >>outfile
  }

  print "GO" >>outfile

  sub(/create/, "alter") #change the create to alter
  sub(/$/, lines) #tack back on the lines "eaten" to figure out whether function was tabular or scalar
}


{ 
  print  >>outfile
}</pre>