import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-tamanios-pizza',
  templateUrl: './editar-tamanios-pizza.page.html',
  styleUrls: ['./editar-tamanios-pizza.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarTamaniosPizzaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
