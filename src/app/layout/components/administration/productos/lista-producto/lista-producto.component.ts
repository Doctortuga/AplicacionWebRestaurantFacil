import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/Services/producto.service';
import Swal from 'sweetalert2';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductosComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Id_Producto', 'Nombre', 'Precio', 'Categoria', 'Formato', 'Imagen', 'acciones'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  loading = true;
  mostarTabla = false;
  UserData: any =	[] ;
  getData: any = [];
  condicionDisponibilidad = true;
  constructor(
    private Producto: ProductoService,
    private dialog: MatDialog,

  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {
    this.fakeloading();
    this.Producto.GetProducto()
    .toPromise()
    .then((data: any) => {
  console.log(data);

  this.dataSource = new MatTableDataSource(data);
  console.log(this.dataSource);
  this.dataSource.paginator = this.paginator;



    } );
  }
  eliminarUsuario(id_producto: number) {

    Swal.fire({
      title: 'Deseas eliminar esta Producto?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.Producto.eliminarProducto(id_producto).subscribe(data => {
          this.ngOnInit();
        });
        Swal.fire(
          'Eliminado!',
          'la Producto ah sido eliminada.',
          'success'
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'la Producto No fue eliminada',
          'error'
        );
      }
    });

  }



  agregar() {
    const diag = this.dialog.open(CrearProductoComponent, {

      width: '40%',
    });
    const promAfeter = diag.afterClosed().toPromise();
    diag.afterClosed().subscribe(() => this.ngOnInit());
    Promise.all([promAfeter]).then((data: any) => {

    });
  }

  editar(val) {
    const diag = this.dialog.open(CrearProductoComponent, {
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

