import { Component, OnInit, Input, Output, EventEmitter, Renderer, ElementRef, ViewChild } from '@angular/core'

import { Replies, Message, UiMessage } from '../shared/model/message'
import { ChatBotApi } from '../shared/chatbotapi/BotApi'
import { FileUploaderService } from '../services/fileuploader/file-uploader.service';
import { LANGUAGE } from '../enums/language.enum';

import { MessageType, AttachmentTypes } from '../enums/input-type.enum';
import { Observable, Observer } from 'rxjs';
import { ActionType } from '../enums/actionTypeEnum';

@Component({
  selector: "chat-quickreplies",
  templateUrl: './chat-quickreplies.component.html',
  styleUrls: ['./chat-quickreplies.component.css']
})
export class ChatQuickrepliesComponent implements OnInit {
  @Input() public newMessage: Message;
  @Input() public conversation: any[];
  @Input() public chatbotapi: ChatBotApi;
  @Output() send = new EventEmitter();
  files: any[] = [];
  uploadProgress: number;
  uploadDocuments: boolean;

  @ViewChild('fileInput') fileInput:ElementRef;
  
  constructor(private fileUploader: FileUploaderService, private renderer:Renderer) {}
  // selectedTime = "";
  // arrivalTime = "";
  // departureTime = "";
  ngOnInit() {
    console.info('chatbotapi ', this.chatbotapi.isMobile);
  }

  public sendMessageToBot(message: string, displayMessage: string) {
    this.send.emit({message: message, displayMessage: displayMessage, fileTypeId: MessageType.TEXT });
  }

  /**
   * quickReply
   */
  public quickReply(reply: Replies) {
    console.log('quickReply ::::: ', reply);

    let message: string = reply.payload;
    const action: string = reply.action;
    // let removeQuickReplyButton = true;
    if (action) {
      switch (action.split('|')[0]) {
        case 'getLocation':
          this.shareLocation();
          break;
        case 'markLocation':
          this.markLocation();
          break;
        case 'uploadCivicIssueDocuments':
          this.uploadDocuments = true;
          break;
        case 'civicIssue':
          this.informIssue(reply, LANGUAGE.ENGLISH);
          break;
        case 'civicIssueTamil':
          this.informIssue(reply, LANGUAGE.TAMIL);
          break;
        case 'civicIssueKannada':
          this.informIssue(reply, LANGUAGE.KANNADA);
          break;
        case 'raiseComplaint':
          const intent: any = message;
          message = `/${intent}`;
          this.sendMessageToBot(message, reply.title);
          break;
        case 'informIntent':
          const intentName: any = message;
          message = `/${intentName}`;
          this.sendMessageToBot(message, reply.title);
          break;
        case 'informEntity':
          const informEntity: any = message;
          const entityName = action.split('|')[1];
          message = `/inform{"${entityName}","${informEntity}"}`;
          this.sendMessageToBot(message, reply.title);
          break;
        case 'service':
          this.sendMessageToBot(message, reply.title);
          break;
        case 'attach':

          this.getFileEvent(this.chatbotapi, this.send, action);

          // this.getAttachMentForBot(this.chatbotapi, this.send, action)
          
          // this.fileUploader.getAttachMentForBot(
          //   this.chatbotapi,
          //   this.send,
          //   action
          // );
          break;
        case 'attachtamil':
          this.fileUploader.getAttachMentForBot(
            this.chatbotapi,
            this.send,
            action
          );
          //  removeQuickReplyButton =false;
          break;
        case 'attachkannada':
          this.fileUploader.getAttachMentForBot(
            this.chatbotapi,
            this.send,
            action
          );
          //  removeQuickReplyButton =false;
          break;
        case 'connectAgent':
          this.chatbotapi.onFallbackToAgent();
          break;
        case 'incidents':
          this.sendMessageToBot(message, reply.title);
          break;
        case 'services':
          this.sendMessageToBot(message, reply.title);
          break;
        case 'waterissue':
          this.informIssue(reply, LANGUAGE.TAMIL);
          break;
        case 'getCurrentLocation':
          this.shareCurrentLocation(LANGUAGE.ENGLISH);
          break;
        case 'markOnMap':
          this.markOnMap(LANGUAGE.ENGLISH);
          break;
        case 'getCurrentLocationTamil':
          this.shareCurrentLocation(LANGUAGE.TAMIL);
          break;
        case 'getCurrentLocationKannada':
          this.shareCurrentLocation(LANGUAGE.KANNADA);
          break;
        case 'markOnMapTamil':
          this.markOnMap(LANGUAGE.TAMIL);
          break;
        case 'markOnMapKannada':
          this.markOnMap(LANGUAGE.KANNADA);
          break;
        case 'parkingType':
          this.informTwoOrFourWheeler(reply);
          break;
        case 'affirm':
          this.sendAffirmWithConversation(reply,LANGUAGE.ENGLISH);
          break;
          case 'affirm_kannada':
          this.sendAffirmWithConversation(reply,LANGUAGE.KANNADA);
          break;
          case 'affirm_tamil':
          this.sendAffirmWithConversation(reply,LANGUAGE.TAMIL);
          break;
        case 'selectbox':
          break;
        case 'like':
          this.liked();
          break;
        case 'dislike':
          this.disliked();
          this.chatbotapi.navigateToFeedbackPage();
          break;
        case 'denyConnectOperator':
          this.no(); []
          break;
          case 'arrivalTime':
            this.getArrivalTime();
          break;
          case 'departureTime':
            this.getDepartureTime();
          break;
        default:
          this.sendMessageToBot(message, message);
          break;
      }
    } else {
      console.log('INSIDE ELSEEEEEE::::::::::::::::' + message);
      this.sendMessageToBot(message, message);
    }

    if (this.newMessage.buttons && action !== 'attach' && action !== 'selectbox'
        && action !== 'markLocation' && action !== 'markOnMap'&& action !== 'markOnMapTamil'
        && action !== 'markOnMapKannada') {
      this.newMessage.buttons = undefined;
    }
  }

