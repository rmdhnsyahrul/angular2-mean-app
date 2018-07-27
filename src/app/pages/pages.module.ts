import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages-routing.module';

import { ToasterModule } from 'angular2-toaster';

import { PagesComponent } from './pages.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidemenuComponent } from '../components/sidemenu/sidemenu.component';
// import { FormTemplateComponent } from './form_test/form-template/form-template.component';
// import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule,
    routing
  ],
  declarations: [
    PagesComponent,
    NavbarComponent,
    SidemenuComponent,
    // FormTemplateComponent,
    // UploadImageComponent
  ]
})
export class PagesModule { }
