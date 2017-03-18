var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabPage } from '../pages/tab-page/tab-page';
import { SecondaryPage } from '../pages/secondaryPage/secondaryPage';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { HttpModule } from '@angular/http';

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            SecondaryPage,
            HomePage,
            TabsPage,
            DetailPage,
            Btn,
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            HttpModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            SecondaryPage,
            HomePage,
            TabsPage,
            DetailPage,
            Btn
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map