
// ----------------------------------------------------------------
//   Test menu for scenario OpenAndCloseSAPGUI 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'OpenAndCloseSAPGUI', 'Test OpenAndCloseSAPGUI', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.OpenAndCloseSAPGUI.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario OpenAndCloseSAPGUI Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: OpenAndCloseSAPGUI
// ----------------------------------------------------------------
GLOBAL.scenario({ OpenAndCloseSAPGUI: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Write_log);
}}, ctx.dataManagers.rootData).setId('c9a6c2db-27ca-4231-886e-237cb009ca4d') ;

// ----------------------------------------------------------------
//   Step: Write_log
// ----------------------------------------------------------------
GLOBAL.step({ Write_log: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('OpenAndCloseSAPGUI', '7c8bee76-a4a8-4b57-986d-9f21f50fa11f') ;
	// Add a message to the log file and in the debug window along with a severity level.
	ctx.log(1, e.logIconType.Info);
	sc.endStep(); // end Scenario
	return;
}});
