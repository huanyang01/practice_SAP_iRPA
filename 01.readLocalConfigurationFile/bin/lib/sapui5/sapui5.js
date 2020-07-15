/**
 * @module      SAPUI5 application management
 * @file        sapui5/sapui5.js
 * @description
 *  SAPUI5 application requires specific attention to be managed by **Contextor** **Interactive**.
 *
 * SAPUI5 is a Web application containing specific HTML objects which provides API that can be used to monitor them: fields, button ...
 *
 * This library implements SAPUI5 objects specific behaviors: it overrides the standard methods and adds extra ones.
 *
 * For a better understanding of SAPUI5 application management, refer to the dedicated training: [[:training:interactive3:course:sapui5|Managing SAPUI5 application]].
 *
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 *
 * @author      Contextor R&D team
 * @copyright   © 2003-2019 SAP
 */

/**
 * Options for the 'ctx.sapui5' library
 * @namespace ctx.options.sapui5
 * @path      ctx.options.sapui5
 */
ctx.options.sapui5 = {
  /**
   * Trace level (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
   * @property    {e.trace.level} traceLevel
   * @default     e.trace.level.None
   * @path        ctx.options.sapui5.traceLevel
   */
   traceLevel: e.trace.level.None,

   /**
    * Use recordReplay API to execute action
    * @ignore
    * @property    {boolean} useRecordReplayForExecution
    * @default     false
    * @path        ctx.options.sapui5.traceLevel
   */
    useRecordReplayForExecution: false, 
   
   /**
    * Use recordReplay API to manage busy status of a page
    * @ignore
    * @property    {boolean} useWaitForUI5
    * @default     true
    * @path        ctx.options.sapui5.useWaitForUI5
    */    
    useWaitForUI5: true,

   /**
    * Minimal Major UI5 version supported
    * @ignore
    * @property    {boolean} ui5MajorVersionSupported
    * @default     1
    * @path        ctx.options.sapui5.ui5MajorVersionSupported
    */
    ui5MajorVersionSupported: 1,

   /**
    * Minimal Minor UI5 version supported
    * @ignore
    * @property    {boolean} ui5MinorVersionSupported
    * @default     61
    * @path        ctx.options.sapui5.ui5MinorVersionSupported
    */    
    ui5MinorVersionSupported: 61,

   /**
    * Minimal Patch UI5 version supported
    * @ignore
    * @property    {boolean} ui5MinorVersionSupported
    * @default     0
    * @path        ctx.options.sapui5.ui5MinorVersionSupported
    */    
    ui5PatchVersionSupported: 0,

   /**
    * Maximum delay for waiting a ready page, when record replay is not used
    * @ignore
    * @property    {boolean} timeoutReady
    * @default     5000
    * @path        ctx.options.sapui5.timeoutReady
    */    
    timeoutReady: 5000,

   /**
    * Maximum delay for waiting a ready page, when record replay is used
    * @ignore
    * @property    {boolean} timeoutReadyRRAPI
    * @default     15000
    * @path        ctx.options.sapui5.timeoutReadyRRAPI
    */       
    timeoutReadyRRAPI: 15000
};

///**
//* Class to sap.ui.core.Item
//* @class ctx.SAPUI5.sap.ui.core.Item
//* @path ctx.SAPUI5.sap.ui.core.Item
//* @constructor
//*/
//function Type(type) {
//	this.type = type;
//}
//function Item(type) {
//	Type.call(this, type);
//  /** class type
//  * @ignore
//  * @const
//  * @path ctx.SAPUI5.Item.text
//  * @property {string} */ this.text = undefined;
//	/** class type
//	* @ignore
//  * @const
//  * @path ctx.SAPUI5.Item.key
//  * @property {string} */ this.key = undefined;
//}
///**
//* Class to sap.ui.core.Item
//* @class ctx.SAPUI5.sap.ui.core.Item
//* @path ctx.SAPUI5.sap.ui.core.Item
//* @constructor
//*/
//function UiItem() {
//	Item.call(this, 'sap.ui.core.Item');
//}

///**
//* Class to sap.ui.unified.CalendarAppointment
//* @class ctx.SAPUI5.sap.ui.unified.CalendarAppointment
//* @path ctx.SAPUI5.sap.ui.unified.CalendarAppointment
//* @constructor
//*/

//function CalendarAppointment() {
//	Item.call(this, 'sap.ui.unified.CalendarAppointment');
//	/** class type
//  * @ignore
//  * @const
//  * @path ctx.SAPUI5.sap.ui.unified.CalendarAppointment.title
//  * @property {string} */ this.title = undefined;
//  /** class type
//  * @ignore
//  * @const
//  * @path ctx.SAPUI5.sap.ui.unified.CalendarAppointment.endDate
//  * @property {Date} */ this.endDate = undefined;
//	/** class type
//	* @ignore
//  * @const
//  * @path ctx.SAPUI5.sap.ui.unified.CalendarAppointment.startDate
//  * @property {Date} */ this.startDate = undefined;
//}
//function Token() {
//	Item.call(this, 'sap.m.Token');
//}
//function NavigationListItem() {
//	Item.call(this, 'sap.tnt.NavigationListItem');
//}
//function SegmentedButtonItem() {
//	Item.call(this, 'sap.m.SegmentedButtonItem');
//}
//function UploadCollectionItem() {
//	Item.call(this, 'sap.m.UploadCollectionItem');
//}

//function TAccountItem() {
//	ctx.SAPUI5.Item.call(this, 'sap.suite.ui.commons.taccount.TAccountItem');
//	/** class type
//  * @ignore
//  * @const
//  * @path ctx.SAPUI5.sap.suite.ui.commons.taccount.value
//  * @property {number} */ this.account = undefined;
//}

/**
 * @ignore
 * Api for SAPUI5 objects
 * @class ctx.apiui5
 * @path  ctx.apiui5
 */
