import { TamanioPizzaService } from './../../../services/tamanio-pizza.service';
import { TamanioPizza } from './../../../model/dto/tamanio-pizza';
import { RelacionEtpsService } from 'src/app/services/relacion-etps.service';
import { RelacionETPS } from 'src/app/model/dto/relacion-etps';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';


import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-insertar-relacion-etps',
  templateUrl: './insertar-relacion-etps.page.html',
  styleUrls: ['./insertar-relacion-etps.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput, IonSelect, IonSelectOption,
    ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})
export class InsertarRelacionEtpsPage{
  formularioETPS:FormGroup;
 // navigationSubscription: Subscription;
  tamanioPizza!:TamanioPizza[];


  constructor(private tamanioPizzaSvc: TamanioPizzaService, private fb: FormBuilder, private relacionETPS: RelacionETPS,
    private router: Router, private cdr: ChangeDetectorRef) {
      this.formularioETPS = this.fb.group({
        descripcion_p: ['', Validators.required],
        tamanio: ['', Validators.required],
        usa_salsa: ['', Validators.required],
        id_tipo_producto: ['', Validators.required],
        ruta_imagen: ['', Validators.required],
        categoria1: ['', Validators.required],
        categoria2: ['', Validators.required],
        categoria3: ['', Validators.required],
      })

  }


}
