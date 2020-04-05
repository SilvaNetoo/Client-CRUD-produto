import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'usuario', pathMatch: 'full' },
    { path: 'usuario', loadChildren: './modules/usuario/usuario.module#UsuarioModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
