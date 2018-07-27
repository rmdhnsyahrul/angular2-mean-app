import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name === undefined || user.username === undefined || user.email === undefined || user.password === undefined){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return true;
    } else {
      return false;
    }
  }

  validateLogin(user){
    if(user.username === undefined || user.password === undefined){
      return false;
    } else {
      return true;
    }
  }
}
