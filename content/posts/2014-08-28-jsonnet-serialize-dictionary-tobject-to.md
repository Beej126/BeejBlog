---
title: 'Json.Net Serialize Dictionary<Tkey, Tobject> to List<Tobject>'
author: Beej
type: post
date: 2014-08-28T10:37:00+00:00
url: /2014/08/jsonnet-serialize-dictionary-tobject-to.html
blogger_bid:
  - 7726907200224433699
blogger_blog:
  - www.beejblog.com
blogger_id:
  - 4606275759437963004
blogger_author:
  - g108832383968142578199
blogger_permalink:
  - /2014/08/jsonnet-serialize-dictionary-tobject-to.html
dsq_thread_id:
  - 5513736403
categories:
  - Uncategorized
tags:
  - Json

---
Motivation: Wanted convenience of a Dictionary on the server side MVC controller (for some key look-up based logic), yet send the same list of objects down to Knockout Ajax client, which most readily consumes lists as Javascript object arrays.

Could've just exposed the List<Object> as another property but wanted to see if I could roll it all into one property just to learn a little more about the Json.Net API.Nice that Json.Net's tokenization framework has already abstracted away from specific types within the overridden method scope on custom JsonConverter class, so this approach generically handles \*any\* Dictionary<object, object> without any additional effort.

<pre class="prettyprint linenums lang-cs">using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace YouNameIt {

  using CartItemDict = Dictionary<long, CartItemDto>;

  //reverse of this: http://stackoverflow.com/questions/24759181/deserializing-a-json-dictionaryint-customtype-to-listcustomtype
  //adapted from here: http://james.newtonking.com/json/help/index.html?topic=html/CustomJsonConverter.htm
  public class DictToListConverter : JsonConverter
  {
    public override bool CanConvert(Type objectType)
    {
      return objectType == typeof (Dictionary<object, object>);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
      throw new NotImplementedException();
    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
      var t = JToken.FromObject(value);

      if (t.Type != JTokenType.Object)
      {
        t.WriteTo(writer);
      }
      else
      {
        var o = (JObject) t;
        var values = o.Properties().Select(p => p.Value).ToList();
        (new JArray(values)).WriteTo(writer);
      }
    }
  }

  public class CartDto
  {
    [JsonConverter(typeof(DictToListConverter))]
    public CartItemDict Items { get; set; }

    [DataType(DataType.Currency)]
    public decimal TotalPrice { get; private set; }
  }

  public class CartItemDto : VariantDto
  {
    public long CartItemId { get; private set; }
    public int Quantity { get; private set; }

    [DataType(DataType.Currency)]
    public decimal UnitPrice { get; private set; }
    [DataType(DataType.Currency)]
    public decimal LinePrice { get; private set; }

    private List _addons;
    public List Addons { get { return _addons ?? (_addons = new List()); } }
  }
}
</pre>