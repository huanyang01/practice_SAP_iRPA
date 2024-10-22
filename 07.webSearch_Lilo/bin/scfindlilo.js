﻿
// ----------------------------------------------------------------
//   Test menu for scenario scFindLilo 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'scFindLilo', 'Test scFindLilo', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.scFindLilo.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario scFindLilo Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: scFindLilo
// ----------------------------------------------------------------
GLOBAL.scenario({ scFindLilo: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Start_appLilo, GLOBAL.steps.pHome_management);
	sc.step(GLOBAL.steps.pHome_management, null);
}}, ctx.dataManagers.rootData).setId('36c488b2-fff0-42ce-a1d4-cccf01d8cf2b') ;

// ----------------------------------------------------------------
//   Step: Start_appLilo
// ----------------------------------------------------------------
GLOBAL.step({ Start_appLilo: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('scFindLilo', '99da887d-67ba-40ba-aac5-7791e0f75cf5') ;
	// Starts an application.
	ctx.log('Step: Start_appLilo -- before start')
	appLilo.start();
	ctx.log('Step: Start_appLilo -- after start')
	sc.endStep(); // pHome_management
	return;
}});

// ----------------------------------------------------------------
//   Step: pHome_management
// ----------------------------------------------------------------
GLOBAL.step({ pHome_management: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('scFindLilo', '2d38622e-60c3-4014-ba53-1ff38dfdaa49') ;
	// Wait until the Page loads
	ctx.log('Step: pHome_management -- before pHome')
	appLilo.pHome.waitReady(function(ev) {
		ctx.log('Step: pHome_management -- before oQuery')
		appLilo.pHome.oQuery.set('SAP Intelligent RPA');
		ctx.log('Step: pHome_management -- before Click')
		appLilo.pHome.btSearch.click();
		sc.endStep(); // end Scenario
		return;
	});
}});
