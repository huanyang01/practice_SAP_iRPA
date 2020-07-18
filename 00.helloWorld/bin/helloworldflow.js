
// ----------------------------------------------------------------
//   Test menu for scenario HelloWorldFlow 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'HelloWorldFlow', 'Test HelloWorldFlow', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.HelloWorldFlow.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario HelloWorldFlow Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: HelloWorldFlow
// ----------------------------------------------------------------
GLOBAL.scenario({ HelloWorldFlow: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Display_msgbox_Hello);
}}, ctx.dataManagers.rootData).setId('95837d18-f39d-48ab-8f4d-5874fa8c9f94') ;

// ----------------------------------------------------------------
//   Step: Display_msgbox_Hello
// ----------------------------------------------------------------
GLOBAL.step({ Display_msgbox_Hello: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('HelloWorldFlow', '482dca14-6d4f-40d8-b5a1-3d08199d34e5') ;
	// Displays a message box. If the "Wait closing" option is selected, waits until the end user closes it.
	// Creates the popup according to selected template, sets title and message and displays it.
	var HelloWorldMessagebox = ctx.popup('HelloWorldMessagebox', e.popup.template.Ok);
	HelloWorldMessagebox.open({ title: 'HW Title', message: 'Hello to intelligent RPA world'});
	// Wait until the end user closes the popup.
	HelloWorldMessagebox.waitResult(function(res) {
	// End user has closed the popup, continue monitoring.
		sc.endStep(); // end Scenario
		return;
	});
}});
