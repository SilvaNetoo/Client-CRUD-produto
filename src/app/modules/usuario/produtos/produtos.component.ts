
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  productForm: FormGroup;
  public totalprice: number = 0;

  constructor(
    private produtosService: ProdutosService,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.criarForm();
    this.atualizarTela();
  }

  criarForm() {
    this.productForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      quantidade: ['', Validators.required],
    });
  }

  private atualizarTela() {
    this.carrinho = new Array<Produto>();
    this.buscarProdutos();
    // this.atualizarCarrinho();
  }

  buscarProdutos() {
    this.produtosService.get()
      .subscribe(res => {
        this.produtos = new Array<Produto>();
        res.forEach(prod => {
          this.produtos.push({
            id: prod.id,
            nome: prod.nome,
            preco: prod.preco,
            quantidade: prod.quantidade,
            qty: 0
          })
        })
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
          this.atualizarCarrinho(produto);
        }, err => {
          console.log('err', err);
        })
    }
  }

  atualizarCarrinho(produto) {
    this.produtosService.getUsuario(JSON.parse(localStorage.getItem('user'))[CONSTANTS.originValue].id)
      .subscribe(res => {
        if (res && res.carrinho && res.carrinho.produtos) {
          console.log('res', res);
          this.totalprice = this.totalprice + produto.preco;
          this.carrinho.push(produto);
          this.carrinho = this.carrinho.filter((elem, i, arr) => {
            if (arr.indexOf(elem) === i) {
              return elem
            }
          })
        }
      });
  }

  finalizar() {
    if (this.productForm && this.productForm.value) {

      console.log('prod', this.productForm.value);


      this.produtosService.post(this.productForm.value)
        .subscribe(res => {
          console.log('produto POST', res);

          this.atualizarTela();
        }, err => {
          console.log('err', err);
        });
    }
  }

  public addToCart(product) {
    if (product.qty === product.quantidade) {
      console.log('Product is out of Stock.');
    } else {
      product.qty = product.qty + 1;
      this.adicionarProduto(product);
    }
  }

  increment(product) {
    if (product.qty >= 0 && product.qty < product.quantidade) {
      product.qty = product.qty + 1;
      product.cartprice = product.cartprice + product.preco;
      this.totalprice = this.totalprice + product.preco;
    }
  }

  decrement(product) {
    if (product.qty > 0 && product.qty <= product.quantidade) {
      product.qty = product.qty - 1;
      product.cartprice = product.cartprice - product.preco;
      this.totalprice = this.totalprice - product.preco;
    }
  }

}
