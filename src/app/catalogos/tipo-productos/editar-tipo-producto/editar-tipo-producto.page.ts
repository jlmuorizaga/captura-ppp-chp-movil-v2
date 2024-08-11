import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-tipo-producto',
  templateUrl: './editar-tipo-producto.page.html',
  styleUrls: ['./editar-tipo-producto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarTipoProductoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
