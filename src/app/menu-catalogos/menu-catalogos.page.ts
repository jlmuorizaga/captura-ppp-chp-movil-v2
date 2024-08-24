import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { GlobalService } from '../services/global.service';
import { SucursalService } from '../services/sucursal.service';
import { Sucursal } from '../model/dto/sucursal';

@Component({
  selector: 'app-menu-catalogos',
  templateUrl: './menu-catalogos.page.html',
  styleUrls: ['./menu-catalogos.page.scss'],
  standalone: true,
  imports: [IonButton, SharedModule,IonHeader, IonToolbar, IonTitle, IonContent],
})
export class MenuCatalogosPage{
  mensaje:string;
  idSucursal:string;
  sucursal!:Sucursal;
  constructor(private router:Router,private globalService: GlobalService,
    private sucursalesSvc:SucursalService,
    private cdr: ChangeDetectorRef
  ) {
    this.mensaje='Estoy en el constructor';
    console.log('Sucursal==>',this.globalService.idSucursalGlobal);
    this.idSucursal=this.globalService.idSucursalGlobal;
    this.dameSucursal(this.idSucursal);

  }

  saltaARegiones() {
    this.router.navigateByUrl('/regiones-ppal');
  }
  saltaAEspecialidades() {
    this.router.navigateByUrl('/especialidades-ppal');
  }
  saltaAProductos() {
    this.router.navigateByUrl('/productos-ppal');
  }
  saltaASucursales() {
    this.router.navigateByUrl('/sucursales-ppal');
  }
  saltaATipoProductos() {
    this.router.navigateByUrl('/tipo-producto-ppal');
  }
  saltaASalsas() {
    this.router.navigateByUrl('/salsas-ppal');
  }
  saltaARelacionETPS() {
    console.log('Entré a saltaARelacionETPS()')
    this.router.navigateByUrl('/relacion-etps-ppal');
  }

  saltaAPromocionEspecial() {
    this.router.navigateByUrl('/promocion-especial-ppal');
  }

    saltaAHomePage() {
    this.router.navigateByUrl('/home');
  }

  dameSucursal(idSucursal:string){
    this.sucursalesSvc.dameSucursal(idSucursal).subscribe({
      next:(res:any)=>{
        console.log('Entré a dameSucursal')
       // console.log(res);
        this.sucursal=res;


        console.log(this.sucursal);
        this.cdr.detectChanges();

      },
      error:(error:any)=>{
        console.log('Error en la lectura del servicio')
        console.log(error)

      }
    })
  }

}
