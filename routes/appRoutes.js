module.exports = function( ) {
    
    var publicPath = '/home/gabriel/NodeLearning/change_mgt_app/public/';

    var serveLogin = function( req, res, next ) {

	var options = {
	    root: publicPath,
	    dotfiles: 'deny',
	    headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	    }
	};

	res.sendFile( 'login.html', options);

    };

    var serveApp = function( req, res, next ) {

	var options = {
	    root: publicPath,
	    dotfiles: 'deny',
	    headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	    }
	};

	res.sendFile( 'app.html', options);
	
    };

    var checkSession = function( req, res, next ) {
	
	console.log('--- Session Object ---');
	console.log(req.session);
	console.log('--- Session Object End ---');
	if ( req.session.user ) {
	    next();
	} else {
	    res.status(401).json({error: 'Session timeout'});
	}
	
    };


    var redirect = function( req, res, next ) {
	res.redirect('http://google.com');
    }


    return {
	serveLogin: serveLogin,
	serveApp: serveApp,
	checkSession: checkSession,
	redirect: redirect
    }

};
