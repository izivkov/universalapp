import { Injectable } from '@angular/core';
import { AppId } from '../data/app-id';
import { Storage } from '@ionic/storage';

/*
        let IDs: any[] = [{
            "sheetId": "1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4"
        },
        {
            "sheetId": "1W0K8HC85gmHvp3fX6eJZCBTL4miTgsLI2ntqW4Sk7ZE"
        },
        {
            "sheetId": "12jFxbHU6Bix95Q_jnrYWRQu5kNExv52MFNIJi96gRzo"
        }];
*/

@Injectable()

export class ConfigData {
    private currentId: string = this.getDefaltId();
    private IDs: AppId[];

    getCurrentId(): string {
        return this.currentId;
    }

    setCurrentId(id: string) {
        this.currentId = id;
    }

    getIDs(): AppId[] {
        return this.IDs;
    }

    setIDs(ids: AppId[]) {
        this.IDs = ids;
    }

    getDefaltId(): string {
        return '1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4';
    }
}

export class ConfigService {

    private conigData: ConfigData;
    private storage: Storage;

    constructor() {
        console.log("constructor...");
        this.conigData = new ConfigData();
        this.storage = new Storage(null);
        this.storage.clear ();        
    }

    load(): Promise<boolean> {
        let promise: Promise<any> = new Promise((resolve: any) => {
            this.storage.ready().then(() => {
            }).
            then(() => {
                this.loadAppIds();
            }).then(() => {
                this.loadCurrentId();
            }).then(() => {
                console.log("Storage loaded...");
                resolve(true);
            }).catch((err) => {
                console.log("Error in loading settings...");
                resolve(false);
            })
        })

        return promise;
    }

    loadAppIds(): any {
        return this.storage.get('ids').then((ids) => {
            if (!ids || ids.length === 0) {
                this.setDefaultIds();
            } else {
                this.conigData.setIDs(ids);
            }
        }).catch(() => {
            this.setDefaultIds();
        });
    }

    setDefaultIds(): void {

        let defaultAppId: AppId = { sheetId: this.conigData.getDefaltId() };
        let ids: AppId[] = [];
        ids.push(defaultAppId);
        this.setAppIds(ids);
    }

    loadCurrentId(): any {
        return this.storage.get('currentId').then((currentId: string) => {
            if (!currentId) {
                this.setToDefaultCurrentId();
            } else {
                this.conigData.setCurrentId(currentId);
            }
        }).catch(() => {
            this.setToDefaultCurrentId();
        });
    }

    setToDefaultCurrentId(): void {
        let defaultId = this.conigData.getDefaltId();
        this.setCurrentId(defaultId);
    }

    setCurrentId(currentId: string): void {
        this.conigData.setCurrentId(currentId);
        this.storage.set('currentId', currentId);
    }

    getCurrentId(): string {
        return this.conigData.getCurrentId();
    }

    getAppIds(): AppId[] {
        return this.conigData.getIDs();
    }

    setAppIds(appIds: AppId[]): any {
        this.conigData.setIDs(appIds);
        this.storage.set('ids', appIds);
    }

    getAppInfoUrl(sheetId: string): string {
        return "https://spreadsheets.google.com/feeds/list/" + this.conigData.getCurrentId() + "/1/public/values?alt=json";
    }

    getTabsUrl(): string {
        return "https://spreadsheets.google.com/feeds/list/" + this.conigData.getCurrentId() + "/2/public/values?alt=json";
    }

    getButtonsUrl(): string {
        return "https://spreadsheets.google.com/feeds/list/" + this.conigData.getCurrentId() + "/3/public/values?alt=json";
    }

    addId(id) {
        this.conigData.getIDs().push({ "sheetId": id });
        this.storage.set('ids', this.conigData.getIDs());
    }
}