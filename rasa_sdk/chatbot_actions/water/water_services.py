import logging
import time,datetime,json
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.Restapi import RestApiClient
from chatbot_actions.bot_enums.actionType import ActionType
from Util.config  import *
logger = logging.getLogger(__name__)

class WaterServices(FormAction):

    def name(self):
        return 'action_water_services'
        
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_water_services  ::::: ")
        responseObj = dict()
        responseObj["type"] = ActionType.WATER_SUB_SERVICES.value
        responseObj["value"] = None
        # dispatcher.utter_template("utter_water_services", tracker)
        dispatcher.utter_attachment(responseObj)
        return []

class NewWaterConnection(FormAction):

    def name(self):
        return 'action_new_water_connection'
        
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_new_water_connection  ::::: ")
        dispatcher.utter_message(" Here is the link :: http://owc.bwssb.gov.in/member which will help you in new water connection")
        return []

class WaterScheduleService(FormAction):

    def name(self):
        return 'action_water_schedule'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info('Bot action_water_schedule Called!!!!')
        try:
            waterScheduleObj = dict()
            waterScheduleObj["latitude"] = 12.986286#tracker.get_slot("latitude")
            waterScheduleObj["longitude"] = 77.595527 #tracker.get_slot("longitude")

            restApiClient = RestApiClient()
            response = restApiClient.postRestApiCall(tempSwmApi + 'ChatbotRequestForScheduletime',json.dumps(waterScheduleObj))

      
            logger.info("::::: response ChatbotRequestForScheduletime ::::: {}".format(response.json()))
            if(response.json()):
                if(response.json()["Status"] == "Success"):
                    if(response.json()["Response Code"] == 104):
                        # pickupSchedule = response.json()
                        #  = pickupSchedule["message"]
                        dispatcher.utter_message("water schedule timings for your area is between 8AM to 9AM")
                    elif(response.json()["Response Code"] == 105):
                        dispatcher.utter_message("water schedule timings for your area is between 8AM to 9AM")
                    else:
                        dispatcher.utter_message("Sorry there was an error please try again later!!")
            else:
                dispatcher.utter_message("Sorry there was an error please try again later!!")

        except Exception as e:
            logger.exception(e)
        return []