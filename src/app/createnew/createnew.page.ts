import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Recipe } from '../data/recipe';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../service/supabase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraComponent } from '../camera/camera.component';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-createnew',
  templateUrl: 'createnew.page.html',
  styleUrls: ['createnew.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, CameraComponent // IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent
]
})
export class CreatenewPage {

  recipeForm: FormGroup;
  imageUrl: string | undefined;

  
  constructor(
    private supabaseService : SupabaseService,
    private formBuilder : FormBuilder,
    private router : Router,
    private route : ActivatedRoute,
    private notificationService: NotificationService,
    ) {
      this.recipeForm = this.formBuilder.group({
        title: ['', Validators.required],
        instructions: ['', Validators.required],
      });
    }

  
  async back () {
    await this.router.navigate(['tabs','recipe'])
  }

  saveRecipe() {
    const formData = this.recipeForm.value;
    formData.image = this.imageUrl; // Add the image URL to the form data

    this.supabaseService.createRecipe(formData).then(() => {
      this.notificationService.requestLocalNotificationPermission().then((permissionGranted) => {
        if (permissionGranted) {
          this.notificationService.sendLocalNotification('New Recipe Created', 'Check out the latest recipe!');
        }
      });

      this.back();
    });
    /*
    this.supabaseService.createRecipe(formData)
      .then(payload => {
        this.notificationComponent.requestLocalNotificationPermission();
        this.notificationComponent.sendLocalNotification();
        this.back();
      });
      */
    //this.notificationComponent.requestLocalNotificationPermission();
    //this.notificationComponent.sendLocalNotification();
  }

  handleImageChange(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  
}
