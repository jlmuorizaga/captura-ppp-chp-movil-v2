import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RelacionETPS } from '../model/dto/relacion-etps';

@Injectable({
  providedIn: 'root'
})
export class RelacionEtpsService {

  constructor(private http: HttpClient) { }

  dameListaRelacionEspecialidadTamanioPrecioSucursal(id:string){
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.relacion_etps+'/'+id);
  }
  
}

