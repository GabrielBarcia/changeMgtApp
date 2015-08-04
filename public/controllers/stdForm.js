/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('changeApp')

    .controller('stdFormCtrl', function ($scope, FormServ) {


    // instantiating a template if does not exist.
    // logic sgould be added to get templates from database 
    
    if (!$scope.template) {
        $scope.template = FormServ.currentFormData;
    }
    
    $scope.itemData = {
        order: 0,
        itemType: "",
        data: {}
    };

    // defining form interaction and buttons actions
    $scope.clearForm = function () {
        $scope.itemData = {};
    };

    $scope.lstComponentSelected = function () {
        //clearing item data so when a diferent item is selected, 
        //information is not carried over from one item to another
        $scope.itemData.data = {
            order: 0,
            itemType: "",
            data: {}
        };
    };

    $scope.addToTemplate = function () {
	
        // help to process data and add it to the active template
        // Variable type and data receives a copy of the value to break
        // the bind and prevent that continues changing.
        var type = angular.copy($scope.itemData.itemType);
        var data = angular.copy($scope.itemData.data);
	
        // add to the template - note the use of the templateitem to format data
        return $scope.template.addItem( $scope.template.CreateTemplateItem(type, data) );

    };

    $scope.getAllItems = function () {
        return $scope.template.getAllItems();
    };

});

