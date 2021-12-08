import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pedido_Prov } from 'src/app/interfaces/Pedido';
import { PedidoProvService } from 'src/app/Services/Pedido_Prov.service';
import Swal from 'sweetalert2';
import { CrearProveedorComponent } from '../../proveedor/crear-proveedor/crear-proveedor.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/Services/producto.service';
import { debounceTime, distinctUntilChanged, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { registro_ped_prov } from 'src/app/interfaces/registo_ped_prov';
import { RegPedidoProvService } from 'src/app/Services/RegPedidoProv.service';
import { ProveedorService } from 'src/app/Services/proveedor.service';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})
export class CrearPedidoComponent implements OnInit {


  constructor(
    private serviceProveedor: ProveedorService,
    private service: ProductoService,
    private serviceProducto: ProductoService,
    private serviceRegistroPedido: RegPedidoProvService,
     private fb: FormBuilder,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
     public dialogRef: MatDialogRef<CrearPedidoComponent>,
     public servicesPedido: PedidoProvService,
     private router: Router, ) {
      this.formulario = this.fb.group({
        Id_pedido : [{value: null, disabled: true}],
        Total : [{value: null, disabled: true}],
        Fecha : [new  Date(), Validators.required],
        Responsable : [{value: null, disabled: true}],
        Usuario_rut : [{value: null, disabled: true}],
        Id_Proveedor : ['', Validators.required],




      });
      console.log(data);
      if (data) {
        this.esNuevaMesa = false;
        this.tituloBoton = 'Editar Pedido';
      }
      this.pedido = data;
      this.setearProducto();
     }
  hide = true;
  public SnackBar: MatSnackBar;
  formulario: FormGroup;
  pedido: any;
  esNuevaMesa = true;
  tituloBoton = 'Agregar Pedido';
  title = 'autocomplete';
  texto = '';
  options = ['Sam', 'Varun', 'Jasmine'];

  filteredOptions;
  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;


  productos: any [] = [];
  regPedidos = [];
  pedidos = [];
  proveedor = [];
  formGroup: FormGroup;

  regPedido = {} as registro_ped_prov ;
     setearProducto() {
      if (this.pedido) {
        this.formulario.get('Id_pedido').setValue(this.pedido.Id_pedido);
        this.formulario.get('Total').setValue(this.pedido.Total);
        this.formulario.get('Fecha').setValue('05-15-2021');
        this.formulario.get('Responsable').setValue(localStorage.getItem('Nombre'));
        this.formulario.get('Usuario_rut').setValue(localStorage.getItem('Rut'));
        this.formulario.get('Id_Proveedor').setValue(this.pedido.Proveedor_id_proveedor);
        this.formulario.get('Fecha').disable();
        this.formulario.updateValueAndValidity();

      }
    }

    GetProveedor() {
      this.serviceProveedor.GetProveedor()
      .toPromise()
      .then((data: any) => {
    console.log(data);
    this.proveedor = data;
      } ); }
      GetIdPedido() {
        this.servicesPedido.GetIdPedido()
        .toPromise()
        .then((data: any) => {
      console.log(data);
      this.guardar(data);
        } ); }






  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



  ngOnInit() {
    this.GetProveedor();
    this.formulario.get('Usuario_rut').setValue(localStorage.getItem('Rut'));
    this.formulario.get('Responsable').setValue(localStorage.getItem('Nombre'));
    this.formulario.updateValueAndValidity();
  }
  agregarPedido() {

    console.log(this.formulario.getRawValue());
      const Pedidocs: Pedido_Prov = {
        Id_ped_prov: this.formulario.getRawValue().Id_pedido,
        Total: this.formulario.getRawValue().Total,
        Responsable: this.formulario.getRawValue().Responsable,
        Usuario_rut: this.formulario.getRawValue().Usuario_rut,
        Fecha: this.formulario.getRawValue().Fecha,
        Proveedor_id_proveedor: this.formulario.getRawValue().Id_Proveedor,

      };
      console.log(Pedidocs);

      if (this.esNuevaMesa) {
        this.servicesPedido.agregarPedidoProv(Pedidocs)
        .subscribe(res => {console.log(res);
          this.GetIdPedido();
          if (res === true ) {

              if (this.pedidos.length === 0) {
                Swal.fire({
                  icon: 'error',
                  title: 'Carrito de pedidos vacio',
                  text: 'Intente ingresar un Producto al carrito!',

                });
              } else {
                this.dialogRef.close();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Pedido registrado',
                  showConfirmButton: false,
                  timer: 1500
                });

              }

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Pedido ya registrado',
              text: 'Intente ingresar un Pedido diferente!',

            });

          }
        });
      } else {
        this.servicesPedido.editarPedidoProv(Pedidocs)
        .subscribe(res => {console.log(res);
          this.GetIdPedido();
          if (res === true ) {
            this.dialogRef.close();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Pedido editado',
              showConfirmButton: false,
              timer: 1500
            });

          }
        });
      }
      }




  cambioTexto() {
    console.log(this.texto);

    if (this.texto?.length > 2) {
      console.log('buscar');

      this.SearchProducto(this.texto);
    } else {
      this.productos = [];
    }

  }


SearchProducto(texto) {
  this.service.SearchProducto(texto)
  .subscribe
  ((data: any) => {
console.log(data);
this.productos = data;
this.productos.forEach(producto => {
producto.cantidadPedido = null;
producto.fechaVencimiento = null;
producto.precioCompra = null;
});
console.log(this.productos);
  } );
}
private _filter(value: string): string[] {
  const filterValue = this._normalizeValue(value);
  return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
}

private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

guardar(id) {
  console.log(this.pedidos);
  this.pedidos.forEach(pedido => {
    console.log(pedido);
  this.regPedido.Cantidad = pedido.cantidadPedido;
  this.regPedido.Fecha_fencimiento = pedido.fechaVencimiento;
  this.regPedido.Fecha_ingreso = new Date().toDateString();
  this.regPedido.Precio_compra = pedido.precioCompra;
  this.regPedido.Pedido_prov_id_ped_prov = id;
  this.regPedido.Producto_id_producto = pedido.Id_Producto;


  this.serviceRegistroPedido.agregarRegPedidoProv(this.regPedido)
  .subscribe(res => {console.log(res); });

  });


}

PrecioTotal() {
  let totalpedido = 0;
  this.pedidos.forEach(ped => {
    const  total = ped.cantidadPedido * ped.precioCompra;
    totalpedido += total;
    this.formulario.get('Total').setValue(totalpedido);

  });

  return totalpedido;
}
cerrar() {
  this.dialogRef.close();
}
verificar() {
  let desabilitar = false;

  if (this.pedidos.length === 0) {
    desabilitar = true;
  }

  this.pedidos.forEach(ped => {
    console.log(ped);
  if (!ped.precioCompra) {
    desabilitar = true;
    console.log('precio');
  }
  if (!ped.cantidadPedido) {
    desabilitar = true;
    console.log('cantidad');
  }
  if (!ped.fechaVencimiento) {
    desabilitar = true;
    console.log('fecha');
  }
  });
  console.log(desabilitar);

  return desabilitar;
}
// guardarPedido() {



//   this.serviceRegistroPedido.agregarPedido(this.Pedido)
//   .subscribe(res => {console.log(res); });
//     res.id

//     this.guardar(res.id);

//   });


// }

}
