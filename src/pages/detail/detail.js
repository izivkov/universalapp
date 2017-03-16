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
import { NavController, NavParams } from 'ionic-angular';
import { IonPullUpFooterState } from 'ionic-pullup/dist';
var ButtonWithData = (function () {
    function ButtonWithData() {
    }
    return ButtonWithData;
}());
;
var DetailPage = (function () {
    function DetailPage(_navCtrl, params) {
        this._navCtrl = _navCtrl;
        this.params = params;
        var _button = params.data.button;
        this.button = new ButtonWithData();
        this.button.name = _button['name'];
        this.button.text = _button['text'];
        this.button.image = _button['image'];
        this.button.video = _button['video'];
        this.button.style = _button['style'];
    }
    DetailPage.prototype.ngOnInit = function () {
    };
    DetailPage.prototype.footerExpanded = function () {
        //console.log('Footer expanded!');
    };
    DetailPage.prototype.footerCollapsed = function () {
        //console.log('Footer collapsed!');
    };
    DetailPage.prototype.toggleFooter = function () {
        this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    };
    return DetailPage;
}());
DetailPage = __decorate([
    Component({
        selector: 'detail',
        templateUrl: 'detail.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], DetailPage);
export { DetailPage };
//# sourceMappingURL=detail.js.map