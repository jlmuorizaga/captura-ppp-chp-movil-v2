import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem } from '@ionic/angular/standalone';
  import { Region } from 'src/app/model/dto/region';
  import { RegionService } from 'src/app/services/region.service';
  import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute,Route } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-editar-region',
  templateUrl: './editar-region.page.html',
  styleUrls: ['./editar-region.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule,IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent,IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule,
  ]
})
export class EditarRegionPage  implements OnInit {
  formularioRegion: FormGroup;
  regiones!:Region[];
  datos!:Region;
  idRegion!:string;
  nombreRegion!:string;
  poligono!:string;
  latitud!:string;
  longitud!:string;
  cveSucursal: string = '';

constructor(private fb: FormBuilder,private regionesSvc:RegionService,
  private globalService: GlobalService,
  private router: Router) {
  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    const data = navigation.extras.state['data'];
    console.log('Aqui están mis datos==>>')
    console.log(data); // Aquí tienes tus datos

    this.idRegion=data.id;
    this.nombreRegion=data.nombre;
    this.poligono=data.poligono;
    this.latitud=data.latitud;
    this.longitud=data.longitud;

    console.log('idRegion===>>'+this.idRegion);
    console.log('nombreRegion===>'+this.nombreRegion);

  }
  this.formularioRegion = this.fb.group({
    //idRegion: ['', Validators.required],
    nombreRegion: ['', Validators.required],
    poligono: ['', Validators.required],
    latitud: ['', Validators.required],
    longitud: ['', Validators.required],
  })
}
  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-region en OnInit');
  }
  editaRegion() {
   if (this.formularioRegion.valid) {
      console.log(this.formularioRegion.value)
      let region:Region=new Region();
      //region.idRegion=this.formularioRegion.value.idRegion;
      region.idRegion=this.idRegion;
      region.nombreRegion=this.formularioRegion.value.nombreRegion;
      region.poligono=this.formularioRegion.value.poligono;
      region.latitud=this.formularioRegion.value.latitud;
      region.longitud=this.formularioRegion.value.longitud;
      this.regionesSvc.editaRegion(region).subscribe({
        next:(res:any)=>{
          console.log('Región editada de forma exitosa')
          console.log(res);
          this.saltaARegiones();

        },
        error:(error:any)=>{
          console.log('Error en la edición de la región')
          console.log(error)

        }
      })

    }
  }

  saltaARegiones() {
    this.router.navigateByUrl('/regiones-ppal');
  }

}
