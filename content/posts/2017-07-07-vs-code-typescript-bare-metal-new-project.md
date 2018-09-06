---
title: VS Code, Typescript – Bare Metal New Project
author: Beej
type: post
date: 2017-07-08T05:58:22+00:00
year: "2017"
month: "2017/07"
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
i'm basically following [this guide][1], while humbly attempting to trim down to bare necessity and re-align configs with crucial bits that've shifted since then... and likely to continue shifting 😐
<!--more-->

  1. [install Node][2]... there's many ways but their setup.exe is handy... this includes npm
  2. from cmd.exe: `npm install -g typescript` (-g means globally vs project specific)
  3. [install VS Code][3] via setup.exe
  4. launch VS Code... commands inside VS Code designated as "vsc>" from here-on
  5. vsc> File > Open > New Folder > "projectFolder" > then Open that folder
  6. vsc> F1 > type "task" > "Configure Task Runner" > <kbd>Enter</kbd> > "TypeScript &#8211; Watch Mode" > <kbd>Enter</kbd>... 
      1. this will create a crucial `tasks.json` file with working default settings... 
      2. -AND- that "watch mode" choice means the moment you save any .ts file, the IDE will automatically regen the corresponding .js files... which plays into live edit and continue style debugging
  7. vsc> File > New File > populate with the following json block and save as `tsconfig.json` ... this directs vscode to "transpile" .ts script to standard .js for us
     ```json
    {
        "compilerOptions": {
            "target": "es5", 
            "outDir": "out/",
            "sourceMap": true
        }    
    }
    ```

  1. vsc> File > New File > throw in something simple like `console.log("Hello World!");` and save as `app.ts`
  2. vsc> <u>build</u> aka compile via <kbd>CTRL+SHIFT+B</kbd>... after a few pregnant seconds, this will gen some stuff in the `out` folder that we specified in above `tsconfig.json`
  3. vsc> <kbd>CTRL+SHIFT+D</kbd> to get into Debug panel > click the gear icon which creates and opens default `launch.json` which should have working defaults going by what we've done previously
  4. <u>crucial</u> and subtle, navigate back to the app.ts file as the active tab you wish to run/debug (this corresponds with the relative reference, `"program": "${file}"`, in launch.json)
  5. now we should be able to simply hit F5 to run/debug from here-on as we'd normally expect... F9 to set breakpoints, etc.

hopefully you're off to the races and you can bootstrap yourself further by googling

i am a bit "ashamed" this is still so obtuse

 [1]: http://www.mithunvp.com/typescript-tutorials-setting-visual-studio-code/
 [2]: https://nodejs.org/en/download/
 [3]: https://code.visualstudio.com/download