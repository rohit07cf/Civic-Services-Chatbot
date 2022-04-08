import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class HttpClientService {

  constructor(public http: Http) { }
  createAuthorizationHeader(headers: Headers) {
    headers.append('app-name', 'Citizen-Platform');
  }

  get(url) {

    const headers = new Headers();
    this.createAuthorizationHeader(headers);

    const observable = Observable.create(observer => {
      this.http.get(url, {}).subscribe(data => {
        observer.next(data);
      }, error => {
        console.log('bot apii err',error)
        observer.next(error);
      });
    });
    return observable;
  }

  post(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);

    const observable = Observable.create(observer => {
      // tslint:disable-next-line:no-shadowed-variable
      this.http.post(url, data, {}).subscribe((data) => {
        observer.next(data);
      }, error => {

      });
    });

    return observable;

  }

}
