
/** 
 * @class       ctx.options.SAPScripting
 * @summary     Options for the 'ctx.SAPScripting' library
 * @path        ctx.options.SAPScripting
 * @struct
 */
ctx.options.SAPScripting = {
 /** 
  * @summary    Trace level (see [[lib:common:ctx.enum#etracelevel|e.trace.level]])
  * @property   {e.trace.level} traceLevel
  * @path       ctx.options.SAPScripting.traceLevel 
  */ 
  traceLevel: e.trace.level.None
};

/**
* Special keyboard keys (Shift, Ctrl, F1, F2, ...)
* @description
* __Ex.:__
<code javascript>
// send Enter shortcut
MyHllApiAppli.pSchedule.keyStroke(e.SAPScripting.key._Enter_);
</code>
* @enumeration e.SAPScripting.key
* @enum {string}
* @path e.SAPScripting.key
* @var _Enter_ 'Enter' key
* @var _F1 F1 key
* @var _F2 F2 key
* @var _F3 F3 key
* @var _F4 F4 key
* @var _F5 F5 key
* @var _F6 F6 key
* @var _F7 F7 key
* @var _F8 F8 key
* @var _F9 F9 key
* @var _F10 F10 key
* @var _Ctrl Ctrl keyS
* @var _F12 F12 key
* @var _Shift_F1 Shift + F1 key
* @var _Shift_F2 Shift + F2 key
* @var _Shift_F3 Shift + F3 key
* @var _Shift_F4 Shift + F4 key
* @var _Shift_F5 Shift + F5 key
* @var _Shift_F6 Shift + F6 key
* @var _Shift_F7 Shift + F7 key
* @var _Shift_F8 Shift + F8 key
* @var _Shift_F9 Shift + F9 key
* @var _Shift_Ctrl_0 Shift + Ctrl + 0 key
* @var _Shift_F11 Shift + F11 key
* @var _Shift_F12 Shift + F12 key
* @var _Ctrl_F1 Ctrl + F1 key
* @var _Ctrl_F2 Ctrl + F2 key
* @var _Ctrl_F3 Ctrl + F3 key
* @var _Ctrl_F4 Ctrl + F4 key
* @var _Ctrl_F5 Ctrl + F5 key
* @var _Ctrl_F6 Ctrl + F6 key
* @var _Ctrl_F7 Ctrl + F7 key
* @var _Ctrl_F8 Ctrl + F8 key
* @var _Ctrl_F9 Ctrl + F9 key
* @var _Ctrl_F10 Ctrl + F10 key
* @var _Ctrl_F11 Ctrl + F11 key
* @var _Ctrl_F12 Ctrl + F12 key
* @var _Ctrl_Shift_F1 Ctrl + Shift + F1 key
* @var _Ctrl_Shift_F2 Ctrl + Shift + F2 key
* @var _Ctrl_Shift_F3 Ctrl + Shift + F3 key
* @var _Ctrl_Shift_F4 Ctrl + Shift + F4 key
* @var _Ctrl_Shift_F5 Ctrl + Shift + F5 key
* @var _Ctrl_Shift_F6 Ctrl + Shift + F6 key
* @var _Ctrl_Shift_F7 Ctrl + Shift + F7 key
* @var _Ctrl_Shift_F8 Ctrl + Shift + F8 key
* @var _Ctrl_Shift_F9 Ctrl + Shift + F9 key
* @var _Ctrl_Shift_F10 Ctrl + Shift + F10 key
* @var _Ctrl_Shift_F11 Ctrl + Shift + F11 key
* @var _Ctrl_Shift_F12 Ctrl + Shift + F12 key
* @var _Ctrl_E Ctrl + E key
* @var _Ctrl_F Ctrl + F key
* @var _Ctrl_/ Ctrl + / key
* @var _Ctrl_\\\\ Ctrl + \\\\ key
* @var _Ctrl_N Ctrl + N key
* @var _Ctrl_O Ctrl + O key
* @var _Ctrl_X Ctrl + X key
* @var _Ctrl_C Ctrl + C key
* @var _Ctrl_V Ctrl + V key
* @var _Ctrl_Z Ctrl + Z key
* @var _Ctrl_PageUp Ctrl + PageUp key
* @var _PageUp PageUp key
* @var _PageDown PageDown key
* @var _Ctrl_PageDown Ctrl + PageDown key
* @var _Ctrl_G Ctrl + G key
* @var _Ctrl_R Ctrl + R key
* @var _Ctrl_P Ctrl + P key
* @readonly
*/
e.SAPScripting = {}

e.SAPScripting.property = {
	user: 'User',
	server : 'SystemName'
};

e.SAPScripting.key = {
	'_Enter_': 0,
	'_F1_': 1,
	'_F2_': 2,
	'_F3_': 3,
	'_F4_': 4,
	'_F5_': 5,
	'_F6_': 6,
	'_F7_': 7,
	'_F8_': 8,
	'_F9_': 9,
	'_F10_': 10,
	'_Ctrl_S': 11,
	'_F12_': 12,
	'_Shift__F1_': 13,
	'_Shift__F2_': 14,
	'_Shift__F3_': 15,
	'_Shift__F4_': 16,
	'_Shift__F5_': 17,
	'_Shift__F6_': 18,
	'_Shift__F7_': 19,
	'_Shift__F8_': 20,
	'_Shift__F9_': 21,
	'_Shift__Ctrl_0': 22,
	'_Shift__F11_': 23,
	'_Shift__F12_': 24,
	'_Ctrl__F1_': 25,
	'_Ctrl__F2_': 26,
	'_Ctrl__F3_': 27,
	'_Ctrl__F4_': 28,
	'_Ctrl__F5_': 29,
	'_Ctrl__F6_': 30,
	'_Ctrl__F7_': 31,
	'_Ctrl__F8_': 32,
	'_Ctrl__F9_': 33,
	'_Ctrl__F10_': 34,
	'_Ctrl__F11_': 35,
	'_Ctrl__F12_': 36,
	'_Ctrl__Shift__F1_': 37,
	'_Ctrl__Shift__F2_': 38,
	'_Ctrl__Shift__F3_': 39,
	'_Ctrl__Shift__F4_': 40,
	'_Ctrl__Shift__F5_': 41,
	'_Ctrl__Shift__F6_': 42,
	'_Ctrl__Shift__F7_': 43,
	'_Ctrl__Shift__F8_': 44,
	'_Ctrl__Shift__F9_': 45,
	'_Ctrl__Shift__F10_': 46,
	'_Ctrl__Shift__F11_': 47,
	'_Ctrl__Shift__F12_': 48,
	'_Ctrl_E': 70,
	'_Ctrl_F': 71,
	'_Ctrl_/': 72,
	'_Ctrl_\\\\': 73,
	'_Ctrl_N': 74,
	'_Ctrl_O': 75,
	'_Ctrl_X': 76,
	'_Ctrl_C': 77,
	'_Ctrl_V': 78,
	'_Ctrl_Z': 79,
	'_Ctrl__PageUp_': 80,
	'_PageUp_': 81,
	'_PageDown_': 82,
	'_Ctrl__PageDown_': 83,
	'_Ctrl_G': 84,
	'_Ctrl_R': 85,
	'_Ctrl_P': 86
};



/**
 * @class       ctx.SAPScripting
 * @summary     Class gathering a set of functions to manage SAP GUI Scripting
 * @constructor
 * @path        ctx.SAPScripting
 */
