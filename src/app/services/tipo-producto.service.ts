import { TipoProducto } from './../model/dto/tipo-producto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  constructor(private http: HttpClient) { }
  dameTipoProducto(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tiposProducto + '/' + id);
  }

  dameListaTipoProductos() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tiposProducto);
  }
  borraTipoProducto(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tiposProducto + '/' + id);

  }
  insertaTipoProducto(tipoProducto:TipoProducto) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tiposProducto,tipoProducto);
  }

  editaTipoProducto(tipoProducto: TipoProducto) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tiposProducto + '/' + tipoProducto.id,tipoProducto);
  }
}
