import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ButtonsService } from '../../data/buttons.service';
import { ScreensService } from '../../data/screens.service';
import { Button } from '../../data/button';
import { DetailPage } from '../detail/detail';
import { SettingsPage } from '../settings/settings';
import { Page } from '../page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ButtonsService, ScreensService]
})

export class HomePage extends Page {

  buttons: Button[];

  errorMessage: string;
  navCtrl: NavController;

  ngOnInit() {
    this.screen = {name: 'home'};
    this.getScreen('home');
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
    console.log ("Settings screen...");
    this.navCtrl.push(SettingsPage);
  }

  refresh (): void {
    this.getScreen('home');
    this.getButtons();
  }

  constructor(public _navCtrl: NavController, private buttonsService: ButtonsService, screensService: ScreensService) {
    super (screensService);
    this.navCtrl = _navCtrl;
  }
}
