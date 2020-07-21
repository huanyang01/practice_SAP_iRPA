
// ----------------------------------------------------------------
//   Test menu for scenario updateConfigFilewithSCPVariables 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'updateConfigFilewithSCPVariables', 'Test updateConfigFilewithSCPVariables', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.updateConfigFilewithSCPVariables.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario updateConfigFilewithSCPVariables Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: updateConfigFilewithSCPVariables
// ----------------------------------------------------------------
GLOBAL.scenario({ updateConfigFilewithSCPVariables: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Read_an_XML_file, GLOBAL.steps.Write_log);
	sc.step(GLOBAL.steps.Write_log, GLOBAL.steps.Q1A);
	sc.step(GLOBAL.steps.Q1A, GLOBAL.steps.QS1);
	sc.step(GLOBAL.steps.QS1, GLOBAL.steps.QSE);
	sc.step(GLOBAL.steps.QSE, GLOBAL.steps.emailBox);
	sc.step(GLOBAL.steps.emailBox, GLOBAL.steps.searchFolder);
	sc.step(GLOBAL.steps.searchFolder, GLOBAL.steps.unknownFolder);
	sc.step(GLOBAL.steps.unknownFolder, GLOBAL.steps.processedFolder);
	sc.step(GLOBAL.steps.processedFolder, GLOBAL.steps.Write_log_1);
	sc.step(GLOBAL.steps.Write_log_1, null);
}}, ctx.dataManagers.rootData).setId('78e5f59a-cf62-43ea-9505-b8e3907d2d4a') ;

// ----------------------------------------------------------------
//   Step: Read_an_XML_file
// ----------------------------------------------------------------
GLOBAL.step({ Read_an_XML_file: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', 'd0216d61-16de-4e49-aae7-0170b1c59a73') ;
	// Reads the content of a XML (eXtensible Markup Language) file.
	var file = ctx.options.path.log + "\\config.xml";
	var txt = ctx.fso.file.read(file, e.file.encoding.UTF8);
	rootData.Config = ctx.xml.xml2object(txt);
	sc.endStep(); // Write_log
	return;
}});

// ----------------------------------------------------------------
//   Step: Write_log
// ----------------------------------------------------------------
GLOBAL.step({ Write_log: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', '49a2761b-83a8-4a24-9133-45c602adfd79') ;
	// Add a message to the log file and in the debug window along with a severity level.
	ctx.log('Config:' + JSON.stringify(rootData.Config), e.logIconType.Info);
	sc.endStep(); // Q1A
	return;
}});

// ----------------------------------------------------------------
//   Step: Q1A
// ----------------------------------------------------------------
GLOBAL.step({ Q1A: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', 'd7a73f5b-563f-4b8e-98de-9cea4804a4bc') ;
	// Retrieves credential login and password
	
	ctx.cryptography.credentials.Q1A.get(function(code, label, credential) {
		if (code == e.error.OK) {
			// get values for credential
			rootData.Config.root.SAPLogon760.system0.User = credential.userName.get();
			rootData.Config.root.SAPLogon760.system0.Password = credential.password.get();
			sc.endStep(); // QS1
			return;
		}
	});
}});

// ----------------------------------------------------------------
//   Step: QS1
// ----------------------------------------------------------------
GLOBAL.step({ QS1: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', 'c49717bc-f24a-4dad-a2d1-cd1f0818a538') ;
	// Retrieves credential login and password
	
	ctx.cryptography.credentials.QS1.get(function(code, label, credential) {
		if (code == e.error.OK) {
			// get values for credential
			rootData.Config.root.SAPLogon760.system1.User = credential.userName.get();
			rootData.Config.root.SAPLogon760.system1.Password = credential.password.get();
			sc.endStep(); // QSE
			return;
		}
	});
}});

// ----------------------------------------------------------------
//   Step: QSE
// ----------------------------------------------------------------
GLOBAL.step({ QSE: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', 'e5d80e2f-3ac3-42e6-b12d-d9eef5900a7e') ;
	// Retrieves credential login and password
	
	ctx.cryptography.credentials.QSE.get(function(code, label, credential) {
		if (code == e.error.OK) {
			// get values for credential
			rootData.Config.root.SAPLogon760.system2.User = credential.userName.get();
			rootData.Config.root.SAPLogon760.system2.Password = credential.password.get();
			sc.endStep(); // emailBox
			return;
		}
	});
}});

