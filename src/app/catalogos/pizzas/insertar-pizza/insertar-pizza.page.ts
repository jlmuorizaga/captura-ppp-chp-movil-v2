import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-insertar-pizza',
  templateUrl: './insertar-pizza.page.html',
  styleUrls: ['./insertar-pizza.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InsertarPizzaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
