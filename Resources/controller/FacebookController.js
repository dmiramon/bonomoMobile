function FacebookController() {
	Titanium.Facebook.appid = ['329439740441035'];
	Titanium.Facebook.permissions = ['publish_stream','email', 'user_activities', 'user_interests',
										'user_likes', 'user_birthday']; // Permissions your app needs
	
	this.login = function(callback) {
		Titanium.Facebook.addEventListener('login', function(e) {
		    if (e.success) {
		        callback(Titanium.Facebook.getUid());
		    } else if (e.error) {
		        alert(e.error);
		    } else if (e.cancelled) {
		        alert("Cancelled");
		    }
		});
		Titanium.Facebook.authorize();
	}
	
	this.getMe = function(callback) {
		Titanium.Facebook.requestWithGraphPath("me", null, "GET", function(response) {
			callback(JSON.parse(response.result));
		});
	}
						
	this.getInterests = function(callback) {
		Titanium.Facebook.requestWithGraphPath("me/likes", null, "GET", function(interestsResponse) {
			
			var interests = [];
			var facebookInterests = JSON.parse(interestsResponse.result).data;
			for (var index in facebookInterests) {
				interests.push({"facebook_id":facebookInterests[index].id, "nombre":facebookInterests[index].name, 
								"categoria":facebookInterests[index].category});
			}
			callback(interests);
		});
	}
}

module.exports = FacebookController;