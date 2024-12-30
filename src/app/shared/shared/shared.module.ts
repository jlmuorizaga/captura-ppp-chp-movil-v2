import { RelacionProductoSucursalService } from './../../services/relacion-producto-sucursal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegionService } from 'src/app/services/region.service';
import { OrillaService } from 'src/app/services/orilla.service';
import { PizzaService } from 'src/app/services/pizza.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { SalsaService } from 'src/app/services/salsa.service';
import { RelacionEtpsService } from 'src/app/services/relacion-etps.service';
import { PromocionEspecialService } from 'src/app/services/promocion-especial.service';
import { RelacionPromocionEspecialSucursalPpalPage } from 'src/app/catalogos/relacion-promocion-especial-sucursal/relacion-promocion-especial-sucursal-ppal/relacion-promocion-especial-sucursal-ppal.page';
import { RelacionPromocionEspecialSucursalService } from 'src/app/services/relacion-promocion-especial-sucursal.service';
import { TamanioPizzaService } from 'src/app/services/tamanio-pizza.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { RelacionOrillaSucursalService } from 'src/app/services/relacion-orilla-sucursal.service';
import { RelacionPizzaSucursalService } from 'src/app/services/relacion-pizza-sucursal.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,HttpClientModule
  ],
  providers:[RegionService,EspecialidadService,SucursalService,ProductoService,
    TipoProductoService,SalsaService,RelacionEtpsService,PromocionEspecialService,
    RelacionPromocionEspecialSucursalService,TamanioPizzaService,CategoriaService,
  IngredienteService,OrillaService,PizzaService,RelacionOrillaSucursalService,
  RelacionPizzaSucursalService,RelacionProductoSucursalService]
})
export class SharedModule { }
