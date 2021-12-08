import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainUsuarioComponent } from './main-usuario/main-usuario.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { UsuarioRoutingModule } from './Usuario-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      MainUsuarioComponent,
      ListaUsuarioComponent,
      CrearUsuarioComponent,

    ],
  imports: [
    CommonModule,
    MaterialModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ]
})
export class UsuarioModule { }
