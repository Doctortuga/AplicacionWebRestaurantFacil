import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainProductoComponent } from './main-producto/main-producto.component';
import { ListaProductosComponent } from './lista-producto/lista-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ProductoRoutingModule } from './producto-routing.module';

@NgModule({
  declarations: [
      MainProductoComponent,
      ListaProductosComponent,
      CrearProductoComponent,

    ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class ProductoModule { }
