import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MainInventarioComponent } from './main-inventario/main-inventario.component';
import { ListaInventarioComponent } from './lista-inventario/lista-inventario.component';
import { CrearInventarioComponent } from './crear-inventario/crear-inventario.component';
import { InventarioRoutingModule } from './inventario-routing.module';

@NgModule({
  declarations: [
      MainInventarioComponent,
      ListaInventarioComponent,
      CrearInventarioComponent,

    ],
  imports: [
    CommonModule,
    MaterialModule,
    InventarioRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class InventarioModule { }
