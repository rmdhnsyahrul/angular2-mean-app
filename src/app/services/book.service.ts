import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpService } from '../shared/http.service'
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class BookService {
  authToken: any;
  book: any;

  constructor(private http:HttpService) {}

  // getAllBooks() {
  //   return new Promise((resolve, reject) => {
  //     this.http.get('/')
  //       .map(res => res.json())
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }
  getAllBooks(){
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    
    return new Promise((resolve, reject) => {
      this.http.get('/book', {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  showBook(id) {
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.get('/book/' + id, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveBook(data) {
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.post('/book', data, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  updateBook(id, data) {
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.put('/book/' + id, data, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        },(err) => {
          reject(err);
        })
    })
  }

  deleteBook(id) {
    let headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    
    return new Promise((resolve, reject) => {
      this.http.delete('/book/' + id, {headers: headers})
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
