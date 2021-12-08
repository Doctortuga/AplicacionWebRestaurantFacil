import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoProvService } from 'src/app/Services/Pedido_Prov.service';
import Swal from 'sweetalert2';
import { CrearPedidoComponent } from '../crear-pedido/crear-pedido.component';
const anchoVentana = window.innerWidth;
@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.scss']
})

export class ListarPedidoComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Id_ped_prov', 'Total', 'Fecha', 'Responsable', 'Rut', 'Id_proveedor', 'acciones'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  loading = true;
  mostarTabla = false;
  UserData: any =	[] ;
  getData: any = [];

  condicionDisponibilidad = true;
  constructor(
    private pedidoprov: PedidoProvService,
    private dialog: MatDialog,

  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {
    this.fakeloading();
    this.pedidoprov.GetPedidoProv()
    .toPromise()
    .then((data: any) => {
  console.log(data);

  this.dataSource = new MatTableDataSource(data);
  console.log(this.dataSource);
  this.dataSource.paginator = this.paginator;



    } );
  }
  eliminarPedido(Id_pedido: number) {
    Swal.fire({
      title: 'Deseas eliminar este Pedido?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoprov.eliminarPedidoProv(Id_pedido).subscribe(data => {
          this.ngOnInit();
        });
        Swal.fire(
          'Eliminado!',
          'Pedido ah sido eliminado.',
          'success'
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Pedido No fue eliminado',
          'error'
        );
      }
    });

  }





  agregar() {
    const diag = this.dialog.open(CrearPedidoComponent, {

      width: '90%',

    });
    const promAfeter = diag.afterClosed().toPromise();
    diag.afterClosed().subscribe(() => this.ngOnInit());
    Promise.all([promAfeter]).then((data: any) => {

    });
  }

  editar(val) {
    const diag = this.dialog.open(CrearPedidoComponent, {
      data: val,
      width: '40%',
    });
    const promAfeter = diag.afterClosed().toPromise();
    diag.afterClosed().subscribe(() => this.ngOnInit());
    Promise.all([promAfeter]).then((data: any) => {

    });
  }
  fakeloading() {
    this.loading = true;

  setTimeout(() => {
      this.loading = false;
      this.mostarTabla = true;
  }, 1500);

}



}
