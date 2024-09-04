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
      IonCardHeader, IonCard, IonButtons, IonContent, IonHeader, IonTitle,IonCardContent, IonToolbar, CommonModule, FormsModule,
      IonSelectOption]
})
export class InsertarRelacionPromocionEspecialSucursalPage{
  formularioPromocionEspecial:FormGroup;
  idSucursal:string;
 navigationSubscription:Subscription;
  promocionesEspecial!:PromocionEspecial[];


  constructor(private fb: FormBuilder,private promocionesEspecialesSvc:PromocionEspecialService,private router: Router,
    private globalService: GlobalService,private cdr: ChangeDetectorRef)
    //private sucursalesSvc:SucursalService,  
   {
    this.idSucursal=this.globalService.idSucursalGlobal;
    console.log('Mu==idSucursal==>>',this.idSucursal)

    this.formularioPromocionEspecial = this.fb.group({
      idPromocion:['', Validators.required],
   //   nombre: ['', Validators.required],
   //   descripcion: ['', Validators.required],
   //   tipo: ['', Validators.required],
  //   definicion: ['', Validators.required],
  //   precio: ['', Validators.required],
      activa: ['', Validators.required],
    })
    this.leerPromocionesEspecialesNo();
    this.navigationSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.leerPromocionesEspecialesNo();
    });
  }
  leerPromocionesEspecialesNo(){
    console.log('Entré a leerPromocionesEspecialesNo()')
    this.promocionesEspecialesSvc.dameListaPromocionesEspecialesQueNoEstanEnRPES(this.idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa en leerPromocionesEspecialesNo');
        console.log(res);
        this.promocionesEspecial=res;
        //console.log(this.promocionesEspecial);
        //this.promocionesEspecial
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }
  insertaRegistroRelacionPES(){
    if (this.formularioPromocionEspecial.valid) {
      console.log(this.formularioPromocionEspecial.value)
      let promocionEspecial:PromocionEspecial=new PromocionEspecial();
      promocionEspecial.idPromocion=Utilerias.generaId();
      promocionEspecial.nombre=this.formularioPromocionEspecial.value.nombre;
      promocionEspecial.descripcion=this.formularioPromocionEspecial.value.descripcion;
      promocionEspecial.tipo=this.formularioPromocionEspecial.value.tipo;
      promocionEspecial.definicion=this.formularioPromocionEspecial.value.definicion;
      promocionEspecial.precio=this.formularioPromocionEspecial.value.precio;
      promocionEspecial.activa=this.formularioPromocionEspecial.value.activa;
      this.promocionesEspecialesSvc.insertaPromocionEspecial(promocionEspecial).subscribe({
        next:(res:any)=>{
          console.log('Promoción Especial insertada de forma exitosa')
          console.log(res);
          this.saltaAPromocionesEspeciales();

        },
        error:(error:any)=>{
          console.log('Error en la inserción de la Promoción Especial')
          console.log(error)

        }
      })

    }
    
  }

  saltaARelacionPESPpal() {
    this.router.navigateByUrl('/relacion-promocion-especial-sucursal-ppal');
  }
}
