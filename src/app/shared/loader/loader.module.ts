import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend, RequestOptions } from '@angular/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpService } from '../http.service';
import { httpServiceFactory } from '../../_factories/http-service.factory';
import { AngularReduxRequestOptions } from '../angular-redux-request.options';
import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [LoaderComponent],
  declarations: [
    LoaderComponent
  ]
})
export class LoaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoaderModule,
      providers: [
        LoaderService,
        {
          provide: HttpService,
          useFactory: httpServiceFactory,
          deps: [XHRBackend, RequestOptions, LoaderService ]    
        }
      ]
    }
  }
}