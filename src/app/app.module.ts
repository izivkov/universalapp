import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabPageHome } from '../pages/tab-page-home/tab-page-home';
import { TabPageSecondary } from '../pages/tab-page-secondary/tab-page-secondary';
import { Tabs } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail-page/detail-page';
import { SettingsPage } from '../pages/settings/settings';
import { AddAppPage } from '../pages/settings/add-app';
import { Btn } from '../components/btn/btn';
import { IonicStorageModule } from '@ionic/storage';
import { ConfigService } from '../app/config.service';
import { AppInfoService } from '../data/app-info.service';
import { Network } from "@ionic-native/network";

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

export function loadConfig(config: ConfigService): Function {
  return () => config.load();
}

@NgModule({
  declarations: [
    MyApp,
    TabPageHome,
    TabPageSecondary,
    Tabs,
    DetailPage,
    SettingsPage,
    AddAppPage,
    Btn
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabPageHome,
    TabPageSecondary,
    Tabs,
    DetailPage,
    SettingsPage,
    AddAppPage,
    Btn
  ],
  providers: [StatusBar, // Newly add for ionic 3
    SplashScreen, // Newly add for ionic 3
    AppInfoService,
    Network,
    { provide: [ErrorHandler], useClass: IonicErrorHandler },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true
    }]
})
export class AppModule { }
