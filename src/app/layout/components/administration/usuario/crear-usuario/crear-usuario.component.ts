import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { IDrol } from '../main-usuario/rol.interface';
import { TextMaskModule } from 'angular2-text-mask';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  hide = true;
  public SnackBar: MatSnackBar;
  public roles: Array<IDrol> = [{id: 1, nombre: 'Administracion'},
  {id: 2, nombre: 'Finanzas'}, {id: 3, nombre: 'Cocina'},
  {id: 4, nombre: 'Bodega'}, {id: 5, nombre: 'Cliente'}];

  public rolId: number;
  // public mask = [/[1-9]/, /\d/, '.', ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  formulario: FormGroup;
  usuario: any;
  esNuevoUsuario = true;
  tituloBoton = 'Agregar Usuario';

  constructor(
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CrearUsuarioComponent>,
  private fb: FormBuilder,
  public servicesUsuario: UsuarioService,
  private router: Router,

  ) {
    this.formulario = this.fb.group({
    Rut : ['', Validators.required],
    Nombre : ['', Validators.required],
    Contraseña : ['', Validators.required],
    Id_rol : ['', Validators.required],


    });
    console.log(data);
    if (data) {
      this.esNuevoUsuario = false;
      this.tituloBoton = 'Editar Usuario';
    }
    this.usuario = data;
    this.setearUsuario();

  }


setearUsuario() {
  if (this.usuario) {
    this.formulario.get('Rut').setValue(this.usuario.Rut);
    this.formulario.get('Nombre').setValue(this.usuario.Nombre);
    this.formulario.get('Contraseña').setValue(this.usuario.Contraseña);
    this.formulario.get('Id_rol').setValue(this.usuario.Id_rol);
    this.formulario.get('Rut').disable();
    this.formulario.updateValueAndValidity();

  }
}



  ngOnInit() {

  }
  agregarUsuario() {

console.log(this.formulario.getRawValue());
  const user: Usuario = {
    Rut: this.formulario.getRawValue().Rut,
    Nombre: this.formulario.getRawValue().Nombre,
    Contraseña: this.formulario.getRawValue().Contraseña,
    Id_rol: this.formulario.getRawValue().Id_rol,


  };
  console.log(user);

  if (this.esNuevoUsuario) {
    this.servicesUsuario.agregarUsuario(user)
    .subscribe(res => {console.log(res);
      if (res === true) {
        this.dialogRef.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario registrado',
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuario ya registrado',
          text: 'Intente ingresar un rut diferente!',

        });

      }
    });
  } else {
    this.servicesUsuario.editarUsuario(user)
    .subscribe(res => {console.log(res);
      if (res === true) {
        this.dialogRef.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario editado',
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
