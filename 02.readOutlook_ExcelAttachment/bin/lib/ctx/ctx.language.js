/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== Language Global functions ======
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
* \\
* This module implements language functions : different global actions provided by Contextor Interactive (not linked to applications, pages, items).
* \\
* \\
*
*/

  // ******************************
  // *** misc. global functions ***
  // ******************************

  /**
   * @description Module for ActiveX management
   * @class       ctx.activeX
   * @path        ctx.activeX
   * @constructor
   */
  ctx.activeX = (function() {
    var self =
    /** @lends ctx.activeX */
    {
      /**
      * Triggers a activeX left click at a given position
      * @description
      *
      * __Ex.:__
<code javascript>
var ie = ctx.activeX.create("InternetExplorer.Application", "ie_");
</code>
      * @method create
      * @path ctx.activeX.create
      * @param {string} id
      * @param {string} [prefix]
      * @return {Object} created ActiveX
      */
      create : function(id, prefix) {
        ctx.notifyAction('ctx.activeX.create');
        var activeX = new ActiveXObject(id);
        if (prefix) {
          self.connect( activeX, prefix );
        }
        return activeX;
      },
      /**
      * Triggers a activeX left click at a given position
      * @description
      *
      * __Ex.:__
<code javascript>
var ie = ctx.activeX.create("InternetExplorer.Application");
ctx.activeX.connect(ie, "ie_");
</code>
      * @method connect
      * @path ctx.activeX.connect
      * @param {Object} activeX object
      * @param {string} prefix
      * @return {Object} ActiveX object
      */
      connect : function(activeX, prefix) {
        ctx.notifyAction('ctx.activeX.connect');
        if (activeX && prefix) {
          ctxHost.ConnectEvents( activeX, prefix );
        }
        return activeX;
      },
      /**
      * Deisconnects notifications
      * @description
      *
      * __Ex.:__
<code javascript>
ctx.activeX.disconnect(ie);
</code>
      * @method disconnect
      * @path ctx.activeX.disconnect
      * @param {Object} activeX object
      * @return {Object} ActiveX object
      */
      disconnect : function(activeX) {
        ctx.notifyAction('ctx.activeX.disconnect');
        if (activeX) {
          ctxHost.DisconnectEvents( activeX );
        }
        return activeX;
      },
      /**
      * Returns a reference to an Automation object
      * @description
      *
      * __Ex.:__
<code javascript>
var shellObj = ctx.activeX.getObject("WScript.Shell")
</code>
      * @method getObject
      * @path ctx.activeX.getObject
      * @param {string} path
      * @param {string} [id]
      * @return {Object} ActiveX object
      */
      getObject : function(path, id) {
        ctx.notifyAction('ctx.activeX.getObject');
        path = path || "";
        if (id)
          return GetObject(path, id);
        else
          return GetObject(path);
      },
      /**
      * Returns a reference to an Automation object, creates it if not existing
      * @description
      *
      * __Ex.:__
<code javascript>
var shellObj = ctx.activeX.getOrCreateObject("WScript.Shell")
</code>
      * @method getObject
      * @path ctx.activeX.getOrCreateObject
      * @param {string} id
      * @return {Object} ActiveX object
      */
      getOrCreateObject : function(id) {
        ctx.notifyAction('ctx.activeX.getOrCreateObject');
        var activeX;
        try {
          activeX = self.getObject(id);
        } catch (ex) {
          if (activeX == null) {
            activeX = self.create(id);
          }
        } // try..catch
        return activeX;
      }
    }
    return self;
  })();


  /**
  * Simulates a mouse click, based on absolute desktop coordinates
  * @description
  *
  * __Ex.:__
<code javascript>
var x=...;
var y=...;
ctx.click(x, y);
</code>
  * @method click
  * @path ctx.click
  * @deprecated use ctx.mouse.click instead of ctx.click
  * @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
  * @param {number} [Y] relative vertical position (compared to desktop top left position)
  * @return {string} result value
  */
  ctx.click = function (X, Y) {
    var desc = ctx.getDescriptor();
    var x, y;
    if (X instanceof ctx.position) {
      x = X.x + X.cx / 2;
      y = X.y + X.cy / 2;
    } else {
      x = X;
      y = Y;
    }
    return ctx.verbExec(desc, 'ctx.click', 'CLICKMOUSE', {
        X : (x || 0),
        Y : (y || 0)
      }, '', false, '1.0.0.0');
  };

  /**
  * Delete a value or set of values from the data object
  * @description
  * __Ex.:__
  * <code javascript>
  * ctx.del("//Data_Popup1", e.data.pathType.XPath);
  * </code>
  * @method del
  * @path ctx.del
  * @param {Object} target object of the operation
  * @param {string} [path] path
  * @param {e.data.pathType} [pathType] data path type (default is 'e.data.pathType.XPath')\\ (see [[:lib:common:ctx.enum#enumeration_edatapathType|e.data.pathType]])
  * @return {*} returned object or value
  */
  ctx.del = function (target, path, pathType) {
    return ctx.set('', target, path, e.data.format.ctx, e.data.initType.DEL, pathType);
  }

  /**
  * Tests if a value or set of values exists in the data object
  * @description
  * __Ex.:__
  * <code javascript>
  * if (ScnApp.data.exist("//Data_Popup1", e.data.pathType.XPath)) { ... }
  * </code>
  * @method exist
  * @path ctx.exist
  * @param {Object} target object to be tested
  * @param {string} [path] path
  * @param {e.data.pathType} [pathType] data path type (default is 'e.data.pathType.XPath')\\ (see [[:lib:common:ctx.enum#enumeration_edatapathType|e.data.pathType]])
  * @return {boolean} returned object or value
  */
  ctx.exist = function (target, path, pathType) {
    var res = ctx.get(target, path, pathType);
    if ((res === null) || (res === undefined) || (Array.isArray(res) && (res.length == 0))) return false;
    return true;
  }


//  /**
//  * Returns a clone (deep copy) of a given object
//  * @description
//  * __Ex.:__
//<code javascript>
//var obj2 = ctx.clone(obj);
//</code>
//   * @method clone
//   * @path ctx.clone
//   * @advanced
//   * @param {Object} obj object to be cloned
//   * @return {Object} cloned object
//   */
//  ctx.clone = function (obj) {
//    ctx.notifyAction('ctx.clone');
//    return ctx.extend(true, {}, obj);
//  };

  /**
  * Executes a shell command in synchronous or asynchronous mode
  * @description
  * This function can be used to execute treatments, in synchronous or asynchronous mode
  * It is based on 'WScript.Shell.Exec' method : see https://msdn.microsoft.com/en-us/library/ateytk4a(v=vs.84).aspx for more details
  *
  * Using asynchronous mode is recommended to perform long or CPU consuming treatments without interupting Contextor execution, with timeout management.
  *
  *
  *   * asynchronous mode : a callback is provided, called when treatment is finished.
  *
  * An object is returned by function (and passed to callback in asynchronous mode):
  *
  * ^Attribute  ^Description ^
  * | processId | {number} | process Id. Can be used to distinguish diiferent treatments launched in parallel.  |
  * | async | {boolean} | asynchonous (true) or synchonous (false) mode |
  * | exitCode | {number} | process exit code |
  * | duration | {number} | process approximative duration in seconds |
  * | timeout | {boolean} | 'true' if function failed in timeout (always 'false' in synchonous mode) |
  * | output | {string} | process output |
  * | error | {string} | error string |
  *
<code javascript>
var command = '...';
var timeout = ...
ctx.exec(command, timeout, function(obj) {
  // called when treatment is finished
  // obj = {exitCode=..., output=..., error=...};
  ...
});
</code>
  *
  *   * synchronous mode : no callback is provided, the result object is returned by the function
  *
<code javascript>
var command = '...';
var timeout = ...
var obj = ctx.exec(command);
// obj = {exitCode=..., output=..., error=...};
</code>
  *
  * __Ex.:__
<code javascript>
// returns the result of 'ipconfig /all' command, in synchronous mode
var obj = ctx.exec('ipconfig /all');

// performs a network copy, in asynchronous mode
var command = 'robocopy "z:\\..." "c:\..." /MIR';
var res = ctx.exec(command, 30, function(obj) {
  ...
});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **ctx.exec** + 'TAB' :
  *
<code javascript>
ctx.exec(command, 60, function(obj) {
  ...
});
</code>
  * </WRAP>
  * @method exec
  * @path ctx.exec
  * @param {string} command command line
  * @param {number} [timeout] timeout delay in seconds (default is 60 s)
  * @param {function(Object)} [callback] callback called with result object.
  * @return {Object} result object
  */
  ctx.exec = function (command, timeout, callback)
  {
    ctx.notifyAction('ctx.exec');
    var async = (typeof callback === 'function' ? true : false);
    timeout = (timeout > 0 ? timeout : 60);
    var obj = {
      processId: 0,
      exitCode: 0,
      duration: 0,
      async: async,
      timeout: false,
      error: '',
      output: ''
    };
    ctx._shell = ctx._shell || new ActiveXObject("WScript.Shell");
    var exec = ctx._shell.Exec(command);
    obj.processId = exec.ProcessID;

    function finalize(timeout) {
      obj.timeout = timeout;
      if ((!timeout) && (!exec.StdOut.AtEndOfStream)) obj.output += exec.StdOut.ReadAll();
      if (!exec.StdErr.AtEndOfStream) obj.error = exec.StdErr.ReadAll();
      obj.exitCode = exec.ExitCode;
      exec.Terminate();
      exec = null;
      if (callback)  {
        callback.apply(this, [obj]);
        //ctx.on(null, callback, true, null, true, 0);
      }
      return obj;
    }

    if (async) {
      // asynchronous mode : start a polling
      ctx.polling({
        delay: 1000, // loop 1 s
        nbMax: timeout, // loop 'timeout' s
        test: function() {
          if (exec) {
            // for unknown reasons, some applications don't set Status to '1' when finished (eg. robocopy when copying folders)
            // but it works if 'StdOut.ReadLine()' is called during polling
            obj.output += exec.StdOut.ReadLine() + '\n';
            obj.duration ++;
            return (exec.Status != 0);
          }
          return true; // stop
        },
        done: function() {
          finalize(false);
        },
        fail: function() {
          // timeout is reached
          finalize(true);
        }
      });
    } else {
      // synchronous mode : wait for process exit
      obj = finalize(false);
    }
    return obj;
  };

  /**
  * Executes a shell command
  * @description
  * This function can be used to execute treatments, waiting or not termination
  * It is based on 'WScript.Shell.Run' method : https://msdn.microsoft.com/en-us/library/d33x48a9(v=vs.84).aspx for more details
  *
<code javascript>
var command = '...';
var res = ctx.execRun(command, 0, false);
</code>
  *
  * __Ex.:__
<code javascript>
// performs a network copy
var command = 'robocopy "z:\\..." "c:\..." /MIR';
var res = ctx.execRun(command, 0);
</code>
  * @method execRun
  * @path ctx.execRun
  * @param {string} command command line
  * @param {number} [style] value indicating the appearance of the program's window. 0=hidden, 1=shown, ...
  * @param {boolean} [bWaitResult] if true, waits for the command to finish (false by default)
  * @return {number} result
  */
  ctx.execRun = function (command, style, bWaitResult)
  {
    ctx.notifyAction('ctx.execRun');
    if (style === undefined) style = 1;
    if (bWaitResult === undefined) bWaitResult = false;
    ctx._shell = ctx._shell || new ActiveXObject("WScript.Shell");
    var res = ctx._shell.Run(command, style, bWaitResult);
    return res;
  };

  /**
  * Executes a VBScript function
  * @description
  * The function should be defined in a '.vbs' or '.vb' file included in the solution
  *
  * __Ex.:__
  *
  *   * Create a file containing VBS functions :
  *
  * File **utils.vbs** :
<code vbscript>
Function myFunction(a, b)
  ...
  myFunction = ...
End Function

Function sendEmail(ToAddress, MessageSubject, MessageBody)
  ...
  sendEmail = ...
End Function
</code>
  *
  * __Note:__ You should define 'Function' functions only, not 'Sub' functions
  *
  *   * Include the file in the project :
  *
<code xml>
<SCRIPTS>
  <SCRIPT Name="Utils VBS" Src="utils.vbs" Type="vbscript" />
</SCRIPTS>
</code>
  *
  *   * Call the functions from your JS code :
  *
<code javascript>
res = ctx.execVBS('sendEmail("support@sap.com", "test mail subject", "This is a test email !")');
</code>
  *
  * @method execVBS
  * @path ctx.execVBS
  * @param {string} code VBScript code
  * @return {string} result value
  */
  ctx.execVBS = function (code) {
    var desc = ctx.getDescriptor();
    return ctx.verbExec(desc, 'ctx.execVBS', 'SETVALUE', {
        ZoneCtx : '_Work0_',
        Expression : code,
        Type : e.scriptLanguage.VBScript
      });
  };

  /**
  * returns a function call as a string, from a list of arguments
  * @description
  *
  * __Ex.:__
<code javascript>
  var code = ctx.formatFunction(myFunction, "value", true, { a: 2, b: "b", c: false});
  // code =
</code>
  * @method formatFunction
  * @path ctx.formatFunction
  * @advanced
  * @param {Array} args list of arguments
  * @return {string} result
  */
  ctx.formatFunction = function (args) {
    var res = '';
    var code = '';
    var params = '';
    var useTryCatch = false;
    if (args.length > 0) {
      code = args[0];
      if ('function' === typeof code) {
        // get function name from reference
        code = code.toString().match(/function\s+([^\s\(]+)/)[1];
        if (args.length == 1) { code = code + "()"; }
      }
      if (typeof code !== "string") throw new Error(e.error.InvalidArgument, 'ctx.page.formatFunction: Invalid argument 0 (should be a string)');
      for (var i = 1; i < args.length; i++) {
        if (args[i] === e.prefix.tryCatch) {
          useTryCatch = true;
        } else {
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
      if (params != '') { code += '(' + params + ')'; }
      code += ';'
    }
    if (code && useTryCatch) {
      code = "try { " + code + " } catch(ex) {};";
    }
    return code;
  }

  /**
  * Returns a value or set of values in the data object
  * @description
  * __Ex.:__
  * <code javascript>
  * var val = ScnApp.data.get("//Data_Popup1", e.data.pathType.XPath);
  * </code>
  * @method get
  * @path ctx.get
  * @param {Object} target object to be read
  * @param {string} [path] path
  * @param {e.data.pathType} [pathType] data path type (default is 'e.data.pathType.XPath')\\ (see [[:lib:common:ctx.enum#enumeration_edatapathType|e.data.pathType]])
  * @param {e.data.format} [format] data format type (see [[:lib:common:ctx.enum#enumeration_edataformat|e.data.format]])
  * @return {*} returned object or value
  */
  ctx.get = function (target, path, pathType, format) {
    var res;
    var sPath = path || "";
    var parentAppli = null;
    var targetObject = null;
    if (target instanceof ctx.application) {
      parentAppli = target;
      targetObject = target.data;
    } else {
      targetObject = target;
    }
    if (parentAppli) {
      if (sPath.startsWith('/')) {
        // absolute XPath in the global data object
        targetObject = ctx.data;
      }
    }
    if (sPath) {
      switch (pathType) {
        case e.data.pathType.JsonPath :
          res = ctx.json.search(targetObject, sPath);
          break;
        case e.data.pathType.SQLPath :
          res = ctx.json.searchSQL(targetObject, sPath);
          break;
        case e.data.pathType.XPath :
        default :
          res = ctx.json.searchXPath(targetObject, sPath);
          break;
      }
    } else {
      res = targetObject;
    }
    // if the result is an object, convert it to XML text or JSON
    if (typeof res === 'object') {
      switch (format) {
        case e.data.format.xml:
        case 'XML':
        {
          res = ctx.xml.json2xml(res, ''); // XML raw text
          break;
        }
        case e.data.format.json:
        case 'JSON':
        case 'json':
        {
          res = ctx.json.stringify(res); // JSON text
          break;
        }
        default:
        {
          // return a JS object
          break;
        }
      }
    }
    return res;
  }

  /**
  * returns an object from its reference path
  * @advanced
  * @description
  * __Ex.:__
<code javascript>
var style = ctx.getByRef('e.item.style.Blue');
</code>
  * @method getByPath
  * @path ctx.getByPath
  * @param {string} path object reference path
  * @param {Object} [root] root object (if omitted, the JScript engine root object is used)
  * @return {*} nested object
  */
  ctx.getByPath = function(path, root) {
    root = root || ctx.root; // take root object
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, '');           // strip a leading dot
    var a = path.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in root) {
            root = root[k];
        } else {
            return null;
        }
    }
    return root;
  }

  /**
  * Get the list of active pages for all applications
  * @description
  *
  * __Ex.:__
<code javascript>
var pages = ctx.getActivePages();
</code>
  * @method getActivePages
  * @path ctx.getActivePages
  * @return {Array<ctx.page>} active page array
  */
  ctx.getActivePages = function () {
    var allPages = [];
    ctx.each(ctx.app, function(appliName, app) {
      var pages = app.getActivePages();
      if (pages.length) {
        allPages = allPages.concat(pages);
      }
    });
    return allPages;
  }

  /**
  * Serializes a given date or current date to format "‎YYYY-MM-DD": "‎2015-03-‎02‎", ...
  * @description
  * __Ex.:__
<code javascript>
var txt = ctx.getDate(); // result is : "‎2015-03-‎02‎"
</code>
  * @method getDate
  * @path ctx.getDate
  * @param {Date} [date] date to be serialized (if omitted, current date is used)
  * @param {string} [separator] separator (default is '-')
  * @return {string} str formatted string, or an empty string if invalid
  */
  ctx.getDate = function (date, separator) {
    if (separator === undefined) { separator = '-'; }
    date = date || new Date();
    var y = date.getFullYear().toString();
    var m = (date.getMonth() + 1).toString();
    var d  = date.getDate().toString();
    return y  + separator + (m[1]?m:"0"+m[0])  + separator + (d[1]?d:"0"+d[0]);
  };

  /**
  * Serializes a given date or current date to format HH:MM:SS.mmm
  * @description
  * __Ex.:__
<code javascript>
var txt = ctx.getTime(); // result is : "17:16:48.299"
</code>
  * @method getTime
  * @path ctx.getTime
  * @param {Date} [date] date to be serialized (if omitted, current date is used)
  * @param {string} [separator] separator (default is ':')
  * @param {boolean} [noMs] if true, no milliseconds in timestamp
  * @return {string} str formatted string, or an empty string if invalid
  */
  ctx.getTime = function (date, separator, noMs) {
    if (!separator) { separator = ':'; }
    date = date || new Date();
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var s  = date.getSeconds().toString();
    return (h[1]?h:"0"+h[0]) + separator + (m[1]?m:"0"+m[0]) + separator + (s[1]?s:"0"+s[0]) + (noMs ? '' : '.' + date.getMilliseconds());
  };

  /**
  * Converts a timestamp (format YYYY-MM-DD HH:MM:SS.SSS) to an UTC timestamp, taking the UTC time zone offset in account (format YYYY-MM-DDTHH:MM:SS.SSSZ)
  * @description
  * __Ex.:__
<code javascript>
var UTCts = ctx.convertTimestampToUTCTimestamp(ts); // result is : "2020-01-16T15:31:12.321Z"
</code>
  * @method convertTimestampToUTCTimestamp
  * @path ctx.convertTimestampToUTCTimestamp
  * @param {string} [ts] timestamp to be converted
  * @return {string} UTCts formatted string in the UTC time zone
  */
	ctx.convertTimestampToUTCTimestamp = function(ts) {
		ts = ts||ctx.getTimestamp(new Date());
		
		var d = ctx.getDateFromTimestamp(ts);
		var offset = d.getTimezoneOffset();
		d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + offset, d.getSeconds(), d.getMilliseconds());
		return(ctx.getTimestamp(d, false, 'T') + 'Z');
	}
	
  /**
  * Returns a random number between min (included) and max (included if maxIncluded is true, otherwise excluded)
  * @description
  * __Ex.:__
<code javascript>
var random = ctx.getRandom(1, 10, true);
</code>
  * @method getRandom
  * @path ctx.getRandom
  * @param {number} min minimum value
  * @param {number} max maximum value
  * @param {boolean} [maxIncluded] separator (default is ':')
  * @return {number} result
  */
  ctx.getRandom = function (min, max, maxIncluded) {
    return Math.floor(Math.random() * (max - min + (maxIncluded ? 1 : 0)) ) + min;
  };

  /**
  * Serializes a given date or current date to an String ("YYYY-MM-DD.HH:MM:SS.MS")
  * @description
  *
  * __Ex.:__
<code javascript>
var txt = ctx.getTimestamp(); // result is : "2014-11-04.17:16:48.299"
</code>
  * @method getTimestamp
  * @path ctx.getTimestamp
  * @param {Date} [date] date to be serialized (if omitted, current date is used)
  * @param {boolean} [isFilename] filename usage : if 'true', invalid filename characters are modified (':' replaced by '.')
  * @param {string} [separator] separator between date and time (default is '.')
  * @param {boolean} [noMs] if true, no milliseconds in timestamp
  * @return {string} str formatted string, or an empty string if invalid
  */
  ctx.getTimestamp = function (date, isFilename, separator, noMs) {
    if (!separator) { separator = ' '; }
    date = date || new Date();
    var txt = ctx.getDate(date) + separator + ctx.getTime(date, undefined, noMs);
    if (isFilename) {
      txt = txt.replace(/:/g, '.'); // ':' is forbidden
      txt = txt.replace(/ /g, '_'); // ' ' is replaced by '_'
    }
    return txt;
  };

  /**
  * Calculates time between two timestamps, in seconds
  * @ignore
  * @method computeTimeInterval
  * @path ctx.computeTimeInterval
  * @param {string} startTimestamp start timestamp
  * @param {string} endTimestamp end timestamp
  * @param {boolean} [durationInSeconds] if true, duration in seconds, otherwise in ms
  * @return {number} duration in seconds or milliseconds
  */
  ctx.computeTimeInterval = function (startTimestamp, endTimestamp, durationInSeconds) {
    var endms = (ctx.getDateFromTimestamp(endTimestamp)).getTime();
    var startms = (ctx.getDateFromTimestamp(startTimestamp)).getTime();
    // Duration is expressed in milliseconds
    var duration;
    if (durationInSeconds)
      duration = Math.ceil((endms - startms) / 1000);
    else
      duration = (endms - startms);
    return duration;
  }

  /**
  * Returns a Date object from a string (timestamp formatted like 'YYYY-MM-DD HH:mm:ss.SSS')
  * @ignore
  * @method getDateFromTimestamp
  * @path ctx.getDateFromTimestamp
  * @param {string} TimeStamp
  * @return {Date} date
  */
  ctx.getDateFromTimestamp = function (TimeStamp) {
    var year = parseInt(TimeStamp.substring(0, 4), 10);
    var month = parseInt(TimeStamp.substring(5, 7), 10) - 1;
    var day = parseInt(TimeStamp.substring(8, 10), 10);
    var hour = parseInt(TimeStamp.substring(11, 13), 10);
    var min = parseInt(TimeStamp.substring(14, 16), 10);
    var sec = parseInt(TimeStamp.substring(17, 19), 10);
    var ms = 0;
    if (TimeStamp.length > 20)
      ms = parseInt(TimeStamp.substring(20, 23), 10);
    var date = new Date(year, month, day, hour, min, sec, ms);
    return date;
  }

  /**
  * Highlights a given area during a given duration
  * @description
  *
  * __Ex.:__
<code javascript>
var pos = { x:..., y:..., ...};
ctx.highlight(pos, 1000);
</code>
  * @method highlight
  * @path ctx.highlight
  * @param {ctx.position} pos position object (see [[lib:ctx:ctx.core#class_ctxposition|ctx.position]])
  * @param {number} [timer] highlight duration and wait in ms (0 by default)
  * @param {boolean} [visible] if false, the highlight is removed (true by default)
  * @param {boolean} [async] if true, and a timer is set, the function is asynchronous (it returns immediately and highlight is removed asynchronously after timer) (true by default)
  * @param {number} [color] default color ('ctx.options.highlightColor' by default)
  * @return {string} result value
  */
  ctx.highlight = function (pos, timer, visible, async, color) {
    var desc = ctx.getDescriptor();
    ctx.noNotify = true;
    var res = ctx.verbExec(desc, 'ctx.highlight', 'HIGHLIGHT', {
        X : pos.x,
        Y : pos.y,
        X2 : pos.x2,
        Y2 : pos.y2,
        CX : pos.cx,
        CY : pos.cy,
        HWND : pos.hwnd,
        Visible: (visible === false ? 'N' : undefined),
        Async: (async === false ? 'N' : undefined),
        Timer : timer,
        Color : (color === undefined ? ctx.options.highlightColor : color)
      }, '', false);
    return res;
  };

  /**
  * Gets or sets an object, given its path as a string
  * @description
  * __Ex.:__
<code javascript>
ctx.index(ctx.options, 'trace.autoRecording', true); // sets ctx.options.trace.autoRecording to 'true' value
...
var val = ctx.index(ctx.options, 'trace.autoRecording'); // returns ctx.options.trace.autoRecording value
</code>
  * @ignore [internal use]
  * @method index
  * @path ctx.index
  * @param {Object} obj source object
  * @param {*} is object path
  * @param {*} [value] value to be set
  * @return {*} value in access mode
  */
  ctx.index = function (obj, is, value) {
    if (obj === undefined)
      return obj;
    if (typeof is == 'string')
      return ctx.index(obj, is.split('.'), value);
    else if (is.length == 1) {
      if (value !== undefined)
        obj[is[0]] = value;
      return obj[is[0]];
    } else if (is.length==0)
      return obj;
    else
      return ctx.index(obj[is[0]], is.slice(1), value);
  }

