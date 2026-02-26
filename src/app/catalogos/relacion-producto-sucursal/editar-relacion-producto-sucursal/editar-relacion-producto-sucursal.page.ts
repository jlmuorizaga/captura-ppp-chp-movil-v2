import { Producto } from 'src/app/model/dto/producto';
import { RelacionProductoSucursal } from 'src/app/model/dto/relacion-producto-sucursal';
import { ProductoService } from 'src/app/services/producto.service';
import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { RelacionProductoSucursalService } from 'src/app/services/relacion-producto-sucursal.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-editar-relacion-producto-sucursal',
  templateUrl: './editar-relacion-producto-sucursal.page.html',
  styleUrls: ['./editar-relacion-producto-sucursal.page.scss'],
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
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class EditarRelacionProductoSucursalPage implements OnInit {
  formularioRPS: FormGroup;

  // Para mantener el estilo "similar" al archivo original (aunque no se use aquí)
  productos!: Producto[];

  datos!: RelacionProductoSucursal;

  idProducto!: string;
  descripcion!: string;
  tamanio!: string;
  tipoProductoNombre!: string;

  idSucursal!: string;
  claveSucursal!: string;

  precio!: string;

  cveSucursal: string = '';

  constructor(
    private fb: FormBuilder,
    private rpsSvc: RelacionProductoSucursalService,
    private globalService: GlobalService,
    private router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aquí están mis datos (Producto-Sucursal)==>>');
      console.log(data);

      // OJO: aquí usamos exactamente los nombres de tu DTO
      this.idProducto = data.idProducto;
      this.descripcion = data.descripcion;
      this.tamanio = data.tamanio;
      this.tipoProductoNombre = data.tipoProductoNombre;

      this.idSucursal = data.idSucursal;
      this.claveSucursal = data.claveSucursal;

      this.precio = data.precio;

      console.log('idProducto===>>' + this.idProducto);
      console.log('descripcion===>' + this.descripcion);
    }

    this.formularioRPS = this.fb.group({
      precio: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a editar-relacion-producto-sucursal en OnInit');

    // Precarga del precio en Reactive Forms
    if (this.precio !== undefined && this.precio !== null) {
      this.formularioRPS.patchValue({ precio: this.precio });
    }
  }

  editaRPS() {
    if (this.formularioRPS.valid) {
      console.log(this.formularioRPS.value);

      const rps: RelacionProductoSucursal = new RelacionProductoSucursal();

      rps.idProducto = this.idProducto;
      rps.descripcion = this.descripcion;
      rps.tamanio = this.tamanio;
      rps.tipoProductoNombre = this.tipoProductoNombre;

      rps.idSucursal = this.idSucursal;
      rps.claveSucursal = this.claveSucursal;

      rps.precio = this.formularioRPS.value.precio;

      this.rpsSvc.editaRegistroRelacionProductoSucursal(rps).subscribe({
        next: (res: any) => {
          console.log('RPS editada de forma exitosa');
          console.log(res);
          this.saltaARPS();
        },
        error: (error: any) => {
          console.log('Error en la edición del producto');
          console.log(error);
        },
      });
    }
  }

  saltaARPS() {
    this.router.navigateByUrl('/relacion-producto-sucursal-ppal');
  }
}
