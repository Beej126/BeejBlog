---
title: 'Toggle XAML <> Code-Behind in Visual Studio 2015, ReSharper, Xamarin Forms'
author: Beej
type: post
date: 2016-10-04T00:42:29+00:00
year: "2016"
month: "2016/10"
url: /2016/10/toggle-xaml-code-behind-in-visual-studio-2015-resharper-xamarin-forms.html
snapEdIT:
  - 1
snapTW:
  - |
    s:174:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";
dsq_thread_id:
  - 5526839979
categories:
  - Uncategorized
tags:
  - Xamarin

---
Quickly bouncing between .XAML and corresponding .CS file just seems like an obvious need... i feel like we used to have this in WPF but it's been a few years for me.

# Short Story:

  * this approach simply maps preferred hotkey to ReSharper's "Go To Related Files" command... sorry if that's not an expense you care to bear but it's a great tool for numerous reasons if you can spring for it
  * Visual Studio > Tools menu > Options > Environment > Keyboard
  * "Show commands containing" edit box enter: relatedfiles
  * select "ReSharper.ReSharper_GotoRelatedFiles"
  * "Use new shortcut in" drop down select: Text Editor
  * "Press shortcut keys" edit box press: <kbd>F7</kbd>
  * lastly click "Assign" button and "OK" and you're done

[![image][1]][1]

&nbsp;

# ViewModel class in .xaml.cs file

if you happen to be using the Prism framework's automatic ViewModel binding, consider throwing your ViewModel (VM) classes into the {View}.xaml.cs file...
  
that way the F7 key will now bounce back and forth between the XAML and the VM bound to it, lovely!

i know this is kinda controversial at first blush but think about it for a sec before jumping on condemnation...
  
at this point VM is the predominant paradigm for the "code behind" a view... the actual view class is likely to be empty.
  
admittedly, VM's are not necessarily 1-to-1 with a View... they can be swapped out, many views to one model and driven by TDD... yet that is all still possible, we are merely talking about which .cs file the VM class definition is contained

[![image][2]][2]

 [1]: https://cloud.githubusercontent.com/assets/6301228/21902949/bf8aecbe-d8b2-11e6-81fa-a88f7ecd2259.png
 [2]: https://cloud.githubusercontent.com/assets/6301228/19058650/effedf50-898d-11e6-9e8f-e8f3366affb1.png