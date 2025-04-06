import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonHeader, IonContent, IonToolbar, IonTitle,IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-cargar-imagen',
  standalone: true,
  templateUrl: './cargar-imagen.component.html',
  styleUrls: ['./cargar-imagen.component.scss'],
  imports:[IonContent,IonHeader,IonToolbar,IonTitle,IonButton, HttpClientModule,CommonModule,FormsModule]
})
export class CargarImagenComponent{
  selectedFile: File | null = null;
  uploadResponse: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post<{ message: string }>('http://ec2-54-144-58-67.compute-1.amazonaws.com:3005/upload', formData).subscribe({
      next: res => this.uploadResponse = res.message,
      error: err => this.uploadResponse = 'Error al subir la imagen',
    });
  }

}
