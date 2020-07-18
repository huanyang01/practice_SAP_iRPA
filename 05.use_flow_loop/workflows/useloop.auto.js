
// ----------------------------------------------------------------
//   Test menu for scenario useLoop 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'useLoop', 'Test useLoop', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.useLoop.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario useLoop Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: useLoop
// ----------------------------------------------------------------
GLOBAL.scenario({ useLoop: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	// Initialize Loop counters
	sc.localData.Startloop = 0;
	
	sc.step(GLOBAL.steps.Set_context, GLOBAL.steps.Start_loop);
	sc.step(GLOBAL.steps.Start_loop, GLOBAL.steps.Exit_loop);
	sc.step(GLOBAL.steps.Exit_loop, GLOBAL.steps.Loops_to_the_start_bl, 'NEXT_LOOP');
	sc.step(GLOBAL.steps.Exit_loop, GLOBAL.steps.Write_log);
	sc.step(GLOBAL.steps.Write_log, GLOBAL.steps.Loops_to_the_start_bl, 'NEXT_LOOP');
	sc.step(GLOBAL.steps.Write_log, GLOBAL.steps.Loops_to_the_start_bl);
	sc.step(GLOBAL.steps.Loops_to_the_start_bl, GLOBAL.steps.Start_loop, 'NEXT_LOOP');
}}, ctx.dataManagers.rootData).setId('e5c9bb58-fbac-48a7-8750-0228b3648f5d') ;

// ----------------------------------------------------------------
//   Step: Set_context
// ----------------------------------------------------------------
GLOBAL.step({ Set_context: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('useLoop', '3e5ae788-4bd6-47f9-87fc-e4aef29a48ea') ;
	// Assigns a value to a variable of the current defined context, and update it during a run. To set it to an initial value, simply enter the number or text in the Value field.
	index = 3;
	sc.endStep(); // Start_loop
	return;
}});

// ----------------------------------------------------------------
//   Step: Start_loop
// ----------------------------------------------------------------
GLOBAL.step({ Start_loop: function(ev, sc, st) {
	var rootData = sc.data;
	
	ctx.workflow('useLoop', '4bd1bc52-5a3d-4a48-90a0-ae292179588a') ;
	// Starting instruction for a loop.
	if (sc.localData.Startloop < 0) sc.localData.Startloop = 0;
	sc.endStep(); // Exit_loop
	return;
}});

// ----------------------------------------------------------------
//   Step: Exit_loop
// ----------------------------------------------------------------
GLOBAL.step({ Exit_loop: function(ev, sc, st) {
	var rootData = sc.data;
	
	ctx.workflow('useLoop', '08dd1200-d098-4491-a6eb-28a557ac23d2') ;
	// Test block to exit from a loop.
	if (index < 0)
	{
		sc.localData.Startloop = -1 ;
		sc.endStep('NEXT_LOOP');
		return ;
	}
	sc.endStep(); // Write_log
	return;
}});

// ----------------------------------------------------------------
//   Step: Write_log
// ----------------------------------------------------------------
GLOBAL.step({ Write_log: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('useLoop', 'ef439334-4521-4bcd-9c77-d52ec1c01b9e') ;
	// Add a message to the log file and in the debug window along with a severity level.
	ctx.log('In the loop: ' + index, e.logIconType.Info);
	sc.endStep(); // Loops_to_the_start_bl
	return;
}});

// ----------------------------------------------------------------
//   Step: Loops_to_the_start_bl
// ----------------------------------------------------------------
GLOBAL.step({ Loops_to_the_start_bl: function(ev, sc, st) {
	var rootData = sc.data;
	
	ctx.workflow('useLoop', 'f9822250-3105-4365-a4a4-fe317e9814fe') ;
	// Loops to the start block.
	if (sc.localData.Startloop != -1)
	{
		sc.localData.Startloop++ ;
		sc.endStep('NEXT_LOOP');
		return ;
	}
	sc.endStep(); // end Scenario
	return;
}});
