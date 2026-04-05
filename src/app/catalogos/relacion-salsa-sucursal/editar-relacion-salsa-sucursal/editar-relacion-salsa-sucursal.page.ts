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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { RelacionSalsaSucursalService } from 'src/app/services/relacion-salsa-sucursal.service';
import { RelacionSalsaSucursal } from 'src/app/model/dto/relacion-salsa-sucursal';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-editar-relacion-salsa-sucursal',
  templateUrl: './editar-relacion-salsa-sucursal.page.html',
  styleUrls: ['./editar-relacion-salsa-sucursal.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
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
export class EditarRelacionSalsaSucursalPage implements OnInit {
  formularioRSS: FormGroup;
  idSalsa!: string;
  descripcionSalsa!: string;
  idSucursal!: string;
  claveSucursal!: string;

  constructor(
    private fb: FormBuilder,
    private rssSvc: RelacionSalsaSucursalService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Datos RSS recibidos:', data);

      this.idSalsa = data.idSalsa;
      this.descripcionSalsa = data.descripcionSalsa;
      this.idSucursal = data.idSucursal;
      this.claveSucursal = data.claveSucursal;
    }

    this.formularioRSS = this.fb.group({
      // Actualmente no hay campos editables en el DTO, pero mantenemos la estructura
      // para futuras extensiones (como precio o activa)
    });
  }

  ngOnInit() {
    console.log('Entré a editar-relacion-salsa-sucursal en OnInit');
  }

  editaRSS() {
    if (this.formularioRSS.valid) {
      const rss: RelacionSalsaSucursal = new RelacionSalsaSucursal();
      rss.idSalsa = this.idSalsa;
      rss.descripcionSalsa = this.descripcionSalsa;
      rss.idSucursal = this.idSucursal;
      rss.claveSucursal = this.claveSucursal;

      this.rssSvc.editaRegistroRSS(rss).subscribe({
        next: (res: any) => {
          console.log('Relación Salsa Sucursal editada/confirmada de forma exitosa');
          this.saltaARSS();
        },
        error: (error: any) => {
          console.log('Error en la edición de la relación salsa');
          console.log(error);
        },
      });
    }
  }

  saltaARSS() {
    this.router.navigateByUrl('/relacion-salsa-sucursal-ppal');
  }
}
