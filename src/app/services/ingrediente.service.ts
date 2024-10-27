import { Ingrediente } from './../model/dto/ingrediente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private http: HttpClient) { }

  dameIngrediente(id: string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.ingredientes + '/' + id);
  }

  dameListaIngredientes() {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.ingredientes);
  }
  borraIngrediente(id: string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.ingredientes + '/' + id);

  }
  insertaIngrediente(ingrediente:Ingrediente) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.ingredientes,ingrediente);
  }

  editaIngrediente(ingrediente: Ingrediente) {
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.ingredientes + '/' + ingrediente.id,ingrediente);
  }
}
