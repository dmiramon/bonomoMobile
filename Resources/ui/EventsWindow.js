function EventsWindow(controller, checkin, events) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var MoInfoWindow = require('MoInfoWindow');
	var PlacesWindow = require('PlacesWindow');
	
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
	var lista = Titanium.UI.createTableView({
		width: '100%',
		height: '100%',
		bottom: '2%',
		top: '2%'
	});
	
	viewBase.add(Titanium.UI.createImageView({
		backgroundImage: '../images/topbar.png',
		width: '100%',
		height: '49',
	}));
	
	if (events.length > 0) {
		var data = [];
		var par = 0;
		for (var index in events) {
			var owner;
			for (var user in events[index].users) {
				if (events[index].users[user].id == events[index].owner_id) {
					owner = events[index].users[user];
					break;
				}
			}
			
			var tableRow = Ti.UI.createTableViewRow({
				layout: 'horizontal',
				height: 'auto',
				className: 'Event'
			});
			var viewLabels = Titanium.UI.createView({layout: 'vertical'});
			viewLabels.add(Titanium.UI.createLabel({
				text: "WHERE ",
				color: '#F8B526',
				left: '3%',
				textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
				font: {
					fontSize: sizeWithFont,
					fontFamily: 'take_out_the_garbage'
				}
			}));
			viewLabels.add(Titanium.UI.createLabel({
				text: "WHO ",
				color: '#97D1FD',
				textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
				left: '3%',
				font: {
					fontSize: sizeWithFont,
					fontFamily: 'take_out_the_garbage'
				}
			}));
			var viewDatos = Titanium.UI.createView({layout: 'vertical'});
			viewDatos.add(Titanium.UI.createLabel({
				text: events[index].place.name,
				color: '#000000',
				font: {
					fontSize: size
				}
			}));
			viewDatos.add(Titanium.UI.createLabel({
				text: owner.name,
				color: '#000000',
				font: {
					fontSize: size
				}
			}));
			
			/*var moreBtn = Titanium.UI.createButton({
				backgroundImage: '../images/moinfo.png',
				width: '61',
				height: '26',
				left: '4%',
				right: '1%',
				event: events[index]
			});
			moreBtn.addEventListener('click', function(event) {
				controller.open(new MoInfoWindow(controller, event.source.event).window);
			});*/
			
			if (par % 2 != 0) {
				tableRow.setBackgroundImage('../images/fondolista.png');
			}
			
			tableRow.add(Titanium.UI.createView({width:'5'}));
			tableRow.add(Titanium.UI.createImageView({
				image: owner.thumbnail,
				width: 50,
				height: 50
			}));
			tableRow.add(Titanium.UI.createView({width:'2%'}));
			tableRow.add(viewLabels);
			tableRow.add(Titanium.UI.createView({width:'2%'}));
			tableRow.add(viewDatos);
			//tableRow.add(Titanium.UI.createView({width:'15'}));
			//tableRow.add(moreBtn);
			data.push(tableRow);
			par++;
		}
	
		lista.data = data;
		lista.addEventListener('click', function(event) {
			controller.activityIndicator.show();
			controller.open(new EventStatusWindow(controller, result).window);
		});
		
		viewBase.add(lista);
	}
	else {
		viewBase.add(Titanium.UI.createView({height: '25%'}))
		viewBase.add(Titanium.UI.createLabel({
			text: 'There are no events nearby you. Want to create one?',
			color: '#000000',
			width: 'auto',
			height: 'auto',
			left: '3%',
			right: '3%',
			font: {
				fontSize: sizeWithFont,
				fontFamily: 'take_out_the_garbage'
			}
		}));
		var creaBtn = Titanium.UI.createButton({
			backgroundImage: '../images/makeicon.png',
			width: '81',
			height: '81'
		});
		creaBtn.addEventListener('click', function(e) {
			controller.activityIndicator.show();
			bonomoController.getPlaces(checkin, function(result) {
				controller.open(new PlacesWindow(controller, checkin, result).window);
				window.close();
			});
		});
		viewBase.add(Titanium.UI.createView({height: '5%'}))
		viewBase.add(creaBtn);
	}
	
	window.add(viewBase);
	
	this.window = window;
}

module.exports = EventsWindow;
