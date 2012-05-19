/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//require and open top level UI component
/*var ApplicationWindow = require('ui/ApplicationWindow');
new ApplicationWindow().open();*/

var NavigationController = require('controller/NavigationController'),
	StartWindow = require('ui/StartWindow');

var navController = new NavigationController();
var start = new StartWindow(navController);
start.window.addEventListener('open', function(event) {
	navController.activityIndicator.show();
});
start.window.open();

