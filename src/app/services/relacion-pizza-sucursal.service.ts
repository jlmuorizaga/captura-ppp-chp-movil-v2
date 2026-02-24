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
    return this.http.get(environment.baseApiCatalogos + environment.relacion_pizza_sucursal +'/'+idSucursal+ '/' + idPizza);
  }

  dameListaRelacionPizzaSucursal(idSucursal:string) {
    return this.http.get(environment.baseApiCatalogos + environment.relacion_pizza_sucursal +'/'+idSucursal);
  }
  dameListadoPizzasNoEstanEnRPS(idSucursal:string) {
    return this.http.get(environment.baseApiCatalogos + environment.dameListadoPizzasNoEstanEnRPS +'/'+idSucursal);
  }
  insertaRegistroRPS(rps:RelacionPizzaSucursal) {
    return this.http.post(environment.baseApiCatalogos + environment.relacion_pizza_sucursal,rps);
  }

  borraRegistroRPS(idPizza: string,idSucursal:string) {
    return this.http.delete(environment.baseApiCatalogos + environment.relacion_pizza_sucursal + '/' + idPizza+'/'+idSucursal);

  }

  editaRegistroRPS(rps: RelacionPizzaSucursal) {
  return this.http.put(
    environment.baseUrl +
      ':' +
      environment.puertoApiAdmonCatalogos +
      environment.relacion_pizza_sucursal +
      '/' +
      rps.idPizza,
    {
      idSucursal: rps.idSucursal,
      precioX1: rps.precioX1,
      precioX2: rps.precioX2,
    }
  );
}
}
