/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
======ctx.popup class======
\\
:!: //__Caution:__ this page is auto-generated from source code and should not be modified from wiki application//
\\
\\
For a general overview about 'Using Popups', see [[:pg:gui.popup2|Development Guide]].		
\\
\\
------
=====Properties reference for 'ctx.popup'=====
<WRAP indent>
{{section>ctx.includes#properties_reference_for_ctxpopup}}
</WRAP>
\\
------
=====Parameter reference for 'ctx.messbox'=====
* \\
<WRAP todo>
<todo @cpuget>Parameter reference for 'ctx.messbox' : to remove ?</todo>\\
</WRAP>

*   * __Possibles values for the container parameters :__
*|< 100% 30% >|
* ^Attributes  ^Description ^
* | {e.messbox.type} Type | determines the popup type. \\ Possible values are defined in : [[:lib:common:ctx.enum#enumeration_emessboxtype|e.messbox.type]] |
* | {string} URL | indicates whether parameter is a URL or text.\\ This attribute initialized with Y indicates that the value parameter is a URL if the value parameter corresponds to the \\ text (** for a URL, do not use the template attribute **) |
* | {string} Template | template name. \\ This optional attribute allows a predefined template HTML, simplifying the display of messages. \\ Possible values are defined in : [[:lib:common:ctx.enum#enumeration_emessboxtemplate|e.messbox.template]] |
* | {string} Title | indicates the title of the window.\\ Specific values \\ • "No" will hide the title bar. |
* | {string} HWNDPARENT | handle of the parent window. \\ Optional attribute specifying the handle of the window, under Win32, against which the message box should be positioned. \\ Without this parameter, the information on the positions of the message box is interpreted by Agent as on the Desktop. \\ This parameter allows for example to display the message box on the same physical screen as hosting the window whose handle is given, or to display the message box "down" from a window, regardless its position and size. |
* | {string} TextBt1 | Text button 1.\\ This optional attribute used to enter the text of the button 1, when using the "Template" attribute. |
* | {string} TextBt2 | Text button 2.\\ This optional attribute used to enter the text of the button 2, when using the "Template" attribute. |
* | {string} TextBt3 | Text button 3.\\ This optional attribute used to enter the text of the button 3, when using the "Template" attribute. |
* | {string} Icon | Icon used.\\ This optional attribute to override the default icon when using the "Template" attribute. |
* | {string} BackColor | Background Color.\\ This optional attribute allows you to override the default background color when using the "Template" attribute. |
* | {string} PageName | Page Name.\\ This optional attribute specifies the name of the object for Event Management (the default is HtmlView) |
* | {string} X | Pos left.\\ This attribute specifies the left position. Possible values:\\ • value in pixels \\ • 'left' \\ • 'right' \\ • 'center' |
* | {string} Y | Pos top.\\ This attribute indicates the high position. Possible values:\\ • value in pixels \\ • 'top' \\ • 'bottom' \\ • 'center' |
* | {string} CX | Width.\\ This attribute specifies the width in pixels. |
* | {string} CY | Height.\\ This attribute indicates the height in pixels. |
* | {string} Style | Window style.\\ This attribute specifies the window style. Possible values: \\ • HWND_BOTTOM (Place the lower window of the order z) \\ • HWND_TOP (Places the window of the z-order) \\ • HWND_TOPMOST (Place the foreground window) • \\ HWND_NOTOPMOST (Place the window behind all the windows TOPMOST but before the non-topmost). • \\ WS_SYSMENU (creates a window that has a Control-menu box in its title bar) \\ • WS_BORDER (creates a window that has a border) \\ • WS_THICKFRAME (creates a window with a heavy frame that can be used to resize the window) \\ • WS_DLGFRAME (creates a window with a double border but no title) \\ • SWP_NOACTIVATE (does not activate the window) \\ • SWP_SHOWWINDOW (show window) \\ • SWP_HIDEWINDOW (hide the window) \\ View Windows documentation styles |
* | {string} ExStyle | Window extended style.\\ This attribute specifies the window style. Possible values: \\ • WS_EX_TOOLWINDOW (creates Tool window, a window that can be used as a floating toolbar) \\ See Windows documentation styles |
* | {Number} Time | Duration.\\ This attribute indicates the display time in milliseconds. |
* | {string} Value | Text (HTML or XML) or URL. |
*
* \\
* ------
* =====Parameter reference for 'ctx.messboxAlert'=====
* \\
<WRAP todo>
<todo @cpuget>Parameter reference for 'ctx.messbox' : to remove ?</todo>\\
</WRAP>
*   * __Possibles values for the parameters :__
* 
* ^Attributes  ^Description ^
* | //{string}// **Id** | popup id |
* | //{string}// **Title** | popup title |
* | //{string}// **TitleIcon** | popup title icon |
* | //{boolean}// **HideTitle** | show ('false') or hide ('true') title bar.\\ Default is 'false' |
* | //{string}// **Icon** | icon to be displayed in popup.\\ Path to a '.png' file |
* | //{string}// **Text** | text to be displayed in popup |
* | //{string}// **LinkText** | optional link text |
* | //{[[:lib:common:ctx.enum#enumeration_emessboxalertlinktype|e.messboxAlert.linkType]]}// **Type** | link type |
* | //{string}// **Value** | value associated with the link (event or action name) |
* | //{string}// **Data** | optional data associated with link value  |
* | //{string}// **AutoCloseTime** | duration before auto close (in ms) |
* | //{string}// **AnimationSpeed** | animation speed (in ms) when showing/hiding |
* | //{[[:lib:common:ctx.enum#enumeration_emessboxalertanimation|e.messboxAlert.animation]]}// **AnimationType** | animation type when showing/hiding |
* | //{string}// **Transparency** | popup transparency (0 - 255) |
* | //{[[:lib:common:ctx.enum#enumeration_emessboxalertlook|e.messboxAlert.look]]}// **Look** | popup look |
*
*/

/** 
* @typedef {{
*   content: (string|undefined),
*   container: (boolean|undefined),
*   name: (string|undefined),
*   template: (string|undefined),
*   url: (string|undefined),
*   title: (string|undefined),
*   titleIcon: (string|undefined),
*   titleVisible: (boolean|undefined),
*   toolWindow: (boolean|undefined),
*   IEHost: (boolean|undefined),
*   modal: (boolean|undefined),
*   maximize: (boolean|undefined),
*   minimize: (boolean|undefined),
*   canClose: (boolean|undefined),
*   autoIcon: (boolean|undefined),
*   autoTitle: (boolean|undefined),
*   resizable: (boolean|undefined),
*   canMove: (boolean|undefined),
*   topMost: (boolean|undefined),
*   X: (e.popup.position|number|string|undefined),
*   Y: (e.popup.position|number|string|undefined),
*   CX: (e.popup.position|number|string|undefined),
*   CY: (e.popup.position|number|string|undefined),
*   minCX: (e.popup.position|number|string|undefined),
*   minCY: (e.popup.position|number|string|undefined),
*   maxCX: (e.popup.position|number|string|undefined),
*   maxCY: (e.popup.position|number|string|undefined),
*   compactCX: (e.popup.position|number|string|undefined),
*   compactCY: (e.popup.position|number|string|undefined),
*   XRelative: (e.popup.position|undefined),
*   YRelative: (e.popup.position|undefined),
*   XSlide: (e.popup.position|undefined),
*   YSlide: (e.popup.position|undefined),
*   display: (e.popup.display|undefined), 
*   appBar: (boolean|undefined),
*   systray: (boolean|undefined),
*   autoHide: (boolean|undefined),
*   forceShow: (boolean|undefined),
*   visible: (boolean|undefined),
*   fade: (number|undefined),
*   slide: (number|undefined),
*   plugin: (boolean|undefined),
*   detachOnClose: (boolean|undefined),
*   showToolbar: (boolean|undefined),
*   showAddressBar: (boolean|undefined),
*   highlight: (boolean|undefined),
*   highlightColor: (number|undefined),
*		demoMode: (boolean|undefined),
*   header: (string|undefined),
*   message: (string|undefined),
*   footer: (string|undefined),
*   file: (string|undefined),
* 	autoClose: (number|undefined),
*   notifyReady: (boolean|undefined),
*   icon: (string|undefined),
* 	transparency: (number|undefined),
*   callback: (function(*)|undefined),
*   position: (ctx.position|undefined),
*   buttons: (Object|undefined)
* }}
*/
ctx.popupParams = {
//	/** @type {string} */ content: '',
//	/** @type {boolean} */ container: true,
//	/** page name 
//	* @type {string} */ name: '', // 
//  /** @type {string} */ template: '', //: Template
//  /** @type {string} */ url: '',
//  /** embedding mode
//	* @type {boolean} */ IEHost: false, 
//  /** @type {boolean} */ modal: false, // modal / modeless mode
//  // *** title bar ***
//  /** popup title 
//	* @type {string} */ title: '',
//  /** icon to be displayed in title bar 
//	* @type {string} */ titleIcon: '',
//  /** show ('true') or hide ('false') title bar. 
//	* @type {boolean} */ titleVisible: true,
//  /** @type {boolean} */ canClose: true, // 'Close' system button
//  /** popup has a 'Maximize' system button ('true') or not ('false') 
//	* @type {boolean} */ maximize: false,
//  /** popup has a 'Minimize' system button ('true') or not ('false'). 
//	* @type {boolean} */ minimize: false,
//  /** display a 'tool window' title bar ('true') or a standard title bar ('false') 
//	* @type {boolean} */ toolWindow: false,
//	/** @type {string|undefined} */ autoSizeId: undefined,
//  /** @type {boolean} */ autoIcon: false,
//  /** @type {boolean} */ autoTitle: false,
//  // *** size and position ***
//  /** @type {boolean} */ resizable: true,
//  /** @type {boolean} */ canMove: true,
//  /** @type {boolean} */ topMost: true,
//  /** @type {e.popup.position|number|string|undefined} */ X: e.popup.position.Center,
//  /** @type {e.popup.position|number|string|undefined} */ Y: e.popup.position.Center,
//	/** @type {number|undefined} */ transparency: undefined,
//  /** @type {e.popup.position|number|string|undefined} */ CX: 500,
//  /** @type {e.popup.position|number|string|undefined} */ CY: 180,
//  /** @type {e.popup.position|number|string|undefined} */ minCX: 0,
//  /** @type {e.popup.position|number|string|undefined} */ minCY: 0,
//  /** @type {e.popup.position|number|string|undefined} */ maxCX: 0,
//  /** @type {e.popup.position|number|string|undefined} */ maxCY: 0,
//  /** @type {e.popup.position|number|string|undefined} */ compactCX: 0,
//  /** @type {e.popup.position|number|string|undefined} */ compactCY: 0,
//  /** @type {e.popup.position|undefined} */ XRelative: undefined,
//  /** @type {e.popup.position|undefined} */ YRelative: undefined,
//  /** @type {e.popup.position|undefined} */ XSlide: undefined,
//  /** @type {e.popup.position|undefined} */ YSlide: undefined,
//  /** @type {e.popup.display|undefined} */ display: undefined, // force on main screen display
//  // AppBar mode
//  /** @type {boolean} */ appBar: false,
//  /** @type {boolean} */ systray: false,
//  autoHide: true,
//	forceShow: true,
//  // Misc. parameters
//  visible: true,
//  fade: undefined,
//  slide: undefined,
//  plugin: false,
//  detachOnClose: false,
//  showToolbar: false,
//  showAddressBar: false,
//  // local parameters (neither container, nor html content)
//  highlight: false,
//	highlightColor: undefined,
//  callback: undefined,
//  position: undefined,
//	demoMode: false,
//  // html content parameters
//	header: undefined,
//	message: undefined,
//	footer: undefined,
//	file: undefined,
// 	autoClose: 0,		
//	icon: undefined,
//	buttons: {}
};

/** 
* @typedef {{
*   name: (string|undefined),
*   template: (string|undefined),
* 	title: (string|undefined),
* 	titleIcon: (string|undefined),
* 	titleVisible: (boolean|undefined),
* 	icon: (string|undefined),
* 	text: (string|undefined),
* 	linkText: (string|undefined),
* 	linkType: (e.messboxAlert.linkType|undefined),
* 	value: (string|undefined),
* 	data: (string|undefined),
* 	autoClose: (number|undefined),
* 	animationSpeed: (number|undefined),
* 	animationType: (e.messboxAlert.animation|undefined),
* 	transparency: (number|undefined),
* 	look: (e.messboxAlert.look|undefined)
* }}
*/
ctx.popupAlertParams = {
	name: '',
	template: '',
	title: '',
	titleIcon: '',
	titleVisible: true,
	icon: '',
	text: '',
	linkText: '',
	linkType: '',
	value: '',
	data: '',
	autoClose: 0,
	animationSpeed: 200,
	animationType: e.messboxAlert.animation.None,
	transparency: 0,
	look: e.messboxAlert.look.AppLookWindows7
};
	
var _containerMapping = {
  template: 'Template',
  name: 'Id',
  Id: 'Id',
	content: 'Type',
	container: 'Container',
  url: 'Args',
  Args: 'Args',
  IEHost: 'IEHost',
  modal: 'Modal',
  Modal: 'Modal',
  // *** title bar ***
  title: 'Name',
  Name: 'Name',
  titleIcon: 'Icon',
  Icon: 'Icon',
  titleVisible: 'TitleBar',
  TitleBar: 'TitleBar',
  toolWindow: 'ToolWindow',
  ToolWindow: 'ToolWindow',
  canClose: 'CanClose',
  CanClose: 'CanClose',
  maximize: 'Maximize',
  Maximize: 'Maximize',
  minimize: 'Minimize',
  Minimize: 'Minimize',
  autoIcon: 'AutoIcon',
  AutoIcon: 'AutoIcon',
  autoTitle: 'AutoTitle',
  AutoTitle: 'AutoTitle',
  // *** size and position ***
  resizable: 'Resizable',
  Resizable: 'Resizable',
  canMove: 'CanMove',
  CanMove: 'CanMove',
  topMost: 'TopMost',
  TopMost: 'TopMost',
	transparency: 'Transparency',
	Transparency: 'Transparency',
  X: 'X',
  Y: 'Y',
  CX: 'CX',
  CY: 'CY',
  minCX: 'MinCX',
  MinCX: 'MinCX',
  minCY: 'MinCY',
  MinCY: 'MinCY',
  maxCX: 'MaxCX',
  MaxCX: 'MaxCX',
  maxCY: 'MaxCY',
  MaxCY: 'MaxCY',
  compactCX: 'CompactCX',
  CompactCX: 'CompactCX',
  compactCY: 'CompactCY',
  CompactCY: 'CompactCY',
  XRelative: 'XRelative',
  YRelative: 'YRelative',
  XSlide: 'XSlide',
  YSlide: 'YSlide',
  display: 'Display',
  Display: 'Display',
  // AppBar mode
  appBar: 'AppBar',
  AppBar: 'AppBar',
  systray: 'Systray',
  fade: 'Fade',
  Fade: 'Fade',
  slide: 'Slide',
  Slide: 'Slide',
  autoHide: 'AutoHide',
  AutoHide: 'AutoHide',
  forceShow: 'ForceShow',
  ForceShow: 'ForceShow',
  // Misc. parameters
	autoSizeId: 'AutoSizeId',
  visible: 'Visible',
  plugin: 'Plugin',
  detachOnClose: 'DetachOnClose',
  showToolbar: 'ShowToolbar',
  showAddressBar: 'ShowAddressBar'
}

var _localMapping = {
  highlight: 'highlight',
	highlightColor: 'highlightColor',
  callback: 'callback',
	parent: 'parent',
  position: 'position',
	demoMode: 'demoMode'
}

var _contentMapping = {
	autoSizeId: 'autoSizeId'
}
/** Options for the 'ctx.popup' library
* @path ctx.options.popup
* @class ctx.options.popup
* @struct
*/
ctx.options.popup = {
	/** Trace level (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
	* @property {e.trace.level} traceLevel
	* @path ctx.options.popup.traceLevel */ traceLevel: e.trace.level.None
};

/** map of popup templates 
* @path ctx.popups
* @type {Object}
*/
ctx.popups = {}; 

/**
* Class used to manage popups objects
* @description
* __Ex.:__
<code javascript>
var popup = ctx.popup('pClose');
</code>
* @class ctx.popup
* @path ctx.popup
* @param {string|Object} [params] popup parameters (or name)
* @param {string} [template] popup template name (by default, no template is used)
* @param {ctx.application} [parent] parent Process object (by default, 'GLOBAL' is used)
* @return {ctx.popupClass} popup object
*/
ctx.popup = function (params, template, parent) {
	var obj = {};
	if (typeof (params) === 'string') {
		obj[params] = {};
	} else if (typeof (params) === 'object') {
		obj = params;
	} else {
		obj['pDefault'] = {};
	}
	var popup;
	ctx.each(obj, function(name, value) {
		if (value && typeof (value) === 'object') {
			value.template = value.template || template;
			value.parent = value.parent || parent || GLOBAL;
			ctx.popups[name] = popup = new ctx.popupClass(name, value);
			if (value.parent && (value.parent instanceof ctx.application)) {
				value.parent[name] = value.parent.popups[name] = popup;		
			}
		}
	});	
	return popup;
};

/**
* Class used to implement popups objects
* @description
* __Ex.:__
<code javascript>
</code>
* @class ctx.popupItem
* @path ctx.popupItem
* @constructor
* @advanced
* @param {Object} params item parameters
* @param {ctx.popupClass} popup parent popup
*/
ctx.popupItem = function (params, popup) {
	params = params || {};
	var _item = this;
	/** @type {ctx.popupClass} */ var _popup = popup;
	/** @type {string} */ var _id = params.id;
	/** @type {string} */ var _type = params.type || '';
	/** @type {*} */ var _typeObject; // item meta data

	/** @ignore
	* cached commands
	* @type {Object} */ this.commands = null;
	
	/** event list
	* @path ctx.popupItem.events
	* @property {Object} events  */ this.events = {};

	/**
	* Adds a technical event to an item
	* @description
	* __Ex.:__
<code javascript>
this.btSearch.addEvent(e.event.item.UPDATE);
</code>
	* @method addEvent
  * @path ctx.popupItem.addEvent
	* @advanced
  * @param {Object} obj object with event names (ex. : { COMMAND:'', CLICK:'', ...} )
  * @param {boolean} [technical] if true, technical event
	* @return {ctx.event} created event
	*/
	this.addEvent = function (obj, technical) {
    /** @type {ctx.event} */ var ev = null;
    for (var name in obj) {
      if (!this.events[name]) {
        this.events[name] = new ctx.event(name, this, null, technical);
      }
      ev = this.events[name];
    }
    return ev;
	}

  /**
  * Executes a command on the item
	* @description
	* __Ex.:__
<code javascript>
ctx.popups.myPopup.checkbox1.itemExec('disable', true);
</code>
  * @method itemExec
  * @advanced
	* @path ctx.popupItem.itemExec
  * @param {string} command
  * @param {...*} [params] optional parameters
  */
  this.itemExec = function(command, params) {
	  var res = '';
		if (_popup.exist()) {
			var args = Array.prototype.slice.call(arguments); 
			args.unshift('ctx.itemExec', _id);
			//res = _popup.execScript(args);
			res = _popup.execScript.apply(_popup, args);
			if (res)
				res = ctx.unserialize(res);
		} else {
			switch (command) {
				case 'set':
				case 'update':
				{
					var args = Array.prototype.slice.call(arguments, 1); // cache command for differed execution
					_item.commands = _item.commands || {};
					_item.commands[command] = args;
					break;
				}
			}
		}
		return res;
  };

	/**
  * Initializes a list of item in the popup
	* @description
	* __Ex.:__
<code javascript>
ctx.popups.myPopup.items.init({
	lastname: '',
	firstname: ''
});
</code>
  * @method init
	* @path ctx.popupItem.init
  * @param {Object} params
  */
  this.init = function (params) {
		if (params.id) _id = params.id;
		if (params.type) _type = params.type;
		if (_type) {
			_typeObject = ctx.eval(_type, false);
			if (_typeObject && ('object' === typeof(_typeObject.root))) {
				_typeObject = _typeObject.root;
			}
			if (_typeObject && ('function' === typeof(_typeObject.initProxy))) {
				_typeObject.initProxy(_item, params);
			}
//			if (typeObject && typeObject.events && ('object' === typeof(typeObject.events))) {
//				_item.addEvent(typeObject.events);
//			}
		}
  	_item.itemExec('init', params);
  };
	
	// initialize parameter
	this.init(params);

	if (!this.click) {
		/**
	  * Clicks a list of item in the popup
		* @description
		* __Ex.:__
<code javascript>
ctx.popups.myPopup.button1.click();
</code>
	  * @method click
		* @path ctx.popupItem.click
	  * @param {string|number} [childId] optional child item id or index
	  */
		this.click = function (childId) {
		  return this.itemExec('click', childId);
	  };
  }

	if (!this.enable) {
	  /**
	  * Enables an item in the popup
		* @description
		* __Ex.:__
<code javascript>
ctx.popups.myPopup.checkbox1.enable(false);
</code>
	  * @method enable
		* @path ctx.popupItem.enable
	  * @param {boolean} enabled
	  * @param {string|number} [childId] optional child item id or index
	  */
	  this.enable = function (enabled, childId) {
		  return this.itemExec('enable', enabled, childId);
	  };
  }

	if (!this.collapse) {
	  /**
	  * Expands or collapses a collapsable item
		* @description
		* __Ex.:__
<code javascript>
ctx.popups.myPopup.list1.collapse(true);
</code>
	  * @method collapse
		* @path ctx.popupItem.collapse
	  * @param {boolean} [collapsed] undefined=toggle, true=hide, false=show
	  * @param {string|number} [childId] optional child item id or index
	  */
	  this.collapse = function (collapsed, childId) {
		  return this.itemExec('collapse', collapsed, childId);
	  };
  }
	
	if (!this.show) {
	  /**
	  * Shows or hides an item
		* @description
		* __Ex.:__
<code javascript>
ctx.popups.myPopup.list1.show(false);
</code>
	  * @method show
		* @path ctx.popupItem.show
	  * @param {boolean} visible
	  * @param {string|number} [childId] optional child item id or index
	  */
	  this.show = function (visible, childId) {
		  return this.itemExec('show', visible, childId);
	  };
  }
	
	if (!this.get) {
		/**
	  * Reads an item value
		* @description
		* __Ex.:__
<code javascript>
ctx.popups.myPopup.text1.get();
</code>
	  * @method get
		* @path ctx.popupItem.get
	  * @param {string|number} [childId] optional child item id or index
	  */
	  this.get = function (childId) {
			var res = this.itemExec('get', childId);
			return res;
	  };
  }
	
	if (!this.getObjectDescriptor) {
		/**
		* Retrieves the object descriptor from the given popup
		* @method getObjectDescriptor
		* @path ctx.popupItem.getObjectDescriptor
		* @ignore
		* @param {ctx.descriptor} [desc] Optional source descriptor object
		* @return {ctx.descriptor} Object descriptor
		*/
		this.getObjectDescriptor = function (desc) {
	    if (!desc)
	      desc = new ctx.descriptor();
	    if (_popup) {
	      desc = _popup.getObjectDescriptor(desc);
			}
			desc.itemName = _id;
			return desc;
		};
  }
	
	if (!this.getParameters) {
		/**
	  * Reads item properties
		* @description
		* __Ex.:__
<code javascript>
ctx.popups.myPopup.text1.getParameters();
</code>
	  * @method getParameters
		* @path ctx.popupItem.getParameters
	  */
	  this.getParameters = function () {
		  var res = this.itemExec('getParameters');
			return res;
	  };
  }
	
	if (!this.highlight) {
		/**
	  * Highlights an item
		* @description
		* __Ex.:__
<code javascript>
POPUPS.myPopup.lastname.highlight();
</code>
	  * @method highlight
		* @path ctx.popupItem.highlight
	  * @param {string|number} [childId] optional child item id or index
	  */
	  this.highlight = function (childId) {
		  return this.itemExec('highlight', childId);
	  };
  }

	if (!this.update) {
		/**
	  * Updates some item properties
		* @description
		* __Ex.:__
<code javascript>
ctx.popups.myPopup.list1.update({
	title: 'New title'
});
</code>
	  * @method update
		* @path ctx.popupItem.update
	  * @param {Object} params
	  * @param {string|number} [childId] optional child item id or index
	  */
	  this.update = function (params, childId) {
			var res;
			params = params || {};
			if (undefined !== childId) params.childId = childId;
			res = this.itemExec('update', params);
			return res;
	  };
  }

	if (!this.set) {
	  /**
	  * Writes an item value
		* @description
		* __Ex.:__
<code javascript>
POPUPS.myPopup.lastname.set('Smith');
</code>
	  * @method set
		* @path ctx.popupItem.set
		* @param {*} value value to be set
	  * @param {string|number} [childId] optional child item id or index
	  */
	  this.set = function (value, childId) {
			if (value && value.name)
				value = value.name;
			var res = this.itemExec('set', value, childId);
			return res;
	  };
  }
	
	if ((!this.setAll) && (_typeObject && _typeObject.meta && (_typeObject.meta.items !== undefined))) {
		/**
	  * Updates all sub items, from an array or item list
		* @description
		* __Ex.:__
<code javascript>
POPUPS.myPopup.credentials.setAll(ctx.cryptography.credentials);
</code>
	  * @method setAll
		* @path ctx.popupItem.setAll
		* @param {Array} items
		* @param {Object} [labelTable]
		*/
		this.setAll = function(items, labelTable) {
			var values = [];
			ctx.each(items, function(id, value) {
				var val = {};
				if (typeof value === 'string')
					val.id = value;
				else if (value && value.name)
					val.id = value.name
				else 
					val.id = _id + id;
				if (labelTable && (labelTable[val.id] != undefined)) {
					val.value = labelTable[val.id];
				} else {
					val.value = (value && (value.comment || value.name)) || val.id;
				} 
				values.push(val);
			});
			return this.update({ items: values });
		};
	}
	
	this.addEvent({ CLICK: '', SETFOCUS: '' });

}

/**
* Class used to implement popups objects
* @description
* __Ex.:__
<code javascript>
ctx.popups[name] = new ctx.popupClass(name, template, parent);
</code>
* @class ctx.popupClass
* @path ctx.popupClass
* @constructor
* @advanced
* @param {string} name popup name
* @param {*} params popup parameters
*/
ctx.popupClass = function (name, params) {
	if (!(params && typeof params === 'object')) {
		params = {};
	}
  // private attributes
	/** @type {ctx.popupClass} */ var _popup = this;
	/** @type {ctx.page} */ var _pg = null;
	/** @type {ctx.application} */ var _parent = params.parent || GLOBAL;
	/** @type {string} */ var _pgName = '_' + name;
  /** @type {string} */ var _template = params.template || '';
  /** @type {string} */ var _action = '';
  /** @type {string} */ var _actionLanguage = '';
  /** @type {string} */ var _res = '';
  /** @type {string} */ var _nature = e.nature.MESSBOX2; // default nature
  /** @type {string} */ var _subCommand = '';
	/** optional test function
	* @type {function(ctx.popupClass, string)} */ var _testFunction;
	//var _waitCloseObj = null;
	var _waitNotifObj = null;

	/** class type
	* @ignore
	* @const 
	* @path ctx.popupClass.ctxType
	* @property {string} */ this.ctxType = 'ctx.popupClass';
	
//	/** item factory
//	* @path ctx.popupClass.factory
//	* @property {Object} */ this.factory = {};

//	/** data container
//	* @path ctx.popupClass.data
//	* @property {Object} */ this.data = {};
	
	/** initialization parameter object
	* @ignore
	* @path ctx.popupClass.initParams
	* @property {Object} */ this.initParams = params;
 
 	/** popup type
	* @path ctx.popupClass.type
	* @advanced
	* @property {Object} */ this.type = params.type || ctx.popup.bootstrap;

	/** item list
	* @path ctx.popupClass.items
	* @property {Object<string, ctx.popupItem>} */ this.items = {};
	
 	/** popup name
	* @path ctx.popupClass.name
	* @advanced
	* @property {string} */ this.name = name;

	/** function list
	* @path ctx.popupClass.functions
	* @property {Object} */ this.functions = {	};
  
	/** container parameter object
	* @ignore
	* @path ctx.popupClass.containerParams
	* @property {Object} */ this.containerParams = {};
  
	/** content parameter object
	* @ignore
	* @path ctx.popupClass.contentParams
	* @property {Object} */ this.contentParams = {};
  
	/** local parameter object
	* @ignore
	* @path ctx.popupClass.localParams
	* @property {Object} */ this.localParams = {};
  
	/** HTML function name
	* @ignore
	* @path ctx.popupClass.loadFunc
	* @property {string} */ this.loadFunc = '';
  
	/** merged HTML function name
	* @ignore
	* @path ctx.popupClass.mergedLoadFunc
	* @property {string} */ this.mergedLoadFunc = '';
  
  /** merged parameter object
	* @path ctx.popupClass.mergedParams
	* @ignore 
	* @property {Object} */ this.mergedParams;
  
	/** merged local parameter object
	* @path ctx.popupClass.mergedLocalParams
	* @ignore 
	* @property {Object} */ this.mergedLocalParams;	

	/** merged HTML parameters
	* @path ctx.popupClass.mergedOnLoadArgs
	* @ignore
	* @property {Object} */ this.mergedOnLoadArgs = [];

	/** HTML parameters
	* @ignore
	* @path ctx.popupClass.onLoadArgs
	* @property {Object} */ this.onLoadArgs = [];
	
	/** parameter object
	* @ignore
	* @path ctx.popupClass.params
	* @property {Object} */ this.params;

//	/** optional init function
//	* @ignore
//	* @path ctx.popupClass.initFunction
//	* @property {function(string)} */ this.initFunction = null;

	/**
	* Activates the popup
	* @description
	* __Ex.:__
<code javascript>
ctx.popup('pClose').activate();
</code>
	* @method activate
	* @path ctx.popupClass.activate
  * @return {*} return value
  */
  this.activate = function () {
		return ((_pg && _pg.exist()) ? _pg.activate() : '');
  }
	
	/**
 	* Adds a child item to a page
	* @description
 	* __Ex.:__
<code javascript>
// add an item named 'edName' to the page
MyAppli.MyPage.edName = MyAppli.MyPage.initItem('edName');
</code>
  * @method initItems
  * @deprecated use ctx.popupClass.item instead of ctx.popupClass.initItems
  * @path ctx.popupClass.initItems
	* @advanced
  * @param {Object} obj item definitions
  * @return {ctx.popupClass} popup object
  */
	this.initItems = function (obj) {
		return this.item(obj);
	}

//	/**
// 	* Adds a child item to a page
//	* @description
// 	* __Ex.:__
//<code javascript>
//</code>
//  * @method addItem
//  * @path ctx.popupClass.addItem
//	* @throws {Error}
//  * @param {Object} params item definitions
//  * @return {ctx.popupClass} popup object
//  */
//	this.addItem = function (params) {
//		var it = null;
//		if (params && (typeof params === 'object')) {
//			var id = params.id;
//			if (id && (typeof id === 'string') && params && (typeof params === 'object')) { 
//				if ((!_popup.items[id]) && _popup[id]) {
//					throw new Error(e.error.Reserved, _parent.name + "." + _popup.name + " : '" + id + "' item can't be added: name is already used or reserved");
//				}
//		    it = _popup[id] = _popup.items[id] = new ctx.popupItem(params, _popup);
//			}
//		}
//		return _popup;
//	}

	/**
 	* Adds a child item to a page
	* @description
 	* __Ex.:__
<code javascript>
MyAppli.MyPage.edName = MyAppli.MyPage.item({ row1: { ... }});
</code>
  * @method item
  * @path ctx.popupClass.item
	* @throws {Error}
  * @param {Object} obj item definitions
	* @suppress {checkTypes}
  * @return {ctx.popupClass} popup object
  */
	this.item = function (obj) {
		var it = null;
		if (obj && (typeof obj === 'object')) {
			ctx.each(obj, function(id, params) {
				if (id && (typeof id === 'number') && params && (typeof params === 'object')) { 
					// 'obj' is an array of items (id should be set in the item parameters)
					id = params.id;
				}
				if (id && (typeof id === 'string') && params && (typeof params === 'object')) { 
					if ((!_popup.items[id]) && _popup[id]) {
						throw new Error(e.error.Reserved, _parent.name + "." + _popup.name + " : '" + id + "' item can't be added: name is already used or reserved");
					}
					if (params.auto !== false) {
						params.id = id;
				    it = _popup[id] = _popup.items[id] = new ctx.popupItem(params, _popup);
					}
				}
			});	
		}
		return _popup;
	}

/**
 	* TBD
	* @description
 	* __Ex.:__
<code javascript>
</code>
  * @method onInit
  * @path ctx.popupClass.onInit
  * @param {function(ctx.popupClass)} initFunction init function
  * @return {ctx.popupClass} popup object
  */
	this.onInit = function (initFunction) {
		if (initFunction && ('function' == typeof initFunction)) {
			initFunction.apply(_popup, [_popup]);
		}
		return _popup;
	}

	/**
 	* TBD
	* @description
 	* __Ex.:__
<code javascript>
</code>
  * @method onTest
  * @path ctx.popupClass.onTest
  * @param {function(ctx.popupClass, string)} testFunction test function
  * @return {ctx.popupClass} popup object
  */
	this.onTest = function (testFunction) {
		if (testFunction && ('function' == typeof testFunction)) {
			_testFunction = testFunction;
		}
		return _popup;
	}

	/**
 	* TBD
	* @description
 	* __Ex.:__
<code javascript>
</code>
  * @method showTest
	* @ignore
  * @path ctx.popupClass.showTest
  * @param {string} [test] optional test parameter
  * @return {ctx.popupClass} popup object
  */
	this.showTest = function (test) {
		if (_testFunction && ('function' == typeof _testFunction)) {
			_testFunction.apply(_popup, [_popup, test]);
		}
		return _popup;
	}

  /**
  * Checks if page already declared, adds it if not
  * @method check
	* @path ctx.popupClass.check
	* @ignore internal usage
	* @private
  * @return {boolean} result
  */
  this.check = function () {
    if (_parent && (!(_parent instanceof ctx.application))) {
      return false; // invalid parent application or process -> exit
    }
    //create a dynamic page
    var pg = null;
    // test if already existing, create a new page if not
    pg = _parent.getPage(_pgName, -1, _nature);
    if (!pg)
    { pg = _parent.addPage(_pgName, { nature: _nature } ); } // nature: 'MESSBOX', MESSBOX2', 'MESSBOXALERT'
    _pg = pg;
		return true;
	}
	
  /**
	* Closes the popup
	* @description
	* __Ex.:__
<code javascript>
ctx.popup('pClose').close();
</code>
  * @method close
	* @path ctx.popupClass.close
  * @return {ctx.popupClass} popup object
  */
  this.close = function () {
		if (_pg && _pg.exist()) 
			_pg.close();
		return this;
  }
	
  /**
	* Executes javascript code in the popup
	* @description
	* __Ex.:__
<code javascript>
ctx.popups.pMyPopup.execScript("$(...)...");
</code>
  * @method execScript
	* @path ctx.popupClass.execScript
  * @param {...*} list code to be executed or function name, then parameters to be used
  * @return {string} return value
  */
  this.execScript = function (list) {
		var res = "";
		if (_pg && _pg.exist()) 
			res = _pg.execScript.apply(_pg, arguments);
		return res;
  }
	
  /**
	* Tests popup existence
	* @description
	* __Ex.:__
<code javascript>
if (ctx.popup('pClose').exist()) { ... }
</code>
  * @method exist
	* @path ctx.popupClass.exist
  * @return {boolean} result : 'true' if page exists
  */
  this.exist = function () {
    return (_pg ? _pg.exist() : false);
  }
	
	/**
	* Gets the return code of a popup after it has closed
	* @description
	* __Ex.:__
<code javascript>
res =  popup.open();
popup.waitClose(function(ev) {
  if (popup.getCloseResult(ev) == e.item.id.Yes) {
    // the window has closed, 'yes' button was clicked
    ...
  }
});
</code>
	*
	* __Note:__ 
	*   - for a ''messbox'' popup, the result code is 'Bt1', 'Bt2', 'Bt3'
	*   - for a ''messbox2'' popup, the result code is the id of the clicked button, or an object with input data (for a form popup)
	*
	* @method getCloseResult
  * @path ctx.popupClass.getCloseResult
	* @advanced
	* @param {Object} ev event attached to the object
  * @return {*} return value
	*/
	this.getCloseResult = function (ev) {
		try {
			if (_res)
				return _res;
			if (!(ev && (ev.data || ev.itemName)))
				return '';
			var xml = ctx.xml.parse(ev.data);
			if (!xml) {
				return (ev.data || ev.itemName); // 'messbox2' directly returns the clicked object
			}
			// for 'messbox', get the 'Ctx_Result' value
			var xmlNode = xml.selectSingleNode("//_Items_/Ctx_Result");
			return (xmlNode ? xmlNode.text : '');
		} catch(ex) {
			ctx.log(ex, e.logIconType.Error, ex.message);
			return '';
		}
	}
	
  /**
	* Tests popup existence
	* @description
	* __Ex.:__
<code javascript>
if (ctx.popup('pClose').getItems()) { ... }
</code>
  * @method exist
	* @path ctx.popupClass.getItems
  * @return {*} result 
  */
  this.getItems = function () {
	  var res = _popup.execScript('ctx.getItems()');
		return ctx.unserialize(res);
  }
	
	/**
	* Retrieves the object descriptor from the given popup
	* @method getObjectDescriptor
	* @path ctx.popupClass.getObjectDescriptor
	* @ignore
	* @param {ctx.descriptor} [desc] Optional source descriptor object
	* @return {ctx.descriptor} Object descriptor
	*/
	this.getObjectDescriptor = function (desc) {
    if (!desc)
      desc = new ctx.descriptor();
    if (_pg && _pg.getObjectDescriptor) {
      desc = _pg.getObjectDescriptor(desc);
		}
    /*if (!desc)
      desc = new ctx.descriptor();
    if (_parent && _parent.getObjectDescriptor) {
      desc = _parent.getObjectDescriptor(desc);
		}
		desc.pageName = _popup.name;
    desc.nature = _nature || desc.nature;*/
		return desc;
	};
	
	/**
	* Initializes an HTML message box (based on ctx.popup.messbox2)
	* @method init
	* @path ctx.popupClass.init
	* @param {Object} params object containing attributes about the popup (title, size, position, ...) see ''[[lib:ctx:ctx.popup#properties_reference_for_ctxpopup|complete list]]''
	* @description
	*
	* __Ex.:__
<code javascript>
var popup = ctx.popup('pClose').init({
  template: e.popup.template.YesNo,
  title: GLOBAL.labels.stopPopup.title,
  CX: 500,
  CY: 180,
  message: '<br/><b>' + GLOBAL.labels.updatePopup.label + '</b><br/><br/>', 
  icon: e.popup.icon64.hello
});
popup.open();
</code>
	*
  * @return {ctx.popupClass} popup object
  */
  this.init = function (params) {
		params = params || {};
		var loadFunc = '';

		// add resource folder if omitted
		var tCheck = ['url', 'file', 'icon', 'titleIcon'];
		ctx.each(tCheck, function(id, value) {
		  if (params[value] && (!ctx.fso.isPathAbsolute(params[value]))) {
				var filename = params[value];
				if ((!filename.startsWith('/')) && (!filename.startsWith('\\')))
					filename = '\\' + filename;
				params[value] = ctx.options.path.resources + filename;
			}
		});
		
		// if a position object is provided, update popup position relatively
		/** @type {ctx.position} */ var pos = params.position || null;
		if (pos && (pos.cx || pos.cy)) {
			switch (params.XRelative) {
				case e.popup.position.Right:
				{
					params.X = pos.x + pos.cx;
					break;
				}
				case e.popup.position.Left:
				{
					params.X = pos.x;
					break;
				}
				case e.popup.position.Center:
				default:
				{
					params.X = pos.x + pos.cx / 2;
					break;
				}
			}
			switch (params.YRelative) {
				case e.popup.position.Bottom:
				{
					params.Y = pos.y + pos.cy;
					break;
				}
				case e.popup.position.Center:
				{
					params.Y = pos.y + pos.cy / 2;
					break;
				}
				case e.popup.position.Top:
				default:
				{
					params.Y = pos.y;
					break;
				}
			}
		}
		
		if (params.file && ctx.fso) {
			// load HTML/Markdown message from an external file
			try {
				params.message = ctx.fso.file.read(params.file);
			} catch (ex) {	}
		}

//		// Markdown converter
//		if (!ctx.converter) {
//			try {
//				var options = {
//					strikethrough: true,
//					tablesHeaderId: true,
//					tables: true,
//					tasklists: true,
//					extensions: ['icon']
//				}
//				ctx.converter = showdown.Converter(options);
//			} catch (ex){
//				//alert(ex.message);
//			}
//		} 

//		// Handlebars template converter
//		if (params.message && params.data && (typeof params.data === 'object')) {
//			try {
//				var template = exports.Handlebars.compile(params.message);
//				params.message = template(params.data);
//			} catch (ex){ }
//		} 
		
//		// parse message content as Markdown text
//		if (ctx.converter && ctx.converter.makeHtml) {
//			if (params.message) {
//				params.message = ctx.converter.makeHtml(params.message);
//			}
//			if (params.title) {
//				params.title = ctx.converter.makeHtml(params.title);
//			}
//		}

		// collect parameters relative to container, local or html content
		this.localParams = {};
		for (var id in params) {
			if (_containerMapping[id])
				this.containerParams[_containerMapping[id]] = params[id];
			else if (_localMapping[id])
				this.localParams[_localMapping[id]] = params[id];
			else if (id == 'onFuncLoad')
				loadFunc = params[id];
			else
				this.contentParams[id] = params[id];
			if (_contentMapping[id])
				this.contentParams[_contentMapping[id]] = params[id];
		}
		var popup = this.messbox2(this.containerParams);
		if (loadFunc) popup.onFuncLoad(loadFunc);
		return popup.onLoad(this.contentParams);
  }

  /**
	* Creates a Windows or HTML message box popup object (version 1)
	* @method messbox
	* @path ctx.popupClass.messbox
	* @advanced
  * @param {Object} [params] popup settings
	* @description
	* 'ctx.messbox' is kept for compatibility. You should use 'ctx.messbox2' popups instead.\\
	* See: ''ctx.popupClass.messbox2({...})'', ''ctx.popupClass.init({...})'' and ''ctx.popupClass.messbox2.open({...})''
	* \\
	* __Ex.:__
<code javascript>
var popup = ctx.popup('pClose').messbox({
  Type: e.messbox.type.HTMLView,
  Template: e.messbox.template.Info,
  Icon: 'MyIcon.gif',
  Title: GLOBAL.labels.stopPopup.title,
  Value: GLOBAL.labels.stopPopup.label,
  TextBt1: GLOBAL.labels.buttons.yes,
  TextBt2: GLOBAL.labels.buttons.no,
  Style: "SWP_SHOWWINDOW HWND_TOPMOST SWP_NOACTIVATE",
  ExStyle: "WS_EX_TOOLWINDOW"
});
popup.open();
popup.waitResult(function(ev) {
  // ...
});
</code>
	* 
	* @return {ctx.popupClass} popup object
  */
  this.messbox = function (params) {
    params = params || {};
    _action = e.nature.MESSBOX;
		_actionLanguage = 'messbox';
    _nature = e.nature.MESSBOX;
    _subCommand = '<SETVALUE ZoneCtx="_Work0_" Value="1"/>';
    this.loadFunc = ''; // default name for the initialization function
    this.params = {
      PageName: _pgName,
      Result: params.Result || '_Work0_' // add 'Result' parameter to get result
      // TBC...
    }
    this.setParam(this.params, params);
    return this;
  }
	
  /**
	* Creates an HTML message box popup object (version 2)
  * @method messbox2
	* @advanced
	* @path ctx.popupClass.messbox2
  * @param {Object} [params] popup settings
	* @description
	*  You'd better use 'ctx.popupClass.init({...})' which wraps this method.
	* @return {ctx.popupClass} popup object
  */
  this.messbox2 = function (params) {
    if (!params) { params = {
		  Name: undefined, 
		  Id: undefined, 
		  Template: undefined, 
		  Result: undefined, 
		 	Args: undefined,
		 	Icon: undefined,
		 	IEHost: undefined,
		 	ToolWindow: undefined,
		 	TopMost: undefined,
		 	X: undefined,
		 	Y: undefined,
		 	Display: undefined,
		  CX: undefined, 
		  CY: undefined
	  } };
    _action = e.nature.MESSBOX2;
		_actionLanguage = 'messbox2';
    _nature = e.nature.MESSBOX2;
    _subCommand = '<SETVALUE ZoneCtx="_Work0_" Value="1"/>';
    this.loadFunc = ''; // default name for the initialization function
    this.params = {
        Id: _pgName,
        Result: params.Result || '_Work0_' // add 'Result' parameter to get result
        // TBC...
    }
    //if ((!_template) && params.Template)
    if (params.Template)
        _template = params.Template; // get template name
    // set internal param.
    this.setParam(this.params, params);
    return this;
  }
	

  /**
  * Creates a message box alert popup object
  * @method messboxAlert
	* @path ctx.popupClass.messboxAlert
	* @advanced
  * @param {ctx.popupAlertParams} [params] popup settings
	* @description
	* 'ctx.messboxAlert' is kept for compatibility. You should use 'ctx.messbox2' popups instead.
	* See: ''ctx.popupClass.messbox2({...})'', ''ctx.popupClass.init({...})'' and ''ctx.popupClass.messbox2.open({...})''
	* 
	* __Ex.:__
<code javascript>
var popup = ctx.popup('pAlert').messboxAlert({
  // Title
  HideTitle: false,
  Title: 'popup title',
  TitleIcon: ctx.options.path.resources + e.popup.icon16.agent,
  // Content
  Icon: ctx.options.path.resources + e.popup.icon32.agent,
  Text: 'Put the popup text here...',
  // Link
  LinkText: 'Click to start scenario',
  Type: e.messboxAlert.linkType.Event, // None|Event|Action
  Value: 'evStartScenario', // Action or Event to trigger
  Data: 'scScenario1', // data associated with event or action
  // Animation
  AutoCloseTime: '10000',
  AnimationSpeed: '30',
  AnimationType: e.messboxAlert.animation.Slide,
  // Look
  Transparency: '200',
  Look: e.messboxAlert.look.AppLookOffice2007Blue
});
popup.open();
</code>
	* 
	* @return {ctx.popupClass} popup object
  */
  this.messboxAlert = function (params) {
    if (params) {
			var obj = {};
			obj.Id = params.name || params['Id'];
			obj.Title = params.title || params['Title'];
			obj.TitleIcon = params.titleIcon || params['TitleIcon'];
			obj.HideTitle = (!params.titleVisible) || params['HideTitle'];
			obj.Icon = params.icon || params['Icon'];
			obj.Text = params.text || params['Text'];
			obj.LinkText = params.linkText || params['LinkText'];
			obj.Type = params.linkType || params['Type'];
			obj.Value = params.value || params['Value'];
			obj.Data = params.data || params['Data'];
			obj.AutoCloseTime = params.autoClose || params['AutoCloseTime'];
			obj.AnimationSpeed = params.animationSpeed || params['AnimationSpeed'];
			obj.AnimationType = params.animationType || params['AnimationType'];
			obj.Transparency = params.transparency || params['Transparency'];
			obj.Look = params.look || params['Look'] ;

			_action = e.nature.MESSBOXALERT;
			_actionLanguage = 'messboxAlert';
	    _nature = e.nature.MESSBOXALERT;
	    _subCommand = '';
	    this.params = {
	        Id: name
	        // TBC...
	    }
	    if ((!_template) && params.template && params.Template)
	        _template = params.template || params.Template; // get template name
	    // set internal param.
	    this.setParam(this.params, obj);
		}
    return this;
  }

	/**
  * Defines the name of the initialization function to be called in the HTML content, following page load
	* @description
	* __Ex.:__
<code javascript>
ctx.popup('popupYesNo').messbox2({...})
.onFuncLoad('initialize')
.onLoad({	
  message: '<br>dummy message</br>', 
  title: 'Dummy title'
});

// At page load, the following code is executed in the page :
initialize({"message": "<br>dummy message</br>",  "title": "Dummy title"});
</code>
  * @method onFuncLoad
	* @path ctx.popupClass.onFuncLoad
  * @param {string} funcName function name (if different of default value ('initialize'))
  *							ex. : onFuncLoad('initialize');
	* @return {ctx.popupClass} popup object
  */
  this.onFuncLoad = function (funcName) {
    this.loadFunc = funcName;
    return this;
  }
	
  /**
  * Defines the parameters of the initialization function to be called in the HTML content, following page load
	* @description
	* __Ex.:__
<code javascript>
ctx.popup('popupYesNo').messbox2({...})
.onFuncLoad('initialize')
.onLoad({	
  message: '<br>dummy message</br>', 
  title: 'Dummy title'
});

// At page load, the following code is executed in the page :
initialize({"message": "<br>dummy message</br>",  "title": "Dummy title"});
</code>
  * @method onLoad
	* @path ctx.popupClass.onLoad
	* @advanced
  * @param {...(string|Object)} list arguments of the function to be called : parameters initialize('arg1', 'arg2', ...)
  *							ex. : onLoad(obj1, obj2);
	* @return {ctx.popupClass} popup object
  */
  this.onLoad = function (list) {
    var args = Array.prototype.slice.call(arguments);
		var nb = args.length;
    for (var i = 0; i < nb; i++) {
      ctx.popups[name].onLoadArgs[i] = args[i];
    }
    return this;
  }

  /**
  * Merges recursively popup parameters with their parent templates
  * @method mergeParams
	* @path ctx.popupClass.mergeParams
	* @ignore
	* @return {ctx.popupClass} popup object
  */
  this.mergeParams = function () {

		// *** get template popup ***
		var templatePopup = null;
		if (_template) templatePopup = ctx.popups[_template];
		if (templatePopup)
			templatePopup.mergeParams(); // recursively merge templates
		
		// *** merge container params ***
    this.mergedParams = {};
    if (templatePopup && templatePopup.params)
        this.setParam(this.mergedParams, templatePopup.mergedParams);
    this.setParam(this.mergedParams, this.params);
		// check coherence
		if ((this.mergedParams['Container'] === false) && (!this.mergedParams.IEHost)) {
			this.mergedParams.IEHost = true;
		}
		// *** merge local params ***
		this.mergedLocalParams = {
			highlight: undefined,
			highlightColor: undefined,
			position: undefined,
			callback: undefined,
			demoMode: undefined
		};
    if (templatePopup && templatePopup.localParams)
        this.setParam(this.mergedLocalParams, templatePopup.mergedLocalParams);
    this.setParam(this.mergedLocalParams, this.localParams);

    // *** merge parameters from template and page for the HTML content ***
    this.mergedLoadFunc = this.loadFunc || (templatePopup ? templatePopup.mergedLoadFunc : '');
    var nbArgs = 0;
    this.mergedOnLoadArgs = [];
    if (templatePopup && templatePopup.mergedOnLoadArgs) {
      nbArgs = Math.max(templatePopup.mergedOnLoadArgs.length, this.onLoadArgs.length);
      for (var i = 0; i < nbArgs; i++) {
        this.mergedOnLoadArgs[i] = {};
        this.setParam(this.mergedOnLoadArgs[i], templatePopup.mergedOnLoadArgs[i]);
        this.setParam(this.mergedOnLoadArgs[i], this.onLoadArgs[i]);
      }
    } else {
      nbArgs = this.onLoadArgs.length;
      this.mergedOnLoadArgs = this.onLoadArgs;
    }
    if (this.mergedLoadFunc && nbArgs) {
      var argText = ''
			var nb = this.mergedOnLoadArgs.length;
	    for (var i = 0; i < nb; i++) {
				if (i == 0) {
					// add appli, page, updated items, event names as parameters (might be used by the page to send events back)
					var args = _popup.mergedOnLoadArgs[i];
					args.appliName = _parent.name;
					args.pageName = _popup.name || (templatePopup ? templatePopup.name : ''); 
					ctx.each(_popup.items, function(id, item) {
						/*if (item.commands['update']) {
							args.updatedItems = args.updatedItems || {};
							args.updatedItems[id] = item.commands['updated'];
							delete item.commands['updated'];
						}
						if (item.commands['set'] !== undefined) {
							args.setItems = args.setItems || {};
							args.setItems[id] = item.commands['set'];
							delete item.commands['set'];
						}*/
						if (item.commands) {
							args.commands = args.commands || {};
							args.commands[id] = item.commands;
						}
					});
				}
        //this.onLoadArgs[i] = this.mergedOnLoadArgs[i];
        if (argText != '')
          argText += ', ';
				if (typeof this.mergedOnLoadArgs[i] === 'undefined') { 
	        argText += 'undefined';
				} else if (typeof this.mergedOnLoadArgs[i] === 'string') { 
	        argText += ctx.serialize(this.mergedOnLoadArgs[i], true, false);
				} else {
	        argText += ctx.serialize(this.mergedOnLoadArgs[i], false, false);						
				}
      }
      this.mergedParams.OnLoad = this.mergedLoadFunc + "(" + argText + ");";
    }		
		return this;
	}
	
	/**
  * Opens and displays a popup
	* @description
	* __Note:__ the popup should have been previously initialized using ''ctx.popup.messbox'', ''ctx.popup.messbox2'' or ''ctx.popup.messboxAlert'' 
	*
	* __Ex.:__
<code javascript>
ctx.popup('pClose', e.popup.template.YesNo).messbox2({	
  ... 
}).onLoad({	
  ... 
}).open();
</code>
	*
  * @method open
	* @path ctx.popupClass.open
	* @param {ctx.popupParams|boolean} [params] object containing attributes about the popup (title, size, position, ...)
  * @param {boolean} [closeIfOpened] if 'true', popup is closed if already opened, otherwise updated (default is false)
	* @param {function(*)} [callback] optional callback called when the tooltip is closed
  * @return {ctx.popupClass} popup object
  */
  this.open = function (params, closeIfOpened, callback) {
    return this.start(params, closeIfOpened, callback);
  }
	
	/**
  * Opens and displays a popup
	* @description
	* __Note:__ the popup should have been previously initialized using ''ctx.popup.messbox'', ''ctx.popup.messbox2'' or ''ctx.popup.messboxAlert'' 
	*
	* __Ex.:__
<code javascript>
ctx.popup('pClose', e.popup.template.YesNo).messbox2({	
  ... 
}).onLoad({	
  ... 
}).open();
</code>
	*
  * @method start
	* @path ctx.popupClass.start
	* @param {ctx.popupParams|boolean} [params] object containing attributes about the popup (title, size, position, ...)
  * @param {boolean} [closeIfOpened] if 'true', popup is closed if already opened, otherwise updated (default is false)
	* @param {function(*)} [callback] optional callback called when the tooltip is closed
  * @return {ctx.popupClass} popup object
  */
  this.start = function (params, closeIfOpened, callback) {
		_res = '';
		if (((_nature == '') || (_nature == e.nature.MESSBOX2)) && (typeof this.initParams === 'object')) {
			this.init(this.initParams);
		} 
		if (typeof params === 'object') {
			this.init(params);
		} else if (typeof params === 'boolean') {
			closeIfOpened = params;
			params = undefined;
		}

	  if (!this.check()) {
			return this;
		}

		if ((closeIfOpened) && _pg && _pg.exist())
    { _pg.close(); }
		
		// ensure a default template is used for MESSBOX2
		if ((_nature == e.nature.MESSBOX2) && (!_template) && (!this.params.Args)) {
			_template = e.popup.template.None;
		}
		
		this.mergeParams();

		// promise integration			
		callback = callback || this.mergedLocalParams.callback;
		if (!callback || (typeof callback !== 'function')) {
			if (ctx.currentPromise) {
				callback = ctx.currentPromise.resolve;
			}
		}

		var displayed = false;
		
		// if 'demoMode' flag is set, and we are currently in demo mode, skip display
		if (!(this.mergedLocalParams.demoMode && (!ctx.options.demoMode))) {
			// if a position is provided, highlight it
			var pos = this.mergedLocalParams.position;
			if (this.mergedLocalParams && (this.mergedLocalParams.highlight !== false) && this.mergedOnLoadArgs && this.mergedOnLoadArgs[0] && this.mergedOnLoadArgs[0].autoClose && pos && (pos.cx || pos.cy)) {
				ctx.highlight(pos, this.mergedOnLoadArgs[0].autoClose, true, true, this.mergedLocalParams.highlightColor);
			}
			
			// *** display the popup ***
	    var desc = _pg.getObjectDescriptor();
	    desc.pageInst = 0;
			displayed = true;
			// check an URL or path is defined for the popup content
			if (_nature == e.nature.MESSBOX2)
			{
				var Args = '';
				Args = ctx.options.path.resources + "\\" + this.name + "\\popup.html"; // UI Designer nomenclature
				if (!ctx.fso.file.exist(Args)) {
					Args = this.mergedParams.Args;
					if (!Args) {
						Args = ctx.options.path.resources + "\\popup\\popup.html"; // compatibility with "pre UI Designer" versions
						if (!ctx.fso.file.exist(Args)) {
							throw new Error(e.error.InvalidArgument, "ctx.popup('" + this.name + "') has no URL defined");
						}
					}
				}
				this.mergedParams.Args = Args;
			}
			var res = ctx.verbExec(desc, _actionLanguage, _action, this.mergedParams, _subCommand, true);
			if (this.containerParams.ForceShow) {
				this.containerParams.ForceShow = false; // reset 'forceShow' tag
			}
			if (this.mergedParams.Modal) {
				// for a modal call, result is synchronous
				_res = res;
			} else {
				// if there is callback defined, listen to closure
				if (callback && (typeof callback === 'function')) {
					this.waitResult(function(result) {
						callback(result);
					});
				}
			}
		}

		// if display was skipped, and a callback is defined, call it immediately
		if (!displayed) {
			if (callback && (typeof callback === 'function')) {
				callback('');
			}
		}
    return this;
  }
	
  /**
  * Returns visibility state
	* @description
	* __Ex.:__
<code javascript>
var visible = ctx.popups.pClose.isVisible();	
</code>
  * @method isVisible
	* @path ctx.popupClass.isVisible
  * @return {boolean} visible state
  */
  this.isVisible = function () {
		var res = false;
		if (_pg && _pg.exist()) {
			res = ((_pg.actionApp('acObjectGetValue', "Application", _pg.name, 'Visible') == 'true') ? true : false);
		}
    return res;
  }
	
//  /**
//  * Reads a popup property
//	* @description
//	* __Ex.:__
//<code javascript>
//var icon = ctx.popups.pClose.getProperty('icon');	
//</code>
//  * @method getProperty
//	* @path ctx.popupClass.getProperty
//	* @param {string} property property name
//  * @return {*} property value
//  */
//  this.getProperty = function (property) {
//		var res = '';
//		if (_containerMapping[property]) {
//			if (_pg && _pg.exist()) {
//				res = _pg.actionApp('acObjectGetValue', "Application", this.name, _containerMapping[property]);
//				if (res == 'true') res = true;				
//				else if (res == 'false') res = false;				
//			}
//		} else {
//			throw new Error(e.error.InvalidArgument, "ctx.popupClass.getProperty: unknown property: " + property);
//		}
//    return res;
//  }
	
//  /**
//  * Sets a popup property
//	* @description
//	* __Ex.:__
//<code javascript>
//ctx.popups.pClose.setProperty('icon', ...);	
//</code>
//  * @method setProperty
//	* @path ctx.popupClass.setProperty
//	* @param {string} property property name
//	* @param {boolean|string|number} value property value
//  * @return {*} property value
//  */
//  this.setProperty = function (property, value) {
//		var res = '';
//		if (_containerMapping[property]) {
//			if (_pg && _pg.exist()) {
//				if ('boolean' === typeof value) { value = (value ? ' true' : 'false'); }
//				res = _pg.actionApp('acObjectSetValue', "Application", this.name, _containerMapping[property], value);
//				if (res == 'true') res = true;				
//				else if (res == 'false') res = false;				
//			}
//		} else {
//			throw new Error(e.error.InvalidArgument, "ctx.popupClass.setProperty: unknown property: " + property);
//		}
//    return res;
//  }
	
  /**
  * Gets the internal ''ctx.page'' object
	* @description
	* __Ex.:__
<code javascript>
var pg = ctx.popup('pClose').page();	
</code>
  * @method page
	* @path ctx.popupClass.page
  * @return {ctx.page} pg
  */
  this.page = function () {
    return _pg;
  }
	
  /**
  * Copies source object parameters to a destination object
	* @description
	* __Ex.:__
<code javascript>
this.setParam(this.params, params);
</code>
  * @method setParam
	* @path ctx.popupClass.setParam
  * @private
  * @ignore internal usage
  * @param {Object} params
  * @param {Object} [sourceParams]
  */
  this.setParam = function (params, sourceParams) {
    params = params || {};
    sourceParams = sourceParams || {};
    for (var i in sourceParams) {
      //if (typeof sourceParams[i] !== 'undefined')
      params[i] = sourceParams[i];
    }
  }

//  /**
//	* Displays an HTML message box (based on ctx.popup.messbox2)
//	* @description
//	* This function is just an alias to shorten syntax:
//<code javascript>ctx.popup(<name>).show(<container options>, <template>, <HTML content>, <closeIfOpened>);</code>
//	* is equivalent to :
//<code javascript>ctx.popup(<name>, <template>).messbox2(<container options>).onLoad(<HTML content>).open(<closeIfOpened>);</code>
//	* \\
//	* __Ex.:__
//<code javascript>
//	ctx.popup('pAbout').open({
//	  template: e.popup.template.Ok,
//		title:  GLOBAL.labels.aboutPopup.title,
//		CX: 600,
//		CY: 210,
//		message: label, 
//		icon: e.popup.icon64.hello128
//	});
//</code>
//  * @method show
//	* @deprecated Use 'ctx.popupClass.open' instead
//	* @path ctx.popupClass.show
//	* @ignore
//	* @param {Object} container object containing attributes about the popup container (title, size, position, ...)
//	* @param {Object} [content] object containing attributes about the HTML content (message, icon, ...)
//  * @param {boolean} [closeIfOpened] if 'true', popup is closed if already opened, otherwise updated (default is false)
//	* @param {string} [template] popup template to derive from. See [[:lib:ctx:ctx.popup.Bootstrap#popupBootstrap|e.popup.template enumeration]]
//  * @return {ctx.popupClass} popup object
//  */
//  this.show = function (container, content, closeIfOpened, template) {
//		if (template && (typeof container === 'object'))
//			container.Template = template;
//		return this.messbox2(container).onLoad(content).open(closeIfOpened);
//  }

  /**
  * Shows or hides a popup
	* @description
	* __Ex.:__
<code javascript>
ctx.popups.myPopup.show(false);
</code>
  * @method show
	* @path ctx.popupClass.show
  * @param {boolean} [visible] if true, shows the popup, if false, hides the popup (default is true)
  */
  this.show = function (visible) {
		this.open({ visible: (visible !== false) });
  };

  /**
	* Displays an alert message box (based on ctx.popup.messboxAlert)
	* @description
	* 'ctx.messboxAlert' is kept for compatibility. You should use 'ctx.messbox2' popups instead.
	* See: ''ctx.popupClass.messbox2({...})'', ''ctx.popupClass.init({...})'' and ''ctx.popupClass.messbox2.open({...})''
	* \\
	* This function is just an alias to shorten syntax:
<code javascript>ctx.popup(<name>).showAlert(<params>, <closeIfOpened>);</code>
	* is equivalent to :
<code javascript>ctx.popup(<name>).messboxAlert(<params>).open(<closeIfOpened>);</code>
	* \\
	* __Ex.:__
<code javascript>
ctx.popup('pAlert').showAlert({
  // Title
  HideTitle: false,
  Title: 'popup title',
  TitleIcon: ctx.options.path.resources + e.popup.icon16.agent,
  // Content
  Icon: ctx.options.path.resources + e.popup.icon32.agent,
  Text: 'Put the popup text here...',
  // Link
  LinkText: 'Click to start scenario',
  Type: e.messboxAlert.linkType.Event, // None|Event|Action
  Value: 'evStartScenario', // Action or Event to trigger
  Data: 'scScenario1', // data associated with event or action
  // Animation
  AutoCloseTime: '10000',
  AnimationSpeed: '30',
  AnimationType: e.messboxAlert.animation.Slide,
  // Look
  Transparency: '200',
  Look: e.messboxAlert.look.AppLookOffice2007Blue
});
</code>
  * @method showAlert
	* @path ctx.popupClass.showAlert
  * @param {ctx.popupAlertParams} [params] popup settings
  * @return {ctx.popupClass} popup object
  */
  this.showAlert = function (params) {
		return this.messboxAlert(params).open(true);
  }
	
  /**
	* Show the page grid (rows and columns)
	* @description
	* \\
	* __Ex.:__
<code javascript>
ctx.popups.MyPopup.showGrid();
</code>
  * @method showGrid
	* @path ctx.popupClass.showGrid
  * @param {boolean} [enabled] show / hide the grid (default is 'true')
  * @return {ctx.popupClass} popup object
  */
  this.showGrid = function (enabled) {
		if (enabled !== false) enabled = true;
	  var res = _popup.execScript('ctx.showGrid', enabled);
		return this;
  }
	
	this.openAlert = function (params) {
		return this.showAlert(params);
  }

//	/**
//  * TBC
//	* @description
//	*
//  * @method updateFactory
//  * @ignore
//	* @path ctx.popupClass.updateFactory
//  * @param {string} name type name
//  * @return {ctx.popupClass} popup object
//  */
//	this.buildFactory = function (name) {
//		return this;
//  }
	
	/**
  * Waits until a popup is present, then calls a callback 
	* @description
	* The behaviour is the following :
	*   * if the page already exists, the callback is immediately called
	*   * else it calls the callback on reception of a 'LOAD' event on the page. 
	* The handler on the 'LOAD' event is set a single time.
	*
 	* __Ex.:__
<code javascript>
ctx.popups.pClose.wait(function(ev) { 
  ...
});
</code>
  * @method wait
	* @path ctx.popupClass.wait
  * @param {function(ctx.event)} callback callback to be called when page is present
  * @return {ctx.popupClass} popup object
  */
  this.wait = function (callback) {
	  this.check();
		if (this.mergedOnLoadArgs && this.mergedOnLoadArgs[0] && this.mergedOnLoadArgs[0].notifyReady) {
			_pg.addOnce({ READY: callback });
		} else {
			_pg.addOnce({ LOAD: callback });
		}
		return this;
  }
	
	/**
  * Waits until a popup is present, then calls a callback 
	* @description
	* The behaviour is the following :
	*   * if the page already exists, the callback is immediately called
	*   * else it calls the callback on reception of a 'LOAD' event on the page. 
	* The handler on the 'LOAD' event is set permanently.
	*
 	* __Ex.:__
<code javascript>
ctx.popups.pClose.waitAll(function(ev) { 
  ...
});
</code>
  * @method waitAll
	* @path ctx.popupClass.waitAll
  * @param {function(ctx.event)} callback callback to be called when page is present
  * @return {ctx.popupClass} popup object
  */
  this.waitAll = function (callback) {
	  this.check();
		if (this.mergedOnLoadArgs && this.mergedOnLoadArgs[0] && this.mergedOnLoadArgs[0].notifyReady) {
			_pg.addOn({ READY: callback });
		} else {
			_pg.addOn({ LOAD: callback });
		}
		return this;
  }
	
  /**
  * Waits until a page is closed, then calls a callback 
	* @description
	* The behaviour is the following :
	*   * if the page doesn't exist, the callback is immediately called
	*   * else it calls the callback on reception of a 'UNLOAD' event on the page. 
	* The handler on the 'UNLOAD' event is set a single time.
	*
 	* __Ex.:__
<code javascript>
res =  popup.open();
popup.waitClose(function(ev) {
  ...
});
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **...waitClose** + 'TAB' :
	* 
<code javascript>
...waitClose(function(ev) {
  ...
});
</code>
	* </WRAP>
  * @method waitClose
	* @path ctx.popupClass.waitClose
  * @param {function(ctx.event)} callback callback to be called when page is closed or absent
  * @return {ctx.popupClass} popup object
  */
  this.waitClose = function (callback) {
    //return _pg.waitClose(callback);
		_pg.addOnce({ UNLOAD: callback });
		return this;
  }

  /**
  * Waits until a popup is closed, then calls a callback with result
	* the callback is also called if a button is clicked in the page (without closing it)
	* @description
	* The behaviour is the following :
	*   * if the popup is modal, the call is immediate
	*   * if the popup is modeless, the call is asynchronous
	*
 	* __Ex.:__
<code javascript>
var popup = ctx.popup('...').open(...);
popup.waitResult(function(res) { ... });
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **...waitResult** + 'TAB' :
	* 
<code javascript>
...waitResult(function(res) {
  ...
});
</code>
	* </WRAP>
  * @method waitResult
	* @path ctx.popupClass.waitResult
  * @param {function(*, ctx.event)} callback callback to be called when page is closed or absent
  * @return {ctx.popupClass} popup object
  */
  this.waitResult = function (callback) {
		var popup = this;
		if (this.mergedParams.Modal) {
			// modal popup : get result immediately
			var res = popup.getCloseResult(null);
			if (typeof callback === 'function') {
				callback.apply(popup, [res]);
			} 
		} else {
			// wait all notifications
			if (_waitNotifObj != null) {
				ctx.off(_waitNotifObj);
				_waitNotifObj = null;
			}
			var evObj = {};
			evObj[ctx.anyEvent] = function(ev) {
				if (ev.name == 'UNLOAD') {
					// stop listening to notifications
					ctx.off(_waitNotifObj);
					_waitNotifObj = null;
				}
				switch (ev.name) {
					case 'UNLOAD':
					case 'CLICK':
					{
						var res = popup.getCloseResult(ev);
						ctx.each(_popup.items, function(id, item) {
							item.commands = item.commands || {};
							if (res && (res[id] !== undefined)) {
								item.commands['get'] = res[id];
							}
						});
						if (typeof callback === 'function') {
							callback.apply(popup, [res, ev]);
						};
						break;
					}
				}
			};
			_waitNotifObj = _pg.addOn(evObj, false, false, 0, true);
		}

		return this;
  }

	if (params.items) {
		_popup.item(params.items);
	}

	this.check();
}


/**
 * Module for Clipboard management
 * @class ctx.smartClipboard
 * @path ctx.smartClipboard
 * @constructor
 */
ctx.smartClipboard = (function() {
	var _params = {};
	var self = 
	/** @lends ctx.smartClipboard */
	{
	/**
	* The 'Smart Clipboard' is a tool to memorize project data, and display them in a popup, to easily and quickly insert data in any application.
	* 
	* \\
	* For an overview about 'Smart Clipboard', see [[pg:orch.clipboard#smart_clipboard_management|Programming Guide]].		
	*/
		data: {},

		/**
		* Clears the content of the clipboard 
		* @description
		* __Ex.:__
<code javascript>
ctx.smartClipboard.clear();
</code>
		* @method clear
	  * @path ctx.smartClipboard.clear
		*/
		clear : function() {
			for (var id in self.data) {
				self.data[id] = '';
			}
		},

		/**
		* Initialises clipboard fields 
		* @description
		* __Ex.:__
<code javascript>
var text = ctx.smartClipboard.init({
  id: { label:'Id', icon: 'key' },
  name: { label:'Name', icon: 'user' },
  firstname: { label:'Firstname', icon: 'user' }
});
</code>
		* @method init
	  * @path ctx.smartClipboard.init
		* @param {Object} obj object describing the parameters
		* @return {boolean}
		*/
		init : function (obj) {
			_params = {};
			self.data = {};
			for (var id in obj) {
				_params[id] = {
					label: obj[id].label || id,
					icon: obj[id].icon
				};
				self.data[id] = obj[id].value || '';
			}
			return true;
		},

		/**
		* Displays clipboard popup
		* @description
		* __Ex.:__
<code javascript>
ctx.smartClipboard.show();
</code>
		* @method show
	  * @path ctx.smartClipboard.show
	  * @param {string} [name] popup name (default is 'pClipboard')
		* @return {ctx.popupClass} popup object
		*/
		show : function (name) {
			//var label = "<script>function cl(id, data) { close(id, data); }</script>";
			var label = "";
			var count = 0;
			for (var id in _params) {
				count ++;
				if (self.data[id]) {
					var icon = _params[id].icon;
					if (icon) {
						if (icon.indexOf('.') == -1)
							icon = icon + '.png';
						if ((icon.indexOf('\\') == -1) && (icon.indexOf('/') == -1))
							icon = ctx.options.path.resources + '/bmp/' + icon;
					}
					label = label + '<img src="' + icon + '" height="16" width="16">';
					//label = label + '<a name="choiceLink"  href="javascript:void(0)" id="' + id + '" onclick="ctx.close(\"' + id + '\", \"' +  self.data[id] + '\");" > ';
					label = label + '<a name="choiceLink" href="javascript:void(0)" id="' + id + '" > ';
					if (_params[id].label)
						label = label + _params[id].label + ': ';
					label = label + '<b>' + self.data[id] + "</b> </a><br/>";
				}
			}
			name = name || 'pClipboard';
			var popup = ctx.popup(name).open({
				template: e.popup.template.Close,
				titleVisible: false,
				IEHost: true,
				X: e.popup.position.Right,
				Y: e.popup.position.Bottom,
				XSlide: e.popup.position.Right,
				CX: 400,
				CY: (count ? (count * 25 + 10) : 300),
				transparency: 90,
				message: label,
		    //autoClose: 15000, // default is 15 s
				color: e.popup.color.Yellow			
			});
			popup.waitResult(function(res, ev) {
				// selected id (or 'ok' si 'Ok' button was clicked without selection)
				var id = res;
				if ((ev.name == e.event.item.CLICK) && _params[id]) {
					var txt = String(self.data[id]);
					if (txt != '') {
						//ctx.log(txt);
						ctx.keyStroke(txt);
					}
				}
			});
			return popup;
		}
	};
	return self;
})();

/** alias used for Intellisense
* @method $popup
* @path ctx.$popup
* @ignore
*/
ctx.$popup = ctx.popup({ pDummy : {
}})
/** popup object
* @path popup
* @type {ctx.popupClass}
* @ignore
*/
var popup = ctx.$popup;

/** alias used for Intellisense
* @method $init
* @path ctx.popupClass.$init
* @ignore
*/
popup.$init = popup.init({});



