import logging
from rasa_core_sdk.forms import FormAction
from rasa_core_sdk.events import SlotSet
from Util.intents import civicIntentMap



logger = logging.getLogger(__name__)
class CivicServiceType(FormAction):

    def name(self):
        return 'action_set_civic_type'


    def fillRequiredSlot(self, slot_to_fill, tracker):
        logger.debug("Trying to extract requested slot '{}' ..."
                     "".format(slot_to_fill))

        # get mapping for requested slot
        requested_slot_mappings = self.get_mappings_for_slot(slot_to_fill)

        for requested_slot_mapping in requested_slot_mappings:
            logger.debug("Got mapping '{}'".format(requested_slot_mapping))

            if self.intent_is_desired(requested_slot_mapping, tracker):
                mapping_type = requested_slot_mapping["type"]

                if mapping_type == "from_entity":
                    # list is used to cover the case of list slot type
                    value = list(tracker.get_latest_entity_values(
                                    requested_slot_mapping.get("entity")))
                    if len(value) == 0:
                        value = None
                    elif len(value) == 1:
                        value = value[0]
                elif mapping_type == "from_intent":
                    value = requested_slot_mapping.get("value")
                elif mapping_type == "from_text":
                    value = tracker.latest_message.get("text")
                else:
                    raise ValueError(
                            'Provided slot mapping type '
                            'is not supported')

                if value is not None:
                    logger.debug("Successfully extracted '{}' "
                                 "for requested slot '{}'"
                                 "".format(value, slot_to_fill))
                    return SlotSet(slot_to_fill , value)

    @staticmethod
    def required_slots(tracker):
        civicService = tracker.get_slot("civic_service")
        intentName = tracker.latest_message.get("intent").get("name")
        logging.info(":::::: INTENT ::::: "+intentName)
        # if(intentName not in civicIntentMap and civicService is None ):
        #return ["civic_service"]
        return []

    def slot_mappings(self):
        logging.info("::::: CALLED SET TYPE ::::::")
        servicesFromIntent = []
        for intentName, civicService in civicIntentMap.items():

            servicesFromIntent.append( self.from_intent(intent=intentName, value=civicService))
            '''
            [
             self.from_intent(intent='missed+garbage+pickup', value="MISSED_GARBAGE_PICKUP"),
             self.from_intent(intent='garbage+pickup+not_arraived', value="GARBAGE_VEHICLE_NOT_ARRIVED"),
             self.from_intent(intent='garbage+burning', value="BURNING_OF_GARBAGE_IN_OPEN_SPACE")
            ]
            '''
            logging.info("::::: HI ::::::")
        return {"civic_service":servicesFromIntent }


    def submit(self, dispatcher, tracker, domain):
        filledSlotEvent = self.fillRequiredSlot("civic_service", tracker)
        logger.info("filledSlotEvent {}".format(filledSlotEvent))
        return [filledSlotEvent]
