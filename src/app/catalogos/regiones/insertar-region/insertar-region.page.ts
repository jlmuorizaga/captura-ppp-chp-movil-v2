import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol,
  IonRow, IonGrid, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem
} from '@ionic/angular/standalone';
import { Region } from 'src/app/model/dto/region';
import { RegionService } from 'src/app/services/region.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-insertar-region',
  templateUrl: './insertar-region.page.html',
  styleUrls: ['./insertar-region.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonInput,
    ReactiveFormsModule, IonButton, IonGrid, IonRow, IonCol, IonBackButton,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})
export class InsertarRegionPage implements OnInit{
  formularioRegion: FormGroup;
  cveSucursal: string = '';

  constructor(private fb: FormBuilder, private regionesSvc: RegionService,
    private globalService: GlobalService,
    private router: Router) {
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
    console.log('Entré a inserta-region.page.ts en OnInit');
  }

  insertaRegion() {
    if (this.formularioRegion.valid) {
      console.log(this.formularioRegion.value)
      let region: Region = new Region();
      //region.idRegion=this.formularioRegion.value.idRegion;
      region.idRegion = Utilerias.generaId();
      region.nombreRegion = this.formularioRegion.value.nombreRegion;
      region.poligono = this.formularioRegion.value.poligono;
      region.latitud = this.formularioRegion.value.latitud;
      region.longitud = this.formularioRegion.value.longitud;


      this.regionesSvc.insertaRegion(region).subscribe({
        next: (res: any) => {
          console.log('Región insertada de forma exitosa')
          console.log(res);
          this.saltaARegiones();

        },
        error: (error: any) => {
          console.log('Error en la inserción de la región')
          console.log(error)

        }
      })

    }
  }
  saltaARegiones() {
    this.router.navigateByUrl('/regiones-ppal');
  }
}
