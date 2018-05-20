---
title: ASP.Net Controller API nuggets
author: Beej
type: post
date: 2017-03-04T23:17:46+00:00
url: /2017/03/asp-net-controller-api-nuggets.html
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:397:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"timeToRun";s:0:"";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"838167311349493760";s:7:"postURL";s:53:"https://twitter.com/BeejSEA/status/838167311349493760";s:5:"pDate";s:19:"2017-03-04 23:20:35";}}";
dsq_thread_id:
  - 5608410622
categories:
  - Uncategorized
tags:
  - WebDev

---
### Write Directly to Response Stream

[Stack-o basically covers this already][1] but kinda danced around how minimal the code can really be for the basic scenario&#8230;

```csharp
//e.g. $.ajax(url, { procName: "", parms: {deliveryDate:"3/2/2016"}, returnParmName: "" }, ...)
public class GenericProcArgs
{
  public string procName { get; set; }
  //from: http://stackoverflow.com/questions/5022958/passing-dynamic-json-object-to-c-sharp-mvc-controller
  //super convenient way to receive JS object with arbitrary properties to be fed straight to proc parms
  public dynamic parms { get; set; }
  /// &lt;summary&gt;
  /// whether to titleCase the JSON property names (handy for feeding auto built datagrids)
  /// &lt;/summary&gt;
  public bool titleCase { get; set; } = false;
  public string returnParmName { get; set; }
}

//here's the beef...
public ActionResult GetProc(GenericProcArgs args)
{
  Response.ContentType = "application/json";

  using (var proc = new Proc(args.procName))
  {
    proc
      .AssignParms(args.parms as IDictionary&lt;string, object&gt;)
      .ExecuteJson(Response.OutputStream, args.titleCase);
  }
  return new EmptyResult();
}
```

  * in my experience, the ContentType wasn&#8217;t even necessary but it feels like good practice
  * here i&#8217;m using a database layer represented by my own [custom Proc class][2]&#8230; which is a bundle of convenient methods wrapped around SqlCommand &#8230; in this case, it&#8217;s firing SqlCommand.ExecuteReader() and writing the results directly to the response via Newtonsoft.Json StreamWriters&#8230; i honestly haven&#8217;t done a real profile on this call stack but it feels like a nice straight shot from sql streaming through web tier transform to client
  * another nifty nugget in play here is the usage of C# Dynamic to catch arbitrary JS objects posted from the ajax client, and that **Dynamic is then inherently castable to a Dictionary**

 [1]: http://stackoverflow.com/questions/943122/writing-to-output-stream-from-action
 [2]: https://github.com/Beej126/SqlClientHelpers