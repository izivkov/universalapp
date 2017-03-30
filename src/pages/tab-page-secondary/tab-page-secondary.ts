import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Page } from '../page';

@Component({
  selector: 'tab-page-secondary',
  templateUrl: 'tab-page-secondary.html'
})

export class TabPageSecondary extends Page {

  ngOnInit() {
  }

  constructor(private navParams: NavParams) {
    super (navParams.data.screen);
  }
}
