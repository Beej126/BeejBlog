---
title: 2011 Q4 .Net State of the Union
author: Beej
type: post
date: 2011-12-02T02:23:00+00:00
url: /2011/12/self-refresher.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 5446554884943522169
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2011/12/self-refresher.html
categories:
  - Uncategorized
tags:
  - DotNetFramework

---
  * .Net Framework v4 New Features 
      * Parallel Linq Extensions 
  * C# 4.0 New Features (_all good stuff IMPO, variance being the hardest to grok_) 
      * Named and Optional Parameters – already use this quite a bit 
      * Dynamic Support – handy way to ignore the complexity of ‘dynamically’ generated type declarations (e.g. linq results & COM Interop) 
      * Co/Contra-Variance – primarily intended to make .Net Framework methods with Generic type parameters like IEnumerable<T> “_work like we’d expect_” as is often quoted in explanatory texts (look for Jon Skeet and Eric Lippert).&#160; It removes a couple rather unexpected annoyances that C# 3 would’ve snagged on.
      * Covariance represents “upcastable”.&#160; Concerns types coming out of an API.&#160; Represented by “out” keyword, e.g. public interface IEnumerable<out T>
      * Contravariance is “downcastable”. Typically concerns types passed into an API.&#160; e.g. public interface IComparer<in T>
      * Invariance is when something must go both in and out of a method and it can’t be declared differently on either side of the interface, it must be the same coming and going.
    
      * COM Interop 
          * Dynamic Vars 
          * Optional Parms 
          * Optimized interop assembly file size 
  * WPF4 New Features 
      * New Controls – \*DataGrid\*, Calendar/DatePicker 
      * Touch 
      * Fancy Win7 Taskbar support 
      * Easements 
  * Silverlight 4 New Features 
      * New Controls – ViewBox (auto resize), RichTextBox 
      * Out-Of-Browser Support 
      * Printing support 
      * Drag and drop, clipboard access 
      * More WPF compatible XAML parser 
      * DataBinding improvements – StringFormat, collection grouping, INotifyDataErrorInfo or IDataErrorInfo support, 
      * WCF Data Services enhancements – Direct POCO mapping via Linq queries on Open Data Protocol feeds. 
      * Dynamic Support