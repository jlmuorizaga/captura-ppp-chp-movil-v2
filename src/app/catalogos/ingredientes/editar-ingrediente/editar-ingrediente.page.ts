import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-ingrediente',
  templateUrl: './editar-ingrediente.page.html',
  styleUrls: ['./editar-ingrediente.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarIngredientePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
