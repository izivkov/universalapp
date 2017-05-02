import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class DataExtractor<T> {

    private cache: Cache = new Cache();

    constructor(private http: Http, private url?: string) { }

    protected getData(url: string): Observable<T[]> {
        var resultUrl = url;
        let cachedValue = this.cache.get(resultUrl);
        if (cachedValue) {
            return cachedValue;
        }

        let result = this.http.get(resultUrl)
            .map(this.extractData)
            .catch(this.handleError);

        this.cache.put(resultUrl, result);
        return result;
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

class Cache {
    private map = {};

    put(key: string, value: any): void {
        this.map[key] = value;
    }

    get(key: string): any {
        return this.map[key];
    }
}
