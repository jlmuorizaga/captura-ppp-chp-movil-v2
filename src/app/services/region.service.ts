import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Region } from '../model/dto/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  //http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/:idRegion

  dameRegion(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.get(environment.baseApiCatalogos + environment.regiones + '/' + id);
  }

  dameListaRegiones() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseApiCatalogos + environment.regiones);
  }
  borraRegion(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.delete(environment.baseApiCatalogos + environment.regiones + '/' + id);
  }
  insertaRegion(region:Region) {
    return this.http.post(environment.baseApiCatalogos + environment.regiones,region);
  }

  editaRegion(region: Region) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.put(environment.baseApiCatalogos + environment.regiones + '/' + region.idRegion,region);
  }
}
