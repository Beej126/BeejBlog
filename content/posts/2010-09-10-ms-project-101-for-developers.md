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

## TL;DR

The simple idea here is that it’s quite easy to project your aggregated Remaining Duration estimates into a quickie calendar date.

see screenshot below for example

## Setup

1. First create an initial "Summary Task" for the whole project - this will provide the rollup point for total work remaining
1. now capture a list of "rational" tasks under that
   - of course the unavoidable lynchpin of any [work breakdown](https://en.wikipedia.org/wiki/Work_breakdown_structure) estimating like this, is deciding on what qualifies as a task
   - if you don't have any ideas in mind from past experience, start with each of your app's screens as a unit of work to enter as a task
   - in typical software architecture, other stuff like stored procedures and OO classes are good candidates... basically just invent what level of detail feels right to you to track on without feeling like it's excruciatingly small
   - you can use more "Summary Tasks" to go down a level or two in sub-tasks... but my recommendation is you'll probably get more satisfaction from taking your best quick shot at covering your current scope's breadth before going into real sub detail... another pragmatic reason to keep this short is you still have some work in step 2 =)<br/><br/>
1. now go down the entire list of "leaf" tasks and spend a little time entering super rough work-days estimates into the `Duration` column for each task...
   - don't enter how many calendar days you think it'll actually drag with all your other distractions, think in terms of raw heads down completion time... you can add all those kinds of padding later…
   - to get through this without being miserable, **don't get too hung up on accuracy**... think macroscopically, days versus hours
   - leverage the _out of body experience_ of pretending you’re not the poor sap that’s gotta do all this work
   - it can be sorta fun in a twisted way and a **surprisingly worthwhile organizational moment** if you’re lighthearted about this... psych yourself to see this as a fun break of playing "task invaders" versus a chore<br/><br/>
1. now fully expand your outline (Project > Outline > Show > All Subtasks)
1. select all your tasks from top to bottom
1. and link them together (Edit > Link Tasks or <kbd>Ctrl+F2</kbd>) - this takes the very simplistic initial assumption that all tasks must be completed sequentially... once you get this cooking, by all means break out what you can into parallel tracks

## Day to Day Process

1. make sure you have the columns: `Duration`, `% Complete` and `Remaining Duration` (right click a column header > Insert Column)
1. when you actually complete something, mark it 100% complete... if you can avoid it, don't even bother estimating stuff that is partially complete
   - notice the `Remaining Duration` for each task will go down accordingly as you fill out Completion
1. insert more "Summary Tasks" to represent Milestones and those Remaining Duration sub-totals within the overall project

## Profit

when it's time to review your progress...
1. maybe update the internal Project calendar with [holidays](https://support.office.com/en-us/article/add-a-holiday-to-the-project-calendar-83497cbf-9b6e-4805-8603-2a89038290a0)
1. then just bask in the glory of the automatic gantt chart

## Perspectives

- a nice list of tasks and a gantt timeline provide a familiar platform to talk to in a typical 1hr corporate meeting timebox
- the most important point i want to make is that some compelling "safety in numbers" materializes here... it's harder for someone to come along and casually throw out your timeline without somehow acknowledging it's existance and the natural burden of refuting it... this provides some leverage in situations where leverage is typically hard to come by... i.e. you can unemotionally refer to "the numbers" versus getting backed into a defensive posture... as soon as someone manages to manipulate you into being defensive, they've won... if an antogonist does press for their preferred alternative, fantastic! they have essentially volunteered to take on this burden and free you from it... make sure to document that in the meeting notes =)
- we can readily print the task list as well as a pretty Gantt chart for a little more razzle dazzle than empty hand waving
- to generate growing credibility, at the next milestone review, make a point of **reconciling the old estimates to correspond with actuals and thereby project updated estimates** (turns out this corresponds very nicely to agile's ["inspect and adapt"](https://sites.google.com/site/agilepatterns/home/inspect-and-adapt) mantra)

## References

- [The different kinds of _Percent Complete_](https://www.office-forums.com/threads/complete-vs-wok-complete-vs-physical-complete.68544/#post-186014)
  - `% Complete` &#8211; deals with time
  - `% Work Complete` &#8211; deals with man-hours
  - `% Physical Complete` &#8211; deals with physical progress ...
      - in Development land, “physical” of course gets very abstract and therefore makes it fun deciding where to draw the line on what is the smallest "thing" to be a trackable task...
      - if you're looking for concrete examples - as mentioned above, functional bundles like screens, stored procedures and classes are granular enough things typically worthy of tracking completion... start there and hopefully you'll start to see the things you are naturally drawn to

![image](https://user-images.githubusercontent.com/6301228/60238832-9411fd00-9860-11e9-81d3-de5d47392de7.png)
