import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-relacion-producto-sucursal-ppal',
  templateUrl: './relacion-producto-sucursal-ppal.page.html',
  styleUrls: ['./relacion-producto-sucursal-ppal.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelacionProductoSucursalPpalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
