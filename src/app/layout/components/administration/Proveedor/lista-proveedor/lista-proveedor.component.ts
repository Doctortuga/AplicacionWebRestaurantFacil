import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import Swal from 'sweetalert2';
import { CrearProveedorComponent } from '../crear-proveedor/crear-proveedor.component';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.scss']
})
export class ListaProveedorComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Id_Proveedor', 'Nombre', 'acciones'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  loading = true;
  mostarTabla = false;
  UserData: any =	[] ;
  getData: any = [];
  condicionDisponibilidad = true;
  constructor(
    private Proveedor: ProveedorService,
    private dialog: MatDialog,

  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {
    this.fakeloading();
    this.Proveedor.GetProveedor()
    .toPromise()
    .then((data: any) => {
  console.log(data);

  this.dataSource = new MatTableDataSource(data);
  console.log(this.dataSource);
  this.dataSource.paginator = this.paginator;



    } );
  }
  eliminarUsuario(Id_proveedor: number) {
    Swal.fire({
      title: 'Deseas eliminar este proveedor?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.Proveedor.eliminarProveedor(Id_proveedor).subscribe(data => {
          this.ngOnInit();
        });
        Swal.fire(
          'Eliminado!',
          'proveedor ah sido eliminado.',
          'success'
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'proveedor No fue eliminado',
          'error'
        );
      }
    });

  }



  agregar() {
    const diag = this.dialog.open(CrearProveedorComponent, {

      width: '65%',
    });
    const promAfeter = diag.afterClosed().toPromise();
    diag.afterClosed().subscribe(() => this.ngOnInit());
    Promise.all([promAfeter]).then((data: any) => {

    });
  }

  editar(val) {
    const diag = this.dialog.open(CrearProveedorComponent, {
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



}
