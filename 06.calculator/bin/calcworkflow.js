
// ----------------------------------------------------------------
//   Test menu for scenario calcWorkflow 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'calcWorkflow', 'Test calcWorkflow', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			Calculator.scenarios.calcWorkflow.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario calcWorkflow Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: calcWorkflow
// ----------------------------------------------------------------
Calculator.scenario({ calcWorkflow: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(Calculator.steps.Start_Calculator, Calculator.steps.pWindowCalculator_man);
	sc.step(Calculator.steps.pWindowCalculator_man, null);
}}, ctx.dataManagers.rootData).setId('9c6d88f8-e8ac-41ce-b44e-7d1589354636') ;

// ----------------------------------------------------------------
//   Step: Start_Calculator
// ----------------------------------------------------------------
Calculator.step({ Start_Calculator: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('calcWorkflow', '0133c105-124f-4ed2-8f83-71e009010163') ;
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
	ctx.workflow('calcWorkflow', '8ca9168e-1bc2-4f93-b6a8-f379007da8ef') ;
	// Wait until the Page loads
	Calculator.pWindowCalculator.wait(function(ev) {
		Calculator.pWindowCalculator.btNum4Button.wait(function(ev) {
			Calculator.pWindowCalculator.btNum4Button.click();
			// Wait until the end user clicks on the item.
			Calculator.pWindowCalculator.btNum2Button.events.CLICK.on(function(ev) {
				var data = ev.data;
				Calculator.pWindowCalculator.btNum2Button.click();
				sc.endStep(); // end Scenario
				return;
			});
		}, 0, 10000);
	});
}});
