import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ConfigService } from '../../app/config.service';
import { AppInfo } from '../../data/app-info';
import { AppInfoService } from '../../data/app-info.service';
import { RefreshService } from '../../common/refresh.service';
import { ModalController, AlertController } from 'ionic-angular';
import { AddAppPage } from './add-app';
import { Utils } from '../../common/utils';
import { Vibration } from '@ionic-native/vibration';


enum Modes {normal, selection,  information};

@Component({
  templateUrl: 'settings.html',
  providers: [AppInfoService, RefreshService, Utils, Vibration]
})

export class SettingsPage {

  modes = Modes;

  mode: Modes = Modes.normal;
  screen: any;
  errorMessage: string;
  apps: AppInfo[] = [];

  ngOnInit() {
    this.mode = Modes.normal;
    this.screen = { name: 'settings' };
    this.screen = { title: 'Settings' };
    this.getAppsInfo();
  }

  setSelectedId(index: number, selected: boolean): void {
    this.apps[index].selected = selected;
  }

  selectForDeletion(app: AppInfo) {
    if (this.mode != Modes.selection) {
      return;
    }

    app.selected = !app.selected;
  }

  deleteSelected(): void {
    this.mode = Modes.normal;
    var appsInfo: AppInfo [] = this.configService.getAppsInfo();

    for (let i = this.apps.length - 1; i >= 0; i--) {
      if (this.apps[i].selected) {
        if (appsInfo[i].sheetId === this.configService.getCurrentId()) {
          this.utils.showToast("Cannot detele current app");
          continue;
        }
        appsInfo.splice(i, 1);
        // do not break here, there could be more than one selected.
      }
    }

    this.configService.setAppsInfo (appsInfo);
    this.getAppsInfo();
  }

  showInfo (app: AppInfo): void {
    this.mode = Modes.information;

    let alert = this.alertCtrl.create({
      title: 'App Info',
      message: 'Name: <b>' + app.name + '</b><br>Author: <b>' + app.author + '</b><br>Web Page: <b>' + app.webpage + '</b><br>email: <b>' + app.email + '</b>',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }]
    });
    alert.present();
  }

  select(app: AppInfo): void {
    if (this.mode != Modes.normal) {
      return;
    }

    this.configService.setCurrentId(app.sheetId);
    // this.navCtrl.pop();
    this.refreshService.refreshAll ();
  }

  onRefresh(): void {
    console.log ("Settings onRefresh...")
  }

  getAppsInfo(): void {
   this.apps = this.configService.getAppsInfo();
  }

  getCurrentId(): string {
    return this.configService.getCurrentId();
  }

  presentAddApp(ev) {
    let modal = this.modalController.create(AddAppPage, { appsInfo: this.configService.getAppsInfo() });

    modal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      if (data) {
        this.getAppsInfo();
      }
    });

    modal.present({ ev: ev });
  }

  reset(): void {
    let alert = this.alertCtrl.create({
      title: 'Reset Apps',
      subTitle: "Are you sure you like to reset all apps to default?<p>Only the default app will remain.</p>",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          role: 'Reset',
          handler: () => {
            this.configService.reset().then(() => {
              this.getAppsInfo();
            })
          }
        }]
    });
    alert.present();
  }

  longPress(): void {
    this.mode = Modes.selection;
    this.vibration.vibrate(20);

    for (let i = 0; i < this.apps.length; i++) {
      this.apps[i].selected = false;
    }
  }

  constructor(
    public navCtrl: NavController,
    private appInfoService: AppInfoService,
    private refreshService: RefreshService,
    public modalController: ModalController,
    private utils: Utils,
    private configService: ConfigService,
    private alertCtrl: AlertController,
    private vibration: Vibration) {
  }
}
