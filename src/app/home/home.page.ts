import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  mensaje:string;
  constructor(private router:Router) {
    this.mensaje='Estoy en el constructor';
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

}

