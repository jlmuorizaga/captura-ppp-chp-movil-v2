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
import { Categoria } from 'src/app/model/dto/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

import { ProductoService } from 'src/app/services/producto.service';
import { NavigationEnd, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { Subscription } from 'rxjs';
import { TipoProducto } from 'src/app/model/dto/tipo-producto';
import { filter } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
  standalone: true,
  imports: [
    IonItem,
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
    IonLabel
  ],
})
export class EditarProductoPage implements OnInit, OnDestroy {
  formularioProducto: FormGroup;
  datos!: Producto;
  id!: string;
  descripcionP!: string;
  tamanio!: string;
  usaSalsa!: string;
  idTipoProducto!: string;
  nombreTP!: string;
  selectedFile: File | null = null;
  fileName: string = '';
  uploadResponse: string = '';
  rutaImagen!: string;
  categoria1!: string;
  categoria2!: string;
  categoria3!: string;

  categoria1_seleccionado!: string;
  categoria2_seleccionado!: string;
  categoria3_seleccionado!: string;
  navigationSubscription: Subscription;
  tipoProductos!: TipoProducto[];
  id_tipo_producto_seleccionado!: string;
  categorias!: Categoria[];
  cveSucursal: string = '';

  constructor(
    private fb: FormBuilder,
    private productosSvc: ProductoService,
    private router: Router,
    private tipoProductosSvc: TipoProductoService,
    private categoriasSvc: CategoriaService,
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.id = data.id;
      this.descripcionP = data.descripcionP;
      this.tamanio = data.tamanio;
      this.usaSalsa = data.usaSalsa;
      this.idTipoProducto = data.idTipoProducto;
      this.nombreTP = data.nombreTP;
      this.rutaImagen = data.rutaImagen;
      this.categoria1_seleccionado = data.categoria1;
      this.categoria2_seleccionado = data.categoria2;
      this.categoria3_seleccionado = data.categoria3;
      this.id_tipo_producto_seleccionado = data.idTipoProducto;
    }
    this.formularioProducto = this.fb.group({
      descripcionP: ['', Validators.required],
      tamanio: ['', Validators.required],
      usaSalsa: ['', Validators.required],
      id_tipo_producto2: ['', Validators.required],
      //rutaImagen: ['', Validators.required],
      categoria1: ['', Validators.required],
      categoria2: ['', Validators.required],
      categoria3: ['', Validators.required],
    });
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
    console.log('Entré a editar-producto en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
      //this.img_url=file;
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
          'http://ec2-54-144-58-67.compute-1.amazonaws.com:3005/upload/producto',
          formData
        )
        .subscribe({
          next: (res) => {
            this.uploadResponse = res.message;
            this.rutaImagen = res.url;
            resolve(res.url);
          },
          error: (err) => {
            this.uploadResponse = 'Error al subir la imagen';
            reject(err);
          },
        });
      return; // ✅ Esto soluciona el error TS7030
    });
  }

  async editaProducto() {
    if (!this.formularioProducto.valid) {
      this.formularioProducto.markAllAsTouched();
      alert('Por favor completa todos los campos.');
      return;
    }
    if (!this.selectedFile) {
      alert('Por favor selecciona una imagen antes de enviar.');
      return;
    }
    try {
      console.log(this.formularioProducto.value);
      const imageUrl = await this.uploadImage();
      let producto: Producto = new Producto(
        this.id,
        this.descripcionP,
        this.tamanio,
        this.usaSalsa,
        this.idTipoProducto,
        this.nombreTP,
        this.rutaImagen,
        this.categoria1,
        this.categoria2,
        this.categoria3);

      producto.id = this.id;
      producto.descripcionP = this.formularioProducto.value.descripcionP;
      producto.tamanio = this.formularioProducto.value.tamanio;
      producto.usaSalsa = this.formularioProducto.value.usaSalsa;
      producto.idTipoProducto = this.formularioProducto.value.id_tipo_producto2;
      producto.nombreTP = this.formularioProducto.value.nombreTP;
      producto.rutaImagen = imageUrl;
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
    catch (err) {
      console.error('❌ Error al subir imagen:', err);
      alert('Error al subir la imagen');

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
}
