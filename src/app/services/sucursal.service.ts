import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sucursal } from '../model/dto/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http: HttpClient) {}

  dameSucursal(id: string) {
    return this.http.get(environment.baseUrl + environment.sucursales + '/' + id);
  }

  dameListaSucursales() {
    return this.http.get(environment.baseUrl + environment.sucursales);
  }

  borraSucursal(id: string) {
    return this.http.delete(environment.baseUrl + environment.sucursales + '/' + id);
  }

  insertaSucursal(sucursal: Sucursal) {
    return this.http.post(environment.baseUrl + environment.sucursales, sucursal);
  }

  editaSucursal(sucursal: Sucursal) {
    return this.http.put(
      environment.baseUrl + environment.sucursales + '/' + sucursal.idSucursal,
      sucursal
    );
  }
}
