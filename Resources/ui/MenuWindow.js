/**
 * @author Diego
 */
function MenuWindow(controller, checkin) {
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var EventsWindow = require('EventsWindow');
	var PlacesWindow = require('PlacesWindow');
	
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
	var buscaBtn = Titanium.UI.createButton({
		title: 'Search for Events'
	});
	var createBtn = Titanium.UI.createButton({
		title: 'New Event'
	});
	
	view1.add(Titanium.UI.createView({height: 120}));
	view1.add(buscaBtn);
	view1.add(Titanium.UI.createView({height: 100}));
	view1.add(createBtn);
	
	window.add(view1);
	
	buscaBtn.addEventListener('click', function(e) {
		bonomoController.getEvents(function(result) {
			controller.open(new EventsWindow(controller, result).window);
		});
	});
	
	createBtn.addEventListener('click', function(e) {
		bonomoController.getPlaces(checkin, function(result) {
			controller.open(new PlacesWindow(controller, checkin, result).window);
		});
	})
	
	this.window = window;
}

module.exports = MenuWindow;