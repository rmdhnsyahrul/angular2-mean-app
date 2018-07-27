import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import {Alert, AlertType} from './alert';

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = true;
                } else {
                    // clear alert
                    this.clear();
                }
            }
        });
    }
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
    success(title: string, message: string, keepAfterNavigationChange = true){
        this.alert(AlertType.Success, title, message, keepAfterNavigationChange);
    }
    error(title: string, message: string, keepAfterNavigationChange = false){
        this.alert(AlertType.Error, title, message, keepAfterNavigationChange);
    }
    info(title: string, message: string, keepAfterNavigationChange = false){
        this.alert(AlertType.Info, title, message, keepAfterNavigationChange);
    }
    warn(title: string, message: string, keepAfterNavigationChange = false){
        this.alert(AlertType.Warning, title, message, keepAfterNavigationChange);
    }
    alert(type: AlertType, title: string, message: string, keepAfterNavigationChange = false){
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next(<Alert>{type: type, title: title, message: message})
    }
    clear() {
        // clear alerts
        this.subject.next();
    }
//   success(message: string, keepAfterNavigationChange = true) {
//       this.keepAfterNavigationChange = keepAfterNavigationChange;
//       this.subject.next({ type: 'success', text: message });
//     //   setTimeout((routes:Routes) => { // not working after set alert message to array
//     //     this.clear();
//     //   }, 5000);
//   }

//   error(message: string, keepAfterNavigationChange = true) {
//       this.keepAfterNavigationChange = keepAfterNavigationChange;
//       this.subject.next({ type: 'error', text: message });
//   }

//   getMessage(): Observable<any> {
//       return this.subject.asObservable();
//   }
}