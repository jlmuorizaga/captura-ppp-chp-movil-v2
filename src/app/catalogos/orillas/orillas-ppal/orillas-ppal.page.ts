import { Orilla } from 'src/app/model/dto/orilla';
import { OrillaService } from 'src/app/services/orilla.service';
import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-orillas-ppal',
  templateUrl: './orillas-ppal.page.html',
  styleUrls: ['./orillas-ppal.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonRow, IonCol, IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OrillasPpalPage implements OnInit, OnDestroy {
  navigationSubscription:Subscription;
  orillas!:Orilla[];
  mensaje:string;

  constructor(private orillasSvc:OrillaService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerOrillas();
      });

  }

  ngOnInit() {
    console.log('Entré a orillas-ppal.page.ts en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  leerOrillas(){
    this.orillasSvc.dameListaOrillas().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.orillas=res;
        console.log(this.orillas);
        this.orillas
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)
      }
    })
  }

  borraOrilla(id:string){
    console.log('Voy a borrar esta orilla='+id);

    this.orillasSvc.borraOrilla(id).subscribe({
      next:(res:any)=>{
        console.log('Orilla borrada de forma exitosa')
        console.log(res);
        this.leerOrillas();
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la orilla')
        console.log(error)

      }
    })
  }

  async confirmaBorrar(orilla:Orilla){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la orilla \"'+orilla.descripcion+' '+orilla.nombre+'\"–––––––––––––– ?',
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
            this.borraOrilla(orilla.id);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }
  saltaAInsertarOrilla() {
    this.router.navigateByUrl('/insertar-orilla');
  }

  async saltaAEditarOrilla(id:string){
    console.log('Estoy en orillas-ppal.page.ts id='+id)
    this.orillasSvc.dameOrilla(id).subscribe({
      next:(res:any)=>{
        console.log('Orilla regresada de forma exitosa')
        console.log('orillas-ppal.page',res);
        this.router.navigate(['/editar-orilla'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud de la orilla')
        console.log(error)

      }
    })

  }
}
