---
title: Evolving a custom ADO.Net based repository
author: Beej
type: post
date: 2011-06-25T19:03:00+00:00
year: "2011"
month: "2011/06"
url: /2011/06/evolving-custom-sqlclientnet-datalayer.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4568359424671492527
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2011/06/evolving-custom-sqlclientnet-datalayer.html
blogger_thumbnail:
  - https://lh6.ggpht.com/-niqKmY68t9o/UhpHnXT6cgI/AAAAAAAAFVU/PgmIvRftPAE/image_thumb%25255B8%25255D.png?imgmax=800
dsq_thread_id:
  - 5603664508
categories:
  - Highlights
tags:
  - DotNetFramework
  - Database
  - Synthesis

---
## [Full GitHub Source][1]

[demo post][2]

### Concept

A framework for maintaining client side business object cache consistency with database update "side effects"ù.

### Prerequisites

  * **Stored procedures = business rules**
  
    yep, i said it... My data layer is basically a home grown spin on ADO.Net [Typed DataSets][3] i.e. "Business"ù Class wrappers around ADO.Net DataTables.&nbsp; I like to keep the majority of my business rules in stored procedures ("procs"ù).&nbsp; I've experienced sustained, maintainable code velocity on real world LOB projects by evolving a relational model and stored procedures.&nbsp; It's often beneficial to meet growing awareness of business entity relationship requirements entirely in the proc queries with no changes necessary in higher layers.&nbsp; Being able to refactor how a particular list is populated WITHOUT REQUIRING A BINARY RELEASE can be very powerful.&nbsp; I realize this may all seem controversial to an OO mindset but it's served me well over multiple _database_ oriented projects. If your project is not inherently table oriented, please stop right here. This is very much a relationally oriented design approach. If one is fortunate enough to have the freedom to design the database as part of the overall solution scope and therefore stored procedures are fair game, then to not take advantage of procs as "_business methods_"ù, is throwing away a huge asset. If one is not that lucky, and I realize big corporate projects tend not to be, then I completely understand taking great OO measures to insulate one's beautiful architecture away from the messy legacy database structure. EntityFramework welcomes you :)Ç&nbsp; Otherwise, I feel that remaining near and dear to ones mother database is a very fruitful relationship.&nbsp; Procs are easily maintainable and deployable &#8211; no binaries, very scriptable, very DevOps'y.
  * Naturally, accepting dependence on a database for business rules does imply that our application must be generally connected, to a database. One could argue this doesn't fly for disconnected client scenarios, i.e. mobile device. However, it's not far fetched to have a local database which provides this support which then updates to the big mother database (cloud, etc) when connectivity is restored. One could still leverage the readily deployable nature of stored procs to provide the right business smarts to the local DB. Indeed, a tiered relational centric model vs typical tiered OO centric architectures which relegate relational technology to the last tier only :)Ç
  * MS SQL Server 2005+ &#8211; This post includes the usage of the SS 2005+ "[OUTPUT][4]"ù syntax. I'd be interested to know whether other DB's support this but it's more of a convenience and possibly mild performance benefit vs critical requirement.

### Business Example

To frame a case which demonstrates the need for typical business requirements driven side effects, take a look at the adjacent screenshot.
  
[<img src="https://lh6.ggpht.com/-niqKmY68t9o/UhpHnXT6cgI/AAAAAAAAFVU/PgmIvRftPAE/image_thumb%25255B8%25255D.png?imgmax=800" height="400" style="float: right; margin: 0px 0px 0px 10px;" />][5]
  
In this scenario there is a _household_ with some people in it (aka _members_ or _clients_). In this business domain only one person can be the _sponsor_ of a household at any given time. Likewise there can be only one _spouse_ set, the spouse which is not the sponsor. These designations are maintained as flags on the Clients database table. In this example, we're exploring what needs to happen when the sponsor changes from one person to another. This can happen when the existing sponsor leaves the business system which grants this privilege, yet the spouse remains in the system and can therefore assume the sponsorship privilege and nothing else needs to change.

So, in the pictured UI, the current sponsor is Sgt. John Snuffy. To effect this desired change, the user would select the "Set Sponsor"ù button on the spouse entry (Mrs. Jane Snuffy). As is typical tiered design, this button fires a Business Object method &#8211; SetSponsor(&#8230;)

By design, my Business Class methods tend to be fairly light wrappers around proc calls. For example:

    public void SetSponsor(string NewSponsorClientGUID, bool FixExistingPackageLinks)
    {
      using (iTRAACProc Sponsor_SetSponsor = new iTRAACProc("Sponsor_SetSponsor"))
      {
        Sponsor_SetSponsor["@SponsorGUID"] = GUID;
        Sponsor_SetSponsor["@NewSponsorClientGUID"] = NewSponsorClientGUID;
        Sponsor_SetSponsor["@FixExistingPackageLinks"] = FixExistingPackageLinks;
        TableCache(Sponsor_SetSponsor);
        HouseMembers = HouseMembers; //for some reason OnPropertyChanged("HouseMembers") didn't refresh the Members Grid, i don't have a good guess but this little hack worked immediately so i'm moving on
      }
    }
    

