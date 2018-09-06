---
title: Script to generate dozens of required iOS app icon images
author: Beej
type: post
date: 2016-08-16T22:13:53+00:00
year: "2016"
month: "2016/08"
url: /2016/08/script-to-generate-dozens-of-required-ios-app-icon-images.html
dsq_thread_id:
  - 5518418900
categories:
  - Uncategorized
tags:
  - iOS
  - Xamarin

---
# Motivation

there are a number of free icon generating web sites available which begs the question whether a script like this provides any value... but leveraging a robust image manipulation utility like imageMagick to apply unique aesthetics makes a DIY approach like this more compelling... along those lines, in the current script, i'm applying:

  * custom "centering" &#8211; for the splash images where the icon sits inside of a larger background, i've found positioning the icon 2/7ths of the way down from top to be the most pleasing
  * outer glow
  
    &nbsp;

# Result

![image][1]
  
&nbsp;

# !generate.cmd

    @echo off
    
    ::keeps all variable definitions local to batch file so no need to cleanup after
    setlocal
    
    ::*** make sure to start with 1024x1024 original ***
    set inFile=!original.png
    if not [%1] EQU [] set inFile=%1
    
    rename "%inFile%" "%inFile%.save"
    erase Default*.png Icon.ico Icon*.png Icon.ico Splash*.png Itunes*.png
    rename "%inFile%.save" "%inFile%"
    
    :: this was a handy page that did most BUT NOT ALL of what i saw in the "Resources" folder generated from the Xamarin project template...
    :: https://icon.angrymarmot.org/index.html#c9a51e815eac3df5c54f
    
    :: so i decided to have a crack at generating the remaining "Default" aka splash screen images since they represented an interesting challenge of:
    :: 1) resizing onto a larger background
    :: 2) applying "outer glow" to mitigate the blue-on-blue...
    ::    albeit, i could've chosen a more simpatico background color, but i favor sticking with defaults until something really kicks me in a different direction
    
    ::***install fantastically handy ImageMagick tool from => https://www.imagemagick.org/script/binary-releases.php
    ::main options docs: https://www.imagemagick.org/script/command-line-options.php#compose
    
    ::clarify options used:
    ::-channel portion yields more desireable hard edge on shadow, see: https://www.imagemagick.org/Usage/blur/#shadow_outline
    ::+swap is necessary because we need the input image to initially come first in order to render it's corresponding shadow but then we want the shadow behind... and the + sign is handy shortcut to swap the last 2 layers in pipeline w/o having to explicitly specify
    ::-gravity North centers horizontally and at top vertically and then the -extent sets the outer "canvas" size with the negative offset bringing the icon down from the top
    ::the double %% on -level is required to escape the normal processing of "%" as a batch variable
    
    @echo on
    goto pause
    
    magick "%inFile%" -define icon:auto-resize="256,128,96,64,48,32,16" ( +clone -shadow 100x80-0-0 -channel A -level 0,50%% +channel ) +swap -background none -layers merge -gravity center "Icon.ico"
    
    :Icons
    call :IconSub 29 Icon-Small
    call :IconSub 40 Icon-Small-40
    call :IconSub 50 Icon-Small-50
    call :IconSub 57 Icon
    call :IconSub 58 Icon-Small@2x
    call :IconSub 60 Icon-60 ::including this one only because it's referenced in LaunchScreen.storyboard, even though i'm not using LaunchScreen because i want the app to Splash with the big background style image
    call :IconSub 72 Icon-72
    call :IconSub 76 Icon-76
    call :IconSub 80 Icon-Small-40@2x
    call :IconSub 100 Icon-Small-50@2x
    call :IconSub 114 Icon@2x
    call :IconSub 120 Icon-60@2x
    call :IconSub 144 Icon-72@2x
    call :IconSub 152 Icon-76@2x
    call :IconSub 512 iTunesArtwork
    call :IconSub 1024 iTunesArtwork@2x
    
    :Splashes
    call :SplashSub 320 480 Default
    call :SplashSub 640 960 Default@2x
    call :SplashSub 640 1136 Default
    call :SplashSub 768 1004 Default-Portrait
    call :SplashSub 1536 2008 Default-Portrait@2x
    call :SplashSub 1024 748 Default-Landscape
    call :SplashSub 2048 1496 Default-Landscape
    
    @echo off
    echo  ____                                               _   _ 
    echo / ___^|   _   _    ___    ___    ___   ___   ___    ^| ^| ^| ^|
    echo \___ \  ^| ^| ^| ^|  / __^|  / __^|  / _ \ / __^| / __^|   ^| ^| ^| ^|
    echo  ___) ^| ^| ^|_^| ^| ^| (__  ^| (__  ^|  __/ \__ \ \__ \   ^|_^| ^|_^|
    echo ^|____/   \__,_^|  \___^|  \___^|  \___^| ^|___/ ^|___/   (_) (_)
    
    @ping localhost -n 10 >nul:
    exit
    
    :IconSub
    @echo off
    :: %1 = desired size
    :: %2 = file name
    SETLOCAL
    set /a shadowSize=%1*8/100
    if %shadowSize% EQU 0 set shadowSize=1
    magick "%inFile%" -resize %1 ( +clone -shadow 100x%shadowSize%-0-0 -channel A -level 0,50%% +channel ) +swap -background none -layers merge -gravity center -resize %1 %2.png
    @echo on
    @goto :EOF
    
    
    :SplashSub
    @echo off
    :: %1 = width
    :: %2 = height
    :: %3 = file name
    SETLOCAL
    set smallestDimension=%2
    if %1 LSS %2 set smallestDimension=%1
    ::the shadow creates a natural "padding" effect, so start out with icon same as smallest dimension
    set /a iconSize=%smallestDimension%
    set /a shadowSize=%smallestDimension%*8/100
    ::center the icon 1/3 of the whitespace available down from top
    set /a verticalOffset=(%2-%iconSize%)*2/7
    
    ::default Xamarin project blue background #3498DB
    :: handy script to generate following commands if you already have a folder with the desired resulting images:
    :: >magick identify -format "magick \"\%inFile\%\" -resize %w %f\n" Icon*.png iTunes*.png
    magick "%inFile%" -resize %iconSize% ( +clone -shadow 100x%shadowSize%-0-0 -channel A -level 0,50%% +channel ) +swap -background "#3498DB" -layers merge -resize %iconSize% -gravity North -extent %1x%2+0-%verticalOffset% %3.png
    
    @echo on
    @goto :EOF
    

Looks pretty cool =)
  
![ezgif-856014604][2]

 [1]: https://cloud.githubusercontent.com/assets/6301228/17730910/cca94dd0-641f-11e6-9f65-3a084e9492bc.png
 [2]: https://cloud.githubusercontent.com/assets/6301228/17786868/bb6e77ee-653b-11e6-8576-5fc37b56eb0b.gif