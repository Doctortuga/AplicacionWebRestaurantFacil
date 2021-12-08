import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPedidoComponent } from './main-pedido/main-pedido.component';




const routes: Routes = [
    {
        path: '',
        component: MainPedidoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PedidoRoutingModule {}
