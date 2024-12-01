import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-relacion-pizza-sucursal-ppal',
  templateUrl: './relacion-pizza-sucursal-ppal.page.html',
  styleUrls: ['./relacion-pizza-sucursal-ppal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelacionPizzaSucursalPpalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
