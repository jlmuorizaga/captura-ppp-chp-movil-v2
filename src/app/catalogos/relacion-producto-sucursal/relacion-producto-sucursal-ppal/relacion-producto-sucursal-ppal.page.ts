import { RelacionProductoSucursalService } from './../../../services/relacion-producto-sucursal.service';
import { RelacionProductoSucursal } from './../../../model/dto/relacion-producto-sucursal';

import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid, IonCol, IonRow, IonCard, 
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } 
  from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-relacion-producto-sucursal-ppal',
  templateUrl: './relacion-producto-sucursal-ppal.page.html',
  styleUrls: ['./relacion-producto-sucursal-ppal.page.scss'],
  standalone: true,
  imports: [IonContent,IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonRow, IonCol, 
    IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelacionProductoSucursalPpalPage implements OnInit,OnDestroy {
  navigationSubscription:Subscription;
    relacionProductoSucursal!:RelacionProductoSucursal[];
    mensaje:string;
    idSucursal:string;
    cveSucursal!:string;
    sucursal!:Sucursal;


  constructor(
        private relacionProductoSucursalSvc:RelacionProductoSucursalService,
        private alertController:AlertController,
        private router: Router,
        private globalService: GlobalService,
        private sucursalesSvc: SucursalService,
        private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.idSucursal = this.globalService.idSucursalGlobal;
    this.dameSucursal(this.idSucursal);
    console.log('Sucursal==>', this.globalService.idSucursalGlobal);
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRelacionProductoSucursal(this.idSucursal);
      });
   }

  ngOnInit() {
    console.log('Entré a producto-ppal.page.ts en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerRelacionProductoSucursal(idSucursal:string){
    this.relacionProductoSucursalSvc.dameListaRelacionProductoSucursal(idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log('claveSucursal=',idSucursal)
        console.log(res);
        this.relacionProductoSucursal=res;
        console.log(this.relacionProductoSucursal);
        this.relacionProductoSucursal
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
  saltaAInsertarRelacionProductoSucursal() {
    this.router.navigateByUrl('/insertar-relacion-producto-sucursal');
  }

  borraRegistroRelacionProductoSucursal(idProducto:string,idSucursal:string){
    console.log('Voy a borrar este registro='+idProducto+' '+idSucursal);
    this.relacionProductoSucursalSvc.borraRelacionProductoSucursal(idProducto,this.idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Registro borrado de forma exitosa')
        console.log(res);
        this.leerRelacionProductoSucursal(this.idSucursal);
      },
      error:(error:any)=>{
        console.log('Error en el borrado del producto')
        console.log(error)

      }
    })

  }

  async confirmaBorrar(idProducto:string, idSucursal:string, descripcion:string, tamanio:string, precio:string){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar el producto: '+descripcion+' - '+tamanio+' con un precio de '+precio+'?',
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
            this.borraRegistroRelacionProductoSucursal(idProducto,idSucursal);
          }
        }
      ]
    });
    await alert.present();
  }
}
