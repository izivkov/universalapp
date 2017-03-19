import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ScreenInfo } from '../data/screen-info';

export abstract class Page implements OnInit {

    abstract ngOnInit();

    constructor(private screen: ScreenInfo) {
    }
}