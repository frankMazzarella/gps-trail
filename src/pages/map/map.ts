import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Map, tileLayer, Marker, LayerGroup } from 'leaflet';
import { Subscription } from 'rxjs';
import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import { MenuPage } from '../menu/menu';
import { LocationProvider } from '../../providers/location/location';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnDestroy {
  // TODO: should this guy be private or something?
  // TODO: rename currentLocation to currentPosition in this class and location provider
  @ViewChild('map') mapContainer: ElementRef;
  private map: Map;
  private currentLocationSubscription: Subscription;
  private backgroundGeolocationResponse: BackgroundGeolocationResponse;
  private positionMarkersLayer = new LayerGroup<Marker>();
  private positionMarkers: Marker[] = [];

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public locationProvider: LocationProvider
  ) {
    this.currentLocationSubscription = locationProvider.currentLocationBehaviorSubject
      .subscribe(currentLocation => this.setLocation(currentLocation));
  }

  public ionViewDidEnter(): void {
    this.initMap();
  }

  public ngOnDestroy(): void {
    this.currentLocationSubscription.unsubscribe();
  }

  public presentPopover(myEvent): void {
    let popover = this.popoverCtrl.create(MenuPage);
    popover.present({ ev: myEvent });
  }

  private initMap(): void {
    this.map = new Map('map');
    this.map.setView([20, -80], 3);
    const tiles = 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ce575a1d51d3476f8bb5841222b71159';
    const attribution = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, ' +
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    tileLayer(tiles, { attribution, maxZoom: 19 }).addTo(this.map);
    this.positionMarkersLayer.addTo(this.map);
  }

  private setLocation(backgroundGeolocationResponse: BackgroundGeolocationResponse): void {
    this.backgroundGeolocationResponse = backgroundGeolocationResponse;
    if (this.map) {
      const lat = this.backgroundGeolocationResponse.latitude;
      const long = this.backgroundGeolocationResponse.longitude;
      const marker = new Marker([lat, long]);
      this.positionMarkersLayer.addLayer(marker);
      this.map.setView([lat, long], 19);
    }
  }
}
