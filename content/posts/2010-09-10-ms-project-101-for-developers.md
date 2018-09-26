---
title: MS Project 101 for Developers
author: Beej
type: post
date: 2010-09-10T18:48:00+00:00
year: "2010"
month: "2010/09"
url: /2010/09/ms-project-101-for-developers.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 2826481050576614017
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2010/09/ms-project-101-for-developers.html
dsq_thread_id:
  - 5607353342
categories:
tags:
  - ProjMgmt

---
(Emphasis on For Developers)
  
<a href="https://en.wikipedia.org/wiki/BLUF_%28communication%29" target="_blank">BLUF</a>: the simple idea here is that it’s quite easy to project your aggregated Remaining Duration estimates into a quickie calendar date.

  1. capture a list of rational tasks &#8211; do an initial break down by individual screen if you don't have something else in mind... a little sub-task depth is good but don't go too deep at first... in typical software architecture, program functions and/or database objects are good candidates.
  2. then spend a little time throwing out a rough estimate for each task… don't get too hung up on accuracy here 
      * leverage the&nbsp;_out of body experience_ by pretending you’re not the guy that’s gotta do all this work 
      * it can be sorta fun in a twisted way and a surprisingly worthwhile organizational moment if you’re lighthearted about it 
  3. fully expand your outline (Project > Outline > Show > All Subtasks) 
  4. select all your tasks from top to bottom… 
  5. and link them together (Edit > Link Tasks [Ctrl+F2]) 
  6. in the normal task grid, make sure you have the columns: Duration, % Completion and Remaining Duration (right click a column header > Insert Column) 
  7. fill out the % Completion numbers as best you can 
      * as you’re doing so, the Remaining Duration for each task will go down accordingly 
  8. use sub-task nesting to create a task nodes with automatically summed Remaining Duration totals which represent your Milestones du jour 
  9. and then use <a href="https://worldwattweb.com/Test/default.aspx" target="_blank">Business Day Calculator</a> > Add Business Days to project some quick and dirty milestone completion dates to talk to 

  * to me this approach can give you something reasonably concrete to talk to in an hour
  * there becomes some "safety in numbers" here... it's harder for someone to throw out the timeline w/o somehow acknowledging the existing one
  * you can print out your task list and a pretty Gantt chart for a little more razzle dazzle than empty hand waving 
  * you can back yourself up at the next review by working the old estimates to correspond with actuals

Misc notes: 

  * The different kinds of _Percent Complete_
  * % Complete &#8211; deals with time
  * % Work Complete &#8211; deals with man-hours
  * % Physical Complete &#8211; deals with physical progress (<a href="https://www.tech-archive.net/Archive/Project/microsoft.public.project/2006-10/msg00188.html" target="_blank">link</a>) … in Development land “physical” of course gets very abstract and therefore makes it fun deciding where to draw the line on what is the smallest "thing" be a trackable task – but for example: screens, stored procedures, classes are granular enough “physical” things typical worthy of tracking completion.