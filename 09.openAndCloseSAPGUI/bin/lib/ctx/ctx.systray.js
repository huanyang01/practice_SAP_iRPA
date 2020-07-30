/**
 * @module       Systray and menu-bar management
 * @file         ctx/ctx.systray.js
 * @description
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @author      SAP Intelligent RPA R&D team
 * 
 */

GLOBAL.labels.set({
	menu: {
		autoRestart: { _comment:"Automatically start at Windows logon", _type:"XMIT", en:"Automatically start at Windows logon"},
    about: { _comment:"About menu item", _type:"XMIT", en:"About..." },
    start: { _comment:"Start menu item", _type:"XMIT", en:"Start" },
    restart: { _comment:"Restart menu item", _type:"XMIT", en:"Restart" },
		stop: { _comment:"Stop menu item", _type:"XMIT", en:"Shutdown" },
    stopRestart: { _comment:"Shutdown/Restart menu item", _type:"XMIT", en:"Shutdown / restart" },
    reportIncident: { _comment:"Incident report menu item", _type:"XMIT", en:"Report an incident" },
    recordTraces: { _comment:"Report traces menu item", _type:"XMIT", en:"Record traces" },
		languages: { _comment:"Language list menu item", _type:"XMIT", en:"Languages" },
		popupTests: { _comment:"Menu for testing popups (only displayed in debug mode)", _type:"XMIT", en:"Popup tests" }, // obsolete
		galaxyAPI: { _comment:"Menu for Galaxy interactions", _type:"XMIT", en:"Galaxy API" } // obsolete
	},
  aboutPopup: {
    title: { _comment:"About popup title", _type:"XTIT", en:"About..." },
    projectLabel: { _comment:"Project label", _type:"XFLD", en:"Project" },
    projectVersion: { _comment:"Project version", _type:"XFLD", en:"Project version" },
    productVersion: { _comment:"Product version", _type:"XFLD", en:"Product version" },
    studioVersion: { _comment:"Studio version", _type:"XFLD", en:"Studio version" },
    galaxyVersion: { _comment:"Galaxy version", _type:"XFLD", en:"Galaxy version" },
    galaxyURL: { _comment:"Galaxy URL", _type:"XFLD", en:"Galaxy URL" },
    licenceName: { _comment:"Licence name", _type:"XFLD", en:"Licence name" },
    licenceId: { _comment:"Licence ID", _type:"XFLD", en:"Licence id" },
    machine: { _comment:"Machine", _type:"XFLD", en:"Machine" },
    user: { _comment:"User", _type:"XFLD", en:"User" },
    date: { _comment:"Date", _type:"XFLD", en:"Date" },
    serialNumber: { _comment:"Serial number", _type:"XFLD", en:"Serial number" },
    environment: { _comment:"Environment", _type:"XFLD", en:"Environment" },
    frameworkVersion: { _comment:"SDK Version", _type:"XFLD", en:"SDK version" }
  },
	env: {
		envList: { _comment: "List of environments", _type: "XFLD", en: "Environments"},
		none: { _comment: "No environment", _type: "XFLD", en:"All" },
		prod: { _comment: "Production environment", _type: "XFLD", en:"Production" },
		qual: { _comment: "Qualification environment", _type: "XFLD", en:"Qualification" },
		test: { _comment: "Test environment", _type: "XFLD", en:"Test" },
		dev: { _comment: "Development environment", _type: "XFLD", en:"Development" }
	},
  systray: {
	  agentStatus: {
      AwaitingAutomation: { _comment:"Awaiting to start an automation", _type:"XFLD", en:"Awaiting to start an automation" },
      AwaitingProject: { _comment:"Awaiting project or job assignment ", _type:"XFLD", en:"Awaiting project assignment" },
		  Idle : { _comment:"Idle agent status", _type:"XFLD", en:"Idle" },
		  Ready : { _comment:"Ready agent status", _type:"XFLD", en:"Ready" },
		  Paused : { _comment:"Idle agent status when we are with default project", _type:"XFLD", en:"Idle" },
		  Warning : { _comment:"Warning agent status", _type:"XFLD", en:"Warning" },
		  Error : { _comment:"Error agent status", _type:"XFLD", en:"Error" },
		  Running : { _comment:"Running agent status", _type:"XFLD", en:"Running" }
		},
	  status: {
		  New : { _comment:"New job status", _type:"XFLD", en:"New" },
		  Running : { _comment:"Running job status", _type:"XFLD", en:"Running" },
		  Pending : { _comment:"Pending job status", _type:"XFLD", en:"Pending" },
		  Canceled : { _comment:"Canceled job status", _type:"XFLD", en:"Canceled" },
		  Successful : { _comment:"Successful job status", _type:"XFLD", en:"Successful" },
			Rejected : { _comment:"Rejected job status", _type:"XFLD", en:"Rejected" },
		  Failed : { _comment:"Failed job status", _type:"XFLD", en:"Failed" }
    },
    tenantNameNotUnique: { _comment:"Tenant name is not unique", _type:"XFLD", en:"Tenant name is not unique" },
    tenantNameNoSpecialCharacters: { _comment:"Tenant name must not contain special characters", _type:"XFLD", en:"Tenant name must not contain special characters" }
	}
});


/**
 * @ignore
 * @summary   map of systrays and menubars
 * @path      ctx.systrays
 * @type      {Object}
 */
ctx.systrays = {};

/**
 * Class ctx.systray
 * @class        ctx.systray
 * @description  Class used to manage systray and menu bar\\
 *  \\
 *  <wrap help> //Example://</wrap>
 *  <code javascript>systray = ctx.systray( 'systray', GLOBAL );</code>
 *  For a general overview about 'Systray', see [[:pg:gui.systray|Systray and menu-bar management]].
 * @param       {string} [name] Systray name (by default, 'systray' is used)
 * @param       {ctx.application} [parentProcess] parent Process object (by default, 'GLOBAL' is used)
 * @return      {ctx.systrayClass} Systray object
 * @path        ctx.systray
 */
ctx.systray = function (name, parentProcess) {
  name = name || 'SYSTRAY1';
  if (!ctx.systrays[name])
    ctx.systrays[name] = new ctx.systrayClass(name, parentProcess); // create new
  return ctx.systrays[name];
}

/** Options for the 'ctx.systray' library
* @path ctx.options.systray
* @class ctx.options.systray
* @struct
*/
ctx.options.systray = {
	/** Trace level
	* @property {e.trace.level} traceLevel
	* @path ctx.options.systray.traceLevel */ traceLevel: e.trace.level.None
};


/**
 * @class       ctx.systrayClass
 * @summary     Class implementing the systray or menu bar object
 * @description Class implementing the systray or menu bar object\\
 * \\
 * <wrap help> //Example://</wrap>
<code javascript>
ctx.systrays[name] = new ctx.systrayClass( name, parentProcess );
</code>
 * @path        ctx.systrayClass
 * @constructor
 * @advanced
 * @param       {string} name Systray name
 * @param       {ctx.application} [parentProcess] parent Process object (by default, 'GLOBAL' is used)
 */
