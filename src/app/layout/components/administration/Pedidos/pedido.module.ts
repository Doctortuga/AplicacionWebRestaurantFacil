import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPedidoComponent } from './main-pedido/main-pedido.component';
import { ListarPedidoComponent } from './listar-pedido/listar-pedido.component';
import { CrearPedidoComponent } from './crear-pedido/crear-pedido.component';
import { PedidoRoutingModule } from './pedido-routing.module';

@NgModule({
  declarations: [
      MainPedidoComponent,


    ],
  imports: [
    CommonModule,
    MaterialModule,
    PedidoRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class PedidoModule { }
