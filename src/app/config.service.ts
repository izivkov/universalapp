import { AppId } from '../data/app-id';

export class ConfigService {

    private static googleSheetId: string = '1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4'; // orig
    // private static googleSheetId: string = '1RoaFdVdk3Bz-ku5jB1THJ8I2yfBJhUzIKw1M55UPIN0'; // alex
    // private static googleSheetId: string = '1YvUOZMus7f0yE-wWx9bhOVOKPnzYiJjpgV5JAZ9jpCA'; // Yvette

    static IDs: any[] = [{
        "sheetId": "1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4"
    },
    {
        "sheetId": "1W0K8HC85gmHvp3fX6eJZCBTL4miTgsLI2ntqW4Sk7ZE"
    },
    {
        "sheetId": "12jFxbHU6Bix95Q_jnrYWRQu5kNExv52MFNIJi96gRzo"
    }
    ]

    static setCurrentSheetId(sheetId: string): void {
        this.googleSheetId = sheetId;
    }

    static getCurrentSheetId() : string {
        return this.googleSheetId;
    }

    static getAppInfoUrl(sheetId: string): string {
        return "https://spreadsheets.google.com/feeds/list/" + sheetId + "/1/public/values?alt=json";
    }

    static getTabsUrl(): string {
        return "https://spreadsheets.google.com/feeds/list/" + this.googleSheetId + "/2/public/values?alt=json";
    }

    static getButtonsUrl(): string {
        return "https://spreadsheets.google.com/feeds/list/" + this.googleSheetId + "/3/public/values?alt=json";
    }

    static addId(id) {
        this.IDs.push ({"sheetId": id});
    }


    static getAppIds(): AppId[] {
        return this.IDs;
    }
    
    static setAppIds(appIds: AppId[]): void {
        this.IDs = appIds;
    }
}