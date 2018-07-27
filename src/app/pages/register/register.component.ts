import { Component, OnInit, NgModule } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
// import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';

import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  // public toasterOptions : ToasterConfig = new ToasterConfig({
  //   positionClass: 'toast-top-right',
  //   animation: 'fade',
  //   showCloseButton: true,
  //   timeout: 3000
  // });

  constructor(
    private validateService: ValidateService,
    // private toasterService: ToasterService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    // Required fields
    if(!this.validateService.validateRegister(user)){
      this.alertService.warn('Info', 'Please fill all required fields');
      return false;
    }

    // Validate email
    if(!this.validateService.validateEmail(user.email)){
      this.alertService.warn('Invalid Email', 'Please use valid email');
      return false;
    }

    this.authService.registerUser(user).then((result) => {
      let success = result['success'];
      if(success){
        this.alertService.success('Sukses', result['msg']);
        this.router.navigate(['/login']);
      } else {
        this.alertService.error('Error', result['msg']);
      }
      console.log(JSON.stringify(result));
    }, (err) => {
      console.log(err);
    })
  }
}