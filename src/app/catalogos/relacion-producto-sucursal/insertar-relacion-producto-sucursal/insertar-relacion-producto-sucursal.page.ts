import { RelacionProductoSucursalService } from './../../../services/relacion-producto-sucursal.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { RelacionProductoSucursal } from 'src/app/model/dto/relacion-producto-sucursal';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-insertar-relacion-producto-sucursal',
  templateUrl: './insertar-relacion-producto-sucursal.page.html',
  styleUrls: ['./insertar-relacion-producto-sucursal.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard,
    IonInput, IonSelect, IonSelectOption,ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol,
    IonBackButton,IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    SharedModule]
})
export class InsertarRelacionProductoSucursalPage{
  formularioRPS:FormGroup;
  navigationSubscription: Subscription;
  mensaje:string;
  idSucursal:string;
//relacionProductoSucursalNoEstaEnProducto!: RelacionProductoSucursalNoEstaEnProducto[];

   constructor(private relacionProductoSucursalSvc: RelacionProductoSucursalService, private fb:FormBuilder,
     private router: Router,
     private globalService: GlobalService,
     private sucursalesSvc: SucursalService,private cdr: ChangeDetectorRef) {
       this.formularioRPS = this.fb.group({
         idProducto: ['', Validators.required],
         precio: ['', Validators.required],
       })
       this.mensaje = 'Estoy en el constructor';
       this.idSucursal = this.globalService.idSucursalGlobal;
       this.navigationSubscription = this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe(() => {
           this.dameListadoProductosNoEstanEnRPS(this.idSucursal);
         });
     }

     dameListadoProductosNoEstanEnRPS(idSucursal:string) {
      this.relacionProductoSucursalSvc.dameListadoProductosNoEstanEnRPS(idSucursal).subscribe({
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

}
