import { Injectable } from '@angular/core';

// Keeps information loaded from 'screens' Google sheets.

export class ScreenInfo {
  // Other properties are created when loaded from Google Sheets.
  constructor(
    public name: string) 
    {}
}
