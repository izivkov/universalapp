import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Http } from '@angular/http';

import { AppInfo } from './app-info';
import { DataExtractor } from './data-extractor';

@Injectable()

export class AppInfoService extends DataExtractor<AppInfo> {

    constructor(http: Http) {
        super(http);
    }

    getAppInfo(url: string): Observable<AppInfo[]> {
        return this.getData(url);
    }

    getAppsInfo_ORIG (urls: string[]): Observable<AppInfo[][]> {

        let observables: Observable<AppInfo[]>[] = [];

        for (let url of urls) {
            observables.push (this.getAppInfo(url));
        }

        return Observable.forkJoin(observables);
    }

    getAppsInfo(urls: string[]): Observable<AppInfo[][]> {

        let observables: Observable<AppInfo[]>[] = [];

        for (let url of urls) {
            let observable : Observable<AppInfo[]> = this.getAppInfo(url);
            observables.push (observable);
        }

        return Observable.forkJoin(observables);
    }
}