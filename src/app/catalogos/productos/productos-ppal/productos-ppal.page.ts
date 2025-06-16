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
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/model/dto/producto';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-productos-ppal',
  templateUrl: './productos-ppal.page.html',
  styleUrls: ['./productos-ppal.page.scss'],
  standalone: true,
  imports: [
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
export class ProductosPpalPage implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  productos!: Producto[];
  mensaje: string;
  cveSucursal: string = '';

  constructor(
    private productosSvc: ProductoService,
    private alertController: AlertController,
    private globalService: GlobalService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerProductos();
      });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a products en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerProductos() {
    this.productosSvc.dameListaProductos2().subscribe({
      next: (res: any) => {
        console.log('Servicio leido de forma exitosa');
        console.log(res);
        this.productos = res;

        console.log(this.productos);
        this.productos;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }

  borraProducto(id: string) {
    console.log('Voy a borrar este producto=' + id);

    this.productosSvc.borraProducto(id).subscribe({
      next: (res: any) => {
        console.log('Producto borrado de forma exitosa');
        console.log(res);
        this.leerProductos();
      },
      error: (error: any) => {
        console.log('Error en el borrado del producto');
        console.log(error);
      },
    });
  }
  async confirmaBorrar(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message:
        '¿Estás seguro de que deseas borrar el producto ' + producto.descripcionP + ', '+producto.tamanio+ ' ?',
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
            this.borraProducto(producto.id);
            // Aquí puedes agregar la lógica para la operación a realizar
          },
        },
      ],
    });

    await alert.present();
  }
  saltaAInsertarProducto() {
    this.router.navigateByUrl('/insertar-producto');
  }
  async saltaAEditarProducto(id: string) {
    console.log('Estoy en editar producto id=' + id);
    this.productosSvc.dameProducto(id).subscribe({
      next: (res: any) => {
        console.log('Producto regresada de forma exitosa');
        console.log(res);
        //this.leerRegiones();
        //this.router.navigateByUrl('/editar-region');
        this.router.navigate(['/editar-producto'], { state: { data: res } });
      },
      error: (error: any) => {
        console.log('Error en la solicitud del producto');
        console.log(error);
      },
    });
  }


}
