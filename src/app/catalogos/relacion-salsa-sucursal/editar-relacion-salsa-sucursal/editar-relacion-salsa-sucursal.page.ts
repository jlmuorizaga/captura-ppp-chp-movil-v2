import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-relacion-salsa-sucursal',
  templateUrl: './editar-relacion-salsa-sucursal.page.html',
  styleUrls: ['./editar-relacion-salsa-sucursal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarRelacionSalsaSucursalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
