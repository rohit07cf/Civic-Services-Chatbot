import logging
import time,datetime
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet


logger = logging.getLogger(__name__)


class ActionSetPotholeInStreet(FormAction):
    def name(self):
        return 'action_setPotholeInStreet'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        return []


    def submit(self, dispatcher, tracker, domain):
        #dispatcher.utter_message("Connecting to agent, thankyou.")
        return [SlotSet("civic_service" , "POTHOLE_IN_STREET")]

class ActionSetWaterOnStreet(FormAction):
    def name(self):
        return 'action_setWaterOnStreet'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        return []


    def submit(self, dispatcher, tracker, domain):
        #dispatcher.utter_message("Connecting to agent, thankyou.")
        return [SlotSet("civic_service" , "WATER_ON_STREET")]

class ActionSetStreetClean(FormAction):
    def name(self):
        return 'action_setStreetClean'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        return []


    def submit(self, dispatcher, tracker, domain):
        #dispatcher.utter_message("Connecting to agent, thankyou.")
        return [SlotSet("civic_service" , "STREET_CLEANING")]

class ActionSetStreetLightPoledamage(FormAction):
    def name(self):
        return 'action_setStreetLightpoleDamage'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        return []


    def submit(self, dispatcher, tracker, domain):
        #dispatcher.utter_message("Connecting to agent, thankyou.")
        return [SlotSet("civic_service" , "STREET_LIGHT_POLE_DAMAGE")]
