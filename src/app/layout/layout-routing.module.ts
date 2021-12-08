import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard';

import { LayoutComponent } from './layout.component';
import { Screen1Component } from './screen1/screen1.component';
import { Screen2Component } from './screen2/screen2.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'screen1',
                loadChildren: () => import('./screen1/screen1.module').then(m => m.Screen1Module)
            },
            {
                path: 'usuario',
                loadChildren: () => import('./components/administration/usuario/usuario.module').then(m => m.UsuarioModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'mesas',
                loadChildren: () => import('./components/administration/mesas/main-mesas/mesas.module').then(m => m.MesasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'producto',
                loadChildren: () => import('./components/administration/productos/producto.module').then(m => m.ProductoModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'proveedor',
                loadChildren: () => import('./components/administration/proveedor/proveedor.module').then(m => m.ProveedorModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'inventario',
                loadChildren: () => import('./components/bodega/inventario/inventario.module').then(m => m.InventarioModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'screen2',
                component: Screen2Component
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
