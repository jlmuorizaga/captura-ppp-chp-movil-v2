import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-relacion-producto-sucursal',
  templateUrl: './editar-relacion-producto-sucursal.page.html',
  styleUrls: ['./editar-relacion-producto-sucursal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarRelacionProductoSucursalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
