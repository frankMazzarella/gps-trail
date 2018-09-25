import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Map, tileLayer } from 'leaflet';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  // TODO: should this guy be private or something?
  @ViewChild('map') mapContainer: ElementRef;
  private map: Map;

  constructor(public navCtrl: NavController) { }

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
    this.map = new Map("map");
    this.map.setView([41.461675, -75.59813919999999], 14);
    const tiles = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png';
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
    const layer = tileLayer(tiles, { attribution, maxZoom: 20 });
    layer.addTo(this.map);
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
