import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ReplaySubject } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class DataExtractor<T> {   

    constructor(private http: Http, private url?:string) { }

    protected getData (url?: string): Observable<T[]> {
        return this.http.get(url || this.url)
            .map(this.extractData).share()
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        var data = body.feed.entry;

        let returnArray: Array<any> = [];
        if (data && data.length > 0) {
            data.forEach((entry, index) => {
                var obj = {};
                for (let x in entry) {
                    if (x.includes('gsx$') && entry[x].$t) {
                        obj[x.split('$')[1]] = entry[x]['$t'];
                    }
                }
                returnArray.push(obj);
            });
        }
        return returnArray || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}