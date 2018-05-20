---
title: 'SQL Server Table-Valued Stored Procedure Parameters <=> ADO.Net'
author: Beej
type: post
date: 2011-12-22T22:32:00+00:00
url: /2011/12/sql-server-table-valued-stored.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 1287557296909973670
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2011/12/sql-server-table-valued-stored.html
dsq_thread_id:
  - 5821406805
categories:
  - Uncategorized
tags:
  - .Net
  - Database

---
Nutshell: 

  1. Declare a User Defined Type (UDT) 
  2. Declare a stored proc parm of that UDT 
  3. Fill an ADO.Net DataTable with the same columns as the UDT 
  4. Assign the DataTable to a Parameter of an ADO.Net SqlCommand corresponding to the sproc 

Notes: 

  * The Table-Valued Stored Procedure Parameters feature was first included in SQL Server 2008 
  * <a href="http://code.google.com/p/yasbe/source/browse/trunk/#trunk" target="_blank">Full working project source available here</a> 

Code Examples:

  1. <a href="http://code.google.com/p/yasbe/source/browse/trunk/DB/DBobj/File_UDT.sql" target="_blank">File_UDT.sql</a> <pre class="prettyprint lang-sql">CREATE TYPE File_UDT AS TABLE
(
  FullPath varchar(900) PRIMARY KEY, 
  ModifiedDate datetime, 
  [Size] bigint
)
GO

GRANT EXECUTE ON TYPE::dbo.File_UDT TO PUBLIC
GO</pre>

  2. <a href="http://code.google.com/p/yasbe/source/browse/trunk/DB/DBobj/Files_UploadCompare.sql" target="_blank">Files_UploadCompare.sql</a> <pre class="prettyprint lang-sql">CREATE PROCEDURE [dbo].[Files_UploadCompare]
@BackupProfileID INT,
@NextDiscNumber INT = NULL OUT,
@AllFiles File_UDT READONLY -- <= *****
AS BEGIN
        
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- new approach, simply return all files which don't match something already in the database 
-- then we don't have to worry about partial results left in the tables ... 
-- we just upload the current batch of files when we're with each burn and then start fresh with the next batch selection from there
-- there will be no records in FileArchive unless they've been put there specifically as marking a "finalized" MediaSubset

SELECT *,
  CONVERT(BIT, 0) AS Selected,
  CONVERT(BIT, 0) AS SkipError
FROM @AllFiles a
WHERE NOT EXISTS(
  SELECT 1
  FROM FileArchive fa
  JOIN [File] f ON fa.FileID = f.FileID
  WHERE f.FullPath = a.FullPath AND fa.ModifiedDate = a.ModifiedDate AND fa.Size = a.Size
)

DECLARE @IncrementalID int
SELECT @IncrementalID = MAX(IncrementalID) FROM [Incremental] WHERE BackupProfileID = BackupProfileID

SELECT @NextDiscNumber = isnull(COUNT(1),0)+1 FROM MediaSubset WHERE IncrementalID = @IncrementalID

END
</pre>

  3. <a href="https://code.google.com/p/yasbe/source/browse/trunk/App/FileSystemNode.cs" target="_blank">FileSystemNode.cs</a> <pre class="prettyprint">static private void ScanFolder(FolderNode folder, DataTable IncludedFiles)
{
  DirectoryInfo dir = new DirectoryInfo(folder.FullPath);
  FileInfo[] files = dir.GetFiles("*.*", folder.IsSubSelected ? SearchOption.TopDirectoryOnly : SearchOption.AllDirectories);
  foreach (FileInfo file in files)
  {
    DataRow r = IncludedFiles.NewRow();
    r["FullPath"] = file.FullName;
    r["ModifiedDate"] = file.LastWriteTimeUtc;
    r["Size"] = file.Length; //megabytes
    IncludedFiles.Rows.Add(r);
  }
}  
</pre>

  4. <a href="http://code.google.com/p/yasbe/source/browse/trunk/App/MainWindow.xaml.cs" target="_blank">MainWindow.xaml.cs</a> <pre class="prettyprint">using (Proc Files_UploadCompare = new Proc("Files_UploadCompare"))
{
  Files_UploadCompare["@BackupProfileID"] = (int)cbxBackupProfiles.SelectedValue;
  Files_UploadCompare["@AllFiles"] = IncludedFilesTable; // <= ******
  WorkingFilesTable = Files_UploadCompare.ExecuteDataTable();
  lblCurrentDisc.Content = Files_UploadCompare["@NextDiscNumber"].ToString();
}</pre>

Tips: 

  * (<a href="http://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlcommandbuilder.deriveparameters.aspx#3" target="_blank">from here</a>): If the login that <a href="http://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlcommandbuilder.deriveparameters(v=vs.110).aspx" target="_blank">SqlCommandBuilder.DeriveParameters</a> is run under does not have permission to access the UDT, no error will be thrown &#8211; the method will return successfully, but the SqlCommand.Parameters collection will not contain the UDT parameter.!!! 
  * Granting permissions on a type (<a href="http://www.sqlteam.com/article/sql-server-2008-table-valued-parameters" target="_blank">from here</a>): GRANT EXECUTE ON TYPE::dbo.MyType TO public; 

Links: 

  * <a href="http://msdn.microsoft.com/en-us/library/bb510489.aspx" target="_blank">MSDN page on Table-Valued Parameters</a>