import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid, IonRow, IonCol, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { RegionService } from 'src/app/services/region.service';
import { Region } from 'src/app/model/dto/region';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-regiones-ppal',
  templateUrl: './regiones-ppal.page.html',
  styleUrls: ['./regiones-ppal.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCol, IonRow, IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegionesPpalPage implements OnInit, OnDestroy {
  navigationSubscription:Subscription;
  regiones!:Region[];
  mensaje:string;
  cveSucursal: string = '';

  constructor(private regionesSvc:RegionService,
    private alertController:AlertController,
    private globalService: GlobalService,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRegiones();
      });

  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a regiones en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerRegiones(){
    this.regionesSvc.dameListaRegiones().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.regiones=res;
        console.log(this.regiones);
        this.regiones
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }
  borraRegion(id:string){
    console.log('Voy a borrar esta región='+id);

    this.regionesSvc.borraRegion(id).subscribe({
      next:(res:any)=>{
        console.log('Región borrada de forma exitosa')
        console.log(res);
        this.leerRegiones();
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la región')
        console.log(error)

      }
    })
  }
  async confirmaBorrar(region:Region){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la región '+region.nombreRegion+' ?',
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
            this.borraRegion(region.idRegion);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();

  }
  saltaAInsertarRegion() {
    this.router.navigateByUrl('/insertar-region');
  }
  async saltaAEditarRegion(idRegion:string){
    console.log('Estoy en editar region id='+idRegion)
    this.regionesSvc.dameRegion(idRegion).subscribe({
      next:(res:any)=>{
        console.log('Región regresada de forma exitosa')
        console.log(res);
        //this.leerRegiones();
        //this.router.navigateByUrl('/editar-region');
        this.router.navigate(['/editar-region'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud de la región')
        console.log(error)

      }
    })

  }

}
