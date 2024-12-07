import { RelacionPizzaSucursalNoEstaEnPizza } from './../../../model/dto/relacion-pizza-sucursal-no-estan-en-pizza';
import { RelacionPizzaSucursal } from 'src/app/model/dto/relacion-pizza-sucursal';
import { RelacionPizzaSucursalService } from 'src/app/services/relacion-pizza-sucursal.service';

import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-relacion-pizza-sucursal-ppal',
  templateUrl: './relacion-pizza-sucursal-ppal.page.html',
  styleUrls: ['./relacion-pizza-sucursal-ppal.page.scss'],
  standalone: true,
  imports: [IonContent,IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonRow, IonCol, IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelacionPizzaSucursalPpalPage implements OnInit,OnDestroy {
  navigationSubscription:Subscription;
  relacionPizzaSucursal!:RelacionPizzaSucursal[];
  mensaje:string;
  idSucursal:string;
  cveSucursal!:string;
  sucursal!:Sucursal;

  constructor(
    private relacionPizzaSucursalSvc:RelacionPizzaSucursalService,
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
        this.leerRelacionPizzaSucursal(this.idSucursal);
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
  leerRelacionPizzaSucursal(idSucursal:string){
    this.relacionPizzaSucursalSvc.dameListaRelacionPizzaSucursal(idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log('claveSucursal=',idSucursal)
        console.log(res);
        this.relacionPizzaSucursal=res;
        console.log(this.relacionPizzaSucursal);
        this.relacionPizzaSucursal
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
  saltaAInsertarRelacionPizzaSucursal() {
    this.router.navigateByUrl('/insertar-relacion-pizza-sucursal');
  }

  borraRPS(idPizza:string,idSucursal:string){
    console.log('Voy a borrar este registro='+idPizza+' '+idSucursal);

    this.relacionPizzaSucursalSvc.borraRegistroRPS(idPizza,idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Registro borrado de forma exitosa')
        console.log(res);
        this.leerRelacionPizzaSucursal(this.idSucursal);
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la rps')
        console.log(error)

      }
    })
  }

  async confirmaBorrar(rps:RelacionPizzaSucursal){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar el registro \"'+rps.idPizza+' '+rps.idSucursal+'\"–––––––––––––– ?',
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
            this.borraRPS(rps.idPizza,rps.idSucursal);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }

}
