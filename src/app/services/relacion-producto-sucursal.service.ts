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
  dameListadoProductosNoEstanEnRPS(idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.dameListadoProductosNoEstanEnRPS +'/'+idSucursal);
  }
  insertaRelacionProductoSucursal(registroRPS:RelacionProductoSucursal) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_producto_sucursal,registroRPS);
  }
  borraRelacionProductoSucursal(idProducto:string,idSucursal:string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_producto_sucursal + '/' + idProducto+'/'+idSucursal);
  }
}
