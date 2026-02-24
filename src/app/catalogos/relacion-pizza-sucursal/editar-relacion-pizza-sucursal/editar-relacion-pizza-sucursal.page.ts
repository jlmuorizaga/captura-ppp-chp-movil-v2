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
  IonItem,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { GlobalService } from 'src/app/services/global.service';
import { RelacionPizzaSucursal } from 'src/app/model/dto/relacion-pizza-sucursal';
import { RelacionPizzaSucursalService } from 'src/app/services/relacion-pizza-sucursal.service';

@Component({
  selector: 'app-editar-relacion-pizza-sucursal',
  templateUrl: './editar-relacion-pizza-sucursal.page.html',
  styleUrls: ['./editar-relacion-pizza-sucursal.page.scss'],
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
export class EditarRelacionPizzaSucursalPage implements OnInit {
  formularioRPS: FormGroup;

  idPizza!: string;
  nombreEspecialidad!: string;
  tamanioPizza!: string;
  idSucursal!: string;
  claveSucursal!: string;
  tipoProductoNombre!:string;

  precioX1!: string;
  precioX2!: string;

  cveSucursal: string = '';

  constructor(
    private fb: FormBuilder,
    private rpsSvc: RelacionPizzaSucursalService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.formularioRPS = this.fb.group({
      precioX1: ['', Validators.required],
      precioX2: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    const data = navigation?.extras.state?.['data'] as Partial<RelacionPizzaSucursal> | undefined;

    if (data) {
      this.idPizza = data.idPizza ?? '';
      this.nombreEspecialidad = data.nombreEspecialidad ?? '';
      this.tamanioPizza = data.tamanioPizza ?? '';
      this.idSucursal = data.idSucursal ?? '';
      this.claveSucursal = data.claveSucursal ?? '';
      this.precioX1 = data.precioX1 ?? '';
      this.precioX2 = data.precioX2 ?? '';


      this.formularioRPS.patchValue({
        precioX1: this.precioX1,
        precioX2: this.precioX2,
      });
    } else {
      console.warn('No llegó data por navigation extras.state');
    }
  }

  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
  }

  editaRPS() {
    if (!this.formularioRPS.valid) return;

    const rps: RelacionPizzaSucursal = new RelacionPizzaSucursal();
    rps.idPizza = this.idPizza;
    rps.idSucursal = this.idSucursal;
    rps.nombreEspecialidad = this.nombreEspecialidad;
    rps.tamanioPizza = this.tamanioPizza;
    rps.claveSucursal = this.claveSucursal;

    rps.precioX1 = this.formularioRPS.value.precioX1;
    rps.precioX2 = this.formularioRPS.value.precioX2;

    // ✅ Este método debes agregarlo al service (te lo dejé arriba)
    this.rpsSvc.editaRegistroRPS(rps).subscribe({
      next: (res: any) => {
        console.log('RPS editada con éxito', res);
        this.saltaARPS();
      },
      error: (error: any) => {
        console.log('Error en la edición de RPS');
        console.log(error);
      },
    });
  }

  saltaARPS() {
    this.router.navigateByUrl('/relacion-pizza-sucursal-ppal');
  }
}
