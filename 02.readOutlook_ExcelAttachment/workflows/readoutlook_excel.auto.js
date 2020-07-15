﻿
// ----------------------------------------------------------------
//   Test menu for scenario readOutlook_Excel 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'readOutlook_Excel', 'Test readOutlook_Excel', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.readOutlook_Excel.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario readOutlook_Excel Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: readOutlook_Excel
// ----------------------------------------------------------------
GLOBAL.scenario({ readOutlook_Excel: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Init_Outlook, GLOBAL.steps.ReadMail);
	sc.step(GLOBAL.steps.ReadMail, GLOBAL.steps.Release_Outlook_);
	sc.step(GLOBAL.steps.Release_Outlook_, GLOBAL.steps.Initialize_Excel);
	sc.step(GLOBAL.steps.Initialize_Excel, GLOBAL.steps.Open_existing_Excel_f);
	sc.step(GLOBAL.steps.Open_existing_Excel_f, GLOBAL.steps.Get_values);
	sc.step(GLOBAL.steps.Get_values, GLOBAL.steps.Close_Excel_file);
	sc.step(GLOBAL.steps.Close_Excel_file, GLOBAL.steps.Release_Excel);
	sc.step(GLOBAL.steps.Release_Excel, GLOBAL.steps.End_Excel);
	sc.step(GLOBAL.steps.End_Excel, GLOBAL.steps.Write_log);
	sc.step(GLOBAL.steps.Write_log, null);
}}, ctx.dataManagers.rootData).setId('b80df867-ea2a-45e1-baab-cd175c580e93') ;

// ----------------------------------------------------------------
//   Step: Init_Outlook
// ----------------------------------------------------------------
GLOBAL.step({ Init_Outlook: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', 'fe89e949-04dc-48ef-be3e-c726c86e5d34') ;
	// Initialize Outlook
	ctx.outlook.init();
	sc.endStep(); // ReadMail
	return;
}});

// ----------------------------------------------------------------
//   Step: ReadMail
// ----------------------------------------------------------------
GLOBAL.step({ ReadMail: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', '6e1c3ace-3129-48de-8ca5-1dc84734bef2') ;
	// Describe functionality to be implemented in JavaScript later in the project.
	sc.endStep(); // Release_Outlook_
	return;
}});

// ----------------------------------------------------------------
//   Step: Release_Outlook_
// ----------------------------------------------------------------
GLOBAL.step({ Release_Outlook_: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', 'f91a277e-11c9-4999-8677-c9d4a974c889') ;
	// Release Outlook.
	ctx.outlook.end();
	sc.endStep(); // Initialize_Excel
	return;
}});

// ----------------------------------------------------------------
//   Step: Initialize_Excel
// ----------------------------------------------------------------
GLOBAL.step({ Initialize_Excel: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', 'daa01931-1e36-49d6-89c1-8df2572b0aa4') ;
	// Initializes Excel Library with different modes.
	ctx.options.excel.newXlsInstance = false;
	ctx.options.excel.visible = true;
	ctx.options.excel.displayAlerts = false;
	ctx.excel.initialize();
	sc.endStep(); // Open_existing_Excel_f
	return;
}});

// ----------------------------------------------------------------
//   Step: Open_existing_Excel_f
// ----------------------------------------------------------------
GLOBAL.step({ Open_existing_Excel_f: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', '9d1265a4-fde2-4923-a37b-b0e5a960e1f3') ;
	// Open existing Excel file.
	ctx.excel.file.open("C:\\SAP\\rpa\\"+rootData.ExcelFileName);
	sc.endStep(); // Get_values
	return;
}});

// ----------------------------------------------------------------
//   Step: Get_values
// ----------------------------------------------------------------
GLOBAL.step({ Get_values: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', '389fe785-f656-4e99-97cc-02dc9446232b') ;
	// Get values from range on the active worksheet.
	rootData.ExtractedData = ctx.excel.sheet.getFullRangeValues("A",1,rootData.ExcelParameter.EndCol,rootData.ExcelParameter.EndRow, undefined);
	sc.endStep(); // Close_Excel_file
	return;
}});

// ----------------------------------------------------------------
//   Step: Close_Excel_file
// ----------------------------------------------------------------
GLOBAL.step({ Close_Excel_file: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', 'fd91ae2a-d277-48c5-bb9e-7b2a70adf6ac') ;
	// Close Excel file.
	ctx.excel.file.close();
	sc.endStep(); // Release_Excel
	return;
}});

// ----------------------------------------------------------------
//   Step: Release_Excel
// ----------------------------------------------------------------
GLOBAL.step({ Release_Excel: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', 'be678db8-df8a-4eb6-9629-8d77fefd168c') ;
	// Release Excel
	ctx.excel.release();
	sc.endStep(); // End_Excel
	return;
}});

// ----------------------------------------------------------------
//   Step: End_Excel
// ----------------------------------------------------------------
GLOBAL.step({ End_Excel: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', 'd2ddf6b7-c413-4e4d-8b14-37e9f073a2f7') ;
	// End Excel.
	ctx.excel.end();
	sc.endStep(); // Write_log
	return;
}});

// ----------------------------------------------------------------
//   Step: Write_log
// ----------------------------------------------------------------
GLOBAL.step({ Write_log: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readOutlook_Excel', 'a75a46b8-a670-4ac7-bff6-8c038e02e464') ;
	// Add a message to the log file and in the debug window along with a severity level.
	ctx.log("Supplier Name"+rootData.ExtractedData, e.logIconType.Info);
	sc.endStep(); // end Scenario
	return;
}});
