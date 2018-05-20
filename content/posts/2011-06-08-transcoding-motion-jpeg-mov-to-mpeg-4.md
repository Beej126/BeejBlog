---
title: Transcoding Motion-JPEG (.MOV) to MPEG-4 (H264)
author: Beej
type: post
date: 2011-06-09T04:45:00+00:00
url: /2011/06/transcoding-motion-jpeg-mov-to-mpeg-4.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 505317466712261637
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2011/06/transcoding-motion-jpeg-mov-to-mpeg-4.html
dsq_thread_id:
  - 5516257693
categories:
  - Uncategorized
tags:
  - Video

---
&nbsp;

## please see => <a href="/2015/11/transcode-iphone-mov-to-mp4-handbrake.html" target="_blank">Newer Approach</a>

&nbsp;

I have a Panasonic DMC-ZS5 (<a href="http://www.dpreview.com/news/1001/10012604panazs5.asp" target="_blank">dpreview</a>, <a href="http://panasonic.net/avc/lumix/compact/zs5_tz8/" target="_blank">Panasonic</a>) which creates .MOV files that contain the <a href="http://en.wikipedia.org/wiki/Motion_Jpeg" target="_blank">Motion JPEG</a> (M-JPEG) “format” (for want of a more technical term).

In order to stream those videos from my IIS/PHP based <a href="http://virgulestar.com/Photos/" target="_blank">photo gallery</a> (<a href="http://www.zenphoto.org/" target="_blank">zenPhoto.org</a>), they must be converted to a more “web compatible” format like <a href="http://en.wikipedia.org/wiki/MPEG-4" target="_blank">MPEG-4</a>.&nbsp; I haven’t found a more straightforward approach than direct batch conversion to another format… you can readily automate the conversion of say all the videos in a folder so it’s pretty much turnkey and ignore.

Update 2015-01-05: This is my current go-to:

<pre class="prettyprint">for %v in (*.mov) do ffmpeg -i "%v" -vcodec h264 -acodec aac -strict -2 "%~nv.mp4"
</pre>

Notes:

  * make sure to double up all the %%v if you put in .cmd batch file
  * ffmpeg is a very popular 3rd party command line util. I get mine from [here][1].

Update 2015-07-18: cropping 3D movies down to single image

<pre class="prettyprint">ffmpeg -i "in_movie_file.ext" -vf "crop=960:800:0:0,setdar=4:2" -vcodec h264 -acodec aac -strict -2 "out_movie_file.mp4"</pre>

  * obviously check the real resolution before setting the crop&#8230; just divide it by 2
  * &#8220;setdar&#8221; is the aspect ratio&#8230; i found it was necessary&#8230; one way to find it is with VLC CTRL-J on the original video

VLC will do this via a command line like so:

<pre class="prettyprint">"c:Program Files (x86)VLCvlc.exe" -vvv %1 --sout=#transcode{acodec=mpga,vcodec=h264,venc=x264,deinterlace,vfilter="rotate{angle=270}"}:standard{mux=mp4,dst="%~n1.mp4"}, vlc://quit
</pre>

Notes:

  * I’ve had to remove the acodec=mpga for my iPhone MOV’s or else I get garbled audio.
  * I included the vfilter=”rotate…” for rotation syntax since it was so hard for me to find but only include if you want rotation.

However, I noticed that VLC chops off the last 2 seconds no matter what I do… it seemed a little better choosing a different vcodec but h264 is too rocking to use anything else.

So I wound up going with QuickTime as my go-to transcoder for now.&nbsp; It doesn’t truncate any video and creates a slightly smaller output file than VLC.&nbsp; The compression is dramatic and h264 does an awesome job with preserving quality… even while maintaining 1280 x 720 HD, a 100MB MJPG will go down to a 5MB h264/MPEG file.

Following <a href="http://www.skylark.ie/qt4.net/samplecode.asp" target="_blank">code stolen from here</a> and tweaked a little, automates the QuickTime COM API to convert a directory full of MJPG’s (see sample code for Chapter.8 > “BatchExport.js”).

There’s no reason why this shouldn’t be in PowerShell… it’d be interesting to see if it was any more readable.

<pre class="prettyprint">//----------------------------------------------------------------------------------
//
//    Written by    :    John Cromie
//    Copyright    :    ? 2006 Skylark Associates Ltd.
//                                                                               
//    Purchasers of the book "QuickTime for .NET and COM Developers" are entitled   
//    to use this source code for commercial and non-commercial purposes.                   
//    This file may not be redistributed without the written consent of the author.
//    This file is provided "as is" with no expressed or implied warranty.
//
//----------------------------------------------------------------------------------
 
 
function unquote(str) { return str.charAt(0) == '"' && str.charAt(str.length - 1) == '"' ? str.substring(1, str.length - 1) : str; }
 
 
// Run from command line as follows:
//
// cscript BatchExport.js , , , , , 
 
