import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  template: `
    <app-loader></app-loader>
    <app-alert></app-alert>
    <router-outlet></router-outlet>`
  ,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mean snack webapp development';
  public ngOnInit() {

  }
}
