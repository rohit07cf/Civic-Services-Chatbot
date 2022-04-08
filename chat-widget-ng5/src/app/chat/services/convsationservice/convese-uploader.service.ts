import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UiMessage } from '../../shared/model/message';

@Injectable()
export class ConveseUploaderService {

  constructor(private httpclient: HttpClient) { }

  public uploadConversation(chatUrl: string , messages :UiMessage[] , grevanceId: string , userProfile: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const postBody = {
     messages : messages,
     grevanceId: grevanceId,
     userProfile: userProfile
      };
    return this.httpclient.post<any>(chatUrl, postBody, httpOptions)
  }
}
