
// ----------------------------------------------------------------
//   Test menu for scenario scRetrieveVariable 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'scRetrieveVariable', 'Test scRetrieveVariable', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.scRetrieveVariable.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario scRetrieveVariable Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: scRetrieveVariable
// ----------------------------------------------------------------
GLOBAL.scenario({ scRetrieveVariable: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Get_setting, GLOBAL.steps.Write_log_1);
	sc.step(GLOBAL.steps.Write_log_1, GLOBAL.steps.Display_msgbox_MyVar);
	sc.step(GLOBAL.steps.Display_msgbox_MyVar, null);
}}, ctx.dataManagers.rootData).setId('494c504c-6d61-42ed-8933-8d8ab8ad9c22') ;

// ----------------------------------------------------------------
//   Step: Get_setting
// ----------------------------------------------------------------
GLOBAL.step({ Get_setting: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('scRetrieveVariable', '354df795-8b5f-4ed4-a2a3-2ba9ded914ab') ;
	// Retrieves the value of a setting
	
	ctx.settings.MyVariable.get(function(code, label, setting) {
		if (code == e.error.OK) {
			// get value from setting.value
			sc.localData.myvariable = setting.value;
			sc.endStep(); // Write_log_1
			return;
		}
	});
}});

// ----------------------------------------------------------------
//   Step: Write_log_1
// ----------------------------------------------------------------
GLOBAL.step({ Write_log_1: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('scRetrieveVariable', '475db828-576a-4f12-a4e9-a29c648e559b') ;
	// Add a message to the log file and in the debug window along with a severity level.
	ctx.log('Get the variable value: ' + sc.localData.myvariable, e.logIconType.Info);
	sc.endStep(); // Display_msgbox_MyVar
	return;
}});

// ----------------------------------------------------------------
//   Step: Display_msgbox_MyVar
// ----------------------------------------------------------------
GLOBAL.step({ Display_msgbox_MyVar: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('scRetrieveVariable', 'b72aa67a-58af-45fb-988a-54f2f6dac444') ;
	// Displays a message box. If the "Wait closing" option is selected, waits until the end user closes it.
	// Creates the popup according to selected template, sets title and message and displays it.
	var MyVariable = ctx.popup('MyVariable', e.popup.template.Ok);
	MyVariable.open({ title: 'MyVariable', message: 'Value of the variable: ' + sc.localData.myvariable + ''});
	sc.endStep(); // end Scenario
	return;
}});

// ******************************************************************************************
// *************************** Out of Scenario treatments ***********************************
// ******************************************************************************************

//---------------------------------------------------
// Declare setting
//---------------------------------------------------
ctx.workflow('scRetrieveVariable', '990e655e-077d-4851-bed5-514fdb764f0a') ;
// Declares a setting

ctx.setting({ MyVariable: {
	comment: "My setting",
	server: true
}});
