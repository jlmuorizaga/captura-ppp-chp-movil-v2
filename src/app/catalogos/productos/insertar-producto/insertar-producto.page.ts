import { Component, OnInit } from '@angular/core';
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
  IonList,
  IonSelect,
  IonSelectOption,
  IonText,
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
import { Categoria } from 'src/app/model/dto/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insertar-producto',
  templateUrl: './insertar-producto.page.html',
  styleUrls: ['./insertar-producto.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonList,
    IonItem,
    IonLabel,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInput,
    IonSelect,
    IonSelectOption,
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
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class InsertarProductoPage implements OnInit {
  formularioProducto: FormGroup;
  navigationSubscription: Subscription;
  tipoProductos!: TipoProducto[];
  mensaje: string;
  selectedFile: File | null = null;
  uploadResponse: string = '';
  imgURL: string = '';
  fileName: string = '';
  cveSucursal: string = '';
  categorias!: Categoria[];
  usaSalsa!: string;

  constructor(
    private tipoProductosSvc: TipoProductoService,
    private fb: FormBuilder,
    private productosSvc: ProductoService,
    private globalService: GlobalService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private categoriasSvc: CategoriaService
  ) {
    this.formularioProducto = this.fb.group({
      descripcionP: ['', Validators.required],
      tamanio: ['', Validators.required],
      idTipoProducto: ['', Validators.required],
      rutaImagen: ['', Validators.required],
      categoria1: ['', Validators.required],
      categoria2: ['', Validators.required],
      categoria3: ['', Validators.required],
      usaSalsa: ['S'], // Valor por defecto,
      imgURL: [''],
    });

    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerTipoProductos();
      });
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerCategorias();
      });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar-producto.page.ts en OnInit');
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    this.fileName = file.name;

    this.uploadImage()
      .then((url) => {
        console.log('✅ Imagen subida correctamente:', url);
      })
      .catch((err) => {
        console.error('❌ Error al subir la imagen:', err);
      });
  }
}


uploadImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!this.selectedFile) {
      reject('No se seleccionó archivo');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http
      .post<{ message: string; url: string }>(
        'http://admin.cheesepizza.com.mx/upload/producto',
        formData
      )
      .subscribe({
        next: (res) => {
          this.uploadResponse = res.message;
          this.imgURL = res.url;

          // ✅ Llenamos el campo del formulario
          this.formularioProducto.patchValue({ rutaImagen: res.url });

          // ✅ Forzamos validación del control
          const control = this.formularioProducto.get('rutaImagen');
          if (control) {
            control.markAsTouched();
            control.markAsDirty();
            control.updateValueAndValidity();
          }

          resolve(res.url);
        },
        error: (err) => {
          this.uploadResponse = 'Error al subir la imagen';
          reject(err);
        },
      });
  });
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

  leerCategorias() {
    this.categoriasSvc.dameListaCategorias().subscribe({
      next: (res: any) => {
        console.log('Servicio leido de forma exitosa');
        console.log(res);
        this.categorias = res;

        console.log(this.categorias);
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }

  async insertaProducto() {
    if (!this.formularioProducto.valid) {
      alert('Por favor completa todos los campos.');
      return;
    }
    if (!this.selectedFile) {
      alert('Por favor selecciona una imagen antes de enviar.');
      return;
    }

    try {
      const imgURL = await this.uploadImage();

      console.log(this.formularioProducto.value);
      let producto: Producto = new Producto(
        Utilerias.generaId(),
        this.formularioProducto.value.descripcionP,
        this.formularioProducto.value.tamanio,
        this.formularioProducto.value.usaSalsa,
        this.formularioProducto.value.idTipoProducto,
        this.formularioProducto.value.nombreTP,
        imgURL,
        this.formularioProducto.value.categoria1,
        this.formularioProducto.value.categoria2,
        this.formularioProducto.value.categoria3
      );
      this.productosSvc.insertaProducto(producto).subscribe({
        next: (res: any) => {
          console.log('Producto insertado de forma exitosa');
          this.formularioProducto.reset();
          this.selectedFile = null;
          this.fileName = '';
          console.log(res);
          this.saltaAProductos();
        },
        error: (error: any) => {
          console.log('Error en la inserción de la región');
          console.log(error);
        },
      });
    } catch (err) {
      console.error('❌ Error al subir imagen:', err);
      alert('Error al subir la imagen');
    }
  }
  saltaAProductos() {
    this.router.navigateByUrl('/productos-ppal');
  }
}
