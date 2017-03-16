var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Buttons } from '../../data/buttons.service';
import { DetailPage } from '../detail/detail';
var HomePage = (function () {
    function HomePage(_navCtrl, buttonsService) {
        this._navCtrl = _navCtrl;
        this.buttonsService = buttonsService;
        this.navCtrl = _navCtrl;
    }
    HomePage.prototype.ngOnInit = function () {
        this.getButtons();
    };
    HomePage.prototype.getButtons = function () {
        var _this = this;
        this.buttonsService.getButtons()
            .subscribe(function (buttons) { return _this.buttons = buttons; }, function (error) { return _this.errorMessage = error; });
    };
    HomePage.prototype.onClick = function (name) {
        console.log("Clicked on [" + name + "]");
        this.navCtrl.push(DetailPage, { button: (this.buttons.filter(function (button) { return button.name === name; }))[0] });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [Buttons]
    }),
    __metadata("design:paramtypes", [NavController, Buttons])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map