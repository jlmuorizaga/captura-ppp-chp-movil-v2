import { SalsaService } from './../../../services/salsa.service';
import { Salsa } from './../../../model/dto/salsa';
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
  selector: 'app-insertar-salsa',
  templateUrl: './insertar-salsa.page.html',
  styleUrls: ['./insertar-salsa.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule]
})
export class InsertarSalsaPage implements OnInit{
  formularioSalsa: FormGroup;
  cveSucursal: string = ''

  constructor(private fb: FormBuilder,private salsasSvc:SalsaService,
    private globalService: GlobalService,
    private router: Router) {
    this.formularioSalsa = this.fb.group({
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar-salsa.page.ts en OnInit');
  }

  insertaSalsa() {
    if (this.formularioSalsa.valid) {
      console.log(this.formularioSalsa.value)
      let salsa:Salsa=new Salsa();
      salsa.id=Utilerias.generaId();
      salsa.descripcion=this.formularioSalsa.value.descripcion;
      this.salsasSvc.insertaSalsa(salsa).subscribe({
        next:(res:any)=>{
          console.log('Salsa insertada de forma exitosa')
          console.log(res);
          this.saltaASalsas();

        },
        error:(error:any)=>{
          console.log('Error en la inserción de la región')
          console.log(error)

        }
      })

    }
  }
  saltaASalsas() {
    this.router.navigateByUrl('/salsas-ppal');
  }
}
