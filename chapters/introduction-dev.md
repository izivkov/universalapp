### Introduction ###

This is a simple hybrid mobile application allowing users to define its functionality by only manipulating its backing Google Spreadsheet. It is basically a container for one or more "sheet apps" created with Google Sheets. Instead of a traditional database for the back-end, it uses [Google Sheets](https://www.google.ca/sheets/about) to store data, content, behaviour and styling information. The app can keep a list of Google Sheets and switch between them, in effect switching to a different app. 

Some examples of applications which can be created are:

- Stock Portfolio
- Weather App
- Company Web Sites
- Various RSS Feeds

Here are some screenshots of sample applications which can be created:

<img src="https://sites.google.com/site/universalappstoreclassic/documentation/imgs/sample-app.png" alt="Drawing" width="200"/> <img src="https://sites.google.com/site/universalappstoreclassic/documentation/imgs/sample-app-1.png" alt="Drawing" width="200"/> <img src="https://sites.google.com/site/universalappstoreclassic/documentation/imgs/sample-app-2.png" alt="Drawing" width="200"/> <img src="https://sites.google.com/site/universalappstoreclassic/documentation/imgs/sample-app-3.png" alt="Drawing" width="200"/>

A lot of the logic for the app can be implemented in the Google Sheets through sheet formulas, referring to oher sheets for the data, [scripting](https://developers.google.com/apps-script/overview), etc.

#### Why was this app created? ####

I am often asked to develop apps which basically have very similar functionality: 

 - A few tabs, like Main Screen, About and Contact
 - From the Main tab, the user can click on a button, or select someting, and is sent to another screen with some detailed information based on the his/her selection.
 - The second screen contains some HTML, images or videos.
 - The screens for different apps look differently from each other, so each app has its own styling applied to it.

This gave me the idea to generilize this functionality into a data-driven app. As part of the data, we should also provide styling information and screen layout. This functiality can be encapsulated into a Google Sheet, which is easy to edit by the user. In addition, we can apply some sheet function and Google Scripts to the Google sheet to provide additional functionality.

The second reason for creating this app is so I can learn Typescript and Angular 2/4.

You can get the Android app from the [Google Play store](https://play.google.com/store/apps/details?id=org.avmedia.universalapp).