/**
  * Sends a keyboard set of keys to the active page
  * @description
  * __Ex.:__
<code javascript>
ctx.keyStroke(e.key.Ctrl+e.key.Shift+'A');
</code>
  * @method keyStroke
  * @path ctx.keyStroke
  * @param {string} value key sequence
  * @param {number} [timer] delay after key sequence (default is 100 ms)
  * @return {string} execution result
  */
  ctx.keyStroke = function (value, timer) {
    ctx.notifyAction('ctx.keyStroke');
    timer = timer || 100;
    var desc = ctx.getDescriptor();
    var res = ctx.verbExec(desc, 'ctx.keyStroke', 'KEYSTROKE', { Keys : value }, '', false);
    ctx.noNotify = true;
    ctx.sleep(timer);
    return res;
  };

  /**
  * Sends a keyboard set of keys to the active page (extended version)
  * @description
  * This is an extended version of keyStroke.
  * Differences are:
  *   a) Use method SendKeys from the ActiveX "WScript.Shell", instead of the Win32 API SendInput
  *   b) less keys available (eg: the 'Windows' key, or the 'Contextual Menu' key)
  * __Ex.:__
<code javascript>
ctx.keyStrokeEx(e.key.Ctrl+e.key.Shift+'A');
</code>
  * @method keyStrokeEx
  * @path ctx.keyStrokeEx
  * @advanced
  * @param {string} value key sequence
  * @param {number} [timer] delay after key sequence (default is 100 ms)
  * @return {string} execution result
  */
  ctx.keyStrokeEx = function (value, timer) {
    ctx.notifyAction('ctx.keyStrokeEx');
    timer = timer || 100;
    ctx._shell = ctx._shell || new ActiveXObject("WScript.Shell");
    value = ctx.keyStrokeMapping(value); // use Microsoft mapping
    ctx._shell.SendKeys(value);
    ctx.noNotify = true;
    ctx.sleep(timer);
    return '';
  };

  /**
  * Maps a key combination to a syntax compatible with UIAutomation connector or ''ctx.keyStroke'' command
  * @description
  * __Ex.:__
<code javascript>
var val = ctx.keyStrokeMapping(e.key.Ctrl+e.key.Shift+'A');
// input : '_Ctrl__Shift_A'
// output : '^+A'
</code>
  * @method keyStrokeMapping
  * @ignore
  * @path ctx.keyStrokeMapping
  * @param {string} value key sequence
  * @return {string} key sequence
  */
  ctx.keyStrokeMapping = function (value) {
    var map = String(value);
    map = map
      .replace(/\+/g, '{+}')
      .replace(/%/g, '{%}')
      .replace(/\^/g, '{^}')
      .replace(/@/g, '{@}')
      .replace(/~/g, '{~}')
      .replace(/\[/g, '{[}')
      .replace(/\]/g, '{]}')
      .replace(new RegExp(e.key.Ctrl, 'g'), '^')
      .replace(new RegExp(e.key.Shift, 'g'), '+')
      .replace(new RegExp(e.key.Alt, 'g'), '%')
      .replace(new RegExp(e.key.Space, 'g'), ' ')
      .replace(new RegExp(e.key.Back, 'g'), '{BACKSPACE}')
      .replace(new RegExp(e.key.Del, 'g'), '{DEL}')
      .replace(new RegExp(e.key.Down, 'g'), '{DOWN}')
      .replace(new RegExp(e.key.End, 'g'), '{END}')
      .replace(new RegExp(e.key.Enter, 'g'), '{ENTER}')
      .replace(new RegExp(e.key.Esc, 'g'), '{ESC}')
      .replace(new RegExp(e.key.Home, 'g'), '{HOME}')
      .replace(new RegExp(e.key.Insert, 'g'), '{INS}')
      .replace(new RegExp(e.key.Left, 'g'), '{LEFT}')
      .replace(new RegExp(e.key.PageDown, 'g'), '{PGDN}')
      .replace(new RegExp(e.key.PageUp, 'g'), '{PGUP}')
      .replace(new RegExp(e.key.Right, 'g'), '{RIGHT}')
      .replace(new RegExp(e.key.ScrollLock, 'g'), '{SCROLLLOCK}')
      .replace(new RegExp(e.key.Tab, 'g'), '{TAB}')
      .replace(new RegExp(e.key.Up, 'g'), '{UP}')
      .replace(new RegExp(e.key.CapsLock, 'g'), '{CAPSLOCK}')
      .replace(new RegExp(e.key.PrintScreen, 'g'), '{PRTSC}')

      .replace(new RegExp(e.key.Substract, 'g'), '-')
      .replace(new RegExp(e.key.Add, 'g'), '{+}')
      .replace(new RegExp(e.key.Multiply, 'g'), '*')
      .replace(new RegExp(e.key.Decimal, 'g'), '.')

      .replace(new RegExp(e.key.F1, 'g'), '{F1}')
      .replace(new RegExp(e.key.F2, 'g'), '{F2}')
      .replace(new RegExp(e.key.F3, 'g'), '{F3}')
      .replace(new RegExp(e.key.F4, 'g'), '{F4}')
      .replace(new RegExp(e.key.F5, 'g'), '{F5}')
      .replace(new RegExp(e.key.F6, 'g'), '{F6}')
      .replace(new RegExp(e.key.F7, 'g'), '{F7}')
      .replace(new RegExp(e.key.F8, 'g'), '{F8}')
      .replace(new RegExp(e.key.F9, 'g'), '{F9}')
      .replace(new RegExp(e.key.F10, 'g'), '{F10}')
      .replace(new RegExp(e.key.F11, 'g'), '{F11}')
      .replace(new RegExp(e.key.F12, 'g'), '{F12}')
      .replace(new RegExp(e.key.F13, 'g'), '{F13}')
      .replace(new RegExp(e.key.F14, 'g'), '{F14}')
      .replace(new RegExp(e.key.F15, 'g'), '{F15}')
      .replace(new RegExp(e.key.F16, 'g'), '{F16}')
      .replace(new RegExp(e.key.F17, 'g'), '{F17}')
      .replace(new RegExp(e.key.F18, 'g'), '{F18}')
      .replace(new RegExp(e.key.F19, 'g'), '{F19}')
      .replace(new RegExp(e.key.F20, 'g'), '{F20}')
      .replace(new RegExp(e.key.F21, 'g'), '{F21}')
      .replace(new RegExp(e.key.F22, 'g'), '{F22}')
      .replace(new RegExp(e.key.F23, 'g'), '{F23}')
      .replace(new RegExp(e.key.F24, 'g'), '{F24}')
      // .replace(/[\f]/g, "\\f")
      // .replace(/[\n]/g, "\\n")
      // .replace(/[\r]/g, "\\r")
      // .replace(/[\t]/g, "\\t")
      // .replace(/[\\]/g, "\\\\")
      // .replace(/[\"]/g, "\\\"")
      // .replace(/\\\\\\"/g, "&quot;");


//// TODO : these keys need to be managed
//      .replace(e.key, '{BREAK}')
//      .replace(e.key, '{CAPSLOCK}')
//      .replace(e.key, '{HELP}')
//      .replace(e.key, '{NUMLOCK}')
//
//      .replace(e.key.ContextMenu, '')
//      .replace(e.key.ScrollLock, '')
//      .replace(e.key.NumEnter, '{ENTER}')
//      .replace(e.key.Pause, '')
//      .replace(e.key.Attn, '')

    return map;
};

  /**
  * Generates a log message in debugger and trace file
  * @description
  * __Ex.:__
<code javascript>
ctx.log('function failed with error : ' + res, e.logIconType.Error);
</code>
  * @method log
  * @path ctx.log
  * @param {*} mess message to be displayed (text or object)
  * @param {e.logIconType} [type] icon type (see '[[:lib:common:ctx.enum#enumeration_elogicontype|e.logIconType]]' values).\\ Default value is ''e.logIconType.info''.
  * @param {*} [label] optional secondary message (text or object)
  * @param {Object} [options] optional trace level
  * @return {string} result value
  */
  ctx.log = function (mess, type, label, options) {
    var res = '';

    if (type === undefined) { type = e.logIconType.Info; }

    var display = true;
    if (options && (options.traceLevel !== undefined)) {
      display = ((options.traceLevel == e.trace.level.Info)
        || ((options.traceLevel == e.trace.level.Error) && (type == e.logIconType.Error))
        || ((options.traceLevel == e.trace.level.Warning)) && ((type == e.logIconType.Error) || (type == e.logIconType.Warning)));
    }
    if (!display) { return res; } // skip display

    if (mess && (typeof mess === 'object')) {
      var obj = mess;
      mess = label|| 'object';
      label = obj;
    }

    if (mess && (typeof mess === 'object')) {
      mess = 'object';
    }

    var params = [mess, type];
    if (label && (typeof label === 'string')) {
      params.push(label);
      label = undefined;
    }

		ctx.notifyAction('ctx.log', undefined, desc, 'LOGMESS', params, label);
    return res;
  };

 /**
  * Generates a log message in Windows Event Viewer.
  * @method  logEvent
  * @description
  *  <wrap help> //Example://</wrap>
  *  <code javascript>ctx.logEvent( "Function failed with error: " + res, e.logEventType.Error );</code>
  * @param   {string} message Message to be displayed
  * @param   {e.logEventType} [type] Icon type (by default, ''e.logEventType.information''). See [[:lib:common:ctx.enum#enumeration_elogeventtype|e.logEventType]]
  * @return  {string} Result value
  * @path    ctx.logEvent
  */
  ctx.logEvent = function (message, type) {
    var res = '';
    if (type === undefined) type = e.logEventType.Information;
    res = ctx.wkMng.LogEvent( type, message );
    return res;
  };

 /**
  * @ignore
  * logMess: alias for log
  * @description
  * __Ex.:__
<code javascript>
ctx.logMess('function failed with error : ' + res, e.logIconType.error);
</code>
  * @method logMess
  * @deprecated use ctx.log instead of ctx.logMess
  * @path ctx.logMess
  * @param {*} mess
  * @param {e.logIconType} [type] icon type (see '[[:lib:common:ctx.enum#enumeration_elogicontype|e.logIconType]]' values) default is 'Info'
  * @return {string} result value
  */
  ctx.logMess = function (mess, type) {
    return ctx.log(mess, type);
  }

  /**
   * @ignore
   * @method mapObject
   * @path ctx.mapObject
   */
  ctx.mapObject = function(obj) {
  }

  /**
  * Executes an action on 'ctx.popup.messbox2'
  * @description
  * @advanced
  * __Ex.:__
<code javascript>
// memorize window width
var width = ctx.messbox2Execute("acObjectGetValue", "Application", "pAppbar", "CX");
</code>
  * @method messbox2Execute
  * @path ctx.messbox2Execute
  * @param {string} action action name
  * @param {string|number} [P1] parameter 1
  * @param {string|number} [P2] parameter 2
  * @param {string|number} [P3] parameter 3
  * @param {string|number} [P4] parameter 4
  * @param {string|number} [P5] parameter 5
  * @return {string} result value
  */
  ctx.messbox2Execute = function (action, P1, P2, P3, P4, P5) {
    var desc = ctx.getDescriptor();
    return ctx.verbExec(desc, 'ctx.messbox2Execute', 'EXECUTE', {
        Action : action,
        Parm1 : P1,
        Parm2 : P2,
        Parm3 : P3,
        Parm4 : P4,
        Parm5 : P5
      });
  };

  /**
  * Resets a listening handler or a wait handler
  * @description
  * __Ex.:__
<code javascript>
var obj = LinkedIn.events.evWaitSubscription.on(function(ev) {...});  // sets event listening
...
ctx.off(obj);  // resets event listening
</code>
  * \\
  * __Ex.:__
<code javascript>
var obj = ctx.wait(function(ev) {...}, 1000);  // sets a 1000 ms wait
...
ctx.off(obj);  // resets event listening
</code>
  * @method off
  * @path ctx.off
  * @param {Object} obj object provided by 'ctx.on()' or 'ctx.once()' for the corresponding handler
  * @return {boolean} result true | false
  */
  ctx.off = function (obj) {
    if (obj && obj.timer) {
      clearTimeout(obj.timer);
    }
    if (obj && obj.evName && obj.func) {
      return ctx.amplify.unsubscribe(obj.evName, obj.context, obj.func);
    }
    return false; // invalid object
  };

  /**
  * Sets a permanent or single handler to listen to a given event
  * @description
  * __Note:__ : this method should not be directly used, in the general cas, rather use application/page/item method:
  *   * application : application.on({ event, function(ev) { ... }});
  *   * page : application.page.on({ event: function(ev) { ... }});
  *   * item : application.page.item.on({ event: function(ev) { ... }});
  *
  * __Ex.:__
<code javascript>
// event provided as an event object
ctx.on(LinkedIn.events.START, function(ev) {...});
...
ctx.on(LinkedIn.pHome.events.LOAD, function(ev) {...}, LinkedIn.pHome.exist, this, true);
</code>
  * @method on
  * @path ctx.on
  * @param {ctx.event} event event name, provided as an event object or a selector string
  * @param {function(ctx.event)} func callback to be called on event reception
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {Object} [context] context object to be called with the callback
  * @param {boolean} [single] if 'true', sets a single listening on the event (otherwise, a permanent listening)
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
  * @param {ctx.event} [contextEvent] context event, provided as callback parameter
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  ctx.on = function (event, func, immediateCondition, context, single, delay, noStepReset, contextEvent) {
    var desc;
    // eg.: on('MyAppli.MyPage.LOAD', MyAppli.MyPage.exist, function(ev) {...}, context, true/false)
    //   or on(MyAppli.MyPage.event('LOAD'), MyAppli.MyPage.exist, function(ev) {...}, context, true/false)
    //if (typeof event === 'string')
    //  desc = ctx.getDescriptor(event);
    // eg.: on(MyAppli.MyPage, 'LOAD', function(ev) {...}, context, true/false)
    if (event && event.getObjectDescriptor)
      desc = event.getObjectDescriptor();
    if (!func || (typeof func !== 'function')) {
      if (ctx.currentPromise) {
        func = ctx.currentPromise.resolve;
      } else {
        throw new Error(e.error.InvalidArgument, "ctx.on: no valid callback was provided");
      }
    }
    /** @type {Object} */ var oContext = context || null;
    // test if immediate condition is valid. If yes : immediately call the call back
    var evName = '';
    contextEvent = contextEvent || ctx.currentEvent;
    if ((!oContext) && contextEvent) {
        if (contextEvent.page) {
            oContext = contextEvent.page;
        } else if (contextEvent.appli) {
            oContext = contextEvent.appli;
        }
    }
    var bImmediate = false;
    if (typeof immediateCondition === 'function') {
      // immediateCondition is a function
      bImmediate = immediateCondition && immediateCondition.call(oContext);
    } else {
      // immediateCondition is a boolean
      bImmediate = immediateCondition;
    }

    if (event && (!(bImmediate && single))) {
      // subscribe the event :
      // - if no immediate condition
      // - or if not single trigger
      evName = desc.appliName;
      if (desc.pageName && desc.pageName !== '') {
        evName += "." + desc.pageName;
      }
      if (desc.itemName && desc.itemName !== '') {
        evName += "." + desc.itemName;
      }
      if (desc.name && desc.name !== '') {
        evName += ":" + desc.name;
      }
      ctx.amplify.subscribe(evName, oContext, func, 10, null, single, (noStepReset ? null : ctx.currentStep), delay);
    }

    var timerId = 0;
    // condition is verified
    if (bImmediate) {
      if (ctx.currentStep) {
        // call the function in the context of the step
        var st = ctx.currentStep;
        if (delay) {
          var timerIndex = ctx.objectIndex++;
          // Name the timer for debugging
          var strTimeoutName = ctx.currentTimerReason ;
          if (strTimeoutName == '') strTimeoutName = 'timer' ;
          // call after delay
          // Rearm timer linked to currentParentId
          ctx.notifyState('once', strTimeoutName, timerIndex, 'set', '', (st ? st.name : ''), ctx.currentParentId);
          timerId = setTimeout(function(st, func, context, event, timerIndex) { return function() {
            ctx.notifyState('once', strTimeoutName, timerIndex, 'run', '', (st ? st.name : ''), (st ? st.id : -1));
            // following Verbs relative to the Timer
            var oldParentId = ctx.currentParentId ;
            ctx.currentParentId = timerIndex ;
            st.callFunction(func, context, event);
            ctx.currentParentId = oldParentId ;
            if (st.timers[timerIndex]) {
              delete st.timers[timerIndex];
              // following Verbs relative to the Timer
              //ctx.notifyState('once', 'timer' + timerIndex, timerIndex, 'reset', '', (st ? st.name : ''), (st ? st.id : -1));
              ctx.notifyState('once', strTimeoutName, timerIndex, 'reset', '', (st ? st.name : ''), timerIndex);
            }
          }; }(st, func, oContext, [contextEvent], timerIndex), delay);
          st.timers[timerIndex] = timerId;
        } else {
          // call immediatly
          st.callFunction(func, oContext, [contextEvent]);
        }
      } else {
        if (delay) {
          var timerIndex = ctx.objectIndex++;
          // Name the timer for debugging
          var strTimeoutName = ctx.currentTimerReason ;
          if (strTimeoutName == '') strTimeoutName = 'timer' ;
          // call after delay
          ctx.notifyState('once', strTimeoutName, timerIndex, 'set', '');
          timerId = setTimeout(function(func, context, event, timerIndex) { return function() {
            ctx.notifyState('once', strTimeoutName, timerIndex, 'run', '');
            // following Verbs relative to the Timer
            var oldParentId = ctx.currentParentId ;
            ctx.currentParentId = timerIndex ;
            func.apply(context, event);
            ctx.notifyState('once', strTimeoutName, timerIndex, 'reset', '');
            ctx.currentParentId = oldParentId ;
          }; }(func, oContext, [contextEvent], timerIndex), delay);
        } else {
          // call immediatly
          func.apply(oContext, [contextEvent]);
        }
      }
    };
    return {
      evName :  evName,
      desc :  desc,
      context : oContext,
      timer : timerId,
      func : func
    }; // return object to be used to unsubscribe
  };

  /**
  * Sets a single handler to listen to a given event
  * @description
  * __Ex.:__
<code javascript>
ctx.once(LinkedIn.addEvent({ evStart : ''}), function(ev) {...});  // sets event listening
</code>
  * @method once
  * @path ctx.once
  * @advanced
  * @param {ctx.event} event event name, provided as an event object or a selector string
  * @param {function(ctx.event)} func callback to be called on event reception
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {Object} [context] context object to be called with the callback
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  ctx.once = function (event, func, immediateCondition, context, delay, noStepReset) {
    return ctx.on(event, func, immediateCondition, context, true, delay, noStepReset);
  };

  /**
  * @typedef {{
  *   delay: number,
  *   nbMax: (number|undefined),
  *   done: (function ()|undefined),
  *   test: (function ()|undefined),
  *   fail: (function ()|undefined)
  * }}
  * @ignore
  */
  ctx.pollingOptions = {
    delay: 0,
    nbMax: 0,
    test: function () {},
    done: function () {},
    fail: function () {}
  };

  /**
  * Function used to implement asynchronous polling loops
  * @description
  * The 'ctx.pollingOptions' object is composed of the following parameters :
  *
  * ^Attribute  ^Description ^
  * |delay | delay (in ms) between each iteration (default: 100 ms) |
  * |nbMax | max. number of loops to wait before calling 'fail' method (default: 1) |
  * |test | test function called during each iteration (default: returns 'false')\\  - if it returns 'false', the loop carries on \\  - if it returns 'true', the 'done' function is called |
  * |done | function called when 'test' function returned 'true' (default: empty) |
  * |fail | function called at the end of the loop, if 'nbMax' iterations were reached (default: empty) |
  *
  * __Ex.:__
<code javascript>
// waits for the appearance of an Ajax object in a page (during 6 * 500 ms)
ctx.polling({
  delay: 500,
  nbMax: 6,
  test: function() { return MyAppli.MyPage.btValidate.exist(); },
  done: function() {
   // object is present
  },
  fail: function() {
    // object is absent
  }
});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **ctx.polling** + 'TAB' :
  *
<code javascript>
ctx.polling({
  delay: 100,
  nbMax: 10,
  test: function() {
    return false;
  },
  done: function() {
    // add code here
  },
  fail: function() { }
});
</code>
  * </WRAP>
  * @method polling
  * @path ctx.polling
  * @param {ctx.pollingOptions} options object describing the polling options (delay, max iteration count, ...)
  * @return {Object} an object to be provided to 'ctx.off()' to disable polling
  */
  ctx.polling = function(options)
  {
    var res = null;
    var delay = Math.abs(options.delay) || 100,
      nbMax = isNaN(options.nbMax) ? 1 : options.nbMax,
      iLoop = 0,
      test = options.test || function(index) { return false; },
      done = options.done || function() {},
      fail = options.fail || function() {};
    ctx.notifyAction('ctx.polling');
    (function pollingLoop(){
      if ( test(iLoop) )
      {
        done();
      } else {
        if ((nbMax > 0) && (iLoop >= nbMax)) {
          fail();
        } else {
          iLoop ++;
          //ctx.wait(pollingLoop, delay);
          ctx.currentTimerReason = 'polling(' + iLoop + ')' ;
          res = ctx.on(null, pollingLoop, true, null, true, delay);
        }
      }
    })();
    return res;
  };

  /**
  * Reads a text from a file
  * @description
  * __Ex.:__
<code javascript>
ctx.setAutoRestart(true);
</code>
  * @method setAutoRestart
  * @path ctx.setAutoRestart
  * @param {boolean} enable enables (true) or disables (false) auto restart
  */
  ctx.setAutoRestart = function (enable) {
    ctx.notifyAction('ctx.setAutoRestart');
    if (ctx.engineStarted)
      ctx.wkMng.CtxtAutoRestart(enable);
  };

  /**
  * Reads a text from a file
  * @description
  * __Ex.:__
<code javascript>
var txt = ctx.readFile('c:\\temp\\files.txt');
</code>
  * @method readFile
  * @path ctx.readFile
  * @param {string} filename output filename
  * @return {string} read text string (empty if file not found)
  */
  ctx.readFile = function (filename) {
    ctx.notifyAction('ctx.readFile');
    var res = '';
    if (ctx.engineStarted)
      res = ctx.wkMng.CtxtReadFile(filename);
    return res;
  };

  /**
  * Declares a global shortcut ('hot key') which triggers a functional event
  * @description
  * The list of pre-defined keys for shortcut definition is defined in enumeration : [[:lib:common:ctx.enum#enumeration_ekey|e.key]]
  *
  * __Ex.:__
<code javascript>
// hot key 'Ctrl + F3' to trigger 'evStartTreatment' event
ctx.regHotKey(e.key.Ctrl + e.key.F3, GLOBAL.events.evStartTreatment);
</code>
  * @method regHotKey
  * @path ctx.regHotKey
  * @param {string} shortcut shortcut definition
  * @param {ctx.event} event event name to be triggered
  * @return {string} result value
  */
  ctx.regHotKey = function (shortcut, event) {
    var desc = ctx.getDescriptor();
    if (event && event.getObjectDescriptor)
      desc = event.getObjectDescriptor();
    return ctx.verbExec(desc, 'regHotKey', 'REGHOTKEY', {
      Value: shortcut,
      Proc: desc.appliName,
      Event: desc.name
    });
  }

  /**
  * Resolves a path, especially to replace patterns with run-time paths
  * @description
  * Possible patterns :
  *   * **%CurrentURL%** : ''ctx.options.path.bin'',
  *   * **%CurrentDir%** : ''ctx.options.path.log'',
  *   * **%ExecDir%** : ''ctx.options.path.exec'',
  *   * **%ServerURL%** : ''ctx.options.path.server''
  *
  * __Ex.:__
<code javascript>
var path = ctx.resolvePath("%CurrentURL%\\html\\index.html");
// resolves 'path' with project local folder
</code>
  * @method resolvePath
  * @path ctx.resolvePath
  * @param {string} path path to be resolved
  * @return {string} resolved path
  */
  ctx.resolvePath = function (path) {
    if (path) {
      path = path.replace("%CurrentURL%", ctx.options.path.bin)
        .replace("%CurrentDir%", ctx.options.path.log)
        .replace("%ExecDir%", ctx.options.path.exec)
        .replace("%ServerURL%", ctx.options.path.server);
    }
    return path;
  };

  /**
  * Makes a screenshot of an application window or screen area
  * @description
  * Capture is saved in a '.png' file.
  *
  * Different options are possible according to the object parameters :
  *   * {string} Appli, InstanceAppli, Page, InstancePage : used to specify page name and parent application
  *   * {string} Id : used to capture a ctx.popup (ctx.popup.messbox or ctx.popup.messbox2)
  *   * {string} HWND : used to capture a window based on its Window Handle (hWnd)
  *   * {string} File : filename . If omitted, name is generated on the format ''YYYYMMDD_HHMMSS_MS.png'' (ex.: ''20150113_230806_416.png''). File is generated in ''ctx.options.path.log + '\Pictures'''
  *   * {string} X, Y, CX, CY : specify area position to be captured
  *   * {boolean} RawSnapshot : if 'true', makes 'raw snapshot', rather than 'print screen' mode.
  *
  * __Ex.:__
<code javascript>
// capture a declared page
ctx.screenshot({
  Appli: 'Google',
  InstanceAppli: 1002,
  Page: 'pGoogle'
});
// capture a ctx.popup.messbox or ctx.popup.messbox2, mention the target filename
ctx.screenshot({
  Id:'google',
  File: 'c:\\temp\\google.png'
});
// capture a page in raw mode
ctx.screenshot({
  Appli: 'Google',
  Id:'pVersion',
  RawSnapshot: true
});
// capture a fix area
ctx.screenshot({
  Id:'google',
  X:50,
  Y:30,
  CX:200,
  CY:100
});
// make a full screen capture
ctx.screenshot();
</code>
  * @method screenshot
  * @path ctx.screenshot
  * @param {Object} [obj] parameters
  * @return {string} result value
  */
  ctx.screenshot = function (obj) {
    var desc = ctx.getDescriptor();
    return ctx.verbExec(desc, 'ctx.screenshot', 'SCREENSHOT', obj, '', false);
  };

