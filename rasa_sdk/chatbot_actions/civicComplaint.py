import logging
import time,datetime
from rasa_core_sdk.forms import FormAction,Action
from rasa_core_sdk.events import SlotSet,Restarted
from .actionImpleamentation.createIncident import RegisterGrevience

logger = logging.getLogger(__name__)

class ActionRaiseCivicComplaint(FormAction):
    def name(self):
        return 'action_raiseCivicComplaint'

    @staticmethod
    def required_slots(tracker):
        requiredSlots = []
        requiredSlots.append("user_remarks")
        if(tracker.get_slot("latitude") is None):
            requiredSlots.append("address")
        return requiredSlots

    # def slot_mapping(self):
    #     return { "attachments": [self.from_entity(entity="attachments",intent='inform'),
    #                         self.from_intent(intent='deny', value=[] )]
    #     }

    def submit(self, dispatcher, tracker, domain):
        
        try:
            #dispatcher.utter_message("Connecting to agent, thankyou.")
            registerGrevienceService = RegisterGrevience(tracker)
            response = registerGrevienceService.registerComplaint()
            # name = tracker.get_slot("name")
            # phoneNo = tracker.get_slot("phoneNo")
            if(response):
                if(response["status"]):
                    grevienceId = response["eventId"]
                    #tracker._set_slot("grevienceId",grevienceId)
                    buttons =[{"action":"event_created","payload":grevienceId,"title":"id :{}".format(grevienceId)}]
                    dispatcher.utter_button_message(" Complaint has been registered , Please note your complaint id \"{}\" for furthure queries ".format(grevienceId),buttons)
                    dispatcher.utter_message(" Complaint you have reported will resolved as soon as possible. Thanks for contacting us")
                    dispatcher.utter_template("utter_thank_you", tracker)
                    dispatcher.utter_template("utter_nice_day", tracker)

                else:
                    dispatcher.utter_message("Sorry, an error occured while registering complaint.  ")
                    dispatcher.utter_message("Please try again later... ")
            else:
                dispatcher.utter_message("Sorry, an error occured while registering complaint.  ")
                dispatcher.utter_message("Please try again later... ")
        except Exception as e:
            logger.exception(e)
            dispatcher.utter_message("Please try again later... ")
        return [SlotSet("conversation" , None), SlotSet("user_remarks", None), SlotSet("civic_service", None), SlotSet("longitude", None), SlotSet("latitude", None), SlotSet("address", None), SlotSet("attachments", None)]

class ActionUploadAttachments(Action):
    def name(self):
        return 'action_tagAttachments'
    def run(self, dispatcher, tracker, domain):
        print(tracker.tracker.latest_message)

class ActionRaiseCivicComplaintTamil(FormAction):
    def name(self):
        return 'action_raiseCivicComplaint_tamil'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        requiredSlots = []
        requiredSlots.append("user_remarks")
        if(tracker.get_slot("latitude") is None):
            requiredSlots.append("address")
        return requiredSlots

    # def slot_mapping(self):
    #     return { "attachments": [self.from_entity(entity="attachments",intent='inform'),
    #                         self.from_intent(intent='deny', value=[] )]
    #     }

    def submit(self, dispatcher, tracker, domain):
        
        try:
            #dispatcher.utter_message("Connecting to agent, thankyou.")
            registerGrevienceService = RegisterGrevience(tracker)
            response = registerGrevienceService.registerComplaint()
            # name = tracker.get_slot("name")
            # phoneNo = tracker.get_slot("phoneNo")
            if(response):
                if(response["status"]):
                    grevienceId = response["eventId"]
                    #tracker._set_slot("grevienceId",grevienceId)
                    buttons =[{"action":"event_created","payload":grevienceId,"title":"id :{}".format(grevienceId)}]
                    dispatcher.utter_button_message(" புகார் பதிவு செய்யப்பட்டுள்ளது, உங்கள் புகார் ஐடி \"{}\" தயவுசெய்து  புகார் ஐடி நினைவில் கொள்ள்வும் எதிர்கால  பயன்பாட்டுக்கு ".format(grevienceId),buttons)
                    dispatcher.utter_message(" நீங்கள் அளித்த புகார் மிக விரைவில் சரிசெய்யப்படும்")
                    dispatcher.utter_template("utter_thank_youtamil", tracker)
                    dispatcher.utter_template("utter_nice_daytamil", tracker)

                else:
                    dispatcher.utter_message("தயவு செய்து மீண்டும் முயற்சிக்கவும்.")
                    # dispatcher.utter_message("Sorry, an error occured while registering complaint.  ")
                    # dispatcher.utter_message("Please try again later... ")
            else:
                # dispatcher.utter_message("Sorry, an error occured while registering complaint.  ")
                dispatcher.utter_message("தயவு செய்து மீண்டும் முயற்சிக்கவும்.")
        except Exception as e:
            logger.exception(e)
            dispatcher.utter_message("தயவு செய்து மீண்டும் முயற்சிக்கவும்.")
        return [SlotSet("conversation" , None),SlotSet("user_remarks", None), SlotSet("civic_service", None), SlotSet("longitude", None), SlotSet("latitude", None), SlotSet("address", None), SlotSet("attachments", None)]

