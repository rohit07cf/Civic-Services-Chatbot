from rasa_core_sdk.forms import FormAction,Action
from Util.Restapi import RestApiClient
from Util.config  import *
import json, logging
from chatbot_actions.bot_enums.actionType import ActionType
from rasa_core_sdk.events import SlotSet

logger = logging.getLogger(__name__)

class ITMSNearestBustop(FormAction):

    def name(self):
        return "action_nearestBustop"

    @staticmethod
    def required_slots(tracker):
        if(tracker.get_slot("latitude") is None):
            return ["address"]
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for ReportToITSForBusStop ----------")
        try:
            userLocationData = dict()
            userLocationData["lat"] = tracker.get_slot("latitude")
            userLocationData["lon"] = tracker.get_slot("longitude")
            requestData = dict()
            requestData["department"] = "ITMS"
            requestData["service"] = "nearByStops"
            requestData["data"] = userLocationData
            # logger.info("Request Json:" + json.dumps(requestData))
            restApiClient = RestApiClient()
            response = restApiClient.postESBApiCall(esb_access_url,json.dumps(requestData))
            # logger.info("Response Json:" + json.dumps(responseJson))

            if (response.json()):
                if(response.json()["status"] == "success"):
                    if("nearByStops" in response.json()):
                      responseJson = response.json()["nearByStops"]
                      busStops = []
                      for busstopInfo in responseJson:
                         busStops.append(busstopInfo)

                      busStopsResponse = dict()
                      busStopsResponse["userLatitude"] = userLocationData["lat"]
                      busStopsResponse["userLongitude"] = userLocationData["lon"]
                      busStopsResponse["busStops"] = busStops

                      respnseToUi = dict()
                      respnseToUi["type"] = ActionType.BUSSTOPSLIST.value
                      logger.info(":::::: VALUE IS ::::: {}".format(ActionType.BUSSTOPSLIST.value))
                      respnseToUi["value"] = busStopsResponse

                      dispatcher.utter_message("this is for you!")
                      dispatcher.utter_attachment(respnseToUi)
                    else:
                      dispatcher.utter_message("Sorry, Currentlyyyyyy there is no nearby bus stops.")
                else:
                  dispatcher.utter_message("Sorry, Currently thereeeeee is no nearby bus stops.")
            else:
              dispatcher.utter_message("Sorry, Currently there is noooooo nearby bus stops.")
        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting bus stops ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("latitude", None), SlotSet("longitude", None)]

