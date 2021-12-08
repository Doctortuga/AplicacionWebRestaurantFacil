import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { TextMaskModule } from 'angular2-text-mask';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MesaService } from 'src/app/Services/mesa.service';
import { Mesa } from 'src/app/interfaces/mesa';
import { Disponibilidad } from 'src/app/interfaces/Disponibilidad.interface';
@Component({
  selector: 'app-CrearMesas',
  templateUrl: './CrearMesas.component.html',
  styleUrls: ['./CrearMesas.component.scss']
})
export class CrearMesasComponent implements OnInit {
  hide = true;
  public SnackBar: MatSnackBar;

  formulario: FormGroup;
  mesa: any;
  esNuevaMesa = true;
  tituloBoton = 'Agregar Mesa';

  public dispo: Array<Disponibilidad> = [{id: 'Y', nombre: 'Disponible'},
  {id: 'N', nombre: 'Ocupada'}];
  constructor(
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CrearMesasComponent>,
  private fb: FormBuilder,
  public servicesMesa: MesaService,
  private router: Router,



  ) {
    this.formulario = this.fb.group({
    Nro_mesa : ['', Validators.required],
    Disponibilidad : ['', Validators.required],
    Id_reserva : ['', Validators.required],
    Capacidad : ['', Validators.required]



    });
    console.log(data);
    if (data) {
      this.esNuevaMesa = false;
      this.tituloBoton = 'Editar Mesa';
    }
    this.mesa = data;
    this.setearMesa();

  }


setearMesa() {
  if (this.mesa) {
    this.formulario.get('Nro_mesa').setValue(this.mesa.Nro_mesa);
    this.formulario.get('Disponibilidad').setValue(this.mesa.Disponibilidad);
    this.formulario.get('Id_reserva').setValue(this.mesa.Id_reserva);
    this.formulario.get('Capacidad').setValue(this.mesa.Capacidad);
    this.formulario.get('Nro_mesa').disable();
    this.formulario.get('Id_reserva').disable();
    this.formulario.updateValueAndValidity();

  }
}



  ngOnInit() {

  }
  agregarUsuario() {

console.log(this.formulario.getRawValue());
  const Mesa: Mesa = {
    nro_mesa: this.formulario.getRawValue().Nro_mesa,
    disponibilidad: this.formulario.getRawValue().Disponibilidad,
    id_reserva: this.formulario.getRawValue().Id_reserva,
    capacidad: this.formulario.getRawValue().Capacidad,


  };
  console.log(Mesa);

  if (this.esNuevaMesa) {
    this.servicesMesa.agregarMesa(Mesa)
    .subscribe(res => {console.log(res);
      if (res === true) {
        this.dialogRef.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Mesa registrada',
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Mesa ya registrado',
          text: 'Intente ingresar un n° de mesa diferente!',

        });

      }
    });
  } else {
    this.servicesMesa.editarMesa(Mesa)
    .subscribe(res => {console.log(res);
      if (res === true) {
        this.dialogRef.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Mesa editada',
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

