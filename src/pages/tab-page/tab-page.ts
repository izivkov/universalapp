import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ButtonsService } from '../../data/buttons.service';
import { Button } from '../../data/button';
import { DetailPage } from '../detail/detail';
import { SettingsPage } from '../settings/settings';
import { Page } from '../page';

@Component({
  selector: 'tab-page',
  templateUrl: 'tab-page.html',
  providers: [ButtonsService]
})

export class TabPage extends Page {

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

  refresh (): void {
    this.getButtons();
  }

  constructor(public _navCtrl: NavController, private buttonsService: ButtonsService, navParams: NavParams) {
    super (navParams.data);
    this.navCtrl = _navCtrl;
  }
}
