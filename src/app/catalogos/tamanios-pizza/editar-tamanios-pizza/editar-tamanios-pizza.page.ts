import { TamanioPizzaService } from './../../../services/tamanio-pizza.service';
import { TamanioPizza } from './../../../model/dto/tamanio-pizza';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
  import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute,Route } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-editar-tamanios-pizza',
  templateUrl: './editar-tamanios-pizza.page.html',
  styleUrls: ['./editar-tamanios-pizza.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule,
  ]
})
export class EditarTamaniosPizzaPage implements OnInit {
  formularioTamanioPizza:FormGroup;
  tamaniosPizza!:TamanioPizza[];
  datos!:TamanioPizza;
  id!:string;
  nombre!:string;
  cveSucursal: string = '';

  constructor(private fb: FormBuilder,
    private globalService: GlobalService,
    private tamaniosPizzaSvc:TamanioPizzaService,
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
    this.formularioTamanioPizza = this.fb.group({
      //idRegion: ['', Validators.required],
      nombre: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-tamanio-pizza en OnInit');
  }

  editaTamanioPizza() {
    if (this.formularioTamanioPizza.valid) {
       console.log(this.formularioTamanioPizza.value)
       let tamanioPizza:TamanioPizza=new TamanioPizza();
       tamanioPizza.id=this.id;
       tamanioPizza.nombre=this.formularioTamanioPizza.value.nombre;
       this.tamaniosPizzaSvc.editaTamanioPizza(tamanioPizza).subscribe({
         next:(res:any)=>{
           console.log('Tamaño Pizza editada de forma exitosa')
           console.log(res);
           this.saltaATamanioPizza();

         },
         error:(error:any)=>{
           console.log('Error en la edición de la región')
           console.log(error)

         }
       })

     }
   }
   saltaATamanioPizza() {
    this.router.navigateByUrl('/tamanios-pizza-ppal');
  }

}
