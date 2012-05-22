function EventStatusWindow(controller, eventObject) {
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var EventStatusWindow = require('EventStatusWindow');
	var model = require('/model/Model');
	
	var size = 16;
	var sizeWithFont = 18;
	
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
	viewBase.add(Titanium.UI.createImageView({
		backgroundImage: '../images/topbar.png',
		width: '100%',
		height: '49',
	}));
	
	var viewWhere = Titanium.UI.createView({
		layout: 'horizontal',
		width: 'auto',
		height: 'auto'
	});
	viewWhere.add(Titanium.UI.createLabel({
		text: "WHERE ",
		color: '#97D1FD',
		left: '3%',
		font: {
			fontSize: sizeWithFont,
			fontFamily: 'take_out_the_garbage'
		}
	}));
	viewWhere.add(Titanium.UI.createView({width:'2%'}));
	viewWhere.add(Titanium.UI.createLabel({
		text: eventObject.place.name,
		color: '#000000',
		font: {
			fontSize: size
		}
	}));
	
	var viewDescription = Titanium.UI.createView({
		layout: 'horizontal',
		width: 'auto',
		height: 'auto'
	});
	viewDescription.add(Titanium.UI.createLabel({
		text: "TO DO ",
		color: '#97D1FD',
		left: '3%',
		font: {
			fontSize: sizeWithFont,
			fontFamily: 'take_out_the_garbage'
		}
	}));
	viewDescription.add(Titanium.UI.createLabel({
		text: eventObject.description,
		color: '#000000',
		height: 'auto',
		font: {
			fontSize: size
		}
	}));
	
	var viewStarts = Titanium.UI.createView({
		layout: 'horizontal',
		width: 'auto',
		height: 'auto'
	});
	viewStarts.add(Titanium.UI.createLabel({
		text: "FROM ",
		color: '#97D1FD',
		left: '3%',
		font: {
			fontSize: sizeWithFont,
			fontFamily: 'take_out_the_garbage'
		}
	}));
	date_start = new Date(eventObject.start_time);
	viewStarts.add(Titanium.UI.createLabel({
		text: date_start.getHours() + ":" + date_start.getMinutes(),
		//text: eventObject.start_time.split('T')[1].split('Z')[0].slice(0, 5),
		color: '#000000',
		font: {
			fontSize: size
		}
	}));
	
	var viewEnds  = Titanium.UI.createView({
		layout: 'horizontal',
		width: 'auto',
		height: 'auto'
	});
	viewEnds.add(Titanium.UI.createLabel({
		text: "TO ",
		color: '#97D1FD',
		left: '3%',
		font: {
			fontSize: sizeWithFont,
			fontFamily: 'take_out_the_garbage'
		}
	}));
	date_end = new Date(eventObject.end_time);
	viewEnds.add(Titanium.UI.createLabel({
		text: date_end.getHours() + ":" + date_end.getMinutes(),
		//text: eventObject.end_time.split('T')[1].split('Z')[0].slice(0, 5),
		color: '#000000',
		font: {
			fontSize: size
		}
	}));
	
	var refreshButton = Titanium.UI.createButton({
		title: "Refresh",
		width: "95",
		height: "75"
	});
	
	var lista = Titanium.UI.createTableView({
		width: '90%',
		height: '40%',
		bottom: '2%',
		top: '2%',
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
				fontSize: size
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
				fontSize: size
			}
		}));
		
		if(model.getUsuarioRuby().id == eventObject.owner.id && eventObject.interactions[index].type_id == 1) {
			
			var confirmButton = Titanium.UI.createButton({
				title: "Confirm",
				width: '90',
				height: '39'
			});
			var dialog = Titanium.UI.createOptionDialog({
		    	options:['Confirm', 'Cancel'],
		    	title:'Confirm only if you are already waiting at the event.'
			});
			
			dialog.addEventListener('click', function(e){
					
				if(e.index == 0){						
					bonomoController.interact(eventObject.interactions[index].user_from.id, eventObject.id, 2, function(interactObject) {
						bonomoController.showStatusEvent(eventObject, function(eventObjectResponse){
							refreshList(eventObjectResponse);
						});							
					});							
				}
			});
				
			confirmButton.addEventListener('click', function(){
				dialog.show();
			});
			
			viewDatos.add(confirmButton);
		}
		
		tableRow.add(Titanium.UI.createImageView({
			image: eventObject.interactions[index].user_from.thumbnail,
			width: 50,
			height: 50,
			left: '3%'
		}));
		tableRow.add(Titanium.UI.createView({width:'2%'}));
		tableRow.add(viewDatos);
		data.push(tableRow);
	}

	lista.data = data;
	
	refreshButton.addEventListener('click', function() {
		controller.activityIndicator.show();
		bonomoController.showStatusEvent(eventObject, function(eventResponseObject) {
			refreshList(eventResponseObject);
		});
	});
	
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(viewWhere);
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(viewDescription);
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(viewStarts);
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(viewEnds);
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(lista);
	viewBase.add(Titanium.UI.createView({height: '2%'}));
	viewBase.add(refreshButton);
	window.add(viewBase);
	
	this.window = window;
	
	var refreshList = function(newData) {
		//refreshList(eventObjectResponse)
		var data = [];
		for (var index in newData.interactions) {
			if (newData.interactions[index].type_id == 3){
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
				text: newData.interactions[index].user_from.name + " -> " + newData.interactions[index].user_to.name,
				color: '#000000',
				font: {
					fontSize: size
				}
			}));
			
			var texto = "";
			var color_t = "";
			if (newData.interactions[index].type_id == 1){
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
					fontSize: size
				}
			}));
			
			if(model.getUsuarioRuby().id == eventObject.owner.id && eventObject.interactions[index].type_id == 1) {
			
				var confirmButton = Titanium.UI.createButton({
					title: "Confirm",
					width: '90',
					height: '39'
				});
				var dialog = Titanium.UI.createOptionDialog({
			    	options:['Confirm', 'Cancel'],
			    	title:'Confirm only if you are already waiting at the event.'
				});
				
				dialog.addEventListener('click', function(e){
						
					if(e.index == 0){						
						bonomoController.interact(eventObject.interactions[index].user_from.id, eventObject.id, 2, function(interactObject) {
							bonomoController.showStatusEvent(eventObject, function(eventObjectResponse){
								refreshList(eventObjectResponse);
							});							
						});							
					}
				});
					
				confirmButton.addEventListener('click', function(){
					dialog.show();
				});
				
				viewDatos.add(confirmButton);
			}
			
			tableRow.add(Titanium.UI.createImageView( {
				image: eventObject.interactions[index].user_from.thumbnail,
				width: 50,
				height: 50,
				left: '3%'
			}));
			tableRow.add(Titanium.UI.createView({width:'2%'}));
			tableRow.add(viewDatos);
			data.push(tableRow);
		}
		controller.activityIndicator.hide();
		lista.data = data;
	}
}

module.exports = EventStatusWindow;