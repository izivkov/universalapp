import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ConfigService } from '../../app/config.service';
import { AppId } from '../../data/app-id';
import { AppInfo } from '../../data/app-info';
import { AppInfoService } from '../../data/app-info.service';
import { RefreshService } from '../../common/refresh.service';
import { ModalController } from 'ionic-angular';
import { AddAppPage } from './add-app';
import { Utils } from '../../common/utils';

@Component({
  templateUrl: 'settings.html',
  providers: [AppInfoService, RefreshService, Utils]
})

export class SettingsPage {

  selectionMode: boolean = false;
  screen: any;
  errorMessage: string;
  apps: AppInfo[] = [];

  ngOnInit() {
    this.screen = { name: 'settings' };
    this.screen = { title: 'Settings' };
    this.getAppsInfo();
  }

  setSelectedId(index: number, selected: boolean): void {
    this.apps[index].selected = selected;
  }

  selectForDeletion(app: AppInfo) {
    app.selected = !app.selected;
  }

  deleteSelected(): void {
    this.selectionMode = false;
    var appIds: AppId[] = this.configService.getAppIds();

    for (let i = this.apps.length - 1; i >= 0; i--) {
      if (this.apps[i].selected) {
        if (appIds [i].sheetId === this.configService.getCurrentId()) {
          this.utils.showToast ("Cannot detele current app");
          continue;
        }
        appIds.splice(i, 1);
      }
    }

    this.configService.setAppIds(appIds);
    this.getAppsInfo();
  }

  select(app: AppInfo): void {
    if (this.selectionMode) {
      return;
    }

    this.configService.setCurrentId(app.sheetId);
    //this.refreshService.refreshAll ();
    this.navCtrl.pop();
  }

  getAppsInfo(): void {
    var appIds: AppId[] = this.configService.getAppIds();
    var urls: string[] = [];
    this.apps = [];

    for (let i in appIds) {
      urls.push(this.configService.getAppInfoUrl(appIds[i].sheetId));
    }

    this.appInfoService.getAppsInfo(urls).subscribe(
      appsArr => {
        for (let i in appsArr) {
          this.apps[i] = appsArr[i][0];
          this.apps[i].sheetId = appIds[i].sheetId;
        }
      },
      error => this.errorMessage = <any>error);
  }

  getCurrentId () : string {
    return this.configService.getCurrentId();
  }

  presentAddApp(ev) {
    let modal = this.modalController.create(AddAppPage, { appIds: this.configService.getAppIds() });

    modal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      if (data) {
        this.getAppsInfo();          
      }
    });

    modal.present({ ev: ev });
  }

  constructor(
    public navCtrl: NavController,
    private appInfoService: AppInfoService,
    private refreshService: RefreshService,
    public modalController: ModalController,
    private utils: Utils,
    private configService: ConfigService) {
  }
}
