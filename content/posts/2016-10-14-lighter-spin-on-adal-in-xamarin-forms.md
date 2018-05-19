---
title: Lighter Spin on ADAL in Xamarin Forms
author: Beej
type: post
date: 2016-10-14T23:45:54+00:00
url: /2016/10/lighter-spin-on-adal-in-xamarin-forms.html
dsq_thread_id:
  - 5515883840
categories:
  - Uncategorized
tags:
  - Azure
  - Security
  - Xamarin

---
# tl;dr

new-up the elusive &#8220;PlatformParameters&#8221; in your AppDeligate.cs::FinishedLoading / MainActivity.cs::OnCreate
  
&nbsp;

# ts;wm (too short; want more ; )

thankfully we have solid writeups on ADAL with XF&#8230; this post is just me trying to boil it down to essence and PCL as much as possible&#8230;
  
(BTW: ADAL = Active Directory Auth Lib&#8230; i needed it for PowerBI embedding)

  1. <http://www.appzinside.com/2016/02/22/implement-adal-for-cross-platform-xamarin-applications/>
  2. <https://blog.xamarin.com/authenticate-mobile-apps-using-microsoft-authentication-library/>

the first post keeps the platform specific surface area pretty minimal but also winds up wrappering the stock ADAL classes quite a bit&#8230;
  
the second post seems pretty minimal and leverages CustomRenderers for the right timing to grab this context&#8230; seems like a good general trick to tuck away&#8230;
  
&nbsp;

the approach i came to is grabbing this context right up front in app initialization and then providing it through dependency injection later&#8230;
  
both pieces of that are basically one liners which feels nice
  
also it&#8217;s now conveniently available to other services should needs arise&#8230;
  
and theoretically we&#8217;ve kept things clean for TDD but honestly i don&#8217;t readily see how to test this flow since it requires interactive auth&#8230; i&#8217;ll have to read up on how people generally recommend mocking this kind of thing
  
&nbsp;

## iOS AppDeligate.cs::FinishedLoading()

      public partial class AppDelegate : Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
      {
        public override bool FinishedLaunching(UIApplication app, NSDictionary options)
        {
          Xamarin.Forms.Forms.Init();
    
          var prismApp = new App(new iOSInitializer());
          LoadApplication(prismApp);
    
          var finishedLaunchingResult = base.FinishedLaunching(app, options);
          //KeyWindow won't be populated until after FinishedLaunching
          prismApp.Container.RegisterInstance(typeof(IPlatformParameters), new PlatformParameters(UIApplication.SharedApplication.KeyWindow.RootViewController)); // ** here's the beef **
    
          return finishedLaunchingResult;
          }
      }
    

## Android MainActivity.cs::OnCreate

      public class MainActivity : Xamarin.Forms.Platform.Android.FormsAppCompatActivity
      {
        protected override void OnCreate(Bundle bundle)
        {
    
          base.OnCreate(bundle);
    
          Xamarin.Forms.Forms.Init(this, bundle);
          var prismApp = new App(new AndroidInitializer());
          LoadApplication(prismApp);
    
          prismApp.Container.RegisterInstance(typeof(IPlatformParameters), new PlatformParameters(this)); // ** here's the beef **
        }
      }
    

## then later in calling code just reference via DI

        public PowerBIService(IPlatformParameters platformParameters)
        {
          _platformParameters = platformParameters;
        }