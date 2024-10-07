import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCol,
  IonRow,
  IonGrid,
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

import { Producto } from 'src/app/model/dto/producto';

import { ProductoService } from 'src/app/services/producto.service';
import { NavigationEnd, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { Subscription } from 'rxjs';
import { TipoProducto } from 'src/app/model/dto/tipo-producto';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInput,
    ReactiveFormsModule,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class EditarProductoPage implements OnInit, OnDestroy {
  formularioProducto: FormGroup;
  datos!: Producto;
  id!: string;
  descripcion_p!: string;
  tamanio!: string;
  usa_salsa!: string;
  id_tipo_producto!: string;
  descripcion_tp!: string;
  ruta_imagen!: string;
  categoria1!: string;
  categoria2!: string;
  categoria3!: string;
  navigationSubscription: Subscription;
  tipoProductos!: TipoProducto[];
  id_tipo_producto_seleccionado!: string;

  constructor(
    private fb: FormBuilder,
    private productosSvc: ProductoService,
    private router: Router,
    private tipoProductosSvc: TipoProductoService,
    private cdr: ChangeDetectorRef
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.id = data.id;
      this.descripcion_p = data.descripcion;
      this.tamanio = data.tamanio;
      this.usa_salsa = data.usa_salsa;
      this.id_tipo_producto = data.id_tipo_producto;
      this.descripcion_tp = data.descripcion_tp;
      this.ruta_imagen = data.ruta_imagen;
      this.categoria1 = data.categoria1;
      this.categoria2 = data.categoria2;
      this.categoria3 = data.categoria3;
      this.id_tipo_producto_seleccionado = data.id_tipo_producto;
    }
    this.formularioProducto = this.fb.group({
      descripcion_p: ['', Validators.required],
      tamanio: ['', Validators.required],
      usa_salsa: ['', Validators.required],
      //id_tipo_producto: ['', Validators.required],
      id_tipo_producto2: ['', Validators.required],
      // descripcion_tp: ['', Validators.required],
      ruta_imagen: ['', Validators.required],
      categoria1: ['', Validators.required],
      categoria2: ['', Validators.required],
      categoria3: ['', Validators.required],
    });
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerTipoProductos();
      });
  }

  ngOnInit() {
    console.log('Entré a editar-producto en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  editaProducto() {
    if (this.formularioProducto.valid) {
      console.log(this.formularioProducto.value);
      let producto: Producto = new Producto();
      producto.id = this.id;
      producto.descripcion_p = this.formularioProducto.value.descripcion_p;
      producto.tamanio = this.formularioProducto.value.tamanio;
      producto.usa_salsa = this.formularioProducto.value.usa_salsa;
      producto.id_tipo_producto =
        this.formularioProducto.value.id_tipo_producto2;
      producto.descripcion_tp = this.formularioProducto.value.descripcion_tp;
      producto.ruta_imagen = this.formularioProducto.value.ruta_imagen;
      producto.categoria1 = this.formularioProducto.value.categoria1;
      producto.categoria2 = this.formularioProducto.value.categoria2;
      producto.categoria3 = this.formularioProducto.value.categoria3;

      this.productosSvc.editaProducto(producto).subscribe({
        next: (res: any) => {
          console.log('Producto editado de forma exitosa');
          console.log(res);
          this.saltaAProductos();
        },
        error: (error: any) => {
          console.log('Error en la edición del producto');
          console.log(error);
        },
      });
    }
  }

  saltaAProductos() {
    this.router.navigateByUrl('/productos-ppal');
  }

  leerTipoProductos() {
    this.tipoProductosSvc.dameListaTipoProductos().subscribe({
      next: (res: any) => {
        console.log('Servicio leido de forma exitosa');
        console.log(res);
        this.tipoProductos = res;

        console.log(this.tipoProductos);
        this.tipoProductos;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }
}
