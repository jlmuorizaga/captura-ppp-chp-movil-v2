import { Ingrediente } from './../../../model/dto/ingrediente';
import { IngredienteService } from './../../../services/ingrediente.service';
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
  selector: 'app-insertar-ingrediente',
  templateUrl: './insertar-ingrediente.page.html',
  styleUrls: ['./insertar-ingrediente.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule]
})
export class InsertarIngredientePage implements OnInit{
  formularioIngrediente:FormGroup;
  cveSucursal: string = '';

  constructor(private fb: FormBuilder,private ingredientesSvc:IngredienteService,
    private globalService: GlobalService,
    private router: Router) {
    this.formularioIngrediente = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar ingredientsen OnInit');
  }

  insertaIngrediente() {
    if (this.formularioIngrediente.valid) {
      console.log(this.formularioIngrediente.value)
      let ingrediente:Ingrediente=new Ingrediente();
      ingrediente.id=Utilerias.generaId();
      ingrediente.nombre=this.formularioIngrediente.value.nombre;
      this.ingredientesSvc.insertaIngrediente(ingrediente).subscribe({
        next:(res:any)=>{
          console.log('Ingrediente insertado de forma exitosa')
          console.log(res);
          this.saltaAIngredientes();

        },
        error:(error:any)=>{
          console.log('Error en la inserción del ingrediente')
          console.log(error)

        }
      })

    }
  }
  saltaAIngredientes() {
    this.router.navigateByUrl('/ingredientes-ppal');
  }
}
