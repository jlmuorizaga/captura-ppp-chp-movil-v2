import { TamanioPizza } from './../model/dto/tamanio-pizza';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TamanioPizzaService {

  constructor(private http: HttpClient) {}

  dameTamanioPizza(id: string) {
    return this.http.get(environment.baseUrl + environment.tamaniosPizza + '/' + id);
  }

  dameListaTamanioPizza() {
    return this.http.get(environment.baseUrl + environment.tamaniosPizza);
  }

  borraTamanioPizza(id: string) {
    return this.http.delete(environment.baseUrl + environment.tamaniosPizza + '/' + id);
  }

  insertaTamanioPizza(tamanioPizza: TamanioPizza) {
    return this.http.post(environment.baseUrl + environment.tamaniosPizza, tamanioPizza);
  }

  editaTamanioPizza(tamanioPizza: TamanioPizza) {
    return this.http.put(
      environment.baseUrl + environment.tamaniosPizza + '/' + tamanioPizza.id,
      tamanioPizza
    );
  }
}
