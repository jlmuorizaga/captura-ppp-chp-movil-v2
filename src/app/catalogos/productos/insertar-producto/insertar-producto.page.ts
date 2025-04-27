import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel,
  IonItem, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

import { Producto } from 'src/app/model/dto/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { TipoProducto } from 'src/app/model/dto/tipo-producto';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-insertar-producto',
  templateUrl: './insertar-producto.page.html',
  styleUrls: ['./insertar-producto.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput, IonSelect, IonSelectOption,
    ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})

export class InsertarProductoPage implements OnInit{
  formularioProducto: FormGroup;
  navigationSubscription: Subscription;
  tipoProductos!: TipoProducto[];
  mensaje: string;
  cveSucursal: string = '';

  constructor(private tipoProductosSvc: TipoProductoService, private fb: FormBuilder,
    private productosSvc: ProductoService,
    private globalService: GlobalService,
    private router: Router, private cdr: ChangeDetectorRef) {

    this.formularioProducto = this.fb.group({
      descripcion_p: ['', Validators.required],
      tamanio: ['', Validators.required],
      usa_salsa: ['', Validators.required],
      id_tipo_producto: ['', Validators.required],
      ruta_imagen: ['', Validators.required],
      categoria1: ['', Validators.required],
      categoria2: ['', Validators.required],
      categoria3: ['', Validators.required],
    })

    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerTipoProductos();
      });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar-producto.page.ts en OnInit');
  }

  leerTipoProductos() {
    this.tipoProductosSvc.dameListaTipoProductos().subscribe({
      next: (res: any) => {
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.tipoProductos = res;

        console.log(this.tipoProductos);
        this.tipoProductos
        this.cdr.detectChanges();

      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }

  insertaProducto() {
    if (this.formularioProducto.valid) {
      console.log(this.formularioProducto.value)
      let producto: Producto = new Producto();
      producto.id = Utilerias.generaId();
      producto.descripcion_p = this.formularioProducto.value.descripcion_p;
      producto.tamanio = this.formularioProducto.value.tamanio;
      producto.usa_salsa = this.formularioProducto.value.usa_salsa;
      producto.id_tipo_producto = this.formularioProducto.value.id_tipo_producto;
      producto.ruta_imagen = this.formularioProducto.value.ruta_imagen;
      producto.categoria1 = this.formularioProducto.value.categoria1;
      producto.categoria2 = this.formularioProducto.value.categoria2;
      producto.categoria3 = this.formularioProducto.value.categoria3;
      this.productosSvc.insertaProducto(producto).subscribe({
        next: (res: any) => {
          console.log('Producto insertado de forma exitosa')
          console.log(res);
          this.saltaAProductos();

        },
        error: (error: any) => {
          console.log('Error en la inserción de la región')
          console.log(error)

        }
      })

    }
  }
  saltaAProductos() {
    this.router.navigateByUrl('/productos-ppal');
  }

}
