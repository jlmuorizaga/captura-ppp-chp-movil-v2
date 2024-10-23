import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-insertar-categoria',
  templateUrl: './insertar-categoria.page.html',
  styleUrls: ['./insertar-categoria.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InsertarCategoriaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
