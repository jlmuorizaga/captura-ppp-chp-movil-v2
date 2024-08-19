import { SharedModule } from '../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonButton,AlertController, IonList, IonItem,IonSelect,IonSelectOption } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Sucursal } from 'src/app/model/dto/sucursal';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonButton, SharedModule,IonBackButton, IonButtons, IonContent,
    IonHeader, IonTitle, IonToolbar,IonSelect,IonSelectOption,
    CommonModule, FormsModule]
})
export class HomePage implements OnInit,OnDestroy {
  navigationSubscription:Subscription;
  sucursales!:Sucursal[];
  mensaje:string;

  constructor(private sucursalesSvc:SucursalService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerSucursales();
      });
  }

  ngOnInit() {
    console.log('Entré a sucursales en OnInit()');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  saltaAMenuCatalogos() {
    this.router.navigateByUrl('/menu-catalogos');
  }

  leerSucursales(){
    this.sucursalesSvc.dameListaSucursales().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.sucursales=res;


        console.log(this.sucursales);
        this.sucursales
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }


}