var sourcePath, destPath, configXMLFilePath, convertFileExtension, exporterType, exportFileExtension;
 
// Get script arguments
if (WScript.Arguments.Length >= 4)
{
    sourcePath = unquote(WScript.Arguments(0));
    destPath = unquote(WScript.Arguments(1));
    configXMLFilePath = unquote(WScript.Arguments(2));
    convertFileExtension = unquote(WScript.Arguments(3));
    exporterType = WScript.Arguments(4);
    exportFileExtension = WScript.Arguments(5);
}
 
//sourcePath = "D:QuickTimeMoviesBirdsKittiwake";
//destPath = "D:QuickTimeMoviesExportDest";
//exporterType = "BMP";
//exportFileExtension = "bmp";
 
// Sanity check arguments
var fso = WScript.CreateObject("Scripting.FileSystemObject");
 
var e = "";
 
if (!fso.FolderExists(sourcePath))
    e += "Source path does not exist : " + "[" + sourcePath + "]n";
    
if (!fso.FolderExists(destPath))
    e += "Destination path does not exist : " + "[" + destPath + "]n";
 
if (!fso.FolderExists(configXMLFilePath))
    e += "Config XML file path does not exist : " + "[" + configXMLFilePath + "]n";
 
if (convertFileExtension == undefined)
    e += "No convert file extension supplied!n";
 
if (exporterType == undefined)
    e += "No exporter type supplied!n";
    
if (exportFileExtension == undefined)
    e += "No exporter file extension supplied!n";
 
if (e != "")
{
    WScript.Echo(e);
    WScript.Echo("Usage:");
    WScript.Echo("cscript BatchExport.js , , , , , ");
    WScript.Quit();
}
 
// Launch QuickTime Player   
var qtPlayerApp = WScript.CreateObject("QuickTimePlayerLib.QuickTimePlayerApp");
 
if (qtPlayerApp == null)
{
    WScript.Echo("Unable to launch QuickTime Player!");
    WScript.Quit();
}
 
var qtPlayerSrc = qtPlayerApp.Players(1);
 
if (qtPlayerSrc == null)
{
    WScript.Echo("Unable to retrieve QuickTime Player instance!");
    WScript.Quit();
}
 
// Set up the exporter and have it configured
var qt = qtPlayerSrc.QTControl.QuickTime;
qt.Exporters.Add();
var exp = qt.Exporters(1);
exp.TypeName = exporterType;
 
// settings file...
var FileSystemObject =  WScript.CreateObject("Scripting.FileSystemObject");
var configXMLFileInfo;
 
if ( FileSystemObject.FileExists(configXMLFilePath) )
    configXMLFileInfo =  FileSystemObject.OpenTextFile( configXMLFilePath );
 
// if settings files exists, load it and assign it to the exporter
if ( configXMLFileInfo )    {
    var configXMLString = configXMLFileInfo.ReadAll();
    // cause the exporter to be reconfigured
    // http://developer.apple.com/technotes/tn2006/tn2120.html
    var tempSettings = exp.Settings;
    tempSettings.XML = configXMLString;
    exp.Settings = tempSettings;
} else  {
    //otherwise, get the settings from the user dialog and save them to xml file for subsequent runs
    exp.ShowSettingsDialog();
 
    var configXMLString = exp.Settings.XML;
    configXMLFileInfo = FileSystemObject.CreateTextFile( configXMLFilePath );
    if ( configXMLFileInfo )  {
        configXMLFileInfo.WriteLine(configXMLString);
        configXMLFileInfo.Close();
    } else {
        WScript.Echo("Unable to create config XML file : " + "[" + configXMLFilePath + "]");
        WScript.Quit();
    }
 
}
 
 
var fldr = fso.GetFolder(sourcePath);
 
// Regular expression to match file extension
var re = new RegExp("."+convertFileExtension+"$", "i");
 
// Iterate over the source files
var fc = new Enumerator(fldr.Files);
for (; !fc.atEnd(); fc.moveNext())
{
    var f = fc.item().Name;
    
    // Filter by file extension
    if (!re.test(f))
        continue;
    
    try
    {
        // Open the movie and export it
        qtPlayerSrc.OpenURL(fc.item());
        
        var mov = qtPlayerSrc.QTControl.Movie;
        if (mov)
        {
            exp.SetDataSource(mov);
            
            // Strip file extension and compose new file name
            f = f.replace(/.[^.]*$/, "");
            var fDest = destPath + "" + f + "." + exportFileExtension;
            
            exp.DestinationFileName = fDest;
            exp.BeginExport();
            
            WScript.Echo("Exported: " + fDest);
        }
    }
    catch (err)
    {
        WScript.Echo("Error Exporting: " + fc.item());    
    }
        
}
 
// Tidy up
qtPlayerSrc.Close();
</pre>

 [1]: http://ffmpeg.zeranoe.com/builds/