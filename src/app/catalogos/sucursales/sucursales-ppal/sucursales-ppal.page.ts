import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonButton,AlertController, IonRow, IonGrid, IonCol, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Sucursal } from 'src/app/model/dto/sucursal';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-sucursales-ppal',
  templateUrl: './sucursales-ppal.page.html',
  styleUrls: ['./sucursales-ppal.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCol, IonGrid, IonRow, IonButton, SharedModule,IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule]
})
export class SucursalesPpalPage implements OnInit,OnDestroy {
  navigationSubscription:Subscription;
  sucursales!:Sucursal[];
  mensaje:string;

  constructor(private sucursalesSvc:SucursalService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerSucursales();
      });

  }

  ngOnInit() {
    console.log('Entré a sucursales en OnInit()');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerSucursales(){
    this.sucursalesSvc.dameListaSucursales().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.sucursales=res;


        console.log(this.sucursales);
        this.sucursales
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }
  borraSucursal(id:string){
    console.log('Voy a borrar esta sucursal='+id);

    this.sucursalesSvc.borraSucursal(id).subscribe({
      next:(res:any)=>{
        console.log('Sucursal borrada de forma exitosa')
        console.log(res);
        this.leerSucursales();
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la sucursal')
        console.log(error)

      }
    })
  }
  async confirmaBorrar(sucursal:Sucursal){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la sucursal  '+sucursal.claveSucursal+' ?',
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
            this.borraSucursal(sucursal.idSucursal);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }

  saltaAInsertarSucursal() {
    this.router.navigateByUrl('/insertar-sucursal');
  }

  async saltaAEditarSucursal(id:string){
    console.log('Estoy en editar sucursal id='+id)
    this.sucursalesSvc.dameSucursal(id).subscribe({
      next:(res:any)=>{
        console.log('Sucursal regresada de forma exitosa')
        console.log(res);
        this.router.navigate(['/editar-sucursal'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud de la sucursal')
        console.log(error)

      }
    })
  }

}
