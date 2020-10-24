---
title: "Oracle vs SQL Server"
date: 2018-11-13T14:19:42-08:00
type: post
author: Beej
year: "2018"
month: "2018/11"
url: /2018/11/2018-11-13-Oracle-vs-SQL-Server.html
tags:
  - Database
---

### Intro

I am admitedly much longer time spent on SQL Server and just recently having a couple years on Oracle 11g... All that T-SQL syntax experience, especially after SQL Server 2005 really gave us a lot of power, sets basic expectations on what can be readily accomplished.
<!--more-->

### Oracle Negatives

* Common syntax **error messages** are much harder to deciper
  * E.g. for a stored procedure inside a package, one must declare the proc with all parms and then essentially declare it again for the implementation in the body… if those 2 are different you get a generic error “Cannot navigate to error. Check if object exists.”<br/><br/>
* Can’t use **CTE’s** with updates<br/><br/>
* <s>**Table valued parameters** can’t be joined…
* ... this is due to the significant global limitation that Oracle PL/SQL and Oracle DML SQL are separated by a context switch driving several corresponding limitations...
  * calling a stored proc from network client tier and passing a LIST can only be done via associative arrays… assoc.arrays can’t be joined in SQL… you must use a FORALL or FOR LOOP PL/SQL construct
  * you can join a nested table but that data structure can’t be passed in from the client tier… everybody asks the same questions over and over… it’s just the way it’s been for years<br/><br/></s>
* i was just plain wrong about joining to a table valued parameter... you just need to wrapper it with a `from table(your_table_UDT_parm)`... here's some [recent sample code](https://github.com/oracle/dotnet-db-samples/issues/56)
* non ansi **null concatenation**: select ‘test’ || null from dual; --> yields ‘test’ versus null... prevents using the handy t-sql pattern of: select isnull(field + ', ', '') + newVal
* can’t define the output length of varchar UDF’s !?!
* **temp tables** as we know them in t-sql don’t even exist – oracle temp tables are “global” i.e. permanent structures… they do have automatic support for session isolation though… so one sessions inserts are hidden from anothers
* empty string (i.e. '') is NULL! and there's no setting to change that

### Oracle Positives

* the ability to define temp tables & array/collection fields with generic table%field references such that adding columns to the source tables doesn’t require maintenance in the temp table logic… this is longstanding gripe in t-sql... kinda amazing they haven't filled this gap yet
