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
    return this.http.get(environment.baseApiCatalogos + environment.pizzas + '/' + idPizza);
  }
  dameListaPizzas() {
    return this.http.get(environment.baseApiCatalogos + environment.pizzas);
  }
  borraPizza(idPizza: string) {
    return this.http.delete(environment.baseApiCatalogos + environment.pizzas + '/' + idPizza);
  }
  insertaPizza(pizza:Pizza) {
    return this.http.post(environment.baseApiCatalogos + environment.pizzas,pizza);
  }
  editaPizza(pizza: Pizza) {
    return this.http.put(environment.baseApiCatalogos + environment.pizzas + '/' + pizza.idPizza,pizza);
  }

}
