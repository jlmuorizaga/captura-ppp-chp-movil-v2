import { Salsa } from './../model/dto/salsa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SalsaService {

  constructor(private http: HttpClient) { }

  dameSalsa(id: string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.salsas + '/' + id);
  }

  dameListaSalsas() {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.salsas);
  }
  borraSalsa(id: string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.salsas + '/' + id);

  }
  insertaSalsa(salsa:Salsa) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.salsas,salsa);
  }

  editaSalsa(salsa: Salsa) {
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.salsas + '/' + salsa.id,salsa);
  }
}
