## story1
* greetings_hello
    - action_chatbot_pic
    - utter_starting_quote
    - utter_greetingshello
    - utter_afterGreetings
    - action_greet_suggestion

## story1A
*    greetings_hello{"name":"Pramod","phoneNo":"8527419630","tenentId":"1","cepServerUrl":"http://trinitycitizen.azurewebsites.net","electricityaccno":"23456789"}
    - action_chatbot_pic
    - utter_starting_quote
    - utter_greetingshello
    - utter_afterGreetings
    - action_greet_suggestion

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
    - utter_showOptions
    - action_show_help_services

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

## story 65 for recently raised complaints
* recent_raised_complaints
	  - action_bot_service

## story Get Status using complaint id
* get_complaintid_status{"complainId": "INC-20190830-000245"}
   - slot{"complainId": "INC-20190830-000245"}
   - action_bot_service

## story 66 for Parking Info 
* parking_info 
   - utter_ask_two_or_four_wheeler

## story 66a for two wheeler parking info
* inform{"parking_vehicle_type":"two_wheeler"} 
   - slot{"parking_vehicle_type": "two_wheeler"}
   - utter_askparklocation
> continue_parking_flow

## story 66b for two wheeler parking info
* inform{"parking_vehicle_type":"four_wheeler"} 
   - slot{"parking_vehicle_type": "four_wheeler"}
   - utter_askparklocation
> continue_parking_flow

## story for 66c common parking with Feedback
> continue_parking_flow
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - action_parking_service
   - utter_parking_suggestion_buttons
* deny
    - utter_service_feedback

## story for 66d common parking ask another parking
> continue_parking_flow
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - action_parking_service
   - utter_parking_suggestion_buttons
* another_park_location
   - utter_askparklocation
> continue_parking_flow

## story 67 for Connecting to agent
* connect_agent
   - utter_regard_what
   
## story 67A for deny connecting to agent
* thankyou
   - utter_chat_thankyou

## story 68 for weather info
* weather_info
   - utter_oksure
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - action_cityweather_info 

## story 69 for air quality info
* air_quality
   - utter_oksure
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - action_air_quality_service
   - utter_thankyou
   - utter_ask_helpful_info

## story 70 for common report incident
* register_complaint
    - utter_ask_service_issue_type

##  story 71 report garbage problem
* report_garbage_problem
    - utter_ask_garbage_issue_type
> continue_waste_management_issue

## story 71-A for garbage services
* intent_garbage_service
    - utter_garbage_services
    - action_garbage_services

## story 71A report Garbage pickup Not arrived
> continue_waste_management_issue
* inform{"civic_service":"GARBAGE_VEHICLE_NOT_ARRIVED"}
   - slot{"civic_service":"GARBAGE_VEHICLE_NOT_ARRIVED"}
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - action_nextGarbagePickupTime
    - utter_ask_satisfied
* deny
    - utter_askCivicDetails
> continue_remarks_normal_incident_flow

