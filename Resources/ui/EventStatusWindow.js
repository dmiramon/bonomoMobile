function EventStatusWindow(controller, eventObject) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var EventStatusWindow = require('EventStatusWindow');
	var model = require('/model/Model');
	
	var window = Titanium.UI.createWindow({
		layout: 'absolute',
		backgroundColor: '#FFFFFF',
		fullscreen: true,
		navBarHidden: true
	});
	
	var viewBase = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../images/fondoconbarra.png',
		height: '100%'
	});
	viewBase.add(Titanium.UI.createImageView({
		backgroundImage: '../images/topbar.png',
		width: '100%',
		height: '49',
	}));
	
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
		if (eventObject.interactions[index].type_id == 3){
			continue;
		}
		var tableRow = Ti.UI.createTableViewRow({
			layout: 'horizontal',
			height: 'auto',
			className: 'Interaction'
		});
		// IF TYPE 1 SHOW PINGS, IF NOT MARK AS CONFIRMED
		var viewDatos = Titanium.UI.createView({layout: 'vertical'});
		viewDatos.add(Titanium.UI.createLabel({
			text: eventObject.interactions[index].user_from.name + " -> " + eventObject.interactions[index].user_to.name,
			color: '#000000',
			font: {
				fontSize: 14
			}
		}));
		
		var texto = "";
		var color_t = "";
		if (eventObject.interactions[index].type_id == 1){
			texto = "Meeting request";
			color_t = '#4f4f4f';			
		} else {
			texto = "Request confirmed";
			color_t ='#2a9a00';
		}
		
		viewDatos.add(Titanium.UI.createLabel({
			text: texto,
			color: color_t,
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
		
		if(model.getUsuarioRuby().id == eventObject.owner.id && eventObject.interactions[index].type_id == 1){
			
			var confirmButton = Titanium.UI.createButton({
				title: "Confirm"
			});
			
			confirmButton.addEventListener('click', function(){
				var dialog = Titanium.UI.createOptionDialog({
			    	options:['Confirm', 'Cancel'],
			    	title:'Confirm only if you are already waiting at the event.'
				});
				dialog.show();
				dialog.addEventListener('click', function(e){
					
					if(e.index == 0){						
						bonomoController.interact(eventObject.interactions[index].user_from.id, eventObject.id, 2, function(interactObject) {
							bonomoController.showStatusEvent(eventObject, function(eventObjectResponse){
								controller.open(new EventStatusWindow(controller, eventObjectResponse).window);
							});							
						});							
					}
				});
				
			});
			
			tableRow.add(confirmButton);
		}
		data.push(tableRow);
	}

	lista.data = data;
	
	refreshButton.addEventListener('click', function(){
		bonomoController.showStatusEvent(eventObject, function(eventResponseObject) {
			controller.open(new EventStatusWindow(controller, eventResponseObject).window);
		});
	});
	
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(labelTitle);
	viewBase.add(labelDescription);
	viewBase.add(labelStarts);
	viewBase.add(labelEnds);
	viewBase.add(lista);
	viewBase.add(refreshButton);
	window.add(viewBase);
	
	this.window = window;
	
}

module.exports = EventStatusWindow;