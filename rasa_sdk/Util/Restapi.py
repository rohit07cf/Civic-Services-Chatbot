import urllib.request
import requests
import json    
from Util.config  import *
import sys
import logging

logger = logging.getLogger(__name__)
class RestApiClient(object):
    
    
    def postRestApiCall(self ,url = "" , jsondata = "{}" ):
        
        try:
            
            headers = {  'Content-Type' : 'application/json'}
            response = requests.post(url, data=jsondata, headers=headers)
            return response
        except :
            logger.exception("Unexpected error: {}".format(sys.exc_info()[0]))
        
        #jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
        #req.add_header('Content-Length', len(jsondataasbytes))
        #print (jsondataasbytes)
        #response = urllib.request.urlopen(req, jsondataasbytes) 

        return response

    def restApiCallGet(self ,url = "" ):
        try:
            headers = {  'Content-Type' : 'application/json'}
            response = requests.get(url, headers=headers)
            return response
        except :
            logger.exception("Unexpected error: {}".format(sys.exc_info()[0]))
        return response

    def postESBApiCall(self ,url = "" , jsondata = "{}" ):

        access_token = self.getAccessToken()
        headers =  { 'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer {}'.format(access_token)}
        response = None
        logger.info("url :{} ,headers :{} , data :{}".format(url ,json.dumps(headers),jsondata))
        try:
          
            req = urllib.request.Request(url)
            req.add_header('Content-Type', 'application/json')
            req.add_header('Authorization', 'Bearer {}'.format(access_token))

            headers = { 'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer {}'.format(access_token)}
            
            response = requests.post(url, data=jsondata, headers=headers)
            return response
        except :
            logger.exception("Unexpected error: {}".format(sys.exc_info()[0]))
        return response

    def getESBApiCall(self ,url = ""):

        access_token = self.getAccessToken()
        headers =  { 'Content-Type' : 'application/json', 'Authorization' : 'Bearer {}'.format(access_token)}

        logger.info("url :{} ,headers :{}".format(url ,json.dumps(headers)))
        try:
          
            req = urllib.request.Request(url)
            req.add_header('Content-Type', 'application/json')
            req.add_header('Authorization', 'Bearer {}'.format(access_token))

            headers = { 'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer {}'.format(access_token)}
            # url = url + 
            response = requests.get(url, headers=headers)

            # if(response != null)
            # response = requests.post(url, data=jsondata, headers=headers)
            return response
        except :
            logger.exception("Unexpected error: {}".format(sys.exc_info()[0]))

        return response

    def getAccessToken(self):
        access_token = None
        try:
            access_req_data = {
                "authorizationKey": "bEJMdHVQMThYMGZkeGV3S09SbklQVF9SZkFFYTp3dHA5SEZxczJVM1JzZkpNUWszTnh2eGZ4Q29h",
                "password": "123456",
                "username": "citizensub@demo.com"
            }
            access_headers = {  'Content-Type' : 'application/json'}
            access_response = requests.post(esb_auth_url, data=json.dumps(access_req_data), headers=access_headers)

            logger.info("::::::: access_token :::: "+str(access_response.json()))
            access_token = access_response.json()["access_token"]
            logger.info("got accesstoken :{} ".format(access_token))
        except Exception as e:
            logger.exception(e)
        return access_token

    def postRestApiCallWithHttpHeaders(self ,url = "" , jsondata = "{}" , headers = "{}"):
        try:
            response = requests.post(url, data=jsondata, headers=headers)
            return response
        except Exception as e:
            logger.exception(e)
            logger.exception("Unexpected error: {}".format(sys.exc_info()[0]))
        