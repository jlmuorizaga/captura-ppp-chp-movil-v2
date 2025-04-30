import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

import { Sucursal } from 'src/app/model/dto/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { Region } from 'src/app/model/dto/region';
import { filter } from 'rxjs/operators';
import { NavigationEnd,Router } from '@angular/router';
import { RegionService } from 'src/app/services/region.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-insertar-sucursal',
  templateUrl: './insertar-sucursal.page.html',
  styleUrls: ['./insertar-sucursal.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput, IonSelect, IonSelectOption,
    ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})
export class InsertarSucursalPage implements OnInit{
  formularioSucursal: FormGroup;
  navigationSubscription:Subscription;
  regiones!:Region[];
  cveSucursal: string = '';



  constructor(private regionesSvc:RegionService,private fb:FormBuilder,
    private globalService: GlobalService,
    private sucursalesSvc: SucursalService,
    private router: Router,private cdr:ChangeDetectorRef) {
      this.formularioSucursal=this.fb.group({
        clave: ['', Validators.required],
        nombre_sucursal: ['', Validators.required],
        rfc: ['', Validators.required],
        domicilio: ['', Validators.required],
        telefono: ['', Validators.required],
        hora_inicio: ['', Validators.required],
        hora_fin: ['', Validators.required],
        latitud: ['', Validators.required],
        longitud: ['', Validators.required],
        id_region: ['', Validators.required],
        venta_activa: ['', Validators.required],
        pk: ['', Validators.required],
        sk: ['', Validators.required],
        monto_minimo_entrega_sucursal: ['', Validators.required],
        monto_minimo_entrega_domicilio: ['', Validators.required],

      })
      this.navigationSubscription=this.router.events
      .pipe(filter(event=>event instanceof NavigationEnd))
      .subscribe(()=>{
        this.leerRegiones();
      });
     }
     ngOnInit() {
      this.cveSucursal = this.globalService.cveSucursalGlobal;
      console.log('Entré a insertar-sucursal.page.ts en OnInit');
    }

     leerRegiones() {
      this.regionesSvc.dameListaRegiones().subscribe({
        next: (res: any) => {
          console.log('Servicio leido de forma exitosa')
          console.log(res);
          this.regiones = res;

          console.log(this.regiones);
          this.regiones
          this.cdr.detectChanges();

        },
        error: (error: any) => {
          console.log('Error en la lectura del servicio')
          console.log(error)

        }
      })
    }
    insertaSucursal() {
      if (this.formularioSucursal.valid) {
        console.log(this.formularioSucursal.value)
        let sucursal: Sucursal = new Sucursal();
        sucursal.idSucursal = Utilerias.generaId();
        sucursal.claveSucursal = this.formularioSucursal.value.clave;
        sucursal.nombreSucursal = this.formularioSucursal.value.nombre_sucursal;
        sucursal.rfc = this.formularioSucursal.value.rfc;
        sucursal.domicilio = this.formularioSucursal.value.domicilio;
        sucursal.telefono = this.formularioSucursal.value.telefono;
        sucursal.horaInicio = this.formularioSucursal.value.hora_inicio;
        sucursal.horaFin = this.formularioSucursal.value.hora_fin;
        sucursal.latitud = this.formularioSucursal.value.latitud;

        sucursal.longitud = this.formularioSucursal.value.longitud;
        sucursal.idRegion = this.formularioSucursal.value.id_region;
        sucursal.ventaActiva = this.formularioSucursal.value.venta_activa;
        sucursal.pk = this.formularioSucursal.value.pk;
        sucursal.sk = this.formularioSucursal.value.sk;
        sucursal.montoMinimoEntregaSucursal = this.formularioSucursal.value.monto_minimo_entrega_sucursal;
        sucursal.montoMinimoEntregaDomicilio = this.formularioSucursal.value.monto_minimo_entrega_domicilio;
        this.sucursalesSvc.insertaSucursal(sucursal).subscribe({
          next: (res: any) => {
            console.log('Sucursal insertada de forma exitosa')
            console.log(res);
            this.saltaASucursales();
          },
          error: (error: any) => {
            console.log('Error en la inserción de la sucursal')
            console.log(error)
          }
        })
      }
    }
    saltaASucursales() {
      this.router.navigateByUrl('/sucursales-ppal');
    }
}
