import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { routes } from './login.module';
import { AlertService } from '../../shared/alert/alert.service';
// import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService,
    // private loaderService: LoaderService
  ) { }

  ngOnInit() {
    // check logged in user
    var auth = this.authService.loadToken();
    if(auth){
      this.router.navigateByUrl('/app');
    }
    
    // get return url from route parameters or default to '/dshboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] === undefined ? '/app' : this.route.snapshot.queryParams['returnUrl'];  
  }

  onLoginSubmit(){
    // Required fields
    if(!this.validateService.validateLogin(this.model)){
      this.alertService.error('Error', 'Please fill all required fields');
      return false;
    }
    
    this.authService.authenticateUser(this.model).then((result) => {
      if (result['success']) {
        this.authService.storeUserData(result['token'], result['user']);
        this.authService.userActive(result['user']);
        this.alertService.success('Success', result['msg']);
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.alertService.error('Error',result['msg']);
        this.router.navigate(['/login']);
      }
    }, (err) => {
      console.log(err);
    })
  }
}
