import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProducto } from './../../../model/dto/tipo-producto';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem }
  from '@ionic/angular/standalone';
  import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';

@Component({
  selector: 'app-insertar-tipo-producto',
  templateUrl: './insertar-tipo-producto.page.html',
  styleUrls: ['./insertar-tipo-producto.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule]
})
export class InsertarTipoProductoPage{
  formularioTipoProducto: FormGroup;

  constructor(private fb: FormBuilder,private tipoProductoSvc:TipoProductoService,private router: Router) {
    this.formularioTipoProducto = this.fb.group({
      descripcion: ['', Validators.required],
      img_url: ['', Validators.required]
    })
  }
  insertaTipoProducto() {
    if (this.formularioTipoProducto.valid) {
      console.log(this.formularioTipoProducto.value)
      let tipoProducto:TipoProducto=new TipoProducto();
      //region.idRegion=this.formularioRegion.value.idRegion;
      tipoProducto.id=Utilerias.generaId();
      tipoProducto.descripcion=this.formularioTipoProducto.value.descripcion;
      tipoProducto.img_url=this.formularioTipoProducto.value.img_url;
      this.tipoProductoSvc.insertaTipoProducto(tipoProducto).subscribe({
        next:(res:any)=>{
          console.log('Tipo de producto insertado de forma exitosa')
          console.log(res);
          this.saltaATipoProducto();

        },
        error:(error:any)=>{
          console.log('Error en la inserción del tipo de producto')
          console.log(error)

        }
      })

    }
  }
  saltaATipoProducto() {
    this.router.navigateByUrl('/tipo-producto-ppal');
  }

}
