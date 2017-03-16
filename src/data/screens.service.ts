import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { Screen } from './screen';
import { DataExtractor } from './DataExtractor';
import { ConfigService } from '../app/config.service';

@Injectable()

export class ScreensService extends DataExtractor<Screen> {

    constructor(http: Http) { 
        super (http, ConfigService.getScreensUrl ());
    }

    getScreens(): Observable<Screen[]> {
        return this.getData ();
    }
}