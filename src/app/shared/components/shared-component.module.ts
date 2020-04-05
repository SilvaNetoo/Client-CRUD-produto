import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormErrorComponent } from './form-error/form-error.component';
import { ToastComponent } from './toast/toast.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    ToastComponent,
    FormErrorComponent,
    NavbarComponent
  ],
  exports: [
    ToastComponent,
    FormErrorComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
})
export class SharedComponentsModule { }
