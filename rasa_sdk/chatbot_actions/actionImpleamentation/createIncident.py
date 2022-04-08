import time,datetime
from Util.Restapi import RestApiClient
import json,logging
from Util.config  import *

logger = logging.getLogger(__name__)

class RegisterGrevience:

    def __init__(self , tracker):
        self.tracker = tracker

    def registerComplaint(self):
        try:
            logger.info("::::::: REGISTER COMPLAINT :::::: ")
            fileAttached = False
            user_remarks = self.tracker.get_slot("user_remarks")
            civic_service = self.tracker.get_slot("civic_service")
            civic_service = civic_service.replace("_"," ")
            longitude = self.tracker.get_slot("longitude")
            latitude = self.tracker.get_slot("latitude")
            address = self.tracker.get_slot("address")
            name = self.tracker.get_slot("name")
            phoneNo = self.tracker.get_slot("phoneNo")
            filesJsonDict = self.tracker.get_slot("attachments")
            tenentId = self.tracker.get_slot("tenentId")
            sender_id= self.tracker.sender_id
            conversation = self.tracker.get_slot("conversation")

            files=[]
            if(filesJsonDict is not None):
                for filesJson in filesJsonDict:
                    logger.info("each file json is  '{}'.".format(type(filesJson)))
                    fileAttached = True
                    files.append(filesJson)


            currentTime = (time.time()-time.timezone)*1000
            sourceType="cityChatBot"
            sourceTypeId = 2

            logger.info("user_remarks is '{}'.".format(user_remarks))
            logger.info("longitude is '{}'.".format(longitude))
            logger.info("latitude is '{}'.".format(latitude))
            logger.info("address is '{}'.".format(address))
            logger.info("name is '{}'.".format(name))
            logger.info("phoneNo is '{}'.".format(phoneNo))
            logger.info("currentTime is '{}'.".format(currentTime))
            logger.info("sourceType is '{}'.".format(sourceType))
            logger.info("sourceTypeId is '{}'.".format(sourceTypeId))
            logger.info("files is '{}'.".format(files))
            logger.info("fileAttached is '{}'.".format(fileAttached))
            logger.info("sender_id is '{}'.".format(sender_id))
            logger.info("tenentId is '{}'.".format(tenentId))
            logger.info("::::: conversation is {} :: ".format(conversation))
            logger.info("civic_service is '{}'.".format(civic_service))
            chatInfo = dict()
            ''' 
            Format in which data has to be sent
            {
                "department": "CAED",
                "service": "createNewIncidentFromCityChatBot",
                "data": {
                    "name":"Pramod",
                    "phoneNo":"8147442084",
                    "sourceType" : "CityChatbot",
                    "sourceTypeId" : 2
                    "grievanceSubType": "Murder",
                    "address": "#21/1-1, Nawab Tower, Cunningham Road, Bengaluru, Karnataka 56005",
                    "latitude" : 12.983688,
                    "longitude": 77.5977697,
                    "remarks" : "Murder In the Building!!!!",
                    "deptName" : "Police"
                }
            }
            '''
            chatInfo["name"] = name
            chatInfo["phoneNo"] = phoneNo
            chatInfo["sourceType"] = "CityChatbot"
            chatInfo["sourceTypeId"] = 2
            chatInfo["grievanceSubType"]=  civic_service
            chatInfo["address"] = address
            chatInfo["latitude"] = latitude
            chatInfo["longitude"] = longitude
            chatInfo["remarks"] = user_remarks
            chatInfo["files"] = files
            chatInfo["fileAttached"] = fileAttached
            chatInfo["userId"] = sender_id
            chatInfo["tenantId"] = tenentId
            chatInfo["conversation"] = conversation
            logger.info("Request data:" + json.dumps(chatInfo))
            requestData = dict()
            requestData["department"] = "CAED"
            requestData["service"] = "createNewIncidentFromCityChatBot"
            requestData["data"] = chatInfo
            logger.info("Request Json:" + json.dumps(chatInfo))

            restApiClient = RestApiClient()
            cepUrl = self.tracker.get_slot("cepServerUrl")
            response = restApiClient.postRestApiCall(cepUrl + 'chatbotController/createIncidentForBot/',json.dumps(chatInfo))
            responseJson = response.json()
            logger.info("Response Json:" + json.dumps(responseJson))

            event_id = None
            replySlots = dict()
            '''
            {
                "resultData": "IT000049",
                "status": true
            }
            '''
            replySlots["status"] = responseJson["status"]
            if(responseJson["status"]):
                event_id = responseJson["resultData"]
                replySlots["eventId"] = event_id
                
        except Exception as e:
            logger.exception(e)
        return replySlots


    def registerEmergencyComplaint(self):
        try:
            logger.info("::::::: REGISTER COMPLAINT ::::::EMERGENCYYYYY:::::: ")
            fileAttached = False
            user_remarks = self.tracker.get_slot("user_remarks")
            civic_service = self.tracker.get_slot("civic_service")
            civic_service = civic_service.replace("_"," ")
            longitude = self.tracker.get_slot("longitude")
            latitude = self.tracker.get_slot("latitude")
            address = self.tracker.get_slot("address")
            name = self.tracker.get_slot("name")
            phoneNo = self.tracker.get_slot("phoneNo")
            filesJsonDict = self.tracker.get_slot("attachments")
            tenentId = self.tracker.get_slot("tenentId")
            sender_id= self.tracker.sender_id
            conversation = self.tracker.get_slot("conversation")

            files=[]
            if(filesJsonDict is not None):
                for filesJson in filesJsonDict:
                    logger.info("each file json is  '{}'.".format(type(filesJson)))
                    fileAttached = True
                    files.append(filesJson)


            currentTime = (time.time()-time.timezone)*1000
            sourceType="cityChatBot"
            sourceTypeId = 2

            logger.info("user_remarks is '{}'.".format(user_remarks))
            logger.info("longitude is '{}'.".format(longitude))
            logger.info("latitude is '{}'.".format(latitude))
            logger.info("address is '{}'.".format(address))
            logger.info("name is '{}'.".format(name))
            logger.info("phoneNo is '{}'.".format(phoneNo))
            logger.info("currentTime is '{}'.".format(currentTime))
            logger.info("sourceType is '{}'.".format(sourceType))
            logger.info("sourceTypeId is '{}'.".format(sourceTypeId))
            logger.info("files is '{}'.".format(files))
            logger.info("fileAttached is '{}'.".format(fileAttached))
            logger.info("sender_id is '{}'.".format(sender_id))
            logger.info("tenentId is '{}'.".format(tenentId))
            logger.info("::::: conversation is {} :: ".format(conversation))
            logger.info("civic_service is '{}'.".format(civic_service))
            chatInfo = dict()
            ''' 
            Format in which data has to be sent
            {
                "department": "CAED",
                "service": "createNewIncidentFromCityChatBot",
                "data": {
                    "name":"Pramod",
                    "phoneNo":"8147442084",
                    "sourceType" : "CityChatbot",
                    "sourceTypeId" : 2
                    "grievanceSubType": "Murder",
                    "address": "#21/1-1, Nawab Tower, Cunningham Road, Bengaluru, Karnataka 56005",
                    "latitude" : 12.983688,
                    "longitude": 77.5977697,
                    "remarks" : "Murder In the Building!!!!",
                    "deptName" : "Police"
                }
            }
            '''
            chatInfo["name"] = name
            chatInfo["phoneNo"] = phoneNo
            chatInfo["sourceType"] = "CityChatbot"
            chatInfo["sourceTypeId"] = 2
            chatInfo["grievanceSubType"]=  civic_service
            chatInfo["address"] = address
            #chatInfo["address"] = "Test Address"
            chatInfo["latitude"] = latitude
            chatInfo["longitude"] = longitude
            chatInfo["remarks"] = user_remarks
            chatInfo["deptName"] = "Police"
            chatInfo["files"] = files
            chatInfo["fileAttached"] = fileAttached
            chatInfo["userId"] = sender_id
            chatInfo["tenantId"] = tenentId
            # chatInfo["conversation"] = conversation
            logger.info("Request data:" + json.dumps(chatInfo))
            requestData = dict()
            # requestData["department"] = "CAED"
            requestData["service"] = "createNewIncidentFromCityChatBot"
            requestData["data"] = chatInfo
            logger.info("Request Json:" + json.dumps(chatInfo))

            restApiClient = RestApiClient()
            ngCADUrl = self.tracker.get_slot("ngCADUrl")
            # response = restApiClient.postRestApiCall(cepUrl + 'chatbotController/createIncidentForBot/',json.dumps(chatInfo))
            response = restApiClient.postRestApiCall(ngCADUrl + 'externalIntegration/createNewChatBoatEvent/',json.dumps(chatInfo))
            responseJson = response.json()
            logger.info("Response Json:" + json.dumps(responseJson))

            # responseJsonDumped= json.dumps(responseJson)

            event_id = None
            replySlots = dict()
            '''
            {
                "resultData": "IT000049",
                "status": true
            }
            '''
            replySlots["status"] = responseJson["dispatched"]
            if(responseJson["dispatched"]==True):
                event_id = responseJson["eventId"]
                vehicleId = responseJson["callSign"]
                replySlots["eventId"] = event_id
                replySlots["vehicleId"] = vehicleId
                
        except Exception as e:
            logger.exception(e)
        return replySlots

