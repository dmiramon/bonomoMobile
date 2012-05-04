function PlacesWindow(controller, people) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	
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
	for (var index in people) {
		var tableRow = Ti.UI.createTableViewRow({
			layout: 'horizontal',
			className: 'Person'
		});
		var viewDatos = Titanium.UI.createView({layout: 'vertical'});
		var common = '';
		var i = 0;
		for (var interest in people[index].intereses) {
			if (i < 2 && people[index].intereses[interest].interes_comun == true)
				common += people[index].intereses[interest].nombre + ', ';
				i++
		}
		common = common.substring(0, common.length - 2);
		viewDatos.add(Titanium.UI.createLabel({
			text: people[index].title,
			color: '#000000',
			left: 3,
			font: {
				fontSize: 13
			}
		}));
		viewDatos.add(Titanium.UI.createLabel({
			text: 'Interests: ' + common,
			color: '#4f4f4f',
			textAlign: 'left',
			left: 3,
			font: {
				fontSize: 10.5
			}
		}));
		var goButton = Titanium.UI.createButton({
			backgroundImage: '../images/botongo.png',
			width: 44,
			height: 21,
			left: 3
		});
		goButton.addEventListener('click', function(e) {
			Titanium.UI.createAlertDialog({
				message: 'Your invitation was sent'
			}).show();
		});
		viewDatos.add(goButton);
		tableRow.add(Titanium.UI.createImageView({
			image: people[index].foto,
			width: 45,
			height: 45
		}));
		tableRow.add(Titanium.UI.createView({width:5}));
		tableRow.add(viewDatos);
		data.push(tableRow);
	}
	
	lista.data = data;
	
	this.window = window;
}

module.exports = PlacesWindow;
