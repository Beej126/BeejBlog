---
title: Ethereum 101 on Windows
author: Beej
type: post
date: 2016-12-23T12:15:33+00:00
url: /2016/12/ethereum-101-on-windows.html
snap_isAutoPosted:
  - 1
snapEdIT:
  - 1
snapTW:
  - |
    s:315:"a:1:{i:0;a:11:{s:9:"timeToRun";s:0:"";s:10:"SNAPformat";s:26:"%TITLE% - %URL%
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";i:0;s:2:"do";i:0;s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"813850604971753472";s:5:"pDate";s:19:"2016-12-27 20:54:41";}}";
dsq_thread_id:
  - 5508760012
categories:
  - Uncategorized
tags:
  - BlockChain
  - Security

---
### background / baseline context

  * I&#8217;m not even remotely suggesting that this is _new_ info but even though there&#8217;s some very friendly guides already cooking out there, I ran into mild snags and this is my attempt to really grease the rails on the way to running the greeter sample smart contract
  * now that we have Ubuntu running natively on Windows 10 this, the native windows binary path for what are obviously linuxy bits sorta feels like a less direct path to success but IIRC i had initial snags that kicked me in this direction
  * these commands target a local private net instance&#8230; we get free gas this way so i figure inhale that immediate gratification as quickly as possible and use that energy to conquer our next ether mountain

