import { RelacionSalsaSucursalService } from 'src/app/services/relacion-salsa-sucursal.service';
import { RelacionSalsaSucursalNoEstaEnSalsa } from 'src/app/model/dto/relacion-salsa-sucursal-no-esta-en-salsa';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { RelacionSalsaSucursal } from './../../../model/dto/relacion-salsa-sucursal';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-insertar-relacion-salsa-sucursal',
  templateUrl: './insertar-relacion-salsa-sucursal.page.html',
  styleUrls: ['./insertar-relacion-salsa-sucursal.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard,
    IonInput, IonSelect, IonSelectOption,ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol,
    IonBackButton,IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    SharedModule]
})
export class InsertarRelacionSalsaSucursalPage implements OnInit{
  formularioRSS:FormGroup;
  navigationSubscription: Subscription;
  idSucursal:string;
  relacionSalsaSucursalNoEstaEnSalsa!: RelacionSalsaSucursalNoEstaEnSalsa[];
  cveSucursal: string = '';

  constructor(private relacionSalsaSucursalSvc: RelacionSalsaSucursalService, private fb:FormBuilder,
    private router: Router,
    private globalService: GlobalService,
    private sucursalesSvc: SucursalService,private cdr: ChangeDetectorRef) {
      this.formularioRSS = this.fb.group({
        idSalsa: ['', Validators.required],
      })
      this.idSucursal = this.globalService.idSucursalGlobal;
      this.navigationSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.dameListadoSalsasNoEstanEnRSS(this.idSucursal);
        });
     }
     ngOnInit() {
      this.cveSucursal = this.globalService.cveSucursalGlobal;
      console.log('Entré a insertar-relacion-salsa-sucursal.page.ts en OnInit');
    }

     dameListadoSalsasNoEstanEnRSS(idSucursal:string) {
      this.relacionSalsaSucursalSvc.dameListadoSalsasNoEstanEnRSS(idSucursal).subscribe({
        next: (res: any) => {
          console.log('Servicio leido de forma exitosa')
          console.log(res);
          this.relacionSalsaSucursalNoEstaEnSalsa = res;
          console.log(this.relacionSalsaSucursalNoEstaEnSalsa);
          this.cdr.detectChanges();

        },
        error: (error: any) => {
          console.log('Error en la lectura del servicio')
          console.log(error)

        }
      })
    }
    insertaRSS() {
      if (this.formularioRSS.valid) {
        console.log(this.formularioRSS.value)
        let rss: RelacionSalsaSucursal = new RelacionSalsaSucursal();
        rss.idSalsa=this.formularioRSS.value.idSalsa;
        rss.idSucursal=this.idSucursal;
       this.relacionSalsaSucursalSvc.insertaRegistroRSS(rss).subscribe({
          next: (res: any) => {
            console.log('Registro RSS insertada de forma exitosa')
            console.log(res);
            this.saltaARSS();

          },
          error: (error: any) => {
            console.log('Error en la inserción del RPS')
            console.log(error)

          }
        })

      }
    }
    saltaARSS() {
      this.router.navigateByUrl('/relacion-salsa-sucursal-ppal');
    }
}
