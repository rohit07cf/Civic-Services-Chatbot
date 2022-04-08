import logging
import time,datetime,json
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.Restapi import RestApiClient
from chatbot_actions.bot_enums.actionType import ActionType
from rasa_core_sdk.events import SlotSet
from Util.config  import *

logger = logging.getLogger(__name__)

class CityAirQualityInfo(FormAction):

    def name(self):
        return "action_air_quality_service"

    @staticmethod
    def required_slots(tracker):
        
        return []

    def submit(self, dispatcher, tracker, domain):
        try:
            logger.info("E-services Called")

            airqtyReqObj = dict()
            airqtyReqObj["lat"] = tracker.get_slot("latitude")
            airqtyReqObj["long"] = tracker.get_slot("longitude")
            
            restApiClient = RestApiClient()
            # forwardToTempAirQtyEsb(airqtyReqObj)
            url = airQualityAccessUrl + "getDeviceDetails?macId=6CECEB5D4208&deviceId=22804"
            response = restApiClient.getESBApiCall(url)

            if(response.json()):
                
                if(response.json()["sensorData"]):
                    responseJson = response.json()["sensorData"]
                    
                    # if len(responseJson) > 0:
                    airqtyObj = dict()
                    # reponseObj = dict()

                    airqtyObj["type"] = ActionType.AIRQUALITYINFO.value
                    airqtyObj["value"] = responseJson

                    replyMessage = "Thanks, Please ﬁnd the air quality details"
                    dispatcher.utter_message(replyMessage)
                    logger.info("POLLUTION Response Json:{}".format(airqtyObj))
                    dispatcher.utter_attachment(airqtyObj)
                    # else:
                    #     replyMessage = "Sorry, No air quality details available in this place!"
                    #     dispatcher.utter_message(replyMessage)        
                else:
                    replyMessage = "Sorry, Please try again later!"
                    dispatcher.utter_message(replyMessage)
            else:
                replyMessage = "Sorry, Please try again later!"
                dispatcher.utter_message(replyMessage)
        except Exception as e:
            logger.exception(e)
            replyMessage = "Sorry, Please try again later!"
        return [SlotSet("latitude", None),SlotSet("longitude",None)]