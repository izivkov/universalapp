### Environment

Since this app was developed on the [ionic](http://ionicframework.com/) framework, follow [these](https://ionicframework.com/docs/intro/installation/) instructions to setup your environment.

As IDE, we used the [Microsoft Visual Code](https://en.wikipedia.org/wiki/Visual_Studio_Code) tool, which works really well with TypeScript and Angular projects.

The app was developed under Linux, so this document may not exactly match if you are developing under another OS.

As a pre-requirement you need to have insatlled the Java SDK and Android SDK. You can get the Android SDK from [here](https://developer.android.com/studio/index.html#downloads). 

At a minimum, you must have the following android SDK packages installed:

      Path                 | Version | Description                  | Location
      -------              | ------- | -------                      | -------
      build-tools;19.1.0   | 19.1.0  | Android SDK Build-Tools 19.1 | build-tools/19.1.0/
      platform-tools       | 25.0.4  | Android SDK Platform-Tools   | platform-tools/
      tools                | 26.0.1  | Android SDK Tools 26.0.1     | tools/

You also need [gradle 3.5](https://gradle.org/install).

Now install ionic and cordova:

    npm install -g ionic cordova

Then clone the git repository:

    git clone https://github.com/izivkov/UniversalApp.git

This will check out the code in a folder UniversalApp.

    cd UniversalApp
    npm install
    mkdir www
    ionic platform add android
    ionic build android
    
Now in directory 
      
      [ROOT-OF-PROJECT]/platforms/android
      
you can run:

      gradle build

You can try the app in your browser. From the root directory of you project enter:

      ionic serve
      
... and point your browser to **localhost:8100**

To build the APK, change directory to:

		[ROOT-OF-PROJECT]/platforms/android

and enter:

    gradle wrapper
    ./gradlew build

A debug and a release APKs will be generated into directory:

    [ROOT-OF-PROJECT]/platforms/android/build/outputs/apk
    
