from rasa_core_sdk.forms import FormAction,Action
from Util.Restapi import RestApiClient
from Util.config  import *
import json, logging
from chatbot_actions.bot_enums.actionType import ActionType
from rasa_core_sdk.events import SlotSet

logger = logging.getLogger(__name__)


class NearestPoliceStation(FormAction):

    def name(self):
        return "action_nearest_police_station"

    @staticmethod
    def required_slots(tracker):
        
        if(tracker.get_slot("latitude") is None):
            return ["address"]
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for NearestPoliceStation ----------")
        try:
            userLocationData = dict()

            userLocationData["lat"] = tracker.get_slot("latitude")

            userLocationData["lon"] = tracker.get_slot("longitude")
            policeStations = []

            policeStation = dict()

            policeStation["policeStationName"] = "ShivajiNagar Police Staion"
            policeStation["distance"] = "2 kms"
            policeStation["latitude"] = "12.9845157"
            policeStation["longitude"] = "77.6020458"
            policeStation["address"] = "Shivajinagar,Bangalore"
            policeStation["policeLat"] = " 12.9845572"
            policeStation["policeLong"] = "77.5932911"
            policeStations.append(policeStation)
            policeStationResponse = dict()

            policeStationResponse["userLatitude"] = userLocationData["lat"]
            policeStationResponse["userLongitude"] = userLocationData["lon"]
            policeStationResponse["policeStations"] = policeStations

            responseToUi = dict()
            responseToUi["type"] = ActionType.POLICE_STATION_INFO.value
            responseToUi["value"] = policeStationResponse

            dispatcher.utter_attachment(responseToUi)

        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting bus stops ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("latitude", None), SlotSet("longitude", None)]

class NearestFireStation(FormAction):
    def name(self):
        return "action_nearest_fire_station"

    @staticmethod
    def required_slots(tracker):
        
        if(tracker.get_slot("latitude") is None):
            return ["address"]
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for FireStation ----------")
        try:
            userLocationData = dict()

            userLocationData["lat"] = tracker.get_slot("latitude")
            userLocationData["lon"] = tracker.get_slot("longitude")
            fireStations = []

            fireStation = dict()

            fireStation["fireStationName"] = "BTM Fire Staion"
            fireStation["distance"] = "5 kms"
            fireStation["latitude"] = "12.9845157"
            fireStation["longitude"] = "77.6020458"
            fireStation["address"] = "BTM LAYOUT,Bangalore"
            fireStation["fireLat"] = " 12.9845572"
            fireStation["fireLong"] = "77.5932911"
            fireStations.append(fireStation)

            fireStationResponse = dict()

            fireStationResponse["userLatitude"] = userLocationData["lat"]
            fireStationResponse["userLongitude"] = userLocationData["lon"]
            fireStationResponse["fireStations"] = fireStations

            responseToUi = dict()
            responseToUi["type"] = ActionType.FIRE_STATION_INFO.value
            responseToUi["value"] = fireStationResponse

            dispatcher.utter_attachment(responseToUi)

        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting bus stops ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("latitude", None), SlotSet("longitude", None)]

class HospitalInfo(FormAction):

    def name(self):
        return "action_nearestHospitals"

    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for NearestHospitals----------")

        try:

            userLocationData = dict()

            userLocationData["lat"] = tracker.get_slot("latitude")
            userLocationData["lon"] = tracker.get_slot("longitude")

            nearestHospitals =[]
             
            nearestHospital = dict()
            nearestHospital["hospitalName"] = "BGS Hospital"
            nearestHospital["distance"] = "1.5km"
            nearestHospital["latitude"] = "12.9845157"
            nearestHospital["longitude"] = "77.6020458"
            nearestHospital["address"] = "Vijayanagar"
            nearestHospital["hospitalLat"] = "12.9744843"
            nearestHospital["hospitalLong"] = "77.5417943"
            nearestHospitals.append(nearestHospital)
            logger.info("----------Manual details----------")
            hospitalResponse = dict()
            hospitalResponse["userLatitude"] = userLocationData["lat"]
            hospitalResponse["userLongitude"] = userLocationData["lon"]
            hospitalResponse["nearestHospitals"] = nearestHospitals
            logger.info("----------User Location----------")
            
            responseToUi = dict()
            responseToUi["type"] = ActionType.NEAREST_HOSPITALS.value
            responseToUi["value"] = hospitalResponse
            dispatcher.utter_attachment(responseToUi)
            
        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting hospitallist ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("latitude", None), SlotSet("longitude", None)]
        
