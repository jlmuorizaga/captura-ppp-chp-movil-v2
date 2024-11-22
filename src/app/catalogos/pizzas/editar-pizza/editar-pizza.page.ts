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
    this.formularioPizza = this.fb.group({
      idEspecialidadFormulario: ['', Validators.required],
      idTamanioFormulario: ['', Validators.required],
      aplica2x1: ['', Validators.required],
      categoria1: ['', Validators.required],
      categoria2: ['', Validators.required],
      categoria3: ['', Validators.required],
    });
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerEspecialidades();
      });

      this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerTamanioPizzas();
      });

   }

  ngOnInit() {
    console.log('Entré a editar-pizza en OnInit');
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  editaPizza() {
    if (this.formularioPizza.valid) {
      console.log(this.formularioPizza.value);
      let pizza: Pizza = new Pizza();
      pizza.idPizza = this.idPizza;
      pizza.idEspecialidad = this.formularioPizza.value.idEspecialidadFormulario;
      pizza.idTamanioPizza = this.formularioPizza.value.idTamanioFormulario;
      pizza.aplica2x1 = this.formularioPizza.value.aplica2x1;
      pizza.categoria1 = this.formularioPizza.value.categoria1;
      pizza.categoria2 = this.formularioPizza.value.categoria2;
      pizza.categoria3 = this.formularioPizza.value.categoria3;

      this.pizzasSvc.editaPizza(pizza).subscribe({
        next: (res: any) => {
          console.log('Pizza editada de forma exitosa');
          console.log(res);
          this.saltaAPizzas();
        },
        error: (error: any) => {
          console.log('Error en la edición de la pizza');
          console.log(error);
        },
      });
    }
  }

  saltaAPizzas() {
    this.router.navigateByUrl('/pizzas-ppal');
  }

  leerEspecialidades() {
    this.especialidadesSvc.dameListaEspecialidades().subscribe({
      next: (res: any) => {
        console.log('Servicio leido de forma exitosa');
        console.log(res);
        this.especialidad = res;

        console.log(this.especialidad);
        this.especialidad;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }

  leerTamanioPizzas() {
    this.tamaniosPizzaSvc.dameListaTamanioPizza().subscribe({
      next: (res: any) => {
        console.log('Servicio leido de forma exitosa');
        console.log(res);
        this.tamanioPizza = res;

        console.log(this.tamanioPizza);
        this.tamanioPizza;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error en la lectura del servicio');
        console.log(error);
      },
    });
  }

}
