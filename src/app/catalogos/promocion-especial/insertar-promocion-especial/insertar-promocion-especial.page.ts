import { PromocionEspecialService } from './../../../services/promocion-especial.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
  import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { PromocionEspecial } from 'src/app/model/dto/promocion-especial';
@Component({
  selector: 'app-insertar-promocion-especial',
  templateUrl: './insertar-promocion-especial.page.html',
  styleUrls: ['./insertar-promocion-especial.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule]
})
export class InsertarPromocionEspecialPage{
  formularioPromocionEspecial:FormGroup;

  constructor(private fb: FormBuilder,private promocionesEspecialesSvc:PromocionEspecialService,private router: Router) {
    this.formularioPromocionEspecial = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      definicion: ['', Validators.required],
      precio: ['', Validators.required],
      activa: ['', Validators.required],
    })
  }
  insertaPromocionEspecial() {
    if (this.formularioPromocionEspecial.valid) {
      console.log(this.formularioPromocionEspecial.value)
      let promocionEspecial:PromocionEspecial=new PromocionEspecial();
      promocionEspecial.idPromocion=Utilerias.generaId();
      promocionEspecial.nombre=this.formularioPromocionEspecial.value.nombre;
      promocionEspecial.descripcion=this.formularioPromocionEspecial.value.descripcion;
      promocionEspecial.tipo=this.formularioPromocionEspecial.value.tipo;
      promocionEspecial.definicion=this.formularioPromocionEspecial.value.definicion;
      promocionEspecial.precio=this.formularioPromocionEspecial.value.precio;
      promocionEspecial.activa=this.formularioPromocionEspecial.value.activa;
      this.promocionesEspecialesSvc.insertaPromocionEspecial(promocionEspecial).subscribe({
        next:(res:any)=>{
          console.log('Promoción Especial insertada de forma exitosa')
          console.log(res);
          this.saltaAPromocionesEspeciales();

        },
        error:(error:any)=>{
          console.log('Error en la inserción de la Promoción Especial')
          console.log(error)

        }
      })

    }
  }
  saltaAPromocionesEspeciales() {
    this.router.navigateByUrl('/promocion-especial-ppal');
  }

}