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

import { Especialidad } from 'src/app/model/dto/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-editar-especialidad',
  templateUrl: './editar-especialidad.page.html',
  styleUrls: ['./editar-especialidad.page.scss'],
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
export class EditarEspecialidadPage implements OnInit {
  formularioEspecialidad: FormGroup;
  //especialidades!: Especialidad[];
  datos!: Especialidad;
  id!: string;
  nombre!: string;
  ingredientes!: string;
  img_url!: string;

  constructor(
    private fb: FormBuilder,
    private especialidadesSvc: EspecialidadService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.id = data.id;
      this.nombre = data.nombre;
      this.ingredientes = data.ingredientes;
      this.img_url = data.img_url;

      console.log('idRegion===>>' + this.id);
      console.log('nombreRegion===>' + this.nombre);
    }
    this.formularioEspecialidad = this.fb.group({
      //id: ['', Validators.required],
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      img_url: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('Entré a editar-especialidad en OnInit');
  }

  editaEspecialidad() {
    if (this.formularioEspecialidad.valid) {
      console.log(this.formularioEspecialidad.value);
      let especialidad: Especialidad = new Especialidad();
      //especialidad.id=this.formularioEspecialidad.value.id;
      especialidad.id = this.id;
      especialidad.nombre = this.formularioEspecialidad.value.nombre;
      especialidad.ingredientes =
        this.formularioEspecialidad.value.ingredientes;
      especialidad.img_url = this.formularioEspecialidad.value.img_url;

      this.especialidadesSvc.editaEspecialidad(especialidad).subscribe({
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
  }

  saltaAEspecialidades() {
    this.router.navigateByUrl('/especialidades-ppal');
  }
}
