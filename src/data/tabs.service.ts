import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { ScreenInfo } from './screen-info';
import { DataExtractor } from './data-extractor';
import { ConfigService } from '../app/config.service';

@Injectable()
export class TabsService extends DataExtractor<ScreenInfo> {

    errorMessage: string;

    ngOnInit() {
    }

    constructor(http: Http) {
        super(http, ConfigService.getScreensUrl());
    }

    getTabs(): Observable<ScreenInfo[]> {
        return this.getData();
    }
}