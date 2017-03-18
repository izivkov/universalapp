import { Component } from '@angular/core';

import { TabPage } from '../tab-page/tab-page';
import { ScreenInfo } from '../../data/screen-info';

import { ScreensService } from '../../data/screens.service';

@Component({
  templateUrl: 'tabs.html',
  providers: [ScreensService]
})
export class Tabs {

  params: any;
  tabRoot: any;
  errorMessage: string;
  screens: ScreenInfo[];

  constructor(private screensService: ScreensService) {

    this.tabRoot = TabPage;

    screensService.getScreens()
      .subscribe(
      screens => {
        this.screens = screens;
      },
      error => this.errorMessage = <any>error);
  }
}