ctx.apiui5 = {
	/**
   * Call the api ui5 control method.
   * @method callFunc
   * @path   ctx.apiui5.callFunc
	 * @param {Object} item
   * @param {string} funcName function
	 * @param {Array} args function
	 * @return {string} result value
   */
	callFunc: function(item, funcName, args){
		var desc = item.getObjectDescriptor();
    ctx.noNotify = true;
		
		var timeout = item.parent.getPageWaitReadyTimeout();
    ctx.noNotify = true;
    var res = item.execScript('SAPUI5CallFunction', args, funcName, timeout);
    ctx.notifyAction(funcName, res, desc);
    return res;
	},
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method click
   * @path   ctx.apiui5.click
	 * @param {Object} item
	 * @return {string} result value
   */
	click: function(item) {
		var desc = item.getObjectDescriptor();
		var timeout = item.parent.getPageWaitReadyTimeout();
    ctx.noNotify = true;
		
		var currentValue = ctx.options.sapui5.useRecordReplayForExecution;
		
		var RRStatus = item.execScript('SAPUi5RecordReplayStatus', timeout);
		ctx.options.sapui5.useRecordReplayForExecution = (RRStatus === "true");

		if(item.customType == 'SAPUI5.tablerow'){
				ctx.options.sapui5.useRecordReplayForExecution = true;
		}	
		var sFuncName =  ctx.options.sapui5.useRecordReplayForExecution ? 'SAPUI5ButtonClickRRAPI' : 'SAPUI5ButtonClick';
		if(item.customType === 'SAPUI5.toggleButton' && sFuncName === 'SAPUI5ButtonClick'){
      sFuncName = 'SAPUI5ToggleClick';
    }
    var res = item.execScript(sFuncName, timeout);
    ctx.options.sapui5.useRecordReplayForExecution = currentValue;
    ctx.notifyAction('click', res, desc);
		return res;
	},
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method search
   * @path   ctx.apiui5.liveChange
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	liveChange: function(item, testExist, ifDefined) {
		if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'liveChange', ['']);
	},
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method search
   * @path   ctx.apiui5.search
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	search: function(item, testExist, ifDefined) {
		if ((testExist && (!item.exist()))) {
      return '';
    }
		ctx.apiui5.callFunc(item, 'fireSearch', ['']);
		ctx.apiui5.callFunc(item, 'fireLiveChange', ['']);
    return '';
	},
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method suggestionSearch
   * @path   ctx.apiui5.suggestionSearch
   * @param {Object} item
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
   * @return {string} result value
   */
  suggestionSearch: function(item, value, testExist, ifDefined) {
    var desc = item.getObjectDescriptor();
    var sFuncName = 'SAPUI5SuggestionSearch';
    ctx.noNotify = true;
    var timeout = item.parent.getPageWaitReadyTimeout();
    var res = item.execScript(sFuncName, value, timeout);
    ctx.log("Info", e.logIconType.Info, res);
    ctx.notifyAction('search', res, desc);
    return res;
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setSelectedButton
   * @path   ctx.apiui5.setSelectedButton
	 * @param {Object} item
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setSelectedButton : function(item, value, testExist, ifDefined) {

    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'setSelectedButton', [value]);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setValue
   * @path   ctx.apiui5.setValue
	 * @param {Object} item
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setValue : function(item, value, testExist, ifDefined) {
    var desc = item.getObjectDescriptor();
    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
		
    var timeout = item.parent.getPageWaitReadyTimeout();
    ctx.noNotify = true;
		var res;
		
		var currentValue = ctx.options.sapui5.useRecordReplayForExecution;
		
		var RRStatus = item.execScript('SAPUi5RecordReplayStatus', value, timeout);
		ctx.options.sapui5.useRecordReplayForExecution = (RRStatus === "true");
		if (ctx.options.sapui5.useRecordReplayForExecution) {
			res = item.execScript('SAPUI5InputSetRRAPI', value, timeout);
		} else {
			switch (item.customType) {
				case 'SAPUI5.input' :
					res = item.execScript('SAPUI5InputSet', value, timeout);
					break;	
				default:
					res = item.execScript('SAPUI5CallFunction', [value], 'setValue', timeout);
					break;
			}
		}
		ctx.options.sapui5.useRecordReplayForExecution = currentValue;
    ctx.notifyAction('setValue', res, desc);
    return res;
  },
		/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setValue
   * @path   ctx.apiui5.setSearch
	 * @param {Object} item
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setSearch : function(item, value, testExist, ifDefined) {
    var desc = item.getObjectDescriptor();
    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }

    var timeout = item.parent.getPageWaitReadyTimeout();
    ctx.noNotify = true;
		var currentValue = ctx.options.sapui5.useRecordReplayForExecution;

		var RRStatus = item.execScript('SAPUi5RecordReplayStatus', value, timeout);
		ctx.options.sapui5.useRecordReplayForExecution = (RRStatus === "true");
		var sFuncName = ctx.options.sapui5.useRecordReplayForExecution ? 'SAPUI5InputSearchRRAPI' : 'SAPUI5InputSearch';
		var res = item.execScript(sFuncName, value, timeout);
		ctx.options.sapui5.useRecordReplayForExecution = currentValue;
    ctx.notifyAction('setSearch', res, desc);
    return res;
  },

	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setRange
   * @path   ctx.apiui5.setRange
	 * @param {Object} item
	 * @param {number} min value to be set
	 * @param {number} max value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setRange : function(item, min, max, testExist, ifDefined) {

    if ((typeof min === 'undefined') || (typeof max === 'undefined') 
			|| (ifDefined && (!min) && (!max)) || (testExist && (!item.exist()))) {
      return '';
    }
		var range = [min, max];
		var value = [range];
    return ctx.apiui5.callFunc(item, 'setRange', value);
  },		
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setState
   * @path   ctx.apiui5.setState
	 * @param {Object} item
	 * @param {boolean} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setState : function(item, value, testExist, ifDefined) {

    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'setState', [value]);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setSelected
   * @path   ctx.apiui5.setSelected
	 * @param {Object} item
	 * @param {boolean} value value to be set - true or false
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setSelected : function(item, value, testExist, ifDefined) {
		var res = '';
		if (item.customType == 'SAPUI5.checkbox') {
			var desc = item.getObjectDescriptor();
			ctx.noNotify = true;
			var sFuncName = "SAPUI5CheckBoxSet"
			var timeout = item.parent.getPageWaitReadyTimeout();
			if (typeof(value) === "boolean") {
				var bValue = ctx.apiui5.callFunc(item, 'getSelected', ['']) === 'true';
				res = "Checkbox is already " + bValue.toString()
				if (bValue != value) {
					res = ctx.apiui5.callFunc(item, 'onsapenter', ['']);
				}
				ctx.notifyAction('setSelected', res, desc);
			}
			else {
				ctx.notifyAction('Invalid parameter for setSelected method', res, desc);
			}
		}
		else {
			if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      	return '';
    	}
    	res = ctx.apiui5.callFunc(item, 'setSelected', [value]);
		}
		return res;
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getSelected
   * @path   ctx.apiui5.getSelected
	 * @param {Object} item
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	getSelected : function(item, testExist, ifDefined) {
    if (testExist && (!item.exist())) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'getSelected', ['']);
	},
		/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getPressed
   * @path   ctx.apiui5.getPressed
	 * @param {Object} item
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	getPressed : function(item, testExist, ifDefined) {
    if ((!item.exist())) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'getPressed', ['']);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setPressed
   * @path   ctx.apiui5.setPressed
	 * @param {Object} item
	 * @param {boolean} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setPressed : function(item, value, testExist, ifDefined) {
    if ((typeof value === 'undefined')  || !item.exist()) {
      return '';
    }
		var timeout = item.parent.getPageWaitReadyTimeout();
    ctx.noNotify = true;
    var res = item.execScript('SAPUI5SetPressed', value, timeout);
    ctx.notifyAction('SAPUI5SetPressed', res, desc);
    return res;
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method fireRegionClick
   * @path   ctx.apiui5.fireRegionClick
	 * @param {Object} item
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
//	fireRegionClick : function(item, value, testExist, ifDefined) {
//    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
//      return '';
//    }
//    return ctx.apiui5.callFunc(item, 'fireRegionClick', [value]);
//  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method clearSelection
   * @path   ctx.apiui5.clearSelection
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	clearSelection : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'clearSelection', ['']);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method selectAll
   * @path   ctx.apiui5.selectAll
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	selectAll : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'selectAll', ['']);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method fireFilter
   * @path   ctx.apiui5.fireFilter
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	fireFilter : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'fireFilter', ['']);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setSelectedKey
   * @path   ctx.apiui5.setSelectedKey
	 * @param {Object} item
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setSelectedKey : function(item, value, testExist, ifDefined) {
    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'setSelectedKey', [value]);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setSelectedItem
   * @path   ctx.apiui5.setSelectedItem
	 * @param {Object} item
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setSelectedItem : function(item, value, testExist, ifDefined) {
    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'setSelectedItem', [value]);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getItems
   * @path   ctx.apiui5.getItems
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	getItems : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'getItems', ['']);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getRegions
   * @path   ctx.apiui5.getRegions
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
//	getRegions : function(item, testExist, ifDefined) {
//    if ((testExist && (!item.exist()))) {
//      return '';
//    }
//    return ctx.apiui5.callFunc(item, 'getRegions', ['']);
//  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setSelectedIndex
   * @path   ctx.apiui5.setSelectedIndex
	 * @param {Object} item
	 * @param {number} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setSelectedIndex : function(item, value, testExist, ifDefined) {
    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'setSelectedIndex', [value]);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method expand
   * @path   ctx.apiui5.setSelectedIndex
	 * @param {Object} item
	 * @param {number} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	expand : function(item, value, testExist, ifDefined) {
    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'expand', [value]);
  },
	/**
   * Call the api ui5 control method.
	 * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method addItem
   * @path   ctx.apiui5.addItem
	 * @param {Object} item
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	addItem : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
		data.type = "sap.ui.core.Item";
    return ctx.apiui5.callFunc(item, 'addItem', [data]);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method addToken
   * @path   ctx.apiui5.addToken
	 * @param {Object} item
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	addToken : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
		data.type = "sap.m.Token";
    return ctx.apiui5.callFunc(item, 'addToken', [data]);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method addSegmentButton
   * @path   ctx.apiui5.addSegmentButton
	 * @param {Object} item
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	addSegmentButton : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
		data.type = "sap.m.SegmentedButtonItem";
    return ctx.apiui5.callFunc(item, 'addItem', [data]);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method addNavigationListItem
   * @path   ctx.apiui5.addNavigationListItem
	 * @param {Object} item
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	addNavigationListItem : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
		data.type = "sap.tnt.NavigationListItem";
    return ctx.apiui5.callFunc(item, 'addItem', [data]);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method addUploadCollectionItem
   * @path   ctx.apiui5.addUploadCollectionItem
	 * @param {Object} item
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
//	addUploadCollectionItem : function(item, data, testExist, ifDefined) {
//    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
//      return '';
//    }
//		data.type = "sap.m.UploadCollectionItem";
//    return ctx.apiui5.callFunc(item, 'addItem', [data]);
//  },
	
	/**
	* Call the api ui5 control method.
	* @description
	*  <wrap help> //Example://</wrap>
	*  <code javascript> </code>
	* @method addAppointment
	* @path   ctx.apiui5.addAppointment
	* @param {Object} item
	* @param {string} title value to be set
	* @param {string} subTitle value to be set
	* @param {string} type value to be set
	* @param {string} startDate value to be set
	* @param {string} endDate value to be set
	* @param {boolean} [testExist] if true, test existence before setting value
	* @param {boolean} [ifDefined] if true, set value only if defined
	* @return {string} result value
	*/
	addAppointment : function(item, title, subTitle, type, startDate, endDate, testExist, ifDefined) {
    if ((typeof title === 'undefined') || (ifDefined && (!title))) {title = ''}
		if ((typeof subTitle === 'undefined') || (ifDefined && (!subTitle))) {subTitle = ''}
		if ((typeof startDate === 'undefined') || (ifDefined && (!startDate))) {startDate = 'Provide a Start Date!'}
		if ((typeof endDate === 'undefined') || (ifDefined && (!endDate))) {endDate = 'Provide a End Date!'}
		if (testExist && (!item.exist())) {
     	 return '';
    }
		var res = item.execScript('SAPUI5Calendar', title, subTitle, type, startDate, endDate);
		return res;
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method open
   * @path   ctx.apiui5.open
	 * @param {Object} item
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	open : function(item, testExist, ifDefined) {
		if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'open', ['']);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method firePress
   * @path   ctx.apiui5.firePress
	 * @param {Object} item
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	firePress : function(item, testExist, ifDefined) {
		if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'firePress', ['']);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getDebit
   * @path   ctx.apiui5.getDebit
	 * @param {Object} item
	 * @param {number} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	getDebit : function(item, value, testExist, ifDefined) {
    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'getDebit', [value]);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getCredit
   * @path   ctx.apiui5.getCredit
	 * @param {Object} item
	 * @param {number} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	getCredit : function(item, value, testExist, ifDefined) {
    if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'getCredit', [value]);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method addDebit
   * @path   ctx.apiui5.addDebit
	 * @param {Object} item
	 * @param {Object} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	addDebit : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
		data.type = "sap.suite.ui.commons.taccount.TAccountItem";
    return ctx.apiui5.callFunc(item, 'addDebit', [data]);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method addCredit
   * @path   ctx.apiui5.addCredit
	 * @param {Object} item
	 * @param {Object} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	addCredit : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
		data.type = "sap.suite.ui.commons.taccount.TAccountItem";
    return ctx.apiui5.callFunc(item, 'addCredit', [data]);
  },
	
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getValueFc
   * @path   ctx.apiui5.getValueFc
	 * @param {Object} item
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	getValueFc : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'getValue', ['']);
  },
	
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setValueFc
   * @path   ctx.apiui5.setValueFc
	 * @param {Object} item
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setValueFc : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'setValue', [data]);
  },
	
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getSubheader
   * @path   ctx.apiui5.getSubheader
	 * @param {Object} item
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	getSubheader : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'getSubheader', ['']);
  },
	
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setSubheader
   * @path   ctx.apiui5.setSubheader
	 * @param {Object} item
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setSubheader : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'setSubheader', [data]);
  },
	
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method setContentText
   * @path   ctx.apiui5.setContentText
	 * @param {Object} item
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	setContentText : function(item, data, testExist, ifDefined) {
    if ((typeof data === 'undefined') || (ifDefined && (!data)) || (testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'setContentText', [data]);
  },
	
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getAltText
   * @path   ctx.apiui5.getAltText
	 * @param {Object} item
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	getAltText : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
    return ctx.apiui5.callFunc(item, 'getAltText', ['']);
  },
	
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method next
   * @path   ctx.apiui5.next
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	next : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
		return ctx.apiui5.callFunc(item, 'next', ['']);
  },
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method previous
   * @path   ctx.apiui5.previous
	 * @param {Object} item
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	previous : function(item, testExist, ifDefined) {
    if ((testExist && (!item.exist()))) {
      return '';
    }
		return ctx.apiui5.callFunc(item, 'previous', ['']);
  },
	
	/**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method selectItems
   * @path   ctx.apiui5.selectItems
   * @param {Object} [item] items
   * @param {Object} [values] values
   * @return {string} result value
   */
  selectItems: function(item, values){
    var desc = item.getObjectDescriptor();
    var timeout = item.parent.getPageWaitReadyTimeout();
    ctx.noNotify = true;
    var res = item.execScript('MultiComboboxSelectItems', values, timeout);
    ctx.notifyAction('MultiComboboxSelectItems', res, desc);
    return res;
  },
  
  /**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method clearSelectedItems
   * @path   ctx.apiui5.clearSelectedItems
   * @param {Object} item
	 * @param {Object} values to remove (optional)
   * @return {string} result value
   */
  clearSelectedItems: function(item, values){
    var desc = item.getObjectDescriptor();
    ctx.noNotify = true;
    ctx.notifyAction('clearSelectedItems', null, desc);
    var timeout = item.parent.getPageWaitReadyTimeout();
		return item.execScript('MultiComboboxClearSelectItems', values, timeout);
  },
  /**
   * Call the api ui5 control method.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> </code>
   * @method getSelectedItems
   * @path   ctx.apiui5.getSelectedItems
   * @param {Object} item
   * @return {string} result value
   */
  getSelectedItems: function(item){
    var desc = item.getObjectDescriptor();
    var timeout = item.parent.getPageWaitReadyTimeout();
    ctx.noNotify = true;
    var res = item.execScript('MultiComboboxGetSelectedItems', timeout);
    ctx.notifyAction('getSelectedItems', res, desc);
    return res;
  }
}
/**
 * @ignore
 * Custom Types for SAPUI5 objects
 * @class ctx.customTypes.SAPUI5
 * @path  ctx.customTypes.SAPUI5
 */
