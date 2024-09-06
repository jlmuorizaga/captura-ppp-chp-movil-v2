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
import { RelacionPromocionEspecialSucursalService } from 'src/app/services/relacion-promocion-especial-sucursal.service';
import { RelacionPES } from './../../../model/dto/relacion-promocion-especial-sucursal';



@Component({
  selector: 'app-editar-relacion-promocion-especial-sucursal',
  templateUrl: './editar-relacion-promocion-especial-sucursal.page.html',
  styleUrls: ['./editar-relacion-promocion-especial-sucursal.page.scss'],
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
export class EditarRelacionPromocionEspecialSucursalPage implements OnInit {
  formularioRelacionPES:FormGroup;
  datos!:RelacionPES;
  idPromocion!:string;
  nombre!:string;
  descripcion!:string;
  idSucursal!:string;
  claveSucursal!:string;
  nombreSucursal!:string;
  activa!:string;


  constructor(
    private fb:FormBuilder,
    private relacionPESSvc:RelacionPromocionEspecialSucursalService,
    private router:Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.idPromocion = data.idPromocion;
      this.nombre = data.nombre;
      this.descripcion = data.descripcion;
      this.idSucursal = data.idSucursal;
      this.claveSucursal = data.claveSucursal;
      this.nombreSucursal = data.nombreSucursal;
      this.activa = data.activa;

    }
    this.formularioRelacionPES = this.fb.group({
      activa: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('Entré a editar-relacion-promocion-especial-sucursal en OnInit');
  }

  editaRelacionPES() {
    if (this.formularioRelacionPES.valid) {
      console.log(this.formularioRelacionPES.value);
      let relacionPES: RelacionPES= new RelacionPES();
      //especialidad.id=this.formularioEspecialidad.value.id;
      relacionPES.idPromocion=this.idPromocion;
      relacionPES.idSucursal=this.idSucursal;
      relacionPES.activa=this.formularioRelacionPES.value.activa;

      this.relacionPESSvc.editaRelacionPromocionEspecialSucursal(relacionPES).subscribe({
        next: (res: any) => {
          console.log('Relación Promoción Especial Sucursal editada de forma exitosa');
          console.log(res);
          this.saltaARelacionPES();
        },
        error: (error: any) => {
          console.log('Error en la edición de la especialidad');
          console.log(error);
        },
      });
    }
  }
  saltaARelacionPES() {
    this.router.navigateByUrl('/relacion-promocion-especial-sucursal-ppal');
  }
}
