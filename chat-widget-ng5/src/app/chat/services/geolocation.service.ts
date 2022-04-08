import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'


@Injectable()
export class GeolocationService {

  constructor() {
   }

   public getGeoLocation(): any {
    return  new Observable(observer => {
      navigator.geolocation.getCurrentPosition(position => {
        observer.next(position)
      })
    })
    }
}
