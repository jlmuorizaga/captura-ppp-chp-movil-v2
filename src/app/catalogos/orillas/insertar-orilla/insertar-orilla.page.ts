import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

import { Orilla } from 'src/app/model/dto/orilla';
import { OrillaService } from 'src/app/services/orilla.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { TamanioPizza } from 'src/app/model/dto/tamanio-pizza';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { TamanioPizzaService } from 'src/app/services/tamanio-pizza.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-insertar-orilla',
  templateUrl: './insertar-orilla.page.html',
  styleUrls: ['./insertar-orilla.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard,
    IonInput, IonSelect, IonSelectOption,ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol,
    IonBackButton,IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    SharedModule]
})
export class InsertarOrillaPage{
  formularioOrilla:FormGroup;
  navigationSubscription: Subscription;
  tamaniosPizza!: TamanioPizza[];
  mensaje:string;


  constructor(private tamaniosPizzaSvc: TamanioPizzaService, private fb: FormBuilder,
    private orillasSvc: OrillaService,
    private router: Router, private cdr: ChangeDetectorRef) {

    this.formularioOrilla = this.fb.group({
      descripcion: ['', Validators.required],
      idTamanio: ['', Validators.required],
    })

    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerTamanioPizzas();
      });

}

leerTamanioPizzas() {
  this.tamaniosPizzaSvc.dameListaTamanioPizza().subscribe({
    next: (res: any) => {
      console.log('Servicio leido de forma exitosa')
      console.log(res);
      this.tamaniosPizza = res;
      console.log(this.tamaniosPizza);
      this.tamaniosPizza
      this.cdr.detectChanges();

    },
    error: (error: any) => {
      console.log('Error en la lectura del servicio')
      console.log(error)

    }
  })
}

insertaOrilla() {
  if (this.formularioOrilla.valid) {
    console.log(this.formularioOrilla.value)
    let orilla: Orilla = new Orilla();
    orilla.id = Utilerias.generaId();
    orilla.descripcion = this.formularioOrilla.value.descripcion;
    orilla.idTamanio=this.formularioOrilla.value.idTamanio;

    this.orillasSvc.insertaOrilla(orilla).subscribe({
      next: (res: any) => {
        console.log('Orilla insertada de forma exitosa')
        console.log(res);
        this.saltaAOrillas();

      },
      error: (error: any) => {
        console.log('Error en la inserción de la región')
        console.log(error)

      }
    })

  }
}
saltaAOrillas() {
  this.router.navigateByUrl('/orillas-ppal');
}

}
