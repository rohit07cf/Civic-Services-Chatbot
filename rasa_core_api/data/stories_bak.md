## story1
* greetings_hello
    - utter_greetingshello
    - utter_afterGreetings

## story2
* agent_acquaintance
    - utter_agentacquaintance
    
## story3
* agent_age
    - utter_agentage
    
## story4
* agent_annoying
    - utter_agentannoying
    
## story5
* agent_bad
    - utter_agentbad
    
## story6
* agent_beclever
    - utter_agentbeclever
    
## story7
* agent_beautiful
    - utter_agentbeautiful

## story8
* agent_birthday
    - utter_agentbirthday

## story9
* agent_boring
    - utter_agentboring

## story10
* agent_boss
    - utter_agentboss

## story11
* agent_busy
    - utter_agentbusy

## story12
* agent_canyouhelp
    - utter_agentcanyouhelp
    - utter_ask_service_type

## story13
* agent_chatbot
    - utter_agentchatbot

## story14
* agent_clever
    - utter_agentclever

## story15
* agent_crazy
    - utter_agentcrazy

## story16
* agent_fire
    - utter_agentfire

## story17
* agent_funny
    - utter_agentfunny

## story18
* agent_good
    - utter_agentgood

## story19
* agent_happy
    - utter_agenthappy

## story20
* agent_hobby
    - utter_agenthobby

## story 21
* agent_gender
    - utter_agentGender

## story22
* agent_marryuser
    - utter_agentmarryuser

## story23
* agent_myfriend
    - utter_agentmyfriend

## story24
* agent_occupation
    - utter_agentoccupation

## story25
* agent_origin
    - utter_agentorigin

## story26
* agent_ready
    - utter_agentready

## story27
* agent_real
    - utter_agentreal

## story28
* agent_residence
    - utter_agentresidence

## story29
* agent_right
    - utter_agentright

## story30
* agent_sure
    - utter_agentsure

## story31
* agent_talktome
    - utter_agenttalktome

## story32
* agent_there
    - utter_agentthere

## story 33
* agent_like
       - utter_agentLike

## story34
* appraisal_good
    - utter_appraisalgood

## story35
* appraisal_noproblem
    - utter_appraisalnoproblem

## story36
* appraisal_thankyou
    - utter_appraisalthankyou

## story37
* appraisal_welcome
    - utter_appraisalwelcome

## story38
* appraisal_welldone
    - utter_appraisalwelldone

## story39
* dialog_holdon
    - utter_dialogholdon

## story40
* dialog_hug
    - utter_dialogholdon

## story41
* dialog_idontcare
    - utter_dialogidontcare

## story42
* dialog_sorry
    - utter_dialogidontcare

## story43
* greetings_bye
    - utter_greetingsbye


## story45
* greetings_howareyou
    - utter_greetingshowareyou

## story46
* greetings_nicetomeetyou
    - utter_greetingsnicetomeetyou

## story47
* greetings_nicetoseeyou
    - utter_greetingsnicetoseeyou

## story48
* greetings_nicetotalktoyou
    - utter_greetingsnicetotalktoyou

## story49
* user_angry
    - utter_userangry

## story50
* user_back
    - utter_userback

## story51
* user_bored
    - utter_userbored

## story52
* user_busy
    - utter_userbusy

## story53
* user_cannotsleep
    - utter_usercannotsleep

## story54
* user_excited
    - utter_userexcited

## story55
* user_likeagent
    - utter_userlikeagent

## story56
* user_testing
    - utter_usertesting

## story57
* user_lovesagent
    - utter_userlovesagent

## story58
* user_needsadvice
    - utter_userneedsadvice

## story59
* agent_emergency
    - utter_agentEmergency

## story59
* about
    - utter_about

## story 60
* agent_bgf
    - utter_agentBgf

## story 61
* agent_married
    - utter_agentMarried
 
## Story_pothole_
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint

## Story_pothole_with_landmark_docs_create
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_pothole_with_landmark_denydocs_create
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_pothole_with_landmark_docs_denycreate
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_pothole_with_landmark_denydocs_denycreate
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou
    
    

