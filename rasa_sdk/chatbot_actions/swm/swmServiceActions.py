import logging
import time,datetime,json
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.Restapi import RestApiClient
from Util.config  import *
from chatbot_actions.bot_enums.actionType import ActionType
import json
logger = logging.getLogger(__name__)

class ReportToSWMAsGarbageBinFull(FormAction):

    def name(self):
        return "action_nextGarbagePickupTime"

    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for ReportToSWMAsGarbageBinFull----------")
        
        try:
            
            requestUrl =  tempSwmApi + "/ChatbotRequestForBinCollection"
            garbageBinData = dict()
            garbageBinData["latitude"] = tracker.get_slot("latitude")
            garbageBinData["longitude"] = tracker.get_slot("longitude")
            garbageBinData["citizenComplaintId"] = 26
            garbageBinData["citizenComplaintType"] ="Garbage bin is full"

            restApiClient = RestApiClient()
            response = restApiClient.postRestApiCall(requestUrl, json.dumps(garbageBinData))
            responseJson = response.json()
            logger.info("Response Json:" + json.dumps(responseJson))

            if "Status" in responseJson:
                if(responseJson["Status"] == "Success"):
                    if (responseJson["Responce Code"] == 101):
                        # If binlocation is already in trip then message will be as below 
                        dispatcher.utter_message("Bin Location Already Scheduled And It Will Be Serviced Today")
                    elif(responseJson["Responce Code"] == 102):
                        # If binlocation is not in trip then message will be as below 
                        dispatcher.utter_message("This Ward Garbage Will Be Collected By Tomorrow")
                    elif(responseJson["Responce Code"] == 103):
                        # If given location is not bin location then message will be as below
                        dispatcher.utter_message("Location Given Is Not Bin Location")
                else:
                    dispatcher.utter_message("Sorry there was an error please try again later!!")
            else:
                dispatcher.utter_message("Sorry there was an error please try again later!!")
        except Exception as e:
            logger.exception(e)
            # SlotSet("garbage_bin_status", garbageBinStatus), SlotSet("garbage_bin_message", garbageBinMessage)
            dispatcher.utter_message("Sorry there was an error please try again later!!")
        return[SlotSet("latitude", None), SlotSet("longitude", None)]

