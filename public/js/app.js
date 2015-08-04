/// <reference path="../../typings/angularjs/angular.d.ts"/>

angular.module('changeApp', [])
	.controller('mainCtrl', function ($scope) {

    $scope.userData = {};
    $scope.functions = {};

    $scope.appData = {
		menu: [
			{
				menuName: 'Changes',
				panel: 'panel-changes',
				options: [
					{ name: 'My open changes', view: 'myOpenChanges' },
					{ name: 'Create a Change', view: 'createAChange' },
					{ name: 'Changes I Own', view: 'changesIOwn' }
				]
			},
			{
				menuName: 'Approvals',
				panel: 'panel-approvals',
				options: [
					{ name: 'Pending My Approval', view: 'myApprovalPending' },
					{ name: 'Pending Group Approval', view: 'groupApprovalPending' },
					{ name: 'Approved by Me', view: 'myApproved' },
					{ name: 'Approved by My Group', view: 'groupApproved' }
				]
			},
			{
				menuName: 'Admin',
				panel: 'panel-admin',
				options: [
					{ name: 'Tool Users', view: 'usersAdmin' },
					{ name: 'Approvers', view: 'approversAdmin' },
					{ name: 'Standards Changes', view: 'stdChgAdmin' },
					{ name: 'Standard Form', view: 'stdFormAdmin' }
				]
			}
		]
    };

    $scope.userData.currentOption = null;
    $scope.userData.panelSrc = null;

    $scope.functions.selectOption = function (newOption, newPanel) {
		$scope.userData.currentOption = newOption;
		$scope.userData.panelSrc = "/views/" + newPanel + ".html";
    }


})
// .controller('modalCtrl', function ($scope, FormServ) {
    
//     var template;
    
//     if (FormServ.currentFormData.getAllItems() === Array) {
//         template = FormServ.currentFormData.getAllItems();
//     } else {
//         template = [];
//     }
    
//     $scope.newChange = new FormServ.Template( template );	
    

// })