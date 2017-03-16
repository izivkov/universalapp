var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
var Buttons = (function () {
    // '../assets/buttons.json';
    // https://docs.google.com/spreadsheets/d/1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4/pub?output=csv
    function Buttons(http) {
        this.http = http;
        this.spreadsheetID = '1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4';
        this.buttonsUrl = "https://spreadsheets.google.com/feeds/list/" + this.spreadsheetID + "/od6/public/values?alt=json";
    }
    Buttons.prototype.getButtons = function () {
        return this.http.get(this.buttonsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };

    Buttons.prototype.extractData = function (res) {
        var body = res.json();
        var data = body.feed.entry;
        var returnArray = [];
        if (data && data.length > 0) {
            data.forEach(function (entry, index) {
                var obj = {};
                for (var x in entry) {
                    if (x.includes('gsx$') && entry[x].$t) {
                        obj[x.split('$')[1]] = entry[x]['$t'];
                        // console.log(x.split('$')[1] + ': ' + entry[x]['$t']);
                    }
                }
                returnArray.push(obj);
            });
        }
        return returnArray || {};
    };
    Buttons.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    return Buttons;
}());
Buttons = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], Buttons);
export { Buttons };
//# sourceMappingURL=buttons.service.js.map