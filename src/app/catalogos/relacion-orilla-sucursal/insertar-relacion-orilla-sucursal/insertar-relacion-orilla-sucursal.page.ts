import { RelacionOrillaSucursalNoEstaEnOrilla } from './../../../model/dto/relacion-orilla-sucursal-no-esta-en-orilla';
import { RelacionOrillaSucursalService } from 'src/app/services/relacion-orilla-sucursal.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

import { RelacionOrillaSucursal } from 'src/app/model/dto/relacion-orilla-sucursal';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-insertar-relacion-orilla-sucursal',
  templateUrl: './insertar-relacion-orilla-sucursal.page.html',
  styleUrls: ['./insertar-relacion-orilla-sucursal.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard,
    IonInput, IonSelect, IonSelectOption,ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol,
    IonBackButton,IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    SharedModule]
})
export class InsertarRelacionOrillaSucursalPage implements OnInit{
    formularioROS:FormGroup;
    navigationSubscription: Subscription;
    mensaje:string;
    idSucursal:string;
    relacionOrillaSucursalNoEstaEnOrilla!: RelacionOrillaSucursalNoEstaEnOrilla[];
    cveSucursal: string = '';

  constructor(private relacionOrillaSucursalSvc: RelacionOrillaSucursalService, 
    private fb:FormBuilder,
    private router: Router,
    private globalService: GlobalService,
    private sucursalesSvc: SucursalService,private cdr: ChangeDetectorRef) {
      this.formularioROS = this.fb.group({
        idOrilla: ['', Validators.required],
        precio: ['', Validators.required],
      })
      this.mensaje = 'Estoy en el constructor';
      this.idSucursal = this.globalService.idSucursalGlobal;
      this.navigationSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.dameListadoOrillasNoEstanEnROS(this.idSucursal);
        });
    }
    ngOnInit() {
      this.cveSucursal = this.globalService.cveSucursalGlobal;
      console.log('Entré a insertar-relacion-orilla-sucursal en OnInit');
    }
    dameListadoOrillasNoEstanEnROS(idSucursal:string) {
      this.relacionOrillaSucursalSvc.dameListadoOrillasNoEstanEnROS(idSucursal).subscribe({
        next: (res: any) => {
          console.log('Servicio leido de forma exitosa')
          console.log(res);
          this.relacionOrillaSucursalNoEstaEnOrilla = res;
          console.log(this.relacionOrillaSucursalNoEstaEnOrilla);
          this.cdr.detectChanges();

        },
        error: (error: any) => {
          console.log('Error en la lectura del servicio')
          console.log(error)

        }
      })
    }

    insertaROS() {
      if (this.formularioROS.valid) {
        console.log(this.formularioROS.value)
        let ros: RelacionOrillaSucursal = new RelacionOrillaSucursal();
        ros.idOrilla=this.formularioROS.value.idOrilla;
        ros.idSucursal=this.idSucursal;
        ros.precio=this.formularioROS.value.precio;        


       this.relacionOrillaSucursalSvc.insertaRegistroRelacionOrillaSucursal(ros).subscribe({
          next: (res: any) => {
            console.log('Registro ROS insertado de forma exitosa')
            console.log(res);
            this.saltaAROS();

          },
          error: (error: any) => {
            console.log('Error en la inserción del RPS')
            console.log(error)
          }
        })

      }
    }
    
    saltaAROS() {
      this.router.navigateByUrl('/relacion-orilla-sucursal-ppal');
    }    

}
