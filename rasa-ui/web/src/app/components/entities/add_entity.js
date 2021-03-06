angular
.module('app')
.controller('AddEntityController', AddEntityController)

function AddEntityController($scope, Entity,Agent, $rootScope) {

  Agent.get({agent_id: $scope.$routeParams.agent_id}, function(data) {
      $scope.formData.agent = data;
  });
  Agent.query(function(data) {
      $scope.agentsList = data;
  });

  $scope.addEntity = function(params) {
    //alert(this.formData.values);
    if(this.formData.slot_data_type != 'categorical' ){
      this.formData.values=''
    }
    //alert(this.formData.values);
    Entity.save(this.formData).$promise.then(function(resp) {
      $scope.formData.entity_name = "";
      $rootScope.$broadcast('setAlertText', "Entity Added for " +$scope.formData.agent.agent_name + " Sucessfully !!");
      $scope.go('/agent/'+$scope.formData.agent.agent_id);
    });
  };
}
