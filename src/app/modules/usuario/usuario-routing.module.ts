import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: '', component: UsuarioComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroModule' },
      { path: 'produto', loadChildren: './produtos/produtos.module#ProdutosModule' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
