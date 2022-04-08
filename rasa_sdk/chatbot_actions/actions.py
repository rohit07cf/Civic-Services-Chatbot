#import argparse
#import warnings
#from __future__ import absolute_import, division, print_function, unicode_literals
import json
import logging
from Util.Restapi import RestApiClient
from Util.config  import *
from rasa_core_sdk import Action
from rasa_core_sdk.events import SlotSet,AllSlotsReset,Restarted
from rasa_core_sdk.forms import FormAction
from Util.Restapi import RestApiClient
from Util.config  import *

logger = logging.getLogger(__name__)

'''
    Fallback action
'''
class ActionFallback(Action):
    def name(self):
        return 'action_fallback'

    def run(self, dispatcher, tracker, domain):
        logger.info("::::: BOT FALL BACK :::::::::")
        dispatcher.utter_template("utter_bot_sorry", tracker)
        dispatcher.utter_template("utter_connect_operator", tracker)
        dispatcher.utter_template("utter_agent_connect",tracker)
        logger.info('::::: MESSAGE  ::::: {}'.format(tracker.latest_message))
        {'intent': {'name': None, 'confidence': 0.0}, 'entities': [], 'intent_ranking': [], 'text': 'tesinggggggg', 'project': 'freeText', 'model': 'model_20190404-140746'}
        
        headers =  {    'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IlBvcnRhbCBBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNTQ3MjExNzMyfQ.q1mDasGrsNQi3GCLA8vjo4c2WRkK4FVDGk7Dm8-l8MQ'
                    }
        restApiClient = RestApiClient()
        response = restApiClient.postRestApiCallWithHttpHeaders(rasaUiUrl + 'fallbackRoute/saveFallBackMessage', json.dumps(tracker.latest_message), headers)
        logger.info('::::: RESPONSE :::: {}'.format(response))
        return []