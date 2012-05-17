function MyEventsWindow(controller) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var EventStatusWindow = require('EventStatusWindow');
	var model = require('/model/Model');
	
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
	var events = model.getUsuarioRuby().active_events.mine.concat(model.getUsuarioRuby().active_events.theirs);
	for (var index in events) {
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
				fontSize: 15,
				fontFamily: 'take_out_the_garbage'
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
		
		var moreBtn = Titanium.UI.createButton({
			backgroundImage: '../images/moinfo.png',
			width: '61',
			height: '26',
			left: '10%',
			event: events[index]
		});
		moreBtn.addEventListener('click', function(event) {
			bonomoController.showStatusEvent(event.source.event, function(result) {
				controller.open(new EventStatusWindow(controller, event.source.event).window);
			});
		});
		
		if (par % 2 != 0) {
			tableRow.setBackgroundImage('../images/fondolista.png');
		}
		
		tableRow.add(Titanium.UI.createView({width:'2%'}));
		tableRow.add(viewLabels);
		tableRow.add(Titanium.UI.createView({width:'2%'}));
		tableRow.add(viewDatos);
		tableRow.add(Titanium.UI.createView({width:'5%'}));
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

module.exports = MyEventsWindow;
