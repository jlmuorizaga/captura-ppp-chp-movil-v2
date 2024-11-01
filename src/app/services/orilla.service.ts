import { Orilla } from '../model/dto/orilla';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrillaService {


  constructor(private http: HttpClient) { }

  dameOrilla(id: string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.orillas + '/' + id);
  }

  dameListaOrillas() {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.orillas);
  }
  borraOrilla(id: string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.orillas + '/' + id);

  }
  insertaOrilla(orilla:Orilla) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.orillas,orilla);
  }

  editaOrilla(orilla: Orilla) {
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.orillas + '/' + orilla.id,orilla);
  }
}
