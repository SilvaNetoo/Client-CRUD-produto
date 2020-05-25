import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from 'src/app/shared/components/shared-component.module';
import { CadastroModule } from '../cadastro/cadastro.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { LoginComponent } from './login.component';
import { LoginService } from './service/login.service';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedComponentsModule,
    CadastroModule,
    ProdutosModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
