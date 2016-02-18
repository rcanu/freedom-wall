'use strict';

angular.module('freedom-wall', ['ngRoute'])
.controller('PostsController', ['$scope', function($scope){

	// Preloaded messages
	$scope.messages = ['Hello World!','Lorem ipsum'];

	$scope.post = function(){
		
		// Get the length of the array
		var len = $scope.messages.length;

		// Add the message to the top
		$scope.messages.splice(0, 0, $scope.message);

	}

}]);

