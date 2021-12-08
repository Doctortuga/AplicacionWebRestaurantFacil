import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConexionService } from './conexion.service';
import { Pedido_Prov } from '../interfaces/Pedido';



@Injectable({
  providedIn: 'root'
})
export class PedidoProvService {

  url: string;


  constructor(
    private http: HttpClient,
    private conexion: ConexionService

  ) {

  }


  GetPedidoProv() {
    return this.conexion.Get(`PedidoProv`)
    .pipe(map( con => {

       const data = con;
       return data;
   }));


 }
 GetIdPedido() {
  return this.conexion.Get(`PedidoProv?a=1`)
  .pipe(map( con => {

     const data = con;
     return data;
 }));


}
eliminarPedidoProv (Id_pedido: number) {
 return this.http.delete(environment.URL + 'PedidoProv?Id_ped_prov=' + Id_pedido);
}

agregarPedidoProv(pedido: Pedido_Prov) {

return this.http.post(environment.URL + 'PedidoProv', pedido);

}
editarPedidoProv(pedido: Pedido_Prov) {

  return this.http.put(environment.URL + 'PedidoProv', pedido);

  }









}
