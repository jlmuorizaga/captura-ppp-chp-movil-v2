import { PromocionEspecial } from 'src/app/model/dto/promocion-especial';
import { PromocionEspecialService } from 'src/app/services/promocion-especial.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonLabel, IonItem, IonRadio, IonRadioGroup,IonSelectOption,IonSelect } from '@ionic/angular/standalone';
  import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute,Route } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-editar-promocion-especial',
  templateUrl: './editar-promocion-especial.page.html',
  styleUrls: ['./editar-promocion-especial.page.scss'],
  standalone: true,
  imports: [IonRadioGroup, IonRadio, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,IonSelectOption,IonSelect,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule,
  ]
})

export class EditarPromocionEspecialPage implements OnInit {
  formularioPromocionEspecial:FormGroup;
  //promocionesEspeciales!:PromocionEspecial[];
  //datos!:PromocionEspecial;
  idPromocion!:string;
  nombre!: string;
  descripcion!: string;
  tipo!:string;
  definicion!:string;
  precio!:number;
  activa!:string;
  imgURL!:string;
  cveSucursal: string = '';

  constructor(private fb: FormBuilder,private promocionEspecialSvc:PromocionEspecialService,
    private globalService: GlobalService,
    private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>')
      console.log(data); // Aquí tienes tus datos

      this.idPromocion=data.idPromocion;
      this.nombre=data.nombre;
      this.descripcion=data.descripcion;
      this.tipo=data.tipo;
      this.definicion=data.definicion;
      this.precio=data.precio;
      this.activa=data.activa;
      this.imgURL=data.imgURL;

      console.log('id===>>'+this.idPromocion);
      console.log('descripcion===>'+this.descripcion);

    }
    this.formularioPromocionEspecial = this.fb.group({
      nombre:['',Validators.required],
      descripcion: ['', Validators.required],
      tipo:['',Validators.required],
      definicion:['',Validators.required],
      precio:['',Validators.required],
      activa:['',Validators.required],
      imgURL:['',Validators.required],
    })
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-promocion-especial en OnInit');
  }

  editaPromocionEspecial() {
    if (this.formularioPromocionEspecial.valid) {
       console.log(this.formularioPromocionEspecial.value)

        //Mu Se crearon estas variables el 23 dic 2024
       let promocionEspecial:PromocionEspecial=new PromocionEspecial(
        this.idPromocion,
        this.nombre,
        this.descripcion,
        this.tipo,
        this.definicion,
        this.precio,
        this.activa,
        this.imgURL);
        //Mu Se crearon estas variables el 23 dic 2024

       promocionEspecial.idPromocion=this.idPromocion;
       promocionEspecial.nombre=this.formularioPromocionEspecial.value.nombre;
       promocionEspecial.descripcion=this.formularioPromocionEspecial.value.descripcion;
       promocionEspecial.tipo=this.formularioPromocionEspecial.value.tipo;
       promocionEspecial.definicion=this.formularioPromocionEspecial.value.definicion;
       promocionEspecial.precio=this.formularioPromocionEspecial.value.precio;
       promocionEspecial.activa=this.formularioPromocionEspecial.value.activa;
       promocionEspecial.imgURL = this.formularioPromocionEspecial.value.imgURL;
       this.promocionEspecialSvc.editaPromocionEspecial(promocionEspecial).subscribe({
         next:(res:any)=>{
           console.log('Promoción Especial editado de forma exitosa')
           console.log(res);
           this.saltaAPromocionEspecial();

         },
         error:(error:any)=>{
           console.log('Error en la edición de la promoción especial')
           console.log(error)

         }
       })

     }
   }

   saltaAPromocionEspecial() {
     this.router.navigateByUrl('/promocion-especial-ppal');
   }

}
