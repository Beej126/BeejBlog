---
title: VS Code, Typescript – Bare Metal New Project
author: Beej
type: post
date: 2017-07-08T05:58:22+00:00
url: /2017/07/vs-code-typescript-bare-metal-new-project.html
dsq_thread_id:
  - 5972829990
categories:
  - Uncategorized
tags:
  - TypeScript
  - VisualStudio
  - WebDev

---
i&#8217;m basically following [this guide][1], while humbly attempting to trim down to bare necessity and re-align configs with crucial bits that&#8217;ve shifted since then&#8230; and likely to continue shifting 😐

  1. [install Node][2]&#8230; there&#8217;s many ways but their setup.exe is handy&#8230; this includes npm
  2. from cmd.exe: `npm install -g typescript` (-g means globally vs project specific)
  3. [install VS Code][3] via setup.exe
  4. launch VS Code&#8230; commands inside VS Code designated as &#8220;vsc>&#8221; from here-on
  5. vsc> File > Open > New Folder > &#8220;projectFolder&#8221; > then Open that folder
  6. vsc> F1 > type &#8220;task&#8221; > &#8220;Configure Task Runner&#8221; > <kbd>Enter</kbd> > &#8220;TypeScript &#8211; Watch Mode&#8221; > <kbd>Enter</kbd>&#8230; 
      1. this will create a crucial `tasks.json` file with working default settings&#8230; 
      2. -AND- that &#8220;watch mode&#8221; choice means the moment you save any .ts file, the IDE will automatically regen the corresponding .js files&#8230; which plays into live edit and continue style debugging
  7. vsc> File > New File > populate with the following json block and save as `tsconfig.json` &#8230; this directs vscode to &#8220;transpile&#8221; .ts script to standard .js for us

        {
            "compilerOptions": {
                "target": "es5", 
                "outDir": "out/",
                "sourceMap": true
            }    
        }
    

  1. vsc> File > New File > throw in something simple like `console.log("Hello World!");` and save as `app.ts`
  2. vsc> <u>build</u> aka compile via <kbd>CTRL+SHIFT+B</kbd>&#8230; after a few pregnant seconds, this will gen some stuff in the `out` folder that we specified in above `tsconfig.json`
  3. vsc> <kbd>CTRL+SHIFT+D</kbd> to get into Debug panel > click the gear icon which creates and opens default `launch.json` which should have working defaults going by what we&#8217;ve done previously
  4. <u>crucial</u> and subtle, navigate back to the app.ts file as the active tab you wish to run/debug (this corresponds with the relative reference, `"program": "${file}"`, in launch.json)
  5. now we should be able to simply hit F5 to run/debug from here-on as we&#8217;d normally expect&#8230; F9 to set breakpoints, etc.

hopefully you&#8217;re off to the races and you can bootstrap yourself further by googling

i am a bit &#8220;ashamed&#8221; this is still so obtuse

 [1]: http://www.mithunvp.com/typescript-tutorials-setting-visual-studio-code/
 [2]: https://nodejs.org/en/download/
 [3]: https://code.visualstudio.com/download