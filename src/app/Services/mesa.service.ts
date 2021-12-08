import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConexionService } from './conexion.service';
import { Mesa } from '../interfaces/mesa';



@Injectable({
  providedIn: 'root'
})
export class MesaService {

  url: string;


  constructor(
    private http: HttpClient,
    private conexion: ConexionService

  ) {

  }


  GetMesa() {
    return this.conexion.Get(`Mesa`)
    .pipe(map( con => {

       const data = con;
       return data;
   }));


 }
eliminarMesa (nro_mesa: number) {
 return this.http.delete(environment.URL + 'Mesa?nro_mesa=' + nro_mesa);
}

agregarMesa(mesa: Mesa) {

return this.http.post(environment.URL + 'Mesa', mesa);

}
editarMesa(mesa: Mesa) {

  return this.http.put(environment.URL + 'Mesa', mesa);

  }
  GetMesasDisponibles() {
    return this.conexion.Get(`Mesa?a=1`)
    .pipe(map( con => {

       const data = con;
       return data;
   }));


 }





}
