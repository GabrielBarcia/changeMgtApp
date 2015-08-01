angular.module('testApp', [])
    .controller('myController', function($scope) {

	//$scope.componetSelected = 'List';  
	//$scope.componetSelected = 'TextArea';  

	$scope.items = [
	    { type: 'TextArea', data: 'Somedata1', mandatory: true },
	    { type: 'List', data: 'Somedata2', mandatory: false },
	    { type: 'Select', data: 'Somedata3', mandatory: true }];

    })
    .directive('myComponent', function() {
	return {  
	    restrict: 'E',
	    scope: { obj: '=' },
	    templateUrl: 'component-TextArea.html'
	};
    });
