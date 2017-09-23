import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import {LocalStorageService} from 'ngx-webstorage';


@Injectable()
export class ServerService {

  LoginResponse: {token: string, teamname: string, member1name: string, member2name: string, member3name: string };


  apiurl = 'http://akgec-scrolls.com/api/public/api/';

  constructor(private http: Http, private storage:LocalStorageService) {}

  submitForm(value: Object) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.apiurl+'register',value, {headers: headers});
  }

  getDomain() {
    return this.http.get(this.apiurl+'getdomains');
  }

  getTopic(id) {
    return this.http.get(this.apiurl+`getdomains/${id}/gettopics`);
  }

  getSynopsis() {
    return this.http.get(this.apiurl+`downloadsynopsis`);
  }

  asyncStudentNo(value: Object) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.apiurl+'checkstudentalreadyexist',value, {headers: headers});
  }

  asyncEmailCheck(value: Object) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.apiurl+'checkemailalreadyexist',value, {headers: headers});
  }

  Login(value: Object) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.apiurl+'login',value, {headers: headers});
  }

  onLogin(ResponsefromAPI) {
    this.LoginResponse = ResponsefromAPI;
    this.storage.store('storedsession', ResponsefromAPI);
  }

  RefreshResponse() {
  	return this.storage.retrieve('storedsession');
  }

  logOut(token) {
    this.storage.clear('storedsession');
    this.LoginResponse = null;
    return this.http.get(this.apiurl+'logout?token='+token);
  }

  isAuthenticated() {
   if (this.storage.retrieve('storedsession') == null) {
    return false;
    }
    return true;
  }

  SynopsisAlready(token) {
    return this.http.get(this.apiurl+'fileentryexist?token='+token);
  }

}

