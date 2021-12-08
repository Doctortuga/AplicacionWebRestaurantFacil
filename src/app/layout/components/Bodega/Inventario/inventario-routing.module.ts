import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInventarioComponent } from './main-inventario/main-inventario.component';



const routes: Routes = [
    {
        path: '',
        component: MainInventarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventarioRoutingModule {}
