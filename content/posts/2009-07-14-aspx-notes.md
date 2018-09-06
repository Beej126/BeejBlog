---
title: 'ASP.Net (& Ajax) Notes'
author: Beej
type: post
date: 2009-07-14T20:58:00+00:00
year: "2009"
month: "2009/07"
url: /2009/07/aspx-notes.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 8891352713364899660
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2009/07/aspx-notes.html
dsq_thread_id:
  - 5528192468
categories:
  - Uncategorized
tags:
  - DotNetFramework

---
It’s been long enough that the little things tripped me when I fired up a new project… so here they are for “next time”: 

  * new Guid() – this probably isn’t the one you want… it initializes to all zeros (i.e. {00000000-0000-0000-0000-000000000000}) 
      * System.Guid.NewGuid() is the one that generates a fresh unique value 
  * Getting “Automatic Compilation” to work (i.e. just uploading your source files to the web server and not your bin folder) 
      * Check the <%@ Page > directive & make sure it says CodeFile=”” not CodeBehind=”” 
      * If not then you’ll be getting errors like “Could not load type …” 
      * CodeFile came along with ASP.Net 2.0 and corresponds to a “Web Project” (aka “Web Site”) vs. a “Web Application” which was the only option in ASP.Net 1.x 
      * <a href="http://msdn.microsoft.com/en-us/library/ydy4x04a.aspx" target="_blank">MSDN @ Page Reference</a>&#160; 
      * Would love to know what bits need to be twiddled to make CodeFile the default rather than creating a new Web Site project and copying everything over??? 
      * <a href="http://derek-morrison.com/post/ASPNET-Web-ldquo%3BSitesrdquo%3B-Versus-Web-ldquo%3BApplicationsrdquo%3B.aspx" target="_blank">This guy really goes deep</a> into the differences between Web Sites and Apps <geez, who knew?!?> 
  * “Invalid FORMATETC structure”… just reload all the controls in the Ajax toolbox… how annoying 
  * “Ajax client-side framework failed to load” error … this is when the shine on all that spiffy new Ajax stuff gets dull in a hurry 
      * Absolutely TUUUUNS!! of reasons out there for this… for me it wound up working when I disabled debugging in the web.config on the production server: <compilation debug="False" strict="false"> … ok, yeah, i know that’s not really an answer but i don’t debug on that server anyway so for me it’s a <a href="http://en.wikipedia.org/wiki/IBM_Program_temporary_fix" target="_blank"><em>permanent temporary fix</em></a>_&#160;_;) 
      * Other folks said fire the Add/Remove Programs >&#160; Repair option on .Net Framework 3.5 SP1 (didn’t help for me) 
      * or make sure .AXD Extension is setup (was already) 
          * IIS6 > {application folder} > (right mouse) Properties > Configuration button > Application extensions 
          * IIS7 > Handler Mappings 
          * Make sure to uncheck “Verify that file exists” 
  * Login / Authentication 
      * Great Login control FAQ: [http://forums.asp.net/t/1403132.aspx][1] 
          * Notably, it shows the necessary “FormsAuthentication.Authenticate(username, password)” bits that’ll let you skip the built in SqlServer Membership support that would otherwise fire by default… handy if you’re going for a quick n’ dirty. 
      * Another Q n’ D: throw some hard coded user/passwords under the web.config Forms Authentication tags: &#160;&#160;&#160; <system.web>   
        &#160;&#160;&#160;&#160;&#160; <authentication mode="Forms">   
        &#160;&#160;&#160;&#160;&#160;&#160;&#160; <forms>   
        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <credentials passwordFormat="Clear">   
        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <user name="admin" password="" />   
        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <user name="user" password="" />   
        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; </credentials>   
        &#160;&#160;&#160;&#160;&#160;&#160;&#160; </forms>   
        &#160;&#160;&#160;&#160;&#160; </authentication> 
      * And on an intranet where everybody is signed into Windows already, just use Windows authentication for a drop dead easy single-sign-on implementation: 
          * <authentication mode="Windows"> 
          * then Page.User.Identity.Name is their Windows login name… just take that and run with it for your own data based role security, etc. 
  * Hierarchical Grid aka Nested Collapsable GridViews via Free/Stock ASP.Net AJAX controls 
      * Here’s the baseline example that looks really good: [http://mosesofegypt.net/post/Master5cDetail-with-CollapsiblePanelExtender-and-edit-detail-with-HoverMenuExtender-using-GridView.aspx][2] 
      * My beef was with the HoverMenu… i think it looks cheesy ([screenshot][3], [live demo][4])… i just wanted to use normal <asp:CommandField>’s to edit GridView rows. 
      * Problem was, whenever you would click any of the CommandFields links, the corresponding nested GridView and Panel would just “go away” once the Async Postback’s refresh completed… the Panel appeared to be collapsed but even if you tried to expand it the GridView content was totally gone. 
      * Banged all around trying to figure out why by debugging through the events that fired… was about to give up and then finally read [something][5] that mentioned Submit buttons behave differently than LinkButtons… 
      * So I ditched the CommandField and just tossed in my own LinkButtons to do the same thing and voila, the Grid maintains its state… again, who knew!? 
  * DataBinding nested controls declaratively – <a href="http://www.devx.com/dotnet/Article/31405/1954" target="_blank">this was a good tip</a>… but only for READ ONLY stuff 
      * rather than messing with code behind, just declare your nested List control’s DataSource like this: 
      * DataSource='<%#((DataRowView)Container.DataItem).CreateChildView("ProviderOfficeContact")%>' 
      * unfortunately the limited way that _RowEditing just tosses all existing data contexts conflicts with this elegant approach, so you can’t go into edit mode with this kind of approach and have to stick with doing the nested DataSource assignment in the parent’s RowDataBound handler. 
  * GridView.RowEditing event – you must set a DataSource and re-GridView.DataBind() in order for the the state of the controls to change to edit mode… what an amazingly inefficient architecture they’ve provided with this databinding stuff… you have to keep running back to the database to get data that hasn’t necessarily changed at all 
    {   
    &#160; gvOffices.EditIndex = e.NewEditIndex;   
    &#160; gvOffices.DataSource = dataset; //DataMember was set initially and thankfully it persists <unlike anything else in this architecture>   
    &#160; gvOffices.DataBind();   
    } 
  * GridView.RowUpdating event 
      * if we’re manually databinding (vs a DataSource control) we have to to extract values ourselves (i.e. GridViewUpdateEventArgs.NewValues wil be empty) 
      * <a href="http://weblogs.asp.net/davidfowler/archive/2008/12/12/getting-your-data-out-of-the-data-controls.aspx?CommentPosted=true" target="_blank">here’s a good reference</a> to get the values out with the minimum of fuss 
      * that page also gives a quick blurb on how to access the “DataKeys”: (sender as GridView).DataKeys[e.RowIndex].Values[fieldName] 
  * jQuery: 
      * don’t forget to set the DOCTYPE!!! I know this is posted all over the jQuery tutorials, but it’s so subtle i keep forgetting and bang my head for a good hour before i remember: 
          * <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "<http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">> 
      * <a href="http://docs.jquery.com/Events/live#typefn" target="_blank">live()</a> vs bind() – live() makes sure you bind to elements that might not be currently available… exactly what you need when you’re doing some Ajax that creates elements dynamically (<a href="http://blog.dreamlabsolutions.com/post/2009/03/25/jQuery-live-and-ASPNET-Ajax-asynchronous-postback.aspx" target="_blank">stumbled on this here</a>, thanks Arnold!!)

 [1]: http://forums.asp.net/t/1403132.aspx "http://forums.asp.net/t/1403132.aspx"
 [2]: http://mosesofegypt.net/post/Master5cDetail-with-CollapsiblePanelExtender-and-edit-detail-with-HoverMenuExtender-using-GridView.aspx "http://mosesofegypt.net/post/Master5cDetail-with-CollapsiblePanelExtender-and-edit-detail-with-HoverMenuExtender-using-GridView.aspx"
 [3]: http://mosesofegypt.net/image.axd?picture=WindowsLiveWriter/MasterDetailwithCollapsiblePanelExtender_D253/screen02_2.jpg
 [4]: http://mosesofegypt.net/samples00/GroupingGridViewWtihCollapsiblePanelAndHoverMenu/
 [5]: http://gisresearch.blogspot.com/2007/11/ajax-updatepanel-gridview-commandfield.html