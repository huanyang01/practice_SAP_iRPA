
// ----------------------------------------------------------------
//   Test menu for scenario readECCdata_writeExcel 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'readECCdata_writeExcel', 'Test readECCdata_writeExcel', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			SAPGUI.scenarios.readECCdata_writeExcel.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario readECCdata_writeExcel Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: readECCdata_writeExcel
// ----------------------------------------------------------------
SAPGUI.scenario({ readECCdata_writeExcel: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(SAPGUI.steps.pSAPEasyAccessU_manag, SAPGUI.steps.Initialize_Excel);
	sc.step(SAPGUI.steps.Initialize_Excel, SAPGUI.steps.Open_existing_Excel_f);
	sc.step(SAPGUI.steps.Open_existing_Excel_f, SAPGUI.steps.Set_one_value);
	sc.step(SAPGUI.steps.Set_one_value, SAPGUI.steps.pUserMaintenanceIni_m);
	sc.step(SAPGUI.steps.pUserMaintenanceIni_m, null);
}}, ctx.dataManagers.rootData).setId('6970a2d0-326c-4a6d-86eb-3c461ba607f4') ;

// ----------------------------------------------------------------
//   Step: pSAPEasyAccessU_manag
// ----------------------------------------------------------------
SAPGUI.step({ pSAPEasyAccessU_manag: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readECCdata_writeExcel', 'f392a7ec-9ca4-4cc1-b0d4-3472f9dd95a6') ;
	// Wait until the Page loads
	SAPGUI.pSAPEasyAccessU.wait(function(ev) {
		SAPGUI.pSAPEasyAccessU.oGuiOkCodeField.set(rootData.SAPGUIData.pSAPEasyAccessUData.oGuiOkCodeField);
		SAPGUI.pSAPEasyAccessU.oGuiOkCodeField.set("SU01");
		rootData.SAPGUIData.pSAPEasyAccessUData.oGuiOkCodeField = SAPGUI.pSAPEasyAccessU.oGuiOkCodeField.get();
		SAPGUI.pSAPEasyAccessU.btGuiButton.click();
		sc.endStep(); // Initialize_Excel
		return;
	});
}});

// ----------------------------------------------------------------
//   Step: Initialize_Excel
// ----------------------------------------------------------------
SAPGUI.step({ Initialize_Excel: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readECCdata_writeExcel', '6f2b0e07-bf43-4128-93d7-9583c26de250') ;
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
SAPGUI.step({ Open_existing_Excel_f: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readECCdata_writeExcel', '4d9b113b-9795-41bb-8fa5-ab7e4631622c') ;
	// Open existing Excel file.
	ctx.excel.file.open("C:\\SAP\\iTeam\\TestRPAWrite.xlsx");
	sc.endStep(); // Set_one_value
	return;
}});

// ----------------------------------------------------------------
//   Step: Set_one_value
// ----------------------------------------------------------------
SAPGUI.step({ Set_one_value: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readECCdata_writeExcel', 'a6143909-2516-4301-abee-4b83aa6aaad2') ;
	// Set one value in a cell
	ctx.excel.sheet.setCell(1, 1, rootData.SAPGUIData.pSAPEasyAccessUData.oGuiOkCodeField);
	sc.endStep(); // pUserMaintenanceIni_m
	return;
}});

// ----------------------------------------------------------------
//   Step: pUserMaintenanceIni_m
// ----------------------------------------------------------------
SAPGUI.step({ pUserMaintenanceIni_m: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readECCdata_writeExcel', '90e6c067-c1c9-4afa-b918-0e143c166d98') ;
	// Wait until the Page loads
	SAPGUI.pUserMaintenanceIni.wait(function(ev) {
		SAPGUI.pUserMaintenanceIni.edUser.set("I311414");
		SAPGUI.pUserMaintenanceIni.btGuiButton.click();
		sc.endStep(); // end Scenario
		return;
	});
}});
