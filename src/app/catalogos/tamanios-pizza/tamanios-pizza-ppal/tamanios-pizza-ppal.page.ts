import { TamanioPizza } from './../../../model/dto/tamanio-pizza';
import { TamanioPizzaService } from './../../../services/tamanio-pizza.service';
import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid, IonRow, IonCol, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tamanios-pizza-ppal',
  templateUrl: './tamanios-pizza-ppal.page.html',
  styleUrls: ['./tamanios-pizza-ppal.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCol, IonRow, IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TamaniosPizzaPpalPage implements OnInit, OnDestroy  {
  navigationSubscription:Subscription;
  tamaniosPizza!:TamanioPizza[];
  mensaje:string;

  constructor(private tamaniosPizzaSvc:TamanioPizzaService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef) {
      this.mensaje = 'Estoy en el constructor';
      this.navigationSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.leerTamaniosPizza();
        });
    }

  ngOnInit() {
    console.log('Entré a TamaniosPizza en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerTamaniosPizza(){
    this.tamaniosPizzaSvc.dameListaTamanioPizza().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.tamaniosPizza=res;

        console.log(this.tamaniosPizza);
        this.tamaniosPizza
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }

  borraTamanioPizza(id:string){
    console.log('Voy a borrar esta tamaño pizza='+id);

    this.tamaniosPizzaSvc.borraTamanioPizza(id).subscribe({
      next:(res:any)=>{
        console.log('Tamaño Pizza borrada de forma exitosa')
        console.log(res);
        this.leerTamaniosPizza();
      },
      error:(error:any)=>{
        console.log('Error en el borrado del tamaño pizza')
        console.log(error)

      }
    })
  }

  async confirmaBorrar(tamanioPizza:TamanioPizza){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar el tamaño de pizza '+tamanioPizza.nombre+' ?',
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
            this.borraTamanioPizza(tamanioPizza.id);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }

  saltaAInsertarTamanioPizza() {
    this.router.navigateByUrl('/insertar-tamanios-pizza');
  }

  async saltaAEditarTamanioPizza(id:string){
    console.log('Estoy en editar tamaño pizza id='+id)
    this.tamaniosPizzaSvc.dameTamanioPizza(id).subscribe({
      next:(res:any)=>{
        console.log('Tamao Pizza regresada de forma exitosa')
        console.log(res);
        this.router.navigate(['/editar-tamanios-pizza'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud del tamaño pizza')
        console.log(error)

      }
    })

  }

}
