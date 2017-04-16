import { Injectable } from '@angular/core';
import { Refreshable } from './refreshable';

@Injectable()

export class RefreshService {

    private static refreshables: Array <Refreshable> = new Array <Refreshable> ();

    add (refreshable: Refreshable): void {
        // Do not add if already in the set.
        let newName = RefreshService.getName (refreshable);
        for (let ref of RefreshService.refreshables) {
            if (RefreshService.getName(ref) === newName) {                
                return;
            }
        };

        RefreshService.refreshables.push (refreshable);
    }

    private static getName(inputClass) {
        return (<any> inputClass).constructor.name;
    }

    refreshAll () : void {
        RefreshService.refreshables.forEach (function (refreshable) {
            refreshable.onRefresh ();
        })
    }
}
