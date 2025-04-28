import { TipoProducto } from '../../../model/dto/tipo-producto';
import { SharedModule } from '../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid, IonRow, IonCol, IonCard,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-tipo-producto-ppal',
  templateUrl: './tipo-producto-ppal.page.html',
  styleUrls: ['./tipo-producto-ppal.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonCol,
    IonRow, IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton,IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TipoProductoPpalPage implements OnInit, OnDestroy{
  navigationSubscription:Subscription;
  tipoProductos!:TipoProducto[];
  mensaje:string;
  cveSucursal: string = '';

  constructor(private tipoProductosSvc:TipoProductoService,
    private alertController:AlertController,
    private globalService: GlobalService,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerTipoProductos();
      });

  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a tipoProductos en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerTipoProductos(){
    this.tipoProductosSvc.dameListaTipoProductos().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.tipoProductos=res;

        console.log(this.tipoProductos);
        this.tipoProductos
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }
  borraTipoProducto(id:string){
    console.log('Voy a borrar este tipo de producto='+id);

    this.tipoProductosSvc.borraTipoProducto(id).subscribe({
      next:(res:any)=>{
        console.log('Tipo de Producto borrado de forma exitosa')
        console.log(res);
        this.leerTipoProductos();
      },
      error:(error:any)=>{
        console.log('Error en el borrado del tipo de producto')
        console.log(error)

      }
    })

  }
  async confirmaBorrar(tipoProducto:TipoProducto){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar el tipo de producto '+tipoProducto.nombre+' ?',
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
            this.borraTipoProducto(tipoProducto.id);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();

  }
  saltaAInsertarTipoProducto() {
    this.router.navigateByUrl('/insertar-tipo-producto');
  }
  async saltaAEditarTipoProducto(id:string){
    console.log('Estoy en editar tipo de producto id='+id)
    this.tipoProductosSvc.dameTipoProducto(id).subscribe({
      next:(res:any)=>{
        console.log('Tipo de producto regresado de forma exitosa')
        console.log(res);
        //this.leerRegiones();
        //this.router.navigateByUrl('/editar-region');
        this.router.navigate(['/editar-tipo-producto'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud del tipo de producto')
        console.log(error)

      }
    })

  }

}
