import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

import { Pizza } from 'src/app/model/dto/pizza';
import { Especialidad } from 'src/app/model/dto/especialidad';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { TamanioPizza } from 'src/app/model/dto/tamanio-pizza';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TamanioPizzaService } from 'src/app/services/tamanio-pizza.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-insertar-pizza',
  templateUrl: './insertar-pizza.page.html',
  styleUrls: ['./insertar-pizza.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput, IonSelect, IonSelectOption,
    ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})

export class InsertarPizzaPage{
  formularioPizza:FormGroup;
  navigationSubscription: Subscription;
  especialidad!: Especialidad[];
  tamanioPizza!:TamanioPizza[];
  mensaje: string;

  constructor(private especialidadSvc: EspecialidadService, private fb: FormBuilder,
    private tamanioPizzaSvc: TamanioPizzaService,private pizzaSvc:PizzaService,
    private router: Router, private cdr: ChangeDetectorRef)  { 
      this.formularioPizza = this.fb.group({

        idEspecialidad: ['', Validators.required],
        idTamanioPizza: ['', Validators.required],
        aplica2x1: ['', Validators.required],
        categoria1: ['', Validators.required],
        categoria2: ['', Validators.required],
        categoria3: ['', Validators.required],
      })
      this.mensaje = 'Estoy en el constructor';
      this.navigationSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.leerEspecialidades();
        });

        this.navigationSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.leerTamanioPizzas();
        });        

    }

    leerEspecialidades() {
      this.especialidadSvc.dameListaEspecialidades().subscribe({
        next: (res: any) => {
          console.log('Servicio leido de forma exitosa')
          console.log(res);
          this.especialidad = res;
  
          console.log(this.especialidad);
          this.especialidad
          this.cdr.detectChanges();
  
        },
        error: (error: any) => {
          console.log('Error en la lectura del servicio')
          console.log(error)

        }
      })
    }

    leerTamanioPizzas() {
      this.tamanioPizzaSvc.dameListaTamanioPizza().subscribe({
        next: (res: any) => {
          console.log('Servicio leido de forma exitosa')
          console.log(res);
          this.tamanioPizza = res;
  
          console.log(this.tamanioPizza);
          this.tamanioPizza
          this.cdr.detectChanges();
  
        },
        error: (error: any) => {
          console.log('Error en la lectura del servicio')
          console.log(error)

        }
      })
    }    

    insertaPizza() {
      if (this.formularioPizza.valid) {
        console.log(this.formularioPizza.value)
        let pizza: Pizza = new Pizza();
        pizza.idPizza = Utilerias.generaId();
        pizza.idEspecialidad=this.formularioPizza.value.idEspecialidad;
        pizza.idTamanioPizza=this.formularioPizza.value.idTamanioPizza;
        pizza.aplica2x1=this.formularioPizza.value.aplica2x1;
        pizza.categoria1=this.formularioPizza.value.categoria1;
        pizza.categoria2=this.formularioPizza.value.categoria2;
        pizza.categoria3=this.formularioPizza.value.categoria3
        this.pizzaSvc.insertaPizza(pizza).subscribe({
          next: (res: any) => {
            console.log('Pizza insertada de forma exitosa')
            console.log(res);
            this.saltaAPizzas();
  
          },
          error: (error: any) => {
            console.log('Error en la inserción de la pizza')
            console.log(error)
  
          }
        })
  
      }
    }
    saltaAPizzas() {
      this.router.navigateByUrl('/pizzas-ppal');
    }    

}
