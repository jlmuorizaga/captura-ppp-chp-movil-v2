import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  IonSelectOption,
  IonSelect
} from '@ionic/angular/standalone';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { PromocionEspecial } from 'src/app/model/dto/promocion-especial';
import { GlobalService } from 'src/app/services/global.service';
import { PromocionEspecialService } from 'src/app/services/promocion-especial.service';
import { PromocionBuilderComponent } from 'src/app/components/promocion-builder/promocion-builder.component';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-insertar-promocion-especial',
  standalone: true,
  templateUrl: './insertar-promocion-especial.page.html',
  styleUrls: ['./insertar-promocion-especial.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonItem,
    IonLabel,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInput,
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
    IonSelectOption,
    IonSelect
  ],
})
export class InsertarPromocionEspecialPage implements OnInit {
  formularioPromocionEspecial: FormGroup;
  idPromocion!: string;
  nombre!: string;
  descripcion!: string;
  tipo!: string;
  definicion!: string;
  precio!: number;
  activa!: string;
  cveSucursal: string = '';
  selectedFile: File | null = null;
  uploadResponse: string = '';
  imgURL: string = '';
  fileName: string = '';
  resultado: string = '';

  private modalCtrl = inject(ModalController);

  // 🛡️ Fuerza a Angular a incluir el componente en producción
  private readonly forceInclude = PromocionBuilderComponent;

  constructor(
    private fb: FormBuilder,
    private promocionesEspecialesSvc: PromocionEspecialService,
    private router: Router,
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.formularioPromocionEspecial = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      definicion: ['', Validators.required],
      precio: ['', Validators.required],
      //activa: ['', Validators.required],
      activa: ['S'], // Valor por defecto
      imgURL: [''],
    });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
  }

  async abrirModal() {
    try {
      const modal = await this.modalCtrl.create({
        component: PromocionBuilderComponent,
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data) {
        this.resultado = `Tipo: ${data.tipo}, Definición: ${data.definicion}`;
        this.formularioPromocionEspecial
          .get('definicion')
          ?.setValue(data.definicion);
        this.formularioPromocionEspecial.get('tipo')?.setValue(data.tipo);
      }
    } catch (error) {
      console.error('Error al abrir modal:', error);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  async uploadImage(): Promise<string> {
    if (!this.selectedFile) return '';

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    try {
      const response: any = await this.http
        .post(
          'http://admin.cheesepizza.com.mx/upload/promocion',
          formData
        )
        .toPromise();

      return response.url; // ← esta URL ya viene recortada como /img/promociones/xxx.jpeg
    } catch (error) {
      console.error('❌ Error al subir la imagen:', error);
      return '';
    }
  }

  async insertaPromocionEspecial() {
    if (!this.formularioPromocionEspecial.valid) return;

    // 1. Sube la imagen y espera la URL
    const uploadedImageUrl = await this.uploadImage();

    // 2. Crea objeto con los datos del formulario
    let promocionEspecial: PromocionEspecial = new PromocionEspecial(
      this.idPromocion,
      this.nombre,
      this.descripcion,
      this.tipo,
      this.definicion,
      this.precio,
      this.activa,
      uploadedImageUrl // usa la url recibida
    );

    promocionEspecial.idPromocion = Utilerias.generaId();
    promocionEspecial.nombre = this.formularioPromocionEspecial.value.nombre;
    promocionEspecial.descripcion =
      this.formularioPromocionEspecial.value.descripcion;
    promocionEspecial.tipo = this.formularioPromocionEspecial.value.tipo;
    promocionEspecial.definicion =
      this.formularioPromocionEspecial.value.definicion;
    promocionEspecial.precio = this.formularioPromocionEspecial.value.precio;
    promocionEspecial.activa = this.formularioPromocionEspecial.value.activa;
    promocionEspecial.imgURL = uploadedImageUrl;

    // 3. Inserta en backend
    this.promocionesEspecialesSvc
      .insertaPromocionEspecial(promocionEspecial)
      .subscribe({
        next: (res: any) => {
          console.log('✅ Promoción Especial insertada correctamente');
          this.saltaAPromocionesEspeciales();
        },
        error: (error: any) => {
          console.error(
            '❌ Error en la inserción de la Promoción Especial:',
            error
          );
        },
      });
  }

  saltaAPromocionesEspeciales() {
    this.router.navigateByUrl('/promocion-especial-ppal');
  }
}
