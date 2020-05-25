import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManipularProdutoComponent } from './manipular-produto/manipular-produto.component';
import { ProdutosComponent } from './produtos.component';
import { ProdutosService } from './service/produtos.service';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'manipular', component: ManipularProdutoComponent },
  { path: 'manipular/:id', component: ManipularProdutoComponent },
];

@NgModule({
  declarations: [
    ProdutosComponent,
    ManipularProdutoComponent
  ],
  exports: [
    ProdutosComponent,
    ManipularProdutoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [ProdutosService]
})
export class ProdutosModule { }
