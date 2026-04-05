import { PromocionEspecial } from 'src/app/model/dto/promocion-especial';
import { PromocionEspecialService } from 'src/app/services/promocion-especial.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonLabel, IonItem, IonRadio, IonRadioGroup, IonSelectOption, IonSelect
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';
import { PromocionBuilderComponent } from 'src/app/components/promocion-builder/promocion-builder.component';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-promocion-especial',
  templateUrl: './editar-promocion-especial.page.html',
  styleUrls: ['./editar-promocion-especial.page.scss'],
  standalone: true,
  imports: [IonRadioGroup, IonRadio, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol, IonBackButton, IonSelectOption, IonSelect,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule,
  ]
})

export class EditarPromocionEspecialPage implements OnInit {
  formularioPromocionEspecial: FormGroup;
  //promocionesEspeciales!:PromocionEspecial[];
  //datos!:PromocionEspecial;
  idPromocion!: string;
  nombre!: string;
  descripcion!: string;
  tipo!: string;
  definicion!: string;
  precio!: number;
  activa!: string;
  imgURL!: string;
  cveSucursal: string = '';
  selectedFile: File | null = null;
  fileName: string = '';
  uploadResponse: string = '';
  resultado: string = '';

  private modalCtrl = inject(ModalController);

  // 🛡️ Fuerza a Angular a incluir el componente en producción
  private readonly forceInclude = PromocionBuilderComponent;

  get fullImgUrl(): string {
    if (!this.imgURL) return '';
    if (this.imgURL.startsWith('http')) {
      return this.imgURL;
    }
    return `https://api.cheesepizza.com.mx/${this.imgURL}`;
  }

  constructor(private fb: FormBuilder, private promocionEspecialSvc: PromocionEspecialService,
    private globalService: GlobalService,
    private router: Router,
    private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>')
      console.log(data); // Aquí tienes tus datos

      this.idPromocion = data.idPromocion;
      this.nombre = data.nombre;
      this.descripcion = data.descripcion;
      this.tipo = data.tipo;
      this.definicion = data.definicion;
      this.precio = data.precio;
      this.activa = data.activa;
      this.imgURL = data.imgURL || data.img_url;

      console.log('id===>>' + this.idPromocion);
      console.log('descripcion===>' + this.descripcion);

    }
    this.formularioPromocionEspecial = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      definicion: ['', Validators.required],
      precio: ['', Validators.required],
      activa: ['', Validators.required],
      // imgURL: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-promocion-especial en OnInit');
  }

  async abrirModal() {
    try {
      const modal = await this.modalCtrl.create({
        component: PromocionBuilderComponent,
        componentProps: {
          title: 'Modificar Promoción',
          definicion: this.formularioPromocionEspecial.value.definicion || '',
          tipo: this.formularioPromocionEspecial.value.tipo || ''
        }
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
      //const uploadUrl = `${environment.baseUrl}/upload/promocion`;
      const uploadUrl = `https://admin.cheesepizza.com.mx/upload/promocion`;

      this.http
        .post<{ message: string; url: string }>(uploadUrl, formData)
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

  async editaPromocionEspecial() {
    if (!this.formularioPromocionEspecial.valid) {
      this.formularioPromocionEspecial.markAllAsTouched(); // 🔍 fuerza el chequeo visual
      alert('Por favor completa todos los campos.');
      return;
    }
    if (!this.selectedFile && !this.imgURL) {
      alert('Por favor selecciona una imagen antes de enviar.');
      return;
    }

    try {
      console.log(this.formularioPromocionEspecial.value)

      let imageUrl = this.imgURL;
      if (this.selectedFile) {
        imageUrl = await this.uploadImage();
      }

      //Mu Se crearon estas variables el 23 dic 2024
      let promocionEspecial: PromocionEspecial = new PromocionEspecial(
        this.idPromocion,
        this.nombre,
        this.descripcion,
        this.tipo,
        this.definicion,
        this.precio,
        this.activa,
        this.imgURL);
      //Mu Se crearon estas variables el 23 dic 2024

      promocionEspecial.idPromocion = this.idPromocion;
      promocionEspecial.nombre = this.formularioPromocionEspecial.value.nombre;
      promocionEspecial.descripcion = this.formularioPromocionEspecial.value.descripcion;
      promocionEspecial.tipo = this.formularioPromocionEspecial.value.tipo;
      promocionEspecial.definicion = this.formularioPromocionEspecial.value.definicion;
      promocionEspecial.precio = this.formularioPromocionEspecial.value.precio;
      promocionEspecial.activa = this.formularioPromocionEspecial.value.activa;
      promocionEspecial.imgURL = imageUrl; //Necesita esta línea para actualizar
      this.promocionEspecialSvc.editaPromocionEspecial(promocionEspecial).subscribe({
        next: (res: any) => {
          console.log('Promoción Especial editado de forma exitosa')
          console.log(res);
          this.saltaAPromocionEspecial();

        },
        error: (error: any) => {
          console.log('Error en la edición de la promoción especial')
          console.log(error)

        }
      })

    }
    catch (err) {
      console.error('❌ Error al subir imagen:', err);
      alert('Error al subir la imagen');
    }
  }

  saltaAPromocionEspecial() {
    this.router.navigateByUrl('/promocion-especial-ppal');
  }

}
