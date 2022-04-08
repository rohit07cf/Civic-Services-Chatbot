import logging
import time,datetime,json
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.Restapi import RestApiClient
from chatbot_actions.bot_enums.actionType import ActionType
import logging, json
logger = logging.getLogger(__name__)
from Util.Restapi import RestApiClient
from flask import jsonify
class ContactService(FormAction):

    def name(self):
        return 'action_contact_service'
    
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_contact_service  ::::: ")
        

        # contactlist = ''' [
        #     { "contactname":"Jsssssssssssssss", "contactno":"080-41106503","designation":"Chairman","address":"indian express,shivaji nagar, bangalore india -560092"},
        #     { "contactname":"Yashvanth", "contactno":"080-41106502","designation":"Director","address":"indian express,shivaji nagar, bangalore india -560092"},
        #     { "contactname":"Susheelamma", "contactno":"080-41106532","designation":"Ofiicer","address":"indian express,shivaji nagar, bangalore india -560092"}
        # ]'''
        try:
            
            requestUrl = "http://192.168.1.171:8118/citizenEngagePhoneDirectory/contactController/getContacts"
            logger.info(":::: URL IS ::::"+requestUrl)

            requestObj=dict()
            requestObj["departmentId"]=2
            logger.info("::::::::::requestObject::::"+json.dumps(requestObj))
            restApiClient = RestApiClient()
            response = restApiClient.postRestApiCall(requestUrl,json.dumps(requestObj))
            logger.info("Request Json:{}".format(response.json()))

            
            responseJson = response.json()["contactData"]
            # logger.info("ResponseJson::{}".format(response.json())
            contactData=[]
            if len(responseJson) > 0:
                   
                for contactLists in responseJson:
                    contactData.append(contactLists)

                contactResponse = dict()
                
                contactResponse["Contacts"] = contactData  

                respnseToUi = dict()
                respnseToUi["type"] = ActionType.CONTACT_INFO.value
                respnseToUi["value"] = contactResponse
                # logger.info("ContactData In Array::"+contactData)
                dispatcher.utter_message("this is for you!")
                dispatcher.utter_attachment(respnseToUi)         

        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting contact ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return []

class PoliceStationContactService(FormAction):

    def name(self):
        return 'action_police_contact_details'
                
               
    
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_police_contact_details  ::::: ")
        responseObj = dict()

        contactlist = ''' [
            { "stationname":"rajajinagar police station", "contactno":"080-41106503" },
            { "stationname":"kormangala police station", "contactno":"080-41106502" }
        ]'''
        data = json.loads(contactlist)
        responseObj["type"] = ActionType.POLICE_CONTACT_INFO.value
        responseObj["value"] = data
        logger.info(":::::::: responseObj ::::::: {}".format(responseObj))
        dispatcher.utter_attachment(responseObj)
        return []

class FireContactService(FormAction):

    def name(self):
        return 'action_fire_contact_details'
               
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_fire_contact_details  ::::: ")
        responseObj = dict()

        contactlist = ''' [
            { "deptname":"Shivaji Nagar Fire Dept", "contactno":"080-8782212" },
            { "deptname":"Cubbon park Fire Dept", "contactno":"080-41406502" }
        ]'''
        data = json.loads(contactlist)
        responseObj["type"] = ActionType.FIRE_CONTACT_INFO.value
        responseObj["value"] = data
        logger.info(":::::::: responseObj ::::::: {}".format(responseObj))
        dispatcher.utter_attachment(responseObj)
        return []

class AmbulanceContactService(FormAction):

    def name(self):
        return 'action_ambulance_contact_details'
    
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_ambulance_contact_details  ::::: ")
        responseObj = dict()

        contactlist = ''' [
            { "hospitalname":"new horizone hospital", "contactno":"080-8782212" },
            { "hospitalname":"max hospital", "contactno":"080-41406502" }
        ]'''
        data = json.loads(contactlist)
        responseObj["type"] = ActionType.AMBULANCE_CONTACT_INFO.value
        responseObj["value"] = data
        logger.info(":::::::: responseObj ::::::: {}".format(responseObj))
        dispatcher.utter_attachment(responseObj)
        return []

class BusContactService(FormAction):

    def name(self):
        return 'action_bus_contact_details'
               
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_transport_contact_details  ::::: ")
        responseObj = dict()

        contactlist = ''' [
            { "deptname":"Shivaji Nagar Bus Dept", "contactno":"080-8782212" },
            { "deptname":"Cubbon park Bus Dept", "contactno":"080-41406502" },
            { "deptname":"Vijayanagar Bus Dept", "contactno":"080-2762214" }
        ]'''
        data = json.loads(contactlist)
        responseObj["type"] = ActionType.BUS_CONTACT_INFO.value
        responseObj["value"] = data
        logger.info(":::::::: responseObj ::::::: {}".format(responseObj))
        dispatcher.utter_attachment(responseObj)
        return []

class GarbageContactService(FormAction):

    def name(self):
        return 'action_garbage_contact_service'
    
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_contact_service  ::::: ")
        responseObj = dict()

        # contactlist = ''' [
        #     { "contactname":"Jayaram", "contactno":"080-41106503","designation":"Chairman"},
        #     { "contactname":"Yashvanth", "contactno":"080-41106502","designation":"Director"},
        #     { "contactname":"Susheelamma", "contactno":"080-41106532","designation":"Ofiicer"}
        # ]'''

        try:
            
            requestUrl = "http://192.168.1.171:8118/citizenEngagePhoneDirectory/contactController/getContacts"
            logger.info(":::: URL IS ::::"+requestUrl)

            requestObj=dict()
            requestObj["departmentId"]=2
            logger.info("::::::::::requestObject::::"+json.dumps(requestObj))
            restApiClient = RestApiClient()
            response = restApiClient.postRestApiCall(requestUrl,json.dumps(requestObj))
            logger.info("Request Json:{}".format(response.json()))

            
            responseJson = response.json()["contactData"]
            # logger.info("ResponseJson::{}".format(response.json())
            contactData=[]
            if len(responseJson) > 0:
                   
                for contactLists in responseJson:
                    contactData.append(contactLists)

                contactResponse = dict()
                
                contactResponse["Contacts"] = contactData  

                respnseToUi = dict()
                respnseToUi["type"] = ActionType.GARBAGE_CONTACT_INFO.value
                respnseToUi["value"] = contactResponse
                # logger.info("ContactData In Array::"+contactData)
                dispatcher.utter_message("this is for you!")
                dispatcher.utter_attachment(respnseToUi)         

        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting contact ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return []


        # data = json.loads(contactlist)
        # responseObj["type"] = ActionType.GARBAGE_CONTACT_INFO.value
        # responseObj["value"] = data
        # logger.info(":::::::: responseObj ::::::: {}".format(responseObj))
        # dispatcher.utter_attachment(responseObj)
        # return []
