import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Módulo completo de Ionic con todos los componentes
import { IonicModule, ModalController } from '@ionic/angular';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Utilerias } from 'src/app/utilerias/utilerias';
import { PromocionEspecial } from 'src/app/model/dto/promocion-especial';
import { GlobalService } from 'src/app/services/global.service';
import { PromocionEspecialService } from './../../../services/promocion-especial.service';
import { PromocionBuilderComponent } from 'src/app/components/promocion-builder/promocion-builder.component';


@Component({
  selector: 'app-insertar-promocion-especial',
  standalone: true,
  templateUrl: './insertar-promocion-especial.page.html',
  styleUrls: ['./insertar-promocion-especial.page.scss'],
  
  imports: [
    IonicModule,           // ✅ importa todos los componentes de Ionic de forma limpia
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class InsertarPromocionEspecialPage implements OnInit{
  formularioPromocionEspecial:FormGroup;
  //Mu Se crearon estas variables el 23 dic 2024
  idPromocion!: string;
  nombre!: string;
  descripcion!: string;
  tipo!:string;
  definicion!:string;
  precio!:number;
  activa!:string;
  cveSucursal: string = '';
  //imgURL!:string;
  //Mu Se crearon estas variables el 23 dic 2024

  selectedFile: File | null = null;
  uploadResponse: string = '';
  imgURL:string='';
  fileName: string = '';
  resultado: string = '';

  constructor(private fb: FormBuilder,private promocionesEspecialesSvc:PromocionEspecialService,
    private router: Router,
    private globalService: GlobalService,
    private http: HttpClient,
    private modalCtrl: ModalController // <-- Esta línea es necesaria
  ) {
    this.formularioPromocionEspecial = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      definicion: ['', Validators.required],
      precio: ['', Validators.required],
      activa: ['', Validators.required],
      //imgURL: ['', Validators.required],
      imgURL: [''],
    })
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: PromocionBuilderComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.resultado = `Tipo: ${data.tipo}, Definición: ${data.definicion}`;
      //this.definicion = `${data.definicion}`;
    }
  }
  ngOnInit() {
    this.cveSucursal = this.globalService.cveSucursalGlobal;
    console.log('Entré a insertar-promocion-especial.page.ts en OnInit');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
      //this.img_url=file;
    }
  }
  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post<{ message: string }>('http://ec2-54-144-58-67.compute-1.amazonaws.com:3005/upload', formData).subscribe({
      next: res => this.uploadResponse = res.message,
      error: err => this.uploadResponse = 'Error al subir la imagen',
    });
  }


  insertaPromocionEspecial() {
    if (this.formularioPromocionEspecial.valid) {
      this.uploadImage(); //Carga la imagen al servidor
      console.log(this.formularioPromocionEspecial.value)

      //Mu Se crearon estas variables el 23 dic 2024
      let promocionEspecial:PromocionEspecial=new PromocionEspecial(this.idPromocion,
      this.nombre,
      this.descripcion,
      this.tipo,
      this.definicion,
      this.precio,
      this.activa,
      this.imgURL)
      //Mu Se crearon estas variables el 23 dic 2024

      promocionEspecial.idPromocion=Utilerias.generaId();
      promocionEspecial.nombre=this.formularioPromocionEspecial.value.nombre;
      promocionEspecial.descripcion=this.formularioPromocionEspecial.value.descripcion;
      promocionEspecial.tipo=this.formularioPromocionEspecial.value.tipo;
      promocionEspecial.definicion=this.formularioPromocionEspecial.value.definicion;
      promocionEspecial.precio=this.formularioPromocionEspecial.value.precio;
      promocionEspecial.activa=this.formularioPromocionEspecial.value.activa;
      promocionEspecial.imgURL='/img/promociones/'+this.fileName;
      //promocionEspecial.imgURL=this.formularioPromocionEspecial.value.imgURL;
      this.promocionesEspecialesSvc.insertaPromocionEspecial(promocionEspecial).subscribe({
        next:(res:any)=>{
          console.log('Promoción Especial insertada de forma exitosa')
          console.log(res);
          this.saltaAPromocionesEspeciales();

        },
        error:(error:any)=>{
          console.log('Error en la inserción de la Promoción Especial')
          console.log(error)

        }
      })

    }
  }
  saltaAPromocionesEspeciales() {
    this.router.navigateByUrl('/promocion-especial-ppal');
  }

}
