import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConexionService } from './conexion.service';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url : string;


  constructor(
    private http:HttpClient,
    private conexion : ConexionService
  ) { 

  }

  Login(rut,clave){
    return this.conexion.Post(`login?rut=${rut}&clave=${clave}`)
    .pipe(map( con => {
     
       let data = con;
       return data;
   }));
 }



 
}