## story 71B assisted report waste management BURNING_OF_GARBAGE_IN_OPEN_SPACE
> continue_waste_management_issue
* inform{"civic_service":"BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
   - slot{"civic_service":"BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
   - utter_ask_common_complaint_location
> continue_normal_incident_flow

## story 71C assisted report waste management Missed_garbage_pickup
> continue_waste_management_issue
* inform{"civic_service":"MISSED_GARBAGE_PICKUP"}
   - slot{"civic_service":"MISSED_GARBAGE_PICKUP"}
   - utter_ask_common_complaint_location
> continue_normal_incident_flow

## story 71D for report garbage burning Generic create incident
* garbage+burning
    - action_set_civic_type
    - slot{"civic_service": "BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
    - utter_ask_common_complaint_location
> continue_normal_incident_flow

## story 71E for report garbage not picked up
* garbage+pickup+not_arraived
    - action_set_civic_type
    - slot{"civic_service": "GARBAGE_VEHICLE_NOT_ARRIVED"}
    - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
	 - action_nextGarbagePickupTime
   - utter_ask_satisfied
* affirm
    - utter_thankyou
    - utter_garbage_moto

## story 71E for report garbage not picked up create incident
* garbage+pickup+not_arraived
    - action_set_civic_type
    - slot{"civic_service": "GARBAGE_VEHICLE_NOT_ARRIVED"}
    - utter_ask_location
 * inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - action_nextGarbagePickupTime
    - utter_ask_satisfied
* deny
    - utter_askCivicDetails
> continue_remarks_normal_incident_flow

## story 71F for Missed garbage pickup
* missed+garbage+pickup
    - action_set_civic_type
    - slot{"civic_service": "MISSED_GARBAGE_PICKUP"}
    - utter_ask_common_complaint_location
> continue_normal_incident_flow

## story 71G for garbage pickup schedule
* garbage_schedule
   - utter_oksure
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - action_garbage_pickup_schedule
	 - utter_gabage_tips
   - utter_garbage_moto

## story 71H for Nearest garbage bin location
* nearest_bin_loc
   - utter_oksure
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - action_garbage_bin_location
   - utter_gabage_tips
   - utter_garbage_moto

## story 72-A for Electricity services
* intent_electricity_service
    - utter_electricity_services
    - action_electricity_services

## story 72 for electricity problem Generic create incident
* report_electricity_problem
   - utter_ask_electricity_service_issue_types
> continue_eletricity_issue

## story 72A for reporting street light out issue
> continue_eletricity_issue
* inform{"civic_service":"STREET_LIGHT_OUT"}
   - slot{"civic_service":"STREET_LIGHT_OUT"}
   - utter_ask_common_complaint_location
> continue_normal_incident_flow
  
## story 72B for reporting high voltage issue
> continue_eletricity_issue
* inform{"civic_service":"VOLTAGE_FLUCTUATION"}
   - slot{"civic_service":"VOLTAGE_FLUCTUATION"}
   - utter_ask_common_complaint_location
> continue_normal_incident_flow

## story 72C for reporting no electricity with no balance
> continue_eletricity_issue
* inform{"civic_service":"NO_ELECTRICITY"}
   - slot{"civic_service":"NO_ELECTRICITY"}
   - action_electricity_balance_info
   - slot{"balance_available":false}
   - utter_insufficient_balance
   - utter_chat_thankyou
 
## story 72D for reporting no electricity issue affirm with balance
> continue_eletricity_issue
* inform{"civic_service":"NO_ELECTRICITY"}
   - slot{"civic_service":"NO_ELECTRICITY"}
   - action_electricity_balance_info
   - slot{"balance_available":true}
   - utter_no_electricity_reasons
   - utter_ask_issue_resolved
* affirm
   - utter_chat_thankyou
   
## story 72E for reporting no electricity issue deny
> continue_eletricity_issue
* inform{"civic_service":"NO_ELECTRICITY"}
   - slot{"civic_service":"NO_ELECTRICITY"}
   - action_electricity_balance_info
   - slot{"balance_available":true}
   - utter_no_electricity_reasons
   - utter_ask_issue_resolved
* deny
   - utter_ask_common_complaint_location
> continue_normal_incident_flow

## story 73-A for Water services
* intent_water_service
    - utter_water_services
    - action_water_services

## story 73 for report Water problem Generic create incident
* report_water_problem
   - utter_ask_water_issue_types
> continue_water_problem

## story 73A for reporting water on street issue
> continue_water_problem
* inform{"civic_service":"WATER_ON_STREET"}
   - slot{"civic_service":"WATER_ON_STREET"}
   - utter_ask_common_complaint_location
> continue_normal_incident_flow
  
## story 73B for reporting water polluted issue
> continue_water_problem
* inform{"civic_service":"WATER_POLLUTED"}
   - slot{"civic_service":"WATER_POLLUTED"}
   - utter_ask_common_complaint_location
> continue_normal_incident_flow

## story 73C for reporting no water supply affirm
> continue_water_problem
* inform{"civic_service":"NO_WATER_SUPPLY"}
   - slot{"civic_service":"NO_WATER_SUPPLY"}
   - utter_no_water_reasons
   - utter_ask_issue_resolved
* affirm
   - utter_greet_resolve
   - utter_chat_thankyou
   
## story 73E for reporting no water supply deny
> continue_water_problem
* inform{"civic_service":"NO_WATER_SUPPLY"}
   - slot{"civic_service":"NO_WATER_SUPPLY"}
   - utter_no_water_reasons
   - utter_ask_issue_resolved
* deny
   - utter_ask_common_complaint_location
> continue_normal_incident_flow

## story 73F for new water connection
* new_water_connection
    - utter_oksure
    - action_new_water_connection
    - utter_water_moto

## story 73G for water timing
* water_schedule
   - utter_oksure
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - action_water_schedule
	 - utter_water_saving_tips
   - utter_water_saving_moto

## story 74 for common create incident affirm
> continue_normal_incident_flow
* inform_common_location{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - utter_askCivicDetails
* inform{ "user_remarks": "message" }
   - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
   - utter_confirmRaiseCivicComplaint
* affirm
   - action_raiseCivicComplaint
   
## story 74A for common create incident deny
> continue_normal_incident_flow
* inform_common_location{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - utter_askCivicDetails
* inform{ "user_remarks": "message" }
   - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
   - utter_confirmRaiseCivicComplaint
* deny
   - utter_req_cancel

## story 74B for common create incident deny attachment deny create incident 
> continue_normal_incident_flow  
* inform_common_location{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - utter_askCivicDetails
* inform{ "user_remarks": "message" }
   - utter_ask_attachments
* deny
   - utter_confirmRaiseCivicComplaint
* deny
   - utter_req_cancel

## story 74C for common create incident deny attachment create incident  
> continue_normal_incident_flow 
* inform_common_location{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - utter_askCivicDetails
* inform{ "user_remarks": "message" }
   - utter_ask_attachments
* deny
   - utter_confirmRaiseCivicComplaint
* affirm
   - action_raiseCivicComplaint


## story 75A transit near by bus stops
* inform_nearby_busstops
    - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - action_nearestBustop

## story 75B transit near by bus Depot
* bus_depot
    - utter_oksure
    - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
    - slot{"address": "bangalore"}
    - slot{"latitude": 77.78687}
    - slot{"longitude": 27.769869}
    - action_nearest_bus_depot

## story 75C transit Bus route info when bus no entered
* bus_number_details
   - utter_ask_bus_number
* inform{"bus_number":"300K-U"}
   - action_bus_number_details
   - utter_ask_helpful_info

## story 75D transit Bus Planner source and Dest 
* bus_route_details
   - utter_ask_transit_from
* inform{"transit_from":"trinity"}
   - utter_ask_transit_to
* inform{"transit_to":"mcdonalds"}
    - action_bus_route_details
    - utter_ask_helpful_info

## story 75E transport services
* intent_transport_service
   - utter_transport_services
   - action_transport_services
   
## story 75F transit Bus Planner source and Dest 
* bus_route_details{"transit_from":"trinity","transit_to":"rajajinagar"}
   - slot{"transit_from": "trinity"}
   - slot{"transit_to": "rajajinagar"}
   - action_bus_route_details
   - utter_ask_helpful_info

## story 75G transit Bus No Info direct bus no Entered
* bus_number_details{"bus_number":"300K-U"}
   - slot{"bus_number": "300K-U"}
   - action_bus_number_details
   - utter_ask_helpful_info

## story 76 from ask remarks create incident affirm
> continue_remarks_normal_incident_flow
* inform{ "user_remarks": "message" }
   - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
   - utter_confirmRaiseCivicComplaint
* affirm
   - action_raiseCivicComplaint

## story 76A from ask remarks create incident deny
> continue_remarks_normal_incident_flow
* inform{ "user_remarks": "message" }
   - utter_ask_attachments
* inform{"attachments":["file1","file2"]}
   - utter_confirmRaiseCivicComplaint
* deny
   - utter_req_cancel

## story 76B from ask remarks create incident deny attachment deny create incident
> continue_remarks_normal_incident_flow
* inform{ "user_remarks": "message" }
   - utter_ask_attachments
* deny
   - utter_confirmRaiseCivicComplaint
* deny
   - utter_req_cancel

## story 76C from ask remarks create incident deny attachment create incident
> continue_remarks_normal_incident_flow
* inform{ "user_remarks": "message" }
   - utter_ask_attachments
* deny
   - utter_confirmRaiseCivicComplaint
* affirm
   - action_raiseCivicComplaint 

## story 77 insect remedies
* intent_remedies
   - utter_insect_remedies
   
## story 78 water authority contact details
* water_contact
   - utter_water_contact
   - action_contact_service
   - utter_ask_feedback

## story 79 police contact details
* police_contact
   - action_police_contact_details
  
 ## story 80 fire contact details
* fire_contact
   - action_fire_contact_details
  
## story 81 ambulance contact details
* ambulance_contact
   - action_ambulance_contact_details

## story 81A garbage contact details
* garbage_contact
   - action_garbage_contact_service

## story 82 liked suggestion
* liked
   - utter_user_thankyou

## story 82B disliked suggestion
* disliked
   - utter_user_disliked

## story 83 bus contact details
* Bus_contact
   - action_bus_contact_details

## story 84  inform nearby hospitals
* inform_nearby_hospitals
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - action_nearestHospitals
 
 ## story 85 inform nearby police stations
* nearest_police_station
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - action_nearest_police_station

 ## story 86 inform nearby fire stations
* nearest_fire_station
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - action_nearest_fire_station

## story 87 for common report incident tamil
* register_complaint_tamil
    - utter_ask_service_issue_type_tamil 
	
## story 88 report garbage problem tamil
* report_garbage_problem_tamil
    - utter_ask_garbage_issue_type_tamil
> continue_waste_management_issue_tamil

## story 88A report Garbage pickup Not arrived tamil
> continue_waste_management_issue_tamil
* informtamil{"civic_service":"GARBAGE_VEHICLE_NOT_ARRIVED"}
   - slot{"civic_service":"GARBAGE_VEHICLE_NOT_ARRIVED"}
   - utter_ask_common_complaint_location_tamil
> continue_remarks_normal_incident_flow_tamil

## story 88B assisted report waste management BURNING_OF_GARBAGE_IN_OPEN_SPACE tamil
> continue_waste_management_issue_tamil
* informtamil{"civic_service":"BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
   - slot{"civic_service":"BURNING_OF_GARBAGE_IN_OPEN_SPACE"}
   - utter_ask_common_complaint_location_tamil
> continue_remarks_normal_incident_flow_tamil

## story 88C assisted report waste management Missed_garbage_pickup tamil
> continue_waste_management_issue_tamil
* informtamil{"civic_service":"MISSED_GARBAGE_PICKUP"}
   - slot{"civic_service":"MISSED_GARBAGE_PICKUP"}
   - utter_ask_common_complaint_location_tamil
> continue_remarks_normal_incident_flow_tamil


## story 89 for common create incident affirm tamil
> continue_remarks_normal_incident_flow_tamil
* inform_common_location_tamil{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - utter_askCivicDetails_tamil
* informtamil{ "user_remarks": "message" }
   - utter_ask_attachments_tamil
* informtamil{"attachments":["file1","file2"]}
   - utter_confirmRaiseCivicComplaint_tamil
* affirm_tamil
   - action_raiseCivicComplaint_tamil
   
## story 89A for common create incident deny tamil
> continue_remarks_normal_incident_flow_tamil
* inform_common_location_tamil{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - utter_askCivicDetails_tamil
* informtamil{ "user_remarks": "message" }
   - utter_ask_attachments_tamil
* informtamil{"attachments":["file1","file2"]}
   - utter_confirmRaiseCivicComplaint_tamil
* deny_tamil
   - utter_req_cancel_tamil

## story 89B for common create incident deny attachment deny create incident tamil
> continue_remarks_normal_incident_flow_tamil  
* inform_common_location_tamil{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - utter_askCivicDetails_tamil
* informtamil{ "user_remarks": "message" }
   - utter_ask_attachments_tamil
* deny_tamil
   - utter_confirmRaiseCivicComplaint_tamil
* deny_tamil
   - utter_req_cancel_tamil

## story 89C for common create incident deny attachment create incident tamil  
> continue_remarks_normal_incident_flow_tamil 
* inform_common_location_tamil{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - slot{"address": "bangalore"}
   - slot{"latitude": 77.78687}
   - slot{"longitude": 27.769869}
   - utter_askCivicDetails_tamil
* informtamil{ "user_remarks": "message" }
   - utter_ask_attachments_tamil
* deny_tamil
   - utter_confirmRaiseCivicComplaint_tamil
* affirm_tamil
   - action_raiseCivicComplaint_tamil

## story 94 nearby tourist places
* inform_nearbytouristplaces
   - utter_ask_location
* inform{"address": "bangalore", "latitude": 77.78687, "longitude": 27.769869}
   - action_nearestTouristPlace

## story socialAccident Info
* socialIncidentInfo
   - utter_socialIncident_Info
 
 ## story socialAccident Event
* socialIncidentEvent
   - utter_socialIncident_Event
