import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { RegionService } from 'src/app/services/region.service';
import { Region } from 'src/app/model/dto/region';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-productos-ppal',
  templateUrl: './productos-ppal.page.html',
  styleUrls: ['./productos-ppal.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProductosPpalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
