import { SucursalService } from './../../../services/sucursal.service';
import { RegionService } from './../../../services/region.service';
import { Region } from 'src/app/model/dto/region';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCol,
  IonRow,
  IonGrid,
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';


import { Sucursal } from 'src/app/model/dto/sucursal';
import { NavigationEnd, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-editar-sucursal',
  templateUrl: './editar-sucursal.page.html',
  styleUrls: ['./editar-sucursal.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInput,
    ReactiveFormsModule,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class EditarSucursalPage implements OnInit, OnDestroy {
formularioSucursal:FormGroup;
datos!: Sucursal;
id!: string;
clave!: string;
nombre_sucursal!: string;
rfc!: string;
domicilio!: string;
telefono!: string;
hora_inicio!: string;
hora_fin!: string;
latitud!: string;
longitud!: string;
idRegion!: string;
nombreRegion!: string;
venta_activa!: string;
pk!: string;
sk!: string;
monto_minimo_entrega_sucursal!: number;
monto_minimo_entrega_domicilio!: number;
navigationSubscription: Subscription;
regiones!:Region[];
idRegionSeleccionada!:string;


  constructor(
    private fb: FormBuilder,
    private sucursalesSvc: SucursalService,
    private router: Router,
    private regionesSvc: RegionService,
    private cdr: ChangeDetectorRef
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.id = data.id;
      this.clave = data.clave;
      this.nombre_sucursal = data.nombre_sucursal;
      this.rfc = data.rfc;
      this.domicilio = data.domicilio;
      this.telefono = data.telefono;
      this.hora_inicio = data.hora_inicio;
      this.hora_fin = data.hora_fin;
      this.latitud = data.latitud;
      this.longitud = data.longitud;
      this.idRegion = data.idRegion;

      this.venta_activa = data.venta_activa;
      this.pk = data.pk;
      this.sk = data.sk;
      this.monto_minimo_entrega_sucursal = data.monto_minimo_entrega_sucursal;
      this.monto_minimo_entrega_domicilio = data.monto_minimo_entrega_domicilio;

    }
    this.formularioSucursal = this.fb.group({
      clave: ['', Validators.required],
      nombre_sucursal: ['', Validators.required],
      rfc: ['', Validators.required],
      domicilio: ['', Validators.required],
      telefono: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      idRegion2: ['', Validators.required],
      venta_activa: ['', Validators.required],
      pk: ['', Validators.required],
      sk: ['', Validators.required],
      monto_minimo_entrega_sucursal: ['', Validators.required],
      monto_minimo_entrega_domicilio: ['', Validators.required],

    });
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRegiones();
      });
  }

  ngOnInit() {
    console.log('Entré a editar-sucursal en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  editaSucursal() {
    if (this.formularioSucursal.valid) {
      console.log(this.formularioSucursal.value);
      let sucursal: Sucursal = new Sucursal();
      sucursal.id = this.id;
      sucursal.clave = this.formularioSucursal.value.clave;

      sucursal.nombre_sucursal = this.formularioSucursal.value.nombre_sucursal;
      sucursal.rfc = this.formularioSucursal.value.rfc;
      sucursal.domicilio = this.formularioSucursal.value.domicilio;
      sucursal.telefono = this.formularioSucursal.value.telefono;
      sucursal.hora_inicio = this.formularioSucursal.value.hora_inicio;
      sucursal.hora_fin = this.formularioSucursal.value.hora_fin;
      sucursal.latitud = this.formularioSucursal.value.latitud;
      sucursal.id_region = this.formularioSucursal.value.id_region;
      sucursal.venta_activa = this.formularioSucursal.value.venta_activa;
      sucursal.pk = this.formularioSucursal.value.pk;
      sucursal.sk = this.formularioSucursal.value.sk;
      sucursal.monto_minimo_entrega_sucursal = this.formularioSucursal.value.monto_minimo_entrega_sucursal;
      sucursal.monto_minimo_entrega_domicilio = this.formularioSucursal.value.monto_minimo_entrega_domicilio;


      this.sucursalesSvc.editaSucursal(sucursal).subscribe({
        next: (res: any) => {
          console.log('Sucursal editada de forma exitosa');
          console.log(res);
          this.saltaASucursales();
        },
        error: (error: any) => {
          console.log('Error en la edición del producto');
          console.log(error);
        },
      });
    }
  }
  saltaASucursales() {
    this.router.navigateByUrl('/sucursales-ppal');
  }
  leerRegiones() {
    this.regionesSvc.dameListaRegiones().subscribe({
      next: (res: any) => {
        console.log('Servicio leido de forma exitosa');
        console.log(res);
        this.regiones = res;

        console.log(this.regiones);
        this.regiones;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }
}