ctx.SAPScripting = (function() {
	/** @type {Object} */ var _options = ctx.options.SAPScripting;
	/** @type {SAPScriptingInstance} */ var _sapgui = null;
	/** @type {ctx.SAPComponent} */ var _application = null;
	/** @type {boolean} */ var _recordingEnabled = false;
	var _onChangeCallback = null;
	
	/**
	@constructor
	common set of functions that are available to most components but not all
	*/
	var commonFunctions = function(itemOrPage, type){
		
		/**
		* Executes a 'click' on the item
		* @description 
		* __Ex.:__
		<code javascript>
		// click on button
		SAPLogon750App.pSAPEasyAccess.btExit.click ();
		</code>
		* @method click
		* @path ctx.item.click
		* @return {*} result 
		*/
		this.click = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('click', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'click','','','','');	
		};
		
		/**
		* Sets value of an item
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.set ("<some value>");
		</code>
		* @method set
	    * @path ctx.item.set
		* @param {string|number} value		
		* @return {*} ...
		*/
		this.set = function (value) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('set', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'set',value,'','','');
		};
		
		/**
		* Gets value of an item
		* @method get		
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.get();
		</code>
		* @path ctx.item.get
		* @return {*} result string containing value in Xml format
		*/
		this.get = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('get', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'get', '','','','');
		};
	};
	
	//Methods available to a GuiVComponent Component (Parent methods are not added here, they are added in there own component definition)
	var GuiVComponentObj = function(itemOrPage, type){
		
		/**
		* Sets focus on a item	
		* @description
		* __Ex.:__
		<code javascript>
			SAPLogon750App.pSAPEasyAccess.oItem.setFocus();
		</code>		
		* @method setFocus
		* @path ctx.item.setFocus
	    * @return {*} ...
		*/
		this.setFocus = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('setFocus', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setFocus', '', '', '', '');
		};

		// get method specific to VComponent
		this.get = new commonFunctions(itemOrPage, type).get;

		// set method specific to VComponent
		this.set = new commonFunctions(itemOrPage, type).set;

		/**
		* Gets icon name				
		* @description
		* __Ex.:__
		<code javascript>
			SAPLogon750App.pSAPEasyAccess.oItem.getIconName();
		</code>					
		* @method getIconName
		* @path ctx.item.getIconName
		* @return {*} result string containing value in Xml format
		*/
		this.getIconName = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getIconName', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getIconName', '','','','');
		};
	};
	
	//Methods available to a GuiFrameWindow Component (Parent methods are not added here, they are added in there own component definition)
	var GuiFrameWindowObj = function(itemOrPage, type){
		/**
		* Minimize Frame window in background
		* @description Available on any window
		* __Ex.:__
		<code javascript>
		</code>
		* @method iconify
		* @path ctx.page.iconify
		* @return {*} result
		*/
		this.iconify = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('iconify', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'iconify','','','','');
		};

		/**
		* Sends a sequence of keys
		* @description
		* __Ex.:__
		<code javascript>
		// set address, then send 'Enter key' 
		MyAppli.MyPage.edSearch.keyStroke(e.key.Enter);
		</code>
		* @method keyStroke
		* @path ctx.page.keyStroke
		* @param {*} command key sequence or text to be sent (see [[lib:sap:sapscripting#esapscriptingkey|e.SAPScripting.key]])
		* @return {boolean} result 
		*/
		this.keyStroke = function (command) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('keyStroke', '', desc);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'keyStroke',command,'','','');
			return true;
		};

		/**
		* Makes a screenshot of the window (in PNG format)
		* @description
		* __Ex.:__
		<code javascript>
		</code>
		* @method screenshot
		* @path ctx.page.screenshot
		* @param {string} filename file name
		* @return {*} result 
		*/
		this.screenshot = function (filename) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('screenshot', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'screenshot', filename, 2,'','');
		};

		/**
		* Restore a window from its iconified state
		* @description Available on any window
		* __Ex.:__
		<code javascript>
		</code>
		* @method restore
		* @path ctx.page.restore
		* @return {*} result
		*/
		this.restore = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('ctx.SAPComponent.restore', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'restore','','','','');
		};

		/**
		* Minimize Frame window
		* @description Available on any window
		* __Ex.:__
		<code javascript>
		</code>
		* @method minimize
		* @path ctx.page.minimize
		* @return {*} result
		*/
		this.minimize = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('minimize', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'minimize','','','','');
		};

		/**
		* Maximize Frame window
		* @description Available on any window
		* __Ex.:__
		<code javascript>
		</code>
		* @method maximize
		* @path ctx.page.maximize
		* @return {*} result
		*/
		this.maximize = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('maximize', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'maximize','','','','');
		};

		/**
		* Starts a transaction by moving to new page.
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.startTransaction("<transactionId>")
		</code>
		* @method startTransaction
		* @path ctx.page.startTransaction
		* @param {string|number} value
		* @return {*} ...
		*/
		this.startTransaction = function (value) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('startTransaction', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'startTransaction', value, '', '', '');
		};

		/**
		* Ends a transaction by coming back to previous page.
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pDisplaySalesDocumen.endTransaction()
		</code>
		* @method endTransaction
		* @path ctx.page.endTransaction
		* @return {*} ...
		*/
		this.endTransaction = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('endTransaction', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'endTransaction', '', '', '', '');
		};
		
		/**
		* Creates a new session, which is then visualized by a new main window.
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.createSession();		
		</code>
		* @method createSession
		* @path ctx.page.createSession				
		*/
		this.createSession = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('createSession', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'createSession', '', '', '', '');
		};

		/**
		* Close Window
		* @description Available on GuiFrameWindow
		* __Ex.:__
		<code javascript>
		</code>
		* @method close
		* @path ctx.page.close
		* @return {*} result
		*/
		this.close = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('close', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'close','','','','');
		};
	};
	
	//Methods available to a GuiMainWindow Component (Parent methods are not added here, they are added in there own component definition)
	var GuiMainWindowObj = function(itemOrPage, type){
		
		/**
		* Limits automation only on current's page connection 
		* @description 
		* __Ex.:__
		<code javascript>
		// Wait until the Login Page loads
		SAPLogon750.pSAP.wait(function(ev) {
			
		// Limits automation only on "SAP Connection" of SAPLogon750.pSAP page
		SAPLogon750.pSAP.setAutomationConnection();
		
		// Fill user password etc ...
		SAPLogon750.pSAP.edMandant.set(rootData.SAPLogon750Data.pSAPData.edMandant);
		SAPLogon750.pSAP.edUtilisateur.set(rootData.SAPLogon750Data.pSAPData.edUtilisateur);
		SAPLogon750.pSAP.oMotPasse.set(rootData.SAPLogon750Data.pSAPData.oMotPasse);
		SAPLogon750.pSAP.edLangueDeTravail.set(rootData.SAPLogon750Data.pSAPData.edLangueDeTravail);
		SAPLogon750.pSAP.keyStroke(e.SAPScripting.key._Enter_);
		sc.endStep(); // end Scenario
		return;
		});
		</code>
		* @method setAutomationConnection
		* @path ctx.page.setAutomationConnection
		* @return {*} result 
		*/
		this.setAutomationConnection = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('setAutomationConnection', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setAutomationConnection','','','','');	
		};	
		/**
		* Set the Maximum wait time before an action When Session is busy
		* @method setBusyWaitTime  	
	  * @description
		* __Ex.:__
		<code javascript>
			SAPLogon750.pTCURRDisplayOfEnt.setBusyWaitTime(2000);
		</code>	
		* @path ctx.page.setBusyWaitTime
		* @param {number} busyTimeOut
		* @return {*} result 
		*/
		this.setBusyWaitTime = function (busyTimeOut) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('setBusyWaitTime', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setBusyWaitTime', busyTimeOut,'','','');	
		};
		
		/**
		* Reset the Maximum wait time to default
		* @method resetBusyWaitTime  	
	  * @description
		* __Ex.:__
		<code javascript>
			SAPLogon750.pTCURRDisplayOfEnt.resetBusyWaitTime();
		</code>	
		* @path ctx.page.resetBusyWaitTime
		* @return {*} result 
		*/
		this.resetBusyWaitTime = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('resetBusyWaitTime', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'resetBusyWaitTime', '','','','');	
		};
	};
	
	//Methods available to a GuiUserArea Component (Parent methods are not added here, they are added in there own component definition)
	var GuiUserAreaObj = function(itemOrPage, type){		
    /**
    * Scrolls to next page
    * @description
    * __Ex.:__
    <code javascript>
    SAPLogon750.oPage.oGuiUserArea.scrollToNextPage();
    </code>
    * @method scrollToNextPage
    * @path ctx.item.scrollToNextPage
    * @return {boolean} true or false
    */
    this.scrollToNextPage = function(){
      var desc = itemOrPage.getObjectDescriptor();
      var pageDesc = itemOrPage.page.getObjectDescriptor();
      ctx.notifyAction('scrollToNextPage', '', desc);
      var scrollMax = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVerticalScrollMaxOffset', '', '', '', '');
      var currentScrollPosition = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVerticalScrollPosition', '', '', '', '');
      if (currentScrollPosition < scrollMax) {
        ctx.SAPScripting.executeSAPGuiFunction(pageDesc, pageDesc.page.component.type, 'keyStroke', e.SAPScripting.key._PageDown_, '', '', '');		
        return true;
      }
      return false;
    };

    /**
    * Scrolls to previous page
    * @description
    * __Ex.:__
    <code javascript>
    SAPLogon750.oPage.oGuiUserArea.scrollToPreviousPage();
    </code>
    * @method scrollToPreviousPage
    * @path ctx.item.scrollToPreviousPage
    * @return {boolean} true or false
    */
    this.scrollToPreviousPage = function() {
      var desc = itemOrPage.getObjectDescriptor();
      var pageDesc = itemOrPage.page.getObjectDescriptor();
      ctx.notifyAction('scrollToPreviousPage', '', desc);
      var currentScrollPosition = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVerticalScrollPosition', '', '', '', '');
      if (currentScrollPosition > 0) {
        ctx.SAPScripting.executeSAPGuiFunction(pageDesc, pageDesc.page.component.type, 'keyStroke', e.SAPScripting.key._PageUp_, '', '', '');	
        return true;
      }
      return false;
    };
	};
	
	//Methods available to a GuiTextField Component (Parent methods are not added here, they are added in there own component definition)
	var GuiTextFieldObj = function(itemOrPage, type){
		/**
		* Sets the caret position within a text field
		* @description Available on Text Field Control
		* __Ex.:__
		<code javascript>
		</code>
		* @method setCaretPosition
		* @path ctx.item.setCaretPosition
		* @param {number} value Caret position
		* @return {*} ...
		*/
		this.setCaretPosition = function (value) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('setCaretPosition', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setCaretPosition', value, '', '', '');
		};
	};
	
	//Methods available to a GuiComboBox Component (Parent methods are not added here, they are added in there own component definition)
	var GuiComboBoxObj = function(itemOrPage, type){
		// get method specific to GuiComboBox
		this.get = new commonFunctions(itemOrPage, type).get;
		// set method specific to GuiComboBox
		this.set = new commonFunctions(itemOrPage, type).set;
	};
	
	//Methods available to a GuiButton Component (Parent methods are not added here, they are added in there own component definition)
	var GuiButtonObj = function(itemOrPage, type){
		// click method specific to GuiButton
		this.click = new commonFunctions(itemOrPage, type).click;
	};
	
	//Methods available to a GuiRadioButton Component (Parent methods are not added here, they are added in there own component definition)
	var GuiRadioButtonObj = function(itemOrPage, type){
		// click method specific to GuiRadioButton
		this.click = new commonFunctions(itemOrPage, type).click;
	};
	
	//Methods available to a GuiCheckBox Component (Parent methods are not added here, they are added in there own component definition)
	var GuiCheckBoxObj = function(itemOrPage, type){
		// get method specific to GuiCheckBox
		this.get = new commonFunctions(itemOrPage, type).get;
		// set method specific to GuiCheckBox
		this.set = new commonFunctions(itemOrPage, type).set;
	};
	
	//Methods available to a GuiTabStrip Component (Parent methods are not added here, they are added in there own component definition)
	var GuiTabStripObj = function(itemOrPage, type){
		// get method specific to GuiTabStrip
		this.get = new commonFunctions(itemOrPage, type).get;
	};
	
	//Methods available to a GuiTab Component (Parent methods are not added here, they are added in there own component definition)
	var GuiTabObj = function(itemOrPage, type){
		// click method specific to GuiTab
		this.click = new commonFunctions(itemOrPage, type).click;
	};
	
	//Methods available to a GuiMenu Component (Parent methods are not added here, they are added in there own component definition)
	var GuiMenuObj = function(itemOrPage, type){
		// click method specific to GuiMenu
		this.click = new commonFunctions(itemOrPage, type).click;
	};
	
	/** 
	@constructor
	Methods available to a GuiCtrlToolbar Component (Parent methods are not added here, they are added in there own component definition)
	*/
	var GuiCtrlToolbarObj = function(itemOrPage, type){
		/**
		* Click on toolbar button
		* @description Available on GridView and ToolBar controls
		* __Ex.:__
		<code javascript>
		// Click on 'Find' button of tool bar
		var sButtonId = '&FIND';
		SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.clickToolbar(sButtonId)
		</code>
		* @method clickToolbar
		* @path ctx.item.clickToolbar
		* @param {string}  buttonId Id of the button  (see [[:lib:sap:sapscripting#ctx_sapcomponent_gettoolbar| getToolbar]] method) 
		* @return {*} result
		*/
		this.clickToolbar = function (buttonId) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickToolbar', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'clickToolbar',buttonId,'','','');
		};
		
		this.clickToolbarMenuButtonByText = function(buttonId, text){
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickToolbarMenuButtonByText', '', desc);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'pressContextButton', buttonId,'','','');
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectMenuItemByText', text,'','','');
		};
		
		this.clickToolbarMenuButtonByFunCode = function (buttonId, functionCode ) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickToolbarMenuButtonByFunCode', '', desc);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'pressContextButton', buttonId,'','','');
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItem', functionCode,'','','');
		};
		
		this.clickToolbarMenuButtonByPosition = function (buttonId, pos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickToolbarMenuButtonByPosition', '', desc);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'pressContextButton', buttonId,'','','');
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItemByPosition', pos,'','','');
		};
		
		/**		
		* Deprecated since 1911 release
Selects the menu item
Similar functionality can be achieved by using either clickToolbarMenuButtonByText, clickToolbarMenuButtonByFunCode or clickToolbarMenuButtonByPosition methods
		 * TBC
		 * @deprecated since 1911 release
		* @description
		* __Ex.:__
		<code javascript>
		application.page.item.selectMenu("%GOS_TOOLBOX");
		</code>
		* @method selectMenu
		* @path ctx.item.selectMenu
		* @param {string} command
		* @return {*} result 
		*/
		this.selectMenu = function (command, byText) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectMenu', '', desc);

			var oSapFunc, sCommand;
			if (byText) {
				oSapFunc = ctx.SAPScripting.getSAPGuiFunction('selectMenuItemByText', type);	
				sCommand = oSapFunc.serializers[0](command);
				ctx.actionApp (desc, 'selectMenuItemByText', oSapFunc.name, desc.itemFullName, sCommand);
			} else {
				oSapFunc = ctx.SAPScripting.getSAPGuiFunction('selectMenuItem', type);	
				sCommand = oSapFunc.serializers[0](command);
				ctx.actionApp (desc, 'selectMenuItem', oSapFunc.name, desc.itemFullName, sCommand);
			}
			return true;
		};
		
		/**		
		* Deprecated since 1911 release 
Click the menu item		
Similar functionality can be achieved by using either clickToolbarMenuButtonByText, clickToolbarMenuButtonByFunCode or clickToolbarMenuButtonByPosition methods
		* @deprecated since 1911 release
		* @description
		* __Ex.:__
		<code javascript>
		</code>
		* @method clickMenu
		* @path ctx.item.clickMenu
		* @param {string} command
		* @return {*} result 
		*/
		this.clickMenu = function (buttonName, command) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickMenu', '', desc);

			var oSapFunc, sButtonName, sHierarchy, sCommand;

			oSapFunc = ctx.SAPScripting.getSAPGuiFunction('setFocus', type);	
			ctx.noNotify = true;
			ctx.actionApp (desc, 'setFocus', oSapFunc.name, desc.itemFullName);

			oSapFunc = ctx.SAPScripting.getSAPGuiFunction('selectItem', type);	
			sButtonName = oSapFunc.serializers[0](buttonName);
			sHierarchy = oSapFunc.serializers[1]('&Hierarchy');
			ctx.noNotify = true;
			ctx.actionApp (desc, 'selectItem', oSapFunc.name, desc.itemFullName, sButtonName, sHierarchy);

			oSapFunc = ctx.SAPScripting.getSAPGuiFunction('ensureVisibleHorizontalItem', type);	
			sButtonName = oSapFunc.serializers[0](buttonName);
			sHierarchy = oSapFunc.serializers[1]('&Hierarchy');
			ctx.noNotify = true;
			ctx.actionApp (desc, 'ensureVisibleHorizontalItem', oSapFunc.name, desc.itemFullName, sButtonName, sHierarchy);

			oSapFunc = ctx.SAPScripting.getSAPGuiFunction('itemContextMenu', type);	
			sButtonName = oSapFunc.serializers[0](buttonName);
			sHierarchy = oSapFunc.serializers[1]('&Hierarchy');
			ctx.noNotify = true;
			ctx.actionApp (desc, 'itemContextMenu', oSapFunc.name, desc.itemFullName, sButtonName, sHierarchy);

			oSapFunc = ctx.SAPScripting.getSAPGuiFunction('selectContextMenuItem', type);	
			sCommand = oSapFunc.serializers[0](command);
			ctx.noNotify = true;
			ctx.actionApp (desc, 'selectContextMenuItem', oSapFunc.name, desc.itemFullName, sCommand);

			return true;
		};
	};
	
	var GuiTableControlObj = function(itemOrPage, type){
		/**
		* Scroll down by one row
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.scrollDownByOneRow();
		</code>
		* @method scrollDownByOneRow
		* @path ctx.item.scrollDownByOneRow
		* @return {*} ...
		*/
		this.scrollDownByOneRow = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('scrollDownByOneRow', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'scrollDown', '','','','');
			return res;
		};
		
		/**
		* Scroll up by one row
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.scrollUpByOneRow();
		</code>
		* @method scrollUpByOneRow
		* @path ctx.item.scrollUpByOneRow
		* @return {*} ...
		*/
		this.scrollUpByOneRow = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('scrollUpByOneRow', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'scrollUp', '','','','');
			return res;
		};
		
		/**
		* Scroll to a particular position
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.scrollToPosition(1);
		</code>
		* @method scrollToPosition
		* @path ctx.item.scrollToPosition
		* @return {*} ...
		*/
		this.scrollToPosition = function (position) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('scrollToPosition', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'scrollToPosition', position,'','','');
			return res;
		};
		
		/**
		* Gets maximum vertical scroll offset
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.getVerticalScrollMax();
		</code>
		* @method getVerticalScrollMax
		* @path ctx.item.getVerticalScrollMax
		* @return {*} ...
		*/
		this.getVerticalScrollMax = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getVerticalScrollMax', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVerticalScrollMaxOffset', '','','','');
			return res;
		};
		
		/**
		* Gets the current position of Scroll bar
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.getVerticalScrollPosition();
		</code>
		* @method getVerticalScrollPosition
		* @path ctx.item.getVerticalScrollPosition
		* @return {*} ...
		*/
		this.getVerticalScrollPosition = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getVerticalScrollPosition', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVerticalScrollPosition', '','','','');
			return res;
		};
		
		/**
		* Gets all the visible rows that are present in the table
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.getVisibleRows();
		</code>
		* @method getVisibleRows
		* @path ctx.item.getVisibleRows
		* @return {*} Array of rows
		*/
		this.getVisibleRows = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getVisibleRows', '', desc);
			ctx.actionApp(desc, 'Lock Refresh', 'LOCKREFRESH', desc.itemFullName, '', '', '', '');
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVisibleRows', '','','','');
			ctx.actionApp(desc, 'Unlock Refresh', 'UNLOCKREFRESH', desc.itemFullName, '', '', '', '');
			
			if(res['OpCode'] == -1){
				return null;
			}
			return JSON.parse(res['Result']);
		};
		
		
		/**
		* Get a particlar row data
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.getRow(7);
		</code>
		* @method getRow
		* @path ctx.item.getRow
		* @param {number} rowNumber, the rownumber of which we want to get the values
		* @return {*} an array containing all the values present in the given row 
		*/
		this.getRow =  function(rowNumber) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getRow', '', desc);
			
			if(isNaN(rowNumber) || Number(rowNumber) < 0){
				return null;
			}
			
			if(this.scrollToPosition(rowNumber)){
				var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getRow', '','','','');
				
				if(res['OpCode'] == -1){
					return null;
				}
				return JSON.parse(res['Result']);				
			}
			else{
				return null;
			}
		};
		
		/**
		* Get column names present in the table
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.getColumnNames();
		</code>
		* @method getColumnNames
		* @path ctx.item.getColumnNames
		* @return {*} an array containing all the column names present in the table
		*/
		this.getColumnNames = function(){
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getColumnNames', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getColumnNames', '','','','');
			if(res['OpCode'] == -1){
					return null;
			}
			return JSON.parse(res['Result']);
		};

        /**
        * Scrolls to next set of visible rows present in the table
        * @description
        * __Ex.:__
        <code javascript>
        SAPLogon750.oPage.oGuiTableItem.scrollToNextPage();
        </code>
        * @method scrollToNextPage
        * @path ctx.item.scrollToNextPage
        * @return true if scroll is successful, false otherwise.
        */
        this.scrollToNextPage = function(){
            var desc = itemOrPage.getObjectDescriptor();
            ctx.notifyAction('scrollToNextPage', '', desc);
            var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'scrollToNextPage', '', '', '', '');
            if (res['OpCode'] == -1) {
                return false;
            }            
            	return JSON.parse(res['Result']);						
        };

        /**
        * Scrolls to previous set of visible rows present in the table
        * @description
        * __Ex.:__
        <code javascript>
        SAPLogon750.oPage.oGuiTableItem.scrollToPreviousPage();
        </code>
        * @method scrollToPreviousPage
        * @path ctx.item.scrollToPreviousPage
        * @return true if scroll is successful, false otherwise.
        */
        this.scrollToPreviousPage = function() {
            var desc = itemOrPage.getObjectDescriptor();
            ctx.notifyAction('scrollToPreviousPage', '', desc);
            var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'scrollToPreviousPage', '', '', '', '');
            if (res['OpCode'] == -1) {
                return false;
            }            
             return JSON.parse(res['Result']);
        };
    		
		/**
		* Gives the visible row count of the table
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.getVisibleRowCount();
		</code>
		* @method getVisibleRowCount
		* @path ctx.item.getVisibleRowCount
		* @return {number} returns the visible row count of the table
		*/
		this.getVisibleRowCount = function() {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getVisibleRowCount', '', desc);
			return Number(ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'visibleRowCount', '','','',''));
		};
		
		/**
		* select a given row
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.selectRow(15);
		</code>
		* @method selectRow
		* @path ctx.item.selectRow
		* @param {number} rowNumber for which we want to select the row
		* @return {boolean} returns true if the row can be selected else false
		*/
		this.selectRow = function(rowNumber) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectRow', '', desc);
			
			if(isNaN(rowNumber) || Number(rowNumber) < 0){
				return false;
			}
			if(!this.scrollToPosition(rowNumber)){
				return false;
			}
			
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectRow', true, 0, '', '');
			if(res['OpCode'] == -1){
				return false;
			}
			return true;				
		};
		
		/**
		* deselect a given row
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.deSelectRow(15);
		</code>
		* @method deSelectRow
		* @path ctx.item.deSelectRow
		* @param {number} rowNumber for which we want to deselect the row
		* @return {boolean} returns true if the row can be deselected else false
		*/
		this.deSelectRow = function(rowNumber) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('deSelectRow', '', desc);
			
			if(isNaN(rowNumber) || Number(rowNumber) < 0){
				return false;
			}
			if(!this.scrollToPosition(rowNumber)){
				return false;
			}
			
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectRow', false, 0, '', '');
			if(res['OpCode'] == -1){
				return false;
			}
			return true;				
		};
		
		/**
		* select a given visible row
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.selectVisibleRow(5);
		</code>
		* @method selectVisibleRow
		* @path ctx.item.selectVisibleRow
		* @param {number} rowNumber for which we want to select the row, row number can be from 0 to visibleRowCount - 1
		* @return {boolean} returns true if the row can be selected else false
		*/
		this.selectVisibleRow = function(rowNumber) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectVisibleRow', '', desc);
			
			if(isNaN(rowNumber) || Number(rowNumber) < 0){
				return false;
			}
			
			rowNumber = Number(rowNumber);
			var visibleRowCount = this.getVisibleRowCount();
			
			if(visibleRowCount==0 || rowNumber >= visibleRowCount){
				return false;
			}
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectRow', true, rowNumber, '', '');
			
			if(res['OpCode'] == -1){
				return false;
			}
			return true;
		};
		
		/**
		* deselect a given visible row
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.deSelectVisibleRow(5);
		</code>
		* @method deSelectVisibleRow
		* @path ctx.item.deSelectVisibleRow
		* @param {number} rowNumber for which we want to deselect the row, row number can be from 0 to visibleRowCount - 1
		* @return {boolean} returns true if the row can be deselected else false
		*/
		this.deSelectVisibleRow = function(rowNumber) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('deSelectVisibleRow', '', desc);
			
			if(isNaN(rowNumber) || Number(rowNumber) < 0){
				return false;
			}
			
			rowNumber = Number(rowNumber);
			var visibleRowCount = this.getVisibleRowCount();
			
			if(visibleRowCount==0 || rowNumber >= visibleRowCount){
				return false;
			}
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectRow', false, rowNumber, '', '');
			
			if(res['OpCode'] == -1){
				return false;
			}
			return true;
		};
		/**
		* select all visible rows
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.selectAllVisibleRows();
		</code>
		* @method selectAllVisibleRows
		* @path ctx.item.selectAllVisibleRows
		* @return {boolean} returns true if any of the row can be selected else false
		*/
		this.selectAllVisibleRows = function() {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectAllVisibleRows', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectAllVisibleRows', true, '', '', '');
			
			if(res['OpCode'] == -1){
					return false;
			}
			return true;		
		};
		
		/**
		* deselect all visible rows
		* @description 
		* __Ex.:__
		<code javascript>
		SAPLogon750.oPage.oGuiTableItem.deSelectAllVisibleRows();
		</code>
		* @method deSelectAllVisibleRows
		* @path ctx.item.deSelectAllVisibleRows
		* @return {boolean} returns true any of the row can be deselected else false
		*/
		this.deSelectAllVisibleRows = function() {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectAllVisibleRows', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectAllVisibleRows', false, '', '', '');
			
			if(res['OpCode'] == -1){
					return false;
			}
			return true;		
		};
	};
	
	//Methods available to a GuiCtrlTree Component (Parent methods are not added here, they are added in there own component definition)
	var GuiCtrlTreeObj = function(itemOrPage, type){
		/**
		* Gets the selected item
		* @description 
		* __Ex.:__
		<code javascript>
		</code>
		* @method selected
		* @path ctx.item.selected
		* @return {*} ...
		*/
		this.selected = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selected', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selected', '','','','');
			res = '"' + res + '"';
			return res;
		};

		/**
		* Selects/Unselect a node
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		var sNodeKey = '0000000004';
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.select(true, sNodeKey);
		</code>
		* @method select
		* @path ctx.item.select
		* @param {boolean} bSelection If true, set node as selected. It Unselects in case of false.
		* @param {string} key Node's key
		* @return {boolean} true or false
		*/
		this.select = function (bSelection, key) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('select', '', desc);
			if (key) {
				var sFunctionName = bSelection ? 'select' : 'unselect';
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, sFunctionName, key, '','','');
				return true;
			}
			return false;
		};

		/**
		* Select context menu item 
		* TBC
		* @description
		* __Ex.:__
		<code javascript>
		</code>
		* @method selectContextMenuItem
		* @path ctx.item.selectContextMenuItem
		* @param {string} command
		* @return {boolean} result 
		*/
		this.selectContextMenuItem = function (command) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectContextMenuItem', '', desc);

			ctx.noNotify = true;
			var sSelected = this.selected();
			if (sSelected) {
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'contextMenu', sSelected, '','','');
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItem', command, '','','');
				return true;
			}
			return false;
		};

		/**
		* Expands a node
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		// Expands node
		var sNodeKey = '0000000004';
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.expand(sNodeKey);

		// Question: How to know the node's key ?
		// Response: 
		//    * In the SAP Gui Application select the node
		//    * Launch the project in Desktop Studio
		//    * In code tester, execute SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.selected()
		</code>
		* @method expand
		* @path ctx.item.expand
		* @param {string} key
		* @return {*} result
		*/
		this.expand = function (key) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('expand', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'expand',key,'','','');
		};

		/**
		* Collapses a node
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		// Collapse node
		var sNodeKey = '0000000004';
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.collapse(sNodeKey);

		// Question: How to know the node's key ?
		// Response: 
		//    * In the SAP Gui Application select the node
		//    * Launch the project in Desktop Studio
		//    * In code tester, execute SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.selected()
		</code>
		* @method collapse
		* @path ctx.item.collapse
		* @param {string} key Node's key
		* @return {*} result
		*/
		this.collapse = function (key) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('collapse', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'collapse',key,'','','');
		};

		/**
		* Executes double click on a node
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		// Double click on node
		var sNodeKey = '0000000004';
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.clickDoubleNode(sNodeKey);

		// Question: How to know the node's key ?
		// Response: 
		//    * In the SAP Gui Application select the node
		//    * Launch the project in Desktop Studio
		//    * In code tester, execute SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.selected()
		</code>
		* @method clickDoubleNode
		* @path ctx.item.clickDoubleNode
		* @param {*} key Node key
		* @return {*} 
		*/
		this.clickDoubleNode = function (key) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickDoubleNode', '', desc);

			var res = false;
			if (!key) {
				key = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selected','','','','');	
			} else {
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'select', key, '','','');
			}
			if (key) {
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'clickDoubleNode', key,'','','');
				res = true;
			}
			return res;		
		};
		
		/**
		* Get node key using node text.
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		// Get Key of the node using text
		var sNodeText = 'SAP Menu';
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.getNodeKeyByText(sNodeText);
		</code>
		* @method getNodeKeyByText
		* @path ctx.item.getNodeKeyByText
		* @param {string} inputText Node text
		* @return {string} key Node key 
		*/
		this.getNodeKeyByText = function (inputText) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getNodeKeyByText', '', desc);

			ctx.actionApp(desc, 'Lock Refresh', 'LOCKREFRESH', desc.itemFullName, '', '', '', '');
			var key = '', currentText;

			if (inputText) {
				inputText = inputText.toUpperCase().trim();
				var allVisibleKeys = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getAllNodeKeys','','','','');

				for (var i = 0; i < allVisibleKeys.length; i++) {
					currentText = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getNodeTextByKey', allVisibleKeys[i],'','','');
					currentText = currentText.toUpperCase().trim();
					if (inputText === currentText) {
						key = allVisibleKeys[i];
						break;
					}
				}
			}
			ctx.actionApp(desc, 'Unlock Refresh', 'UNLOCKREFRESH', desc.itemFullName, '', '', '', '');
			return key;		
		};

		/**
		* Get node key using node path.
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		// Get Key of the node using path
		// A node path is contructed using the position of all the nodes that are transversed to reach your target node in the same sequence appended by '/'.
		// Position is nothing but the position of the node at that level in the tree
		var sNodePath = '2/1/2';
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.getNodeKeyByPath(sNodePath);
		</code>
		* @method getNodeKeyByPath
		* @path ctx.item.getNodeKeyByPath
		* @param {string} inputPath Node path
		* @return {string} key Node key 
		*/
		this.getNodeKeyByPath = function (inputPath) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getNodeKeyByPath', '', desc);
			var key = '';
			if (inputPath) {
				key = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getNodeKeyByPath', inputPath,'','','');
			}
			return key.toString();		
		};

		/**
		* Get Column Names of SAPGUI Column Tree
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.getColumnNames();
		</code>
		* @method getColumnNames
		* @path ctx.item.getColumnNames
		* @return {*} Array of column names
		*/
		this.getColumnNames = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getColumnNames', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getColumnNames', '','','','');	
		};
		
		/**
		* Tells if a SAPGUI tree is of column tree type or not.
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.isColumnTree();
		</code>
		* @method isColumnTree
		* @path ctx.item.isColumnTree
		* @return {boolean} true or false
		*/
		this.isColumnTree = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('isColumnTree', '', desc);
			return this.getTreeType() == 2;
		};
		
		/**
		* Select a Context menu item using item text
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.selectContextMenuItemByText("Logistics", "Open folder", 0)
		</code>
		* @method selectContextMenuItemByText
		* @path ctx.item.selectContextMenuItemByText
		* @param {string} nodeKey
		* @param {string} itemText Context Menu Item text
		* @param {number} columnPos Position of the Column from left (By default 0)
		* @return {boolean} result 
		*/
		this.selectContextMenuItemByText = function (nodeKey, itemText, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectContextMenuItemByText', '', desc);

			ctx.noNotify = true;
			if (nodeKey) {
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'select', nodeKey, '','','');
				if (this.isColumnTree()) {
					if (columnPos != undefined) {
						var colNames = this.getColumnNames();
						ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'itemContextMenu', nodeKey, colNames[columnPos],'','');
					}
					else {
						return false;
					}
				}
				else {
					ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'contextMenu', nodeKey, '','','');
				}
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItem', itemText, '','','');
				return true;
			}
			return false;
		};

		/**
		* Select a Context menu item using item position in the context menu
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.selectContextMenuItemByPosition('logistics', 0);
		</code>
		* @method selectContextMenuItemByPosition
		* @path ctx.item.selectContextMenuItemByPosition
		* @param {string} nodeKey
		* @param {string} itemPosition
		* @param {number} columnPos Position of the Column from left (By default 0)
		* @return {boolean} result 
		*/
		this.selectContextMenuItemByPosition = function (nodeKey, itemPosition, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectContextMenuItemByPosition', '', desc);

			ctx.noNotify = true;
			if (nodeKey) {
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'select', nodeKey, '','','');
				if (this.isColumnTree()) {
					if (columnPos != undefined) {
						var colNames = this.getColumnNames();
						ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'itemContextMenu', nodeKey, colNames[columnPos],'','');
					}
					else {
						return false;
					}
				}
				else {
					ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'contextMenu', nodeKey, '','','');
				}
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItemByPos', itemPosition, '','','');
				return true;
			}
			return false;
		};

		/**
		* Get the Tree type
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.getTreeType();
		//The returned value has the following meaning:
		//	0 : Simple tree
		//	1 : List tree
		//	2 : Column tree
		</code>
		* @method getTreeType
		* @path ctx.item.getTreeType
		* @return {number} result
		*/
		this.getTreeType = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getTreeType', '', desc);
			return Number(ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getTreeType','','','',''));
		};

		/**
		* select the node Item
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon750.pSAPEasyAccess.oSAPTableTreeControl.selectNodeItem('logistics', 0);
		</code>
		* @method selectNodeItem
		* @path ctx.item.selectNodeItem
		* @param {string} nodeKey Key of the node
		* @param {number} columnPos Position of the Column from left (Starts with 0)
		* @return {boolean} result
		*/
		this.selectNodeItem = function (nodeKey, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectNodeItem', '', desc);
			if (this.isColumnTree()) {
				var colNames = this.getColumnNames();
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectItem', nodeKey, colNames[columnPos],'','');
				return true;
			}
			return false;
		};

		/**
		* Get Text from Different Items of a node in a Column type tree
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.getNodeItemText('logistics', 0);
		</code>
		* @method getNodeItemText
		* @path ctx.item.getNodeItemText
		* @param {string} nodeKey Key of the node
		* @param {number} columnPos Position of the Column from left (Starts with 0)
		* @return {string} Text Item's text
		*/
		this.getNodeItemText = function (nodeKey, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getNodeItemText', '', desc);

			ctx.noNotify = true;
			if (this.isColumnTree()) {
				var colNames = this.getColumnNames();
				return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getItemText', nodeKey, colNames[columnPos],'','').toString();
			}
			return '';
		};

		/**
		* Click on a link of the Node's Item
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.clickNodeItemLink('logistics', 0);
		</code>
		* @method clickNodeItemLink
		* @path ctx.item.clickNodeItemLink
		* @param {string} nodeKey Key of the node
		* @param {number} columnPos Position of the Column from left (Starts with 0)
		* @return {boolean} true or false
		*/
		this.clickNodeItemLink = function (nodeKey, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickNodeItemLink', '', desc);

			ctx.noNotify = true;
			var colNames = this.getColumnNames();
			var itemType = this.getNodeItemType(nodeKey, colNames[columnPos]);
			//itemType 5 is Link
			if (this.isColumnTree() && itemType == 5) {
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'clickLink', nodeKey, colNames[columnPos],'','');
				return true;
			}
			return false;
		};

		/**
		* Press a button of the Node's Item
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.pressNodeItemButton('logistics', 0);
		</code>
		* @method pressNodeItemButton
		* @path ctx.item.pressNodeItemButton
		* @param {string} nodeKey Key of the node
		* @param {number} columnPos Position of the Column from left (Starts with 0)
		* @return {boolean} true or false
		*/
		this.pressNodeItemButton = function (nodeKey, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('pressNodeItemButton', '', desc);

			ctx.noNotify = true;
			var colNames = this.getColumnNames();
			var itemType = this.getNodeItemType(nodeKey, colNames[columnPos]);
			if (this.isColumnTree() && itemType == 4) {
					ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'pressButton', nodeKey, colNames[columnPos],'','');
					return true;
			}
			return false;
		};

		/**
		* Get Node Item Type in Column Tree
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.getNodeItemType('logistics', 0);
		//The return value has the following meaning:
		// 0: Hierarchy
		// 1: Image
		// 2: Text
		// 3: Bool
		// 4: Button
		// 5: Link
		</code>
		* @method getNodeItemType
		* @path ctx.item.getNodeItemType
		* @param {string} nodeKey Key of the node
		* @param {number} column Column name
		* @return {number} node Item type
		*/
		this.getNodeItemType = function (nodeKey, column) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getNodeItemType', '', desc);

			ctx.noNotify = true;
			if (this.isColumnTree()) {
				return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getItemType', nodeKey, column,'','').toString();
			}
			return -1;
		};

		/**
		* Double click on a node item of a column tree
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.doubleClickNodeItem('logistics', 0);
		</code>
		* @method doubleClickNodeItem
		* @path ctx.item.doubleClickNodeItem
		* @param {string} nodeKey Key of the node
		* @param {number} columnPos Position of the Column from left (Starts with 0)
		* @return {boolean} result
		*/
		this.doubleClickNodeItem = function (nodeKey, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('doubleClickNodeItem', '', desc);

			ctx.noNotify = true;
			if (this.isColumnTree()) {
				var colNames = this.getColumnNames();
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'doubleClickItem', nodeKey, colNames[columnPos],'','');
				return true;
			}
			return false;
		};

		/**
		* Get CheckBox State
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.isChecked('logistics', 0);	
		</code>
		* @method isChecked
		* @path ctx.item.isChecked
		* @param {string} nodeKey Key of the node
		* @param {number} columnPos Position of the Column (Starts with 0)
		* @return {*} true or false
		*/
		this.isChecked = function (nodeKey, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('isChecked', '', desc);

			ctx.noNotify = true;
			var colNames = this.getColumnNames();
			var itemType = this.getNodeItemType(nodeKey, colNames[columnPos]);
			//itemType 3 is checkbox
			if (this.isColumnTree() && itemType == 3) {
				return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getCheckBoxState', nodeKey, colNames[columnPos],'','') == 'True';
			}
			return '';
		};

		/**
		* Check the CheckBox
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.check('logistics', 0);
		</code>
		* @method check
		* @path ctx.item.check
		* @param {string} nodeKey Key of the node
		* @param {number} columnPos Position of the Column (Starts with 0)
		* @return {boolean} result
		*/
		this.check = function (nodeKey, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('check', '', desc);

			ctx.noNotify = true;
			var colNames = this.getColumnNames();
			var itemType = this.getNodeItemType(nodeKey, colNames[columnPos]);
			//itemType 3 is checkbox
			if (this.isColumnTree() && itemType == 3) {
				var curState = this.isChecked(nodeKey, columnPos);
				if (curState === false) {
					ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setCheckBoxState', nodeKey, colNames[columnPos], 1,'');
					return true;
				}
			}
			return false;
		};

		/**
		* UnCheck the CheckBox
		* @description Available on Tree View Control
		* __Ex.:__
		<code javascript>
		SAPLogon760.pSAPEasyAccess.oSAPTableTreeControl.unCheck('logistics', 0);
		</code>
		* @method unCheck
		* @path ctx.item.unCheck
		* @param {string} nodeKey Key of the node
		* @param {number} columnPos Position of the Column (Starts with 0)
		* @return {boolean} result
		*/
		this.unCheck = function (nodeKey, columnPos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('unCheck', '', desc);

			ctx.noNotify = true;
			var colNames = this.getColumnNames();
			var itemType = this.getNodeItemType(nodeKey, colNames[columnPos]);
			//itemType 3 is checkbox
			if (this.isColumnTree() && itemType == 3) {
				var curState = this.isChecked(nodeKey, columnPos);
				if (curState === true) {
					ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setCheckBoxState', nodeKey, colNames[columnPos], 0,'');
					return true;
				}
			}
			return false;
		};
	};
	
	/**
	@constructor
	Methods available to a GuiCtrlGridView Component (Parent methods are not added here, they are added in there own component definition)
	*/
	var GuiCtrlGridViewObj =  function(itemOrPage, type){
		this.clickToolbar = function (buttonId) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickToolbar', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'clickToolbar',buttonId,'','','');
		};

		/**
		* Click on a toolbar button type menu 
		* @method clickToolbarMenuButtonByText		
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
		SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.clickToolbarMenuButtonByText('DETAIL_MENU', 'Table Definition');
		</code>

		* @path ctx.item.clickToolbarMenuButtonByText
		* @param {string} buttonId
		* @param {string} text
		* @return {*} ...
		*/
		this.clickToolbarMenuButtonByText = function (buttonId, text) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickToolbarMenuButtonByText', '', desc);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'pressToolbarContextButton', buttonId,'','','');
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItemByText', text,'','','');
		};

		/**
		* Click on a toolbar button type menu, 
		* @method clickToolbarMenuButtonByPosition		
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
				SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.clickToolbarMenuButtonByPosition('DETAIL_MENU', '2');
		</code>

		* @path ctx.item.clickToolbarMenuButtonByPosition
		* @param {string} buttonId
		* @param {string} pos
		* @return {*} ...
		*/
		this.clickToolbarMenuButtonByPosition = function (buttonId, pos) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickToolbarMenuButtonByPosition', '', desc);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'pressToolbarContextButton', buttonId,'','','');
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItemByPosition', pos,'','','');
		};

		/**
		* Click on a toolbar button type menu
		* @method clickToolbarMenuButtonByFunCode		
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
				SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.clickToolbarMenuButtonByFunCode('DETAIL_MENU', 'TABLDEFI');
		</code>

		* @path ctx.item.clickToolbarMenuButtonByFunCode
		* @param {string} buttonId
		* @param {string} functionCode 
		* @return {*} ...
		*/
		this.clickToolbarMenuButtonByFunCode = function (buttonId, functionCode ) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickToolbarMenuButtonByFunCode', '', desc);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'pressToolbarContextButton', buttonId,'','','');
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItem', functionCode,'','','');
		};

		/**
		* Deprecated since 1911 release.
Similar functionality can be achieved by using either clickToolbarMenuButtonByText, clickToolbarMenuButtonByFunCode or clickToolbarMenuButtonByPosition methods.
		* @deprecated since 1911 release.
		* @description
		* __Ex.:__
		<code javascript>
		</code>
		
		* @method selectContextMenuItem
		* @path ctx.item.selectContextMenuItem
		* @param {string} command
		* @return {boolean} result 
		*/
		this.selectContextMenuItem = function (command) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectContextMenuItem', '', desc);

			ctx.noNotify = true;
			var sSelected = this.selected();
			if (sSelected) {
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'contextMenu', sSelected, '','','');
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectContextMenuItem', command, '','','');
				return true;
			}
			return false;
		};
		
		/**
		* Get Component's Toolbar
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
			var oToolbar = SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.getToolbar();
		</code>
		* @method getToolbar
		* @path ctx.item.getToolbar
		* @return {*} result string containing value in JSON format
		*/
		this.getToolbar = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getToolbar', '', desc);
			
			var aToolbar = [];
			var i, sText, sId, bEnabled, sTooltip, sType;
			var count = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getToolbar','','','','');
			for (i = 0; i < count; i++) {
				sText = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getToolbarButtonText', i, '','','');
				bEnabled = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getToolbarButtonEnabled', i, '','','');
				sId = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getToolbarButtonId', i, '','','');
				sTooltip = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getToolbarButtonTooltip', i, '','','');
				sType = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getToolbarButtonType', i, '','','');
				aToolbar.push({
					index: i,
					id: sId,
					text: sText,
					tooltip: sTooltip,
					enabled: bEnabled,
					type: sType
				});
			}
			return aToolbar;
		};

		/**
		* Gets column keys
		* @method getColumns
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
				var aColumns = SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.getColumns();
		</code>
		* @path ctx.item.getColumns
		* @return {*} ...
		*/
		this.getColumns = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getColumns', '', desc);
			var oColumns = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getColumns', '','','','');
			return oColumns;
		};

		/**
		* Returns row values
		* @method getRow		
		* @description Available on Grin View Control
		* __Ex.:__
		<code javascript>
				var aRow = SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.getRow(2);
		</code>
		* @path ctx.item.getRow
		* @param {number} row Row index
		* @return {*} ...
		*/
		this.getRow = function (row) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getRow', '', desc);
			
			// Get Columns
			ctx.noNotify = true;
			var aColumns = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getColumns', '','','','');

			// Set row on top
			ctx.noNotify = true;
			var firstVisible = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setFirstVisibleRow', row,'','','');

			var aResult = [];
			var i, count = aColumns.length;
			var cVal;
			for(i = 0; i<count; i++) {
				ctx.noNotify = true;
				cVal = this.getCell(row, aColumns[i]);
				aResult.push(cVal);
			}
			return aResult;
		};

		/**
		* Gets row count
		* @method getRowCount		
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
		</code>
		* @path ctx.item.getRowCount
		* @return {*} ...
		*/
		this.getRowCount = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getRowCount', '', desc);
			var count = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getRowCount', '','','','');
			return count;
		};
		
		/**
		* Get a specified set of rows
		* @method getRows		
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
			SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.oPane.getRows(2, 10);
		</code>
		* @path ctx.item.getRows
		* @param {number} startRow Starting Row (Default: 0)
		* @param {number} numRows Number of Rows (Default: All Rows)
		* @return {*} Array of rows
		*/
		this.getRows = function (startRow, numRows) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getRows', '', desc);
			ctx.actionApp(desc, 'Lock Refresh', 'LOCKREFRESH', desc.itemFullName, '', '', '', '');
			var tRowCount = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getRowCount', '','','','');
			var aColumns = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getColumns', '','','','');
			var vRowCount = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVisibleRowCount', '','','','');
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setFirstVisibleRow',startRow,'','','');
			ctx.noNotify = true;
			var aResult;
			var i, j, count = aColumns.length;
			var cVal;
			var rows = [];
			if (startRow >= tRowCount || (numRows + startRow) > tRowCount){
				return rows;
			}
			if (startRow == undefined){
				startRow = 0;
			}				
			if (numRows == undefined){
				numRows = Number(tRowCount) - startRow;
			}
			startRow = Number(startRow);
			numRows = Number(numRows);
			var prevFirst = startRow;
			for(i = startRow; i<(startRow + numRows); i++)
			{
				aResult = [];
				cVal = 0;
				for(j = 0; j<count; j++) {
					cVal = this.getCell(i, aColumns[j]);
					aResult.push(cVal);
				}
				rows.push(aResult);
				if ((i - prevFirst) == vRowCount - 1){
					ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setFirstVisibleRow',i+1,'','','');
					prevFirst = i+1;
				}
			}
			ctx.actionApp(desc, 'Unlock Refresh', 'UNLOCKREFRESH', desc.itemFullName, '', '', '', '');
			return rows;
		};
		
		/**
		* Gets the currently visible rows on the screen
		* @method getVisibleRows		
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
			SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.getVisibleRows();
		</code>
		* @path ctx.item.getVisibleRows
		* @return {*} Array of Rows
		*/
		this.getVisibleRows = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getVisibleRows', '', desc);
			ctx.actionApp(desc, 'Lock Refresh', 'LOCKREFRESH', desc.itemFullName, '', '', '', '');
			var vRowCount = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVisibleRowCount', '','','','');
			var aColumns = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getColumns', '','','','');
			ctx.noNotify = true;
			var firstVisible = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getFirstVisibleRow','','','','');
			var aResult;
			var i, j, count = aColumns.length;
			var cVal;
			var rows = [];
			for(i = 0; i<vRowCount; i++)
			{
				aResult = [];
				cVal = 0;
				for(j = 0; j<count; j++) {
					cVal = this.getCell((Number(firstVisible) + i), aColumns[j]);
					aResult.push(cVal);
				}
				rows.push(aResult);
			}
			ctx.actionApp(desc, 'Unlock Refresh for Get Rows', 'UNLOCKREFRESH', desc.itemFullName, '', '', '', '');
			return rows;
		};
		
		/**
		* Get a specified set of rows of values of a column
		* @method getRowsByColumn		
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
			SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.oPane.getRowsByColumn(columnId,2, 10);
		</code>
		* @path ctx.item.getRowsByColumn
		* @param {string} columnId Column ID
		* @param {number} startRow Starting Row (Default: 0)
		* @param {number} numRows Number of Rows (Default: All Rows)
		* @return {*} Array of rows
		*/
		this.getRowsByColumn = function (columnId, startRow, numRows) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getRowsByColumn', '', desc);
			ctx.actionApp(desc, 'Lock Refresh', 'LOCKREFRESH', desc.itemFullName, '', '', '', '');
			var tRowCount = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getRowCount', '','','','');
			var vRowCount = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getVisibleRowCount','','','','');
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setFirstVisibleRow',startRow,'','','');
			var aResult;
			var i;
			var cVal;
			var rows = [];
			if (startRow >= tRowCount || (numRows + startRow) > tRowCount){
				return rows;
			}
			if (startRow == undefined){
				startRow = 0;
			}
			if (numRows == undefined){
				numRows = Number(tRowCount) - startRow;
			}
			startRow = Number(startRow);
			numRows = Number(numRows);
			var prevFirst = startRow;
			for(i = startRow; i<(startRow + numRows); i++)
			{
				cVal = this.getCell(i, String(columnId));
				rows.push(cVal);
				if ((i - prevFirst) == vRowCount - 1){
					ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setFirstVisibleRow',i+1,'','','');
					prevFirst = i+1;
				}
			}
			ctx.actionApp(desc, 'Unlock Refresh', 'UNLOCKREFRESH', desc.itemFullName, '', '', '', '');
			return rows;
		};
		
		/**
		* Select a cell
		* @description Availavle on Grid View Control
		* __Ex.:__
		<code javascript>
		</code>
		* @method selectCell
		* @path ctx.item.selectCell
		* @param {*} row Row index
		* @param {*} col Column key
		* @return {*} ...
		*/
		this.selectCell = function (row, col) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectCell', '', desc);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectRow', row,'','','');
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectCol', col,'','','');
		};
		  
		/**
		* Set the Selected row
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
		</code>
		* @method selectRow
		* @path ctx.item.selectRow
		* @param {number} row Row index
		* @return {boolean} true or false
		*/
		this.selectRow = function (row) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectRow', '', desc);
			var count = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getRowCount', row,'','','');
			if (row < count) {
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectRow', row,'','','');
				ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setSelectedRows', row,'','','');
				return true;
			}
			return false;
		}; 
 	
		/**
		* Gets the selected row
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
		</code>
		* @method selectedRow
		* @path ctx.item.selectedRow
		* @return {*} ...
		*/
		this.selectedRow = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectedRow', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectedRow','','','','');
		};

		/**
		* Gets the selected column
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
		</code>
		* @method selectedCol
		* @path ctx.item.selectedCol
		* @return {*} ...
		*/
		this.selectedCol = function () {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectedCol', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectedCol','','','','');
		};

		/**
		* Gets cell value
		* @method getCell		
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>

		// Retrieves All columns 
		var aColumns = SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.getColumns();

		// Get value of 2nd cell of first row
		var nRow = 0;
		var sCol = aColumns[1];
		SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.getCell(nRow, sCol);
		</code>
		* @path ctx.item.getCell
		* @param {number} row Row index
		* @param {string} col Column key
		* @return {*} Cell value
		*/
		this.getCell = function (row, col) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getCell', '', desc);
			this.selectCell(row, col);
			var oCellValue = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getCellValue', row,col,'','');
			return oCellValue;
		};
		
		/**
		* Sets cell value
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
		</code>
		* @method setCell
		* @path ctx.item.setCell
		* @param {string} value
		* @param {number} row
		* @param {number} col
		* @return {boolean} ...
		*/
		this.setCell = function (value, row, col) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('setCell', '', desc);
			this.selectCell(row, col);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setFirstVisibleRow', row, '', '', '');
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setCell', row, col, value, '');
			return true;
		};
		
		/**
		* Executes click on a cell
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
		// To simulate a click on 2nd cell of first row
		
		// Retrieve All columns 
		var aColumns = SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.getColumns();

		// Click on cell
		var nRow = 0;
		var sCol = aColumns[1];
		SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.clickCell(nRow, sCol);
		</code>
		* @method clickCell
		* @path ctx.item.clickCell
		* @param {number} row Row index
		* @param {string} col Column key
		* @return {*} 
		*/
		this.clickCell = function (row, col) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickCell', '', desc);
			var result = this.selectCell(row, col);
			ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'clickCurrentCell', '', '', '', '');
			return result;
		};

		/**
		* Executes double click on a cell
		* @description Available on Grid View Control
		* __Ex.:__
		<code javascript>
		// To simulate a double click on 2nd cell of first row
		
		// Retrieve All columns 
		var aColumns = SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.getColumns();

		// Double click on cell
		var nRow = 0;
		var sCol = aColumns[1];
		SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.clickDoubleCell(nRow, sCol);
		</code>
		* @method clickDoubleCell
		* @path ctx.item.clickDoubleCell
		* @param {number} row Row index
		* @param {string} col Column key
		* @return {*} 
		*/
		this.clickDoubleCell = function (row, col) {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('clickDoubleCell', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'doubleClick', row, col,'','');
		};
		

		/**
		* Select all rows of gridview pane
		* @method SelectAllRows		
		* @description Available on Grid View Control and Pane
		* __Ex.:__
		<code javascript>
			SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.selectAllRows();
			SAPLogon750.pTCURRDisplayOfEnt.oPane.selectAllRows();
		</code>
		* @path ctx.item.selectAllRows
		*/
		this.selectAllRows = function(){
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('selectAllRows', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'selectAllRows', '', '','','');
		}

		/**
		* Clear row selection if any or all rows are selected of gridview pane
		* @method deselectAllRows		
		* @description Available on Grid View Control and Pane
		* __Ex.:__
		<code javascript>
			SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.deselectAllRows();
			SAPLogon750.pTCURRDisplayOfEnt.oPane.deselectAllRows();
		</code>
		* @path ctx.item.deselectAllRows
		*/
		this.deselectAllRows = function(){
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('deselectAllRows', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'deselectAllRows', '', '','','');
		}

		/**
		* Click the button in cell
		* @method clickButtonCell
		* @description Available on Grid View Control and Pane
		* __Ex.:__
		<code javascript>
			SAPLogon750.pTCURRDisplayOfEnt.oSAPGUIGridViewCtrl1.clickButtonCell();
			SAPLogon750.pTCURRDisplayOfEnt.oPane.clickButtonCell();
		</code>			    
		* @path ctx.item.clickButtonCell
		* @param {number} row Row index
		* @param {string} col Column key
		* @return {*}
		*/
		this.clickButtonCell = function (row, col) {
			var desc = itemOrPage.getObjectDescriptor();
			this.selectCell(row, col);
			ctx.notifyAction('clickButtonCell', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'pressButtonCurrentCell', '', '', '', '');
		}
		
	};
	
	//Methods available to GUIGridView toolbar custom types
	var GUIGridViewBasicCustomTypeObj =  function(itemOrPage, type){
		var gridViewObj = new GuiCtrlGridViewObj(itemOrPage, 'GuiCtrlGridView');
		
		this.click = function(){
			gridViewObj.clickToolbar("%Id%");
		};
	};
	
	//Methods available to GUIGridViewButtonAndMenu custom type
	var GUIGridViewButtonAndMenuObj = function(itemOrPage, type){
		var gridViewObj = new GuiCtrlGridViewObj(itemOrPage, 'GuiCtrlGridView');
		
		this.click = function(){
			gridViewObj.clickToolbar("%Id%");
		};
		
		this.selectToolbarMenuButtonByText =  function(text){
			gridViewObj.clickToolbarMenuButtonByText("%Id%", text);
		};
		
		this.selectToolbarMenuButtonByPosition =  function(position){
			gridViewObj.clickToolbarMenuButtonByPosition("%Id%", position);
		};
		
		this.selectToolbarMenuButtonByFunCode = function(menuItemId){
			gridViewObj.clickToolbarMenuButtonByFunCode("%Id%", menuItemId);
		};
	};
	
	//Methods available to GUIGridViewMenu custom type
	var GUIGridViewMenuObj = function(itemOrPage, type){
		var gridViewObj = new GuiCtrlGridViewObj(itemOrPage, 'GuiCtrlGridView');
		
		this.selectToolbarMenuButtonByText =  function(text){
			gridViewObj.clickToolbarMenuButtonByText("%Id%", text);
		};
		
		this.selectToolbarMenuButtonByPosition =  function(position){
			gridViewObj.clickToolbarMenuButtonByPosition("%Id%", position);
		};
		
		this.selectToolbarMenuButtonByFunCode = function(menuItemId){
			gridViewObj.clickToolbarMenuButtonByFunCode("%Id%", menuItemId);
		};
	};
	
	//Methods available to GUIGridViewPane custom type
	var GUIGridViewPaneObj = function(itemOrPage, type){
		var gridViewObj = new GuiCtrlGridViewObj(itemOrPage, 'GuiCtrlGridView');
		
		this.getColumns = gridViewObj.getColumns;
		this.getRow = gridViewObj.getRow;
		this.getRows = gridViewObj.getRows;
		this.getVisibleRows = gridViewObj.getVisibleRows;
		this.getRowsByColumn = gridViewObj.getRowsByColumn;
		this.getRowCount = gridViewObj.getRowCount;
		this.selectCell = gridViewObj.selectCell;
		this.selectRow = gridViewObj.selectRow;
		this.selectedRow =  gridViewObj.selectedRow;
		this.selectedCol = gridViewObj.selectedCol;
		this.getCell = gridViewObj.getCell;
		this.setCell =  gridViewObj.setCell;
		this.clickCell = gridViewObj.clickCell;
		this.clickDoubleCell = gridViewObj.clickDoubleCell;
		this.selectAllRows = gridViewObj.selectAllRows;
		this.deselectAllRows = gridViewObj.deselectAllRows;
		this.clickButtonCell = gridViewObj.clickButtonCell;
	};
	
	//Methods available to GUICtrlToolbar custom types
	var GUICtrlToolbarBasicCustomObj = function(itemOrPage, type){
		var gridToolbarObj = new GuiCtrlToolbarObj(itemOrPage, 'GuiCtrlToolbar');
		this.click = function(){
			gridToolbarObj.clickToolbar("%Id%");
		};
	};
	
	//Methods available to GUICtrlToolbarButtonAndMenu custom type
	var GUICtrlToolbarButtonAndMenuObj = function(itemOrPage, type){
		var gridToolbarObj = new GuiCtrlToolbarObj(itemOrPage, 'GuiCtrlToolbar');
		
		this.click = function(){
			gridToolbarObj.clickToolbar("%Id%");
		};
		
		this.selectToolbarMenuButtonByText =  function(text){
			gridToolbarObj.clickToolbarMenuButtonByText("%Id%", text);
		};
		
		this.selectToolbarMenuButtonByPosition =  function(position){
			gridToolbarObj.clickToolbarMenuButtonByPosition("%Id%", position);
		};
		
		this.selectToolbarMenuButtonByFunCode = function(menuItemId){
			gridToolbarObj.clickToolbarMenuButtonByFunCode("%Id%", menuItemId);
		};
	};
	
	//Methods available to GUICtrlToolbarMenu custom type
	var GUICtrlToolbarMenuObj = function(itemOrPage, type){
		var gridToolbarObj = new GuiCtrlToolbarObj(itemOrPage, 'GuiCtrlToolbar');
		
		this.selectToolbarMenuButtonByText =  function(text){
			gridToolbarObj.clickToolbarMenuButtonByText("%Id%", text);
		};
		
		this.selectToolbarMenuButtonByPosition =  function(position){
			gridToolbarObj.clickToolbarMenuButtonByPosition("%Id%", position);
		};
		
		this.selectToolbarMenuButtonByFunCode = function(menuItemId){
			gridToolbarObj.clickToolbarMenuButtonByFunCode("%Id%", menuItemId);
		};
	};
	
	//Methods available to GuiCtrlCalendar custom type
	var GuiCtrlCalendarObj = function(itemOrPage, type){
					
		/**
		* Gets selected date in "YYYYMMDD" format
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.getDate();
		</code>
		* @method getDate
		* @path ctx.item.getDate		
		* @return {string} Selected date in "YYYYMMDD" format
		*/
		this.getDate = function () {
			var desc = itemOrPage.getObjectDescriptor();			
			ctx.notifyAction('getDate', '', desc);			
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getDate','','','','').toString();
		};

		/**
		* Selects date given in "YYYYMMDD" format
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.selectDate();
		</code>
		* @method selectDate
		* @param {string} date - "YYYYMMDD" format
		* @path ctx.item.selectDate		
		*/
		this.selectDate = function (date) {
			var desc = itemOrPage.getObjectDescriptor();
			var inputRange = date.concat(",",date);
			ctx.notifyAction('selectDate', '', desc);			
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setDateRange',inputRange,'','','');
		};
		
		/**
		* Gets selected date range in "YYYYMMDD" format split by comma
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.getDateRange();
		</code>
		* @method getDateRange		
		* @path ctx.item.getDateRange
		* @return {string} Selected date range in "YYYYMMDD" format split by comma
		*/
		this.getDateRange = function () {
			var desc = itemOrPage.getObjectDescriptor();			
			ctx.notifyAction('getDateRange', '', desc);			
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'getDateRange','','','','').toString();
		};
		
		/**
		* Selects date range given in "YYYYMMDD" format
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.selectDateRange();
		</code>
		* @method selectDateRange	
		* @param {string} fromDate - "YYYYMMDD" format		
		* @param {string} toDate - "YYYYMMDD" format
		* @path ctx.item.selectDateRange		
		*/
		this.selectDateRange = function (fromDate, toDate) {
			var desc = itemOrPage.getObjectDescriptor();
			var inputRange = fromDate.concat(",",toDate);
			ctx.notifyAction('selectDateRange', '', desc);			
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'setDateRange',inputRange,'','','');
		}				
	};
	
	//Methods available to GuiStatusBar custom type
	var GuiStatusBarObj = function(itemOrPage, type) {
		
		/**
		* Provides the name of the message class used in the ABAP message call.
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.getMessageId();
		</code>
		* @method getMessageId	
		* @path ctx.item.getMessageId		
		* @return {string} name of the message class used in the ABAP message call
		*/
		this.getMessageId = function() {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getMessageId', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'messageId', '','','','').toString();
		};
		
		/**
		* Provides the name of the message number used in the ABAP message call. It will usually be a number, but this is not enforced by the system.
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.getMessageNumber();
		</code>
		* @method getMessageNumber	
		* @path ctx.item.getMessageNumber		
		* @return {string} name of the message number used in the ABAP message call
		*/
		this.getMessageNumber = function() {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getMessageNumber', '', desc);
			return ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'messageNumber', '','','','').toString();
		};
		
		/**
		* provides message type i.e Success, Warning, Error, Abort, Information
		* @description
		* __Ex.:__
		<code javascript>
		SAPLogon750App.pSAPEasyAccess.oItem.getMessageType();
		</code>
		* @method getMessageType	
		* @path ctx.item.getMessageType		
		* @return {string} message type i.e Success, Warning, Error, Abort, Information
		*/
		this.getMessageType = function() {
			var desc = itemOrPage.getObjectDescriptor();
			ctx.notifyAction('getMessageType', '', desc);
			var res = ctx.SAPScripting.executeSAPGuiFunction(desc, type, 'messageType', '','','','');
			switch(res) {
				case 'S':
					return "Success";
					break;
				case 'W':
					return "Warning";
					break;
				case 'E':
					return "Error";
					break;
				case 'A':
					return "Abort";
					break;
				case 'I':
					return "Information";
					break;
				default:
					return "";
			}
		};
	}
	
	var _SAPGUItypes = {
		GuiUnknown: {
			id: -1
		},
		GuiComponent: {
			id: 0
		},
		GuiVComponent: {
			id: 1,
			componentFunc: GuiVComponentObj,
			parents: [
				'GuiComponent'
			],
			map: {
				dump: {
					name: 'DumpState',
					type: 'method',
					input: [
						'string'
					],
					output: 'object'
				},
				showContextMenu: {
					name: 'ShowContextMenu',
					type: 'method'
				},
				exist: {
					name: 'Exist',
					type: 'attribute',
					output: 'boolean'
				},
				setFocus: {
					name: 'SetFocus',
					type: 'method'
				},
				get: {
					name: 'Text',
					type: 'attribute',
					output: 'string'
				},
				set: {
					name: 'Text',
					type: 'attribute',
					input: [
						'string'
					],
					output: 'string'
				},
				getIconName: {
					name: 'get_IconName',
					type: 'attribute',
					output: 'string'
				}
			}
		},
		GuiVContainer: {
			id: 2,
			parents: [
				'GuiVComponent'
			],
			map: {
				findById: {
					name: 'FindById',
					type: 'method',
					input: [
						'string'
					],
					output: 'object'
				},
				findByName: {
					name: 'FindByName',
					type: 'method',
					input: [
						'string'
					],
					output: 'object'
				},
				findByNameEx: {
					name: 'FindByNameEx',
					type: 'method',
					input: [
						'string'
					],
					output: 'object'
				},
				findAllByName: {
					name: 'FindAllByName',
					type: 'method',
					input: [
						'string'
					],
					output: 'object'
				},
				findAllByNameEx: {
					name: 'FindAllByNameEx',
					type: 'method',
					input: [
						'string'
					],
					output: 'object'
				}
			}
		},
		GuiApplication: {
			id: 10,
			parents: [
				'GuiComponent',
				'GuiContainer'
			]
		},
		GuiConnection: {
			id: 11,
			parents: [
				'GuiComponent',
				'GuiContainer'
			]
		},
		GuiSession: {
			id: 12,
			parents: [
				'GuiComponent',
				'GuiContainer'
			],
			map: {
				findByPosition: {
					name: 'FindByPosition',
					type: 'method'
				}
			}
		},
		GuiFrameWindow: {
			id: 20,
			componentFunc: GuiFrameWindowObj,
			prefix: 'wnd',
			parents: [
				'GuiVContainer'
			],
			map: {
				hwnd: {
					name: 'Handle',
					type: 'attribute',
					output: 'number'
				},
				wait: {
					name: 'Wait',
					type: 'method'
				},
				iconify: {
					name: 'Iconify',
					type: 'method'
				},
				keyStroke: {
					name: 'SendVKey',
					type: 'method',
					input: ['number']
				},
				screenshot: {
					name: 'HardCopy',
					type: 'method',
					input: [
						'string',
						'number'
					],
					output: 'string'
				},
				restore: {
					name: 'Restore',
					type: 'method'
				},
				minimize: {
					name: 'Iconify',
					type: 'method'
				},
				maximize: {
					name: 'Maximize',
					type: 'method'
				},
				startTransaction: {
					name: 'STARTTRANSACTION',
					type: 'method',
					input: [
					'string'
					],
					output: 'boolean'
				},
				endTransaction: {
					name: 'ENDTRANSACTION',
					type: 'method',
					output: 'boolean'
				},	
				createSession: {
					name: 'CREATESESSION',
					type: 'method',
					output: 'boolean'
				},
				close: {
					name: 'Close',
					type: 'method'
				}
			}
		},
		GuiMainWindow: {
			id: 21,
			componentFunc: GuiMainWindowObj,
			prefix: 'wnd',
			parents: [
				'GuiFrameWindow'
			],
			map: {
				setAutomationConnection: {
					name: 'SETAUTOMATIONCONNECTION',
					type: 'method'
				},
				setBusyWaitTime: {
					name: 'SETBUSYWAITTIME',
					type: 'method',
					input: ['number']
				},
				resetBusyWaitTime: {
					name: 'RESETBUSYWAITTIME',
					type: 'method'
				}
			}
		},
		GuiModalWindow: {
			id: 22,
			prefix: 'wnd',
			parents: [
				'GuiFrameWindow'
			]
		},
		GuiMessageWindow: {
			id: 23
		},
		GuiLabel: {
			id: 30,
			prefix: 'lbl',
			parents: [
				'GuiVComponent'
			]
		},
		GuiTextField: {
			id: 31,
			prefix: 'txt',
			componentFunc: GuiTextFieldObj,
			parents: [
				'GuiVComponent'
			],
			map: {
				setCaretPosition: {
					name: 'set_CaretPosition',
					type: 'attribute',
					input: [
						'number'
					]
				}
			}
		},
		GuiCTextField: {
			id: 32,
			prefix: 'ctxt',
			parents: [
				'GuiTextField'
			]
		},
		GuiPasswordField: {
			id: 33,
			prefix: 'pwd',
			parents: [
				'GuiTextField'
			]
		},
		GuiComboBox: {
			id: 34,
			componentFunc: GuiComboBoxObj,
			prefix: 'cmb',
			parents: [
				'GuiVComponent'
			],
			map: {
				get: {
					name: 'Key',
					type: 'attribute',
					output: 'string'
				},
				set: {
					name: 'Key',
					type: 'attribute',
					input: [
						'string'
					],
					output: 'string'
				}
			}
		},
		GuiOkCodeField: {
			id: 35,
			prefix: 'okcd',
			parents: [
				'GuiVComponent'
			]
		},
		GuiButton: {
			id: 40,
			componentFunc: GuiButtonObj,
			parents: [
				'GuiVComponent'
			],
			map: {
				click: {
					name: 'Press',
					type: 'asyncmethod'
				}
			}
		},
		GuiRadioButton: {
			id: 41,
			componentFunc: GuiRadioButtonObj,
			prefix: 'rad',
			parents: [
				'GuiVComponent'
			],
			map: {
				click: {
					name: 'Select',
					type: 'method'
				}
			}
		},
		GuiCheckBox: {
			id: 42,
			componentFunc: GuiCheckBoxObj,
			prefix: 'chk',
			parents: [
				'GuiVComponent'
			],
			map: {
				check: {
					name: 'Selected',
					type: 'attribute',
					input: [
						'boolean'
					],
					output: 'boolean'
				},
				get: {
					name: 'Selected',
					type: 'attribute',
					output: 'boolean'
				},
				set: {
					name: 'Selected',
					type: 'attribute',
					input: [
						'boolean'
					],
					output: 'boolean'
				}
			}
		},
		GuiStatusPane: {
			id: 43,
			prefix: 'pane',
			parents: [
				'GuiVComponent'
			]
		},
		GuiCustomControl: {
			id: 50,
			prefix: 'cntl',
			parents: [
				'GuiVContainer'
			]
		},
		GuiContainerShell: {
			id: 51,
			prefix: 'shellcont',
			parents: [
				'GuiVContainer'
			]
		},
		GuiBox: {
			id: 62,
			prefix: 'btn',
			parents: [
				'GuiVComponent'
			]
		},
		GuiContainer: {
			id: 70,
			parents: [
				'GuiComponent'
			],
			map: {
				findById: {
					name: 'FindById',
					type: 'method',
					input: [
						'string'
					],
					output: 'object'
				}
			}
		},
		GuiSimpleContainer: {
			id: 71,
			prefix: 'sub',
			parents: [
				'GuiVContainer'
			]
		},
		GuiScrollContainer: {
			id: 72,
			prefix: 'ssub',
			parents: [
				'GuiVContainer'
			]
		},
		GuiListContainer: {
			id: 73
		},
		GuiUserArea: {
			id: 74,
			componentFunc: GuiUserAreaObj,
			prefix: 'usr',
			parents: [
				'GuiVContainer'
			],
			map: {
				getVerticalScrollMaxOffset: {
					name: 'GETMAXSCROLLOFFSET',
					type: 'method',
					output: 'number'
				},
				getVerticalScrollPosition: {
					name: 'GETVERTICALSCROLLPOSITION',
					type: 'method',
					output: 'number'
				}
			}
		},
		GuiSplitterContainer: {
			id: 75,
			prefix: 'splitcont',
			parents: [
				'GuiVContainer'
			]
		},
		GuiTableControl: {
			id: 80,
			componentFunc: GuiTableControlObj,
			prefix: 'tbl',
			parents: [
				'GuiVContainer'
			],
			map: {
				cols: {
					name: 'Columns',
					type: 'attribute',
					output: 'object'
				},
				rows: {
					name: 'Rows',
					type: 'attribute',
					output: 'object'
				},
				scrollDown: {
					name: 'SCROLLDOWN',
					type: 'method',
			    		output: "boolean"
				},
				scrollUp: {
					name: 'SCROLLUP',
					type: 'method',
					output: 'boolean'
				},
				scrollToPosition: {
					name: 'SCROLLTOPOSITION',
					type: 'method',
					input: [
					 'number'
					],
					output: 'boolean'
				},
				getVerticalScrollMaxOffset: {
					name: 'GETMAXSCROLLOFFSET',
					type: 'method',
					output: 'number'
				},
				getVerticalScrollPosition: {
					name: 'GETVERTICALSCROLLPOSITION',
					type: 'method',
					output: 'number'
				},
				getVisibleRows: {
					name: 'GETTABLEVISIBLEROWS',
					type: 'method',
					output: 'object'
				},
				getRow: {
					name: 'GETTABLEROW',
					type: 'method',
					output: 'object'
				},
				getColumnNames: {
					name: 'GETCOLUMNNAMES',
					type: 'method',
					output: 'object'
                },
        scrollToNextPage: {
          name: 'SCROLLTONEXTPAGE',
          type: 'method',
          output: 'object'
           },
        scrollToPreviousPage: {
           name: 'SCROLLTOPREVIOUSPAGE',
           type: 'method',
           output: 'object'           
				},
				selectRow: {
					name: 'SELECTTABLEROW',
					type: 'method',
					input: [
					 'boolean',
					 'number'
					],
					output: 'object'
				},
				selectAllVisibleRows:{
					name: 'SELECTALLVISIBLETABLEROWS',
					type: 'method',
					input: [
					 'boolean'
					],
					output: 'object'
				},
				visibleRowCount: {
					name: 'get_VisibleRowCount',
					type: 'attribute',
					output: 'number'
				}
			}
		},
		GuiTableColumn: {
			id: 81,
			prefix: 'col',
			parents: [
				'GuiComponentCollection'
			]
		},
		GuiTableRow: {
			id: 82,
			prefix: 'row',
			parents: [
				'GuiComponentCollection'
			]
		},
		GuiTabStrip: {
			id: 90,
			componentFunc: GuiTabStripObj,
			prefix: 'tabs',
			parents: [
				'GuiVContainer'
			],
			map: {
				get: {
					name: 'SelectedTab',
					type: 'attribute',
					output: 'object'
				}
			}
		},
		GuiTab: {
			id: 91,
			componentFunc: GuiTabObj,
			prefix: 'tabp',
			parents: [
				'GuiVContainer'
			],
			map: {
				scrollToLeft: {
					name: 'ScrollToLeft',
					type: 'method'
				},
				click: {
					name: 'Select',
					type: 'method'
				}
			}
		},
		GuiScrollbar: {
			id: 100,
			prefix: 'scroll',
			parents: [
				'GuiVComponent'
			]
		},
		GuiToolbar: {
			id: 101,
			prefix: 'tbar',
			parents: [
				'GuiVContainer'
			]
		},
		GuiTitlebar: {
			id: 102,
			prefix: 'titl',
			parents: [
				'GuiVContainer'
			]
		},
		GuiStatusbar: {
			id: 103,
			componentFunc: GuiStatusBarObj,
			parents: [
				'GuiVComponent'
			],
			map: {
				messageId: {
					name: 'get_MessageId',
					type: 'attribute',
					output: 'string'
				},
				messageNumber: {
					name: 'get_MessageNumber',
					type: 'attribute',
					output: 'string'
				},
				messageType: {
					name: 'get_MessageType',
					type: 'attribute',
					output: 'string'
				}
			}
		},
		GuiMenu: {
			id: 110,
			componentFunc: GuiMenuObj,
			prefix: 'menu',
			parents: [
				'GuiVContainer'
			],
			map: {
				click: {
					name: 'Select',
					type: 'method'
				}
			}
		},
		GuiMenubar: {
			id: 111,
			prefix: 'mbar',
			parents: [
				'GuiVContainer'
			]
		},
		GuiCollection: {
			id: 120,
			parents: []
		},
		GuiSessionInfo: {
			id: 121
		},
		GuiShell: {
			id: 122,
			prefix: 'shell',
			parents: [
				'GuiVContainer'
			],
			subType: '',
			map: {
				hwnd: {
					name: 'Handle',
					type: 'attribute',
					output: 'number'
				},
				selectContextMenuItemByText: {
					name: 'SelectContextMenuItemByText',
					type: 'method',
					input: ['string']
				},
				selectContextMenuItemByPosition: {
					name: 'SelectContextMenuItemByPosition',
					type: 'method',
					input: ['string']
				},
				selectContextMenuItem: {
					name: 'SelectContextMenuItem',
					type: 'method',
					input: ['string']
				}
			}
		},
		GuiGOSShell: {
			id: 123,
			prefix: 'shell',
			parents: [
				'GuiVContainer'
			]
		},
		GuiSplitterShell: {
			id: 124,
			prefix: 'split',
			subType: 'Splitter',
			parents: [
				'GuiVContainer'
			]
		},
		GuiDialogShell: {
			id: 125,
			prefix: 'shellcont',
			parents: [
				'GuiVContainer'
			]
		},
		GuiDockShell: {
			id: 126,
			prefix: 'dock',
			parents: [
				'GuiContainerShell'
			]
		},
		GuiContextMenu: {
			id: 127,
			prefix: 'mnu',
			parents: [
				'GuiMenu'
			]
		},
		GuiComponentCollection: {
			id: 128,
			parents: [
				'GuiCollection'
			]
		},
		GuiCtrlGridView: {
			id: 0,
			componentFunc: GuiCtrlGridViewObj,
			prefix: 'grid',
			parents: [
				'GuiShell'
			],
			subType: 'GridView',
			map: {
				clickToolbar: {
					name: 'PressToolbarButton',
					type: 'method',
					input: ['string']
				},
				doubleClick: {
					name: 'DoubleClick',
					type: 'method',
					input: ['number', 'string']
				},
				pressToolbarContextButton:{
					name: 'PressToolbarContextButton',
					type: 'method',
					input: ['string']
				},
				getToolbar: {
					name: 'get_ToolbarButtonCount',
					type: 'attribute',
					output: 'number'
				},
				getToolbarButtonEnabled: {
					name: 'GetToolbarButtonEnabled',
					type: 'method',
					input: ['number'],
					output: 'boolean'
				},
				getToolbarButtonId: {
					name: 'GetToolbarButtonId',
					type: 'method',
					input: ['number'],
					output: 'string'
				},
				getToolbarButtonText: {
					name: 'GetToolbarButtonText',
					type: 'method',
					input: ['number'],
					output: 'string'
				},
				getToolbarButtonTooltip: {
					name: 'GetToolbarButtonTooltip',
					type: 'method',
					input: ['number'],
					output: 'string'
				},				
				getToolbarButtonType: {
					name: 'GetToolbarButtonType',
					type: 'method',
					input: ['number'],
					output: 'string'
				},
				getColumns: {
					name: 'get_ColumnOrder',
					type: 'attribute',
					output: 'object'
				},	
				getRowCount: {
					name: 'get_RowCount',
					type: 'attribute',
					output: 'number'
				},
				getVisibleRowCount: {
					name: 'get_VisibleRowCount',
					type: 'attribute',
					output: 'number'
				},	
				selectedRow: {
					name: 'get_CurrentCellRow',
					type: 'attribute',
					output: 'number'
				},
				selectRow: {
					name: 'set_CurrentCellRow',
					type: 'attribute',
					input: ['number'],
					output: 'number'
				},
				setSelectedRows: {
					name: 'set_SelectedRows',
					type: 'attribute',
					input: ['number']
				},
				selectedCol: {
					name: 'get_CurrentCellColumn',
					type: 'attribute',
					output: 'string'
				},
				selectCol: {
					name: 'set_CurrentCellColumn',
					type: 'attribute',
					input: ['string'],
					output: 'string'
				},			
				getFirstVisibleRow: {
					name: 'get_FirstVisibleRow',
					type: 'attribute',
					output: 'number'
				},
				setFirstVisibleRow: {
					name: 'set_FirstVisibleRow',
					type: 'attribute',
					input: ['number'],
					output: 'number'
				},
				getCellValue: {
					name: 'GetCellValue',
					type: 'method',
					input: [
						'number',
						'string'
					],
					output: 'string'
				},
				setCell: {
					name: 'ModifyCell',
					type: 'method',
					input: [
						'number',
						'string',
						'string'
					],
					output: 'string'
				},
				clickCurrentCell: {
					name: 'ClickCurrentCell',
					type: 'method'
				},
				pressEnter: {
					name: 'PressEnter',
					type: 'method'
				},
				selectAllRows: {
					name: 'SelectAll',
					type: 'method'
				},
				deselectAllRows: {
					name: 'ClearSelection',
					type: 'method'
				},
				pressButtonCurrentCell: {
					name: 'PressButtonCurrentCell',
					type: 'method'
				}
			}
		},
		GuiCtrlToolbar: {
			id: 0,
			componentFunc: GuiCtrlToolbarObj,
			prefix: 'tool',
			parents: [
				'GuiShell'
			],
			subType: '',
			map: {
				clickToolbar: {
					name: 'PressButton',
					type: 'method',
					input: [
						'string'
					]
				},
				pressContextButton: {
					name: 'PressContextButton',
					type: 'method',
					input: [
						'string'
					]
				},
				selectMenuItemByText: {
					name: 'SelectMenuItemByText',
					type: 'method',
					input: ['string']
				},
				selectMenuItem: {
					name: 'SelectMenuItem',
					type: 'method',
					input: [
						'string'
					]
				}
			}
		},
		GuiCtrlTextEdit: {
			id: 0,
			prefix: 'edit',
			parents: [
				'GuiVContainer'
			],
			subType: 'TextEdit',
			map: {
				contextMenu: {
					name: 'ContextMenu',
					type: 'method'
				},
				doubleClick: {
					name: 'DoubleClick',
					type: 'method'
				}
			}
		},
		GuiCtrlTree: {
			id: 0,
			componentFunc: GuiCtrlTreeObj,
			prefix: 'tree',
			parents: [
				'GuiVContainer'
			],
			subType: 'Tree',
			map: {
				select: {
					name: 'SelectNode',
					type: 'method',
					input: ['string'],
					output: 'string'
				},
				unselect: {
					name: 'UnselectNode',
					type: 'method',
					input: ['string'],
					output: 'string'
				},				
				selected: {
					name: 'GetFocusedNodeKey',
					type: 'method',
					output: 'string'
				},							
				getNodeTextByKey: {
					name: 'GetNodeTextByKey',
					type: 'method',
					input: ['string'],
					output: 'string'
				},
				getAllNodeKeys: {
					name: 'GetAllNodeKeys',
					type: 'method',
					output: 'object'
				},
				selectItem: {
					name: 'SelectItem',
					type: 'method',
					input: ['string', 'string']
				},
				itemContextMenu: {
					name: 'ItemContextMenu',
					type: 'method',
					input: ['string', 'string']
				},
				ensureVisibleHorizontalItem: {
					name: 'EnsureVisibleHorizontalItem',
					type: 'method',
					input: ['string', 'string']
				},
				contextMenu: {
					name: 'NodeContextMenu',
					type: 'method',
					input: ['string']
				},
				selectContextMenuItem: {
					name: 'SelectContextMenuItemByText',
					type: 'method',
					input: ['string']
				},
				selectContextMenuItemByPos: {
					name: 'SelectContextMenuItemByPosition',
					type: 'method',
					input: ['string']
				},
				expand: {
					name: 'ExpandNode',
					type: 'method',
					input: ['string']
				},
				collapse: {
					name: 'CollapseNode',
					type: 'method',
					input: ['string']
				},				
				clickDoubleNode: {
					name: 'DoubleClickNode',
					type: 'method',
					input: ['string']
				},
				doubleClickItem: {
					name: 'DoubleClickItem',
					type: 'method',
					input: ['string', 'string']
				},
				getColumnNames: {
					name: 'GetColumnNames',
					type: 'method',
					output: 'object'
				},
				getItemText: {
					name: 'GetItemText',
					type: 'method',
					input: ['string', 'string'],
					output: 'string'
				},
				getTreeType: {
					name: 'GetTreeType',
					type: 'method',
					output: 'number'
				},
				getItemType: {
					name: 'GetItemType',
					type: 'method',
					input: ['string', 'string'],
					output: 'number'
				},
				setCheckBoxState: {
					name: 'SetCheckBoxState',
					type: 'method',
					input: ['string', 'string', 'number']
				},
				getCheckBoxState: {
					name: 'GetCheckBoxState',
					type: 'method',
					input: ['string', 'string'],
					output: 'string'
				},
				clickLink: {
					name: 'ClickLink',
					type: 'method',
					input: ['string', 'string']
				},
				pressButton: {
					name: 'PressButton',
					type: 'method',
					input: ['string', 'string']
				},
				getNodeKeyByPath: {
					name: 'GetNodeKeyByPath',
					type: 'method',
					input: ['string'],
					output: 'string'
				}
			}
		},
		GuiCtrlHTMLViewer: {
			id: 0,
			prefix: 'html',
			parents: [
				'GuiVContainer'
			],
			subType: 'HTMLViewer',
			map: {
				contextMenu: {
					name: 'ContextMenu',
					type: 'method'
				}
			}
		},
		GuiCtrlCalendar: {
			id: 0,
			prefix: 'cal',
			parents: [
				'GuiVContainer'
			],
			componentFunc: GuiCtrlCalendarObj,
			subType: 'Calendar',
			map: {
				getDate: {
					name: 'get_startSelection',
					type: 'attribute',					
					output: 'string'				
				},				
				getDateRange: {
					name: 'get_SelectionInterval',
					type: 'attribute',					
					output: 'string'				
				},
				setDateRange: {
					name: 'set_SelectionInterval',
					type: 'attribute',					
					input: ['string'],
					output: 'string'				
				}				 			
			}
		},
		GUIGridViewButton:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUIGridViewBasicCustomTypeObj
		},
		GUIGridViewCheckBox:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUIGridViewBasicCustomTypeObj
		},
		GUIGridViewGroup:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUIGridViewBasicCustomTypeObj
		},
		GUIGridViewSeparator:{
			id:0,
			parents: [
				'GuiVComponent'
			]
		},
		GUIGridViewToolBar:{
			id:0,
			parents: [
				'GuiVComponent'
			]
		},
		GUIGridViewThumb:{
			id:0,
			parents: [
				'GuiVComponent'
			]
		},
		GUIGridViewMenu:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUIGridViewMenuObj
		},
		GUIGridViewButtonAndMenu:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUIGridViewButtonAndMenuObj
		},
		GUIGridViewPane:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUIGridViewPaneObj
		},
		GUICtrlToolbarButton:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUICtrlToolbarBasicCustomObj
		},
		GUICtrlToolbarGroup:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUICtrlToolbarBasicCustomObj
		},
		GUICtrlToolbarCheckBox:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUICtrlToolbarBasicCustomObj
		},
		GUICtrlToolbarSeparator:{
			id:0,
			parents: [
				'GuiVComponent'
			]
		},
		GUICtrlToolbarToolBar:{
			id:0,
			parents: [
				'GuiVComponent'
			]
		},
		GUICtrlToolbarButtonAndMenu:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUICtrlToolbarButtonAndMenuObj
		},
		GUICtrlToolbarMenu:{
			id:0,
			parents: [
				'GuiVComponent'
			],
			componentFunc: GUICtrlToolbarMenuObj
		}
	};

	var self = 
	/** @lends ctx.SAPScripting*/
	{};
	
	self.supportedComponents = _SAPGUItypes;
	/** @type {Object} */ self.items = {};
	/** @type {ctx.application} */ self.winApp = null;

	// Adding methods that are available to a component
	self.addMethodsToItemOrPageFunction =  function(itemOrPage, type){
		var addMethodsToItemOrPageObj = function(itemOrPage, type){
			
			var componentFunc = _SAPGUItypes[type].componentFunc;
			if (componentFunc){
				var componentObj = new componentFunc(itemOrPage, type);
				var componentMethods = Object.keys(componentObj);
				var index;
				for(index = 0; index < componentMethods.length; index++){
					var methodName = componentMethods[index];
					if(!(itemOrPage.hasOwnProperty(methodName)))
						itemOrPage[methodName] = componentObj[methodName];
				}
			}
			
			if (_SAPGUItypes[type].parents) {
				for (var i = 0; i< _SAPGUItypes[type].parents.length; i++){
					addMethodsToItemOrPageObj(itemOrPage, _SAPGUItypes[type].parents[i]);
				}
			}
		}
		addMethodsToItemOrPageObj(itemOrPage, type);
	}
	
 /**
  * @ignore
  * @method      enableRecording
  * @summary     ...
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @throws {Error}
  * @path ctx.SAPScripting.enableRecording
  * @param {boolean} [enable]
  * @return {boolean} ... 
  */
	self.enableRecording = function(enable) {
		//ctx.notifyAction('ctx.SAPScripting.enableRecording');
		var res = false;
		_recordingEnabled = (enable === false ? false : true);
		res = true;
		return res;
	}
	
	self.isRecordingEnabled = function() {
		return _recordingEnabled;
	}
	
 /**
  * @ignore
  * @method getType
  * @summary     ...
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @path ctx.SAPScripting.getType
  * @param {number} typeAsNumber
  * @return {string} ... 
  */
	self.getType = function(typeAsNumber) {
		var type = '';
		for (var id in _SAPGUItypes) {
			if (_SAPGUItypes[id].id === typeAsNumber) { type = id; break; } 
		}
		return type;
	}
	
 /**
  * @ignore
  * @method getTypeAsNumber
  * @summary     ...
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @path ctx.SAPScripting.getTypeAsNumber
  * @param {string} type
  * @return {number} ... 
  */
	self.getTypeAsNumber = function(type) {
		var id = 0;
		if (_SAPGUItypes[type]) id = _SAPGUItypes[type].id	|| 0;
		return id;
	}
	
