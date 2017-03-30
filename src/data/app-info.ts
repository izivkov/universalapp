// Keeps information loaded from 'screens' Google sheets.

export class AppInfo {
  // Other properties are created when loaded from Google Sheets.
  constructor(
    public name: string, public selected: boolean, public sheetId: string) 
    {}
}
