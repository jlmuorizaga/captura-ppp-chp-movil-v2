import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-menu-catalogos',
  templateUrl: './menu-catalogos.page.html',
  styleUrls: ['./menu-catalogos.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class MenuCatalogosPage{
  mensaje:string;
  sucursal:string;
  constructor(private router:Router,private globalService: GlobalService) {
    this.mensaje='Estoy en el constructor';
    console.log('Sucursal==>',this.globalService.sucursalGlobal);
    this.sucursal=this.globalService.sucursalGlobal;

  }

  saltaARegiones() {
    this.router.navigateByUrl('/regiones-ppal');
  }
  saltaAEspecialidades() {
    this.router.navigateByUrl('/especialidades-ppal');
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

    saltaAHomePage() {
    this.router.navigateByUrl('/home');
  }



}
