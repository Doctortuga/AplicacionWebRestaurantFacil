import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  url : string;


  constructor(
    private http:HttpClient
  ) { 

  }




 
  Get(query:string){
    const url = `${environment.URL}${query}`;
    return this.http.get(url);
  }


  Post(query:string){
    const url = `${environment.URL}${query}`;
    const headers = new HttpHeaders({
              'Content-Type': 'application/json'
            });
    return this.http.post<any>(url,{headers}).pipe(
          map(response => response));
  }









  
  
}