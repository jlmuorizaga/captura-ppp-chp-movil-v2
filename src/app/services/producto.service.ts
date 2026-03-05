import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/dto/producto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {}

  dameProducto(id: string) {
    return this.http.get(environment.baseApiCatalogos + environment.productos + '/' + id);
  }

  dameListaProductos() {
    return this.http.get(environment.baseApiCatalogos + environment.productos);
  }

  dameListaProductos2(): Observable<Producto[]> {
    // Ya NO concatenamos ":" + puerto. baseUrl debe incluir el prefijo correcto (ej: https://admin.../api/catalogos)
    const apiURL = environment.baseUrl + environment.productos2;

    return this.http.get<any[]>(apiURL).pipe(
      map((data: any[]) =>
        data.map(
          (item) =>
            new Producto(
              item.id,
              item.descripcionP,
              item.tamanio,
              item.usaSalsa,
              item.idTipoProducto,
              item.nombreTP,
              item.rutaImagen,
              item.categoria1,
              item.categoria2,
              item.categoria3
            )
        )
      )
    );
  }

  borraProducto(id: string) {
    return this.http.delete(environment.baseApiCatalogos + environment.productos + '/' + id);
  }

  insertaProducto(producto: Producto) {
    return this.http.post(environment.baseApiCatalogos + environment.productos, producto);
  }

  editaProducto(producto: Producto) {
    return this.http.put(environment.baseApiCatalogos + environment.productos + '/' + producto.id, producto);
  }
}
