import { Ingrediente } from './../../../model/dto/ingrediente';
import { IngredienteService } from './../../../services/ingrediente.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute,Route } from '@angular/router';

@Component({
  selector: 'app-editar-ingrediente',
  templateUrl: './editar-ingrediente.page.html',
  styleUrls: ['./editar-ingrediente.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule,
  ]
})
export class EditarIngredientePage implements OnInit {
  formularioIngrediente: FormGroup;
  ingredientes!:Ingrediente[];
  datos!:Ingrediente;
  id!:string;
  nombre!:string;
  constructor(private fb: FormBuilder,private ingredientesSvc:IngredienteService,
    private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>')
      console.log(data); // Aquí tienes tus datos

      this.id=data.id;
      this.nombre=data.nombre;

      console.log('id===>>'+this.id);
      console.log('nombre===>'+this.nombre);

    }
    this.formularioIngrediente = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  ngOnInit() {
    console.log('Entré a editar-nombre en OnInit');
  }

  editaIngrediente() {
    if (this.formularioIngrediente.valid) {
       console.log(this.formularioIngrediente.value)
       let ingrediente:Ingrediente=new Ingrediente();
       //region.idRegion=this.formularioRegion.value.idRegion;
       ingrediente.id=this.id;
       ingrediente.nombre=this.formularioIngrediente.value.nombre;
       //this.regionesSvc.insertaRegion(region).subscribe({
       this.ingredientesSvc.editaIngrediente(ingrediente).subscribe({
         next:(res:any)=>{
           console.log('Ingrediente editado de forma exitosa')
           console.log(res);
           this.saltaAIngredientes();

         },
         error:(error:any)=>{
           console.log('Error en la edición del ingrediente')
           console.log(error)

         }
       })

     }
   }

   saltaAIngredientes() {
     this.router.navigateByUrl('/ingredientes-ppal');
   }

}

