import { RelacionPizzaSucursalNoEstaEnPizza } from './../../../model/dto/relacion-pizza-sucursal-no-estan-en-pizza';
import { RelacionPizzaSucursalService } from 'src/app/services/relacion-pizza-sucursal.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

import { RelacionPizzaSucursal } from 'src/app/model/dto/relacion-pizza-sucursal';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-insertar-relacion-pizza-sucursal',
  templateUrl: './insertar-relacion-pizza-sucursal.page.html',
  styleUrls: ['./insertar-relacion-pizza-sucursal.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard,
    IonInput, IonSelect, IonSelectOption,ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol,
    IonBackButton,IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    SharedModule]
})
export class InsertarRelacionPizzaSucursalPage implements OnInit{
  formularioRPS:FormGroup;
  navigationSubscription: Subscription;
  mensaje:string;
  idSucursal:string;
  relacionPizzaSucursalNoEstaEnPizza!: RelacionPizzaSucursalNoEstaEnPizza[];
  cveSucursal: string = '';

  constructor(private relacionPizzaSucursalSvc: RelacionPizzaSucursalService, private fb:FormBuilder,
    private router: Router,
    private globalService: GlobalService,
    private sucursalesSvc: SucursalService,private cdr: ChangeDetectorRef) {
      this.formularioRPS = this.fb.group({
        idPizza: ['', Validators.required],
        precioX2: ['', Validators.required],
        precioX1: ['', Validators.required],
      })
      this.mensaje = 'Estoy en el constructor';
      this.idSucursal = this.globalService.idSucursalGlobal;
      this.navigationSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.dameListadoPizzasNoEstanEnRPS(this.idSucursal);
        });
    }

    ngOnInit() {
      this.cveSucursal = this.globalService.cveSucursalGlobal;
      console.log('Entré a insertar-relacion-pizza-sucursal.page.ts en OnInit');
    }

    dameListadoPizzasNoEstanEnRPS(idSucursal:string) {
      this.relacionPizzaSucursalSvc.dameListadoPizzasNoEstanEnRPS(idSucursal).subscribe({
        next: (res: any) => {
          console.log('Servicio leido de forma exitosa')
          console.log(res);
          this.relacionPizzaSucursalNoEstaEnPizza = res;
          console.log(this.relacionPizzaSucursalNoEstaEnPizza);
          this.cdr.detectChanges();

        },
        error: (error: any) => {
          console.log('Error en la lectura del servicio')
          console.log(error)

        }
      })
    }

    insertaRPS() {
      if (this.formularioRPS.valid) {
        console.log(this.formularioRPS.value)
        let rps: RelacionPizzaSucursal = new RelacionPizzaSucursal();
        rps.idPizza=this.formularioRPS.value.idPizza;
        rps.idSucursal=this.idSucursal;
        rps.precioX2=this.formularioRPS.value.precioX2;
        rps.precioX1=this.formularioRPS.value.precioX1;


       this.relacionPizzaSucursalSvc.insertaRegistroRPS(rps).subscribe({
          next: (res: any) => {
            console.log('Registro RPS insertada de forma exitosa')
            console.log(res);
            this.saltaARPS();

          },
          error: (error: any) => {
            console.log('Error en la inserción del RPS')
            console.log(error)

          }
        })

      }
    }

    saltaARPS() {
      this.router.navigateByUrl('/relacion-pizza-sucursal-ppal');
    }
}
