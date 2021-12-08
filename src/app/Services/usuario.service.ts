import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConexionService } from './conexion.service';
import { Usuario } from '../interfaces/usuario';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string;


  constructor(
    private http: HttpClient,
    private conexion: ConexionService

  ) {

  }


  GetUsuarios() {
    return this.conexion.Get(`Usuario`)
    .pipe(map( con => {

       const data = con;
       return data;
   }));


 }
eliminarUsuario (rut: string) {
 return this.http.delete(environment.URL + 'Usuario?rut=' + rut);
}

agregarUsuario(usuario: Usuario) {

return this.http.post(environment.URL + 'Usuario', usuario);

}
editarUsuario(usuario: Usuario) {

  return this.http.put(environment.URL + 'Usuario', usuario);

  }





}
