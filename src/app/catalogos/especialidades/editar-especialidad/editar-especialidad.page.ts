import { Especialidad } from 'src/app/model/dto/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
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
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/services/global.service';
//import { from } from 'rxjs';

@Component({
  selector: 'app-editar-especialidad',
  templateUrl: './editar-especialidad.page.html',
  styleUrls: ['./editar-especialidad.page.scss'],
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
  ],
})
export class EditarEspecialidadPage implements OnInit {
  formularioEspecialidad!: FormGroup;
  cveSucursal: string = '';
  id!: string;
  // Valores iniciales simulados
  nombre!: string;
  ingredientes!: string;
  selectedFile: File | null = null;
  fileName: string = '';
  uploadResponse: string = '';
  imgURL!: string;
  orden!: string;
  cantidadIngredientes!: string;
  esDeUnIngrediente!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private globalService: GlobalService,
    private especialidadSvc: EspecialidadService,
    private http: HttpClient
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.id = data.id;
      this.nombre = data.nombre;
      this.ingredientes = data.ingredientes;
      this.imgURL = data.imgURL;
      this.orden = data.orden;
      this.cantidadIngredientes = data.cantidadIngredientes;
      this.esDeUnIngrediente = data.esDeUnIngrediente;
      console.log('esDeUnIngrediente===>>' + this.esDeUnIngrediente);
    }

    // Inicialización correcta y limpia del formulario
    this.formularioEspecialidad = this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      orden: ['', Validators.required],
      cantidadIngredientes: ['', Validators.required],
      esDeUnIngrediente: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
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
          'http://ec2-54-144-58-67.compute-1.amazonaws.com:3005/upload/especialidad',
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

  async editaEspecialidad() {
    if (!this.formularioEspecialidad.valid) {
      this.formularioEspecialidad.markAllAsTouched(); // 🔍 fuerza el chequeo visual
      alert('Por favor completa todos los campos.');
      return;
    }
    if (!this.selectedFile) {
      alert('Por favor selecciona una imagen antes de enviar.');
      return;
    }
    try {
      console.log('FormularioEspecialidad=');
      console.log(this.formularioEspecialidad.value);
      const imageUrl = await this.uploadImage();
      let especialidad: Especialidad = new Especialidad(
        this.id,
        this.nombre,
        this.ingredientes,
        imageUrl,
        this.orden,
        this.cantidadIngredientes,
        this.esDeUnIngrediente);

      especialidad.id = this.id;
      especialidad.nombre = this.formularioEspecialidad.value.nombre;
      especialidad.ingredientes = this.formularioEspecialidad.value.ingredientes;
      especialidad.imgURL = imageUrl,
      especialidad.orden = this.formularioEspecialidad.value.orden;
      especialidad.cantidadIngredientes = this.formularioEspecialidad.value.cantidadIngredientes;
      especialidad.esDeUnIngrediente = this.formularioEspecialidad.value.esDeUnIngrediente;

      this.especialidadSvc.editaEspecialidad(especialidad).subscribe({
        next: (res: any) => {
          console.log('Región editada de forma exitosa');
          console.log(res);
          this.saltaAEspecialidades();
        },
        error: (error: any) => {
          console.log('Error en la edición de la especialidad');
          console.log(error);
        },
      });
    }
    catch (err) {
      console.error('❌ Error al subir imagen:', err);
      alert('Error al subir la imagen');
    }
  }
  saltaAEspecialidades() {
    this.router.navigateByUrl('/especialidades-ppal');
  }

}
