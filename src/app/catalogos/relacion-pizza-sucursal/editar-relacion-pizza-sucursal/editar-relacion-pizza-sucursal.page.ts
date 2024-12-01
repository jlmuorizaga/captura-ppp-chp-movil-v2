import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-relacion-pizza-sucursal',
  templateUrl: './editar-relacion-pizza-sucursal.page.html',
  styleUrls: ['./editar-relacion-pizza-sucursal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarRelacionPizzaSucursalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
