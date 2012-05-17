var Model = (function() {
	
	var usuarioRuby;
	var usuarioFB;
	
	function setUsuarioRuby(user) {
		usuarioRuby = user;
	};
	
	function getUsuarioRuby() {
		return usuarioRuby;
	};
	
	function setUsuarioFB(user) {
		usuarioFB = user;
	};
	
	function getUsuarioFB() {
	return usuarioFB;
	};
	
	var loading = Titanium.UI.createActivityIndicator({
		bottom: '60', 
	    height: '50',
	    width: '200',
	    font: {fontFamily:'Helvetica Neue', fontSize:15, fontWeight:'bold'},
	    color: 'white',
	    //style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
	    message: 'Loading...'
	});
	
	return {
		setUsuarioRuby:setUsuarioRuby,
		getUsuarioRuby:getUsuarioRuby,
		setUsuarioFB:setUsuarioFB,
		getUsuarioFB:getUsuarioFB,
		loading:loading
	};
	
})();

module.exports = Model;