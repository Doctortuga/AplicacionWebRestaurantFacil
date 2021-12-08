import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})
export class ListaUsuarioComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['rut', 'nombre', 'rol', 'acciones'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loading = true;
  mostarTabla = false;
  UserData: any =	[] ;
  constructor(
    private Usuario: UsuarioService,
    private dialog: MatDialog,

  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {
    this.fakeloading();
    this.Usuario.GetUsuarios()
    .toPromise()
    .then((data: any) => {
  console.log(data);
  this.dataSource = new MatTableDataSource(data);
  console.log(this.dataSource);
  this.dataSource.paginator = this.paginator;


    } );
  }
  eliminarUsuario(rut: string) {
    // if (confirm('Estas seguro que quieres eliminar este usuario ?')) {
    //   this.Usuario.eliminarUsuario(rut).subscribe(data => {
    //     this.ngOnInit();
    //   });

    // }
    // console.log(rut);


    Swal.fire({
      title: 'Deseas eliminar este usuario?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.Usuario.eliminarUsuario(rut).subscribe(data => {
          this.ngOnInit();
        });
        Swal.fire(
          'Eliminado!',
          'El usuario ah sido eliminado.',
          'success'
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'El usuario No fue eliminado',
          'error'
        );
      }
    });

  }



  agregar() {
    const diag = this.dialog.open(CrearUsuarioComponent, {

      width: '65%',
    });
    const promAfeter = diag.afterClosed().toPromise();
    diag.afterClosed().subscribe(() => this.ngOnInit());
    Promise.all([promAfeter]).then((data: any) => {

    });
  }

  editar(val) {
    const diag = this.dialog.open(CrearUsuarioComponent, {
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
