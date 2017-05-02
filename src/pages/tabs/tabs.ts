import { Component } from '@angular/core';

import { TabPageHome } from '../tab-page-home/tab-page-home';
import { TabPageSecondary } from '../tab-page-secondary/tab-page-secondary';
import { ScreenInfo } from '../../data/screen-info';
import { ScreenInfoService } from '../../data/screen-info.service';

import { Refreshable } from '../../common/refreshable';
import { RefreshService } from '../../common/refresh.service';
import { ConfigService } from '../../app/config.service';
import { Utils } from '../../common/utils';

@Component({
  templateUrl: 'tabs.html',
  providers: [ScreenInfoService, RefreshService, Utils]
})
export class Tabs implements Refreshable {

  tabRoot: any;
  tabRootSecondary: any;
  errorMessage: string;
  screens: ScreenInfo[];

  onRefresh(): void {
    this.screens = undefined;
    this.getScreens();
  }

  getScreens(): void {
    this.screensService.getScreens()
      .subscribe(
      screens => {
        this.screens = screens;
      },
      error => {
        this.errorMessage = <any>error;
        this.utils.showToast("Cannot access this app - selecting the default app.");
        this.configService.setToDefaultCurrentId ();
        this.getScreens (); // recursive
      });
  }

  constructor(private screensService: ScreenInfoService, 
    private refreshService: RefreshService, 
    private utils: Utils,
    private configService: ConfigService) {

    this.tabRoot = TabPageHome;
    this.tabRootSecondary = TabPageSecondary;
    this.getScreens();
    refreshService.add(this);
  }
}
