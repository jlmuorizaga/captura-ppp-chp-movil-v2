import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-insertar-orilla',
  templateUrl: './insertar-orilla.page.html',
  styleUrls: ['./insertar-orilla.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InsertarOrillaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
