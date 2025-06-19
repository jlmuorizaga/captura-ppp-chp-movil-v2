import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelacionPizzaSucursal } from '../model/dto/relacion-pizza-sucursal';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RelacionPizzaSucursalService {

  constructor(private http:HttpClient) { }

  dameRegistroRelacionPizzaSucursal(idPizza: string,idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_pizza_sucursal + '/' + idPizza+'/'+idSucursal);
  }
  
  dameListaRelacionPizzaSucursal(idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_pizza_sucursal +'/'+idSucursal);
  }
  dameListadoPizzasNoEstanEnRPS(idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.dameListadoPizzasNoEstanEnRPS +'/'+idSucursal);
  }
  insertaRegistroRPS(rps:RelacionPizzaSucursal) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_pizza_sucursal,rps);
  }

  borraRegistroRPS(idPizza: string,idSucursal:string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_pizza_sucursal + '/' + idPizza+'/'+idSucursal);

  }
}
