import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
  import { Especialidad } from 'src/app/model/dto/especialidad';
  import { EspecialidadService } from 'src/app/services/especialidad.service';
  import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';

@Component({
  selector: 'app-insertar-especialidad',
  templateUrl: './insertar-especialidad.page.html',
  styleUrls: ['./insertar-especialidad.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule]
})
export class InsertarEspecialidadPage{
  formularioEspecialidad: FormGroup;

  constructor(private fb: FormBuilder,private especialidadesSvc:EspecialidadService,private router: Router) {
    this.formularioEspecialidad = this.fb.group({
      //id: ['', Validators.required],
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      aplica_2x1: ['', Validators.required],
      aplica_p1: ['', Validators.required],
      img_url: ['', Validators.required],
    })
  }

  insertaEspecialidad() {
    if (this.formularioEspecialidad.valid) {
      console.log(this.formularioEspecialidad.value)
      let especialidad:Especialidad=new Especialidad();
      //especialidad.id=this.formularioEspecialidad.value.id;
      especialidad.id=Utilerias.generaId();
      especialidad.nombre=this.formularioEspecialidad.value.nombre;
      especialidad.ingredientes=this.formularioEspecialidad.value.ingredientes;
      especialidad.aplica_2x1=this.formularioEspecialidad.value.aplica_2x1;
      especialidad.aplica_p1=this.formularioEspecialidad.value.aplica_p1;
      especialidad.img_url=this.formularioEspecialidad.value.img_url;
      this.especialidadesSvc.insertaEspecialidad(especialidad).subscribe({
        next:(res:any)=>{
          console.log('Especialidad insertada de forma exitosa')
          console.log(res);
          this.saltaAEspecialidades();

        },
        error:(error:any)=>{
          console.log('Error en la inserción de la especialidad')
          console.log(error)

        }
      })

    }

  }
  saltaAEspecialidades() {
    this.router.navigateByUrl('/especialidades-ppal');
  }

}
