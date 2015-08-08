angular.module('changeApp')
.factory('FormServ', function () {
    // Defining the change-template array that will contain
    // the idividual items

	var Template = function (templateList) {

        // Checks if contructor is correct and start object
        if (templateList.constructor === Array) {
            console.log('Creating new form template...');
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
        //retrieves an item on the repository and return it
        return this.items[index];
    };
    
    Template.prototype.setItem = function (index , item) {
        // modify the item (index) on the repository and return it
        return this.items.splice( index, 0, item );
    };
    
    Template.prototype.deleteItem = function (index) {
        // delete the item (index) on the repository and fix the order of the coming items
        
        console.log('index on factory: ', index);
        
        // deleting the item
        this.items.splice( index, 1 );
        
        // correcting this.array.order for the other items after the deleted one 
        for (var i = index; i < this.itemCount; i++) {
            this.items[i].order--;
        }
        
        // sort the array
        this.sortItems();
        return this;
    };

    Template.prototype.itemCount = function () {
        //return the numeber of items on the items collection inside template
        return this.items.length;
    };

    Template.prototype.CreateTemplateItem = function (itemType, data) {
        return {
            order : this.itemCount() + 1,
            itemType  : itemType,
            data  : data || {}
        };
    };

    Template.prototype.sortItems = function () {
        //return the numeber of items on the items collection inside template
        return this.items.sort( function (a, b) {
            var x = a.order; 
            var y = b.order;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };


    Template.prototype.moveUp = function ( index ) {
        // Move the component defined on Index one position up
        
        // index cannot be less than zero 
        if (index > 0) { 
            // keep a reference variable 
            var positionSwap = this.items[index].order;
            // Change order of current item on index position then
            // using the reference variable change the previous element
            // I made it this way to avoid any problems in case that because of some
            // logic issue, order get mess up, so in this way I always guarrante that
            // order are swap
            // I am not happy on not using the setItem method instead of doing it so
            // manually, so I need to dig into that  later
            this.items[index].order = this.items[index-1].order;
            this.items[index-1].order = positionSwap;
            
            // sort the variable by Order
            this.sortItems();
        } 
    };


    Template.prototype.moveDown = function ( index ) {
        // Move the component defined on Index one position down

        // index starts from zero becaue it is an array $index and, on the other side  
        // itemCount starts from 1, so I need to substract 1 to match items to array
        if ( index < (this.itemCount() - 1) ) { 
            // keep a reference variable 
            var positionSwap = this.items[index].order;
            // Change order of current item on index position then
            // using the reference variable change the previous element
            // I made it this way to avoid any problems in case that because of some
            // logic issue, order get mess up, so in this way I always guarrante that
            // order are swap
            // I am not happy on not using the setItem method instead of doing it so
            // manually, so I need to dig into that  later
            this.items[index].order = this.items[index+1].order;
            this.items[index+1].order = positionSwap;
            
            // sort the variable by Order
            this.sortItems();
        } 
    };



    return {
        newItemData: newItemData,
		Template: Template,
        currentFormData: currentFormData
	
    };
});
