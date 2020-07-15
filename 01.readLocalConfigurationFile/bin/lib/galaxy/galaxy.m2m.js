/// <title>
///     filename : ctx.m2m.js
///    Galaxy Web Services library
/// </title>
/// <history>
///  | 30/06/2014 | CPUG    | Creation
/// </history>


/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
*
* ==== To be documented ====
*
*/

GLOBAL.labels.set({
  IPAReason:{
	  
  },
  error: { 
    OK: { _comment:"Operation succeeded", _type:"XFLD", en:"Operation succeeded" },
    KO: { _comment:"Operation failed", _type:"XFLD", en:"Operation failed" },
    Canceled: { _comment:"Operation was canceled", _type:"XFLD", en:"Operation was canceled" },
    Duplicated: { _comment:"Data is duplicated", _type:"XFLD", en:"Data is duplicated" },
    Fail: { _comment:"Operation failed", _type:"XFLD", en:"Operation failed" },
    InvalidArgument: { _comment:"The argument is invalid", _type:"XFLD", en:"The argument is invalid" },
    InvalidCommand: { _comment:"The command is invalid", _type:"XFLD", en:"The command is invalid" },
    NotAuthorized: { _comment:"The command is not authorized", _type:"XFLD", en:"The command is not authorized" },
    NotConnected: { _comment:"Not connected", _type:"XFLD", en:"Not connected" },
    NotFound: { _comment:"Message returned when agent not found in Agent group", _type:"XFLD", en:"Agent not found in Agent group" },
    NotImplemented: { _comment:"The command is not implemented", _type:"XFLD", en:"The command is not implemented" },
    TimeOut: { _comment:"The operation timed out", _type:"XFLD", en:"The operation timed out" },
    UndefinedObject: { _comment:"The object is not defined", _type:"XFLD", en:"The object is not defined" }
	},
  galaxyAPI: { // obsolete
    showProgress: { en:"Show progress" },
    setBusy: { en:"Enable busy state" },
    showConsole: { en:"Show debug console" },
    sendDiagnostic: { en:"Send diagnostic" },
    selfTestMode: { en:"Enable self test mode" },
    reinitialize: { en:"Reinitialize connection" }
	}
});


/**
* Variable type
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.variable
* @enum {string}
* @path e.variable
* @var setting 'setting
* @var credential 'credential
* @readonly
*/
e.variable = {
  none: '',
  setting: 'string',
  credential: 'credential'
};

e.socket = {
};

/**
* Socket status
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.socket.status
* @enum {number}
* @path e.socket.status
* @readonly
*/
e.socket.status = {
	closed: 0,          // Accidentally closed. Will try to reconnect
	reconnecting: 1,
	open: 2,
	error: 3,
	shutdown: 4
};

/**
* Agent mode
* @description
* __Ex.:__
<code javascript>
</code>
* @enumeration e.agentMode
* @enum {string}
* @path e.agentMode
* @readonly
*/
e.agentMode = {
	attended: 'attended',
	unattended: 'unattended'
};

/** Options for the 'ctx.m2m' library
* @path ctx.options.m2m
* @class ctx.options.m2m
* @struct
*/
ctx.options.m2m = {
	/** client ID : full user name (ctx.options.fullUserName) by default, ex. : '<computer>_<login>' or '<domain>_<login>'
	* @property {string} clientId
	* @path ctx.options.m2m.clientId */ clientId: '',

	/** Debug mode
	* @property {boolean} debug
	* @path ctx.options.m2m.debug */ debug: false,

	/** Enabled mode
	* @property {boolean} enabled
	* @path ctx.options.m2m.enabled */ enabled: true,

	/** Use web sockets channel
	* @property {boolean} useWebSockets
	* @path ctx.options.m2m.useWebSockets */ //useWebSockets: false,

	/** Trace level
	* @property {e.trace.level} traceLevel
	* @path ctx.options.m2m.traceLevel */ traceLevel: e.trace.level.None,
	
	/** Ping timer in ms
	* Default value is 120000 (2 minutes). Set 0 to disable the timer
	* @property {number} pingTimer
	* @path ctx.options.m2m.pingTimer */ pingTimer: 120000,

	/** Ping margin timer in ms
	* Default value is 30000 (30 s).
	* @property {number} pingMarginTimer
	* @path ctx.options.m2m.pingMarginTimer */ pingMarginTimer: 30000,

	/** Request answer timeout in ms
	* Default value is 30000 (30 s). Set 0 to disable the timer
	* @property {number} replyTimer
	* @path ctx.options.m2m.replyTimer */ replyTimer: 30000,

	/** M2M page name
	* @ignore
	* @property {string} pageName
	* @path ctx.options.m2m.pageName */ pageName: 'm2m_PSC.htm',

	/** Galaxy root URL
	* @property {string} root
	* @path ctx.options.m2m.root */ root: '',

	/** If enabled, the M2M console is visible and displays traces exchanges between client and server (only for test purpose)
	* @property {boolean} showConsole
	* @path ctx.options.m2m.showConsole */ showConsole: false,
	
	/** If enabled, the M2M menu is visible and displays menus to handle L2L (restart, sey busy, show console, ...)
	* @property {boolean} showMenu
	* @path ctx.options.m2m.showMenu */ showMenu: true,
	
	/** If enabled, shows a secondary systray with project list (obsolete in 3.4+)
	* @property {boolean} showProjectSystray
	* @path ctx.options.m2m.showProjectSystray */ showProjectSystray: false,
	
	/** Galaxy UI URL
	* @property {string} UIUrl
	* @path ctx.options.m2m.UIUrl */ UIUrl: '',

		/** Galaxy API URL
	* @property {string} url
	* @path ctx.options.m2m.url */ url: ''
};

/** Options for the 'ctx.galaxyAPI' library
* @path ctx.options.galaxyAPI
* @class ctx.options.galaxyAPI
* @struct
*/
ctx.options.galaxyAPI = {
	/** Local recording enabled, to store job data in JSON files
	* @property {boolean} recordingEnabled
	* @path ctx.options.galaxyAPI.recordingEnabled */ recordingEnabled: false,
		
	/** Self test mode : if enabled, M2M id is set in 'job.destination', to force distribution to myself (only for test purpose !)
	* @property {boolean} selfTestMode
	* @path ctx.options.galaxyAPI.selfTestMode */ selfTestMode: false,
		
//	/** debug : if enabled, the M2M console is visible and displays traces exchanges between client and server (only for test purpose !)
//	* @property {boolean} debug
//	* @path ctx.options.galaxyAPI.debug */ debug: false,
		
	/** Shows a progress popup during job execution
	* @property {boolean} showProgress
	* @path ctx.options.galaxyAPI.showProgress */ showProgress: false,
		
	/** Uload offline jobs
	* @property {boolean} uploadLocalJobs
	* @path ctx.options.galaxyAPI.uploadLocalJobs */ uploadLocalJobs: false,
		
	/** Max displayed jobs (default is 30)
	* @property {boolean} progressJobCount
	* @path ctx.options.galaxyAPI.progressJobCount */ progressJobCount: 30,
		
	/** Enable restart in Studio mode (don't use, for test purpose only !)
	* @property {boolean} enableStudioRestart
	* @ignore
	* @path ctx.options.galaxyAPI.enableStudioRestart */ enableStudioRestart: false,
		
//	/** If enabled, the M2M console is visible and displays traces exchanges between client and server (only for test purpose)
//	* @property {boolean} showConsole
//	* @path ctx.options.galaxyAPI.showConsole */ showConsole: false,
		
	/** Supervisor M2M address for test purpose.\\ If empty, 'Supervisor' is used (do not modify, only used for test purpose).
	* @property {string} serverProcess
	* @path ctx.options.galaxyAPI.serverProcess */ serverProcess: 'Supervisor',
		
	/** Trace level
	* @property {e.trace.level} traceLevel
	* @path ctx.options.galaxyAPI.traceLevel */ traceLevel: e.trace.level.None,
		
	/** Cyphering keys
	* @property {Object<string, ctx.keyClass>} 
	* @path ctx.options.galaxyAPI.keys */ keys: {
		clientEncryption: ctx.cryptography.keys.clientEncryption,
		clientSignature: ctx.cryptography.keys.clientSignature,
		serverEncryption: ctx.cryptography.keys.serverEncryption,
		serverSignature: ctx.cryptography.keys.serverSignature
	}
};


	/**
	* Description
	* @class ctx.m2mMessageClass
	* @path ctx.m2mMessageClass
	* @constructor
	* @param {*} [obj] initialization object
	*/
	ctx.m2mMessageClass = function (obj) {
		if (obj && ('string' === typeof(obj))) {
			obj = ctx.unserialize(obj);
		}
		var msg = this;
		obj = obj || {}
		/** @type {string} */ this.name = obj.name || '';
		/** @type {number} */ this.tid = obj.tid || 0;
		/** @type {e.error} */ this.code = obj.code || e.error.None;
		/** @type {string} */ this.label = obj.label || '';
		///** @type {string} */ this.source = obj.source;
		///** @type {string} */ this.destination = obj.destination;
		/** @type {Object} */ this.data = obj.data; //message data
		/** @type {function(e.error, string, Object)|undefined } */ this.callback = obj.callback;
	}
	/** @type {ctx.m2mMessageClass} */ var m2mMsg = new ctx.m2mMessageClass(); // for Intellisense only

/**
 * @ignore
 * Galaxy M2M Library
 * @class ctx.m2m
 * @path ctx.m2m
 * @constructor
 */
