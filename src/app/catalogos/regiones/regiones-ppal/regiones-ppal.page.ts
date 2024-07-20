import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton, 
  IonBackButton, IonList, IonItem, IonLabel,AlertController } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { RegionService } from 'src/app/services/region.service';
import { Region } from 'src/app/model/dto/region';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-regiones-ppal',
  templateUrl: './regiones-ppal.page.html',
  styleUrls: ['./regiones-ppal.page.scss'],
  standalone: true,
  imports: [SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon, 
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegionesPpalPage implements OnInit, OnDestroy {
  navigationSubscription:Subscription;
  regiones!:Region[];
  mensaje:string;

  constructor(private regionesSvc:RegionService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef 
  ) { 
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRegiones();
      });

  }

  ngOnInit() {
    console.log('Entré a regiones en OnInit');
  }
  
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerRegiones(){
    this.regionesSvc.dameListaRegiones().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.regiones=res;
        
        for(let region of this.regiones){
          region.hola='Hola';
        }
        console.log(this.regiones);
        this.regiones 
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }

  saltaAInsertarRegion() {
    this.router.navigateByUrl('/insertar-region');
  }  

}
