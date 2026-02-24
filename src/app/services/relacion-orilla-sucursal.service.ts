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
    return this.http.get(environment.baseApiCatalogos + environment.relacion_orilla_sucursal + '/' + idOrilla+'/'+idSucursal);
  }

  dameListaRelacionOrillaSucursal(idSucursal:string) {
    return this.http.get(environment.baseApiCatalogos + environment.relacion_orilla_sucursal +'/'+idSucursal);
  }
  dameListadoOrillasNoEstanEnROS(idSucursal:string) {
    return this.http.get(environment.baseApiCatalogos + environment.dameListadoOrillasNoEstanEnROS +'/'+idSucursal);
  }

  dameListaProductos2() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseApiCatalogos + environment.productos2);
  }
  borraRegistroRelacionOrillaSucursal(idOrilla:string, idSucursal:string) {
    return this.http.delete(environment.baseApiCatalogos + environment.relacion_orilla_sucursal + '/' + idOrilla+'/'+idSucursal);
  }
  insertaRegistroRelacionOrillaSucursal(registroRelacionOrillaSucursal:RelacionOrillaSucursal) {
    return this.http.post(environment.baseApiCatalogos + environment.relacion_orilla_sucursal,registroRelacionOrillaSucursal);
  }

  editaRegistroRelacionOrillaSucursal(relacion:RelacionOrillaSucursal) {
    return this.http.put(environment.baseApiCatalogos + environment.relacion_orilla_sucursal + '/' + relacion.idOrilla,relacion);
  }

}