class ITMS_BestRoute(FormAction):

    def name(self):
        return "action_bestRouteBetween"

    @staticmethod
    def required_slots(tracker):
        return ["transit_from","transit_to"]

    def run(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for ReportToITSForShortestRoute----------")

        shortestRouteData = dict()
        shortestRouteData["source"] = tracker.get_slot("transit_from")
        shortestRouteData["destination"] = tracker.get_slot("transit_to")

        requestData = dict()
        requestData["department"] = "ITMS"
        requestData["service"] = "tripPlannerDetails"
        requestData["data"] = shortestRouteData
        logger.info("Request Json:" + json.dumps(requestData))

        #requestData = "{\"department\": \"ITMS\", \"service\": \"tripPlannerDetails\", \"data\": {\"source\": \"" + tracker.get_slot("transit_from") + "\", \"destination\": \"" + tracker.get_slot("transit_to") + "\"} }"
        logger.info("Request Json:" + json.dumps(requestData))

        srSource = ""
        srDestination = ""
        srVehicleNo = ""
        srVehicleID = ""
        srRouteLabelName = ""
        srRouteName = ""
        srRouteID = ""
        srDistance = ""
        srDuration = ""
        srStartedAt = ""
        srArraivalTime = ""

        responseSlots = dict()
        noResult = 1

        try:
            restApiClient = RestApiClient()
            response = restApiClient.postESBApiCall(esb_access_url ,json.dumps(requestData))

            logger.info("------------------------------->>11")
            logger.info(response)
            logger.info("------------------------------->>22")
            logger.info(len(response.text))
            logger.info("------------------------------->>33")
            logger.info(response.text)
            logger.info("------------------------------->>44")
            logger.info(len(response.json()))
            logger.info("------------------------------->>55")

            responseJson = response.json()
            logger.info(" ::::::  Response from ITMS :::::: " + json.dumps(responseJson))
            
            if "StopList" in responseJson:
                stopList = responseJson["StopList"]
                # if len(stopList) > 0:
                logger.info("-----------:Data Available:-----------")
                responseJson = responseJson["StopList"]

                srSource = responseJson["Source"]
                srDestination = responseJson["Destination"]
                srVehicleNo = responseJson["VehicleNo"]
                srVehicleID = responseJson["VehicleID"]
                srRouteLabelName = responseJson["RouteLabelName"]
                srRouteName = responseJson["RouteName"]
                srRouteID = responseJson["RouteID"]
                srDistance = responseJson["Distance"]
                srDuration = responseJson["Duration"]
                srStartedAt = responseJson["StartedAt"]
                srArraivalTime = responseJson["ArraivalTime"]
                
                replyMessage = '''Travel time between {} and {} is {} covering
                the distance of {}.'''.format(srSource,srDestination,srDuration,srDistance)
                dispatcher.utter_message(replyMessage)
                #dispatcher.utter_button_template("utter_responseToShortestRoute",[], responseSlots)
                # else:
                #     replyMessage = ' Sorry, currently there are no route details associted with your search'
                #     logger.info("-----------:No Data Available:-----------")
                #     dispatcher.utter_message(replyMessage)
                    #dispatcher.utter_button_template("utter_responseToShortestRouteNA",[], responseSlots)
            else:
                dispatcher.utter_message("Sorry, currently there are no route details associted with your search")
        except Exception as e:
            logger.info("-----------:Exception Occur:-----------")
            logger.exception(e)
            dispatcher.utter_message("Sorry! , please try again later!! ")
            dispatcher.utter_button_template("utter_responseToShortestRouteNA",[], responseSlots)

        return[SlotSet("transit_from", None), SlotSet("transit_to", None)]

class ITMSBusDepot(FormAction):

    def name(self):
        return "action_nearest_bus_depot"
                    

    @staticmethod
    def required_slots(tracker):
        if(tracker.get_slot("latitude") is None):
            return ["address"]
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for nearByDepots----------")

        try:
            userLocationData = dict()

            userLocationData["lat"] = str(tracker.get_slot("latitude")) 
            userLocationData["lon"] = str(tracker.get_slot("longitude")) 
            
            requestData = dict()

            requestData["department"] = "ITMS"
            requestData["service"] = "nearestDepot"
            requestData["data"] = userLocationData
            logger.info("Request Json:" + json.dumps(requestData))
            restApiClient = RestApiClient()
            response = restApiClient.postESBApiCall(esb_access_url,json.dumps(requestData))
            logger.info("Response Json: :::: {}".format(response.json()))
            # responseJson = response.json()
            if(response.json()):
                if(response.json()["status"] == "success"):
                    if("nearbyStops" in response.json()): 
                      logger.info("::::::: Result :::::: {}".format(response.json()["nearbyStops"]))
                      responseJson= response.json()["nearbyStops"]
                      depotList = []
                      for depot in responseJson:
                          depotInfo = dict()
                          depotInfo["depotName"] = depot["stopName"]
                          depotInfo["depotLat"] = depot["lat"]
                          depotInfo["depotLong"] = depot["long"]
                          depotInfo["depotAddress"] = depot["stopAddress"]
                          depotInfo["depotDistance"] = depot["distanceInKm"]
                          depotList.append(depotInfo)

                      reponseObj = dict()
                      reponseObj["fromLat"] = tracker.get_slot("latitude")
                      reponseObj["fromLong"] = tracker.get_slot("longitude")
                      reponseObj["depotInfo"] = depotList
                      responseToUi = dict()
                      responseToUi["type"] = ActionType.BUSDEPOTLIST.value
                      responseToUi["value"] = reponseObj
                      dispatcher.utter_attachment(responseToUi)
                    else:
                      dispatcher.utter_message("Sorry, Currently there is no nearby bus depot.")
                else:
                  dispatcher.utter_message("Sorry, Unable to get bus depote data Please try after some time")  
            else:
              dispatcher.utter_message("Sorry, Unable to get Bus depote data")        
           
        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting bus stops ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("latitude", None), SlotSet("longitude", None)]

