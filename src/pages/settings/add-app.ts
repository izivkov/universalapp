import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { AppInfo } from '../../data/app-info';
import { Renderer } from '@angular/core';
import { AppInfoService } from '../../data/app-info.service';
import { ConfigService } from '../../app/config.service';
import { Utils } from '../../common/utils';

@Component({
  templateUrl: './add-app.html',
  providers: [AppInfoService, Utils],
  styleUrls: ['/pages/settings/add-app.scss']
})

export class AddAppPage {
  appsInfo: AppInfo[];
  app: AppInfo;
  errorMessage: string;

  constructor(public viewCtrl: ViewController, private appInfoService: AppInfoService,
    private navParams: NavParams, public renderer: Renderer, private utils: Utils, private configService:ConfigService) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'add-app-popup', true);
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.appsInfo = this.navParams.data.appsInfo;
    }
  }

  getApp(sheetId) {
    sheetId = this.urlToId(sheetId);
    if (!sheetId || !this.verifyId (sheetId)) {
      return;
    }

    let url = this.configService.getAppInfoUrl(sheetId);
    this.appInfoService.getAppInfo(url).subscribe(
      app => {
        this.app = app[0];
        this.app.sheetId = sheetId;
      },
      error => this.errorMessage = <any>error);
  }

  urlToId (url:any): string {
    let matched = url.match(/[-\w]{25,}/);
    if (matched && matched [0]) {
      return matched [0];
    }

    return undefined;
  }

  verifyId (id: string): boolean {
    if (id.length !== 44) {
      return false;
    }

    for (let appInfo of this.appsInfo) {
      if (id === appInfo.sheetId) {
        this.utils.showToast ("This App already exists.")
        return false;
      }
    }

    return true;
  }

  private close(sheetId?: string): void {
    this.viewCtrl.dismiss(sheetId);
  }

  cancel(): void {
    this.close();
  }

  add (app: AppInfo): void {
    this.configService.addAppsInfo (app);
    this.close(app.sheetId);
  }
}