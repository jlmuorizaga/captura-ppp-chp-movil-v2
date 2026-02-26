import { RelacionPES } from './../model/dto/relacion-promocion-especial-sucursal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class RelacionPromocionEspecialSucursalService {

  constructor(private http: HttpClient) { }


  dameRegistroRelacionPromocionEspecialSucursal(idPromocion:string,idSucursal:string) {
    return this.http.get(environment.baseApiCatalogos + environment.relacion_pes + '/' + idPromocion+'/'+idSucursal);
  }
  dameListaRelacionPromocionEspecialSucursal(id:string){
    console.log('id====>>',id)
    return this.http.get(environment.baseApiCatalogos + environment.relacion_pes+'/'+id);
  }
  insertaRelacionPromocionEspecialSucursal(registroRPES:RelacionPES) {
    return this.http.post(environment.baseApiCatalogos + environment.relacion_pes,registroRPES);
  }
  borraRelacionPromocionEspecialSucursal(idPromocion:string,idSucursal:string) {
    return this.http.delete(environment.baseApiCatalogos + environment.relacion_pes + '/' + idPromocion+'/'+idSucursal);
  }
  editaRelacionPromocionEspecialSucursal(registroRPES:RelacionPES) {
    return this.http.put(environment.baseApiCatalogos + environment.relacion_pes + '/' +
      registroRPES.idPromocion+'/'+registroRPES.idSucursal,registroRPES);
  }
}
