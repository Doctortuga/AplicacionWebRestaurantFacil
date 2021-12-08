import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProductoComponent } from './main-producto/main-producto.component';


const routes: Routes = [
    {
        path: '',
        component: MainProductoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductoRoutingModule {}
