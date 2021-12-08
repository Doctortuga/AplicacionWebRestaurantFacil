import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMesasComponent } from './main-mesas.component';



const routes: Routes = [
    {
        path: '',
        component: MainMesasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MesasRoutingModule {}