//  /**
//  * Sends a mail
//  * @description
//  * __Ex.:__
//<code javascript>
//</code>
//  * @method sendMail
//  * @path ctx.sendMail
//  * @param {string} from
//  * @param {string} to
//  * @param {string} subject
//  * @param {string} [body]
//  */
//  ctx.sendMail = function (from, to, subject, body)
//  {
//    try
//    {
//      var oMsg      = new ActiveXObject("CDO.Message");
//      oMsg.From     = from;
//      oMsg.To       = to;
//      oMsg.Subject  = subject;
//      oMsg.TextBody = body;
//      oMsg.Send();
//    }
//    catch(ex)  {
//      ctx.log(ex, e.logIconType.Error, ex.message );
//    }
//  };

  /**
  * Serializes an object to a JSON string
  * @description
  * __Ex.:__
<code javascript>
var txt = ctx.serialize( { name:'Ford', firstname:'John' }, false, false);
// result is : "{\"name\":\"Ford\",\"firstname\":\"John\"}"
</code>
  * @method serialize
  * @path ctx.serialize
  * @param {*} data object, string, number to be serialized
  * @param {boolean} [doEscape] if 'true', escapes all control characters ("\b" -> "\\b", "\"" -> "\\\"", "\\" -> "\\\\", ...)
  * @param {boolean} [addPrefix] if 'true' and 'data' is an object, adds a prefix to automate unserialisation
  * @param {number|string} [space] causes the resulting string to be pretty-printed
  * @param {boolean} [isShort] if 'true', serialize using short description (default is 'true')
  * @return {string} formatted string
  */
  ctx.serialize = function (data, doEscape, addPrefix, space, isShort) {
    if (isShort === undefined) { isShort = true; }
    function escape (key, val) {
      if (typeof(val)!="string") return val;
      return val
        .replace(/[\\]/g, "\\\\")
        .replace(/[\"]/g, "\\\"")
        .replace(/[\b]/g, "\\b")
        .replace(/[\f]/g, "\\f")
        .replace(/[\n]/g, "\\n")
        .replace(/[\r]/g, "\\r")
        .replace(/[\t]/g, "\\t")
        .replace(/\\\\\\"/g, "&quot;");
        //.replace(/[\']/g, "\\\'")
        //.replace(/[\/]/g, "\\/");
    }
    var str = ''
    if (typeof data === 'string') {
      if (data.startsWith(e.prefix.raw)) {
        str = data.substring(e.prefix.raw.length);
        str = (doEscape ? escape('', str) : str);
      } else if (doEscape) {
        str = '"' + escape('', data) + '"';
      } else {
        str = data;
      }
    } else if (typeof data === 'object') {
      // JS Object : stringify it (add e.prefix.json as a pattern to recognize serialized objects)
      str = (addPrefix ? e.prefix.json : '') + ctx.json.stringify(data, (doEscape ? escape : null), space, undefined, isShort);
    } else if (typeof data === 'boolean') {
      str = (addPrefix ? e.prefix.bool : '') + String(data);
    } else if (typeof data === 'number') {
      str = (addPrefix ? e.prefix.number : '') + String(data);
    //} else if (typeof data === 'undefined') {
    //  str = 'undefined';
    } else if ((typeof data === 'function') && (data.toString)) {
      str = data.toString();
    }
    // suppress '"' for raw data
    str = str.replace(/\"%<%/g, "").replace(/%>%\"/g, "");
    return str;
  };


  /**
  * Launches an application
  * @description
  * __Ex.:__
<code javascript>
ctx.shellexec("%programfiles(x86)%\\Skype\\Phone\\Skype.exe", "/callto:echo123");
</code>
  * @method shellexec
  * @path ctx.shellexec
  * @param {string} file command line to be executed. Standard system variables can be used ('%programfiles(x86)%', '%temp%', ...)
  * @param {string} [parm] optional argument for the command line
  * @param {string} [dir] working directory
  * @param {string} [flag] display mode whan application is started : Show, Hide, Maximized, Minimized... Default value is ''e.launchFlag.Show''.\\
  *See ''[[:lib:common:ctx.enum#enumeration_elaunchflag|e.launchFlag]]'' enumeration for a complete list of flags
  * @return {string} result value
  */
  ctx.shellexec = function (file, parm, dir, flag) {
    var desc = ctx.getDescriptor();
    return ctx.verbExec(desc, 'ctx.shellexec', 'SHELLEXEC', {
        File : file,
        Parm : parm,
        Dir : dir,
        Flag : (flag ? flag : e.launchFlag.Show)
      });
  };

  /**
  * Generates a synchronous wait with a given delay
  * @description
  * __Ex.:__
<code javascript>
ctx.sleep(500); // waits 500 ms
</code>
  * @method sleep
  * @path ctx.sleep
  * @param {number} timer timer value in ms (default is 100 ms)
  * @return {string} result value
  */
  ctx.sleep = function (timer) {
    timer = timer || 100;
    var desc = ctx.getDescriptor();
    return ctx.verbExec(desc, 'ctx.sleep', 'SLEEP', {
      Int : timer
    });
  };

  /**
  * @method tooltip
  * @path ctx.tooltip
  * @param {Object} obj tooltip object
  * @suppress {checkTypes}
  */
  ctx.tooltip = function (obj) {
    obj = obj || {};
    ctx.each(obj, function(id, value) {
      if (value && value.item && value.item.page && (value.item.page instanceof ctx.page)) {
        var page = value.item.page;
        if (typeof value === 'object') {
          value.id = id;
          page.tooltips[id] = new ctx.tooltipClass(value, page);
        }
      }
    });
  };

  /**
  * @method tooltipInit
  * @path ctx.tooltipInit
  * @param {Object} obj tooltip object
  */
  ctx.tooltipInit = function (obj) {
    obj = obj || {};
    if (obj && obj.page && (obj.page instanceof ctx.page)) {
      var page = obj.page;
      page.tooltipInit(obj);
    }
  };

  /**
  * Unserialize an JSON string to an object
  * @description
  * __Ex.:__
<code javascript>
var obj = ctx.unserialize("{\"name\":\"Ford\",\"firstname\":\"John\"}");
// result is : { name:'Ford', firstname:'John' }
</code>
  * @method unserialize
  * @path ctx.unserialize
  * @param {string|Object} data JSON string to be unserialized
  * @param {boolean} [isObject] if 'true', forces unserialization to an object
  * @param {boolean} [unesc] if 'true', forces unescape of the string
  * @return {*} string, or unserialized object
  */
  ctx.unserialize = function (data, isObject, unesc) {
    if (data && typeof data === 'string') {
			if (unesc) {
	      data = unescape(data);
			}
      // if data starts with the pattern e.prefix.json, it's a JSON serialized object
      if (data.startsWith(e.prefix.json)) {
        var str = data.substring(e.prefix.json.length);
        return ctx.json.parse(str);
      } else if (data.startsWith(e.prefix.bool)) {
        var str = data.substring(e.prefix.bool.length);
        return (str == 'true' ? true : false);
      } else if (data.startsWith(e.prefix.number)) {
        var str = data.substring(e.prefix.number.length);
        return parseFloat(str);
      } else if (isObject) {
        return ctx.json.parse(data);
      } else {
        return data;
      }
    }
    return data;
  };

  /**
  * Sets a timeout callback
  * @description
  * __Ex.:__
<code javascript>
// call function after a 5 s delay
var id = ctx.wait(function(ev) {
  // add code here...
}, 5000);
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **ctx.wait** + 'TAB' :
  *
<code javascript>
ctx.wait(function(ev) {
  ...
}, 0);
</code>
  * </WRAP>
  * @method wait
  * @path ctx.wait
  * @param {function(ctx.event)} callback callback to be called
  * @param {number} delay timer value in ms (default is 100 ms)
  * @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
  * @return {Object} an object to be provided to 'ctx.off()' to disable wait
  */
  ctx.wait = function(callback, delay, noStepReset)
  {
    delay = delay || 100;
    ctx.notifyAction('ctx.wait');
    ctx.currentTimerReason = 'wait(' + delay + ')' ;
    var ev;
    if (ctx.currentEvent) { ev = ctx.currentEvent.copy(); }
    return ctx.on(null, callback, true, null, true, delay, noStepReset, ev);
  }

 /**
  * @ignore
  * Sets a reference to a workflow
  * @description
  * __Ex.:__
<code javascript>
ctx.workflow('scCreateContact', 'b876f81a-5471-4845-bccf-818f87e02e15');
</code>
  * @method workflow
  * @path ctx.workflow
  * @param {string} name workflow name
  * @param {string} id reference
  */
  ctx.workflow = function (name, id) {
    ctx.notifyAction('ctx.workflow');
  };

  /**
  * Writes a text to a file
  * @description
  * __Ex.:__
<code javascript>
ctx.writeFile('c:\\temp\\files.txt', result, true);
</code>
  * @method writeFile
  * @path ctx.writeFile
  * @param {string} filename output filename
  * @param {string} text string to be written
  * @param {boolean} [bEnd] if true, write at the end of the file
  * @param {boolean} [bCR] if true, adds a carriage return
  * @return {string} result value
  */
  ctx.writeFile = function (filename, text, bEnd, bCR) {
    ctx.notifyAction('ctx.writeFile');
    var res = '';
    if (bCR) { text += "\n"; }
    if (ctx.engineStarted)
      res = ctx.wkMng.CtxtWriteFile(filename, text, bEnd);
    return res;
  };

/**
* @typedef {{
*   async: (boolean|undefined),
*   contentType: (e.ajax.content|string|undefined),
*   context: (Object|undefined),
*   data : (Object|string|undefined),
*   formData : (Object|undefined),
*   dataType: (e.ajax.content|undefined),
*   desc: (ctx.descriptor|undefined),
*   error: (function(Object, number, Object)|undefined),
*   headers: (Object|undefined),
*   id: (number|undefined),
*   localFile: (string|undefined),
*   method: (e.ajax.method|undefined),
*   password: (string|undefined),
*   requestType: (e.ajax.requestType|undefined),
*   success: (function(Object, number, Object)|undefined),
*   timeout: (number|undefined),
*   url: (string),
*   username: (string|undefined),
*   xhr: (Object|undefined),
*   usePassport: (boolean|undefined),
*   ignoreClientCertificate: (boolean|undefined),
*   resultInBase64: (boolean|undefined),
*		clientCertificate: (string|undefined)
* }}
*/
ctx.ajaxParams = {
  async: undefined,
  contentType: undefined,
  context: undefined,
  data : undefined,
  formData : undefined,
  dataType: undefined,
  desc: undefined,
  error: undefined,
  headers: undefined,
  id: undefined,
  localFile: undefined,
  method: undefined,
  password: undefined,
  requestType: undefined,
  success: undefined,
  timeout: undefined,
  url: '',
  username: undefined,
  xhr:undefined,
	usePassport : false,
	ignoreClientCertificate: false,
	resultInBase64: false,
	clientCertificate: undefined
};

function _CtxBase64() {};
/**
 * Base 64 encoding/decoding library
 * @class ctx.base64
 * @path ctx.base64
 * @constructor
 **/
ctx.base64 = ( function _CtxBase64( ) {

  var _dom = null;
  var _elem = null;
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  var _encode =  function(input, isBinary) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    var bArray = false;
    var length = 0;
    if (typeof input === 'string') {
      if (!isBinary) { input = _utf8_encode(input); }
      length = input.length;
    } else {
      bArray = true;
      length = input.byteLength || input.length;
    }
    while (i < length) {
      if (bArray) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
      } else {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
      }
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  };

  var _decode = function(input, isBinary) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    if (!isBinary) {
      output = _utf8_decode(output);
    }
    return output;
  };

  var _utf8_encode = function(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };

  var _utf8_decode = function(utftext) {
      var string = "";
      var i = 0;
      var c = 0;
      var c1 = 0;
      var c2 = 0;
      var c3 = 0;

      while (i < utftext.length) {
          c = utftext.charCodeAt(i);

          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          }
          else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          }
          else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }

      }
      return string;
  }

  var self =
  /** @lends ctx.base64 */
  {
    /**
    * Decodes a base 64 string to a buffer
    * @description
<code javascript>
// decode a base 64 string
var sContent = ctx.base64.decode(ev.data);
</code>
    * @method decode
    * @path ctx.base64.decode
    * @param {string} input base 64input string to be decoded
    * @param {boolean} [isBinary] if true, the input string is considered as raw, and is not encoded/decoded in UTF8
    * @return {*} decoded string or object
    */
    decode: function(input, isBinary) {
      ctx.notifyAction('ctx.base64.decode');
      return _decode(input, isBinary);
    },

    /**
    * Decodes a base 64 string to a buffer array
    * @description
    *
<code javascript>
</code>
    * @method decodeArrayBuffer
    * @path ctx.base64.decodeArrayBuffer
    * @param {string} input input string or byte array to be encoded in base 64
    * @return {*} decoded array
    */
    decodeArrayBuffer: function(input) {
      ctx.notifyAction('ctx.base64.decodeArrayBuffer');
      var binary_string =  window.atob(input);
      var len = binary_string.length;
      var bytes = new Uint8Array( len );
      for (var i = 0; i < len; i++)        {
          bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    },

    /**
    * Decodes a base 64 string to a binary stream
    * @description
<code javascript>
</code>
    * @method decodeStream
    * @path ctx.base64.decodeStream
    * @param {string} input base 64input string to be decoded
    * @return {*} decoded binary stream
    */
    decodeStream: function(input) {
      ctx.notifyAction('ctx.base64.decodeStream');
      _dom = _dom || new ActiveXObject('MSXml2.DOMDocument');
      _elem = _elem || _dom.createElement('ctxBase64Element');
      _elem.dataType = e.ajax.content.base64;
      _elem.text = input;
      return _elem.nodeTypedValue;
    },

    /**
    * Encodes a string or binary array to a base 64 string
    * @description
    *
<code javascript>
var txt = "馆驻 الممل Федера";
var txt64 = ctx.base64.encode(txt); // contains '6aaG6am7INin2YTZhdmF2YQg0KTQtdC00LXRgNCw'
</code>
    * @method encode
    * @path ctx.base64.encode
    * @param {Object|string} input input string or byte array to be encoded in base 64
    * @param {boolean} [isBinary] if true, the input string is considered as raw, and is not encoded/decoded in UTF8
    * @return {string} encoded string
    */
    encode: function(input, isBinary) {
      ctx.notifyAction('ctx.base64.encode');
      return _encode(input, isBinary);
    },

    /**
    * Encodes a buffer array to a base 64 string
    * @description
    *
    * // :!: __Caution:__ this function can only be injected and executed in a Web page, it can't be directly used in a project script. //
    *
<code javascript>
</code>
    * @method encodeArrayBuffer
    * @path ctx.base64.encodeArrayBuffer
    * @param {ArrayBuffer} input input string or byte array to be encoded in base 64
    * @return {string} encoded string
    */
    encodeArrayBuffer: function(input) {
      ctx.notifyAction('ctx.base64.encodeArrayBuffer');
      var binary = '';
      var bytes = new Uint8Array( input );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
    },

    /**
    * Encodes a binary stream to a base 64 string
    * @description
    *
<code javascript>
</code>
    * @method encodeStream
    * @path ctx.base64.encodeStream
    * @param {Object} input input binary stream to be encoded in base 64
    * @return {string} encoded string
    */
      encodeStream: function(input) {
        ctx.notifyAction('ctx.base64.encodeStream');
        _dom = _dom || new ActiveXObject('MSXml2.DOMDocument');
        _elem = _elem || _dom.createElement('ctxBase64Element');
        _elem.dataType = e.ajax.content.base64;
        _elem.nodeTypedValue = input;
        var ret = _elem.text.replace(/\n/g, "");
        _elem.nodeTypedValue= null;
        return ret;
      }
    };
    return self;
}( ) );

function _CtxAjax() {};
/**
 * AJAX management library
 * @class ctx.ajax
 * @path ctx.ajax
 * @constructor
 **/
