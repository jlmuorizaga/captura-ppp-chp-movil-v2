import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { Pizza } from 'src/app/model/dto/pizza';
import { Especialidad } from 'src/app/model/dto/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { NavigationEnd, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ActivatedRoute, Route } from '@angular/router';
import { TamanioPizza } from 'src/app/model/dto/tamanio-pizza';
import { TamanioPizzaService } from 'src/app/services/tamanio-pizza.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-editar-pizza',
  templateUrl: './editar-pizza.page.html',
  styleUrls: ['./editar-pizza.page.scss'],
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
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class EditarPizzaPage implements OnInit,OnDestroy{
  formularioPizza: FormGroup;
  datos!:Pizza;
  idPizza!:string;
  idEspecialidad!:string;
  idTamanioPizza!:string;
  aplica2x1!:string;
  categoria1!:string;
  categoria2!:string;
  categoria3!:string;
  idEspecialidadSeleccionada!:string;
  idTamanioPizzaSeleccionado!:string;
  navigationSubscription: Subscription;
  especialidad!:Especialidad[];
  tamanioPizza!:TamanioPizza[];


  constructor(
    private fb: FormBuilder,
    private pizzasSvc: PizzaService,
    private especialidadesSvc: EspecialidadService,
    private tamaniosPizzaSvc: TamanioPizzaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data = navigation.extras.state['data'];
      console.log('Aqui están mis datos==>>');
      console.log(data); // Aquí tienes tus datos

      this.idPizza = data.idPizza;
      this.idEspecialidad = data.idEspecialidad;
      this.idTamanioPizza = data.idTamanioPizza;
      this.aplica2x1 = data.aplica2x1;
      this.categoria1 = data.categoria1;
      this.categoria2 = data.categoria2;
      this.categoria3 = data.categoria3;
      this.idEspecialidadSeleccionada = data.idEspecialidad;
      this.idTamanioPizzaSeleccionado = data.idTamanioPizza;
    }



   }

  ngOnInit() {
  }

}
