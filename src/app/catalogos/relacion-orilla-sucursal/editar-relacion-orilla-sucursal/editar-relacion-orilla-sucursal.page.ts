import { Orilla } from 'src/app/model/dto/orilla';
import { RelacionOrillaSucursal } from 'src/app/model/dto/relacion-orilla-sucursal'; 
import { OrillaService } from 'src/app/services/orilla.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
  import { Router } from '@angular/router';
  import { SharedModule } from 'src/app/shared/shared/shared.module';
  import { ActivatedRoute,Route } from '@angular/router';
import { RelacionOrillaSucursalService } from 'src/app/services/relacion-orilla-sucursal.service';

@Component({
  selector: 'app-editar-relacion-orilla-sucursal',
  templateUrl: './editar-relacion-orilla-sucursal.page.html',
  styleUrls: ['./editar-relacion-orilla-sucursal.page.scss'],
  standalone: true,
  imports: [IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})

export class EditarRelacionOrillaSucursalPage implements OnInit {
  formularioROS: FormGroup;
  orillas!:Orilla[];
  datos!:RelacionOrillaSucursal;
  idOrilla!:string;
  descripcionOrilla!:string;
  idTamanioPizza!:string;
  tamanioPizza!:string;
  idSucursal!:string;
  claveSucursal!:string;
  precio!:string;
  constructor(private fb: FormBuilder,private rosSvc:RelacionOrillaSucursalService,
    private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>')
      console.log(data); // Aquí tienes tus datos

      this.idOrilla=data.idOrilla;
      this.descripcionOrilla=data.descripcionOrilla;
      this.idTamanioPizza=data.idTamanioPizza;
      this.tamanioPizza=data.tamanioPizza;
      this.idSucursal=data.idSucursal;
      this.claveSucursal=data.claveSucursal;
      this.precio=data.precio;

      console.log('idOrilla===>>'+this.idOrilla);
      console.log('descripcionOrilla===>'+this.descripcionOrilla);

    }
    this.formularioROS = this.fb.group({
      precio: ['', Validators.required]
    })
  }

  ngOnInit() {
    console.log('Entré a editar-nombre en OnInit');
  }

  editaROS() {
    if (this.formularioROS.valid) {
       console.log(this.formularioROS.value)
       let ros:RelacionOrillaSucursal=new RelacionOrillaSucursal();
       //region.idRegion=this.formularioRegion.value.idRegion;
       ros.claveSucursal=this.claveSucursal;
       ros.descripcionOrilla=this.descripcionOrilla;
       ros.idOrilla=this.idOrilla;
       ros.idSucursal=this.idSucursal;
       ros.idTamanioPizza=this.idTamanioPizza;
       ros.precio=this.formularioROS.value.precio;
       ros.tamanioPizza=this.tamanioPizza;
       //this.regionesSvc.insertaRegion(region).subscribe({
       this.rosSvc.editaRegistroRelacionOrillaSucursal(ros).subscribe({
         next:(res:any)=>{
           console.log('ROS editada de forma exitosa')
           console.log(res);
           this.saltaAROS();

         },
         error:(error:any)=>{
           console.log('Error en la edición del ingrediente')
           console.log(error)

         }
       })

     }
   }

   saltaAROS() {
     this.router.navigateByUrl('/relacion-orilla-sucursal-ppal');
   }

}
