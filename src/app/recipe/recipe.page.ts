import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, NavController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Recipe } from '../data/recipe';
import { SupabaseService } from '../service/supabase.service';
import { EditRecipePage } from '../edit-recipe/edit-recipe.page';

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

  constructor(private supabaseService: SupabaseService, private navController: NavController, private modalController: ModalController) {}

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

  deleteRecipe(recipeId: number) {
    // Implement your delete logic here
    // Make a call to your service to delete the recipe from the database
    this.supabaseService.deleteRecipe(recipeId)
      .then(() => {
        // If deletion is successful, remove the recipe from the local array
        this.recipes = this.recipes!.filter(recipe => recipe.id !== recipeId);
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  }

  editRecipe1(recipe: Recipe) {
    // Navigate to the edit page and pass the recipe object
    this.navController.navigateForward(['/edit-recipe', { recipe: JSON.stringify(recipe) }]);
  }

  async editRecipe(recipe: Recipe) {
    const modal = await this.modalController.create({
      component: EditRecipePage,
      componentProps: {
        recipe: { ...recipe }, // Pass a copy of the recipe to avoid modifying the original in the list
      },
    });

    modal.onDidDismiss().then((data) => {
      // If the modal was dismissed with changes, update the local recipe array
      if (data.data && data.data.dismissed) {
        const editedRecipe: Recipe = data.data.editedRecipe;
        const index = this.recipes!.findIndex((r) => r.id === editedRecipe.id);
        if (index !== -1) {
          this.recipes![index] = editedRecipe;
        }
      }
    });

    return await modal.present();
  }
}
