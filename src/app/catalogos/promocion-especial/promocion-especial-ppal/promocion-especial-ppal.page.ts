import { PromocionEspecial } from './../../../model/dto/promocion-especial';
import { PromocionEspecialService } from './../../../services/promocion-especial.service';
import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Region } from 'src/app/model/dto/region';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-promocion-especial-ppal',
  templateUrl: './promocion-especial-ppal.page.html',
  styleUrls: ['./promocion-especial-ppal.page.scss'],
  standalone: true,
  imports: [IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PromocionEspecialPpalPage implements OnInit,OnDestroy {
  navigationSubscription:Subscription;
  promocionesEspeciales!:PromocionEspecial[];
  
  constructor(private promocionesEspecialesSvc:PromocionEspecialService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef) {
      this.navigationSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.leerPromocionesEspeciales();
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
  leerPromocionesEspeciales(){
    this.promocionesEspecialesSvc.dameListaPromocionesEspeciales().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.promocionesEspeciales=res;

        console.log(this.promocionesEspeciales);
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }
  borraPromocionEspecial(idPromocion:string){
    console.log('Voy a borrar esta promoción especial='+idPromocion);

    this.promocionesEspecialesSvc.borraPromocionEspecial(idPromocion).subscribe({
      next:(res:any)=>{
        console.log('Promoción Especial borrada de forma exitosa')
        console.log(res);
        this.leerPromocionesEspeciales();
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la promoción especial')
        console.log(error)

      }
    })

  }
  async confirmaBorrar(promocionEspecial:PromocionEspecial){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la promoción especial "'+promocionEspecial.nombre+'" ?',
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
            this.borraPromocionEspecial(promocionEspecial.idPromocion);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();

  }
  saltaAInsertarPromocionEspecial() {
    this.router.navigateByUrl('/insertar-promocion-especial');
  }
  async saltaAEditarPromocionEspecial(idPromocion:string){
    console.log('Estoy en editar promoción especial id='+idPromocion)
    this.promocionesEspecialesSvc.damePromocionEspecial(idPromocion).subscribe({
      next:(res:any)=>{
        console.log('Promoción Especial regresada de forma exitosa')
        console.log(res);

        this.router.navigate(['/editar-promocion-especial'],{state:{data:res}});

      },
      error:(error:any)=>{
        console.log('Error en la solicitud de la promoción especial')
        console.log(error)

      }
    })

  }
}
