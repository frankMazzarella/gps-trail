import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
} from '@ionic-native/background-geolocation';

@Injectable()
export class LocationProvider {
  public currentLocationBehaviorSubject = new BehaviorSubject<BackgroundGeolocationResponse>(undefined);

  constructor(public backgroundGeolocation: BackgroundGeolocation, public toastController: ToastController) {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
    };

    backgroundGeolocation.configure(config).subscribe(
      location => this.publishCurrentLocation(location),
      err => this.presentToast(`GPS Error: ${err}`, 10000)
    );
    backgroundGeolocation.start();
  }

  private presentToast(message: string, duration = 3000) {
    this.toastController.create({
      message,
      duration,
      closeButtonText: 'Okay',
      showCloseButton: true
    }).present();
  }

  private publishCurrentLocation(geoposition: BackgroundGeolocationResponse): void {
    this.presentToast('updating location');
    this.currentLocationBehaviorSubject.next(geoposition);
  }
}
