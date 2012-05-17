function EventStatusWindow(controller, eventObject) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var EventStatusWindow = require('EventStatusWindow');
	
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
		text: 'Event at ' + eventObject.place.name
	});
	
	var labelDescription = Titanium.UI.createLabel({
		text: eventObject.description
	});
	
	var labelStarts = Titanium.UI.createLabel({
		text: eventObject.start_time
	});
	
	var labelEnds = Titanium.UI.createLabel({
		text: eventObject.end_time
	});
	
	var refreshButton = Titanium.UI.createButton({
		title: "Refresh",
		width: "20%",
		height: "20%"
	});
	
	var lista = Titanium.UI.createTableView({
		width: '90%',
		height: '40%',
		bottom: 2,
		top: 5,
		right: 10
	});
	
	var data = [];
	for (var index in eventObject.interactions) {
		var tableRow = Ti.UI.createTableViewRow({
			layout: 'horizontal',
			height: 'auto',
			className: 'Interaction'
		});
		// IF TYPE 1 SHOW PINGS, IF NOT MARK AS CONFIRMED
		var viewDatos = Titanium.UI.createView({layout: 'vertical'});
		viewDatos.add(Titanium.UI.createLabel({
			text: eventObject.interactions[index].user_from.name,
			color: '#000000',
			font: {
				fontSize: 14
			}
		}));
		
		var texto = "";
		if (eventObject.interactions[index].type_id == 1){
			texto = "Meeting request";
		} else {
			texto = "Request confirmed";
		}
		
		viewDatos.add(Titanium.UI.createLabel({
			text: texto,
			color: '#4f4f4f',
			textAlign: 'left',
			left: 3,
			font: {
				fontSize: 12
			}
		}));
		tableRow.add(Titanium.UI.createImageView({
			image: eventObject.interactions[index].user_from.thumbnail,
			width: 44,
			height: 44
		}));
		tableRow.add(Titanium.UI.createView({width:5}));
		tableRow.add(viewDatos);
		data.push(tableRow);
	}

	lista.data = data;
	
	lista.addEventListener('click', function(event) {
		//controller.open(new CreateEventWindow(controller, checkin, places[event.index]).window);
	});
	
	refreshButton.addEventListener('click', function(){
		bonomoController.showStatusEvent(eventObject, function(eventResponseObject) {
			controller.open(new EventStatusWindow(controller, eventResponseObject).window);
		});
	});
	
	view1.add(Titanium.UI.createView({height: 35}));
	view1.add(labelTitle);
	view1.add(labelDescription);
	view1.add(labelStarts);
	view1.add(labelEnds);
	view1.add(lista);
	view1.add(refreshButton);
	window.add(view1);
	
	this.window = window;
	
}

module.exports = EventStatusWindow;