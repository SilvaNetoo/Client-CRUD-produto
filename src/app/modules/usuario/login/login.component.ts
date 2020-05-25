import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { CONSTANTS } from 'src/app/shared/constantes/constantes';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showModal: boolean;
  title: string;
  message: string;
  loginForm: FormGroup;
  presentFieldErrors;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      id: [null],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      senha: ['', Validators.compose([
        Validators.required,
        Validators.minLength(CONSTANTS.minLengthPassword),
        Validators.maxLength(CONSTANTS.maxLengthPassword)
      ])]
    });
  }

  finish() {
    (!this.loginForm.valid)
      ? this.presentFieldErrors = true
      : this.login();
  }


  login(): void {
    this.loginService.get(this.loginForm.value)
      .subscribe(res => {
        if (res && res[CONSTANTS.originValue]) {
          localStorage.setItem('user', JSON.stringify(res));
          alert('Usuario logado com sucesso!')
        } else {
          this.buildMessageError('Erro!', 'Usuário não encontrado na pesquisa, por favor realize o cadastro no sistema.')
        }
      }, err => {
        console.error(err);
      })
  }


  buildMessageError(title: string, message: string): void {
    this.showModal = true;
    this.title = title;
    this.message = message;
  }

  getClose(event): void {
    this.showModal = event;
  }

}
