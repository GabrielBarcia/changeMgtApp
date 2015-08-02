angular.module('changeApp')
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
});
