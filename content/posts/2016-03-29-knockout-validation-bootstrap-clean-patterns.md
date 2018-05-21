---
title: Knockout-Validation lib – clean patterns
author: Beej
type: post
date: 2016-03-29T07:14:12+00:00
url: /2016/03/knockout-validation-bootstrap-clean-patterns.html
snapEdIT:
  - 1
snapTW:
  - 's:162:"a:1:{i:0;a:6:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";}}";'
dsq_thread_id:
  - 5624168471
categories:
  - Uncategorized
tags:
  - Knockout

---
## [Knockout-Validation on GitHub][1]

## which also leverages the [jQueryValidation lib][2]

## All Bootstrap v3 compatible

### Coolest architectural nugget = applying validation rules to VM observables (not inside HTML <input> markup)

one clear reason why that is a better way -> when the VM field is bound to multiple UI points, you only define the rule once vs many

    var myVM = function() {
    
        var self = {};
    
        // simple required
        self.orderId = ko.observable().extend({ required: true });
    
        // conditionally required
        self.orderId = ko.observable().extend({ required: { onlyIf: self.isDelivery } });
    
        // required with field name in error message - LUVIN HOW SIMPLE THIS IS!
        self.orderId = ko.observable().extend({ required: "Order#" });
    
        // conditionally required with fieldname
        self.orderId = ko.observable().extend({ required: { params: "Order#", onlyIf: self.isDelivery } });
    
        return self;
    }();
    

see the wiki for all [Native][3] and [User Contributed][4] rules available OOB.
  
&nbsp;
  
above _field name in error message_ examples require the following global rule.message tweak...

### overriding default error messages

\*\* must execute BEFORE all observable.extend definitions on your VM \*\*

    ko.validation.rules["required"].message = "{0} required";
    

### HTML sample &#8211; basic knockout data-bind'ing (in case you're new : )

    <input type="text" class="form-control" placeholder="Order Id" data-bind="value: orderId">
    

### HTML sample &#8211; summary error block

    <div data-bind="visible: validation.isAnyMessageShown()" class="bg-danger errorGroup">please enter required fields</div>
    

![][5]

### &nbsp;

### summary with errors listed

    <ul data-bind="visible: validation.isAnyMessageShown(), foreach: validation" class="bg-danger errorGroup">
        <li data-bind="text: $data"></li>
    </ul>
    

![][6]

### &nbsp;

### initialization

    ko.validation.init({
        errorElementClass: "error", //apply this to the <input> elements, see css... Bootstrap provides .has-error but it must be applied to the <input>'s parent element which requires extra cruft for ko.validation to play along... i prefer this simple approach
        decorateInputElement: true, //in tandem with above
        insertMessages: false //i prefer errorElementClass bringing minimal attention to each field and then bundled error message summary elsewhere
    });
    

### clear error boxes when blanking out properties (e.g. after a save)

    self.validation.showAllMessages(false);
    

### gotta have a handy isValid right?

\*\* must execute AFTER all observable.extend definitions on your VM \*\*

    self.validation = ko.validation.group(self);
    self.isValid = function () {
        self.validation.showAllMessages();
        return self.validation().length === 0;
    }
    return self;
    

Usage

    self.saveMe = function() {
      if (!self.isValid()) return;
      ...
    }
    

### CSS for comprehensiveness ( < word?)... completeness? arrrg what is the phrase that pays here (alternative languages welcome : )

    .error {
        border-color: #a94442;
    }
    
    .errorGroup {
        margin-top: 10px;
        padding: 5px;
        border-radius: 5px;
        text-align: initial;
    }
    .errorGroup li {
        margin-left: 15px;
    }

 [1]: //github.com/Knockout-Contrib/Knockout-Validation
 [2]: //jqueryvalidation.org
 [3]: //github.com/Knockout-Contrib/Knockout-Validation/wiki/Native-Rules
 [4]: //github.com/Knockout-Contrib/Knockout-Validation/wiki/User-Contributed-Rules
 [5]: //2.bp.blogspot.com/-yKkGXImQPUc/VvopVrs80SI/AAAAAAAATAY/oeGM74Jb5usr163bDvso660ho-dV9lIKQ/s1600/Snap2.png
 [6]: //4.bp.blogspot.com/-nck4OshdQSQ/VvrGmZi7L5I/AAAAAAAATAs/63JSYNDeyYMvqzqhSJTHfhCw22hXpfoiQ/s1600/Snap3.png