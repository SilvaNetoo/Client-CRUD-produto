import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro.component';
import { CadastroService } from './service/cadastro.service';
import { SharedComponentsModule } from 'src/app/shared/components/shared-component.module';

const routes: Routes = [
  { path: '', component: CadastroComponent }
];

@NgModule({
  declarations: [CadastroComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CadastroService
  ]
})
export class CadastroModule { }
