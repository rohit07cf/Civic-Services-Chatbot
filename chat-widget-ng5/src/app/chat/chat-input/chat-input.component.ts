import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Message } from '../shared/model/message';
import { ChatBotApi } from '../shared/chatbotapi/BotApi';
import { FileUploaderService } from '../services/fileuploader/file-uploader.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { BustopsService, BusStops, RouteDetails } from '../services/itms/bustops.service';
import { MessageService } from '../services/message/message.service';
import { InputType, MessageType } from '../enums/input-type.enum';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chat-input.component.css'],
})
export class ChatInputComponent implements OnInit {
  private _newMessage: Message;
  @Input() public buttonText = '⮞'; // 🚀'// '↩︎'
  @Input() public focus = new EventEmitter();
  @Input() public chatbotapi: ChatBotApi;
  @Output() public send = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @Output() public restart = new EventEmitter();
  @ViewChild('message') message: ElementRef;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  inputType: InputType = InputType.EDITOR;
  selectApi: string;
  inputPlaceholder: string;
  public InputTypes = InputType;

  public username = '';


  constructor(private fileUploader: FileUploaderService,
    private busstops: BustopsService,private messageService: MessageService) { }

  ngOnInit() {

    this.focus.subscribe(() => this.focusMessage());
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
    //   this.message.nativeElement.value = ''
    //   this.message.nativeElement.textContent = ''

    setTimeout(() => {
      this.clearMessage();
    }, 500);


  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  public focusMessage() {
    console.log('this.inputType', this.inputType);
    if (this.message.nativeElement !== undefined) {
      this.message.nativeElement.focus();
    }
  }

  public getMessage() {
    if (this.inputType === InputType.SELECTBOX) {
      return this.myControl.value;
    } else {
      return this.message.nativeElement.value || this.message.nativeElement.textContent;
    }
  }

  public clearMessage() {
    if (this.inputType === InputType.SELECTBOX) {
      this.myControl.setValue('');
    } else {
      this.message.nativeElement.value = '';
      this.message.nativeElement.textContent = '';
    }
  }

  clearText() {
    this.message.nativeElement.textContent = '';
  }

  onSubmit() {
    console.log('::::: ON SUBMIT :::::::::');
    let message = this.getMessage();
    console.log(':::::SUBMIT:::::::::'+message);
    let displayMessage = message;

    try {

      if (message.trim() === '') {
        return;
      }

      console.log(' :::: newMessage :::' , this.newMessage);
      console.log('this.newMessage.buttons :' , this.newMessage.buttons);

      if (this.newMessage.buttons && this.newMessage.buttons.length > 0) {

        if (this.inputType === InputType.SELECTBOX) {
          const messageJson = {};
          messageJson[this.selectApi] = message;
          message = '/inform' + JSON.stringify(messageJson);
          this.inputType = InputType.EDITOR;
        } else if (this.newMessage.buttons[0].type === 'incidentRemarks') {
          const messageJson = JSON.stringify({ user_remarks: message });
          message = '/inform' + messageJson;
        } else if (this.newMessage.buttons[0].type === 'incidentRemarksTamil') {
          const messageJson = JSON.stringify({ user_remarks: message });
          message = '/informtamil' + messageJson;
        } else if (this.newMessage.buttons[0].type === 'incidentRemarksKannada') {
          console.log("::::::::::inside user remarks::::::");
          const messageJson = JSON.stringify({ user_remarks: message });
          message = '/informkannada' + messageJson;
        } else if (this.newMessage.buttons[0].type === 'busNo') {
          const messageJson = JSON.stringify({ bus_number: message });
          message = '/inform' + messageJson;
        } else if (this.newMessage.buttons[0].type === 'receiptInfo') {
          const messageJson = JSON.stringify({ reciept_info: message });
          message = '/inform' + messageJson;
        } else if (
          this.newMessage.buttons[1] &&
          this.newMessage.buttons[1].action === 'getLocation'
        ) {
          const messageJson = JSON.stringify({ landmark: message });
          message = '/inform' + messageJson;
        } else if (this.newMessage.buttons[0].type === 'transit_from') {
          const messageJson = JSON.stringify({ transit_from: message });
          message = '/inform' + messageJson;
        } else if (this.newMessage.buttons[0].type === 'transit_to') {
          const messageJson = JSON.stringify({ transit_to: message });
          message = '/inform' + messageJson;
        } else if (this.newMessage.buttons[0].action === 'arrivalTime') {
          console.log(':::Inside Arrival Time:::::' , this.newMessage);
          const messageJson = JSON.stringify({ arrivaltime: message });
          message = '/inform' + messageJson;
        } 
      }

      console.log(' : onSubmit :' + message);
      this.send.emit({  message: message, displayMessage: displayMessage, fileTypeId: MessageType.TEXT });
      // this.saveMessage(message);
      this.clearMessage();
      this.focusMessage();
    } catch (error) {
      console.error(error);
    }
  }

  restartConv(): void {
    let message: string = '/restart';
    this.send.emit({ message: message, displayMessage: '' });
    this.inputType = InputType.EDITOR;
    this.restart.emit();
  }

  getPhotoForBot() {
    this.chatbotapi.attachMents().subscribe((fileName) => {
      console.log('picImage got file ', fileName);
      if (!this.chatbotapi.isLocal) {
        fileName.fileUploadedUrl = fileName.fileUploadedUrl.replace(this.chatbotapi.public_ip, this.chatbotapi.localIP);
      }
      const files: any[] = [];
      files.push(fileName);
      this.sendFiles(files);

    });
  }

  sendFiles(files: any[]) {
    const messageJson = JSON.stringify({ 'attachments': files });

    const filesJson: string = '/inform' + messageJson;
    const message: string = filesJson;
    console.log('Location Details :', message);
    this.sendMessageToBot(message, `<img src='${files[0].fileUploadedUrl}' />`, files[0].fileTypeId, files[0].fileUploadedUrl);
  }

  public sendMessageToBot(message: string, displayMessage: string, fileTypeId, fileUploadedUrl) {
    this.send.emit({ message: { message: message, displayMessage: displayMessage, fileTypeId: fileTypeId, fileUploadedUrl: fileUploadedUrl } });
  }

  onFileSelected(fileEvent): void {
    if (fileEvent.target.files && fileEvent.target.files[0]) {
      let file = fileEvent.target.files[0];
      //var reader = new FileReader();

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
              this.sendFiles(files);
          }
        });
    }
  }

  @Input()
  set newMessage(newMessage: Message) {
    this._newMessage = newMessage;
    this.inputPlaceholder = null;

    if(this.newMessage) {
      if (this.newMessage.buttons && this._newMessage.buttons.length > 0) {

        switch (this.newMessage.buttons[0].type) {
          case 'incidentRemarks':
            this.inputPlaceholder = 'Enter remarks';
            break;
          case 'busNo':
            this.inputPlaceholder = 'Enter Bus number';
            break;
          case 'transit_from':
            this.inputPlaceholder = 'Enter starting point';
            break;
          case 'transit_to':
            this.inputPlaceholder = 'Enter destination point';
            break;
        }
      }
    }

  }

  get newMessage(): Message {
    return this._newMessage;
  }

  connectAgent() {
    this.chatbotapi.onFallbackToAgent();
  }


}
