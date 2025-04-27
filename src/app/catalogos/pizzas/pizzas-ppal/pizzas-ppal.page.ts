import { SharedModule } from './../../../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCardHeader, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardSubtitle,AlertController, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from 'src/app/model/dto/pizza';
import { filter } from 'rxjs';
import { NavigationEnd,Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pizzas-ppal',
  templateUrl: './pizzas-ppal.page.html',
  styleUrls: ['./pizzas-ppal.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardSubtitle, IonCard, IonCol, IonRow, IonGrid, IonButton, IonCardHeader,
    IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SharedModule]
})
export class PizzasPpalPage implements OnInit,OnDestroy {
  navigationSubscription:Subscription;
  pizzas!:Pizza[];
  mensaje:string;
  cveSucursal: string = '';

  constructor(private pizzasSvc:PizzaService,
    private alertController:AlertController,
    private globalService: GlobalService,
    private router: Router,private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerPizzas();
      });
   }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a products en OnInit');
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription){
      this.navigationSubscription.unsubscribe();
    }
  }
  leerPizzas(){
    this.pizzasSvc.dameListaPizzas().subscribe({
      next:(res:any)=>{
        console.log('Servicio leido de forma exitosa')
        console.log(res);
        this.pizzas=res;

        console.log(this.pizzas);
        this.pizzas
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }
  borraPizza(idPizza:string){
    console.log('Voy a borrar esta pizza ='+idPizza);

    this.pizzasSvc.borraPizza(idPizza).subscribe({
      next:(res:any)=>{
        console.log('Pizza borrada de forma exitosa')
        console.log(res);
        this.leerPizzas();
      },
      error:(error:any)=>{
        console.log('Error en el borrado de la pizza')
        console.log(error)

      }
    })
  }

  async confirmaBorrar(pizza:Pizza){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la pizza: '+pizza.nombreEspecialidad+' '+ pizza.tamanioPizza+' ?',
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
            this.borraPizza(pizza.idPizza);
            // Aquí puedes agregar la lógica para la operación a realizar
          }
        }
      ]
    });

    await alert.present();
  }

  saltaAInsertarPizza() {
    this.router.navigateByUrl('/insertar-pizza');
  }

  async saltaAEditarPizza(idPizza:string){
    console.log('Estoy en editar pizza idPizza='+idPizza)
    this.pizzasSvc.damePizza(idPizza).subscribe({
      next:(res:any)=>{
        console.log('Pizza regresada de forma exitosa')
        console.log(res);
        this.router.navigate(['/editar-pizza'],{state:{data:res}});
      },
      error:(error:any)=>{
        console.log('Error en la solicitud de la pizza')
        console.log(error)

      }
    })

  }
}
