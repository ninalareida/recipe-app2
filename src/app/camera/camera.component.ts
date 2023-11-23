import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CameraComponent {

  imageUrl : string | undefined
  @Output() imageChanged = new EventEmitter<string>();

  constructor() { }

  async takePicture() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.imageUrl = image.webPath;
    this.imageChanged.emit(this.imageUrl); // Emit the image URL
  }


  resetPicture () {
    this.imageUrl = ''
  }

  //ngOnInit() {}

}
