import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../service/supabase.service';
import { Supermarket } from '../data/supermarket';
import { GeolocatorService } from '../service/geolocator.service';

@Component({
  selector: 'app-supermarket',
  templateUrl: 'supermarket.page.html',
  styleUrls: ['supermarket.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule // IonHeader, IonToolbar, IonTitle, IonContent, 
  ],
})
export class SupermarketPage implements OnInit {

  supermarkets: Array<Supermarket> | null = []

  latitude : number = 0
  longitude : number = 0
  //altitude : number | null = 0

  constructor(private supabaseService: SupabaseService,  public geolocationService : GeolocatorService) {}

  isLoading = true;

  ngOnInit() {
    this.getCurrentPosition();
    this.fetchNearbySupermarkets();
    //this.loadData()
    this.getCurrentPosition()
  }

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition()

    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
  }

  async fetchNearbySupermarkets() {
    try {
      const nearbySupermarkets = await this.supabaseService.getNearbySupermarkets(
        this.latitude,
        this.longitude
      );
      console.log('Nearby supermarkets:', nearbySupermarkets);
      this.supermarkets = nearbySupermarkets || [];
    } catch (error) {
      console.error('Error fetching nearby supermarkets:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  /*
  loadData () {
    this.supabaseService.getSupermarkets()
      .then(data => {
        console.log('Fetched supermarkets in SupermarketPage:', data);
        this.supermarkets = data
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition()

    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
    this.altitude = position.coords.altitude
  }

  resetPosition () {
    this.latitude = 0
    this.longitude = 0
    this.altitude = 0
  }
  */

  /*
  async fetchSupermarkets() {
    const fetchedSupermarkets = await this.supabaseService.getSupermarkets();
    console.log('Fetched supermarkets in RecipePage:', fetchedSupermarkets);
    this.supermarkets = fetchedSupermarkets || []; // Handle null by assigning an empty array
  }
  */
}
