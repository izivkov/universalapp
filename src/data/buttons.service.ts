import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { Button } from './button';
import { DataExtractor } from './data-extractor';
import { ConfigService } from '../app/config.service';

@Injectable()

export class ButtonsService extends DataExtractor<Button> {

    constructor(http: Http, private configService:ConfigService) { 
        super (http, configService.getButtonsUrl ());
    }

    getButtons(): Observable<Button[]> {
        return this.getData (this.configService.getButtonsUrl ());
    }
}