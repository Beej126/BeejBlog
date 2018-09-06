---
title: 'Solving Visual Studio 2017 -> Xamarin Mac Agent connectivity issues'
author: Beej
type: post
date: 2016-11-22T05:11:57+00:00
year: "2016"
month: "2016/11"
url: /2016/11/solving-xamarin-mac-agent-connectivity-issues.html
snapEdIT:
  - 1
snapTW:
  - 's:162:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5513534331
categories:
  - Uncategorized
tags:
  - Xamarin

---
this seems to be a recurring theme for me so i expect to be throwing more bones on this pile as the [sands of time leave behind our lives sublime][1]

[Xamarin Forums Post][1]

i had VS2017 doing iOS builds just yesterday but for some reason was getting persist Mac Agent "can't connect" errors today... and zilch in the xam logs to go on, yikes... thankfully struck me to look at Mac "Console" system.log and noticed

    Nov 21 20:28:50 McBeejBerg com.apple.xpc.launchd[1] (com.openssh.sshd.D3C4B936-497A-46B7-8592-E6AC9E714711[21887]): Service exited with abnormal code: 255
    

... firing every time just _opening_ the VS Mac Agent connection dialog... googled that error and tried [this][2]

    sudo vi /private/etc/sshd_config # Beej: i'm on Mac Sierra, maybe why i didn't have existing sshd_config file... the sands are always shifting beneath us... but did have /etc/ssh_config (note, no "d") with this pass auth setting commented out
    # PasswordAuthentication yes
    sudo launchctl stop com.openssh.sshd
    sudo launchctl start com.openssh.sshd
    

thankfully it's actually connecting after that (phew) ... for the record, same errors are still firing in mac system.log, so maybe just recycling sshd service is the [huckleberry][3] here

 [1]: https://forums.xamarin.com/discussion/comment/235162/#Comment_235162
 [2]: http://stackoverflow.com/questions/29751813/failure-opening-ssh-to-mac-os-x-10-10-using-net/31777166#31777166
 [3]: http://www.urbandictionary.com/define.php?term=I%27m%20your%20huckleberry