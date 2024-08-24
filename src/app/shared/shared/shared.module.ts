import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegionService } from 'src/app/services/region.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { SalsaService } from 'src/app/services/salsa.service';
import { RelacionEtpsService } from 'src/app/services/relacion-etps.service';
import { PromocionEspecialService } from 'src/app/services/promocion-especial.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,HttpClientModule
  ],
  providers:[RegionService,EspecialidadService,SucursalService,ProductoService,
    TipoProductoService,SalsaService,RelacionEtpsService,PromocionEspecialService]
})
export class SharedModule { }
