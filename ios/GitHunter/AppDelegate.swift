import UIKit
import React
import React_RCTAppDelegate

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    guard let jsBundleURL = bundleURL() else {
        fatalError("Could not find JS bundle URL")
    }
    let rootView = RCTRootView(
        bundleURL: jsBundleURL,
        moduleName: "GitHunter",
        initialProperties: nil,
        launchOptions: launchOptions
    )
    
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    
    window = UIWindow(frame: UIScreen.main.bounds)
    window?.rootViewController = rootViewController
    window?.makeKeyAndVisible()
    
    return true
  }
  
  func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
