/// <reference path="../../typings/angularjs/angular.d.ts"/>

angular.module('changeApp', ['angularModalService'])
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
		$scope.userData.panelSrc = "views/" + newPanel + ".html";
    }


})
.factory('FormServ', function () {
    // Defining the change-template array that will contain
    // the idividual items

	var Template = function (templateList) {

        // Checks if contructor is correct and start object
        if (templateList.constructor === Array) {
            this.items = templateList || []; //the [] is quite useless here
        } else {
            throw 'Error - Constructor passed to template is not an array';
        }
    };

    Template.prototype.getAllItems = function () {
        //take a template item object and add it to the template items repository
        return this.items;
    };

	var newItemData = {};
    
    var currentFormData = new Template([]);
    
	
	Template.prototype.addItem = function (templateItem) {
        //take a template item object and add it to the template items repository
        this.items.push(templateItem);
    };

    Template.prototype.getItem = function (index) {
        //retrieves a item on the repository and return it as json
        return this.items[index];
    };

    Template.prototype.itemCount = function () {
        //return the numeber of items on the items collection inside template
        return this.items.length;
    }

    Template.prototype.CreateTemplateItem = function (itemType, data) {
        return {
            order : this.itemCount() + 1,
            itemType  : itemType,
            data  : data || {}
        };
    };

    return {
        newItemData: newItemData,
		Template: Template,
        currentFormData: currentFormData
	
    };
})
// .controller('modalController', function ($scope, FormServ) {
    
//     var template;
    
//     if (FormServ.currentFormData.getAllItems() === Array) {
//         template = FormServ.currentFormData.getAllItems();
//     } else {
//         template = [];
//     }
    
//     $scope.newChange = new FormServ.Template( template );	
    

// })

.directive('renderForm', function (FormServ) {
    return {
        scope: {},
		templateUrl: "/views/templateRender/renderFullForm.html",
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
		// added for test with service for data starts
		// link: function (scope, elem, attrs) {

            // if (attrs['type']=='edit') {
            //     scope.type = 'edit';
            //     console.log('This componenet will be editable');
            // };

        // },
		// added for test with service for data ends
		templateUrl: "/views/templateRender/renderComponent.html"
		

    };
})
	.directive('createFormComponent', function (FormServ) {
    return {
		restrict: 'E',
		// added for test with service for data starts
		link: function (scope, elem, attrs) {
            scope.itemData = FormServ.newItemData;
        },
		// added for test with service for data ends
		templateUrl: "/views/templateRender/createComponent.html"

    };
})
