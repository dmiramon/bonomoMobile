function MoInfoWindow(controller, event) {
	
	var BonomoController = require('/controller/BonomoController');
	var bonomoController = new BonomoController();
	var EventStatusWindow = require('EventStatusWindow');
	var BoredWindow = require('BoredWindow');
	
	var size = 14;
	var owner;
	for (var index in event.users) {
		if (event.users[index].id == event.owner_id) {
			owner = event.users[index];
			break;
		}
	}
	
	var interests = '';
	for (var index in owner.common_interests) {
		interests += owner.common_interests[index].name;
		if (Number(index) + 1 < owner.common_interests.length)
			interests += ', ';
	}
	
	var window = Titanium.UI.createWindow({
		layout: 'absolute',
		backgroundColor: '#FFFFFF',
		fullscreen: true,
		navBarHidden: true
	});
	
	var viewBase = Titanium.UI.createView({
		layout: 'vertical',
		backgroundImage: '../images/fondosinbarra.png',
		width: '100%',
		height: '100%'
	});
	viewBase.add(Titanium.UI.createImageView({
		backgroundImage: '../images/topbar.png',
		width: '100%',
		height: '49',
	}));
	viewBase.add(Titanium.UI.createView({height: '2%'}));

	viewBase.add(Titanium.UI.createImageView({
		image: owner.thumbnail,
		width: '130',
		height: '120'
	}));
	viewBase.add(Titanium.UI.createView({height: '4%'}));
	
	var viewWho = Titanium.UI.createView({
		layout: 'horizontal',
		width: 'auto',
		height: 'auto'
	});
	viewWho.add(Titanium.UI.createLabel({
		text: "WHO ",
		color: '#97D1FD',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		left: '3%',
		font: {
			fontSize: 16,
			fontFamily: 'take_out_the_garbage'
		}
	}));
	viewWho.add(Titanium.UI.createView({width:'2%'}));
	viewWho.add(Titanium.UI.createLabel({
		text: owner.name,
		color: '#000000',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		left: '0',
		font: {
			fontSize: size
		}
	}));
	viewBase.add(viewWho);
	
	viewBase.add(Titanium.UI.createView({height: '3%'}));
	viewBase.add(Titanium.UI.createLabel({
		text: "INTERESTS IN COMMON ",
		color: '#F8B526',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		left: '3%',
		font: {
			fontSize: 16,
			fontFamily: 'take_out_the_garbage'
		}
	}));
	viewBase.add(Titanium.UI.createLabel({
		text: interests,
		color: '#000000',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		left: '3%',
		width: 'auto',
		height: 'auto',
		font: {
			fontSize: size
		}
	}));
	viewBase.add(Titanium.UI.createView({height: '3%'}));
	
	var viewWhere = Titanium.UI.createView({
		layout: 'horizontal',
		width: 'auto',
		height: 'auto'
	});
	viewWhere.add(Titanium.UI.createLabel({
		text: "WHERE ",
		color: '#97D1FD',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		left: '3%',
		font: {
			fontSize: 16,
			fontFamily: 'take_out_the_garbage'
		}
	}));
	viewWhere.add(Titanium.UI.createView({width:'2%'}));
	viewWhere.add(Titanium.UI.createLabel({
		text: event.place.name,
		color: '#000000',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		left: '0',
		font: {
			fontSize: size
		}
	}));
	viewBase.add(viewWhere);
	viewBase.add(Titanium.UI.createLabel({
		text: event.description,
		color: '#000000',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		left: '3%',
		width: 'auto',
		height: 'auto',
		font: {
			fontSize: size
		}
	}));
	viewBase.add(Titanium.UI.createView({height: '5%'}));
	
	var connectBtn = Titanium.UI.createButton({
		backgroundImage: '../images/connect.png',
		width: '90',
		height: '39',
	});
	viewBase.add(connectBtn);
	
	window.add(viewBase);
	
	this.window = window;
	
	connectBtn.addEventListener('click', function(e) {
		var dialog = Titanium.UI.createOptionDialog({
	    	options:['Yes', 'No'],
	    	title:'Are you sure you want to attend that event?'
		});
		dialog.show();
		dialog.addEventListener('click', function(e) {
			if(e.index == 0) {
				controller.activityIndicator.show();			
				bonomoController.interact(owner.id, event.id, 1, function(result) {
					bonomoController.synchronizeFB(function(result) {
						bonomoController.showStatusEvent(event, function(eventObjectResponse){
							window.close();
							controller.open(new EventStatusWindow(controller, eventObjectResponse).window);
						});		
					});	
				});
			}
		});
	});
}

module.exports = MoInfoWindow;