/**
  * @ignore
  * @method getSAPGuiFunction
  * @summary     ...
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @throws {Error}
  * @path ctx.SAPScripting.getSAPGuiFunction
  * @param {string} sVerb
  * @param {string} sType
  * @return {*} ... 
  */
	self.getSAPGuiFunction = function (sVerb, sType) {

		var getSAPGuiMethod = function (verb, type) {

			if (!_SAPGUItypes[type]) {
				ctx.log('ctx.SAPScripting.getSAPGuiMethod: unknown type: ' + type, e.logIconType.Warning);
				return {};
			}

			if (_SAPGUItypes[type].map) {
				var map = _SAPGUItypes[type].map;
				if (map[verb]) {
					return map[verb];
				}
			}

			if (_SAPGUItypes[type].parents) {
				for (var i = 0; i< _SAPGUItypes[type].parents.length; i++) {
					// search in parents
					var parentMethod = getSAPGuiMethod(verb, _SAPGUItypes[type].parents[i]);
					if (parentMethod.name) {
						return parentMethod;
					}
				}
			}
			return {};
		}

		var fnResult = function (oMapValue, verb) {

			var sName;
			if (oMapValue.type === 'attribute') {
				if ('get' === verb || 'set' === verb) {
					sName = verb + '_' + oMapValue.name;
				} else {
					sName = oMapValue.name;
				}
			} else if (oMapValue.type === 'method') {
				sName = 'exec_' + oMapValue.name
			} else if (oMapValue.type === 'asyncmethod') {
				sName = 'asyncexec_' + oMapValue.name
			} else {
				throw new Error('Verb not "' + verb + '" found' + JSON.stringify(oMapValue,null,2));
			}

			var aSerializers = [];
			var i;
			if (oMapValue.input) {
				for (i = 0; i < oMapValue.input.length; i++) {
					switch (oMapValue.input[i]) {
						case 'string':
							aSerializers.push(function (oValue) {
								return e.prefix.string + oValue;
							});
							break;
						case 'number':
							aSerializers.push(function (oValue) {
								return e.prefix.number + oValue;
							});
							break;
						case 'boolean':
							aSerializers.push(function (oValue) {
								return e.prefix.bool + (oValue ? true : false);
							});
							break;
						default:
							aSerializers.push(function (oValue) {
								return '';
							});
							break;
					}
				}
			}

			var fnReader;
			switch (oMapValue.output) {
				case 'boolean':
					fnReader = function (sValue) { return sValue.toLowerCase() === 'true' };
					break;
				case 'number':
					fnReader = function (sValue) { return Number(sValue); };
					break;
				case 'string':
					fnReader = function (sValue) { return sValue.toString(); };
					break;
				case 'object':
					fnReader = function (sValue) { return JSON.parse(sValue); };
					break;
				default:
					fnReader = function (sValue) { };
					break;
			}
			return {
				name: sName,
				serializers: aSerializers,
				resultReader: fnReader
			}
		}

		var oMethod = getSAPGuiMethod(sVerb, sType);
		return fnResult(oMethod, sVerb);
	}

		
	/**
	 * @ignore
	  * ...
	  * @method executeSAPGuiFunction
	  * @summary     ...
	  * @description
	  * __Ex.:__
	<code javascript>
	</code>
	  * @throws {Error}
	  * @path ctx.SAPScripting.executeSAPGuiFunction
	  * @param {ctx.descriptor} oDesc
	  * @param {string} sType
	  * @param {string} sVerb
	  * @param {*} p1
	  * @param {*} p2
	  * @param {*} p3
	  * @param {*} p4
	  * @return {number|string|boolean} ... 
	  */
	self.executeSAPGuiFunction = function (oDesc, sType, sVerb, p1, p2, p3, p4) {

		var i, oParam, fnSerializer;
		//var oMethod = getSAPGuiMethod(sVerb, sType);
		var oSapFunc = self.getSAPGuiFunction(sVerb, sType);
		var aParam = ['', '', '', ''];
		for (i = 0; i < oSapFunc.serializers.length; i++) {
			oParam = arguments[i + 3];
			fnSerializer = oSapFunc.serializers[i];
			aParam[i] = fnSerializer(oParam);
		}
		ctx.noNotify = true;
		var sRes = ctx.actionApp(oDesc, sVerb, oSapFunc.name, oDesc.itemFullName, aParam[0], aParam[1], aParam[2], aParam[3]);
		return oSapFunc.resultReader(sRes);
	}

 /**
  * @ignore
  * @method      getInfos
  * @summary     ...
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @throws {Error}
  * @path ctx.SAPScripting.getInfos
  * @return {Object} ... 
  */
	self.getInfos = function() {
		ctx.notifyAction('ctx.SAPScripting.getInfos');
		var infos = {};
		if (_application && _application.control) {
			infos.version = {
				major: _application.control.majorVersion(),
				minor: _application.control.minorVersion(),
				revision: _application.control.revision(),
				patchlevel: _application.control.patchlevel()
			};
		}
		return infos;
	}

	return self;
})();


