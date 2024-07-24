import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Especialidad } from '../model/dto/especialidad';

@Injectable({
  providedIn: 'root'
})

export class EspecialidadService {

  constructor(private http: HttpClient) { }

  dameEspecialidad(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/especialidades/'+id);
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.especialidades + '/' + id);
  }

  dameListaEspecialidades() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/especialidades');
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.especialidades);
  }
  borraEspecialidad(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/especialidades/'+id);
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.especialidades + '/' + id);

  }
  insertaEspecialidad(especialidad:Especialidad) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.especialidades,especialidad);
  }  

  editaEspecialidad(especialidad: Especialidad) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/especialidades/'+id);
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.especialidades + '/' + especialidad.id,especialidad);
  }

}
