import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelacionPizzaSucursal } from '../model/dto/relacion-pizza-sucursal'; 
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RelacionPizzaSucursalService {

  constructor(private http:HttpClient) { }

  dameListaRelacionPizzaSucursal(idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_pizza_sucursal +'/'+idSucursal);
  }
}