## Story_pothole_with_location_docs_create
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_pothole_with_location_denydocs_create
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_pothole_with_location_docs_denycreate
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_pothole_with_location_denydocs_denycreate
* street+pothole
    - action_setPotholeInStreet
    - slot{"civic_service": "POTHOLE_IN_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou

    


    
## Story_WATER_ON_STREET_with_landmark_denydocs_create
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_landmark_docs_denycreate
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_landmark_denydocs_denycreate
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou
    
    

## Story_WATER_ON_STREET_with_location_docs_create
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_location_denydocs_create
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_location_docs_denycreate
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_location_denydocs_denycreate
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou

    
## Story_WATER_ON_STREET_landmark_docs_create
* street+water
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint

## Story_WATER_ON_STREET_with_landmark_docs_create
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_landmark_denydocs_create
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_landmark_docs_denycreate
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_landmark_denydocs_denycreate
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou
    
    

## Story_WATER_ON_STREET_with_location_docs_create
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_location_denydocs_create
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_location_docs_denycreate
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_WATER_ON_STREET_with_location_denydocs_denycreate
* street+water
    - action_setWaterOnStreet
    - slot{"civic_service": "WATER_ON_STREET"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou

    

## Story_STREET_CLEANING_with_landmark_docs_create
* street+cleaning
    - action_setStreetClean
    - slot{"civic_service": "STREET_CLEANING"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_CLEANING_with_landmark_denydocs_create
* street+cleaning
    - action_setStreetClean
    - slot{"civic_service": "STREET_CLEANING"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_CLEANING_with_landmark_docs_denycreate
* street+cleaning
    - action_setStreetClean
    - slot{"civic_service": "STREET_CLEANING"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_CLEANING_with_landmark_denydocs_denycreate
* street+cleaning
    - action_setStreetClean
    - slot{"civic_service": "STREET_CLEANING"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou
    
    

## Story_STREET_CLEANING_with_location_docs_create
* street+cleaning
    - action_setStreetClean
    - slot{"civic_service": "STREET_CLEANING"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_CLEANING_with_location_denydocs_create
* street+cleaning
    - action_setStreetClean
    - slot{"civic_service": "STREET_CLEANING"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_CLEANING_with_location_docs_denycreate
* street+cleaning
    - action_setStreetClean
    - slot{"civic_service": "STREET_CLEANING"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_CLEANING_with_location_denydocs_denycreate
* street+cleaning
    - action_setStreetClean
    - slot{"civic_service": "STREET_CLEANING"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou

    

## Story_STREET_POLE_DAMAGED_with_landmark_docs_create
* streetLight+damage 
    - action_setStreetLightpoleDamage
    - slot{"civic_service": "STREET_LIGHT_POLE_DAMAGE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_POLE_DAMAGED_with_landmark_denydocs_create
* streetLight+damage 
    - action_setStreetLightpoleDamage
    - slot{"civic_service": "STREET_LIGHT_POLE_DAMAGE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_POLE_DAMAGED_with_landmark_docs_denycreate
* streetLight+damage 
    - action_setStreetLightpoleDamage
    - slot{"civic_service": "STREET_LIGHT_POLE_DAMAGE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_POLE_DAMAGED_with_landmark_denydocs_denycreate
* streetLight+damage 
    - action_setStreetLightpoleDamage
    - slot{"civic_service": "STREET_LIGHT_POLE_DAMAGE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou
    
    

## Story_STREET_POLE_DAMAGED_with_location_docs_create
* streetLight+damage 
    - action_setStreetLightpoleDamage
    - slot{"civic_service": "STREET_LIGHT_POLE_DAMAGE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_POLE_DAMAGED_with_location_denydocs_create
* streetLight+damage 
    - action_setStreetLightpoleDamage
    - slot{"civic_service": "STREET_LIGHT_POLE_DAMAGE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_POLE_DAMAGED_with_location_docs_denycreate
* streetLight+damage 
    - action_setStreetLightpoleDamage
    - slot{"civic_service": "STREET_LIGHT_POLE_DAMAGE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_STREET_POLE_DAMAGED_with_location_denydocs_denycreate
* streetLight+damage 
    - action_setStreetLightpoleDamage
    - slot{"civic_service": "STREET_LIGHT_POLE_DAMAGE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou

    

## Story_MISSED_GARBAGE_PICKUP_with_landmark_docs_create
*  missed+garbage+pickup
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_MISSED_GARBAGE_PICKUP_with_landmark_denydocs_create
*  missed+garbage+pickup
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_MISSED_GARBAGE_PICKUP_with_landmark_docs_denycreate
*  missed+garbage+pickup
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_MISSED_GARBAGE_PICKUP_with_landmark_denydocs_denycreate
*  missed+garbage+pickup
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou
    
    

## Story_MISSED_GARBAGE_PICKUP_with_location_docs_create
*  missed+garbage+pickup
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_MISSED_GARBAGE_PICKUP_with_location_denydocs_create
*  missed+garbage+pickup
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_MISSED_GARBAGE_PICKUP_with_location_docs_denycreate
*  missed+garbage+pickup
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_MISSED_GARBAGE_PICKUP_with_location_denydocs_denycreate
*  missed+garbage+pickup
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou

    

## Story_GARBAGE_VEHICLE_NOT_ARRAIVED_with_landmark_docs_create
*  garbage+pickup+not_arraived
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_GARBAGE_VEHICLE_NOT_ARRAIVED_with_landmark_denydocs_create
*  garbage+pickup+not_arraived
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_GARBAGE_VEHICLE_NOT_ARRAIVED_with_landmark_docs_denycreate
*  garbage+pickup+not_arraived
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_GARBAGE_VEHICLE_NOT_ARRAIVED_with_landmark_denydocs_denycreate
*  garbage+pickup+not_arraived
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou
    
    

## Story_GARBAGE_VEHICLE_NOT_ARRAIVED_with_location_docs_create
*  garbage+pickup+not_arraived
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_GARBAGE_VEHICLE_NOT_ARRAIVED_with_location_denydocs_create
*  garbage+pickup+not_arraived
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_GARBAGE_VEHICLE_NOT_ARRAIVED_with_location_docs_denycreate
*  garbage+pickup+not_arraived
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_GARBAGE_VEHICLE_NOT_ARRAIVED_with_location_denydocs_denycreate
*  garbage+pickup+not_arraived
    - action_setSwmCivicType
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou

    

## Story_BURNING_OF_GARBAGE_IN_OPEN_SPACE_with_landmark_docs_create
*  garbage+burning
    - action_setSwmCivicType
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_BURNING_OF_GARBAGE_IN_OPEN_SPACE_with_landmark_denydocs_create
*  garbage+burning
    - action_setSwmCivicType
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_BURNING_OF_GARBAGE_IN_OPEN_SPACE_with_landmark_docs_denycreate
*  garbage+burning
    - action_setSwmCivicType
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_BURNING_OF_GARBAGE_IN_OPEN_SPACE_with_landmark_denydocs_denycreate
*  garbage+burning
    - action_setSwmCivicType
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform
    - slot{"landmark": "near shivaginagar"}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou
    
    

## Story_BURNING_OF_GARBAGE_IN_OPEN_SPACE_with_location_docs_create
*  garbage+burning
    - action_setSwmCivicType
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_BURNING_OF_GARBAGE_IN_OPEN_SPACE_with_location_denydocs_create
*  garbage+burning
    - action_setSwmCivicType
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_BURNING_OF_GARBAGE_IN_OPEN_SPACE_with_location_docs_denycreate
*  garbage+burning
    - action_setSwmCivicType
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint
    
## Story_BURNING_OF_GARBAGE_IN_OPEN_SPACE_with_location_denydocs_denycreate
*  garbage+burning
    - action_setSwmCivicType
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - action_UserIncidentRemarks
    - utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* deny
    - utter_confirmRaiseCivicComplaint
* deny
    - utter_thankyou


## story assisted_gvna
* inform
    - slot{"attachments":["file1","file2"]}
    - utter_attachmentUploaded
* raiseComplaint
    - utter_ask_civic_service
* inform{"civic_service":"GARBAGE_VEHICEL_NOT_ARRIVED"}
    - utter_askCivicDetails
* inform{ "user_remarks": "message" }
- utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - action_raiseCivicComplaint

## story assiste transit near by bustop
* register_complaint
    - utter_ask_service_type
* inform_service{"services":"transit"}
    - slot{"services":"transit"}
    - utter_ask_transit_services
* inform_transit{"transit_services":"nearest_bustop"}
    - slot{"transit_services":"nearest_bustop"}
- utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - action_nearestBustop

## story assiste transit best route
* register_complaint
    - utter_ask_service_type
* inform_service{"services":"transit"}
    - slot{"services":"transit"}
    - utter_ask_transit_services
* inform_transit{"transit_services":"shortest_route"}
    - slot{"transit_services":"shortest_route"}
    - utter_ask_transit_from
* inform{"transit_from":"trinity"}
    - utter_ask_transit_to
* inform{"transit_to":"mcdonalds"}
    - action_bestRouteBetween

## story transit best route
* inform_transit{"transit_services":"shortest_route"}
    - slot{"transit_services":"shortest_route"}
    - utter_ask_transit_from
* inform{"transit_from":"trinity"}
    - utter_ask_transit_to
* inform{"transit_to":"mcdonalds"}
    - action_bestRouteBetween

## story transit near by bustop
* inform_transit{"transit_services":"nearest_bustop"}
    - slot{"transit_services":"nearest_bustop"}
- utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - action_nearestBustop

## story assisted report waste collection
* register_complaint
    - utter_ask_service_type
* inform_service{"services":"solid waste management"}
    - slot{"services":"solid waste management"}
    - utter_ask_civic_service
* inform{"civic_service":"GARBAGE_VEHICEL_NOT_ARRIVED"}
    - utter_askCivicDetails
* inform{ "user_remarks": "message" }
- utter_ask_complaintLocation
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
    - utter_confirmRaiseCivicComplaint
* affirm
    - action_raiseCivicComplaint

