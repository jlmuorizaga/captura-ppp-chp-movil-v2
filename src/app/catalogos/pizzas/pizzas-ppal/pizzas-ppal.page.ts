import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pizzas-ppal',
  templateUrl: './pizzas-ppal.page.html',
  styleUrls: ['./pizzas-ppal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PizzasPpalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