/**
* ctx.SAPComponent class
* @class ctx.SAPComponent
* @path ctx.SAPComponent
* @constructor
* @advanced
* @param {Object} params item definitions
* @param {ctx.item|ctx.page} [itemOrPage] 
* @param {Object} [control] page, item or SAP native control to be wrapped in 'ctx.SAPComponent' object
* @param {Object} [session] optional session object containing the control
* @param {boolean} [addChildren] optional flag to include children nodes
* @param {boolean} [verbose] optional flag to include detailed information
* @param {number} [hwnd] handle of the parent window
*/
ctx.SAPComponent = function (params, itemOrPage, control, session, addChildren, verbose, hwnd) {

	if ( !(this instanceof ctx.SAPComponent) ) {
	  return new ctx.SAPComponent(params, itemOrPage, control, session, addChildren, verbose, hwnd); // in case 'new' was not used		
	}
	//params = params || {};
	var _component = this;
	
	/** 
	* ===== Properties =====
	*/
	/** class type
	* @ignore
	* @const 
	* @path ctx.SAPComponent.ctxType
	* @property {string} ctxType  */ this.ctxType = 'ctx.SAPComponent';

	/** Component alias 
	* @path ctx.SAPComponent.alias
	* @property {string} alias  */ this.alias = '';

	/** Component criteria
	* @path ctx.SAPComponent.criteria
	* @property {Object} criteria  */ this.criteria = {};

	/** Component items
	* @path ctx.SAPComponent.items
	* @property {Object} items  */ this.items = {};
	
	/** Component items
	* @path ctx.SAPComponent.itemOrPage
	* @property {ctx.item|ctx.page} itemOrPage  */ this.itemOrPage = itemOrPage;

	/** Component id (relative to the containing window)
	* @path ctx.SAPComponent.id
	* @property {string} id  */ this.id = '';

	/** Component name
	* @path ctx.SAPComponent.name
	* @property {string} name  */ this.name = '';

	/** Parent Component
	* @path ctx.SAPComponent.parent
	* @property {ctx.SAPComponent} parent */ this.parent = null;
	if (itemOrPage && itemOrPage.parent && itemOrPage.parent.component)
		 this.parent = itemOrPage.parent.component;

	/** Component session native object
	* @path ctx.SAPComponent.session
	* @property {Objet} session  */ this.session = null;

	/** Component session id
	* @path ctx.SAPComponent.sessionId
	* @property {Objet} sessionId  */ this.sessionId = '';

	/** Component window id
	* @path ctx.SAPComponent.windowId
	* @property {Objet} windowId  */ this.windowId = '';

	/** Component type
	* @path ctx.SAPComponent.type
	* @property {string} type  */ this.type = '';

	/** Component typeAsNumber
	* @path ctx.SAPComponent.typeAsNumber
	* @property {number} typeAsNumber  */ this.typeAsNumber = 0;

	/** Component text
	* @path ctx.SAPComponent.text
	* @property {string} text  */ this.text = '';

	/** Associated Windows application
	* @ignore
	* @path ctx.SAPComponent.winApp
	* @property {ctx.application} text  */ this.winApp = null;

	/** Session current page
	* @ignore
	* @path ctx.SAPComponent.currentPage
	* @property {ctx.application} text  */ this.currentPage = null;
	
	/** Component control
	* @path ctx.SAPComponent.control
	* @property {Object} control  */ this.control = null;

	/**
	 * @ignore
	* __Ex.:__
<code javascript>
</code>
	* @method init
	* @ignore
	* @path ctx.SAPComponent.init
	* @param {Object} params item definitions
*/
	this.init = function (params) {
		try {
			params = params || {};

			if (!params.typeAsNumber) params.typeAsNumber = ctx.SAPScripting.getTypeAsNumber(params.type);
			
			ctx.each(params, function(id, value) {
				_component[id] = value;
			});
			
		} catch (ex) {		}
	}

	/**
	* __Ex.:__
<code javascript>
</code>
	* @method getAlias
	* @ignore
	* @path ctx.SAPComponent.getAlias
	* @return {string} verb
*/
	this.getAlias = function() {
		var alias = this.alias;
		if (this.parent && this.parent.getAlias) alias =  this.parent.getAlias() + '.' + alias;
		return alias;
	}
	
	/** 
	* ===== Methods =====
	*/

	this.init(params);
	

	/** 
	* Returns object descriptor for the page
	* @description
	* __Ex.:__
	<code javascript>
	var desc = MyAppli.MyPage.getObjectDescriptor();
	</code>
  * @ignore [internal use]
  * @method getObjectDescriptor
  * @path ctx.SAPComponent.getObjectDescriptor
	* @param {ctx.descriptor} [desc] initial descriptor object to be completed (if omitted, a new descriptor object is created)
  * @return {ctx.descriptor} page object descriptor
  */
	this.getObjectDescriptor = function (desc) {
		desc = this.itemOrPage.getObjectDescriptor(desc);
    	return desc;
	}

	// *** custom methods on pages and items ***
	if (!((itemOrPage instanceof ctx.item) || (itemOrPage instanceof ctx.page))) {
		return; // no associated page/item
	}
	
	/**
	* Gets property value
	* @method getProperty	
	* @description Properties are those of SAP GUI Scipring API Objects (eg: GUIGutton, GuiTree etc ...)
	* __Ex.:__
	<code javascript>
		// Retrieve Button size
		var sH = SAPLogon750.pTCURRDisplayOfEnt.btExit.getProperty('Height');
		var sW = SAPLogon750.pTCURRDisplayOfEnt.btExit.getProperty('Width');
	</code>
	* @path ctx.page.getProperty
	* @param {string} property
	* @return {*} result string containing value in Xml format
		*/
	itemOrPage.getProperty = function (property) {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getProperty', '', desc);
		var sSapFunc = 'get_' + property;
		var sRes = ctx.actionApp(desc, 'getProperty', sSapFunc, desc.itemFullName, '', '', '', '');
		return sRes;
	}

	/**
	* Gets current state of sap gui
	* @method isSAPGuiBusy  	
  	* @description Will return True if SAPGUI is busy
	* __Ex.:__
	<code javascript>
		var sH = SAPLogon750.pTCURRDisplayOfEnt.isSAPGuiBusy();
		var sW = SAPLogon750.pTCURRDisplayOfEnt.btExit.isSAPGuiBusy();
	</code>	
	* @path ctx.page.isSAPGuiBusy
	* @return {boolean} true or false 
	*/
	itemOrPage.isSAPGuiBusy = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('isSAPGuiBusy', '', desc);
		return ctx.actionApp(desc, 'isSAPGuiBusy', 'ISGUISESSIONBUSY', desc.itemFullName, '', '', '', '') == 'True';
	}
	
	/**
	* Gets System Name from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getSystemName();
		SAPLogon750App.pSAPEasyAccess.oItem.getSystemName();
	</code>
	* @method getSystemName
	* @path ctx.page.getSystemName		
	* @return {string} System Name from SessionInfo
	*/
	itemOrPage.getSystemName = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getSystemName', '', desc);
		return ctx.actionApp(desc, 'getSystemName', 'get_SYSTEMNAME', desc.itemFullName, '', '', '', '');
	}

	/**
	* Gets Application Server from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getApplicationServer();
		SAPLogon750App.pSAPEasyAccess.oItem.getApplicationServer();
	</code>
	* @method getApplicationServer
	* @path ctx.page.getApplicationServer		
	* @return {string} Application Server from SessionInfo
	*/
	itemOrPage.getApplicationServer = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getApplicationServer', '', desc);
		return ctx.actionApp(desc, 'getApplicationServer', 'get_APPLICATIONSERVER', desc.itemFullName, '', '', '', '');
	}

	/**
	* Gets Client Name from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getClientName();
		SAPLogon750App.pSAPEasyAccess.oItem.getClientName();
	</code>
	* @method getClientName
	* @path ctx.page.getClientName	
	* @return {string} Client Name from SessionInfo
	*/
	itemOrPage.getClientName = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getClientName', '', desc);
		return ctx.actionApp(desc, 'getClientName', 'get_CLIENT', desc.itemFullName, '', '', '', '');
	}

	/**
	* Gets User Name from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getUserName();
		SAPLogon750App.pSAPEasyAccess.oItem.getUserName();
	</code>
	* @method getUserName
	* @path ctx.page.getUserName
	* @return {string} User Name from SessionInfo
	*/
	itemOrPage.getUserName = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getUserName', '', desc);
		return ctx.actionApp(desc, 'getUserName', 'get_USER', desc.itemFullName, '', '', '', '');
	}

	/**
	* Gets Transaction from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getTransaction();
		SAPLogon750App.pSAPEasyAccess.oItem.getTransaction();
	</code>
	* @method getTransaction
	* @path ctx.page.getTransaction
	* @return {string} Transaction from SessionInfo
	*/
	itemOrPage.getTransaction = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getTransaction', '', desc);
		return ctx.actionApp(desc, 'getTransaction', 'get_TRANSACTION', desc.itemFullName, '', '', '', '');
	}

	/**
	* Gets Program from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getProgram();
		SAPLogon750App.pSAPEasyAccess.oItem.getProgram();
	</code>
	* @method getProgram
	* @path ctx.page.getProgram
	* @return {string} Program from SessionInfo
	*/
	itemOrPage.getProgram = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getProgram', '', desc);
		return ctx.actionApp(desc, 'getProgram', 'get_PROGRAM', desc.itemFullName, '', '', '', '');
	}

	/**
	* Gets Screen Number from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getScreenNumber();
		SAPLogon750App.pSAPEasyAccess.oItem.getScreenNumber();
	</code>
	* @method getScreenNumber
	* @path ctx.page.getScreenNumber
	* @return {string} Screen Number from SessionInfo
	*/
	itemOrPage.getScreenNumber = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getScreenNumber', '', desc);
		return ctx.actionApp(desc, 'getScreenNumber', 'get_SCREENNUMBER', desc.itemFullName, '', '', '', '');
	}	

	/**
	* Gets System Number from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getSystemNumber();
		SAPLogon750App.pSAPEasyAccess.oItem.getSystemNumber();
	</code>
	* @method getSystemNumber
	* @path ctx.page.getSystemNumber
	* @return {string} System Number from SessionInfo
	*/
	itemOrPage.getSystemNumber = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getSystemNumber', '', desc);
		return ctx.actionApp(desc, 'getSystemNumber', 'get_SYSTEMNUMBER', desc.itemFullName, '', '', '', '');
	}

	/**
	* Gets Session Number from SessionInfo
	* @description
	* __Ex.:__
	<code javascript>
		SAPLogon750App.pSAPEasyAccess.getSessionNumber();
		SAPLogon750App.pSAPEasyAccess.oItem.getSessionNumber();
	</code>
	* @method getSessionNumber
	* @path ctx.page.getSessionNumber
	* @return {string} Session Number from SessionInfo
	*/
	itemOrPage.getSessionNumber = function () {
		var desc = itemOrPage.getObjectDescriptor();
		ctx.notifyAction('getSessionNumber', '', desc);
		return ctx.actionApp(desc, 'getSessionNumber', 'get_SESSIONNUMBER', desc.itemFullName, '', '', '', '');
	}
		

	if(ctx.SAPScripting.supportedComponents[_component.type])
		ctx.SAPScripting.addMethodsToItemOrPageFunction(itemOrPage,_component.type);
}

/** Custom Types for SAPGUI Scripting objects 
* @ignore
* @method ctx.customTypes.SAP
* @path ctx.customTypes.SAP
*/
ctx.customTypes.SAPGUI = function(itemOrPage, customType) {
	itemOrPage.component = new ctx.SAPComponent({ type: customType }, itemOrPage);
}


/** Description */
GLOBAL.events.START.on(function(ev) {
	var data = {};
});
