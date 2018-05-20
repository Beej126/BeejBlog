---
title: Bash script – loop over inline list of files
author: Beej
type: post
date: 2015-10-26T00:51:00+00:00
url: /2015/10/bash-script-loop-over-inline-list-of.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 3355700281367272659
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2015/10/bash-script-loop-over-inline-list-of.html
dsq_thread_id:
  - 5529355788
tags:
  - CmdLine

---
<pre class="prettyprint">#!/bin/bash

#echo $BASH_VERSION

# read args:
# -r = disable backslash escaping
# -d '' = read the whole here-doc as one big input vs stopping stopping at the first new line as the default delimiter
# -a = put the results into an array
#the minus in "<<-" provides for indenting the here-doc lines, but with TABS ONLY
#bash4 is way easier but wanted to be portable: readarray -t arr <<-"EOT"
IFS=$'n' read -r -d '' -a arr <<-'EOF'
    /file/path/1
    /file/path/2
    /file/path/3
EOF

#echo ${#arr[*]}

# http://stackoverflow.com/questions/9084257/bash-array-with-spaces-in-elements
# disable default space delimiter
IFS=""
for filePath in ${arr[*]}
do
  stat "${filePath}"
done

unset IFS</pre>