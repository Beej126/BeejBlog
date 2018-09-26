---
title: Shred GPX WPT XML with SQL Server
author: Beej
type: post
date: 2016-03-16T23:32:21+00:00
year: "2016"
month: "2016/03"
url: /2016/03/shred-gpx-wpt-xml-with-sql-server.html
dsq_thread_id:
  - 5572386628
categories:
tags:
  - Database

---
    declare @xml xml = '<gpx>
    <wpt lat="35.0977419" lon="-80.89258">
      <name>10112 Industrial Dr. Pineville, NC 28134, Pineville, NC, 28134</name>
      <desc>10112 Industrial Dr, Pineville, NC 28134, USA</desc>
    </wpt>
    <wpt lat="30.8276466" lon="-83.9967315">
      <name>323 Industrial Blvd Thomasville, GA 31792, Thomasville, GA, 31792</name>
      <desc>323 Industrial Blvd, Thomasville, GA 31792, USA</desc>
    </wpt>
    <wpt lat="26.4237949" lon="-81.415628">
      <name>283 E Jefferson St Immokalee, FL 34142, Immokalee, FL, 34142</name>
      <desc>283 Jefferson Ave E, Immokalee, FL 34142, USA</desc>
    </wpt>
    </gpx>'
    
    SELECT 
      n.value('@lat', 'varchar(100)'),
      n.value('@lon', 'varchar(100)'),
      n.value('desc[1]', 'varchar(100)')
    FROM @xml.nodes('/gpx/wpt') Rows(n)
    

# namespace example

    declare @xml xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <worksheet xmlns="https://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="https://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="https://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:x14ac="https://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" mc:Ignorable="x14ac">
    <dimension ref="A1:H700"/>
    <sheetViews>...</sheetViews>
    <sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25"/>
    <cols>...</cols>
    <sheetData>
    <row r="1" spans="1:8" x14ac:dyDescent="0.25">
    <c r="A1">
    <v>5637163536</v>
    </c>
    <c r="B1" t="s">
    <v>1014</v>
    </c>
    </row>
    <row r="2" spans="1:8" x14ac:dyDescent="0.25">
    <c r="A2">
    <v>5637163580</v>
    </c>
    <c r="B2" t="s">
    <v>1288</v>
    </c>
    </row>
    </sheetData>
    
    ;WITH XMLNAMESPACES('https://schemas.openxmlformats.org/spreadsheetml/2006/main' AS x)
    SELECT 
      n.value('x:c[1]/x:v[1]', 'varchar(100)') as Id,
      n.value('x:c[2]/x:v[1]', 'varchar(100)') as Value
    FROM @xml.nodes('x:worksheet/x:sheetData/x:row') Rows(n)
    

## output

| Id         | Value |
| ---------- | ----- |
| 5637163536 | 1014  |
| 5637163580 | 1288  |