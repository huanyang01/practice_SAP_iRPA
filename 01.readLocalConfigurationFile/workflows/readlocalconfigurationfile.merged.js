
// ----------------------------------------------------------------
//   Test menu for scenario readLocalConfigurationFile 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'readLocalConfigurationFile', 'Test readLocalConfigurationFile', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			POPUPS.scenarios.readLocalConfigurationFile.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario readLocalConfigurationFile Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: readLocalConfigurationFile
// ----------------------------------------------------------------
POPUPS.scenario({ readLocalConfigurationFile: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(POPUPS.steps.Read_an_XML_file, POPUPS.steps.Write_log);
	sc.step(POPUPS.steps.Write_log, POPUPS.steps.Initialize_Excel);
	sc.step(POPUPS.steps.Initialize_Excel, POPUPS.steps.Open_existing_Excel_f);
	sc.step(POPUPS.steps.Open_existing_Excel_f, null);
}}, ctx.dataManagers.rootData).setId('cca2e5f6-d66b-4c44-9f1e-6a408c63e3c8') ;

// ----------------------------------------------------------------
//   Step: Read_an_XML_file
// ----------------------------------------------------------------
POPUPS.step({ Read_an_XML_file: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readLocalConfigurationFile', '255b6003-6d71-46a2-beca-e073a8a56acd') ;
	// Reads the content of a XML (eXtensible Markup Language) file.
	var file = "C:\\SAP\\rpa\\sample.config";
	var txt = ctx.fso.file.read(file, e.file.encoding.UTF8);
	rootData.Config = ctx.xml.xml2object(txt);
	sc.endStep(); // Write_log
	return;
}});

// ----------------------------------------------------------------
//   Step: Write_log
// ----------------------------------------------------------------
POPUPS.step({ Write_log: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readLocalConfigurationFile', '1e9861c3-93dd-47ae-9e13-1056a699d9d0') ;
	// Add a message to the log file and in the debug window along with a severity level.
	ctx.log("Config:"+rootData.Config.AttachmentFilePath.Excel, e.logIconType.Info);
	sc.endStep(); // Initialize_Excel
	return;
}});

// ----------------------------------------------------------------
//   Step: Initialize_Excel
// ----------------------------------------------------------------
POPUPS.step({ Initialize_Excel: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readLocalConfigurationFile', '7259d4d3-2a16-4728-b9dc-e26f1543cff8') ;
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
POPUPS.step({ Open_existing_Excel_f: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('readLocalConfigurationFile', 'fa3dd3b8-fae3-4231-86b2-b7b6d9cecc90') ;
	// Open existing Excel file.
	ctx.excel.file.open(rootData.Config.AttachmentFilePath.Excel+"\\Reminder0627.xlsx");
	sc.endStep(); // end Scenario
	return;
}});
