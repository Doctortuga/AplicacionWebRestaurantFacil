import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { MainProveedorComponent } from './main-proveedor/main-proveedor.component';
import { ListaProveedorComponent } from './lista-proveedor/lista-proveedor.component';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { ListarPedidoComponent } from '../Pedidos/listar-pedido/listar-pedido.component';
import { PedidoRoutingModule } from '../Pedidos/pedido-routing.module';
import { CrearPedidoComponent } from '../Pedidos/crear-pedido/crear-pedido.component';

@NgModule({
  declarations: [
      MainProveedorComponent,
      ListaProveedorComponent,
      CrearProveedorComponent,
      ListarPedidoComponent,
      CrearPedidoComponent,

    ],
  imports: [
    CommonModule,
    MaterialModule,
    ProveedorRoutingModule,
    PedidoRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class ProveedorModule { }
