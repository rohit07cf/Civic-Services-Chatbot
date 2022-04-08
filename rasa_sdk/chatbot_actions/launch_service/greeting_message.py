import logging
import time,datetime,json
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.Restapi import RestApiClient
from chatbot_actions.bot_enums.actionType import ActionType
import logging, json
logger = logging.getLogger(__name__)


class HelpSuggestion(FormAction):

    def name(self):
        return 'action_greet_suggestion'
                
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("::::: utter_greet_suggestion ::::: ")
        responseObj = dict()
        responseObj["type"] = ActionType.GREET_SUGGESTION.value
        responseObj["value"] = None
        dispatcher.utter_attachment(responseObj)
        return []



class chatBotIcon(FormAction):
    def name(self):
        return 'action_chatbot_pic'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("::::: chatbot_icon ::::: ")
        responseObj = dict()
        responseObj["type"] = ActionType.CHAT_BOT_ICON.value
        responseObj["value"] = None
        dispatcher.utter_attachment(responseObj)
    

        return []