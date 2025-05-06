import { SharedModule } from '../shared/shared/shared.module';
import { ChangeDetectorRef,Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonButton,AlertController, IonList, IonItem,IonSelect,
  IonSelectOption, IonLabel } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Sucursal } from 'src/app/model/dto/sucursal';
import {filter} from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SucursalService } from 'src/app/services/sucursal.service';
import { GlobalService } from '../services/global.service';
import { SessionTimerComponent } from '../components/session-timer/session-timer.component';
import { PromocionBuilderComponent } from '../components/promocion-builder/promocion-builder.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonButton, SharedModule, IonContent,
    IonHeader, IonTitle, IonToolbar,IonSelect,IonSelectOption,
    CommonModule, FormsModule,ReactiveFormsModule,PromocionBuilderComponent,IonButtons],
    providers: [ModalController]  // <-- ESTA LÍNEA SOLUCIONA EL ERROR
})
export class HomePage implements OnInit,OnDestroy {
  formulario:FormGroup;
  navigationSubscription:Subscription;
  sucursales!:Sucursal[];
  mensaje:string;
  tiempoSesionEnMinutos=60;
  totalSeconds = this.tiempoSesionEnMinutos * 60; // duración de sesión: 5 minutos (puedes ajustar)
  intervalId: any;
  warned = false;
  resultado: string = '';

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: PromocionBuilderComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.resultado = `Tipo: ${data.tipo}, Definición: ${data.definicion}`;
    }
  }

  get minutes() {
    return Math.floor(this.totalSeconds / 60);
  }

  get seconds() {
    return this.totalSeconds % 60;
  }

  constructor(private sucursalesSvc:SucursalService,
    private alertController:AlertController,
    private router: Router,private cdr: ChangeDetectorRef,
    private globalService: GlobalService,
    private fb:FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.mensaje = 'Estoy en el constructor';

    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerSucursales();
        this.restartCountdown(); // 👈 reinicia el contador cuando vuelves a esta página
      });
      this.formulario=this.fb.group({
        id_sucursal: ['', Validators.required],

      })

  }

  ngOnInit() {
    this.startCountdown();
    console.log('Entré a sucursales en OnInit()');
  }

  startCountdown() {
    this.intervalId = setInterval(async () => {
      this.totalSeconds--;

      if (this.totalSeconds === 60 && !this.warned) {
        this.warned = true;
        const alert = await this.alertController.create({
          header: '¡Atención!',
          message: 'Tu sesión expirará en 1 minuto.',
          buttons: ['Ok'],
        });
        await alert.present();
      }

      if (this.totalSeconds <= 0) {
        clearInterval(this.intervalId);
        const alert = await this.alertController.create({
          header: 'Sesión expirada',
          message: 'Has sido desconectado por inactividad.',
          buttons: ['Aceptar'],
        });
        await alert.present();
        this.router.navigate(['/home']); // Cambia esta ruta si es otra
      }
    }, 1000);
  }
  restartCountdown() {
    this.totalSeconds = this.tiempoSesionEnMinutos * 60; // o el tiempo que quieras
    this.warned = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async saltaAMenuCatalogos() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched(); // muestra errores si los hay

      const alert = await this.alertController.create({
        header: 'Sucursal requerida',
        message: 'Por favor selecciona una sucursal antes de continuar.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    this.globalService.idSucursalGlobal = this.formulario.value.id_sucursal;
    this.router.navigateByUrl('/menu-catalogos');
  }

  leerSucursales(){
    this.sucursalesSvc.dameListaSucursales().subscribe({
      next:(res:any)=>{
        console.log('Servicio dameListaSucursales() leido de forma exitosa')
       // console.log(res);
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

