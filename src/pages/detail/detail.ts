import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

class ButtonWithData {
    name: string;
    text: string;
    image: string;
    video: string;
    style: Object;
};

@Component({
    selector: 'detail',
    templateUrl: 'detail.html',
})

export class DetailPage implements OnInit {

    button: ButtonWithData;

    ngOnInit() {
    }

    getVideo () : string {
        return this.button.video;
    }

    constructor(public _navCtrl: NavController, private sanitizer: DomSanitizer, public params: NavParams) {
        var _button = params.data.button;

        this.button = new ButtonWithData();
        this.button.name = _button['name'];
        this.button.text = _button['text'];
        this.button.image = _button['image'];
        this.button.video = _button['video'];
        this.button.style = _button['style'];

        // console.log ("Video: " + this.button.video);
    }
}
