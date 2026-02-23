import { RelacionOrillaSucursalService } from './../../../services/relacion-orilla-sucursal.service';
import { RelacionOrillaSucursal } from './../../../model/dto/relacion-orilla-sucursal';

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
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/model/dto/sucursal';

@Component({
  selector: 'app-relacion-orilla-sucursal-ppal',
  templateUrl: './relacion-orilla-sucursal-ppal.page.html',
  styleUrls: ['./relacion-orilla-sucursal-ppal.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonRow,
    IonCol,
    IonGrid,
    SharedModule,
    IonLabel,
    IonItem,
    IonList,
    IonBackButton,
    IonButton,
    IonIcon,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class RelacionOrillaSucursalPpalPage implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  relacionOrillaSucursal!: RelacionOrillaSucursal[];
  mensaje: string;
  idSucursal: string;
  cveSucursal!: string;
  sucursal!: Sucursal;

  constructor(
    private relacionOrillaSucursalSvc: RelacionOrillaSucursalService,
    private alertController: AlertController,
    private router: Router,
    private globalService: GlobalService,
    private sucursalesSvc: SucursalService,
    private cdr: ChangeDetectorRef,
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.idSucursal = this.globalService.idSucursalGlobal;
    //Error????????????????????
    this.dameSucursal(this.idSucursal);

    console.log('Sucursal==>', this.globalService.idSucursalGlobal);
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRelacionOrillaSucursal(this.idSucursal);
      });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a orillas-ppal.page.ts en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  leerRelacionOrillaSucursal(idSucursal: string) {
    this.relacionOrillaSucursalSvc
      .dameListaRelacionOrillaSucursal(idSucursal)
      .subscribe({
        next: (res: any) => {
          console.log('Servicio leido de forma exitosa');
          console.log('claveSucursal=', idSucursal);
          console.log(res);
          this.relacionOrillaSucursal = res;
          console.log(this.relacionOrillaSucursal);
          this.relacionOrillaSucursal;
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

        console.log('this.sucursal==>>');
        console.log(this.sucursal);
        this.cveSucursal = this.sucursal.claveSucursal;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }

  borraRegistroRelacionOrillaSucursal(idOrilla: string, idSucursal: string) {
    console.log('Voy a borrar este registro=' + idOrilla + ' ' + idSucursal);

    this.relacionOrillaSucursalSvc
      .borraRegistroRelacionOrillaSucursal(idOrilla, this.idSucursal)
      .subscribe({
        next: (res: any) => {
          console.log('Registro borrado de forma exitosa');
          console.log(res);
          this.leerRelacionOrillaSucursal(this.idSucursal);
        },
        error: (error: any) => {
          console.log('Error en el borrado del producto');
          console.log(error);
        },
      });
  }

  async confirmaBorrar(
    idOrilla: string,
    idSucursal: string,
    descripcion: string,
    tamanio: string,
    precio: string,
  ) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message:
        '¿Estás seguro de que deseas borrar el registro: ' +
        descripcion +
        ' ' +
        tamanio +
        ' con un precio de ' +
        precio +
        '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Operación confirmada');
            this.borraRegistroRelacionOrillaSucursal(idOrilla, idSucursal);
          },
        },
      ],
    });

    await alert.present();
  }
  saltaAInsertarRegistroRelacionOrillaSucursal() {
    this.router.navigateByUrl('/insertar-relacion-orilla-sucursal');
  }

  async saltaAEditarRegistroOrillaSucursal(
    idOrilla: string,
    idSucursal: string,
  ) {
    console.log(
      'Estoy en editar registro orilla sucursal id=' +
        idOrilla +
        ' idSucursal=' +
        idSucursal,
    );
    this.relacionOrillaSucursalSvc
      .dameRegistroRelacionOrillaSucursal(idOrilla, idSucursal)
      .subscribe({
        next: (res: any) => {
          console.log(
            'Registro Relacion Orilla Sucursal regresada de forma exitosa',
          );
          console.log(res);
          this.router.navigate(['/editar-relacion-orilla-sucursal'], {
            state: { data: res },
          });
        },
        error: (error: any) => {
          console.log(
            'Error en la solicitud del registro relacion orilla sucursal',
          );
          console.log(error);
        },
      });
  }
}
