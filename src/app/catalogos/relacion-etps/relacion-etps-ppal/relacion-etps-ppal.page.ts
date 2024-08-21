import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { RelacionETPS } from 'src/app/model/dto/relacion-etps';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { RelacionEtpsService } from 'src/app/services/relacion-etps.service';
@Component({
  selector: 'app-relacion-etps-ppal',
  templateUrl: './relacion-etps-ppal.page.html',
  styleUrls: ['./relacion-etps-ppal.page.scss'],
  standalone: true,
  imports: [IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RelacionEtpsPpalPage implements OnInit, OnDestroy {
  navigationSubscription:Subscription;
  registrosRelacionEtps!:RelacionETPS[];
  mensaje:string;

  constructor(private registrosRelacionEtpsSvc:RelacionEtpsService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRegistrosRelacionEtps('00CHP20201201191758267208241');
      });
  }

  ngOnInit() {
    console.log('Entré a relacion-etps-ppal en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  leerRegistrosRelacionEtps(id:string){
    this.registrosRelacionEtpsSvc.dameListaRelacionEspecialidadTamanioPrecioSucursal(id).subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa en relacion-etps')
        console.log(res);
        this.registrosRelacionEtps=res;


        console.log(this.registrosRelacionEtps);
        this.registrosRelacionEtps
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }

}
