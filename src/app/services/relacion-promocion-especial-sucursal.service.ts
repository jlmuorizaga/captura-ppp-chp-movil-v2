import { RelacionPES } from './../model/dto/relacion-promocion-especial-sucursal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class RelacionPromocionEspecialSucursalService {

  constructor(private http: HttpClient) { }

  dameListaRelacionPromocionEspecialSucursal(id:string){
    console.log('id====>>',id)
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_promocion_especial_sucursal+'/'+id);
  }
}
