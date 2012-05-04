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
		layout: 'absolute',
		backgroundImage: '../images/fondoconbarra.png',
		height: '100%'
	});
	var lista = Titanium.UI.createTableView({
		width: '100%',
		height: '100%',
		bottom: 5,
		top: 35
	});
	view1.add(lista);
	window.add(view1);
	
	var data = [];
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
			title: 'Connect'
		});
		moreBtn.addEventListener('click', function(event) {
			//bonomoController.interact(function(result) {
				event;
			//});
		});

		tableRow.add(Titanium.UI.createImageView({
			image: events[index].users[0].thumbnail,
			width: 44,
			height: 44
		}));
		tableRow.add(Titanium.UI.createView({width:5}));
		tableRow.add(viewDatos);
		tableRow.add(moreBtn);
		data.push(tableRow);
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
