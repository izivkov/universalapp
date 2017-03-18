import { Injectable } from '@angular/core';

@Injectable()

export class ScreenInfo {
  // Other properties are created when loaded from Google Sheets.
  constructor(
    public name: string) 
    {}
}
