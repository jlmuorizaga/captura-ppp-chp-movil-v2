import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sucursales-ppal',
  templateUrl: './sucursales-ppal.page.html',
  styleUrls: ['./sucursales-ppal.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SucursalesPpalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
