import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { LocationProvider } from '../providers/location/location';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    LocationProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
