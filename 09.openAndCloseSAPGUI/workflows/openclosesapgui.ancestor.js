
// ----------------------------------------------------------------
//   Test menu for scenario opencloseSAPGUI 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'opencloseSAPGUI', 'Test opencloseSAPGUI', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.opencloseSAPGUI.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario opencloseSAPGUI Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: opencloseSAPGUI
// ----------------------------------------------------------------
GLOBAL.scenario({ opencloseSAPGUI: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Start_SAPLogon760, GLOBAL.steps.pWindowSAPLogon76_man);
	sc.step(GLOBAL.steps.pWindowSAPLogon76_man, GLOBAL.steps.Sleep_5000_ms);
	sc.step(GLOBAL.steps.Sleep_5000_ms, GLOBAL.steps.Close_SAPLogon760);
	sc.step(GLOBAL.steps.Close_SAPLogon760, null);
}}, ctx.dataManagers.rootData).setId('70bcecc9-ec87-4e96-a54e-b42c41be5228') ;

// ----------------------------------------------------------------
//   Step: Start_SAPLogon760
// ----------------------------------------------------------------
GLOBAL.step({ Start_SAPLogon760: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('opencloseSAPGUI', 'c6b24575-15fe-47fa-ba5f-b7614d8256af') ;
	// Starts an application.
	SAPLogon760.events.START.once(function(ev) {
		sc.endStep(); // pWindowSAPLogon76_man
		return;
	});
	SAPLogon760.start();
}});

// ----------------------------------------------------------------
//   Step: pWindowSAPLogon76_man
// ----------------------------------------------------------------
GLOBAL.step({ pWindowSAPLogon76_man: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('opencloseSAPGUI', '352f86fd-a9bd-4fb1-ba53-2bd0d6445e6d') ;
	// Wait until the Page loads
	SAPLogon760.pWindowSAPLogon76.wait(function(ev) {
		SAPLogon760.pWindowSAPLogon76.stQ7QPUBLIC_YANGHUAN.click();
		SAPLogon760.pWindowSAPLogon76.st_I311414_.click();
		SAPLogon760.pWindowSAPLogon76.stQ7QPUBLIC_YANGHUAN.click();
		SAPLogon760.pWindowSAPLogon76.st_I311414_.click();
		sc.endStep(); // Sleep_5000_ms
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: Sleep_5000_ms
// ----------------------------------------------------------------
GLOBAL.step({ Sleep_5000_ms: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('opencloseSAPGUI', 'f8bfc89d-9ec8-4baf-a6c6-258e29bcff74') ;
	// Freezes execution of the current thread until a timeout interval elapses.
	ctx.sleep(5000);
	sc.endStep(); // Close_SAPLogon760
	return;
}});

// ----------------------------------------------------------------
//   Step: Close_SAPLogon760
// ----------------------------------------------------------------
GLOBAL.step({ Close_SAPLogon760: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('opencloseSAPGUI', '260e7325-db07-4e00-b2fc-35ffb5f1a1eb') ;
	// Closes a running application.
	SAPLogon760.close();
	sc.endStep(); // end Scenario
	return;
}});
