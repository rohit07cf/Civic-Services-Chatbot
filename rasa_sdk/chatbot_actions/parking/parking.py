import logging, json
from Util.Restapi import RestApiClient
from rasa_core_sdk.forms import FormAction,Action
from chatbot_actions.bot_enums.actionType import ActionType
from rasa_core_sdk.events import SlotSet
from Util.config  import *

logger = logging.getLogger(__name__)

class ParkingService(FormAction):

    def name(self):
        return 'action_parking_service'
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info('Bot ParkingService Called!!!! parking_vehicle_type: ')
        
        try:
            # parkingReqObj = dict()
            # parkingReqObj["lat"] = tracker.get_slot("latitude")
            # parkingReqObj["long"] = tracker.get_slot("longitude")
            # logger.info("::::: PARKING  ::::: CALLED :::: {}".format(parkingReqObj))
            # restApiClient = RestApiClient()
            # response = restApiClient.forwardToTempParkingEsb(parkingReqObj)
            # logger.info("::::: REPSONSE PARKING :::: {}".format(response.json()))
            # if(response.json()):
            #     if(response.json()["Parking"]):
            #         responseJson = response.json()["Parking"]
            #         logger.info("Response Json:" + json.dumps(responseJson))
            #         if len(responseJson) > 0:
            #             parkingObj = dict()
            #             reponseObj = dict()
            #             reponseObj["fromLat"] = tracker.get_slot("latitude")
            #             reponseObj["fromLong"] = tracker.get_slot("longitude")
            #             reponseObj["parkingInfo"] = responseJson

            #             parkingObj["type"] = "parking"
            #             parkingObj["value"] = reponseObj

            #             # replyMessage = "OK, Here is the cost and parking slot availability Info"
            #             dispatcher.utter_template("utter_costslotinfo", tracker)
            #             # dispatcher.utter_message(replyMessage)
            #             dispatcher.utter_attachment(parkingObj)

            #         else:
            #             replyMessage = "Sorry, No Parking places available in this place!"
            #             dispatcher.utter_message(replyMessage)
            #     else:
            #         replyMessage = "Sorry, Please try again later!"
            #         dispatcher.utter_message(replyMessage)
            # else:
            #     replyMessage = "Sorry, Please try again later!"
            #     dispatcher.utter_message(replyMessage)

            """ {
                "lat":12.9708249,
                "lng":77.5351751,
                "company_id":1003

            }"""
            logger.info("::::: TWOOOOO ::::::::::: {}".format(tracker.get_slot("parking_vehicle_type")))
            if(tracker.get_slot("parking_vehicle_type") == "two_wheeler"):
                
                parkingReqObj = dict()
                parkingReqObj["lat"] = tracker.get_slot("latitude")
                parkingReqObj["lng"] = tracker.get_slot("longitude")
                parkingReqObj["company_id"] = "demo"
                parkingReqObj["vehicle_type"] = 1
                
                logger.info("::::: PARKING  ::::: CALLED :::: {}".format(parkingReqObj))
                restApiClient = RestApiClient()
                response = restApiClient.postRestApiCall(parkingUrl, json.dumps(parkingReqObj))
                logger.info("::::: REPSONSE PARKING :::: {} ".format(response))

                if(response.json()):
                    logger.info("::::: PARKING  ::::: INSIDE IF :::")
                    if (response.json()["status"] == 'Success'):
                        if len(response.json()["nearestParkingLocations"]) > 0:
                            parkingDetails = []
                            parkingresponseData = response.json()["nearestParkingLocations"]
                            for parking in parkingresponseData:
                                parking["parkingName"] = parking["loc_name"]
                                parking["parkingLocation"] = parking["loc_address"]
                                parkingDetails.append(parking)
                            
                            logger.info("::::: FINAL OBJECT IS  ::::: {}".format(parkingDetails))
                            
                            reponseObj = dict()
                            reponseObj["fromLat"] = tracker.get_slot("latitude")
                            reponseObj["fromLong"] = tracker.get_slot("longitude")
                            reponseObj["twoWheelerParkingInfo"] = parkingDetails

                            two_parkingObj = dict()
                            two_parkingObj["type"] = ActionType.TWO_WHEELER_PARKINGLIST.value
                            two_parkingObj["value"] = reponseObj

                            dispatcher.utter_template("utter_costslotinfo", tracker)
                            dispatcher.utter_attachment(two_parkingObj)
                            
                        else:
                            replyMessage = "Sorry, No Parking places available in this place!"
                            dispatcher.utter_message(replyMessage)
                    else:
                        replyMessage = "Sorry, No Parking places available in this place!"
                        dispatcher.utter_message(replyMessage)
                else:
                    replyMessage = "Sorry, Please try again later!"
                    dispatcher.utter_message(replyMessage)


                # replyMessage = "Sorry, currently the parking services is not available for two wheeler"
                # dispatcher.utter_message(replyMessage)
            else:
                parkingReqObj = dict()
                parkingReqObj["lat"] = tracker.get_slot("latitude")
                parkingReqObj["lng"] = tracker.get_slot("longitude")
                parkingReqObj["company_id"] = "demo"
                parkingReqObj["vehicle_type"] = 2
                
                logger.info("::::: PARKING  ::::: CALLED :::: {}".format(parkingReqObj))
                restApiClient = RestApiClient()
                response = restApiClient.postRestApiCall(parkingUrl, json.dumps(parkingReqObj))
                logger.info("::::: REPSONSE PARKING :::: {} ".format(response))

                if(response.json()):
                    
                    if (response.json()["status"] == 'Success'):
                        if len(response.json()["nearestParkingLocations"]) > 0:
                            parkingDetails = []
                            parkingresponseData = response.json()["nearestParkingLocations"]
                            for parking in parkingresponseData:
                                parking["parkingName"] = parking["loc_name"]
                                parking["parkingLocation"] = parking["loc_address"]
                                parkingDetails.append(parking)
                            
                            logger.info("::::: FINAL OBJECT IS  ::::: {}".format(parkingDetails))
                            
                            reponseObj = dict()
                            reponseObj["fromLat"] = tracker.get_slot("latitude")
                            reponseObj["fromLong"] = tracker.get_slot("longitude")
                            reponseObj["parkingInfo"] = parkingDetails

                            parkingObj = dict()
                            parkingObj["type"] = ActionType.PARKINGLIST.value
                            parkingObj["value"] = reponseObj

                            dispatcher.utter_template("utter_costslotinfo", tracker)
                            dispatcher.utter_attachment(parkingObj)
                            
                        else:
                            replyMessage = "Sorry, No Parking places available in this place!"
                            dispatcher.utter_message(replyMessage)
                    else:
                        replyMessage = "Sorry, No Parking places available in this place!"
                        dispatcher.utter_message(replyMessage)
                else:
                    replyMessage = "Sorry, Please try again later!"
                    dispatcher.utter_message(replyMessage)

        except Exception as e:
            logger.exception(e)
            replyMessage = "Sorry, Please try again later!"
            dispatcher.utter_message(replyMessage)
        return [SlotSet("latitude", None), SlotSet("longitude", None)]