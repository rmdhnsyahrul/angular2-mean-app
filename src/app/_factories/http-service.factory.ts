import { XHRBackend } from '@angular/http';
import { AngularReduxRequestOptions } from '../shared/angular-redux-request.options';
import { HttpService } from '../shared/http.service';
import { LoaderService } from '../shared/loader/loader.service';

function httpServiceFactory(backend: XHRBackend, options: AngularReduxRequestOptions, loaderService: LoaderService ) {
    return new HttpService(backend, options, loaderService);
}

export { httpServiceFactory };