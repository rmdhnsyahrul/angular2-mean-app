import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpService } from '../shared/http.service'
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpService) { }

  registerUser(user) {
    let headers = new Headers;
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.post('/user/register', user, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  authenticateUser(user) {
    let headers = new Headers;
    headers.append('Content-type', 'application/json');
    
    return new Promise((resolve, reject) => {
      this.http.post('/user/authenticate', user, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  getProfile(){
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    
    return new Promise((resolve, reject) => {
      this.http.get('/user/profile', {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    return this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    const user = localStorage.getItem('user');
    this.userSignOut(user).then((result) => {
      console.log(JSON.stringify(result));
      
      this.authToken = null;
      this.user = null;
      localStorage.clear();
    })
  }

  userActive(user) {
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.post('/user/isActive', user, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  getActiveUsers() {
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.get('/user/isActive', {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  userSignOut(user) {
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.post('/user/inActive', user, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }
}
