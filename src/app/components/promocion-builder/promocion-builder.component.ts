import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from 'src/app/model/dto/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonTextarea,
} from '@ionic/angular/standalone';

import { ModalController } from '@ionic/angular'; // ✅ Import clásico, compatible con providers[]

@Component({
  selector: 'app-promocion-builder',
  standalone: true,
  templateUrl: './promocion-builder.component.html',
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonTextarea,
    PromocionBuilderComponent,
  ],
  providers: [ModalController, CategoriaService], // ✅ Válido y necesario para producción si usas inject()
})
export class PromocionBuilderComponent implements OnInit {
  tipo: string = '';
  tipoSeleccionado: string = '';
  productoSeleccionado: string = '';
  definicion: string = '';
  //navigationSubscription: Subscription;
  categorias!: Categoria[];

  productosDisponibles: string[] = [
    'PG1',
    'PGPP',
    'PGESP',
    'PGMEAT',
    'PGH',
    'PAPS',
    'PAG',
    'PAPF',
    'R15',
    'R600',
    'REFGRA',
    'W',
    'BON',
    'ALIBON',
    'PESP',
    'PFESP',
  ];

  modalCtrl = inject(ModalController); // ✅ Ahora funciona correctamente

  constructor(
    private categoriasSvc: CategoriaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  )
  {

  }
  /*{
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerCategorias();
      });
  }*/
ngOnInit(): void {
  this.leerCategorias();
}
  leerCategorias() {
    this.categoriasSvc.dameListaCategorias().subscribe({
      next: (res: any) => {
        console.log('Servicio leerCategorias() en promocion-builder.component.ts leido de forma exitosa');
        console.log(res);
        this.categorias = res;
        console.log(this.categorias);
        this.categorias;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }
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
      definicion: this.definicion,
    });
  }
}
