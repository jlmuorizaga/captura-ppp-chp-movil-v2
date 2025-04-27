import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/model/dto/categoria';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem }
  from '@ionic/angular/standalone';
  import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-insertar-categoria',
  templateUrl: './insertar-categoria.page.html',
  styleUrls: ['./insertar-categoria.page.scss'],
  standalone: true,
  imports: [IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule]
})
export class InsertarCategoriaPage implements OnInit{
  formularioCategoria: FormGroup;
  cveSucursal: string = '';

  constructor(private fb: FormBuilder,private categoriasSvc:CategoriaService,
    private globalService: GlobalService,
    private router: Router) {
    this.formularioCategoria = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar-categoria en OnInit=',this.cveSucursal);
  }

  insertaCategoria() {
    if (this.formularioCategoria.valid) {
      console.log(this.formularioCategoria.value)
      let categoria:Categoria=new Categoria();
      categoria.codigo=this.formularioCategoria.value.codigo;;
      categoria.nombre=this.formularioCategoria.value.nombre;
      this.categoriasSvc.insertaCategoria(categoria).subscribe({
        next:(res:any)=>{
          console.log('Categoria insertada de forma exitosa')
          console.log(res);
          this.saltaACategorias();

        },
        error:(error:any)=>{
          console.log('Error en la inserción de la categoria')
          console.log(error)

        }
      })

    }
  }
  saltaACategorias() {
    this.router.navigateByUrl('/ppal-categoria');
  }
}
