import { PromocionEspecial } from './../model/dto/promocion-especial';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class PromocionEspecialService {

  constructor(private http: HttpClient) { }
  damePromocionEspecial(idPromocion: string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.promociones_especiales + '/' + idPromocion);
  }

  dameListaPromocionesEspeciales() {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.promociones_especiales);
  }
  borraPromocionEspecial(idPromocion: string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.promociones_especiales + '/' + idPromocion);
  }
  insertaPromocionEspecial(promocionEspecial:PromocionEspecial) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.promociones_especiales,promocionEspecial);
  }
  editaRegion(promocionEspecial: PromocionEspecial) {
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.promociones_especiales + '/' + promocionEspecial.idPromocion,promocionEspecial);
  }
}
