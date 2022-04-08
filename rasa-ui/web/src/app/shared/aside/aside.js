angular
.module('app')
.controller('AsideController', AsideController)

function AsideController($scope, $rootScope, $interval, $http,Rasa_Parse, Rasa_Config, Rasa_Version, Settings, Rasa_Status, IntentResponse, mySocket) {
  //$scope.test_text = 'I want italian food in new york';
  $scope.test_text_response = {};
  $rootScope.config = {}; //Initilize in case server is not online at startup
  var configcheck;

  mySocket.on('on:responseMessage', function (message) {
    console.log("Response from socket:" +JSON.stringify(message));
    if(message.next_action !='action_listen'){
      $scope.response_text.push(message.response_text);
    }else{
      $scope.response_text.push("Listening ...");
    }
  });

  Rasa_Version.get().$promise.then(function(data) {
    $rootScope.rasa_version = data.version;
  });
  executeRefreshSettings();

  function executeRefreshSettings(){
    Settings.query().$promise.then(function(data) {
        $rootScope.settings = data;
        for(var key in data) {
          $rootScope.settings[data[key]['setting_name']] = data[key]['setting_value'];
        }
        if ($rootScope.settings['refresh_time'] !== "-1" && $rootScope.settings['refresh_time'] !== undefined) {
          configcheck = $interval(getRasaConfig, parseInt($rootScope.settings['refresh_time']));
        }
        getRasaConfig();
    });
  }

  $scope.$on('executeTestRequest', function(event, expression_text) {
    $scope.test_text = expression_text;
    $scope.executeTestRequest();
  });

  $scope.$on('refreshIntervelUpdate', function(event, expression_text) {
    $interval.cancel(configcheck);
    executeRefreshSettings();
  });

  $scope.$on("$destroy", function(){
    $interval.cancel(configcheck);
  });

  function getRasaConfig() {
    // Add a status param to config and set to 0 if server is offline
    Rasa_Status.get(function(statusdata) {
      Rasa_Config.get().$promise.then(function(data) {
        $rootScope.config = data.toJSON();
        $rootScope.config.isonline = 1;
        $rootScope.config.server_model_dirs_array = getAvailableModels(statusdata);
        if ($rootScope.config.server_model_dirs_array.length > 0) {
          $rootScope.modelname = $rootScope.config.server_model_dirs_array[0].name;
        }
      }, function(error) {
        // error handler
        $rootScope.config.isonline = 0;
      });
    });
  }
  $scope.restartConversation=function(){
    $scope.test_text_response={};
    $http.post(api_endpoint_v2 + "/rasa/restart");
    $scope.response_text=[];
    $scope.test_text_response={};
    $scope.test_text='';
    $rootScope.$broadcast('setAlertText', "Conversation restarted!!");
  }

  $scope.executeTestRequest = function() {
    $scope.response_text=[];
    $scope.test_text_response={};
    var reqMessage = {};
    if ($scope.modelname == '') {
      reqMessage = {q: $scope.test_text};
    } else {
      reqMessage = {q: $scope.test_text, project:$scope.modelname.split("*")[0], model: $scope.modelname.split("*")[1]};
    }
    //mySocket.emit('send:message', {message: "hello there"});
    if($scope.wsEnabled){
      //reponses will be streamed in websockets.
      reqMessage.wsstream=true;
    }
    //make a httpcall

    console.log("::::: URL IS ::::: ", api_endpoint_v2 + "/rasa/parse");
    console.log("::::::: Request Object :::::: ",reqMessage);
    
    $http.post(api_endpoint_v2 + "/rasa/parse", JSON.stringify(reqMessage))
      .then(
        function(response){
          // success callback
          $scope.test_text_response = response.data;
          if(!$scope.wsEnabled){
            $scope.test_text_response.forEach(function(response) {
              $scope.response_text.push(response.response_text);
            })
          }
          $scope.test_text='';
        },
        function(errorResponse){
          // failure callback
        }
      );
  }
}