ctx.systrayClass = function (name, parentProcess) {
	var _systray = this;
  /** @type {WScriptShell} */ var _shellObj = null;
 /**
  * @ignore
  * @const
  * @path ctx.systrayClass.ctxType
  * @property {string} ctxType  */ this.ctxType = 'ctx.systrayClass';
	/** @type {Object} */ var _options = ctx.options.systray;
  /** @type {ctx.page} */ var _page = null; // embedded page object
  /** @type {ctx.application} */ var _parentProcess = (parentProcess || GLOBAL); // parent process
  /** systray name
  * @path ctx.systrayClass.name
  * @advanced
  * @property {string} name  */ this.name = name;
  /** @type {Object} */ var _items = {};
  /** @type {Object} */ var _images = {};
  /** @type {boolean} */ var _bCreated = false;
  /** @type {string} */ var _defaultIconId = '';
  /** @type {string} */ var _defaultLabel = '';
  /** @type {number} */ var _timerObj = 0;
  /** @type {boolean} */ var _alternativeIcon = false;
  /** @type {number} */ var _maxIdLength = 48;
  /** @type {boolean} */ var _newMode = true;
  /** @type {boolean} */ var _firstInit = true;
	/** @type {boolean} */ var _pendingMenuUpdate = false;
	/** @type {ctx.popupClass} */ var _popup = null;
	/** @type {boolean} */ var _languageMenuInitDone = false;

	/** @type {Array} */ var _projectList = [];
	/** @type {Array} */ var _environmentList = [];
	/** @type {Array} */ var _tenantList = [];
	/** @type {Array} */ var _languageList = [];
	/** @type {Array} */ var _aboutData = [];
  /** @type {string} */ var _currentProjectUid = '';

	/** @type {string} */ var _autoRestartKey = 'HKCU\\Software\\SAP\\Intelligent RPA\\Desktop Agent\\AutoRestart';
	/** @type {string} */ var _autoSwitchKey = 'HKCU\\Software\\SAP\\Intelligent RPA\\Desktop Agent\\AutoSwitch';
	/** @type {string} */ var _currentEnvironmentKey = 'HKCU\\Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentEnvironment';
	/** @type {string} */ var _lastAttendedProjectVersion = 'HKCU\\Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProjectVersion';
	/** @type {string} */ var _lastAttendedProject = 'HKCU\\Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProject';
	/** @type {string} */ var _lastAttendedProjectEnvironment = 'HKCU\\Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProjectEnvironment';	

	/** @type {e.agentStatus} */ var _agentStatus = e.agentStatus.None;
	/** @type {string} */ var _statusLabel = "";
	/** @type {string} */ var _statusDescription = "";

	var _persistedStatus = e.agentStatus.None;
	var _persistedLabel = '';
	var _persistedDescription = '';
	
  var _nbJobsRunning = 0;
  
  var _bSystrayFocusOutEventBound = false;

	
	/**
	* @param {Array} [menuList]
	* @param {string} [parentId]
	*/
  var _calculateMenuItems = function (menuList, parentId) {
		// *** main menu ***
		parentId = parentId || '';
		ctx.each(_items, function(id, it) {
      if (it.parentId == parentId) {
				var menu = {
					id: it.id,
					name: it.label,
					checked: false,
					icon: it.iconId
				};
				ctx.each(_items, function(id2, it2) {
	        if (it2.parentId == it.id) {
						menu.content = [];
						_calculateMenuItems(menu.content, it.id);
						return false;
					}
				});
				menuList.push(menu);
			}
		});
  }

	var _updateMenuItems = function () {
    var res = false;
		var menuList = [];
		if (_newMode && _popup) {
			_calculateMenuItems(menuList);
			if (!_pendingMenuUpdate && _popup.exist()) {
				_pendingMenuUpdate = true;
        setTimeout(function () {
					_pendingMenuUpdate = false;
					ctx.noNotify = true;
					_popup.execScript('updateMainMenu', menuList);
        }, 200);
			}
			res = true;
		}
    return res;
  }

  var _bindFocusOutEventInSystray = function() {
    if (_popup.exist() && !_bSystrayFocusOutEventBound) {
      _popup.execScript("_bindBlurEvent()");
      _bSystrayFocusOutEventBound = true;
    }
  }

  var _injectGlobalLabelsIntoSystray = function () {
    var res = false;
		if (_newMode && _popup) {
      if (_popup.exist()) {
        _popup.execScript('injectGlobalLabelsIntoSystray', GLOBAL.labels);
      }
      res = true;
    }
    return res;
  }

  var _loadSystraySettings = function () {
    var res = false;
		if (_newMode && _popup) {
      if (_popup.exist()) {
        _popup.execScript('loadSystraySettings()');
      }
      res = true;
    }
    return res;
  }

  var _initializeSystray = function () {
    var res = false;
		if (_newMode && _popup) {
      if (_popup.exist()) {
        _popup.execScript('initializeSystray()');
      }
      res = true;
    }
    return res;
  }

  var _loadImages = function () {
    var res = false;
		if (_newMode && _popup) {
      for (var id in _images) {
        if (_popup.exist()) {
					ctx.noNotify = true;
          _popup.execScript('loadImage', id, _images[id]['filename']);
        }
      }
      res = true;
    }
    return res;
  }

  var _setInitialVariables = function ()  {
		ctx.lockNoNotify = true;
    // set variable _isStudioMode in popup
    _sendSDKVariableToPopup('setIsStudioMode', ctx.isStudioUsed());
    //set variable _currentLanguage in popup
    _sendSDKVariableToPopup('setCurrentLanguage', GLOBAL.labels.GetI18NCurrentLang());
    // set variable _isTrialMode in popup
    _systray.refreshTrialMode();
    var _autorestart = ctx.registry.get(_autoRestartKey);
		if (_autorestart == undefined) {
			_autorestart = true;
			ctx.registry.set(_autoRestartKey, _autorestart);
		}
		var _autoswitch = ctx.registry.get(_autoSwitchKey);
		if (_autoswitch == undefined) {
			_autoswitch = false;
			ctx.registry.set(_autoSwitchKey, _autoswitch);
		}		
		//set variable _isAutoRestartEnabled in popup
    _sendSDKVariableToPopup('setIsAutoRestartEnabled', _autorestart);
    //set variable _isAutoSwitchEnabled in popup
    _sendSDKVariableToPopup('setIsAutoSwitchEnabled', _autoswitch);
		ctx.lockNoNotify = false;
  }

  var _updateUIDynamicElements = function () {
		ctx.lockNoNotify = true;
    // *** ABOUT infos ***
    _systray.updateAbout();//must be before updateProjectList
    // *** language list ***
    _systray.updateLanguageList();
    // *** tenant list ***
    _systray.updateTenantList();
    // *** project list ***
    _systray.updateProjectList();
    // *** Main menu ***
    _updateMenuItems();//must be after updateProjectList
		ctx.lockNoNotify = false;
  }

  var _postUpdateUIDynamicElements = function () {
		ctx.lockNoNotify = true;
    var res= false;
	  if (_popup && _popup.exist()) {
	    _popup.execScript('postUpdate()');
	    res = true;
	  }
		ctx.lockNoNotify = false;
	  return res;
  }

  var _refreshContent = function () {   
		ctx.lockNoNotify = true;
    _loadImages();
    // 1. Set variables in popup
    _setInitialVariables();
    // 2. Update popup dynamic elements
    _updateUIDynamicElements();
    // 3. Update popup UI based on variable values
    _postUpdateUIDynamicElements();		
		
    // subscribe to systray events
		if (_popup) {
			var page = _popup.page();
	    //_parentProcess.addOn({evSystray: _onSystrayEventCallback});
			//_parentProcess.events.evSystray.internal = true;
	    page.addOn({ evSystray: _onSystrayEventCallback });
			page.events['evSystray'].internal = true;
		}
		ctx.lockNoNotify = false;
  }
	
  /**
	* @param {ctx.event} event
	*/
  var _onSystrayEventCallback = function (event) {
		ctx.log("systray event: " + event.data.name, e.logIconType.Info, event.data.value, _options);
	
    switch (event.data.name) {
      case 'SET_LANGUAGE':
        //GLOBAL.labels.setLanguage(event.data.value.language);
				GLOBAL.labels.SetI18NCurrentLang(event.data.value.language);
        break;
      case 'RESTART_ON_PROJECT':
				// Keep track of the last voluntary project change
				// This project will be started next time the agent will be started in attended mode
				ctx.registry.set(_lastAttendedProjectVersion, event.data.value['packageVersionUid']);
				ctx.registry.set(_lastAttendedProject, event.data.value['packageUid']);
				ctx.registry.set(_lastAttendedProjectEnvironment, event.data.value['environmentUid']);

				// Do the switch (different if back to default or a real project)
				if (event.data.value['packageVersionUid'] != '') {
					// ctx.wkMng.SwitchProject(event.data.value['packageUid'], event.data.value['packageVersionUid']);
					ctx.restartOnProject(event.data.value['packageUid'], event.data.value['packageVersionUid']);
				}
				else {
					ctx.shutdownAgent(true, true);
				}
        break;
      case 'RESTART_ON_TENANT':
        ctx.tenantManager.setCurrent(event.data.value['tenantId']);
        if (!event.data.value['firstTenantRegistration']) {
					// When the user selects another tenant, the current project version has no sense for the new tenant
					// To avoir problems when the user will want to restart, being on the target tenant, we remove the last attended project version value
					ctx.registry.set(_lastAttendedProjectVersion, '');

					ctx.shutdownAgent(true, true);
        }
        break;
      case 'ADD_EDIT_TENANT':
        var tenantId = event.data.value['tenantId'];
        var tenantName = event.data.value['tenantName'];
        var tenantUrl = event.data.value['tenantUrl'];
        var sErrorMsg = ctx.tenantManager.checkTenantName(tenantId, tenantName, event.data.value['isTenantToAdd']);//check tenant name
        if (sErrorMsg !== '') {
          _systray.onFailureAddEditTenant(sErrorMsg);
          break;
        }
        var checkTenantUrlJSON = ctx.tenantManager.checkURL(tenantUrl);//check tenant url        
        if (checkTenantUrlJSON['isValid']) {
          ctx.tenantManager.save(tenantId, tenantName, tenantUrl);
          _systray.onSuccessAddEditTenant(tenantId, tenantName, tenantUrl);          
          if (event.data.value['firstTenantRegistration']) {
            ctx.tenantManager.notifyAgentFirstTenantFileCreated(tenantId, tenantName, tenantUrl);
          }
        } else {
          _systray.onFailureAddEditTenant(checkTenantUrlJSON['errorLabel']);
        }
        break;
      case 'REMOVE_TENANT':
        ctx.tenantManager.remove(event.data.value['tenantId']);
        break;
      case 'START_RECORD_TRACES':
				ctx.options.trace.screenshotTraces = (event.data.value.includeScreenshots ? true : false);
				ctx.diagnostic.enableRecording(true, true, true);
        break;
      case 'STOP_RECORD_TRACES':
				if (!ctx.options.trace.recording) {
					ctx.diagnostic.enableRecording(true, true, true);
				}
				ctx.diagnostic.enableRecording(false, true, true);
        break;
      case 'INSERT_DIAGNOSTIC_COMMENT':
				ctx.notifyInfo(event.data.value['diagnosticComment'], 'comment');
        break;
      case 'LAUNCH_SCENARIO':
        _popup.show(false);
				_systray.notify(event.data.value.scenarioId);
        break;
      case 'RESTART_AGENT':
				var lastAttendProjectPackageUid = ctx.registry.get(_lastAttendedProject);
        var lastAttendProjectPackageVersionUid = ctx.registry.get(_lastAttendedProjectVersion);
        var unattended = ctx.registry.get(_autoSwitchKey);
        if ('undefined' !== typeof unattended && !unattended && 'undefined' !== typeof lastAttendProjectPackageUid && 'undefined' !== typeof lastAttendProjectPackageVersionUid && lastAttendProjectPackageUid !== '' && lastAttendProjectPackageVersionUid !== '') {
          ctx.restartOnProject(lastAttendProjectPackageUid, lastAttendProjectPackageVersionUid);
        } else {
          ctx.shutdownAgent(true, true);
        }
        break;
      case 'SHUTDOWN_AGENT':
				ctx.shutdownAgent(false, true);
        break;
      case 'SWITCH_AUTO_PROJECT':
				ctx.registry.set(_autoSwitchKey, event.data.value['isAutoSwitchEnabled']);
        break;
      case 'AUTO_RESTART_AGENT':
				ctx.registry.set(_autoRestartKey, event.data.value['isAutoRestartEnabled']);
        break;
      case 'HIDE_SYSTRAY':
        _popup.show(false);
        break;
      case 'SET_ENVIRONMENT':
        ctx.registry.set(_currentEnvironmentKey, event.data.value['envUid']);
        break;
      case 'SWITCH_MANUAL_AUTO':
        ctx.galaxyAPI.setMode( event.data.value['unattended'] ? e.agentMode.unattended : e.agentMode.attended);
        ctx.registry.set(_lastAttendedProjectVersion, '');
        ctx.registry.set(_lastAttendedProject, '');
        ctx.shutdownAgent(true, true);
        break;
      case 'OPEN_HELP_PORTAL':
        try {
          _shellObj = _shellObj || new ActiveXObject("WScript.Shell");
          _shellObj.Run('https://help.sap.com/viewer/82d5a2499d8449dda691bb4d5b3d7949/Cloud/en-US');
        } catch (ex) {
          ctx.log('Could not open default browser');
        }        
        break;
        break;
      default:
        break;
    }
  }
 
/**
 * Sends a variable to the popup
 * @param {string} functionName function defined in the popup to process the variable
 * @param {*} sdkVariable variable to send
 */
var _sendSDKVariableToPopup = function(functionName, sdkVariable) {
  var res= false;
  if (_popup && _popup.exist() && functionName && ('undefined' !== typeof sdkVariable)) {
		ctx.noNotify = true;
    _popup.execScript(functionName, sdkVariable);
    res = true;
  }
  return res;
}

/**
 * Displays old "About" popup
 */
var _showOldAboutPopup = function() {
	ctx.lockNoNotify = true;
	// standard About popup declaration
	if (!ctx.popups.pCtxtAbout) {
		ctx.popup({ pCtxtAbout: {
			template: e.popup.template.Ok,
			title:  GLOBAL.labels.aboutPopup.title,
			CX: 500,
			CY: 200,
			icon: e.popup.icon64.hello128
		}});
	}
	if (GLOBAL.labels.aboutPopup) {
		var label = "<H4>" + ctx.options.projectLabel + "</H4>" 
			+ GLOBAL.labels.aboutPopup.projectVersion + ": <b>" + ctx.options.projectVersion + "</b>&nbsp; (<b>" + ctx.options.projectDate + "</b>)<br/>" 
			+ GLOBAL.labels.aboutPopup.productVersion + ": <b>" + ctx.options.productVersion + "</b><br/>" 
			+ GLOBAL.labels.aboutPopup.frameworkVersion + ": <b>" + ctx.options.frameworkVersion + "</b><br/>";
		if (ctx.options.productVersions && ctx.options.productVersions['UnifiedStudio'])
			label += GLOBAL.labels.aboutPopup.studioVersion + ": <b>" + ctx.options.productVersions['UnifiedStudio'] + "</b><br/>" 
		if (ctx.options.serverVersion)
			label += GLOBAL.labels.aboutPopup.galaxyVersion + ": <b>" + ctx.options.serverVersion + "</b><br/>" 
		if (ctx.options.env != e.env.prod)
			label += GLOBAL.labels.aboutPopup.environment + ": <b>" + GLOBAL.labels.env[ctx.options.env] + "</b><br/>";
		ctx.popups.pCtxtAbout.open({
			message: label
		});
	}
	ctx.lockNoNotify = false;
}

/**
 * Legacy method to update the list of environments in the systray
 * @param {Array} availableEnvironmentList list of available environments
 * @param {boolean} bStudioMode studio mode
 */
var _updateEnvironmentListLegacy = function (availableEnvironmentList, bStudioMode) {
	ctx.lockNoNotify = true;
  if (bStudioMode) {
    var defaultEnv = '';
    var curEnvFound = false;
    var curEnv = ctx.registry.get(_currentEnvironmentKey);
    
    // Clear environment menu if exists
    try {
      systray.deleteMenu('mnuEnvironments');
      }
    catch(ex) {}
    
    if (availableEnvironmentList != undefined && availableEnvironmentList.length > 0) {

      // Get environments menu label (fallback to 'environments' if not found in internationalized strings)
      var mnuLabel = 'Environments';
      if (GLOBAL.labels.env['envList'] !== undefined) mnuLabel = GLOBAL.labels.env['envList'];

      // Create new environment menu
      systray.addMenu('', 'mnuEnvironments', mnuLabel);

      // Environment list
      ctx.each(availableEnvironmentList, function(id, val) {

        var shortEnvUid = val.environmentUid.replace(/-/g, '').trim();
        // Keep the first environmentID
        if (defaultEnv == '') defaultEnv = shortEnvUid;
        
        systray.addMenu('mnuEnvironments', shortEnvUid, val.name, function() {
          systray.check(curEnv, false);
          curEnv = shortEnvUid;
          systray.check(curEnv, true);
          ctx.registry.set(_currentEnvironmentKey, curEnv);
        });
        
        // Check the right environment (if found)
        if (shortEnvUid == curEnv) {
          systray.check(shortEnvUid, true);
          curEnvFound = true;
        }

      });
      
      // If no current environment has been found, check the first environment in the list
      if (!curEnvFound) {
        curEnv = defaultEnv;
        systray.check(defaultEnv, true);
        ctx.registry.set(_currentEnvironmentKey, curEnv);
      }
    }
  }
	ctx.lockNoNotify = false;
}

var _openPopupOnPosition = function (x, y, edge) {
  var XRelative;
  var YRelative;
  /* switch (edge) {
    case 'TOP':
    {
      XRelative = e.popup.position.Center;
      YRelative = e.popup.position.Bottom;
      break;
    }
    case 'RIGHT':
    {
      XRelative = e.popup.position.Left;
      YRelative = e.popup.position.Center;
      break;
    }
    case 'LEFT':
    {
      XRelative = e.popup.position.Right;
      YRelative = e.popup.position.Center;
      break;
    }
    case 'BOTTOM':
    default:
    {
      XRelative = e.popup.position.Center;
      YRelative = e.popup.position.Top;
      break;
    }
  } */
  _popup.open({
    visible: true,
    XRelative: e.popup.position.Center,
    YRelative: e.popup.position.Center,
    X : x,
    Y : y
  });
}

	
/**
  * Adds a menu in a systray or menu bar.
  * @method      addMenu
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// *** syntax 1 : menu declaration and menu handler in two different functions ***
// menu declaration
systray.addMenu( "", "evVersion", GLOBAL.labels.menu.about + " (MESSBOX)", "about" );
} );
...
// menu handler
systray.on( 'evVersion', function ( ev ) {
  // add your code here...
} );

// *** syntax 2 : menu declaration and menu handler in a single function ***
systray.addMenu( "ScnAppMenu", "evScnAppStartScn", "Start data collect", "", function( ev ) {
  var scn = ScnApp.scenarios.scCollectData.start( );
} );
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **systray.addMenu** + 'TAB' :
  *
<code javascript>
systray.addMenu( 'parent', 'event', 'text', 'image', function( ev ) {
  var data = { };
  ...
} );
</code>
  * </WRAP>
  * @path        ctx.systrayClass.addMenu
  * @param       {string} parentId Parent menu identifier (if empty, menu is a root menu)
  * @param       {string} id Event identifier (should be unique)
  * @param       {string} label Menu text
  * @param       {string|function(ctx.event)} [iconId] Icon identifier (loaded in ''ctx.systray.loadImage()''). If this parameter is a function, then icon is omitted and it represents the menu handler function
  * @param       {function(ctx.event)} [func] Menu handler function
  * @return      {*} Return value
  */
  this.addMenu = function (parentId, id, label, iconId, func) {
		ctx.lockNoNotify = true;
    var res = '';		
    id = String(id).substring(0, _maxIdLength);
    if (typeof iconId === 'function') {
      // iconId omitted
      func = iconId;
      iconId = '';
    }

    // skip action if a menu with the same id and parent exists
    if (_items[id] && _items[id].created && (_items[id].parentId == parentId))
      return res;

		if (_newMode) {
			// remove legacy items now managed in new systray
			switch (id) {
				case 'evCtxtAbout':
				case 'evCtxtShutdownRestart':
				case 'evCtxtStop':
				case 'evReportBug':
				case 'evRecordTraces':
				case 'evShowDiagRecorder':
				{
		      return res;
					break;
				}
				default: {
					break;
				}
			}
		}		
		
    // memorize parameters for later creation (in case page not yet created)
    _items[id] = _items[id] || {};
    _items[id].parentId = parentId,
    _items[id].id = id,
    _items[id].label = label,
    _items[id].iconId = iconId,
    _items[id].created = false
    if (func) { _items[id].func = func; }
    if (_bCreated) {
      // page created : add menu
      var evObj = {};
      evObj[id] = '';
      _page.addEvent(evObj);
      if ((!parentId) || (parentId === '') || (parentId === 'SYSTRAY1')){
        parentId = _systray.name; // give systray name to the root menu
      }
			if (_newMode && _popup) {
				_updateMenuItems();
			} else {
	      var desc = _page.getObjectDescriptor();
	      res = ctx.actionApp(desc, 'addMenu', 'ADDMENUITEM', parentId, id, '', label, iconId);
			}
      // if callback is defined, add a handler
      if (_items[id].func) {
        _systray.on(id, _items[id].func);
      }
      _items[id].created = true;
    }
		ctx.lockNoNotify = false;
    return res;
  }

 /**
  * @method      autoDisable
  * @summary     Auto-enables or auto-disables a menu item.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
systray.autoDisable( "evMenu1", true );
</code>
  * @path        ctx.systrayClass.autoDisable
  * @param       {string} id Menu identifer
  * @param       {boolean} [bAutoDisable] Auto-disable if ''true'' (default), auto-enable if ''false''
  * @return      {*} Return value
  * @private
  */
  this.autoDisable = function (id, bAutoDisable) {
    id = String(id).substring(0, _maxIdLength);
    if (_newMode && _popup) {
			if (_popup.exist()) {
        _popup.execScript('enableMenu', id, !bAutoDisable);//temporarily, perform same action as enable
      }
			return "";
		} else {
      return _systray.setParam(id, (bAutoDisable === false) ? 'NOAUTODISABLE' : 'AUTODISABLE');
    }    
  }

 /**
  * @method      check
  * @summary     Checks or unchecks a menu item.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
systray.check('evMenu1', true);
</code>
  * @path        ctx.systrayClass.check
  * @param       {string} id Menu identifer
  * @param       {boolean} [bCheck] Check if ''true'' (default), uncheck if ''false''
  * @return      {*} Return value
  */
  this.check = function (id, bCheck) {
    id = String(id).substring(0, _maxIdLength);
    if (_newMode && _popup) {
			if (_popup.exist()) {
				ctx.noNotify = true;
        _popup.execScript('check', id, (bCheck === false) ? false : true);
      }
			return "";
		} else {
      return _systray.setParam(id, (bCheck === false) ? 'UNCHECK' : 'CHECK');
    }
  }

 /**
  * @method      createBarMenu
  * @summary     Creates a menu bar.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript>menuBar.createBarMenu( ctx.options.projectName, "ICON1" );</code>
  * @path        ctx.systrayClass.createBarMenu
  * @param       {string} label Tooltip
  * @param       {string} [iconId] Icon identifier (default is "ICON1")
  * @param       {string} [iconType] Resource type (executable icon (ICON (default)) or external bitmap file (FILE))
  * @param       {string} [filename] Resource name or icon file
  * @param       {ctx.systrayClass} [theSystray] Systray object on which route all events
  * @return      {*} Return value
  */
  this.createBarMenu = function (label, iconId, iconType, filename, theSystray) {
		ctx.lockNoNotify = true;
    // dynamically create the page from ExpBar2 extended pilot
    if (!_page)
    _page = _parentProcess.createExtendedConnector(e.extendedConnector.ExpBar, _systray.name);
    if (!_defaultIconId) _defaultIconId = iconId || 'ICON1';
    if (!_defaultLabel) _defaultLabel = label;

    _bCreated = true;
    _systray.loadImage(iconId, iconType, filename);
    var desc = _page.getObjectDescriptor();
    var res = ctx.actionApp(desc, 'createBarMenu', 'CREATEBAR', _systray.name, '', '', label, iconId);
    var it = null;
    // later create menu items
    for (var id in _items) {
      it = _items[id];
      if (it.id && !it.created) {
        _systray.addMenu(it.parentId, it.id, it.label, it.iconId, it.func);
        it.created = true;
      }
    }
    if (theSystray && (theSystray instanceof ctx.systrayClass)) {
      // route all events on the 'systray' object
      var evCallback = {};
      evCallback[ctx.anyEvent] = function(ev) { theSystray.notify(ev.name); }
      _page.addOn( evCallback);
    }
		ctx.lockNoNotify = false;
    return res;
  }

	/**
	* Creates a menu with the list of languages
	* @description
	* __Ex.:__
<code javascript>
var result = systray.createLanguageMenu();
</code>
	* @method createLanguageMenu
	* @path ctx.systrayClass.createLanguageMenu
	*/
	this.createLanguageMenu = function() {
		var languages = GLOBAL.labels.GetI18NLangList();
		var curLang = GLOBAL.labels.GetI18NCurrentLang();

		if (!_languageMenuInitDone && languages && (!_systray.isNewMode())) {
			_languageMenuInitDone = true;
			_systray.addMenu('', 'evLangMenu', GLOBAL.labels.menu.languages || 'Languages');
			if ('object' === typeof languages) {
				ctx.each(languages, function(id, val) {
					_systray.addMenu('evLangMenu', 'evLang' + id, String(val), '', function(ev) {
						_systray.check('evLang' + curLang, false);
						GLOBAL.labels.SetI18NCurrentLang(id);
						curLang = id;
						_systray.check('evLang' + id, true);
						if ('undefined' !== typeof GLOBAL.labels.changeLanguagePopup) {
							ctx.popup('pChangeLanguagePopup').open({
		            template: e.popup.template.Ok,
		            title: GLOBAL.labels.changeLanguagePopup.title,
		            CX: 500,
		            CY: 180,
		            X : e.popup.position.Center,
		            Y : e.popup.position.Center,
		            message: GLOBAL.labels.changeLanguagePopup.changeInfo + val + "<br>" + GLOBAL.labels.changeLanguagePopup.requestRestart,
		            icon: e.popup.icon32.info,
								topMost: true
							});
						}
					});
					if (id == curLang) {
						_systray.check('evLang' + id, true);
					}
				});
			}				
		}
	}
		
 /**
  * @method      createSystrayMenu
  * @summary     Creates a systray.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript>systray.createSystrayMenu( ctx.options.projectName, "ICON1", "FILE", "/bmp/chart_pie.png" );</code>
  * @path        ctx.systrayClass.createSystrayMenu
  * @param       {string} label Tooltip text
  * @param       {string} [iconId] Icon identifier (default is "ICON1")
  * @param       {string} [iconType] Resource type (executable icon (ICON (default)) or external bitmap file (FILE))
  * @param       {string} [filename] Resource name or icon file
  * @param       {ctx.systrayClass} [theSystray] Systray object on which route all events
  * @return      {*} Return value
  */
  this.createSystrayMenu = function (label, iconId, iconType, filename, theSystray) {
		ctx.lockNoNotify = true;
		var minVersionNewMode = "1.0.5.1";
		if (_firstInit && _newMode && (ctx.compareVersion(minVersionNewMode) < 0)) {
			//fall back to systray old mode
      ctx.log('New systray mode requires minimum version ' + minVersionNewMode, e.logIconType.Warning);
			_newMode = false;
		}
		
    if (!_page)
      _page = _parentProcess.createExtendedConnector(e.extendedConnector.ExpBar, _systray.name);
		iconId = iconId || 'ICON1';
    if (!_defaultIconId) _defaultIconId = iconId;
    if (!_defaultLabel) _defaultLabel = label;

    _bCreated = true;
    var it = null;
    // later load icons
		ctx.each(_images, function(id, it) {
      if (it.id && !it.created) {
        _systray.loadImage(it.id, it.type, it.filename);
        it.created = true;
      }
		});
   _systray.loadImage(iconId, iconType, filename);
    var desc = _page.getObjectDescriptor();

		if (_firstInit && (ctx.compareVersion('1.0.4.51') >= 0)) {
			try {
					//remove first Systray with AutoStart setting menu
			    //If wrkMng does not contain HideSystrayAutoStart it will have a catched exception
			    ctx.wkMng.HideSystrayAutoStart();
			} catch(ex) {}
		}

    var res = ctx.actionApp(desc, 'createSystrayMenu', 'CREATESYSTRAY', _systray.name, '', '', label, iconId);

		if (!_newMode) {
			// add legacy About / Shutdown / Diagnostic menus
			if (!_items['evCtxtAbout']) {
				_systray.addMenu('', 'evCtxtAbout', GLOBAL.labels.menu.about, '', function (ev) {
					_showOldAboutPopup();
				});
			}
			if (!_items['evCtxtShutdownRestart']) {
				_systray.addMenu('', 'evCtxtShutdownRestart', GLOBAL.labels.menu.stopRestart, '', function(ev) {
					ctx.switchOrShutdown();
				});	
			}
			if (!_items['evReportBug']) {
				_systray.addMenu('', 'evReportBug', GLOBAL.labels.menu.reportIncident, '', function(ev) {
					ctx.diagnostic.showSubmitPopup();
				});
			}
			if (!_items['evRecordTraces']) {
				_systray.addMenu('', 'evRecordTraces', GLOBAL.labels.menu.recordTraces, '', function(ev) {
					ctx.diagnostic.showRecordInitPopup();
				});	
			}
			// Construct menu for available languages
			_systray.createLanguageMenu();

			if (ctx.compareVersion('1.0.4.51') >= 0) {
				try {
					/** @type {boolean} */ var isAutoRestartEnabled = (ctx.registry.get(_autoRestartKey) ? true : false);
					_systray.addMenu('', 'evAutoRestart', GLOBAL.labels.menu.autoRestart, function(ev) {
						isAutoRestartEnabled = !isAutoRestartEnabled;
						_systray.check('evAutoRestart', isAutoRestartEnabled);				
						ctx.registry.set(_autoRestartKey, isAutoRestartEnabled);
					});
					_systray.check('evAutoRestart', isAutoRestartEnabled);
				} catch(ex) {}
			}
		}
		

		// later create menu items
    for (var id in _items) {
      it = _items[id];
      if (it.id && !it.created) {
        _systray.addMenu(it.parentId, it.id, it.label, it.iconId, it.func);
        it.created = true;
      }
    }

    if (_firstInit) {
	    if (theSystray && (theSystray instanceof ctx.systrayClass)) {
	      // route all events on the main 'systray' object
	      var evCallback = {};
	      evCallback[ctx.anyEvent] = function(ev) { theSystray.notify(ev.name); }
	      _page.addOn( evCallback);
	    }

			// systray display notification
	    var evShowCallback = {};
	    evShowCallback[_systray.name] = function (ev) {
				if (ev && ev.data && _newMode && _popup) {
					var data = ctx.json.parse(ev.data);
          // show popup, update position, activate
					var edge = data['edge'];
					var X = data['mousex'];
          var Y = data['mousey'];
					
          _bindFocusOutEventInSystray();//SAPMLIPA-6406: systray focusout event needs to be bound at first user click, not before
          _openPopupOnPosition(X, Y, edge);					
				}
			}
      _page.addOn( evShowCallback);
			_page.events[_systray.name].internal = true;
			//display systray
			_systray.display();
		}

		_firstInit = false;
		ctx.lockNoNotify = false;
		return res;
  }

 /**
  * Deletes a menu item.
  * @method      deleteMenu
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
systray.deleteMenu( "evMenu1" );
</code>
  * @path        ctx.systrayClass.deleteMenu
  * @param       {string} id Menu identifer
  * @return      {*} Return value
  */
  this.deleteMenu = function (id) {
		ctx.lockNoNotify = true;
    var res = "";
		id = String(id).substring(0, _maxIdLength);
    var desc = _page.getObjectDescriptor();
    if (_items[id]) { 
			delete _items[id]; 
			if (_newMode && _popup) {
        if (_popup.exist()) {
          _popup.execScript('deleteMenu', id);
        }
				return "";
			} else {
		    res = ctx.actionApp(desc, 'deleteMenu', 'DELETE', id);
			}
		}
		ctx.lockNoNotify = false;
    return res;
  }

 /**
  * Displays the systray.
  * @method      display
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
systray.display( );
</code>
  * @path        ctx.systrayClass.display
  * @return      {*} Return value
  */
  this.display = function () {
		ctx.lockNoNotify = true;
		if (POPUPS && ('undefined' === typeof POPUPS.Systray)) {
			POPUPS.Systray = POPUPS.popup({ Systray: {
				template: e.popup.template.NoButton,
				url: "popup\\systray.html",
				CX: 400,
				CY: 480,
				X: e.popup.position.Right,
				Y: e.popup.position.Bottom,
				content: e.popup.content.Web,
				titleVisible: false,
				//IEHost: true,
				color: e.popup.color.None,
				XRelative: e.popup.position.None,
				YRelative: e.popup.position.None,
				display: e.popup.display.Main,
				systray: true,
				XSlide: e.popup.position.None,
        resizable: false
			}});
    }
		if (!_popup && POPUPS && ('undefined' !== typeof POPUPS.Systray)) {
			_popup = POPUPS.Systray;
    }
		if (_newMode && _popup) {
      if (_popup.exist()){//do not display if popup is already displayed
        return "";
      }
			_popup.open({ 
				visible: false 
			});
			_popup.wait(function(ev) {
        _injectGlobalLabelsIntoSystray();
        _loadSystraySettings();
        _initializeSystray();
				_refreshContent();
			});
		}
		ctx.lockNoNotify = false;
    return "";
  }

 /**
  * @method      enable
  * @summary     Enables or disables a menu item.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
systray.enable( "evMenu1", false );
</code>
  * @path        ctx.systrayClass.enable
  * @param       {string} id Menu identifer
  * @param       {boolean} [bEnable] Enable if ''true'' (default), disable if ''false''
  * @return      {*} Return value
  */
  this.enable = function (id, bEnable) {
		ctx.lockNoNotify = true;
		var res = '';
    id = String(id).substring(0, _maxIdLength);
		if (_newMode && _popup) {
			if (_popup.exist()) {
        _popup.execScript('enableMenu', id, bEnable);
      }
			res = "";
		} else {
	    res = _systray.setParam(id, (bEnable === false) ? 'DISABLE' : 'ENABLE');
		}
		ctx.lockNoNotify = false;
		return res;
  }

 /**
  * @method      enableNewMode
  * @summary     Enables or disables the new display mode.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
systray.enableNewMode( true );
</code>
  * @path        ctx.systrayClass.enableNewMode
  * @param       {boolean} [bEnable] Enable if ''true'' (default), disable if ''false''
  * @return      {*} Return value
  */
  this.enableNewMode = function (bEnable) {
	  _newMode = (bEnable === false) ? false : true;
  }

 /**
  * @method      isNewMode
  * @summary     Returns the display mode.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
if (systray.isNewMode()) { ... }
</code>
  * @path        ctx.systrayClass.isNewMode
  * @return      {boolean} display mode value
  */
  this.isNewMode = function () {
	  return _newMode ;
  }

 /**
  * @method      flashIcon
  * @summary     Triggers icon flashing.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
systray.flashIcon( "ICON2" );
</code>
  * @path        ctx.systrayClass.flashIcon
  * @param       {string} iconId Alternative icon identifier
  * @param       {number} [timer] Timer in ms (default is 2000 ms)
  * @param       {boolean} [enable] Activates or disables the flash effect
  */
  this.flashIcon = function (iconId, timer, enable) {
    timer = timer || 2000;
    if (enable) {
      _timerObj = setInterval(function() {
        _alternativeIcon = !_alternativeIcon;
        _systray.createSystrayMenu(_defaultLabel, (_alternativeIcon ? _defaultIconId : iconId));
      }, timer);
    } else {
      if (_timerObj)
        clearInterval(_timerObj);
      if (_alternativeIcon) {
        _alternativeIcon = false;
        _systray.createSystrayMenu(_defaultLabel, _defaultIconId);
      }
    }
  }

 /**
  * @method      loadImage
  * @summary     Loads a bitmap to be later used as icon in the systray or menu bar.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// Load icon, associated with id 'about'
systray.loadImage( "about", "FILE", e.popup.icon16.help );
...
// Use icon in menu
systray.addMenu( "", "evVersion", GLOBAL.labels.menu.about + " (MESSBOX)", "about");
});
</code>
  * @path        ctx.systrayClass.loadImage
  * @param       {string} [id] Image identifier
  * @param       {string} [type] Type: "FILE" or "ICON"
  * @param       {string} [filename] Image filename
  * @return      {boolean} ''true'' for success, otherwise ''false''
  */
  this.loadImage = function (id, type, filename) {
		ctx.lockNoNotify = true;
    id = id || 'ICON1'; // default 'Interactive' icon
    type = type || 'ICON';
    if (_images[id] && _images[id].created)
      return true;
    if (filename && (!ctx.fso.isPathAbsolute(filename))) {
      if ((!filename.startsWith('/')) && (!filename.startsWith('\\')))
        filename = '\\' + filename;
      filename = ctx.options.path.resources + filename;
    }
   //this.images[id] = id;
    // page not yet created : just memorize parameters for later creation
    _images[id] = {
      id: id,
      type: type,
      created: false,
      filename: filename
    };
    if (_bCreated) {
			if (_newMode && _popup) {
				if (_popup.exist()) {
          _popup.execScript('loadImage', id, filename);
        }
			}
      var desc = _page.getObjectDescriptor();
      var res = ctx.actionApp(desc, 'loadImage', 'LOADIMAGE', id, type, filename);
      _images[id].created = true;
      if (res != '')
        ctx.log('ctx.loadImage (' + id + '): ' + res, e.logIconType.Error);
    }
		ctx.lockNoNotify = false;
    return true;
  }

 /**
  * @method      notify
  * @summary     Triggers a menu action.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// Send an 'About...' menu notification
systray.notify( "evVersion" );
</code>
  * @path        ctx.systrayClass.notify
  * @param       {string} id Menu identifier
  * @return      {*} Action result
  */
  this.notify = function (id) {
    id = String(id).substring(0, _maxIdLength);
    return _page.notify(id);
  }

 /**
  * @method      on
  * @summary     Sets a callback handler on an menu action.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// 'About...' menu handler
systray.on( "evVersion", function ( ev ) {
  // add your code here
});
</code>
  * @path        ctx.systrayClass.on
  * @param       {string} id Menu identifer
  * @param       {function(ctx.event)} func Callback to be called on event reception
  * @return      {Object} Object to be provided to ''ctx.off()'' to disable listening
  */
  this.on = function (id, func) {
    // memorize parameters for later creation (in case page not yet created)
    id = String(id).substring(0, _maxIdLength);
    _items[id] = _items[id] || { };
    if (func) { _items[id].func = func; }
    if (_bCreated) {
      var evObj = {};
      evObj[id] = '';
      return ctx.on(_page.addEvent(evObj), func);
    }
    return null;
  }

 /**
  * @ignore
  * @method      setParam
  * @summary     Modifies a menu item (checks, disables, ...)
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript>systray.setParam( "evMenu1", "CHECK" );</code>
  * @private     internal use only!
  * @path        ctx.systrayClass.setParam
  * @param       {string} id Event id
  * @param       {string} state
  * @param       {string} [value]
  * @param       {string} [label]
  * @return      {*} Return value
  */
  this.setParam = function (id, state, value, label) {
    id = String(id).substring(0, _maxIdLength);
    var desc = _page.getObjectDescriptor();
    var evObj = {};
    evObj[id] = '';
    _page.addEvent(evObj);
		if (_newMode && _popup) {
			return "";
		} else {
	    return ctx.actionApp(desc, 'setParam', 'SETPARAM', id, state, value, label);
	  }
  }

 /**
  * @method      setTitle
  * @summary     Updates the title in the systray or menu bar.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript>systray.setTitle( "In progress..." );</code>
  * @path        ctx.systrayClass.setTitle
  * @param       {string} text Bar title
  * @return      {*} Return value
  */
  this.setTitle = function (text) {
    var desc = _page.getObjectDescriptor();
    return ctx.actionApp(desc, 'setTitle', 'SETTEXT', text);
  }

 /**
  * @method      show
  * @summary     Shows or hides the systray or menu bar.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript>systray.show( false );</code>
  * @path        ctx.systrayClass.show
  * @param       {boolean} [bShow] Shows if ''true'' (default), hides if ''false''
  * @return      {*} Return value
  */
  this.show = function (bShow) {
    var desc = _page.getObjectDescriptor();
    return ctx.actionApp(desc, 'show', (bShow === false) ? 'HIDE' : 'SHOW');
  }

 /**
  * @method      showBalloon
  * @summary     Displays a balloon message on the systray or menu bar.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
systray.showBalloon( ctx.options.projectLabel, "Ready for testing...", e.systray.iconType.Warning, 10000 );
</code>
  * @path        ctx.systrayClass.showBalloon
  * @param       {string} title Balloon title
  * @param       {string} text Balloon text
  * @param       {e.systray.iconType} iconType Icon type (see [[:lib:common:ctx.enum#enumeration_esystrayicontype|e.systray.iconType]])
  * @param       {number} duration Balloon display duration (in ms)
  * @return      {*} Return value
  */
  this.showBalloon = function (title, text, iconType, duration) {
    var desc = _page.getObjectDescriptor();
    return ctx.actionApp(desc, 'showBalloon', 'SHOWBALLOON', _systray.name, title, text, iconType, duration);
  }

 /**
  * @method      updateMenu
  * @summary     Updates an existing menu in the systray or menu bar.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript>systray.updateMenu( "", "evVersion", GLOBAL.labels.menu.about, "about" );</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **systray.updateMenu** + 'TAB' :
  *
  *  <code javascript>systray.updateMenu( "", "event", "text", "image" );</code>
  * </WRAP>
  * @path        ctx.systrayClass.updateMenu
  * @param       {string} parentId Parent menu identifier (if empty, menu is a root menu)
  * @param       {string} id Event menu identifier (should be unique)
  * @param       {string} label Menu text
  * @param       {string} [iconId] Icon identifier (loaded in ''ctx.systray.loadImage()'')
  * @return      {*} Return value
  */
  this.updateMenu = function (parentId, id, label, iconId) {
    var res = '';
		ctx.lockNoNotify = true;
    id = String(id).substring(0, _maxIdLength);
    if ((!parentId) || (parentId === '')){
      parentId = _systray.name; // give systray name to the root menu
    }
		if (_newMode && _popup) {
			if (_popup.exist()) {
        _popup.execScript('updateMenu', id, label, iconId);
      }
		} else {
	    if (_bCreated) {
	      var desc = _page.getObjectDescriptor();
	      res = ctx.actionApp(desc, 'updateMenu', 'ADDMENUITEM', parentId, id, '', label, iconId);
	    }
		}
		ctx.lockNoNotify = false;
    return res;
  }

	/**
  * @method      updateAbout
  * @summary     TBC...
  * @description
  * TBC...
  * @path        ctx.systrayClass.updateAbout
  * @param       {Array} [aboutData]
  * @return      {boolean} Return value
  */
  this.updateAbout = function (aboutData) {
    var res = false;
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
			_aboutData = aboutData ? aboutData : [];
			if (!_aboutData || (_aboutData.length == 0)) {
				_aboutData = [];
				_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.projectLabel, ctx.options.projectLabel || ctx.options.projectName], isProjectSpecific: true});
				_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.projectVersion, ctx.options.projectVersion], isProjectSpecific: true});
				_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.date, ctx.options.projectDate], isProjectSpecific: true});
				_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.productVersion, ctx.options.productVersion], isProjectSpecific: false});
				_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.frameworkVersion, ctx.options.frameworkVersion], isProjectSpecific: false});
				if (ctx.options.productVersions && ctx.options.productVersions['UnifiedStudio'])
					_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.studioVersion, ctx.options.productVersions['UnifiedStudio']], isProjectSpecific: false});
				if (ctx.options.env != e.env.prod)
					_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.environment, GLOBAL.labels.env[ctx.options.env]], isProjectSpecific: false});
				if (ctx.options.fullUserName)
					_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.user, ctx.options.fullUserName], isProjectSpecific: false});
				if (ctx.options.computerName)
					_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.machine, ctx.options.computerName], isProjectSpecific: false});
				if (ctx.options.serverVersion)
					_aboutData.push({labelValuePair: [GLOBAL.labels.aboutPopup.galaxyVersion, ctx.options.serverVersion], isProjectSpecific: false});
			}
			if (_popup.exist()) {
				_popup.execScript('updateAbout', _aboutData);
			}
			res = true;
		}
		ctx.lockNoNotify = false;
    return res;
  }

 /**@method      updateAgentStatus
  * @summary     TBC...
  * @description
  * TBC...
  * @path        ctx.systrayClass.updateAgentStatus
  * @param       {e.agentStatus} [agentStatus] agent status
  * @param       {string} [label] label
  * @param       {string} [description] optional long description
  * @param       {boolean} [skip] skip memorization
  * @return      {boolean} Return value
  */
  this.updateAgentStatus = function (agentStatus, label, description, skip) {
    var res = false;
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
			var previousAgentStatus = _agentStatus;
			_agentStatus = agentStatus || _agentStatus || e.agentStatus.Idle;
      var iconFileName = 'popup/icons/' + _agentStatus + '_16.png';
			if (label !== undefined)
        _statusLabel = label || "";
      if (description !== undefined)
				_statusDescription = description || "";
			if (!skip) {
				_persistedStatus = _agentStatus;
				_persistedLabel = _statusLabel;
				_persistedDescription = _statusDescription;
			}
			if (_popup.exist()) {
				_popup.execScript('updateAgentStatus', _agentStatus, _statusLabel, _statusDescription);
      }
			if (previousAgentStatus != _agentStatus) {
	      _systray.createSystrayMenu(ctx.options.projectName, _agentStatus + '16', 'FILE', ctx.options.path.resources + "\\" + iconFileName);
			}
			res = true;
		}
		ctx.lockNoNotify = false;
    return res;
  }	

 /**
  * @method      updateLanguageList
  * @summary     TBC...
  * @description
  * TBC...
  * @path        ctx.systrayClass.updateLanguageList
  * @param       {Array} [languageList]
  * @return      {boolean} Return value
  */
  this.updateLanguageList = function (languageList) {
    var res = false;
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
      _languageList = languageList ? languageList : [];
      if (!_languageList || _languageList.length == 0) {
        _languageList = [];
        var availableLanguages = GLOBAL.labels.GetI18NLangList();
        if (availableLanguages) {
					for (var key in availableLanguages) {
	          _languageList.push({id: key, value: availableLanguages[key]});
	        }
				}
      }
			if (_popup.exist()) {
				_popup.execScript('updateLanguageList', _languageList);
			}
			res = true;
		}
		ctx.lockNoNotify = false;
    return res;
  }

 /**
  * @method      updateProjectList
  * @summary     TBC...
  * @description
  * TBC...
  * @path        ctx.systrayClass.updateProjectList
  * @param       {Array} [projectList]
  * @param       {string} [currentProjectUid]
  * @return      {boolean} Return value
  */
  this.updateProjectList = function (projectList, currentProjectUid) {
    var res = false;    
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
			_projectList = projectList || _projectList || [];
			_currentProjectUid = currentProjectUid || _currentProjectUid || '';
			if (_popup.exist()) {
				_popup.execScript('updateProjectList', _projectList, _currentProjectUid);
			}
			res = true;
		}
		ctx.lockNoNotify = false;
    return res;
  }

 /**
  * @ignore
  * @method      updateRunningStatus
  * @summary     Enables the systray running state
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript>systray.updateRunningStatus( true, job );</code>
  * @path        ctx.systrayClass.updateRunningStatus
  * @param       {boolean} running 'true' if running, 'false' if idle
  * @param       {ctx.jobClass} [job]
  * @return      {*} Return value
  */
  this.updateRunningStatus = function (running, job) {
    var res = false;
		if (_newMode && _popup) {
			if (running) {
				_nbJobsRunning = _nbJobsRunning + 1;
				var label = job.comment || job.name; 
				var description = '';
				this.updateAgentStatus(e.agentStatus.Running, label, description, true);
			}	else {
				// Display the previous systray status
				_nbJobsRunning = _nbJobsRunning - 1;
				
				if (_nbJobsRunning == 0)
					this.updateAgentStatus(_persistedStatus, _persistedLabel, _persistedDescription);
			}
		}
    return res;
  }

	/**@method      updateTenantList
  * @summary     TBC...
  * @description
  * TBC...
  * @path        ctx.systrayClass.updateTenantList
  * @param       {Array} [tenantList]
  * @return      {boolean} Return value
  */
  this.updateTenantList = function (tenantList) {
    var res = false;
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
			_tenantList = tenantList || _tenantList || [];
			if (_tenantList.length == 0) {
				_tenantList = ctx.tenantManager.getAll();
			}
			if (_popup.exist()) {
				_popup.execScript('updateTenantList', _tenantList);
			}
			res = true;
		}
		ctx.lockNoNotify = false;
    return res;
  }
  
  /**
  * @method      onSuccessAddEditTenant
  * @ignore
  * @description
  * Updates the "Add/Edit Tenant" page when the agent succeeded to add/edit the tenant
  * @path        ctx.systrayClass.onSuccessAddEditTenant
  * @param       {string} tenantId
  * @param       {string} tenantName
  * @param       {string} tenantUrl
  * @return      {boolean} Return value
  */
  this.onSuccessAddEditTenant = function (tenantId, tenantName, tenantUrl) {
    var res = false;
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
      if (_popup.exist()) {
				_popup.execScript('onSuccessAddEditTenant', tenantId, tenantName, tenantUrl);
			}
			res = true;
    }
		ctx.lockNoNotify = false;
    return res;
  }

  /**
  * @method      onFailureAddEditTenant
  * @ignore
  * @description
  * Updates the "Add/Edit Tenant" page when the agent failed to add/edit the tenant
  * @path        ctx.systrayClass.onFailureAddEditTenant
  * @param       {string} sErrorLabel Error message to display in "Add/Edit Tenant" form
  * @return      {boolean} Return value
  */
  this.onFailureAddEditTenant = function (sErrorLabel) {
    var res = false;
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
      if (_popup.exist()) {
				_popup.execScript('onFailureAddEditTenant', sErrorLabel);
			}
			res = true;
    }
		ctx.lockNoNotify = false;
    return res;
  }

  /**
  * @method      onNoSelectTenantFile
  * @ignore
  * @description
  * Displays the "Desktop Agent Tenant Registration" page in the systray popup
  * @path        ctx.systrayClass.onNoSelectTenantFile
  * @return      {boolean} Return value
  */
  this.onNoSelectTenantFile = function () {
    var res = false;
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
      if (_popup.exist()) {
        var oPositionSystray = ctx.json.parse(ctx.actionApp(_page.getObjectDescriptor(), 'POSITIONSYSTRAY', 'POSITIONSYSTRAY', _systray.name, '', '', ctx.options.projectName, ''));
        _openPopupOnPosition(oPositionSystray['left'], oPositionSystray['bottom'], oPositionSystray['edge']);
        _popup.execScript('onNoSelectTenantFile()');
			}
			res = true;
    }
		ctx.lockNoNotify = false;
    return res;
  }

  /**@method      addToJobList
  * @summary     Adds the current running job to the job list in the systray
  * @description
  * TBC...
  * @path        ctx.systrayClass.addToJobList
  * @param       {ctx.jobClass} [job]
  * @return      {boolean} Return value
  */
  this.addToJobList = function (job) {
    var res = false;
		ctx.lockNoNotify = true;
		if (_newMode && _popup) {
			if (job) {
				if (_popup.exist()) {
					_popup.execScript('addToJobList', job);
				}
				res = true;
			}			
		}
		ctx.lockNoNotify = false;
    return res;
  }

  /**
  * @method      updateEnvironmentList
  * @summary     TBC...
  * @description
  * Will be called when receiving response from 'sendClientInfos' message
  * @path        ctx.systrayClass.updateEnvironmentList
  * @param       {Array} [environmentList] list of available environments - format : [{environmentUid : <guid>, name: 'Env 1'}, ...]
  * @param       {boolean} [studioMode] studio mode
  * @return      {boolean} Return value
  */
 this.updateEnvironmentList = function (environmentList, studioMode) {
  var res = false;    
	ctx.lockNoNotify = true;
	var bMode = (studioMode ? true : false);
  if (_newMode && _popup) {
    _environmentList = environmentList || _environmentList || [];
    var envListLength = _environmentList.length;
    var currentEnvUid = ctx.registry.get(_currentEnvironmentKey);
    var curEnvFound = false;
    if (envListLength > 0) {
      for (var i = 0; i < envListLength; i++) {
        if (_environmentList[i].environmentUid === currentEnvUid) {
          curEnvFound = true;
          break;
        }
      }
      if (!curEnvFound) {
        currentEnvUid = _environmentList[0].environmentUid;
        ctx.registry.set(_currentEnvironmentKey, currentEnvUid);
      }
    } 
    if (_popup.exist()) {
      _popup.execScript('updateEnvironmentList', _environmentList, currentEnvUid);
    }
    res = true;
  } else if (!_newMode) {
    _updateEnvironmentListLegacy(_environmentList, bMode);
    res = true;
  }
	ctx.lockNoNotify = false;
  return res;
}

/**
  * @method      refreshTrialMode
  * @ignore
  * @description
  * Sets the 'isTrialMode' variable in the systray popup
  * @path        ctx.systrayClass.refreshTrialMode
  */
this.refreshTrialMode = function () {
  return _sendSDKVariableToPopup('setIsTrialMode', ctx.getTrialMode());
}

/**
  * @method      setDefaultMode
  * @ignore
  * @description
  * Called when receiving project info from CtxtRun. 
  * Sets 'Default mode' (Default mode = when the agent is on default project) in the systray and updates UI accordingly
  * @path        ctx.systrayClass.setDefaultMode
  * @param       {boolean} bDefaultMode default mode
  * @return      {boolean} Return value
  */
this.setDefaultMode = function (bDefaultMode) {
  var res = false;
  ctx.lockNoNotify = true;
  if (_newMode && _popup) {
    if (_popup.exist()) {
      _popup.execScript('setIsDefaultModeAndUpdateUI', bDefaultMode);
    }
    res = true;
  }
  ctx.lockNoNotify = false;
  return res;
}
};
