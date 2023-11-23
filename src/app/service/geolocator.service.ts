import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocatorService {

  constructor() { }

  public async getCurrentPosition () {

    let attrs = {enableHighAccuracy: true}

    const coordinates = await Geolocation.getCurrentPosition(attrs);

    return coordinates;

  }
}
