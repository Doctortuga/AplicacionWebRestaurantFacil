import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConexionService } from './conexion.service';
import { Proveedor } from '../interfaces/Proveedor';



@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  url: string;


  constructor(
    private http: HttpClient,
    private conexion: ConexionService

  ) {

  }


  GetProveedor() {
    return this.conexion.Get(`Proveedor`)
    .pipe(map( con => {

       const data = con;
       return data;
   }));


 }
eliminarProveedor (Id_proveedor: number) {
 return this.http.delete(environment.URL + 'Proveedor?Id_Proveedor=' + Id_proveedor);
}

agregarProveedor(proveedor: Proveedor) {

return this.http.post(environment.URL + 'Proveedor', proveedor);

}
editarProveedor(proveedor: Proveedor) {

  return this.http.put(environment.URL + 'Proveedor', proveedor);

  }






}
