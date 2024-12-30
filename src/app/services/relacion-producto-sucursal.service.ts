import { RelacionProductoSucursal } from './../model/dto/relacion-producto-sucursal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RelacionProductoSucursalService {

  constructor(private http:HttpClient) { }
  dameListaRelacionProductoSucursal(idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_producto_sucursal +'/'+idSucursal);
  }
}
