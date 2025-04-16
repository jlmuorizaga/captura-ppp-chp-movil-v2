import { Categoria } from '../../../model/dto/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SharedModule } from '../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton,
  IonBackButton, IonList, IonItem, IonLabel,AlertController, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-ppal-categoria',
  templateUrl: './ppal-categoria.page.html',
  styleUrls: ['./ppal-categoria.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonRow, IonCol, IonGrid, SharedModule,IonLabel, IonItem, IonList, IonBackButton, IonButton, IonIcon,
    IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CategoriasPpalPage implements OnInit, OnDestroy {
  navigationSubscription:Subscription;
  categorias!:Categoria[];
  mensaje:string;
  cveSucursal: string = '';

  constructor(private categoriasSvc:CategoriaService,
    private globalService: GlobalService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerCategorias();
      });

  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a categorias en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  leerCategorias(){
    this.categoriasSvc.dameListaCategorias().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.categorias=res;
        console.log(this.categorias);
        this.categorias
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)
      }
    })
  }

  borraCategoria(codigo:string){
    console.log('Voy a borrar esta categoria='+codigo);

    this.categoriasSvc.borraCategoria(codigo).subscribe({
      next:(res:any)=>{
        console.log('Categoria borrada de forma exitosa')
        console.log(res);
        this.leerCategorias();
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la categoria')
        console.log(error)

      }
    })
  }

  async confirmaBorrar(categoria:Categoria){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la categoria '+categoria.nombre+' ?',
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
            this.borraCategoria(categoria.codigo);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }

  saltaAInsertarCategoria() {
    this.router.navigateByUrl('/insertar-categoria');
  }
  async saltaAEditarCategoria(codigo:string){
    console.log('Estoy en editar categoria codigo='+codigo)
    this.categoriasSvc.dameCategoria(codigo).subscribe({
      next:(res:any)=>{
        console.log('Categoria regresada de forma exitosa')
        console.log(res);
        //this.leerRegiones();
        //this.router.navigateByUrl('/editar-region');
        this.router.navigate(['/editar-categoria'],{state:{data:res}});


      },
      error:(error:any)=>{
        console.log('Error en la solicitud de la categoria')
        console.log(error)

      }
    })

  }

}