ctx.ajax = (function _CtxAjax() {

	var _callOptions = {};

	/**
  * @param {ctx.ajaxParams} params
  * @return {ctx.ajaxParams}
  */
  var _initOptions = function (params) {
    params = params || {};
    /** @type {ctx.ajaxParams} */var options = {
      async: true,
      contentType: e.ajax.content.form,
      context: null,
      crossDomain: false,
      data : undefined,
      formData: undefined,
      dataType: undefined,
      desc: undefined,
      error: undefined,
      xhrFields: undefined,
      headers: {},
      id: 0,
      localFile: '',
      method: e.ajax.method.get,
      mimeType: undefined,
      password: undefined,
      requestType: e.ajax.requestType.server,
      responseType: e.ajax.responseType.none,
      success: undefined,
      timeout: undefined,
      url: '',
      username: undefined,
      xhr:undefined,
			usePassport : false,
			ignoreClientCertificate: false,
			resultInBase64: false,
			clientCertificate: undefined
    };
		if (params.header && params.header.length) {
			for (var id = 0; id < params.header.length; id++) {
	      options.headers[params.header[id].type] = params.header[id].value;
			};
		} else if (params.header && ('object' === typeof params.header) && !params.headers) {
			options.headers = params.header;
		} 
		if (options.noCache) {
      options.headers[e.ajax.header.cacheControl] = e.ajax.cache.noCache;
		}
		
    for (var key in options) {
      if(params[key] !== undefined) {
        if (('object' === typeof options[key]) && ('object' === typeof params[key]))
          ctx.set(params[key], options[key]);
        else
          options[key] = params[key];
      }
    }

		if (params.usePassport
			&& ctx.currentStep
			&& ctx.currentStep.sc
			&& ctx.currentStep.sc.job
			&& ctx.currentStep.sc.job.passport)
		{
			options.headers.passport = ctx.currentStep.sc.job.passport;
		}
		return options;
	}

	/**
  * @param {ctx.ajaxParams} options
  */
  var _createXHR = function (options) {
    var request = null;
    if (options && (options.requestType == e.ajax.requestType.client)) {
      // *** client type : Web browser call ***
      try {
        request = new ActiveXObject("MSXML2.XMLHTTP");
      } catch (ex) {
        try {
          request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (ex2) {
          try {
            request = new window.XMLHttpRequest();
          } catch (ex2) {
              try {
                  request = new XMLHttpRequest();
          } catch (ex2) {}
        }
      }
      }
    } else {
      // *** server type : Interactive call ***
      try {
				if (options && options.clientCertificate) {
	        request = new ActiveXObject("MSXML2.ServerXMLHTTP");
				} else {
          request = new ActiveXObject("Microsoft.XMLHTTP");
				}
      } catch (ex) {
        try {
	        request = new ActiveXObject("WinHttp.WinHttpRequest");
        } catch (ex) {
          try {
            request = new XMLHttpRequest();
          } catch (ex) {
	          try {
	            request = new ActiveXObject("MSXML2.XMLHTTP");
	          } catch (ex) {
              try {
			          request = new window.XMLHttpRequest();
              } catch (ex) {}
	          }
	        }
	      }
	    }
    }
    return request;
  };

	/**
  * @param {ctx.ajaxParams} options
  * @suppress {missingProperties}
  * @return {ctx.ajaxParams}
  */
  var _sendRequest = function (options) {
		var _timeoutTimer = 0;	
    try {
      // create HttpRequest
      options.xhr = _createXHR(options);

      var isHttp = (String(options.url).toLowerCase().indexOf('http') >= 0);

      //Kill the Cache problem in IE.
      //var now = "uid=" + new Date().getTime();
      //options.url += (options.url.indexOf("?") >= 0) ? "&" : "?";
      //options.url += now;

      // for 'form' content, use URL encoding
      //var values;
      // request body (Json / encoding)
      var body = {
        data: undefined,
        size: 0
      };
      var query; // query : url?...&...

      // if (options.method == e.ajax.method.post) {
        // var parts = options.url.split("\?");
        // if (parts[0]) { options.url = parts[0]; }
        // if (parts[1]) { values = parts[1]; }
      // }

      if (options.data) {
        if ((!options.contentType) || (options.formData) || (options.contentType == e.ajax.content.form)) {
          if (typeof(options.data) === 'object') {
            query = _buildQuery(options.data);
          } else if (typeof options.data === 'string') {
            query = options.data;
          }
        } else {
          if (typeof(options.data) === 'object') {
            body.data = ctx.json.stringify(options.data);
            body.size = body.data.length;
          } else if (typeof options.data === 'string') {
            body.data = options.data;
            body.size = body.data.length;
          }
        }
      }

      var url = options.url;
      if (query) {
        url = url + '?' + query;
      }
      url = encodeURI(url);

      // open request
      // Set credentials for server. HttpRequest SetCredentials flags. SERVER = 0, PROXY = 1;
      //if (options.xhr.setCredentials) { options.xhr.setCredentials( options.username || '', options.password || '', 0); }
      if (options.username || options.password) {
        options.xhr.open(options.method, url, options.async, options.username || '', options.password || '');
      } else {
        options.xhr.open(options.method, url, options.async);
      }

			if (options.clientCertificate) {
				options.xhr.setOption(3, options.clientCertificate);
			}

			// Apply custom fields if provided
      if ( options.xhrFields ) {
        for ( var i in options.xhrFields ) {
          if (undefined !== typeof(options.xhr[ i ]))
            options.xhr[ i ] = options.xhrFields[ i ];
        }
      }

      // Override mime type if needed
      if ( options.mimeType && options.xhr.overrideMimeType ) {
        options.xhr.overrideMimeType( options.mimeType );
      }

      try {
        if ((options.xhr.responseType !== undefined) && options.responseType) {
          options.xhr.responseType = options.responseType;
        }
//          else if (options.responseType) {
//            switch (options.responseType) {
//              case e.ajax.responseType.arrayBuffer:
//              case e.ajax.responseType.blob:
//              case e.ajax.responseType.MSStream:
//              case e.ajax.responseType.document:
//              {
//                if (options.xhr.overrideMimeType) {
//                  options.xhr.overrideMimeType('text/plain; charset=x-user-defined');
//                } else {
//                  options.xhr.setRequestHeader('Accept-Charset', 'x-user-defined');
//                }
//                break;
//              }
//            }
//          }
      } catch (ex) { }

      // set headers

      // manage formData
      if ( options.formData && ('object' === typeof options.formData)) {
        var boundary = _generateBoundary();
        body = _createMultipartData( options.formData, boundary );
        options.contentType = 'multipart/form-data; boundary=' + boundary;
        //options.xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
        //options.xhr.setRequestHeader('Content-Length', res.size);
      }

      // manage state change
      options.xhr.onreadystatechange = function () {
        var _opt = options;
        if (options.xhr.readyState == 4) {
          // Clear timeout if it exists
          if ( _timeoutTimer ) {
            clearTimeout( _timeoutTimer );
          }

          // normal case : status == 2xx, or status == 0 for a localhost HTTP request
          if (((options.xhr.status >= 200) && (options.xhr.status < 300)) || ((!isHttp) && (options.xhr.status == 0))) {
            _getResult(options);
          } else {
            // call error callback
            //ctx.log(options.xhr, e.logIconType.Error, 'ctx.ajax.call "' + options.url + '" failed : ' + options.xhr.status);
            if (typeof options.error === 'function') {
              options.error.apply(options.context, [options.xhr, e.ajax.error.error, options.xhr.statusText]);
            }
          }
        }
      }

      if (options.contentType) {
        options.headers[e.ajax.header.contentType] = options.contentType;
      }
      if (body.size) {
        options.headers[e.ajax.header.contentLength] = body.size;
      }
      for (var id in options.headers) {
        options.xhr.setRequestHeader(id, options.headers[id]);
      };

      // Timeout
      if ( options.async && options.timeout && options.timeout > 0 ) {
        _timeoutTimer = window.setTimeout( function() {
          options.xhr.abort( e.ajax.error.error );
          //ctx.log(options.xhr, e.logIconType.Error, 'ctx.ajax.call "' + options.url + '" failed (timeout): ' + options.xhr.status);
          // call error callback
          if (typeof options.error === 'function') {
            options.error.apply(options.context, [options.xhr, e.ajax.error.timeout, options.xhr.statusText]);
          }
        }, options.timeout );
      }

      // send the request
      options.xhr.send(body.data);

    } catch (ex) {
      // call error callback
      if (options.error && (typeof options.error === 'function')) {
        options.error.apply(options.context, [options.xhr, e.ajax.error.error, options.xhr.statusText]);
      }
    }
    return options;
	}
	
	/**
  * @param {ctx.ajaxParams} options
  * @return {ctx.ajaxParams}
  */
  var _sendRequestEx = function (options) {
    var url = options.url;
    var data;
    if (options.data) {
      if (options.formData || options.contentType==e.ajax.content.form) {
        var query;
        if (typeof(options.data) ==='object') {
          query = _buildQuery(options.data);
        } else if (typeof options.data ==='string') {
          query = options.data;
        }
        if (query)
          url = url +'?'+ query; // encodeURI(query) ?
      } else {
        if (typeof(options.data) ==='object') {
          data = ctx.json.stringify(options.data);
        } else if (typeof options.data === 'string') {
          data = options.data;
        }
      }
    }
    // manage formData
    if (options.formData && ('object'=== typeof options.formData)) {
      var boundary = _generateBoundary();
      var res = _createMultipartData(options.formData, boundary);
      options.contentType = 'multipart/form-data; boundary=' + boundary;
      options.headers['Content-Length'] = res.size;
    }

    try {
			var document = new ActiveXObject("htmlfile")
			var urlE = document.createElement('a');
      var uuid = ctx.uuid();
			urlE.setAttribute('href', url);
			var Parms = { 
				Method: options.method || 'GET',
				Domain: urlE.hostname,
				Page: urlE.pathname + urlE.search,
				Headers: [],
				Base64: options.resultInBase64,
				Uuid: uuid,
				Port: parseInt(urlE.port, 10),
				Data: data,
				LocalFile: options.localFile,
				EventOk: "evAjaxExOK",
				EventKo: "evAjaxExKO" 
			};
			if (options.contentType)
				Parms.Headers.push("Content-Type: " + options.contentType);
			if (options.headers) {
				ctx.each(options.headers, function(id, value) {
					Parms.Headers.push(id + ": " + value);
				});
			}
			if (options.formData && ('object'=== typeof options.formData)) {
				Parms.FormData = ctx.options.path.log +'\\test.txt';
			}
			if (options.password)
				Parms.Pass = options.password;
			if (options.username)
				Parms.User = options.username;
			_callOptions[uuid] = options;
			ctx.wkMng.AjaxEx( JSON.stringify( Parms ) );
		} catch (ex) { 
			ctx.log("ctx.wkMng.AjaxEx failed wih error: " + ex.message, e.logIconType.Error);
		}
    return options;
	}
	
  var _getResult = function(options) {
    try {
      var result = "";
      if (options.desc) {
        var res = {};
        res.url = options.url;
        res.status = options.xhr.status;
        res.isBinary = false;
        res.statusText = options.xhr.statusText;
        if (options.localFile)
          res.localFile = options.localFile;
        res.headers = {};
        var sHeaders = options.xhr.getAllResponseHeaders();
        var headers = sHeaders.split('\r\n');
        for (var i = 0, len = headers.length; i < len; i++) {
          var value = headers[i];
          var pos = value.indexOf(':');
          if (pos > 0) {
						if (res.headers[value.substring(0, pos)] != undefined) {
							res.headers[value.substring(0, pos)] += '||';
						}
						else {
							res.headers[value.substring(0, pos)] = '';
						}
            res.headers[value.substring(0, pos)] += value.substring(pos + 1);
          }
        }
        if (Contextor) {
          var content;
          if (options.responseType === e.ajax.responseType.arrayBuffer) {
            res.isBinary = true;
            if ('undefined' !==  typeof options.xhr.responseBody) {
              var arr = new VBArray(options.xhr.responseBody).toArray();
              //var arr = options.xhr.responseBody;
              content = ctx.base64.encode(arr, res.isBinary);
              //content = ctx.base64.encodeArrayBuffer(arr);
            } else if (options.xhr.response) {
              var arr = options.xhr.response;
              //var arr = new Uint8Array(options.xhr.response)
              //content = ctx.base64.encode(arr, res.isBinary);
              //content = btoa(String.fromCharCode.apply(null, arr));
              content = ctx.base64.encodeArrayBuffer(arr);
            } else if (options.xhr.responseStream) {
              var arr = options.xhr.responseStream;
              content = ctx.base64.encodeStream(arr);
            } else if (options.xhr.responseText) {
              content = encodeURIComponent(options.xhr.responseText);
              content = unescape(content);
              content = btoa (content);
              //content = ctx.base64.encode(options.xhr.responseText, res.isBinary);
            }
          } else if (options.xhr.responseText) {
            content = options.xhr.responseText;
          }
          var sRes = '';
          if ((typeof JSON !== 'undefined') && (typeof JSON.stringify === 'function')) {
            sRes = e.prefix.json + JSON.stringify(res);
          } else {
            // no JSON available : send a simplified structure
            sRes = e.prefix.json + '{"isBinary":' + res.isBinary + ',"status":' + res.status + ',"statusText":"' + res.statusText + '"}';
          }
          //Contextor.Event( options.desc.name, options.desc.appliName, "_Empty_", String(options.id), options.desc.appliInst, 0, sRes);
          Contextor.Event( options.desc.name, options.desc.appliName, "_Empty_", "", options.desc.appliInst, options.id, sRes);
          Contextor.Event( options.desc.name, options.desc.appliName, "_Empty_", "", options.desc.appliInst, options.id, content);
        }
      } else if (options.localFile) {
        // *** if a local filename is provided, save data in this file ***
        if (typeof (options.xhr.responseBody) != "undefined") {
          ctx.fso.file.write(options.localFile, options.xhr.responseBody, e.file.encoding.Binary);
        } else if ((options.xhr.responseType === e.ajax.responseType.arrayBuffer) && (options.xhr.response)) {
          ctx.fso.file.write(options.localFile, options.xhr.response, e.file.encoding.Binary);
        } else {
          ctx.fso.file.write(options.localFile, options.xhr.responseText, e.file.encoding.ASCII); // encoding management ?
        }
        result = options.localFile; // result is the file name
      } else {
        // get content type from the answer
        var dataType = '';
        var dataTypes = options.xhr.getResponseHeader(e.ajax.header.contentType);
        if (dataTypes) {
          dataType = dataTypes.split(";")[0];
          if (dataType) {
            options.dataType = dataType.toLowerCase();
          }
        }
        dataType = options.dataType || options.contentType;
        switch (dataType) {
          case e.ajax.content.xml:
          case e.ajax.content.xmlText:
            result = options.xhr.responseXML;
            break;
          case e.ajax.content.json:
          case e.ajax.content.jsonText:
          case e.ajax.content.javascript:
          case e.ajax.content.javascriptText:
          case e.ajax.content.javascriptX:
            //if JSON format, try to parse the result
            try {
              result = ctx.json.parse(options.xhr.responseText);
              if (result == null) { result = options.xhr.responseText; }
            } catch (ex) {
              result = options.xhr.responseText;
            }
            break;
          default:
            result = options.xhr.responseText;
            break;
        }
      }

      // call success callback
      if (typeof options.success === 'function') {
        options.success.apply(options.context, [result, options.xhr.statusText, options.xhr]);
      }
    } catch (ex) {
      // call error callback
      if (typeof options.error === 'function') {
        options.error.apply(options.context, [options.xhr, e.ajax.error.error, options.xhr.statusText]);
      }
      if (Contextor && options.desc && options.id) {
          var sRes = e.prefix.json + '{"errorMessage":"' + ex.message + '"}';
          Contextor.Event( options.desc.name, options.desc.appliName, "_Empty_", "", options.desc.appliInst, options.id, 'error:' + ex.message);
      }
    }
  }

  function _decodeKeyValue(str) {
    var obj = {};
    var pairs = str.split('&');
    var parts;
    var pair;
    for (var i = 0, len = pairs.length; i < len; ++i) {
      pair = pairs[i];
      parts = pair.split('=');
      obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
    return obj;
  }

  function _encodeKeyValue(pairs, key, val) {
    if (val && (typeof val === 'function'))
      return;
    if (Array.isArray(val)) {
      return val.forEach(function(v) {
        _encodeKeyValue(pairs, key, v);
      });
    }
    //pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    pairs.push(key + '=' + val);
  }

  function _generateBoundary(  ) {
    var boundary = "------------" + (new Date()).getTime();
    return boundary;
  }

  function _createMultipartData( formData, boundary ) {
    var  adTypeBinary = 1;
    var chrset = "windows-1252"; // "utf-8";
    var crlf = "\r\n";
    var data = "";
    var first = true;
    var res = {
      size: 0,
      data: ''
    };
    /** @type {ADODBStreamObject} */ var streamText = new ActiveXObject( 'ADODB.Stream' );
    /** @type {ADODBStreamObject} */ var streamBin = new ActiveXObject( 'ADODB.Stream' );
    /** @type {ADODBStreamObject} */ var streamWorkBin = new ActiveXObject( 'ADODB.Stream' );
    streamBin.Open();
    streamBin.Type = adTypeBinary;
    if (!Array.isArray(formData)) {
      formData = [formData];
    }
    ctx.each(formData, function(id, formData) {
      if (formData && formData.name ) {
        streamWorkBin.Open();
        streamWorkBin.Type = adTypeBinary;
        streamText.Open();
        streamText.Charset = chrset;

        if (first) {
          data = "";
          first = false;
        } else {
          data = crlf;
        }
        data += "--" + boundary + crlf;
        data += 'Content-Disposition: form-data; name="' + formData.name + '"';
        if (formData.file) {
          if (!ctx.fso.file.exist(formData.file)) {
            // todo throw...
          }
          var alias = ctx.fso.file.getFileName(formData.file);
          data += '; filename="' + escape(alias) + '"';
        }
        data += crlf;
        if (formData.type) {
          data += "Content-Type: " + formData.type + crlf;
        }
        data += crlf;
        if (formData.value !== undefined) {
          data += String(formData.value);
        }
        streamText.WriteText(data);
        streamText.Position = 0;
        streamText.CopyTo(streamWorkBin);
        streamText.Close();

        streamWorkBin.Position = 0;
        streamBin.Write(streamWorkBin.Read(streamWorkBin.Size ));
        if (formData.file) {
          streamWorkBin.LoadFromFile (formData.file);
          streamBin.Write(streamWorkBin.Read( streamWorkBin.Size ));
        }
        streamWorkBin.Close();
      }
    });

    // close boundary
    streamWorkBin.Open();
    streamWorkBin.Type = adTypeBinary;
    streamText.Open();
    streamText.Charset = chrset;
    data = crlf + "--" + boundary + "--" + crlf;
    streamText.WriteText(data);
    streamText.Position = 0;
    streamText.CopyTo(streamWorkBin);
    streamWorkBin.Position = 0;
    streamBin.Write(streamWorkBin.Read( streamWorkBin.Size ));

    // copy to output
    streamBin.Position = 0;
    res.size = streamBin.Size;
    res.data = streamBin.Read(res.size);
    streamBin.SaveToFile(ctx.options.path.log + '\\test.txt', 2); // for debug and ignoreClientCertificate mode purpose
    streamBin.Close();
    return res;
  }

  function _buildQuery(obj) {
    if ((obj != null) && (typeof(obj) === 'object')) {
      var pairs = [];
      for (var id in obj) {
        if (null != obj[id]) {
          _encodeKeyValue(pairs, id, obj[id]);
        }
      }
      return pairs.join('&');
    } else
      return obj;
  }

  var self =
  /** @lends ctx.ajax */
  {
    /**
    * Creates and sends an Http Request to call a remote service or download a file
    * @description
    * This function encapsulates HttpRequest management:
    *   * SOAP, REST GET/PUT/POST/DEL request types,
    *   * asynchronous answer analysis,
    *   * header / body formatting (form or json based),
    *   * optional user/login management,
    *   * ...,
    *
    * The syntax and approach are similar to [[http://www.w3schools.com/jquery/ajax_ajax.asp|jQuery ajax() Method]].
    *
    * The function is called with a '**ctx.ajaxParams**' object :
    *
    * |< 100% 15% 20% >|
    * | **method** | //{[[:lib:common:ctx.enum#enumeration_eajaxmethod|e.ajax.method]]}//  |type of request ('GET', 'PUT', 'POST', ...). Default is 'GET' |
    * | **url** | //{string}// |URL to be called (mandatory) |
    * | **data** | //{Object|string}// |data to be sent (optional) |
    * | **async** | //{boolean}// |value indicating whether the request should be handled asynchronous or not. Default is true |
    * | **contentType** | //{[[:lib:common:ctx.enum#enumeration_eajaxcontent|e.ajax.content]]|string}// | data type to be sent : 'form', 'json', 'xml', 'html', ... Default is 'json' |
    * | **dataType** | //{[[:lib:common:ctx.enum#enumeration_eajaxcontent|e.ajax.content]]}// | data type expected for the response : 'form', 'json', 'xml', 'html', ... Default is 'html' |
    * | **id** | //{number}// |identifier (optional) |
    * | **localFile** | //{string}// |local file URL, only used when downloading a file |
    * | **username** | //{string}// |user name (optional) |
    * | **password** | //{string}// |password (optional) |
    * | **usePassport** | //{boolean}// |use a SAP passport (optional) |
    * | **timeout** | //{number}// |local timeout (in milliseconds) for the request (optional) |
    * | **headers** | //{Array<Object>}// | set of headers definitions to be included in the request (optional). Format is: \\ header: [\\  { type: e.ajax.header.cacheControl, value: e.ajax.cache.noCache },\\  { type: ..., value: ... }\\ ]\\ (see [[:lib:common:ctx.enum#enumeration_eajaxheader|e.ajax.header]] and [[:lib:common:ctx.enum#enumeration_eajaxcache|e.ajax.cache]]) |
    * | **requestType** | //{[[:lib:common:ctx.enum#enumeration_eajaxrequesttype|e.ajax.requestType]]}// |request type (client (Web browser JS engine) or server (Interactive JS engine)). Default is 'e.ajax.requestType.server' (optional) |
    * | **responseType** | //{[[:lib:common:ctx.enum#enumeration_eajaxresponsetype|e.ajax.responseType]]}// |data type of the response associated with the request. Default is (e.ajax.responseType.DOMString) (optional) |
    * | **context** | //{Object}// |"this" value for the callback functions (optional) |
    * | **success** | //{function(Object, string, Object)}// |callback called when the call is finished successfully. Format is: '**success(result, status, xhr)**'. Mandatory to get a result|
    * | **error** | //{function(Object, string, string)}// |callback called in case of error (optional). Format is: '**error(xhr, status, error)**'. |
    * | **clientCertificate** | //{string}// |client certificate name to be used(optional) |
    * | **ignoreClientCertificate** | //{boolean}// |disables client certificate (optional) |
    * | **resultInBase64** | //{boolean}// |retrieves result in base 64 format (optional) |
    *
    * \\
    * __Ex. :__ **Search in myCompany proxy server all accounts in 'Technology' industry**
    *
<code javascript>
var data = {
  filter: "Industry='Technology'",
  sort: '-Name'
}
ctx.ajax.call({
  method: e.ajax.method.get, // it is implicit
  url: 'https://myCompanyproxy.com/accounts',
  data: data,
  contentType: e.ajax.content.form, // input data are added in URL: '...?...&...'
  success: function(res, status, xhr) {
    // res contains an array of accounts
    for (var i in res) {
      var account = res[i];
      //...
    }
  },
  error: function(xhr, status, statusText) {
    ctx.log(' ctx.ajax.call  error: ' + statusText);
  }
});
</code>
    * @method call
    * @path ctx.ajax.call
    * @param {ctx.ajaxParams} params Request parameters
    * @return {ctx.ajaxParams} Request parameters
    */
    call : function (params) {
      try {
        ctx.notifyAction('ctx.ajax.call');
      } catch (ex) { }
			
      /** @type {ctx.ajaxParams} */var options = _initOptions(params);

			if(!options.url)
				return options; // no url provided

			if (options.ignoreClientCertificate) {
	      _sendRequestEx(options);
			} else {
	      _sendRequest(options);
			}
			return options;
    },

    /**
    * Downloads an http/https file to a local destination
    * @description
    * __Ex. :__ **Search in myCompany proxy server all accounts in 'Technology' industry**
    *
<code javascript>
</code>
    * @method download
    * @path ctx.ajax.download
    * @param {string} source source URL
    * @param {string} destination destination local file
    * @param {ctx.ajaxParams|function(boolean)} [params] optional options (see 'ctx.ajax.call' for possible values), or callback
    * @param {function(string)} [callback] callback to be called (string parameter gives the local filename (empty if failed))
    * @return {ctx.ajaxParams} Request parameters
    * @suppress {checkTypes}
    */
    download : function (source, destination, params, callback) {
      ctx.notifyAction('ctx.ajax.download');
      if (params && (typeof params === 'function')) {
        callback = params;
        params = undefined;
      }
      /** @type {ctx.ajaxParams} */ var options = params || {};
      if (source) options.url = source;
      if (destination) options.localFile = destination;
      options.success = function(res, status, xhr) {
        if (callback && (typeof callback === 'function')) {
          callback.call(null, destination);
        }
      };
      options.error = function(xhr, error, statusText) {
        if (callback && (typeof callback === 'function')) {
          callback.call(null, '');
        }
      };
      return ctx.ajax.call(options);
    },

    /**
    * @ignore internal usage
    * @method onRequestCallback
    * @path ctx.ajax.onRequestCallback
    * @param {ctx.event} ev
    * @param {boolean} success callback
    */
    onRequestCallback : function (ev, success) {
		 	var data = String(ev.data);
			var uuid = '';
			var options;
			var pos = 0;
			if (data) {
				pos = data.indexOf('|');
				if (pos > 0) {
					uuid = data.slice(0, pos);
					data = data.slice(pos + 1);
					options = _callOptions[uuid];
				}
			}
			if (!options)
				return;
			if (success && ('function' === typeof(options.success))) {
				// uuid|status|status text|content type|data
				pos = data.indexOf('|');
				if (pos > 0) {
					var status = parseInt(data.slice(0, pos), 0);
					data = data.slice(pos + 1);
					pos = data.indexOf('|');
					if (pos > 0) {
						var statusText = data.slice(0, pos);
						data = data.slice(pos + 1);
						pos = data.indexOf('|');
						if (pos > 0) {
							var contentType = data.slice(0, pos);
							data = data.slice(pos + 1);

							var sHeaders =''; 
							pos = data.indexOf('|');
							var headers = {};
							if (pos > 0) {
								sHeaders = data.slice(0, pos);
								var ash = sHeaders.split('\r\n');
								data = data.slice(pos + 1);
								for (var i=0; i<ash.length; ++i) {
									var sh = ash[i];
									pos = sh.indexOf(':');
									if (pos > 0) {
										if (headers[sh.substring(0, pos)] != undefined) {
											headers[sh.substring(0, pos)] += '||';
										}
										else {
											headers[sh.substring(0, pos)] = '';
										}
										headers[sh.substring(0, pos)] += sh.substring(pos + 1);
									}
								}
							}
							var xhr = {
								status: status,
								statusText: statusText,
								contentType: contentType,
								headers: headers,
								getAllResponseHeaders: function() { return sHeaders; },
								responseText: data
							}
							xhr.responseType = options.responseType;
							// get content type from the answer
							var dataTypes = headers[e.ajax.header.contentType];
							if (dataTypes) {
								var dataType = dataTypes.split(";")[0];
								if (dataType) {
									xhr.responseType = dataType.toLowerCase().trim();
								}
							}
							if ((status >= 200) && (status < 300)) {
								var result = data;
								switch (xhr.responseType) {
								case e.ajax.content.json:
								case e.ajax.content.jsonText:
								case e.ajax.content.javascript:
								case e.ajax.content.javascriptText:
								case e.ajax.content.javascriptX:
									try { // if JSON format, try to parse the result
										result = ctx.json.parse(data);
								  	if (result == null) { result = data; }
									} catch (ex) {
										result = data;
									}
									break;
								}
								options.success(result, statusText, xhr);
							} else if ('function' === typeof(options.error)) {
								options.error(xhr, status, statusText); 
							}
						}
					}
				}
			} else if (!success && ('function' === typeof(options.error))) {
				// uuid|failed API|error code|error message
				pos = data.indexOf('|');
				if (pos > 0) {
					var failedAPI = data.slice(0, pos);
					data = data.slice(pos + 1);
					pos = data.indexOf('|');
					if (pos > 0) {
						var status = parseInt(data.slice(0, pos), 0);
						data = data.slice(pos + 1);
							var xhr = {
								status: status,
								statusText: data,
								responseText: data
							}
						options.error(xhr, status, data); 
					}
				}
			}
			delete _callOptions[uuid];
		}
  };
  return self;
})();

  /**
   * Module for Clipboard management
   * @class ctx.clipboard
   * @path ctx.clipboard
   * @constructor
   */
  ctx.clipboard = (function() {
    var self =
    /** @lends ctx.clipboard */
    {

      /**
      * Gets clipboard textual content
      * @description
      * __Ex.:__
<code javascript>
var text = ctx.clipboard.get();
</code>
      * @method get
      * @path ctx.clipboard.get
      * @return {string} text clipboard content
      */
      get : function () {
        var desc = ctx.getDescriptor();
        return ctx.verbExec(desc, 'ctx.clipboard.get', 'SETVALUE', {
            ZoneCtx : '_Work0_',
            Value : '_Clipboard_'
          });
      },
      /**
      * Sets clipboard textual content
      * @description
      * __Ex.:__
<code javascript>
ctx.clipboard.set('Hello world');
</code>
      * @method set
      * @path ctx.clipboard.set
      * @param {string} value clipboard content
      * @return {string} execution result
      */
      set : function (value) {
        var desc = ctx.getDescriptor();
        return ctx.verbExec(desc, 'ctx.clipboard.set', 'SETVALUE', {
            ZoneCtx : '_Clipboard_',
            Value : value
          });
      },
      /**
      * Enables/disables the monitoring of the 'Windows clipboard'
      * @description
      * Once enabled, an event is sent to the application or process each time the clipboard content is modified
      *
      * __Ex.:__
<code javascript>
// enable clipboard tracking
ctx.clipboard.enableTrack(true, 'evClipboard');
</code>
      * @method enableTrack
      * @path ctx.clipboard.enableTrack
      * @param {boolean} enable enables ('true') or disables ('false') clipboard monitoring
      * @param {ctx.event} [event] event sent to the application or process each time the clipboard content is modified ('evClipboard' if omitted)
      * @return {string} result value
      */
      enableTrack : function (enable, event) {
        var process = (event ? event.appli : null) || GLOBAL;
        var name = (event ? event.name : null) || process.addEvent({evClipboard: ''}).name;
        var desc = process.getObjectDescriptor();
        return ctx.verbExec(desc, 'enableTrack', 'TRACKCLIPBOARD', {
          Value: (enable ? 'Y' : 'N'),
          Event: name
        });
      }
    };
    return self;
  })();

  /**
   * Module for Context management
   * @class ctx.context
   * @path ctx.context
   * @constructor
   */
  ctx.context = (function() {
    var _getXPath = function (xPath) {
      if (!xPath) {
        xPath = "*"; // default global xPath
        if (ctx.currentEvent && ctx.currentEvent.appli) {
          xPath = '//' + ctx.currentEvent.appliName;
          if (ctx.currentEvent.appliInst >= 0) {
            xPath += '[WkMng_Running/Instance="' + ctx.currentEvent.appliInst + '"]';
          }
        }
      }
      return xPath;
    };

    var self =
    /** @lends ctx.context */
    {

      /**
      * Adds a context node
      * @method addCtx
      * @path ctx.context.addCtx
      * @param {string} variable variable name (can contain a relative or absolute xPath)
      * @param {string} model XML string as a model
      * @param {string} iModele TBC
      * @param {string} [xPath] optional xPath ('*' if omitted)
      * @return {string} result value
      */
      addCtx : function (variable, model, iModele, xPath) {
        ctx.notifyAction('ctx.context.addCtx');
        var res = '';
        xPath = _getXPath(xPath);
        if (ctx.engineStarted) {
          res = ctx.wkMng.CtxtAddBloc(variable, model, iModele, xPath, "");
        }
        return res;
      },

      /**
      * Deletes a context node
      * @description
      * __Ex.:__
<code javascript>
var obj = ctx.context.delCtx('//GLOBAL/User');
</code>
      * @method delCtx
      * @path ctx.context.delCtx
      * @param {string} variable variable name (can contain a relative or absolute xPath)
      * @param {string} [xPath] optional xPath ('*' if omitted)
      * @return {string} result value
      */
      delCtx : function (variable, xPath) {
        ctx.notifyAction('ctx.context.delCtx');
        var res = '';
        xPath = _getXPath(xPath);
        if (ctx.engineStarted) {
          res = ctx.wkMng.CtxtAddBloc(variable, xPath, "");
        }
        return res;
      },

      /**
      * Tests if an XML node exists, in a context tree
      * @description
      * __Ex.:__
<code javascript>
if (ctx.context.exist('//PROCESS[Name="GLOBAL"]')) { ... }
</code>
      * @method exist
      * @path ctx.context.exist
      * @param {string} xPath node xPath
      * @return {boolean} result : 'true' if node exists
      */
      exist : function (xPath) {
        var desc = ctx.getDescriptor();
        xPath = _getXPath(xPath);
        var res = ctx.verbExec(desc, 'exist', 'EXIST', {
            ZoneCtx : xPath
          }, '<SETVALUE ZoneCtx="_Work0_" Value="1"/>', true);
        ctx.notifyAction('ctx.context.exist', res == '1' ? true : false);
        return (res == '1' ? true : false);
      },

      /**
      * Gets a context variable
      * @description
      * __Ex.:__
<code javascript>
ctx.options.path.bin = ctx.context.get('//WkMng_Info/CurrentURL');
</code>
      * @method get
      * @path ctx.context.get
      * @param {string} variable variable name (can contain a relative or absolute xPath)
      * @param {string} [xPath] optional xPath ('*' if omitted)
      * @return {string} read value
      */
      get : function (variable, xPath) {
        var res = '';
        xPath = _getXPath(xPath);
        if (ctx.engineStarted) {
          res = ctx.wkMng.CtxtGetVal(variable, xPath, "");
        }
        ctx.notifyAction('ctx.context.get', res);
        return res;
      },

      /**
      * Gets a context node as a node
      * @description
      * __Ex.:__
<code javascript>
var obj = ctx.context.getAppDesc(e.nature.WEB);
</code>
      * @method getAppDesc
      * @path ctx.context.getAppDesc
      * @param {e.nature} nature application nature
      * @return {string} result node
      */
      getAppDesc : function (nature) {
        ctx.notifyAction('ctx.context.getAppDesc');
        var res = '';
        var appDesc = "";
        var errorDescription = "";
        if (ctx.engineStarted) {
          res = ctx.wkMng.WkMgGetAppsDesc(nature, appDesc, errorDescription);
        }
        return appDesc;
      },

      /**
      * Gets a context node as a node
      * @description
      * __Ex.:__
<code javascript>
var obj = ctx.context.getCtx('//GLOBAL/Xc_MessBoxHtml');
</code>
      * @method getCtx
      * @path ctx.context.getCtx
      * @param {string} variable variable name (can contain a relative or absolute xPath)
      * @param {string} [xPath] optional xPath ('*' if omitted)
      * @return {Object} result node
      */
      getCtx : function (variable, xPath) {
        ctx.notifyAction('ctx.context.getCtx');
        var res = '';
        xPath = _getXPath(xPath);
        if (ctx.engineStarted) {
          res = ctx.wkMng.CtxtGetCtx(variable, xPath, "");
        }
        return res;
      },

      /**
      * Gets a context node as an IXMLNode object
      * @description
      * __Ex.:__
<code javascript>
var obj = ctx.context.getNode('//GLOBAL/User');
</code>
      * @method getNode
      * @path ctx.context.getNode
      * @param {string} [xPath] optional xPath ('*' if omitted)
      * @return {Node} XML node object
      */
      getNode : function (xPath) {
        ctx.notifyAction('ctx.context.getNode');
        var res = '';
        xPath = _getXPath(xPath);
        if (ctx.engineStarted) {
          res = ctx.wkMng.WkMgSelSingleNode(xPath);
        }
        return res;
      },

      /**
      * Gets a node as an IXMLNode object, from the project XML tree
      * @description
      * __Ex.:__
<code javascript>
var obj = ctx.context.getProject('//PROCESS[Name="GLOBAL"]');
</code>
      * @method getProject
      * @path ctx.context.getProject
      * @param {string} [xPath] optional xPath ('*' if omitted)
      * @return {Node} XML node object
      */
      getProject : function (xPath) {
        ctx.notifyAction('ctx.context.getProject');
        var res = '';
        xPath = _getXPath(xPath);
        if (ctx.engineStarted) {
          res = ctx.wkMng.WkMgGetPscNode(xPath);
        }
        return res;
      },

      /**
      * Sets a context variable
      * @description
      * __Ex.:__
<code javascript>
ctx.context.set('//GLOBAL/Name', 'Ford');
</code>
      * @method set
      * @path ctx.context.set
      * @param {string} variable variable name (can contain a relative or absolute xPath)
      * @param {string} value value to be set
      * @param {string} [xPath] optional xPath ('*' if omitted)
      * @return {string} result value
      */
      set : function (variable, value, xPath) {
        var res = '';
        xPath = _getXPath(xPath);
        if (ctx.engineStarted) {
          res = ctx.wkMng.CtxtSetVal(variable, value, xPath, "");
        }
        ctx.notifyAction('ctx.context.set', res);
        return res;
      },

      /**
      * Sets a context node
      * @description
      * __Ex.:__
<code javascript>
var obj = ctx.context.setCtx('//GLOBAL/User', 'XML', '<User><Name></Name><Firstname></Firstname></User>');
</code>
      * @method setCtx
      * @path ctx.context.setCtx
      * @param {string} variable variable name (can contain a relative or absolute xPath)
      * @param {string} action type of creation (TBC)
      * @param {string} model XML string as a model
      * @param {string} iModele TBC
      * @param {string} [xPath] optional xPath ('*' if omitted)
      * @return {string} result value
      */
      setCtx : function (variable, action, model, iModele, xPath) {
        ctx.notifyAction('ctx.context.setCtx');
        var res = '';
        xPath = _getXPath(xPath);
        if (ctx.engineStarted) {
          res = ctx.wkMng.CtxtSetCtx(variable, action, model, iModele, xPath, "");
        }
        return res;
      }

    };
    return self;
  })();

 /**
  * Class for cryptography management
  * @class       ctx.cryptography
  * @path        ctx.cryptography
  * @constructor
  */
  ctx.cryptography = (function() {

    var self =
    /** @lends ctx.cryptography */
    {

     /**
      * Class used to implement key objects
      * @class        ctx.cryptography.keyClass
      * @description
      *  __Ex.:__
      *  <code javascript>var key = new ctx.cryptography.keyClass( { ... } );</code>
      * @path         ctx.cryptography.keyClass
      * @constructor
      * @param        {Object} [obj] Initialization parameters
      * @advanced
      */
      keyClass : function (obj) {
        obj = obj || {};
        var _key = this;
        /** key name
        * @property {string}
        * @path ctx.cryptography.keyClass.name */ this.name = '';
        /** key description
        * @property {string}
        * @path ctx.cryptography.keyClass.comment */ this.comment = '';
        /** key usage (encryption or signature)
        * @property {e.cryptography.keyUsage}
        * @path ctx.cryptography.keyClass.usage */ this.usage = e.cryptography.keyUsage.encryption;
        /** key type : container or certificate (default is 'container')
        * @property {e.cryptography.keyType}
        * @path ctx.cryptography.keyClass.type */ this.type = e.cryptography.keyType.container;
        /** @property {boolean}
        * @path ctx.cryptography.keyClass.server */ this.server = false;
        /** key store (for  certificate)
        * @property {string}
        * @path ctx.cryptography.keyClass.store */ this.store = '';
        /** key store location
        * @property {e.cryptography.storeLocation}
        * @path ctx.cryptography.keyClass.storeLocation */ this.storeLocation = e.cryptography.storeLocation.currentUser;
        /** cyphering algorithm
        * @property {e.cryptography.algorithm}
        * @path ctx.cryptography.keyClass.algorithm */ this.algorithm = e.cryptography.algorithm.none;
        /** @property {string}
        * @path ctx.cryptography.keyClass.publicKey */ this.publicKey = '';
        /** @property {string}
        * @path ctx.cryptography.keyClass.h1 */ this.h1 = '';
        /** @property {string}
        * @path ctx.cryptography.keyClass.h2 */ this.h2 = '';
        /** @property {string}
        * @path ctx.cryptography.keyClass.alias */ this.alias = '';

        /** @method init
        * @param {Object} [obj]
        * @path ctx.cryptography.keyClass.init
        * @return {ctx.cryptography.keyClass} */
        this.init = function(obj) {
          if (obj && ('object' === typeof obj)) {
            ctx.each(obj, function(id, value) {
              if ((_key[id] !== undefined) && (value !== undefined)) {
                _key[id] = value;
              }
            });
          }
          return _key;
        }

        /** @method get
        * @param {function(e.error,string,Object)} [callback]
        * @path ctx.cryptography.keyClass.get
        * @return {ctx.cryptography.keyClass} */
        this.get = function(callback) {
          ctx.notifyAction('ctx.cryptography.keyClass.get');
          if (_key.publicKey) {
            // already read, direct return
            if (callback && ('function' === typeof callback)) {
              callback(e.error.OK, "", _key);
            }
          } else if (!_key.server) {
            ctx.cryptography.getPublicKey(_key);
            if (callback && ('function' === typeof callback)) {
              callback(e.error.OK, "", _key);
            }
          } else if (_key.server && (typeof ctx.galaxyAPI !== 'undefined')) {
            // retrieve public key from the registry
            ctx.cryptography.readRegPublicKey(_key, ctx.options.m2m && ctx.options.m2m.root);
            if (_key.publicKey) {
              if (callback && ('function' === typeof callback)) {
                callback(e.error.OK, "", _key);
              }
            } else {
              // retrieve key from the server
              //ctx.galaxyAPI.getKey(_key, callback);
            }
          }
          return _key;
        }

        /** @method set
        * @param { function(e.error, string, Object) } [callback]
        * @path ctx.cryptography.keyClass.set
        * @return {ctx.cryptography.keyClass} */
        this.set = function(callback) {
          ctx.notifyAction('ctx.cryptography.keyClass.set');
          if (typeof ctx.galaxyAPI !== 'undefined') {
            if (!_key.publicKey) {
              if (!_key.server) {
                ctx.cryptography.getPublicKey(_key);
              } else {
                ctx.cryptography.readRegPublicKey(_key, ctx.options.m2m && ctx.options.m2m.root);
              }
            }
            /*if (_key.publicKey) {
              ctx.galaxyAPI.setKey(_key, callback);
            }*/
          }
          return _key;
        }

        this.init(obj);
        _key.alias = _key.alias || _key.name;
        return _key;
      },

     /**
      * @class        ctx.cryptography.credentialClass
      * @path         ctx.cryptography.credentialClass
      * @constructor
      * @param {Object} [obj] Initialization object
      */
      credentialClass : function (obj) {
        obj = obj || {}
        var _credential = this;
        /** @property {string} */ var _userName = '';
        /** @property {string} */ var _password = '';
        /** @property {string}
        * @path ctx.cryptography.credentialClass.name */ this.name = '';
        /** @property {string}
        * @path ctx.cryptography.credentialClass.comment */ this.comment = '';
//        /** @property {string}
//        * @path ctx.cryptography.credentialClass.userName */ this.userName = '';
//        /** @property {string}
//        * @path ctx.cryptography.credentialClass.password */ this.password = '';
        /** @property {boolean}
        * @path ctx.cryptography.credentialClass.machine */ this.machine = false;
        /** @property {boolean}
        * @path ctx.cryptography.credentialClass.user */ this.user = true;
        /** @property {ctx.cryptography.keyClass}
        * @path ctx.cryptography.credentialClass.key */ this.key = ctx.cryptography.keys.none;
        /** @property {e.env}
        * @path ctx.cryptography.credentialClass.env */ this.env = e.env.none;
        /** @property {boolean}
        * @path ctx.cryptography.credentialClass.server */ this.server = false;
        /** @property {e.cryptography.credentialType}
        * @path ctx.cryptography.credentialClass.type */ this.type = e.cryptography.credentialType.generic,
        /** @property {e.cryptography.credentialPersist}
        * @path ctx.cryptography.credentialClass.persist */ this.persist = e.cryptography.credentialPersist.localMachine,

        /** @method init
        * @param {Object} [obj]
        * @path ctx.cryptography.credentialClass.init
        * @return {ctx.cryptography.credentialClass} */
        this.init = function(obj) {
          if (obj && ('object' === typeof obj)) {
            ctx.each(obj, function(id, value) {
              if ((_credential[id] !== undefined) && (value !== undefined)) {
                _credential[id] = value;
              }
            });
          }
          return _credential;
        }

        /** @method get
        * @description
        *
        * @param { function(e.error, string, Object) } [callback]
        * @path ctx.cryptography.credentialClass.get
        * @return {ctx.cryptography.credentialClass} */
        this.get = function(callback) {
          ctx.notifyAction('ctx.cryptography.credentialClass.get');
          if ((_userName) || (_password)) {
            // already read, direct return
            if (callback && ('function' === typeof callback)) {
              callback(e.error.OK, "", _credential);
            }
          } else if (_credential.server && (typeof ctx.galaxyAPI !== 'undefined')) {
            // retrieve credential from the server
            _credential.reset();
            ctx.galaxyAPI.getCredential(_credential, function(code, label, obj) {
              // if (code == e.error.OK) {
                // _userName = obj.userName;
                // _password = obj.password;
              // }
              if (callback && ('function' === typeof callback)) {
                callback(code, label, _credential);
              }
            });
          } else {
            // read in the local Credential Manager
            /** @type {e.error} */var code = e.error.Fail;
            var label = "Credential read failed";
            try {
              _credential.reset();
              _credential.type = _credential.type || e.cryptography.credentialType.generic;
              var res = ctx.wkMng.CryptReadCredential(_credential.name, _credential.type);
              if (res) {
                var obj = ctx.json.parse(res);
                if (obj) {
                  _userName = obj.userName;
                  _password = obj.password;
                  code = e.error.OK;
                  label = "";
                }
              }
            } catch (ex) {}
            if (callback && ('function' === typeof callback)) {
              callback(code, label, _credential);
            }
          }
          return _credential;
        }

        /** @method remove
        * @description
        *
        * @param { function(e.error, string, Object) } [callback]
        * @path ctx.cryptography.credentialClass.remove
        * @return {ctx.cryptography.credentialClass} */
        this.remove = function(callback) {
          ctx.notifyAction('ctx.cryptography.credentialClass.remove');
          if (_credential.server && (typeof ctx.galaxyAPI !== 'undefined')) {
            if (callback && ('function' === typeof callback)) {
              callback(e.error.NotImplemented, "Can not remove credentail on server", _credential);
            }
          } else {
            // save in the local Credential Manager
            _credential.type = _credential.type || e.cryptography.credentialType.generic;
            var res = ctx.wkMng.CryptDeleteCredential(_credential.name, _credential.type);
            if (callback && ('function' === typeof callback)) {
              callback((res ? e.error.OK : e.error.Fail), "", _credential);
            }
          }
          return _credential;
        }

        /** @method reset
        * @path ctx.cryptography.credentialClass.reset
        * @return {ctx.cryptography.credentialClass} */
        this.reset = function() {
          ctx.notifyAction('ctx.cryptography.credentialClass.reset');
          _userName = "";
          _password = "";
          return _credential;
        }

        /** @method set
        * @description
        *
        * @path ctx.cryptography.credentialClass.set
        * @param { function(e.error, string, Object) } [callback]
        * @return {ctx.cryptography.credentialClass} */
        this.set = function(callback) {
          ctx.notifyAction('ctx.cryptography.credentialClass.set');
          if (_credential.server && (typeof ctx.galaxyAPI !== 'undefined')) {
            //ctx.galaxyAPI.setCredential(_credential, callback);
						if (callback && ('function' === typeof callback)) {
		          callback(e.error.NotImplemented, "ctx.credentialClass.set not implemented", _credential);
		        }						
          } else {
            // save in the local Credential Manager
            _credential.type = _credential.type || e.cryptography.credentialType.generic;
            _credential.persist = _credential.persist || e.cryptography.credentialPersist.localMachine;
            var res = ctx.wkMng.CryptWriteCredential(_credential.name, _credential.type, _credential.persist, _userName, _password, _credential.comment);
            if (callback && ('function' === typeof callback)) {
              var code = (res ? e.error.OK : e.error.Fail);
              var label = (res ? "" : "Credential write failed");
              callback(code, label, _credential);
            }
          }
          return _credential;
        }

        /**
        * @path ctx.cryptography.credentialClass.userName
        */
        this.userName = {
          /** @method get
          * @description
          * @path ctx.cryptography.credentialClass.userName.get
          */
          get : function() {
            return _userName;
          },
          /** @method set
          * @description
          * @path ctx.cryptography.credentialClass.userName.set
          * @param {string} userName
          */
          set : function(userName) {
            _userName = userName;
          }
        }

        /**
        * @path ctx.cryptography.credentialClass.password
        */
        this.password = {
          /** @method get
          * @description
          * @path ctx.cryptography.credentialClass.password.get
          */
          get : function() {
            return _password;
          },
          /** @method set
          * @description
          * @path ctx.cryptography.credentialClass.password.set
          * @param {string} password
          */
          set : function(password) {
            _password = password;
          }
        }

        this.init(obj);
      },

      /**
      * Adds a key in key manager
      * @description
      * __Ex.:__
<code javascript>
var key = ctx.cryptography.key({ DefaultKey: {
  type: e.cryptography.keyType.container
}});
</code>
      * @class ctx.cryptography.key
      * @path ctx.cryptography.key
      * @param {Object} [params] key parameters
      * @return {ctx.cryptography.keyClass} key object
      */
      key : function (params) {
        /*** @type {ctx.cryptography.keyClass} */ var key = null;
        if (params && (typeof params === 'object')) {
          for (var keyId in params) {
            var obj = params[keyId];
            if (obj && (typeof obj === 'object')) {
              obj.name = keyId;
              self.keys[keyId] = key = new ctx.cryptography.keyClass(obj);
            }
          }
        }
        return key;
      },

      /**
      * Adds a credential in credential manager
      * @description
      * __Ex.:__
<code javascript>
var credential = ctx.credential({ default: {
  ...
}});
</code>
      * @class ctx.cryptography.credential
      * @path ctx.cryptography.credential
      * @param {Object} [params] Credential parameters
      * @return {ctx.cryptography.credentialClass} Credential object
      */
      credential : function (params) {
        /*** @type {ctx.cryptography.credentialClass} */ var credential = null;
        if (params && (typeof params === 'object')) {
          for (var credentialId in params) {
            var obj = params[credentialId];
            if (obj && (typeof obj === 'object')) {
              obj.name = credentialId;
              self.credentials[credentialId] = credential = new self.credentialClass(obj);
            }
          }
        }
        return credential;
      },

      /**
      * @method searchKey
      * @advanced
      * @path ctx.cryptography.searchKey
      * @param {*} keyObjOrName
      * @param {Object} [criteria] Search criteria
      * @return {ctx.cryptography.keyClass}
      */
      searchKey : function (keyObjOrName, criteria) {
        /** {@type ctx.cryptography.keyClass} */ var key = null;
        if (keyObjOrName instanceof ctx.cryptography.keyClass) {
          key = keyObjOrName;
        } else if (typeof keyObjOrName === 'string') {
          key = ctx.cryptography.keys[keyObjOrName];
        } else if (keyObjOrName && (typeof keyObjOrName === 'object')) {
          if (keyObjOrName.name) {
            key = ctx.cryptography.keys[keyObjOrName.name];
            if (key) { key.init(keyObjOrName); }
          }
        }
        if ((!key) && criteria && ('object' === typeof criteria)) {
          ctx.each(ctx.cryptography.keys, function(id, theKey) {
            if (theKey instanceof ctx.cryptography.keyClass) {
              key = theKey;
              for (var att in criteria) {
                if (theKey[att] !== criteria[att]) {
                  key = null;
                  continue;
                }
              }
              if (key) return false;
            }
          });
        }
        return key;
      },

      /**
      * @method searchCredential
      * @advanced
      * @path ctx.cryptography.searchCredential
      * @param {ctx.cryptography.credentialClass|string} credentialObjOrName
      * @param {Object} [criteria] search criteria
      * @return {ctx.cryptography.credentialClass}
      */
      searchCredential : function (credentialObjOrName, criteria) {
        /** {@type ctx.cryptography.credentialClass} */ var credential = null;
        if (credentialObjOrName instanceof ctx.cryptography.credentialClass) {
          credential = credentialObjOrName;
        } else if (typeof credentialObjOrName === 'string') {
          credential = ctx.cryptography.credentials[credentialObjOrName];
        } else if (credentialObjOrName && (typeof credentialObjOrName === 'object')) {
          if (credentialObjOrName.name) {
            credential = ctx.cryptography.credentials[credentialObjOrName.name];
            if (credential) { credential.init(credentialObjOrName); }
          }
        }
        if ((!credential) && criteria && ('object' === typeof criteria)) {
          ctx.each(ctx.cryptography.credentials, function(id, theCredential) {
            if (theCredential instanceof ctx.cryptography.credentialClass) {
              credential = theCredential;
              for (var att in criteria) {
                if (theCredential[att] !== criteria[att]) {
                  credential = null;
                  continue;
                }
              }
              if (credential) return false;
            }
          });
        }
        return credential;
      },

      /**
      * Initializes the key
      * @description
      * __Ex.:__
<code javascript>
var res = ctx.cryptography.initKey('CtxtKey1');
</code>
      * @method initKey
      * @path ctx.cryptography.initKey
      * @param {ctx.cryptography.keyClass|string} keyObjOrName key object or name
      * @param {boolean} [serverSide] false='client side', true='server side' (default is false)
      * @return {ctx.cryptography.keyClass} initialized key (null if invalid)
      */
      initKey : function (keyObjOrName, serverSide) {
        ctx.notifyAction('ctx.cryptography.initKey');
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && (key instanceof ctx.cryptography.keyClass)) {
          var user = false;
          var machine = false;
          if ((key.type == e.cryptography.keyType.container) && key.name && (key.server == serverSide) && ctx.engineStarted) {
            if (!key.server)
              machine = true;
            ctx.cryptography.createKeyContainer(key); // create if not already created
          }
          switch (key.storeLocation) {
            case e.cryptography.storeLocation.currentUser:
            case e.cryptography.storeLocation.users:
            case e.cryptography.storeLocation.currentUserGroupPolicy:
            {
              user = true;
              break;
            }
            case e.cryptography.storeLocation.localMachine:
            case e.cryptography.storeLocation.localMachineGroupPolicy:
            case e.cryptography.storeLocation.localMachineEnterprise:
            {
              machine = true;
              break;
            }
          }
          if (user)
            key.h2 = ctx.options.userName;
          if (machine)
            key.h1 = ctx.options.computerName;
        }
        return key;
      },

      /**
      * Initializes all declared keys
      * @description
      * __Ex.:__
<code javascript>
</code>
      * @method initKeys
      * @path ctx.cryptography.initKeys
      * @param {boolean} [serverSide] false='client side', true='server side' (default is false)
      */
      initKeys : function (serverSide) {
        ctx.notifyAction('ctx.cryptography.initKeys');
        ctx.each(ctx.cryptography.keys, function(name, key) {
          if (key && (key instanceof ctx.cryptography.keyClass)) {
            self.initKey(key, serverSide);
          }
        });
      },

      /**
      * Map of credentials
      * @property credentials
      * @type {Object<string, ctx.cryptography.credentialClass>}
      * @path ctx.cryptography.credentials
      */
      credentials : {},

      /** map of keys
      * @path ctx.cryptography.keys
      * @type {Object<string, ctx.cryptography.keyClass>}
      */
      keys : {},


      /**
      * Generates a random password
      * @description
      * __Ex.:__
<code javascript>
var passsword = ctx.cryptography.generatePassword(16 ); //
</code>
      * @method generatePassword
      * @path ctx.cryptography.generatePassword
      * @param {number} [length] password length
      * @return {string} result
      */
      generatePassword : function (length) {
        ctx.notifyAction('ctx.cryptography.generatePassword');
        var res = '';
        // TODO
        return res;
      },

      /**
      * Creates a key container with a private / public key pair
      * @description
      * __Ex.:__
<code javascript>
var res = ctx.cryptography.createKeyContainer(ctx.cryptography.keys.MyKey);
</code>
      * @method createKeyContainer
      * @path ctx.cryptography.createKeyContainer
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @return {boolean} result
      */
      createKeyContainer : function( keyObjOrName ) {
        ctx.notifyAction( "ctx.cryptography.createKeyContainer" );
        var res = false;
        /** @type {ctx.cryptography.keyClass} */
        var key = ctx.cryptography.searchKey( keyObjOrName );
        if( key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted ) {
          var signature = ( key.usage == e.cryptography.keyUsage.signature ? true : false );
          if( !key.storeLocation ) {
            key.storeLocation = e.cryptography.storeLocation.currentUser;
          }
          res = ctx.wkMng.CryptCreateKeyContainer( key.alias, signature, !signature, key.storeLocation );
        }
        return res;
      },

      /**
      * Deletes an existing key container
      * @description
      *
      * __Ex.:__
<code javascript>
var res = ctx.cryptography.deleteKeyContainer( "CtxtKey1", e.cryptography.storeLocation.CurrentUser );
</code>
      * @method  deleteKeyContainer
      * @param   {string|ctx.cryptography.keyClass} keyObjOrName Key name or object
      * @return  {boolean} Result
      * @path    ctx.cryptography.deleteKeyContainer
      */
      deleteKeyContainer : function( keyObjOrName ) {
        ctx.notifyAction( "ctx.cryptography.deleteKeyContainer" );
        var res = false;
        /** @type {ctx.cryptography.keyClass} */
        var key = ctx.cryptography.searchKey( keyObjOrName );
        if( key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted ) {
          if( !key.storeLocation ) key.storeLocation = e.cryptography.storeLocation.currentUser;
          res = ctx.wkMng.CryptDeleteKeyContainer( key.alias, key.storeLocation );
        }
        return res;
      },

      /** @method readRegPublicKey
      * @path ctx.cryptography.keyClass.readRegPublicKey
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} prefix
      * @return {ctx.cryptography.keyClass}
      */
      readRegPublicKey : function(keyObjOrName, prefix) {
        ctx.notifyAction('ctx.cryptography.readRegPublicKey');
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key.name && (key instanceof ctx.cryptography.keyClass) && (key.type == e.cryptography.keyType.container) && ctx.engineStarted) {
          var root = ctx.registry.getRoot("Keys\\" + (prefix ? prefix + '|' : '') + key.name, "publicKey");
          var val = ctx.registry.get(root);
          if ('string' === typeof val)
            key.publicKey = val;
          else
            key.publicKey = "";
        }
        return key;
      },

      /**
      * Saves the public key in registry
      * @description
      * @method saveRegPublicKey
      * @path ctx.cryptography.keyClass.saveRegPublicKey
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} prefix
      * @return {ctx.cryptography.keyClass}
      */
      saveRegPublicKey : function(keyObjOrName, prefix) {
        ctx.notifyAction('ctx.cryptography.saveRegPublicKey');
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key.name && (key instanceof ctx.cryptography.keyClass) && (key.type == e.cryptography.keyType.container) && ctx.engineStarted) {
          var root = ctx.registry.getRoot("Keys\\" + (prefix ? prefix + '|' : '') + key.name, "publicKey");
          ctx.registry.set(root, key.publicKey);
        }
        return key;
      },

      /**
      * Returns the public key from an existing key container
      * @description
      *
      * __Ex.:__
<code javascript>
var res = ctx.cryptography.getPublicKey('CtxtKey1', e.cryptography.storeLocation.currentUser, e.cryptography.keyUsage.signature);
</code>
      * @method getPublicKey
      * @path ctx.cryptography.getPublicKey
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @return {ctx.cryptography.keyClass} key object
      */
      getPublicKey : function (keyObjOrName) {
        ctx.notifyAction('ctx.cryptography.getPublicKey');
        var res = "";
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          var signature = (key.usage == e.cryptography.keyUsage.signature ? true : false);
          key.publicKey = "";
          try {
            key.publicKey = ctx.wkMng.CryptGetPublicKey(key.alias, signature, key.storeLocation);
          } catch (ex) {
            key.publicKey = ctx.wkMng.CryptGetExportedKey(key.alias, key.storeLocation); // old method
          }
        }
        return key;
      },

      /**
      * Get all public keys on server or client side
      * @description
      * __Ex.:__
<code javascript>
</code>
      * @method getPublicKeys
      * @path ctx.cryptography.getPublicKeys
      * @param {boolean} [serverSide] false='client side', true='server side' (default is false)
      * @return {Array<ctx.cryptography.keyClass>} key array with valid public keys
      */
      getPublicKeys : function (serverSide) {
        ctx.notifyAction('ctx.cryptography.getPublicKeys');
        var keys = [];
        ctx.each(ctx.cryptography.keys, function(name, key) {
          if (key && (key instanceof ctx.cryptography.keyClass) && (key.type == e.cryptography.keyType.container) && key.name && (key.server == serverSide) && ctx.engineStarted) {
            ctx.cryptography.getPublicKey(key);
            if (key.publicKey) {
              keys.push(key);
            }
          }
        });
        return keys;
      },

      /**
      * Stores a public key in a key container (without private key)
      * @description
      *
      * __Ex.:__
<code javascript>
var publicKey = "...";
var res = ctx.cryptography.setPublicKey('CtxtKey1', publicKey, e.cryptography.storeLocation.CurrentUser);
</code>
      * @method savePublicKey
      * @path ctx.cryptography.savePublicKey
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} [publicKey] public key as a binary string
      * @return {string} result
      */
      savePublicKey : function (keyObjOrName, publicKey) {
        ctx.notifyAction('ctx.cryptography.savePublicKey');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */
        var key = ctx.cryptography.searchKey( keyObjOrName );
        if( key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted ) {
          if( !key.storeLocation ) {
            key.storeLocation = e.cryptography.storeLocation.currentUser;
          }
          if( publicKey ) {
            key.publicKey = publicKey;
          }
          var signature = ( key.usage == e.cryptography.keyUsage.signature ? true : false );
          res = ctx.wkMng.CryptSavePublicKey( key.alias, key.publicKey, signature, key.storeLocation );
        }
        return res;
      },

      /**
      * Decrypts a cyphered file to a clear file using a private key from a key container
      * @description
      * __Ex.:__
<code javascript>
var res = ctx.cryptography.decryptFileToFile(inputFile, outputFile, "", 'CtxtKey1', e.cryptography.storeLocation.LocalMachine);
</code>
      * @method decryptFileToFile
      * @path ctx.cryptography.decryptFileToFile
      * @param {string} inputFile input file
      * @param {string} outputFile output file
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} [password] optional password value used if cyphering is enabled
      * @return {string} result
      */
      decryptFileToFile : function (inputFile, outputFile, keyObjOrName, password) {
        ctx.notifyAction('ctx.cryptography.decryptFileToFile');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          res = ctx.wkMng.CryptDecryptFileToFile(inputFile, outputFile, password, key.alias, key.algorithm, key.storeLocation);
        }
        return res;
      },

      /**
      * Decrypts a cyphered file to a clear string using a private key from a key container
      * @description
      * __Ex.:__
<code javascript>
var str = ctx.cryptography.decryptFileToString(inputFile, 'myPassword', 'CtxtKey1', e.cryptography.storeLocation.LocalMachine);
</code>
      * @method decryptFileToString
      * @path ctx.cryptography.decryptFileToString
      * @param {string} inputFile input file
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} [password] optional password value used if cyphering is enabled
      * @return {string} clear value
      */
      decryptFileToString : function (inputFile, keyObjOrName, password) {
        ctx.notifyAction('ctx.cryptography.decryptFileToString');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          res = ctx.wkMng.CryptDecryptFileToString(inputFile, password, key.alias, key.algorithm, key.storeLocation);
        }
        return res;
      },

      /**
      * Decrypts a message using a certificate or key container
      * @description
      * __Ex.:__
<code javascript>
var str = ctx.cryptography.decryptMessage(
  crypt,
  'My',
  'Ctxt exchange',
  '',
  e.cryptography.algorithm.PKCS_12,
  e.cryptography.storeLocation.LocalMachine);
});
</code>
      * @method decryptMessage
      * @path ctx.cryptography.decryptMessage
      * @param {string} input input value
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} [password] optional password value used to encrypt (only usable for a container key, not with a certificate)
      * @return {string} decrypted value (null if failed)
      */
      decryptMessage : function (input, keyObjOrName, password) {
        ctx.notifyAction('ctx.cryptography.decryptMessage');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          if (key.type == e.cryptography.keyType.none) {
            res = input;
          } else if (key.type == e.cryptography.keyType.certificate) {
            res = ctx.wkMng.CryptDecryptMessage(input, key.store, key.alias, "", key.algorithm, key.storeLocation);
          } else {
            res = ctx.wkMng.CryptDecryptStringToString(input, password, key.alias, key.algorithm, key.storeLocation);
          }
        } else {
          res = input;
        }
        return res;
      },



      /**
      * Encrypts a clear file to a cyphered file using a public key from a key container
      * @description
      * __Ex.:__
<code javascript>
var res = ctx.cryptography.encryptFileToFile(inputFile, outputFile, "", 'CtxtKey1', e.cryptography.storeLocation.LocalMachine);
</code>
      * @method encryptFileToFile
      * @path ctx.cryptography.encryptFileToFile
      * @param {string} inputFile input file
      * @param {string} outputFile output file
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} [password] optional password value used if cyphering is enabled
      * @return {string} result
      */
      encryptFileToFile : function (inputFile, outputFile, keyObjOrName, password) {
        ctx.notifyAction('ctx.cryptography.encryptFileToFile');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && (key instanceof ctx.cryptography.keyClass) && (key.type == e.cryptography.keyType.container) && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          res = ctx.wkMng.CryptEncryptFileToFile(inputFile, outputFile, password, key.alias, key.algorithm, key.storeLocation);
        }
        return res;
      },

      /**
      * Encrypts a message using a certificate or key container
      * @description
      *
      * __Ex.:__
<code javascript>
var str = "......";
var crypt = ctx.cryptography.encryptMessage(
  str,
  'My',
  'Ctxt exchange',
  '',
  e.cryptography.algorithm.PKCS_12,
  e.cryptography.storeLocation.LocalMachine);
});
</code>
      * @method encryptMessage
      * @path ctx.cryptography.encryptMessage
      * @param {string} input input value
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} [password] optional password value used to encrypt (only usable for a container key, not with a certificate)
      * @return {string} encrypted value (null if failed)
      */
      encryptMessage : function (input, keyObjOrName, password) {
        ctx.notifyAction('ctx.cryptography.encryptMessage');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && (key instanceof ctx.cryptography.keyClass) && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          if (key.type == e.cryptography.keyType.none) {
            res = input; // no cyphering
          } else if (key.type == e.cryptography.keyType.certificate) {
            res = ctx.wkMng.CryptEncryptMessage(input, key.store, key.alias, "", key.algorithm, key.storeLocation);
          } else { // container
            if (key.publicKey) {
              res = ctx.wkMng.CryptEncryptWithPublicKey(input, key.publicKey, password, key.algorithm, key.storeLocation);
            } else {
              res = ctx.wkMng.CryptEncryptStringToString(input, password, key.alias, key.algorithm, key.storeLocation);
            }
          }
        } else {
          res = input; // no cyphering
        }
        return res;
      },


      /**
      * Encrypts a clear string to a cyphered file using a public key
      * @description
      * __Ex.:__
<code javascript>
var str = "......";
var res = ctx.cryptography.encryptStringToFile(str, outputFile, 'myPassword', 'CtxtKey1', e.cryptography.storeLocation.LocalMachine);
</code>
      * @method encryptStringToFile
      * @path ctx.cryptography.encryptStringToFile
      * @param {string} input input file
      * @param {string} outputFile output file
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @param {string} [password] optional password value used if cyphering is enabled
      * @return {string} result
      */
      encryptStringToFile : function (input, outputFile, keyObjOrName, password) {
        ctx.notifyAction('ctx.cryptography.encryptStringToFile');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          res = ctx.wkMng.CryptEncryptStringToFile(input, outputFile, password, key.alias, key.algorithm, key.storeLocation);
        }
        return res;
      },

      /**
      * Encrypts a value using a key local to the user session
      * @description
      * __Ex.:__
<code javascript>
var cyphered = ctx.cryptography.protect(obj.login, password);
</code>
      * @method protect
      * @path ctx.cryptography.protect
      * @param {string} input clear input value
      * @param {string} [password] optional password value used to encrypt
      * @return {string} cyphered value
      */
      protect : function (input, password) {
        ctx.notifyAction('ctx.cryptography.protect');
        var res = '';
        if (ctx.engineStarted) {
          res = ctx.wkMng.CryptProtect(input, password);
        }
        return res;
      },

      /**
      * Signs and encrypts a message using a certificate or key container
      * @description
      * __Ex.:__
<code javascript>
var str = "......";
var crypt = ctx.cryptography.signEncryptMessage(
  str,
  'My',
  'Ctxt exchange',
  '',
  e.cryptography.algorithm.PKCS_12,
  e.cryptography.storeLocation.LocalMachine);
});
</code>
      * @method signEncryptMessage
      * @path ctx.cryptography.signEncryptMessage
      * @param {string} input input value
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @return {string} signed value (null if failed)
      */
      signEncryptMessage : function (input, keyObjOrName) {
        ctx.notifyAction('ctx.cryptography.signEncryptMessage');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          var container = "";
          var certificate = "";
          if (key.type == e.cryptography.keyType.certificate) {
            certificate = key.alias;
          } else {
            container = key.alias;
          }
          res = ctx.wkMng.CryptSignMessage(input, key.store, certificate, container, key.algorithm, key.storeLocation);
        }
        return res;
      },

      /**
      * Signs a message using a certificate or key container
      * @description
      *
      * __Ex.:__
<code javascript>
var str = "......";
var crypt = ctx.cryptography.signMessage(
  str,
  'My',
  'Ctxt exchange',
  '',
  e.cryptography.algorithm.PKCS_12,
  e.cryptography.storeLocation.LocalMachine);
});
</code>
      * @method signMessage
      * @path ctx.cryptography.signMessage
      * @param {string} input input value
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @return {string} signed value (null if failed)
      */
      signMessage : function (input, keyObjOrName) {
        ctx.notifyAction('ctx.cryptography.signMessage');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          var container = "";
          var certificate = "";
          if (key.type == e.cryptography.keyType.certificate) {
            certificate = key.alias;
          } else {
            container = key.alias;
          }
          res = ctx.wkMng.CryptSignHashData( input, key.store, certificate, container, key.algorithm, key.storeLocation );
        }
        return res;
      },

      /**
      * Decrypts a value using a key local to the user session
      * @description
      * __Ex.:__
<code javascript>
// read cyphered entry
obj.login = ctx.cryptography.unprotect(cyphered, password);
</code>
      * @method unprotect
      * @path ctx.cryptography.unprotect
      * @param {string} input cyphered input value
      * @param {string} [password] optional password value used to decrypt
      * @return {string} clear value
      */
      unprotect : function (input, password) {
        ctx.notifyAction('ctx.cryptography.unprotect');
        var res = '';
        if (ctx.engineStarted) {
          res = ctx.wkMng.CryptUnprotect(input, password);
        }
        return res;
      },

      /**
      * Verifies and decrypts a signed message using a certificate or key container
      * @description
      * __Ex.:__
<code javascript>
var str = ctx.cryptography.verifyDecryptMessage(
  crypt,
  'My',
  'Ctxt exchange',
  '',
  e.cryptography.algorithm.PKCS_12,
  e.cryptography.storeLocation.LocalMachine);
});
</code>
      * @method verifyDecryptMessage
      * @path ctx.cryptography.verifyDecryptMessage
      * @param {string} input input value
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @return {string} clear value (null if failed)
      */
      verifyDecryptMessage : function (input, keyObjOrName) {
        ctx.notifyAction('ctx.cryptography.verifyDecryptMessage');
        var res = '';
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          var container = "";
          var certificate = "";
          if (key.type == e.cryptography.keyType.certificate) {
            certificate = key.alias;
          } else {
            container = key.alias;
          }
          res = ctx.wkMng.CryptVerifyMessage(input, key.store, certificate, container, key.algorithm, key.storeLocation);
        }
        return res;
      },

      /**
      * Verifies a signed message using a certificate or key container
      * @description
      *
      * __Ex.:__
<code javascript>
var str = ctx.cryptography.verifyMessage(
  crypt,
  'My',
  'Ctxt exchange',
  '',
  e.cryptography.algorithm.PKCS_12,
  e.cryptography.storeLocation.LocalMachine);
});
</code>
      * @method verifyMessage
      * @path ctx.cryptography.verifyMessage
      * @param {string} input input value
      * @param {string} signature signature
      * @param {string|ctx.cryptography.keyClass} keyObjOrName key name or object
      * @return {boolean} verification result (false if verification failed)
      */
      verifyMessage : function (input, signature, keyObjOrName) {
        ctx.notifyAction('ctx.cryptography.verifyMessage');
        var res = false;
        /** @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.searchKey(keyObjOrName);
        if (key && key instanceof ctx.cryptography.keyClass && ctx.engineStarted) {
          if (!key.algorithm) key.algorithm = e.cryptography.algorithm.RSA_RC4;
          if (!key.storeLocation) key.storeLocation = e.cryptography.storeLocation.currentUser;
          var container = "";
          var certificate = "";
          if (key.type == e.cryptography.keyType.certificate) {
            certificate = key.alias;
          } else {
            container = key.alias;
          }
          if( key.publicKey ) {
            res = ctx.wkMng.CryptVerifyHashDataWithPublicKey( input, signature, key.publicKey, key.algorithm, key.storeLocation );
          } else {
            res = ctx.wkMng.CryptVerifyHashData( input, signature, key.store, certificate, container, key.algorithm, key.storeLocation );
          }
        }
        return res;
      }

    }
    return self;
  })();


// declare a default unused key
ctx.cryptography.key({ none: {
  type: e.cryptography.keyType.none,
  server: false,
  comment: 'Unused key'
}});

// Create a default container key for encryption
ctx.cryptography.key({ clientEncryption: {
  type: e.cryptography.keyType.container,
  usage: e.cryptography.keyUsage.encryption,
  server: false,
  comment: 'Client encryption key'
}});

// Create a default container key for signature
ctx.cryptography.key({ clientSignature: {
  type: e.cryptography.keyType.container,
  usage: e.cryptography.keyUsage.signature,
  server: false,
  comment: 'Client signature key'
}});

// Create a default container key for encryption on the server side
ctx.cryptography.key({ serverEncryption: {
  type: e.cryptography.keyType.container,
  usage: e.cryptography.keyUsage.encryption,
  storeLocation: e.cryptography.storeLocation.localMachine,
  server: true,
  comment: 'Server encryption key'
}});

// Create a default container key for signature on the server side
ctx.cryptography.key({ serverSignature: {
  type: e.cryptography.keyType.container,
  usage: e.cryptography.keyUsage.signature,
  storeLocation: e.cryptography.storeLocation.localMachine,
  server: true,
  comment: 'Server signature key'
}});

  /** @path key
  * @type {ctx.cryptography.keyClass} */ var key = ctx.cryptography.keys.none; // for Intellisense only
  /** @path credential
  * @type {ctx.cryptography.credentialClass} */ var credential = new ctx.cryptography.credentialClass(); // for Intellisense only

  /**
  * Class to store multi-lingual labels in objects (applications, ...)
  * @class ctx.labelManager
  * @path ctx.labelManager
  * @constructor
  * @advanced
  */
  ctx.labelManager = function () {
    e.language = e.language || { English: 'en'};
    var _defLang = e.language.English; // default language
    var _lang = e.language.English; // current language
		var _I18NMinVersion = "1.0.3";
    /** @type {Object} */var _tab = {}; // map of languages
    /** @type {Object} */var _labels = {}; // map of labels
    /** class type
    * @ignore
    * @const
    * @path ctx.labelManager.ctxType
    * @property {string} */ this.ctxType = 'ctx.labelManager';

    /** [Internal usage]
     * Returns the short description for serialization
     * @ignore
     * @method ctxShort
     * @path ctx.labelManager.ctxShort
     */
    this.ctxShort = function() {
      return undefined; // no serialization
    }

    /**
    * Sets an object content in the labelManager
    * @method _setObject
    * @path ctx.labelManager._setObject
    * @ignore
    * @private
    * @param {Object} obj object
    * @param {Object} dest destination object
    * @param {string} lang language
    */
    var _setObject = function (obj, dest, lang) {
        for (var id in obj) {
            if (typeof obj[id] == 'object') {
                if (obj[id][lang]) {
                    // something like '{en:'...', fr:'...'}' : get label
                    dest[id] = obj[id][lang];
                } else if (obj[id][_defLang]) {
                    // something like '{en:'...'}' : get label with default language if target and source language is missing
                    if (!dest[id]) { dest[id] = obj[id][_defLang]; }
                } else {
                    // check that 'id' is not a language name ('en', 'fr', ...). If it is, skip it
                    if (!_tab[id]) {
                        // sub-labels: something like '{label1:{en:'...', fr:'..'}, label2:{en:'...', fr:'..'}, ...' : recursive call
                        dest[id] = dest[id] || {};
                        _setObject(obj[id], dest[id], lang);
                    }
                }
            } else if (typeof obj[id] == 'string') {
                dest[id] = obj[id];
            }
        }
    }

		var _generateProperties = function (rootObj, prefix) {
			var result = '';
			ctx.each(rootObj, function (key, obj) {
				if ('object' === typeof obj) {
					result += _generateProperties(obj, (prefix ? prefix + "." : "") + key);
				}
				else {
					// Finding comment as another language : _comment
					// Finding type as another language : _type
					var comment = _tab["_comment"];
					var type = _tab["_type"];
					
					var path = prefix.split('.');
					
					for (var i=0; i<path.length; i++) {
						comment = comment[path[i]];
						type = type[path[i]];
					}
					if (comment) {
						comment = comment[key];
					}
					if (type) {
						type = type[key];
					}
					if (!comment) comment = obj;
					if (type == obj) type = "XFLD";
					result += "\n" + '#' + type + ': ' + comment + "\n";
					result += prefix + "." + key + "=" + obj + "\n";
				}
			});
			return result;
		}
		
    /**
    * Gets a label from its identifier
    * @description
    * __Ex.:__
<code javascript>
var txt = GLOBAL.labels.get('mainTitle', e.language.English);
</code>
    * @method get
    * @path ctx.labelManager.get
    * @param {string} id label identifier
    * @param {string} [lang] language (default language if omitted)
    * @return {string} label
    */
    this.get = function (id, lang) {
      //ctx.notifyAction('ctx.labelManager.get');
      if (!lang) lang = _lang;
      return (_tab[lang] ? _tab[lang][id] : _tab[_defLang][id]);
    }

    /**
    * Sets a set of labels
    * @description
    * __Ex.:__
<code javascript>
// manage mono-language
GLOBAL.labels.buttons.set( { ok:'OK', cancel:'Cancel', close:'Close' });
// manage multi-languages
GLOBAL.labels.buttons.set( { ok: {en:'OK', fr:'OK'}, cancel: {en:'Cancel', fr:'Annuler'}, close: {en:'Close', fr:'Fermer' } } );
</code>
    * @method set
    * @path ctx.labelManager.set
    * @param {Object} obj object
    * @param {string} [language]
    */
    this.set = function (obj, language) {
      //ctx.notifyAction('ctx.labelManager.set');
			if (language && _tab[language]) {
        _setObject(obj, _tab[language], language);
			} else {
	      for (var lang in _tab) {
	        _setObject(obj, _tab[lang], lang);
	      }
	      // reinitialize current language definitions
	      this.setLanguage(_lang);
			}
    }
    /**
    * Adds supplementary languages in the label container
    * @description
    *
    * __Ex.:__
<code javascript>
GLOBAL.labels.addLanguage({English: 'en', French: 'fr'}); // adds 'English' and 'French' languages
</code>
    * @method addLanguage
    * @path ctx.labelManager.addLanguage
    * @param {Object} obj language abbreviation and name, ex.: {English: 'en', French: 'fr'}
    */
    this.addLanguage = function (obj) {
      //ctx.notifyAction('ctx.labelManager.addLanguage');
      if (typeof obj === 'object') {
        for (var lang in obj) {
          var id = obj[lang];
          if (id && (!_tab[id])) {
            e.language[lang] = id; // add enumeration
            _tab[id] = {};
            _labels[id] = lang;
          }
        }
      }
    }

    /**
    * Gets label list
    * @description
    *
    * __Ex.:__
<code javascript>
var list = GLOBAL.labels.getLabels();
// returns { 'en': 'English', 'fr': 'Français', ... };
</code>
    * @method getLabels
    * @path ctx.labelManager.getLabels
    * @return {Object} label list
    */
    this.getLabels = function () {
      return _labels;
    }

    /**
    * Sets the current language
    * @description
    * __Ex.:__
<code javascript>
GLOBAL.labels.setLanguage(e.language.English); // selects english as current language
</code>
    * @method setLanguage
    * @path ctx.labelManager.setLanguage
    * @throws {Error}
    * @param {string} lang language
    */
    this.setLanguage = function (lang) {
      ctx.notifyAction('ctx.labelManager.setLanguage');
      if (lang) { _lang = lang; }
      if (!_tab[_lang]) { throw new Error(e.error.InvalidArgument, 'ctx.labelManager.setLanguage: unknown language \'' + lang + '\''); }
      if (_lang && _tab[_lang]) {
        for (var id in _tab[_lang]) {
          this[id] = this.get(id);
        }
      }
    }

    /**
    * Gets the current language
    * @description
    * __Ex.:__
<code javascript>
var lang = GLOBAL.labels.getLanguage(); // lang = 'en'
</code>
    * @method getLanguage
    * @path ctx.labelManager.getLanguage
    * @return {string} current language
    */
    this.getLanguage = function () {
      return _lang;
    }

    /**
    * Gets the list of labels
    * @description
    * __Ex.:__
<code javascript>
var result = GLOBAL.labels.generateProperties();
</code>
    * @method generateProperties
    * @path ctx.labelManager.generateProperties
    * @return {string} list of labels and values
    */
		this.generateProperties = function () {
			this.setLanguage("en"); // force default language ('EN')
			var root = _tab[_lang];
			// generate recursively
			var result = '#XMIT: menu to display current language translation in systray (for example for sdk_fr.properties, label.lang=Français)' + "\n" + 'label.lang=English' + "\n";
			result += _generateProperties(root, "");
			// Write the file as a template (format UTF8 without BOM)
			ctx.fso.file.write(ctx.options.path.bin + '\\lang\\sdk.properties', result, e.file.encoding.ASCII);
			return result;
		}

	
    /**
    * Sets the path where translation files are
    * @description
    * __Ex.:__
<code javascript>
GLOBAL.labels.SetI18NPath();
</code>
    * @method SetI18NPath
    * @path ctx.labelManager.SetI18NPath
    */
		this.SetI18NPath = function () {
			if (ctx.engineStarted) {
				try {
	        if (_I18NMinVersion && ctx.compareVersion(_I18NMinVersion) >= 0) {
						ctx.wkMng.SetI18NPath(ctx.options.path.bin + '\\lang');
					}
				} catch (ex) {
	       throw new Error(e.error.Fail, 'ctx.SetI18NPath ' + ex.message );
	      }
			}
		};
		
    /**
    * Gets the list of available languages
    * @description
    * __Ex.:__
<code javascript>
var result = GLOBAL.labels.GetI18NLangList();
</code>
    * @method GetI18NLangList
    * @path ctx.labelManager.GetI18NLangList
    * @return {*} list of available languages
		*/
		this.GetI18NLangList = function () {
			var languages = null;
			if (ctx.engineStarted) {
				try {
	        if (_I18NMinVersion && ctx.compareVersion(_I18NMinVersion) >= 0) {
						var langlist = ctx.wkMng.GetI18NLangList();
						languages = ctx.json.parse(langlist);
					}
				} catch (ex) {
	       throw new Error(e.error.Fail, 'ctx.GetI18NLangList ' + ex.message );
	      }
			}
			return languages;
		};		
		
    /**
    * Gets the id of the current language
    * @description
    * __Ex.:__
<code javascript>
var result = GLOBAL.labels.GetI18NCurrentLang();
</code>
    * @method GetI18NCurrentLang
    * @path ctx.labelManager.GetI18NCurrentLang
    * @return {string} current language
		*/
		this.GetI18NCurrentLang = function () {
			var lang = '';
			if (ctx.engineStarted) {
				try {
	        if (_I18NMinVersion && ctx.compareVersion(_I18NMinVersion) >= 0) {
						lang = ctx.wkMng.GetI18NCurrentLang();
					}
				} catch (ex) {
	       throw new Error(e.error.Fail, 'ctx.GetI18NCurrentLang ' + ex.message );
	      }
			}
			return lang;
		};		

    /**
    * Gets the id of the current language
    * @description
    * __Ex.:__
<code javascript>
var result = GLOBAL.labels.GetI18NLabelList();
</code>
    * @method GetI18NLabelList
	  * @param {string} lang id of the current language
    * @path ctx.labelManager.GetI18NLabelList
    * @return {*} labels list
		*/
		this.GetI18NLabelList = function (lang) {
			var labels = null;
			if (ctx.engineStarted) {
				try {
	        if (_I18NMinVersion && ctx.compareVersion(_I18NMinVersion) >= 0) {
						var labelList = ctx.wkMng.GetI18NLabelList(lang);
					}
				} catch (ex) {
	       throw new Error(e.error.Fail, 'ctx.GetI18NLabelList ' + ex.message );
	      }
			}
			return labelList;
		};	
		
		/**
    * Sets the id of the current language
    * @description
    * __Ex.:__
<code javascript>
var result = GLOBAL.labels.SetI18NCurrentLang();
</code>
    * @method SetI18NCurrentLang
	  * @param {string} lang id of the current language
    * @path ctx.labelManager.SetI18NCurrentLang
		*/
		this.SetI18NCurrentLang = function (lang) {
			if (ctx.engineStarted) {
				try {
	        if (_I18NMinVersion && ctx.compareVersion(_I18NMinVersion) >= 0) {
						ctx.wkMng.SetI18NCurrentLang(lang);
					}
				} catch (ex) {
	       throw new Error(e.error.Fail, 'ctx.SetI18NPath ' + ex.message );
	      }
			}
		};
		
		/**
    * Injects the json list of labels into GLOBAL.Labels object
    * @description
    * __Ex.:__
<code javascript>
var result = GLOBAL.labels.InjectI18NLabels();
</code>
    * @method InjectI18NLabels
	  * @param {string} jsonList list of labels
	  * @param {string} curLang language to affect to affect
    * @path ctx.labelManager.InjectI18NLabels
		*/
		this.InjectI18NLabels = function (jsonList, curLang) {
			if (ctx.engineStarted) {
				try {
	        if (_I18NMinVersion && ctx.compareVersion(_I18NMinVersion) >= 0) {
						var newLabels = ctx.json.parse(jsonList);
						ctx.each(newLabels, function(id, value) {
							var lblParts = id.split('.');

							// Pseudorecursive algorithm (more readable)
							// Converts aaa.bbb: "ccc" (received from workmanager) to {"aaa": {"bbb": {"i18n": "ccc"}}} (wanted format to patch labels)
							var newJson = '_CHILDGOESHERE_';
							for (var i=0 ; i<lblParts.length ; i++) {
								newJson = newJson.replace('_CHILDGOESHERE_', '{"' + lblParts[i] + '": _CHILDGOESHERE_}');
							}
							// Uncomment this ligne to postfix every label (pseudocode)
              //newJson = newJson.replace('_CHILDGOESHERE_', '{"' + curLang + '": "' + value + 'i18n"}');
              value = value.replace(/\"/g, "'"); //Need to use simple-quotes instead of double-quotes otherwise ctx.json.parse will fail
							newJson = newJson.replace('_CHILDGOESHERE_', '{"' + curLang + '": "' + value + '"}');

							// Patch labels for requested language
							var newLabel = ctx.json.parse(newJson);
							GLOBAL.labels.set(newLabel, curLang);
						});
						GLOBAL.labels.setLanguage(curLang);
						
					}
				} catch (ex) {
	       throw new Error(e.error.Fail, 'ctx.InjectI18NLabels ' + ex.message );
	      }
			}
		};

		/**
    * Creates a menu with the list of languages
    * @description
    * __Ex.:__
<code javascript>
var result = GLOBAL.labels.createLanguageMenu(systray);
</code>
    * @method createLanguageMenu
	  * @param {ctx.systrayClass} [theSystray]
    * @path ctx.labelManager.createLanguageMenu
		*/
		this.createLanguageMenu = function(theSystray) {
			try {
				if (!theSystray && ('undefined' !== typeof systray)) {
					theSystray = systray;
				}
				if (theSystray && theSystray.createLanguageMenu) {
					theSystray.createLanguageMenu();
				}
			}
		catch (ex) {}
			
	}
		
		// pre-define english / french / german languages, plus comments and type
    this.addLanguage({ English: 'en', French: 'fr', German: 'de', Comment: '_comment', Type: '_type' });
	};

  /**
   * Module for Mouse management
   * @class ctx.mouse
   * @path ctx.mouse
   * @constructor
   */
  ctx.mouse = (function() {
      /**
      * @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
      * @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      * @return {ctx.position} position object
      */
    var _calculatePosition = function(X, Y) {
      var pos;
      if (X instanceof ctx.position) {
        pos = X;
      } else {
        pos = new ctx.position();
        pos.x = X;
        pos.y = Y;
      }
      return pos;
    }

    var self =
    /** @lends ctx.mouse */
    {
      /**
      * Triggers a mouse left click at a given position
      * @description
      *
      * __Ex.:__
<code javascript>
// double click on item1
var pos = myAppli.pMyPage.item1.getRect();
ctx.mouse.click(pos, 0, true);
</code>
      * @method click
      * @path ctx.mouse.click
      * @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
      * @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      * @param {boolean} [doubleClick] triggers a double click if this parameter is set
      */
      click : function(X, Y, doubleClick) {
        var desc = ctx.getDescriptor();
        var pos = _calculatePosition(X, Y);
        var params = {
          X : (pos.x + pos.cx / 2 || 0),
          Y : (pos.y + pos.cy / 2 || 0)
        };
        if (doubleClick) { params.Double = 'Y' };
        //return ctx.verbExec(desc, 'ctx.mouse.click', 'CLICKMOUSE', params, '', false, (doubleClick ? '3.2.3.0' : '3.0.6.3'));
        return ctx.verbExec(desc, 'ctx.mouse.click', 'CLICKMOUSE', params, '', false);
      },

      /**
      * Triggers a mouse middle click at a given position
      * @description
      *
      * __Ex.:__
<code javascript>
// middle click on item1
var pos = myAppli.pMyPage.item1.getRect();
ctx.mouse.click(pos, 0, true);
</code>
      * @method clickMiddle
      * @path ctx.mouse.clickMiddle
      * @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
      * @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      * @param {boolean} [doubleClick] triggers a double click if this parameter is set
      */
      clickMiddle : function(X, Y, doubleClick) {
        var desc = ctx.getDescriptor();
        var pos = _calculatePosition(X, Y);
        var params = {
          Middle : 'Y',
          X : (pos.x + pos.cx / 2 || 0),
          Y : (pos.y + pos.cy / 2 || 0)
        };
        if (doubleClick) { params.Double = 'Y' };
        //return ctx.verbExec(desc, 'ctx.mouse.clickMiddle', 'CLICKMOUSE', params, '', false, '3.2.3.0');
        return ctx.verbExec(desc, 'ctx.mouse.clickMiddle', 'CLICKMOUSE', params, '', false);
      },

      /**
      * Triggers a mouse right click at a given position
      * @description
      *
      * __Ex.:__
<code javascript>
// right click on item1
var pos = myAppli.pMyPage.item1.getRect();
ctx.mouse.clickRight(pos);
</code>
      * @method clickRight
      * @path ctx.mouse.clickRight
      * @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
      * @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      * @param {boolean} [doubleClick] triggers a double click if this parameter is set
      */
      clickRight : function(X, Y, doubleClick) {
        var desc = ctx.getDescriptor();
        var pos = _calculatePosition(X, Y);
        var params = {
          Right : 'Y',
          X : (pos.x + pos.cx / 2 || 0),
          Y : (pos.y + pos.cy / 2 || 0)
        };
        if (doubleClick) { params.Double = 'Y' };
        //return ctx.verbExec(desc, 'ctx.mouse.clickRight', 'CLICKMOUSE', params, '', false, '3.2.3.0');
        return ctx.verbExec(desc, 'ctx.mouse.clickRight', 'CLICKMOUSE', params, '', false);
      },

      /**
      * Triggers a click on XButton1
      * @description
      *
      * __Ex.:__
<code javascript>
ctx.mouse.clickXButton1();
</code>
      * @method clickXButton1
      * @path ctx.mouse.clickXButton1
      */
      clickXButton1 : function() {
        var desc = ctx.getDescriptor();
        var params = {
          XButton : '1'
        };
        //return ctx.verbExec(desc, 'ctx.mouse.clickXButton1', 'CLICKMOUSE', params, '', false, '3.2.3.0');
        return ctx.verbExec(desc, 'ctx.mouse.clickXButton1', 'CLICKMOUSE', params, '', false);
      },

      /**
      * Triggers a click on XButton1
      * @description
      *
      * __Ex.:__
<code javascript>
ctx.mouse.clickXButton2();
</code>
      * @method clickXButton2
      * @path ctx.mouse.clickXButton2
      */
      clickXButton2 : function() {
        var desc = ctx.getDescriptor();
        var params = {
          XButton : '2'
        };
        //return ctx.verbExec(desc, 'ctx.mouse.clickXButton2', 'CLICKMOUSE', params, '', false, '3.2.3.0');
        return ctx.verbExec(desc, 'ctx.mouse.clickXButton2', 'CLICKMOUSE', params, '', false);
      },

      /**
      * Triggers a drag&drop between two positions
      * @description
      *
      * __Ex.:__
<code javascript>
var pos = myAppli.pMyPage.item1.getRect(); // source
var pos2 = myAppli.pMyPage.item2.getRect(); // destination
ctx.mouse.dragAndDrop(pos, pos2);
</code>
      * @method dragAndDrop
      * @path ctx.mouse.dragAndDrop
      * @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position) for the source
      * @param {ctx.position|number} X2 position object or relative horizontal position (compared to desktop top left position) for the target
      * @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      * @param {number} [Y2] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      */
      dragAndDrop : function(X, X2, Y, Y2) {
        var desc = ctx.getDescriptor();
        var pos = _calculatePosition(X, Y);
        var pos2 = _calculatePosition(X2, Y2);
        var params = {
          X : (pos.x + pos.cx / 2 || 0),
          Y : (pos.y + pos.cy / 2 || 0),
          X2 : (pos2.x + pos2.cx / 2 || 0),
          Y2 : (pos2.y + pos2.cy / 2 || 0)
        };
        //return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false, '3.2.3.0');
        return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false);
      },

      /**
      * Triggers a right drag&drop between two positions
      * @description
      *
      * __Ex.:__
<code javascript>
var pos = myAppli.pMyPage.item1.getRect(); // source
var pos2 = myAppli.pMyPage.item2.getRect(); // destination
ctx.mouse.dragAndDrop(pos, pos2);
</code>
      * @method dragAndDropRight
      * @path ctx.mouse.dragAndDropRight
      * @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position) for the source
      * @param {ctx.position|number} X2 position object or relative horizontal position (compared to desktop top left position) for the target
      * @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      * @param {number} [Y2] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      */
      dragAndDropRight : function(X, X2, Y, Y2) {
        var desc = ctx.getDescriptor();
        var pos = _calculatePosition(X, Y);
        var pos2 = _calculatePosition(X2, Y2);
        var params = {
          Right : 'Y',
          X : (pos.x + pos.cx / 2 || 0),
          Y : (pos.y + pos.cy / 2 || 0),
          X2 : (pos2.x + pos2.cx / 2 || 0),
          Y2 : (pos2.y + pos2.cy / 2 || 0)
        };
        //return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false, '3.2.3.0');
        return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false);
      },

      /**
      * Triggers a mouse move to a given position
      * @description
      *
      * __Ex.:__
<code javascript>
var pos = myAppli.pMyPage.item1.getRect(); // source
ctx.mouse.move(pos);
</code>
      * @method move
      * @path ctx.mouse.move
      * @param {ctx.position|number} X position object or relative horizontal position (compared to desktop top left position)
      * @param {number} [Y] relative vertical position (compared to desktop top left position). If 'X' is a 'ctx.position' object, this parameter is ignored
      */
      move : function(X, Y) {
        var desc = ctx.getDescriptor();
        var pos = _calculatePosition(X, Y);
        var params = {
          Move : 'Y',
          X : (pos.x + pos.cx / 2 || 0),
          Y : (pos.y + pos.cy / 2 || 0)
        };
        //return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false, '3.2.3.0');
        return ctx.verbExec(desc, 'ctx.mouse.dragAndDrop', 'CLICKMOUSE', params, '', false);
      },

      /**
      * Triggers a wheel scroll with a given offset
      * @description
      *
      * __Ex.:__
<code javascript>
ctx.mouse.scrollWheel(-200);
</code>
      * @method scrollWheel
      * @path ctx.mouse.dragAndDropRight
      * @param {number} offset wheel scroll offset (can be positive or negative)
      */
      scrollWheel : function(offset) {
        var desc = ctx.getDescriptor();
        var params = {
          Wheel : offset
        };
        return ctx.verbExec(desc, 'ctx.mouse.scrollWheel', 'CLICKMOUSE', params, '', false, '3.2.3.0');
      }
    }
    return self;
  })();

  /**
   * Module for Registry management
   * @class ctx.registry
   * @path ctx.registry
   * @constructor
   */
  ctx.registry = (function() {
    /** @type {WScriptShell} */ var _shellObj = null;
    //var _RegObj = null;
    var _updateKey = function(key, root) {
      root = root || e.registry.root.CurrentUser;
      key = key || '';
      key = key.replace('HKEY_LOCAL_MACHINE', e.registry.root.LocalMachine);
      key = key.replace('HKEY_CURRENT_USER', e.registry.root.CurrentUser);
      key = key.replace('HKEY_CLASSES_ROOT', e.registry.root.ClassesRoot);
      if (key.substring(0, 2) != 'HK') {
        // the root is not mentioned, add it
        key = root + '\\' + key;
      }
      return key;
    }
    var self =
    /** @lends ctx.registry */
    {
      /**
      * Deletes a registry value or key
      * @description
      * For more details about the function, see [[https://msdn.microsoft.com/en-us/library/293bt9hh%28v=vs.84%29.aspx|RegDelete Method]]
      *
      * __Remarks:__
      *   * Specify a key-name by ending 'key' with a final backslash.
      *   * Do not include a final backslash to specify a value name.
      *
      * __Ex.:__
<code javascript>
// delete value and key
ctx.registry.del("HKCU\\Software\\ACME\\FortuneTeller\\MindReader"); // delete the value 'MindReader'
ctx.registry.del("HKCU\\Software\\ACME\\FortuneTeller\\"); // delete the key 'FortuneTeller'
// other syntax
ctx.registry.del("Software\\ACME\\FortuneTeller\\MindReader", e.registry.root.CurrentUser); // delete the value 'MindReader'
ctx.registry.del("Software\\ACME\\FortuneTeller\\", e.registry.root.CurrentUser); // delete the key 'FortuneTeller'
</code>
      * @method del
      * @path ctx.registry.del
      * @param {string} key Registry key to be deleted
      * @param {e.registry.root} [root] selects the Registry Root key (see [[:lib:common:ctx.enum#enumeration_eregistryroot|e.registry.root]]), if it's not mentioned in the key name. Default is 'Current User'
      */
      del : function(key, root) {
        ctx.notifyAction('ctx.registry.del');
        key = _updateKey(key, root);
        //_RegObj = _RegObj || new ActiveXObject("RegObj.Registry");
        _shellObj = _shellObj || new ActiveXObject("WScript.Shell");
        _shellObj.RegDelete(key);
      },

      /**
      * Reads a registry entry
      * @description
      * For more details about the function, see [[https://msdn.microsoft.com/en-us/library/x05fawxd%28v=vs.84%29.aspx|RegRead Method]]
      *
      * __Remarks:__
      *   * Specify a key-name by ending 'key' with a final backslash.
      *   * Do not include a final backslash to specify a value name.
      *   * When you specify a key-name (as opposed to a value-name), the method returns the default value.
      *
      * __Ex.:__
<code javascript>
// read entry
data.IEVersion = ctx.registry.get("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\Version");
// other syntax
data.IEVersion = ctx.registry.get("SOFTWARE\\Microsoft\\Internet Explorer\\Version", e.registry.root.LocalMachine);
</code>
      * @method get
      * @path ctx.registry.get
      * @param {string} key Registry key to be set
      * @param {e.registry.root} [root] selects the Registry Root key (see [[:lib:common:ctx.enum#enumeration_eregistryroot|e.registry.root]]), if it's not mentioned in the key name. Default is 'Current User'
      * @return {*} read value (undefined if not found)
      */
      get : function(key, root) {
        ctx.notifyAction('ctx.registry.get');
        var res;
        key = _updateKey(key, root);
        try {
          _shellObj = _shellObj || new ActiveXObject("WScript.Shell");
          res = _shellObj.RegRead(key);
          if (res === 'true') {
            res = true;
          } else if (res === 'false') {
            res = false;
          } else if (typeof res === 'string') {
            res = ctx.unserialize(res);
          }
        } catch (ex) {}
        return res;
      },

      /**
      * Reads a registry multi string entry
      * @description
      * For more details about the function, see [[https://msdn.microsoft.com/en-us/library/x05fawxd%28v=vs.84%29.aspx|RegRead Method]]
      *
      * __Remarks:__
      *   * Specify a key-name by ending 'key' with a final backslash.
      *   * Do not include a final backslash to specify a value name.
      *   * When you specify a key-name (as opposed to a value-name), the method returns the default value.
      *
      * __Ex.:__
<code javascript>
// read entry
data.IEVersion = ctx.registry.get("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\Version");
// other syntax
data.IEVersion = ctx.registry.get("SOFTWARE\\Microsoft\\Internet Explorer\\Version", e.registry.root.LocalMachine);
</code>
      * @method getMultiString
      * @path ctx.registry.getMultiString
      * @param {string} key Registry key to be set
      * @param {e.registry.root} [root] selects the Registry Root key (see [[:lib:common:ctx.enum#enumeration_eregistryroot|e.registry.root]]), if it's not mentioned in the key name. Default is 'Current User'
      * @return {*} read value (undefined if not found)
      */
      getMultiString : function(key, root) {
        ctx.notifyAction('ctx.registry.get');
        var res;
        key = _updateKey(key, root);
        try {
          _shellObj = _shellObj || new ActiveXObject("WScript.Shell");
          var value = _shellObj.RegRead(key);
          var objArray = new VBArray(value);
          res = objArray.toArray();
        } catch (ex) {}
        return res;
      },

      /**
      * Returns the standard registry root used to store user settings (located in "HKCU\\Software\\SAP\\Intelligent RPA\\CtxtRun\\Settings\\")
      * @method getRoot
      * @description
      * __Ex.:__
<code javascript>
var entry = ctx.registry.getRoot("SSO");
// entry = "HKCU\\Software\\SAP\\Intelligent RPA\\CtxtRun\\Settings\\SSO\\"
</code>
      * @path ctx.registry.getRoot
      * @param {string} [section] Optional sub section
      * @param {string} [key] Optional key name
      * @return {string} read value
      */
      getRoot : function(section, key) {
        var root = "HKCU\\Software\\SAP\\Intelligent RPA\\CtxtRun\\Settings\\";
        if (section) root = root + section + "\\";
        if (key) root = root + key;
        return root;
      },


      /**
      * Writes a key or value in registry
      * @description
      * Creates a new key, adds another value-name to an existing key (and assigns it a value), or changes the value of an existing value-name.
      *
      * For more details about the function, see [[https://msdn.microsoft.com/en-us/library/yfdfhz1b%28v=vs.84%29.aspx|RegWrite Method]]
      *
      * __Remarks:__
      *   * Specify a key-name by ending 'key' with a final backslash.
      *   * Do not include a final backslash to specify a value name.
      *
      * __Ex.:__
<code javascript>
ctx.registry.set(root + "\\Login", obj.login, e.registry.root.CurrentUser, e.registry.type.String);
</code>
      * @method set
      * @path ctx.registry.set
      * @param {string} key Registry key to be set
      * @param {*} value value to be set
      * @param {e.registry.root} [root] selects the Registry Root key (see [[:lib:common:ctx.enum#enumeration_eregistryroot|e.registry.root]]), if it's not mentioned in the key name. Default is 'Current User'
      * @param {e.registry.type} [type] selects the value type (see [[:lib:common:ctx.enum#enumeration_eregistrytype|e.registry.type]]). Default is 'string'
      */
      set : function(key, value, root, type) {
        ctx.notifyAction('ctx.registry.set');
        key = _updateKey(key, root);
        var val = value;
          try {
        _shellObj = _shellObj || new ActiveXObject("WScript.Shell");
        if (typeof type === 'undefined') {
          if (typeof value === 'boolean') {
            type = e.registry.type.String;
            val = (value ? 'true' : 'false');
          } else if (value && typeof value === 'object') {
            type = e.registry.type.String;
            ctx.serialize(value, false, true);
          } else if (typeof value === 'number') {
            type = e.registry.type.Number;
          } else {
            type = e.registry.type.String;
          }
        }
        _shellObj.RegWrite(key, val, type);
          } catch ( err ) {}
      }
    }
    return self;
  })();

  /**
  * Description
  * @class ctx.settingClass
  * @path ctx.settingClass
  * @constructor
  * @param {*} [obj] initialization object
  */
  ctx.settingClass = function (obj) {
    obj = obj || {}
    var _setting = this;
    /** @property {string}
    * @path settingClass.name */ this.name = obj.name || '';
    /** @property {string}
    * @path settingClass.comment */ this.comment = obj.comment || '';
//    /** @property {string}
//    * @path settingClass.h1 */ this.h1 = obj.h1 || '';
//    /** @property {string}
//    * @path settingClass.h2 */ this.h2 = obj.h2 || '';
    /** @property {*}
    * @path settingClass.value */ this.value = obj.value || null;
    /** @property {ctx.cryptography.keyClass}
    * @path settingClass.key */ this.key = obj.key || ctx.cryptography.keys.none;
    /** @property {e.env}
    * @path settingClass.env */ this.env = obj.env || e.env.none;
    /** @property {boolean}
    * @path ctx.settingClass.server */ this.server = obj.server || false;

    /** @method get
    * @param { function(e.error, string, Object) } [callback]
    * @path ctx.settingClass.get */
    this.get = function(callback) {
      ctx.notifyAction('ctx.settingClass.get');
      if (_setting.value) {
        // already read, direct return
        if (callback && ('function' === typeof callback)) {
          callback(e.error.OK, "", _setting);
        }
      } else if (_setting.server && (typeof ctx.galaxyAPI !== 'undefined')) {
        // retrieve setting from the server
        _setting.reset();
        ctx.galaxyAPI.getSetting(_setting, function(code, label, obj) {
          if (code == e.error.OK) {
            _setting.value = obj.value;
          }
          if (callback && ('function' === typeof callback)) {
            callback(code, label, _setting);
          }
        });
      } else {
        // read in the registry
        _setting.reset();
        var reg = ctx.registry.getRoot("Settings", _setting.name);
        var value = ctx.registry.get(reg);
        // uncypher data
        if (_setting.key && value && ('string' === typeof value)) {
          value = ctx.cryptography.decryptMessage(value, _setting.key);
        }
        // unserialize data
        if (value && ('string' === typeof value)) {
          _setting.value = ctx.unserialize(value);
        }
        if (callback && ('function' === typeof callback)) {
          callback(e.error.OK, "", _setting);
        }
      }
    }

    /** @method reset
    * @path ctx.settingClass.reset
    * @return {ctx.settingClass} */
    this.reset = function() {
      ctx.notifyAction('ctx.settingClass.reset');
      _setting.value = "";
      return _setting;
    }

    /** @method set
    * @param { function(e.error, string, Object) } [callback]
    * @path ctx.settingClass.set */
    this.set = function(callback) {
      ctx.notifyAction('ctx.settingClass.set');
      if (_setting.server && (typeof ctx.galaxyAPI !== 'undefined')) {
        //ctx.galaxyAPI.setSetting(_setting, callback);
				if (callback && ('function' === typeof callback)) {
          callback(e.error.NotImplemented, "ctx.settingClass.set not implemented", _setting);
        }
      } else {
        // serialize data
        var value = ctx.serialize(_setting.value, false, true);
        // cypher data
        if (_setting.key) {
          var key = ctx.cryptography.searchKey(_setting.key);
          if (key && key.type) {
            value = ctx.cryptography.encryptMessage(value, key);
          }
        }
        // save in the registry
        var reg = ctx.registry.getRoot("Settings", _setting.name);
        ctx.registry.set(reg, value);
        if (callback && ('function' === typeof callback)) {
          callback(e.error.OK, "", _setting);
        }
      }
    }
  }

  /** @type {ctx.settingClass} */ var setting = new ctx.settingClass(); // for Intellisense only

  /** map of settings
  * @path ctx.settings
  * @type {Object<string, ctx.settingClass>}
  */
  ctx.settings = {};

  /**
  * Adds a setting in setting manager
  * @description
  * __Ex.:__
<code javascript>
var setting = ctx.setting({ default: {
...
}});
</code>
  * @class ctx.cryptography.setting
  * @path ctx.cryptography.setting
  * @param {Object} [params] setting parameters
  * @return {ctx.settingClass} setting object
  */
  ctx.setting = function (params) {
    /*** @type {ctx.settingClass} */ var setting = null;
    if (params && (typeof params === 'object')) {
      for (var settingId in params) {
        var obj = params[settingId];
        if (obj && (typeof obj === 'object')) {
          obj.name = settingId;
          ctx.settings[settingId] = setting = new ctx.settingClass(obj);
        }
      }
    }
    return setting;
  }

  ctx.options.settings = ctx.dataManager(null);

	  /**
  * Class to manage a tenant list
  * @class ctx.tenantManager
  * @path ctx.tenantManager
  * @constructor
  * @ignore
  */
  ctx.tenantManager = (function () {
    /** @type {Object} */var _tenants = {}; // map of tenants
  	var _currentTenant = ""
  	var _tenantFolder = "%programdata%\\SAP\\Intelligent RPA\\tenants\\"
	  var _cmdCurrentTenantKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentTenantId";

		var self =
    /** @lends ctx.tenantManager */
    {

    /** [Internal usage]
     * Returns the short description for serialization
     * @ignore
     * @method ctxShort
     * @path ctx.tenantManager.ctxShort
     */
    ctxShort : function() {
      return undefined; // no serialization
    },

    /**
    * Checks if the tenant URL exists, returns result and error message
    * @description
    * __Ex.:__
<code javascript>
var res = ctx.tenantManager.checkURL('https://ipa-mytenant--master.cfapps.sap.hana.ondemand.com');
// returns {
//  "isValid":true,
//  "errorLabel":""
// }
</code>
    * @method checkURL
    * @ignore
    * @path ctx.tenantManager.checkURL
    * @param {string} url
    * @return {*} result object
    */
    checkURL : function (url) {
      ctx.notifyAction('ctx.tenantManager.checkURL');
			var res = {};
			try {
				res = ctx.json.parse(ctx.wkMng.CheckTenantURL(url)) || {};
			} catch (ex) { }
      return res;
    },

    /**
    * TBC
    * @description
    * __Ex.:__
<code javascript>
</code>
    * @method checkTenantName
    * @ignore
    * @path ctx.tenantManager.checkTenantName
    * @param {string} id
    * @param {string} name
    * @param {boolean} isTenantToAdd
    * @return {string} error message if tenant name is invalid
    */
   checkTenantName : function (id, name, isTenantToAdd) {
    ctx.notifyAction('ctx.tenantManager.checkTenantName');
    var errorMsg = "";
    var lowerCaseId = id.toLowerCase();
    var bTenantNameNotUnique = false;
    for (var key in _tenants) {
      if (lowerCaseId === key.toLowerCase()) {
        bTenantNameNotUnique = true;
        break;
      }
    }
    //tenant name unicity check must be case-insensitive, because windows/mac filesystem is case-insensitive
    if (isTenantToAdd && bTenantNameNotUnique) {
      errorMsg += GLOBAL.labels.systray.tenantNameNotUnique + "\n";
      return errorMsg;
    }
    if (/[^A-Za-z0-9 ]+/g.test(id) || /[^A-Za-z0-9 ]+/g.test(name)) {
      errorMsg += GLOBAL.labels.systray.tenantNameNoSpecialCharacters + "\n";
    }
    return errorMsg;
  },

    /**
    * TBC
    * @description
    * __Ex.:__
<code javascript>
</code>
    * @method getAll
    * @ignore
    * @path ctx.tenantManager.getAll
    * @return {Array} tenant list
    */
    getAll : function () {
      ctx.notifyAction('ctx.tenantManager.getAll');
      _tenants = {};
      var aTenantList = [];
      var sCurrentTenantId = self.getCurrent();
			
			if (!ctx.fso.folder.exist(_tenantFolder)) {
					ctx.fso.folder.create(_tenantFolder);
				}
			
      var files = ctx.fso.folder.getFileCollection(_tenantFolder, true);
      ctx.each(files, function(index, file) {
				try {
					ctx.noNotify = true;
					if (String(ctx.fso.file.getExtensionName(file.Path)).toLowerCase() == 'json') {
						ctx.noNotify = true;
		        var tenant = ctx.json.parse(ctx.fso.file.read(file.Path));
						ctx.noNotify = true;
						var id = ctx.fso.file.getBaseName(file.Path);
						var obj = {
							id: id,
							alias: tenant['tenantName'] || id, 
							url: tenant['tenantDomain']
						}
						if (obj.id && obj.url) {
              _tenants[id] = obj;
              aTenantList.push({
                id: obj.id,
                name: obj.alias,
                url: obj.url,
                active: obj.id === sCurrentTenantId
              });
            } 
					}
				} catch (ex) { }
      });
      return aTenantList;
    },

    /**
    * TBC
    * @description
    * __Ex.:__
<code javascript>
</code>
    * @method getCurrent
    * @ignore
    * @path ctx.tenantManager.getCurrent
    * @return {string} TBC
    */
    getCurrent : function () {
      ctx.notifyAction('ctx.tenantManager.getCurrent');
			var currentTenant = String(ctx.registry.get(_cmdCurrentTenantKey));
			return currentTenant;
    },

      /**
    * Registers tenant when first tenant file is created
    * @description  
    * @method  notifyAgentFirstTenantFileCreated
    * @ignore
    * @path    ctx.tenantManager.notifyAgentFirstTenantFileCreated
    */
    notifyAgentFirstTenantFileCreated : function (tenantId, tenantName, tenantUrl) {
        ctx.notifyAction('ctx.tenantManager.notifyAgentFirstTenantFileCreated');
        try {
          ctx.wkMng.FirstTenantFileCreated(tenantId, tenantName, tenantUrl);
        } catch(ex) {}
      },

    /**
    * TBC
    * @description
    * __Ex.:__
<code javascript>
</code>
    * @method remove
    * @ignore
    * @path ctx.tenantManager.remove
    * @param {string} id tenant id
    * @return {boolean} true if data is valid
    */
    remove : function (id) {
      ctx.notifyAction('ctx.tenantManager.remove');
			var res = false;
			if (_tenants[id]) {
				var currentTenant = ctx.registry.get(_cmdCurrentTenantKey);
				if (currentTenant == id) {
					ctx.registry.set(_cmdCurrentTenantKey, '');
				}			
				var file = _tenantFolder + id + ".json";
				if (ctx.fso.file.exist(file)) {
					ctx.fso.file.remove(file);
				}
				delete _tenants[id];
				res = true;
			}			
      return res;
    },

    /**
    * TBC
    * @description
    * __Ex.:__
<code javascript>
</code>
    * @method save
    * @ignore
    * @path ctx.tenantManager.save
    * @param {string} id
    * @param {string} alias
    * @param {string} url
    * @return {boolean} true if data is valid
    */
    save : function (id, alias, url) {
      ctx.notifyAction('ctx.tenantManager.save');
			var res = false;
			alias = alias || id;
			if (id && url) {
				var file = _tenantFolder + id + ".json";
				
				if (!ctx.fso.folder.exist(_tenantFolder)) {
					ctx.fso.folder.create(_tenantFolder);
				}
				
				var obj = {
					tenantName: alias,
					tenantDomain: url
				}
        ctx.fso.file.write(file, ctx.json.stringify(obj), e.file.encoding.UTF8withoutBOM, true);
        _tenants[id] = {
          id: id,
          alias: alias, 
          url: url
        };		
				res = true;
			}
      return res;
    },

		/**
    * TBC
    * @description
    * __Ex.:__
<code javascript>
</code>
    * @method setCurrent
    * @ignore
    * @path ctx.tenantManager.setCurrent
    * @param {string} id tenant id
    * @return {boolean} true if data is valid
    */
    setCurrent : function (id) {
      ctx.notifyAction('ctx.tenantManager.setCurrent');
			var res = false;
			ctx.each(_tenants, function(tenantId, tenant) {
				if (id && (tenantId == id)) {
					ctx.registry.set(_cmdCurrentTenantKey, id);
					res = true;
					return false;
				}
			});
      return res;
    }
	}
    return self;
	})();
