function BoredWindow(controller) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	//var EventsWindow = require('EventsWindow');
	var MenuWindow = require('MenuWindow');
	
	var window = Titanium.UI.createWindow({
		title: 'How bored?',
		layout: 'vertical',
		backgroundColor: '#FFFFFF',
		fullscreen: true,
		navBarHidden: true,
		exitOnClose: true
	});
	
	var viewBase = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../images/fondoconbarra.png',
		height: '100%'
	});
	
	var view1 = Titanium.UI.createView({layout:'vertical'});
	view1.add(Titanium.UI.createImageView({
		backgroundImage: '../images/howbored.png',
		width: '268',
		height: '23',
	}));
	
	var view2 = Titanium.UI.createView({layout:'horizontal'});
	var boredSlider = Titanium.UI.createSlider({
	    min: 1,
	    max: 4,
	    value: 1,
	    width: 260,
	    height: 40,
	    top: 10,
	    left: 20,
	    backgroundSelectedColor: '#97D1FD',
	    backgroundFocusedColor: '#97D1FD'
	});
	view2.add(boredSlider);
	
	var view3 = Titanium.UI.createView({layout:'vertical'});
	var fondoGlobo = Titanium.UI.createView({
		backgroundImage: '../images/globo.png',
		width: '259',
		height: '109',
	});
	var boredLevel = Titanium.UI.createLabel({
		text: 'not that bored...',
		color: '#FFFFFF', 
		textAlign: 'center',
		top: 10,
		font: {
			fontSize: 24
		}
	});
	fondoGlobo.add(boredLevel);
	view3.add(fondoGlobo);
	
	var view4 = Titanium.UI.createView({layout:'horizontal'});
	var view5 = Titanium.UI.createView({layout:'vertical'});
	var fondoCuadro = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../images/cajatimeofboredom.png',
		width: '120',
		height: '94',
	});
	var boredTime = Titanium.UI.createLabel({
		text: '30',
		color: '#97D1FD', 
		textAlign: 'center',
		top: 8,
		font: {
			fontSize: 26,
			fontWeight: 'bold'
		}
	});
	var boredText1 = Titanium.UI.createLabel({
		text: 'minutes of',
		color: '#97D1FD', 
		textAlign: 'center',
		font: {
			fontSize: 15,
			fontWeight: 'bold'
		}
	});
	var boredText2 = Titanium.UI.createLabel({
		text: 'boredom relief',
		color: '#97D1FD', 
		textAlign: 'center',
		font: {
			fontSize: 15,
			fontWeight: 'bold'
		}
	});
	var boredPanda = Titanium.UI.createImageView({
		backgroundImage: '../images/panda1.png',
		width: '200',
		height: '150',
	});
	var sendButton = Titanium.UI.createButton({
		backgroundImage: '../images/botongo.png',
		width: 84,
		height: 41
	});
	fondoCuadro.add(boredTime);
	fondoCuadro.add(boredText1);
	fondoCuadro.add(boredText2);
	view5.add(fondoCuadro);
	view5.add(Titanium.UI.createView({height:15}));
	view5.add(sendButton);
	view4.add(boredPanda);
	view4.add(view5);
	view4.add(Titanium.UI.createView({width:10})); 
	
	viewBase.add(Titanium.UI.createView({height:60}));
	viewBase.add(view1);
	viewBase.add(Titanium.UI.createView({height:15}));
	viewBase.add(view2);
	viewBase.add(Titanium.UI.createView({height:20}));
	viewBase.add(view3);
	viewBase.add(Titanium.UI.createView({height:10}));
	viewBase.add(view4);
	window.add(viewBase);
	
	boredSlider.addEventListener('change', function(e) {
		boredPanda.setBackgroundImage('../images/panda' + e.value + '.png');
		switch (e.value) {
			case 1:	boredLevel.setText('not that bored...');
					boredTime.setText('30');
					boredText1.setText('minutes of');
					break;
			case 2:	boredLevel.setText('feeling the boredom...');
					boredTime.setText('45');
					boredText1.setText('minutes of');
					break;
			case 3:	boredLevel.setText('soooooo bored...');
					boredTime.setText('1');
					boredText1.setText('hour of');
					break;
			case 4:	boredLevel.setText('this is unbearable...');
					boredTime.setText('2+');
					boredText1.setText('hours of');
					break;
			default:
					break;
		}
	});
	
	sendButton.addEventListener('click', function(e) {
		var checkin = {};
		Titanium.Geolocation.getCurrentPosition(function(ll) {
			if (ll.error) {
				ll.coords = {};
				ll.coords.latitude = 19.441524;
				ll.coords.longitude = -99.205341;
			}
			checkin.latitude = ll.coords.latitude;
			checkin.longitude = ll.coords.longitude;
			checkin.radius = boredSlider.value;
			bonomoController.createBoredomCheckin(checkin, function() {
				controller.open(new MenuWindow(controller, checkin).window);
			});
			/*bonomoController.getPlaces(ll, function(result) {
				controller.open(new EventsWindow(controller, result).window);
			});*/
		});
	});
	
	this.window = window;
}

module.exports = BoredWindow;
