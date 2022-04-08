import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BotImpl } from '../../chat-widget/botApiImpl';
import { ChatBotApi } from '../../shared/chatbotapi/BotApi';
import { Observable} from 'rxjs';

@Injectable()
export class MessageService {

    constructor(private httpclient: HttpClient) { }

    // public saveUserMessage(message: string, coreUrl:string): Observable<any> {
    //     try {
    //         let url = coreUrl + "rasa/saveMessages";
    //         let requestObj = { userMessage: message, agent_id: 2 };
    //         let token = sessionStorage.getItem("rasauitoken") ? sessionStorage.getItem("rasauitoken") : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IlBvcnRhbCBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNTQ3MjExNzMyfQ.q1mDasGrsNQi3GCLA8vjo4c2WRkK4FVDGk7Dm8-l8MQ'            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IlBvcnRhbCBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNTQ3MjExNzMyfQ.q1mDasGrsNQi3GCLA8vjo4c2WRkK4FVDGk7Dm8-l8MQ
    //         const httpOptions = {
    //             headers: new HttpHeaders({
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer ' + token 
    //             })
    //         };
    //         return this.httpclient.post<any>(url, requestObj, httpOptions)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    public saveUserMessage(conversation: any, coreUrl: string) {
        console.log('::: save User Message :::: ');
        
        try {
            let url =  coreUrl + 'conversationRoutes/saveMessage';
            // let url = 'http://localhost:4000/conversationRoutes/saveMessage';
            let requestObj = conversation;
            // let requestObj = { userMessage: message, agent_id: 2 };
            let token = sessionStorage.getItem("rasauitoken") ? sessionStorage.getItem("rasauitoken") : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IlBvcnRhbCBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNTQ3MjExNzMyfQ.q1mDasGrsNQi3GCLA8vjo4c2WRkK4FVDGk7Dm8-l8MQ'            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IlBvcnRhbCBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNTQ3MjExNzMyfQ.q1mDasGrsNQi3GCLA8vjo4c2WRkK4FVDGk7Dm8-l8MQ
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token 
                })
            };
            this.httpclient
                .post<any>(url, requestObj, httpOptions)
                .subscribe((res) => {
                    console.log(res);
                });
        } catch (error) {
            console.error(error);
        }
    }

    getAuthorizationToken(coreUrl: string): Observable<any> {
        try {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
            let url = coreUrl + "api/v2/auth";
            let requestObj = { password: "admin", username: "admin" };
            return this.httpclient.post<any>(url, requestObj, httpOptions)
        } catch (error) {
            console.error(error);
        }
    }

}
