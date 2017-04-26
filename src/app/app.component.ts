import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { Tabs } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = Tabs;
  buttons: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault(); // use provided instances instead, dependency injection rules!
      splashScreen.hide();
    });
  }

  ngOnInit() {
  }
}
