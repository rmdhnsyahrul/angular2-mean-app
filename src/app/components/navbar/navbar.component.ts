import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit() {
    $(document).ready(function(){
      $('#sidebar').toggleClass('active'); // auto hide side bar on first load
      $('a.navbar-brand').on('click', function (e) {
        e.preventDefault();
        $(this).find('i').toggleClass('fa-bars fa-times');
        $('#sidebar').toggleClass('active');
      });
      $('a.float').on('click', function(e){
        e.preventDefault();
      })
    });
  }

  onLogoutClick(){
    this.authService.logout();
    this.toasterService.pop('success', 'Success', 'You are logged out');
    setTimeout((router: Router) => {
      this.router.navigate(['/login']);
      return false;
    }, 1000)
  }
}
