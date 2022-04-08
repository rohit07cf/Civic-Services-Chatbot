import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, OnDestroy, Output } from '@angular/core';

import { Subject, Subscription, Observable } from 'rxjs';
import { Message, UiMessage } from '../shared/model/message';
import { User } from '../shared/model/user';
import { ChatBotApi } from '../shared/chatbotapi/BotApi';
import { BotImpl } from './botApiImpl';
import { BotServiceEnum } from '../enums/bot-service-enum.enum';
import { CommonService } from '../services/common-services/common.service';
import {
  ActionType, ActionElectricityService, ActionGarbageService, ActionWaterService,
  ActionGreetSuggestionService,
  ActionTransportService
} from '../enums/actionTypeEnum';
import { RasaConnectorService } from '../services/rasaconnector/rasa-connector.service';
import { MessageService } from '../services/message/message.service';
import { AttachmentTypes, MessageType } from '../enums/input-type.enum';
import { ActivatedRoute } from '@angular/router';

// import { startWith } from 'rxjs/operator/startWith';
// import { map } from 'rxjs/operator/map';
// import { FormControl } from '@angular/forms';

const rand = (max: number) => Math.floor(Math.random() * max);

@Component({

  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget-mobiletheme.scss', './chat-widget.component.css', './chat-widget.component.scss',
    './deeppurple-amber.css']
})

export class ChatWidgetComponent implements OnInit {

  constructor(private commonService: CommonService, private rasaConnectorService: RasaConnectorService, 
    private router: ActivatedRoute, private messageService: MessageService) {
      
      // alert('::::HII  :::::  ');
      // console.log('::::::  MY USERNAME ::::: ', this.router.snapshot.paramMap.get("username"));
      // alert('::::HELLLO    :::::  '+ this.router.snapshot.paramMap.get("username"));
      // this.router.queryParams.subscribe(params => { 
      //   console.log('inside constructor::::::',params.username)  
      //  this.chatbotapi.changeUsername(params.username);
      // });
    }

  ActionType = ActionType;
  AttachmentTypes = AttachmentTypes;
  ActionElectricityService = ActionElectricityService;
  ActionGarbageService = ActionGarbageService;
  ActionWaterService = ActionWaterService;
  MessageType = MessageType

  @ViewChild('bottom') bottom: ElementRef;
  @Input() public theme: 'blue' | 'grey' | 'red' | 'mobile' = 'mobile';
  @Input() public newMessage: Message;
  @Input() public chatbotapi: ChatBotApi = new BotImpl();
 

  messageSubscription: Subscription;
  connectionSubscription: Subscription;

  public focus = new Subject();
  defaultHeight = 0;


