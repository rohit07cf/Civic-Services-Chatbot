import logging, json
from rasa_core_sdk.forms import FormAction,Action
from chatbot_actions.bot_enums.actionType import ActionType

logger = logging.getLogger(__name__)

class ConnectAgentService(FormAction):

    def name(self):
        return 'action_connect_agent_service'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info('ConnectAgentService Called!!!!')

        dispatcher.utter_template("utter_connecting_agent", tracker)
        responseObj = dict()
        responseObj["type"] = ActionType.CONNECTAGENT.value
        dispatcher.utter_attachment(responseObj)
        return []