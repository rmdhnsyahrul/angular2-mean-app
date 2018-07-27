import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from '../../shared/alert/alert.module';
import { LoaderModule } from '../../shared/loader/loader.module';
import { ProfileComponent } from '../../components/profile/profile.component';
import { ProfileService } from '../../services/profile.service';

const routes = [
  { path: '', component: ProfileComponent, pathMatch:'full' }
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
  declarations: [
    ProfileComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
