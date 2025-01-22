import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RelacionSalsaSucursal } from '../model/dto/relacion-salsa-sucursal';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RelacionSalsaSucursalService {
  constructor(private http:HttpClient) { }

  dameListaRelacionSalsaSucursal(idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_salsa_sucursal +'/'+idSucursal);
  }
  dameListadoSalsasNoEstanEnRSS(idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.dameListadoSalsasNoEstanEnRSS +'/'+idSucursal);
  }
  insertaRegistroRSS(rss:RelacionSalsaSucursal) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_salsa_sucursal,rss);
  }

  borraRegistroRSS(idSalsa: string,idSucursal:string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_salsa_sucursal + '/' + idSalsa+'/'+idSucursal);

  }
}
