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

    private dataObs$ = new ReplaySubject(1);

    protected getDataNew (url?: string, forceRefresh?: boolean) {
        // If the Subject was NOT subscribed before OR if forceRefresh is requested 
        if (!this.dataObs$.observers.length || forceRefresh) {
            this.http.get(url || this.url).subscribe(
                data => this.dataObs$.next(data),
                error => {
                    this.dataObs$.error(error);
                    // Recreate the Observable as after Error we cannot emit data anymore
                    this.dataObs$ = new ReplaySubject(1);
                }
            );
        }

        return this.dataObs$;
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