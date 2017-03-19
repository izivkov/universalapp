import { Component } from '@angular/core';

import { TabPage } from '../tab-page/tab-page';
import { ScreenInfo } from '../../data/screen-info';
import { ScreenInfoService } from '../../data/screen-info.service';

import { Refreshable } from '../../common/refreshable';
import { RefreshService } from '../../common/refresh.service';

@Component({
  templateUrl: 'tabs.html',
  providers: [ScreenInfoService, RefreshService]
})
export class Tabs implements Refreshable {

  tabRoot: any;
  errorMessage: string;
  screens: ScreenInfo[];
  self = this;

  onRefresh () : void {
    this.screens = undefined;
    this.getScreens ();
  }

  getScreens () : void {
    this.screensService.getScreens()
      .subscribe(
      screens => {
        this.screens = screens;
      },
      error => this.errorMessage = <any>error);
  }

  constructor(private screensService: ScreenInfoService,  private refreshService: RefreshService) {

    this.tabRoot = TabPage;
    this.getScreens ();
    refreshService.add (this);
  }
}
