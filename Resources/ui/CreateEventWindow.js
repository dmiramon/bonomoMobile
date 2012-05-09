function CreateEventWindow(controller, checkin, place) {
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
		text: 'Do something at ' + place.title
	});
	var labelPlans = Titanium.UI.createLabel({
		text: 'What are your plans in 140 characters?'
	});
	var textArea = Ti.UI.createTextArea({
		value: "",
		width: "80%",
		height: "20%",
		borderColor: "black",
		borderRadius: 5,
		borderWidth:1,
		font:{fontSize:16}
	});
	
	var createButton = Titanium.UI.createButton({
		title: "Create",
		width: 150,
		height: 150
	});
	
	createButton.addEventListener('click', function(e){
		eventoObject = {};
		eventoObject.description = textArea.value;
		eventoObject.endTime = endTimePicker.value;
		eventoObject.place = place;
		bonomoController.createEvent(eventoObject);
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
	
	view1.add(Titanium.UI.createView({height: 35}));
	view1.add(labelTitle);
	view1.add(labelPlans);
	view1.add(textArea);
	view1.add(endTimePicker);
	view1.add(createButton);
	window.add(view1);
	
	this.window = window;
}

module.exports = CreateEventWindow;