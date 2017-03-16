import { OnInit } from '@angular/core';

import { ScreensService } from '../data/screens.service';
import { Screen } from '../data/screen';

export abstract class Page implements OnInit {

    abstract ngOnInit();

    errorMessage: string;
    screen: Screen = {name:''};

    getScreen(name: string) {
        return this.screensService.getScreens()
            .subscribe(
            screens => {
                this.screen = { name: '' };
                for (let i in screens) {
                    let screen = screens[i];
                    if (screen.name === name) {
                        this.screen = screen;
                        break;
                    }
                }
            },
            error => this.errorMessage = <any>error);
    }

    constructor(private screensService: ScreensService) {
    }
}