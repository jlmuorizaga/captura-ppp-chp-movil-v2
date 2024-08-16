import { Salsa } from './../../../model/dto/salsa';
import { SalsaService } from 'src/app/services/salsa.service';
import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-salsas-ppal',
  templateUrl: './salsas-ppal.page.html',
  styleUrls: ['./salsas-ppal.page.scss'],
  standalone: true,
  imports: [IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SalsasPpalPage implements OnInit, OnDestroy {
  navigationSubscription:Subscription;
  salsas!:Salsa[];
  mensaje:string;

  constructor(private salsasSvc:SalsaService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerSalsas();
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

  leerSalsas(){
    this.salsasSvc.dameListaSalsas().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.salsas=res;
        console.log(this.salsas);
        this.salsas
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)
      }
    })
  }

  borraSalsa(id:string){
    console.log('Voy a borrar esta salsa='+id);

    this.salsasSvc.borraSalsa(id).subscribe({
      next:(res:any)=>{
        console.log('Salsa borrada de forma exitosa')
        console.log(res);
        this.leerSalsas();
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la salsa')
        console.log(error)

      }
    })
  }

  async confirmaBorrar(salsa:Salsa){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la salsa '+salsa.descripcion+' ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Operación confirmada');
            this.borraSalsa(salsa.id);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }

  saltaAInsertarSalsa() {
    this.router.navigateByUrl('/insertar-salsa');
  }
  async saltaAEditarSalsa(id:string){
    console.log('Estoy en editar salsa id='+id)
    this.salsasSvc.dameSalsa(id).subscribe({
      next:(res:any)=>{
        console.log('Salsa regresada de forma exitosa')
        console.log(res);
        //this.leerRegiones();
        //this.router.navigateByUrl('/editar-region');
        this.router.navigate(['/editar-salsa'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud de la salsa')
        console.log(error)

      }
    })

  }

}
