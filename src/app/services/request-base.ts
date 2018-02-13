import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class RequestBase extends RequestOptions {
  constructor() {
    super({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      })
    });
    //this.headers.append('CSRFTOKEN', document.getElementById('csrf-token').getAttribute('content'));
  }
}
