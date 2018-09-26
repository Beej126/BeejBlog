---
title: Handy ETL JScript
author: Beej
type: post
date: 2010-09-28T17:10:00+00:00
year: "2010"
month: "2010/09"
url: /2010/09/handy-etl-jscrip.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 1425768875678034955
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2010/09/handy-etl-jscript.html
dsq_thread_id:
  - 5995118531
categories:
tags:
  - Database

---
import.cmd: @cscript /b import.js %* 

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:9ce6104f-a9aa-4a17-a79f-3a39532ebf7c:2bdbedb7-116c-4285-831a-5c1a52bd3c25" class="wlWriterEditableSmartContent">
  <div class="le-pavsc-container">
    <div class="le-pavsc-titleblock">
      import.js
    </div>
    
    <div style="background: #ddd; max-height: 300px; overflow: auto">
      <ol style="background: #ffffff; margin: 0 0 0 2.5em; padding: 0 0 0 5px;">
        <li>
          //v1.0
        </li>
        <li class="even">
          &nbsp;
        </li>
        <li>
          function cleanarg(i)
        </li>
        <li class="even">
          {
        </li>
        <li>
          Â Â //WScript.stdout.WriteLine("i: " + i);
        </li>
        <li class="even">
          Â Â return(WScript.Arguments(i+1).replace("\"", ""));
        </li>
        <li>
          }
        </li>
        <li class="even">
          &nbsp;
        </li>
        <li>
          //WScript.stdout.WriteLine("arg count: "+WScript.Arguments.length);
        </li>
        <li class="even">
          &nbsp;
        </li>
        <li>
          if (WScript.Arguments.length == 0)
        </li>
        <li class="even">
          {
        </li>
        <li>
          Â Â WScript.stderr.WriteLine("Usage:");
        </li>
        <li class="even">
          Â Â WScript.stderr.WriteLine("Â Â -i \"input file\"");
        </li>
        <li>
          Â Â WScript.stderr.WriteLine("Â Â -o \"output file\" (blank = screen output)");
        </li>
        <li class="even">
          Â Â WScript.stderr.WriteLine("Â Â -r \"record separator\"");
        </li>
        <li>
          Â Â WScript.Quit();
        </li>
        <li class="even">
          }
        </li>
        <li>
          &nbsp;
        </li>
        <li class="even">
          var inputfile;
        </li>
        <li>
          var outputfile;
        </li>
        <li class="even">
          var record;
        </li>
        <li>
          &nbsp;
        </li>
        <li class="even">
          var localpath = WScript.ScriptFullName.replace(WScript.ScriptName, "");
        </li>
        <li>
          &nbsp;
        </li>
        <li class="even">
          for (var i = 0; i < WScript.Arguments.length; i++)
        </li>
        <li>
          {
        </li>
        <li class="even">
          Â Â //WScript.stdout.WriteLine("arg["+i+"]: "+WScript.Arguments(i));
        </li>
        <li>
          Â Â switch (WScript.Arguments(i))
        </li>
        <li class="even">
          Â Â {
        </li>
        <li>
          Â Â Â Â case "-i": inputfile = cleanarg(i); break;
        </li>
        <li class="even">
          Â Â Â Â case "-o": outputfile = cleanarg(i); break;
        </li>
        <li>
          Â Â Â Â case "-r": record = cleanarg(i); break;
        </li>
        <li class="even">
          Â Â }
        </li>
        <li>
          }
        </li>
        <li class="even">
          &nbsp;
        </li>
        <li>
          var fso = new ActiveXObject("Scripting.FileSystemObject");
        </li>
        <li class="even">
          &nbsp;
        </li>
        <li>
          //WScript.stderr.WriteLine("Â Â inputfile: " + inputfile + ", record: " + record + ", exension: " + fso.GetExtensionName(inputfile) + ", WScript.ScriptFullName: " + WScript.ScriptFullName.replace(WScript.ScriptName, ""));
        </li>
        <li class="even">
          //WScript.Quit();
        </li>
        <li>
          &nbsp;
        </li>
        <li class="even">
          var ForReading = 1, ForWriting = 2;
        </li>
        <li>
          &nbsp;
        </li>
        <li class="even">
          var f = fso.OpenTextFile(inputfile, ForReading);
        </li>
        <li>
          &nbsp;
        </li>
        <li class="even">
          var out = WScript.stdout;
        </li>
        <li>
          if (outputfile != undefined) out = fso.OpenTextFile(outputfile, ForWriting, true);
        </li>
        <li class="even">
          &nbsp;
        </li>
        <li>
          var line="";
        </li>
        <li class="even">
          while ( f.AtEndOfStream != true )
        </li>
        <li>
          {
        </li>
        <li class="even">
          Â Â var str = f.Readline();
        </li>
        <li>
          Â Â if (str == record)
        </li>
        <li class="even">
          Â Â {
        </li>
        <li>
          Â Â Â Â out.WriteLine(line.slice(1));
        </li>
        <li class="even">
          Â Â Â Â line = "";
        </li>
        <li>
          Â Â }
        </li>
        <li class="even">
          Â Â else line += "," + str;
        </li>
        <li>
          }
        </li>
        <li class="even">
          out.Close();
        </li>
        <li>
          &nbsp;
        </li>
        <li class="even">
          if (fso.GetExtensionName(outputfile) == "csv")
        </li>
        <li>
          {
        </li>
        <li class="even">
          Â Â var WshShell = WScript.CreateObject("WScript.Shell");
        </li>
        <li>
          Â Â //WScript.stderr.WriteLine(localpath + outputfile);
        </li>
        <li class="even">
          Â Â WshShell.Run(localpath + outputfile);
        </li>
        <li>
          Â Â WshShell.Run(localpath + outputfile);
        </li>
        <li class="even">
          Â Â WshShell.Run(localpath + outputfile);
        </li>
        <li>
          }
        </li>
      </ol>
    </div></p>
  </div></p>
</div>