  public operator = {
    name: 'City Chatbot',
    status: 'online',
    avatar: this.chatbotapi.uploadUrl + 'chatBot/botavatar.png'
  };

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  };
  conversation = [];
  public messages: UiMessage[] = [];

  helpOptions = [
    {
      serviceId: BotServiceEnum.REPORTINCIDENT,
      header: 'Report Complaint',
      title1: 'Report an Complaint in my location',
      title2: 'Report an issue',
      img: this.chatbotapi.uploadUrl + 'chatBot/question.png',
      alt: 'Question',
      width: 50
    },
    {
      serviceId: BotServiceEnum.RECENTHISTORY,
      header: 'Reported Complaints',
      title1: 'Get Information Of your previously reported complaints',
      title2: 'Reported complaints updated information',
      img: this.chatbotapi.uploadUrl + 'chatBot/history.png',
      alt: 'History',
      width: 50
    },
    {
      serviceId: BotServiceEnum.WASTEMANAGEMENT,
      header: 'Waste Management',
      title1: 'Report waste problem',
      title2: 'Information about garbage vehicle schedule etc',
      img: this.chatbotapi.uploadUrl + 'chatBot/garbage/waste.png',
      alt: 'Waste',
      width: 60
    },
    {
      serviceId: BotServiceEnum.WATER,
      header: 'Water',
      title1: 'Report water problem',
      title2: 'Request new water connection etc',
      img: this.chatbotapi.uploadUrl + 'chatBot/water/water.png',
      alt: 'Water',
      width: 50
    },
    {
      serviceId: BotServiceEnum.ELECTRICITY,
      header: 'Electricity',
      title1: 'Explore electricity services',
      title2: 'Report electricity complaint',
      img: this.chatbotapi.uploadUrl + 'chatBot/electricity/electricity.png',
      alt: 'Electricity',
      width: 50
    },
    {
      serviceId: BotServiceEnum.WEATHER,
      header: 'Weather',
      title1: 'Get current weather information',
      title2: 'Get weather forecast Information of your city',
      img: this.chatbotapi.uploadUrl + 'chatBot/weather/weather.png',
      alt: 'Weather',
      width: 50
    },
    {
      serviceId: BotServiceEnum.PARKING,
      header: 'Parking',
      title1: 'Get parking information near your location',
      title2: 'Information about parking cost and availability slot Information',
      img: this.chatbotapi.uploadUrl + 'chatBot/park.png',
      alt: 'Parking',
      width: 50
    },
    {
      serviceId: BotServiceEnum.TRANSPORT_SERVICE,
      header: 'Transport',
      title1: 'Get Information of nearest busstops',
      title2: 'Information of bus schedules',
      img: this.chatbotapi.uploadUrl + 'chatBot/itms/itms.png',
      alt: 'Transport',
      width: 50
    },
    {
      serviceId: BotServiceEnum.ENVIRONMENT,
      header: 'Environment',
      title1: 'Get information of variations in the environment',
      title2: 'Information about air quality details',
      img: this.chatbotapi.uploadUrl + 'chatBot/envi.png',
      alt: 'Environment',
      width: 50
    },
    {
      serviceId: BotServiceEnum.OPERATORCHAT,
      header: 'Chat',
      title1: 'Chat with operator agent to the updates of incidents',
      title2: 'operator chat to instant information',
      img: this.chatbotapi.uploadUrl + 'chatBot/chat.png',
      alt: 'Chat',
      width: 50
    }];

  electricityServices = [
    {
      serviceName: 'Report an electricity problem',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/electricity/reportelectricity.png',
      width: '50',
      height: '45',
      serviceId: ActionElectricityService.REPORT_ELECTRICITY_PROBLEM
    },
    {
      serviceName: 'New electricity connection',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/electricity/newelectricity.png',
      width: '50',
      height: '45',
      serviceId: ActionElectricityService.NEW_ELECTRICITY_CONNECTION
    },
    {
      serviceName: 'Nearby electricity offices',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/electricity/electricityoffice.png',
      width: '50',
      height: '45',
      serviceId: ActionElectricityService.NEARBY_ELECTRICTY_OFFICES
    },
    {
      serviceName: 'Electricity bill payment',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/electricity/electricitybill.png',
      width: '50',
      height: '45',
      serviceId: ActionElectricityService.ELECTRICITY_BILL_PAYMENT
    },
    {
      serviceName: 'Electricity authorities contact details',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/electricity/contacts.png',
      width: '45',
      height: '45',
      serviceId: ActionElectricityService.ELECTRICITY_AUTH_CONTACT_DETAILS
    }
  ];

  garbageServices = [
    {
      serviceName: 'Report garbage problem',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/garbage/reportincident.png',
      width: '50',
      height: '45',
      serviceId: ActionGarbageService.REPORT_GABAGE_PROBLEM
    },
    {
      serviceName: 'Garbage pickup timings',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/garbage/pick_up_time.png',
      width: '50',
      height: '45',
      serviceId: ActionGarbageService.GARBAGE_PICK_UP_TIMINGS
    },
    {
      serviceName: 'Nearest garbage bin location',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/garbage/nearbinloc.png',
      width: '50',
      height: '45',
      serviceId: ActionGarbageService.NEAREST_BIN_LOC
    },
    {
      serviceName: 'Request for paid garbage collection',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/garbage/pickup_garbage.png',
      width: '50',
      height: '45',
      serviceId: ActionGarbageService.PAID_GARBAGE_SERVICE
    },
    {
      serviceName: 'Solid waste management authorities contact details',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/garbage/contacts.png',
      width: '40',
      height: '45',
      serviceId: ActionGarbageService.GARBAGE_AUTH_CONTACT_DETAILS
    }
  ];

  waterServices = [
    {
      serviceName: 'Report water problem',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/water/reportwater.png',
      width: '50',
      height: '45',
      serviceId: ActionWaterService.REPORT_WATER_PROBLEM
    },
    {
      serviceName: 'Water Schedule timings',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/water/time.png',
      width: '50',
      height: '45',
      serviceId: ActionWaterService.WATER_SCHEDULE_TIME
    },
    {
      serviceName: 'Request new water connection',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/water/newconn.png',
      width: '50',
      height: '45',
      serviceId: ActionWaterService.NEW_WATER_CONNECTION
    },
    {
      serviceName: 'Water supply on special request (paid service)',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/water/rupee.png',
      width: '50',
      height: '45',
      serviceId: ActionWaterService.PAID_WATER_SERVICE
    },
    {
      serviceName: 'Water management authorities contact details',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/water/contacts.png',
      width: '40',
      height: '45',
      serviceId: ActionWaterService.WATER_AUTH_CONTACT_DETAILS
    }
  ];

  transportServices = [
    {
      serviceName: 'Nearest Bus Stops',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/itms/bustop.png',
      width: '40',
      height: '40',
      serviceId: ActionTransportService.BUSSTOPSLIST
    },
    {
      serviceName: 'Nearest Bus Depot',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/itms/busdepot.png',
      width: '40',
      height: '45',
      serviceId: ActionTransportService.BUSDEPOTLIST
    },
    {
      serviceName: 'Bus Number Details',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/itms/bus.png',
      width: '40',
      height: '45',
      serviceId: ActionTransportService.BUSTRIPDETAILS
    },
    {
      serviceName: 'Bus Route Details',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/itms/busroute.jpg',
      width: '40',
      height: '45',
      serviceId: ActionTransportService.BUS_ROUTE_INFO
    },
    {
      serviceName: 'Transportation authorities contact details',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/water/contacts.png',
      width: '40',
      height: '45',
      serviceId: ActionTransportService.BUS_AUTH_CONTACT_DETAILS
    }
  ];

  greetSuggestionServices = [

    {
      serviceName: 'Explore More',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/common/more_info.png',
      width: '30',
      serviceId: ActionGreetSuggestionService.EXPLORE_MORE
    },

    {
      serviceName: 'Weather Info',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/weather/17.png',
      width: '50',
      serviceId: ActionGreetSuggestionService.WEATHER_INFO
    },
    {
      serviceName: 'Report Complaint',
      serviceImage: this.chatbotapi.uploadUrl + 'chatBot/question.png',
      width: '30',
      serviceId: ActionGreetSuggestionService.REPORT_INCIDENT
    }

  ]

  public _visible = true;
  isTyping = false;
  currentuser: User;

  // filteredOptions: Observable<string[]>;
  // myControl = new FormControl();
  // options: string[] = [];

  public get visible() {
    return this._visible;
  }


  @Input() public set visible(visible) {
    this._visible = visible;
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom();
        this.focusMessage();
      }, 0);
    }
  }

  ngOnInit() {
    console.log('inside ngOnInit::::::')
    this.initializeUserInfo();
    this.intializeAvatar();
    this.newMessage = { buttons: [] } as Message;
    this.intializeChatConversation(this.currentuser);
    setTimeout(() => this.visible = true, 1000);

    // this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}


  initializeUserInfo() {
    let user: User;
    console.log('UserName:::::',this.chatbotapi.userName);
    // console.log(':::: this.router.snapshot.paramMap.get("username");  :::: ', this.router.snapshot.paramMap.get("username"));
    this.chatbotapi.userName = this.findGetParameter('username');
    this.chatbotapi.phoneNumber = this.findGetParameter('phoneNumber');

    if( !this.chatbotapi.userName) {
      this.chatbotapi.userName = 'Guest';
      this.chatbotapi.phoneNumber = '1234567893';
    }
    // this.chatbotapi.tenantId=
    // this.chatbotapi.userName = this.router.snapshot.paramMap.get("username");
    // this.chatbotapi.userName = this.router.snapshot.paramMap.get("userid");
    user = {
      id: this.chatbotapi.userId,
      name: this.chatbotapi.userName,
      phoneNo: this.chatbotapi.phoneNumber,
      timezone_offset: new Date().getTimezoneOffset(),
      tenantId: this.chatbotapi.tenantId,
      cepServerUrl: this.chatbotapi.cepServerUrl,
      electricityAccNo: this.chatbotapi.electricityAccNo,
      // ngCADUrl:this.chatbotapi.ngCADUrl
    } as User;

    this.currentuser = user;
    console.log(':::: USER INFO ::::: ', this.currentuser);
  }

  intializeAvatar() {
    try {

      /* Intialize Client profile icon */
      this.client.avatar = this.chatbotapi.profilePicUrl;

      if (!this.chatbotapi.isLocal) {
        this.client.avatar = this.client.avatar.replace(this.chatbotapi.localIP, this.chatbotapi.public_ip);
        this.operator.avatar = this.operator.avatar.replace(this.chatbotapi.localIP, this.chatbotapi.public_ip);
      } else {
        this.client.avatar = this.client.avatar.replace(this.chatbotapi.public_ip, this.chatbotapi.localIP);
        this.operator.avatar = this.operator.avatar.replace(this.chatbotapi.public_ip, this.chatbotapi.localIP);
      }

    } catch (error) {
      console.error(error);
    }
  }

  intializeChatConversation(user: User) {
    try {
      const userObj = {
        name: user.name,
        phoneNo: user.phoneNo,
        tenentId: user.tenantId,
        cepServerUrl: user.cepServerUrl,
        electricityaccno: user.electricityAccNo,
        ngCADUrl: user.ngCADUrl
      };
      const messageToCore = `/greetings_hello` + JSON.stringify(userObj);
      this.sendToRasa(messageToCore, user);
    } catch (error) {
      console.error(error);
    }
  }

  processReceivedMessage(message: Message) {
    console.log(':::::: LISTENER MESSAGE :::::::', message);
    try {
      this.newMessage = message;
      if (message.text) {
        if (message.text !== 'skipmessage') {
          this.addMessage(this.operator, message.text, 'received', MessageType.TEXT, undefined, undefined, null);
        }
      }
      /* Action */
      if (message.attachment) {
        console.log(':::::: ATTACHMENT GOT IS  :::::: ', message.attachment);
        this.addActionToView(message.attachment, message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage();
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat();
    }
  }

  getStatusStyle(status: any) {
    let statusCss = '';
    try {
      statusCss = this.commonService.getColor(status);
    } catch (error) {
      console.error(error);
    }
    return statusCss;
  }

  public addMessage(from: any, text: string, type: 'received' | 'sent', fileTypeId: MessageType,
    fileUploadedUrl: string, actionType: ActionType, actions: any) {
      console.log(':::: addMEssage::: text :: ', text, ' ::: fileTypeId:: ',
        fileTypeId, '  ::: fileUploadedUrl :: ', fileUploadedUrl, ':::::: actionType ::: ',
        actionType, ':::::: actions', actionType );

    if ((text === undefined || text === '') && actionType === undefined) {
      return;
    }

    if (actionType === ActionType.HELPOPTIONS) {
      this.defaultHeight = 1100;
    } else {
      this.defaultHeight = 0;
    }

    this.messages.unshift({
      from: from,
      text: text,
      type: type,
      date: new Date().getTime(),
      fileTypeId: fileTypeId,
      fileUploadedUrl: fileUploadedUrl,
      actionType: actionType,
      actions: actions
    });

    this.scrollToBottom();
    console.log('::::: MESSAGE ADD AND SCROLLED ::::::');
    
    // if(text) {
    //   this.saveMessage(text, type);
    // }
    if (fileTypeId !== MessageType.OTH) {

      this.addToConversation({from, type, text, fileTypeId, fileUploadedUrl});

    //   this.addToConversation({
    //     from: from,
    //     type: type,
    //     text: text,
    //     fileTypeId: fileTypeId,
    //     fileUploadedUrl: fileUploadedUrl
    // });

    }

  }

  public scrollToBottom() {
    try {
      if (this.bottom !== undefined) {
        this.bottom.nativeElement.scrollIntoView();
      }
    } catch (error) {
      console.error(error);

    }
  }

  saveMessage(message: string, type: 'sent' | 'received') {
    try {
      let conversation = {
        userId: this.chatbotapi.userId,
        userName: this.chatbotapi.userName,
        message: message,
        type: type,
        date: new Date()
      }

      if (!sessionStorage.getItem('rasauitoken')) {
        this.messageService.getAuthorizationToken(this.chatbotapi.rasaUiUrl).
          subscribe((data) => {
            if (data) {
              sessionStorage.setItem('rasauitoken', data.token);
              this.messageService.saveUserMessage(conversation, this.chatbotapi.rasaUiUrl);
            }
          });
      } else {
        this.messageService.saveUserMessage(conversation, this.chatbotapi.rasaUiUrl);
      }
    } catch (error) {
      console.error(error);
    }
  }

  addToConversation(conversation: any) {
    console.log(':::addToConversation:::', conversation);
    try {

        this.conversation.push({
          from: conversation.from,
          type: conversation.type,
          date: new Date(),
          message: conversation.message,
          fileTypeId: conversation.fileTypeId,
          fileUrl: conversation.fileUploadedUrl
        });

      if(conversation.fileTypeId === 1 || conversation.fileTypeId === 3 || conversation.fileTypeId === 4||
        conversation.fileTypeId === 5) {
          conversation.type = 'sent';
          console.log(';:::: addToConversation type::::: ', conversation);
        }

        this.conversation.push({
          text: conversation.text,
          from: conversation.from,
          type: conversation.type,
          date: new Date(),
          message: conversation.message,
          fileTypeId: conversation.fileTypeId,
          fileUrl: conversation.fileUploadedUrl
        });

    } catch (error) {
      console.error(error);
    }
  }

  public focusMessage() {
    this.focus.next(true);
  }

  public toggleChat() {
    this.visible = !this.visible;
  }

  public sendMessage(message: any) {
    console.log('inside send message', message);
    if (message.message === undefined || message.message.trim() === '') {
      this.newMessage.buttons = undefined;
      return;
    }
    if (message.actionType) {
      console.log('INSIDE IF actionType ::::::');
      this.addMessage(this.client, undefined, undefined, message.fileTypeId,
          message.fileUploadedUrl, message.actionType, message.fileUploadedUrl);
      this.sendToRasa(message.message, this.currentuser);
    } else {
      if (message.message === '/restart') {
        this.sendToRasaRestart(message.message, this.currentuser);
      } else {
        console.log('INSIDE ELSE BLOCK ADD ACTION::::::');
        // if (message.fileTypeId !== MessageType.IMAGE) {
        //   console.log('::::::: inside not Image ::::::');
        //   this.addMessage(this.client, message.displayMessage, 'sent', message.fileTypeId, undefined, undefined, []);
        // } else {
          console.log('::::::: inside Image ::::::');
          this.addMessage(this.client, message.displayMessage, 'sent', message.fileTypeId, message.fileUploadedUrl, undefined, []);
        // }
        this.sendToRasa(message.message, this.currentuser);
      }
    }
  }

  sendToRasaRestart(message: any, user: User) {
    this.isTyping = true;
    this.rasaConnectorService.sendToRasa(message, user, this.chatbotapi.rasaCoreUrl)
      .subscribe((messages) => {
        this.isTyping = false;
        console.log(' :::: MESSAGE GOT From RASA Is  restart:::::: ', messages);
        // tslint:disable-next-line: no-shadowed-variable
        // messages.forEach((message: Message) => {
        //   this.processReceivedMessage(message);
        // });
        this.intializeChatConversation(this.currentuser);
      });
  }

  sendToRasa(message: any, user: User) {
    this.isTyping = true;
    this.rasaConnectorService.sendToRasa(message, user, this.chatbotapi.rasaCoreUrl)
      .subscribe((messages) => {
        this.isTyping = false;
        console.log(' :::: MESSAGE GOT From RASA Is :::::: ', messages);
        // tslint:disable-next-line: no-shadowed-variable
        messages.forEach((message: Message) => {
          this.processReceivedMessage(message);
        });
      });
  }

  public receiveCustomMessage(message: any) {
    const msgToDisplay = message.displayMessage;
    console.log('displayMessage:', msgToDisplay);
    this.addMessage(this.client, msgToDisplay, 'received', 1, undefined, undefined, []);
  }

  restartConversation($event: any): void {
    this.messages.splice(0, this.messages.length);
    this.conversation.splice(0, this.conversation.length);
    console.log('conversation cleared ::::', this.conversation);

    this.clearActions();
  }

  runSelectedBotService(selectedBotService: { serviceId: any; }) {
    console.log(':::: runSelectedBotService :::', selectedBotService);
    const sendMessage = { message: '', displayMessage: '', fileTypeId: MessageType.TEXT };

    switch (selectedBotService.serviceId) {
      case BotServiceEnum.REPORTINCIDENT:

        sendMessage.message = 'register complaint';
        sendMessage.displayMessage = 'I want to report incident';
        console.log('Msg Josn..', sendMessage);
        this.sendMessage(sendMessage);
        break;
      case BotServiceEnum.RECENTHISTORY:
        console.log(':::: INSIDE RECENT HISTORY OF ACTION :::::');

        sendMessage.displayMessage = 'I want to know previously reported incidents';
        sendMessage.message = 'reported incidents';
        this.sendMessage(sendMessage);
        break;
      case BotServiceEnum.PARKING:

        sendMessage.message = 'parking places near me';
        sendMessage.displayMessage = 'I want to know nearby parking places ';
        this.sendMessage(sendMessage);
        break;
      case BotServiceEnum.ENVIRONMENT:

        sendMessage.message = 'air quality';
        sendMessage.displayMessage = 'I want to know air quality information in my city';
        this.sendMessage(sendMessage);

        break;
      case BotServiceEnum.OPERATORCHAT:

        sendMessage.displayMessage = 'I want to chat with operator';
        this.sendMessage(sendMessage);

        sendMessage.displayMessage = 'Ok, I am connecting to agent';
        console.log('Msg Json..', sendMessage);
        this.receiveCustomMessage(sendMessage);
        this.connectAgent();

        break;
      case BotServiceEnum.WASTEMANAGEMENT:

        sendMessage.message = 'garbage Services';
        sendMessage.displayMessage = 'Garbage Services';
        this.sendMessage(sendMessage);

        break;
      case BotServiceEnum.WATER:

        sendMessage.message = 'Water services';
        sendMessage.displayMessage = 'Water services';
        this.sendMessage(sendMessage);

        break;
      case BotServiceEnum.ELECTRICITY:

        sendMessage.message = 'Electricity services';
        sendMessage.displayMessage = 'Electricity services';
        this.sendMessage(sendMessage);

        break;
      case BotServiceEnum.TRANSPORT_SERVICE:

        sendMessage.message = 'transport services';
        sendMessage.displayMessage = 'transport services';
        this.sendMessage(sendMessage);

        break;

      case BotServiceEnum.WEATHER:

        sendMessage.message = 'Weather information';
        sendMessage.displayMessage = 'Weather information';
        this.sendMessage(sendMessage);

        break;

    }
  }

  showIncidentsDetails(incident: { incidentId: any; grievanceId: any; status: any; grievanceType: any; name: any; sourceType: any; }) {
    console.log('::: showIncidentsDetails :::: ', incident);

    try {

      const incidentInfo: any = {
        incidentId: incident.incidentId,
        grievanceId: incident.grievanceId,
        status: incident.status,
        type: incident.grievanceType,
        name: incident.name,
        sourceType: incident.sourceType
      };

      this.chatbotapi.showIncidentDetailsInfo(incidentInfo);
      // this.actions.reportedIncidentInfo = [];
    } catch (error) {
      console.error(error);
    }
  }

  public addActionToView(action: any, message: Message) {
    console.log('::::: addActionToView :::::::::', message);
    try {
      switch (action.type) {
        case ActionType.PARKINGLIST:
          const parkingObj = { parkingInfo: action.value.parkingInfo, fromLat: action.value.fromLat,
            fromLong: action.value.fromLong, parkingType: 'fourWheeler' };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, parkingObj);
          break;
        case ActionType.TWO_WHEELER_PARKINGLIST:
          const two_parkingObj = { twoWheelerParkingInfo: action.value.twoWheelerParkingInfo,
            fromLat: action.value.fromLat, fromLong: action.value.fromLong, parkingType: 'twoWheeler' };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, two_parkingObj);
          break;
        case ActionType.REPORTEDINCIDENTlIST:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.WEATHERINFO:
          const weatherInfo = {
            localizationName: action.localizationName,
            locationName: action.locationName,
            currentWeatherInfo: action.currentWeatherInfo[0],
            WeatherIcon: this.chatbotapi.uploadUrl + 'chatBot/weather/' + action.currentWeatherInfo[0].WeatherIcon + '.png',
            forecastweatherInfo: action.forecastweatherInfo.DailyForecasts
          };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, weatherInfo);
          break;
        case ActionType.AIRQUALITYINFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, JSON.parse(action.value));
          break;
        case ActionType.CONNECTAGENT:
          this.connectAgent();
          break;
        case ActionType.BUSSTOPSLIST:
          const busStopsObj = {
            busStopInfo: action.value.busStops,
            fromLat: action.value.userLatitude,
            fromLong: action.value.userLongitude
          };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, busStopsObj);
          break;
        case ActionType.BUSDEPOTLIST:
          const busDepotObj = {
            depotInfo: action.value.depotInfo,
            fromLat: action.value.fromLat,
            fromLong: action.value.fromLong
          };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined,
            action.type, busDepotObj);
          break;

        case ActionType.HELPOPTIONS:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, undefined);
          break;
        case ActionType.GARBAGE_SUB_SERVICES:

          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, undefined);
          break;
        case ActionType.WATER_SUB_SERVICES:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, undefined);
          break;
        case ActionType.ELECTRICITY_SUB_SERVICES:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, undefined);
          break;
        case ActionType.NEARBY_BIN_LOC:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.CONTACT_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.BUS_ROUTE_NAME_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.BUS_ROUTE_DETAILS_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.POLICE_CONTACT_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.BUSTRIPDETAILS:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.POLICE_CONTACT_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.FIRE_CONTACT_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.AMBULANCE_CONTACT_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.GREET_SUGGESTION:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.TRANSPORT_SUB_SERVICES:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, undefined);
          break;
        case ActionType.BUS_CONTACT_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.GARBAGE_CONTACT_INFO:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.CHAT_BOT_ICON:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
          break;
        case ActionType.NEAREST_HOSPITALS:
          const nearesthospitalObj = {
            hospitalInfo: action.value.nearestHospitals,
            fromLat: action.value.userLatitude,
            fromLong: action.value.userLongitude
          };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, nearesthospitalObj);
          break;

        case ActionType.NEAREST_TOURIST_PLACE:
          const nearesttouristplaceObj = {
            TouristPlaceInfo: action.value.nearestTouristPlaces,
            fromLat: action.value.userLatitude,
            fromLong: action.value.userLongitude
          };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, nearesttouristplaceObj);
          break;
        case ActionType.POLICE_STATION_INFO:
          const policeStationObj = {
            stationInfo: action.value.policeStations,
            fromLat: action.value.fromLat,
            fromLong: action.value.fromLong
          };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, policeStationObj);
          break;
        case ActionType.FIRE_STATION_INFO:
          const fireStationObj = {
            stationInfo: action.value.fireStations,
            fromLat: action.value.fromLat,
            fromLong: action.value.fromLong
          };
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, fireStationObj);
          break;
        case ActionType.POLICE_VEHICLE_LOCATION:
          this.addMessage(this.operator, undefined, undefined, MessageType.OTH, undefined, action.type, action.value);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public actionElectricityService(electricityService: ActionElectricityService) {
    const sendMessage = { message: '', displayMessage: '', fileTypeId: MessageType.TEXT };

    if (electricityService === ActionElectricityService.REPORT_ELECTRICITY_PROBLEM) {
      sendMessage.message = 'electricity problem';
      sendMessage.displayMessage = 'Report electricity problem';
    } else if (electricityService === ActionElectricityService.NEW_ELECTRICITY_CONNECTION) {
      sendMessage.message = 'New electricity Connection';
      sendMessage.displayMessage = 'New electricity Connection';
    } else if (electricityService === ActionElectricityService.NEARBY_ELECTRICTY_OFFICES) {
      sendMessage.message = 'Nearby electrical offices';
      sendMessage.displayMessage = 'Nearby electrical offices';
    } else if (electricityService === ActionElectricityService.ELECTRICITY_BILL_PAYMENT) {
      sendMessage.message = 'Pay electricity bill';
      sendMessage.displayMessage = 'Pay electricity bill';
    } else if (electricityService === ActionElectricityService.ELECTRICITY_AUTH_CONTACT_DETAILS) {
      sendMessage.message = 'Electricity Authority contact details';
      sendMessage.displayMessage = 'Electricity Authority contact details';
    }
    this.sendMessage(sendMessage);
  }

  public actionGarbageService(garbageService: ActionGarbageService) {
    const sendMessage = { message: '', displayMessage: '', fileTypeId: MessageType.TEXT };

    if (garbageService === ActionGarbageService.REPORT_GABAGE_PROBLEM) {
      sendMessage.message = 'garbage problem';
      sendMessage.displayMessage = 'Report garbage problem';
    } else if (garbageService === ActionGarbageService.PAID_GARBAGE_SERVICE) {
      sendMessage.message = 'paid garbage Connection';
      sendMessage.displayMessage = 'paid garbage Connection';
    } else if (garbageService === ActionGarbageService.NEAREST_BIN_LOC) {
      sendMessage.message = 'Nearby garbage bin location';
      sendMessage.displayMessage = 'Nearby garbage bin location';
    } else if (garbageService === ActionGarbageService.GARBAGE_PICK_UP_TIMINGS) {
      sendMessage.message = 'garbage pickup timings';
      sendMessage.displayMessage = 'Garbage pickup timings';
    } else if (garbageService === ActionGarbageService.GARBAGE_AUTH_CONTACT_DETAILS) {
      sendMessage.message = 'garbage authority contact details';
      sendMessage.displayMessage = 'garbage authority contact details';
    }
    this.sendMessage(sendMessage);
  }

  public actionWaterService(waterService: ActionWaterService) {
    const sendMessage = { message: '', displayMessage: '', fileTypeId: MessageType.TEXT };

    if (waterService === ActionWaterService.REPORT_WATER_PROBLEM) {
      sendMessage.message = 'water problem';
      sendMessage.displayMessage = 'Report water problem';
    } else if (waterService === ActionWaterService.WATER_SCHEDULE_TIME) {
      sendMessage.message = 'water schedule timings';
      sendMessage.displayMessage = 'water schedule timings';
    } else if (waterService === ActionWaterService.PAID_WATER_SERVICE) {
      sendMessage.message = 'paid water service';
      sendMessage.displayMessage = 'paid water service';
    } else if (waterService === ActionWaterService.NEW_WATER_CONNECTION) {
      sendMessage.message = 'new water connection';
      sendMessage.displayMessage = 'new water connection';
    } else if (waterService === ActionWaterService.WATER_AUTH_CONTACT_DETAILS) {
      sendMessage.message = 'Water Authority contact details';
      sendMessage.displayMessage = 'water Authority contact details';
    }
    this.sendMessage(sendMessage);
  }

  public actionTransportService(transportService: ActionTransportService) {
    const sendMessage = { message: '', displayMessage: '', fileTypeId: MessageType.TEXT };
    if (transportService === ActionTransportService.BUSSTOPSLIST) {
      sendMessage.message = 'nearest bus stop';
      sendMessage.displayMessage = 'nearest bus stop';
    } else if (transportService === ActionTransportService.BUSDEPOTLIST) {
      sendMessage.message = 'bus depot near me';
      sendMessage.displayMessage = 'bus depot near me';
    } else if (transportService === ActionTransportService.BUSTRIPDETAILS) {
      sendMessage.message = 'bus number details';
      sendMessage.displayMessage = 'bus number details';
    } else if (transportService === ActionTransportService.BUS_ROUTE_INFO) {
      sendMessage.message = 'bus route details';
      sendMessage.displayMessage = 'bus route details';
    } else if (transportService === ActionTransportService.BUS_AUTH_CONTACT_DETAILS) {
      sendMessage.message = 'bus authority contact details';
      sendMessage.displayMessage = 'transport Authority contact details';
    }
    this.sendMessage(sendMessage);
  }

  public actionGreetSuggestionService(greetSuggestionServices: ActionGreetSuggestionService) {
    let sendMessage = { message: '', displayMessage: '', fileTypeId: MessageType.TEXT  };
    if (greetSuggestionServices === ActionGreetSuggestionService.REPORT_INCIDENT) {
      sendMessage.message = 'register complaint';
      sendMessage.displayMessage = 'Report Incident';
    } else if (greetSuggestionServices === ActionGreetSuggestionService.WEATHER_INFO) {
      sendMessage.message = 'Weather Info';
      sendMessage.displayMessage = 'Weather Info';
    } else if (greetSuggestionServices === ActionGreetSuggestionService.EXPLORE_MORE) {
      sendMessage.message = 'help';
      sendMessage.displayMessage = 'Explore More';
    }
    this.sendMessage(sendMessage);
  }

  showParkingBookingSlots(parkingInfo) {
    try {
      console.log('::::: showParkingBookingSlots :::::: ', parkingInfo);
      this.chatbotapi.bookParkingTicket(parkingInfo.loc_id, parkingInfo.loc_lat, parkingInfo.loc_lng, 1);
    } catch (error) {
      console.error(error);
    }
  }

  showTwoParkingBookingSlots(parkingInfo) {
    try {
      console.log('::::: showTwowhelerParkingBookingSlots :::::: ', parkingInfo);
      this.chatbotapi.bookParkingTicket(parkingInfo.loc_id, parkingInfo.loc_lat, parkingInfo.loc_lng, 2);
    } catch (error) {
      console.error(error);
    }
  }

  connectAgent() {
    console.log('connecting... to agent...');
    this.chatbotapi.onFallbackToAgent();
  }

  showSelectedParkingLocation(item: any, fromLat: any, fromLong: any) {
    console.log(':::::: showselectedParkingLocation ::::::', item);
    try {
      this.chatbotapi.showonMap(fromLat, fromLong, item.loc_lat, item.loc_lng);
    } catch (error) {
      console.error(error);
    }
  }

  public showPathForBusStop(item: { latitude: any; longitude: any; }, fromLat: any, fromLong: any) {
    try {
      this.chatbotapi.showonMap(fromLat, fromLong, item.latitude, item.longitude);
      // this.actions.nearByStopsInfo = { isAvailable: false, fromLat: null, fromLong: null, busStops: [] };
    } catch (error) {
      console.error(error);
    }
  }

  public showPath(fromLat, fromLong, toLat, toLong) {
    console.log(' :::: show path ::::: fromLat, fromLong, toLat, toLong ::: ', fromLat, fromLong, toLat, toLong);
    this.chatbotapi.showonMap(fromLat, fromLong, toLat, toLong);
  }

  public showNgCadDetails(details) {
    console.log(' :::: show path ::::: details ::: ', details);
    this.chatbotapi.ngCadEventDetails(details);
  }

  public clearActions() {
    try {
      this.newMessage.buttons = undefined;
    } catch (error) {
      console.error(error);
    }
  }

  getDate() {
    return this.commonService.getFormattedDate(new Date());
  }

  getMoment(momentDate) {
    return this.commonService.getMomentDate(momentDate);
  }

  dialPhoneNo(phoneNo) {
    console.log('dialPhoneNo () ', phoneNo);
    if (phoneNo) {
      console.log(phoneNo);
      this.chatbotapi.dialNo(phoneNo);
    }
  }
}