[full source][6]

Line #8 above is the [huckleberry][7]. The TableCache method is implemented in the [BusinessBase][8] class&#8230; it fires the sproc and then goes into the DataSet.Merge() logic explained below...

> While we're looking at this code, let me quickly divert to explain the <a href="https://code.google.com/p/itraacv2-1/source/browse/trunk/App/Helpers/SqlClientHelpers.cs" target="_blank">"Proc"ù class</a> . Nutshell: Proc is a convenient wrapper around ADO.Net SqlCommand. Among other things it does the SqlCommandBuilder.DeriveParameters() + caching thing that you'll find in many similar wrappers like this (e.g. <a href="https://msdn.microsoft.com/en-us/library/ff664408%28v=PandP.50%29.aspx" target="_blank">Microsoft's Data Access Application Block</a> &#8211; I just didn't fall in love with their API and wanted my own spin). DeriveParameters() removes the dreary burden of all that boring proc parm definition boilerplate code prior to each proc call (add param by name, set the datatype, etc.) and just pulls all that out of the database metadata that already knows all that information anyway &#8211; brilliant. Therefore we get right to the point of assigning values to named proc parms and firing the query. <a href="https://code.google.com/p/itraacv2-1/source/browse/trunk/App/Helpers/SqlClientHelpers.cs" target="_blank">SqlClientHelpders.cs</a> contains the Proc class as well as all kinds of data helper methods that have evolved over several projects. I wouldn't want to start a database project without it at this point.

> iTRAAC is the name of the project I pulled this example from. <a href="https://code.google.com/p/itraacv2-1/source/browse/trunk/App/Helpers/iTRAACHelpers.cs" target="_blank">iTRAACProc</a> is a very light subclass that assigns a few common domain specific parms (e.g. UserID) before handing off to the base Proc class. Conveniently, the Proc class' parm["@name"ù] indexer ignores anything that's not declared on the specified proc, so only procs that actually require these parms will receive them.

Ok so back to our scenario&#8230; Besides setting the flag on Jane's record to indicate she is now the sponsor, we also need to remove the sponsorship flag from John as well as flip the spouse flag from Jane to John (other queries and reports depend on having those flags consistent)&#8230; and oh, by the way, we also want to log all of this to the audit table so there's a historical reference of what changes brought us to the current state of a household.&nbsp; We want to drive all of this from the database proc logic and once the database has changed we want the UI to magically update to reflect all these changes and additions (including the new audit record aka "Diary"ù in the UI). So this is where we've arrived at what I call side effects (maybe there's a better term?). That is &#8211; corresponding to a relatively innocent looking user action, our desired business rules will drive various values to be changed and entirely new rows to be added that are not directly maintained by the user. This is not simple CRUD table maintenance, this is real business rules with all the crazy interconnections that must be supported :)Ç

Update-proc example ([full source][9]):

    SET @TableNames = 'Client'
    UPDATE iTRAAC.dbo.tblClients
    SET StatusFlags = CASE WHEN RowGUID = @NewSponsorClientGUID THEN StatusFlags | POWER(2,0)
                      ELSE StatusFlags &amp; ~POWER(2,0) END
    OUTPUT INSERTED.RowGUID, CONVERT(BIT, INSERTED.StatusFlags &amp; POWER(2,0)) AS IsSponsor
    WHERE SponsorGUID = @SponsorGUID
    AND RowGUID IN (@OldSponsorClientGUID, @NewSponsorClientGUID)
    

Line #1 is pertinent. By convention, all procs which need to participate in the approach I'm proposing in this post, must have a @TableNames OUTPUT parameter.¬ This is a CSV list of table names corresponding to each resultset returned from the proc (in sequential order).¬ This way, the proc **generically** informs the datalayer what must be merged into the client data cache (i.e. repository).

Line #5 above is cool &#8211; rather than reSELECTing the modified data...OUTPUT lets us leverage that UPDATE already knows what rows it hit. I dig it. Back on the client side, the datalayer takes that PARTIAL (i.e. very column specific) result-set and Merges back it into the cache like so ([full source][8]):

    //nugget: DataSet.Merge(DataTable) has become a real linchpin in the whole data roundtrip approach
    //nugget: in a nutshell, update procs return a bare minimum of updated fields in a return resultset along with a corresponding CSV list of @TableNames
    DataTable cachedTable = dsCache.Tables[tableName];
    dsCache.Merge(incomingTable, false, (cachedTable == null) ? MissingSchemaAction.AddWithKey : MissingSchemaAction.Ignore); //PreserveChanges pretty much has to be false in order to count on what comes back getting slammed in
    

