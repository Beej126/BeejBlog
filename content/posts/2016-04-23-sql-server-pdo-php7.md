---
title: SQL Server PDO PHP7
author: Beej
type: post
date: 2016-04-23T22:25:39+00:00
year: "2016"
month: "2016/04"
url: /2016/04/sql-server-pdo-php7.html
dsq_thread_id:
  - 5517836230
categories:
  - Uncategorized
tags:
  - Database
  - PHP

---
  1. [get the DLL][1] &#8211; grab latest x64.zip
  2. add to your php.ini extension list: 
        [ExtensionList]
        extension=php_pdo_sqlsrv_7_nts.dll
        

  3. here's sample call code: 
        <?php
        
        try {
             $conn = new PDO( "sqlsrv:Server= ip_address; Database = mydb ", $user, $pwd);
             $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        }
        catch(Exception $e){
             die(var_dump($e));
        }
        
        $stmt = $conn->query($qry);
        $result = $stmt->fetchAll();
        $row = $result[0];
        $colval = $row["fieldname"];
        ?>

 [1]: https://github.com/Azure/msphpsql/releases