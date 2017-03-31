import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';


@Injectable()
export class Utils {

    constructor(private toastCtrl: ToastController) {
    }

    showToast(message: string): void {
        const toast = this.toastCtrl.create({
            message: message,
            showCloseButton: true,
            duration: 3000
        });
        toast.present();
    }
}