
// ----------------------------------------------------------------
//   Test menu for scenario calWorkflow 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'calWorkflow', 'Test calWorkflow', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			Calculator.scenarios.calWorkflow.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario calWorkflow Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: calWorkflow
// ----------------------------------------------------------------
Calculator.scenario({ calWorkflow: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(Calculator.steps.Start_Calculator, Calculator.steps.pWindowCalculator_man);
	sc.step(Calculator.steps.pWindowCalculator_man, null);
}}, ctx.dataManagers.rootData).setId('519bf614-13dd-45d0-ba6a-e87fcf425c36') ;

// ----------------------------------------------------------------
//   Step: Start_Calculator
// ----------------------------------------------------------------
Calculator.step({ Start_Calculator: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('calWorkflow', '87e3bed9-1fff-4d44-aba9-3d09846fee5d') ;
	// Starts an application.
	Calculator.events.START.once(function(ev) {
		sc.endStep(); // pWindowCalculator_man
		return;
	});
	Calculator.start();
}});

// ----------------------------------------------------------------
//   Step: pWindowCalculator_man
// ----------------------------------------------------------------
Calculator.step({ pWindowCalculator_man: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('calWorkflow', '41859b16-0d48-42b9-8309-674939b8c449') ;
	// Wait until the Page loads
	Calculator.pWindowCalculator.wait(function(ev) {
		Calculator.pWindowCalculator.btNum4Button.wait(function(ev) {
			Calculator.pWindowCalculator.btNum4Button.click();
			Calculator.pWindowCalculator.btNum2Button.click();
			sc.endStep(); // end Scenario
			return;
		}, 0, 10000);
	});
}});
