---
title: Kendo UI Nuggets
author: Beej
type: post
date: 2017-03-02T08:10:06+00:00
url: /2017/03/kendo-ui-nuggets.html
snap_isAutoPosted:
  - 1
dsq_thread_id:
  - 5596407878
snapEdIT:
  - 1
snapTW:
  - |
    s:218:"a:1:{i:0;a:8:{s:9:"timeToRun";s:0:"";s:9:"msgFormat";s:27:"%TITLE%
    %URL%
    
    %EXCERPT%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:2:"do";i:0;}}";
categories:
  - Uncategorized
tags:
  - WebDev

---
### Grid doesn&#8217;t like spaces in dataSource field names

(_I happen to be subscribing to KnockoutJS observable here to receive data feed but that naturally depends on your framework of choice._)
  
Typical Kendo JS error: `invalid template`
  
Particularly note the way the columns property is generated.
  
[crayon toolbar=&#8221;always&#8221; lang=&#8221;js&#8221;]
  
sigCapVm.packingSlips.subscribe(function (newval) {
      
var gridPackingSlips = $(&#8220;#gridPackingSlips&#8221;);
      
var kgrid = gridPackingSlips.data(&#8220;kendoGrid&#8221;);
      
if (kgrid && kgrid.columns.length) kgrid.dataSource.data(newval);
      
else {
          
if (kgrid) kgrid.destroy();
          
gridPackingSlips.kendoGrid({
              
//workaround for autogenerating columns with spaces
              
//from: http://www.telerik.com/forums/field-name-with-space-and-other-than-numeric-creating-issues-to-load-the-grid#23fk8zzWZkioYCn7Tr4xFg
              
columns: $.map(Object.keys(newval.length === 0 ? {} : newval[0]),
                  
function (el) {
                      
if (el.startsWith(&#8220;_&#8220;)) return; //by convention, don&#8217;t show fields starting with &#8220;_&#8221;
                      
return { field: &#8216;[&#8220;&#8216; + el.replace(&#8220;#&#8221;, &#8220;&#92;#&#8221;) + &#8216;&#8221;]&#8217;, title: el }
                  
}), //hash aka pound (#) is special character in kendo template syntax
              
dataSource: { data: newval },
              
noRecords: { template: &#8220;no records found for those inputs&#8221; },
              
height: &#8220;20em&#8221;,
              
change: function (e) {
                  
//good to remember that we&#8217;re not doing a true knockout binding here vs setting the grid&#8217;s dataSource.data property above
                  
//so we have to &#8220;manually&#8221; connect the selected row back to the viewmodel here
                  
var selectedPackingSlip = e.sender.dataItem(e.sender.select());
                  
var vm = ko.contextFor(gridPackingSlips[0]).$root;
                  
vm.selectPackingSlipId(selectedPackingSlip._PackingSlipId);
              
},
              
resizable: true,
              
//scrollable: false,
              
sortable: true,
              
filterable: false,
              
selectable: true
          
});
      
};
  
});
  
[/crayon]