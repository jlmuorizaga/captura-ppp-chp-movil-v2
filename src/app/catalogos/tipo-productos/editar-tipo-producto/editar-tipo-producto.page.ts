import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProducto } from './../../../model/dto/tipo-producto';
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
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-editar-tipo-producto',
  templateUrl: './editar-tipo-producto.page.html',
  styleUrls: ['./editar-tipo-producto.page.scss'],
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
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class EditarTipoProductoPage implements OnInit {
  formularioTipoProducto: FormGroup;
  tiposProducto!: TipoProducto[];
  datos!: TipoProducto;
  id!: string;
  descripcion!: string;
  selectedFile: File | null = null;
  fileName: string = '';
  uploadResponse: string = '';
  imgURL!: string;
  nombre!: string;
  orden!: string;
  cveSucursal: string = '';

  constructor(
    private fb: FormBuilder,
    private tipoProductoService: TipoProductoService,
    private router: Router,
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.id = data.id;
      this.descripcion = data.descripcion;
      this.imgURL = data.imgURL;
      this.nombre = data.nombre;
      this.orden = data.orden;

      //     console.log('id===>>'+this.id);
      //     console.log('descripcion===>'+this.descripcion);
    }
    this.formularioTipoProducto = this.fb.group({
      descripcion: ['', Validators.required],
      //imgURL: ['', Validators.required],
      nombre: ['', Validators.required],
      orden: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-tipo-producto en OnInit');
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
          'http://ec2-54-144-58-67.compute-1.amazonaws.com:3005/upload/tipo-producto',
          formData
        )
        .subscribe({
          next: (res) => {
            this.uploadResponse = res.message;
            this.imgURL = res.url;
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

  async editaTipoProducto() {
    if (!this.formularioTipoProducto.valid) {
      this.formularioTipoProducto.markAllAsTouched();
      alert('Por favor completa todos los campos');
      return;
    }
    if (!this.selectedFile) {
      alert('Por favor selecciona una imagen antes de enviar.');
      return;
    }

    try {
      console.log(this.formularioTipoProducto.value);
      let tipoProducto: TipoProducto = new TipoProducto();
      const imageUrl = await this.uploadImage();
      tipoProducto.id = this.id;
      tipoProducto.descripcion = this.formularioTipoProducto.value.descripcion;
      tipoProducto.imgURL = imageUrl;
      tipoProducto.nombre = this.formularioTipoProducto.value.nombre;
      tipoProducto.orden = this.formularioTipoProducto.value.orden;
      this.tipoProductoService.editaTipoProducto(tipoProducto).subscribe({
        next: (res: any) => {
          console.log('Tipo Producto editado de forma exitosa');
          console.log(res);
          this.saltaATipoProducto();
        },
        error: (error: any) => {
          console.log('Error en la edición de la región');
          console.log(error);
        },
      });
    } catch (err) {
      console.error('❌ Error al subir imagen:', err);
      alert('Error al subir la imagen');
    }
  }

  saltaATipoProducto() {
    this.router.navigateByUrl('/tipo-producto-ppal');
  }
}
