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
//import { HttpClient } from '@angular/common/http';
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
  imgURL!: string;
  orden!: string;
  cantidadIngredientes!: string;
  esDeUnIngrediente!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private globalService: GlobalService,
    private especialidadSvc: EspecialidadService
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
      imgURL: ['',Validators.required],
      orden: ['', Validators.required],
      cantidadIngredientes: ['', Validators.required],
      esDeUnIngrediente: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
  }

  editaEspecialidad() {
    if (this.formularioEspecialidad.valid) {
      console.log('FormularioEspecialidad=');
      console.log(this.formularioEspecialidad.value);
      let especialidad: Especialidad = new Especialidad(
        this.id,
        this.nombre,
        this.ingredientes,
        this.imgURL,
        this.orden,
        this.cantidadIngredientes,
        this.esDeUnIngrediente);

      especialidad.id = this.id;
      especialidad.nombre = this.formularioEspecialidad.value.nombre;
      especialidad.ingredientes = this.formularioEspecialidad.value.ingredientes;
      especialidad.imgURL = this.formularioEspecialidad.value.imgURL;
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
  }
  saltaAEspecialidades() {
    this.router.navigateByUrl('/especialidades-ppal');
  }

}

/*import { Component, OnInit } from '@angular/core';
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
  IonSelectOption,
} from '@ionic/angular/standalone';

import { Especialidad } from 'src/app/model/dto/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-editar-especialidad',
  templateUrl: './editar-especialidad.page.html',
  styleUrls: ['./editar-especialidad.page.scss'],
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
    CommonModule,
    FormsModule,
    SharedModule,
    IonSelectOption,
  ],
})
export class EditarEspecialidadPage implements OnInit {
  formularioEspecialidad: FormGroup;
  especialidades!: Especialidad[];
  datos!: Especialidad;
  id!: string;
  nombre!: string;
  ingredientes!: string;
  imgURL!: string;
  orden!: string;
  cantidadIngredientes!:string;
  esDeUnIngrediente!:string;
  cveSucursal: string = '';

  constructor(
    private fb: FormBuilder,
    private especialidadesSvc: EspecialidadService,
    private globalService: GlobalService,
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
      this.imgURL = data.imgURL;
      this.orden = data.orden;
      this.cantidadIngredientes = data.cantidadIngredientes;
      this.esDeUnIngrediente = data.esDeUnIngrediente;

    }
    this.formularioEspecialidad = this.fb.group({
      //id: ['', Validators.required],
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      imgURL: ['', Validators.required],
      orden: ['', Validators.required],
      cantidadIngredientes:['',Validators.required],
      esDeUnIngrediente:['',Validators.required],
    });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-especialidad en OnInit');
  }

  editaEspecialidad() {
    if (this.formularioEspecialidad.valid) {
      console.log(this.formularioEspecialidad.value);
      let especialidad: Especialidad = new Especialidad(
        this.id,
        this.nombre,
        this.ingredientes,
        this.imgURL,
        this.orden,
        this.cantidadIngredientes,
        this.esDeUnIngrediente);

      especialidad.id = this.id;
      especialidad.nombre = this.formularioEspecialidad.value.nombre;
      especialidad.ingredientes = this.formularioEspecialidad.value.ingredientes;
      especialidad.imgURL = this.formularioEspecialidad.value.imgURL;
      especialidad.orden = this.formularioEspecialidad.value.orden;
      especialidad.cantidadIngredientes = this.formularioEspecialidad.value.cantidadIngredientes;
      especialidad.esDeUnIngrediente = this.formularioEspecialidad.value.esDeUnIngrediente;

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
*/
