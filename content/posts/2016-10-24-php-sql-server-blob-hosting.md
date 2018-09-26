---
title: PHP SQL Server blob hosting
author: Beej
type: post
date: 2016-10-24T23:13:18+00:00
year: "2016"
month: "2016/10"
url: /2016/10/php-sql-server-blob-hosting.html
dsq_thread_id:
  - 5758814177
categories:
tags:
  - Database
  - PHP

---
[from here][1]
  
see [this post][2] for sql server driver downloads
  
&nbsp;

## downloadPDF.php

    <?php
    header('Content-type: application/pdf');
    // leave this out to open directly in browser: header('Content-Disposition: attachment; filename="my.pdf"');
    include("SQLConnect.php");
    $sql = "select InvoiceDocument from SalesInvoicePDF where InvoiceID = '123'";
    $stmt = sqlsrv_query($conn, $sql);
    if ( sqlsrv_fetch($stmt) )
    {
        //this pulls the first field via "0"
        $data = sqlsrv_get_field($stmt, 0, SQLSRV_PHPTYPE_STREAM(SQLSRV_ENC_BINARY));
        // write binary sql stream directly to http response
        fpassthru($data);
    }
    ?>
    

## SQLConnect.php

    <?php
    // DB connection info
    $host = "servername";
    $user = "user";
    $pwd = "pwd";
    $db = "database";
    // Connect to database.
    try {
      /*
      $connPdo = new PDO( "sqlsrv:Server= $host ; Database = $db ", $user, $pwd);
      $connPdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        */
    
      $conn = sqlsrv_connect($host, array("Database"=>$db, "UID"=>$user, "PWD"=>$pwd));
    }
    catch(Exception $e){
       die(var_dump($e));
    }
    ?>

 [1]: https://social.msdn.microsoft.com/Forums/sqlserver/en-US/ecca0613-bde3-45f6-abc7-dbf3dade4597/retrieving-and-displaying-images?forum=sqldriverforphp
 [2]: /2016/04/sql-server-pdo-php7.html