## getting spun up and ready to spend some ether

  1. [Ethereum.org/cli][1] feels like the canonical starting point so keep that handy -BUT- for starters, the referenced Windows binary installation url was down for me as of this writing
  2. so here&#8217;s the [geth][2] install bits&#8230; geth is the preferred CLI based server and admin console (installed to C:\Program Files\Geth for me)
  3. and we&#8217;ll also need the [smart contract compiler &#8220;SOLC&#8221;][3] (C:\Program Files\cpp-ethereum)&#8230; make sure those are both in your path
  4. create a working folder for this instance (aka &#8220;private network&#8221;) and make it current, hereby referred to as `{workdir}`
  5. throw together a genesis.json like so, filling in the as blanks as noted (from here <sup id="fnref-1457-guide2"><a href="#fn-1457-guide2" class="jetpack-footnote">1</a></sup>)
  
    [crayon]
  
    {
  
    &#8220;nonce&#8221;: &#8220;0x0&#8221;,
  
    &#8220;timestamp&#8221;: &#8220;0x0&#8221;,
  
    &#8220;parentHash&#8221;: &#8220;0x0000000000000000000000000000000000000000000000000000000000000000&#8221;,
  
    &#8220;extraData&#8221;: &#8220;0x0&#8221;,
  
    &#8220;gasLimit&#8221;: &#8220;0x8000000&#8221;,
  
    &#8220;difficulty&#8221;: &#8220;0x400&#8221;,
  
    &#8220;mixhash&#8221;: &#8220;0x0000000000000000000000000000000000000000000000000000000000000000&#8221;,
  
    &#8220;coinbase&#8221;: &#8220;0x0&#8221;,
  
    &#8220;alloc&#8221;: { &#8220;0x0&#8221;: {&#8220;balance&#8221;: &#8220;20000000000000000000&#8221;}}
  
    }
  
    [/crayon]</p> 
      * **nonce**: throw in a self generated hex guid &#8230; one way to create a guid would be to install ScriptCS.exe and then `System.Guid.NewGuid().ToString("n")` &#8230; recommend installing ScriptCS and anything else via [Chocolatey][4] Windows package manager
      * **coinbase & alloc**: note that later we&#8217;ll replace those &#8220;0x0&#8221; values with your **primary account number** as where you want your mined ether to deposit and build up
  6. initialize your working folder files:
  
    [crayon]geth &#8211;dev &#8211;datadir . init genesis.json[/crayon]
  7. do ourselves a big favor and create a default javascript file to toss in any of our own custom convenience routines to be available whenever the server starts up&#8230; save the following to e.g. helpers.js (referenced in the ethStart.cmd below)
  
    [crayon]
  
    function balance() { return web3.fromWei(eth.getBalance(eth.accounts[0])) + &#8221; ethers&#8221;; }
  
    [/crayon]</p> 
  8. save the following to ethStart.cmd and launch it to fire up the server
  
    [crayon]
  
    geth &#8211;dev &#8211;mine &#8211;minerthreads 1 &#8211;datadir . &#8211;networkid 399524671 &#8211;etherbase 0x057c86cae703b08c59fa6a9f066dbcc241da52a7 &#8211;rpc &#8211;rpcapi &#8220;eth,net,web3,personal&#8221; &#8211;rpccorsdomain * &#8211;password pw.txt &#8211;preload &#8220;helpers.js&#8221; console
  
    ::move unlock into command line after primary account is created
  
    ::&#8211;unlock 0
  
    [/crayon]
    
      * <sup id="fnref-1457-geth_CLI"><a href="#fn-1457-geth_CLI" class="jetpack-footnote">2</a></sup> _full CLI option reference_
      * **networkid**: make yours up
      * **datadir**: crucial your other files are in the current working folder
      * **dev**: developer mode&#8230; this seems to make certain initialization steps do a faster minimal burn 
      * **unlock**: this will prompt you for password and thereby <span class="hl">start server with specified etherbase aka coinbase account unlocked to enable spending ether which is REQUIRED TO SUBMIT ANY TRANSACTIONS, including our first hello world sample smart contract!! =)</span>
      * **etherbase**: update this with your primary account, next step&#8230;
      * **password**: create pw.txt with the same password you specify in next step&#8230;
      * **rpc**: fire up the http-rpc endpoint&#8230; defaults to: http://localhost:8545
      * **preload**: loads our custom convenience routines
  9. create your primary account: `personal.newAccount("fill in a password")` &#8230; this will output the hex number of your first account# aka primary aka eth.accounts[0]
 10. stop the server with CTRL-D
 11. plug this account# into genesis.json and ethStart.cmd > coinbase & alloc properties&#8230; and add the unlock parm back into ethStart.cmd
 12. drumroll&#8230; restart `ethStart.cmd` &#8230; watch for any errors in the output
 13. <span class="hl">i had to wait a few minutes for mining activity like below to kick in&#8230; it would be interesting to hear what it&#8217;s doing during this extended delay&#8230; </span>
  
    [crayon]
  
    I1222 23:12:12.999058 miner/worker.go:542] commit new work on block 8 with 0 txs & 0 uncles. Took 0s
  
    I1222 23:12:12.999559 miner/worker.go:542] commit new work on block 8 with 0 txs & 0 uncles. Took 0s
  
    I1222 23:13:13.817780 miner/worker.go:344] 🔨 Mined block (#8 / 7d659f91). Wait 5 blocks for confirmation
  
    I1222 23:13:13.818278 miner/worker.go:542] commit new work on block 9 with 0 txs & 0 uncles. Took 497.4µs
  
    I1222 23:13:13.818777 miner/worker.go:542] commit new work on block 9 with 0 txs & 0 uncles. Took 0s
  
    I1222 23:14:10.930228 miner/worker.go:344] 🔨 Mined block (#9 / b076ded1). Wait 5 blocks for confirmation
  
    [/crayon]</p> 
      * definitely try `miner.start(1)` from the geth javascript command line if nothing happens after say 3 minutes tops
      * good troubleshooting ref <sup id="fnref-1457-guide1"><a href="#fn-1457-guide1" class="jetpack-footnote">3</a></sup>
 14. once you see mined block output, then try `balance()` and you should see a few ethers piling up in your kettle
  
    [crayon]
  
    &#8220;50 ethers&#8221;
  
    [/crayon]
 15. here is my actual full happy output for your reference&#8230; don&#8217;t worry, all &#8220;secret&#8221; values herein (e.g. account#, password, etc) are local testnet only / completely sacrificial
  
    [crayon]
  
    [C:\Users\beej1\AppData\Roaming\Ethereum\beejnet]ethStart
  
    geth &#8211;dev &#8211;mine &#8211;minerthreads 1 &#8211;datadir . &#8211;networkid 399524671 &#8211;etherbase 0x057c86cae703b08c59fa6a9f066dbcc241da52a7 &#8211;rpc &#8211;unlock 0 console
  
    I1222 23:07:20.578872 ethdb/database.go:83] Allotted 128MB cache and 1024 file handles to C:\Users\beej1\AppData\Roaming\Ethereum\beejnet\geth\chaindata
  
    I1222 23:07:20.620876 ethdb/database.go:176] closed db:C:\Users\beej1\AppData\Roaming\Ethereum\beejnet\geth\chaindata
  
    I1222 23:07:20.621873 node/node.go:175] instance: Geth/v1.5.3-stable-978737f5/windows/go1.7.3
  
    I1222 23:07:20.621873 ethdb/database.go:83] Allotted 128MB cache and 1024 file handles to C:\Users\beej1\AppData\Roaming\Ethereum\beejnet\geth\chaindata
  
    <span class="hl">I1222 23:07:20.661879 core/genesis.go:93] Genesis block already in chain. Writing canonical number<br /> I1222 23:07:20.662377 eth/backend.go:282] Successfully wrote custom genesis block: e5be92145a301820111f91866566e3e99ee344d155569e4556a39bc71238f3bc</span>
  
    I1222 23:07:20.662877 eth/backend.go:301] ethash used in test mode
  
    I1222 23:07:20.663381 eth/backend.go:193] Protocol Versions: [63 62], Network Id: 399524671
  
    I1222 23:07:20.663381 eth/backend.go:221] Chain config: {ChainID: 0 Homestead: <nil> DAO: <nil> DAOSupport: false EIP150: <nil> EIP155: <nil> EIP158: <nil>}
  
    I1222 23:07:20.663880 core/blockchain.go:214] Last header: #6 [1b77c210…] TD=917760
  
    I1222 23:07:20.664380 core/blockchain.go:215] Last block: #6 [1b77c210…] TD=917760
  
    I1222 23:07:20.664380 core/blockchain.go:216] Fast block: #6 [1b77c210…] TD=917760
  
    I1222 23:07:20.665379 p2p/server.go:336] Starting Server
  
    I1222 23:07:22.797260 p2p/discover/udp.go:217] Listening, enode://f2db422043fb3f846d2b429e0c2c99c1c2943ed2eea111d48dbafd203a250369e8c5ed56364d2248651647a094a4649529d3faf23e4b038f961ccc80cadf628a@[::]:61740
  
    I1222 23:07:22.798761 p2p/server.go:604] Listening on [::]:49887
  
    I1222 23:07:22.798761 whisper/whisperv2/whisper.go:176] Whisper started
  
    I1222 23:07:22.798761 eth/backend.go:481] Automatic pregeneration of ethash DAG ON (ethash dir: C:\Users\beej1\AppData\Ethash)
  
    I1222 23:07:22.799260 eth/backend.go:488] checking DAG (ethash dir: C:\Users\beej1\AppData\Ethash)
  
    I1222 23:07:22.800262 node/node.go:340] IPC endpoint opened: &#92;.\pipe\geth.ipc
  
    I1222 23:07:22.813263 node/node.go:410] HTTP endpoint opened: http://localhost:8545
  
    Unlocking account 0 | Attempt 1/3
  
    <span class="hl">Passphrase: </span>
  
    I1222 23:08:28.727457 cmd/geth/accountcmd.go:200] Unlocked account 057c86cae703b08c59fa6a9f066dbcc241da52a7
  
    I1222 23:08:28.727954 miner/miner.go:137] Starting mining operation (CPU=1 TOT=2)
  
    I1222 23:08:28.728455 miner/worker.go:542] commit new work on block 7 with 0 txs & 0 uncles. Took 0s
  
    I1222 23:08:28.728955 vendor/github.com/ethereum/ethash/ethash.go:259] Generating DAG for epoch 0 (size 32768) (0000000000000000000000000000000000000000000000000000000000000000)
  
    I1222 23:08:28.730457 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 0%
  
    I1222 23:08:28.730958 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 1%
  
    I1222 23:08:28.730958 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 2%
  
    I1222 23:08:28.730958 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 3%
  
    I1222 23:08:28.731456 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 4%
  
    I1222 23:08:28.731456 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 5%
  
    &#8230; skipping &#8230;
  
    I1222 23:08:28.752959 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 97%
  
    I1222 23:08:28.752959 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 98%
  
    I1222 23:08:28.752959 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 99%
  
    I1222 23:08:28.753459 vendor/github.com/ethereum/ethash/ethash.go:291] Generating DAG: 100%
  
    I1222 23:08:28.753459 vendor/github.com/ethereum/ethash/ethash.go:276] Done generating DAG for epoch 0, it took 25.0043ms
  
    Welcome to the Geth JavaScript console!

