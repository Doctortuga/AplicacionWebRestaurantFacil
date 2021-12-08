import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConexionService } from './conexion.service';




@Injectable({
  providedIn: 'root'
})
export class authService {

  url : string;


  constructor(
    private http:HttpClient,
    private conexion : ConexionService
  ) { 

  }

  PuedeIngresar(){
   return true;
 }
 NoPuedeIngresar(){
    return false;
  }



 
}
