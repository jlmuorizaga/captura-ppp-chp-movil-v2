
import { RelacionSalsaSucursal } from 'src/app/model/dto/relacion-salsa-sucursal';
import { RelacionSalsaSucursalNoEstaEnSalsa } from 'src/app/model/dto/relacion-salsa-sucursal-no-esta-en-salsa';
import { RelacionSalsaSucursalService } from 'src/app/services/relacion-salsa-sucursal.service';

import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid, IonCol, IonRow,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent }
  from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-relacion-salsa-sucursal-ppal',
  templateUrl: './relacion-salsa-sucursal-ppal.page.html',
  styleUrls: ['./relacion-salsa-sucursal-ppal.page.scss'],
  standalone: true,
  imports: [IonContent,IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader,
    IonCard, IonRow, IonCol, IonGrid, SharedModule,IonLabel, IonItem, IonList,
    IonBackButton, IonButton, IonIcon, IonButtons, IonContent, IonHeader,
    IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelacionSalsaSucursalPpalPage implements OnInit,OnDestroy {
  navigationSubscription:Subscription;
  relacionSalsaSucursal!:RelacionSalsaSucursal[];
  mensaje:string;
  idSucursal:string;
  cveSucursal!:string;
  sucursal!:Sucursal;
  constructor(
        private relacionSalsaSucursalSvc:RelacionSalsaSucursalService,
        private alertController:AlertController,
        private router: Router,
        private globalService: GlobalService,
        private sucursalesSvc: SucursalService,
        private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.idSucursal = this.globalService.idSucursalGlobal;
    //Error????????????????????
    this.dameSucursal(this.idSucursal);
    console.log('Sucursal==>', this.globalService.idSucursalGlobal);
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRelacionSalsaSucursal(this.idSucursal);
      });

  }

  ngOnInit() {
    console.log('Entré a pizza-ppal.page.ts en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  leerRelacionSalsaSucursal(idSucursal:string){
    this.relacionSalsaSucursalSvc.dameListaRelacionSalsaSucursal(idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log('claveSucursal=',idSucursal)
        console.log(res);
        this.relacionSalsaSucursal=res;
        console.log(this.relacionSalsaSucursal);
        this.relacionSalsaSucursal
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)
      }
    })
  }
  dameSucursal(idSucursal: string) {
    this.sucursalesSvc.dameSucursal(idSucursal).subscribe({
      next: (res: any) => {
        console.log('Entré a dameSucursal');
        // console.log(res);
        this.sucursal = res;

        console.log('this.sucursal==>>');
        console.log(this.sucursal);
        this.cveSucursal = this.sucursal.clave;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }
  saltaAInsertarRelacionSalsaSucursal() {
    this.router.navigateByUrl('/insertar-relacion-salsa-sucursal');
  }

    borraRPS(idSalsa:string,idSucursal:string){
      console.log('Voy a borrar este registro='+idSalsa+' '+idSucursal);

      this.relacionSalsaSucursalSvc.borraRegistroRSS(idSalsa,idSucursal).subscribe({
        next:(res:any)=>{
          console.log('Registro borrado de forma exitosa')
          console.log(res);
          this.leerRelacionSalsaSucursal(this.idSucursal);
        },
        error:(error:any)=>{
          console.log('Error en el borrado de la rss')
          console.log(error)

        }
      })
    }

    async confirmaBorrar(rss:RelacionSalsaSucursal){
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Estás seguro de que deseas borrar el registro \"'+rss.descripcionSalsa+'?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Operación cancelada');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              console.log('Operación confirmada');
              this.borraRPS(rss.idSalsa,rss.idSucursal);
              // Aquí puedes agregar la lógica para la operación a realizar
            }
          }
        ]
      });

      await alert.present();
    }

}
