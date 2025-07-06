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
import { Utilerias } from 'src/app/utilerias/utilerias';
import { CargarImagenComponent } from 'src/app/componentes/cargar-imagen/cargar-imagen.component';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-insertar-tipo-producto',
  templateUrl: './insertar-tipo-producto.page.html',
  styleUrls: ['./insertar-tipo-producto.page.scss'],
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
export class InsertarTipoProductoPage implements OnInit {
  formularioTipoProducto: FormGroup;
  cveSucursal: string = '';
  selectedFile: File | null = null;
  uploadResponse: string = '';
  imgURL: string = '';
  fileName: string = '';

  constructor(
    private fb: FormBuilder,
    private tipoProductoSvc: TipoProductoService,
    private router: Router,
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.formularioTipoProducto = this.fb.group({
      descripcion: ['', Validators.required],
     // imgURL: ['', Validators.required],
      nombre: ['', Validators.required],
      orden: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar-tipo-producto.page.ts en OnInit');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
      console.log('fileName==>>',this.fileName);
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

  async insertaTipoProducto() {
    if (!this.formularioTipoProducto.valid) {
      alert('Por favor completa todos los campos.');
      return;
    }
    if (!this.selectedFile) {
      alert('Por favor selecciona una imagen antes de enviar.');
      return;
    }

    try {
      const imageUrl = await this.uploadImage();

      console.log(this.formularioTipoProducto.value);
      let tipoProducto: TipoProducto = new TipoProducto();
      //region.idRegion=this.formularioRegion.value.idRegion;
      tipoProducto.id = Utilerias.generaId();
      tipoProducto.nombre = this.formularioTipoProducto.value.nombre;
      tipoProducto.descripcion = this.formularioTipoProducto.value.descripcion;
      //imageUrl;
      tipoProducto.imgURL = imageUrl;
      tipoProducto.orden = this.formularioTipoProducto.value.orden;
      this.tipoProductoSvc.insertaTipoProducto(tipoProducto).subscribe({
        next: (res: any) => {
          console.log('Tipo de producto insertado de forma exitosa');
          this.formularioTipoProducto.reset();
          this.selectedFile=null;
          this.fileName='';
          console.log(res);
          this.saltaATipoProducto();
        },
        error: (error: any) => {
          console.log('Error en la inserción del tipo de producto');
          console.log(error);
        },
      });
    }catch (err) {
      console.error('❌ Error al subir imagen:', err);
      alert('Error al subir la imagen');
    }
  }
  saltaATipoProducto() {
    this.router.navigateByUrl('/tipo-producto-ppal');
  }
}
