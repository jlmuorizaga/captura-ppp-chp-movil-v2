import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonButton,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  AlertController,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { RelacionETPS } from 'src/app/model/dto/relacion-etps';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { RelacionEtpsService } from 'src/app/services/relacion-etps.service';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-relacion-etps-ppal',
  templateUrl: './relacion-etps-ppal.page.html',
  styleUrls: ['./relacion-etps-ppal.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    SharedModule,
    IonLabel,

    IonList,
    IonBackButton,
    IonButton,
    IonIcon,
    IonButtons,
    IonContent,



    CommonModule,
    FormsModule,
  ],
})
export class RelacionEtpsPpalPage implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  registrosRelacionEtps!: RelacionETPS[];
  mensaje: string;
  idSucursal: string;
  sucursal!: Sucursal;

  constructor(
    private registrosRelacionEtpsSvc: RelacionEtpsService,
    private sucursalesSvc: SucursalService,
    private alertController: AlertController,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private globalService: GlobalService
  ) {
    console.log('globalService=', this.globalService.idSucursalGlobal);
    this.idSucursal = this.globalService.idSucursalGlobal;
    this.mensaje = 'Estoy en el constructor';

    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRegistrosRelacionEtps(this.globalService.idSucursalGlobal);
      });
    this.dameSucursal(this.idSucursal);
  }

  ngOnInit() {
    console.log('Entré a relacion-etps-ppal en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  leerRegistrosRelacionEtps(idSucursal: string) {
    this.registrosRelacionEtpsSvc
      .dameListaRelacionEspecialidadTamanioPrecioSucursal(idSucursal)
      .subscribe({
        next: (res: any) => {
          console.log('Servicio leido de forma exitosa en relacion-etps');
          console.log(res);
          this.registrosRelacionEtps = res;

          console.log(this.registrosRelacionEtps);
          this.registrosRelacionEtps;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('Error en la lectura del servicio');
          console.log(error);
        },
      });
  }

  dameSucursal(idSucursal: string) {
    this.sucursalesSvc.dameSucursal(idSucursal).subscribe({
      next: (res: any) => {
        console.log('Entré a dameSucursal');
        // console.log(res);
        this.sucursal = res;

        console.log(this.sucursal);
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }

  saltaAInsertarRETPS() {
    this.router.navigateByUrl('/insertar-relacion-etps');
  }
}
