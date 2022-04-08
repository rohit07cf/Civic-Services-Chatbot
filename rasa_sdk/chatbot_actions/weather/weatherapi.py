import logging
import time,datetime,json
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.Restapi import RestApiClient
from chatbot_actions.bot_enums.actionType import ActionType

logger = logging.getLogger(__name__)

class CityCurrentWheatherInfo(FormAction):

    def name(self):
        return "action_cityweather_info"

    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):

        result = dict()
        latlong = "{},{}".format(str(tracker.get_slot("latitude")), str(tracker.get_slot("longitude")))
        ############################## Get Location Key ################################### 
        restApiClient = RestApiClient()
        url = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey={}&q={}".format('6us2nBSawHmEd7T8xARIVgev8RDs6XW2',latlong)
        logger.info("::: URL  :::: "+ url)
        response = restApiClient.restApiCallGet(url)
        responseJson = response.json()
        logger.info("::::: response :::: "+ json.dumps(responseJson))
        if("ParentCity" in responseJson):
            
            locationKey = responseJson["Key"]
            locationName = responseJson["ParentCity"]["EnglishName"]
            localizationName = responseJson["EnglishName"]
            logger.info("::::: LOCATION KEY :::: "+ locationKey)
            ############################## Get Hourly Forcast Info ###################################
            foreCastUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/{}?apikey={}&metric=true".format(locationKey,'6us2nBSawHmEd7T8xARIVgev8RDs6XW2')
            # foreCastUrl = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/{}?apikey={}&metric=true".format(locationKey,'TE9BQctVUjE4vyhyA0NMeBXz6jQOm0lp')
            logger.info("::: URL foreCastUrl :::: "+ foreCastUrl)
            responseforeCast = restApiClient.restApiCallGet(foreCastUrl)
            responseforeCastJson = responseforeCast.json()

            # if(isinstance(responseforeCastJson, list)):
            if("DailyForecasts" in responseforeCastJson):
                result["forecastweatherInfo"] = responseforeCastJson
                logger.info(":::: ForeCast info ::::: ")
                ############################## Get Weather Info ################################### 
                
                weatherUrl = 'http://dataservice.accuweather.com/currentconditions/v1/{}?apikey={}'.format(locationKey,'6us2nBSawHmEd7T8xARIVgev8RDs6XW2')
                responseWeather = restApiClient.restApiCallGet(weatherUrl)
                responseWeatherJson = responseWeather.json()
                
                if(isinstance(responseWeatherJson, list)):
                    result["locationName"] = locationName
                    result["localizationName"] = localizationName
                    result["currentWeatherInfo"] = responseWeatherJson
                    result["type"] = ActionType.WEATHERINFO.value
                    logger.info(":::: weather info ::::: ")
                    dispatcher.utter_message("Here is it! you asked for ")
                    dispatcher.utter_attachment(result)
                else:
                    dispatcher.utter_message("Sorry !! weather service is currently unavailable.") 
            else:
               dispatcher.utter_message("Sorry !! weather service is currently unavailable.") 
        else:
            dispatcher.utter_message("Sorry !! weather service is currently unavailable.")
        return []

class getHourlyForcastInfo(FormAction):
    def name(self):
        return "action_hourly_forcast_info"

    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):
        restApiClient = RestApiClient()
        url = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/{}?apikey={}".format(204108,'6us2nBSawHmEd7T8xARIVgev8RDs6XW2')
        response = restApiClient.restApiCallGet(url)
        responseJson = response.json()

        return []

class getlocationKey(FormAction):
    def name(self):
        return "action_get_location_key"

    @staticmethod
    def required_slots(tracker):
        return []

    def submit(self, dispatcher, tracker, domain):

        restApiClient = RestApiClient()
        url = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey={}&q={}".format('6us2nBSawHmEd7T8xARIVgev8RDs6XW2','12.9716,77.5946')
        response = restApiClient.restApiCallGet(url)
        responseJson = response.json()
        return []