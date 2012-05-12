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
	
	var viewBase = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../images/fondosinbarra.png',
		height: '100%'
	});
	
	var view1 = Titanium.UI.createView({layout:'horizontal', bottom:'15%', left:'15%', right:'15%', top:'20%'});
	
	var buscaView = Titanium.UI.createView({layout:'vertical'});
	var buscaBtn = Titanium.UI.createButton({
		backgroundImage: '../images/findicon.png',
		width: '81',
		height: '81'
	});
	buscaView.add(buscaBtn);
	buscaView.add(Titanium.UI.createView({height:'5'}));
	buscaView.add(Titanium.UI.createImageView({
		backgroundImage: '../images/findevent.png',
		width: '70',
		height: '46',
	}));
	
	var creaView = Titanium.UI.createView({layout:'vertical'});
	var creaBtn = Titanium.UI.createButton({
		backgroundImage: '../images/makeicon.png',
		width: '56',
		height: '77'
	});
	creaView.add(creaBtn);
	creaView.add(Titanium.UI.createView({height:'5'}));
	creaView.add(Titanium.UI.createImageView({
		backgroundImage: '../images/makeevent.png',
		width: '84',
		height: '46',
	}));

	view1.add(buscaView);
	view1.add(Titanium.UI.createView({width:'40'}));
	view1.add(creaView);
	viewBase.add(Titanium.UI.createImageView({
		backgroundImage: '../images/topbar.png',
		width: '100%',
		height: '49',
	}));
	viewBase.add(Titanium.UI.createImageView({
		backgroundImage: '../images/menuwhattodo.png',
		width: '305',
		height: '42',
	}));
	viewBase.add(view1);
	window.add(viewBase);
	
	buscaBtn.addEventListener('click', function(e) {
		bonomoController.getEvents(function(result) {
			controller.open(new EventsWindow(controller, result).window);
		});
	});
	
	creaBtn.addEventListener('click', function(e) {
		bonomoController.getPlaces(checkin.latitude, checkin.longitude, function(result) {
			controller.open(new PlacesWindow(controller, result).window);
		});
	})
	
	this.window = window;
}

module.exports = MenuWindow;