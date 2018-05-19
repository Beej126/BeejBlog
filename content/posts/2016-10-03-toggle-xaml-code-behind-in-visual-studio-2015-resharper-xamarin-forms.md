---
title: 'Toggle XAML <> Code-Behind in Visual Studio 2015, ReSharper, Xamarin Forms'
author: Beej
type: post
date: 2016-10-04T00:42:29+00:00
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
Quickly bouncing between .XAML and corresponding .CS file just seems like an obvious need&#8230; i feel like we used to have this in WPF but it&#8217;s been a few years for me.

# Short Story:

  * this approach simply maps preferred hotkey to ReSharper&#8217;s &#8220;Go To Related Files&#8221; command&#8230; sorry if that&#8217;s not an expense you care to bear but it&#8217;s a great tool for numerous reasons if you can spring for it
  * Visual Studio > Tools menu > Options > Environment > Keyboard
  * &#8220;Show commands containing&#8221; edit box enter: relatedfiles
  * select &#8220;ReSharper.ReSharper_GotoRelatedFiles&#8221;
  * &#8220;Use new shortcut in&#8221; drop down select: Text Editor
  * &#8220;Press shortcut keys&#8221; edit box press: <kbd>F7</kbd>
  * lastly click &#8220;Assign&#8221; button and &#8220;OK&#8221; and you&#8217;re done

[![image][1]][1]

&nbsp;

# ViewModel class in .xaml.cs file

if you happen to be using the Prism framework&#8217;s automatic ViewModel binding, consider throwing your ViewModel (VM) classes into the {View}.xaml.cs file&#8230;
  
that way the F7 key will now bounce back and forth between the XAML and the VM bound to it, lovely!

i know this is kinda controversial at first blush but think about it for a sec before jumping on condemnation&#8230;
  
at this point VM is the predominant paradigm for the &#8220;code behind&#8221; a view&#8230; the actual view class is likely to be empty.
  
admittedly, VM&#8217;s are not necessarily 1-to-1 with a View&#8230; they can be swapped out, many views to one model and driven by TDD&#8230; yet that is all still possible, we are merely talking about which .cs file the VM class definition is contained

[![image][2]][2]

 [1]: https://cloud.githubusercontent.com/assets/6301228/21902949/bf8aecbe-d8b2-11e6-81fa-a88f7ecd2259.png
 [2]: https://cloud.githubusercontent.com/assets/6301228/19058650/effedf50-898d-11e6-9e8f-e8f3366affb1.png