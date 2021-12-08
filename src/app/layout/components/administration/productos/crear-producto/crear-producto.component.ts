import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { categoriaFormato } from 'src/app/interfaces/categoriaFormato';
import { categoriaProducto } from 'src/app/interfaces/categoriaProducto';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})

  export class CrearProductoComponent implements OnInit {
    public dispo: Array<categoriaProducto> = [{id: '1', nombre: 'Lacteos'},
    {id: '2', nombre: 'Abarrotes'}, {id: '3', nombre:'Frutas'}, 
    {id: '4', nombre:'Verduras'},{id: '5', nombre:'Carnes'},
    {id: '6', nombre:'Pescados'},{id: '7', nombre:'Mariscos'},
    {id: '8', nombre:'Embutidos'},{id: '9', nombre:'Bebidas'},
    {id: '10', nombre:'Cervezas'},{id: '11', nombre:'Agua'},
    {id: '12', nombre:'Productos de limpieza'}];

    public dispo1: Array<categoriaFormato> = [{id: '1', nombre: 'Litro'},
    {id: '2', nombre: 'Miligramos'}, {id: '3', nombre:'Kilos'}, 
    {id: '4', nombre:'Gramos'},{id: '5', nombre:'Unidad'}];
    hide = true;
    public SnackBar: MatSnackBar;

    formulario: FormGroup;
    producto: any;
    esNuevaMesa = true;
    tituloBoton = 'Agregar Producto';

    // public dispo: Array<Disponibilidad> = [{id: 'Y', nombre: 'Disponible'},
    // {id: 'N', nombre: 'Ocupada'}];
    constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    private fb: FormBuilder,
    public servicesProducto: ProductoService,
    private router: Router,



    ) {
      this.formulario = this.fb.group({
      Id_Producto : ['', Validators.required],
      Nombre : ['', Validators.required],
      Precio : ['', Validators.required],
      Categoria : ['', Validators.required],
      Formato : ['', Validators.required],
      Imagen : ['', Validators.required]



      });
      console.log(data);
      if (data) {
        this.esNuevaMesa = false;
        this.tituloBoton = 'Editar Producto';
      }
      this.producto = data;
      this.setearProducto();

    }


  setearProducto() {
    if (this.producto) {
      this.formulario.get('Id_Producto').setValue(this.producto.Id_Producto);
      this.formulario.get('Nombre').setValue(this.producto.Nombre);
      this.formulario.get('Precio').setValue(this.producto.Precio);
      this.formulario.get('Categoria').setValue(this.producto.Categoria);
      this.formulario.get('Formato').setValue(this.producto.Formato);
      this.formulario.get('Imagen').setValue(this.producto.Imagen);
      this.formulario.get('Id_Producto').disable();
      this.formulario.updateValueAndValidity();

    }
  }



    ngOnInit() {

    }
    agregarUsuario() {

  console.log(this.formulario.getRawValue());
    const Productocs: Producto = {
      id_producto: this.formulario.getRawValue().Id_Producto,
      nombre: this.formulario.getRawValue().Nombre,
      precio: this.formulario.getRawValue().Precio,
      categoria: this.formulario.getRawValue().Categoria,
      formato: this.formulario.getRawValue().Formato,
      imagen: this.formulario.getRawValue().Imagen,


    };
    console.log(Productocs);

    if (this.esNuevaMesa) {
      this.servicesProducto.agregarProducto(Productocs)
      .subscribe(res => {console.log(res);
        if (res === true) {
          this.dialogRef.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto registrada',
            showConfirmButton: false,
            timer: 1500
          });

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Producto ya registrado',
            text: 'Intente ingresar un n° de Producto diferente!',

          });

        }
      });
    } else {
      this.servicesProducto.editarMesa(Productocs)
      .subscribe(res => {console.log(res);
        if (res === true) {
          this.dialogRef.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto editado',
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
