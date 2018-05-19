---
title: Light Custom Configuration Section
author: Beej
type: post
date: 2013-07-06T03:27:00+00:00
url: /2013/07/light-custom-configuration-section.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 172384232694016442
blogger_author:
  - g108669953529091704409
blogger_permalink:
  - /2013/07/light-custom-configuration-section.html
dsq_thread_id:
  - 5541558754
categories:
  - Uncategorized
tags:
  - .Net

---
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Configuration;
    
    namespace WebServiceClient
    {
        /*URLElement class below represents a bundle of properties (URL, password, etc) for each endpoint we need to send to... 
    
        And the following custom app.configuration section allows us to maintain a list of these URLElements. 
        copied from here: http://www.abhisheksur.com/2011/09/writing-custom-configurationsection-to.html 
        and here: http://stackoverflow.com/questions/1755421/c-sharp-appsettings-is-there-a-easy-way-to-put-a-collection-into-appsetting 
        The basic gist is 3 fairly light implementation classes -- 
        URLElement = individual elements, URLCollection = collection of elements, and URLSection = new custom app.config section. 
        */
        public class URLSection : ConfigurationSection
        {
            //nugget: it seems that the [ConfigurationProperty()] attribute does not work on a static property (maybe that's true for all attributes??), 
            //so the _URLs *instance* propery satisfies this attribute requirement, but made it private since don't plan on using it directly. 
            //then exposing the URLs collection as a public *static* property. 
            //this rigamarole merely allows for the slighty more succint "URLSection.URLs" from the calling code rather than "URLSection.urlSection.URLs" 
            public static URLCollection URLs { get { return _urlSection._URLs; } }
    
            [ConfigurationProperty("URLs")]
            private URLCollection _URLs { get { return this["URLs"] as URLCollection; } }
            private static readonly URLSection _urlSection = ConfigurationManager.GetSection("URLSection") as URLSection;
        }
    
        //nugget: the xml tag name of the element level nodes must be "" by default 
        //to change to something else, it looks like one must implement a few more overrides like the ElementName & ConfigurationElementCollectionType properties. 
        //leaving it as the default seems just fine for current needs. 
        public class URLCollection : ConfigurationElementCollection
        {
            public URLElement this[int index] { get { return (URLElement)BaseGet(index); } }
            protected override ConfigurationElement CreateNewElement() { return new URLElement(); }
            protected override object GetElementKey(ConfigurationElement element) { return ((URLElement)(element)).Name; }
        }
    
        public class URLElement : ConfigurationElement
        {
            [ConfigurationProperty("Name", IsKey = true, IsRequired = true)]
            public string Name
            {
                get { return (string)this["Name"]; }
                set { this["Name"] = value; }
            }
    
            [ConfigurationProperty("Url", IsRequired = true)]
            public string Url
            {
                get { return (string)this["Url"]; }
                set { this["Url"] = value; }
            }
    
            [ConfigurationProperty("ContextID", IsRequired = true)]
            public string ContextID
            {
                get { return (string)this["ContextID"]; }
                set { this["ContextID"] = value; }
            }
    
            [ConfigurationProperty("Password", IsRequired = true)]
            public string Password
            {
                get { return (string)this["Password"]; }
                set { this["Password"] = value; }
            }
    
            [ConfigurationProperty("IgnoreWebServiceException", DefaultValue = false)]
            public bool IgnoreWebServiceException
            {
                get { return (bool)this["IgnoreWebServiceException"]; }
                set { this["IgnoreWebServiceException"] = value; }
            }
    
        }
    
    }