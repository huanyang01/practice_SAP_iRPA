/**
 * @module      Windows Management Interface (WMI)
 * @file        utils/wmi.js
 * @description
 *  This library contains the query functions that spies on computer and allows to retrieve information on current execution environment.
 *
 *   * init( ) to initialize the WMI extension or to create WMI object, end( ) to delete the WMI object.
 *   * query( ) to return an array with the collected information.
 *   * display( ) to format the result as a string.
 *
 *  // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 *
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * Options for the 'ctx.wmi' library
 * @namespace  ctx.options.wmi
 * @path       ctx.options.wmi
 */
ctx.options.wmi = {
 /**
  * Selected trace level for the 'ctx.wmi' library (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
  * @property  {e.trace.level} traceLevel
  * @default   e.trace.level.None
  * @path      ctx.options.wmi.traceLevel
  */
  traceLevel: e.trace.level.None
};

/**
 * Class for Windows Management Interface (WMI)
 * @class        ctx.wmi
 * @constructor
 * @path         ctx.wmi
 */
ctx.wmi = (function() {
  // private variables
  /** @type {Object} */
  var _options = ctx.options.wmi;
  /** @type {SWbemServices} */
  var _wmiApp = null; // wmi application
  var _wmi =
  /** @lends ctx.wmi */
  {
   /**
    * Initializes the WMI application.
    * @method      init
    * @description
    *  The <wrap box>**init( )**</wrap> method of ''ctx.wmi'' class initializes the WMI application.
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wmi.init( );</code>
    * @throws      {Error}
    * @path        ctx.wmi.init
    */
    init: function() {
      try {
        // try to get WMI object
        if (_wmiApp === null) {
          _wmiApp = GetObject("winmgmts:");
        }
      } catch (ex) {
        try {
          // create WMI object
          if (_wmiApp === null) {
            var strComputer = ".";
            /** @type {SWbemLocator} */
            var loc = new ActiveXObject("WbemScripting.SWbemLocator");
            _wmiApp = loc.ConnectServer(strComputer, "/root/CIMV2");
          }
        } catch (ex2) {
          addLog("wmi.init : Exception : " + ex2.description);
          throw new Error(e.error.KO, '[wmi.init] Failed to start wmi. '+ ex2.description);
        } // try..catch
        //addLog(' *** wmi.init(): KO *** Error ' + ex.description);
        throw new Error(e.error.KO, '[wmi.init] Failed to start wmi. '+ ex.description);
      } // try..catch
    },

   /**
    * Generates a query as an XML string.
    * @method      display
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wmi.display( tab, "LoginProfile", "LoginProfiles" );</code>
    * @param       {Array<string>} tab
    * @param       {string} [item] The item name
    * @param       {string} [category] The category name
    * @path        ctx.wmi.display
    */
    display: function(tab, item, category) {
      ctx.notifyAction('ctx.wmi.display');
      if (category) {
        category = category.replace(/ /g,"_");
        _wmi.log('  <' + category + '>');
      }
      ctx.each(tab, function(id, node) {
        if (item)
          _wmi.log('    <' + item + '>');
        ctx.each(node, function(id, value) {
          var iReman = id.replace(/ /g,"_");
          _wmi.log('      <' + iReman + '><![CDATA[' + value + ']]></' + iReman + '>');
        });
        //var text = ctx.json.stringify(value);
        if (item)
          _wmi.log('    </' + item + '>');
      });
      if (category)
        _wmi.log('  </' + category + '>');
    },

   /**
    * Ends the WMI application.
    * @method       end
    * @description
    *  The <wrap box>**end( )**</wrap> method of ''ctx.wmi'' class ends the WMI application.
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wmi.end( );</code>
    * @path         ctx.wmi.end
    */
    end: function() {
      if (_wmiApp != null) {
        _wmiApp = null;
      }
    },

   /**
    * Kills a process based on its ID.
    * @method      killProcess
    * @param       {number} pid The ID of process to kill
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wmi.killProcess( 156 );</code>
    * @path        ctx.wmi.killProcess
    */
    killProcess: function(pid) {
      _wmi.init();
      var proc = _wmiApp.Get("Win32_Process.Handle='" + pid + "'");
      if (proc) {
        proc.Terminate();
      }
    },

   /**
    * Logs a single line.
    * @method      log
    * @description
    *  <wrap help> //Example://</wrap>
    *  <code javascript> ctx.wmi.log( "</" + item + ">" );</code>
    * @param       {string} text The text value to generate
    * @path        ctx.wmi.log
    */
    log: function(text) {
      addLog(text);
    },

   /**
    * Performs a WMI query.
    * @method      query
    * @description
    *  Gets a list of informations about of the parameters from a WMI section.
    *
    *  <wrap help> //Example://</wrap>
    *  <code javascript>
    *   tab = ctx.wmi.query( "Win32_NetworkLoginProfile", ["Name", "LastLogon"] );
    *
    *   tab = ctx.wmi.query( "Win32_NTEventLogFile", ["FileName", "Name", "FileSize", "NumberOfRecords", "LastModified"], "NumberOfRecords!=0" );</code>
    * @throws      {Error}
    * @param       {string} section WMI section to search
    * @param       {Array<string>} [params] Array of attributs (if undefined, all attributes)
    * @param       {string} [where] Selection string
    * @return      {Array<string>} Results of the WMI query
    * @path        ctx.wmi.query
    */
    query: function(section, params, where) {
      ctx.notifyAction('ctx.wmi.query');
      _wmi.init();

      try {
        // @type {Array}
        var tab = [];
        var select = '';
        if (params) {
          // select only mentioned properties
          for (var i = 0; i < params.length; i++) {
            if (select != '')
              select += ', ';
            select = select + params[i];
          }
        }
        if (select == '') {
          // select all properties
          select = '*';
        }
        if (select != '') {
          select = 'SELECT ' + select + ' FROM ' + section;
          if (where) {
            select = select + ' WHERE ' + where;
          }
          // var query = GetObject("winmgmts:").InstancesOf ("Win32_Printer");
          // var query = GetObject("winmgmts:").ExecQuery(select, "WQL", 0);
          var query = _wmiApp.ExecQuery(select);
          var value;
          for (var e = new Enumerator(query); !e.atEnd(); e.moveNext()) {
            var p = e.item();
            if (p) {
              var elem = {};
              if (params) {
                // enumerate mentioned properties
                for (var i = 0; i < params.length; i++) {
                  try {
                    value = p[params[i]];
                    if (typeof value === 'unknown') {
                      // Array of Variant
                      var objArray = new VBArray(value);
                      var jArray = objArray.toArray();
                      elem[params[i]] = jArray;
                    } else {
                      elem[params[i]] = value;
                    }
                  } catch (ex) {
                    elem[params[i]] = 'undefined';
                  }
                }
              } else {
                // enumerate WMI object properties
                var objProperties = new Enumerator(p.Properties_);
                for (; !objProperties.atEnd(); objProperties.moveNext()) {
                  var objProperty = objProperties.item();
                  try {
                    if (objProperty.Value)
                      elem[objProperty.Name] = objProperty.Value;
                  } catch (ex) {
                  }
                }
              }
              tab.push(elem);
            }
          }
        }
        return tab;
      } catch (ex){
        throw new Error(e.error.KO, '[wmi.init] Failed to perform WMI query. '+ ex.description);
      }
    }
  };

  return _wmi;
}());