/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== ctx.item class ======
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
*
* The ''ctx.item'' class implements the items declared in pages, especially to perform actions : read or write values, click buttons, ...
*
* Item objects can also receive notifications (called event tracking) : Click detection, set or kill focus, ...
*
* __Note:__ to receive notifications, 'TRACK_EVENT' should be declared on the object
*
* According to application technology (Windows, Web, Java, ...), item objects implement different actions.
*
* __Ex.:__ '''ctx.item.scriptItem()''' is specific to Web application items.
*
* \\
* Typical syntaxes :
*   * calling an item action :
<code javascript><application>.<page>.<item>.<action>(parameters...);</code>
*
* __Ex.:__
<code javascript>
// click a button
MyAppli.MyPage.btFill.click();
</code>
*
*   * receiving a notification :
<code javascript>
<application>.<page>.<item>.events.<event>.on(function(ev) {
  // add code here...
});
</code>
*
* __Ex.:__
<code javascript>
// detect 'click' on 'btFill' button,
MyAppli.MyPage.btFill.events.COMMAND.on(function(ev) {
  ...
});
</code>
* \\
* \\
*/

//require('ctx.language');

/**
* ctx.item class
* @class ctx.item
* @path ctx.item
* @constructor
* @advanced
* @param {string} name item name
* @param {ctx.page} parent parent page
* @param {Object} [obj] item definitions
* @param {number} [instance] item instance
* @param {boolean} [dynamic] statically or dynamically declared item
*/
ctx.item = function (name, parent, obj, instance, dynamic) {
  if ( !(this instanceof ctx.item) ) {
    return new ctx.item(name, parent, obj, instance); // in case 'new' was not used
  }

  // if 'parent' is undefined --> accessor with index number, for occursed items. Ex.: MyAppli.MyPage.btSearch(2)
  // if 'parent' is defined --> creator. Ex. MyAppli.MyPage.btSearch = ctx.item('btSearch', MyAppli.MyPage);
  /** class type
  * @ignore
  * @const
  * @path ctx.item.ctxType
  * @property {string} ctxType  */ this.ctxType = 'ctx.item';

  /** parent application
  * @path ctx.item.appli
  * @property {ctx.application} appli */  this.appli = (parent ? parent.parent : null);

  /** statically or dynamically declared item
  * @path ctx.item.dynamic
  * @advanced
  * @property {boolean} dynamic */  this.dynamic = dynamic;

  /** optional technical component
  * @path ctx.item.component
  * @property {Object} component */ this.component = null;

  /** event list
  * @path ctx.item.events
  * @property {Object} events  */ this.events = {};

  /** occurence list
  * @path ctx.item.index
  * @advanced
  * @property {Array<number>} index */ this.index = [];

  /** item name
  * @path ctx.item.name
  * @property {string} name  */ this.name = name;

  /** parent page
  * @path ctx.item.parent
  * @property {ctx.page} parent  */ this.parent = parent;

  /** item instance
  * @path ctx.item.instance
  * @advanced
  * @property {number} instance */ this.instance = ((instance) ? parseInt(instance, 10) : 0);

  /** current item
  * @path ctx.item.item
  * @property {ctx.item} item */  this.item = this;
  var _item = this;

  /** free comment
  * @path ctx.item.comment
  * @advanced
  * @property {string} comment */ this.comment = "";

  /** item custom type
  * @path ctx.item.customType
  * @advanced
  * @property {string} customType */ this.customType = '';

  /** item category
  * @path ctx.item.folder
  * @advanced
  * @property {string} folder */ this.folder = "";

  /** 'Must Exist' declaration flag
  * @path ctx.item.mustExist
  * @advanced
  * @property {boolean} mustExist */ this.mustExist = false;

  /** 'Must Not Exist' declaration flag
  * @path ctx.item.mustNotExist
  * @advanced
  * @property {boolean} mustNotExist */ this.mustNotExist = false;

  /** item nature (technology : Windows, Web, ...)
  * @path ctx.item.nature
  * @advanced
  * @property {string} nature  */ this.nature = this.nature || parent.nature;

  /** occurence count (static value used for HLLAPI)
  * @path ctx.item.nbOccurs
  * @advanced
  * @property {number} nbOccurs */ this.nbOccurs = 0;

  /** occurence level (0, 1, 2, ...)
  * @path ctx.item.occurs
  * @advanced
  * @property {number} occurs */ this.occurs = 0;

  /** parent page
  * @path ctx.item.page
  * @property {ctx.page} page */  this.page = parent;

  /** tracked events declared on the item
  * @path ctx.item.trackEvents
  * @advanced
  * @property {Object} trackEvents */ this.trackEvents = {};

  // copy item definitions
  var _copyData = ['trackEvents', 'component', 'index', 'type', 'customType', 'comment', 'folder', 'occurs', 'nbOccurs', 'mustExist', 'mustNotExist'], id;
  if (obj) {
      for (var i = 0; i < _copyData.length; i++) {
        id = _copyData[i];
        if (obj[id]) { this[id] = obj[id]; }
    }
  }


  var _buildMenu = function(obj, selectObj, xmlObj) {
    if (xmlObj) {
      var counter = 0;
      for (var i in xmlObj) {
        //var index = xmlObj[i]['@Index'] || counter;
        //obj.items[index] = {};
        obj[i] = {};
        //var index = col[j]['@Index'];
        var value = xmlObj[i]['#cdata'];
        obj[i]['name'] = value;
        var selected = xmlObj[i]['@Select'] || xmlObj[i]['@Sel'];
        if (selected == 'O' || selected == 'Y')
          selectObj.push(value);
        counter ++;
        if (xmlObj[i]['ITEM']) {
          _buildMenu(obj[i], selectObj, xmlObj[i]['ITEM'])
        }
      }
    }
  }

  /**
  * Transcodes item structure
  * @method _recurseTranscode
  * @ignore
  * @param {Object} item
  * @return {Object|string} result
  */
  var _recurseTranscode = function (item) {
    var obj = {};
    var counter = 0;
    var col = item['col'] || item['item'];
    if (col) {
      // if single child, item if not an array (due to XML structure) : make it a one item object
      var item2 = [item];
      item = item2;
    }
    for (var i in item) {
      var index = item[i]['@index'];
      if (index === undefined) { index = counter; }
      counter ++;
      col = item[i]['col'];
      if (col) {
        // grid object
        obj[index] = {};
        for (var j in col) {
          obj[index][col[j]['@name']] = col[j]['#cdata'];
        }
      } else {
        // listview / tabview / tree view
        obj[index] = { };
        if (item[i]['#cdata'] !== undefined) { obj[index].value = item[i]['#cdata']; }
        if (item[i]['@x'] !== undefined) { obj[index].x = item[i]['@x']; }
        if (item[i]['@y'] !== undefined) { obj[index].y = item[i]['@y']; }
        if (item[i]['@selected'] == 'true') { obj[index].selected = true; }
        if (item[i]['item']) { obj[index].item = _recurseTranscode(item[i]['item']); }
      }
    }
    return obj;
  }

  /**
  * Transcodes complex XML returned values to a JSON object
  * @method _transcode
  * @ignore
  * @path ctx.item._transcode
  * @param {string} val
  * @return {Object|string} result
  */
  this._transcode = function (val) {
    var obj = {};
    var xmlObj;
    try {
      xmlObj = ctx.xml.xml2object(val);
      if (xmlObj.Data) {
        if (typeof(xmlObj.Data) === 'string') return xmlObj.Data;
        var item = (xmlObj.Data.row || xmlObj.Data.item || xmlObj.Data.col)
        if (this._is(e.nature.SWG) && item) {
          obj.item = _recurseTranscode(item);
        }
				else {
					obj = xmlObj;
				}
      } else if ((this._is(e.nature.WIN) || this._is(e.nature.UIAUTOMATION) || this._is(e.nature.NSDK)) && xmlObj && xmlObj['GetList']) {
        obj = { items: {}, selected: [] };
        if (xmlObj['GetList']['ITEM']) {
          _buildMenu(obj.items, obj.selected, xmlObj['GetList']['ITEM']);
        } else if (xmlObj['GetList']['Row']){
          _buildMenu(obj.items, obj.selected, xmlObj['GetList']['Row']);
        }
      }
    } catch (ex) {
      obj = xmlObj || val;
    }
    return obj;
  }

  /**
  * Checks if the nature of the item is part of the given list
  * @method _is
  * @ignore
  * @path ctx.item._is
  * @param {...string} arg list of natures (ex.: 'WEB', 'WEB3', 'WIN', ...) (see [[:lib:common:ctx.enum#enumeration_enature|e.nature]])
  * @return {boolean} result : 'true' if compatible
  */
  this._is = function (arg) {
    //if (!this.nature)
    //  return true; // if unknown nature, allow any
    var args = Array.prototype.slice.call(arguments);
    var nb = args.length;
    for (var i = 0; i < nb; i++) {
      if (this.nature == args[i]) {
        return true;
      }
    }
    return false; // not compatible
  }

  /**
  * Adds a technical event to an item
  * @description
  * __Ex.:__
<code javascript>
this.btSearch.addEvent(e.event.item.UPDATE);
</code>
  * @method addEvent
  * @path ctx.item.addEvent
  * @advanced
  * @param {Object} obj object with event names (ex. : { COMMAND:'', CLICK:'', ...} )
  * @param {boolean} [technical] if true, technical event
  * @return {ctx.event} created event
  */
  this.addEvent = function (obj, technical) {
    /** @type {ctx.event} */ var ev = null;
    for (var name in obj) {
      if (!this.events[name]) {
        var data;
        if ((typeof obj[name] === 'object') || (obj[name] instanceof ctx.dataClass)) { data = obj[name]; }
        this.events[name] = new ctx.event(name, this, data, technical);
      }
      ev = this.events[name];
    }
    return ev;
  }

  // ****************************
  // *** custom type override ***
  // ****************************
  // !! 'addEvent' function should be declared before
  if (this.occurs == 0) {
    if (this.customType) {
      var type = ctx.customTypes[this.nature];
      if (type && typeof type === 'function') {
        type(this, this.customType);
      } else {
        var arr = this.customType.split(".");
        type = ctx.customTypes;
        for (var i = 0; i < arr.length; i++) {
          if (!type[arr[i]]) { break; }
          type = type[arr[i]];
          if (typeof type === 'function') {
            type(this);
          }
        }
      }
    }
  }

  if ((this.occurs == 0) && (!this.check) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.UIAUTOMATION))) {
    /**
    * Checks or unchecks a radio button, check box or a tree view
    * @description
    * :!: __Technology specific:__ **WIN**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
// check the 'NAS' check box
MyAppli.MyPage.oNAS.check(true);
// check the 'Network' element in a tree view
MyAppli.MyPage.tvTree.check(true, 'Network');
</code>
    * @method check
    * @path ctx.item.check
    * @param {boolean} [set=true] check (true) or uncheck (false)
    * @param {string} [value] for a tree view, the name of the element to be checked/unchecked
    * @return {string} result value
    */
    this.check = function (set, value) { //
      var desc = this.getObjectDescriptor();
      if (value === undefined) value = '1';
      return ctx.action(desc, 'check', 'SETVALUE', value, ((set === false) ? '_UnCheck_' : '_Check_'));
    }
  }

  if ((this.occurs == 0) && (!this.check) && (this._is(e.nature.SWG))) {
    /**
    * Checks or unchecks a radio button, check box
    * @description
    * :!: __Technology specific:__ , **SWG**
    *
    * __Ex.:__
<code javascript>
// check the 'NAS' check box
MyAppli.MyPage.oNAS.check(true);
</code>
    * @method check
    * @path ctx.item.check
    * @param {boolean} [set=true] check (true) or uncheck (false)
    * @return {string} result value
    * @suppress {duplicate}
    */
    this.check = function (set) { //
      var desc = this.getObjectDescriptor();
      if (set === undefined) set = true;
      return ctx.action(desc, 'check', 'SETVALUE', ((set === false) ? '0' : '1'), "");
    }
  }

  if ((this.occurs == 0) && (!this.click) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.UIAUTOMATION, e.nature.WINDOWLESS, e.nature.OCR))) {
    /**
    * Executes a 'click' action on the item
    * @description
    * :!: __Technology specific:__ **WIN**, **WEB**, ****WEB3**, **UIAUTOMATION**, **SWG**, WINDOWLESS**, **FLEX**, **OCR**
    *
    * __Ex.:__
<code javascript>
// click on button
MyAppli.MyPage.btSearch.click ();
// click on button with mouse simulation
MyAppli.MyPage.btSearch.click(true);
</code>
    * @method click
    * @path ctx.item.click
    * @param {boolean} [bMouse] if 'true', the action simulates a 'mouse' click
    * @param {number} [X] relative horizontal position (compared to object top left position)
    * @param {number} [Y] relative vertical position (compared to object top left position)
    * @return {string} result value
    */
    this.click = function (bMouse, X, Y) {
      var desc = this.getObjectDescriptor();
      if (this._is(e.nature.WEB, e.nature.WINDOWLESS)) { bMouse = false;  } // not supported
      if (this._is(e.nature.WEB, e.nature.WEB3)) { X = undefined; Y = undefined;  } // not supported
      if ('string' === typeof X) X = parseInt(X, 10) || 0;
      if ('string' === typeof Y) Y = parseInt(Y, 10) || 0;
      var pos = undefined;
      if (('undefined' !== typeof X) && ('undefined' !== typeof Y)) pos = X + Y * 65536;
      return ctx.action(desc, 'click', (bMouse ? 'FCTBTNM' : 'FCTBTN'), pos);
    }
  }

  if ((this.occurs == 0) && (!this.clickDouble) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.UIAUTOMATION, e.nature.SWG, e.nature.OCR))) {
    /**
    * Executes a 'double click' action on the item\\
    * @description
    *  Optionally, a relative position (X, Y) can be set to precise the position (otherwise, the center position is used)
    *
    * :!: __Technology specific:__ **WIN**, **UIAUTOMATION**, **FLEX**, **OCR**
    *
    * __Ex.:__
<code javascript>
// double click on button
MyAppli.MyPage.btSearch.clickDouble();
// double click on button, with specific position
MyAppli.MyPage.btSearch.clickDouble(30, 20);
</code>
    * @method clickDouble
    * @path ctx.item.clickDouble
    * @param {number} [X] relative horizontal position (compared to object top left position)
    * @param {number} [Y] relative vertical position (compared to object top left position)
    * @return {string} result value
    */
    this.clickDouble = function (X, Y) {
      var desc = this.getObjectDescriptor();
      if ( this._is(e.nature.SWG )) {
        return ctx.action(desc, 'clickDouble', 'SETVALUE', '_DblClk_');
      } else {
        return ctx.actionApp(desc, 'clickDouble', 'DBLCLICK', desc.itemFullName, X, Y);
      }
    }
  }

  if ((this.occurs == 0) && (!this.clickMouse) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.UIAUTOMATION, e.nature.WINDOWLESS, e.nature.OCR))) {
    /**
    * Executes a 'click' action on the item, using mouse simulation\\
    * @description
    *
    * __Ex.:__
<code javascript>
// click on button using mouse simulation
MyAppli.MyPage.btSearch.clickMouse();
</code>
    * @method clickMouse
    * @path ctx.item.clickMouse
    * @return {string} result value
    */
    this.clickMouse = function () {
      var desc = this.getObjectDescriptor();
      var pos = this.getRect(); ctx.mouse.click(pos);
      return '';
    }
  }

  if ((this.occurs == 0) && (!this.clickRight) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.UIAUTOMATION, e.nature.OCR))) {
    /**
    * Executes a 'right click' action on the item\\
    * @description
    *  Optionally, a relative position (X, Y) can be set to precise the position (otherwise, the center position is used)
    *
    * :!: __Technology specific:__ **WIN**, **UIAUTOMATION**, **FLEX**, **OCR**
    *
    * __Ex.:__
<code javascript>
// double click on button
MyAppli.MyPage.btSearch.clickRight();
// double click on button, with specific position
MyAppli.MyPage.btSearch.clickRight(30, 20);
</code>
    * @method clickRight
    * @path ctx.item.clickRight
    * @param {boolean} [bMouse] if 'true', the action simulates a 'mouse' click
    * @param {number} [X] relative horizontal position (compared to object top left position)
    * @param {number} [Y] relative vertical position (compared to object top left position)
    * @return {string} result value
    */
    this.clickRight = function (bMouse, X, Y) {
      var desc = this.getObjectDescriptor();
      if ( this._is(e.nature.SWG )) {
        return ctx.action(desc, 'clickRight', 'SETVALUE', '_RightClk_');
      } else {
        if ('string' === typeof X) X = parseInt(X, 10) || 0;
        if ('string' === typeof Y) Y = parseInt(Y, 10) || 0;
        var pos = undefined;
        if (('undefined' !== typeof X) && ('undefined' !== typeof Y)) pos = X + Y * 65536;
        if ( this._is(e.nature.UIAUTOMATION )) {
          bMouse = true; // RFCTBTN not impl. in UIA
        }
        return ctx.action(desc, 'clickRight', (bMouse ? 'RFCTBTNM' : 'RFCTBTN'), pos);
      }
    }
  }

  /** [internal use]
  * Clones a given item and attach it to a page
  * @description
  * __Ex.:__
<code javascript>
var it = this.btSearch.cloneItem(page);
</code>
  * @method cloneItem
  * @path ctx.item.cloneItem
  * @advanced
  * @param {ctx.page} parent parent page
  * @return {ctx.item} pg page object
  */
  this.cloneItem = function (parent) {
    if (!parent) {
        return null;
    }
    // copy characteristics
    var obj = {}, id;
    for (var i = 0; i < _copyData.length; i++) {
      id = _copyData[i];
      if (this[id]) { obj[id] = this[id]; }
    }
    var it = parent.addItem(this.name, obj);
    if (it) {
      // copy events
      for (var i in this.events) {
        var evObj = {};
        evObj[this.events[i].name] = '';
        it.addEvent(evObj);
      }
    }
    return it;
  }

  if ((this.occurs > 0) && (!this.count)) {
      /**
    * Returns the count of an occursed item.
    * @description
    * Count is provided on a mono-occursed item (item.occurs == 1)\\
    * If item is multi-occursed, count can be retrieved on the last occurence level.
    *
    * __Ex.:__
<code javascript>
// get the count of a '1' dimension array
var nb = MyAppli.MyPage.btEdit.count();
// get the count of the first row of a '2' dimension array
var nb = MyAppli.MyPage.oMap.i(0).count();
</code>
    * @method count
    * @path ctx.item.count
    * @return {number} item count
    */
    this.count = function () {
      if (this.nbOccurs) {
        return this.nbOccurs; // HLLAPI : static value provided during declaration
      } else {
        var desc = this.getObjectDescriptor();
        /** @type {number} */var res;
        var demoTimer = ctx.options.demoTimer; ctx.options.demoTimer = 0; // skip highlight
        var val = ctx.action(desc, 'count', 'GETVALUE', '', '_NbOccurs_');
        ctx.options.demoTimer = demoTimer;
        res = parseInt(val, 10);
        return res;
      }
    }
  }

  if (!this.ctxShort) {
    /**
     * Returns the short description for serialization
     * @ignore
     * @method ctxShort
     * @path ctx.item.ctxShort
     */
    this.ctxShort = function() {
      return ['ctxType', 'name', 'instance', 'parent', 'index'];
    }
  }

  /** [internal use]
  * Returns event object by its name (creates it if not previously defined)
  *
  * __Ex.:__
<code javascript>
var ev = this.btSearch.event('UPDATE');
</code>
  * @ignore
  * @method event
  * @path ctx.item.event
  * @param {string} name event name
  * @return {ctx.event} event object
  * @private
  */
  this.event = function (name) {
    var ev = this.events[name];
    if (!ev) {
      var evObj = {};
      evObj[name] = '';
      ev = this.addEvent(evObj);
    }
    return ev;
  }

  if (this.occurs == 0 && !this.execMethod && this._is(e.nature.SWG)) {

    /**
    * Executes a native Java method on the item
    * @description
    * :!: __Technology specific:__ **SWG**
    *
    * This method is used for advanced needs to execute native Java functions
    *
    * __Ex.:__
<code javascript>
// expands a row
MyJavaAppli.MyPage.oTree.execMethod('expandRow(int)', 2);

// disables a tree
MyJavaAppli.MyPage.oTree.execMethod('setEnabled(boolean)', false);

// gets selection state
var res = MyJavaAppli.MyPage.oTree.execMethod('isSelectionEmpty()');

// gets table cell value (parameters signature can be omitted if no ambiguity)
var res = MyJavaAppli.MyPage.oTable.execMethod('getValueAt', 1, 2);
</code>
    * @method execMethod
    * @path ctx.item.execMethod
    * @param {string} method name or prototype to be executed (parameters are basic Java types : int, long, string, boolean, ... )
    * @param {string|number|boolean} [arg] method argument(s) if any
    * @return {string} result value
    */
    this.execMethod = function (method, arg) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(this.getObjectDescriptor());
      return ctx.execMethod.apply(ctx, args);
    }
  }

  if ((this.occurs == 0) && (!this.execScript) && (this._is(e.nature.WEB, e.nature.WEB3))) {
    /**
    * Calls a function on an item
    * @description
    * __Note__ : This function is complementary to 'ctx.item.scriptItem', it extends the possibilities
    *
    * :!: __Technology specific:__ **WEB3**
    *
    * The purpose is to define a function with a generic prototype ''function func(element[, optional parameters]''
    * during execution, the 'element' parameter is replaced by the html object associated with the item
    *
    * __Ex.:__
<code javascript>
// create a function to change attributes
// - 'element' is the html object associated with item
// - 'obj' is an extra parameter (a javascript object containing attributes to be updates)
function changeObject(element, obj) {
  if (element) {
    for (var id in obj) { element[id] = obj[id]; }
  }
}
// inject function in the page
MyWebAppli.MyPage.injectFunction(changeObject);
// call the function
res = MyWebAppli.MyPage.oLogo.execScript('changeObject', {src: ..., alt : ...});
</code>
    * @method execScript
    * @path ctx.item.execScript
    * @throws {Error}
    * @param {...*} list
    * @return {string} result value
    */
    this.execScript = function (list) {
      var args = Array.prototype.slice.call(arguments);
      var res = '';
      var func = '';
      var params = '';
      var txt = '';
      var desc = this.getObjectDescriptor();
      if (args.length > 0) {
        func = args[0];
        if ('function' === typeof func) {
          // inject function before execution
          ctx.noNotify = true;
          desc.page.injectFunction(func);
          // get function name from reference
          func = func.toString().match(/function\s+([^\s\(]+)/)[1];
        }
        if (typeof func !== "string") throw new Error(e.error.InvalidArgument, 'ctx.item.execScript: Invalid argument 0 (should be a string)');
        // build the parameter list as a string : "a, b, c"
        for (var i = 1; i < args.length; i++) {
          if (params != '') {
            params += ', ';
          }
          if (typeof args[i] === 'undefined') {
            params += 'undefined';
          } else if (typeof args[i] === 'string') {
            params += ctx.serialize(args[i], true, false);
          } else if (args[i] instanceof ctx.event) {
            /** @type {ctx.event} */ var ev = args[i];
            params += ev.serialize(false, false);
          } else {
            params += ctx.serialize(args[i], false, false);
          }
        }
      }
      if (func) {
        res = ctx.actionApp(desc, 'execScript', 'CALLITEM', desc.itemFullName, func, params, '', '', '1.0.0.0');
      }
      return res;
    }
  }

  if ((this.occurs == 0) && (!this.exist)) {
    /**
    * Tests item existence
    * @description
    * __Ex.:__
<code javascript>
if (MyAppli.MyPage.btSearch.exist()) { ... }
</code>
    * @method exist
    * @path ctx.item.exist
    * @return {boolean} true if page exists
    */
    this.exist = function () { //
      try {
        var desc = this.getObjectDescriptor();
        return (ctx.action(desc, 'exist', 'EXISTE') == 'Yes' ? true : false);
      } catch (ex) {
        return false;
      }
    }
  }

  if ((this.occurs == 0) && (!this.get)) {
    /**
    * Gets item value
    * @description
    * __Ex.:__
<code javascript>
data.edName = MyAppli.MyPage.edName.get();
</code>
    * @method get
    * @path ctx.item.get
    * @param {boolean} [testExist] if true, test existence before reading value
    * @return {Object|string} result read value
    */
    this.get = function (testExist) {
      var desc = this.getObjectDescriptor();
      if (testExist && (!this.exist()))
        return '';

      // Windowless item collection
      if (this._is(e.nature.WIN) && this.customType == "WL")
      {
        return ctx.wkMng.CtxtAction("GETVALUE", desc.appliName, desc.pageName, desc.itemName + "[n]"
                  , 0, "", desc.appliInst, desc.pageInst, desc.itemInst);
      }
      var res = ctx.action(desc, 'get', 'GETVALUE');
      var obj = null;
      if (this._is(e.nature.SWG)) {
        obj = this._transcode(res);
      }
      return obj || res;
    }
  }

  if (this.occurs > 0) {
    /**
    * Gets item values in a multi-dimensional objects,
    * @description
    * @method _getOccursedObject
    * @ignore
    * @param {ctx.item} item item to be set
    //* @param {Array} obj object to be filled with read values
    * @param {boolean} [testExist] if true, test existence before getting value
    * @return {Array} result value
    */
    var _getOccursedObject = function(item, testExist) {
      var obj = [];
      if (item instanceof ctx.item) {
        if (item.occurs > 1) {
          // recurse call
          for (var index = 0; index < item.count(); index ++) {
            obj.push(_getOccursedObject(item.i(index), testExist));
          }
        } else if (item.occurs == 1) {
          // get values
          for (var index = 0; index < item.count(); index ++) {
            obj.push(item.i(index).get(testExist));
          }
        }
      } else {
        throw new Error(e.error.InvalidArgument, 'ctx.item.setAll: Invalid object');
      }
      return obj;
    }
  }

  if ((this.occurs > 0) && (!this.getAll)) {
    /**
    * Gets all item values in a multi-dimensional objects
    * @description
    *__Ex.:__
<code javascript>
var map = this.oAssignedCell.getAll();
// map contains :
// [ ["", "0001362", "1", "ford"],
// ["", "0000132", "15", "smith"],
// ["", "0000937", "4", "smith", "ford"],
// ["", "0001386", "smith", "jack"],
// ["", "0000828", "15", "smith", "jack"],
// ["", "0000265", "3", "smith", "jack"],
// ["", "0000700", "smith", "ford"] ]
</code>
    * @method getAll
    * @path ctx.item.getAll
    * @param {boolean} [testExist] if true, test existence before getting value
    * @return {*} a javascript Array object
    */
    this.getAll = function (testExist) {
      var obj = [];
      if (this._is(e.nature.WEB, e.nature.WEB3)) {
        // WEB3 connector provides a multi-dimension read function
        var args = [];
        for (var id = 0; id < this.occurs; id ++) {
          args.push('J'); // use JSON collect
        }
        var res = this.i.apply(this, args).get();
        //ctx.writeFile('getAll.txt', res);
        obj = ctx.unserialize(res, true);
      } else {
        // make a recursive read
        obj = _getOccursedObject(this, testExist);
      }
      return obj;
    }
  }

  if ((this.occurs == 0) && (!this.getAttribute) && this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Returns an object with item attributes
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    * \\
    * This method is just an alias of 'ctx.item.scriptItem()'
    *
    * __Ex.:__
<code javascript>
var att = MyWebAppli.MyPage.oLogo.getAttribute('href');
</code>
    * @method getAttribute
    * @path ctx.item.getAttribute
    * @param {string|Object} name attribute name or list of attributes
    * @return {*} result value
    */
    this.getAttribute = function (name) {
      return this.scriptItem(name);
    }
  }

  if ((this.occurs == 0) && (!this.getAttributes) && this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Returns an object with item attributes
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// get attribute list
var att = MyWebAppli.MyPage.oLogo.getAttributes();
</code>
    * @method getAttributes
    * @path ctx.item.getAttributes
    * @return {*} result value
    */
    this.getAttributes = function () {
      var desc = this.getObjectDescriptor();

      // create an injected function to list attributes
      /** @param {HTMLElement} element*/
      function ctxtGetAttributes(element) {
        var txt = '';
        try {
          var jsonFunc = ((typeof JSON !== 'undefined') && JSON.stringify ? JSON.stringify :
            ((typeof jQuery !== 'undefined') && jQuery.parseJSON ? jQuery.parseJSON :
            ((typeof jQuery !== 'undefined') && jQuery.toJSON ? jQuery.toJSON : null )));
          if (jsonFunc) {
            var obj = {};
            if (element) {
              for (var id in element.attributes) {
                obj[element.attributes[id].name] = element.attributes[id].value;
              }
            }
            return e.prefix.json + jsonFunc(obj);
          }
        } catch (ex) {}
          return txt;
      }

      var obj = null;
      try {
        // inject function
        //ctx.noNotify = true;
        //desc.page.injectFunction(ctxtGetAttributes);
        ctx.noNotify = true;
        var txt = desc.item.execScript(ctxtGetAttributes);
        obj = ctx.unserialize(txt);
      } catch (ex) { }
      ctx.notifyAction('getAttributes', obj, desc);
      return obj;
    }
  }

  if ((this.occurs == 0) && (!this.getCaptData)) {
    /**
    * Gets item value on page LOAD/UNLOAD, in 'CaptData' mode
    * @description
    * __Ex.:__
<code javascript>
MyAppli.MyPage.events.UNLOAD.on(function(ev) {
  // when 'MyPage' page unloads, get login/password
  obj.login = this.edLogin.getCaptData(ev);
  obj.password = this.edPassword.getCaptData(ev);
}
</code>
    * @method getCaptData
    * @path ctx.item.getCaptData
    * @param {ctx.event} ev event attached to the object
    * @return {string} action result
    */
    this.getCaptData = function (ev) {
      try {
        /** @type{string} */ var sEv = '';
        if (typeof ev.data === 'string') sEv = ev.data;
        var xml = ctx.xml.parse(sEv);
        var xmlNode = xml.selectSingleNode("//_Items_/" + this.name);
        // TODO : manage occursed items...
        return (xmlNode ? xmlNode.text : '');
      } catch(ex) {
        return '';
      }
    }
  }

  if ((this.occurs == 2) && (!this.getCol)) {
    /**
    * Gets the items of a given column in a 2-dimension array
    * @description
    * __Ex.:__
<code javascript>
var map = MyAppli.MyPage.oCells.getCol(1);
// map contains :
// [ "0001362", "0000132", "0000937", "0001386", "0000828", "0000265", "0000700" ]
</code>
    * @method getCol
    * @path ctx.item.getCol
    * @param {number|string} index column index
    * @return {*} result object
    */
    this.getCol = function (index) {
      var desc = this.getObjectDescriptor();
      var res = this.i('J', index).get();
      //ctx.writeFile('getCol.txt', res);
      var obj = ctx.unserialize(res, true);
      return obj;
    }
  }

//  if ((this.occurs == 0) && (!this.getInfos) && this._is(e.nature.WEB, e.nature.WEB3)) {
//    /**
//    * Returns an object with informations about the item
//    * @description
//    * :!: __Technology specific:__ **WEB**, **WEB3**
//    *
//    * __Ex.:__
//<code javascript>
//// get page information
//var infos = MyWebAppli.MyPage.oLogo.getInfos();
//// result :
//</code>
//    * @method getInfos
//    * @path ctx.item.getInfos
//    * @return {Object} result value
//    */
//    this.getInfos = function () {
//      var obj = null;
//      // get item outerHTML property, then convert it to an JS object
//      try {
//        var txt = this.scriptItem('outerHTML');
//        var xml = ctx.xml.parse(txt);
//        obj = ctx.xml.xml2object(xml)
//      } catch (ex) { }
//      return obj;
//    }
//  }

  if ((this.occurs == 0) && (!this.getList) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.SWG, e.nature.UIAUTOMATION))) {
    /**
    * Gets the list of values of a tree view or list view, as an XML string
    * @description
    * __Ex.:__
<code javascript>
var list = MyAppli.MyPage.tvList.getList());
</code>
    * @method getList
    * @path ctx.item.getList
    * @return {Object|string} result value
    */
    this.getList = function () { //
      var desc = this.getObjectDescriptor();
      var res = ctx.action(desc, 'getList', 'GETVALUE', '', '_GetList_');
      var obj = this._transcode(res);
      return obj || res;
    }
  }

  if (this.occurs == 0 && !this.getCell && this._is(e.nature.SWG)) {
    /**
    * Gets the a cell value of a table view, as a json string
    * @description
    * __Ex.:__
<code javascript>
var list = MyAppli.MyPage.tvList.getCell(1,2));
</code>
    * @method getCell
    * @param {number|string} row row index
    * @param {number|string} col column index
    * @path ctx.item.getCell
    * @return {Object|string} result value
    */
    this.getCell = function (row, col) { //
      var desc = this.getObjectDescriptor();
      var res = ctx.action(desc, 'getCell', 'GETVALUE', '', '_' + row + ',' + col + '_');
      var obj = this._transcode(res);
      return obj || res;
    }
  }

  if (!this.getObjectDescriptor) {
    /**
    * Returns object descriptor for the item
    * @description
    * __Ex.:__
<code javascript>
var desc = this.btSearch.getObjectDescriptor();
</code>
    * @ignore
    * @method getObjectDescriptor
    * @path ctx.item.getObjectDescriptor
    * @param {ctx.descriptor} [desc] initial descriptor object to be completed (if omitted, a new descriptor object is created)\\  (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
    * @return {ctx.descriptor} item object descriptor (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
    */
    this.getObjectDescriptor = function (desc) {
      if (!desc)
          desc = new ctx.descriptor();
      var object = this;
      if (object.parent) {
        desc = object.parent.getObjectDescriptor(desc); // recursive call for the parent page
        desc.item = this;
        desc.type = object.type;
        desc.nature = object.nature || desc.nature;
        if (object.name !== '') {
          desc.itemName = object.name;
        } else if (ctx.currentEvent) {
          desc.itemName = ctx.currentEvent.itemName;
        }
        desc.index = object.index;
        desc.itemInst = object.instance;
        desc.itemOccurs = object.occurs;
        desc.itemFullName = desc.itemName;
        for (var i = 0; i < desc.index.length; i++) {
          if (this.is(e.nature.HLLAPI)) {
            // for HLLAPI connector, index is relative to '1' and not '0'
            if (typeof(desc.index[i]) === 'string') {
              desc.index[i] = parseInt(desc.index[i], 10);
            }
            desc.index[i] = desc.index[i] + 1;
          }
          desc.itemFullName = desc.itemFullName + '[' + desc.index[i] + ']';
        }
      }
      return desc;
    }
  }

  if ((this.occurs == 0) && (!this.getProperty) && (this._is(e.nature.UIAUTOMATION, e.nature.OCR))) {
    /**
    * Gets a given property
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **OCR**, **FLEX**
    *
    * __Ex.:__
<code javascript>
var name = MyAppli.MyPage.tvList.getProperty('Name');
</code>
    * @method getProperty
    * @path ctx.item.getProperty
    * @param {string} name property name
    * @return {string} result value
    */
    this.getProperty = function (name) {
        var desc = this.getObjectDescriptor();
        return ctx.action(desc, 'getProperty', 'GETVALUE', '', '_' + name + '_');
    }
  }

  if ((this.occurs == 0) && (!this.getRect) && (this._is(e.nature.UIAUTOMATION, e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.OCR, e.nature.SAPGUI))) {
    /**
    * Gets the position and bounding of the item
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **WIN**, **WEB3**, **SWG**, **FLEX**, **OCR**
    *
    * __Ex.:__
<code javascript>
// get page content
var obj = MyAppli.MyPage.edSearch.getRect();
// obj = {x:68, y:157, cx:120, cy:32}
</code>
    * @method getRect
    * @path ctx.item.getRect
    * @param {ctx.descriptor} [desc] descriptor (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
    * @suppress {checkTypes}
    * @return {ctx.position} position object (see [[lib:ctx:ctx.core#class_ctxposition|ctx.position]])
    */
    this.getRect = function (desc) {
      desc = desc || this.getObjectDescriptor();
      //var str = ctx.actionApp(desc, 'getRect', 'GETRECT', desc.itemFullName);
      // var str = ctx.wkMng.CtxtActionApp('GETRECT', desc.appliName, desc.pageName, desc.itemFullName, '', '', '', '', desc.appliInst, desc.pageInst, desc.itemInst);
      ctx.noNotify = true;
      var str = ctx.actionApp(desc, 'getRect', 'GETRECT', desc.itemFullName, '', '', '', '');
      var obj = ctx.unserialize(str, true);
      /** @type {ctx.position} */ var rect = new ctx.position();
      ctx.set(obj, rect);
      /*if (this._is(e.nature.FLEX) && ctx.flex && ctx.flex.getContainerItem) {
        // flex connector returns relative position : add an offset with the containing item
        var it = ctx.flex.getContainerItem(desc.appliName, desc.appliInst);
        if (it) {
          var rect2 = it.getRect();
          if (rect2) {
            rect.x = rect.x + rect2.x;
            rect.y = rect.y + rect2.y;
          }
        }
      }*/
      return rect;
    }
  }

  if ((this.occurs == 2) && (!this.getRow)) {
    /**
    * Gets the items of a given row in a 2-dimension array
    * @description
    * __Ex.:__
<code javascript>
var map = MyAppli.MyPage.oCells.getRow(2);
// map contains :
// ["", "0000937", "4", "smith", "ford"],
</code>
    * @method getRow
    * @path ctx.item.getRow
    * @param {number|string} index row index
    * @return {*} result object
    */
    this.getRow = function (index) {
      var desc = this.getObjectDescriptor();
      var res = this.i(index, 'J').get();
      //ctx.writeFile('getRow.txt', res);
      var obj = ctx.unserialize(res, true);
      return obj;
    }
  }

  if ((!this.highlight) && (this._is(e.nature.UIAUTOMATION, e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.OCR, e.nature.SAPGUI))) {
    if (this.occurs > 0) {
      /**
      * Highlights occursed items
      * @description
      * @method _highlightOccursedObject
      * @ignore
      * @param {ctx.item} item item to be set
      * @param {number} [timer] highlight duration and wait in ms (500 ms by default). If '0', the item remains highlighted
      * @param {boolean} [visible] enable/disable highlight (true by default)
      * @param {boolean} [async] if true, and a timer is set, the function is asynchronous (it returns immediately and highlight is removed asynchronously after timer) (true by default)
      * @param {number} [color] default color ('ctx.options.highlightColor' by default)
      * @return {boolean} result value
      */
      var _highlightOccursedObject = function(item, timer, visible, async, color) {
        var res = true;
        if (item instanceof ctx.item) {
          if (item.occurs > 1) {
            // recurse call
            // item.count() does not work if occurs level > 1, try to read until you get an exception
            var index = 0;
            var loop = true;
            while(loop) {
              try {
                loop = _highlightOccursedObject(item.i(index), timer, visible, async, color);
                index ++;
              } catch (ex) {
                loop = false;
              }
            }
          } else if (item.occurs == 1) {
            // set end values
            var nb = item.count();
            if (nb == 0) return false;
            for (var index = 0; index < nb; index ++) {
              if (!item.i(index).highlight(timer, visible, async, color))
                return false;
            }
          }
        } else {
          throw new Error(e.error.InvalidArgument, 'ctx.item.setAll: Invalid object');
        }
        return res;
      }
    }

    /**
    * Highlights the item
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **WIN**, **WEB3**, **SWG**, **FLEX**, **OCR**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.MyItem.highlight();
</code>
    * @method highlight
    * @path ctx.item.highlight
    * @param {number} [timer] highlight duration and wait in ms (500 ms by default). If '0', the item remains highlighted
    * @param {boolean} [visible] enable/disable highlight (true by default)
    * @param {boolean} [async] if true, and a timer is set, the function is asynchronous (it returns immediately and highlight is removed asynchronously after timer) (true by default)
    * @param {number} [color] default color ('ctx.options.highlightColor' by default)
    * @return {boolean} result value
    */
    this.highlight = function (timer, visible, async, color) {
      var res = false;
      if (this.occurs == 0) {
        // simple item mode
        try {
          var desc = this.getObjectDescriptor();
          timer = (timer === undefined ? 500 : timer);
          var pos = this.getRect(desc);
          if (pos && (pos.cx || pos.cy)) {
            ctx.highlight(pos, timer, visible, async, color);
            res = true;
          }
        } catch (ex) {  }
      } else {
        // highlight recursively
        res = _highlightOccursedObject(this, timer, visible, async, color);
      }
      return res;
    }
  }

  if ((this.occurs == 0) && (!this.html) && (this._is(e.nature.WEB, e.nature.WEB3))) {
    /**
    * Gets the outerHtml content of the item
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
var val = MyWebAppli.MyPage.MyItem.html();
</code>
    * @method html
    * @path ctx.item.html
    * @return {string} result value
    */
    this.html = function () {
      var desc = this.getObjectDescriptor();
      return ctx.action(desc, 'html', 'GETVALUE', '', '_Html_');
    }
  }

  if ((this.occurs > 0) && (!this.i)) {
    /**
    * Accesses an occursed item
    * @description
    * if item is multi-occursed, indexes are given, separated by commas: .i(X, Y, ...)
    *
    * __Ex.:__
<code javascript>
// Gets the value of the 7th occurence of MyOccursItem
var strValue = MyAppli.MyPage.MyOccursItem.i(7).get();
</code>
    * @method i
    * @path ctx.item.i
    * @throws {Error}
    * @param {...(number|string)} arg a list of indexes. \\
    * Ex.: cell.i(2, 1) means cell[2][1]
    * @return {ctx.item} item object
    */
    this.i = function (arg) {
      //var args = slice.call( arguments, 1 );
      var args = Array.prototype.slice.call(arguments);
      if (args.length > this.occurs) {
        // you can not occur more than the number of dimensions
        throw new Error(e.error.InvalidArgument, 'ctx.item.i : invalid index for \'' + this.appli.name + '.' + this.page.name + '.' + this.name +'\'');
      }
      var index = this.index.concat(args);
      // return a copy with index Array, non occursed
      return new ctx.item(this.name, this.parent, { index: index, occurs: (this.occurs - args.length), mustExist: this.mustExist, mustNotExist: this.mustNotExist, type: this.type, customType: this.customType } );
    }

    /** alias used for Intellisense
    * @method $i
    * @path ctx.item.$i
    * @ignore
    */
    var args = [];
    for (var iOccurs = 0; iOccurs < this.occurs; iOccurs ++) {
      args.push(0);
    }
    this.$i = this.i.apply(this, args);
  }

  if ((this.occurs == 0) && (!this.innerHtml) && (this._is(e.nature.WEB, e.nature.WEB3))) {
    /**
    * Gets the innerHtml content of the item
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
var val = MyWebAppli.MyPage.oTab.innerHtml();
</code>
    * @method innerHtml
    * @path ctx.item.innerHtml
    * @return {string} result value
    */
    this.innerHtml = function () {
      var desc = this.getObjectDescriptor();
      return ctx.action(desc, 'innerHtml', 'GETVALUE', '', '_InnerHtml_');
    }
  }

  /**
  * Checks if the nature of the parent page of the item is part of the given list
  * @description
  * __Ex.:__
<code javascript>
// Test if object belongs to a WEB page
if ( MyAppli.MyPage.MyItem.is(e.nature.WEB, e.nature.WEB3)) {...}
</code>
  * @method is
  * @path ctx.item.is
  * @advanced
  * @param {...string} arg list of natures (ex.: 'WEB', 'WEB3', 'WIN', ...)
  * @return {boolean} result (true if compatible)
  */
  this.is = function (arg) {
    return this._is(arg);
  }

  if ((this.occurs == 0) && (!this.isEnabled) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.SWG, e.nature.UIAUTOMATION))) {
    /**
    * Checks if item is enabled
    * @description
    * :!: __Technology specific:__ **WIN**, **SWG**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
if (MyAppli.MyPage.btSearch.isEnabled()) { ... }
</code>
    * @method isEnabled
    * @path ctx.item.isEnabled
    * @return {boolean} result true if enabled
    */
    this.isEnabled = function () { //
      var desc = this.getObjectDescriptor();
      return (ctx.action(desc, 'isEnabled', 'GETVALUE', '', '_Enabled_') != 'No');
    }
  }

  if ((this.occurs == 0) && (!this.isVisible) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.SWG, e.nature.UIAUTOMATION))) {
    /**
    * Checks if item is visible
    * @description
    * :!: __Technology specific:__ **WIN**, **SWG**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
if (MyAppli.MyPage.btSearch.isVisible()) { ... }
</code>
    * @method isVisible
    * @path ctx.item.isVisible
    * @return {boolean} result true if visible
    */
    this.isVisible = function () { //
      var desc = this.getObjectDescriptor();
      return (ctx.action(desc, 'isVisible', 'GETVALUE', '', '_Visible_')  != 'No');
    }
  }

  if ((this.occurs == 0) && (!this.keyStroke) && (this._is(e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.UIAUTOMATION, e.nature.OCR))) {
    /**
    * Sends a sequence of keys to the item
    * @description
    * the list of pre-defined keys is defined in enumeration : [[:lib:common:ctx.enum#enumeration_ekey|e.key]]
    *
    * :!: __Technology specific:__ **WEB3**, **UIAUTOMATION**, **SWG**, **OCR**, **FLEX**
    *
    * __Ex.:__
<code javascript>
// set address, then send 'Enter key'
MyAppli.MyPage.edSearch.set(searchAddress);
MyAppli.MyPage.edSearch.keyStroke(e.key.Enter);
</code>
    * @method keyStroke
    * @path ctx.item.keyStroke
    * @param {string} command key sequence or text to be sent (see [[:lib:common:ctx.enum#enumeration_ekey|e.key]])
    * @return {string} result value
    */
    this.keyStroke = function (command) {
      var desc = this.getObjectDescriptor();
      var prefix = '_KeyStroke_';
      if (this._is(e.nature.UIAUTOMATION, e.nature.OCR))
        command = ctx.keyStrokeMapping(command); // specific mapping
      if (this._is(e.nature.SWG))
        prefix = '_Key_';
      return ctx.action(desc, 'keyStroke', 'SETVALUE', command, prefix);
    }
  }

  if ((this.occurs == 0) && (!this.keyStroke2) && (this._is(e.nature.UIAUTOMATION, e.nature.OCR, e.nature.SWG,e.nature.WIN))) {
    /**
    * Sends a sequence of keys to the item (alternative method compared to ctx.item.keyStroke)
    * @description
    * the list of pre-defined keys if defined in enumeration : [[:lib:common:ctx.enum#enumeration_ekey|e.key]]
    *
    * :!: __Technology specific:__ **UIAUTOMATION**, **OCR**
    *
    * __Ex.:__
<code javascript>
// set value as a key sequence
MyAppli.MyPage.edSearch.keyStroke2('John');
</code>
    * @method keyStroke2
    * @path ctx.item.keyStroke2
    * @param {string} command key sequence or text to be sent
    * @return {string} result value
    */
    this.keyStroke2 = function (command) {
      var desc = this.getObjectDescriptor();
      if (this._is(e.nature.UIAUTOMATION))
        command = ctx.keyStrokeMapping(command); // UIAutomaion has a specific mapping
      return ctx.action(desc, 'keyStroke2', 'SETVALUE', command, '_KeyStroke2_');
    }
  }


  if ((this.occurs == 0) && (!this.refresh) && (this._is(e.nature.UIAUTOMATION))) {
    /**
    * Refreshes the cache of the item
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
MyUIAAppli.MyPage.tvList.refresh();
</code>
    * @method refresh
    * @path ctx.item.refresh
    * @return {string} result value
    */
    this.refresh = function () {
        var desc = this.getObjectDescriptor();
        return ctx.actionApp(desc, 'refresh', 'REFRESH', desc.itemFullName);
    }
  }

  if ((this.occurs == 0) && (!this.scriptItem) && (this._is(e.nature.WEB, e.nature.WEB3))) {
    /**
    * Gets or sets html item attributes or sets of attributes
    * @description
    * :!: __Technology specific:__ **WEB3**
    *
    * __Ex.:__
<code javascript>
// get an attribute
var src = MyWebAppli.MyPage.oLogo.scriptItem ("src");
// set an attribute
MyWebAppli.MyPage.oLogo.scriptItem ("src='http://....png'");
// multiple parameters update (using a list of individual parameters)
MyWebAppli.MyPage.oLogo.scriptItem ( 'src="http://....png"', 'alt="..."');
// multiple parameters update (using an object)
MyWebAppli.MyPage.oLogo.scriptItem ({src: 'http://....png', alt :'...', 'background-color': '#e8e8e8'});
// multiple parameters reading (using an object with 'null' attributes)
var obj = {src: null, alt: null};
res = MyWebAppli.MyPage.oLogo.scriptItem( obj ); // returned 'obj' contains : {src: 'http://....png', alt :'...', }
</code>
    * @method scriptItem
    * @path ctx.item.scriptItem
    * @throws {Error}
    * @param {...*} list a list of individual attributes or objects
    * @return {string} result value
    */
    this.scriptItem = function (list) { //
      var args = Array.prototype.slice.call(arguments);
      var res = '';
      var code = '';
      var params = '';
      var txt = '';
      if (args.length > 0) {
        code = args[0];
        if (typeof code === "object") {
          // multiple parameters update, ex : this.oLogo.scriptItem ({src: 'http://....png', alt :'...', 'background-color': '#e8e8e8'});
          // recursive call :
          for (var id in code) {
            if ((code[id] === undefined) || (code[id] === null)) {
              // get the property
              res = this.scriptItem(id);
              code[id] = res;
            } else {
              // set the property
              res = this.scriptItem(id + '=' + ctx.serialize(code[id], true, false));
              if (res != code[id]) break;
            }
          }
          return res;
        }
        if (typeof code !== "string") throw new Error(e.error.InvalidArgument, 'ctx.item.scriptItem: Invalid argument 0 (should be a string)');
        for (var i = 1; i < args.length; i++) {
          if ((typeof args[i] !== 'undefined') && (params != '')) {
            params += ', ';
          }
          if (typeof args[i] === 'string') {
            params += ctx.serialize(args[i], true, false);
          } else {
            params += ctx.serialize(args[i], false, false);
          }
        }
      }
      if (params != '') {
        code += '(' + params + ')';
      }
      if (code) {
        var desc = this.getObjectDescriptor();
        res = ctx.actionApp(desc, 'scriptItem', 'SCRIPTITEM', desc.itemFullName, code);
      }
      return res;
    }
  }

  if ((this.occurs == 0) && (!this.select) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.SWG, e.nature.UIAUTOMATION))) {
    /**
    * Selects or unselects a value in a tree view
    * @description
    * :!: __Technology specific:__ **WIN**, **SWG**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
// select the 'Network' element in a tree view
MyAppli.MyPage.tvList.select(true, 'Network');
   </code>
    * @method select
    * @path ctx.item.select
    * @param {boolean} [set=true] select (true) or unselect (false)
    * @param {string} [value] for a tree view, the name of the element to be selected/unselected
    * @return {string} result value
    */
    this.select = function (set, value) { //
      var desc = this.getObjectDescriptor();
      return ctx.action(desc, 'select', 'SETVALUE', value, ((set === false) ? '_UnSelect_' : '_Select_'));
    }
  }

  if ((this.occurs == 0) && (!this.selected) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.SWG, e.nature.UIAUTOMATION))) {
    /**
    * Gets the selected value for a tree view or list view
    * @description
    * :!: __Technology specific:__ **WIN**, **SWG**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
// get the current selection in the tree view
var val = MyAppli.MyPage.tvList.selected());
</code>
    * @method selected
    * @path ctx.item.selected
    * @return {*|boolean} result value
    */
    this.selected = function () {
      var desc = this.getObjectDescriptor();
      var res = ctx.action(desc, 'selected', 'GETVALUE', '', '_Selected_');
      if ((res == 'Yes') || (res == 'yes')) return true;
      if ((res == 'No') || (res == 'no')) return false;
      var obj = this._transcode(res);
      return obj || res;
    }
  }

  if ((this.occurs == 0) && (!this.selectByIndex) && (this._is(e.nature.SWG))) {
    /**
    * Selects one or several element (based on its index) in a list view, tab control, tree view, ...
    * @description
    * :!: __Technology specific:__ **SWG**
    *
    * __Ex.:__
<code javascript>
// select an element in a list view
MyJavaAppli.MyPage.oList.selectByIndex(3);

// select several elements in a list view
MyJavaAppli.MyPage.oList.selectByIndex([1, 3, 5]);

// click on the second tab in a tab control
MyJavaAppli.MyPage.tbCategory.selectByIndex(1);
</code>
    * @method selectByIndex
    * @path ctx.item.selectByIndex
    * @param {number|Array<number>} selector index or array of indexes to be selected
    * @param {string} [prefix] optional prefix to select the node (for non standard 'JTree' objects for instance)
    * @return {string} result value
    */
    this.selectByIndex = function (selector, prefix) { //
      /** @type {Array<number>} */ var arr;
      if (typeof selector === 'number') {
        arr = [selector];
      } else {
        arr = selector;
      }
      var sValue = '';
      ctx.each(arr, function(id, value) {
        if (sValue != '') sValue += ','; // separator
        if (prefix) sValue += prefix + ': ';
        sValue += value;
      });

      var desc = this.getObjectDescriptor();
      return ctx.action(desc, 'selectByIndex', 'SETVALUE', 'index:[' + sValue + ']');
    }
  }

  if ((this.occurs == 0) && (!this.selectByName) && (this._is(e.nature.SWG))) {
    /**
    * Selects an element (based on its name) in a list view, tab control, tree view, ...
    * @description
    * :!: __Technology specific:__ **SWG**
    *
    * __Ex.:__
<code javascript>
// in a tree view, select the node 'Music', then the sub node 'Classical'
MyJavaAppli.MyPage.oTree.selectByName(['Music', 'Classical']);

// in a tree view, unselect all nodes
MyJavaAppli.MyPage.oTree.selectByName(['']);

// in a tab control, click on tab 'Notes'
MyJavaAppli.MyPage.tbCategory.selectByName('Notes');
</code>
    * @method selectByName
    * @path ctx.item.selectByName
    * @param {string|Array<string>} selector string or array of node names to be selected
    * @param {string} [prefix] optional prefix to select the node (for non standard 'JTree' objects for instance)
    * @return {string} result value
    */
    this.selectByName = function (selector, prefix) {
      /** @type {Array<string>} */ var arr;
      if (typeof selector === 'string') {
        arr = [selector];
      } else {
        arr = selector;
      }
      var sValue = '';
      ctx.each(arr, function(id, value) {
        if (sValue != '') sValue += ','; // separator
        if (prefix) sValue += prefix + ': ';
        sValue += value;
      });
      var desc = this.getObjectDescriptor();
      return ctx.action(desc, 'selectByName', 'SETVALUE', 'item:[' + sValue + ']');
    }
  }

  if ((this.occurs == 0) && (!this.set)) {
    /**
    * Sets item value
    * @description
    * __Ex.:__
<code javascript>
MyAppli.MyPage.MyItem.set(data.edName);
</code>
    * @method set
    * @path ctx.item.set
    * @param {string} value value to be set
    * @param {boolean} [testExist] if true, test existence before setting value
    * @param {boolean} [ifDefined] if true, set value only if defined
    * @return {string} result value
    */
    this.set = function (value, testExist, ifDefined) {
      var desc = this.getObjectDescriptor();
      if ((typeof value === 'undefined') || (ifDefined && (!value)) || (testExist && (!this.exist())))
        return '';
	  // In OCR, set() method is mapped to keystroke, so we need to execute mapping for Enter, ...
      if (this._is(e.nature.OCR))
	      value = ctx.keyStrokeMapping(value);
      return ctx.action(desc, 'set', 'SETVALUE', value);
    }
  }

  if (this.occurs == 0 && !this.setCell && this._is(e.nature.SWG)) {
    /**
    * Sets item value
    * @description
    * __Ex.:__
<code javascript>
    MyAppli.MyPage.MyItem.setCell(row, col, data);
</code>
    * @method setCell
    * @path ctx.item.setCell
    * @param {number} row row where to set
    * @param {number} col col where to set
    * @param {string} value value to be set
    * @param {boolean} [testExist] if true, test existence before setting value
    * @param {boolean} [ifDefined] if true, set value only if defined
    * @return {string} result value
    */
    this.setCell = function (row, col, value, testExist, ifDefined) {
      if ((typeof value === 'undefined') || (ifDefined && !value) || (testExist && !this.exist()))
        return '';
      var desc = this.getObjectDescriptor();
      return ctx.action(desc, 'setCell', 'SETVALUE', 'set['+ row +','+ col +']:'+ value);
    }
  }

  if (this.occurs > 0) {
    /**
    * Sets item values in a multi-dimensional objects, from an array object
    * @description
    * @method _setOccursedObject
    * @ignore
    * @param {ctx.item} item item to be set
    * @param {Object} obj object contining values to be set
    * @param {boolean} [testExist] if true, test existence before setting value
    * @param {boolean} [ifDefined] if true, set value if defined
    * @return {string} result value
    */
    var _setOccursedObject = function(item, obj, testExist, ifDefined) {
      var res = '';
      if (item instanceof ctx.item) {
        if (item.occurs > 1) {
          // recurse call
          for (var id in obj) {
            _setOccursedObject(item.i(id), obj[id], testExist, ifDefined)
          }
        } else if (item.occurs == 1) {
          // set end values
          for (var id in obj) {
            res = item.i(id).set(obj[id], testExist, ifDefined);
          }
        }
      } else {
        throw new Error(e.error.InvalidArgument, 'ctx.item.setAll: Invalid object');
      }
      return res;
    }
  }

  if ((this.occurs > 0) && (!this.setAll)) {
    /**
    * Sets item values in a multi-dimensional objects, from an array object
    * @description
    *__Ex.:__
<code javascript>
// modify lines '1', '4', '5'
var obj = {
  '1' : {
    '0': "0001362",
    '1' : "1",
    '2' : "ford"
  },
  '4' : {
    '0': "0000132",
    '1': "15",
    '2': "smith"
  },
  '5' : {
    '0': "0000265",
    '1': "3",
    '2': "jack"
  }
};
MyAppli.MyPage.oCells.setAll(obj);
</code>
    * @method setAll
    * @path ctx.item.setAll
    * @param {Object} obj object contining values to be set
    * @param {boolean} [testExist] if true, test existence before setting value
    * @return {string} result value
    */
    this.setAll = function (obj, testExist) {
      return _setOccursedObject(this, obj, testExist);
    }
  }

  if ((this.occurs == 0) && (!this.setFocus)) {
    /**
    * Sets focus on an item
    * @description
    * __Ex.:__
<code javascript>
MyAppli.MyPage.MyItem.setFocus();
</code>
    * @method setFocus
    * @path ctx.item.setFocus
    * @return {string} result value
    */
    this.setFocus = function () { //
      var desc = this.getObjectDescriptor();
      return ctx.action(desc, 'setFocus', 'SETFOCUS');
    }
  }

  if ((this.occurs == 0) && (this._is(e.nature.WEB, e.nature.WEB3))) {
    /**
    * Changes the property value of an item
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**, **MESSBOX**
    *
    * __Ex.:__
<code javascript>
// hide object
MyWebAppli.MyPage.oLogo.setStyle ('visibility', 'hidden');
// hide object
MyWebAppli.MyPage.oTab.setStyle ('display', 'none');
// set border
MyWebAppli.MyPage.oId.setStyle ('border', '5px dotted red');
</code>
    *
    * __Note:__ the ''ctx.item.scriptItem'' method should use instead, as being more generic
    *
    * __Ex.:__
<code javascript>
// using 'setStyle' :
MyWebAppli.MyPage.oLogo.setStyle ('visibility', 'hidden');
// equivalent using 'scriptItem' :
MyWebAppli.MyPage.oLogo.scriptItem ('style.visibility="hidden"');
</code>
     * @method setStyle
     * @ignore
     * @path ctx.item.setStyle
     * @deprecated This method is available for compatibility reason. You should use ''ctx.item.scriptItem'' instead.
     * @param {string} style style to be modified : possible values are : ''display | border | visibility''
     * @param {string} value value to be applied :\\  - display: none/block \\  - visibility: visible/hidden \\  - ...
     * @return {string} result value
     */
    this.setStyle = function (style, value) { //
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'setStyle', 'SETSTYLE', desc.itemFullName, style, value);
    }
  }

  if (this.occurs == 0) {
    /**
    * Gets or sets item value. This function is equivalent to 'set' and 'get' function
    * @description
    * __Ex.:__
<code javascript>
// get a value
data.edName = MyAppli.MyPage.edName.text();
// set a value
MyAppli.MyPage.edName.text(data.edName);
</code>
    * @method text
    * @deprecated use 'ctx.item.get' or 'ctx.item.set' instead
    * @path ctx.item.text
    * @advanced
    * @param {string} [value] if undefined, reads value, otherwise sets value
    * @return {*} action result
    */
    this.text = function (value) {
      if (typeof value !== 'undefined')
        return this.set(value);
      else
        return this.get();
    }
  }

  if ((this.occurs == 0) && (!this.tooltip) && (this.getRect)) {
    /**
    * Displays a tooltip close to the object
    * @description
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.MyItem.tooltip({
  message: "<b>This is a tooltip</b><br/>Extra information here<br/> ",
  icon: e.popup.icon32.info,
  color: e.popup.color.Green,
  position: e.popup.tooltipPosition.Right
});
</code>
    * @method tooltip
    * @path ctx.item.tooltip
    * @param {ctx.popupParams} params parameter object
    * @param {function(*)} [callback] optional callback called when the tooltip is closed
    * @return {ctx.popupClass} result value
    */
    this.tooltip = function (params, callback) {
      var desc = this.getObjectDescriptor();
      ctx.notifyAction('tooltip', '', desc);
      params = params || {};
      params.name = params.name || 'pTooltip' + this.appli.name + this.page.name + this.name;
      params.template = params.template || e.popup.template.Tooltip;
      ctx.noNotify = true;
      params.position = this.getRect();
      return ctx.popup(params.name).open(params, false, callback);
    }
  }

  if ((this.occurs == 0) && (!this.trigger) && (this._is(e.nature.WEB, e.nature.WEB3))) {
    /**
    * Triggers an html event
    * @description
    * :!: __Technology specific:__ **WEB3**
    *
    * __Ex.:__
<code javascript>
</code>
    * @method trigger
    * @path ctx.item.trigger
    * @throws {Error}
    * @param {e.html.event} event event to be triggered
    * @param {Object} [options] event options
    * @return {*} result value
    */
    this.trigger = function (event, options) {
      ctx.notifyAction('trigger');
      var desc = this.getObjectDescriptor();
      /** create an injected function to trigger event
      * @param {HTMLElement} element
      * @param {e.html.event} event
      * @param {Object} [options]
      */
      function ctxtTriggerEvent(element, event, options) {
        var res = '';
        var onevent = 'on' + event;
        try {
          if ('function' === typeof element.dispatchEvent) {
            if ('function' === typeof document.createEvent) {
              var ev = document.createEvent("Event");
              ev.initEvent(event, true, true);
              res = element.dispatchEvent(ev);
            } else {
              var ev = new Event(event);
              res = element.dispatchEvent(ev);
            }
          } else if ('function' === typeof element[onevent]) {
            res = element[onevent].apply(element);
          } else if ('function' === typeof element.fireEvent) {
            var ev = document.createEventObject();
            res = element.fireEvent(onevent, ev);
          }
        } catch (ex) {
          res = "ctxtTriggerEvent(" + event + ") failed: " + ex.message;
        }
        return res;
      }

      var obj = null;
      try {
        // inject function
        //ctx.noNotify = true;
        //desc.page.injectFunction(ctxtTriggerEvent);
        ctx.noNotify = true;
        var txt = desc.item.execScript(ctxtTriggerEvent, event, options);
        obj = ctx.unserialize(txt);
      } catch (ex) { }
      return obj;
    }
  }

  if ((this.occurs == 0) && (!this.wait)) {
    /**
    * Waits until an item is present, then calls a callback
    * @description
    * The behaviour is the following :
    *   * if the item already exists, the callback is immediately called
    *   * else a polling is triggered to loop on item existence.
    *
    * __Ex.:__
<code javascript>
// wait for page 'MyAppli.MyPage.MyItem'
MyAppli.MyPage.MyItem.wait(function(ev) {
  // add code here, to be executed when page is present
});
</code>
    *
    * <WRAP tip>You can use 'snippets' to accelerate development :
    *   * **<item>.wait** + 'TAB' :
    *
<code javascript>
<item>.wait(function(ev) {
  ...
}, 0);
</code>
    * </WRAP>
    * @method wait
    * @path ctx.item.wait
    * @param {function(ctx.event)} callback callback to be called when page is present
    * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
    * @param {number} [timeout] optional timeout duration for the polling (default is 10 s)
    * @return {Object} an object to be provided to 'ctx.off()' to disable listening
    */
    this.wait = function (callback, delay, timeout) {
			delay = delay||0;

			var desc = this.getObjectDescriptor();
      ctx.notifyAction('wait', '', desc);
      timeout = timeout || 10000;
      var interval = 250; // 4 loops per second
      var nbMax = Math.ceil(timeout / interval);
			
			if (delay) {

				ctx.wait(function(ev) {

		      var res = ctx.polling({
		        delay: interval,
		        nbMax: nbMax, // infinite loop
		        test: function(iLoop) {
		          return _item.exist();
		        },
		        done: function() {
		          if (callback && ('function' === typeof(callback))) {
		            callback.apply(this, [ctx.currentEvent]);
		          }
		        },
		        fail: function() {
		          ctx.log('ctx.item.wait : timeout', e.logIconType.Warning);
		        }
		      });
					
				}, delay);
				return null;
				
			}
			else {
				
	      var res = ctx.polling({
	        delay: interval,
	        nbMax: nbMax, // infinite loop
	        test: function(iLoop) {
	          return _item.exist();
	        },
	        done: function() {
	          if (callback && ('function' === typeof(callback))) {
	            callback.apply(this, [ctx.currentEvent]);
	          }
	        },
	        fail: function() {
	          ctx.log('ctx.item.wait : timeout', e.logIconType.Warning);
	        }
	      });
	      return res;
				
			}
    }
  }

  if ((this.occurs == 0) && (!this.xml) && (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.SWG, e.nature.UIAUTOMATION, e.nature.OCR))) {
    /**
    * Gets a value, formatted in XML format
    * @description
    * :!: __Technology specific:__ **WIN**, **SWG**, **UIAUTOMATION**, **OCR**
    *
    * __Ex.:__
<code javascript>
var strXml = MyAppli.MyPage.edName.xml();
</code>
    * @method xml
    * @path ctx.item.xml
    * @return {*} result string containing value in Xml format
    */
    this.xml = function () {
      var desc = this.getObjectDescriptor();
      return ctx.action(desc, 'xml', 'GETVALUE', '', '_Xml_');
    }
  }

  // declare dynamically tracked events
  for (var evName in this.trackEvents)
  {
    var objEvent = {};
    objEvent[evName] = '';
    this.addEvent(objEvent, true);
    // declare it also for the page and the application
    this.page.addEvent(objEvent, true);
    this.appli.addEvent(objEvent, true);
  }

  // add standard technical events
  //  if (this._is(e.nature.EXEWIN, e.nature.WIN)) {
  //    this.addEvent({ CLICK: '', COMMAND: '', SETFOCUS: '', KILLFOCUS: '', ENABLE: '', DISABLE: '', SHOW: '', HIDE: '' });
  //  } else if (this._is(e.nature.WEB, e.nature.WEB3)) {
  //    this.addEvent({ CLICK: '', COMMAND: '', SETFOCUS: '', KILLFOCUS: '', CHANGE: '' });
  //  } else if (this._is(e.nature.UIAUTOMATION)) {
  //    this.addEvent({ COMMAND: '', SETFOCUS: '', KILLFOCUS: '', ENABLE: '', DISABLE: '', SHOW: '', HIDE: '', CHANGE: '' });
  //  } else if (this._is(e.nature.HLLAPI)) {
  //  } else if (this._is(e.nature.SWG)) {
  //    this.addEvent({ COMMAND: '', SETFOCUS: '', KILLFOCUS: '', KEY: '', MOUSE: '', ENTER: '', DBLCLK: '' });
  //  }
}
