import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
// import { ProfileComponent } from '../../components/profile/profile.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { FormDataComponent } from '../../components/form-data/form-data.component';
import { FormTemplateComponent } from '../form_test/form-template/form-template.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full'},
    // { path: 'profile', component: ProfileComponent },
    { path: 'upload', component: UploadImageComponent },
    { path: 'formdata', component: FormDataComponent },
    { path: 'form-test', component: FormTemplateComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);