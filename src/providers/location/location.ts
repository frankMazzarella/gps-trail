import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';

@Injectable()
export class LocationProvider {
  public currentLocationBehaviorSubject = new BehaviorSubject<BackgroundGeolocationResponse>(undefined);

  constructor(public backgroundGeolocation: BackgroundGeolocation, public toastController: ToastController) {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true
    };
    // TODO: handle error
    backgroundGeolocation.configure(config).subscribe(
      location => this.publishCurrentLocation(location)
    );

    backgroundGeolocation.start();
  }

  private presentToast(message: string) {
    this.toastController.create({ message, duration: 5000 }).present();
  }

  private publishCurrentLocation(geoposition: BackgroundGeolocationResponse): void {
    this.currentLocationBehaviorSubject.next(geoposition);
  }
}