instance: Geth/v1.5.3-stable-978737f5/windows/go1.7.3
  
coinbase: 0x057c86cae703b08c59fa6a9f066dbcc241da52a7
  
at block: 6 (Thu, 22 Dec 2016 22:58:56 PST)
   
datadir: C:\Users\beej1\AppData\Roaming\Ethereum\beejnet
   
modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 shh:1.0 txpool:1.0 web3:1.0

> I1222 23:12:12.999058 miner/worker.go:542] commit new work on block 8 with 0 txs & 0 uncles. Took 0s
    
> I1222 23:12:12.999559 miner/worker.go:542] commit new work on block 8 with 0 txs & 0 uncles. Took 0s
    
> I1222 23:13:13.817780 miner/worker.go:344] 🔨 Mined block (#8 / 7d659f91). Wait 5 blocks for confirmation
    
> I1222 23:13:13.818278 miner/worker.go:542] commit new work on block 9 with 0 txs & 0 uncles. Took 497.4µs
    
> I1222 23:13:13.818777 miner/worker.go:542] commit new work on block 9 with 0 txs & 0 uncles. Took 0s
    
> I1222 23:14:10.930228 miner/worker.go:344] 🔨 Mined block (#9 / b076ded1). Wait 5 blocks for confirmation
> 
> [/crayon] 

### saving &#8220;greeter&#8221; sample smart contract to your blockchain

now we can jump into the [greeter hello world sample][5]

  1. save this to `greeter.js`
  
    [crayon]
  
    var _greeting = &#8220;Hello World!&#8221;
  
    var greeterContract = web3.eth.contract(greeterCompiled.greeter.info.abiDefinition);</p> 
    var greeter = greeterContract.new(_greeting,{from:web3.eth.accounts[0], data: greeterCompiled.greeter.code, gas: 300000}, function(e, contract){
  
    if(!e) {
    
    if(!contract.address) {
      
    console.log(&#8220;Contract transaction send: TransactionHash: &#8221; + contract.transactionHash + &#8221; waiting to be mined&#8230;&#8221;);
    
    } else {
      
    console.log(&#8220;Contract mined! Address: &#8221; + contract.address);
      
    console.log(contract);
    
    }
  
    }
  
    })
  
    [/crayon]

  2. fire that greeter.js which compiles the greeter contract and send it off to be committed to your blockchain via: `loadScript("greeter.js")` 
      * expecting output:
  
        [crayon]
  
        I1222 23:58:58.069301 internal/ethapi/api.go:1045] Tx(0x293ae70fcfaa52d875cbc8fb72937da69983724016321eea944eda2b1a87732b) created: 0xec99e07dc19d075761456f8c33558ba2148eb048
  
        Contract transaction send: TransactionHash: 0x293ae70fcfaa52d875cbc8fb72937da69983724016321eea944eda2b1a87732b waiting to be mined&#8230;
  
        [/crayon]
  3. <span class="hl">again, sit and twiddle your thumbs for an excruciatingly long time (7 minutes for me!?!?)&#8230; and hopefully you eventually see output</span>
  
    [crayon]
  
    Contract mined! Address: 0xec99e07dc19d075761456f8c33558ba2148eb048
  
    [/crayon]
  4. now we finally get to do: `greeter.greet()` 
      * expected output
  
        [crayon]
  
        &#8220;Hello World!&#8221;
  
        [/crayon]

&nbsp;

## Fun next steps&#8230;

### 1. Get BlockApps Strato rolling

  * Strato<sup id="fnref-1457-strato"><a href="#fn-1457-strato" class="jetpack-footnote">4</a></sup> is a convenient REST API layer on top of raw Ethereum
  
    > Each BlockApps node exposes a RESTful api to interact with the node. This allows you to deploy contracts/publish transactions with simple REST calls. Bloc-server also generates a REST api for each smart contract you deploy with it. This allows for a clean separation from your dapps frontend and smart contracts 

  * [Solidity extension for Visual Studio][6] has an nicely easy run through on setting up BlockApps</p> 
  * [BlockApps Strato GitHub Readme][7] is also short install guide with the following steps

  1. install nodeJS / npm via: `choco install nodejs`
  2. `npm install -g blockapps-bloc`
  3. test your Ethereum dev net apiUrl is listening: `curl http://localhost:8545`, expecting output: `{"jsonrpc":"2.0","error":{"code":-32600,"message":"EOF"}}`
  4. create a fresh BlockApps project&#8230; 
      1. CD into PARENT directory of your new project folder
      2. `block init` and follow the prompts &#8211; the Visual Studio extension link has nice screenshots
      * you be prompted for &#8220;blockchain profile&#8221;, select the default &#8220;strato-dev&#8221;&#8230; [explained here a little][8]
      1. then CD into your project folder
      2. `bloc genkey` &#8211; will prompt for password and create initial &#8220;admin&#8221; user, expecting output: `transaction successfully mined!`
  5. `bloc start` fires up the Strato server listening for REST requests, expecting output:
  
    [crayon]
  
    bloc is listening on http://0.0.0.0:8000
  
    api is pointed to http://localhost:8545 with profile strato-dev
  
    [/crayon]</p> 
      * _that&#8217;s pretty cool we&#8217;re running on top of our own custom dev net_
  6. (open yet another CMD window) `curl "http://localhost:8000/users"`, expecting: `["admin"]`
  7. continue on with the guides&#8230;
  8. particularly [this Ether transfer example][9] 
      * tip, `curl "http://localhost:8000/users/admin"` yields the necessary user address number
      * sample transfer: `curl -X POST -d "password=ann0ying&toAddress=39b32d2be0c29c1011f7d1481f945b9d355cae96&value=10" http://localhost:8000/users/admin/a962a8e09ae6a096258d988588f2e8639cd2a664/send`
      * ran into this error: `{"errorTags":["transactionResult","submitTransaction","Transaction"],"message":"txHash must be a hex string (got: [object Object])"}`
      * [only mention of this kind of error i&#8217;ve found so far has no response][10]
      * i got node.exe JS file breakpoints working in Visual Studio 2015&#8230; a little tricky because bloc &#8220;spawn&#8221;s the main web listener as child process&#8230; so basically tweak this `%appdata%\npm\node_modules\blockapps-bloc\bin\main.js` line as so `var server = spawn('node', ['--debug-brk=5859', 'app.js' ]);` and follow this [VS guide][11]
      * debugging showed me the underlying error back from ethereum is `missing request id`&#8230; which i ran across firing basic curl requests at ethereum when i left out {&#8220;id&#8221;: number} on my curl calls&#8230; so i hacked that into the source `{myProj}\node_modules\blockapps-js\js\Transaction.js` but then&#8230; 
      * the next error i&#8217;m stuck on now is `The method _ does not exist/is not available`&#8230; _so something is off_
      * even though Strato is basically happy with my Ethereum install enough to execute the new user APIs no problem
      * i posted [issue on their forum][12]&#8230; 
      * [update 2016-12-24] not only did support respond promptly next day but it was [Kieren James-Lubin][13] (kjameslubin) the founder no less! turns out, quote: &#8220;<span class="hl">You must run a Strato node to be able to use bloc. No other Ethereum client supports it</span>&#8230; You can use strato-dev4.blockapps.net:9000 or launch one from the Azure market place or contact us at hello@blockapps.net to install.&#8221;&#8230; so, that is welcome clarity straight from the horse&#8217;s mouth&#8230; a rare luxury that i am grateful for on this christmas eve&#8230; we&#8217;ll hop over to those other options &#8230; and the adventure continues&#8230; 🙂

&nbsp;

### 2. get cracking on some real DAPPs!!

  * [comprehensive guide][14]

&nbsp;

## Handy References

  * [BlockApps Strato full REST API][15]

<li id="fn-1457-guide2">
  another short and sweet private network <a href="http://vanderwijk.info/blog/getting-started-ethereum/">getting started guide that filled in several blanks for me</a>&#160;<a href="#fnref-1457-guide2">&#8617;</a>
</li>
<li id="fn-1457-geth_CLI">
  all the <a href="https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options">geth CLI options</a>&#160;<a href="#fnref-1457-geth_CLI">&#8617;</a>
</li>
<li id="fn-1457-guide1">
  good <a href="http://ethereum.stackexchange.com/a/2787">getting started guide with troubleshooting tips</a>&#160;<a href="#fnref-1457-guide1">&#8617;</a>
</li>
<li id="fn-1457-strato">
  <a href="http://ethereum.stackexchange.com/questions/9905/whats-the-real-value-in-using-blockapps-strato">What&#8217;s the real value in using BlockApps Strato?</a>&#160;<a href="#fnref-1457-strato">&#8617;</a> </fn></footnotes>

 [1]: https://ethereum.org/cli
 [2]: https://geth.ethereum.org/downloads/
 [3]: https://github.com/ethereum/webthree-umbrella/releases
 [4]: https://chocolatey.org/
 [5]: https://ethereum.org/greeter
 [6]: https://blogs.msdn.microsoft.com/caleteet/2016/04/01/solidity-integration-with-visual-studio/
 [7]: https://github.com/blockapps/bloc
 [8]: https://www.npmjs.com/package/blockapps-js#blockapps-profiles
 [9]: http://www.blockapps.net/dashboard/quick-starts/bloc-keyserver
 [10]: https://github.com/blockapps/issues/issues/6#issuecomment-225995947
 [11]: https://github.com/Microsoft/nodejstools/issues/197#issuecomment-113581676
 [12]: http://forums.blockapps.net/#!/issues:ethereum-error-on-private-d
 [13]: https://www.linkedin.com/in/kjameslubin
 [14]: https://medium.com/@ConsenSys/a-101-noob-intro-to-programming-smart-contracts-on-ethereum-695d15c1dab4#.ezop8r22z
 [15]: http://blockapps.net/documentation#get-addresses