import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-relacion-promocion-especial-sucursal',
  templateUrl: './editar-relacion-promocion-especial-sucursal.page.html',
  styleUrls: ['./editar-relacion-promocion-especial-sucursal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarRelacionPromocionEspecialSucursalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
