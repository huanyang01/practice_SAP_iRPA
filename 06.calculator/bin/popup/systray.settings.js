// Do not overwrite this file directly with \samplesV3\demoNewSystray\local\Systray\settings.js
//item initialization placed inside a method to allow sending localized labels to systray before item initialization
popup = POPUPS.Systray = POPUPS.popup({ Systray: {
	template: e.popup.template.NoButton,
	url: "Systray\\popup.html",
	CX: 400,
	CY: 480,
	X: e.popup.position.Right,
	Y: e.popup.position.Bottom,
	content: e.popup.content.Web,
	titleVisible: false,
	color: e.popup.color.None,
	XRelative: e.popup.position.None,
	YRelative: e.popup.position.None,
	display: e.popup.display.Undefined,
	systray: true,
	XSlide: e.popup.position.None,
	resizable: false
}});

GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		systray.addMenu("", "TestPopup", "Test popups");
		systray.addMenu("TestPopup", "SystrayOpen" , "Open Systray", "", function(ev) {
			POPUPS.Systray.open({ testMode: true });
		});
		systray.addMenu("TestPopup", "SystrayClose" , "Close Systray", "", function(ev) {
			POPUPS.Systray.close();
		});
	}
});

POPUPS.Systray.onTest(function(popup) {	
	// TODO : add your tests here
	var aboutList = [
		{labelValuePair: [
			GLOBAL.labels.aboutPopup.projectLabel,
			"Demo project for the new systray"
		], isProjectSpecific: true},
		{labelValuePair: [
			GLOBAL.labels.aboutPopup.projectVersion,
			"1.10"
		], isProjectSpecific: true},
		{labelValuePair: [
			GLOBAL.labels.aboutPopup.date,
			"23/09/2019"
		], isProjectSpecific: true},
		{labelValuePair: [
			"Agent version",
			"1.0.4.6"
		], isProjectSpecific: false},
		{labelValuePair: [
			GLOBAL.labels.aboutPopup.frameworkVersion,
			"1.0.4.6"
		], isProjectSpecific: false},
		{labelValuePair: [
			"Tenant",
			"Orsay master"
		], isProjectSpecific: false}
	];
		var tenantList = [
	{
	id: "ten1",
	name: "Orsay Master",
	url: "ipa-deploy-orsay2-approuter...",
	active: false
	}, {
	id: "Orsay1909",
	name: "Orsay 1909",
	url: "ipa-deploy-orsay2-approuter...",
	active: false
	}, {
	id: "Orsay1910",
	name: "Orsay 1910",
	url: "ipa-deploy-orsay2-approuter...",
	active: false
	}, {
	id: "Orsay1912",
	name: "Orsay 1912",
	url: "ipa-deploy-orsay2-approuter...",
	active: true
	}, {
	id: "ten2",
	name: "Master nightly",
	url: "ipa-deploy-master1-approuter...",
	active: false
	}
	];
	
	var projectList = [
			{
				"messageContentType" : "project",
				"packageUid": "12345678-9012-3456-7890-123456789012",
				"packageVersionUid": "12345678-9012-3456-7890-123456789012",
				"configurationUid": "12345678-9012-3456-7890-123456789012",
				"configurationName": "Acceptance",
				"environmentClassifier": "test" | "dev" | "prod",
				"name": "demoAutomate",
				"version": "1.43",
				"command": {
					"o": "trace.autoRecording=true",
					"w": "%localappdata%\SAP\Projects",
					"z": ""
				}
			}, {
				"messageContentType" : "project",
				"packageUid": "12345678-9012-3456-7890-123456789014",
				"packageVersionUid": "12345678-9012-3456-7890-123456789014",
				"configurationUid": "12345678-9012-3456-7890-123456789014",
				"configurationName": "Production",
				"environmentClassifier": "test" | "dev" | "prod",
				"name": "demoAutomate",
				"version": "1.42",
				"command": {
					"o": "trace.autoRecording=true",
					"w": "%localappdata%\SAP\Projects",
					"z": ""
				}              
			}, {
				"messageContentType" : "project",
				"packageUid": "12345678-9012-3456-7890-123456789015",
				"packageVersionUid": "12345678-9012-3456-7890-123456789015",
				"configurationUid": "12345678-9012-3456-7890-123456789015",
				"configurationName": "Acceptance",
				"environmentClassifier": "test" | "dev" | "prod",
				"name": "demo4DKom",
				"version": "1.10",
				"command": {
					"o": "trace.autoRecording=true",
					"w": "%localappdata%\SAP\Projects",
					"z": ""
				}              
			}, {
				"messageContentType" : "project",
				"packageUid": "12345678-9012-3456-7890-123456789016",
				"packageVersionUid": "12345678-9012-3456-7890-123456789016",
				"configurationUid": "12345678-9012-3456-7890-123456789016",
				"configurationName": "Production",
				"environmentClassifier": "test" | "dev" | "prod",
				"name": "demo4DKom",
				"version": "1.08",
				"command": {
					"o": "trace.autoRecording=true",
					"w": "%localappdata%\SAP\Projects",
					"z": ""
				}     
			}, {
				"messageContentType" : "project",
				"packageUid": "12345678-9012-3456-7890-123456789017",
				"packageVersionUid": "12345678-9012-3456-7890-123456789017",
				"configurationUid": "12345678-9012-3456-7890-123456789017",
				"configurationName": "Production",
				"environmentClassifier": "test" | "dev" | "prod",
				"name": "demo S4 Hana",
				"version": "1.4",
				"command": {
					"o": "trace.autoRecording=true",
					"w": "%localappdata%\SAP\Projects",
					"z": ""
				}              
			}, {
				"messageContentType" : "project",
				"packageUid": "12345678-9012-3456-7890-123456789018",
				"packageVersionUid": "12345678-9012-3456-7890-123456789018",
				"configurationUid": "12345678-9012-3456-7890-123456789018",
				"configurationName": "Production",
				"environmentClassifier": "test" | "dev" | "prod",
				"name": "demo SAP GUI",
				"version": "1.8",
				"command": {
					"o": "trace.autoRecording=true",
					"w": "%localappdata%\SAP\Projects",
					"z": ""
				}              
			}
		];

	var menuList = [
		{
	id: 's1',
			name: 'Scenario 1'
	},
	{
	id: 's2',
	name: 'Scenario 2'
	},
	{
	id: 'm1',
	name: 'Menu 1',
	content: [
		{
			id: 's11',
		name: 'Scenario 11'
		},
		{
			id: 's12',
		name: 'Scenario 12'
		},
		{
			id: 'm11',
		name: 'Menu 11',
		content: [
			{
					id: 's111',
			name: 'Scenario 111'
			}
		]
		}
	]
	},
	{
	id: 'm2',
	name: 'Menu 2',
			disabled: false,
	content: [
		{
			id: 's21',
		name: 'Scenario 21'
		}
	]
	}
	]	;
	var languageList = [{
			id: "en",
			value: "English"
		},
		{
			id: "de",
			value: "German"
		},
		{
			id: "fr",
			value: "Français"
		},
		{
			id: "jp",
			value: "日本の"
		},
		{
			id: "es",
			value: "Español"
		}];
	var jobListMap = {
		'job1' : {project: '', ts: '2019-10-08 12:24:04', tsRun: '2019-10-08 12:24:04', duration: '1', status: 'Successful', code: 'OK', name: 'Job 1', label: ''},
		'job2' : {project: '', ts: '2019-10-08 12:24:04', tsRun: '2019-10-08 12:24:04', duration: '1', status: 'Failed', code: 'Timeout', name: 'Job 2', label: 'Job 2 Timeout'}
	};
	/** @suppress {checkVars} */
	function _init() {
		if ('undefined' !== typeof updateAbout) {
			updateAbout(aboutList);
		}
		if ('undefined' !== typeof updateProjectList) {
			updateProjectList(projectList, '');
		}
		if ('undefined' !== typeof updateMainMenu) {
			updateMainMenu(menuList);
		}
		if ('undefined' !== typeof updateAgentStatus) {
			updateAgentStatus('Idle', "Desktop agent is running properly", "Desktop agent is running properly");
		}
		if ('undefined' !== typeof updateTenantList) {
			updateTenantList(tenantList);
		}
		if ('undefined' !== typeof updateLanguageList) {
			updateLanguageList(languageList); 	
		}
		if ('undefined' !== typeof updateJobList) {
			updateJobList(jobListMap); 	
		}
	}
	_init();
});

