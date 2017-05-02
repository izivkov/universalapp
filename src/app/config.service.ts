import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppInfo } from '../data/app-info';
import { AppInfoService } from '../data/app-info.service';

@Injectable()

export class ConfigData {
    private currentId: string = '';
    private appsInfo: AppInfo[];
    private defaultApp: AppInfo;

    getDefaultApp(): AppInfo {
        return this.defaultApp;
    }

    setDefaultApp(app: AppInfo): void {
        this.defaultApp = app;
    }

    getCurrentId(): string {
        return this.currentId;
    }

    setCurrentId(id: string) {
        this.currentId = id;
    }

    getAppsInfo(): AppInfo[] {
        return this.appsInfo;
    }

    setAppsInfo(appsInfo: AppInfo[]): void {
        this.appsInfo = appsInfo;
    }

    getDefaultId(): string {
        return '1W0K8HC85gmHvp3fX6eJZCBTL4miTgsLI2ntqW4Sk7ZE';
    }
}

type StoreKeys = "appsInfo" | "currentId";

class SettingsStorage {
    private storage: Storage;

    constructor() {
        this.storage = new Storage(null);
    }

    get(key: StoreKeys): any {
        return this.storage.get(key);
    }

    set(key: StoreKeys, value: any): void {
        this.storage.set(key, value);
    }

    ready () : Promise<any> {
        return this.storage.ready ();
    }

    clear () : Promise<any> {
        return this.storage.clear ();
    }
}

export class ConfigService {

    private configData: ConfigData;
    errorMessage: string;
    storage: SettingsStorage;

    constructor( @Inject(AppInfoService) private appInfoService: AppInfoService) {

        this.configData = new ConfigData();
        this.storage = new SettingsStorage();
    }

    load(): Promise<ConfigData> {

        let promise: Promise<any> = new Promise((resolve: any) => {
            this.storage.ready().then(() => {

                // this.reset();
                
                this.getDefaultApp().then(() => {

                    Promise.all([
                        this.loadCurrentId(),
                        this.loadApps()]).then(() => {
                            resolve(this.configData);
                        }).catch(() => {
                            console.log("Could not load config!!!");
                            resolve(null);
                        });
                });
            });
        });

        return promise;
    }

    getDefaultApp(): Promise<any> {

        let promise: Promise<any> = new Promise((resolve: any) => {
            this.appInfoService.getAppInfo(this.getAppInfoUrl(this.configData.getDefaultId())).subscribe(
                app => {
                    this.configData.setDefaultApp(app[0]);
                    resolve({});
                },
                error => {
                    this.errorMessage = <any>error;
                    resolve({});
                })
        });

        return promise;
    }

    loadApps(): Promise<any> {

        let promise: Promise<any> = new Promise((resolve: any) => {
            this.storage.get("appsInfo").then((appsInfo) => {
                if (!appsInfo || appsInfo.length === 0) {
                    this.setAppsToDefault();
                } else {
                    this.setAppsInfo(appsInfo);
                }
                resolve(appsInfo);
            }).catch((error) => {
                this.setAppsToDefault();
                resolve({});
            });
        });

        return promise;
    }

    private setAppsToDefault() {
        let appsInfo = [];
        let defaultApp = this.configData.getDefaultApp();

        defaultApp.sheetId = this.configData.getDefaultId();
        appsInfo.push(defaultApp);

        this.setAppsInfo(appsInfo);
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
        let defaultId = this.configData.getDefaultId();
        this.setCurrentId(defaultId);
    }

    setCurrentId(currentId: string): void {
        this.configData.setCurrentId(currentId);
        this.storage.set('currentId', currentId);
    }

    getCurrentId(): string {
        return this.configData.getCurrentId();
    }

    getAppsInfo(): AppInfo[] {
        return this.configData.getAppsInfo();
    }

    setAppsInfo(appsInfo: AppInfo[]): void {
        this.configData.setAppsInfo(appsInfo);
        this.storage.set('appsInfo', appsInfo);
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

    addAppsInfo(appInfo: AppInfo) {
        this.configData.getAppsInfo().push(appInfo);
        this.storage.set('appsInfo', this.configData.getAppsInfo());
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