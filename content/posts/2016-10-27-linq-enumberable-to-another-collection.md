---
title: Linq Enumerable to another Collection
author: Beej
type: post
date: 2016-10-28T04:23:34+00:00
year: "2016"
month: "2016/10"
url: /2016/10/linq-enumberable-to-another-collection.html
snapEdIT:
  - 1
snapTW:
  - 's:162:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5516896536
categories:
tags:
  - Json
  - Linq

---
given devices is an IEnumberable<>

    var nvc = devices.Aggregate(new NameValueCollection(), (seed, current) => { seed.Add("device", current.Id.ToString()); return seed; });
    

Json Array of objects to Dictionary, keyed (indexed) on chosen property

    using Json.Net; //Newtonsoft
    using Json.Net.Linq;
    
    public class Device {
      public int Id {get; set;}
      public string Name {get; set;}
      public string Property {get; set;}
    }
    
    var json = @"[{id: 1, name: ""name1"", prop: ""prop1""}, {id: 2, name: ""name2"", prop: ""prop""}]";
    
    var devicesDictionary = JArray.Parse(json).ToDictionary( i=>i["id"].Value<int>(), i=>i.ToObject<Device>() );