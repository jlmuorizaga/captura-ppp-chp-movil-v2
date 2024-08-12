
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { TipoProducto } from './../../../model/dto/tipo-producto';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
  import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute,Route } from '@angular/router';

@Component({
  selector: 'app-editar-tipo-producto',
  templateUrl: './editar-tipo-producto.page.html',
  styleUrls: ['./editar-tipo-producto.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule,
  ]
})
export class EditarTipoProductoPage implements OnInit {
  formularioTipoProducto: FormGroup;
  tiposProducto!:TipoProducto[];
  datos!:TipoProducto;
  id!:string;
  descripcion!:string;
  img_url!:string;

  constructor(private fb: FormBuilder,private tipoProductoService:TipoProductoService,
    private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>')
      console.log(data); // Aquí tienes tus datos

      this.id=data.id;
      this.descripcion=data.descripcion;
      this.img_url=data.img_url;

      console.log('id===>>'+this.id);
      console.log('descripcion===>'+this.descripcion);

    }
    this.formularioTipoProducto = this.fb.group({
      descripcion: ['', Validators.required],
      img_url:['',Validators.required]
    })
  }

  ngOnInit() {
    console.log('Entré a editar-tipo-producto en OnInit');
  }
  editaTipoProducto() {
    if (this.formularioTipoProducto.valid) {
       console.log(this.formularioTipoProducto.value)
       let tipoProducto:TipoProducto=new TipoProducto();
       //region.idRegion=this.formularioRegion.value.idRegion;
       tipoProducto.id=this.id;
       tipoProducto.descripcion=this.formularioTipoProducto.value.descripcion;
       tipoProducto.img_url=this.formularioTipoProducto.value.img_url;
       this.tipoProductoService.editaTipoProducto(tipoProducto).subscribe({
         next:(res:any)=>{
           console.log('Tipo Producto editado de forma exitosa')
           console.log(res);
           this.saltaATipoProducto();

         },
         error:(error:any)=>{
           console.log('Error en la edición de la región')
           console.log(error)

         }
       })

     }
   }

   saltaATipoProducto() {
     this.router.navigateByUrl('/tipo-producto-ppal');
   }
}
