import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelacionProductoSucursal } from './../model/dto/relacion-producto-sucursal';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RelacionProductoSucursalService {

  constructor(private http: HttpClient) { }

  dameRegistroRelacionProductoSucursal(idProducto: string, idSucursal: string) {
    return this.http.get(
      environment.baseApiCatalogos +
      environment.relacion_producto_sucursal +
      '/' + idProducto + '/' + idSucursal
    );
  }

  dameListaRelacionProductoSucursal(idSucursal: string) {
    return this.http.get(
      environment.baseApiCatalogos +
      environment.relacion_producto_sucursal +
      '/' + idSucursal
    );
  }

  dameListadoProductosNoEstanEnRPS(idSucursal: string) {
    return this.http.get(
      environment.baseApiCatalogos +
      environment.dameListadoProductosNoEstanEnRPS +
      '/' + idSucursal
    );
  }

  dameListaProductos() {
    return this.http.get(
      environment.baseApiCatalogos +
      environment.productos
    );
  }

  borraRegistroRelacionProductoSucursal(idProducto: string, idSucursal: string) {
    return this.http.delete(
      environment.baseApiCatalogos +
      environment.relacion_producto_sucursal +
      '/' + idProducto + '/' + idSucursal
    );
  }

  insertaRegistroRelacionProductoSucursal(
    registroRelacionProductoSucursal: RelacionProductoSucursal
  ) {
    return this.http.post(
      environment.baseApiCatalogos +
      environment.relacion_producto_sucursal,
      registroRelacionProductoSucursal
    );
  }

editaRegistroRelacionProductoSucursal(relacion: RelacionProductoSucursal) {
  return this.http.put(
    environment.baseUrl + ':' +
    environment.puertoApiAdmonCatalogos +
    environment.relacion_producto_sucursal +
    '/' + relacion.idProducto + '/' + relacion.idSucursal,
    relacion
  );
}
}
