

var ctx = (function () {
	// communication ActiveX
	var _oContextor = null;
	// process name
	var _processName = 'GLOBAL';
	// page name
	//var _pageName = 'pBootbox';
	var _pageName = '';
	// event name
	var _eventName = 'evNotification';

	/** Initializes object used to communicate with Unified Desktop or Contextor project
	* @method : init
	* @ignore
	*/
	function _init () {
		if (_oContextor == null) {
			try {
				if (typeof Contextor != "undefined") {
					// try to use 'Contextor' object if page is managed by WEB connector
					_oContextor = Contextor;
				//} else if (typeof CtxtDesktop != "undefined") {
					// try to use 'CtxtDesktop' object if page is embedded in a Messbox2
				//	_oContextor = CtxtDesktop;
				//} else {
					// otherwise, create a "XsContextor2.CtxActApp" object (stand alone test in I.E.)
				//	_oContextor = new ActiveXObject("XsContextor2.CtxActApp");
				}
			}
			catch (e) {
				//alert(e.description);
			}
		}
	}

	var self = {

		// item array
		items : [],
		
		// item type array
		types : {
			name: '',
			tag: '',
			attributes: {},	
			children: [],
			nextSiblings: [],
			previousSiblings: [],
			options: {}
		},
		
		/** initialize custom item
		* @method callItem
		* @param {Object} key item parameters
		* @param {Object} action function name
		* @param {...*} [params] function parameters
		* @return {string} result
		*/
		itemExec : function (key, action, params) {
			var item = self.itemGet(key);
			if (!item) {
				// todo throw
				return "";
			}
			if (item && (typeof item[action] === 'function')) {
				item[action].apply(this, Array.prototype.slice.call(arguments, 2));
			}
		},
		
		/** initialize custom item
		* @method callItem
		* @param {Object|string} key item parameters
		* @return {Object} result
		*/
		itemGet : function (key) {
			var item = null;
			var id = "";
			var element = null;
			if (typeof key === 'string')
				id = key;
			else
				element = key;
			// search item
			for (var i = 0; i < ctx.items.length; i ++) {
				if ((id && (ctx.items[i].id == id)) || (element && (ctx.items[i].element == element))) {
					item = ctx.items[i]; // found
					break;
				}
			}
			return item;
		},
		
		/** initialize custom item
		* @method itemInit
		* @param {string|Object} element object, or element id, or item parameters
		* @param {Object} params item parameters
		* @return {string} result
		*/
		itemInit : function (element, params) {
			if ('undefined' === typeof(params)) {
				params = element;
				element = undefined;
			}
			params = params || {};
			if ('string' === typeof(element)) {
				params.id = element;
				element = undefined;
			} else if (element && ('object' === typeof(element))) {
				params.element = element;
			}
			if ((!params.id) && (!params.element)) return ""; // no id or element !!
			
			// create a new item (or update an existing)
			var item = null;
			for (var i = 0; i < ctx.items.length; i ++) {
				if ((params.id && (ctx.items[i].id == params.id)) || (params.element && (ctx.items[i].element == params.element))) {
					item = ctx.items[i]; // already defined : update it
					break;
				}
			}

			if (!item) {
				item = {
					id: "",
					type: "",
					tag: "",
					element: null,
					init: null,
					refresh: null,
					object: null,
					template: "",
					//params: {},
					options: {},
					data: {},
					attributes: {},
					children: [],
					previousSiblings: [],
					nextSiblings: []					
				};
				ctx.items.push(item);
			} else {
				item.children = [];
				item.previousSiblings = [];
				item.nextSiblings = [];
			}

			$.extend(true, item, params); 

			if (item.template) {
				var templateItem = null;
				for (var i = 0; i < ctx.items.length; i ++) {
					if (ctx.items[i].id == item.template) {
						templateItem = ctx.items[i]; // already defined : update it
						break;
					}
				}
				if (templateItem) {
					$.extend(true, item, templateItem); 
				}
			}

			var type = item.type || params.type;
			if (type) {
				var typeItem = ctx.types[type];
				if (typeItem && (typeof(typeItem) === 'object')) { 
					$.extend(true, item, typeItem); 
				}
			}

			$.extend(true, item, params); 

			if (typeof item.init === 'function') {
				item.init(item);
			}

			ctx.itemRefresh(item, true);

			return item;
		},
		
		
		/** Refresh custom item
		* @method itemRefresh
		* @param {Object} item object
		* @return {Object} result
		*/
		itemRefresh : function (item, init) {
			var obj = item; // merged item
			if (obj) {

				if (typeof obj.refresh === 'function') {
					obj.refresh(init);
				}

				var jQObj = (obj.element ? ctx.getObject(obj.element) : ctx.getObject(obj.id));
				if (jQObj.length) {
					var tagName = jQObj.prop("tagName");
					if (obj.tag && (tagName != obj.tag.toUpperCase())) {
						 jQObj.replaceWith( "<" + obj.tag + ">" + jQObj.html() + "</" + obj.tag + ">" );
					}
					if (obj.text) {
						jQObj.text( obj.text );
					}
					if (obj.value) {
						(jQObj[0].value !== undefined ? jQObj.val(obj.value) : jQObj.html(obj.value));
					}
					for (var att in obj.attributes) {
						jQObj.attr( att, obj.attributes[att] );
					}
					for (var id =0; id < obj.children.length; id ++) {
						jQObj.append( obj.children[id] );
					}
					for (var id =0; id < obj.previousSiblings.length; id ++) {
						jQObj.before( obj.previousSiblings[id] );
					}
					for (var id =0; id < obj.nextSiblings.length; id ++) {
						jQObj.after( obj.nextSiblings[id] );
					}
				}
			}
			return obj;
		},

		/** returns the id or name of the selected item
		* @method itemSelected
		* @param {Object} key item parameters
		* @param {Object} action function name
		* @param {...*} [params] function parameters
		* @return {string} result
		*/
		itemSelected : function () {
			var focused = $(':focus');
			var id = focused.attr('id') || focused.attr('ctx_name') || focused.attr('name') || "";
			return id;
		},
		
		/** Get argument from URL
		* @method queryURL
		* @param {string} search_for parameter name
		* @return {string} result
		*/
		queryURL : function (search_for) {
			var query = window.location.search.substring(1);
			var parms = query.split('&');
			for (var i=0; i<parms.length; i++) {
				var pos = parms[i].indexOf('=');
				if (pos > 0  && (search_for.toLowerCase() == parms[i].substring(0,pos).toLowerCase())) {
					return parms[i].substring(pos+1);
				}
			}
			return "";
		},

		/** Set page name
		* @method setPageName
		* @param {string} [pageName] page name
		* @return {string} result
		*/
		setPageName : function (pageName) {
			_pageName = pageName || _pageName;
		},
		
		/** Set process name
		* @method setProcessName
		* @param {string} [processName] process name
		* @return {string} result
		*/
		setProcessName : function (processName) {
			_processName = processName || _processName;
		},
		
		/** Set event name
		* @method setEventName
		* @param {string} [eventName] event name
		* @return {string} result
		*/
		setEventName : function (eventName) {
			_eventName = eventName || _eventName;
		},
		
		/** Function called by project at at page LOAD
		* @method onLoad
		* @param {Object} initialization object
		*/
		onLoad : function (obj) {
			// function to be overloaded
		},
		
		/** Function called to initialize components
		* @method initUI
		*/
		initUI : function () {
			// function to be overloaded
		},
		
		/** Function called to test components
		* @method testUI
		* @param {string} test test value
		*/
		testUI : function (test) {
			// function to be overloaded
		},
		
		/** Sends an event to Contextor project
		* @method sendEvent
		* @param {string} event event name
		* @param {string} data : optional data (text buffer)
		* @return {string} result
		*/
		sendEvent : function (id, event, data) {
			event = event || _eventName;
			id = id || '';
			var res = '';
			try {
				_init();
				if (_oContextor && (typeof _oContextor.Event != "undefined")) {
					// using Web3 connector mechanism
					res = _oContextor.Event(event, _processName, _pageName, id, -1, 0, data || id);
				//} else if (_oContextor && (typeof _oContextor.CtxtEvent != "undefined")) {
				//	// using CxtxDesktop or XsActApp2 mechanism
				//	res = _oContextor.CtxtEvent(_processName, event, _pageName, "", 0, strData, 0, 0, 0, _oContextor);
				}
			}
			catch (e) {
				//alert(e.description);
			}
			return res;
		},

		close : function(id, data) {
			if (ctx.autoCloseTimer)	{
				clearTimeout(ctx.autoCloseTimer);
				ctx.autoCloseTimer = 0;
			}
			ctx.notify(id, 'CLICK', data, true);
		},

		notify : function(id, event, data, close) {
			// Default notify funtion : set value in 'Ctx_Result' div, then click on 'Ctx_Notify'
			var item = ctx.itemGet(id);
			close = close || false;
			var submit = false;
			if (item && item.options && item.options.close) { close = true; }
			if (item && item.options && item.options.submit) { submit = true; }
			if (submit) {
				var obj = {}
				for (var i = 0; i < ctx.items.length; i ++) {
					obj[ctx.items[i].id] = '';
				}
				obj.button = id;
				data = ctx.get(obj);
			}
			var strData = '';
			if (data && (typeof data === 'object') && JSON && JSON.stringify)
				strData = '!json:' + JSON.stringify(data);
			else if (typeof data === 'string')
				strData = data;			
			if (Ctx_Notify) {
				Ctx_Event.value = event || 'CLICK';
				Ctx_Item.value = id || '';
				Ctx_Result.value = strData || id || '';
				if (close) { 
					Ctx_Close.click(); 
				} else {
					Ctx_Notify.click();
				}
			} else
				ctx.sendEvent(id, event, value);
		},

		/*sendValues : function(key, submit, close, container) {
			var result;
			if (submit) {
				var resObj = $(container || 'form').serializeJSON();
				resObj.button = key;
				result = '!json:' + JSON.stringify(resObj);
			} else {
				result = key;
			}
			ctx.notify(result);
			if (close) {
				// Default close funtion : set value in 'Ctx_Result' div, then click on 'Ctx_Close'
				ctx.close(result);
			} else {
				ctx.notify(result);
				//ctx.sendEvent('', result);
			}
			return true;
		},*/

		/** Receives an event from Contextor project
		* @method onEvent
		* @param {string} event event name
		* @param {*} data : optional data (text buffer)
		*/
		onEvent : function (event, data) {
			// default function : to be overloaded by each page
			return 1;
		},

		/** Sends an action to Contextor Unified Desktop
		* @method actionApp
		* @param {string} action action name
		* @param {string} P1 optional parameter 1
		* @param {string} P2 optional parameter 2
		* @param {string} P3 optional parameter 3
		* @param {string} P4 optional parameter 4
		* @param {string} P5 optional parameter 5
		* @return {string} result
		*/
		actionApp : function (action, P1, P2, P3, P4, P5) {
			var res = '';
			_init();
			try {
				if (_oContextor && (typeof _oContextor.CtxtActionApp != "undefined"))
					res = _oContextor.CtxtActionApp(action, P1, P2, P3, P4, P5, 0, 0, 0);
				}
			catch (e) {
				//alert(e.description);
			}
			return res;
		}
	}

	return self;
})();

// event callback definition
var OnCtxtEvent = ctx.onEvent;
var CtxtActionApp = ctx.actionApp;
//var CtxtEvent = ctx.sendEvent;


$(document).ready(function() {

	if($("#Ctx_Result").length == 0) {
		$('body').append('<div style="display: none;"><input name="Ctx_Result" id="Ctx_Result"/></input><input name="Ctx_Event" id="Ctx_Event"></input><input name="Ctx_Item" id="Ctx_Event"></input><button name="Ctx_Close" id="Ctx_Close">Close</button><button name="Ctx_Notify" id="Ctx_Notify">Notify</button></div>');
	}
	// initialize UI objects
	if (typeof ctx.initUI === 'function') {
		ctx.initUI();
	}
	
	// make a first initialization on existing Html
	ctx.initialize({});

	// test UI objects
	if (typeof ctx.testUI === 'function') {
		var test = ctx.queryURL("test") || "1";
		if (test) {
			ctx.testUI(test);
		}
	}
	
} );

