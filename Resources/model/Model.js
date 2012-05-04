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
	
	return {
		setUsuarioRuby:setUsuarioRuby,
		getUsuarioRuby:getUsuarioRuby,
		setUsuarioFB:setUsuarioFB,
		getUsuarioFB:getUsuarioFB,
	};
	
})();

module.exports = Model;