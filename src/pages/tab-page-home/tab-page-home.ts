import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ButtonsService } from '../../data/buttons.service';
import { Button } from '../../data/button';
import { DetailPage } from '../detail-page/detail-page';
import { SettingsPage } from '../settings/settings';
import { Page } from '../page';
import { ScreenInfoService } from '../../data/screen-info.service';
import { Refreshable } from '../../common/refreshable';
import { RefreshService } from '../../common/refresh.service';

@Component({
  selector: 'tab-page-home',
  templateUrl: 'tab-page-home.html',
  providers: [ButtonsService, ScreenInfoService, RefreshService]
})

export class TabPageHome extends Page implements Refreshable {

  buttons: Button[];

  errorMessage: string;
  navCtrl: NavController;

  ngOnInit() {
    this.getButtons();
  }

  getButtons() {
    return this.buttonsService.getButtons()
      .subscribe(
      buttons => {
        this.buttons = buttons
      },
      error => this.errorMessage = <any>error);
  }

  onClick(name: string): void {
    this.navCtrl.push(DetailPage, { button: (this.buttons.filter((button) => button.name === name))[0] });
  }

  settings(): void {
    this.navCtrl.push(SettingsPage);
  }

  onRefresh (): void {
    this.getButtons();
  }

  refresh (): void {
    this.refreshService.refreshAll ();  
  }

  constructor(
      private _navCtrl: NavController, 
      private buttonsService: ButtonsService, 
      private refreshService: RefreshService,
      private navParams: NavParams) {

    super (navParams.data.screen);
    this.navCtrl = _navCtrl;
    refreshService.add (this);
  }
}
