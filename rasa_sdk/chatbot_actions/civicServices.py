import logging
import time,datetime
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet

from .actionImpleamentation.createIncident import RegisterGrevience

logger = logging.getLogger(__name__)


class ActionUpdateUserIncidentRemarks(FormAction):
    def name(self):
        return 'action_UserIncidentRemarks'

    @staticmethod
    def required_slots(tracker):
        return []# [ "user_remarks"]

    def slot_mapping(self):
        return 
        {"user_remarks" : self.from_text()  }
    
    def submit(self, dispatcher, tracker, domain):
        logger.info("action_UserIncidentRemarks")
        user_remarks = tracker.get_slot("user_remarks")
        if(user_remarks is None):
            user_remarks = tracker.latest_message.get("text")
        
        logger.info( tracker.latest_message)
        logger.info("user_remarks is '{}'.".format(user_remarks))
        logger.info('in submit')
        return [SlotSet("user_remarks" , user_remarks)]#SlotSet("user_remarks", tracker.latest_message.get("text"))



# class ActionSetWaterOnStreet(FormAction):
#     def name(self):
#         return 'action_setWaterOnStreet'

#     def submit(self, dispatcher, tracker, domain):
#         #dispatcher.utter_message("Connecting to agent, thankyou.")
#         return [SlotSet("civic_service" , "WATER_ON_STREET")]

# class ActionSetPatholeStreet(FormAction):
#     def name(self):
#         return 'action_setPatholeInStreet'

#     def submit(self, dispatcher, tracker, domain):
#         #dispatcher.utter_message("Connecting to agent, thankyou.")
#         return [SlotSet("civic_service" , "POTHOLE_IN_STREET")]


# class ActionSetStreetClean(FormAction):
#     def name(self):
#         return 'action_setStreetClean'

#     def submit(self, dispatcher, tracker, domain):
#         #dispatcher.utter_message("Connecting to agent, thankyou.")
#         return [SlotSet("civic_service" , "POTHOLE_IN_STREET")]
