import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-insertar-relacion-pizza-sucursal',
  templateUrl: './insertar-relacion-pizza-sucursal.page.html',
  styleUrls: ['./insertar-relacion-pizza-sucursal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InsertarRelacionPizzaSucursalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
