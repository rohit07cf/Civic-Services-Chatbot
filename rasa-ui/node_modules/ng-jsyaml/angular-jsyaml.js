(function(){

	angular.module('ng-jsyaml', [])
	.factory('yaml', yaml)

	yaml.$inject = ['$window'];

	function yaml($window) {
		if(!$window.jsyaml) {
			throw new Error('js-yaml must be imported before ng-jsyaml to work properly');
		}

		return {
			parse: $window.jsyaml.safeLoad,
			stringify: $window.jsyaml.safeDump
		};
	}

})();