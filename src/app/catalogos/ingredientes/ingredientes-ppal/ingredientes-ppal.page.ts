import { Ingrediente } from './../../../model/dto/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import {  } from 'src/app/services/salsa.service';
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
  selector: 'app-ingredientes-ppal',
  templateUrl: './ingredientes-ppal.page.html',
  styleUrls: ['./ingredientes-ppal.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonRow, IonCol, IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IngredientesPpalPage implements OnInit, OnDestroy {
  navigationSubscription:Subscription;
  ingredientes!:Ingrediente[];
  mensaje:string;

  constructor(private ingredientesSvc:IngredienteService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerIngredientes();
      });

  }

  ngOnInit() {
    console.log('Entré a ingredientes en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerIngredientes(){
    this.ingredientesSvc.dameListaIngredientes().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.ingredientes=res;
        console.log(this.ingredientes);
        this.ingredientes
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)
      }
    })
  }

  borraIngrediente(id:string){
    console.log('Voy a borrar este ingrediente='+id);

    this.ingredientesSvc.borraIngrediente(id).subscribe({
      next:(res:any)=>{
        console.log('Ingrediente borrado de forma exitosa')
        console.log(res);
        this.leerIngredientes();
      },
      error:(error:any)=>{
        console.log('Error en el borrado del ingrediente')
        console.log(error)

      }
    })
  }

  async confirmaBorrar(ingrediente:Ingrediente){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar el ingrediente '+ingrediente.nombre+' ?',
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
            this.borraIngrediente(ingrediente.id);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }

  saltaAInsertarIngrediente() {
    this.router.navigateByUrl('/insertar-ingrediente');
  }
  async saltaAEditarIngrediente(id:string){
    console.log('Estoy en editar ingrediente id='+id)
    this.ingredientesSvc.dameIngrediente(id).subscribe({
      next:(res:any)=>{
        console.log('Ingrediente regresado de forma exitosa')
        console.log(res);
        //this.leerRegiones();
        //this.router.navigateByUrl('/editar-region');
        this.router.navigate(['/editar-ingrediente'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud del ingrediente')
        console.log(error)

      }
    })

  }

}
