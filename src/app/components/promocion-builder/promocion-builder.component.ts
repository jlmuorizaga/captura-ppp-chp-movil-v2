import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonButton, IonList, IonItem, IonSelect, IonSelectOption, IonLabel, IonTextarea
} from '@ionic/angular/standalone';

import { ModalController } from '@ionic/angular'; // ✅ Import clásico, compatible con providers[]

@Component({
  selector: 'app-promocion-builder',
  standalone: true,
  templateUrl: './promocion-builder.component.html',
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonTextarea
  ],
  providers: [ModalController] // ✅ Válido y necesario para producción si usas inject()
})
export class PromocionBuilderComponent {
  tipo: string = '';
  tipoSeleccionado: string = '';
  productoSeleccionado: string = '';
  definicion: string = '';

  productosDisponibles: string[] = [
    'PG1', 'PGPP', 'PGESP', 'PGMEAT', 'PGH',
    'PAPS', 'PAG', 'PAPF',
    'R15', 'R600', 'REFGRA',
    'W', 'BON', 'ALIBON', 'PESP', 'PFESP'
  ];

  modalCtrl = inject(ModalController); // ✅ Ahora funciona correctamente

  agregarProducto() {
    if (!this.productoSeleccionado) return;

    const ultimaLetra = this.definicion.slice(-1);

    if (this.definicion === '' || ultimaLetra === '+' || ultimaLetra === '=') {
      this.definicion += this.productoSeleccionado;
    } else {
      this.definicion += '+' + this.productoSeleccionado;
    }
  }

  agregarSeparador() {
    if (this.tipo !== 'PE') return;
    if (this.definicion.includes('=')) return;

    const ultimaLetra = this.definicion.slice(-1);
    if (this.definicion && ultimaLetra !== '+' && ultimaLetra !== '=') {
      this.definicion += '=';
    }
  }

  limpiar() {
    this.definicion = '';
  }

  onTipoChange() {
    if (this.tipo === 'CB') {
      this.definicion = this.definicion.replace(/=/g, '');
    }
  }

  guardarYSalir() {
    this.modalCtrl.dismiss({
      tipo: this.tipo,
      definicion: this.definicion
    });
  }
}
