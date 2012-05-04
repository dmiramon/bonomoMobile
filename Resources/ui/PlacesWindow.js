function PlacesWindow(controller, places) {
	
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
		backgroundImage: '../images/fondoconbarra.png',
		height: '100%'
	});
	var label = Titanium.UI.createLabel({
		text: 'Select one of these places'
	})
	var lista = Titanium.UI.createTableView({
		width: '100%',
		height: '99%',
		bottom: 2,
		top: 5
	});
	view1.add(Titanium.UI.createView({height: 35}));
	view1.add(label);
	view1.add(lista);
	window.add(view1);
	
	var data = [];
	for (var index in places) {
		var tableRow = Ti.UI.createTableViewRow({
			layout: 'horizontal',
			height: 'auto',
			className: 'Place'
		});
		var viewDatos = Titanium.UI.createView({layout: 'vertical'});
		viewDatos.add(Titanium.UI.createLabel({
			text: places[index].title,
			color: '#000000',
			font: {
				fontSize: 14
			}
		}));
		viewDatos.add(Titanium.UI.createLabel({
			text: places[index].distancia + ' mts',
			color: '#4f4f4f',
			textAlign: 'left',
			left: 3,
			font: {
				fontSize: 12
			}
		}));
		tableRow.add(Titanium.UI.createImageView({
			image: places[index].imagen,
			width: 44,
			height: 44
		}));
		tableRow.add(Titanium.UI.createView({width:5}));
		tableRow.add(viewDatos);
		data.push(tableRow);
	}

	lista.data = data;
	
	lista.addEventListener('click', function(event) {
		bonomoController.getPeople(function(result) {
			controller.open(new PeopleWindow(controller, result).window);
		});
	});
	
	this.window = window;
}

module.exports = PlacesWindow;
