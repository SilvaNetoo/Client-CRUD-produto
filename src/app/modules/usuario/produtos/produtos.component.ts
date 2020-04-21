
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/shared/constantes/constantes';
import { Produto } from './models/produto';
import { ProdutosService } from './service/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Array<Produto>;
  prod: Produto;
  carrinho: Array<Produto>;

  constructor(
    private produtosService: ProdutosService,
    private route: Router
  ) { }

  ngOnInit() {
    this.buscarProdutos();
    this.atualizarCarrinho();
  }

  buscarProdutos() {
    this.produtosService.get()
      .subscribe(res => {
        this.produtos = new Array<Produto>();
        this.produtos = res;
      }, err => console.log('err', err));
  }

  abrirModal(produto: Produto) {
    if (produto) {
      this.prod = produto;
    }
  }

  deletar() {
    if (this.prod.id) {
      this.produtosService.delet(this.prod.id)
        .subscribe(
          () => {
            window.location.reload();
          },
          () => { }
        );
    }
  }

  limparDeletarProduto() {
    if (this.prod) {
      this.prod = new Produto();
    }
  }

  adicionarProduto(produto: Produto) {
    console.log('local');
    if (produto && JSON.parse(localStorage.getItem('user'))[CONSTANTS.originValue].id) {
      this.produtosService.putCarrinho(JSON.parse(localStorage.getItem('user'))[CONSTANTS.originValue].id, produto)
        .subscribe(() => {
          this.atualizarCarrinho();
        }, err => {
          console.log('err', err);
        })
    }
  }

  redirecionarParaManipularProd() {
    this.route.navigate(['usuario/produto/manipular']);
  }

  atualizarCarrinho() {
    this.produtosService.getUsuario(JSON.parse(localStorage.getItem('user'))[CONSTANTS.originValue].id)
      .subscribe(res => {
        if (res && res.carrinho && res.carrinho.produtos) {
          this.carrinho = new Array<Produto>();
          res.carrinho.produtos.forEach(prod => {
            this.carrinho.push(prod);
          });
        }
      });
  }

}
