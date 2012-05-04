function NavigationController() {
	
	/*
	 * Stack de ventanas
	 */
	this.windowStack = [];
	
	/**
	 * Abre una ventana nueva
	 */
	this.open = function(windowToOpen) {
		//add the window to the stack of windows managed by the controller
		this.windowStack.push(windowToOpen);
		
		//grab a copy of the current nav controller for use in the callback
		var that = this;
		windowToOpen.addEventListener('close', function() {
			that.windowStack.pop();
		});
		
		//hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
		windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;
		
		//This is the first window
		if(this.windowStack.length === 1) {
			if(Ti.Platform.osname === 'android') {
				windowToOpen.exitOnClose = true;
				windowToOpen.open();
			} 
			else {
				this.navGroup = Ti.UI.iPhone.createNavigationGroup({
					window : windowToOpen
				});
				var containerWindow = Ti.UI.createWindow();
				containerWindow.add(this.navGroup);
				containerWindow.open();
			}
		}
		//All subsequent windows
		else {
			if(Ti.Platform.osname === 'android') {
				windowToOpen.open();
			} else {
				this.navGroup.open(windowToOpen);
			}
		}
	};
	
	/**
	 * Ir al home de las ventanas
	 */
	this.home = function() {
		//store a copy of all the current windows on the stack
		var windows = this.windowStack.concat([]);
		for(var i = 1, l = windows.length; i < l; i++) {
			(this.navGroup) ? this.navGroup.close(windows[i]) : windows[i].close();
		}
		this.windowStack = [this.windowStack[0]]; //reset stack
	};
}

module.exports = NavigationController;