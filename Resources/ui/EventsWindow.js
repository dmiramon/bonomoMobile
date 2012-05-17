function EventsWindow(controller, events) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var MoInfoWindow = require('MoInfoWindow');
	
	var size = 13;
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
		bottom: 5,
		top: 5
	});
	
	viewBase.add(Titanium.UI.createImageView({
		backgroundImage: '../images/topbar.png',
		width: '100%',
		height: '49',
	}));
	viewBase.add(lista);
	window.add(viewBase);
	
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
			left: '0',
			textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
			font: {
				fontSize: size
			}
		}));
		viewLabels.add(Titanium.UI.createLabel({
			text: "WHO ",
			color: '#97D1FD',
			textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
			left: '0',
			font: {
				fontSize: size
			}
		}));
		var viewDatos = Titanium.UI.createView({layout: 'vertical'});
		viewDatos.add(Titanium.UI.createLabel({
			text: events[index].place.name,
			color: '#000000',
			textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
			left: '0',
			font: {
				fontSize: size
			}
		}));
		viewDatos.add(Titanium.UI.createLabel({
			text: owner.name,
			color: '#000000',
			textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
			left: '0',
			font: {
				fontSize: size
			}
		}));
		
		var moreBtn = Titanium.UI.createButton({
			backgroundImage: '../images/moinfo.png',
			width: '61',
			height: '26',
			left: '3%',
			right: '1%',
			event: events[index]
		});
		moreBtn.addEventListener('click', function(event) {
			controller.open(new MoInfoWindow(controller, event.source.event).window);
		});
		
		if (par % 2 != 0) {
			tableRow.setBackgroundImage('../images/fondolista.png');
		}
		
		tableRow.add(Titanium.UI.createView({width:'5'}));
		tableRow.add(Titanium.UI.createImageView({
			image: owner.thumbnail,
			width: 45,
			height: 45
		}));
		tableRow.add(Titanium.UI.createView({width:'5'}));
		tableRow.add(viewLabels);
		tableRow.add(Titanium.UI.createView({width:'5'}));
		tableRow.add(viewDatos);
		tableRow.add(Titanium.UI.createView({width:'15'}));
		tableRow.add(moreBtn);
		data.push(tableRow);
		par++;
	}

	lista.data = data;
	
	/*lista.addEventListener('click', function(event) {
		bonomoController.interact(events[event.index].owner_id, events[event.index].id, 1, function() {
			null;
		});
	});*/
	
	this.window = window;
}

module.exports = EventsWindow;
