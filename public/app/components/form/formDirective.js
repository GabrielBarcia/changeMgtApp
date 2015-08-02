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
		templateUrl: "/app/components/form/renderComponentView.html"
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
})
// REMOVE THIS DIRECTIVE - ONLY FOR DEBUG 
.directive('peekFormDirective', function (FormServ) {
    return {
        scope: {},
		template: "<pre>{{formData}}</pre>",
		restrict: 'E',
		link: function (scope, elem, attrs) {
            scope.formData = FormServ.currentFormData.getAllItems();
        }
    };
});
