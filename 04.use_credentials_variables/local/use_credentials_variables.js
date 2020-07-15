
// ----------------------------------------------------------------
//   Test menu for scenario use_credentials_variables 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'use_credentials_variables', 'Test use_credentials_variables', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.use_credentials_variables.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario use_credentials_variables Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: use_credentials_variables
// ----------------------------------------------------------------
GLOBAL.scenario({ use_credentials_variables: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Get_credential, GLOBAL.steps.Write_log);
	sc.step(GLOBAL.steps.Write_log, GLOBAL.steps.Display_msgbox_MyCre);
	sc.step(GLOBAL.steps.Display_msgbox_MyCre, null);
}}, ctx.dataManagers.rootData).setId('4db4e52c-ec07-4519-9c0f-9292e7c8177c') ;

// ----------------------------------------------------------------
//   Step: Get_credential
// ----------------------------------------------------------------
GLOBAL.step({ Get_credential: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('use_credentials_variables', 'fe22acf6-ebe1-4c77-8546-963f77f417d4') ;
	// Retrieves credential login and password
	
	ctx.cryptography.credentials.MyCredential.get(function(code, label, credential) {
		if (code == e.error.OK) {
			// get values for credential
			sc.localData.username = credential.userName.get();
			sc.localData.password = credential.password.get();
			sc.endStep(); // Write_log
			return;
		}
	});
}});

// ----------------------------------------------------------------
//   Step: Write_log
// ----------------------------------------------------------------
GLOBAL.step({ Write_log: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('use_credentials_variables', 'a662ccf9-0a0b-465c-a5e1-6e5dc704c772') ;
	// Add a message to the log file and in the debug window along with a severity level.
	ctx.log('Log the credential and variables ~ '+' ` UserName:'+ sc.localData.username + ' ~ Password: ' +sc.localData.password, e.logIconType.Info);
	sc.endStep(); // Display_msgbox_MyCre
	return;
}});

// ----------------------------------------------------------------
//   Step: Display_msgbox_MyCre
// ----------------------------------------------------------------
GLOBAL.step({ Display_msgbox_MyCre: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('use_credentials_variables', 'd1e88720-5948-43ee-b189-f8c99b9e6913') ;
	// Displays a message box. If the "Wait closing" option is selected, waits until the end user closes it.
	// Creates the popup according to selected template, sets title and message and displays it.
	var MyCredential = ctx.popup('MyCredential', e.popup.template.Ok);
	MyCredential.open({ title: 'MyCredential', message: 'Username: ' + sc.localData.username + '</br>Password: '+sc.localData.password +''});
	sc.endStep(); // end Scenario
	return;
}});

// ******************************************************************************************
// *************************** Out of Scenario treatments ***********************************
// ******************************************************************************************

//---------------------------------------------------
// Declare credential
//---------------------------------------------------
ctx.workflow('use_credentials_variables', '47380785-a671-46ba-b111-c85454661c38') ;
// Declares a credential

ctx.cryptography.credential({ MyCredential: {
	comment: "My credential",
	server: true
}});
