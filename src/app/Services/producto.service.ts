import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConexionService } from './conexion.service';
import { Producto } from '../interfaces/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: string;


  constructor(
    private http: HttpClient,
    private conexion: ConexionService

  ) {

  }


  GetProducto() {
    return this.conexion.Get(`Producto`)
    .pipe(map( con => {

       const data = con;
       return data;
   }));


 }
 SearchProducto(nombre: string) {
  return this.conexion.Get(`Producto?nombre=` + nombre)
  .pipe(map( con => {

     const data = con;
     return data;
 }));


}
eliminarProducto (id_producto: number) {
 return this.http.delete(environment.URL + 'Producto?id_producto=' + id_producto);
}

agregarProducto(producto: Producto) {

return this.http.post(environment.URL + 'Producto', producto);

}
editarMesa(producto: Producto) {

  return this.http.put(environment.URL + 'Producto', producto);

  }








}
