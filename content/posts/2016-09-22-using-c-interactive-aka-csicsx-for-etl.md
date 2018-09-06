---
title: 'Using “C# Interactive” aka CSI/CSX for ETL'
author: Beej
type: post
date: 2016-09-22T19:12:44+00:00
year: "2016"
month: "2016/09"
url: /2016/09/using-c-interactive-aka-csicsx-for-etl.html
dsq_thread_id:
  - 5517826054
categories:
  - Uncategorized
tags:
  - CmdLine
  - Database

---
# motivation

interactive C# offers typical [REPL][1] benefits ala powershell without the mental context switch required to leave our beloved C# syntax =)
  
&nbsp;

# notable

  * [great MSDN reference article][2]
  * CSX syntax can be executed from either Visual Studio 2015 (as of update 1) > View > Other Windows > C# Interactive
  * -or- `C:\Program Files (x86)\MSBuild\14.0\bin\csi.exe` 
      * then `#load file.csx`

## Extract

this example is based on a low fidelity web page as the raw data source
  
... it's really nice to have all the convenient one liner RESTy methods of System.Net.WebClient available now vs the lower level WebRequest/WebResponse pattern that came with .Net 1.0. E.g. client.DownloadString, DownloadFile, etc.

## Transform

trivially demonstrative in this case, simply a string.Split call 🙂

## Load

demonstrates leveraging [SQL Server's Table-Valued-Parameter][3] functionality to <u>bulk upload rows</u> which are then conveniently manifested inside the receiving stored procedure as a standard sql rowset, ready for tpyical DML like joining to other tables, etc.
  
&nbsp;

# SQL definition

    CREATE TYPE dbo.SpreaderData_UDT AS TABLE
    (
        [SpreaderDataID] [INT] PRIMARY KEY,
        [SpreaderID] [INT],
        [Speed] [INT],
        [Density] [INT],
        [SpreadQty] [INT],
        [Setting] [VARCHAR](100)
    )
    GO
    
    -- crucial - SQL Server yields a unintuitive error message when this has not been done
    GRANT EXECUTE ON TYPE::dbo.SpreaderData_UDT TO PUBLIC
    GO
    
    CREATE PROCEDURE [dbo].SpreaderData_Table_u
    @SpreaderData dbo.SpreaderData_UDT READONLY -- <= ***** crucial
    AS BEGIN
    
    UPDATE sd SET
      sd.Setting = sd2.Setting
    FROM dbo.SpreaderData sd
    JOIN @SpreaderData sd2 ON sd2.SpreaderDataID = sd.SpreaderDataID
    
    END
    GO
    

# scrape.csx

 [1]: //en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop
 [2]: https://msdn.microsoft.com/en-us/magazine/mt614271.aspx?f=255&MSPPError=-2147217396
 [3]: /2011/12/sql-server-table-valued-stored.html