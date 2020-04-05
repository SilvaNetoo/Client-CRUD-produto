import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/shared/constantes/constantes';
import { CadastroService } from './service/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  presentFieldErrors;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CadastroService
  ) {
    this.createForm();
  }

  ngOnInit() { }

  private createForm(): void {
    this.cadastroForm = this.fb.group({
      id: [null],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      senha: ['', Validators.compose([
        Validators.required,
        Validators.minLength(CONSTANTS.minLengthPassword),
        Validators.maxLength(CONSTANTS.maxLengthPassword)
      ])],
    });
  }

  finish() {
    (!this.cadastroForm.valid)
      ? this.presentFieldErrors = true
      : this.cadastro();
  }

  cadastro(): void {
    this.service.post(this.cadastroForm.value)
      .subscribe(res => {
        this.router.navigate(['usuario/login'])
      }, err => {
        console.log(err)
      });
  }

}
