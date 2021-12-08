import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUsuarioComponent } from './main-usuario/main-usuario.component';


const routes: Routes = [
    {
        path: '',
        component: MainUsuarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {}
