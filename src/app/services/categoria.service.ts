import { Categoria } from './../model/dto/categoria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  dameCategoria(codigo: string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.categorias + '/' + codigo);
  }

  dameListaCategorias() {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.categorias);
  }
  borraCategoria(codigo: string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.categorias + '/' + codigo);

  }
  insertaCategoria(categoria:Categoria) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.categorias,categoria);
  }

  editaCategoria(categoria: Categoria) {
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.categorias + '/' + categoria.codigo,categoria);
  }
}
