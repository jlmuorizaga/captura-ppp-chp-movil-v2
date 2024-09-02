import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList,IonSelect,IonSelectOption,IonIcon } from '@ionic/angular/standalone';
  import { RelacionPES } from 'src/app/model/dto/relacion-promocion-especial-sucursal';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { RelacionEtpsService } from 'src/app/services/relacion-etps.service';
import { PromocionEspecialService } from 'src/app/services/promocion-especial.service';
import { GlobalService } from 'src/app/services/global.service';
import { PromocionEspecial } from 'src/app/model/dto/promocion-especial';

@Component({
  selector: 'app-insertar-relacion-promocion-especial-sucursal',
  templateUrl: './insertar-relacion-promocion-especial-sucursal.page.html',
  styleUrls: ['./insertar-relacion-promocion-especial-sucursal.page.scss'],
  standalone: true,
  imports: [IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,ReactiveFormsModule,
        IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonSelectOption]
})
export class InsertarRelacionPromocionEspecialSucursalPage{
  formularioPromocionEspecial:FormGroup;
  idSucursal:string;
 navigationSubscription:Subscription;
  promocionesEspecial!:PromocionEspecial[];


  constructor(private fb: FormBuilder,private promocionesEspecialesSvc:PromocionEspecialService,private router: Router,
    private globalService: GlobalService,
    //private sucursalesSvc:SucursalService,
    private cdr: ChangeDetectorRef
  ) {
    this.idSucursal=this.globalService.idSucursalGlobal;
    this.navigationSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.leerPromocionesEspecialesNo(this.idSucursal);
    });
    this.formularioPromocionEspecial = this.fb.group({
      idPromocion:['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      definicion: ['', Validators.required],
      precio: ['', Validators.required],
      activa: ['', Validators.required],
    })
  }
  leerPromocionesEspecialesNo(idSucursal:string){
    this.promocionesEspecialesSvc.dameListaPromocionesEspecialesQueNoEstanEnRPES(idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.promocionesEspecial=res;
        console.log(this.promocionesEspecial);
        this.promocionesEspecial
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }
}
