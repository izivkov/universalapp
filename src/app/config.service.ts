import { Injectable } from '@angular/core';
import { AppId } from '../data/app-id';
import { Storage } from '@ionic/storage';

@Injectable()

export class ConfigData {
    private currentId: string = '';
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
        return '1W0K8HC85gmHvp3fX6eJZCBTL4miTgsLI2ntqW4Sk7ZE';
    }
}

export class ConfigService {

    private configData: ConfigData;
    private storage: Storage;

    constructor() {
        this.configData = new ConfigData();
        this.storage = new Storage(null);
    }

    load(): Promise<ConfigData> {

        var a = performance.now();

        let promise: Promise<any> = new Promise((resolve: any) => {
            this.storage.ready().then(() => {

                Promise.all([
                    this.loadCurrentId(),
                    this.loadAppIds()]).then(() => {
                        resolve(this.configData);
                    }).catch(() => {
                        console.log("Could not load config!!!");
                        resolve(null);
                    });
            })
        });

        return promise;
    }

    loadAppIds(): Promise<any> {
        return this.storage.get('ids').then((ids) => {
            if (!ids || ids.length === 0) {
                this.setDefaultIds();
            } else {
                this.configData.setIDs(ids);
            }
        }).catch(() => {
            this.setDefaultIds();
        });
    }

    setDefaultIds(): void {

        let defaultAppId: AppId = { sheetId: this.configData.getDefaltId() };
        let ids: AppId[] = [];
        ids.push(defaultAppId);
        this.setAppIds(ids);
    }

    loadCurrentId(): Promise<any> {
        return this.storage.get('currentId').then((currentId: string) => {
            if (!currentId) {
                this.setToDefaultCurrentId();
            } else {
                this.configData.setCurrentId(currentId);
            }
        }).catch(() => {
            this.setToDefaultCurrentId();
        });
    }

    setToDefaultCurrentId(): void {
        let defaultId = this.configData.getDefaltId();
        this.setCurrentId(defaultId);
    }

    setCurrentId(currentId: string): void {
        this.configData.setCurrentId(currentId);
        this.storage.set('currentId', currentId);
    }

    getCurrentId(): string {
        return this.configData.getCurrentId();
    }

    getAppIds(): AppId[] {
        return this.configData.getIDs();
    }

    setAppIds(appIds: AppId[]): any {
        this.configData.setIDs(appIds);
        this.storage.set('ids', appIds);
    }

    getAppInfoUrl(sheetId: string): string {
        return "https://spreadsheets.google.com/feeds/list/" + sheetId + "/1/public/values?alt=json";
    }

    getTabsUrl(): string {
        return "https://spreadsheets.google.com/feeds/list/" + this.configData.getCurrentId() + "/2/public/values?alt=json";
    }

    getButtonsUrl(): string {
        return "https://spreadsheets.google.com/feeds/list/" + this.configData.getCurrentId() + "/3/public/values?alt=json";
    }

    addId(id) {
        this.configData.getIDs().push({ "sheetId": id });
        this.storage.set('ids', this.configData.getIDs());
    }

    reset(): Promise<any> {
        let promise: Promise<any> = new Promise((resolve: any) => {
            this.storage.clear().then(() => {
                this.load().then(() => {
                    resolve({});
                })
            })
        })

        return promise;
    }
}