import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Recipe } from '../data/recipe';
import { SupabaseService } from '../service/supabase.service';

@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  styleUrls: ['recipe.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule //IonHeader, IonToolbar, IonTitle, IonContent, 
],
})
export class RecipePage {

  recipes: Array<Recipe> | null = []

  //rootPage = RecipeContentPage;
  /*
  recipes = [
    {
      title: 'Recipe 1',
      text: 'Description for Recipe 1.',
      imageUrl: 'path/to/recipe1-image.jpg',
    },
    {
      title: 'Recipe 2',
      text: 'Description for Recipe 2.',
      imageUrl: 'path/to/recipe1-image.jpg',
    },
    // Add more recipes as needed
  ];
  */

  constructor(private supabaseService: SupabaseService) {}

  isLoading = true;

  ngOnInit() {
    this.loadData()
  }

  loadData () {
    this.supabaseService.getRecipes()
      .then(data => {
        console.log('Fetched recipes in RecipePage:', data);
        this.recipes = data
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }
}
 