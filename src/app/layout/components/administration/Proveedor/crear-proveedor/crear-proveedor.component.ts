import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/Proveedor';
import { ProveedorService } from 'src/app/Services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.scss']
})
export class CrearProveedorComponent implements OnInit {
  hide = true;
  public SnackBar: MatSnackBar;

  formulario: FormGroup;
  proveedor: any;
  esNuevaMesa = true;
  tituloBoton = 'Agregar Proveedor';

  // public dispo: Array<Disponibilidad> = [{id: 'Y', nombre: 'Disponible'},
  // {id: 'N', nombre: 'Ocupada'}];
  constructor(
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CrearProveedorComponent>,
  private fb: FormBuilder,
  public servicesProveedor: ProveedorService,
  private router: Router,



  ) {
    this.formulario = this.fb.group({
      Id_Proveedor : ['', ],
      Nombre : ['', Validators.required]




    });
    console.log(data);
    if (data) {
      this.esNuevaMesa = false;
      this.tituloBoton = 'Editar Proveedor';
    }
    this.proveedor = data;
    this.setearProducto();

  }


setearProducto() {
  if (this.proveedor) {
    this.formulario.get('Id_Proveedor').setValue(this.proveedor.Id_Proveedor);
    this.formulario.get('Nombre').setValue(this.proveedor.Nombre);
    this.formulario.get('Id_Proveedor').disable();
    this.formulario.updateValueAndValidity();

  }
}



  ngOnInit() {

  }
  agregarProveedor() {

console.log(this.formulario.getRawValue());
  const Proveedorcs: Proveedor = {
    Id_proveedor: this.formulario.getRawValue().Id_Proveedor,
    Nombre: this.formulario.getRawValue().Nombre,
  };
  console.log(Proveedorcs);

  if (this.esNuevaMesa) {
    this.servicesProveedor.agregarProveedor(Proveedorcs)
    .subscribe(res => {console.log(res);
      if (res === true) {
        this.dialogRef.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proveedor registrado',
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Proveedor ya registrado',
          text: 'Intente ingresar un Proveedor diferente!',

        });

      }
    });
  } else {
    this.servicesProveedor.editarProveedor(Proveedorcs)
    .subscribe(res => {console.log(res);
      if (res === true) {
        this.dialogRef.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proveedor editado',
          showConfirmButton: false,
          timer: 1500
        });

      }
    });
  }
  }

  cerrar() {
    this.dialogRef.close();
  }


}
