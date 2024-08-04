import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Sucursal } from '../model/dto/sucursal';


@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http:HttpClient) { }
  dameSucursal(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.sucursales + '/' + id);
  }

  dameListaSucursales() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.sucursales);
  }

}
