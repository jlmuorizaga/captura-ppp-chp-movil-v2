import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { inject } from '@angular/core';

@Component({
  selector: 'app-promocion-builder',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './promocion-builder.component.html',
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
  modalCtrl = inject(ModalController);

  agregarProducto() {
    if (!this.productoSeleccionado) return;

    const ultimaLetra = this.definicion.slice(-1);

    // Si la cadena está vacía o termina en + o =, solo agrega el producto
    if (this.definicion === '' || ultimaLetra === '+' || ultimaLetra === '=') {
      this.definicion += this.productoSeleccionado;
    } else {
      // Si no, antepone un +
      this.definicion += '+' + this.productoSeleccionado;
    }
  }


  agregarSeparador() {
    // Solo aplica para PE
    if (this.tipo !== 'PE') return;

    // No agregar si ya hay un signo "=" en la definición
    if (this.definicion.includes('=')) return;

    const ultimaLetra = this.definicion.slice(-1);

    // Solo agregar si la definición no termina en "+" o "="
    if (this.definicion && ultimaLetra !== '+' && ultimaLetra !== '=') {
      this.definicion += '=';
    }
  }



  limpiar() {
    this.definicion = '';
  }

  onTipoChange() {

    // Si el tipo cambió a 'CB', eliminamos el '=' de la definición
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
