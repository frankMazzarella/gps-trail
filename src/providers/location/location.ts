import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocationProvider {
  public currentLocationBehaviorSubject = new BehaviorSubject<Geoposition>(undefined);

  constructor(public geolocation: Geolocation, public toastController: ToastController) {
    // TODO: handle error
    geolocation.watchPosition().subscribe(
      location => this.publishCurrentLocation(location)
    );
  }

  private presentToast(message: string) {
    this.toastController.create({ message, duration: 5000 }).present();
  }

  private publishCurrentLocation(geoposition: Geoposition): void {
    this.currentLocationBehaviorSubject.next(geoposition);
  }
}
