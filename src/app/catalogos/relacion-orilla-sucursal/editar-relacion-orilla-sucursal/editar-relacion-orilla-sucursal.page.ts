import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-relacion-orilla-sucursal',
  templateUrl: './editar-relacion-orilla-sucursal.page.html',
  styleUrls: ['./editar-relacion-orilla-sucursal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarRelacionOrillaSucursalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
