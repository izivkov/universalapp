export class ConfigService {
    static getButtonsUrl(): string {
        return "https://spreadsheets.google.com/feeds/list/" + "1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4" + "/od6/public/values?alt=json";
    }
    static getScreensUrl(): string {
        return "https://spreadsheets.google.com/feeds/list/" + "1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4" + "/2/public/values?alt=json";
    }

    static getSettings(): string {
        return `{"sheetIds" : [
            {"Pain Management": "1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4"},
            {"Portfolio": "1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4"},
            {"Recepies": "1bpXqkFsjrKYHWGi69FGcfD8uFNFJ9yyWhDK0D_oqEU4"}
            ]}`
    }
}