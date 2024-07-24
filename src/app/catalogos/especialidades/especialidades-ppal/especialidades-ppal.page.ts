import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton, 
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/model/dto/especialidad';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-especialidades-ppal',
  templateUrl: './especialidades-ppal.page.html',
  styleUrls: ['./especialidades-ppal.page.scss'],
  standalone: true,
  imports: [IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon, 
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EspecialidadesPpalPage implements OnInit, OnDestroy {
  navigationSubscription:Subscription;
  especialidades!:Especialidad[];
  mensaje:string;

  
  constructor(private especialidadesSvc:EspecialidadService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef 
  ) { 
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerEspecialidades();
      });

  }

  ngOnInit() {
    console.log('Entré a especialidades en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerEspecialidades(){
    this.especialidadesSvc.dameListaEspecialidades().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.especialidades=res;
        console.log(this.especialidades);
        this.especialidades 
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }

  borraEspecialidad(id:string){
    console.log('Voy a borrar esta especialidad='+id);

    this.especialidadesSvc.borraEspecialidad(id).subscribe({
      next:(res:any)=>{
        console.log('Especialidad borrada de forma exitosa')
        console.log(res);
        this.leerEspecialidades();
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la especialidad')
        console.log(error)

      }
    })

  }
  async confirmaBorrar(especialidad:Especialidad){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la especialidad '+especialidad.nombre+' ?',
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
            this.borraEspecialidad(especialidad.id);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }  

  saltaAInsertarEspecialidad() {
    this.router.navigateByUrl('/insertar-especialidad');
  }

  async saltaAEditarEspecialidad(id:string){
    console.log('Estoy en editar especialidad id='+id)
    this.especialidadesSvc.dameEspecialidad(id).subscribe({
      next:(res:any)=>{
        console.log('Especialidad regresada de forma exitosa')
        console.log(res);
        //this.leerEspecialidades();
        //this.router.navigateByUrl('/editar-especialidad');
        this.router.navigate(['/editar-especialidad'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud de la especialidad')
        console.log(error)

      }
    })

  }

}
