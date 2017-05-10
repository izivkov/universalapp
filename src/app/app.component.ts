import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { Network } from "@ionic-native/network";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { Tabs } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = Tabs;
  buttons: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private network: Network,
    private alertCtrl: AlertController) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkNetwork();
    });
  }

  ngOnInit() {
  }

  checkNetwork() {
    if (this.network.type === 'none') {
      let alert = this.alertCtrl.create({
        title: "No Connection!",
        subTitle: "Please connect to network and try agian.",
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              navigator['app'].exitApp(); 
            }
          }]
      });
      alert.present();
    }
  }
}
