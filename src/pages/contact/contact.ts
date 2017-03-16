import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ScreensService } from '../../data/screens.service';
import { Page } from '../page';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [ScreensService]
})
export class ContactPage extends Page {
ngOnInit() {
    this.screen = { name: 'contact' };
    this.getScreen('contact');
  }

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public navCtrl: NavController, screensService: ScreensService) {
    super(screensService);
  }
}
