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
import { GlobalService } from 'src/app/services/global.service';


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
idSucursal!: string;
claveSucursal!: string;
nombreSucursal!: string;
rfc!: string;
domicilio!: string;
telefono!: string;
horaInicio!: string;
horaFin!: string;
latitud!: string;
longitud!: string;
idRegion!: string;
nombreRegion!: string;
ventaActiva!: string;
pk!: string;
sk!: string;
montoMinimoEntregaSucursal!: number;
montoMinimoEntregaDomicilio!: number;
navigationSubscription: Subscription;
regiones!:Region[];
idRegionSeleccionada!:string;
cveSucursal: string = '';


  constructor(
    private fb: FormBuilder,
    private sucursalesSvc: SucursalService,
    private router: Router,
    private regionesSvc: RegionService,
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos PP==>>');
      console.log(data); // Aquí tienes tus datos

      this.idSucursal = data.idSucursal;
      this.claveSucursal = data.claveSucursal;
      this.nombreSucursal = data.nombreSucursal;
      this.rfc = data.rfc;
      this.domicilio = data.domicilio;
      this.telefono = data.telefono;
      this.horaInicio = data.horaInicio;
      this.horaFin = data.horaFin;
      this.latitud = data.latitud;
      this.longitud = data.longitud;
      this.idRegionSeleccionada = data.idRegion;
      this.ventaActiva = data.ventaActiva;
      this.pk = data.pk;
      this.sk = data.sk;
      this.montoMinimoEntregaSucursal = data.montoMinimoEntregaSucursal;
      this.montoMinimoEntregaDomicilio = data.montoMinimoEntregaDomicilio;

    }
    this.formularioSucursal = this.fb.group({
      claveSucursal: ['', Validators.required],
      nombreSucursal: ['', Validators.required],
      rfc: ['', Validators.required],
      domicilio: ['', Validators.required],
      telefono: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      idRegion2: ['', Validators.required],
      ventaActiva: ['', Validators.required],
      pk: ['', Validators.required],
      sk: ['', Validators.required],
      montoMinimoEntregaSucursal: ['', Validators.required],
      montoMinimoEntregaDomicilio: ['', Validators.required],

    });
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerRegiones();
      });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-sucursal en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  editaSucursal() {
    if (this.formularioSucursal.valid) {
      console.log('estoy en editaSucursal()');
      console.log(this.formularioSucursal.value);
      let sucursal: Sucursal = new Sucursal();
      sucursal.idSucursal = this.idSucursal;
      sucursal.claveSucursal = this.formularioSucursal.value.claveSucursal;
      sucursal.nombreSucursal = this.formularioSucursal.value.nombreSucursal;
      sucursal.rfc = this.formularioSucursal.value.rfc;
      sucursal.domicilio = this.formularioSucursal.value.domicilio;
      sucursal.telefono = this.formularioSucursal.value.telefono;
      sucursal.horaInicio = this.formularioSucursal.value.horaInicio;
      sucursal.horaFin = this.formularioSucursal.value.horaFin;
      sucursal.latitud = this.formularioSucursal.value.latitud;
      sucursal.longitud = this.formularioSucursal.value.longitud;
      sucursal.idRegion = this.formularioSucursal.value.idRegion2;
      sucursal.nombreRegion = this.formularioSucursal.value.nombreRegion;
      sucursal.ventaActiva = this.formularioSucursal.value.ventaActiva;
      sucursal.pk = this.formularioSucursal.value.pk;
      sucursal.sk = this.formularioSucursal.value.sk;
      sucursal.montoMinimoEntregaSucursal = this.formularioSucursal.value.montoMinimoEntregaSucursal;
      sucursal.montoMinimoEntregaDomicilio = this.formularioSucursal.value.montoMinimoEntregaDomicilio;


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
        console.log('Servicio regiones leido de forma exitosa');
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
