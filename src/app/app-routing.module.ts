import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
    , UrlTree } from '@angular/router';
const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        // canActivate:[AuthGuard]//nuestra ruta esta implementando un vigilante

    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
