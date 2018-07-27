import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './register.component';

import { AlertModule } from '../../shared/alert/alert.module';
import { LoaderModule } from '../../shared/loader/loader.module';

const routes = [
  { path: '', component: RegisterComponent, pathMatch:'full' }
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
  declarations: [RegisterComponent]
})
export class RegisterModule { }
