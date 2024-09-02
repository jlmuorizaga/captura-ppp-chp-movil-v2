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
  editaPromocionEspecial(promocionEspecial: PromocionEspecial) {
    console.log(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.promociones_especiales + '/' + promocionEspecial.idPromocion,promocionEspecial);
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.promociones_especiales + '/' + promocionEspecial.idPromocion,promocionEspecial);
  }

  //dameListaPromocionesEspecialesQueNoEstanEnRelacionPromocionEspecialSucursal
  //http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/promociones_especiales_no/00CHP20201201183424889721458
  dameListaPromocionesEspecialesQueNoEstanEnRPES(idSucursal:string) {
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.promociones_especiales_no+'/'+idSucursal);
  }
}