class GarbagePickupService(FormAction):

    def name(self):
        return 'action_garbage_pickup_schedule'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info('Bot action_garbage_pickup_schedule Called!!!!')
        try:
            garbageReqObj = dict()
            garbageReqObj["latitude"] = 12.986286 #tracker.get_slot("latitude")
            garbageReqObj["longitude"] = 77.595527 #tracker.get_slot("longitude")
            # userLocationData = dict()
            # userLocationData["lat"] = tracker.get_slot("latitude")
            # userLocationData["lon"] = tracker.get_slot("longitude")
            requestData = dict()
            requestData["department"] = "SWM"
            requestData["service"] = "ChatbotRequestForScheduletime"
            requestData["data"] = garbageReqObj
            logger.info("Request Json:" + json.dumps(requestData))
            restApiClient = RestApiClient()
            response = restApiClient.postESBApiCall(esb_access_url,json.dumps(requestData))
            responseJson = response.json()
            if(responseJson):
                logger.info(":::  responseJson :::")
                if(responseJson["code"] == 105):
                    dispatcher.utter_message("Garbage pickup scheduled Tomorrow between 6 AM to 5 PM")
                elif(responseJson["code"] == 104):
                    dispatcher.utter_message("Garbage pickup scheduled Tomorrow between 7 AM to 8 PM")
                else:
                    dispatcher.utter_message("Sorry there was an error please try again later!!")
            else:
                dispatcher.utter_message("Sorry there was an error please try again laterrr!!")
        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in garbage pickup service ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("latitude", None), SlotSet("longitude", None)]
       
       
        # try:
        #     garbageReqObj = dict()
        #     garbageReqObj["latitude"] = 12.986286#tracker.get_slot("latitude")
        #     garbageReqObj["longitude"] = 77.595527 #tracker.get_slot("longitude")

        #     restApiClient = RestApiClient()
        #     response = restApiClient.postRestApiCall(tempSwmApi + 'ChatbotRequestForScheduletime',json.dumps(garbageReqObj))

        #     '''
        #         { "Status": "Success",
        #             "Message": " Garbage pickup schedule timings for a location is between 6 AM to 5 PM",
        #             "Response Code": 104
        #         }
        #     '''
        #     logger.info("::::: response ChatbotRequestForScheduletime ::::: {}".format(response.json()))
        #     if(response.json()):
        #         if(response.json()["Status"] == "Success"):
        #             if(response.json()["Response Code"] == 104):
        #                 # pickupSchedule = response.json()
        #                 #  = pickupSchedule["message"]
        #                 dispatcher.utter_message("Garbage pickup schedule timings for your area is between 7AM to 8AM")
        #             elif(response.json()["Response Code"] == 105):
        #                 dispatcher.utter_message("Garbage pickup schedule timings for your area is between 7AM to 8AM")
        #             else:
        #                 dispatcher.utter_message("Sorry there was an error please try again later!!")
        #     else:
        #         dispatcher.utter_message("Sorry there was an error please try again later!!")

        #     # replyMessage = "The garbage pick up schedule Timings is 7:30AM – 8:00 AM"
        #     # test = "i can suggest, You can dump your garbage nearest garbage bin"
        #     # test1 = "Do you want to know the location of the bin?"
            
        #     # dispatcher.utter_message(replyMessage)
        # except Exception as e:
        #     logger.exception(e)
        # return []

