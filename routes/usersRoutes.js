module.exports = function( models, mongoose ) {
    
    var loginRequest = function( req, res, next ) {
	
	var user = req.body.user;
	var password = req.body.pass;

	console.log('--- Login Request ---');
	console.log('User: ' + user);
	console.log('Pass: ' + password);

	if ( user === '' || password === '' ) {
	    
	    //Some field is blank - insufficient information
	    console.log('User login failure: Insufficient data');
	    res.json(400, {});
	    
	} else {
	    models.account.loginRequest ( user, password, function ( result ) {
		console.log ( result );
		if ( result != null ) {
		    console.log('Login Succesful');
		    userSession = req.session;
		    userSession.user = user;
		    console.log('--- User Session ---');
		    console.log(userSession);
		    console.log('--- END ---');

		    res.status(200).json({ appPath: '/app'});

		} else {
		    console.log('Login NOT Succesful');
		    res.status(401).json({});
		}
	    });
	}
	
    }


    return {
	loginRequest: loginRequest
    }

};
