import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ValidateService } from '../../services/validate.service';
// import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component'; // component that will load as a view & a controller

import { AlertModule } from '../../shared/alert/alert.module';
import { LoaderModule } from '../../shared/loader/loader.module';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AlertModule,
    LoaderModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
