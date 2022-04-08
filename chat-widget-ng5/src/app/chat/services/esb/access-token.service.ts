import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenService {

  private _auth_key: string = "bEJMdHVQMThYMGZkeGV3S09SbklQVF9SZkFFYTp3dHA5SEZxczJVM1JzZkpNUWszTnh2eGZ4Q29h"
  private esb_auth_url: string = "http://13.71.118.84:8001/TrinityRestApi/rest/wso2services/getAccessToken"

  constructor(private httpclient: HttpClient) { }

  getAccessToken(): Observable<EsbResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const postBody = {
      "authorizationKey": "bEJMdHVQMThYMGZkeGV3S09SbklQVF9SZkFFYTp3dHA5SEZxczJVM1JzZkpNUWszTnh2eGZ4Q29h",
      "password": "123456",
      "username": "citizensub@demo.com"
      };
    return this.httpclient.post<EsbResponse>(this.esb_auth_url, postBody, httpOptions)
  }

}

export interface EsbResponse {
  access_token: string
  scope: string
  token_type: string
  expires_in: number
}

