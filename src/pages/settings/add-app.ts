import { Component } from '@angular/core';
import { ViewController, NavParams, ToastController } from 'ionic-angular';
import { AppInfo } from '../../data/app-info';
import { AppId } from '../../data/app-id';
import { Renderer } from '@angular/core';
import { AppInfoService } from '../../data/app-info.service';
import { ConfigService } from '../../app/config.service';

@Component({
  templateUrl: './add-app.html',
  providers: [AppInfoService],
  styleUrls: ['/pages/settings/add-app.scss']
})

export class AddAppPage {
  appIds: AppId[];
  app: AppInfo;
  appId: string = "";
  errorMessage: string;

  constructor(public viewCtrl: ViewController, private appInfoService: AppInfoService,
    private navParams: NavParams, public renderer: Renderer, public toastCtrl: ToastController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'add-app-popup', true);
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.appIds = this.navParams.data.appIds;
    }
  }

  // https://docs.google.com/spreadsheets/d/1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4/pubhtml

  getApp(sheetId) {
    sheetId = this.urlToId(sheetId);
    if (!this.verifyId (sheetId)) {
      return;
    }

    let url = ConfigService.getAppInfoUrl(sheetId);
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
      this.showToast ("Invalid URL or ID entered.")
      return false;
    }

    for (let appId of this.appIds) {
      if (id === appId.sheetId) {
        this.showToast ("This ID already exists.")
        return false;
      }
    }

    return true;
  }

  showToast(message: string): void {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      duration: 3000
    });
    toast.present();
  }

  private close(sheetId?: string): void {
    this.viewCtrl.dismiss(sheetId);
  }

  cancel(): void {
    this.close();
  }

  add (sheetId): void {
    ConfigService.addId (sheetId);
    this.close(this.app.sheetId);
  }
}