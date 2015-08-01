module.exports = function( mongoose ) {
    
    var userSchema = new mongoose.Schema ({
	name: String,
	lastname: String,
	email: String,
	password: String,
	role: {
	    approver: Boolean,
	    admin: Boolean },
	active: Boolean
    });
    
    var userModel = mongoose.model( 'users', userSchema );

    var loginRequest = function( user, password, callback ) {
	console.log('--- Checking on database ---');
	console.log('User: ' + user );
	console.log('Password: ' + password );
	userModel.findOne (
	    { email: user, password: password }, 
	    function( err, doc ) {
		console.log('--- Doc ---');
		callback ( doc );
	    });
    };

    return {
	userModel: userModel,
	loginRequest: loginRequest
    };

}
