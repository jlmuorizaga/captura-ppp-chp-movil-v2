import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-promocion-especial',
  templateUrl: './editar-promocion-especial.page.html',
  styleUrls: ['./editar-promocion-especial.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarPromocionEspecialPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
