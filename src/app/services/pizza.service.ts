import { Pizza } from '../model/dto/pizza';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) { }
  damePizza(idPizza: string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.pizzas + '/' + idPizza);
  }
  dameListaPizzas() {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.pizzas);
  }
  borraPizza(idPizza: string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.pizzas + '/' + idPizza);
  }
  insertaPizza(pizza:Pizza) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.pizzas,pizza);
  }
  editaPizza(pizza: Pizza) {
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.pizzas + '/' + pizza.idPizza,pizza);
  }

}
