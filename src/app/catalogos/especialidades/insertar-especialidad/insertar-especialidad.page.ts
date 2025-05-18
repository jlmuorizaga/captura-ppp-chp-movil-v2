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
  IonItem,
  IonSelectOption,
  IonSelect,
  IonLabel,
} from '@ionic/angular/standalone';
import { Especialidad } from 'src/app/model/dto/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { CargarImagenComponent } from 'src/app/componentes/cargar-imagen/cargar-imagen.component';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-insertar-especialidad',
  templateUrl: './insertar-especialidad.page.html',
  styleUrls: ['./insertar-especialidad.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
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
    IonSelectOption,
    IonSelect,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SharedModule,
    IonLabel,
  ],
})
export class InsertarEspecialidadPage implements OnInit {
  formularioEspecialidad: FormGroup;
  id!: string;
  nombre!: string;
  ingredientes!: string;
  selectedFile: File | null = null;
  uploadResponse: string = '';
  imgURL: string = '';
  fileName: string = '';
  cveSucursal: string = '';
  orden!: string;
  cantidadIngredientes!: string;
  esDeUnIngrediente!: string;

  constructor(
    private fb: FormBuilder,
    private especialidadesSvc: EspecialidadService,
    private router: Router,
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.formularioEspecialidad = this.fb.group({
      //id: ['', Validators.required],
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      imgURL: [''],
      orden: ['', Validators.required],
      cantidadIngredientes: ['', Validators.required],
      //es_de_un_ingrediente: ['', Validators.required],
      esDeUnIngrediente: ['S'], // Valor por defecto,
    });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar-especialidad en OnInit=', this.cveSucursal);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
      //this.img_url=file;
    }
  }

  uploadImage(subcarpeta: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) return 'No se seleccionó archivo';
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('subcarpeta', subcarpeta); // enviamos la succarpeta
      this.http
        .post<{ message: string; url: string }>(
          'http://ec2-54-144-58-67.compute-1.amazonaws.com:3005/upload',
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

  async insertaEspecialidad() {
    if (this.formularioEspecialidad.valid) {
      try{
  const imageUrl = await this.uploadImage('especialidades'); // 🆕 especificas la subcarpeta
      const especialidad: Especialidad = new Especialidad(
        Utilerias.generaId(),
        this.formularioEspecialidad.value.nombre,
        this.formularioEspecialidad.value.ingredientes,
        imageUrl,
        this.formularioEspecialidad.value.orden,
        this.formularioEspecialidad.value.cantidadIngredientes,
        this.formularioEspecialidad.value.esDeUnIngrediente
      );

     this.especialidadesSvc.insertaEspecialidad(especialidad).subscribe({
        next: () => {
          console.log('✅ Especialidad insertada');
          this.saltaAEspecialidades();
        },
        error: (error) => {
          console.error('❌ Error al insertar especialidad', error);
        },
      });
    } catch (err) {
      console.error('❌ Error al subir imagen:', err);
    }
  }
}

  saltaAEspecialidades() {
    this.router.navigateByUrl('/especialidades-ppal');
  }
}
