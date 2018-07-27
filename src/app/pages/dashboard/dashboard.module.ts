import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { routing } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
// import { ProfileComponent } from '../../components/profile/profile.component';
import { FormDataComponent } from '../../components/form-data/form-data.component';

// new lazy loading book module
// import { BookModule } from '../book/book.module';
import { ProfileService } from '../../services/profile.service';

// file uploader with ng2-file-upload
import { FileUploadModule } from 'ng2-file-upload';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { Browser } from '../../../../node_modules/protractor';

import { FormTemplateComponent } from '../form_test/form-template/form-template.component';
// export const routes = [
//   { path: '', component: DashboardComponent, pathMatch: 'full' },
//   { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
//   { path: 'book', loadChildren: 'app/pages/book/book.module#BookModule'}
// ];

@NgModule({
  imports: [
    CommonModule,
    routing,
    // BookModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    // ProfileComponent,
    UploadImageComponent,
    FormDataComponent,
    FormTemplateComponent
  ],
  providers: [
    ProfileService
  ]
})

export class DashboardModule { }