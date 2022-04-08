import { Injectable } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Injectable()
export class CommonService {

    constructor() {
        moment.locale('en', {
            calendar : {
                lastDay : '[Yesterday]',
                sameDay : '[Today]',
                nextDay : '[Tomorrow]',
                lastWeek : '[last]',
                nextWeek : 'dddd',
                sameElse : 'L'
            }
        });
     }

    getColor(status: any) {
        let cssClass;
        if (status) {
            status = status.trim()
            status = status.toLowerCase();

        }
        switch (status) {
            case 'new':
                cssClass = 'new-span';
                break;
            case 'created':
                cssClass = 'created-span';
                break;
            case 'enquire':
                cssClass = 'enquire-span';
                break;
            case 'closed@dept':
                cssClass = 'department-span';
                break;
            case 'dispatched':
                cssClass = 'dispatched-span';
                break;
            case 'abandoned':
                cssClass = 'abandoned-span';
                break;
            case 'merged':
                cssClass = 'merged-span';
                break;
            case 'closed':
                cssClass = 'closed-span';
                break;
            case 'appreciation':
                cssClass = 'appreciation-span';
                break;
            case 'feedback':
                cssClass = 'feedback-span';
                break;
            case 'noaction':
                cssClass = 'no-action-span ';
                break;
            case 'followup':
                cssClass = 'follow-up-span ';
                break;
            case 'query':
                cssClass = 'query-span';
                break;
            case 'pending':
                cssClass = 'pending-span';
                break;
            case 'inprogress':
                cssClass = 'inprogress-span';
                break;
            case 'completed':
                cssClass = 'completed-span';
                break;
            default:
                break;
        }
        return cssClass;
    }

    getFormattedDate(unFormattedDate: any) {
        let formatedDate;
        try {
            if (unFormattedDate) {
                formatedDate = new Date(unFormattedDate);
                formatedDate = moment(new Date(unFormattedDate)).format('YYYY-MM-DD');
            } else {
                formatedDate = '';
            }
        } catch (error) {
        }
        return formatedDate;
    }

    getFormattedDateTime(unFormattedDate: any) {
        let formatedDate;
        try {
            if (unFormattedDate) {
                formatedDate = new Date(unFormattedDate);
                formatedDate = moment(new Date(unFormattedDate)).format('YYYY-MM-DD h:mm:ss a');
            } else {
                formatedDate = '';
            }
        } catch (error) {
        }
        return formatedDate;
    }

    getMomentDate(requiredDate) {
        let momentObj;
        try {
            if (requiredDate) {
                momentObj = new Date(requiredDate);
                momentObj = moment(momentObj).calendar();
            }
        } catch (error) {
            console.error(error);
        }
        return momentObj;
    }
}
