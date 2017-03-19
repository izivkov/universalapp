import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabPage } from '../pages/tab-page/tab-page';
import { Tabs } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail-page/detail-page';
import { SettingsPage } from '../pages/settings/settings';
import { Btn } from '../components/btn/btn';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    TabPage,
    Tabs,
    DetailPage,
    SettingsPage,
    Btn
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabPage,
    Tabs,
    DetailPage,
    SettingsPage,
    Btn
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
