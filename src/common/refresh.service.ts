import { Injectable } from '@angular/core';
import { Refreshable } from './refreshable';

@Injectable()

export class RefreshService {

    private static refreshables: Set<Refreshable> = new Set <Refreshable> ();

    add (refreshable: Refreshable): void {
        RefreshService.refreshables.add (refreshable);
    }

    refreshAll () : void {
    
        RefreshService.refreshables.forEach (function (refreshable) {
            refreshable.onRefresh ();
        })
    }
}
