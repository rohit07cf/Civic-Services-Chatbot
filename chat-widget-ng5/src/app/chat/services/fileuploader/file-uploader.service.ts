import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatBotApi } from '../../shared/chatbotapi/BotApi';
import { ActionType } from '../../enums/actionTypeEnum';
import { AttachmentTypes } from '../../enums/input-type.enum';

@Injectable()
export class FileUploaderService {

  constructor( ) { }

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

  uploadFile(file, chatbotapi: ChatBotApi): Observable<any> {
    if (chatbotapi) {
      return this._uploadFile(file, chatbotapi);
    }
    throw "file not selected";
  }

  uploadFileForPortal(file, fileUploadUrl): Observable<any> {
    if (fileUploadUrl) {
      return this._uploadFile(file, fileUploadUrl);
    }
    throw "file not selected";
  }

// fileUploadUrl = 'http://192.168.1.59:7070/';
  private _uploadFile(file: any, chatbotapi): Observable<any> {
    console.log(':::::::: _uploadFile :::::::::::::::', chatbotapi.uploadUrl);
    return new Observable((observer) => {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('POST', chatbotapi.uploadUrl + 'upload_media_test1.php', true);
      xmlHttpRequest.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
          const percentage = Math.round((e.loaded * 100) / e.total);
          observer.next({ type: 'progress', progress: percentage });
          console.log(percentage);
        }
      }, false);
      const formData = new FormData();
      const fileNameArray: string[] = file.name.split('.');
      fileNameArray[1] = '.' + fileNameArray[fileNameArray.length - 1];
      fileNameArray.splice(fileNameArray.length - 1, 0, '-' + new Date().getTime());
 
      const fileName = fileNameArray.join('');
      formData.append('uploadedfile1', file, fileName);
      // Sending FormData automatically sets the Content-Type header to multipart/form-data
      xmlHttpRequest.send(formData);
 
      xmlHttpRequest.onreadystatechange = (ev: any) => {
        console.log(':::::::: CHANGE ::::::: ', ev);
        console.log(':::::::: CHANGE ::::::: ', ev.target.response);
        console.log('::::::::::: xmlHttpRequest.readyState::::::', xmlHttpRequest.readyState);
        // tslint:disable-next-line: triple-equals
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
          let uploadFiles: any = {
            fileUploadedUrl: chatbotapi.uploadUrl + fileName,
            isFileAttached: true,
            fileType: 'image',
            fileTypeId: 2,
            name: file.name
          }
          observer.next({ type: 'file', file: uploadFiles })
          observer.complete();
          // const uploadedFile: any = {
          //   url: this.fileUploadUrl + fileName,
          //   name: file.name
          // };
          console.log(':::::::: LOG UPLOADED SUCCESSFULL ::::::');
          // observer.next({ type: 'file', file: uploadedFile, success: true });
          // observer.complete();
        } else {
          console.log(':::::::: LOG UPLOADED FAILURE ::::::', xmlHttpRequest.status);
        }
      };
    });
  }




  private _uploadFile1(file: any, chatbotapi: ChatBotApi): Observable<any> {

    return new Observable((observer) => {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open("POST", chatbotapi.uploadUrl + "upload_media_test1.php", true);
      xmlHttpRequest.upload.addEventListener("progress", function (e) {
        if (e.lengthComputable) {
          const percentage = Math.round((e.loaded * 100) / e.total);
          observer.next({ type: 'progress', progress: percentage })
          console.log(percentage);
        }
      }, false);
      const formData = new FormData();
      const fileNameArray: string[] = file.name.split(".")
      fileNameArray[1] = "." + fileNameArray[fileNameArray.length - 1]
      fileNameArray.splice(fileNameArray.length - 1, 0, "-" + new Date().getTime())

      const fileName = fileNameArray.join("");
      formData.append("uploadedfile1", file, fileName);
      formData.append("user", "chatBot")
      // Sending FormData automatically sets the Content-Type header to multipart/form-data
      xmlHttpRequest.send(formData);

      xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
          //alert(xmlHttpRequest.responseText); // handle response.
          //files.push(fileName)
          let uploadFiles: any = {
            fileUploadedUrl: chatbotapi.uploadUrl + fileName,
            isFileAttached: true,
            fileType: 'image',
            fileTypeId: 2,
            name: file.name
          }
          observer.next({ type: 'file', file: uploadFiles })
          observer.complete()
        }
      };
    });
  }

}