ctx.customTypes.SAPUI5 = {

  /**
   * @ignore
   * Utility function to retrieve functions to be injected into page
   * @method findCodeToInject
   * @param  {string} functionName Function Name
   * @param  {boolean=} bExecute It true, function is executed. Optional.
   */
   findCodeToInject: function(functionName, bExecute) {

		/**
     * @ignore
     * @method SAPUi5RecordReplayStatus checks SAPUI5 version for RRAPI Activation
     */
		function SAPUi5RecordReplayStatus() {
			// SAP UI5 UI Recording support starting at 1.61.0
			var nMajorVersionSupported = 1;
      //var nMinorVersionSupported = 61; [actual version from which RRAPI implemeted]
	  var nMinorVersionSupported = 9999; //[assigned to a large value to make the condition false to avoid async call]
      var nPatchVersionSupported = 0;
			try{
				var aVersion = window['sap']['ui']['version'].split('.');
	      var nMajorVersion = new Number(aVersion[0]);
	      var nMinorVersion = new Number(aVersion[1]);
	      //var nPatchVersion = new Number(aVersion[2]);
	      if (nMajorVersion >= nMajorVersionSupported && nMinorVersion >= nMinorVersionSupported) {
					  window['sap']['ui']['getCore']()['attachInit'](function () {
	          window['sap']['ui']['require']([
	            'sap/ui/test/RecordReplay'
	          ], function (recordReplay) {
	            window.recordReplay = recordReplay;
	          });
	        });
					return true;
				} else {
					return false;
				}
			} catch (oErr) {
					return false;
			}
		}

    /**
     * @ignore
     * @method CtxPolyfill
     */
    function CtxPolyfill() {
      // Polyfill: IE doesn't support closest
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                    Element.prototype.webkitMatchesSelector;
      }
      
      if (!Element.prototype.closest) {
				  /**
				   * @ignore
				   * closest polyfill for ie
				   * @method closest
				   * @param  {string} s Node
					 * @return 	{Node} 
				   */
        Element.prototype.closest = function(s) {
          var el = this;
      
          do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
          } while (el !== null && el.nodeType === 1);
          return null;
        };
      }

			// Polyfill: IE CustomEvent
      if (typeof window.CustomEvent !== "function") {

	      function CustomEvent(event, params) {
	        params = params || { bubbles: false, cancelable: false, detail: undefined }
	        var evt = document.createEvent("CustomEvent")
	        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
	        return evt
	      }
	    
	      CustomEvent.prototype = window['Event']['prototype'];
	    
	      window['CustomEvent'] = CustomEvent;
			}
    }  

    /**
     * @ignore
     * @method CtxFindUI5Control Find UI5 Element fom a html dom element
     * @param  {HTMLElement} oNode DOM element
     */
    function CtxFindUI5Control(oNode) {

      var oUI5Core = (window['sap'] && window['sap']['ui'] && window['sap']['ui']['getCore']) ? window['sap']['ui']['getCore']() : null;
      function ctxFindSAPUIElementParent(oN) {
        if (oN.parentNode) {
          return CtxFindUI5Control(oN.parentNode);
        } else {
          return null;
        }
      }
      var oClosest = oNode.closest('*[data-sap-ui]');
      if (oUI5Core && oClosest) {
        if (oClosest.id) {
          var oObj = oUI5Core.byId(oClosest.id);
          if (oObj) {
            return oObj;
          } else {
            return ctxFindSAPUIElementParent(oClosest);
          }
        } else {
          return ctxFindSAPUIElementParent(oClosest);
        }
      } else {
        return null;
      }
    }

    /**
    * @ignore
    * @method SAPUI5PageWaitReady
    */
    function SAPUI5PageWaitReady(eventName, timeout) {
			var checkBusy = function(){
				var isBusy = false;
				window['sap']['ui'].core.Element.registry.forEach(function(oControl) { 
					try{
						if(oControl.getBusy() === true)
						{
							isBusy = true;
						}
					}catch(er){}
				});
				if(!isBusy) {
					clearInterval(checkBusyTimer);
					checkBusyTimer = false;
					Contextor.Event(eventName, '', '', '', -1, -1, '');
					return '';
				}
			}
			var checkBusyTimer = setInterval(function(){ checkBusy() }, 1000);
			if(timeout && timeout > 1000){
				setTimeout(function() 
				{
					if(checkBusyTimer !== false){
						clearInterval(checkBusyTimer); 
						return '';
					}
				}, timeout);
			}
    } ;

    /**
    * @ignore
    * @method SAPUI5PageWaitReadyRRAPI
    */
    function SAPUI5PageWaitReadyRRAPI(eventName, timeout) {

      if (window['recordReplay']) {
        var promise = window['recordReplay']['waitForUI5']({
          interval: 400,
          timeout: timeout
        }).then(function () {
          Contextor.Event(eventName, '', '', '', -1, -1, '');
        });
        if (promise['catch']) {
          promise['catch'](function (oErr) {
            debugger
          })
        }

      } else {
        Contextor.Event(eventName, '', '', '', -1, -1, '');
      }
      return '';
    } 

    /**
     * @ignore
     * @method CtxLoadRecordReplay Load Record Replay API
     */
    function CtxLoadRecordReplay () {
      Contextor.Event('evRecordReplayLoaded', "", "", "", -1, -1, 'notused');
    } 

    /**
     * @ignore
     * @method CtxLoadRecordReplayRRAPI Load Record Replay API
     * @param {number} ui5MajVersion Minimal Major version of UI5 supported
     * @param {number} ui5MinVersion Minimal Minor of UI5 supported
     * @param {number} ui5PatchVersion Minimal Patch of UI5 supported
     */
    function CtxLoadRecordReplayRRAPI (ui5MajVersion, ui5MinVersion, ui5PatchVersion) { 

      // SAP UI5 UI Recording support starting at 1.61.0
      var nMajorVersionSupported = 1;
      var nMinorVersionSupported = 61;
      var nPatchVersionSupported = 0;
      if (typeof ui5MajVersion === 'number' && typeof ui5MinVersion === 'number' && typeof ui5PatchVersion === 'number') {
        nMajorVersionSupported = ui5MajVersion;
        nMinorVersionSupported = ui5MinVersion;
        nPatchVersionSupported = ui5PatchVersion;
      }
      
			var fireEventRecordReplayLoaded = function (loaded) {
				Contextor.Event('evRecordReplayLoaded', "", "", "", -1, -1, loaded ? 'used': 'notused');
			};
      var fnSupportedUI5Version = function () {

        if (!window['sap'] || !window['sap']['ui']) {
					fireEventRecordReplayLoaded(false);
          return false;
        }
        var aVersion = window['sap']['ui']['version'].split('.');
        var nMajorVersion = new Number(aVersion[0]);
        var nMinorVersion = new Number(aVersion[1]);
        var nPatchVersion = new Number(aVersion[2]);
        return nMajorVersion >= nMajorVersionSupported && nMinorVersion >= nMinorVersionSupported && nPatchVersion >= nPatchVersionSupported;
      }
    
      if (window.recordReplay) {
				fireEventRecordReplayLoaded(true);
        return;
      }
      if (fnSupportedUI5Version()) {
        window['sap']['ui']['getCore']()['attachInit'](function () {
          window['sap']['ui']['require']([
            'sap/ui/test/RecordReplay'
          ], function (recordReplay) {
            window.recordReplay = recordReplay;
						fireEventRecordReplayLoaded(true);
          });
        });
      } else {
        fireEventRecordReplayLoaded(false);
      }
    }   

    /**
     * @ignore
     * @method SAPUI5ButtonClickDEFAULT
     * @param  {HTMLElement} element DOM element
     */
     function SAPUI5ButtonClickDEFAULT(element) {
       try {
         element.dispatchEvent(new MouseEvent('mousedown', { 'altKey': false, 'bubbles': true, 'button': 0, 'buttons': 1, 'cancelBubble': false, 'cancelable': true, 'composed': true, 'ctrlKey': false, 'defaultPrevented': false, 'detail': 1, 'eventPhase': 0, 'isTrusted': true, 'metaKey': false, 'returnValue': true, 'shiftKey': false, 'type': 'mousedown', 'which': 1 }));
         element.dispatchEvent(new MouseEvent('mouseup', { 'altKey': false, 'bubbles': true, 'button': 0, 'buttons': 0, 'cancelBubble': false, 'cancelable': true, 'composed': true, 'ctrlKey': false, 'defaultPrevented': false, 'detail': 1, 'eventPhase': 0, 'isTrusted': true, 'metaKey': false, 'returnValue': true, 'shiftKey': false, 'type': 'mouseup', 'which': 1 }));
         element.dispatchEvent(new MouseEvent('click', { 'altKey': false, 'bubbles': true, 'button': 0, 'buttons': 0, 'cancelBubble': false, 'cancelable': true, 'composed': true, 'ctrlKey': false, 'defaultPrevented': true, 'detail': 1, 'eventPhase': 0, 'isTrusted': true, 'metaKey': false, 'returnValue': false, 'shiftKey': false, 'type': 'click', 'which': 1 }));
         element.dispatchEvent(new FocusEvent('focus', { 'bubbles': false, 'cancelBubble': false, 'cancelable': false, 'composed': true, 'defaultPrevented': false, 'detail': 0, 'eventPhase': 0, 'isTrusted': true, 'returnValue': true, 'type': 'focus', 'which': 0 }));
       } catch (oErr) {
        element.dispatchEvent(new CustomEvent('mousedown', { 'altKey': false, 'bubbles': true, 'button': 0, 'buttons': 1, 'cancelBubble': false, 'cancelable': true, 'composed': true, 'ctrlKey': false, 'defaultPrevented': false, 'detail': 1, 'eventPhase': 0, 'isTrusted': true, 'metaKey': false, 'returnValue': true, 'shiftKey': false, 'type': 'mousedown', 'which': 1 }));
        element.dispatchEvent(new CustomEvent('mouseup', { 'altKey': false, 'bubbles': true, 'button': 0, 'buttons': 0, 'cancelBubble': false, 'cancelable': true, 'composed': true, 'ctrlKey': false, 'defaultPrevented': false, 'detail': 1, 'eventPhase': 0, 'isTrusted': true, 'metaKey': false, 'returnValue': true, 'shiftKey': false, 'type': 'mouseup', 'which': 1 }));
        element.dispatchEvent(new CustomEvent('click', { 'altKey': false, 'bubbles': true, 'button': 0, 'buttons': 0, 'cancelBubble': false, 'cancelable': true, 'composed': true, 'ctrlKey': false, 'defaultPrevented': true, 'detail': 1, 'eventPhase': 0, 'isTrusted': true, 'metaKey': false, 'returnValue': false, 'shiftKey': false, 'type': 'click', 'which': 1 }));
        element.dispatchEvent(new CustomEvent('focus', { 'bubbles': false, 'cancelBubble': false, 'cancelable': false, 'composed': true, 'defaultPrevented': false, 'detail': 0, 'eventPhase': 0, 'isTrusted': true, 'returnValue': true, 'type': 'focus', 'which': 0 }));
      }
       return '';
     }

    /**
     * @ignore
     * @method SAPUI5ButtonClick
     * @param  {HTMLElement} element DOM element
     * @param {number} [timeout] optional Timeout for execution
     */
    function SAPUI5ButtonClick( element , timeout) {

      var oControl = CtxFindUI5Control(element);     
      if (oControl) {
        try {				 	
          oControl.firePress();
        } catch(oErr) {	
			SAPUI5ButtonClickDEFAULT(element);
        }
      } else {
        SAPUI5ButtonClickDEFAULT(element);
      }
      return '';
    }

     /**
     * @ignore
     * @method SAPUI5ToggleClick
     * @param  {HTMLElement} element DOM element
     * @param {number} [timeout] optional Timeout for execution
     */
    function SAPUI5ToggleClick(element, timeout) {
      var oControl = CtxFindUI5Control(element);     
       try {
				 if(oControl){
	 				if(oControl.getEnabled()){
         /*  var bValue = oControl.getPressed();
           if (!bValue) {
             oControl.setPressed('true');
           }
           else {
             oControl.setPressed(''); 
           }
           oControl.firePress();*/
	   oControl.setPressed(!oControl.getPressed()); 
	   oControl.firePress({ pressed: oControl.getPressed() });					
					}
	 }
       } catch(oErr) {
         SAPUI5ButtonClickDEFAULT(element);
       }
      return '';
    }

		 /**
     * @ignore
     * @method SAPUI5SetPressed
     * @param  {HTMLElement} element DOM element
     * @param {number} [timeout] optional Timeout for execution
     */
    function SAPUI5SetPressed(element, value, timeout) {
      var oControl = CtxFindUI5Control(element);     
       try {
				 if(oControl){
					 if(oControl.getEnabled()){
		         oControl.setPressed((value == 'true'));
					 }
				 }
       } catch(oErr) {
       }
      return '';
    }
		 /**
     * @ignore
     * @method SAPUI5ButtonClickRRAPI
     * @param  {HTMLElement} element DOM element
     * @param {number} [timeout] optional Timeout for execution
     */
    function SAPUI5ButtonClickRRAPI( element, timeout ) {
   		var oControl = CtxFindUI5Control(element);
      if (window.recordReplay) {
      	window.recordReplay.waitForUI5({
          interval: 400,
          timeout: timeout
      	}).then(function () {
							return window['recordReplay']['findControlSelectorByDOMElement']({ domElement: oControl['getDomRef']() });   
         	}).then(function (controlSelector) {
          	if (controlSelector) {	
             		return window['recordReplay']['interactWithControl']({interactionType: window['recordReplay']['InteractionType']['Press'], selector: controlSelector}); 	 
           	} else {
            	SAPUI5ButtonClickDEFAULT(element);
           	}    
         	})['catch'](function(error){
							SAPUI5ButtonClickDEFAULT(element);
					})
       	} else {
        	SAPUI5ButtonClickDEFAULT(element);
       	}
      	return '';
    	}

     /**
     * @ignore
     * @method SAPUI5InputSetDEFAULT
     * @param  {HTMLElement} element DOM element
     * @param  {string} value Value to be set
     */
     function SAPUI5InputSetDEFAULT(element, value) {

      function setInputValue (oElem, strValue) {
        var strType = oElem[ "type" ];
				if ( typeof strType !== "undefined" ) {
					switch ( strType ) {
						case "checkbox":
						case "radio":
							oElem.checked = ( strValue === "1" ? true : false );
							return true;
					}
				}
				oElem.value = strValue;
      }

      setInputValue(element, value);
       try {
         element.dispatchEvent(new FocusEvent('focus', { 'bubbles': true, 'cancelable': true }));
         element.dispatchEvent(new MouseEvent('click', { 'bubbles': true, 'cancelable': true }));
         element.dispatchEvent(new KeyboardEvent('keypress', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
         element.dispatchEvent(new KeyboardEvent('keydown', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
         element.dispatchEvent(new KeyboardEvent('keyup', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
         element.dispatchEvent(new FocusEvent('blur', { 'bubbles': true, 'cancelable': true }));
       } catch (oErr) {
        element.focus();
        element.dispatchEvent(new CustomEvent('click', { 'bubbles': true, 'cancelable': true }));
        element.dispatchEvent(new CustomEvent('keypress', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
        element.dispatchEvent(new CustomEvent('keydown', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
        element.dispatchEvent(new CustomEvent('keyup', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
        element.blur();
      }
       return '';
     }
		 /**
      * @ignore
      * @method SAPUI5GetItems
      * @param  {HTMLElement} res DOM element
      */
		 function SAPUI5GetItems(res) {
			  var items = [];
				for (var index = 0; index < res.length; index++) {
					var item = res[index];
					items.push(
					{
						key : 'getKey' in item ? item['getKey']() : undefined, 
						code : 'getCode' in item ? item['getCode']() : undefined,
						text : 'getText' in item ? item['getText']() : undefined,
						items : 'getItems' in item ? SAPUI5GetItems(item['getItems']()) : undefined
					});
				}
				return items;
		 }
		 /**
      * @ignore
      * @method SAPUI5GetTableData
      * @param {HTMLElement} element DOM element
      * @param {string} functionName provide function name
      * @param {number} index of the row
      * @param {number} timeout optional Timeout for execution
      */
     	function SAPUI5GetTableData(element, functionName, index, timeout){
      	var oControl = CtxFindUI5Control(element);
				if (oControl){
					var bindingInfo = oControl.getBinding();
					var oJson = oControl.getModel().getProperty(bindingInfo.sPath);
					if (oJson != undefined) {
						if (functionName == 'getTableData'){
	        		return oJson;
	      		}
	      		if(functionName == 'getRowCount'){
	        		return oJson.length;
	      		}
	      		if(functionName == 'getRowDatabyIndex'){
	        		try {
	          		var data = oJson[Number(index)];
	        		} catch (oErr) {
								return 'Wrong row index provided.';
	        		}
	        		return data;
	        	}			
					} else {
							var oJsDynamic = oControl.getModel().getProperty('/');
							var keys = Object.keys(oJsDynamic);
							if (functionName == 'getTableData'){
	        			return oJsDynamic;
	      			}
	      			if(functionName == 'getRowCount'){
	        			return keys.length;
	      			}
	      			if(functionName == 'getRowDatabyIndex'){
	        			try {
	          			var data = oJsDynamic[keys[Number(index)]];
	        			} catch (oErr) {
									return 'Wrong row index provided.';
	        			}
	        			return data;
							}
						}
					} else {
						ctx.log('Could not find SAPUI5 table');
						return '';
				  }
      }
			
			/**
			* @ignore
			* @method SAPUI5Calendar
			* @param {HTMLElement} element DOM element
			* @param {string} title of the appoinment
			* @param {string} subTitle of the appoinment
			* @param {string} type of the appoinment
			* @param {string} startDate of the appoinment
			* @param {string} endDate of the appoinment
			*/
			function SAPUI5Calendar(element, title, subTitle, type, startDate, endDate){
				var oControl = CtxFindUI5Control(element);
				var sYear, sMonth, sDay, sHour, sMin, sSec;
				var eYear, eMonth, eDay, eHour, eMin, eSec;
				
				function validation(date){
					var dateList = date.split(',');
					var dYear, dMonth, dDay, dHour, dMin, dSec;

					if(dateList.length != 3 || dateList.length != 6){
						// Year Validation
						dYear =  Number(dateList[0]);
						if (dYear < 2016 || dYear > 2050) {return -1;}
						
						// Month Validation
						dMonth =  Number(dateList[1])-1;
						if (sMonth < 0 || sMonth > 11) {return -1;}
						
						// Day Validation
						dDay = Number(dateList[2])
						var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
						// Adjust for leap years
						if (dYear % 400 == 0 || (dYear % 100 != 0 && dYear % 4 == 0)) {monthLength[1] = 29;}
						if (dDay < 0 || dDay > monthLength[dMonth]) {return -1;}
						
						// Hour Validation
						if(!dateList[3]) {dHour = 0} else {dHour =  Number(dateList[3])}
						if (dHour < 0 || dHour > 23) {return -2;}
						
						// Minute Validation
						if(!dateList[4]) {dMin = 0} else {dMin =  Number(dateList[4])}
						if (dMin < 0 || dMin > 59) {return -2;}
						
						// Sec Validation
						if(!dateList[5]) {dSec = 0} else {dSec =  Number(dateList[5])}
						if (dSec < 0 || dSec > 59) {return -2;}
					}				
					return { 
									year : dYear, 
									month : dMonth, 
									day : dDay, 
									hour : dHour,
									min : dMin, 
									sec : dSec
								};
				}
				
				if (oControl){
					var startValue = validation(startDate);
					if (startValue == -1) {return "Provide a Valid Start Date";}
					if (startValue == -2) {return "Provide a Valid Start Time";}
					sYear = startValue.year;
					sMonth = startValue.month;
					sDay = startValue.day;
					sHour = startValue.hour;
					sMin = startValue.min;
					sSec = startValue.sec;
					
					var endValue = validation(endDate);
					if (endValue == -1) {return "Provide a Valid End Date";}
					if (endValue == -2) {return "Provide a Valid End Time";}
					eYear = endValue.year;
					eMonth = endValue.month; 
					eDay = endValue.day;
					eHour = endValue.hour;
					eMin = endValue.min;
					eSec = endValue.sec;

					if (new Date(eYear, eMonth, eDay, eHour, eMin, eSec) - new Date(sYear, sMonth, sDay, sHour, sMin, sSec) < 0) {
						return "Start Date vaule is higher then end Date, change it and try again";
					}
					
					try{
						var oModel = oControl.getModel();
						if (oModel.sPath) {
							var sAppointmentPath = oControl.sPath;
							oModel.setProperty(sAppointmentPath + "/title", title);
							oModel.setProperty(sAppointmentPath + "/text", subTitle);
							oModel.setProperty(sAppointmentPath + "/type", type);
							oModel.setProperty(sAppointmentPath + "/startDate", new Date(sYear, sMonth, sDay, sHour, sMin, sSec));
							oModel.setProperty(sAppointmentPath + "/endDate", new Date(eYear, eMonth, eDay, eHour, eMin, eSec));
						} else {
							oModel.getData().appointments.push({
								title: title,
								text: subTitle,
								type: type,
								startDate :new Date(sYear, sMonth, sDay, sHour, sMin, sSec),
								endDate: new Date(eYear, eMonth, eDay, eHour, eMin, eSec)
							});
						}
						oModel.updateBindings();
					} catch (err){
							return "Appoinment creation failed for different Odata Model format";
					}
				}	else {return "Calendar control not identified";}

			return "success";
			}
		  /**
      * @ignore
      * @method SAPUI5CallFunction
      * @param  {HTMLElement} element DOM element
      * @param {number} [timeout] optional Timeout for execution
      */
		 function SAPUI5CallFunction(element, args, functionName, timeout) {
		 	 var oControl = CtxFindUI5Control(element);
			 if (oControl) {
        try {
					/*
					* If the function need a sap type object 
					*/
					if(args[0].type != undefined)
					{
						var data = SAPUI5Convert(args[0]);
						var res = oControl[functionName].apply(oControl, [data]);
					}else{
			 			var res = oControl[functionName].apply(oControl, args);
						if(functionName == 'setValue')
						{
							setTimeout(function(){
            	oControl['getModel']().refresh(true);
          		},200);
						}
						if(functionName == 'getDebit' || functionName == 'getCredit')
						{
							return res[args[0]].getValue();
						}
						if(functionName == 'getItems' || functionName == 'getRegions')
						{
							return SAPUI5GetItems(res);
						}
						if(functionName.substring(0,3) == 'get'){
							return res;
						}
					}
					return '';
					} 
				catch (oErr) {
					return '';
        }	
		  }
			return '';
		 }
		 /**
      * @ignore
      * @method SAPUI5Convert
      * @param  {Object} data
      */
		 function SAPUI5Convert(data) {
			 try{
				 var item = eval("new " + data.type + "()");
				 
				 if(data.type == "sap.ui.core.Item"
					 || data.type == "sap.tnt.NavigationListItem"
					 || data.type == "sap.m.Token"
					 || data.type == "sap.m.SegmentedButtonItem")
				 {
					 item['setText'](data.text);
					 item['setKey'](data.key);
				 }
//				 if(data.type == "sap.m.UploadCollectionItem")
//				 {
//					 item['setUrl'](data.url);
//					 item['setFileName'](data.fileName);
//					 var fileUploader = eval("new sap.ui.unified.FileUploader()");
//					 fileUploader['setUploadUrl'](data.url);
//					 fileUploader['setValue'](data.url);
//					 fileUploader['upload']();
//					 item['setFileUploader'](fileUploader);
//				 }
				 if(data.type == "sap.suite.ui.commons.taccount.TAccountItem")
				 {
					 item.setValue(data.value);
				 }
				 return item;
			 }
			 catch(err)
			 {
			 	 return undefined;
			 }
		 }
      /**
      * @ignore
      * @method SAPUI5InputSet
      * @param  {HTMLElement} element DOM element
      * @param  {string} value Value to be set
      * @param {number} [timeout] optional Timeout for execution
      */
     function SAPUI5InputSet( element, value, timeout) {
     	
      var oControl = CtxFindUI5Control(element);
			 
      if (oControl) {
        try {
					if(element.type == 'checkbox' 
						|| element.type == 'radio')
					{
						oControl.setSelected(value);
					}
					if(element.id.includes('slider'))
					{
						oControl.setRange(value);
					}
					//sapMActionSelect
//					if(element.id.includes('select-hiddenInput'))
//					{
//						oControl.setSelectedItemId(oControl.getButtons()[0]);
//					}
					else
					{
          	oControl.fireChange(oControl.setValue(value));
						//setTimeout(function(){
            	oControl['getModel']().refresh(true);
          	//},200)
					}
        } catch (oErr) {
			SAPUI5InputSetDEFAULT(element, value);   
        }				 
      } else {
        SAPUI5InputSetDEFAULT(element, value);   
      }    
      return '';
    }

    /**
    * @ignore
    * @method SAPUI5InputSetRRAPI
    * @param  {HTMLElement} element DOM element
    * @param  {string} value Value to be set
    * @param {number} [timeout] optional Timeout for execution
    */
		function SAPUI5InputSetRRAPI(element, value, timeout) {
			var oControl = CtxFindUI5Control(element);
			if (window.recordReplay) {
				window.recordReplay.waitForUI5({
        	interval: 400,
        	timeout: timeout
    		}).then(function () {
							return window['recordReplay']['findControlSelectorByDOMElement']({ domElement: oControl['getDomRef']() });
     	 		}).then(function (controlSelector) {
							if (controlSelector) {
								try{
									window['recordReplay']['interactWithControl']({interactionType: window['recordReplay']['InteractionType']['EnterText'], selector: controlSelector, enterText: value});
									return {
										control: oControl
									}
								} catch(oErr) {
									return 'Record Replay Enter Text Failed.';
								}
							}
       		 	}).then(function (oControl) {
								if (oControl) {
									setTimeout(function(){
            					oControl['control']['getModel']().refresh(true);
          				},200)
        				}	else {
            				SAPUI5InputSetDEFAULT(element, value);
          			}
       				})['catch'](function(error){
									SAPUI5InputSetDEFAULT(element, value);
							});
      } else {
					SAPUI5InputSetDEFAULT(element, value);
			}
			return '';
		}

     /**
      * @ignore
      * @method SAPUI5InputSearchDEFAULT
      * @param  {HTMLElement} element DOM element
      * @param  {string} value Value to be set
      */
     function SAPUI5InputSearchDEFAULT(element, value) {

      function setInputValue (oElem, strValue) {
        var strType = oElem[ "type" ];
				if ( typeof strType !== "undefined" ) {
					switch ( strType ) {
						case "checkbox":
						case "radio":
							oElem.checked = ( strValue === "1" ? true : false );
							return true;
					}
				}
				oElem.value = strValue;
      }

      setInputValue(element, value);

       try {
         element.dispatchEvent(new FocusEvent('focus', { 'bubbles': true, 'cancelable': true }));
         element.dispatchEvent(new MouseEvent('click', { 'bubbles': true, 'cancelable': true }));
         element.dispatchEvent(new KeyboardEvent('keypress', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
         element.dispatchEvent(new KeyboardEvent('keydown', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
         element.dispatchEvent(new KeyboardEvent('keyup', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
         element.dispatchEvent(new FocusEvent('blur', { 'bubbles': true, 'cancelable': true }));
       } catch (oErr) {
        element.dispatchEvent(new CustomEvent('focus', { 'bubbles': true, 'cancelable': true }));
        element.dispatchEvent(new CustomEvent('click', { 'bubbles': true, 'cancelable': true }));
        element.dispatchEvent(new CustomEvent('keypress', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
        element.dispatchEvent(new CustomEvent('keydown', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
        element.dispatchEvent(new CustomEvent('keyup', { 'view': window, 'bubbles': true, 'key': 'Enter', 'charCode': 13, 'keyCode': 13, 'which': 13 }));
        element.dispatchEvent(new CustomEvent('blur', { 'bubbles': true, 'cancelable': true }));
       }
       return '';
     }
   
    /**
    * @ignore
    * @method SAPUI5InputSearch
    * @param  {HTMLElement} element DOM element
    * @param  {string} value Value to be set
    * @param {number} [timeout] optional Timeout for execution
    */
    function SAPUI5InputSearch( element, value, timeout) {
   
      var oControl = CtxFindUI5Control(element);
      if (oControl) {
        try {
          oControl.setValue(value);
          //setTimeout(function(){
           // oControl['fireLiveChange']();
         // },400)
		 //oControl['getModel']().refresh(true); //[need refresh]
		oControl.fireLiveChange(); //[need refresh]
        } catch (oErr) {
			SAPUI5InputSearchDEFAULT(element, value); 
        }				 
      } else {
        SAPUI5InputSearchDEFAULT(element, value);   
      }    
      return '';
    }

   /**
    * @ignore
    * @method SAPUI5InputSearchRRAPI
    * @param  {HTMLElement} element DOM element
    * @param  {string} value Value to be set
    * @param {number} [timeout] optional Timeout for execution
    */
	function SAPUI5InputSearchRRAPI(element, value, timeout) {
		var oControl = CtxFindUI5Control(element);
		if (window.recordReplay) {
			window.recordReplay.waitForUI5({
			interval: 400,
			timeout: timeout
		}).then(function () {
			return window['recordReplay']['findControlSelectorByDOMElement']({ domElement: oControl['getDomRef']() });
			}).then(function (controlSelector) {
					if (controlSelector) {
						try{
							window['recordReplay']['interactWithControl']({interactionType: window['recordReplay']['InteractionType']['EnterText'], selector: controlSelector, enterText: value});
							return {
								control: oControl
							}
						} catch(oErr) {
							return 'Record Replay Enter Text Failed.';
						}
					}
				}).then(function (oControl) {
						if (oControl) {
							oControl['control']['fireLiveChange']();
						} else {
							SAPUI5InputSearchDEFAULT(element, value);
						}
				});
			} else {
				SAPUI5InputSearchDEFAULT(element, value);
			}
		return '';
	}
	 
	 /**
    * @ignore
    * @method SAPUI5SuggestionSearch
    * @param  {HTMLElement} element DOM element
    * @param  {string} value Value to be set
    * @param {number} [timeout] optional Timeout for execution
    */
   function SAPUI5SuggestionSearch(element, value, timeout) {
    var oControl = CtxFindUI5Control(element);
    var result = "";
    if (oControl) {
        try {
          oControl.setValue(value);
					value = value.toUpperCase();
					value = value.trim();
          oControl.fireSuggest();
          var attempts = 0;
          var aSyncTask = setInterval(function() {
						if(oControl){
							var suggestionItem = oControl.getSuggestionItems()[0];
							if(suggestionItem){
								suggestionItem = suggestionItem.getText()
								suggestionItem = suggestionItem.toUpperCase();
								suggestionItem = suggestionItem.trim();
							}
	            if(attempts == 3){
	              clearInterval(aSyncTask);
	            }
	            if(suggestionItem === value) {
	              oControl.fireSuggestionItemSelected({selectedItem:oControl.getSuggestionItems()[0]});
	            }
	            attempts += 1;
						}
          }, 3000);
        } catch (oErr) {
        }
      }  
    return "Search Initiated for the provided value!";
  }
	 
	/**
   * @ignore
   * @method MultiComboboxSelectItems
   * @param  {HTMLElement} element DOM element
   * @param {number} [timeout] optional Timeout for execution
   */
  function MultiComboboxGetSelectedItems(element, timeout){
    var oControl = CtxFindUI5Control(element);     
    if (oControl) {
      try {
        var items = [];
        oControl.getSelectedItems().forEach(function(item){
          items[items.length] = item['getText']();
        });
        return items;
      }
      catch(oErr){}
    }
    return "";
  }
	
	/**
   * @ignore
   * @method MultiComboboxSelectItems
   * @param {HTMLElement} element DOM element
	 * @param {Object} values to be selected
   * @param {number} [timeout] optional Timeout for execution
   */
  function MultiComboboxSelectItems(element, values, timeout) {
    var oControl = CtxFindUI5Control(element);     
    if (oControl) {
      try {
        var keys = oControl.getSelectedKeys();
        values.forEach(function(value){
          keys[keys.length] = oControl['getItemByText'](value).getKey();
        });
        oControl.fireChange(oControl.setSelectedKeys(keys));
      } catch(oErr) {         
      }
    }
    return '';
  }
	
	/**
   * @ignore
   * @method MultiComboboxSelectItems
   * @param  {HTMLElement} element DOM element
   * @param {Object} values to be selected
   * @param {number} [timeout] optional Timeout for execution
   */
  function MultiComboboxClearSelectItems(element, values, timeout) {
    var oControl = CtxFindUI5Control(element);     
    if (oControl) {
      try {
				if(typeof values === 'undefined'){
					oControl.fireChange(oControl.clearSelection());
				}
				else if(typeof values === "object"){
	        var keys = oControl.getSelectedKeys();
	        values.forEach(function(value){
						oControl['removeSelectedItem'](oControl['getItemByText'](value));
	        });
	        oControl.fireChange();
				}
      } catch(oErr) {         
      }
    }
    return '';
  }
	
  var map = {
    CtxPolyfill: CtxPolyfill,
    CtxFindUI5Control: CtxFindUI5Control,
    SAPUI5PageWaitReady: SAPUI5PageWaitReady,
    SAPUI5PageWaitReadyRRAPI: SAPUI5PageWaitReadyRRAPI,
    CtxLoadRecordReplay: CtxLoadRecordReplay,
    CtxLoadRecordReplayRRAPI: CtxLoadRecordReplayRRAPI,
    SAPUI5ButtonClickDEFAULT: SAPUI5ButtonClickDEFAULT,
    SAPUI5ButtonClick: SAPUI5ButtonClick,
    SAPUI5ButtonClickRRAPI: SAPUI5ButtonClickRRAPI,
    SAPUI5InputSetDEFAULT:SAPUI5InputSetDEFAULT,
    SAPUI5InputSet:SAPUI5InputSet,
    SAPUI5InputSetRRAPI: SAPUI5InputSetRRAPI,
    SAPUI5InputSearchDEFAULT:SAPUI5InputSearchDEFAULT,
    SAPUI5InputSearch:SAPUI5InputSearch,
    SAPUI5InputSearchRRAPI: SAPUI5InputSearchRRAPI,
    SAPUI5CallFunction: SAPUI5CallFunction,
  	SAPUI5Convert: SAPUI5Convert,
  	SAPUI5GetItems: SAPUI5GetItems,
    SAPUI5ToggleClick: SAPUI5ToggleClick,
  	SAPUI5SetPressed: SAPUI5SetPressed,
  	SAPUI5SuggestionSearch: SAPUI5SuggestionSearch,
  	SAPUI5GetTableData: SAPUI5GetTableData,
    MultiComboboxSelectItems: MultiComboboxSelectItems,
    MultiComboboxGetSelectedItems:MultiComboboxGetSelectedItems,
  	MultiComboboxClearSelectItems: MultiComboboxClearSelectItems,
		SAPUi5RecordReplayStatus: SAPUi5RecordReplayStatus,
		SAPUI5Calendar: SAPUI5Calendar
  };
     
    return {name: functionName, func:map[functionName], execute: bExecute}
  }
};

/**
 * @ignore
 * Custom Types for SAPUI5 SuccessFactors objects
 * @class ctx.customTypes.SAPUI5.SF
 * @path  ctx.customTypes.SAPUI5.SF
 */
ctx.customTypes.SAPUI5.SF = {
};

/**
 * @ignore
 * SAPUI5 page customization
 * @class       ctx.customTypes.SAPUI5.page
 * @constructor
 * @path        ctx.customTypes.SAPUI5.page
 * @param {ctx.page} page
 */
ctx.customTypes.SAPUI5.page = function(page) {

  var eRecordReplayStatus = {
    USED: 'used',
    NOTUSED: 'notused',
    NOTINITIALIZED: 'notinitialized'
  };  
  var recordReplayStatus = eRecordReplayStatus.NOTINITIALIZED;

  // Events
	page.addEvent({ evReadyPage: null});
  page.events['evReadyPage'].internal = true;
  
  page.addEvent({ evRecordReplayLoaded: null});
	page.events['evRecordReplayLoaded'].internal = true;
  
  // *********************************************
  // *** Add custom methods to the parent page ***
  // *********************************************

  page.customMethods.CtxPolyfill = ctx.customTypes.SAPUI5.findCodeToInject('CtxPolyfill', true);
  page.customMethods.SAPUI5PageWaitReadyRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5PageWaitReadyRRAPI');
  page.customMethods.SAPUI5PageWaitReady = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5PageWaitReady');

	/**
  * The Record Replay API status.
  * @method getRecordReplayStatus
  * @return {string} The status of Record Replay API
  * @path   ctx.customTypes.SAPUI5.page.getRecordReplayStatus
  */
  page.getRecordReplayStatus = function () {
    return recordReplayStatus;
  }

	/**
  * Retrieves the WaitReady function to be used.
  * @method getPageWaitReadyFunctionName
  * @return {string} The status of Record Replay API
  * @path   ctx.customTypes.SAPUI5.page.getPageWaitReadyFunctionName
  */
   
	page.getPageWaitReadyFunctionName = function () {
    return 'SAPUI5PageWaitReady';
  } 

	/**
  * Retrieves the WaitReady function to be used according to the RecordReplay status.
  * @method getPageWaitReadyTimeout
  * @return {number} The status of Record Replay API
  * @path   ctx.customTypes.SAPUI5.page.getPageWaitReadyTimeout
  */
  page.getPageWaitReadyTimeout = function () {
    return recordReplayStatus === eRecordReplayStatus.USED ? ctx.options.sapui5.timeoutReadyRRAPI : ctx.options.sapui5.timeoutReady;
  } 

	/**
  * Waits until a page is ready.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> </code>
  * @method waitReady
  * @param {function(ctx.event)} callback callback to be called when page is closed or absent
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  * @path   ctx.customTypes.SAPUI5.button.click
  */
  page.waitReady = function(callback, delay) {
    ctx.noNotify = true;
    var desc = page.getObjectDescriptor();
    ctx.notifyAction('waitReady', '', desc);
	  var res = page.wait(function(evWait) {
          // 1. Add calback on Page to handle evReadyPage event
          var offReady = page.events['evReadyPage'].on(function(ev) {
						if ((ev.appliInst == desc.appliInst || desc.appliInst ==- -1 ) && (ev.pageInst == desc.pageInst || desc.pageInst === -1) && ('function' === typeof callback)) {
              // Execute callback
              callback(ev);
              //stop listen to evReadyPage event
              ctx.off(offReady);
            }
          });
					page.execScript(this.getPageWaitReadyFunctionName(), 'evReadyPage', 60000);
		});
    return '';
  }
}

/**
 * @ignore
 * SAPUI5 button
 * @class       ctx.customTypes.SAPUI5.button
 * @constructor
 * @path        ctx.customTypes.SAPUI5s.button
 */
ctx.customTypes.SAPUI5.button = function(item) {

  // *********************************************
  // *** Add custom methods to the parent page ***
  // *********************************************
  
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5ButtonClickDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickDEFAULT');
  item.parent.customMethods.SAPUI5ButtonClickRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickRRAPI');
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
  item.parent.customMethods.SAPUI5ButtonClick = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClick');

 /**
  * Click on a item.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.btSearch.click( );</code>
  * @method click
  * @return {string} result
  * @path   ctx.customTypes.SAPUI5.button.click
  */
	item.click = function () {
		return ctx.apiui5.click(item);
  };
	
}

/**
 * @ignore
 * SAPUI5 pseudobutton
 * @class       ctx.customTypes.SAPUI5.pseudobutton
 * @constructor
 * @path        ctx.customTypes.SAPUI5.pseudobutton
 */
ctx.customTypes.SAPUI5.pseudobutton = function(item) {

  // *********************************************
  // *** Add custom methods to the parent page ***
  // *********************************************
  
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5ButtonClickDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickDEFAULT');
  item.parent.customMethods.SAPUI5ButtonClickRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickRRAPI');
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
  item.parent.customMethods.SAPUI5ButtonClick = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClick');

 /**
  * Click on a item.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.btSearch.click( );</code>
  * @method click
  * @return {string} result
  * @path   ctx.customTypes.SAPUI5.pseudobutton.click
  */
	item.click = function () {
		return ctx.apiui5.click(item);
  };
}

/**
 * @ignore
 * SAPUI5 input
 * @class       ctx.customTypes.SAPUI5.input
 * @constructor
 * @path        ctx.customTypes.SAPUI5.input
 */
ctx.customTypes.SAPUI5.input = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************

  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');    
  item.parent.customMethods.SAPUI5InputSetDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSetDEFAULT');  
  item.parent.customMethods.SAPUI5InputSetRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSetRRAPI');    
  item.parent.customMethods.SAPUI5InputSet =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSet');     
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
 
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.input.set
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
	item.set = function (value, testExist, ifDefined) {
    return ctx.apiui5.setValue(item, value, testExist, ifDefined);
  };
}
 
/**
 * @ignore
 * SAPUI5 slider
 * @class       ctx.customTypes.SAPUI5.slider
 * @constructor
 * @path        ctx.customTypes.SAPUI5.slider
 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.RangeSlider
 */
ctx.customTypes.SAPUI5.slider = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
 
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.set(0,100);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.slider.set
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.RangeSlider/methods/setRange
	 * @param {number} min value to be set
	 * @param {number} max value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (min, max, testExist, ifDefined) {
    return ctx.apiui5.setRange(item, min, max, testExist, ifDefined);
  };
}

/**
 * @ignore
 * SAPUI5 checkbox
 * @class       ctx.customTypes.SAPUI5.checkbox
 * @constructor
 * @path        ctx.customTypes.SAPUI5.checkbox
 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.CheckBox
 */
ctx.customTypes.SAPUI5.checkbox = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction'); 
 
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.checkbox.set
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.CheckBox/methods/setSelected
	 * @param {boolean} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (value, testExist, ifDefined) {
		return ctx.apiui5.setSelected(item, value, testExist, ifDefined);
  };
	/**
   * gets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.get('');</code>
   * @method get
   * @path   ctx.customTypes.SAPUI5.checkbox.get
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.CheckBox/methods/getSelected
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.get = function (testExist, ifDefined) {
		return ctx.apiui5.getSelected(item, testExist, ifDefined);
  };

 	/**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.check('myUser');</code>
   * @method check
   * @path   ctx.customTypes.SAPUI5.checkbox.check
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.CheckBox/methods/setSelected
	 * @param {boolean} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.check = function (value, testExist, ifDefined) {
		return ctx.apiui5.setSelected(item, value, testExist, ifDefined);
  };
	/**
   * gets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.isChecked('');</code>
   * @method isChecked
   * @path   ctx.customTypes.SAPUI5.checkbox.isChecked
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.CheckBox/methods/getSelected
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.isChecked = function (testExist, ifDefined) {
		return ctx.apiui5.getSelected(item, testExist, ifDefined);
	};
}

/**
 * @ignore
 * SAPUI5 inputswitch
 * @class       ctx.customTypes.SAPUI5.inputswitch
 * @constructor
 * @path        ctx.customTypes.SAPUI5.inputswitch
 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.Switch
 */
ctx.customTypes.SAPUI5.inputswitch = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
 
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.inputswitch.set
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.Switch/methods/setState
	 * @param {boolean} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (value, testExist, ifDefined) {
    return ctx.apiui5.setState(item, value, testExist, ifDefined);
  };
}

/**
 * @ignore
 * SAPUI5 radio
 * @class       ctx.customTypes.SAPUI5.radio
 * @constructor
 * @path        ctx.customTypes.SAPUI5.radio
 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.RadioButton
 */
ctx.customTypes.SAPUI5.radio = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
 
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.radio.set
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.RadioButton/methods/setSelected
	 * @param {boolean} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (value, testExist, ifDefined) {
		return ctx.apiui5.setSelected(item, value, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 combobox
 * @class       ctx.customTypes.SAPUI5.combobox
 * @constructor
 * @path        ctx.customTypes.SAPUI5.combobox
 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.ComboBox
 */
ctx.customTypes.SAPUI5.combobox = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
  item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
	item.parent.customMethods.SAPUI5GetItems =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5GetItems');
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.combobox.set
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.ComboBox/methods/setSelectedKey
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (value, testExist, ifDefined) {
    return ctx.apiui5.setSelectedKey(item, value, testExist, ifDefined);
  };
	/**
   * Get items.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> ;</code>
   * @method getItems
   * @path   ctx.customTypes.SAPUI5.combobox.getItems
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.ComboBox/methods/getItems
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.getItems = function (testExist, ifDefined) {
    return ctx.apiui5.getItems(item, testExist, ifDefined);
  };
	/**
   * Add a Item of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set({
	 *				text: '',
	 *				key: ''
	 *};);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.combobox.addItem
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.ComboBox/methods/addItem
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.addItem = function (data, testExist, ifDefined) {
    return ctx.apiui5.addItem(item, data, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 calendar
 * @class       ctx.customTypes.SAPUI5.calendar
 * @constructor
 * @path        ctx.customTypes.SAPUI5.calendar
 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.SinglePlanningCalendar
 */
ctx.customTypes.SAPUI5.calendar = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction'); 
	item.parent.customMethods.SAPUI5Calendar =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Calendar'); 

	/**
	* Add a Item of item.
	* @path  ctx.customTypes.SAPUI5.calendar.addItem
	* @param {string} title of the appoinment
	* @param {string} subTitle of the appoinment
	* @param {string} type of the appoinment
	* @param {string} startDate of the appoinment
	* @param {string} endDate of the appoinment
	* @param {boolean} [testExist] if true, test existence before setting value
	* @param {boolean} [ifDefined] if true, set value only if defined
	* @return {string} result value
	*/
  item.addItem = function (title, subTitle, type, startDate, endDate, testExist, ifDefined) {
    return ctx.apiui5.addAppointment(item, title, subTitle, type, startDate, endDate, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 actionselect
 * @class       ctx.customTypes.SAPUI5.actionselect
 * @constructor
 * @path        ctx.customTypes.SAPUI5.actionselect
 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.ActionSelect
 */
ctx.customTypes.SAPUI5.actionselect = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.actionselect.open
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.m.Select/methods/open
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.open = function (testExist, ifDefined) {
    return ctx.apiui5.open(item, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 menu
 * @class       ctx.customTypes.SAPUI5.menu
 * @constructor
 * @path        ctx.customTypes.SAPUI5.menu
 */
ctx.customTypes.SAPUI5.menu = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');  
	item.parent.customMethods.SAPUI5ButtonClickDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickDEFAULT');
  item.parent.customMethods.SAPUI5ButtonClickRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickRRAPI');
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
  item.parent.customMethods.SAPUI5ButtonClick = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClick');
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.menu.open
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.open = function (testExist, ifDefined) {
		return ctx.apiui5.click(item);
  };
}
/**
 * @ignore
 * SAPUI5 searchfield
 * @class       ctx.customTypes.SAPUI5.searchfield
 * @constructor
 * @path        ctx.customTypes.SAPUI5.searchfield
 */
ctx.customTypes.SAPUI5.searchfield = function(item) {

  // *********************************************
  // *** Add custom methods to the parent page ***
  // *********************************************

	item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');    
	item.parent.customMethods.SAPUI5InputSearchDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSearchDEFAULT');  
	item.parent.customMethods.SAPUI5InputSearchRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSearchRRAPI');    
	item.parent.customMethods.SAPUI5InputSearch =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSearch'); 
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
	item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction'); 

 /**
  * Sets the value to be search.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
  * @method set
  * @path   ctx.customTypes.SAPUI5.searchfield.set
  * @param {string} value value to be set
  * @param {boolean} [testExist] if true, test existence before setting value
  * @param {boolean} [ifDefined] if true, set value only if defined
  * @return {string} result value
  */
	item.set = function (value, testExist, ifDefined) {
 		return ctx.apiui5.setSearch(item, value, testExist, ifDefined);
	};  
 /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method search
   * @path   ctx.customTypes.SAPUI5.searchfield.search
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.search = function (value, testExist, ifDefined) {
    return ctx.apiui5.setSearch(item, value, testExist, ifDefined);
  };
}

/**
 * @ignore
 * SAPUI5 multiinput
 * @class       ctx.customTypes.SAPUI5.multiinput
 * @constructor
 * @path        ctx.customTypes.SAPUI5.multiinput
 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.MultiInput 
 */
ctx.customTypes.SAPUI5.multiinput = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************

  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');    
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
	item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
 
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set({
	 *				text: '',
	 *				key: ''
	 *};);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.multiinput.set
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.MultiInput/methods/addToken
	 * @param {string} data value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (data, testExist, ifDefined) {
    return ctx.apiui5.addToken(item, data, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 feedcontent
 * @class       ctx.customTypes.SAPUI5.feedcontent
 * @constructor
 * @path        ctx.customTypes.SAPUI5.feedcontent
 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.FeedContent
 */
ctx.customTypes.SAPUI5.feedcontent = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************

  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');      
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');
	item.parent.customMethods.SAPUI5InputSetDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSetDEFAULT');
	item.parent.customMethods.SAPUI5InputSetRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSetRRAPI'); 
	item.parent.customMethods.SAPUI5ButtonClickDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickDEFAULT');
	item.parent.customMethods.SAPUI5ButtonClickRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickRRAPI');
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
	
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.feedcontent.set
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.FeedContent/methods/setValueFc
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (value, testExist, ifDefined) {
    return ctx.apiui5.setValueFc(item, value, testExist, ifDefined);
  };
	
	/**
   * Gets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.get();</code>
   * @method get
   * @path   ctx.customTypes.SAPUI5.feedcontent.get
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.FeedContent/methods/getValueFc
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.get = function (testExist, ifDefined) {
    return ctx.apiui5.getValueFc(item, testExist, ifDefined);
  };
	
	/**
   * Sets the value of sub header.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.setSubheader('text');</code>
   * @method setSubheader
   * @path   ctx.customTypes.SAPUI5.feedcontent.setSubheader
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.FeedContent/methods/setSubheader
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.setSubheader = function (value, testExist, ifDefined) {
    return ctx.apiui5.setSubheader(item, value, testExist, ifDefined);
  };
	
	/**
   * Gets the value of sub header.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.getSubheader();</code>
   * @method getSubheader
   * @path   ctx.customTypes.SAPUI5.feedcontent.getSubheader
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.FeedContent/methods/getSubheader
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.getSubheader = function (testExist, ifDefined) {
    return ctx.apiui5.getSubheader(item, testExist, ifDefined);
  };
	
	/**
   * Sets the Content Text.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.setContentText('text');</code>
   * @method setContentText
   * @path   ctx.customTypes.SAPUI5.feedcontent.setContentText
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.FeedContent/methods/setContentText
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.setContentText = function (value, testExist, ifDefined) {
    return ctx.apiui5.setContentText(item, value, testExist, ifDefined);
  };
	
	/**
   * Gets the value of sub header.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.getAltText();</code>
   * @method getAltText
   * @path   ctx.customTypes.SAPUI5.feedcontent.getAltText
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.FeedContent/methods/getAltText
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.getAltText = function (testExist, ifDefined) {
    return ctx.apiui5.getAltText(item, testExist, ifDefined);
  };
	
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.feedcontent.press
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.FeedContent/methods/firePress
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.press = function (testExist, ifDefined) {
    return ctx.apiui5.click(item);
  };
}						
/**
 * @ignore
 * SAPUI5 segmentbutton
 * @class       ctx.customTypes.SAPUI5.segmentbutton
 * @constructor
 * @path        ctx.customTypes.SAPUI5.segmentbutton
 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.SegmentedButton
 */
ctx.customTypes.SAPUI5.segmentbutton = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
  item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
	item.parent.customMethods.SAPUI5GetItems =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5GetItems');
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.segmentbutton.set
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.SegmentedButton/methods/setSelectedKey
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (value, testExist, ifDefined) {
    return ctx.apiui5.setSelectedKey(item, value, testExist, ifDefined);
  };
	/**
   * Get items.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> ;</code>
   * @method getItems
   * @path   ctx.customTypes.SAPUI5.segmentbutton.getItems
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.SegmentedButton/methods/getItems
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.getItems = function (testExist, ifDefined) {
    return ctx.apiui5.getItems(item, testExist, ifDefined);
  };
	/**
   * Add a Item of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.addItem({
	 *				text: '',
	 *				key: ''
	 *});</code>
   * @method addItem
   * @path   ctx.customTypes.SAPUI5.segmentbutton.addItem
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.SegmentedButton/methods/addItem
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.addItem = function (value, testExist, ifDefined) {
    return ctx.apiui5.addSegmentButton(item, value, testExist, ifDefined);
  };
	/**
   * Add a Item of item.
  * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.setSelectedButton('One');</code>
   * @method setSelectedButton
   * @path   ctx.customTypes.SAPUI5.segmentbutton.setSelectedButton
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.SegmentedButton/methods/setSelectedButton
	 * @param {string} value value to be set
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.setSelectedButton = function (value, testExist, ifDefined) {
    return ctx.apiui5.setSelectedButton(item, value, testExist, ifDefined);
  };
	/**
   * Add a Item of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.setSelectedItem('myUser');</code>
   * @method setSelectedItem
   * @path   ctx.customTypes.SAPUI5.segmentbutton.setSelectedItem
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.SegmentedButton/methods/setSelectedItem
	 * @param {string} value value to be set
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.setSelectedItem = function (value, testExist, ifDefined) {
    return ctx.apiui5.setSelectedItem(item, value, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 navigationlist
 * @class       ctx.customTypes.SAPUI5.navigationlist
 * @constructor
 * @path        ctx.customTypes.SAPUI5.navigationlist
 * @see https://sapui5.hana.ondemand.com/#/api/sap.tnt.NavigationList
 */
ctx.customTypes.SAPUI5.navigationlist = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
  item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
	item.parent.customMethods.SAPUI5GetItems =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5GetItems');
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.set('key');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.navigationlist.set
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.tnt.NavigationList/methods/setSelectedKey
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.set = function (value, testExist, ifDefined) {
    return ctx.apiui5.setSelectedKey(item, value, testExist, ifDefined);
  };
	/**
   * Add a Item of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.addItem({
	 *				text: '',
	 *				key: ''
	 *};);</code>
   * @method addItem
   * @path   ctx.customTypes.SAPUI5.navigationlist.addItem
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.tnt.NavigationList/methods/addItem
	 * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.addItem = function (value, testExist, ifDefined) {
    return ctx.apiui5.addNavigationListItem(item, value, testExist, ifDefined);
  };
	/**
   * Get items.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.getItems();</code>
   * @method getItems
   * @path   ctx.customTypes.SAPUI5.navigationlist.getItems
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.tnt.NavigationList/methods/getItems
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.getItems = function (testExist, ifDefined) {
    return ctx.apiui5.getItems(item, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 uploadcollection
 * @class       ctx.customTypes.SAPUI5.uploadcollection
 * @constructor
 * @path        ctx.customTypes.SAPUI5.uploadcollection
 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.UploadCollection
 */
//ctx.customTypes.SAPUI5.uploadcollection = function(item) {

//   // *********************************************
//   // *** Add custom methods to the parent page ***
//   // *********************************************
//  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
//  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
//  item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
	
//  /**
//   * Sets the value of item.
//   * @description
//   *  <wrap help> //Example://</wrap>
//   *  <code javascript> SAPUI5.pUI5.oItem.set({
//	 *				url: '',
//	 *				filename: "toto.txt"
//	 *});</code>
//   * @method set
//   * @path   ctx.customTypes.SAPUI5.uploadcollection.set
//	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.UploadCollection/methods/addItem
//	 * @param {string} value value to be set
//   * @param {boolean} [testExist] if true, test existence before setting value
//   * @param {boolean} [ifDefined] if true, set value only if defined
//	 * @return {string} result value
//   */
//  item.set = function (value, testExist, ifDefined) {
//		return ctx.apiui5.addUploadCollectionItem(item, value, testExist, ifDefined);
//  };
//	/**
//   * Add a Item of item.
//   * @description
//   *  <wrap help> //Example://</wrap>
//   *  <code javascript> SAPUI5.pUI5.oItem.addItem({
//	 *				url: '',
//	 *				filename: "toto.txt"
//	 *});</code>
//   * @method set
//   * @path   ctx.customTypes.SAPUI5.uploadcollection.addItem
//	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.UploadCollection/methods/addItem
//	 * @param {string} value value to be set
//   * @param {boolean} [testExist] if true, test existence before setting value
//   * @param {boolean} [ifDefined] if true, set value only if defined
//	 * @return {string} result value
//   */
//  item.addItem = function (value, testExist, ifDefined) {
//    return ctx.apiui5.addUploadCollectionItem(item, value, testExist, ifDefined);
//  };
	
//}
/**
 * @ignore
 * SAPUI5 taccount
 * @class       ctx.customTypes.SAPUI5.taccount
 * @constructor
 * @path        ctx.customTypes.SAPUI5.taccount
 * @see https://sapui5.hana.ondemand.com/#/api/sap.suite.ui.commons.taccount.TAccount
 */
ctx.customTypes.SAPUI5.taccount = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
  item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.addCredit({
	 *				value: '',
	 *};);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.taccount.addCredit
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.suite.ui.commons.taccount.TAccount/methods/addCredit
	 * @param {number} val value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.addCredit = function (val, testExist, ifDefined) {
    return ctx.apiui5.addCredit(item, { value : val }, testExist, ifDefined);;
  };
	/**
   * Add a Item of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.addDebit({
	 *				value: '',
	 *};);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.taccount.addDebit
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.suite.ui.commons.taccount.TAccount/methods/addDebit
	 * @param {number} val value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.addDebit = function (val, testExist, ifDefined) {
    return ctx.apiui5.addDebit(item, { value : val }, testExist, ifDefined);
  };
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.getCredit(0);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.taccount.addCredit
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.suite.ui.commons.taccount.TAccount/methods/getCredit
	 * @param {number} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.getCredit = function (value, testExist, ifDefined) {
    return ctx.apiui5.getCredit(item, value, testExist, ifDefined);
  };
	/**
   * Add a Item of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.getDebit(0);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.taccount.getDebit
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.suite.ui.commons.taccount.TAccount/methods/getDebit
	 * @param {number} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.getDebit = function (value, testExist, ifDefined) {
    return ctx.apiui5.getDebit(item, value, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 treegrid
 * @class       ctx.customTypes.SAPUI5.treegrid
 * @constructor
 * @path        ctx.customTypes.SAPUI5.treegrid
 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.ui.table.TreeTable
 */
ctx.customTypes.SAPUI5.treegrid = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
  item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
	
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> </wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.expand(0);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.treegrid.expand
	 * @see https://openui5nightly.hana.ondemand.com/#/api/sap.ui.table.TreeTable/methods/expand
	 * @param {number} value value to be set
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.expand = function (value, testExist, ifDefined) {
		return ctx.apiui5.expand(item, value, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 table
 * @class       ctx.customTypes.SAPUI5.table
 * @constructor
 * @path        ctx.customTypes.SAPUI5.table
 * @see https://sapui5.hana.ondemand.com/#/api/sap.ui.table.Table
 */
ctx.customTypes.SAPUI5.table = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
  item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
	item.parent.customMethods.SAPUI5GetTableData =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5GetTableData');
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> https://sapui5.hana.ondemand.com/#/api/sap.ui.table.Table/methods/selectAll </wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.selectAll();</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.table.selectAll
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.ui.table.Table/methods/selectAll
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.selectAll = function (testExist, ifDefined) {
		return ctx.apiui5.selectAll(item, testExist, ifDefined);
  };
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> </wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.clearSelection();</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.table.clearSelection
	 * https://sapui5.hana.ondemand.com/#/api/sap.ui.table.Table/methods/clearSelection
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.clearSelection = function (testExist, ifDefined) {
    return ctx.apiui5.clearSelection(item, testExist, ifDefined);
  };
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> </wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.getTableData();</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.table.getTableData
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
   * @return {string} result value
   */
  item.getTableData = function(testExist, ifDefined) {
    return item.execScript('SAPUI5GetTableData', 'getTableData');
  };

  /**
   * Sets the value of item.
   * @description
   *  <wrap help> </wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.getRowCount();</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.table.getRowCount
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
   * @return {string} result value
   */
  item.getRowCount = function(testExist, ifDefined) {
    return item.execScript('SAPUI5GetTableData', 'getRowCount');
  };
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> </wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.getRowDatabyIndex();</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.table.getRowDatabyIndex
   * @param {number} [Index] select index of the row
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
   * @return {string} result value
   */
  item.getRowDatabyIndex = function(Index, testExist, ifDefined) {
    return item.execScript('SAPUI5GetTableData', 'getRowDatabyIndex', Index);
  };
	/**
   * Sets the value of item.
   * @description
   *  <wrap help> </wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.setSelectedIndex(0);</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.table.clearSelection
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.setSelectedIndex = function (value, testExist, ifDefined) {
		return ctx.apiui5.setSelectedIndex(item, value, testExist, ifDefined);
  };
	
	/**
   * Sets the value of item.
   * @description
   *  <wrap help></wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.filter();</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.table.filter
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.filter = function (testExist, ifDefined) {
		return ctx.apiui5.fireFilter(item, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 map
 * @class       ctx.customTypes.SAPUI5.map
 * @constructor
 * @path        ctx.customTypes.SAPUI5.map
 * @see https://sapui5.hana.ondemand.com/#/api/sap.ui.vbm.AnalyticMap
 */
//ctx.customTypes.SAPUI5.map = function(item) {

//   // *********************************************
//   // *** Add custom methods to the parent page ***
//   // *********************************************
//  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
//  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
//  item.parent.customMethods.SAPUI5Convert =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5Convert');
//	item.parent.customMethods.SAPUI5GetItems =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5GetItems');
//	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
  
//	/**
//   * Get regions.
//   * @description
//   *  <wrap help> //Example://</wrap>
//   *  <code javascript>  SAPUI5.pUI5.oItem.getRegions();</code>
//   * @method getRegions
//   * @path   ctx.customTypes.SAPUI5.map.getRegions
//	 * @see https://sapui5.hana.ondemand.com/#/api/sap.ui.vbm.AnalyticMap/methods/getRegions
//	 * @param {boolean} [testExist] if true, test existence before setting value
//   * @param {boolean} [ifDefined] if true, set value only if defined
//	 * @return {string} result value
//   */
//  item.getRegions = function (testExist, ifDefined) {
//    return ctx.apiui5.getRegions(item, testExist, ifDefined);
//  };
	
//	/**
//   * Sets the value of item.
//   * @description
//   *  <wrap help> </wrap>
//   *  <code javascript> SAPUI5.pUI5.oItem.click('AU');</code>
//   * @method set
//   * @path   ctx.customTypes.SAPUI5.map.click
//	 * @see https://sapui5.hana.ondemand.com/#/api/sap.ui.vbm.AnalyticMap/methods/fireRegionClick
//	 * @param {boolean} [testExist] if true, test existence before setting value
//   * @param {boolean} [ifDefined] if true, set value only if defined
//	 * @return {string} result value
//   */
//  item.click = function (value, testExist, ifDefined) {
//    return ctx.apiui5.fireRegionClick(item, value, testExist, ifDefined);
//  };
//}
/**
 * @ignore
 * SAPUI5 carousel
 * @class       ctx.customTypes.SAPUI5.carousel
 * @constructor
 * @path        ctx.customTypes.SAPUI5.carousel
 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.Carousel
 */
ctx.customTypes.SAPUI5.carousel = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');
	
	/**
   * next.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.next();</code>
   * @method next
   * @path   ctx.customTypes.SAPUI5.carousel.next
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.Carousel/methods/next
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.next = function (testExist, ifDefined) {
    return ctx.apiui5.next(item, testExist, ifDefined);
  };
	/**
   * previous.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.oItem.previous();</code>
   * @method previous
   * @path   ctx.customTypes.SAPUI5.carousel.previous
	 * @see https://sapui5.hana.ondemand.com/#/api/sap.m.Carousel/methods/previous
	 * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
	 * @return {string} result value
   */
  item.previous = function (testExist, ifDefined) {
    return ctx.apiui5.previous(item, testExist, ifDefined);
  };
}
/**
 * @ignore
 * SAPUI5 toggleButton
 * @class       ctx.customTypes.SAPUI5.toggleButton
 * @constructor
 * @path        ctx.customTypes.SAPUI5.toggleButton
 */
ctx.customTypes.SAPUI5.toggleButton = function(item) {

  // *********************************************
  // *** Add custom methods to the parent page ***
  // *********************************************
  
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5ButtonClickDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickDEFAULT');
  item.parent.customMethods.SAPUI5ButtonClickRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickRRAPI');
  item.parent.customMethods.SAPUI5ToggleClick =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ToggleClick');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');
  item.parent.customMethods.SAPUI5SetPressed =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5SetPressed');
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');

 /**
  * Click on a Toggle Button.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.btToggleFilter.click( );</code>
  * @method click
  * @return {string} result
  * @path   ctx.customTypes.SAPUI5.toggleButton.click
  */
  item.click = function () {
    return ctx.apiui5.click(item);
  };
/**
  * set Toggle Button state.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.btToggleFilter.check('true');</code>
  * @method check
  * @param {boolean} value
  * @path   ctx.customTypes.SAPUI5.toggleButton.check
  */
  item.check = function (value) {
    return ctx.apiui5.setPressed(item, value)
  };
/**
  * Click on a Toggle Button.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.btToggleFilter.isChecked( );</code>
  * @method isChecked
  * @return {string} result
  * @path   ctx.customTypes.SAPUI5.toggleButton.isChecked
  */
  item.isChecked = function () {
    return ctx.apiui5.getPressed(item);
  };
	/**
  * set Toggle Button state.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.btToggleFilter.set('true');</code>
  * @method set
  * @param {boolean} value
  * @path   ctx.customTypes.SAPUI5.toggleButton.set
  */
  item.set = function (value) {
    return ctx.apiui5.setPressed(item, value)
  };
/**
  * Click on a Toggle Button.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.btToggleFilter.get( );</code>
  * @method get
  * @return {string} result
  * @path   ctx.customTypes.SAPUI5.toggleButton.get
  */
  item.get = function () {
    return ctx.apiui5.getPressed(item);
  };
}
/**
 * @ignore
 * SAPUI5 tableRow
 * @class       ctx.customTypes.SAPUI5.tablerow
 * @constructor
 * @path        ctx.customTypes.SAPUI5.tablerow
 */
ctx.customTypes.SAPUI5.tablerow = function(item) {

  // *********************************************
  // *** Add custom methods to the parent page ***
  // *********************************************
  
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5ButtonClickDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickDEFAULT');
  item.parent.customMethods.SAPUI5ButtonClickRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickRRAPI');
  item.parent.customMethods.SAPUI5ButtonClick = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClick');
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');

 /**
  * Click on a Table Row.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.trTableRow.click( );</code>
  * @method click
  * @return {string} result
  * @path   ctx.customTypes.SAPUI5.tablerow.click
  */
  item.click = function () {
    return ctx.apiui5.click(item);
  };
}

/**
 * @ignore
 * SAPUI5 suggestionSearchField
 * @class       ctx.customTypes.SAPUI5.suggestionSearchField
 * @constructor
 * @path        ctx.customTypes.SAPUI5.suggestionSearchField
 */
ctx.customTypes.SAPUI5.SF.suggestionSearchField = function(item) {

  // *********************************************
  // *** Add custom methods to the parent page ***
  // *********************************************

 	item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');    
 	item.parent.customMethods.SAPUI5InputSearchDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSearchDEFAULT');  
 	item.parent.customMethods.SAPUI5InputSearchRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSearchRRAPI');
 	item.parent.customMethods.SAPUI5InputSearch =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSearch');
 	item.parent.customMethods.SAPUI5SuggestionSearch =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5SuggestionSearch');
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
	 	item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');
	
 /**
  * Sets the value to be search.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPUI5.pUI5.oItem.set('myUser');</code>
  * @method set
  * @path   ctx.customTypes.SAPUI5.suggestionSearchField.set
  * @param {string} value value to be set
  * @param {boolean} [testExist] if true, test existence before setting value
  * @param {boolean} [ifDefined] if true, set value only if defined
  * @return {string} result value
  */
  item.set = function (value, testExist, ifDefined) {
    return ctx.apiui5.setSearch(item, value, testExist, ifDefined);
  };
 /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript> SAPUI5.pUI5.oItem.search('myUser');</code>
   * @method search
   * @path   ctx.customTypes.SAPUI5.suggestionSearchField.search
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
   * @return {string} result value
   */
  item.suggestionSearch = function (value, testExist, ifDefined) {
    return ctx.apiui5.suggestionSearch(item, value, testExist, ifDefined);
  };
}

/**
 * @ignore
 * SAPUI5 multiCombobox
 * @class       ctx.customTypes.SAPUI5.multiCombobox
 * @constructor
 * @path        ctx.customTypes.SAPUI5.multiCombobox
 */
ctx.customTypes.SAPUI5.multiCombobox = function(item){
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.MultiComboboxSelectItems = ctx.customTypes.SAPUI5.findCodeToInject('MultiComboboxSelectItems');
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');
  item.parent.customMethods.MultiComboboxGetSelectedItems = ctx.customTypes.SAPUI5.findCodeToInject('MultiComboboxGetSelectedItems');
	item.parent.customMethods.MultiComboboxClearSelectItems = ctx.customTypes.SAPUI5.findCodeToInject('MultiComboboxClearSelectItems');
	
   /**
  * select items for multiCombobox.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> AP_ACCOUNTANTAppli.pManageSupplierLine.o__xmlview1FinApLi.selectItems(["Parked Items", "Noted Items"]);</code>
  * @method selectItems
  * @path 	ctx.customTypes.SAPUI5.multiCombobox.selectItems
  */
  item.set = function(values){
    return ctx.apiui5.selectItems(item, values);
  }
  /**
  * clear selected items from the multiCombobox.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> AP_ACCOUNTANT.pManageSupplierLine.o__xmlview1FinApLi.clearSelectedItems();</code>
  * @method clearSelectedItems
  * @path   ctx.customTypes.SAPUI5.multiCombobox.selectItems
  */
  item.clear = function(values){
    return ctx.apiui5.clearSelectedItems(item, values);
  }
  
  /**
  * get all selected items text from multiCombobox.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> AP_ACCOUNTANT.pManageSupplierLine.o__xmlview1FinApLi.clearSelectedItems();</code>
  * @method click
  * @path   ctx.customTypes.SAPUI5.multiCombobox.getSelectedItems
  */
  item.get = function(){
    return ctx.apiui5.getSelectedItems(item);
  }
}

/**
 * @ignore
 * SAPUI5 feedinput
 * @class       ctx.customTypes.SAPUI5.feedinput
 * @constructor
 * @path        ctx.customTypes.SAPUI5.feedinput
 */
ctx.customTypes.SAPUI5.feedinput = function(item) {

   // *********************************************
   // *** Add custom methods to the parent page ***
   // *********************************************

  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');    
  item.parent.customMethods.SAPUI5InputSetDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSetDEFAULT');  
  item.parent.customMethods.SAPUI5InputSetRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSetRRAPI');    
  item.parent.customMethods.SAPUI5InputSet =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5InputSet');     
  item.parent.customMethods.SAPUI5CallFunction =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5CallFunction');   
  item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
 
  /**
   * Sets the value of item.
   * @description
   *  <wrap help> //Example://</wrap>
   *  <code javascript>  SAPUI5.pUI5.ofeedinput.set('myUser');</code>
   * @method set
   * @path   ctx.customTypes.SAPUI5.feedinput.set
   * @param {string} value value to be set
   * @param {boolean} [testExist] if true, test existence before setting value
   * @param {boolean} [ifDefined] if true, set value only if defined
   * @return {string} result value
   */
  item.set = function (value, testExist, ifDefined) {
   	 return ctx.apiui5.setValue(item, value, testExist, ifDefined);
  };
}
  /**
 * @ignore
 * SAPUI5 icon
 * @class       ctx.customTypes.SAPUI5.icon
 * @constructor
 * @path        ctx.customTypes.SAPUI5.icon
 */
ctx.customTypes.SAPUI5.icon = function(item) {

  // *********************************************
  // *** Add custom methods to the parent page ***
  // *********************************************
  
  item.parent.customMethods.CtxFindUI5Control = ctx.customTypes.SAPUI5.findCodeToInject('CtxFindUI5Control');
  item.parent.customMethods.SAPUI5ButtonClickDEFAULT = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickDEFAULT');
  item.parent.customMethods.SAPUI5ButtonClickRRAPI = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClickRRAPI');
	item.parent.customMethods.SAPUi5RecordReplayStatus =  ctx.customTypes.SAPUI5.findCodeToInject('SAPUi5RecordReplayStatus');
  item.parent.customMethods.SAPUI5ButtonClick = ctx.customTypes.SAPUI5.findCodeToInject('SAPUI5ButtonClick');

 /**
  * Click on a item.
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript> SAPS4.pHome.btIcon.click( );</code>
  * @method click
  * @return {string} result
  * @path   ctx.customTypes.SAPUI5.icon.click
  */
	item.click = function () {
		return ctx.apiui5.click(item);
  };
}