ctx.m2m = (function () {
//	// connection settings
//	var _params = {
//		clientId: ctx.options.fullUserName, // full user name by default, ex. : '<computer>\<login>' or '<domain>\<login>'
//		URL: '',
//		/** @type {ctx.application} */process: null,
//		debug: false
//	};

	var self = 
	/** @lends ctx.m2m */
	{};
	
	/** @type {Object} */ var _options = ctx.options.m2m;
	/** @type {ctx.application} */ var _pProcess = GLOBAL;
	/** @type {ctx.popupClass} */ var _pM2MPage = null;
	/** @type {string} */ var _clientId = '';
	/** @type {number} */ var _tidCounter = 1;
	/** @type {string} */ var _serverDefaultDestination = 'Supervisor';

	var _initDone = false;
	var _isConnected = false;
	//var _isConnecting = false;

	//var _isVisible = false;
	
	/** @type {Array<ctx.m2mMessageClass>} */ var _requests = [];
	/** @type {Array<ctx.m2mMessageClass>} */ var _answers = [];
	/** @type {Array<ctx.m2mMessageClass>} */ var _pendingupdateRunJobs = [];

	/** @type {Array<function(string, Object, string, boolean, number, e.error, string)>} */ var _registeredHandlers = [];

	var _pendingCallbacks = {};
	var _pendingTimers = {};
	//var _groups = {};
		
	var _pingTimerId = 0;
		
	/** @type {boolean} */ var _enableLocalTesting = false;

	var _startPingTimer = function () {
		if (_pingTimerId) {
			clearTimeout(_pingTimerId);
			_pingTimerId = 0;
		}
		if (ctx.options.m2m.pingTimer > 1000) {
			_pingTimerId = setTimeout( function() {
				self.reopenM2MPage();
			}, ctx.options.m2m.pingTimer + ctx.options.m2m.pingMarginTimer);		
		}
	}
		
	/**
	 * @ignore
     * Description 
	 * @method isConnected
	 * @path ctx.m2m.isConnected
	 * @return {boolean}
	 */
	self.isConnected = function () {
		return _isConnected;
	}

	/**
	 * @ignore
	 * Description 
	 * @method setConnected
	 * @path ctx.m2m.setConnected
	 * @param {boolean} connected
	 */
	self.setConnected = function (connected) {
		if (connected)
			ctx.log("ctx.m2m.setConnected: true", e.logIconType.Info, null, _options);
		if (_isConnected != connected) {
			// TODO : calculate the value to send
			//ctx.galaxyAPI.setMode('attended');
		}
		else
			ctx.log("ctx.m2m.setConnected: false", e.logIconType.Warning, null, _options);
		_isConnected = connected;
	}

	/**
	 * @ignore
	 * Description 
	 * @method init
	 * @path ctx.m2m.init
	 * @return none
	 */
	self.init = function () {
		if (_initDone) { return; }
		_initDone = true;
		
		//_pProcess = ctx.options.m2m.process || GLOBAL;
		_pProcess = GLOBAL;
		_clientId = ctx.options.m2m.clientId || (ctx.options.computerName + '_' + ctx.options.userName);
	}

	/**
	 * @ignore
	 * Description
	 * @method end
	 * @path ctx.m2m.end
	 * @return none
	 */
	self.end = function () {
	}

	/**
	 * @ignore
	 * Description
	 * @method registerHandler
	 * @path ctx.m2m.registerHandler
	 * @param {function(string, Object, string, boolean, number, e.error, string)} handler
	 * @return boolean
	 */
	self.registerHandler = function (handler) {
		if (handler  && ('function' === typeof handler)) {
			_registeredHandlers.push( handler );
			return true;
		}
		return false;
	}

	/**
	 * @ignore
 	 * Enables / disables M2M options
 	 * @method toggleOption
	 * @path ctx.m2m.toggleOption
	 * @param {string} option to be updated (part of 'ctx.options.galaxyAPI')
	 * @param {boolean} [state] self test mode status : true|false|undefined (if undefined, status is toggled)
	 * @return {boolean} option value
	 */
	self.toggleOption = function (option, state) {
		ctx.notifyAction('ctx.m2m.toggleOption');
		ctx.options.save('m2m', option, state);
		return ctx.options['m2m'][option];
	}

	/**
	 * @ignore
 	 * Gets or sets enable Local Testing flag
	 * @method enableLocalTesting
	 * @path ctx.m2m.enableLocalTesting
	 * @param {boolean} [set] if omitted, gets the value, otherwise sets the value
	 * @return {boolean} result
	 */
	self.enableLocalTesting = function (set) {
		if (typeof set !== 'undefined') {
			_enableLocalTesting = set;
		}
		return _enableLocalTesting;			
	}
	
	/**
	 * @ignore
 	 * Callback called when receiving a remote message
	 * @method receiveMessage
	 * @path ctx.m2m.receiveMessage
	 * @param {ctx.event} ev 
	 * @param {boolean} [answer] 
	 * @return {boolean} result
	 */
	self.receiveMessage = function (ev, answer) {
		var res = false;		
		if ((ev.data) && ('string' === typeof ev.data)) {
			ev.data = ctx.json.parse(ev.data);

/*
			// TODO : TEST ONLY
			if (ev.data.name == 'sendClientInfos') {
				var tmpValue =  "{    \"name\": \"cancelJob\",    \"tid\": 1,    \"code\": \"OK\",    \"label\": \"\",    \"data\": {        \"messageContentType\": \"job\",        \"uid\": \"9c0b1a49-8f21-4b1e-b3d5-9a99068cc051\"    }     }";
				
				// Case 0 : OK
				//tmpValue = "{	\"name\": \"sendBAMNotification\",	\"tid\": 2,	\"code\": \"OK\",	\"data\": {		\"messageContentType\": \"bamNotificationInfo\",		\"status\": \"OK\",		\"serious\": false,		\"errorMessage\": \"no error\",		\"values\": [			{				\"type\": \"alert\",				\"login\": \"user\",				\"machine\": \"machine\",				\"timestamp\": \"2019-10-02T15:44:13.881\",				\"params\": {					\"name\": \"Alert1\",					\"criticity\": \"Critical\",					\"status\": \"OK\",					\"data\": \"alert\"				},				\"type\": \"alert\"			},			{				\"type\": \"alert\",				\"login\": \"user\",				\"machine\": \"machine\",				\"timestamp\": \"2019-10-02T16:25:16.811\",				\"params\": {					\"name\": \"Alert1\",					\"criticity\": \"Critical\",					\"status\": \"OK\",					\"data\": \"alert\"				},				\"type\": \"alert\"			},			{				\"type\": \"alert\",				\"login\": \"user\",				\"machine\": \"machine\",				\"timestamp\": \"2019-10-02T16:26:46.653\",				\"params\": {					\"name\": \"Alert1\",					\"criticity\": \"Critical\",					\"status\": \"OK\",					\"data\": \"alert\"				},				\"type\": \"alert\"			},			{				\"type\": \"alert\",				\"login\": \"user\",				\"machine\": \"machine\",				\"timestamp\": \"2019-10-02T16:33:33.118\",				\"params\": {					\"name\": \"Alert1\",					\"criticity\": \"Critical\",					\"status\": \"OK\",					\"data\": \"alert\"				},				\"type\": \"alert\"			},			{				\"type\": \"alert\",				\"login\": \"user\",				\"machine\": \"machine\",				\"timestamp\": \"2019-10-02T16:35:03.82\",				\"params\": {					\"name\": \"Alert1\",					\"criticity\": \"Critical\",					\"status\": \"OK\",					\"data\": \"alert\"				},				\"type\": \"alert\"			}		]	}}";

				// Case 1 : KO, not serious : malformed notification
				// tmpValue = "{   \"name\":\"sendBAMNotification\",   \"tid\":2,   \"code\":\"OK\",   \"data\":{      \"messageContentType\":\"bamNotificationInfo\",      \"status\":\"KO\",      \"serious\":true,      \"errorMessage\":\"Invalid notification format\",      \"values\":[         {            \"type\":\"alert\",            \"login\":\"user\",            \"machine\":\"machine\",            \"timestamp\":\"2019-10-02T15:44:13.881T\",            \"params\":{               \"name\":\"Alert1\",               \"criticity\":\"Critical\",               \"status\":\"OK\",               \"data\":\"alert\"            }         }      ]   }}";

				// Case 2 : KO, serious : DoS protection
				//tmpValue = "{   \"name\":\"sendBAMNotification\",   \"tid\":2,   \"code\":\"OK\",   \"data\":{      \"messageContentType\":\"bamNotificationInfo\",      \"status\":\"KO\",      \"serious\":false,      \"errorMessage\":\"Too many requests or too much data received by the server\",      \"values\":[       ]   }}";

				ev.data = ctx.json.parse(tmpValue);
			}
			// END TEST
*/
		}
		
		var m2mMsg = new ctx.m2mMessageClass(ev.data);
		//if (ev.itemName) { m2mMsg.source = ev.itemName; }
		//if (_clientId) { m2mMsg.destination = _clientId; }
		if (!m2mMsg.name) {
			ctx.log(m2mMsg, e.logIconType.Warning, 'ctx.m2m.receiveMessage: Invalid message (no name) ', _options);
		} else {
			if (m2mMsg.code)
				ctx.log("Receiving answer '" + m2mMsg.name + "' (" + m2mMsg.code + ")", (m2mMsg.code === e.error.OK ? e.logIconType.Info : e.logIconType.Warning), m2mMsg, _options);
			else
				ctx.log("Receiving request '" + m2mMsg.name + "'", e.logIconType.Info, m2mMsg, _options);
			// message received, call handlers
			ctx.each(_registeredHandlers, function(id, handler) {
				if ('function' === typeof(handler)) {
					var result = handler(m2mMsg.name, m2mMsg.data, null, answer, m2mMsg.tid, m2mMsg.code, m2mMsg.label);
					if (result && result.answer) answer = true;
					if (result && !result.handled) return false;
				}
			});
			if (answer && m2mMsg.tid) {
				// ANSWER received, check if a callback is registered
				var timer = _pendingTimers[m2mMsg.tid];
				if (timer) {
					clearTimeout(timer);
					delete _pendingTimers[m2mMsg.tid];
				}
				var msg = _pendingCallbacks[m2mMsg.tid];
				if (msg && msg.callback && ('function' === typeof msg.callback)) {
					msg.callback(m2mMsg.code, m2mMsg.label, m2mMsg.data); 
					delete _pendingCallbacks[m2mMsg.tid];
				}
			}
		}
		return res;			
	}
	
	/**
	 * @ignore
	 * @ignore
 	 * Description
	 * @method connect
	 * @path ctx.m2m.connect
	 * @return none
	 */
	self.connect = function ( ) {
		if (_enableLocalTesting) { return true; } // local testing mode (no M2M enabled)
		self.init();
		return true;
	}

	/**
	 * @ignore
 	 * Description
	 * @method disconnect
	 * @path ctx.m2m.disconnect
	 * @return none
	 */
	self.disconnect = function ( ) {
		// close M2M page
		self.closeM2MPage();
	}

	/**
	 * @ignore
 	 * Description
	 * @method closeM2MPage
	 * @path ctx.m2m.closeM2MPage
	 * @return result
	 */
	self.closeM2MPage = function ( ) {
		try {
			if (_pM2MPage && _pM2MPage.exist()) {
				_pM2MPage.close();
			}
		} catch (ex) { }
	}

	/**
	 * @ignore
 	 * Description
	 * @method reopenM2MPage
	 * @path ctx.m2m.reopenM2MPage
	 * @return result
	 */
	self.reopenM2MPage = function ( ) {
		try {
			if (_pM2MPage && _pM2MPage.exist()) {
				_pM2MPage.close();
				_pM2MPage.waitClose(function(ev) {
					ctx.wait(function(ev) {
						ctx.log("ctx.m2m.reopenM2MPage: close, then open page", e.logIconType.Info, null, _options);
						self.openM2MPage();
					}, 2000);
				});
				return;
			}
		} catch (ex) { 
			ctx.log("ctx.m2m.reopenM2MPage: exception: " + ex.message, e.logIconType.Warning, null, _options);
		}
		ctx.wait(function(ev) {
			ctx.log("ctx.m2m.reopenM2MPage: no opened page, open it", e.logIconType.Info, null, _options);
			self.openM2MPage();
		}, 2000);
	}

	/**
	 * @ignore
 	 * Description
	 * @method openM2MPage
	 * @path ctx.m2m.openM2MPage
	 * @return result
	 */
	self.openM2MPage = function ( ) {
		var res = false;

		var pageURL = ctx.options.m2m.url + '/' + ctx.options.m2m.pageName + '?ClientID=' + _clientId + '&CtxtProcess=' + _pProcess.name;
		if (ctx.options.m2m.showConsole)
			pageURL += '&Debug=True';
		if (ctx.options.m2m.pingTimer > 1000)
			pageURL += '&PingTimer=' + ctx.options.m2m.pingTimer;
		pageURL += '&ts=' + ctx.getTimestamp(null, true);

		// *** open M2M proxy page using messbox ***
		if (_pM2MPage) {
			//_isConnecting = true;
			_pM2MPage.open({
				url: pageURL,
				visible: ctx.options.m2m.showConsole
			});
			_startPingTimer();
			res = true;
		}
		return res;
	}

	/**
	 * @ignore
 	 * Description
	 * @method sendMessage
	 * @path ctx.m2m.sendMessage
	 * @param {string} name
	 * @param {string} destination
	 * @param {Object} [obj]
	 * @param {boolean} [answer]
	 * @param {function(e.error, string, Object)} [callback]
	 * @param {number} [tid]
	 * @param {e.error} [code]
	 * @param {string} [label]
	 * @param {boolean} [ifConnected]
	 * @return {boolean}
	 */
	self.sendMessage = function (name, destination, obj, answer, callback, tid, code, label, ifConnected) {
		if (_enableLocalTesting) { return false; }

		// add request in cache
		var m2mMsg = new ctx.m2mMessageClass();
		m2mMsg.name = name;
		m2mMsg.tid = tid || _tidCounter ++;
		m2mMsg.callback = callback;
		//m2mMsg.source = _clientId;
		//m2mMsg.destination = destination || _clientId; // if no destination, loop internally (for testing purpose)
		if (label) m2mMsg.label = label;
		if (code) m2mMsg.code = code;
		if (obj && ('object' === typeof obj)) {
			if (Array.isArray(obj)) {
				m2mMsg.data = obj;
			}
			else {
				m2mMsg.data = {};
				ctx.each(obj, function(id, value) {
					if ((id == 'data') && value && ('object' === typeof value)) {
						var ctxType = value.ctxType;
						var ctxName = value.ctxName;
						if (ctxType) delete  value.ctxType;
						if (ctxName) delete  value.ctxName;
						// send a serialized version of data
						m2mMsg.data.data = ctx.serialize(value); // set as JSON
						m2mMsg.data.format = e.data.format.json;
						if (ctxType) value.ctxType = ctxType;
						if (ctxName) value.ctxName = ctxName;
					} else {
						m2mMsg.data[id] = value;
					}
				});
			}
		} else if (obj) {
			m2mMsg.data = obj;
		}
		
		if (m2mMsg.data && m2mMsg.data.key && m2mMsg.data.data) {
			// cypher data
			/** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(m2mMsg.data.key);
			if (key && key.type) {
				var encryptedData = ctx.cryptography.encryptMessage(m2mMsg.data.data, key);
				if (!encryptedData) {
					// encryption failed
					if (callback && ('function' === typeof(callback))) {
						callback(e.error.Fail, "Data encryption failed", m2mMsg.data);
					}
					return false; // invalid content
				} else {
					//	encryptedData = encryptedData.replace(new RegExp("\r\n", 'g'), ''); // remove CR
					m2mMsg.data.data = key.name + "|" + encryptedData;
					m2mMsg.data.format = e.data.format.xjson;
				}
			}
		}

		//if (!(m2mMsg.name && m2mMsg.tid && m2mMsg.source && m2mMsg.destination)) {
		if (!(m2mMsg.name && m2mMsg.tid)) {
			if (callback && ('function' === typeof(callback))) {
				callback(e.error.InvalidArgument, "Invalid message", m2mMsg.data);
			}
			return false; // invalid content
		}
		if (m2mMsg.data) {
			delete  m2mMsg.data.ctxType;
			delete  m2mMsg.data.ctxName;
			delete  m2mMsg.data.format;
		}
		
		if (answer) {
			_answers.push(m2mMsg);	
		} else {
			_requests.push(m2mMsg);
			if (callback && ('function' === typeof(callback))) {
				_pendingCallbacks[m2mMsg.tid] = m2mMsg;
			}
		}
		// send cached requests
		self.sendCachedRequests();		
		return true;
	}

	/**
	 * @ignore
 	 * Description
	 * @method sendCachedUpdateRunJobs
	 * @path ctx.m2m.sendCachedUpdateRunJobs
	 * @return bool
	 */
	self.sendCachedUpdateRunJobs = function ( ) {
		while (m2mMsg = _pendingupdateRunJobs.shift()) {
			_requests.push(m2mMsg);
		}
		self.sendCachedRequests();
		return true;
	}
	
	/**
	 * @ignore
 	 * Description
	 * @method sendCachedRequests
	 * @path ctx.m2m.sendCachedRequests
	 * @return bool
	 */
	self.sendCachedRequests = function ( ) {
			/** {@type ctx.m2mMessageClass} */ var m2mMsg;
			// send cached answers
			while (m2mMsg = _answers.shift()) {
				var obj = {
					name: m2mMsg.name,
					tid: m2mMsg.tid
				}
				if (m2mMsg.code) { obj.code = m2mMsg.code };
				if (m2mMsg.data) { obj.data = m2mMsg.data };
				if (m2mMsg.label) { obj.label = m2mMsg.label };
				var txt = ctx.json.stringify(obj);
				ctx.wkMng.SendTxtMsgToSocket(txt);
				ctx.log("Sending answer '" + obj.name + "' (" + obj.code + ")", (obj.code === e.error.OK ? e.logIconType.Info : e.logIconType.Warning), obj, _options);
			}
			// send cached requests
			while (m2mMsg = _requests.shift()) {
				if (!self.isConnected()) {
					if (m2mMsg.name == 'updateRunJob') {
						// backup the updateRunJob request in another cache : _pendingupdateRunJobs, which will be restored at the next connexion
						_pendingupdateRunJobs.push(m2mMsg);
					}
					if (m2mMsg.tid) {
						var msg = _pendingCallbacks[m2mMsg.tid];
						if (msg && msg.callback && ('function' === typeof msg.callback)) {
							msg.callback(e.error.NotConnected, "No connection available", null); 
							delete _pendingCallbacks[m2mMsg.tid];
							ctx.log("Request '" + m2mMsg.tid + "' could not be sent", e.logIconType.Warning, null, _options);
						}
					}
				} else {
					var obj = {
						name: m2mMsg.name,
						tid: m2mMsg.tid
					}
					if (m2mMsg.code) { obj.code = m2mMsg.code };
					if (m2mMsg.data) { obj.data = m2mMsg.data };
					var txt = ctx.json.stringify(obj);
					ctx.wkMng.SendTxtMsgToSocket(txt);
					ctx.log("Sending request '" + obj.name + "'", e.logIconType.Info, obj, _options);
					if (ctx.options.m2m.replyTimer) {
						_pendingTimers[m2mMsg.tid] = setTimeout( function(tid) { return function() { 
							var msg = _pendingCallbacks[tid];
							if (msg && msg.callback && ('function' === typeof msg.callback)) {
								msg.callback(e.error.TimeOut, "Request was not answered", null); 
								delete _pendingCallbacks[tid];
								ctx.log("Request '" + tid + "' was not answered", e.logIconType.Warning, null, _options);
							}
						}; }(m2mMsg.tid), ctx.options.m2m.replyTimer);					
					}
				}
			}
		/*} else {
			// connexion failed or not established 
			self.connect();
			return false;
		}*/
		return true;
	}

	// - receiving generic message
	_pProcess.addOn({ evReceiveMessage: function(ev) {
		self.receiveMessage(ev);
	}});
	_pProcess.events['evReceiveMessage'].internal = true;
	
	return self;
})()

// content message
//ctx.dataManager({ disabledScenarios : {
//	disabledScenarios: []
//}});
///** @advanced */ var disabledScenarios = ctx.dataManagers.disabledScenarios.create();

ctx.dataManager({ alertContent : { 
	/** @type {string} */ messageContentType: 'alert',
//	machine = ctx.options.computerName;
//	userName = ctx.options.userName;
	/** @type {string} */ severity: '',
	/** @type {string} */ category: '',
	/** @type {string} */ subCategory: '',
	/** @type {string} */ message: ''
}});
/** @advanced */ var alertContent = ctx.dataManagers.alertContent.create();
	
// client informations
ctx.dataManager({ clientInfosAnswer : {
	/** @type {string} */ messageContentType: 'clientInfos',
  /** @type {string} */ pingTempo : '',
  /** @type {string} */ retryTempo : '',
  /** @type {boolean} */ studioMode : false,	
	/** @type {string} */ agentUid: '',
	/** @type {string} */ availableEnvironments: ''

}});
var clientInfosAnswer = ctx.dataManagers.clientInfosAnswer.create();

ctx.dataManager({ projectContent : { 
	/** @type {string} */ messageContentType: 'project',
	/** @type {string} */ packageVersionUid: '',
	/** @type {string} */ configurationUid: ''
}});
/** @advanced */ var projectContent = ctx.dataManagers.projectContent.create();

ctx.dataManager({ modeContent : { 
	/** @type {string} */ messageContentType: 'mode',
	/** @type {string} */ value: ''
}});
/** @advanced */ var modeContent = ctx.dataManagers.modeContent.create();
	
ctx.dataManager({ booleanContent : { 
	/** @type {string} */ messageContentType: 'boolean',
	/** @type {boolean} */ value: false
}});
/** @advanced */ var booleanContent = ctx.dataManagers.booleanContent.create();

ctx.dataManager({ scenarioContent : { 
	/** @type {string} */ messageContentType: 'scenario',
	/** @type {string} */ scenarioUid: ''
}});
/** @advanced */ var scenarioContent = ctx.dataManagers.scenarioContent.create();

// client information update
ctx.dataManager({ updateClientInfos : {
	/** @type {string} */ messageContentType: 'clientInfos',
	/** @type {Array} */ availableProjects: null
}});
/** @advanced */ var updateClientInfos = ctx.dataManagers.updateClientInfos.create();

ctx.dataManager({ jobContent : { 
	/** @type {string}  */ messageContentType: 'job',
	/** @type {string|undefined}  */ uid : undefined,
	/** @type {string|undefined}  */ status : undefined,
  /** @type {string}  */ detail : '',
	///** @type {string}  */ configurationUid : '',
  /** @type {string}  */ runGroupUid : '',
  ///** @type {string}  */ packageVersionUid : '',
  /** @type {string}  */ scenarioName : '',
  /** @type {string}  */ scenarioUid : '',
  /** @type {number}  */ priority : e.priority.normal,
  /** @type {boolean} */ notify : false,
  /** @type {boolean} */ attended : true,
  /** @type {Array|undefined}   */ previousJobs : undefined,
  /** @type {string}  */ data : '',
  /** @type {string}  */ dataFormat : '',
  /** @type {string|undefined}  */ batchName : undefined,
	/** @type {string|undefined}  */ expirationDate : undefined
}});
/** @advanced */ var jobContent = ctx.dataManagers.jobContent.create();

ctx.dataManager({ serverVariable : { 
	/** @type {string}  */ messageContentType: 'variable',
	/** @type {e.variable}  */ type : e.variable.none,
	/** @type {string}  */ name : '',
	/** @type {string}  */ environmentUid : ''
}});
/** @advanced */ var serverVariable = ctx.dataManagers.serverVariable.create();

ctx.dataManager({ serverVariableAnswer : { 
	/** @type {string}  */ messageContentType: 'variable',
	/** @type {e.variable}  */ type : '',
	/** @type {string|undefined} */ value: undefined,
	/** @type {string|undefined} */ userName: undefined,
  /** @type {string|undefined} */ password: undefined
}});
/** @advanced */ var serverVariableAnswer = ctx.dataManagers.serverVariableAnswer.create();

// *** GalaxyAPI event notifications ***
// - receiving status from ctxtrun
GLOBAL.addOn({ evRunStatus: function(ev) {
	ctx.galaxyAPI.receiveRunStatus(ev);
}});
GLOBAL.events['evRunStatus'].internal = true;

// - receiving project informations from ctxtrun
GLOBAL.addOn({ evProjectInfos: function(ev) {
	ctx.galaxyAPI.receiveProjectInfos(ev);
}});
GLOBAL.events['evProjectInfos'].internal = true;

// - receiving socket event
GLOBAL.addOn({ evSocketStatus: function(ev) {
	ctx.galaxyAPI.receiveSocketStatus(ev);
}});
GLOBAL.events['evSocketStatus'].internal = true;
	
/**
 * Galaxy API object, used to interact with a local or remote job storage
 * @class ctx.galaxyAPI
 * @path ctx.galaxyAPI
 * @constructor
 **/
ctx.galaxyAPI = (function () {

	/** @type {Object} */ var _options = ctx.options.galaxyAPI;
	///** @type {Array} */ var _progressJobs = [];
	///** @type {Array} */ var _runningJob = [];
	/** @type {string} */ var _progressMessage = '';
	/** @type {string} */ var _runningMessage = '';
	/** @type {number} */ var _progressMessageCount = 0;

	/** @type {string} */ var _agentUidKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\AgentUid";
	/** @type {string} */ var _projectFolder = "%localappdata%\\SAP\\Intelligent RPA\\Projects";
	/** @type {string} */ var _autoSwitchKey = 'HKCU\\Software\\SAP\\Intelligent RPA\\Desktop Agent\\AutoSwitch';
	
	// commands Client --> Server
	var _serverCommand = {
		none: 'none',
		sendClientInfos: 'sendClientInfos',
		unknown: 'unknown',
		addAlert: 'addAlert',
		addJob: 'addJob',
		getJob: 'getJob',
		getVariable: 'getVariable',
		notifyEvent: 'notifyEvent',
		removeJob: 'removeJob',
		resetJob: 'resetJob',
		updateJob: 'updateJob',
		updateRunJob: 'updateRunJob',
		disableScenario: 'disableScenario',
		enableScenario: 'enableScenario',
		sendProjectInfos: 'sendProjectInfos',
		setMode: 'setMode',
		updateDisabledScenarios: 'updateDisabledScenarios',
		setBusy: 'setBusy',
		setIdle: 'setIdle',
		sendBAMNotification: 'sendBAMNotification'
	};
	
	// commands Server --> Client 
	var _clientCommand = {
		getClientState: 'getClientState',
		receiveEvent: 'receiveEvent',
		notifyJob: 'notifyJob',
		cancelJob: 'cancelJob',
		restartClient: 'restartClient',
		reinitializeClient: 'reinitializeClient',
		runJob: 'runJob',
		updateClientInfos: 'updateClientInfos'
	};

	/** @type {Array<ctx.scenarioClass>} */ var _registeredScenarios = [];
	///** @type {Array<ctx.scenarioClass>} */ var _disabledScenarios = [];

	var _jobFilename = 'jobs.json';
	/** @type {Object} */ var _jobs = null;
	var _keyFilename = 'keys.json';
	/** @type {Object} */ var _keys = null;
	var _settingFilename = 'settings.json';
	/** @type {Object} */ var _settings = null;
	var _clientFilename = 'clients.json';
	/** @type {Object} */ var _clients = null;
	var _autoRunEnabled = false;
	var _running = false;
	var _busy = false;
	var _restartClientCommandReceived = false;
	var _sessionIds = {};
	var _m2mId = '';
	var _agentUid = '';
	var _sessionId = '';
	var _authorized = false;
	var _emulatedMode = false;
	/** @type {e.error} */ var _serverAuthenticationResult = e.error.None;
	var _serverAuthenticationSkipped = false;
	var _localJobs = [];
	var _dontUpdateSystray = false;

	// Current environment
	var _currentEnvironment = '';
	
	/** *** Galaxy API version ***
	* |Vers.| Comment
	* | 1.0 | Initial version
	* | 1.1 | modified credential format : "<login>|<cyphered password>"
	*/
	var _APIVersion = '1.1';
	var _serverAPIVersion = '1.1';
	
	/** @type {string} */ var _configurationUid = '';
	/** @type {string} */ var _packageVersionUid = '';
	/** @type {string} */ var _packageUid = '';
	/** @type {Array} */ var _availableProjects = null;
	
	//var _publicCypheringKey = '';
	var _m2mSupervisorId = 'Supervisor';
  /** @type {number} */ var _timerMonitoring = 0;
  /** @type {number} */ var _timerMonitoringDelay = 60000;
  /** @type {number} */ var _timerMonitoringTimeout = 20000;	
	//var _projectInfo = null;
	/** @type {ctx.systrayClass} */ var _systray = null;
	
	var _executeServerCommand = {};
	var _executeClientCommand = {};
	/** @type {Object<string, function(e.error, string, Object)>} */ var _pendingNotifications = {};
	
	var popup = ctx.popup({ pCtxtJobProgress: {
		template: e.popup.template.NoButton,
		titleVisible: false,
		//highlight: true,
		//fade: 500,
		XRelative: e.popup.position.Right,
		YRelative: e.popup.position.Top,
    autoClose: 0, 
		X: e.popup.position.Right,
		Y: e.popup.position.Top,
		icon: undefined,
		CX: 900,
		closeOnClick: false,
		color: e.popup.color.None,
		IEHost: true,
		message: undefined,
		buttons: {
      ok: {
        value: GLOBAL.labels.buttons.close,
        type: e.item.style.Link
      }
		}
	}});
	
	var _jobToJobContentConverter = function(job){
		//convert
		var jobContent = ctx.dataManagers.jobContent.create();
		if (job.id)
			jobContent.uid = job.id;
		if (job.status)
			jobContent.status = job.status;
		jobContent.notify = job.notify;
		jobContent.attended = job.attended;
		jobContent.scenarioUid = job.scenarioId;
		jobContent.scenarioName = job.scenario;
		if (job.dataSource)
			jobContent.batchName = job.dataSource;
		jobContent.previousJobs = job.previousJobs;
		//jobContent.packageVersionUid = job.project || _packageVersionUid;
		jobContent.runGroupUid = job.groupId;
		//jobContent.configurationUid = _configurationUid;
		jobContent.dataFormat = job.format || e.data.format.json;
		if (job.data) {
			if (typeof job.data === 'object') {
				var tmp = ctx.json.stringify(job.data);
				if (tmp.length > 65000) job.data = {};
			}
			else if (typeof job.data === 'string') {
				if (job.data.length > 65000) job.data = '{}';
			}
			jobContent.data = job.data;
		}
		jobContent.priority = job.priority;
		if (job.label)
			jobContent.detail = job.label;
		switch (job.status) {
			case e.status.New:
				jobContent.status = 'ready';
				break;
			case e.status.Successful:
				jobContent.status = 'successful';
				break;
			case e.status.Failed:
				jobContent.status = 'failed';
				break;
			case e.status.Canceled:
				jobContent.status = 'canceled';
				break;
		}
		return jobContent;
	};

	var _jobContentToJobConverter = function(jobContent){
		//convert
		var job = new ctx.jobClass();
		if (jobContent) {
			job.id = jobContent.uid;
			job.status = jobContent.status;
			job.notify = jobContent.notify;
			job.attended = jobContent.attended;
			job.scenarioId = jobContent.scenarioUid;
			job.scenario = jobContent.scenarioName;
			job.dataSource = jobContent.batchName;
			job.previousJobs = jobContent.previousJobs;
			job.project = jobContent.packageVersionUid;
			job.groupId = jobContent.runGroupUid;
			job.format = jobContent.dataFormat || e.data.format.json;
			job.data = jobContent.data || "{}";
			job.priority = jobContent.priority;
			job.label = jobContent.detail;
			job.passport = jobContent.passport;
			job.code = "";
			switch (jobContent.status) {
				case 'ready':
					job.status = e.status.New;
					break;
				case 'successful':
					job.status = e.status.Successful;
					break;
				case 'failed':
					job.status = e.status.Failed;
					break;
				case 'canceled':
					job.status = e.status.Canceled;
					break;
				default:
					job.status = jobContent.status;
					break;
			}
		}
		return job;
	};

	var _showEmulatedModeMenu = function() {
		if (!systray) return;
		systray.addMenu('', 'M2MEmulator', 'M2M Supervisor emulation');
		systray.addMenu('M2MEmulator', 'evM2MSendAllJobs', 'Send all jobs to client', '', function(ev) {
			ctx.galaxyAPI.sendAllJobs (null, '', function(code, label, job) {
				ctx.log(job, e.logIconType.Info, 'All jobs were executed');
			});
		});

		systray.addMenu('M2MEmulator', 'evM2MAnableAutoRun', 'Enable auto run', '', function(ev) {
			var enabled = !ctx.galaxyAPI.getAutoRun();
			ctx.galaxyAPI.enableAutoRun(enabled);
			systray.check('evM2MAnableAutoRun', enabled);
		});

		systray.addMenu('M2MEmulator', 'evM2MSendNextJob', 'Send next job to client', '', function(ev) {
			ctx.galaxyAPI.searchJobAndSend (null, '', function(code, label, job) {
				ctx.log(job, e.logIconType.Info, 'Job executed with result: ' + code);
			});
		});

		systray.addMenu('M2MEmulator', 'evM2MExecuteJob', 'Get and run a Job from client', function(ev) {
			ctx.galaxyAPI.getJobAndRun(null, function(code, label, job) {
				ctx.log(job, e.logIconType.Info, 'Job executed with result: ' + job.code);
			});
		});	
	}
		
//	var _showProgressPopup = function(job, running) {
//		if (job) {			
//			var color = 'blue';
//			switch (job.status) {
//				case e.status.Running:
//				{
//					color = 'cyan';
//					break;
//				}
//				case e.status.Successful:
//				{
//					color = 'green';
//					break;
//				}
//				case e.status.Failed:
//				{
//					color = 'red';
//					break;
//				}
//			}
//			var ts = '', tsRun = '';
//			var status = '<font color="' + color + '">' + job.status + '</font>';
//			var name = (job.name || job.appliName + '.' + job.scenario);
//			if (job.tsRun)
//				tsRun = job.tsRun.substring(job.tsRun.indexOf(' ') + 1);
//			if (job.ts)
//				ts = job.ts.substring(job.ts.indexOf(' ') + 1);
//			if (running) {
//				_runningMessage = '<tr><td><b>' + ts + '</b></td><td><b>' + tsRun + '</b></td><td><b>' + job.duration + '</b></td><td><b><font color="' + color + '">' + job.status + '</font></b></td><td>' + (job.name || job.appliName + '.' + job.scenario) + '</td><td>' + job.label + '</td></tr>';
//				//_runningJob = [ ts, tsRun, job.duration, status, name, job.label ];
//			} else {
//				//_runningJob = null;
//				_runningMessage = '';
//				_progressMessage += '<tr><td><b>' + ts + '</b></td><td><b>' + tsRun + '</b></td><td><b>' + job.duration + '</b></td><td><b><font color="' + color + '">' + job.status + (job.status === e.status.Failed ? ' (' + job.code + ')' : '') + '</font></b></td><td>' + (job.name || job.appliName + '.' + job.scenario) + '</td><td>' + job.label + '</td></tr>';
//				/*var jobRow = [ ts, tsRun, job.duration, status, name, job.label ];
//				_progressJobs.push(jobRow);
//				while (_progressJobs.length > ctx.options.galaxyAPI.progressJobCount) {
//					// remove oldest data
//					_progressJobs.shift();
//				}*/
//				if (_progressMessageCount > ctx.options.galaxyAPI.progressJobCount) {
//					// remove oldest data
//					_progressMessage = _progressMessage.substring(_progressMessage.indexOf('</tr>') + 5);
//				} else 
//					_progressMessageCount ++;
//			}
//			if (systray) {
//				systray.addToJobList(job); //to update job list in new systray
//			}		
//		}
//		// display a progress popup
//		if (ctx.options.galaxyAPI.showProgress) {
//			var css = "<style> \
//table { \
//    font-family: arial, sans-serif; \
//    font-size: 0.8em; \
//    border-collapse: collapse; \
//    width: 100%; \
//} \
//td, th { \
//    border: 1px solid #dddddd; \
//    text-align: left; \
//    padding: 2px; \
//} \
//tr:nth-child(even) { \
//    background-color: #dddddd; \
//} \
//</style>";
//			var content = css + '<table><tr><th>Creation</th> <th>Execution</th> <th>Dur.</th> <th>Status</th> <th>Name</th> <th>Label</th> </tr>' + _progressMessage + _runningMessage + '</table>';

//			ctx.popups.pCtxtJobProgress.open({
//				message: content
//				//data: _progressJobs
////			}).wait(function(ev) {
////				if (_runningJob) {
////					_progressJobs.push(_runningJob);
////				}
////				ctx.popups.pCtxtJobProgress.jobTable.setAll(_progressJobs);
////				if (_runningJob) {
////					_progressJobs.pop();
////				}
//			}).waitClose(function(ev) {
//				ctx.galaxyAPI.toggleOption('showProgress', false);
//				systray.check('evM2MProgressPopup', ctx.options.galaxyAPI.showProgress);
//			});;
//		} else {
//			ctx.popups.pCtxtJobProgress.close();
//		}
//	}
	
	/** Send 'disabledScenarios' message
	* @param {function(e.error, string)} [callback]
	*/
	var _updateDisabledScenarios = function(callback) {
		var disabledScenarios = ctx.dataManagers.disabledScenarios.create();
		disabledScenarios.disabledScenarios = [];
		ctx.each(ctx.app, function(name, app) {
			ctx.each(app.scenarios, function(name, scenario) {
				if (scenario.disabled) {
					var scn = {
						appliName: scenario.parent.name,
						scenario: scenario.name,
						comment: scenario.comment
					}
					disabledScenarios.disabledScenarios.push(scn);
				}
			});
		});
		self.sendCommand(_serverCommand.updateDisabledScenarios, disabledScenarios, function(code, label) {
			if (callback && ('function' === typeof callback)) {
				callback(e.error.OK, "");
			}
		}, false, undefined, 0, e.error.OK, "", true);			
	}
	
	_executeClientCommand[_clientCommand.receiveEvent] = function(obj, source, resObj, answer) {
		resObj = resObj || { code: e.error.None };
		var ev = new ctx.event(obj);
		ctx.onEvent(ev.appliName, ev.pageName, ev.itemName, ev.itemIndex, ev.name, ev.data, ev.appliInst, ev.pageInst, ev.itemInst, ev.reqAppliName, ev.reqEventName, ev.reqItemName, ev.reqAppliInst);		
		resObj.code = e.error.OK;
		return null;
	}

	_executeClientCommand[_clientCommand.notifyJob] = function(obj, source, resObj, answer) {
		resObj = resObj || { code: e.error.OK, label: '' };
		resObj.code = e.error.OK;
		///** @type {ctx.jobClass} */ var job = ctx.job(obj);
		/** @type {ctx.jobClass} */ var job = _jobContentToJobConverter(obj);
		ctx.log({}, e.logIconType.Info, 'ctx.galaxyAPI: Job \''+ job.id + '\' was modified', _options);
		if (job.id && _pendingNotifications[job.id] && ('function' === typeof _pendingNotifications[job.id])) {
			// Code is always OK : if notifyJob is incoming, it means the addJob (and runJob) were technically successful
			// The job execution status is in job.status
			_pendingNotifications[job.id](resObj.code, resObj.label, job);
			delete _pendingNotifications[job.id];
		}
		return null;
	}

	_executeClientCommand[_clientCommand.cancelJob] = function(obj, source, resObj, answer) {
		resObj = resObj || { code: e.error.OK, label: '' };
		resObj.code = e.error.OK;

		if (!obj)
			return undefined;
		
		ctx.wait(function(ev) {

			try {
				var jobUid = obj.uid;
				var bFound = false;
				
				for (var i in ctx.runningScenarios.map) {
		      var sc = ctx.runningScenarios.map[i];
		      if (sc.running && sc.job.id == jobUid) {
						// Cancel the running scenario
						sc.endScenario(true);
						bFound = true;
						break;
		      }
		    }
				
				if (!bFound) {
					resObj.code = e.error.KO;
					resObj.label = GLOBAL.labels.error.InvalidArgument;
				}
			}
			catch(e) {}
		
		}, 100);
		
		return null;
	}

	_executeClientCommand[_clientCommand.restartClient] = function(obj, source, resObj, tid) {
		if (!_restartClientCommandReceived) {	// if restartClient command has already been received, ignore the following ones
			_restartClientCommandReceived = true;
			
			resObj = resObj || { code: e.error.None };
			resObj.code = e.error.OK;
			// restart client (don't wait idle state), and switch on first project
			ctx.wait(function(ev) {
				//if (!_switchProject(0, false, false, false)) {
				ctx.switchOrShutdown(false, true);
			}, 500);
		}

		return null;
	}

	_executeClientCommand[_clientCommand.getClientState] = function(obj, source, resObj, answer) {
		resObj = resObj || { code: e.error.None };
		resObj.code = e.error.OK;
		return { state: 'Ready' };
	}
	
	_executeClientCommand[_clientCommand.updateClientInfos] = function(updateClientInfos, source, resObj, answer) {
		
		// Asynchronism to send the ack of updateClientInfos before requesting to switch
		ctx.wait(function(ev) {
			resObj = resObj || { code: e.error.None };
			ctx.log(updateClientInfos, e.logIconType.Info, 'Received Project update', _options);
			if (updateClientInfos && ('object' === typeof updateClientInfos)) {
				if (updateClientInfos.availableProjects) {
					
					// If old agent ( < 1.0.5 ) get the current packageversionuid
					if (ctx.compareVersion('1.0.5.0') < 0) {
						if (_packageVersionUid == '') { // if _packageVersionUid is valued, we are on a project, receiving a new updateclientInfos (unattended)
							_packageVersionUid = ctx.registry.get('Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentProject', e.registry.root.CurrentUser) + '';
							if ( updateClientInfos.availableProjects.length >= 1 && (!_packageVersionUid || _packageVersionUid == 'undefined')) _packageVersionUid = updateClientInfos.availableProjects[0].packageVersionUid;
							self.sendProjectInfos();
						}
					}
					
					_availableProjects = updateClientInfos.availableProjects;
					ctx.availableProjects = _availableProjects;

					//update project list in new systray
					if  ('undefined' !== typeof systray) {
						systray.updateProjectList(ctx.availableProjects, _packageVersionUid);
					}

					// Change project if needed / requested / authorized
					// --------------------------------------------------
					var _autoswitch = ctx.registry.get(_autoSwitchKey);
					
					var currentProjectVersion = _packageVersionUid;
					var targetProjectVersion = _packageVersionUid;
					var targetProject = _packageUid;
					
					if (currentProjectVersion == '') { // We are on default. Maybe we have to go to the last attended project, or switch to a project requested by an old SDK
						var requestedProjectVersion = '';

						// If attended mode, trying to restart on last known attended project
						if (!_autoswitch) {
							requestedProjectVersion = ctx.registry.get('Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProjectVersion', e.registry.root.CurrentUser);
							if (requestedProjectVersion) {
								targetProjectVersion = requestedProjectVersion;
							}
							targetProject = ctx.registry.get('Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProject', e.registry.root.CurrentUser);
							if (!targetProject) targetProject = _packageUid;
						}
						
						// If there is an old CurrentProject key, old fashionned switch was requested
						requestedProjectVersion = ctx.registry.get('Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentProject', e.registry.root.CurrentUser);
						if (requestedProjectVersion) {
							// We want to switch to the requested project in registry (old switch mode)
							targetProjectVersion = requestedProjectVersion;
							// Delete CurrentProject registry entry
							ctx.registry.del('Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentProject', e.registry.root.CurrentUser);
							// key Create LastAttendedProjectVersion
							ctx.registry.set('Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProjectVersion', targetProjectVersion, e.registry.root.CurrentUser);
						}
					}
					
					// Here targetProjectVersion contains the project we want to switch to
					
					var projectFound = false
					var requestedPackageUid = '';
					var requestedPackageVersionUid = '';
					var requestedEnvironmentUid = '';


					
					// Search if target project is in list
					ctx.each(ctx.availableProjects, function(id, val) {
						if (val['packageVersionUid'] == targetProjectVersion) {
							projectFound = true; // Current project still authorized : staying on it
							requestedPackageUid = val['packageUid'];
							requestedPackageVersionUid = val['packageVersionUid'];
							
							var env = val['environmentUid'];
							if (!env) env = val['environmentClassifier'];
							ctx.registry.set("Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProjectEnvironment", env);

							return false;
						}
					});
					
					if (!projectFound) { // Need to switch
						if (_autoswitch) {
							if (ctx.availableProjects.length >= 1) {
								// Switch to 1st project
								//ctx.wkMng.SwitchProject(ctx.availableProjects[0]['packageUid'], ctx.availableProjects[0]['packageVersionUid']);
								ctx.galaxyAPI.setBusy(true, function(code) {
									ctx.restartOnProject(ctx.availableProjects[0]['packageUid'], ctx.availableProjects[0]['packageVersionUid']);
								});
							}
							else {
								// Switch to default if not already on it
								if (_packageVersionUid != '') ctx.shutdownAgent(true, true);
							}
						}
						else {
							// Try to find another version of the same project in the same environment
							var currentProjectEnvironment = ctx.registry.get('Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProjectEnvironment', e.registry.root.CurrentUser);

							projectFound = false;
							ctx.each(ctx.availableProjects, function(id, val) {
								var testedProjectEnvironment = val['environmentUid'];
								if (!testedProjectEnvironment) testedProjectEnvironment = val['environmentClassifier'];

								if (val['packageUid'] == targetProject && (!currentProjectEnvironment||testedProjectEnvironment == currentProjectEnvironment)) {
									projectFound = true; // Found another version of the project in the same environment (or in the same environmentClassifier
									requestedPackageUid = val['packageUid'];
									requestedPackageVersionUid = val['packageVersionUid'];
									requestedEnvironmentUid = testedProjectEnvironment;
									return false;
								}
							});
							
							if (projectFound) {
								// Automatic switch to an other version in the same environment (even if in manual mode)
								ctx.registry.set("Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProjectVersion", requestedPackageVersionUid);
								ctx.registry.set("Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProject", requestedPackageUid);
								ctx.registry.set("Software\\SAP\\Intelligent RPA\\Desktop Agent\\LastAttendedProjectEnvironment", requestedEnvironmentUid);

								// ctx.wkMng.SwitchProject(requestedPackageUid, requestedPackageVersionUid);
								ctx.galaxyAPI.setBusy(true, function(code) {
									ctx.restartOnProject(requestedPackageUid, requestedPackageVersionUid);
								});
							}
							else {
								// Switch to default if not already on it
								if (_packageVersionUid != '') ctx.shutdownAgent(true, true);
							}
							
						}
					}
					else {
						if (currentProjectVersion != targetProjectVersion) {
							// Switch to target project
							// ctx.wkMng.SwitchProject(requestedPackageUid, requestedPackageVersionUid);
							ctx.galaxyAPI.setBusy(true, function() {
								ctx.restartOnProject(requestedPackageUid, requestedPackageVersionUid);
							});
						}
					}
				}
			}		
			
		}, 100);

		// reply to server
		resObj.code = e.error.OK;
		return null;
	}

	_executeClientCommand[_clientCommand.runJob] = function(obj, source, resObj, answer) {
		resObj = resObj || { code: e.error.None };
		var jobData = _jobContentToJobConverter(obj);
		ctx.wait(function(ev) {
			var res = self.runJob(jobData, function(code, label, job) {
				//_showProgressPopup(job, false);
				if (systray)
					systray.addToJobList(job);
				
				// send job update to server
				var updateReceived = false;
				var timerUpdateReceived = 0;
			  var jobContent = _jobToJobContentConverter(job);
				res = self.sendCommand(_serverCommand.updateRunJob, jobContent, function(code, label, data) {
					if  ('undefined' !== typeof systray) {
						systray.updateRunningStatus(false, job);
					}
					updateReceived = true;
					if (timerUpdateReceived) 
						clearTimeout(timerUpdateReceived);
					if (code != e.error.OK) {
						job.save(); // save job locally
					}
					if (ctx.shutdownOnIdle && (!job.attended)) {
						ctx.shutdownAgent(ctx.restartAgent, false);
					}
				}, false, source, 0, code, "", true);			
			});
		}, 100);		
		//if (ctx.options.m2m.useWebSockets) {
			// CPUG 18/01/2019 : temporary workaround for IRPA server !! don't send an answer to 'runJob' message
			return undefined; 
		//} else {
		//	return null; // standard answer
		//}
	}

		// Environment management in Studio Mode
		// -------------------------------------
	_executeServerCommand[_serverCommand.sendClientInfos] = function(clientInfosAnswer, source, resObj, answer) {
		if (answer && resObj && (resObj.code == e.error.OK)) {
			ctx.m2m.setConnected(true);
			if  ('undefined' !== typeof systray) {
				systray.updateEnvironmentList(clientInfosAnswer.availableEnvironments, clientInfosAnswer.studioMode);
			}
			// send setMode
			var autoswitch = ctx.registry.get(_autoSwitchKey);
			self.setMode ((autoswitch ? e.agentMode.unattended : e.agentMode.attended), function(code, label) {
				// Send sendProjectInfos
				if (ctx.compareVersion('1.0.5.0') >= 0) {
					self.sendProjectInfos ();
				}
			});
		} else {
			ctx.m2m.setConnected(false);
		} 
		// no answer to server
		return undefined;
	}

	/**
	* @param {ctx.jobClass} job 
	* @param {function(e.error, string, ctx.jobClass)} [callback]
	* @param {number} [jobIndex]
	* @param {ctx.scenarioClass} [scenario]
	* @param {Object} [data]
	*/
	function _getPreviousJobsAndRun(job, callback, jobIndex, scenario, data) {
		data = data || job.data;
		scenario = scenario || null;
		var index = jobIndex || 0;
		if ((!scenario) && job && job.scenarioId) {
				// search by scenarioId
			ctx.each(ctx.app, function(appliName, app) {
				ctx.each(app.scenarios, function(scnName, scn) {
					if (scn && (scn instanceof ctx.scenarioClass) && (job.scenarioId == scn.scenarioId)) {
						scenario = scn;
						return false;
					}
				});
				if (scenario) return false;
			});
		}
		if ((!scenario) && job) {
			if (job.appliName) {
				// search by scenarioName and appliName
				/** @type {ctx.application} */ var app = ctx.app[job.appliName];
				if (app && app.scenarios) {
					scenario = app.scenarios[job.scenario];
				}
			} else {
				// search by scenarioName (without appliName)
				ctx.each(ctx.app, function(appliName, app) {
					if (app && app.scenarios && app.scenarios[job.scenario]) {
						scenario = app.scenarios[job.scenario];
						return false;
					}
				});
			}
		}
		
		if (!scenario) {
			//unknown scenario
			job.status = e.status.Failed;
			job.code = e.error.InvalidArgument;
			job.label = 'Unknown job type: ' + job.appliName + '.' + job.scenario;
			ctx.log(job, e.logIconType.Warning, 'ctx.galaxyAPI.runJob: '+ job.label, _options);
			if (callback && ('function' === typeof callback)) {
				callback(job.code, job.label, job);
			}
			return;
		} 
		if (scenario && (scenario instanceof ctx.scenarioClass)) {
			var sc = scenario;
			if ((job.format == e.data.format.xjson) || (scenario.key && (job.key != scenario.key))) {
				if (!job.id)
					job.id = ctx.uuid();
				// data could not be decrypted (no private key ?), or was not cyphered with the expected key
				// send an alert
				/*ctx.galaxyAPI.addAlert(e.alert.level.Warning, e.alert.category.Security, job.id, "Job data could not be decrypted", function(code, label) {
					// disable during 1 hour
					ctx.galaxyAPI.disableScenario(sc, 60, function(code, label) {
						job.status = e.status.New;
						job.code = e.error.None;
						job.label = '';
						if (callback && ('function' === typeof callback)) {
							callback(job.code, job.label, job);
						}
					}); 
				});*/
//				job.status = e.status.Failed;
//				job.code = e.error.Fail;
//				job.label = 'Data decryption failed';
//				ctx.log(job, e.logIconType.Warning, 'ctx.galaxyAPI.runJob: '+ job.label, _options);
//				if (callback && ('function' === typeof callback)) {
//					callback(job.code, job.label, job);
//				}
				return ;
			}
		} 
		if (job.previousJobs && job.previousJobs[index]) {
			var id = job.previousJobs[index];
			ctx.galaxyAPI.getJob({ id: id }, function(code, label, previousJob) {
				if ((code == e.error.OK) && (previousJob) && (previousJob.data)) {
					// merge data
					//_archiver.merge(data, previousJob.data);
					index++;
					_getPreviousJobsAndRun(job, callback, index, scenario, data);
				} else {
					job.status = e.status.Failed;
					job.code = e.error.InvalidArgument;
					job.label = 'Could not get previous job : ' + id;
					ctx.log(job, e.logIconType.Warning, 'ctx.galaxyAPI.runJob: '+ job.label, _options);
					if (callback && ('function' === typeof callback)) {
						callback(job.code, job.label, job);
					}
				}
			});
		} else {
			// got all previous jobs, now run
			scenario.onEnd(function(sc) {
				if (_m2mId)
					sc.job.runBy = _m2mId;			
				if (callback && ('function' === typeof callback)) {
					callback(sc.code, sc.label, sc.job);
				}
			});
			scenario.start(data, job);
		}
	}
	
	var self = 
	/** @lends ctx.galaxyAPI */
	{
		/**
		* Adds an alert
		* @method addAlert
		* @path ctx.galaxyAPI.addAlert
		* @param {e.alert.level} severity
		* @param {e.alert.category} category
		* @param {string} subCategory
		* @param {string} message
		* @param {function(e.error, string, Object)} [callback]
		* @return {boolean}
		*/
		addAlert : function (severity, category, subCategory, message, callback) {
			ctx.notifyAction('ctx.galaxyAPI.addAlert');
			var alertContent = ctx.dataManagers.alertContent.create();
			//var alert = {};
			//alert.ts = ctx.getTimestamp(null, false, undefined, true); // creation timestamp
			//alert.m2mId = _m2mId;
			//alert.machine = ctx.options.computerName;
			//alert.userName = ctx.options.userName;
			alertContent.severity = severity;
			alertContent.category = category;
			alertContent.subCategory = subCategory;
			alertContent.message = message;
			ctx.log('ctx.galaxyAPI.addAlert: ' + message, e.logIconType.Warning, alertContent);
			var res = self.sendCommand(_serverCommand.addAlert, alertContent, callback);
			return res;
		},

		/**
		* Adds a job
		* @method addJob
		* @path ctx.galaxyAPI.addJob
		* @param {Object} obj initialization object or job
		* @param {ctx.dataClass|function(e.error, string, ctx.jobClass)} [data] initialization data or callback
		* @param {boolean|function(e.error, string, ctx.jobClass)} [notify]
		* @param {function(e.error, string, ctx.jobClass)} [callback]
		* @return ctx.jobClass
		*/
		addJob : function (obj, data, notify, callback) {
      ctx.notifyAction('ctx.galaxyAPI.addJob');
			var res = false;
			if ('function' === typeof data) {
				callback = data;
				data = undefined;
				notify = false;
			}
			if ('function' === typeof notify) {
				callback = notify;
				notify = false;
			}
			/** @type {ctx.jobClass} */ var job = null;
			if (obj && (obj instanceof ctx.jobClass)) {
				job = obj;
				//job.init();
			} else {
				//job = ctx.job(obj, data, true);
				job = ctx.job(obj, data, false);
			}
//			if (ctx.options.galaxyAPI.selfTestMode && _m2mId && (!job.destination)) {
//				job.destination = _m2mId;	// force destination to have the job distributed to myself
//			}
			if (notify) {
				job.notify = true;
			}
			if (_m2mId && (!job.source)) {
				job.source = _m2mId;	
			}
			if (job.attended === undefined) job.attended = false;
			
			/** @type {function(e.error, string, ctx.jobClass)} */ var addCallback;
			if ('function' === typeof callback) {
				addCallback = function(code, label, data) {
					if ((code == e.error.OK) && data) {
						var jobRes = _jobContentToJobConverter(data);
						job.id = jobRes.id;
						job.groupId = jobRes.groupId;
						job.passport = jobRes.passport;
					} else {
						ctx.log("ctx.galaxyAPI.addJob failed: '" + label + "'", e.logIconType.Warning, "", _options);
						
						
							var labelForSystray = '';
							switch (code) {
								case e.error.OK:
								case e.error.KO:
								case e.error.Fail:
								{
									// non significative error code, use Factory detailed label
									if (label) 
										labelForSystray = label;
									break;
								}
								default:
								{
									// use Factory error code
									if (GLOBAL.labels.error[code])
										labelForSystray = GLOBAL.labels.error[code];
									else
										labelForSystray = label;
									break;
								}
							}
					
							if  ('undefined' !== typeof systray) {
								systray.updateAgentStatus(e.agentStatus.Warning, labelForSystray, '');
							}
							var jobToDisplay = ctx.job(job);
							jobToDisplay.id = ctx.uuid();
							jobToDisplay.code = e.error.KO;
							jobToDisplay.status = e.status.Rejected;
							jobToDisplay.label = labelForSystray;
							jobToDisplay.ts = ctx.getTimestamp();
							if  ('undefined' !== typeof systray) {
								systray.addToJobList(jobToDisplay);
							}					
					}
					callback(code, label, job);
				}
			}
			var jobContent = _jobToJobContentConverter(job);
			res = self.sendCommand(_serverCommand.addJob, jobContent, addCallback, false, undefined, undefined, e.error.None, "", true);
			if (!res) {
				job.save(); // save job locally
			}
			return job;
		},

		/**
		* Updates a job after execution		* @method updateRunJob
		* @path ctx.galaxyAPI.updateRunJob
		* @param {ctx.jobClass} job job to be sent
		* @param {function(e.error, string, Object)} [callback]
		* @return ctx.jobClass
		*/
		updateRunJob : function (job, callback) {
      ctx.notifyAction('ctx.galaxyAPI.updateRunJob');
			var jobContent = _jobToJobContentConverter(job);
			var res = self.sendCommand(_serverCommand.updateRunJob, jobContent, callback, false, undefined, undefined, e.error.None, "", true);
			// update Systray status
			if  ('undefined' !== typeof systray) {
				systray.updateRunningStatus(false, job);
			}
			
			return job;
		},

		/**
		* Adds a job, and waits until it is executed
		* @method addJobAndWaitRun
		* @path ctx.galaxyAPI.addJobAndWaitRun
		* @param {Object} obj initialization object or job
		* @param {ctx.dataClass|function(e.error, string, Object)} [data] initialization data or callback
		* @param {function(e.error, string, Object)} [callback]
		* @return boolean
		*/
		addJobAndWaitRun : function (obj, data, callback) {
      ctx.notifyAction('ctx.galaxyAPI.addJobAndWaitRun');
			if ('function' === typeof data) {
				callback = data;
				data = undefined;
			}
			var res = self.addJob(obj, data, true, function(code, label, job) {
				if (callback && ('function' === typeof callback)) {
					if (code != e.error.OK)
						callback(code, label, job);
					else
						_pendingNotifications[job.id] = callback;
				} 
			});
			return res;
		},

		/**
		* Adds a set of jobs from an array, or a filename
		* @method addJobList
		* @path ctx.galaxyAPI.addJobList
		* @param {ctx.arrayClass|string} [jobsOrFilename] an array of jobs or job data, or a filename 
		* @param {Object} [params] optional parameters to be added to job
		* @param {function(e.error, string, ctx.arrayClass)} [callback]
		* @return {boolean}
		*/
		addJobList : function (jobsOrFilename, params, callback) {
			var data;
			if (jobsOrFilename && jobsOrFilename.ctxArray) {
				data = { jobs: jobsOrFilename, params: params };
			} else {
				data = { filename: jobsOrFilename, params: params };
			}
			GLOBAL.scenarios.scAddJobs.start(data).onEnd(function(sc2) {
				if (callback && ('function' === typeof callback)) {
					callback(sc2.code, sc2.label, sc2.data.jobs);
				}
			});
			return true;
		},

		/**
		* Enables the auto-run mode when using the local job storage
		* @ignore
		* @method enableAutoRun
		* @path ctx.galaxyAPI.enableAutoRun
		* @param {boolean} enable
		* @return {boolean}
		*/
		enableAutoRun : function (enable) {
      ctx.notifyAction('ctx.galaxyAPI.enableAutoRun');
			_autoRunEnabled = enable;
			if (_autoRunEnabled) {
				self.sendAllJobs(null, '');
			}
			return true;
		},

		/**
		* @ignore
        * Returns the client M2M id
		* @method getAutoRun
		* @path ctx.galaxyAPI.getM2MId
		* @return {string}
		*/
		getM2MId : function () {
			return _m2mId;
		},

		/**
		* @ignore
        * Returns the auto-run state
		* @method getAutoRun
		* @path ctx.galaxyAPI.getAutoRun
		* @return boolean
		*/
		getAutoRun : function () {
			return _autoRunEnabled;
		},

		/**
		* @ignore
        * Retieves a job from the storage
		* @method getJob
		* @path ctx.galaxyAPI.getJob
		* @param {Object} jobCriteria initialization object or job
		* @param { function(e.error, string, Object) } [callback]
		* @return boolean
		*/
		getJob : function (jobCriteria, callback) {
			ctx.notifyAction('ctx.galaxyAPI.getJob');
			var res = false;
			var criteria = {};
			/** @type {ctx.jobClass} */ var job = null;
			if (jobCriteria) {
				if (jobCriteria instanceof ctx.jobClass) {
					job = jobCriteria;
				} else {
					job = ctx.job(jobCriteria);
				}
				ctx.each(job, function(criterium, value) {
					if (value) { criteria[criterium] = value; }
				});
				if (jobCriteria.indexAfter !== undefined) { criteria.indexAfter = jobCriteria.indexAfter; }
				//if (!criteria.status) 
				//	criteria.status = e.status.New;
				//if (criteria.project === undefined)
				//	criteria.project = ctx.options.projectName;
				res = self.sendCommand(_serverCommand.getJob, criteria, callback);
			}
			return res;
		},

		/**
		* Retieves a credential from the storage
		* @method getCredential
		* @path ctx.galaxyAPI.getCredential
		* @param {string|ctx.cryptography.credentialClass} credentialObjOrName credential name or object
		* @param { function(e.error, string, ctx.cryptography.credentialClass) } [callback]
		* @return boolean
		*/
		getCredential : function (credentialObjOrName, callback) {
			ctx.notifyAction('ctx.galaxyAPI.getCredential');
			var res = false;
			/** {@type ctx.cryptography.credentialClass} */ var credential = ctx.cryptography.searchCredential(credentialObjOrName); 
			if (credential instanceof ctx.cryptography.credentialClass) {
				var serverVariable = ctx.dataManagers.serverVariable.create();
				serverVariable.name = credential.name;
				serverVariable.type = e.variable.credential;

				if (ctx.isStudioUsed()) {
					var longEnv = '';
					_currentEnvironment = ctx.registry.get('Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentEnvironment', e.registry.root.CurrentUser);
					if (_currentEnvironment && _currentEnvironment.length >= 32) {
						if (_currentEnvironment.length == 32)
							// The guid stored in systray has been stored without '-' to match the old systray restrictions
							longEnv = _currentEnvironment.substring(0,8) + '-' + _currentEnvironment.substring(8,12) + '-' + _currentEnvironment.substring(12,16) + '-' + _currentEnvironment.substring(16,20) + '-' + _currentEnvironment.substring(20);
						else
							longEnv = _currentEnvironment;
						
						serverVariable.environmentUid = longEnv;
					}
				}

				res = self.sendCommand(_serverCommand.getVariable, serverVariable, function(code, label, serverVariableAnswer) {
					if (serverVariableAnswer && (code === e.error.OK)) {
						if ((serverVariableAnswer.userName !== undefined) && (serverVariableAnswer.password !== undefined)) {
							credential.userName.set(serverVariableAnswer.userName);
							credential.password.set(serverVariableAnswer.password);
						}
					}
					if (callback && ('function' === typeof callback)) {
						callback(code, label, credential);
					}
				});
			}
			return res;
		},

		/**
		* Retieves a setting from the storage
		* @method getSetting
		* @path ctx.galaxyAPI.getSetting
		* @param {string|ctx.settingClass} settingObjOrName setting name or object
		* @param { function(e.error, string, Object) } [callback]
		* @return boolean
		*/
		getSetting : function (settingObjOrName, callback) {
			ctx.notifyAction('ctx.galaxyAPI.getSetting');
			var res = false;
			/** {@type ctx.settingClass} */ var setting = null; 
			if (settingObjOrName	instanceof ctx.settingClass) {
				setting = settingObjOrName;
			} else if (typeof settingObjOrName === 'string') {
				setting = ctx.settings[settingObjOrName];
			}
			if (setting instanceof ctx.settingClass) {
				var serverVariable = ctx.dataManagers.serverVariable.create();
				serverVariable.name = setting.name;
				serverVariable.type = e.variable.setting;
				
				if (ctx.isStudioUsed()) {
					var longEnv = '';
					_currentEnvironment = ctx.registry.get('Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentEnvironment', e.registry.root.CurrentUser);
					if (_currentEnvironment && _currentEnvironment.length >= 32) {
						if (_currentEnvironment.length == 32)
							// The guid stored in systray has been stored without '-' to match the old systray restrictions
							longEnv = _currentEnvironment.substring(0,8) + '-' + _currentEnvironment.substring(8,12) + '-' + _currentEnvironment.substring(12,16) + '-' + _currentEnvironment.substring(16,20) + '-' + _currentEnvironment.substring(20);
						else
							longEnv = _currentEnvironment;
						
						serverVariable.environmentUid = longEnv;
					}
				}

				res = self.sendCommand(_serverCommand.getVariable, serverVariable, function(code, label, serverVariableAnswer) {
					if (serverVariableAnswer && (code === e.error.OK)) {
						// unserialize data
						if (serverVariableAnswer.value) { 
							serverVariableAnswer.value = ctx.unserialize(serverVariableAnswer.value);
						}
						setting.value = serverVariableAnswer.value;
					}
					if (callback && ('function' === typeof callback)) {
						callback(code, label, setting);
					}
				}, false);
			}
			return res;
		},

		/**
		* Sends a BAM notification
		* @method sendNotification
		* @path ctx.galaxyAPI.sendNotification
		* @param {Object} message string to send
		* @param { function(e.error, string, Object) } [callback]
		* @return boolean
		*/
		sendBAMNotification : function (message, callback) {
			ctx.notifyAction('ctx.galaxyAPI.sendNotification');
			var res = false;
			if (setting instanceof ctx.settingClass) {
					var newMsg = {};
					newMsg.messageContentType = 'bamNotificationInfo';
					newMsg.values = message;
					res = self.sendCommand(_serverCommand.sendBAMNotification, newMsg, function(code, label, answer) {
					if (callback && ('function' === typeof callback)) {
						callback(code, label, answer);
					}
				}, false);
			}
			return res;
		},
		
		/**
		* @ignore
        * Adds a set of jobs from an array, or a filename
		* @method getJobList
		* @path ctx.galaxyAPI.getJobList
		* @param {Object} criteria the criteria to be used to retrieve jobs
		* @param {function(e.error, string, ctx.arrayClass)} [callback]
		* @return {boolean}
		*/
		getJobList : function (criteria, callback) {
			var data = { criteria: criteria };
			GLOBAL.scenarios.scGetJobs.start(data).onEnd(function(sc2) {
				if (callback && ('function' === typeof callback)) {
					callback(sc2.code, sc2.label, sc2.data.jobs);
				}
			});
			return true;
		},

		/**
		* @ignore
        * Retieves a job from the storage, executes it, and updates the result
		* @method getJobAndRun
		* @path ctx.galaxyAPI.getJobAndRun
		* @param {Object} jobCriteria initialization object or job
		* @param { function(e.error, string, Object) } [callback]
		* @return boolean
		*/
		getJobAndRun : function (jobCriteria, callback) {
			ctx.notifyAction('ctx.galaxyAPI.getJobAndRun');
			self.setBusy(true, function(code) {
				self.get(jobCriteria, function(code, label, job) {
					//if (job && ((job.code == e.error.None) || (job.code == e.error.OK))) {
					if (job && (job.code == e.error.None) && (code == e.error.OK)) {
						self.runJob(job, function(code, label, runJob) {
							self.updateJob(runJob, function(code, label, updatedJob) {
								self.setBusy(false, function(code) {
									if (callback && ('function' === typeof callback)) {
										callback(code, label, runJob);
									}
								});
							});
						});
					} else {
						// no valid job to run
						self.setBusy(false, function(code) {
							if (callback && ('function' === typeof callback)) {
								callback(code, '', null);
							}
						});
					}
				});
			});
		},

		/**
		* @ignore
        * Forwards an event to the server
		* @method notifyEvent
		* @path ctx.galaxyAPI.notifyEvent
		* @param {ctx.event} event
		* @param { function(e.error, string) } [callback]
		* @suppress {checkTypes}
		* @return boolean
		*/
		notifyEvent : function (event, callback) {
			ctx.notifyAction('ctx.galaxyAPI.notifyEvent');
			var ev = ctx.ctxShort(event);
			return self.sendCommand(_serverCommand.notifyEvent, ev, callback);
		},

		/**
		* Callback used to handle incoming M2M messages
		* @ignore
		* @method receiveMessageCallback
		* @path ctx.galaxyAPI.receiveMessageCallback
		* @param {string} command command to be executed
		* @param {Object} obj initialization data
		* @param {string} source
		* @param {boolean} answer
		* @param {number} tid
		* @param {e.error} code
		* @param {string} label
		* @return {Object}
		*/
		receiveMessageCallback : function(command, obj, source, answer, tid, code, label) {
			ctx.notifyAction('ctx.galaxyAPI.receiveMessageCallback');
			var result = {
				answer: false,
				handled: false
			}
			if (obj && ('object' === typeof obj)) {
				// unserialize data
				var data = obj.data || obj.dataJson;
				if (data) {
					if (!obj.format) obj.format = e.data.format.json;
					if ((obj.format == e.data.format.xjson) && ('string' === typeof data)) {
						// uncypher data
						var pos = data.indexOf('|');
						if (pos > 0) {
							var keyName = data.substring(0, pos);
							var decryptedData = data.substring(pos + 1);
							/** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyName);
							if (key && key.type) {
								decryptedData = ctx.cryptography.decryptMessage(decryptedData, key);
								if (decryptedData) {
									obj.key = keyName;
									data = decryptedData;
									obj.format = e.data.format.json;
								}
							}
						}
					}
					if ((obj.format == e.data.format.json) && ('string' === typeof data)) {
						data = ctx.unserialize(data, true);
					}
					obj.data = data;
				}
			}
			if ((answer === undefined) && _serverCommand[command]) {
				answer = result.answer = true;
			}
			if (('function' === typeof(_executeServerCommand[command])) || ('function' === typeof(_executeClientCommand[command]))) {
				var resObj = { code: code || e.error.None, label: label || '' };
				// REQUEST received
				var answerObj = null;
				if ('function' === typeof(_executeServerCommand[command])) {
					answerObj = _executeServerCommand[command](obj, source, resObj, answer);
					// send an ANSWER
					if (answerObj !== undefined)
						self.sendCommand(command, answerObj, undefined, true, source, tid, resObj.code, resObj.label);			
				} else {
					answerObj = _executeClientCommand[command](obj, source, resObj, answer);
					// send an ANSWER
					if (answerObj !== undefined)
						self.sendCommand(command, answerObj, undefined, true, source, tid, resObj.code, resObj.label);			
				}
				result.handled = true; 
				return result;
			} else {
				if (!answer) {
				// unknown command : send error
				self.sendCommand(command, null, undefined, true, source, tid, e.error.InvalidCommand);			
				}
			}
			result.handled = false; 
			return result; // not handled by ctx.galaxyAPI
		},
		
		/**
		* Sets a scenario or set of scenarios as disabled (to disable job distribution)
		* @method disableScenario
		* @path ctx.galaxyAPI.disableScenario
		* @param {ctx.scenarioClass} sc
		* @param {number} [timer] optional timer (in minutes) : if set, the scenario(s) are enabled after this delay.
		* @param {function(e.error, string)} [callback]
		* @return boolean
		*/
		disableScenario: function (sc, timer, callback) {
			ctx.notifyAction('ctx.galaxyAPI.disableScenario');
			var changed = false;
			if (sc && (sc instanceof ctx.scenarioClass) && (!sc.disabled)) {
				if (sc.clone) {
					ctx.app[sc.parent.name].scenarios[sc.name].disabled = true;
				} else {
					sc.disabled = true;
				}
				if (timer > 0) {
					setTimeout( function() {
						ctx.galaxyAPI.enableScenario(sc);
					}, timer * 60000);		
				}
				var scenarioContent = ctx.dataManagers.scenarioContent.create();
				scenarioContent.scenarioUid = sc.scenarioId;
				self.sendCommand(_serverCommand.disableScenario, scenarioContent, function(code, label) {
					if (callback && ('function' === typeof callback)) {
						callback(code, label);
					}
				}, false, undefined, 0, e.error.OK, "", true);			
				return true;
			}
			return false;
		},

		/**
		* Sets a scenario or set of scenarios as enabled (to enable job distribution)
		* @method enableScenario
		* @path ctx.galaxyAPI.enableScenario
		* @param {ctx.scenarioClass} sc
		* @param {function(e.error, string)} [callback]
		* @return boolean
		*/
		enableScenario: function (sc, callback) {
			ctx.notifyAction('ctx.galaxyAPI.enableScenario');
			if (sc  && (sc instanceof ctx.scenarioClass) && (sc.disabled)) {
				sc.disabled = false;
				// update scenario to restore job distribution updated
				var scenarioContent = ctx.dataManagers.scenarioContent.create();
				scenarioContent.scenarioUid = sc.scenarioId;
				self.sendCommand(_serverCommand.enableScenario, scenarioContent, function(code, label) {
					if (callback && ('function' === typeof callback)) {
						callback(code, label);
					}
				}, false, undefined, 0, e.error.OK, "", true);			
				return true;
			}
			return false;
		},

		/**
		* Initializes ctx.galaxyAPI component
		* @method init
		* @path ctx.galaxyAPI.init
		*/
		init: function () {
			ctx.notifyAction('ctx.galaxyAPI.init');
			// read options in registry 
			ctx.options.read("galaxyAPI", "showProgress");
			ctx.options.read("galaxyAPI", "selfTestMode");
			if ((ctx.options.isDebug || ctx.options.m2m.debug) && (!ctx.options.m2m.showConsole)) {
				ctx.options.read("m2m", "showConsole");
			}
			
			// initialize URL, ftp options, ... from project path
			if (ctx.options.m2m.enabled) {
				/** @type {string} */var path;
				if (!ctx.options.m2m.root) {
					path = ctx.options.path.server.trim().toLowerCase(); // something like 'http(s)://<hostname>/<instance>/public/<environment>/<project>'
					var pos;
					if (path && (path.startsWith('http')) && ((pos = path.indexOf('public')) > 0)) {
						ctx.options.m2m.root = path.substring(0, pos); // something like 'http(s)://<hostname>/<instance>/'
					}
				}
				if (!ctx.options.m2m.root && ctx.options.m2m.url) {
					path = ctx.options.m2m.url.trim().toLowerCase(); // something like 'http(s)://<hostname>/<instance>/galaxyHub'
					var pos;
					if (path && (path.startsWith('http')) && ((pos = path.indexOf('galaxyhub')) > 0)) {
						ctx.options.m2m.root = path.substring(0, pos); // something like 'http(s)://<hostname>/<instance>/'
					}
				}
				if (ctx.options.m2m.root && !ctx.options.m2m.root.endsWith('/')) {
						ctx.options.m2m.root += '/'; 
				}
				if (ctx.options.m2m.root && !ctx.options.m2m.url) {
						ctx.options.m2m.url = ctx.options.m2m.root + 'GalaxyHub'; // something like 'http(s)://<hostname>/<instance>/GalaxyHub'
				}
				if (ctx.options.m2m.root && !ctx.options.m2m.UIUrl) {
						ctx.options.m2m.UIUrl = ctx.options.m2m.root + 'GalaxyUI'; // something like 'http(s)://<hostname>/<instance>/GalaxyUI'
				}
				if (ctx.options.m2m.root && ctx.options.galaxyWS && !ctx.options.galaxyWS.WS.url) {
						ctx.options.galaxyWS.WS.url = ctx.options.m2m.root + 'GalaxyWS'; // something like 'http(s)://<hostname>/<instance>/GalaxyWS'
				}
				// diagnostic options for recording upload
				if (ctx.options.m2m.root && ctx.options.diagnostic && !ctx.options.diagnostic.archiveURL) {
					ctx.options.diagnostic.archiveFTP.enabled = true;
					if (!ctx.options.diagnostic.archiveFTP.remoteFolder)
						ctx.options.diagnostic.archiveFTP.remoteFolder = "log";
					ctx.options.diagnostic.archiveURL = ctx.options.m2m.root + "ftp/" + ctx.options.diagnostic.archiveFTP.remoteFolder; // something like 'http(s)://<hostname>/<instance>/ftp/log'
					var pos = ctx.options.m2m.root.indexOf('://');
					if (pos > 0)
						ctx.options.diagnostic.archiveFTP.site = ctx.options.m2m.root.substring(pos + 3); // something like '<hostname>/<instance>'
					if (ctx.options.m2m.root.indexOf('https') >= 0) {
						ctx.options.diagnostic.archiveFTP.useFTPS = true;
					}
					if (!ctx.options.diagnostic.archiveFTP.credential) {
						ctx.options.diagnostic.archiveFTP.credential = ctx.cryptography.credential({ GalaxyFTP: {
							key: ctx.cryptography.keys.serverEncryption,
							comment: "Galaxy FTP site",
							user: false,
							server: true
						}});
					}
					//ctx.options.diagnostic.archiveFTP.user = "FTPTest";
					//ctx.options.diagnostic.archiveFTP.password = "TheTestPassword01$";
				}
			}
		},

		/**
		* Enables / disables Galaxy API options
		* @method toggleOption
		* @path ctx.galaxyAPI.toggleOption
		* @param {string} option to be updated (part of 'ctx.options.galaxyAPI')
		* @param {boolean} [state] self test mode status : true|false|undefined (if undefined, status is toggled)
		* @return {boolean} boolean new  value
		*/
		toggleOption: function (option, state) {
			ctx.notifyAction('ctx.galaxyAPI.toggleOption');
			var value = ctx.options.save('galaxyAPI', option, state);
			if (value) {
				switch (option) {
					case 'selfTestMode':
					//case 'debug':
					{
						// update sendClientInfos message as option has changed
						//_sendClientInfos();
						break;
					}
					case 'showProgress':
					{
						//_showProgressPopup(null, false);
						break;
					}
				}
			}
			return ctx.options['galaxyAPI'][option];
		},

		/**
		* @ignore
        * Registers a scenario or set of scenarios 
		* @method registerScenario
		* @path ctx.galaxyAPI.registerScenario
		* @param {ctx.scenarioClass|Array<ctx.scenarioClass>} list
		* @return boolean
		*/
		registerScenario: function (list) {
			//ctx.notifyAction('ctx.galaxyAPI.registerScenario');
			if (list  && (list instanceof ctx.scenarioClass)) {
				list = [list];
			}
			var changed = false;
			ctx.each(list, function(id, scn) {
				if (scn  && (scn instanceof ctx.scenarioClass)) {
					_registeredScenarios.push( scn );
					changed = true;
				}
			});
			return changed;
		},
		
		/**
		* @ignore
        * Send Project Info
		* @method sendProjectInfos
		* @path ctx.galaxyAPI.sendProjectInfos
		* @return boolean
		*/
		sendProjectInfos : function () {
			ctx.notifyAction('ctx.galaxyAPI.sendProjectInfos');
			var res = true;
			//var availableProjects = _readAvailableProjects();
			var projectContent = ctx.dataManagers.projectContent.create();
			// Take the PackageVersionUid that CtxtRun sent through the event evProjectInfos 
			projectContent.packageVersionUid = _packageVersionUid;
			
			if (projectContent.packageVersionUid == '') projectContent.packageVersionUid = "00000000-0000-0000-0000-000000000000";
			
			projectContent.configurationUid = "00000000-0000-0000-0000-000000000000";
			//if (_availableProjects) {
				res = self.sendCommand(_serverCommand.sendProjectInfos, projectContent, function(code, label) {
					if (code != e.error.OK) {
						ctx.log("sendProjectInfos not OK: " + code + (label ? ' (' + label + ')' : ''), e.logIconType.Warning);
					}
					else {
						// sendProjectInfos OK --> push cached updateClientInfos requests from older connexion, and send them
						ctx.m2m.sendCachedUpdateRunJobs();
					}
					/*  SAPMLIPA-5986 : comment this section otherwise: when sendProjectInfos response code is 'InvalidArgument' (default project),					
					// isConnected is set to false, then we cannot send commands anymore to the websocket.
					if (code == e.error.OK) {
						ctx.m2m.setConnected(true);
					} else {
						ctx.m2m.setConnected(false);
					}
					// */
				});
			//}
			
			return res;
		},

		/**
		* @ignore
    * Sends agent mode to Factory (unattended or attended)
		* @method setMode
		* @path ctx.galaxyAPI.setMode
		* @param {e.agentMode} mode agent mode (attended or unattended)
		* @param { function(e.error, string) } [callback]
		* @return boolean
		*/
		setMode : function (mode, callback) {
			ctx.notifyAction('ctx.galaxyAPI.setMode ' + mode);
			var res = false;

			// If old agent ( < 1.0.5 ) don't send setMode
			if (ctx.compareVersion('1.0.5.0') < 0) {
				if (callback && ('function' === typeof callback)) {
				      callback(e.error.OK, '');
				}
				return res;
			}
			var modeContent = ctx.dataManagers.modeContent.create();
			modeContent.value = mode;
			res = self.sendCommand(_serverCommand.setMode, modeContent, function(code, label) {
				if (code != e.error.OK) {
					ctx.log("setMode failed: " + code + (label ? ' (' + label + ')' : ''), e.logIconType.Warning); // non blocking issue (not implemented on older Factory releases)
				}
				if (callback && ('function' === typeof callback)) {
					callback(code, label);
				}
			});

			return res;
		},
		
		/**
		* @ignore
        * Removes a job from the storage
		* @method removeJob
		* @path ctx.galaxyAPI.removeJob
		* @param {string} id job id
		* @param { function(e.error, string, Object) } [callback]
		* @return boolean
		*/
		removeJob : function (id, callback) {
			ctx.notifyAction('ctx.galaxyAPI.removeJob');
			var res = false;
			if (id) {
				var job = ctx.job({ id: id });
				res = self.sendCommand(_serverCommand.removeJob, job, callback);
			}
			return res;
		},

		/**
		* Resets the status of an existing job to 'New'
		* @method resetJob
		* @path ctx.galaxyAPI.resetJob
		* @param {string} id job id
		* @param { function(e.error, string, Object) } [callback]
		* @return boolean
		*/
		resetJob : function (id, callback) {
			ctx.notifyAction('ctx.galaxyAPI.resetJob');
			var res = false;
			if (id) {
				var job = ctx.job({ id: id });
				res = self.sendCommand(_serverCommand.resetJob, job, callback);
			}
			return res;
		},

		/**
		* @ignore
        * Executes a job
		* @method runJob
		* @path ctx.galaxyAPI.runJob
		* @param {Object} obj initialization object or job
		* @param {ctx.dataClass|function(e.error, string, ctx.jobClass)} [data] initialization data or callback
		* @param { function(e.error, string, ctx.jobClass) } [callback]
		* @return boolean
		*/
		runJob : function (obj, data, callback) {
			ctx.notifyAction('ctx.galaxyAPI.runJob');
			var res = true;
			if ('function' === typeof data) {
				callback = data;
				data = undefined;
			}
			/** @type {ctx.jobClass} */ var job = null;
			if (obj && (obj instanceof ctx.jobClass)) {
				job = obj;
			} else {
				job = ctx.job(obj, data);
			}
			
			job.attended = false;
			_getPreviousJobsAndRun(job, callback);
			return res;
		},

		/**
		* @ignore
        * Executes a job, then adds it in the storage
		* @method runJobAndAdd
		* @path ctx.galaxyAPI.runJobAndAdd
		* @param {Object} obj initialization object or job
		* @param {ctx.dataClass|function(e.error, string, Object)} [data] initialization data or callback
		* @param { function(e.error, string, Object) } [callback]
		* @return boolean
		*/
		runJobAndAdd : function (obj, data, callback) {
			var res = false;
			ctx.notifyAction('ctx.galaxyAPI.runJobAndAdd');
			self.setBusy(true, function(code) {
				self.runJob(obj, data, function(runCode, runLabel, runJob) {
					self.addJob(runJob, function(code, label) {
						self.setBusy(false, function(code, label) {
							res = true;
							if (callback && ('function' === typeof callback)) {
								callback(runCode, runLabel, runJob);
							}
						});
					});
				});
			});
			return res;
		},

		/**
		* @ignore
        * Activates job distribution
		* @method sendAllJobs
		* @path ctx.galaxyAPI.sendAllJobs
		* @param {Object} obj job criteria
		* @param { string } [destination] M2M identifier
		* @param { function(e.error, string, Object) } [callback]
		*/
		sendAllJobs : function (obj, destination, callback) {
			ctx.notifyAction('ctx.galaxyAPI.sendAllJobs');
			if (_running) {
				return; // already running
			}
			self.searchJobAndSend(obj, destination, function(code, label, job) {
				if (code == e.error.OK) {
					_running = true;
					ctx.wait(function(ev) {
						_running = false;
						// recursive call for the next job
						self.sendAllJobs(obj, destination, callback);
					}, 1000);
				} else {
					// no more job to run
					if (callback && ('function' === typeof callback)) {
						callback(code, label, job);
					}					
				}
			});
		},
		
//		/**
//		* Authorize all unauthorized clients
//		* @method showProgressPopup
//		* @path ctx.galaxyAPI.showProgressPopup
//		* @param {ctx.jobClass} job current job
//		* @param {boolean} running state
//		* @return boolean
//		*/
//		showProgressPopup: function(job, running) {
//			return _showProgressPopup(job, running);
//		},

		/**
		* @ignore
        * Search a job based on criteria and distributes it
		* @method searchJobAndSend
		* @path ctx.galaxyAPI.searchJobAndSend
		* @param {Object} obj job criteria
		* @param { string } [destination]
		* @param { function(e.error, string, ctx.jobClass) } [callback]
		* @return boolean
		*/
		searchJobAndSend : function (obj, destination, callback) {
			ctx.notifyAction('ctx.galaxyAPI.searchJobAndSend');
			return self.sendJob(obj, destination, callback, true);
		},

		/**
		* [internal usage]
		* Description
		* @method sendCommand
		* @path ctx.galaxyAPI.sendCommand
		* @ignore
		* @param {string} command command to be executed
		* @param {Object} obj initialization data
		* @param {function(e.error, string, Object)} [callback]
		* @param {boolean} [answer]
		* @param {string} [destination]
		* @param {number} [tid]
		* @param {e.error} [code]
		* @param {string} [label]
		* @param {boolean} [ifConnected]		
		* @return boolean
		*/
		sendCommand : function(command, obj, callback, answer, destination, tid, code, label, ifConnected) {
			var res = false;
			if (ctx.options.m2m && ctx.options.m2m.enabled && ('function' === typeof(ctx.m2m.sendMessage))) {
				if (('function' === typeof(_executeServerCommand[command])) && (!_authorized)) {
					if (('function' === typeof(callback))) {
						callback(e.error.Canceled, "Unauthorized client", obj); 
					}
				} else {
					if (undefined === destination) {
						destination = ctx.options.galaxyAPI.serverProcess;
						if (undefined === destination) {
							destination = _m2mSupervisorId;
						}
					}
					res = ctx.m2m.sendMessage(command, destination, obj, answer, callback, tid, code, label, ifConnected);
				}
			} 
			if (_options.recordingEnabled && (!res) && (!answer) && ('function' === typeof(_executeServerCommand[command]))) {
				// local emulated mode
				var resObj = { code: e.error.None, label: '' };
				obj = _executeServerCommand[command](obj, '', resObj, answer);
				if (('function' === typeof(callback))) {
					callback(resObj.code, resObj.label, obj); // immediate return
				}
				res = true;
			} 
			return res;
		},
	
		/**
		* @ignore
        * Distributes a job 
		* @method send
		* @path ctx.galaxyAPI.sendJob
		* @param {Object} obj job criteria
		* @param { string } [destination]
		* @param { function(e.error, string, ctx.jobClass) } [callback]
		* @param { boolean } [searchInJobs]
		* @return boolean
		*/
		sendJob : function (obj, destination, callback, searchInJobs) {
			ctx.notifyAction('ctx.galaxyAPI.sendJob');
			var res = false;
			var jobCriteria = ctx.job(obj);
			if (!jobCriteria.status) jobCriteria.status = e.status.New;
			var job;
			if (searchInJobs) {
				var resObj = { code: e.error.None };
				job = _executeServerCommand[_serverCommand.getJob](jobCriteria, '', resObj, false);
			} else {
				job = jobCriteria;
			}
			if (job && (resObj.code == e.error.OK)) {
				if (!destination) { // search an available remote client (different from myself if more than one)
					ctx.each(_clients, function(m2mId, clientInfos) {
						if (m2mId != _m2mId) {
							destination = m2mId;
							return false;
						}
					});
					if (!destination) { 
						destination = _m2mId;
					}
				}
				var clientInfos = _clients[destination];
				if (clientInfos && clientInfos.busy) {
					// already busy, run it later
					res = true;
				} else {
					if (clientInfos) clientInfos.busy = true;
					_running = true;
					res = self.sendCommand(_clientCommand.runJob, job, function(code, label, runJob) {
						//var resObj = { code: e.error.None, label: '' };
						//_executeServerCommand[_serverCommand.updateRunJob](runJob, '', resObj, 0);
						//if (clientInfos) clientInfos.busy = false;
						//_running = false;
						clientInfos.runningJobId = job.id;
						if (callback && ('function' === typeof callback)) {
							clientInfos.callback = callback;
							//callback(code, label, runJob);
						}					
					}, false, destination);				
				}
			}
			if (!res) {
				// failed: immediate return
				if (callback && ('function' === typeof callback)) {
					callback(e.error.KO, "Could not execute job", job);
				}					
				_running = false;
			}
			return res;
		},

		/**
		* Returns the local 'Busy' client state 
		* @method isBusy
		* @return boolean
		*/
		isBusy : function () {
			return _busy;
		}, 
		
		/**
		* Sets the client state to 'Busy'
		* @method setBusy
		* @path ctx.galaxyAPI.setBusy
		* @param { boolean } state
		* @param { function(e.error, string) } [callback]
		* @return boolean
		*/
		setBusy : function (state, callback) {
			ctx.notifyAction('ctx.galaxyAPI.setBusy');
			var res = false;
			if (ctx.m2m.isConnected()) {
				var busyCallback = function(code, label, data) {
					if (code == e.error.OK)
						_busy = (state ? true : false);
					if ('function' === typeof callback) {
						callback(code, label);
					}
				}
				var booleanContent = ctx.dataManagers.booleanContent.create();
				booleanContent.value = state;
				res = self.sendCommand( _serverCommand.setBusy, booleanContent, busyCallback);
			} else {
				if ('function' === typeof callback) {
					callback(e.error.OK, '');
				}
			}
			return res;
		},

		/**
		* @ignore
        * Sets the JSON filename for local storage
		* @method setJobFilename
		* @path ctx.galaxyAPI.setJobFilename
		* @param {string} filename file name ('jobs.json' if omitted), related to 'log' folder
		* @return boolean
		*/
		setJobFilename : function (filename) {
			ctx.notifyAction('ctx.galaxyAPI.setJobFilename');
			_jobFilename = filename || 'jobs.json';
			return true;
		},
		
		/**
		* @ignore
        * Updates an existing job in storage
		* @method updateJob
		* @path ctx.galaxyAPI.updateJob
		* @param { Object } obj
		* @param { function(e.error, string, Object) } [callback]
		* @return boolean
		*/
		updateJob : function (obj, callback) {
			ctx.notifyAction('ctx.galaxyAPI.updateJob');
			var res = false;
			/** @type {ctx.jobClass} */ var job = null;
			if (obj && (obj instanceof ctx.jobClass)) {
				job = obj;
			} else {
				job = ctx.job(obj);
			}
			res = self.sendCommand(_serverCommand.updateJob, job, callback, false, undefined, undefined, e.error.None, "", true);
			if (!res) {
				job.save(); // save job locally
			}
			return res;
		}
	};

	/**
	 * Callback called when receiving a run status from CtxtRun
	 * @method receiveRunStatus
	 * @ignore
	 * @path ctx.galaxyAPI.receiveRunStatus
	 * @param {ctx.event} ev 
	 * @return {boolean} result
	 */
	self.receiveRunStatus = function (ev) {
		if ((ev.data) && ('string' === typeof ev.data)) {
			var msgContent = ctx.json.parse(ev.data);
			
			/** @type {e.agentStatus} */ var agentStatus = e.agentStatus.None;
			var label = '';
			var description = '';
			/** @type {e.logIconType} */ var logStatus = e.logIconType.Info;
			if (msgContent.Severity) {
				switch(msgContent.Severity) {
					case 'info':
						agentStatus = e.agentStatus.Idle;
						logStatus = e.logIconType.Info;
						break;
					case 'warning':
						agentStatus = e.agentStatus.Warning;
						logStatus = e.logIconType.Warning;
						break;
					case 'error':
						agentStatus = e.agentStatus.Error;
						logStatus = e.logIconType.Error;
						break;
				}
			}

			if (msgContent.Label) {
				label = msgContent.Label;
			}
			if (msgContent.Description) {
				description = msgContent.Description;
			}
			if (msgContent.State) {
				switch (msgContent.State) {
					case 'WAIT_RESOURCEINFOS_MESSAGE':
					case 'WAIT_RESOURCEINFOS_MESSAGE_SYNC':
					case 'WAIT_BINARY_MESSAGE':				
					case 'WAIT_BINARY_MESSAGE_SYNC':				
					case 'FORWARDING':
						if (_packageVersionUid != '' || ctx.isStudioUsed()) {
							agentStatus = e.agentStatus.Ready;
							if (msgContent.State == 'FORWARDING') label = GLOBAL.labels.systray.agentStatus.AwaitingAutomation;
						}
						else {
							agentStatus = e.agentStatus.Paused;
							if (msgContent.State == 'FORWARDING') label = GLOBAL.labels.systray.agentStatus.AwaitingProject;
						}
						break;

					case 'READY_TO_RESTART_FOR_SWITCH':
						// CtxtRun is ready to switch on another project. SDK restarts the agent
						ctx.shutdownAgent(true, true);
						break;

					case 'NO_SELECT_TENANT_FILE':
						if  ('undefined' !== typeof systray) {
							systray.onNoSelectTenantFile();
						}
						break;

					case 'CONNECT_SENDCLIENTINFOS_STATE':
						if  ('undefined' !== typeof systray) {
							systray.refreshTrialMode();//If we are not already logged on trial tenant, systray is built before tenant credentials are stored in credentials manager
							//therefore trial mode can only be false. So, we need to send ctx.getTrialMode again to systray once credentials are stored
						}
						break;
				}
			}
			
			if (msgContent.TechDescription) {
				// try to find a detailed error from the technical description
				// !! escape it twice
				var obj;
				try {
					obj = JSON.parse(String(JSON.parse('"' + msgContent.TechDescription + '"')));
				} catch (ex) {}
				
				
				if(obj && obj.IPA_Reason)
				{
						if (GLOBAL.labels.IPAReason[obj.IPA_Reason])
							label = GLOBAL.labels.IPAReason[obj.IPA_Reason];
						var IPAReasonLongName = obj.IPA_Reason + '_LONG';
						if (GLOBAL.labels.IPAReason[IPAReasonLongName])
						{
							description = GLOBAL.labels.IPAReason[IPAReasonLongName];
						}
				}
				else if (obj && obj.code) {
					switch (obj.code) {
						case e.error.OK:
						case e.error.KO:
						case e.error.Fail:
						{
							// non significative error code, use Factory detailed label
							if(msgContent.IPAReason)
							{
								if (GLOBAL.labels.IPAReason[msgContent.IPAReason])
									label = GLOBAL.labels.IPAReason[msgContent.IPAReason];
								else if (obj.label) 
									label = obj.label;
							}
							else if (obj.label) 
								label = obj.label;
							break;
						}
						default:
						{
							// use Factory error code
							if (GLOBAL.labels.error[obj.code])
								label = GLOBAL.labels.error[obj.code];
							break;
						}
					}
				}
			}
				
			if (!_dontUpdateSystray) {
				if  ('undefined' !== typeof systray) {
					systray.updateAgentStatus(agentStatus, label, description);
				}
			} else
				_dontUpdateSystray = false;

			// For those two errors, ignore the message that will come after if it is a "FORWARDING"
			if (msgContent.Error != undefined && (msgContent.Error == 'SWITCHING_ERROR' || msgContent.Error == 'BAD_ANSWER_RESOURCE_INFOS'))
				_dontUpdateSystray = true;
			
			var logMessage = msgContent.State;
			if (msgContent.Error) logMessage += ' - ' + msgContent.Error;
			if (label) logMessage += ' - ' + label;
			if (msgContent.TechDescription) logMessage += ' - ' + msgContent.TechDescription;
			if (msgContent.IPAReason) logMessage += ' - ' + msgContent.IPAReason;
			
			ctx.log(logMessage, logStatus, null, _options);

			return true;			
		}
		else
			return false;
	}	
	
/**
	 * Callback called when receiving project informations from CtxtRun
	 * @method receiveProjectInfos
	 * @ignore
	 * @path ctx.galaxyAPI.receiveProjectInfos
	 * @param {ctx.event} ev 
	 * @return {boolean} result
	 */
	self.receiveProjectInfos = function (ev) {
		if ((ev.data) && ('string' === typeof ev.data)) {
			var msgContent = ctx.json.parse(ev.data);
			if (msgContent) {
				_packageVersionUid = msgContent['PackageVersionUid'] || "";
				_packageUid = msgContent['PackageUid'] || "";
				if  ('undefined' !== typeof systray) {
					systray.setDefaultMode(_packageVersionUid !== "" ? false : true);
				}				
			}
			return true;			
		}
		else
			return false;
	}	

	/**
	 * Callback called when receiving a socket status
	 * @method receiveSocketStatus
	 * @path ctx.galaxyAPI.receiveSocketStatus
	 * @param {ctx.event} ev 
	 * @return {boolean} result
	 */
	self.receiveSocketStatus = function (ev) {
		var status = parseInt(ev.data, 10);
		if (status != e.socket.status.open) {
			ctx.m2m.setConnected(false);
			ctx.log('Socket status invalid: ' + ctx.getEnumKey(e.socket.status, status), e.logIconType.Warning, null, _options);
		} else {
			ctx.log('Socket status valid: ' + ctx.getEnumKey(e.socket.status, status), e.logIconType.Info, null, _options);
		}
		return true;			
	}


	
	return self;
})();

	
/** 
* @ignore
* Options for the 'ctx.galaxyRestAPI' library
* @path ctx.options.galaxyRestAPI
* @class ctx.options.galaxyRestAPI
* @struct
*/
ctx.options.galaxyRestAPI = {
   /** 
    * @ignore
    * module enabled 
	* @property {boolean} enabled
	* @path ctx.options.galaxyRestAPI.enabled */ enabled: true
}

/**
 * @ignore
 * Galaxy API object, used to interact with a local or remote job storage
 * @class ctx.galaxyRestAPI
 * @path ctx.galaxyRestAPI
 * @constructor
 **/
ctx.galaxyRestAPI = (function () {

	/** @type {Object} */ var _options = ctx.options.galaxyRestAPI;
	
	/** @type {string} */ var _token = '';
	/** @type {string} */ var _url = '';
	
	/**
	* @ignore
    * Calls an addJob or runJob API
	* @param {string} method method name ('/RunJob', '/AddJob', ...) 
	* @param {e.ajax.method} type method type ('POST', 'GET', ...) 
	* @param {Object} obj
	* @param {function(e.ajax.status, string, Object)} [callback]
	* @return {boolean}
	*/
	var _callApi = function(method, type, obj, callback) {
//		if (!_token) {
//			if (callback && ('function' === typeof(callback) )) {
//				callback(400, "Unauthorized", null);
//			}
//		}
		if (!_url) {
			_url = self.setURL();
		}
		ctx.ajax.call({
			method: type,
			url: _url + method,
			contentType: e.ajax.content.json,
			headers: {
				Authorization: 'Bearer ' + _token
			},
			data: obj,
			success: function (res, textStatus, jqXHR) {
				try{
					if (res && ('string' === typeof res)) {
						res = JSON.parse(res);
					}
					var job = res.data;
					if (job.dataJson) {
						job.data = job.dataJson;
						delete job.dataJson;
					}
					if (((job.format == 'json') || (!job.format)) && ('string' === typeof job.data)) {
						job.data = JSON.parse(job.data);
					}
					if (callback && ('function' === typeof(callback) )) {
						callback(jqXHR.status, jqXHR.statusText, job);
					}					
				} catch (ex) {
					callback(e.ajax.status.BadRequest, 'invalid answer format', null);
				}
			},
			error: function (jqXHR, textStatus, errorThrow) {
				if (callback && ('function' === typeof(callback) )) {
					callback(jqXHR.status, jqXHR.statusText, null);
				}
			}
		});
		return true;
	}

	var self = 
	/** @lends ctx.galaxyRestAPI */
	{
		/**
		* @ignore
        * Logins to Rest API
		* @method login
		* @path ctx.galaxyRestAPI.login
		* @param {string} login
		* @param {string} password
		* @param {function(e.ajax.status, string, Object)} [callback]
		* @return {boolean}
		*/
		login : function (login, password, callback) {
			ctx.notifyAction('ctx.galaxyRestAPI.login');
			if (!_url) {
				_url = self.setURL();
			}
			ctx.ajax.call({
				url: _url + '/Login',
				method: e.ajax.method.post,
				contentType: e.ajax.content.json,
				data : {
					login: login,
					password: password
				},
				success: function(res, status, jqXHR) {
					ctx.log("ctx.galaxyRestAPI.login succeeded", e.logIconType.Info, '', _options);
					_token = res['access_token'];
					if (callback && ('function' === typeof(callback) )) {
						callback(jqXHR.status, jqXHR.statusText, null);
					}
				},
				error: function(jqXHR, textStatus, errorThrow) {
					ctx.log("ctx.galaxyRestAPI.login failed: " + jqXHR.statusText, e.logIconType.Warning, '', _options);
					if (callback && ('function' === typeof(callback) )) {
						callback(jqXHR.status, jqXHR.statusText, null);
					}
				}
			});
			return true;
		},

		/**
		* @ignore
        * Adds a job
		* @method addJob
		* @path ctx.galaxyRestAPI.addJob
		* @param {Object} job
		* @param {function(e.ajax.status, string, Object)} [callback]
		* @return {boolean}
		*/
		addJob : function (job, callback) {
			ctx.notifyAction('ctx.galaxyRestAPI.addJob');
			if (job instanceof ctx.jobClass) { job.init(); }
			return _callApi('/AddJob', e.ajax.method.post, job, callback);
		},

		/**
		* @ignore
        * Gets a job
		* @method getJob
		* @path ctx.galaxyRestAPI.getJob
		* @param {Object} criteria
		* @param {function(e.ajax.status, string, Object)} [callback]
		* @return {boolean}
		*/
		getJob : function (criteria, callback) {
			ctx.notifyAction('ctx.galaxyRestAPI.getJob');
			return _callApi('/FindJob', e.ajax.method.post, criteria, callback);
		},

		/**
		* @ignore
        * Adds a job
		* @method runJob
		* @path ctx.galaxyRestAPI.runJob
		* @param {Object} job
		* @param {function(e.ajax.status, string, Object)} [callback]
		* @return {boolean}
		*/
		runJob : function (job, callback) {
			ctx.notifyAction('ctx.galaxyRestAPI.runJob');
			if (job instanceof ctx.jobClass) { job.init(); }
			return _callApi('/RunJob', e.ajax.method.post, job, callback);
		},

		/**
		* @ignore
        * Adds a job
		* @method runJob
		* @path ctx.galaxyRestAPI.setUrl
		* @param {string} [url]
		* @return {string}
		*/
		setURL : function (url) {
			if (url) {
				_url = url;
			} else {
				_url = ctx.options.m2m.root + 'galaxyui/_api';
			}
			return _url;
		}
	}

	return self;
})();

GLOBAL.scenario({ scGetJobs: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.stPrepareList, GLOBAL.steps.stGetJobLoop);
	sc.step(GLOBAL.steps.stGetJobLoop, GLOBAL.steps.stGetJobLoop, e.step.exit.loop);
	sc.step(GLOBAL.steps.stGetJobLoop, null);
}}, null);

GLOBAL.scenario({ scAddJobs: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.stDownloadJobFile, GLOBAL.steps.stAddJobLoop);
	sc.step(GLOBAL.steps.stAddJobLoop, GLOBAL.steps.stAddJobLoop, e.step.exit.loop);
	sc.step(GLOBAL.steps.stAddJobLoop, null);
}}, null);

GLOBAL.step({ stDownloadJobFile: function(ev, sc, st) {
	var data = sc.data;
	if (data.filename) {
		ctx.fso.file.downloadOrCopy(data.filename, ctx.options.path.log, {}, function(file) {
			data.jobs = ctx.array();
			try {
				var txt = ctx.fso.file.read(file, e.file.encoding.UTF8);
				ctx.fso.file.remove(file);
				var obj = ctx.unserialize(txt, true);
				data.jobs = ctx.array(obj);
			} catch (ex) {	
				sc.setError(e.error.InvalidArgument, "invalid input data")
			}
			sc.endStep();
			return;
		});
	} else if (data.jobs && data.jobs.ctxArray) {
		data.jobs.moveFirst();
		sc.endStep();
	} else {
		sc.setError(e.error.InvalidArgument, "invalid input data")
		sc.endStep();
	}
}});

GLOBAL.step({ stAddJobLoop: function(ev, sc, st) {
	var data = sc.data;
	var params = sc.data.params || {};
	if (data.jobs && !data.jobs.atEnd()) {
		var job;
		if (params && ('object' === typeof params) && params.scenario) {
			job = ctx.job(params);
			job.data =data.jobs.item();
		} else {
			job = data.jobs.item();
		}
		ctx.galaxyAPI.addJob(job, function(code, label, job) {
			if (code == e.error.OK) {
				data.jobs.moveNext();
				sc.endStep(e.step.exit.loop);
			} else {
				sc.setError(e.error.InvalidArgument, "invalid job")
				sc.endStep(); // end
			}
		});
	} else {
		sc.endStep(); // end
	}
}});

GLOBAL.step({ stPrepareList: function(ev, sc, st) {
	var data = sc.data;
	sc.localData.count = 0;
	if ((data.jobs && (data.jobs instanceof ctx.array))) {
		data.jobs.clear();
	} else {
		data.jobs = ctx.array();
	}
	data.criteria = data.criteria || {};
	if (data.criteria.max) {
		sc.localData.max = data.criteria.max;
		delete data.criteria.max;
	} else {
		sc.localData.max = 100; // default limit is 100
	}
	data.criteria.indexAfter = -1;
	sc.endStep();
	return;
}});

GLOBAL.step({ stGetJobLoop: function(ev, sc, st) {
	var data = sc.data;
	ctx.galaxyAPI.getJob(data.criteria, function(code, label, job) {
		if ((code == e.error.OK) && job) {
			sc.localData.count ++;
			data.jobs.push(job);
			if (sc.localData.count < sc.localData.max) {
				data.criteria.indexAfter = job.index;
				sc.endStep(e.step.exit.loop);
			} else {
				data.criteria.max = sc.localData.max;
				sc.endStep();
			}
		} else {
			sc.endStep();
		}
	});	
}});

GLOBAL.events.START.on(function (ev) {
	ctx.lockNoNotify = true;			
	if (ctx.m2m && ctx.m2m.registerHandler) {
		ctx.m2m.registerHandler(ctx.galaxyAPI.receiveMessageCallback);	
	}
	// initialize local key containers
	ctx.cryptography.initKeys(false);	

	if (ctx.options.m2m.showProjectSystray)
		ctx.registry.set("HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\HideSystray", "");
	else
		ctx.registry.set("HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\HideSystray", "1");
	
	// initialize M2M and GalaxyAPI
	ctx.galaxyAPI.init();
	ctx.m2m.init();
	ctx.lockNoNotify = false;			
});

GLOBAL.events.INIT.on(function (ev) {
	ctx.wait(function(ev) {
		// connect M2M
		ctx.m2m.connect();
		
		ctx.wkMng.EnableSocketNotifications(true);

		//ctx.galaxyAPI.sendProjectInfos (function(code, label) {});
		
	}, 100);
});