//item initialization placed inside a method to allow sending localized labels to systray before item initialization
var loadSystraySettings = function() {
	popup.item({ page1: {
		type: e.item.type.page,
		parent: "",
		style: e.item.style.Blue,
		auto: true,
		items: [
			{
				id: "pgMain",
				collapsed: false
			},
			{
				id: "pgAbout",
				collapsed: false
			},
			{
				id: "pgProjects",
				collapsed: false
			},
			{
				id: "pgSettings",
				collapsed: false
			},
			{
				id: "pgTenants",
				collapsed: false
			},
			{
				id: "pgTenantAddEdit",
				collapsed: false
			},
			{
				id: "pgDiagnostic",
				collapsed: false
			},
			{
				id: "pgJobProgress",
				collapsed: false
			},
			{
				id: "pgJobProgressDetails",
				collapsed: false
			}
		]
	}});

	popup.item({ containerMain: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "pgMain"
	}});

	popup.item({ row38: {
		type: e.item.type.row,
		auto: false,
		parent: "containerMain"
	}});

	popup.item({ col48: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row38"
	}});

	popup.item({ containerHeaderMain: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col48",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row35: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderMain"
	}});

	popup.item({ col39: {
		type: e.item.type.column,
		auto: false,
		parent: "row35",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btMainBack: {
		type: e.item.type.button,
		parent: "col39",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col38: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row35"
	}});

	popup.item({ itemMainTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col38",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.desktopAgent,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col58: {
		type: e.item.type.column,
		auto: false,
		parent: "row35",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btMainStopRecordingTraces: {
		type: e.item.type.button,
		parent: "col58",
		value: "",
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.stop,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-light-red-with-border",
		visible: false
	}});

	popup.item({ row4: {
		type: e.item.type.row,
		auto: false,
		parent: "containerMain"
	}});

	popup.item({ col4: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row4"
	}});

	popup.item({ projectMenuList: {
		type: e.item.type.list,
		parent: "col4",
		auto: true,
		items: [
			{
				id: "s1",
				value: "Scenario 1",
				icon: e.item.icon.none,
				iconSide: ""
			},
			{
				id: "s2",
				value: "Scenario 2",
				icon: e.item.icon.none,
				iconSide: ""
			},
			{
				id: "m1",
				value: "Menu 1",
				icon: e.item.icon.chevronRight,
				iconSide: "right"
			},
			{
				id: "m2",
				value: "Menu 2",
				icon: e.item.icon.chevronRight,
				iconSide: "right"
			}
		],
		textSize: e.item.textSize.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-scenario-li"
	}});

	popup.item({ row16: {
		type: e.item.type.row,
		auto: false,
		parent: "containerMain"
	}});

	popup.item({ col18: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row16"
	}});

	popup.item({ itemEmptyMenuListLabel: {
		type: e.item.type.item,
		textSize: e.item.textSize.None,
		parent: "col18",
		alignment: e.item.alignment.Center,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.projectWithNoMenuMainMenuLabel,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		visible: false
	}});

	popup.item({ row15: {
		type: e.item.type.row,
		auto: false,
		parent: "containerMain",
		rowType: e.item.rowType.None,
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None,
		myStyle: "",
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col16: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row15"
	}});

	popup.item({ containerMenuMain: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col16",
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ btAbout: {
		type: e.item.type.button,
		parent: "containerMenuMain",
		value: "",
		tooltip: GLOBAL.labels.systray.about,
		style: e.item.style.Cyan,
		icon: e.item.icon.infoSign,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-toolbar-btn agent-systray-transparent-btn",
		myStyle: ""
	}});

	popup.item({ btProjects: {
		type: e.item.type.button,
		parent: "containerMenuMain",
		value: "",
		tooltip: GLOBAL.labels.systray.projects,
		style: e.item.style.Cyan,
		icon: e.item.icon.list,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-toolbar-btn agent-systray-transparent-btn"
	}});

	popup.item({ btMoreActions: {
		type: e.item.type.dropdown,
		parent: "containerMenuMain",
		value: "",
		tooltip: GLOBAL.labels.systray.moreActions,
		style: e.item.style.Cyan,
		icon: e.item.icon.optionHorizontal,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		items: [
			{
				id: "btQuit",
				value: GLOBAL.labels.systray.stopRestart,
				icon: e.item.icon.off,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				disabled: false,
				active: false,
				header: "",
				tooltip: "",
				tooltipPlacement: e.item.side.none,
				divider: false,
				myClass: "",
				myStyle: ""
			},
			{
				id: "btSettings",
				value: GLOBAL.labels.systray.settings,
				icon: e.item.icon.cog,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				disabled: false,
				active: false,
				header: "",
				tooltip: "",
				tooltipPlacement: e.item.side.none,
				divider: false,
				myClass: "",
				myStyle: ""
			},
			{
				id: "btTenants",
				value: GLOBAL.labels.systray.tenants,
				icon: e.item.icon.user,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				disabled: false,
				active: false,
				header: "",
				tooltip: "",
				tooltipPlacement: e.item.side.none,
				divider: false,
				myClass: "",
				myStyle: ""
			},
			{
				id: "btDiagnostic",
				value: GLOBAL.labels.systray.diagnostic.diag,
				icon: e.item.icon.wrench,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				disabled: false,
				active: false,
				header: "",
				tooltip: "",
				tooltipPlacement: e.item.side.none,
				divider: false,
				myClass: "",
				myStyle: ""
			},
			{
				id: "btJobProgress",
				value: GLOBAL.labels.systray.jobProgress,
				icon: e.item.icon.tasks,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				disabled: false,
				active: false,
				header: "",
				tooltip: "",
				tooltipPlacement: e.item.side.none,
				divider: false,
				myClass: "",
				myStyle: ""
			}
		],
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn agent-systray-toolbar-btn"
	}});

	popup.item({ containerAbout: {
		type: e.item.type.container,
		auto: false,
		parent: "pgAbout",
		fluid: true
	}});

	popup.item({ row39: {
		type: e.item.type.row,
		auto: false,
		parent: "containerAbout"
	}});

	popup.item({ col49: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row39"
	}});

	popup.item({ containerHeaderAbout: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col49",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row25: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderAbout"
	}});

	popup.item({ col40: {
		type: e.item.type.column,
		auto: false,
		parent: "row25",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btAboutBack: {
		type: e.item.type.button,
		parent: "col40",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col29: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row25"
	}});

	popup.item({ itemAboutTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col29",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.about,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col59: {
		type: e.item.type.column,
		auto: false,
		parent: "row25",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ row12: {
		type: e.item.type.row,
		auto: false,
		parent: "containerAbout",
		rowType: e.item.rowType.None,
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None,
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col13: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row12",
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None
	}});

	popup.item({ containerMenuAbout: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "col13",
		background: e.item.style.None,
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ btAboutCopy: {
		type: e.item.type.button,
		parent: "containerMenuAbout",
		value: "",
		tooltip: GLOBAL.labels.systray.copyInformations,
		style: e.item.style.Cyan,
		icon: e.item.icon.copy,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "",
		visible: false
	}});

	popup.item({ row49: {
		type: e.item.type.row,
		auto: false,
		parent: "containerAbout"
	}});

	popup.item({ col68: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row49"
	}});

	popup.item({ containerContentAbout: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col68",
		myClass: "agent-systray-content-container"
	}});

	popup.item({ row11: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentAbout"
	}});

	popup.item({ col12: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row11"
	}});

	popup.item({ alertTrialMode: {
		type: e.item.type.alert,
		parent: "col12",
		style: e.item.style.Cyan,
		close: false,
		value: "",
		test: "",
		auto: true,
		visible: false,
		myClass: "agent-systray-alert trial-mode-alert"
	}});

	popup.item({ row2: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentAbout",
		rowType: e.item.rowType.None,
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.Middle
	}});

	popup.item({ col1: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2,
		parent: "row2",
		alignment: e.item.alignment.Center,
		alignmentVertical: e.item.alignmentVertical.Middle
	}});

	popup.item({ aboutImage: {
		type: e.item.type.image,
		parent: "col1",
		src: "icons/Idle.png",
		width: "100%",
		auto: true
	}});

	popup.item({ col2: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 10,
		parent: "row2"
	}});

	popup.item({ containerAboutStatus: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col2",
		myClass: "container-about-status"
	}});

	popup.item({ aboutStatus: {
		type: e.item.type.item,
		textSize: e.item.textSize.None,
		parent: "containerAboutStatus",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: "",
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "about-status"
	}});

	popup.item({ btHelpAboutStatus: {
		type: e.item.type.button,
		parent: "containerAboutStatus",
		value: "",
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.questionSign,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-help-button",
		myStyle: "",
		visible: false
	}});

	popup.item({ row14: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentAbout"
	}});

	popup.item({ col15: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row14"
	}});

	popup.item({ tableAbout: {
		type: e.item.type.table,
		showHeader: false,
		title: "",
		tableHeight: null,
		parent: "col15",
		style: e.item.style.Cyan,
		auto: true,
		columns: [
			{
				value: "Name",
				style: e.item.style.Blue,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				colWidth: 4,
				alignment: e.item.alignment.None,
				textTransform: e.item.textTransform.None,
				myClass: "",
				myStyle: "",
				visible: true
			},
			{
				value: "Value",
				style: e.item.style.Grey,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				colWidth: 8,
				alignment: e.item.alignment.None,
				textTransform: e.item.textTransform.None,
				myClass: "",
				myStyle: "",
				visible: true
			}
		],
		items: [],
		test: null,
		bordered: false,
		condensed: true,
		hover: false,
		striped: false,
		myClass: "agent-systray-table-details"
	}});

	popup.item({ containerProjects: {
		type: e.item.type.container,
		auto: false,
		parent: "pgProjects",
		fluid: true
	}});

	popup.item({ row46: {
		type: e.item.type.row,
		auto: false,
		parent: "containerProjects"
	}});

	popup.item({ col56: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row46"
	}});

	popup.item({ containerHeaderProjects: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col56",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row27: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderProjects",
		rowType: e.item.rowType.None,
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None
	}});

	popup.item({ col46: {
		type: e.item.type.column,
		auto: false,
		parent: "row27",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btProjectCancel: {
		type: e.item.type.button,
		parent: "col46",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col30: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row27"
	}});

	popup.item({ itemProjectsTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col30",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.projects,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col66: {
		type: e.item.type.column,
		auto: false,
		parent: "row27",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ row5: {
		type: e.item.type.row,
		auto: false,
		parent: "containerProjects"
	}});

	popup.item({ col5: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row5"
	}});

	popup.item({ projectList: {
		type: e.item.type.list,
		auto: true,
		items: [],
		parent: "col5",
		textSize: e.item.textSize.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-project-list"
	}});

	popup.item({ row6: {
		type: e.item.type.row,
		auto: false,
		parent: "containerProjects"
	}});

	popup.item({ col6: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row6"
	}});

	popup.item({ itemEmptyProjectListLabel: {
		type: e.item.type.item,
		textSize: e.item.textSize.None,
		parent: "col6",
		alignment: e.item.alignment.Center,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.noAvailableProject,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		visible: false
	}});

	popup.item({ row47: {
		type: e.item.type.row,
		auto: false,
		parent: "containerProjects",
		rowType: e.item.rowType.None,
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None,
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col57: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row47"
	}});

	popup.item({ containerMenuProjects: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "col57",
		background: e.item.style.None,
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ row54: {
		type: e.item.type.row,
		auto: false,
		parent: "containerMenuProjects"
	}});

	popup.item({ col74: {
		type: e.item.type.column,
		auto: false,
		parent: "row54",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 3
	}});

	popup.item({ col73: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 9,
		parent: "row54"
	}});

	popup.item({ containerProjectModeSelect: {
		type: e.item.type.container,
		fluid: true,
		auto: false,
		parent: "col73",
		background: e.item.style.None,
		myClass: "container-project-mode-select"
	}});

	popup.item({ btHelpProjectMode: {
		type: e.item.type.button,
		parent: "containerProjectModeSelect",
		value: "",
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.questionSign,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-help-button project-mode-help-btn",
		myStyle: ""
	}});

	popup.item({ projectModeSelect: {
		type: e.item.type.select,
		label: "",
		items: [
			{
				id: "manual",
				value: GLOBAL.labels.systray.manualProjectAssignment
			},
			{
				id: "auto",
				value: GLOBAL.labels.systray.autoProjectAssignment
			}
		],
		test: [
			{
				id: "manual",
				value: GLOBAL.labels.systray.manualProjectAssignment
			},
			{
				id: "auto",
				value: GLOBAL.labels.systray.autoProjectAssignment
			}
		],
		auto: true,
		saveAsHtml: false,
		parent: "containerProjectModeSelect",
		size: e.item.size.Small,
		multiple: false,
		iconStyle: e.item.style.None,
		inputStyle: e.item.inputStyle.None,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		myClass: "agent-systray-project-mode-select"
	}});

	popup.item({ containerSettings: {
		type: e.item.type.container,
		auto: false,
		parent: "pgSettings",
		fluid: true
	}});

	popup.item({ row40: {
		type: e.item.type.row,
		auto: false,
		parent: "containerSettings"
	}});

	popup.item({ col50: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row40"
	}});

	popup.item({ containerHeaderSettings: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col50",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row26: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderSettings"
	}});

	popup.item({ col47: {
		type: e.item.type.column,
		auto: false,
		parent: "row26",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btSettingsBack: {
		type: e.item.type.button,
		parent: "col47",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col28: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row26"
	}});

	popup.item({ itemSettingsTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col28",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.settings,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col60: {
		type: e.item.type.column,
		auto: false,
		parent: "row26",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ row13: {
		type: e.item.type.row,
		auto: false,
		parent: "containerSettings",
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col14: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row13",
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None
	}});

	popup.item({ containerMenuSettings: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "col14",
		background: e.item.style.None,
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ btSettingsSave: {
		type: e.item.type.button,
		parent: "containerMenuSettings",
		value: GLOBAL.labels.systray.saveSettings,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: true,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: ""
	}});

	popup.item({ row53: {
		type: e.item.type.row,
		auto: false,
		parent: "containerSettings"
	}});

	popup.item({ col72: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row53"
	}});

	popup.item({ containerContentSettings: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col72",
		myClass: "agent-systray-content-container"
	}});

	popup.item({ row37: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentSettings"
	}});

	popup.item({ col21: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row37"
	}});

	popup.item({ chAutoRestartAgent: {
		type: e.item.type.checkbox,
		parent: "col21",
		inline: true,
		items: [
			{
				id: "chAutoRestart",
				value: GLOBAL.labels.systray.autoRestart,
				checked: false,
				disabled: false,
				style: e.item.style.Blue,
				myClass: "",
				myStyle: ""
			}
		],
		auto: true,
		style: e.item.style.Grey,
		size: e.item.size.Medium,
		myClass: ""
	}});

	popup.item({ row3: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentSettings"
	}});

	popup.item({ col3: {
		type: e.item.type.column,
		auto: false,
		xs: 12,
		sm: 12,
		md: 12,
		lg: 12,
		parent: "row3"
	}});

	popup.item({ language: {
		type: e.item.type.select,
		label: GLOBAL.labels.systray.language,
		items: [],
		test: [],
		auto: true,
		saveAsHtml: false,
		parent: "col3",
		size: e.item.size.Medium,
		multiple: false,
		iconStyle: e.item.style.None,
		inputStyle: e.item.inputStyle.None,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		myClass: ""
	}});

	popup.item({ row48: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentSettings"
	}});

	popup.item({ col67: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row48"
	}});

	popup.item({ envList: {
		type: e.item.type.select,
		parent: "col67",
		iconSide: e.item.side.left,
		label: GLOBAL.labels.systray.environmentList,
		icon: e.item.icon.none,
		items: [],
		test: "",
		auto: true,
		iconStyle: e.item.style.None,
		inputStyle: e.item.inputStyle.None,
		size: e.item.size.Medium,
		visible: false
	}});

	popup.item({ row21: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentSettings"
	}});

	popup.item({ col24: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row21"
	}});

	popup.item({ alertSettingsChange: {
		type: e.item.type.alert,
		parent: "col24",
		style: e.item.style.Red,
		close: false,
		value: GLOBAL.labels.systray.requestRestart,
		test: "",
		auto: true,
		visible: false,
		myClass: "agent-systray-alert"
	}});

	popup.item({ containerTenants: {
		type: e.item.type.container,
		auto: false,
		parent: "pgTenants",
		fluid: true
	}});

	popup.item({ row41: {
		type: e.item.type.row,
		auto: false,
		parent: "containerTenants"
	}});

	popup.item({ col51: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row41"
	}});

	popup.item({ containerHeaderTenants: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col51",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row29: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderTenants"
	}});

	popup.item({ col41: {
		type: e.item.type.column,
		auto: false,
		parent: "row29",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btTenantBack: {
		type: e.item.type.button,
		parent: "col41",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col32: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row29"
	}});

	popup.item({ itemTenantsTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col32",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.tenants,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col61: {
		type: e.item.type.column,
		auto: false,
		parent: "row29",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ row8: {
		type: e.item.type.row,
		auto: false,
		parent: "containerTenants"
	}});

	popup.item({ col8: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row8"
	}});

	popup.item({ tenantList: {
		type: e.item.type.list,
		parent: "col8",
		footer: "",
		auto: true,
		items: [
			{
				id: "ten1",
				value: "<b>Orsay Master</b><br/>ipa-deploy-orsay2-approuter...",
				title: "",
				style: e.item.style.Cyan,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: "ACTIVE",
				badgeStyle: e.item.style.None,
				disabled: false,
				active: false,
				href: "",
				tooltip: "",
				tooltipPlacement: e.item.side.none,
				myClass: "",
				myStyle: ""
			},
			{
				id: "ten2",
				value: "<b>Master nightly</b><br/>ipa-deploy-master1-approuter...",
				title: "",
				style: e.item.style.Grey,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: null,
				badgeStyle: e.item.style.None,
				disabled: false,
				active: false,
				href: "",
				tooltip: "",
				tooltipPlacement: e.item.side.none,
				myClass: "",
				myStyle: ""
			}
		],
		textSize: e.item.textSize.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-tenant-li"
	}});

	popup.item({ row7: {
		type: e.item.type.row,
		auto: false,
		parent: "containerTenants",
		rowType: e.item.rowType.None,
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None,
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col7: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row7",
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None
	}});

	popup.item({ containerMenuTenants: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "col7",
		background: e.item.style.None,
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ btTenantRestart: {
		type: e.item.type.button,
		parent: "containerMenuTenants",
		value: GLOBAL.labels.systray.restartTenant,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: true,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None
	}});

	popup.item({ btTenantAdd: {
		type: e.item.type.button,
		parent: "containerMenuTenants",
		value: GLOBAL.labels.systray.addTenant,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-with-border"
	}});

	popup.item({ btTenantEdit: {
		type: e.item.type.button,
		parent: "containerMenuTenants",
		value: GLOBAL.labels.systray.editTenant,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: true,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-with-border"
	}});

	popup.item({ btTenantDelete: {
		type: e.item.type.button,
		parent: "containerMenuTenants",
		value: GLOBAL.labels.systray.deleteTenant,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: true,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-red-with-border"
	}});

	popup.item({ containerTenantAddEdit: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "pgTenantAddEdit"
	}});

	popup.item({ row42: {
		type: e.item.type.row,
		auto: false,
		parent: "containerTenantAddEdit"
	}});

	popup.item({ col52: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row42"
	}});

	popup.item({ containerHeaderTenantAddEdit: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col52",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row22: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderTenantAddEdit"
	}});

	popup.item({ col42: {
		type: e.item.type.column,
		auto: false,
		parent: "row22",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btTenantCancel: {
		type: e.item.type.button,
		parent: "col42",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col25: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row22"
	}});

	popup.item({ itemTenantAddEditTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col25",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: "",
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col62: {
		type: e.item.type.column,
		auto: false,
		parent: "row22",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ row10: {
		type: e.item.type.row,
		auto: false,
		parent: "containerTenantAddEdit",
		rowType: e.item.rowType.None,
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None,
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col11: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row10",
		alignment: e.item.alignment.None,
		alignmentVertical: e.item.alignmentVertical.None
	}});

	popup.item({ containerMenuTenantAddEdit: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "col11",
		background: e.item.style.None,
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ btTenantSave: {
		type: e.item.type.button,
		parent: "containerMenuTenantAddEdit",
		value: GLOBAL.labels.systray.saveTenant,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None
	}});

	popup.item({ btCancel_NoTenantFile: {
		type: e.item.type.button,
		parent: "containerMenuTenantAddEdit",
		value: GLOBAL.labels.systray.cancel,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		visible: false,
		myClass: "agent-systray-transparent-btn-with-border"
	}});

	popup.item({ row19: {
		type: e.item.type.row,
		auto: false,
		parent: "containerTenantAddEdit"
	}});

	popup.item({ col17: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row19"
	}});

	popup.item({ containerContentTenantAddEdit: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col17",
		myClass: "agent-systray-content-container"
	}});

	popup.item({ row36: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentTenantAddEdit"
	}});

	popup.item({ col20: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row36"
	}});

	popup.item({ itemNoTenantFileAddTenant: {
		type: e.item.type.item,
		textSize: e.item.textSize.None,
		parent: "col20",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.enterTenantNameUrl,
		visible: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey
	}});

	popup.item({ row9: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentTenantAddEdit"
	}});

	popup.item({ col10: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row9"
	}});

	popup.item({ tenantName: {
		type: e.item.type.text,
		icon: e.item.icon.none,
		iconStyle: e.item.style.None,
		iconSide: e.item.side.left,
		label: GLOBAL.labels.systray.name,
		test: "",
		inputStyle: e.item.inputStyle.None,
		placeholder: "",
		parent: "col10",
		auto: true
	}});

	popup.item({ row1: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentTenantAddEdit"
	}});

	popup.item({ col9: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row1"
	}});

	popup.item({ tenantDomain: {
		type: e.item.type.textarea,
		test: "",
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		label: GLOBAL.labels.systray.domain,
		placeholder: "",
		myClass: "agent-systray-textarea",
		parent: "col9",
		iconStyle: e.item.style.None,
		rows: 2,
		auto: true
	}});

	popup.item({ row50: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentTenantAddEdit"
	}});

	popup.item({ col69: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row50"
	}});

	popup.item({ alertTenantAddEditInfo: {
		type: e.item.type.alert,
		parent: "col69",
		style: e.item.style.Red,
		close: false,
		value: GLOBAL.labels.systray.tenantValidationInProgress,
		test: "",
		auto: true,
		visible: false,
		myClass: "agent-systray-alert"
	}});

	popup.item({ containerDiagnostic: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "pgDiagnostic"
	}});

	popup.item({ row43: {
		type: e.item.type.row,
		auto: false,
		parent: "containerDiagnostic"
	}});

	popup.item({ col53: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row43"
	}});

	popup.item({ containerHeaderDiagnostic: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col53",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row20: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderDiagnostic"
	}});

	popup.item({ col43: {
		type: e.item.type.column,
		auto: false,
		parent: "row20",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btDiagnosticCancel: {
		type: e.item.type.button,
		parent: "col43",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col23: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row20"
	}});

	popup.item({ itemDiagnosticTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col23",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.diagnostic.diag,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col63: {
		type: e.item.type.column,
		auto: false,
		parent: "row20",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ row18: {
		type: e.item.type.row,
		auto: false,
		parent: "containerDiagnostic",
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col22: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row18"
	}});

	popup.item({ containerMenuDiagnostic: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "col22",
		background: e.item.style.None,
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ btDiagnosticRecordTraces: {
		type: e.item.type.button,
		parent: "containerMenuDiagnostic",
		value: GLOBAL.labels.systray.diagnostic.start,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true
	}});

	popup.item({ row51: {
		type: e.item.type.row,
		auto: false,
		parent: "containerDiagnostic"
	}});

	popup.item({ col70: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row51"
	}});

	popup.item({ containerContentDiagnostic: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col70",
		myClass: "agent-systray-content-container"
	}});

	popup.item({ row17: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentDiagnostic"
	}});

	popup.item({ col19: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row17"
	}});

	popup.item({ itemDiagnosticText: {
		type: e.item.type.item,
		textSize: e.item.textSize.None,
		parent: "col19",
		alignment: e.item.alignment.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.diagnostic.initRecording,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey
	}});

	popup.item({ row30: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentDiagnostic"
	}});

	popup.item({ col33: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row30"
	}});

	popup.item({ containerIncludeScreenshots: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col33"
	}});

	popup.item({ btHelpIncludeScreenshots: {
		type: e.item.type.button,
		parent: "containerIncludeScreenshots",
		value: "",
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.questionSign,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-help-button-no-margin-left",
		myStyle: ""
	}});

	popup.item({ chIncludeScreenshots: {
		type: e.item.type.checkbox,
		parent: "containerIncludeScreenshots",
		label: "",
		inline: true,
		items: [
			{
				id: "chIncludeScreenshotsItem",
				value: GLOBAL.labels.systray.diagnostic.screenshot,
				checked: false,
				disabled: false,
				style: e.item.style.Blue,
				myClass: "",
				myStyle: ""
			}
		],
		auto: true,
		style: e.item.style.Grey,
		size: e.item.size.Medium
	}});

	popup.item({ row28: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentDiagnostic"
	}});

	popup.item({ col31: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row28"
	}});

	popup.item({ containerDiagnosticComment: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col31"
	}});

	popup.item({ btHelpDiagnosticComment: {
		type: e.item.type.button,
		parent: "containerDiagnosticComment",
		value: "",
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.questionSign,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		auto: true,
		tooltipPlacement: e.item.side.none,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-help-button-no-margin-left",
		myStyle: ""
	}});

	popup.item({ diagnosticComment: {
		type: e.item.type.textarea,
		test: "",
		icon: e.item.icon.none,
		iconSide: e.item.side.right,
		label: "",
		placeholder: "Comment",
		myClass: "agent-systray-textarea",
		iconStyle: e.item.style.None,
		inputStyle: e.item.inputStyle.None,
		parent: "containerDiagnosticComment",
		auto: true,
		feedbackIcon: e.item.icon.none,
		size: e.item.size.Medium
	}});

	popup.item({ btDiagnosticInsertComment: {
		type: e.item.type.button,
		parent: "containerDiagnosticComment",
		value: GLOBAL.labels.systray.diagnostic.addCommentButton,
		tooltip: "",
		style: e.item.style.Cyan,
		icon: e.item.icon.none,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: true,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-btn-right"
	}});

	popup.item({ containerJobProgress: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "pgJobProgress"
	}});

	popup.item({ row44: {
		type: e.item.type.row,
		auto: false,
		parent: "containerJobProgress"
	}});

	popup.item({ col54: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row44"
	}});

	popup.item({ containerHeaderJobProgress: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col54",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row33: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderJobProgress"
	}});

	popup.item({ col44: {
		type: e.item.type.column,
		auto: false,
		parent: "row33",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btJobProgressCancel: {
		type: e.item.type.button,
		parent: "col44",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col36: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row33"
	}});

	popup.item({ itemJobProgressTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col36",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.jobProgress,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col64: {
		type: e.item.type.column,
		auto: false,
		parent: "row33",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ row23: {
		type: e.item.type.row,
		auto: false,
		parent: "containerJobProgress",
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col26: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row23"
	}});

	popup.item({ containerMenuJobProgress: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		parent: "col26",
		background: e.item.style.None,
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ row24: {
		type: e.item.type.row,
		auto: false,
		parent: "containerJobProgress"
	}});

	popup.item({ col27: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row24"
	}});

	popup.item({ tableJobProgress: {
		type: e.item.type.table,
		showHeader: true,
		title: "",
		parent: "col27",
		style: e.item.style.Cyan,
		auto: true,
		columns: [
			{
				value: GLOBAL.labels.systray.jobStatusLabel,
				style: e.item.style.Grey,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				colWidth: 1,
				alignment: e.item.alignment.None,
				textTransform: e.item.textTransform.None,
				myClass: "",
				myStyle: "",
				visible: true
			},
			{
				value: GLOBAL.labels.systray.jobExecutionDate,
				style: e.item.style.Grey,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				colWidth: 2,
				alignment: e.item.alignment.None,
				textTransform: e.item.textTransform.None,
				myClass: "",
				myStyle: "",
				visible: true
			},
			{
				value: GLOBAL.labels.systray.jobName,
				style: e.item.style.Grey,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				colWidth: 9,
				alignment: e.item.alignment.None,
				textTransform: e.item.textTransform.None,
				myClass: "",
				myStyle: "",
				visible: true
			}
		],
		items: [],
		test: null,
		bordered: false,
		condensed: true,
		hover: true,
		striped: false,
		myClass: "agent-systray-table-job-progress"
	}});

	popup.item({ containerJobProgressDetails: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "pgJobProgressDetails"
	}});

	popup.item({ row45: {
		type: e.item.type.row,
		auto: false,
		parent: "containerJobProgressDetails"
	}});

	popup.item({ col55: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row45"
	}});

	popup.item({ containerHeaderJobProgressDetails: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col55",
		myClass: "agent-systray-header-container"
	}});

	popup.item({ row32: {
		type: e.item.type.row,
		auto: false,
		parent: "containerHeaderJobProgressDetails"
	}});

	popup.item({ col45: {
		type: e.item.type.column,
		auto: false,
		parent: "row32",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ btJobProgressDetailsCancel: {
		type: e.item.type.button,
		parent: "col45",
		value: "",
		tooltip: GLOBAL.labels.systray.back,
		style: e.item.style.Cyan,
		icon: e.item.icon.chevronLeft,
		iconSide: e.item.side.left,
		badge: "",
		badgeStyle: e.item.style.None,
		size: e.item.size.Small,
		close: false,
		submit: false,
		disabled: false,
		right: false,
		justified: false,
		fa: "",
		animated: false,
		pulse: false,
		tooltipPlacement: e.item.side.none,
		auto: true,
		iconStyle: e.item.style.None,
		myClass: "agent-systray-transparent-btn-white"
	}});

	popup.item({ col35: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 8,
		parent: "row32"
	}});

	popup.item({ itemJobProgressDetailsTitle: {
		type: e.item.type.item,
		textSize: e.item.textSize.H5,
		parent: "col35",
		alignment: e.item.alignment.None,
		textTransform: e.item.textTransform.None,
		icon: e.item.icon.none,
		value: GLOBAL.labels.systray.jobDetails,
		auto: true,
		tooltipPlacement: e.item.side.none,
		badgeStyle: e.item.style.None,
		style: e.item.style.Grey,
		myClass: "agent-systray-h5"
	}});

	popup.item({ col65: {
		type: e.item.type.column,
		auto: false,
		parent: "row32",
		xs: 0,
		sm: 0,
		md: 0,
		lg: 2
	}});

	popup.item({ row31: {
		type: e.item.type.row,
		auto: false,
		parent: "containerJobProgressDetails",
		myClass: "agent-systray-toolbar-row"
	}});

	popup.item({ col34: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row31"
	}});

	popup.item({ containerMenuJobProgressDetails: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col34",
		myClass: "agent-systray-footer-container"
	}});

	popup.item({ row52: {
		type: e.item.type.row,
		auto: false,
		parent: "containerJobProgressDetails"
	}});

	popup.item({ col71: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row52"
	}});

	popup.item({ containerContentJobDetails: {
		type: e.item.type.container,
		auto: false,
		fluid: true,
		background: e.item.style.None,
		parent: "col71",
		myClass: "agent-systray-content-container"
	}});

	popup.item({ row34: {
		type: e.item.type.row,
		auto: false,
		parent: "containerContentJobDetails"
	}});

	popup.item({ col37: {
		type: e.item.type.column,
		auto: false,
		xs: 0,
		sm: 0,
		md: 0,
		lg: 12,
		parent: "row34"
	}});

	popup.item({ tableJobDetails: {
		type: e.item.type.table,
		showHeader: false,
		title: "",
		tableHeight: null,
		parent: "col37",
		style: e.item.style.Cyan,
		auto: true,
		columns: [
			{
				value: "Name",
				style: e.item.style.Blue,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				colWidth: 4,
				alignment: e.item.alignment.None,
				textTransform: e.item.textTransform.None,
				myClass: "",
				myStyle: "",
				visible: true
			},
			{
				value: "Value",
				style: e.item.style.Grey,
				icon: e.item.icon.none,
				iconStyle: e.item.style.None,
				badge: "",
				badgeStyle: e.item.style.None,
				colWidth: 8,
				alignment: e.item.alignment.None,
				textTransform: e.item.textTransform.None,
				myClass: "",
				myStyle: "",
				visible: true
			}
		],
		items: [],
		test: null,
		bordered: false,
		condensed: true,
		hover: false,
		striped: false,
		myClass: "agent-systray-table-details"
	}});

}