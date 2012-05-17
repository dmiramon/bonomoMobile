function BonomoController() {
	
	var FacebookController = require('FacebookController');
	var fbController = new FacebookController();
	var model = require('/model/Model');
	var foursquareClient = 'BEAN1M5YGO4MLJ0LOHURGTJW5YA3IBYMGD1FGCUBW50NX322';
	var foursquareSecret = 'LNHECBGTVRLRIAUPUJ3DW3KH1UZ404QXN2UFWQ3YCA1TRV4C';
	
	
	var SERVER_URL = "http://bonomo.herokuapp.com/";
	
	/**
	 * 
	 */
	this.createBoredomCheckin = function(checkin, callback) {
		
		var post = {};
		post.checkin = {};
		post.checkin = checkin;
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
	         Ti.API.debug(e.error);
	    };
		xhr.onload = function() {
			callback();
		}
		xhr.open("POST", SERVER_URL + "checkins/create_with_user/" + Titanium.Facebook.getUid() +".json");
		xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
		xhr.send(JSON.stringify(post));
	}
	
	/**
	 * 
	 */
	this.synchronizeFB = function(callback) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
	         Ti.API.debug(e.error);
	    };
		xhr.onload = function() {
			var result = JSON.parse(this.responseText);
			model.setUsuarioRuby(result);
			callback();
		}
		xhr.open("GET", SERVER_URL + "users/facebook_synch/" + Titanium.Facebook.getUid() + ".json?token=" + Titanium.Facebook.getAccessToken());
		xhr.send();
	}
	
	/**
	 * 
	 */
	this.getPlaces = function(checkin, callback) {
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			places = [];
			var data = JSON.parse(this.responseText);
			var foursquareData = JSON.parse(this.responseText).response.venues;
			for (var index in foursquareData) {
				places.push({
					"title": foursquareData[index].name,
					"color": "#000000", 
					"distancia": foursquareData[index].location.distance, 
					"categoria": foursquareData[index].categories[0].name,
					"imagen": foursquareData[index].categories[0].icon.prefix + '44.png',
					"longitude": foursquareData[index].location.lng,
					"latitude": foursquareData[index].location.lat,
					// NECESARIOS PARA EL SERVICIO
					"location": {
						"lng": foursquareData[index].location.lng,
						"lat": foursquareData[index].location.lat
					},
					"name": foursquareData[index].name,
					"id": foursquareData[index].id,
					"categories":[{
						"name": foursquareData[index].categories[0].name,
						"id": foursquareData[index].categories[0].id
					}]
				});
			}
			callback(places);
		};
		
		xhr.onerror = function(e) {
	         Ti.API.debug(e.error);
	    };
	    
		xhr.open("GET","https://api.foursquare.com/v2/venues/search?ll=" + checkin.latitude + "," + checkin.longitude + "&radius=1500&client_id=" + foursquareClient + "&client_secret=" + foursquareSecret + "&v=20120215" );
		xhr.send();
	}
	
	this.createEvent = function(eventoObject, callback){
		var post = {};
		post.description = eventoObject.description;
		post.duration = ((eventoObject.endTime - new Date())/1000)/60;
		post.place = eventoObject.place;
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
	         Ti.API.debug(e.error);
	    };
		xhr.onload = function() {
			var eventObject = JSON.parse(this.responseText);
			callback(eventObject);
		}
		xhr.open("POST", SERVER_URL + "events/create_from_interface/" + Titanium.Facebook.getUid() +".json");
		xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
		xhr.send(JSON.stringify(post));
	}
	
	this.showStatusEvent = function(eventoObject, callback){
		var xhr = Titanium.Network.createHTTPClient();
		
		xhr.onerror = function(e) {
	         Ti.API.debug(e.error);
	    };
		xhr.onload = function() {
			var eventObjectResponse = JSON.parse(this.responseText);
			callback(eventObjectResponse);
		}
		
		xhr.open("GET", SERVER_URL + "events/" + eventoObject.id +".json");
		xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
		xhr.send();
	} 
	
	/**
	 * 
	 */
	this.getEvents = function(callback) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
	         Ti.API.debug(e.error);
	    };
		xhr.onload = function() {
			var result = JSON.parse(this.responseText);
			callback(result);
		};
		xhr.open("GET", SERVER_URL + "events/search_for_user/" + Titanium.Facebook.getUid() + ".json");
		xhr.send();
	}
	
	/**
	 * 
	 */
	this.interact = function(toUser, event, type, callback) {
		var post = {};
		post.user_to_id = toUser;
		post.user_from_id = model.getUsuarioRuby().id;
		post.event_id = event;
		post.type_id = type;
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
	         Ti.API.debug(e.error);
	    };
		xhr.onload = function() {
			var result = JSON.parse(this.responseText);
			callback(result);
		};
		xhr.open("POST", SERVER_URL + "interactions.json");
		xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
		xhr.send(JSON.stringify(post));
	}
	
}

module.exports = BonomoController;

// this.registerOrUpdate = function(callback) {
// 	
		// this.getUser(function(result) {
			// this.usuarioRuby = result;
			// fbController.getMe(function(result) {
				// this.usuarioFB = result;
				// fbController.getInterests(function(interests) {
					// var post = {};
					// post.usuario = {};
					// post.usuario.nombre = this.usuarioFB.name;
					// post.usuario.genero = this.usuarioFB.gender;
					// post.usuario.email = this.usuarioFB.email;
					// post.usuario.thumbnail = 'https://graph.facebook.com/' + this.usuarioFB.id + '/picture?type=normal';
					// post.intereses = interests;
// 					
					// var xhr = Titanium.Network.createHTTPClient();
					// xhr.onload = function() {
						// callback();
					// };
					// xhr.onerror = function(e) {
				         // Ti.API.debug(e.error);
				    // };
					// xhr.open("POST","http://glowing-moon-5161.heroku.com/usuarios/actualiza/" + this.usuarioFB.id +".json");
					// xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
					// xhr.send(JSON.stringify(post));
				// });
			// });	
		// });
	// }
	
	/*this.getPeople = function(callback) {
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			people = [];
			var peopleData = JSON.parse(this.responseText);
			for (var index in peopleData) {
				people.push({
					"title": peopleData[index].usuario.nombre,
					"color": "#000000", 
					"distancia": peopleData[index].usuario.distancia, 
					"intereses": peopleData[index].usuario.lista_intereses,
					"foto": peopleData[index].usuario.thumbnail
				});
			}
			callback(people);
		};
		
		xhr.onerror = function(e) {
	         Ti.API.debug(e.error);
	    };
		
		xhr.open("GET","http://glowing-moon-5161.heroku.com/usuarios/busqueda/" + usuarioRuby.facebook_id +".json?limit=10");
		xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
		xhr.send();
	}*/