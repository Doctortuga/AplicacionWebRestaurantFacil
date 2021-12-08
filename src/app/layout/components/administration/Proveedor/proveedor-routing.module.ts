import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProveedorComponent } from './main-proveedor/main-proveedor.component';



const routes: Routes = [
    {
        path: '',
        component: MainProveedorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedorRoutingModule {}
