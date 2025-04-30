import { TamanioPizzaService } from './../../../services/tamanio-pizza.service';
import { TamanioPizza } from './../../../model/dto/tamanio-pizza';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-insertar-tamanios-pizza',
  templateUrl: './insertar-tamanios-pizza.page.html',
  styleUrls: ['./insertar-tamanios-pizza.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})
export class InsertarTamaniosPizzaPage implements OnInit{
  formularioTamanioPizza: FormGroup;
  cveSucursal: string = '';

  constructor(private fb: FormBuilder, private tamanioPizzaSvc: TamanioPizzaService,
    private globalService: GlobalService,
    private router: Router) {
    this.formularioTamanioPizza = this.fb.group({

     // id: ['', Validators.required],
      nombre: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar-tamanio-pizza.page.ts en OnInit');
  }

  insertaTamanioPizza() {
    if (this.formularioTamanioPizza.valid) {
      console.log(this.formularioTamanioPizza.value)
      let tamanioPizza: TamanioPizza = new TamanioPizza();
      tamanioPizza.id = Utilerias.generaId();
      tamanioPizza.nombre = this.formularioTamanioPizza.value.nombre;
      this.tamanioPizzaSvc.insertaTamanioPizza(tamanioPizza).subscribe({
        next: (res: any) => {
          console.log('Tamaño Pizza insertada de forma exitosa')
          console.log(res);
          this.saltaATamaniosPizza();

        },
        error: (error: any) => {
          console.log('Error en la inserción de la región')
          console.log(error)

        }
      })

    }
  }

  saltaATamaniosPizza() {
    this.router.navigateByUrl('/tamanios-pizza-ppal');
  }
}