class TouristPlaceInfo(FormAction):

    def name(self):
        return "action_nearestTouristPlace"

    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for NearestTouristPlace----------")

        try:

            userLocationData = dict()

            userLocationData["lat"] = tracker.get_slot("latitude")
            userLocationData["lon"] = tracker.get_slot("longitude")
            nearestTouristPlace = ''' [
            { "TouristPlaceName":"Bangalore Palace", "distance":"1.2km","attraction":"Exquisite woodcarvings and Tudor-style architecture","TouristPlaceUrl":"http://www.bangaloreindia.org.uk/tourist-attractions/bangalore-palace.html","placeLat":"12.9987712","placeLong":"77.5899184","latitude":"12.9845157","longitude":"77.6020458"},
            { "TouristPlaceName":"Cubbon Park", "distance":"0.8km","attraction":"Beautifully landscaped park","TouristPlaceUrl":"http://www.bangaloreindia.org.uk/tourist-attractions/cubbon-park.html","placeLat":"12.9763524","placeLong":"77.5907397","latitude":"12.9845157","longitude":"77.6020458"}, 
            { "TouristPlaceName":"Lalbagh", "distance":"2.2km","attraction":"Different species of flora, Glass House and flower shows","TouristPlaceUrl":"http://www.bangaloreindia.org.uk/tourist-attractions/lal-bagh-gardens.html","placeLat":"12.9507484","placeLong":"77.5825886","latitude":"12.9845157","longitude":"77.6020458"}
            ]'''
            nearestTouristPlaces = json.loads(nearestTouristPlace)
            logger.info("----------Manual details----------")
            TouristPlaceResponse = dict()
            TouristPlaceResponse["userLatitude"] = userLocationData["lat"]
            TouristPlaceResponse["userLongitude"] = userLocationData["lon"]
            TouristPlaceResponse["nearestTouristPlaces"] = nearestTouristPlaces
            logger.info("----------User Location----------")
            
            responseToUi = dict()
            responseToUi["type"] = ActionType.NEAREST_TOURIST_PLACE.value
            responseToUi["value"] = TouristPlaceResponse
            logger.info(":::::::: responseObj ::::::: {}".format(responseToUi))
            dispatcher.utter_attachment(responseToUi)
            
        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting TouristPlace ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return [SlotSet("latitude", None), SlotSet("longitude", None)]


class PoliceVehicleLocation(FormAction):

    def name(self):
        return "action_police_vehicle_location"

    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        logger.info("----------Request Log for NearestPoliceStation ----------")
        try:

            vehicleLocationReqObj = dict()

            # vehicleLocationReqObj["phoneNum"] = tracker.get_slot("phoneNo")
            vehicleLocationReqObj["phoneNum"] = "8123425065"
            vehicleLocationReqObj["offset"] = 0
            vehicleLocationReqObj["noOfRows"] = 3
                
            logger.info("::::: vehicleLocation  ::::: CALLED :::: {}".format(vehicleLocationReqObj))
            restApiClient = RestApiClient()
            response = restApiClient.postRestApiCall(policeVehicleLocationUrl, json.dumps(vehicleLocationReqObj))
            logger.info("::::: REPSONSE vehicleLocation :::: {} ".format(response))
            responseJson = response.json()
            vehicleData = []
            if len(responseJson) > 0:
                for incidentLists in responseJson:
                    vehicleData.append(incidentLists)

                vehicleResponse = dict()
                vehicleResponse["incidentList"] = vehicleData

                respnseToUi = dict()
                respnseToUi["type"] = ActionType.POLICE_VEHICLE_LOCATION.value
                respnseToUi["value"] = vehicleResponse
                dispatcher.utter_message("Please Select Incident which you have created!")
                dispatcher.utter_attachment(respnseToUi)         

        except Exception as e:
            logger.exception(e)
            logger.error(":::: error Occured in getting vehicle Location ::::: ")
            dispatcher.utter_message("Sorry, Please try after some time!")
        return []  
