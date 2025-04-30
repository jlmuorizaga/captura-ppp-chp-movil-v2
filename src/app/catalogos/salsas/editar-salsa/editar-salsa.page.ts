import { SalsaService } from './../../../services/salsa.service';
import { Salsa } from './../../../model/dto/salsa';
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
  selector: 'app-editar-salsa',
  templateUrl: './editar-salsa.page.html',
  styleUrls: ['./editar-salsa.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule,
  ]
})
export class EditarSalsaPage implements OnInit {
  formularioSalsa: FormGroup;
  salsas!:Salsa[];
  datos!:Salsa;
  id!:string;
  descripcion!:string;
  cveSucursal: string = '';

  constructor(private fb: FormBuilder,private salsasSvc:SalsaService,
    private globalService: GlobalService,
    private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>')
      console.log(data); // Aquí tienes tus datos

      this.id=data.id;
      this.descripcion=data.descripcion;

      console.log('id===>>'+this.id);
      console.log('descripcion===>'+this.descripcion);

    }
    this.formularioSalsa = this.fb.group({
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-salsa en OnInit');
  }

  editaSalsa() {
    if (this.formularioSalsa.valid) {
       console.log(this.formularioSalsa.value)
       let salsa:Salsa=new Salsa();
       //region.idRegion=this.formularioRegion.value.idRegion;
       salsa.id=this.id;
       salsa.descripcion=this.formularioSalsa.value.descripcion;
       //this.regionesSvc.insertaRegion(region).subscribe({
       this.salsasSvc.editaSalsa(salsa).subscribe({
         next:(res:any)=>{
           console.log('Salsa editada de forma exitosa')
           console.log(res);
           this.saltaASalsas();

         },
         error:(error:any)=>{
           console.log('Error en la edición de la salsa')
           console.log(error)

         }
       })

     }
   }

   saltaASalsas() {
     this.router.navigateByUrl('/salsas-ppal');
   }

}
