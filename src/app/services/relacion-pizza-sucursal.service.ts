import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { RelacionPizzaSucursal } from '../model/dto/relacion-pizza-sucursal';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RelacionPizzaSucursalService {

  constructor(private http: HttpClient) { }

  dameRegistroRelacionPizzaSucursal(idPizza: string, idSucursal: string) {
    return this.http.get(environment.baseApiCatalogos + environment.relacion_pizza_sucursal + '/' + idSucursal + '/' + idPizza);
  }

  dameListaRelacionPizzaSucursal(idSucursal: string) {
    return this.http.get(environment.baseApiCatalogos + environment.relacion_pizza_sucursal + '/' + idSucursal);
  }
  dameListadoPizzasNoEstanEnRPS(idSucursal: string) {
    return this.http.get(environment.baseApiCatalogos + environment.dameListadoPizzasNoEstanEnRPS + '/' + idSucursal);
  }
  insertaRegistroRPS(rps: RelacionPizzaSucursal) {
    return this.http.post(environment.baseApiCatalogos + environment.relacion_pizza_sucursal, rps);
  }

  borraRegistroRPS(idPizza: string, idSucursal: string) {
    return this.http.delete(environment.baseApiCatalogos + environment.relacion_pizza_sucursal + '/' + idPizza + '/' + idSucursal);

  }

  editaRegistroRPS(rps: RelacionPizzaSucursal) {
    return this.borraRegistroRPS(rps.idPizza, rps.idSucursal).pipe(
      switchMap(() => this.insertaRegistroRPS(rps))
    );
  }
}
