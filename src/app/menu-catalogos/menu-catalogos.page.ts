import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonGrid,
  IonCol,
  IonRow, IonIcon, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonTitle } from '@ionic/angular/standalone';
import { GlobalService } from '../services/global.service';
import { SucursalService } from '../services/sucursal.service';
import { Sucursal } from '../model/dto/sucursal';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu-catalogos',
  templateUrl: './menu-catalogos.page.html',
  styleUrls: ['./menu-catalogos.page.scss'],
  standalone: true,
  imports: [IonTitle, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonIcon,NgFor,
    IonRow,
    IonCol,
    IonGrid,
    IonButton,
    SharedModule,
    IonHeader,
    IonToolbar,
    IonContent,
  ],
})
export class MenuCatalogosPage {
  mensaje: string;
  idSucursal: string;
  sucursal!: Sucursal;
  cveSucursal!: string;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private sucursalesSvc: SucursalService,
    private cdr: ChangeDetectorRef
  ) {
    this.mensaje = 'Estoy en el constructor';

    this.idSucursal = this.globalService.idSucursalGlobal;
    this.dameSucursal(this.idSucursal);
    console.log('Sucursal==>', this.globalService.idSucursalGlobal);
  }
  catalogosPrincipales = [
    { nombre: 'Catálogo Categorías', accion: () => this.saltaACategorias() },
    { nombre: 'Catálogo Especialidades', accion: () => this.saltaAEspecialidades() },
    { nombre: 'Catálogo Ingredientes', accion: () => this.saltaAIngredientes() },
    { nombre: 'Catálogo Orillas', accion: () => this.saltaAOrillas() },
    { nombre: 'Catálogo Pizzas', accion: () => this.saltaAPizzas() },
    { nombre: 'Catálogo Productos', accion: () => this.saltaAProductos() },
    { nombre: 'Catálogo Tipos de Producto', accion: () => this.saltaATipoProductos() },
    { nombre: 'Catálogo Promoción Especial', accion: () => this.saltaAPromocionEspecial() },
    { nombre: 'Catálogo Regiones', accion: () => this.saltaARegiones() },
    { nombre: 'Catálogo Salsas', accion: () => this.saltaASalsas() },
    { nombre: 'Catálogo Sucursales', accion: () => this.saltaASucursales() },
    { nombre: 'Catálogo Tamaños Pizza', accion: () => this.saltaATamaniosPizza() }
  ];

  catalogosRelacionados = [
    { nombre: 'Relación Orilla Sucursal', accion: () => this.saltaARelacionOrillaSucursal() },
    { nombre: 'Relación Pizza Sucursal', accion: () => this.saltaARelacionPizzaSucursal() },
    { nombre: 'Relación Producto Sucursal', accion: () => this.saltaARelacionProductoSucursal() },
    { nombre: 'Relación Promoción Especial Sucursal', accion: () => this.saltaARelacionPES() },
    { nombre: 'Relación Salsa Sucursal', accion: () => this.saltaARelacionSS() }
  ];
  saltaACategorias() {
    this.router.navigateByUrl('/ppal-categoria');
  }
  saltaAEspecialidades() {
    this.router.navigateByUrl('/especialidades-ppal');
  }
  saltaAIngredientes() {
    this.router.navigateByUrl('/ingredientes-ppal');
  }
  saltaAOrillas() {
    this.router.navigateByUrl('/orillas-ppal');
  }
  saltaAPizzas() {
    this.router.navigateByUrl('/pizzas-ppal');
  }
  saltaARegiones() {
    this.router.navigateByUrl('/regiones-ppal');
  }
    saltaARelacionOrillaSucursal() {
    this.router.navigateByUrl('/relacion-orilla-sucursal-ppal');
  }
  saltaARelacionPizzaSucursal() {
    this.router.navigateByUrl('/relacion-pizza-sucursal-ppal');
  }
  saltaARelacionProductoSucursal(){
    this.router.navigateByUrl('/relacion-producto-sucursal-ppal');
  }
  saltaAProductos() {
    this.router.navigateByUrl('/productos-ppal');
  }
  saltaASucursales() {
    this.router.navigateByUrl('/sucursales-ppal');
  }
  saltaATipoProductos() {
    this.router.navigateByUrl('/tipo-producto-ppal');
  }
  saltaASalsas() {
    this.router.navigateByUrl('/salsas-ppal');
  }
  saltaARelacionETPS() {
    this.router.navigateByUrl('/relacion-etps-ppal');
  }

  saltaAPromocionEspecial() {
    this.router.navigateByUrl('/promocion-especial-ppal');
  }

  saltaARelacionPES() {
    console.log('***************************Entré a saltaARelacionETPS()');
    this.router.navigateByUrl('/relacion-promocion-especial-sucursal-ppal');
  }
  saltaARelacionSS() {
    console.log('***************************Entré a saltaARelacionETPS()');
    this.router.navigateByUrl('/relacion-salsa-sucursal-ppal');
  }

  saltaATamaniosPizza() {
    this.router.navigateByUrl('/tamanios-pizza-ppal');
  }

  saltaAHomePage() {
    this.router.navigateByUrl('/home');
  }

  abrirEnNuevaPestana(url: string) {
    window.open(url, '_blank', 'noopener');
  }

  dameSucursal(idSucursal: string) {
    this.sucursalesSvc.dameSucursal(idSucursal).subscribe({
      next: (res: any) => {
        console.log('Entré a dameSucursal');
        // console.log(res);
        this.sucursal = res;


        console.log(this.sucursal);
        this.cveSucursal = this.sucursal.claveSucursal;
        console.log('this.sucursal==>>',this.cveSucursal);
        this.globalService.cveSucursalGlobal = this.cveSucursal;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }
}
