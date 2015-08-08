/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
angular.module('changeApp')
.directive('renderForm', function (FormServ) {
    return {
        scope: {},
		templateUrl: "/app/components/form/renderFullFormView.html",
		restrict: 'E',
		link: function (scope, elem, attrs) {
            scope.formData = FormServ.currentFormData.getAllItems();
        }
    };
})
.directive('renderFormComponent', function (FormServ) {
    return {
		restrict: 'E',
		scope: { 
            componentData: '=component',
            type: '=type'
        },
		templateUrl: "/app/components/form/renderComponentView.html",
        controller: function ($scope, FormServ) {
            
            var deletion = false;
            
            $scope.confirmDeletion = function () {
                return deletion;
            };
            
            $scope.clickUpButton = function ( index ) {
                // log only for reference. Need to be removed
                console.log('Up button pressed for ' + index);
                FormServ.currentFormData.moveUp(index);
            };
            
            $scope.clickDownButton = function ( index ) {
                // log only for reference. Need to be removed 
                console.log('Down button pressed');
                FormServ.currentFormData.moveDown(index);
            };
            
            $scope.clickEditButton = function ( index ) {
                // log only for reference. Need to be removed
                console.log('Edit button pressed');
            };
            
            $scope.clickDeleteButton = function ( index ) {
                // log only for reference. Need to be removed
                console.log('Delete button pressed');
                deletion = true;
                //code to show the confirmation dialog
            };
            
            $scope.deletionConfirmed = function ( index ) {
                //call deletion method in currentForm
                console.log('Delete item with index: ', index);
                FormServ.currentFormData.deleteItem(index);
            };
            
            $scope.deletionCancelled = function () {
                //close the confirmation dialog
                deletion = false;
            };                        
            
        }
    };
})
.directive('createFormComponent', function (FormServ) {
    return {
		restrict: 'E',
		link: function (scope, elem, attrs) {
            scope.itemData = FormServ.newItemData;
        },
		templateUrl: "/app/components/form/createComponentView.html"

    };
});
