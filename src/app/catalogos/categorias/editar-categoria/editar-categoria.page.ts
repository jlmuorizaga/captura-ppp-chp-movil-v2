import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/model/dto/categoria';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute,Route } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html',
  styleUrls: ['./editar-categoria.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule,
  ]
})
export class EditarCategoriaPage implements OnInit {
  formularioCategoria: FormGroup;
  categorias!:Categoria[];
  datos!:Categoria;
  codigo!:string;
  nombre!:string;
  constructor(private fb: FormBuilder,private categoriasSvc:CategoriaService,
    private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>')
      console.log(data); // Aquí tienes tus datos

      this.codigo=data.codigo;
      this.nombre=data.nombre;

      console.log('codigo===>>'+this.codigo);
      console.log('nombre===>'+this.nombre);

    }
    this.formularioCategoria = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  ngOnInit() {
    console.log('Entré a editar-categoria en OnInit');
  }

  editaCategoria() {
    if (this.formularioCategoria.valid) {
       console.log(this.formularioCategoria.value)
       let categoria:Categoria=new Categoria();
       //region.idRegion=this.formularioRegion.value.idRegion;
       categoria.codigo=this.codigo;
       categoria.nombre=this.formularioCategoria.value.nombre;
       //this.regionesSvc.insertaRegion(region).subscribe({
       this.categoriasSvc.editaCategoria(categoria).subscribe({
         next:(res:any)=>{
           console.log('Categoria editada de forma exitosa')
           console.log(res);
           this.saltaACategorias();

         },
         error:(error:any)=>{
           console.log('Error en la edición de la categoria')
           console.log(error)

         }
       })

     }
   }

   saltaACategorias() {
     this.router.navigateByUrl('/categorias-ppal');
   }

}
