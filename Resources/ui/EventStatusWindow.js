function EventStatusWindow(controller, eventObject) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	
	var window = Titanium.UI.createWindow({
		layout: 'absolute',
		backgroundColor: '#FFFFFF',
		fullscreen: true,
		navBarHidden: true
	});
	
	var view1 = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../images/fondoconbarra.png',
		height: '100%'
	});
	
	var labelTitle = Titanium.UI.createLabel({
		text: 'Event at ' + eventObject.place.title
	});
	
	view1.add(Titanium.UI.createView({height: 35}));
	view1.add(labelTitle);
	window.add(view1);
	
	this.window = window;
	
}

module.exports = EventStatusWindow;