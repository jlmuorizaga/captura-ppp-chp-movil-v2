import { TamanioPizza } from './../model/dto/tamanio-pizza';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class TamanioPizzaService {

  constructor(private http: HttpClient) { }
  dameTamanioPizza(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tamaniosPizza + '/' + id);
  }

  dameListaTamanioPizza() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tamaniosPizza);
  }
  borraTamanioPizza(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tamaniosPizza + '/' + id);
  }
  insertaTamanioPizza(tamanioPizza:TamanioPizza) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tamaniosPizza,tamanioPizza);
  }

  editaTamanioPizza(tamanioPizza: TamanioPizza) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.tamaniosPizza + '/' + tamanioPizza.id,tamanioPizza);
  }

}
