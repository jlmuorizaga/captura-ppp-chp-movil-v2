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
    return this.http.get(environment.baseApiCatalogos + environment.orillas + '/' + id);
  }

  dameListaOrillas() {
    return this.http.get(environment.baseApiCatalogos + environment.orillas);
  }
  borraOrilla(id: string) {
    return this.http.delete(environment.baseApiCatalogos + environment.orillas + '/' + id);

  }
  insertaOrilla(orilla:Orilla) {
    return this.http.post(environment.baseApiCatalogos + environment.orillas,orilla);
  }

  editaOrilla(orilla: Orilla) {
    return this.http.put(environment.baseApiCatalogos + environment.orillas + '/' + orilla.id,orilla);
  }
}