// ----------------------------------------------------------------
//   Step: emailBox
// ----------------------------------------------------------------
GLOBAL.step({ emailBox: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', 'b563ef79-3ea2-40cc-b58a-7f9868bb85a5') ;
	// Retrieves the value of a setting
	
	ctx.settings.emailBox.get(function(code, label, setting) {
		if (code == e.error.OK) {
			// get value from setting.value
			rootData.Config.root.mail.emailBox = setting.value;
			sc.endStep(); // searchFolder
			return;
		}
	});
}});

// ----------------------------------------------------------------
//   Step: searchFolder
// ----------------------------------------------------------------
GLOBAL.step({ searchFolder: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', 'ecafcd37-0d90-470a-83c8-ffee1375a52b') ;
	// Retrieves the value of a setting
	
	ctx.settings.searchFolder.get(function(code, label, setting) {
		if (code == e.error.OK) {
			// get value from setting.value
			rootData.Config.root.mail.searchFolder = setting.value;
			sc.endStep(); // unknownFolder
			return;
		}
	});
}});

// ----------------------------------------------------------------
//   Step: unknownFolder
// ----------------------------------------------------------------
GLOBAL.step({ unknownFolder: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', 'bfe3331c-9722-481e-94b3-635157233478') ;
	// Retrieves the value of a setting
	
	ctx.settings.unknownFolder.get(function(code, label, setting) {
		if (code == e.error.OK) {
			// get value from setting.value
			rootData.Config.root.mail.unknownFolder = setting.value;
			sc.endStep(); // processedFolder
			return;
		}
	});
}});

// ----------------------------------------------------------------
//   Step: processedFolder
// ----------------------------------------------------------------
GLOBAL.step({ processedFolder: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('updateConfigFilewithSCPVariables', '2148cade-fc0d-4ab3-910c-856ad00c4349') ;
	// Retrieves the value of a setting
	
	ctx.settings.processedFolder.get(function(code, label, setting) {
		if (code == e.error.OK) {
			// get value from setting.value
			rootData.Config.root.mail.processedFolder = setting.value;
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
	ctx.workflow('updateConfigFilewithSCPVariables', '86537c13-c60a-4ea4-93c4-1e002d046329') ;
	// Add a message to the log file and in the debug window along with a severity level.
	ctx.log('Config:' + JSON.stringify(rootData.Config), e.logIconType.Info);
	sc.endStep(); // end Scenario
	return;
}});

// ******************************************************************************************
// *************************** Out of Scenario treatments ***********************************
// ******************************************************************************************

//---------------------------------------------------
// Q1A
//---------------------------------------------------
ctx.workflow('updateConfigFilewithSCPVariables', '649ccef2-fbc7-460d-b9f4-be90ab2fc5df') ;
// Declares a credential

ctx.cryptography.credential({ Q1A: {
	comment: "My credential",
	server: true
}});

//---------------------------------------------------
// QS1
//---------------------------------------------------
ctx.workflow('updateConfigFilewithSCPVariables', '6a12dafa-a509-4dbe-b032-2d4daa669c63') ;
// Declares a credential

ctx.cryptography.credential({ QS1: {
	comment: "My credential",
	server: true
}});

//---------------------------------------------------
// QSE
//---------------------------------------------------
ctx.workflow('updateConfigFilewithSCPVariables', '072d0a60-ed60-496c-a5ca-20351c61f232') ;
// Declares a credential

ctx.cryptography.credential({ QSE: {
	comment: "My credential",
	server: true
}});

//---------------------------------------------------
// emailBox
//---------------------------------------------------
ctx.workflow('updateConfigFilewithSCPVariables', '218fd041-7407-419b-bd65-78857df7ce67') ;
// Declares a setting

ctx.setting({ emailBox: {
	comment: "My setting",
	server: true
}});

//---------------------------------------------------
// unknownFolder
//---------------------------------------------------
ctx.workflow('updateConfigFilewithSCPVariables', 'e8ca0eb9-82b4-4d15-a91f-01ff14c945e5') ;
// Declares a setting

ctx.setting({ unknownFolder: {
	comment: "My setting",
	server: true
}});

//---------------------------------------------------
// processedFolder
//---------------------------------------------------
ctx.workflow('updateConfigFilewithSCPVariables', '6f3586d4-b4ad-413c-8225-db386934681a') ;
// Declares a setting

ctx.setting({ processedFolder: {
	comment: "My setting",
	server: true
}});

//---------------------------------------------------
// searchFolder
//---------------------------------------------------
ctx.workflow('updateConfigFilewithSCPVariables', 'a89fdd21-97b3-44e2-9d4e-8bef57d9af25') ;
// Declares a setting

ctx.setting({ searchFolder: {
	comment: "My setting",
	server: true
}});
