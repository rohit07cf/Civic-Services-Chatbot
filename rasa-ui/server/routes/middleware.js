var request = require('request');
const db = require('../db/db')
const messages = require('../db/messages')
const NodeCache = require( "node-cache" );
const core_router = require( "./mw_routes/core_router" );
const nlu_router = require( "./mw_routes/nlu_router" );
//https://github.com/mpneuried/nodecache
const agentCache = new NodeCache();

/*
* Middleware for parse Request. All other requests go to specific modules.
*/
function parseRasaRequest(req, res, next) {
  console.log("Got to parse middleware");
  if(req.body.q == ''){
    console.log("No Query in the RASA Parse Request.");
    sendOutput(500, res, '{"error" : "No Query in the Rasa Parse Request !!"}');
    return;
  }
  //attempt to get it from the cache: Sync call
  var agent_name=req.body.project;
  agentObj = agentCache.get(agent_name);
  var messageObj =new Object();
  messageObj.user_id = req.jwt.username;
  messageObj.user_name = req.jwt.name;
  messageObj.message_text = req.body.q;
  messageObj.message_rich = null
  messageObj.user_message_ind = true;
  if(agentObj == undefined ){
    console.log("Cache Not Found for Agent. Making a DB call for: "+ agent_name);
    db.any('SELECT agent_id, agent_name, endpoint_enabled, endpoint_url, basic_auth_username, '+
    ' basic_auth_password, rasa_core_enabled from agents where agent_name = $1', agent_name)
    .then(function (data) {
      console.log("Agent Information: " + JSON.stringify(data));
      //cache Agents only if Env variable is set.
      if(global.cacheagents == "true"){
          //add this to the cache
          console.log("global.cacheagents is true. Setting Agent in cache");
          agentCache.set(agent_name, data[0]);
      }
      //insert user_message into message table.
      messageObj.agent_id = data[0].agent_id;
      messages.createMessage(messageObj);
      //route the req to appropriate router.
      routeRequest(req, res, next, data[0]);
    }).catch(function(err){
      console.log("DB Error while getting agent details." );
      console.log(err);
    });
  }else{
    //insert user_message into message table.
    messageObj.agent_id = agentObj.agent_id;
    routeRequest(req, res, next, agentObj);
  }
}

function saveUserMessages(req, res, next) {
  console.log(":::::::: saveUserMessages ::::::::: ");
  var messageObj =new Object();

  try {

    if(req.body.userMessage == ''){
      console.log("No Query in the RASA Parse Request.");
      sendOutput(500, res, '{"error" : "No Query in the Rasa Parse Request !!"}');
      return;
    }

    messageObj.user_id = req.jwt.username;
    messageObj.user_name = req.jwt.name;
    messageObj.message_text = req.body.userMessage;
    messageObj.message_rich = null
    messageObj.user_message_ind = true;
    messageObj.agent_id = req.body.agent_id;

    console.log(":::::: REQUET ::::: ", messageObj);
    


    messages.createMessage(messageObj);
    console.log("Message created successfully!!!");
    sendOutput(200, res, '{"success" : "Message created successfully!!!"}');
  } catch (error) {
    console.log("DB Error while getting agent details." );
    console.log(err);
    sendOutput(500, res, '{"error" : "Message Not saved !!"}');
  }

}

function routeRequest(req, res, next, agentObj){
  nlu_router.parseRequest(req, res, next, agentObj);
   /* if(agentObj.rasa_core_enabled){
      core_router.parseRequest(req, res, next, agentObj);
    }else{
      nlu_router.parseRequest(req, res, next, agentObj);
    }*/
}

function sendOutput(http_code, res, body) {
  res.writeHead(http_code, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });
  if (body !== "") {
    res.write(body);
  }
  res.end();
}
module.exports = {
  parseRasaRequest: parseRasaRequest,
  saveUserMessages: saveUserMessages
};
