import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreensService } from '../../data/screens.service';
import { Page } from '../page';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [ScreensService]
})
export class AboutPage extends Page {

  ngOnInit() {
    this.screen = { name: 'about' };

    this.getScreen('about');
  }

  constructor(public navCtrl: NavController, screensService: ScreensService) {
    super(screensService);
  }
}