class BusRouteNameInfo(FormAction):

    def name(self):
        return "action_bus_number_details"

    @staticmethod
    def required_slots(tracker):
        return ["bus_number"]

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for ReportToITSForBusStop----------")

        try:

            busNumber = dict()

            # userLocationData["lat"] = "12.984426" #tracker.get_slot("latitude")
            # userLocationData["lon"] = "77.597229" #tracker.get_slot("longitude")
            busNumber["routeName"]= tracker.get_slot("bus_number")
            
            requestData = dict()
            requestData["department"] = "ITMS"
            requestData["service"] = "routeDetailsWithName"
            requestData["data"] = busNumber
            logger.info("Request Json:" + json.dumps(requestData))

            restApiClient = RestApiClient()
            response = restApiClient.postESBApiCall(esb_access_url,json.dumps(requestData))
             
            logger.info("Response Json: :::: {}".format(response.json()))

            if(response.json()):
                if(response.json()["status"] == "success"):
                    if("routeList" in response.json()):
                        if(len(response.json()["routeList"]) > 0):
                          logger.info("::::::: Result :::::: {}".format(response.json()["routeList"]))
                          routeList = []
                          responseJson=  response.json()["routeList"] 
                          for routeName in responseJson:
                               routeNameInfo = dict()
                               routeNameInfo["routeId"] = routeName["routeId"]
                               routeNameInfo["destination"] = routeName["destination"]
                               routeNameInfo["source"] = routeName["source"]
                               routeNameInfo["routeName"] = routeName["routeName"]
                               routeNameInfo["via"] = routeName["via"]
                               routeList.append(routeNameInfo)
                               break
                          reponseObj = dict()
                          reponseObj["routeInfo"] = routeList
                          responseToUi = dict()
                          responseToUi["type"] = ActionType.BUS_ROUTE_NAME_INFO.value
                          responseToUi["value"] = reponseObj
                          dispatcher.utter_attachment(responseToUi)
                        else:
                          dispatcher.utter_message("Sorry, No Bus Route Avaialable for this bus") 
                    else:
                      dispatcher.utter_message("Sorry, Currently there is no bus route")
                else:
                  dispatcher.utter_message("Sorry, Currently there is no bus route")
            else:
              dispatcher.utter_message("Sorry, Currently there is no bus route")
          
        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting bus stops ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("bus_number", None)]

class BusRouteDetailsInfo(FormAction):

    def name(self):
        return "action_bus_route_details"

    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for action_bus_route_details----------")

        try:

            userLocationData = dict()
            userLocationData["source"] = tracker.get_slot("transit_from")
            userLocationData["destination"] = tracker.get_slot("transit_to")
            requestData = dict()
            requestData["department"] = "ITMS"
            requestData["service"] = "tripPlannerDetails"
            requestData["data"] = userLocationData
            logger.info("Request Json:" + json.dumps(requestData))
            restApiClient = RestApiClient()
            response = restApiClient.postESBApiCall(esb_access_url,json.dumps(requestData))
            # logger.info("Response Json: :::: {}".format(response.json()))


            if(response.json()):
                if(response.json()["status"] == "success"):
                    if "stopList" in response.json():
                        routeList = []
                        routeInfoList = response.json()["stopList"]
                        for route in routeInfoList:
                            busInfo=dict()
                            busInfo["vehicleNo"] = route["vehicleNo"]
                            busInfo["vehicleId"] = route["vehicleID"]
                            busInfo["routeName"] = route["routeName"]
                            busInfo["arrivalTime"] = route["arraivalTime"]
                            busInfo["duration"] = route["duration"]
                            busInfo["routeId"] = route["routeID"]
                            busInfo["startedAt"] = route["startedAt"]
                            busInfo["routeLabelName"] = route["routeLabelName"]
                            busInfo["distance"] = route["distance"]
                            busInfo["sourceName"] = route["source"]
                            busInfo["destinationName"] = route["destination"]
                            routeList.append(busInfo)

                        responseObj = dict()
                        responseObj["from"] = tracker.get_slot("transit_from")
                        responseObj["to"] = tracker.get_slot("transit_to")
                        responseObj["routeInfo"] = routeList

                        responseToUi = dict()
                        responseToUi["type"] = ActionType.BUS_ROUTE_DETAILS_INFO.value
                        responseToUi["value"] = responseObj
                        dispatcher.utter_message("here is the information you have asked")
                        dispatcher.utter_attachment(responseToUi)
                    else:
                        dispatcher.utter_message("Sorry, Currently there is no bus scheduled.")
                else:
                    dispatcher.utter_message("Sorry, Currently there is no bus scheduled")
            else:
                dispatcher.utter_message("Sorry, Currently there is no bus scheduled ")
        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting bus stops ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("transit_from", None), SlotSet("transit_to", None)]

class TransportServices(FormAction):

    def name(self):
        return 'action_transport_services'
        
    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info(":::::  action_transport_services  ::::: ")
        responseObj = dict()
        responseObj["type"] = ActionType.TRANSPORT_SUB_SERVICES.value
        responseObj["value"] = None
        dispatcher.utter_attachment(responseObj)
        return []

