import logging, json
from Util.Restapi import RestApiClient
from Util.config  import *
from rasa_core_sdk.forms import FormAction,Action
from chatbot_actions.bot_enums.actionType import ActionType
logger = logging.getLogger(__name__)

class BotActionService(FormAction):

    def name(self):
        return 'action_bot_service'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info('Bot Action service Called!!!!')
        try:
            #incidentObj["userId"] = tracker.sender_id
            #incidentObj["count"] = 5
            phoneNO= tracker.get_slot("phoneNo")
            print("PHONE NUMBER: ",str(phoneNO))
            
            restApiClient = RestApiClient()
            complaintId = tracker.get_slot("complainId")
            print('Complaint ID: ',str(complaintId))
            #=======================================================================================
            if(tracker.get_slot("complainId")!=''):
                print("INSIDE complainId IF ")
                complaintId = tracker.get_slot("complainId")
                complainIdObj = dict()
                complainIdObj["incidentId"] = complaintId
                print(complainIdObj)
                #response = restApiClient.postRestApiCall('http://10.9.76.48:8085/CEPWebService/chatbotController/getChatBotIncidentStatus',json.dumps(complainIdObj))
                response = restApiClient.postRestApiCall('http://123.201.255.65:8582/CEPWebService/chatbotController/getChatBotIncidentStatus',json.dumps(complainIdObj))
                responseJson = response.json()
                logger.info("IF Response Json:" + json.dumps(responseJson))
                complaintId =""; 
                if(responseJson["status"]):
                    if(responseJson["resultData"]):

                        if len(responseJson["resultData"]) > 0:

                            result = dict()
                            result["value"] = responseJson["resultData"]
                            result["type"] = ActionType.REPORTEDINCIDENTSlIST.value
                            dispatcher.utter_message("Here is the status of the complaint you have raised!")
                            dispatcher.utter_attachment(result)
                        else:
                            logger.info(" No complaints Raised !!!!")
                            dispatcher.utter_message("Sorry, you did not report any incidents till now!")
                        return []
         
            #====================================================================================
            elif(phoneNO!=''):
                incidentObj = dict()
                incidentObj["phoneNo"] = phoneNO
                logger.info("Request Json:" + json.dumps(incidentObj))
                cepUrl = tracker.get_slot("cepServerUrl")
                #response = restApiClient.postRestApiCall(cepUrl + 'chatbotController/getLatestComplaints/',json.dumps(incidentObj))
                #response = restApiClient.postRestApiCall('http://10.9.76.48:8085/CEPWebService/chatbotController/getChatBotIncidentStatusList',json.dumps(incidentObj))
                response = restApiClient.postRestApiCall('http://123.201.255.65:8582/CEPWebService/chatbotController/getChatBotIncidentStatusList',json.dumps(incidentObj))
                #http://c167eecc.ngrok.io/CEPWebService/chatbotController/getChatBotIncidentStatusList
                responseJson = response.json()
                logger.info("Response Json:" + json.dumps(responseJson))
                
                if(responseJson["status"]):
                    if(responseJson["resultData"]):
                        if len(responseJson["resultData"]) > 0:

                            result = dict()
                            result["value"] = responseJson["resultData"]
                            result["type"] = ActionType.REPORTEDINCIDENTSlIST.value
                            dispatcher.utter_message("Here is the list of the complaints you have raised!")
                            dispatcher.utter_attachment(result)
                        else:
                            logger.info(" No complaints Raised !!!!")
                            dispatcher.utter_message("Sorry, you did not report any incidents till now!")
                    else:
                        logger.info("INSIDE IF ::::: ")
                        dispatcher.utter_message("Sorry, an error occured while fetching complaints.  ")
                        dispatcher.utter_message("Please try again later... ")
                else:
                    dispatcher.utter_message("Sorry, an error occured while fetching complaints.  ")
                    dispatcher.utter_message("Please try again later... ") 
                return []      
        except Exception as e:
            logger.exception(e)     
            dispatcher.utter_message("Please try again later... ")
        return []


class BotService(FormAction):
    def name(self):
        return 'action_show_help_services'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::::: action_show_help_services CALLED ::::::::::::::")
        try:
            result = dict()
            result["type"] = ActionType.HELPOPTIONS.value
            dispatcher.utter_attachment(result)
        except Exception as e:
            logger.exception(e)
        return[]