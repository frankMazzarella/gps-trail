import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Map, tileLayer, Marker, LayerGroup } from 'leaflet';
import { Subscription } from 'rxjs';
import { Geoposition } from '@ionic-native/geolocation';

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
  private currentLocation: Geoposition;
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
    this.map.setView([0, 0], 14);
    const tiles = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png';
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
    tileLayer(tiles, { attribution, maxZoom: 20 }).addTo(this.map);
    this.positionMarkersLayer.addTo(this.map);
  }

  private setLocation(geoposition: Geoposition): void {
    this.currentLocation = geoposition;
    if (this.map) {
      const lat = this.currentLocation.coords.latitude;
      const long = this.currentLocation.coords.longitude;
      const marker = new Marker([lat, long]);
      this.positionMarkersLayer.clearLayers();
      this.positionMarkersLayer.addLayer(marker);
      this.map.setView([lat, long], 18);
    }
  }
}

/*

    const tiles = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png';
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

    const tiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, ' +
      'Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

    const tiles = 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}';
    const attribution = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, ' +
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

*/
