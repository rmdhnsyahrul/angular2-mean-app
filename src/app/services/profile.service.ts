import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpService } from '../shared/http.service'
import 'rxjs/add/operator/map';
import { Options } from '../../../node_modules/@types/selenium-webdriver/firefox';

@Injectable()
export class ProfileService {
  authToken: any;
  body: any;

  constructor(private http: HttpService) { }

  uploadImage(body){
    let headers = new Headers();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post('/upload/img', body, options)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  updateUser(id, data) {
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.put('/user/' + id, JSON.stringify(data), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        },(err) => {
          reject(err);
        })
    })
  }

  setProfilePicture(id, data){
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.put('/user/image/' + id, data, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        },(err) => {
          reject(err);
        })
    })
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    return this.authToken = token;
  }
}
