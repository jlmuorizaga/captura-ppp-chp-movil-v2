import { Subscription } from 'rxjs';
import { Orilla } from 'src/app/model/dto/orilla';
import { OrillaService } from 'src/app/services/orilla.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

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
  IonSelectOption,
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { TamanioPizza } from 'src/app/model/dto/tamanio-pizza';
import { TamanioPizzaService } from 'src/app/services/tamanio-pizza.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-editar-orilla',
  templateUrl: './editar-orilla.page.html',
  styleUrls: ['./editar-orilla.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
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
    IonSelectOption,
  ],
})
export class EditarOrillaPage implements OnInit,OnDestroy {
  formularioOrilla: FormGroup;
  orillas!: Orilla[];
  datos!: Orilla;
  id!: string;
  descripcion!: string;
  idTamanio!: string;
  nombre!: string;
  orden!: string;
  navigationSubscription: Subscription;
  tamaniosPizza!: TamanioPizza[];
  idTamanioSeleccionado!:string;

  constructor(
    private fb: FormBuilder,
    private orillasSvc: OrillaService,
    private router: Router,
    private tamaniosPizzaSvc:TamanioPizzaService,
    private cdr: ChangeDetectorRef
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.id = data.id;
      this.descripcion = data.descripcion;
      this.idTamanio = data.idTamanio;
      this.nombre = data.nombre;
      this.orden = data.orden;
      this.idTamanioSeleccionado=data.idTamanio
    }
    this.formularioOrilla = this.fb.group({
      descripcion: ['', Validators.required],
      idTamanio: ['', Validators.required],
      nombre: ['', Validators.required],
      orden: ['', Validators.required],
    });
    this.navigationSubscription = this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.leerTamaniosPizza();
    });
  }

  ngOnInit() {
    console.log('Entré a editar-producto en OnInit');
  }


  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  editaOrilla() {
    if (this.formularioOrilla.valid) {
      console.log(this.formularioOrilla.value);
      let orilla: Orilla = new Orilla();
      orilla.id = this.id;
      orilla.descripcion = this.formularioOrilla.value.descripcion;
      orilla.idTamanio = this.formularioOrilla.value.idTamanioSeleccionado;
      orilla.nombre = this.formularioOrilla.value.nombre;
      orilla.orden = this.formularioOrilla.value.orden;

      this.orillasSvc.editaOrilla(orilla).subscribe({
        next: (res: any) => {
          console.log('Orilla editada de forma exitosa');
          console.log(res);
          this.saltaAOrillas();
        },
        error: (error: any) => {
          console.log('Error en la edición de la orilla');
          console.log(error);
        },
      });
    }
  }

  saltaAOrillas() {
    this.router.navigateByUrl('/orillas-ppal');
  }

  leerTamaniosPizza() {
    this.tamaniosPizzaSvc.dameListaTamanioPizza().subscribe({
      next: (res: any) => {
        console.log('Servicio leido de forma exitosa');
        console.log(res);
        this.tamaniosPizza = res;

        console.log(this.tamaniosPizza);
        this.tamaniosPizza;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }

}
