import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenService, EsbResponse } from '../esb/access-token.service'

export interface RouteDetails {
  routeDetails: BusStops[]
}
export interface BusStops {
  gcf_id_pk: number
  gcf_poi_name: string
  Latitude: number
  Longitude: number
}

@Injectable()
export class BustopsService {

  private esb_access_url: string = "http://13.71.118.84:8282/t/demo.com/chatbotApi/1.0.0/chatbotapi"

  private busStopsUrl: string = "http://trinityitmsapi.azurewebsites.net/ITMS_CHATBOT_API/routeAction/getStops"

  constructor(private httpclient: HttpClient, private accesstokenService: AccessTokenService) {
  }

  public getBustopsList(): Observable<RouteDetails> {
    return new Observable<RouteDetails>(observer => {
      this.accesstokenService.getAccessToken().subscribe((data: EsbResponse) => {

        const access_token: string = data.access_token;
        console.log("get access token ", access_token)
        const httpOptions = {
          headers: new HttpHeaders({
            'content-Type': 'application/json',
            'authorization': `Bearer ${access_token}`,
            'cache-control': 'no-cache'
          })
        };

        const postBody = {
          "department": "ITMS",
          "service": "getStops"
        };

        return this.httpclient.post<RouteDetails>(this.esb_access_url, postBody, httpOptions)
        .subscribe((bustopsData: RouteDetails) => {
          console.log(bustopsData)
          observer.next(bustopsData);
          observer.complete()
        })
      });
    })
  }

  public getBustops(): Observable<RouteDetails> {
    return new Observable<RouteDetails>((observer) => {
        return this.httpclient.get<RouteDetails>(this.busStopsUrl)
        .subscribe((bustopsData: RouteDetails) => {
          console.log(bustopsData);
          observer.next(bustopsData);
          observer.complete();
        });
    });

  }


}