## The Big Picture

![image][10]

What this approach tees up is that your procs can drive an unlimited amount of side effects which can be granularly returned to the client side cache.

Since you can pick and choose exactly which columns are returned (via standard selects or OUTPUT clause) you can weave a fine tuned blend between exactly which fields are allowed to come back in the side effects and blast into the client cache vs what fields may have pending uncommitted user edits in the cache. That's pretty cool.

View->ViewModel (MVVM) environments with robust declarative databinding, like WPF, really shine when you see all of these side effects immediately manifest on the UI just by bringing the data back into the BusinessObject(DataSet) cache (that the UI is bound to).&nbsp; The procs are very much in control of the business logic and ultimately what's displayed, yet without being coupled to the UI. Great stuff.

### Additional perks in the code provided:

  * An interesting "union-like"ù benefit in the datalayer &#8211; I ran into requirements where the most appealing clean design was to modularize subroutine procs that would be called from other procs. Fair enough so far. On top of that I found need to return these field level data changes (aka side effects) for the <u>same entity table,</u> from multiple procs in the subroutine chain. e.g. Client -> Proc1 -> SubProc2 & SubProc3. The impact of burdening the T-SQL proc layer with capturing the multiple proc results and union'ing them together is ugly design. It wound up being very clean and convenient to defer the union of these multiple selects to the TableCache C# datalayer logic. The "union"ù effect is readily implemented by looping through the tables of the same name and using ADO.Net's "DataTable.merge()"ù to apply each incoming rowset to the existing entities in the repository cache. Including matching primary keys in the incoming rowsets facilitates updates to cached entities vs inserts.
  * Handy initial client side rows &#8211; I should say, this next bit is actually a technique that's struck me as convenient yet it's not specifically dependent on the TableCache approach &#8230; these building blocks do all however play into each other to nicely address what I'll call the "new row dilemma"ù &#8230; that is, one typically needs some blank rows to databind to when you're creating a new record in the UI&#8230; but it's often undesirable to physically manifest these rows in the database until you're sure they're really going to be committed&#8230; it really stinks to sacrifice data integrity constraints just to allow for initial empty rows&#8230; a typical solution is to DataTable.Rows.AddRow() on the client and leave the DB out of it until you commit fully validated rows&#8230; but now client code is responsible for initializing new rows. I hate that for a couple reasons. First, I want that logic in the procs, where I can evolve it at will at the database tier w/o needing to deploy a new client binary. Secondly, for client logic consistency, it's much cleaner for new row logic to work exactly the same way as existing row logic. So the execution goes something like this: 
      1. New row event on client generates a brand new GUID PK (Some form of very unique ID seem fairly necessary to allow the client to do this autonomously from the DB
      2. But otherwise the client logic just flows into the standard "GetEntityByID"ù proc call, passing the new GUID none the wiser whether it's new or existing&#8230; i.e. zero logic flow difference between new record and vs existing record, nirvana :).
      3. Of course this fresh GUID won't get a row hit which conditionally falls into the new row logic where I return a "fake"ù row populated with whatever defaults I desire&#8230; take note, I'm not actually inserting a row into the table and then selecting that back out, I'm doing a select with "hard coded"ù values and no "from table"ù clause&#8230; that way <u>I don't insert junk data nor forsake constraints, but the new row logic is kept in the proc layer </u>&#8211; beautiful.
      4. Lastly, when committing to the DB, you fire the typical upsert proc which checks if it's doing an insert or update by seeing if the PK exists and acting accordingly.

 [1]: https://github.com/Beej126/itraacv2-1
 [2]: /2010/10/wpf-net-40-application-framework.html
 [3]: https://www.google.com/search?q=+ADO.Net+Typed+DataSet
 [4]: https://msdn.microsoft.com/en-us/library/ms177564.aspx
 [5]: https://lh5.ggpht.com/-elkElflTyZI/UhpHmwpb8fI/AAAAAAAAFVM/OVJDzLoJjz4/s1600-h/image%25255B15%25255D.png
 [6]: https://github.com/Beej126/itraacv2-1/blob/master/App/Model/SponsorModel.cs
 [7]: https://www.worldwidewords.org/qa/qa-huc1.htm
 [8]: https://github.com/Beej126/itraacv2-1/blob/master/App/Model/ModelBase.cs
 [9]: https://github.com/Beej126/itraacv2-1/blob/master/DB/DBObj/v2/Sponsor_SetSponsor.sql
 [10]: https://cloud.githubusercontent.com/assets/6301228/20336248/90c7ca9e-ab7d-11e6-865c-a35cde5d44cf.png