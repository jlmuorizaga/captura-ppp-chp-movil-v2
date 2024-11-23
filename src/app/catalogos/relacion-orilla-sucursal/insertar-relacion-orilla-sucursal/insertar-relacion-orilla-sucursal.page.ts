import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-insertar-relacion-orilla-sucursal',
  templateUrl: './insertar-relacion-orilla-sucursal.page.html',
  styleUrls: ['./insertar-relacion-orilla-sucursal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InsertarRelacionOrillaSucursalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
