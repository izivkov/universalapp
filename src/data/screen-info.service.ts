import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http } from '@angular/http';

import { ScreenInfo } from './screen-info';
import { DataExtractor } from './data-extractor';
import { ConfigService } from '../app/config.service';

@Injectable()

export class ScreenInfoService extends DataExtractor<ScreenInfo> {

    constructor(http: Http, private configService: ConfigService) {
        super(http, configService.getTabsUrl());
    }

    getScreens(): Observable<ScreenInfo[]> {
        return this.getData(this.configService.getTabsUrl());
    }
}