import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Producto } from '../model/dto/producto';
import { map,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  dameProducto(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos + '/' + id);
  }

  dameListaProductos() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos);
  }
 /* dameListaProductos2() {
    //return this.http.get('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones');
    return this.http.get(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos2);
  }*/

  dameListaProductos2():Observable<Producto[]> {
    const apiURL=environment.baseUrl+':' + environment.puertoApiAdmonCatalogos + environment.productos2;
    return this.http
    .get <any[]>(apiURL)
    .pipe(
      map((data: any[]) =>
      data.map(
        (item)=>
          new Producto(
            item.id,
            item.descripcionP,
            item.tamanio,
            item.usaSalsa,
            item.idTipoProducto,
            item.nombreTP,
            item.rutaImagen,
            item.categoria1,
            item.categora2,
            item.categoria3
          )
      ))
    );

  }
  borraProducto(id: string) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.delete(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos + '/' + id);
  }
  insertaProducto(producto:Producto) {
    return this.http.post(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos,producto);
  }

  editaProducto(producto: Producto) {
    //return this.http.delete('http://ec2-54-153-58-93.us-west-1.compute.amazonaws.com:3005/regiones/'+id);
    return this.http.put(environment.baseUrl + ':' + environment.puertoApiAdmonCatalogos + environment.productos + '/' + producto.id,producto);
  }

}
