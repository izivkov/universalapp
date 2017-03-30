import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigService } from '../../app/config.service';
import { AppId } from '../../data/app-id';
import { AppInfo } from '../../data/app-info';
import { AppInfoService } from '../../data/app-info.service';
import { RefreshService } from '../../common/refresh.service';
import { ModalController } from 'ionic-angular';
import { AddAppPage } from './add-app';

@Component({
  templateUrl: 'settings.html',
  providers: [AppInfoService, RefreshService],
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
    var appIds: AppId[] = ConfigService.getAppIds();

    for (let i = this.apps.length - 1; i >= 0; i--) {
      if (this.apps[i].selected) {
        appIds.splice(i, 1);
      }
    }

    ConfigService.setAppIds(appIds);
    this.getAppsInfo();
  }

  select(app: AppInfo): void {
    if (this.selectionMode) {
      return;
    }

    ConfigService.setCurrentSheetId(app.sheetId);
    //this.refreshService.refreshAll ();
    this.navCtrl.pop();
  }

  getAppsInfo(): void {
    var appIds: AppId[] = ConfigService.getAppIds();
    var urls: string[] = [];
    this.apps = [];

    for (let appId of appIds) {
      urls.push(ConfigService.getAppInfoUrl(appId.sheetId));
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

  getCurrentSheetId () : string {
    return ConfigService.getCurrentSheetId();
  }

  presentAddApp(ev) {
    let modal = this.modalController.create(AddAppPage, { appIds: ConfigService.getAppIds() });

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
    public modalController: ModalController) {
  }
}
