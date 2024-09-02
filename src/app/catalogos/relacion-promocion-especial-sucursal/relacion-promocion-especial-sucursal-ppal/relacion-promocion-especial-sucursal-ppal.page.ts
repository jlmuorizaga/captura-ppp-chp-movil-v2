import { RelacionPromocionEspecialSucursalService } from 'src/app/services/relacion-promocion-especial-sucursal.service';
import { RelacionPES } from './../../../model/dto/relacion-promocion-especial-sucursal';
import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { RelacionEtpsService } from 'src/app/services/relacion-etps.service';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';


@Component({
  selector: 'app-relacion-promocion-especial-sucursal-ppal',
  templateUrl: './relacion-promocion-especial-sucursal-ppal.page.html',
  styleUrls: ['./relacion-promocion-especial-sucursal-ppal.page.scss'],
  standalone: true,
  imports: [IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelacionPromocionEspecialSucursalPpalPage implements OnInit,OnDestroy {
  navigationSubscription:Subscription;
  registrosRelacionPES!:RelacionPES[];
  idPromocion!:string;
  nombre!:string;
  descripcion!:string;
  idSucursal!:string;
  claveSucursal!:string;
  nombreSucursal!:string;
  activa!:string;

  constructor(private registrosRelacionPESSvc:RelacionPromocionEspecialSucursalService,
    private sucursalesSvc:SucursalService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef,
    private globalService: GlobalService
  ) {
    console.log('globalService=',this.globalService.idSucursalGlobal);
    this.idSucursal=this.globalService.idSucursalGlobal;

    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRegistrosRelacionPes(this.globalService.idSucursalGlobal);
      });
     // this.dameSucursal(this.idSucursal);
  }


  ngOnInit() {
    console.log('Entré a relacion-pes-ppal en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerRegistrosRelacionPes(idSucursal:string){
    this.registrosRelacionPESSvc.dameListaRelacionPromocionEspecialSucursal(idSucursal).subscribe({
      next:(res:any)=>{
        this.registrosRelacionPES=res;
        console.log('Servicio dameListaRelacionPromocionEspecialSucursal(idSucursal) leido de forma exitosa')
       // console.log(this.registrosRelacionPES);
        this.registrosRelacionPES
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }

  saltaAInsertarRegistroPromocionEspecialSucursal() {
    this.router.navigateByUrl('/insertar-relacion-promocion-especial-sucursal');
  }

  /*dameSucursal(idSucursal:string){
    this.sucursalesSvc.dameSucursal(idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Entré a dameSucursal')
       // console.log(res);
        this.sucursal=res;


        console.log(this.sucursal);
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }*/

}