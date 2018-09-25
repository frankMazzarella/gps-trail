import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';

@Injectable()
export class LocationProvider {
  constructor(public geolocation: Geolocation, public toastController: ToastController) {
    geolocation.getCurrentPosition()
      .then(location => console.table(location))
      .catch(() => this.presentToast('Error detecting device location'));
  }

  private presentToast(message: string) {
    const toast = this.toastController.create({ message, duration: 5000 });
    toast.present();
  }
}
