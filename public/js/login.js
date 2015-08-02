angular.module('loginToApp', [])
.constant ( 'loginURL', '/users/loginRequest')
.controller ( 'loginCtrl', function( $scope, $http, $window, loginURL ) {
    
    $scope.data = [
	{ inEmail: '', inPass: '', loginError: false }
    ];

    $scope.loginRequest = function( user, pass ) {

	console.log('--- LoginRequest ---');
	console.log('User: ' + user);
	console.log('Pass: ' + pass);
	console.log('LoginRequest: ' + loginURL );

	$http.post ( loginURL,
		     {
			 user: user,
			 pass: pass
		     },
		     { withCredentials: true })

	    .success ( function( data, status, headers, config ) {
		console.log('--- SUCCESS ---');
		console.log('Data');
		console.log(data);
		console.log('Status');
		console.log(status);
		console.log('Headers');
		console.log(headers);
		console.log('Config');
		console.log(config);
		
		var appWindow = 'http://' + $window.location.host + data.appPath;
		console.log('--- APP window ---');
		console.log(appWindow);
		console.log('--- APP window ends ---');
		$window.location.href = appWindow;
		
	    })
	    .error ( function( data, status, headers, config ) {
		console.log('--- ERROR ---');
		console.log('Data');
		console.log(data);
		console.log('Status');
		console.log(status);
		console.log('Headers');
		console.log(headers);
		console.log('Config');
		console.log(config);

		if ( status != 301 ) {
		    loginError ( true );
		}
	});
    };

    var loginError = function( bool ) {
	$scope.data.loginError = bool;
    }

});
