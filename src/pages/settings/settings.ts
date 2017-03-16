import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigService } from '../../app/config.service';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  screen: any;

  ngOnInit() {
    this.screen = { name: 'settings' };
    this.screen = { title: 'Settings' };
  }

  getSettings () : string {
    return ConfigService.getSettings ()
  }

  constructor(public navCtrl: NavController) {
  }
}