class GarbageBinLocation(FormAction):

    def name(self):
        return 'action_garbage_bin_location'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("::::: Garbage bin location is ::::: ")
        
        try:
            garbageReqObj = dict()
            garbageReqObj["latitude"] = 12.986286 #tracker.get_slot("latitude")
            garbageReqObj["longitude"] = 77.595527 #tracker.get_slot("longitude")
            requestData = dict()
            requestData["department"] = "SWM"
            requestData["service"] = "ChatbotRequestForNearestBin"
            requestData["data"] = garbageReqObj
            logger.info("Request Json:" + json.dumps(requestData))
            restApiClient = RestApiClient()
            response = restApiClient.postESBApiCall(esb_access_url,json.dumps(requestData))
            responseJson = response.json()
            if(response.json()):
                if(response.json()["status"] == "Success"):
                    logger.info("::::::::Response Json::::::")
                    if("Responce Code" not in response.json()):
                        logger.info(":::::: response.json() :::::: {}".format(response.json()))
                        binData = response.json()
                        nearestBinData = dict()
                        binLocData = binData["binLocationDetails"][0]
                        nearestBinData["ETA"] = binLocData["ETA"]
                        nearestBinData["distance"] = binLocData["distance"]
                        nearestBinData["binLocationAddress"] = binLocData["binLocationAddress"]
                        nearestBinData["binLocation"] = binLocData["binLocation"].replace('_', ' ')
                        nearestBinData["zoneName"] = binLocData["zoneName"]
                        nearestBinData["wardName"] = binLocData["wardName"]
                        nearestBinData["lat"] = binLocData["lat"]
                        nearestBinData["long"] = binLocData["long"]
                        nearestBinData["fromLatitude"] = tracker.get_slot("latitude")
                        nearestBinData["fromLongitude"] = tracker.get_slot("longitude")

                        nearbyBinLocResponse = dict()
                        nearbyBinLocResponse["type"] = ActionType.NEARBY_BIN_LOC.value
                        nearbyBinLocResponse["value"] = nearestBinData
                        dispatcher.utter_message("Here it is you asked for")
                        dispatcher.utter_attachment(nearbyBinLocResponse)
                    elif(response.json()["Response Code"] == 103):
                        dispatcher.utter_message("Sorry there is no nearby garbage bin location")
                    else:
                        dispatcher.utter_message("Sorry there was an error please try again later!!")
            else:
                dispatcher.utter_message("Sorry there was an error please try again later!!")
        except Exception as ex:
            logger.exception(ex)
            dispatcher.utter_message("Sorry there was an error please try again later!!")
        return [SlotSet("latitude", None), SlotSet("longitude", None)]
        # try:
        #     garbageReqObj = dict()
        #     garbageReqObj["latitude"] = tracker.get_slot("latitude")
        #     garbageReqObj["longitude"] = tracker.get_slot("longitude")

        #     restApiClient = RestApiClient()
        #     response = restApiClient.postRestApiCall(tempSwmApi + 'ChatbotRequestForNearestBin',json.dumps(garbageReqObj))
            
        #     '''
            
        #     {
        #         "Status": "Success",
        #         "Bin Location Details": [
        #             {
        #                 "bin_location_address": "21/F, Cunningham Main Rd, Sampangi Rama Nagar, Bengaluru, Karnataka 560001, India",
        #                 "bin_location": "Trinity_mobility",
        #                 "zone_name": "zone1",
        #                 "ward_name": "ward1",
        #                 "lat": 12.982943547152718,
        #                 "long": 77.5987545708224,
        #                 "ETA": "6min",
        #                 "Distance": "369meter"
        #             }
        #         ],
        #     }

        #     '''
        #     if(response.json()):
        #         if(response.json()["Status"] == "Success"):
        #             if("Responce Code" not in response.json()):
        #                 logger.info(":::::: response.json() :::::: {}".format(response.json()))
        #                 binData = response.json()
        #                 nearestBinData = dict()
        #                 binLocData = binData["Bin Location Details"][0]
        #                 nearestBinData["eta"] = binLocData["ETA"]
        #                 nearestBinData["distance"] = binLocData["Distance"]
        #                 nearestBinData["binAddress"] = binLocData["bin_location_address"]
        #                 nearestBinData["binLocation"] = binLocData["bin_location"].replace('_', ' ')
        #                 nearestBinData["zoneName"] = binLocData["zone_name"]
        #                 nearestBinData["wardName"] = binLocData["ward_name"]
        #                 nearestBinData["binlatitude"] = binLocData["lat"]
        #                 nearestBinData["binlongitude"] = binLocData["long"]
        #                 nearestBinData["fromLatitude"] = tracker.get_slot("latitude")
        #                 nearestBinData["fromLongitude"] = tracker.get_slot("longitude")

        #                 nearbyBinLocResponse = dict()
        #                 nearbyBinLocResponse["type"] = ActionType.NEARBY_BIN_LOC.value
        #                 nearbyBinLocResponse["value"] = nearestBinData
        #                 dispatcher.utter_message("Here it is you asked for")
        #                 dispatcher.utter_attachment(nearbyBinLocResponse)
        #             elif(response.json()["Responce Code"] == 103):
        #                 dispatcher.utter_message("Sorry there is no nearby garbage bin location")
        #             else:
        #                 dispatcher.utter_message("Sorry there was an error please try again later!!")
        #     else:
        #         dispatcher.utter_message("Sorry there was an error please try again later!!")
        # except Exception as ex:
        #     logger.exception(ex)
        #     dispatcher.utter_message("Sorry there was an error please try again later!!")
        # return [SlotSet("latitude", None), SlotSet("longitude", None)]

class GarbageServices(FormAction):

    def name(self):
        return 'action_garbage_services'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_garbage_services  ::::: ")
        responseObj = dict()
        responseObj["type"] = ActionType.GARBAGE_SUB_SERVICES.value
        responseObj["value"] = None
        # dispatcher.utter_template("utter_garbage_services", tracker)
        dispatcher.utter_attachment(responseObj)
        return []