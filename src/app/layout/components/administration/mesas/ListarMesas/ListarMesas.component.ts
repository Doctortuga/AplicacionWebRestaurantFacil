import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MesaService } from 'src/app/Services/mesa.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import Swal from 'sweetalert2';
import { CrearMesasComponent } from '../main-mesas/CrearMesas/CrearMesas.component';


@Component({
  selector: 'app-ListarMesas',
  templateUrl: './ListarMesas.component.html',
  styleUrls: ['./ListarMesas.component.scss']
})
export class ListarMesasComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Nro_mesa', 'Disponibilidad', 'Id_reserva', 'Capacidad', 'acciones'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  loading = true;
  mostarTabla = false;
  UserData: any =	[] ;
  getData: any = [];
  condicionDisponibilidad = true;
  constructor(
    private Mesa: MesaService,
    private dialog: MatDialog,

  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {
    this.fakeloading();
    this.Mesa.GetMesa()
    .toPromise()
    .then((data: any) => {
  console.log(data);

  this.dataSource = new MatTableDataSource(data);
  console.log(this.dataSource);
  this.dataSource.paginator = this.paginator;
  this.GetMesasDisponibles();


    } );
  }
  eliminarUsuario(nro_mesa: number) {
    // if (confirm('Estas seguro que quieres eliminar este usuario ?')) {
    //   this.Usuario.eliminarUsuario(rut).subscribe(data => {
    //     this.ngOnInit();
    //   });

    // }
    // console.log(rut);


    Swal.fire({
      title: 'Deseas eliminar esta mesa?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.Mesa.eliminarMesa(nro_mesa).subscribe(data => {
          this.ngOnInit();
        });
        Swal.fire(
          'Eliminado!',
          'la Mesa ah sido eliminada.',
          'success'
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'la Mesa No fue eliminada',
          'error'
        );
      }
    });

  }



  agregar() {
    const diag = this.dialog.open(CrearMesasComponent, {

      width: '65%',
    });
    const promAfeter = diag.afterClosed().toPromise();
    diag.afterClosed().subscribe(() => this.ngOnInit());
    Promise.all([promAfeter]).then((data: any) => {

    });
  }

  editar(val) {
    const diag = this.dialog.open(CrearMesasComponent, {
      data: val,
      width: '65%',
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
GetMesasDisponibles() {
  this.Mesa.GetMesasDisponibles()
  .toPromise()
  .then((data: any) => {
  this.getData = data;
  console.log(this.getData);
  } );
}


}
