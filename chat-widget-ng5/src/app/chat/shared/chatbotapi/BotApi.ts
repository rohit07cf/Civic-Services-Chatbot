import { Observable } from 'rxjs'

  export interface ChatBotApi extends bot.UserProfileProvider, bot.LocationProvider,bot.navigateBack,
    bot.agentFallBackHandler, bot.FileUploadService ,bot.LocalOrPublic,
    bot.IncidentDetails, bot.navigateToMap, bot.BookParkingTicket, bot.UrlProvider,
    bot.NavigateToPhoneDialler,bot.NavigatePage  {
}

 export namespace bot {
    export  interface LocationProvider {
      getCurrentLocation(): Observable<any>
      getLocationMarkonMap(): Observable<any>
    }

    export interface UserProfileProvider {
      userName: string
      userId: string
      phoneNumber: string
      email: string
      profilePicUrl: string
      tenantId: string
      electricityAccNo: string,
      changeUsername(username): void
    }

    export interface navigateBack {
      onNavigateBack(): void
    }

    export interface agentFallBackHandler{
      onFallbackToAgent(): void
    }

    export interface UrlProvider {
      rasaCoreUrl: string;
      rasaUiUrl: string;
      cepServerUrl: string;
      // ngCADUrl: string;
    }

    export interface FileUploadService {
      attachMents():Observable<any>
      uploadUrl:string
      isMobile: boolean
    }

    export interface LocalOrPublic {
      isLocal : boolean;
      public_ip: string
      localIP: string;
    }

    export interface IncidentDetails {
      incidentId: string;
      grievanceId: string;
      status: string;
      type: string;
      subType: string;
      name: string;
      sourceType: string;
      showIncidentDetailsInfo( incident: IncidentDetails):any
      showIncidentDetails()
    }
   export interface navigateToMap {
     fromLat: number
     fromLong: number
     toLat: number
     toLong: number
     showonMap(fromLat,fromLong,toLat,toLong),
     ngCadEventDetails(details)

   }

   export interface BookParkingTicket {
     bookParkingTicket(locationId, latitude, longitude, selectedType);
   }

   export interface NavigateToPhoneDialler {
    dialNo(phoneNo);
   }

   export interface NavigatePage {
      navigateToFeedbackPage();
   }

  }

