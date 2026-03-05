import { TipoProducto } from './../model/dto/tipo-producto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  constructor(private http: HttpClient) {}

  dameTipoProducto(id: string) {
    return this.http.get(environment.baseUrl + environment.tiposProducto + '/' + id);
  }

  dameListaTipoProductos() {
    return this.http.get(environment.baseUrl + environment.tiposProducto);
  }

  borraTipoProducto(id: string) {
    return this.http.delete(environment.baseUrl + environment.tiposProducto + '/' + id);
  }

  insertaTipoProducto(tipoProducto: TipoProducto) {
    return this.http.post(environment.baseUrl + environment.tiposProducto, tipoProducto);
  }

  editaTipoProducto(tipoProducto: TipoProducto) {
    return this.http.put(
      environment.baseUrl + environment.tiposProducto + '/' + tipoProducto.id,
      tipoProducto
    );
  }
}
