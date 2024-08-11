import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-insertar-tipo-producto',
  templateUrl: './insertar-tipo-producto.page.html',
  styleUrls: ['./insertar-tipo-producto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InsertarTipoProductoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
