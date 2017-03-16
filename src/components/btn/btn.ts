import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'btn',
  template: `<button ion-button [color]="color" 
    small="{{getAttributeValue ('small')}}"
    block="{{getAttributeValue ('block')}}"
    full="{{getAttributeValue ('full')}}"
    large="{{getAttributeValue ('large')}}"
    round="{{getAttributeValue ('round')}}"
    strong="{{getAttributeValue ('strong')}}"
    clear="{{getAttributeValue ('clear')}}"
    outline="{{getAttributeValue('outline')}}"

    [ngStyle]="getStyle()">    

    <i class="icon ion-loading-c"></i>{{name}}</button>`
})

export class Btn implements OnInit {
  ngOnInit(): void {
  };
  
  @Input() name: string;
  @Input() style: any;
  @Input() shape: string;
  @Input() color: string;
  @Input() size: string;

  getStyle(): any {
    let style:any = {};

    try {
      style = JSON.parse (this.style)  
    } catch (e) {
      return {};
    }

    return style;
  };

  getAttributeValue (attribute: string) : any {
    switch (attribute) {
      case 'block':
      case 'round':
      case 'full':
      case 'clear':
      case 'outline':
        return this.shape === attribute ? true : false;;

      case 'danger':
      case 'light':
      case 'dark':
      case 'secondary':
      case 'default':
        return this.color === attribute ? true : false;

      case 'small':
      case 'large':
      case 'default':
        return this.size === attribute ? true : false;
    }
    return "default";
  }

  constructor() {
  }
}
