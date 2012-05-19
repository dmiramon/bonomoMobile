function StartWindow(controller) {

	/*var win = Ti.UI.createWindow({
		title:'Window '+controller.windowStack.length,
		backgroundColor:'#fff',
		layout:'vertical'
	});
	
	var add = Ti.UI.createButton({
		title:'Add A New Window',
		height:'50dp',
		width:'200dp',
		top:'20dp'
	});
	add.addEventListener('click', function() {
		controller.open(new ApplicationWindow(controller).window);
	});
	win.add(add);
	
	var home = Ti.UI.createButton({
		title:'Go to the Home Window',
		height:'50dp',
		width:'200dp',
		top:'20dp'
	});
	home.addEventListener('click', function() {
		controller.home();
	});
	win.add(home);*/
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var FacebookController = require('/controller/FacebookController');
	var fbController = new FacebookController();	
	var BoredWindow = require('BoredWindow');
	var model = require('/model/Model');
	var hasSession = Titanium.Facebook.getLoggedIn();
	
	var win = Titanium.UI.createWindow({
		layout: 'vertical',
		backgroundColor: '#000000',
		fullscreen: true,
		navBarHidden: true
	});
	
	var view1 = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../images/startBackground.png',
		width: '100%',
		height: '100%'
	});
	view1.add(Titanium.UI.createView({height:'20%'}));
	view1.add(Titanium.UI.createImageView({
		backgroundImage: '../images/bonomologo.png',
		width: 247,
		height: 107
	}));
	
	var loginBtn = Titanium.UI.createButton({
		backgroundImage: '../images/startFacebookButton.png',
		width: 193,
		height: 28,
		visible: !hasSession
	});
	loginBtn.addEventListener('click', function(e) {
		controller.activityIndicator.show();
		fbController.login(function() {
			syncFB();
		});
	});
	view1.add(loginBtn);
	
	view1.add(Titanium.UI.createImageView({
		width: '100%',
		height: '5%'
	}));
	
	var tagline = Titanium.UI.createImageView({
		backgroundImage: '../images/startTagline.png',
		width: 193,
		height: 28
	});
	view1.add(tagline);
	
	win.add(view1);
		
	this.window = win;
	
	if (hasSession) {
		controller.activityIndicator.show();
		syncFB();
	}
	
	function syncFB() {
		bonomoController.synchronizeFB(function(result) {
			controller.activityIndicator.hide();
			controller.open(new BoredWindow(controller).window);
			win.close();
		});
		//controller.activityIndicator.show();
	}
}

//make constructor function the public component interface
module.exports = StartWindow;
