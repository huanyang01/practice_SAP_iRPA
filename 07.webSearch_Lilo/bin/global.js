
// *** Choose language (en|fr|de) ***
GLOBAL.labels.setLanguage(e.language.English);

// Global Systray object
var systray = ctx.systray();


/** main process start handler */
GLOBAL.events.START.on(function (ev) {
	// *** Create Systray ***
	systray.createSystrayMenu(ctx.options.projectName, 'ICON1');

	systray.addMenu('', 'MainMenu', GLOBAL.labels.menu.main);
	systray.addMenu('MainMenu', 'evMenu1', GLOBAL.labels.menu.menu1, '', function(ev) {
		// add code here
	});
	systray.addMenu('MainMenu', 'evMenu2', GLOBAL.labels.menu.menu2, '', function(ev) {
		// add code here
	});
	// *** menus displayed in test mode only ***
	if (ctx.options.isDebug) {
		systray.addMenu('', 'TestMenu', GLOBAL.labels.menu.test);
		systray.addMenu('TestMenu', 'evTest1', GLOBAL.labels.menu.test1, '', function(ev) {
			// add code here
		});
		systray.addMenu('TestMenu', 'evTest2', GLOBAL.labels.menu.test2, '', function(ev) {
			// add code here
		});
	}
});

/** main process stop handler */
GLOBAL.events.QUIT.on(function(ev) {
	// add code here
});

/** Auto-update menu handler */
GLOBAL.events.UPDATECTX.on(function(ev) {
	ctx.shutdownAgent(true, true, (ctx.options.restartConfirmation ? GLOBAL.labels.updatePopup.label : null), GLOBAL.labels.updatePopup.title);
});