  getAttachMentForBot(chatbotapi: ChatBotApi, sendEmmitor: EventEmitter<any>, attachType: any) {
    chatbotapi.attachMents().subscribe((fileName) => {
      const files: any[] = [];
      try {
        console.log('file got is ', fileName);

        if (!chatbotapi.isLocal) {
          fileName.fileUploadedUrl = fileName.fileUploadedUrl.replace(chatbotapi.public_ip, chatbotapi.localIP)
        }

        files.push(fileName);
        console.log('::::::  FILES ::::: ', files);
        const messageJson = JSON.stringify({ 'attachments': files });
        let filesJson = '';

        if (attachType === 'attach') {
          filesJson = '/inform' + messageJson;
        } else if (attachType === 'attachkannada') {
          filesJson = '/informkannada' + messageJson;
        } else {
          filesJson = '/informtamil' + messageJson;
        }
        const message: string = filesJson;

        if (files && files.length > 0) {
          if (files[0].fileTypeId === AttachmentTypes.IMAGE) {
            sendEmmitor.emit({
                message: message,
                // displayMessage: `<img src='${files[0].fileUploadedUrl}' />`,
                fileTypeId: files[0].fileTypeId,
                fileUploadedUrl: files[0].fileUploadedUrl,
                actionType: ActionType.IMAGE_ATTACHMENT
            });
          } else if (files[0].fileTypeId === AttachmentTypes.VIDEO) {
            sendEmmitor.emit({
                message: message,
                // tslint:disable-next-line: max-line-length
                // displayMessage: `<video src='${files[0].fileUploadedUrl}' width="250px" height="250px" type="video/mp4"  controls controlsList="nodownload" />`,
                fileTypeId: files[0].fileTypeId,
                fileUploadedUrl: files[0].fileUploadedUrl,
                actionType: ActionType.VIDEO_ATTACHMENT
            });
          } else if (files[0].fileTypeId === AttachmentTypes.AUDIO) {
              sendEmmitor.emit({
                message: message,
                // displayMessage: `<audio controls controlsList="nodownload">
                //     <source src='${files[0].fileUploadedUrl}'>
                //   </audio>`,
                fileTypeId: files[0].fileTypeId,
                fileUploadedUrl: files[0].fileUploadedUrl,
                actionType: ActionType.AUDIO_ATTACHMENT
            });
          } else if (files[0].fileTypeId === AttachmentTypes.DOCUMENT) {
            sendEmmitor.emit({
                message: message,
                // displayMessage: `<a href='${files[0].fileUploadedUrl}' >Click to view document</a>`,
                fileTypeId: files[0].fileTypeId,
                fileUploadedUrl: files[0].fileUploadedUrl,
                actionType: ActionType.DOC_ATTACHMENT
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  getFileEvent(chatbotapi: ChatBotApi, sendEmmitor: EventEmitter<any>, attachType: any) {
    try {
      console.log(this.fileInput.nativeElement.click());
      this.fileInput.nativeElement.addEventListener('input', (fileEvent) => {

        if (fileEvent.target.files && fileEvent.target.files[0]) {
          let file = fileEvent.target.files[0];
    
          this.fileUploader.uploadFile(file, this.chatbotapi)
            .subscribe((update) => {
              switch (update.type) {
                case 'progress':
                  console.log('progress', update.progress);
                  break;
                case 'file':
                  console.log('file', JSON.stringify(update.file));
                  const files: any[] = [];
                  files.push(update.file);
                  console.log(':::: FILES ::::::: ', files);
                  if(files && files.length > 0) {
                    this.sendUploadUrlToBot(chatbotapi, sendEmmitor, attachType, files);
                  }
                  // this.sendFiles(files);
              }
            });
        }


        // console.log('this.fileInput.nativeElement.files ::: ', this.fileInput.nativeElement.files);
        // console.log('  ::: fileSelected ::: ', fileSelected);
      });
      
    } catch (error) {
      console.error(error);
    }
  }

  sendUploadUrlToBot(chatbotapi: ChatBotApi, sendEmmitor: EventEmitter<any>, attachType: any, files) {
    try {
      console.log('file got is ', files);
      const uploadedfiles : any[] = [];

      if (!chatbotapi.isLocal) {
        files[0].fileUploadedUrl = files[0].fileUploadedUrl.replace(chatbotapi.public_ip, chatbotapi.localIP)
      }

      uploadedfiles.push(files[0].fileUploadedUrl);
      console.log('::::::  FILES ::::: ', uploadedfiles);
      const messageJson = JSON.stringify({ 'attachments': files });
      let filesJson = '';

      if (attachType === 'attach') {
        filesJson = '/inform' + messageJson;
      } else if (attachType === 'attachkannada') {
        filesJson = '/informkannada' + messageJson;
      } else {
        filesJson = '/informtamil' + messageJson;
      }
      const message: string = filesJson;

      if (files && files.length > 0) {
        if (files[0].fileTypeId === AttachmentTypes.IMAGE) {
          sendEmmitor.emit({
              message: message,
              // displayMessage: `<img src='${files[0].fileUploadedUrl}' />`,
              fileTypeId: AttachmentTypes.IMAGE,
              fileUploadedUrl: files[0].fileUploadedUrl,
              actionType: ActionType.IMAGE_ATTACHMENT
          });
        } 
        
        else if (files[0].fileTypeId === AttachmentTypes.VIDEO) {
          sendEmmitor.emit({
              message: message,
              // tslint:disable-next-line: max-line-length
              // displayMessage: `<video src='${files[0].fileUploadedUrl}' width="250px" height="250px" type="video/mp4"  controls controlsList="nodownload" />`,
              fileTypeId: files[0].fileTypeId,
              fileUploadedUrl: files[0].fileUploadedUrl,
              actionType: ActionType.VIDEO_ATTACHMENT
          });
        } else if (files[0].fileTypeId === AttachmentTypes.AUDIO) {
            sendEmmitor.emit({
              message: message,
              // displayMessage: `<audio controls controlsList="nodownload">
              //     <source src='${files[0].fileUploadedUrl}'>
              //   </audio>`,
              fileTypeId: files[0].fileTypeId,
              fileUploadedUrl: files[0].fileUploadedUrl,
              actionType: ActionType.AUDIO_ATTACHMENT
          });
        } else if (files[0].fileTypeId === AttachmentTypes.DOCUMENT) {
          sendEmmitor.emit({
              message: message,
              // displayMessage: `<a href='${files[0].fileUploadedUrl}' >Click to view document</a>`,
              fileTypeId: files[0].fileTypeId,
              fileUploadedUrl: files[0].fileUploadedUrl,
              actionType: ActionType.DOC_ATTACHMENT
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  sendAffirmWithConversation(reply: Replies,languageType: LANGUAGE): any {
    try {
      let messageJson = JSON.stringify({
        conversation: JSON.stringify(this.conversation)
      });
      let message='';
      if (languageType === LANGUAGE.TAMIL) {
        message = '/affirm_tamil' + messageJson;
      } else if (languageType === LANGUAGE.KANNADA) {
        console.log('::::::affirm_kannada  :::::: ');
        message = '/affirm_kannada' + messageJson;
      } else {
        message = '/affirm' + messageJson;
      }
      this.sendMessageToBot(message, reply.title);
      console.log(':::::sendAffirmWithConversation::::: ', messageJson);
    } catch (error) {
      console.error(error);
    }
  }

  markLocation(): any {
    this.chatbotapi.getLocationMarkonMap().subscribe(position => {
      console.log('received geo location ');
      const coordinates = position;
      const messageJson = JSON.stringify({
        address: position.address,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      });
      const locationJson: string = '/inform' + messageJson;
      const message: string = locationJson;
      console.log('Location Details :', message);
      this.sendMessageToBot(message, position.address);
    });
  }

  shareLocation(): any {
    if (this.chatbotapi) {
      console.log(':::::: HIIIIII ::::::::::');
    }
    this.chatbotapi.getCurrentLocation().subscribe(position => {
      console.log('received geo location ');
      const coordinates = position;
      const messageJson = JSON.stringify({
        address: position.address,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      });
      const locationJson: string = '/inform' + messageJson;
      const message: string = locationJson;
      console.log('Location Details :', message);
      this.sendMessageToBot(message, position.address);
    });
  }

  markOnMap(languageType: LANGUAGE) {
    try {
      this.chatbotapi.getLocationMarkonMap().subscribe(position => {
        console.log('received geo location ');
        const coordinates = position;
        const messageJson = JSON.stringify({
          address: position.address,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        });
        let locationJson = '';
        if (languageType === LANGUAGE.TAMIL) {
          locationJson = '/inform_common_location_tamil' + messageJson;
        } else if (languageType === LANGUAGE.KANNADA) {
          console.log('::::::inform_common_location_kannada  :::::: ');
          locationJson = '/inform_common_location_kannada' + messageJson;
        } else {
          locationJson = '/inform_common_location' + messageJson;
        }
        const message: string = locationJson;
        console.log('Location Details :', message);
        this.sendMessageToBot(message, position.address);
      });
    } catch (error) {
      console.error(error);
    }
  }

  shareCurrentLocation(languageType: LANGUAGE) {
    console.log(':::::: shareCurrentLocation :::::: ');

    try {
      this.chatbotapi.getCurrentLocation().subscribe(position => {
        console.log('received geo location ', position);
        const coordinates = position;
        const messageJson = JSON.stringify({
          address: position.address,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        });


      //  let geocoder = new google.maps.Geocoder();

        let locationJson = '';
        if (languageType === LANGUAGE.TAMIL) {
          locationJson = '/inform_common_location_tamil' + messageJson;
        } else if (languageType === LANGUAGE.KANNADA) {
          console.log('::::::inform_common_location_kannada::::::');
          locationJson = '/inform_common_location_kannada' + messageJson;
        } else {
          locationJson = '/inform_common_location' + messageJson;
        }

        // try {
        //   this.getGeoLocation(coordinates.latitude, coordinates.longitude);
        // } catch (error) {
          
        // }

        const message: string = locationJson;
        console.log('Location Details :', message);

        console.log('Location Details :', position.address);
        this.sendMessageToBot(message, position.address);
      });
    } catch (error) {
      console.error(error);
    }
  }

  navigateToFeedback() {
    console.log(':::::: navigateToFeedback :::::: ');
  }

  liked() {
    console.log(':::::: LIKED :::::: ');
    const message = '/liked';
    this.sendMessageToBot(message, '👍');
    console.log(':::::: THANK YOU :::::: ');
  }

  disliked() {
    console.log(':::::: DISLIKED :::::: ');
    const message = '/disliked';
    this.sendMessageToBot(message, '👎');
    console.log(':::::: DISLIKED ::::::');
  }

  no() {
    console.log(':::::: NO :::::: ');
    const message = '/thankyou';
    console.log(':::::: Thanks for chatting :::::: ');
     this.sendMessageToBot(message, 'no');
    console.log(':::::: chatting thanks :::::: ');
  }

  informIssue(reply: Replies, languageType: LANGUAGE): any {
    try {
      let messageJson = JSON.stringify({
        civic_service: reply.payload
      });
      let message = '';
      if (languageType === LANGUAGE.TAMIL) {
        message = '/informtamil' + messageJson;
      } else if (languageType === LANGUAGE.KANNADA) {
        message = '/informkannada' + messageJson;
      } else {
        message = '/inform' + messageJson;
      }
      this.sendMessageToBot(message, reply.title);
    } catch (error) {
      console.error(error);
    }
  }

  informEmergencyType(reply: Replies, languageType: LANGUAGE): any {
    try {
      let messageJson = JSON.stringify({
        emergency_service: reply.payload
      });
      let message = '';
      if (languageType === LANGUAGE.TAMIL) {
        message = '/informtamil' + messageJson;
      } else if (languageType === LANGUAGE.KANNADA) {
        message = '/informkannada' + messageJson;
      } else {
        message = '/inform' + messageJson;
      }
      this.sendMessageToBot(message, reply.title);
    } catch (error) {
      console.error(error);
    }
  }




  informTwoOrFourWheeler(reply: Replies) {
    try {
      let messageJson = JSON.stringify({
        parking_vehicle_type: reply.payload
      });
      let message = '/inform' + messageJson;
      this.sendMessageToBot(message, reply.title);
    } catch (error) {
      console.error(error);
    }
  }

  onFileSelected(fileEvent): void {
    if (fileEvent.target.files && fileEvent.target.files[0]) {
      let file = fileEvent.target.files[0];
      //var reader = new FileReader();

      this.fileUploader.uploadFile(file, this.chatbotapi).subscribe(update => {
        switch (update.type) {
          case 'progress':
            console.log('progress', update.progress);
            this.uploadProgress = update.progress;
            break;
          case 'file':
            console.log('file', JSON.stringify(update.file));
            this.files.push(update.file);
            this.uploadProgress = undefined;
        }
      });
    }
  }

  getPhotoForBot() {
    this.chatbotapi.attachMents().subscribe(fileName => {
      console.log('picImage got file ', fileName);
      this.files.push(fileName);
    });
  }

  clearUploadedFile(item) {
    console.log(':::: clearUploadedFile :::: ', item);
    this.files.splice(item, 1);
  }

  uploadFiles(): void {
    const messageJson = JSON.stringify({ attachments: this.files });

    const filesJson: string = '/inform' + messageJson;
    const message: string = filesJson;
    console.log('Location Details :', message);
    this.sendMessageToBot(message, 'Supporting documents uploaded');
    this.uploadDocuments = false;
  }
  getArrivalTime() {

    //  this.timePickerService.open().afterClose()
    //  .subscribe((time) => {
    //   let messageJson = JSON.stringify({arrivaltime : time});
    //   const message = '/inform' + messageJson;
    //   this.sendMessageToBot(message, time);
    // });
  }

  getDepartureTime(){
    // this.timePickerService.open().afterClose()
    // .subscribe((time) => {
    //   let messageJson = JSON.stringify({ departuretime : time});
    //   const message = '/inform' + messageJson;
    //   this.sendMessageToBot(message, time);
    // });
  }
}
