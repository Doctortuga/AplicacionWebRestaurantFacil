import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConexionService } from './conexion.service';
import { Proveedor } from '../interfaces/Proveedor';
import { registro_ped_prov } from '../interfaces/registo_ped_prov';



@Injectable({
  providedIn: 'root'
})
export class RegPedidoProvService {

  url: string;


  constructor(
    private http: HttpClient,
    private conexion: ConexionService

  ) {

  }


  GetRegPedidoProv() {
    return this.conexion.Get(`RegistroPedProv`)
    .pipe(map( con => {

       const data = con;
       return data;
   }));


 }
eliminarRegPedidoProv (Id_reg_provg: number) {
 return this.http.delete(environment.URL + 'RegistroPedProv?Id_reg_prov=' + Id_reg_provg);
}

agregarRegPedidoProv(registro: registro_ped_prov) {
console.log(registro);
return this.http.post(environment.URL + 'RegistroPedProv', registro);

}
editarRegPedidoProv(registro: registro_ped_prov) {

  return this.http.put(environment.URL + 'RegistroPedProv', registro);

  }






}
