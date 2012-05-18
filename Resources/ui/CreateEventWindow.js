function CreateEventWindow(controller, checkin, place) {
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var EventStatusWindow = require('EventStatusWindow');
	
	var window = Titanium.UI.createWindow({
		layout: 'absolute',
		backgroundColor: '#FFFFFF',
		fullscreen: true,
		navBarHidden: true
	});
	
	var viewBase = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../images/fondosinbarra.png',
		width: '100%',
		height: '100%'
	});
	viewBase.add(Titanium.UI.createImageView({
		backgroundImage: '../images/topbar.png',
		width: '100%',
		height: '49',
	}));
	
	var labelTitle = Titanium.UI.createLabel({
		text: 'Event at ' + place.title,
		color: '#000000',
		font: {
			fontSize: 20,
			fontFamily: 'take_out_the_garbage'
		}
	});
	var labelPlans = Titanium.UI.createLabel({
		text: 'What are your plans in 140 characters?',
		color: '#000000',
		font: {
			fontSize: 18,
			fontFamily: 'take_out_the_garbage'
		}
	});
	var textArea = Ti.UI.createTextArea({
		value: "",
		width: "80%",
		height: "10%",
		borderColor: "black",
		borderRadius: 5,
		borderWidth:1,
		font: {
			fontSize:16,
			fontFamily: 'take_out_the_garbage'
		}
	});
	
	var createButton = Titanium.UI.createButton({
		title: "Create",
		width: 75,
		height: 75
	});
	
	createButton.addEventListener('click', function(e){
		eventoObject = {};
		eventoObject.description = textArea.value;
		eventoObject.endTime = endTimePicker.value;
		eventoObject.place = place;
		bonomoController.createEvent(eventoObject, function(eventObjectResponse) {
			window.close();
			controller.windowStack.pop();
			controller.open(new EventStatusWindow(controller, eventObjectResponse).window);
		});
	});
	
	var endValue = new Date();
	endValue.setHours(endValue.getHours());
	endValue.setMinutes(endValue.getMinutes());
	
	switch (checkin.radius) {
		case 1:	endValue.setMinutes(endValue.getMinutes() + 30);
				break;
		case 2:	endValue.setMinutes(endValue.getMinutes() + 45);
				break;
		case 3:	endValue.setHours(endValue.getHours() + 1);
				break;
		case 4:	endValue.setHours(endValue.getHours() + 2);
				break;
		default:
				break;
	}
	
	var endTimePicker = Ti.UI.createPicker({
		type: Titanium.UI.PICKER_TYPE_TIME,
		value: endValue
	});
	
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(labelTitle);
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(labelPlans);
	viewBase.add(textArea);
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(endTimePicker);
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(createButton);
	window.add(viewBase);
	
	this.window = window;
}

module.exports = CreateEventWindow;