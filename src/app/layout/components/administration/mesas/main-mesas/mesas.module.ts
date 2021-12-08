import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MesasRoutingModule } from './mesas-routing.module';
import { CrearMesasComponent } from './CrearMesas/CrearMesas.component';
import { ListarMesasComponent } from '../ListarMesas/ListarMesas.component';
import { MainMesasComponent } from './main-mesas.component';

@NgModule({
  declarations: [
      MainMesasComponent,
      CrearMesasComponent,
      ListarMesasComponent,
    ],
  imports: [
    CommonModule,
    MaterialModule,
    MesasRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class MesasModule { }
