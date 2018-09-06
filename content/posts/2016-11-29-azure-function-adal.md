---
title: 'Exposing Azure Function web API to native & web clients through Azure AD authentication'
author: Beej
type: post
date: 2016-11-29T08:44:13+00:00
year: "2016"
month: "2016/11"
url: /2016/11/azure-function-adal.html
snapEdIT:
  - 1
snapTW:
  - 's:289:"a:1:{i:0;a:10:{s:2:"do";s:1:"1";s:10:"SNAPformat";s:15:"%TITLE% - %URL%";s:8:"attchImg";s:1:"1";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:4:"doTW";s:1:"1";s:11:"isPrePosted";s:1:"1";s:8:"isPosted";s:1:"1";s:4:"pgID";s:18:"804437431785168897";s:5:"pDate";s:19:"2016-12-01 21:30:07";}}";'
dsq_thread_id:
  - 5511007699
categories:
  - Uncategorized
tags:
  - Azure
  - Security
  - WebDev
  - Xamarin

---
### Problem Statement

Azure AD writeups are prevalent but I was really struggling to find examples of calling the same Azure Function API, secured by Azure AD Authentication, by <u>both Native as well as Web clients</u> (_since we can only select one app type in the Azure AD App registration, not both_).

### TL;DR

The kicker solution for me was having both a web and native App registration (i.e. two Client Id's) and providing the WEB App registration's Application Id as the "RESOURCE" parameter to the AuthenticationContext.AcquireTokenAsync() call in the Native app (see [code sample][1] below).

So the web registration is tied directly to the Azure Function... and then we're piggybacking the web registration by requesting the web as the resource parameter in the native client call ... i haven't seen this documented yet so i can't say whether this is an officially preferred solution.

### Basic Steps

My notes on top of this [getting started guide][2]:

  1. get your Azure Function working as a web api... probably doesn't matter whether web or native comes first but it seems like the web is more "trusted" from an OAuth standpoint and more clearly documented... OAuth refers to native clients as "public" and requiring a couple more OAuth contortions than web clients.
  2. create a <u>Web type</u> entry for your Function under `New Portal > Azure Active Directory > App registrations`... all the defaults are good, except you'll need to create the Reply URLs that are valid for you... reply url is a parameter to your ADAL.js client call... in the end this entry provides the crucial <u>Application Id aka Client Id</u>
  3. now configure this web registration for AD Auth via `New Portal > App Services > {your Function app} > Function app settings > Configure authentication > Authentication Providers > Azure AD > Express >`
      1. `Azure AD App` = the Web App registration name you gave above
  4. Now create another Azure AD > App registration as <u>Native type</u> and <span class="HL">(HERE'S THE KICKER) > Settings > Required Permissions > Add > Select an API > <u>TYPE IN YOUR web App registration name in the search box</u> and it'll show up to be selected</span>
  5. finally, use the Application Id guid from your web app as the RESOURCE parameter to the AcquireTokenAsync() call in your native app 

### Working ADAL.js web client code sample

```js
function adalResultHandler(err, token) {
  if (err) {
    self.userName(null);
    lobibox.notify("error", { size: "mini", title: "Azure AD Auth", msg: err });
    return false;
  } else {
    self.userName(adal.getCachedUser().profile.name);
    //lobibox.notify("info", { size: "mini", msg: "login successful\nuser: " + user.profile.name + "\ntoken: " + token });
    return true;
  }
}

var adal = new AuthenticationContext({
  instance: "https://login.microsoftonline.com/",
  tenant: "{your domain}.onmicrosoft.com",
  clientId: "{your web guid}", // your Azure AD > App registrationS > {your web api} > APPLICATION ID
  //NUGGET: these "reply URLs" are set under Azure Portal > AD > App registrations > {your App Service} > Settings > Reply URLs
  //NOT under {your App Service} > Settings > (Manage) Auth > AD > Redirect URLs !!!
  redirectUri: window.location.href, //REPLACE WITH YOUR REDIRECT URL
  popUp: true
});

adal.callback = function (err, token) { if (adalResultHandler(err, token)) doSomething(); }

adal.login();
```    

<a name="nativeCodeSample"><i class="fa fa-anchor"></i></a>

### Working Xamarin Native iOS app client code sample
```js
private const string Instance = "https://login.microsoftonline.com";
private const string Tenant = "{your domain}.onmicrosoft.com"; //common //COMMON OR YOUR TENANT ID // "hfcazure.com", //"4be68759-0968-4760-b716-f82711a28fcb", //http://stackoverflow.com/questions/26384034/how-to-get-the-azure-account-tenant-id
private const string ClientId = "{your native guid}"; //from your Azure AD > App registrations > {your ***NATIVE*** api} > APPLICATION ID
private const string RedirectUri = "https://{your azure function api name}.azurewebsites.net";
private const string ResourceId = "{your web guid}"; //take this from your Azure AD > App registrations > {your ***WEB*** api} > APPLICATION ID // **isn't that interesting, we're requesting another API as the "resource" of this api**

var Azure_OAuth2_Authority_Url = $"{Instance}/{Tenant}/oauth2/authorize");
var authContext = new AuthenticationContext(Azure_OAuth2_Authority_Url);

var authResult = await authContext.AcquireTokenAsync(ResourceId, ClientId, new Uri(RedirectUri), await _platformParameters.GetAsync()); //_platformParameters is something i whipped up special
CurrentUser = new HfcUserAuth
{
  FirstName = authResult.UserInfo?.GivenName,
  LastName = authResult.UserInfo?.FamilyName,
  AccessToken = authResult.AccessToken,
  IdToken = authResult.IdToken
};
```    

### Typical error responses

Various attempts at sussing out a valid _resource_ value for the AcquireTokenAsync() in my Xamarin Forms native iOS app would yield the following error:
          
`AADSTS65005: The client application has requested access to resource <xyz>. This request has failed because the client has not specified this resource in its requiredResourceAccess list`

i was also getting these where {app} was the resource i was passing when i had the ClientId parameter wrong
          
`AADSTS50001: The application named {app} was not found in the tenant named {tentant}.`

### Helpful references

  * [Mat Velloso's Troubleshooting common Azure Active Directory Errors][3]
  * MSFT's offcial Azure AD docs &#8211; [Authentication Scenarios for Azure AD][4]
  * [GitHub Azure Samples &#8211; ADAL.js][5]
  * [ADAL client "Developer Portal" guides][2]
  * have to mention [Vittorio Bertocci's blog][6] as a primary internal MSFT source of ADAL progress

### What is my Tenant Id or "Authority" URL ???

Wanted to mention this in closing since "Tentant" is currently so ambiguously referred to in the documentation i ran into...
  
New Portal > Azure Active Directory > App registrations > Endpoints is where you pull the "Authority" Url from the "OAUTH 2.0 AUTHORIZATION ENDPOINT" slot &#8211; the main argument for `new AuthenticationContext()`

for example:
          
`https://login.windows.net/9198d419-6ce5-4229-a457-8c38421f7466/oauth2/authorize`
  
this "9198..." guid is your <u>Tenant Id</u> (don't worry this one is made up)

our tenant appears to be simply our azure ad domain name, at least in typical configurations... so this works here as well:
          
`https://login.windows.net/XYZ.onmicrosoft.com/oauth2/authorize`

![image][7]

 [1]: #nativeCodeSample
 [2]: https://identity.microsoft.com/Docs/Web
 [3]: http://www.matvelloso.com/2015/01/30/troubleshooting-common-azure-active-directory-errors/
 [4]: https://docs.microsoft.com/en-us/azure/active-directory/active-directory-authentication-scenarios#web-application-to-web-api
 [5]: https://github.com/Azure-Samples/active-directory-javascript-singlepageapp-dotnet-webapi
 [6]: http://www.cloudidentity.com/blog/2015/02/19/introducing-adal-js-v1/
 [7]: https://cloud.githubusercontent.com/assets/6301228/20546192/912bad5c-b0c8-11e6-8243-1f8cdc8a0ef5.png