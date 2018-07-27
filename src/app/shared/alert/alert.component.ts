import { Component, OnInit } from '@angular/core';
import {Alert, AlertType} from './alert';

import { AlertService } from './alert.service';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe(message => { 
      if(!message) {
        this.alerts = [];
        return;
      }
      this.alerts.push(message);

      // call a function to auto remove alert after 2 seconds
      setTimeout(() => {
        this.autoRemoveAlert(message);
     }, 3000)
    })
  }
  
  autoRemoveAlert(message) {
    this.alerts = this.alerts.filter(x => x !== message);
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert){
    if(!alert) return;
    switch(alert.type){
      case AlertType.Success:
        return 'toast toast-success';
      case AlertType.Error:
        return 'toast toast-error';
      case AlertType.Info:
        return 'toast toast-info';
      case AlertType.Warning:
        return 'toast toast-warning';
    }
  }
  iconClass(alert: Alert){
    if(!alert) return;
    switch(alert.type){
      case AlertType.Success:
        return 'toaster-icon icon-success';
      case AlertType.Error:
        return 'toaster-icon icon-error';
      case AlertType.Info:
        return 'toaster-icon icon-info';
      case AlertType.Warning:
        return 'toaster-icon icon-warning';
    }
  }
}
