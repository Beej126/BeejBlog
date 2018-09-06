---
title: 'Syncfusion Xamarin.Forms SfDataGrid – Binding to List<Dictionary<,>>'
author: Beej
type: post
date: 2017-06-23T07:34:48+00:00
year: "2017"
month: "2017/06"
url: /2017/06/syncfusion-xamarin-forms-sfdatagrid-binding-to-listdictionary.html
dsq_thread_id:
  - 5935265812
categories:
  - Uncategorized
tags:
  - Json
  - WebDev
  - Xamarin

---
[corresponding syncfusion forums post][1]

Binding to Collection<Dictionary<,>> can be accomplished but doesn't appear to be well documented... this [WPF SfDataGrid doc][2] gave the clue.

The basic trick is to set the SfDataGrid's column.MappingName = "Fields[FieldName]";
       
where Fields is a Dictionary property on your _DictionaryWrapper_ class.
<!--more-->

I couldn't get List<Dictionary<string, object>> working directly without the wrapper class "hiding" the dictionary from what I think is an SfDataGrid bug. The app crash exception call stack ultimately winds up on an invalid Linq related get_Item() call.

Below is sample working code including "SimpleTable" wrapper for List and <span class="hl">Newtonsoft type converter for deserializing Json "table" directly into this datastructure</span>... this facilitates delivery of tabular resultsets from web api's... see my [SqlClientHelpers][3].ToJson method as one implementation that works succinctly within Azure Functions for example.

FYI, I believe there is also a bug with SfDataGrid column sorting logic when bound to this kind of Dictionary, a non-fatal exception fires. I worked around by implementing grid.SortColumnsChanging.

### Sample Deserialize call:
  ```js
  var data = "[{\"Source\":\"Web\",\"Batch Id\":1}, {\"Source\":\"Manual\",\"Batch Id\":2}]";
  var table = JsonConvert.DeserializeObject<SimpleTable>(data);
  ``` 

### Binding sample with crucial MappingName syntax:
  ```js
  grid.ItemsSource = table;
  grid.Columns.Add(new GridTextColumn()
  {
    HeaderText = "Source",
    MappingName = "Vals[Source]" // **** HERE'S THE KICKER ****
  });
  ```    

### SimpleTable.cs
  ```csharp
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Text;
  using System.Threading.Tasks;
  using Newtonsoft.Json;
    
  namespace DataHelpers
  {
    [JsonConverter(typeof(DictRow_DictDeserializer))]
    public class DictRow
    {
      public Dictionary<string, object> Vals { get; set; }
      public DictRow(Dictionary<string, object> dict) { Vals = dict; }
    }
    
    public class SimpleTable : List<DictRow>
    {
      public SimpleTable(IEnumerable<DictRow> list) : base(list) { }
    }
    
    public class DictRow_DictDeserializer : JsonConverter
    {
      public override bool CanRead => true;
      public override bool CanWrite => false;
      public override bool CanConvert(Type objectType) => objectType == typeof(Dictionary<string, object>);
    
      public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
      {
        return new DictRow(serializer.Deserialize<Dictionary<string, object>>(reader));
      }
    
      public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
      {
        throw new NotSupportedException();
      }
    }
  }
  ```

 [1]: https://www.syncfusion.com/forums/125388/data-grid-mapping-to-xaml-with-list-of-dictionaries-as-the-itemssource-collection
 [2]: https://www.syncfusion.com/kb/6643/how-to-bind-dictionary-to-column-in-sfdatagrid
 [3]: https://github.com/Beej126/SqlClientHelpers