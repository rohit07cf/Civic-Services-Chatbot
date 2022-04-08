import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/model/user';
import { BotImpl } from '../../chat-widget/botApiImpl';
import { ChatBotApi } from '../../shared/chatbotapi/BotApi';

@Injectable()
export class RasaConnectorService {

    // public chatbotapi: ChatBotApi = new BotImpl()

    constructor(private httpclient: HttpClient) { }
    public sendToRasa(message: string, user:User, coreUrl: string): Observable<any> {
        return new Observable<any>((observer) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                })
            }
            let messageObj = {
                "message": message,
                "sender": user.id
            }
            try {
                this.httpclient.post<any>(coreUrl, messageObj, httpOptions)
                    .subscribe((message) => {
                        console.log('::::: RESPONSE FROM RASA CORE ::::: ',message);
                        observer.next(message);
                        observer.complete();
                    });
            } catch (error) {
                console.error(error);
            }
        });
    }
}
