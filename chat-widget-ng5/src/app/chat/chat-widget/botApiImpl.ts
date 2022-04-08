import { ChatBotApi, bot } from '../shared/chatbotapi/BotApi'
import { Observable } from 'rxjs'
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { FileUploaderService } from '../services/fileuploader/file-uploader.service';

declare var google: any;

export class BotImpl implements ChatBotApi {

  constructor() {

    // console.log('::::::   sdcsdcdscdscdcds ::::: ', this.router.snapshot.paramMap.get("username"));
  //   this.route.queryParams.subscribe(params => {
  //     this.userName = params['userName'];
  //     this.userId = params['userId'];
  // });

    console.log(':::: userName ::::  ', this.userName);

    console.log(':::: userId ::::  ', this.userId);
    
  }

  // constructor(routes) {

  // }

  changeUsername(username: any) {
    this.userName = username;
  }
  //    http://localhost:4200/?userName=pramod&userId=12
  userName: string = 'Guest';
  userId: string = '13';
  phoneNumber: string = "9898765409";
  email: string = '';

  electricityAccNo: string;

  // locationId: number;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
  incidentId: string;
  grievanceId: string;
  status: string;
  type: string;
  subType: string;
  name: string;
  sourceType: string;

  // chatbotServerUrl: string = (location.protocol === 'https:' ? 'wss' : 'ws') + '://' +  'localhost:3000'// + 40.81.72.252 localhost,;'13.71.95.148:3000'
  // cepServerUrl: string = 'http://192.168.2.217:8080/CitizenEngagement/';
  
  cepServerUrl: string = 'http://123.201.255.65:8582/CEPWebService/';
  //cepServerUrl: string = 'http://10.9.76.48:8085/CEPWebService/';
  
  //rasaCoreUrl = 'http://10.9.76.10:6005/webhooks/rest/webhook'; // T&D CHENNAI
  rasaCoreUrl = 'http://localhost:5005/webhooks/rest/webhook';
   //rasaCoreUrl = 'http://10.9.76.54:6005/webhooks/rest/webhook';
  
 rasaUiUrl: string = 'http://192.168.14.47:5001/';
  //rasaUiUrl: string = 'http://192.168.14.47:5001/';
  //rasaCoreUrl = 'http://192.168.1.124:6005/webhooks/rest/webhook';
  // ngCADUrl = 'http://192.168.14.196:8080/cad_cloud_rest_server/';




  tenantId: string = '5';
  isMobile: boolean = false;
  isLocal: boolean = false;
  public_ip: string = location.hostname;
  localIP: string = location.hostname;
  //uploadUrl: string =  'http://115.124.111.31:85/'; //'http://115.124.111.31:85/fileUpload/';//'http://192.168.8.201:98/fileUpload/'; //  'http://192.168.1.59:7070/';
  //uploadUrl: string =  'http://192.168.8.201:98/fileUpload/';
  uploadUrl: string =  'http://115.124.111.113:85/fileUpload/';
  profilePicUrl: string = this.uploadUrl + 'chatBot/default_user.png';

  getCurrentLocation(): Observable<any> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition((position: any) => {
        console.log(":::::: getCurrentPosition  :::::::" , position);

        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // let request = { latLng: latlng };
        
        geocoder.geocode({'location': latlng}, (results, status) => {
          console.log(':::: STATUS ::: ', status);
          console.log(':::: results ::: ', results);
          if('OK' == status) {
            let response = {
              address: results[0].formatted_address,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            observer.next(response);
          } else {
            observer.next(position.coords);
          }
          // read data from here
       });
      });
    })
  }

  getCurrentLocation1(): Observable<any> {
    console.log(":::::: hiiuufehefhwfwe 3333333333:::::::");
    return new Observable((observer) => {
      let retnObj = {
        address: 'Corniche Al Latheef 25, Cunningham Rd Shivaji NagarBengaluru, Karnataka 560052 ',
        latitude: 12.9837133,
        longitude: 77.5970004
      }
      observer.next(retnObj);
      // navigator.geolocation.getCurrentPosition((position) => {
      //   console.log(":::::: hiiuufehefhwfwe11111111111 :::::::", position);
      //   observer.next(position.coords)
      // }, this.onError, { timeout: 30000 });
    });
  }

  onError() {
    console.error("::: :ERROR IN getting location ::::::::: ");
  }

  getLocationMarkonMap(): Observable<any> {
    throw new Error('Method not implemented.')
  }

  onNavigateBack(): void {
    throw new Error("Method not implemented.");
  }

  onFallbackToAgent(): void {
    console.log(":::::: On Fall back Agent called !!!!");
    // throw new Error("Method not implemented.");
  }

  picImage(): Observable<any> {


    

    throw new Error("Method not implemented.");
  }

  showIncidentDetailsInfo(incident: bot.IncidentDetails) {
    console.log('::: IMPL  :::: showIncidentDetailsInfo ::: ', incident);
  }

  showonMap(fromLat: any, fromLong: any, toLat: any, toLong: any) {
    console.log('::: IMPL  :::: showonMap :: fromLat  ', fromLat,':: fromLong::',fromLong,':::: toLat :::',toLat,':::::toLong :::  ',toLong);
  }

  ngCadEventDetails(details: any) {
    console.log('::: IMPL  :::: ngCadEventDetails ::  ', details);
  }

  bookParkingTicket(locationId: any) {
    console.log(":::::: bookParkingTicket ::::: ",locationId);
  }

  showIncidentDetails() {
    throw new Error("Method not implemented.");
  }
  dialNo(phoneNo: any) {
    throw new Error("Method not implemented.");
  }
  navigateToFeedbackPage() {
    throw new Error("Method not implemented.");
  }

  attachMents(): Observable<any> {
    throw new Error("Method not implemented.");
    // try {
    //   return new Observable((observer) => {
    //     var fileinput = document.createElement("INPUT");
    //     fileinput.setAttribute("type", "file");
    //     fileinput.setAttribute("id", "myfile");
    //     document.getElementById("myfile").style.display = "none";
    //     document.body.appendChild(fileinput);
    //     document.getElementById("myfile").click();
    //     document.addEventListener('input', (fileEvent: any) => {
    //         if (fileEvent.target.files && fileEvent.target.files[0]) {
    //           let file = fileEvent.target.files[0];
    //           new FileUploaderService()
    //           .uploadFileForPortal(file, { uploadUrl: this.uploadUrl })
    //             .subscribe((update) => {
    //               switch (update.type) {
    //                 case 'progress':
    //                   console.log('progress', update.progress);
    //                   break;
    //                 case 'file':
    //                   console.log('file', JSON.stringify(update.file));
    //                   const files: any[] = [];
    //                   files.push(update.file);
    //                   console.log(':::: FILES ::::::: ', files);
    //                   if(files && files.length > 0) {

    //                     observer.next(files);
    //                     observer.complete();
    //                   }
    //               }
    //             });
    //         }
    //         document.
    //       });

    //   });
    // } catch (error) {
    //   console.error(error);
    // }

  }


}
