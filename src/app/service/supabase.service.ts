import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Recipe } from '../data/recipe';
import { Supermarket } from '../data/supermarket';

export const SUPERMARKET_TABLE = 'supermarket'
export const RECIPE_TABLE = 'recipe'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
   }

   createLoader() {
    return this.loadingCtrl.create()
  }

  async getSupermarkets() {
    const { data, error } = await this.supabase
      .from(SUPERMARKET_TABLE)
      .select('*');
    console.log('Supabase Response:', { data, error });
    return data || [];
  }

  async getNearbySupermarkets(latitude: number, longitude: number): Promise<Supermarket[] | null> {
    try {
      const response: any = await this.supabase
        .from('supermarket')  // Replace 'your_schema' with your actual schema name
        .select('*');

      const { data, error } = response as { data: Supermarket[], error: any };

      if (error) {
        throw error;
      }

      // Calculate distances and sort the supermarkets
      const sortedSupermarkets = data
        .map(supermarket => ({
          ...supermarket,
          distance: haversineDistance(
            { latitude, longitude },
            { latitude: supermarket.latitude, longitude: supermarket.longitude }
          ),
        }))
        .sort((a, b) => a.distance - b.distance);

      return sortedSupermarkets || [];
    } catch (error) {
      console.error('Error fetching nearby supermarkets:', error);
      return null;
    }
  }
  /*
  async getNearbySupermarkets(latitude: number, longitude: number): Promise<Supermarket[] | null> {
    try {
      const response: any = await this.supabase
        .from('supermarket')
        .select('*');

      const { data, error } = response as { data: Supermarket[], error: any };

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching nearby supermarkets:', error);
      return null;
    }
  }
  */
  async getRecipes() {
    const { data, error } = await this.supabase
      .from(RECIPE_TABLE)
      .select('*');
    console.log('Supabase Response:', { data, error });
    return data || [];
  }

  async createRecipe(recipe : Recipe) {
    const {data, error} = await this.supabase
      .from(RECIPE_TABLE)
      .insert({
        title: recipe.title,
        instructions: recipe.instructions,
        image: recipe.image
      })
      .select('*')
      .single();

    return data
  }






  /*
   async getSupermarkets() {
    const { data, error } = await this.supabase
      .from(SUPERMARKET_TABLE).select('*');

    if (error) {
      console.error('Error fetching data:', error.message);
    }
    console.log('Fetched data:', data);

    return data || []; // Return an empty array if data is null
  }
  */
}
function haversineDistancee(arg0: { latitude: number; longitude: number; }, arg1: { latitude: number; longitude: number; }): any {
  throw new Error('Function not implemented.');
}

function haversineDistance(
  coord1: { latitude: number; longitude: number },
  coord2: { latitude: number; longitude: number }
): number {
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) * Math.cos(toRadians(coord2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