class ActionRaiseCivicComplaintKannada(FormAction):
    def name(self):
        return 'action_raiseCivicComplaint_kannada'

    @staticmethod
    def required_fields():
        return []

    @staticmethod
    def required_slots(tracker):
        requiredSlots = []
        requiredSlots.append("user_remarks")
        if(tracker.get_slot("latitude") is None):
            requiredSlots.append("address")
        return requiredSlots

    # def slot_mapping(self):
    #     return { "attachments": [self.from_entity(entity="attachments",intent='inform'),
    #                         self.from_intent(intent='deny', value=[] )]
    #     }

    def submit(self, dispatcher, tracker, domain):
        
        try:
            #dispatcher.utter_message("Connecting to agent, thankyou.")
            registerGrevienceService = RegisterGrevience(tracker)
            response = registerGrevienceService.registerComplaint()
            # name = tracker.get_slot("name")
            # phoneNo = tracker.get_slot("phoneNo")
            if(response):
                if(response["status"]):
                    grevienceId = response["eventId"]
                    #tracker._set_slot("grevienceId",grevienceId)
                    buttons =[{"action":"event_created","payload":grevienceId,"title":"id :{}".format(grevienceId)}]
                    dispatcher.utter_button_message("ನಿಮ್ಮ ದೂರನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ,ನಿಮ್ಮ ದೂರಿನ ಸಂಖ್ಯೆ \"{}\" ಈ ಸಂಖ್ಯೆ ಇಂದ ನಿಮ್ಮ ದೂರಿನ ಸ್ಥಿತಿಯನ್ನು ತಿಳಿದುಕೊಳ್ಳಬಹುದು".format(grevienceId),buttons)
                    dispatcher.utter_message(" ನೀವು ವರದಿ ಮಾಡಿದ ದೂರು ಸಾಧ್ಯವಾದಷ್ಟು ಬೇಗ  ಪರಿಹರಿಸಲಾಗುವುದು. ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು")
                    dispatcher.utter_template("utter_thank_you_kannada", tracker)
                    dispatcher.utter_template("utter_nice_day_kannada", tracker)

                else:
                    dispatcher.utter_message("ಕ್ಷಮಿಸಿ, ದೂರನ್ನು ನೋಂದಾಯಿಸುವಾಗ ಸಮಸ್ಯೆಯಾಗಿದೆ.  ")
                    dispatcher.utter_message("ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ... ")
            else:
                dispatcher.utter_message("ಕ್ಷಮಿಸಿ, ದೂರನ್ನು ನೋಂದಾಯಿಸುವಾಗ ಸಮಸ್ಯೆಯಾಗಿದೆ.  ")
                dispatcher.utter_message("ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ... ")
        except Exception as e:
            logger.exception(e)
            dispatcher.utter_message("ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ... ")
        return [SlotSet("conversation" , None), SlotSet("user_remarks", None), SlotSet("civic_service", None), SlotSet("longitude", None), SlotSet("latitude", None), SlotSet("address", None), SlotSet("attachments", None)]
