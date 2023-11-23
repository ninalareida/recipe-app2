import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, IonicModule } from '@ionic/angular';
import { Recipe } from '../data/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: 'edit-recipe.page.html',
  styleUrls: ['edit-recipe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class EditRecipePage implements OnInit {
  recipe?: Recipe;

  constructor(private navParams: NavParams, private modalController: ModalController) {}

  ngOnInit() {
    // Get the recipe passed from the parent component
    this.recipe = this.navParams.get('recipe');
  }

  saveChanges() {
    // Implement the logic to save changes to the recipe
    // You can call your supabaseService to update the recipe in the database

    // For example, assuming you have an updateRecipe method in your service
    // this.supabaseService.updateRecipe(this.recipe);

    // Close the modal after saving changes
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  dismiss() {
    // Dismiss the modal without saving changes
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
