import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../service/produtos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manipular-produto',
  templateUrl: './manipular-produto.component.html',
  styleUrls: ['./manipular-produto.component.css']
})
export class ManipularProdutoComponent implements OnInit {

  manipularForm: FormGroup;
  parametro: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private produtosService: ProdutosService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.criarForm();
    this.activatedRoute.params.subscribe(param => {
      if (param && param['id']) {
        this.parametro = param['id'];
        this.produtosService.getById(param['id']).subscribe(prod => {
          this.manipularForm.setValue(prod);
        }, err => {
          console.log('err', err);
        });
      }
    })
  }

  criarForm() {
    this.manipularForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required]
    });
  }

  finalizar() {
    if (this.parametro) {
      this.produtosService.put(this.manipularForm.value, this.parametro)
        .subscribe(res => {
          console.log('res', res);
          this.router.navigate(['v1/produtos']);
        }, err => {
          console.log('err', err);
        });
    } else {
      this.produtosService.post(this.manipularForm.value)
        .subscribe(res => {
          console.log('res', res);
          this.router.navigate(['v1/produtos']);
        }, err => {
          console.log('err', err);
        });
    }
  }

  redirecionarParaListarProd() {
    this.router.navigate(['v1/produtos']);
  }

}
