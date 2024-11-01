import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-orilla',
  templateUrl: './editar-orilla.page.html',
  styleUrls: ['./editar-orilla.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarOrillaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
