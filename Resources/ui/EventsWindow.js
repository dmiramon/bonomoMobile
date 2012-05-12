function EventsWindow(controller, events) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var PeopleWindow = require('PeopleWindow');
	
	var window = Titanium.UI.createWindow({
		layout: 'absolute',
		backgroundColor: '#FFFFFF',
		fullscreen: true,
		navBarHidden: true
	});
	
	var view1 = Titanium.UI.createView({
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
	
	view1.add(Titanium.UI.createImageView({
		backgroundImage: '../images/topbar.png',
		width: '100%',
		height: '49',
	}));
	view1.add(lista);
	window.add(view1);
	
	var data = [];
	var par = 0;
	for (var index in events) {
		var tableRow = Ti.UI.createTableViewRow({
			layout: 'horizontal',
			height: 'auto',
			className: 'Event'
		});
		var viewDatos = Titanium.UI.createView({layout: 'vertical'});
		viewDatos.add(Titanium.UI.createLabel({
			text: "WHERE " + events[index].place.name,
			color: '#000000',
			font: {
				fontSize: 14
			}
		}));
		viewDatos.add(Titanium.UI.createLabel({
			text: "WHO " + events[index].users[0].name,
			color: '#000000',
			font: {
				fontSize: 14
			}
		}));
		
		var moreBtn = Titanium.UI.createButton({
			backgroundImage: '../images/moinfo.png',
		});
		moreBtn.addEventListener('click', function(event) {
			//bonomoController.interact(function(result) {
				event;
			//});
		});
		
		if (par % 2 != 0) {
			tableRow.setBackgroundImage('../images/fondolista.png');
		}
		
		tableRow.add(Titanium.UI.createView({width:'5'}));
		tableRow.add(Titanium.UI.createImageView({
			image: events[index].users[0].thumbnail,
			width: 45,
			height: 45
		}));
		tableRow.add(Titanium.UI.createView({width:'5'}));
		tableRow.add(viewDatos);
		tableRow.add(moreBtn);
		data.push(tableRow);
		par++;
	}

	lista.data = data;
	
	lista.addEventListener('click', function(event) {
		bonomoController.interact(events[event.index].owner_id, events[event.index].id, 1, function() {
			null;
		});
	});
	
	this.window = window;
}

module.exports = EventsWindow;
