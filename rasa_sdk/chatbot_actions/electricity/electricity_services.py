import logging
import time,datetime,json
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.Restapi import RestApiClient
from chatbot_actions.bot_enums.actionType import ActionType
from Util.config import *
import logging, json
logger = logging.getLogger(__name__)

class ElectricityServices(FormAction):

    def name(self):
        return 'action_electricity_services'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_electricity_services  ::::: ")
        responseObj = dict()
        responseObj["type"] = ActionType.ELECTRICITY_SUB_SERVICES.value
        responseObj["value"] = None
        # dispatcher.utter_template("utter_electricity_services", tracker)
        logger.info("::::: ELECTRICITY VALUE ::::: {} ".format(responseObj))
        dispatcher.utter_attachment(responseObj)
        return []

class ElectricityAccBalanceInfo(FormAction):

    def name(self):
        return "action_electricity_balance_info"

    @staticmethod
    def required_slots(tracker):
        return ["electricityaccno"]

    def slot_mappings(self):
        return { "electricityaccno": [self.from_text(intent=None)]
        }

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for nearByDepots----------")

        try:
            userAccNo = tracker.get_slot("electricityaccno")
            restApiClient = RestApiClient()
            # accessUrl = "http://40.81.72.252:8282/t/demo.com/getAccountInfo/1.0/meterApplication/getMeterIdByAccNo?accNo=0.0.0.1-1151794"
            accessUrl = electricityBalanceUrl + "?accNo={}".format(userAccNo)
            logger.info("Url for Electricity Balance::::: "+ accessUrl)
            response = restApiClient.getESBApiCall(accessUrl)
            balanceAvailable = None
            logger.info("Response Json: :::: {}".format(response.json()))
            # responseJson = response.json()
            if(response.json()):
                if "getBalanceInfoResponse" in response.json():
                    logger.info("INSIDE getBalanceInfoResponse:::")
                    if "RESULTS" in response.json()["getBalanceInfoResponse"]: 
                        logger.info("INSIDE RESULTS:::")
                        if "BALANCES" in response.json()["getBalanceInfoResponse"]["RESULTS"]:
                            logger.info("INSIDE BALANCES:::")
                            if len(response.json()["getBalanceInfoResponse"]["RESULTS"]["BALANCES"]) > 1:
                                logger.info("INSIDE BALANCES>1:::")
                                currentBalanceInfo=response.json()["getBalanceInfoResponse"]["RESULTS"]["BALANCES"][1]
                                currentBalance=currentBalanceInfo["SUB_BALANCES"]["CURRENT_BAL"]
                                # Save Account no to City app
                                try:
                                    logger.info("Saved SuccessFully::::"+tracker.sender_id)
                                    requestBodyData = dict()
                                    requestBodyData["userId"] = tracker.sender_id
                                    requestBodyData["accountNo"] = userAccNo
                                    logger.info("Request Json:" + json.dumps(requestBodyData))
                                    restApiClient = RestApiClient()
                                    response = restApiClient.postRestApiCall(updateElctricityAccountUrl,json.dumps(requestBodyData))
                                except Exception as exception:
                                    logger.exception(exception)
                                
                                if abs(currentBalance) > 0:
                                    balanceAvailable= True
                                else:
                                    balanceAvailable= False
                            else:
                               dispatcher.utter_message("Sorry,Unable to get your balance please try after some time")   
                        else:
                            dispatcher.utter_message("Sorry,Unable to get your balance please try after some time")    
                    else:
                       dispatcher.utter_message("Sorry,Unable to get Electricity data please try after some time")
            else:
              dispatcher.utter_message("Unable to get data please try after some time")        
           
        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting Electricity Info ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("electricityaccno", None),SlotSet("balance_available", balanceAvailable)]