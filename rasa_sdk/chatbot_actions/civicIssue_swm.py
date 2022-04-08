import logging
import time,datetime
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.intents import civicIntentMap

from .actionImpleamentation.createIncident import RegisterGrevience

logger = logging.getLogger(__name__)

class CivicSwmServiceType(FormAction):
    """docstring for ClassName"""
    def name(self):
         return 'action_setSwmCivicType'

    @staticmethod
    def required_slots(tracker):
        civicService = tracker.get_slot("civic_service")
        intentName = tracker.latest_message.get("intent").get("name")
        if(intentName not in civicIntentMap and civicService is None ):
            return ["civic_service"]
        
        return []

    def slot_mapping(self):
        servicesFromIntent = []
        
        for intentName, civicService in civicIntentMap.items():
            #servicesFromIntent[intentName]=civicService
            servicesFromIntent.append( self.from_intent(intent=intentName, value=civicService))
            '''
            [
             self.from_intent(intent='missed+garbage+pickup', value="MISSED_GARBAGE_PICKUP"),
             self.from_intent(intent='garbage+pickup+not_arraived', value="GARBAGE_VEHICEL_NOT_ARRIVED"),
             self.from_intent(intent='garbage+burning', value="BURNING_OF_GARBAGE_IN_OPEN_SPACE")
        ]
            '''
        return {"civic_service":servicesFromIntent }


    def submit(self, dispatcher, tracker, domain):

        events=[]
        user_remarks = tracker.latest_message.get("text")
        
        intentName = tracker.latest_message.get("intent").get("name")
        logger.info("last intent name :{}".format(intentName))
        
        civicerviceRequired = civicIntentMap.get(intentName)
        logger.info(" civic issue :{}".format(civicerviceRequired))
        
        events.append(SlotSet("civic_service" , civicerviceRequired))
        if(len(user_remarks)>50):
           events.append(SlotSet("requested_slot","user_remarks"))
        return events
        

class ActionSetMissedGarbagePickup(FormAction):
    def name(self):
        return 'action_setMissedGarbagePickup'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        return []


    def submit(self, dispatcher, tracker, domain):
        #dispatcher.utter_message("Connecting to agent, thankyou.")
        return [SlotSet("civic_service" , "MISSED_GARBAGE_PICKUP")]

class ActionSetGarbageVehicleNotArrived(FormAction):
    def name(self):
        return 'action_setGarbageNotArrived'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        return []


    def submit(self, dispatcher, tracker, domain):
        #dispatcher.utter_message("Connecting to agent, thankyou.")
        return [SlotSet("civic_service" , "GARBAGE_VEHICEL_NOT_ARRIVED")]

class ActionSetBURNING_OF_GARBAGE_IN_OPEN_SPACE(FormAction):
    def name(self):
        return 'action_setBurningOfGarbageInOpenSpace'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        return []


    def submit(self, dispatcher, tracker, domain):
        #dispatcher.utter_message("Connecting to agent, thankyou.")
        return [SlotSet("civic_service" , "BURNING_OF_GARBAGE_IN_OPEN_SPACE")]
