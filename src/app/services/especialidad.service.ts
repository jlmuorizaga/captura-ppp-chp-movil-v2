import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,Observable } from 'rxjs';
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

   dameListaEspecialidadesNoCombinanTodosTamanios() {
    return this.http.get(environment.baseUrl+':'+environment.puertoApiAdmonCatalogos+environment.dameListadoEspecialidadesNoCombinanTodosLosTamanios)
   }

  dameListaEspecialidades():Observable<Especialidad[]> {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/especialidades');
    //
        const apiURL = environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos+environment.especialidades;
        return this.http
          .get<any[]>(apiURL)
          .pipe(
            map((data: any[]) =>
              data.map(
                (item) =>
                  new Especialidad(
                    item.id,
                    item.nombre,
                    item.ingredientes,
                    item.imgURL,
                    item.orden,
                    item.cantidadIngredientes,
                    item.esDeUnIngrediente,
                  )
              )
            )
          );
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
