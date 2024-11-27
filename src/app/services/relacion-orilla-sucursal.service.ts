import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelacionOrillaSucursal } from './../model/dto/relacion-orilla-sucursal';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class RelacionOrillaSucursalService {

  constructor(private http:HttpClient) { }

  dameRegistroRelacionOrillaSucursal(idOrilla: string,idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_orilla_sucursal + '/' + idOrilla+'/'+idSucursal);
  }

  dameListaRelacionOrillaSucursal(idSucursal:string) {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_orilla_sucursal +'/'+idSucursal);
  }
  dameListaProductos2() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos2);
  }
  borraRegistroRelacionOrillaSucursal(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos + '/' + id);
  }
  /*insertaRegistroRelacionOrillaSucursal(producto:Producto) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos,producto);
  }

  editaRegistroRelacionOrillaSucursal(idOrilla: string, idSucursal:string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_orilla_sucursal + '/' + idOrilla+'/'+idSucursal);
  }
*/
}