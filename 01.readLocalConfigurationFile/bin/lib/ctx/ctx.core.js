/**
 * @module       Ctx framework Core classes and methods
 * @file         ctx/ctx.core.js
 * @description
 *  This module implements core classes and functions used to define **Contextor** language:
 *   * Object descriptor,
 *   * Technical and functional events,
 *   * Context management,
 *   * Registry management,
 *   * ...
 * \\
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * @ignore
 * Global legacy variables, used when porting V2 language projects to V3 language
 * Do not use in general case !
 */
var _Work0_ = '';
var _Work1_ = '';
var _Work2_ = '';
var _Work3_ = '';
var _Work4_ = '';
var _Work5_ = '';
var _Work6_ = '';
var _Work7_ = '';
var _Work8_ = '';
var _Work9_ = '';

/**
 * @ignore
 * @global _DEBUG flag: can be overidded at compile time
 * @define {boolean} */
var _DEBUG = false;

// add 'String.prototype...' function if nedded
if (!String.prototype.toCamel) {
  String.prototype.toCamel = function(){
    return this.replace(/([-_ ][a-z])/g, function($1){return $1.toUpperCase().replace(/[-_ ]/,'');});
  };
}
if (!String.prototype.trim) {
   String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };
}
if (!String.prototype.ltrim) {
  String.prototype.ltrim = function(){ return this.replace(/^\s+/,''); };
}
if (!String.prototype.rtrim) {
  String.prototype.rtrim = function(){ return this.replace(/\s+$/,''); };
}
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(prefix) { return (this.indexOf(prefix) == 0); };
}
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(suffix) { return (this.indexOf(suffix, this.length - suffix.length) !== -1); };
}
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

// add 'Object.keys' function if nedded
if (typeof Object.keys !== 'function') {
  // JScript in IE8 and below mistakenly skips over built-in properties.
  // https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute
  var hasDontEnumBug = !({toString: true}).propertyIsEnumerable('toString');

  var getKeys = function(object) {
    var type = typeof object;
    if (type != 'object' && type != 'function' || object === null) {
      throw new TypeError('Object.keys called on non-object');
    }

    var keys = [];
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  }

  if (hasDontEnumBug) {
    var dontEnumProperties = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'prototypeIsEnumerable',
      'constructor'
    ];

    Object.keys = function(object) {
      var keys = getKeys(object);
      for (var ii = 0, il = dontEnumProperties.length; ii < il; ii++) {
        var property = dontEnumProperties[ii];
        if (object.hasOwnProperty(property)) {
          keys.push(property);
        }
      }
      return keys;
    };
  } else {
    Object.keys = getKeys;
  }
}

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
      /** @constructor */
      function F() { return undefined; }
      F.prototype = o;
      return new F();
    };
}

// **********************************
// *** Polyfill methods for Array ***
// **********************************
// add 'Array.isArray' function if nedded
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

/**
 * Contextor Framework
 * @class        ctx
 * @constructor
 * @path         ctx
 */
var ctx = ( function () {
 /** 
  * @ignore
  * Framework global version
  * @const
  * @type {string}
  */
	 var _coreVersion = "2.0.0.173";

  // verbs saved anyway
  var _forceSave = {
    'ctx.log': true
  };

  var _autoStartKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\DisableAutoStart";
  var _confirmStartKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\ConfirmStart";
  var _restartingKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\Restarting";
  var _runningKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\Running";
  var _serviceStartKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\ServiceStart";
  var _cmdLineNameKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\CmdLineName";
  var _cmdLineKey = "HKCU\\Software\\SAP\\Intelligent RPA\\Settings\\CmdLine";
  //var _configFolderPersonal = "%localappdata%\\SAP\\Intelligent RPA\\config\\";
  //var _configFolderCommon = "%programdata%\\SAP\\Intelligent RPA\\config\\"
  //var _configFile = "config.xml";

  /** @type {Array} */ var _projectList = [];
  /** @type {number} */ var _currentProjectIndex = -1;


  // read options from the command line
  var _updateOptions = function() {
    // read options from the command line
    ctx.noNotify = true;
    var node = ctx.context.getCtx('//GLOBAL/WkMng_Info/OptionFiles');
    if (node && node.childNodes) {
      for (var i = 0; i < node.childNodes.length; i ++) {
        var text = node.childNodes[i].text;
        if (text) {
          var pos = text.indexOf('=');
          if (pos > 0) {
            var key = text.substring(0, pos).trim();
            var val = text.substring(pos + 1).trim();
            if (key !== '') {
              // overload or add option
              if (ctx.index(ctx.options, key) !== undefined) {
                var type = typeof(ctx.index(ctx.options, key));
                if (type == 'boolean')
                  val = (val == 'true' ? true : false);
                else if (type == 'number')
                  val = parseInt(val, 10);
              } else {
                if (val == 'true') val = true;
                else if (val == 'false') val = false;
                else if (!isNaN(parseInt(val, 10))) val = parseInt(val, 10);
              }
              ctx.index(ctx.options, key, val);
            }
          } else {
            // non formatted option (<key>=>value>) : store it 'as is'
            ctx.options.optionFiles.push(text);
          }
        }
      }
    }
  }

  // read options from the option file
  var _updateOptionFile = function () {
    var text = '';
    try {
      var file = ctx.options.path.bin + "\\ctx.options.json";
      text = ctx.fso.file.read(file);
      if (text) {
        var obj = ctx.json.parse(text);
        var groups = ['all'];
        var groups2;
        if (obj['machines']) {
          groups2 = obj['machines'][ctx.options.computerName];
          if (groups2 && Array.isArray(groups2)) {
            groups = groups.concat(groups2);
          }
        }
        if (obj['logins']) {
          groups2 = obj['logins'][ctx.options.userName];
          if (groups2 && Array.isArray(groups2)) {
            groups = groups.concat(groups2);
          }
        }
        ctx.each(groups, function(id, group) {
          var options = obj.options[group];
          if ('object' === typeof(options)) {
            ctx.set(options, ctx.options);
          }
        });
      }
    } catch (ex) {}
  }

  //var _htmlDoc = null;
  var _timerObj = {};
  var _timerIndex = 0;

  var self =
  /** @lends ctx */
  {
  /** any event const value
  * @ignore
  * @const
  * @path ctx.anyEvent
  * @property {string} */ anyEvent: '_Any_',

  /** class type
  * @ignore
  * @const
  * @path ctx.ctxType
  * @property {string} */ ctxType: 'ctx',

  /** root object
  * @ignore
  * @path ctx.root
  * @property {Object} */   root: null,

  /** available projects
  * @ignore
  * @path ctx.availableProjects
  * @property {Array} */  availableProjects: [],

  /** restart mode
  * @ignore
  * @path ctx.restartAgent
  * @property {boolean} */  restartAgent: false,

  /** restart mode
  * @ignore
  * @path ctx.shutdownOnIdle
  * @property {boolean} */  shutdownOnIdle: false,

  /** map of event handlers
  * @ignore
  * @path ctx.subscriptions
  * @property {Object} subscriptions */ subscriptions: {},

  /** map of pending events
  * @ignore
  * @path ctx.pendingEvents
  * @property {Array} pendingEvents */ pendingEvents: [],

  /** Application array
  * @ignore
  * @path ctx.app
  * @description
  * Contains the list of declared applications
  *
  * __Ex.:__
<code javascript>
// enumerate applications
for (var id in ctx.app) {
  var app = ctx.app[id];
  ctx.log(app.name);
}
</code>
  * @property {Object<string, ctx.application>} */ app : {},

  /** Application data array
  * @ignore
  * @path ctx.data
  * @description
  * ctx.data.
  *   Appli1
  *    [0] --> contains ctx.app.Appli1[0].data
  *    [3584] --> contains ctx.app.Appli1[3584].data
  *   Appli2
  *    [0] --> contains ctx.app.Appli2[0].data
  *    [2587] --> contains ctx.app.Appli2[2587].data
  *    [3798] --> contains ctx.app.Appli2[3789].data
  *
  * @ignore [internal usage]
  * Contains the list of data container for declared application instances
  * @property {Array<ctx.dataClass>} */ data : [],

  /** map of 'Action' functions depending on nature
  * @ignore
  * @path ctx.actionFunction
  * @property {Object} */ actionFunction : {},

  /** map of 'ActionApp' functions depending on nature
  * @ignore
  * @path ctx.actionAppFunction
  * @property {Object} */ actionAppFunction : {},

  /** custom types declared for items
  * @ignore
  * @path ctx.customTypes
  * @property {Object} */ customTypes : {},

  /** disable notifications (single)
  * @ignore
  * @path ctx.noNotify
  * @property {boolean} */ noNotify : false,

  /** disable notifications
  * @ignore
  * @path ctx.lockNoNotify
  * @property {boolean} */ lockNoNotify : false,

  /** hide trace parameters
  * @ignore
  * @path ctx.anonymous
  * @property {boolean} */ anonymous : false,

  /** custom types declared for pages
  * @ignore
  * @path ctx.pageCustomTypes
  * @property {Object} */ pageCustomTypes : {},

  /** Map of pending functions
  * @ignore
  * @path ctx.pendingFunctions
  * @property {Array<function()>} */ pendingFunctions : [],

//  /** Map of pending scenarios
//  * @ignore
//  * @path ctx.pendingScenarios
//  * @property {Array<ctx.scenarioClass>} */ pendingScenarios : [],
//
//  /** Map of pending promises
//  * @ignore
//  * @path ctx.pendingPromises
//  * @property {Array<ctx.promiseClass>} */ pendingPromises : [],

  /** Object index
  * @ignore
  * @path ctx.objectIndex
  * @property {number} */ objectIndex : 0,

  /** Counter array
  * @ignore
  * @path ctx.counters
  * @property {Object} */ counters : {
    /** Action counter list
    * @ignore
    * @path ctx.counters.actions
    * @property {Object} */ actions: {},
    /** Running scenario counter list
    * @ignore
    * @path ctx.counters.scenarios
    * @property {Object} */ scenarios: {}
  },

  /**
  * @ignore
  * @type {string} */ _traceDate : '',

  /**
  * @ignore
  * @type {WScriptShell} */ _shell : null,

  /**
  * @ignore
  * @type {ScriptingFileSystemObject} */ _fso : null,

  /**
  * Current application
  * @path ctx.currentAppli
  * @property {ctx.application} currentAppli */ currentAppli : null,

  /** Current event
  * @path ctx.currentEvent
  * @property {ctx.event} currentEvent */ currentEvent : null,

  /** Current promise
  * @ignore
  * @path ctx.currentPromise
  * @property {ctx.promiseClass} currentPromise */ currentPromise : null,

  /**
  * Current page
  * @path ctx.currentPage
  * @property {ctx.page} currentPage */ currentPage : null,

  /** Current running scenario
  * @ignore
  * @path ctx.currentScenario
  * @property {ctx.scenarioClass} currentScenario */ currentScenario : null,

  /** Current running step
  * @ignore
  * @path ctx.currentStep
  * @property {ctx.stepClass} currentStep */ currentStep : null,

  /** Current subscription
  * @ignore
  * @path ctx.currentSubscription
  * @property {Object} currentSubscription */ currentSubscription : null,

  /** Current parentId
  * @ignore
  * @path ctx.currentParentId
  * @property {number} currentParentId */ currentParentId : 0,

  /** Current timer reason
  * @ignore
  * @path ctx.currentTimerReason
  * @property {string} currentTimerReason */ currentTimerReason : '',

  /** Engine activity : variable is false by default, is set to true after event GLOBAL:START is received
  * @ignore
  * @path ctx.engineStarted
  * @property {boolean} engineStarted */ engineStarted : false,

  /** Events triggered
  * @ignore
  * @path ctx.eventTriggered
  * @property {boolean} eventTriggered */ eventTriggered : false,

  /** Engine is stopping (GLOBAL END was received)
  * @ignore
  * @path ctx.engineStopInProgress
  * @property {boolean} */ engineStopInProgress : false,

  /** Project sub features
  * @ignore
  * @path ctx.features
  * @property {Object} */ features : {},

  /** Last received event
  * @ignore
  * @path ctx.lastEvent
  * @property {ctx.event} lastEvent */ lastEvent : null,

 /**
  * Adds an application or process.
  * @description
  * __Ex.:__
<code javascript>
var GLOBAL = ctx.addApplication( 'GLOBAL' );
var LinkedIn = ctx.addApplication( 'LinkedIn', {"nature":"WEB3","path":"www.linkedin.com/"} );
</code>
  * @method addApplication
  * @path ctx.addApplication
  * @ignore
  * @param {string} name
  * @param {Object} [obj]
  * @return {ctx.application} Created application
  */
  addApplication : function (name, obj) {
    return (ctx.app[name] = new ctx.application(name, obj));
  },

  /**
  * Adds a pending function
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @method addPendingFunction
  * @path ctx.addPendingFunction
  * @ignore
  * @param {function()} callback
  */
  addPendingFunction : function (callback) {
    if (ctx.currentEvent && ctx.currentEvent.parent) {
      // add function in the pending list, it will be called at the end of event treatment
      ctx.pendingFunctions.push(callback);
    } else {
      // no event is being treated (typically, endStep() called from a timer function) : call immediately
      callback();
    }
  },

  /**
  * clears old trace folders and archives
  * @description
  * __Ex.:__
<code javascript>
ctx.clearTraceFolder();
</code>
  * @method clearTraceFolder
  * @ignore internal use
  * @path ctx.clearTraceFolder
  * @return {boolean} result
  */
  clearTraceFolder : function () {
    var res = true;
    try {
      // archive should be something like files '<computer>.<user>.2015-10-30T14.45.23Z.889.zip' or folders '<computer>.<user>.2015-10-30T14.45.23Z.889'
      var targets = { };
      ctx.noNotify = true;
      targets.files = ctx.fso.folder.getFileCollection(ctx.options.path.log, true),
      ctx.noNotify = true;
      targets.folders = ctx.fso.folder.getFolderCollection(ctx.options.path.log, true)
      var prefix = ctx.options.computerName + '.' + ctx.options.userName + '.';
      var pos, pos2;
      var sDate;
      var oldFileArray = []; // archives to be deleted
      var fileArray = [];
      ctx.each(targets, function(id, target) {
        ctx.each(target, function(index, item) {
          var filename = item.Name;
          pos = filename.indexOf(prefix);
          if (pos >= 0) {
            // date = '2015-10-30T...'
            sDate = filename.substr(prefix.length + pos, 10);
            var todayDate = new Date();
            var y = parseInt(sDate.substr(0, 4), 10);
            var m = (parseInt(sDate.substr(5, 2), 10) - 1);
            var d = parseInt(sDate.substr(8, 2), 10);
            if ((y > 2000) && (d > 0)) {
              var fileDate = new Date(y, m, d);
              var diffDate = todayDate - fileDate;
              var nbDays = Math.floor(diffDate / (1000 * 60 * 60 * 24));
              if (nbDays <= ctx.options.traceArchive.maxDuration) {
                fileArray.push(filename);
              } else {
                oldFileArray.push(filename);
              }
            }
          }
        });
      });

      //list of recent files:
      // - sort by ascendant date
      // - move the first entries (oldest) to oldFileArray,  (only keep the last 'maxCount' archives)
      fileArray.sort();
      var nbToDelete = fileArray.length - ctx.options.traceArchive.maxCount;
      if (nbToDelete > 0) {
        for (var i = 0; i < nbToDelete ; i ++) {
          var filename = fileArray.shift();
          oldFileArray.push(filename);
        }
      }
      //delete obsolete files and folders
      while (oldFileArray.length > 0) {
        var entry = ctx.options.path.log + '\\' + oldFileArray.shift();
        ctx.noNotify = true;
        if (entry.endsWith('.zip') ) {
          ctx.fso.file.remove(entry);
        } else {
          ctx.fso.folder.remove(entry);
        }
      }
    } catch (ex) {}
    return res;
  },

  /**
  * Compares two version numbers (one can be Interactive version)
  * @description
  * __Ex.:__
<code javascript>
if (ctx.compareVersion('3.0.6.5') < 0)
{
  // Interactive version is inferior to '3.0.6.5'
}
</code>
  * @advanced
  * @method compareVersion
  * @path ctx.compareVersion
  * @param {string} version version to be compared
  * @param {string} [reference] reference version for comparison (if omitted, the Interactive version 'ctx.options.productVersion' is used)
  * @param { function(e.error, string, Object) } [callback] optional callback to be called if comparison < 0
  * @param { Object } [obj] optional object as parameter for the callback
  * @return {number} result : -2 (failure), -1 (version > reference), 0 (equal), 1 (reference > version)
  */
  compareVersion : function (version, reference, callback, obj) {
    reference = reference || ctx.options.productVersion;
    var res = 0; // version = reference
    if (typeof version + typeof reference !== 'stringstring') {
      res = -2;
    } else {
      var a = reference.split('.');
      var b = version.split('.');
      var i = 0;
      var len = Math.max(a.length, b.length);
      for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i], 10) > 0) || (parseInt(a[i], 10) > parseInt(b[i], 10))) {
          res = 1; // reference > version
          break;
        } else if ((b[i] && !a[i] && parseInt(b[i], 10) > 0) || (parseInt(a[i], 10) < parseInt(b[i], 10))) {
          res = -1; // version > reference
          break;
        }
      }
    }
    if ((res < 0) && callback && ('function' === typeof callback)) {
      if (obj === undefined) obj = null;
      callback(e.error.NotImplemented, "Requires min. version: " + version, obj);
    }
    return res;
  },


  /**
  * Emulates DOM 'window' and 'document' objects in a non-Web javascript engine
  * @ignore
  * @method emulateBrowser
  * @path ctx.emulateBrowser
  * @return {boolean} result success state
  */
  emulateBrowser : function () {
    try {
      if (typeof window === 'undefined') {
        // disable cookie security warning which can lock htmlfile (following KB4088775)
        var val = ctx.registry.get('Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1A10', e.registry.root.CurrentUser);
        if (val != 0) {
          ctx.registry.set('Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3\\1A10', 0, e.registry.root.CurrentUser, e.registry.type.Number);
        }
        try {
              if ('undefined' === typeof setTimeout) {
          /**
          * @param {Function|string} callback
          * @param {number} [delay]
          * @param {...*} [var_args]
          * @ignore
          * @see https://developer.mozilla.org/en/DOM/window.setTimeout
          */
          setTimeout = function(callback, delay, var_args) {
            // workaround following KB4088775 : reallocate htmlfile at each call
            var timer = {
              doc: new ActiveXObject("htmlfile"),
              id: 0
            };
            _timerIndex ++;
            _timerObj[_timerIndex] = timer;
            timer.id = timer.doc.parentWindow.setTimeout( function(timerIndex) { return function() {
              var timer = _timerObj[timerIndex];
              if (timer) {
                delete _timerObj[timerIndex];
                if (callback && ('function' === typeof callback))
                  callback();
              } else {
                ctx.log('setTimeout: unknown id ' + _timerIndex, e.logIconType.Warning)
              }
            }; }(_timerIndex), delay, var_args);
            return _timerIndex;
          };

          clearTimeout = function(obj) {
            // workaround following KB4088775 : reallocate htmlfile at each call
            var timer = _timerObj[obj];
            if (timer) {
              var id = timer.doc.parentWindow.clearTimeout(timer.id);
              delete _timerObj[obj];
              return id;
            }
          };

          /**
          * @param {Function|string} callback
          * @param {number} [delay]
          * @ignore
          * @see https://developer.mozilla.org/en/DOM/window.setTimeout
          */
          setInterval = function(callback, delay) {
            // workaround following KB4088775 : reallocate htmlfile at each call
            var timer = {
              doc: new ActiveXObject("htmlfile"),
              id: 0
            };
            _timerIndex ++;
            _timerObj[_timerIndex] = timer;
            timer.id = timer.doc.parentWindow.setInterval( function() {
              if (callback && ('function' === typeof callback))
                callback();
            }, delay);
            return _timerIndex;
          };

          clearInterval = function(obj) {
            // workaround following KB4088775 : reallocate htmlfile at each call
            var timer = _timerObj[obj];
            if (timer) {
              var id = timer.doc.parentWindow.clearInterval(timer.id);
              delete _timerObj[obj];
              return id;
            }
          };
              }

          alert = function(message) {
            var htmlDoc = new ActiveXObject("htmlfile"); // workaround following KB4088775 : reallocate htmlfile at each call
            return htmlDoc.parentWindow.alert(message)
          };
        } catch (ex) {
          alert = function(message) { return ctx.log(message) };
        }
      }
    } catch (ex) {
      return false;
    }
    return true;
  },

  /**
  * Gets a defined applicaton or process object by its name
  * @advanced
  * @description
  * __Ex.:__
<code javascript>
var app = ctx.getApplication('LinkedIn');
</code>
  * @method getApplication
  * @path ctx.getApplication
  * @param {string} name application name
  * @return {ctx.application} Application object
  */
  getApplication : function (name) {
    return (ctx.app[name]);
  },

  /**
  * Retrieves the object descriptor from a string selector
  * @description
  * Object selector, should be : ''[appliName[(appliInst)]]:[pageName[(pageInst)]]:[item[(itemInst)][index]]:''
  *   * if 'appliName' is omitted, current appli is used
  *   * if 'appliInst' is omitted, current appli instance is used
  *
  * __Ex.:__
<code javascript>
  - var desc = ctx.getDescriptor("MyAppli:pMain:btSearch");
  - var desc = ctx.getDescriptor(".pMain.btSearch");
  - var desc = ctx.getDescriptor("..btSearch");
  - var desc = ctx.getDescriptor("MyAppli(5145).pMain.btSearch");
  - var desc = ctx.getDescriptor("MyAppli.pMain(1002).btSearch");
  - var desc = ctx.getDescriptor("MyAppli.pMain.rowResult[0]"); // first value in occursed item
  - var desc = ctx.getDescriptor("MyAppli.pMain.tabResult[iRow][iCol]"); // cell (iRom, iCol) in an array
</code>
  * @method getDescriptor
  * @path ctx.getDescriptor
  * @ignore
  * @param {string|ctx.descriptor} [selector] string selector
  * @param {ctx.descriptor} [desc] Optional source descriptor object (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
  * @return {ctx.descriptor} Object descriptor (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
  */
  getDescriptor : function (selector, desc) {
    if ((typeof selector === 'undefined') || (selector === '')) {
      selector = '.'; // implicit selector : [current appli:current page]
    }
    var tSelector = selector.split('.');
    var val;
    var offset = 0;
    if (desc) {
      if (desc.appliName !== '')
        offset--;
      if (desc.pageName !== '')
        offset--;
    } else {
      desc = new ctx.descriptor();
    }
    var nb = tSelector.length;
    if (typeof tSelector[offset] !== 'undefined') {
      if (tSelector[offset] !== '') {
        //rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
        val = tSelector[offset]; //.match('/^*\(/g');
        desc.appliName = val;
        if (ctx.currentEvent && desc.appliName == ctx.currentEvent.appliName && ctx.app[ctx.currentEvent.appliName] && ctx.app[ctx.currentEvent.appliName][ctx.currentEvent.appliInst])
          desc.appliInst = ctx.currentEvent.appliInst;
      } else if (ctx.currentEvent && ctx.app[ctx.currentEvent.appliName] && ctx.app[ctx.currentEvent.appliName][ctx.currentEvent.appliInst]) {
        desc.appliName = ctx.currentEvent.appliName;
        desc.appliInst = ctx.currentEvent.appliInst;
      }
    }
    if (typeof tSelector[offset + 1] !== 'undefined') {
      if (tSelector[offset + 1] !== '') {
        val = tSelector[offset + 1]; //.match('/^*\(/g');
        desc.pageName = val;
        if (ctx.currentEvent && desc.pageName == ctx.currentEvent.pageName)
          desc.pageInst = ctx.currentEvent.pageInst;
      } else if (ctx.currentEvent) {
        desc.pageName = ctx.currentEvent.pageName;
        desc.pageInst = ctx.currentEvent.pageInst;
      }
    }
    if (typeof tSelector[offset + 2] !== 'undefined') {
      if (tSelector[offset + 2] !== '') {
        val = tSelector[offset + 2]; //.match('/^*\(/g');
        desc.itemName = val;
      } else {
        desc.itemName = ctx.currentEvent.itemName;
      }
      desc.itemFullName = desc.itemName;
      for (var i = 0; i < desc.index.length; i++) {
        desc.itemFullName = desc.itemFullName + '[' + desc.index[i] + ']';
      }
    }
    return desc;
  },

 /**
  * Returns Javascript engine version.
  * @description
  * __Ex.:__
<code javascript>
var obj = ctx.getEngineVersion();
// obj = {
//   scriptEngine: 'JScript',
//   majorVersion: '5',
//   minorVersion: '8',
//   buildVersion: '16428' }
</code>
  * @method  getEngineVersion
  * @path    ctx.getEngineVersion
  * @return  {Object} Object containing version values (see ex. below)
  */
  getEngineVersion : function () {
    var obj = {};
    try {
      obj.scriptEngine = Host.ScriptEngine();
      obj.majorVersion = Host.ScriptEngineMajorVersion();
      obj.minorVersion = Host.ScriptEngineMinorVersion();
      obj.buildVersion = Host.ScriptEngineBuildVersion();
    } catch(ex) {}
    ctx.notifyAction('ctx.getEngineVersion', obj);
    return obj;
  },

  /**
  * Returns whether agent is in trial mode.
  * @description  
  * @method  getTrialMode
  * @path    ctx.getTrialMode
  * @return  {boolean} true if agent is in trial mode, false otherwise
  */
 getTrialMode : function () {
  ctx.notifyAction('ctx.getTrialMode');
  var res= false;
  try {
    res = ctx.wkMng.GetTrialMode() === 1 ? true : false;
  } catch(ex) {}  
  return res;
},

 /**
  * Returns enumerated key from a value.
  * @description
  * __Ex.:__
<code javascript>
var key = ctx.getEnumKey(e.socket.status, 2); // key equals 'open'
</code>
  * @method  getEnumKey
  * @path    ctx.getEnumKey
	* @param {Object} enumeration enumerated object
	* @param {*} value value to be searched
  * @return  {string} enumerated key (empty string if not found) 
  */
  getEnumKey : function (enumeration, value) {
    var key = '';
		ctx.each(enumeration, function(id, val) {
			if (value == val) {
				key = id;
				return false;
			}
		});
		return key;
  },

//  /**
//  * Retrieves the object descriptor from the current page or application
//  * @ignore
//  * @method getObjectDescriptor
//  * @path ctx.getObjectDescriptor
//  * @param {ctx.descriptor} [desc] Optional source descriptor object (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
//  * @return {ctx.descriptor} Object descriptor (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
//  */
//  getObjectDescriptor : function (desc) {
//    // global descriptor : return default appli / page
//    if (!desc)
//        desc = new ctx.descriptor();
////    if (ctx.currentPage)
////      desc = ctx.currentPage.getObjectDescriptor(desc);
////    else if (ctx.currentAppli)
////      desc = ctx.currentAppli.getObjectDescriptor(desc);
////    if (desc.appliName == '') {
////      // default host process, in case no ctx.currentEvent is defined (usual if action launched using 'Test code' or 'Page tester')
////      desc = GLOBAL.getObjectDescriptor(desc);
////    }
//    return desc;
//  },

  /** Returns a formatted XML command from a command name and an object containing parameters
  * @description
  * __Ex.:__
<code javascript>
ex. : 'MESSBOX', {PageName: 'pVersion', Type: e.messbox.type.HTMLView, Template: 'Warning', Title: "Contextor - Version", ...}
returns : "<MESSBOX PageName='pVersion' Type='HTMLView' Template='Warning'><_Value>...</_Value></MESSBOX>"
</code>
  * Description
  * @method getXMLSyntax
  * @path ctx.getXMLSyntax
  * @ignore
  * @param {string} command command name ('MESSBOX', 'SETVALUE', 'LOGMESS', ...)
  * @param {Object} [object] command parameters
  * @param {string} [subcommand] optional subcommand as a string
  * @return {string} formatted string
  */
  getXMLSyntax : function (command, object, subcommand) {
    var str = '<' + command,
    val, att;
    // add standard attributes
    for (att in object) {
      if ((typeof object[att] !== 'undefined') && (object[att] != null)) {
        val = String(object[att]);
        if ((typeof val !== 'undefined') && !((val.indexOf('<') != -1) || (val.indexOf('>') != -1) || (val.indexOf('"') != -1) || (val.indexOf('&') != -1)))
          str = str + " " + att + "=\"" + object[att] + "\"";
      }
    }
    str = str + '>';
    // add CData attributes
    for (att in object) {
      if ((typeof object[att] !== 'undefined') && (object[att] != null)) {
        val = String(object[att]);
        if (val && (val !== '') && ((val.indexOf('<') != -1) || (val.indexOf('>') != -1) || (val.indexOf('"') != -1) || (val.indexOf('&') != -1))) {
          var bCData = (val.indexOf('<![CDATA[') == -1);
          str = str + "<_" + att + ">";
          if (bCData)
            str = str + "<![CDATA[";
          str = str + object[att];
          if (bCData)
            str = str + "]]>";
          str = str + "</_" + att + ">";
        }
      }
    }
    if (subcommand)
      str = str + subcommand;
    str = str + '</' + command + '>';
    return str;
  },

  /**
  * Gets or sets the debug mode
  * @description
  * __Ex.:__
<code javascript>
// add a test menu in systray in debug mode only
if (ctx.isDebug()) {
systray.addMenu(...);
}
</code>
  * @method isDebug
  * @deprecated Rather use ctx.options.isDebug
  * @path ctx.isDebug
  * @param {boolean} [value] boolean value to set the debug mode
  * @return {boolean} result true: debug mode | false: release mode
  */
  isDebug : function (value) {
    if (typeof value !== 'undefined')
      ctx.options.isDebug = (value ? true : false);
    return ctx.options.isDebug;
  },

  /**
  * Tests if an object is empty
  * @description
  * __Ex.:__
<code javascript>
// add a test menu in systray in debug mode only
if (ctx.isEmpty(obj)) { ... }
</code>
  * @method isEmpty
  * @path ctx.isEmpty
  * @param {Object} obj object to be tested
  * @return {boolean} result true: empty | false: not empty
  */
  isEmpty : function(obj) {
    for(var i in obj) { return false; } return true;
  },

  /**
  * Returns if project is launched in Studio or standalone mode
  * @description
  * __Ex.:__
<code javascript>
if (ctx.isStudioUsed()) { ... }
</code>
  * @method isStudioUsed
  * @path ctx.isStudioUsed
  * @return {boolean} result true: Studio mode | false: standalone mode
  */
  isStudioUsed : function() {
    return ctx.options.trace.frameworkNotify;
  },

  /**
  * Function used to transcode a source object to a destination object
  * @description
  * __Ex.:__
<code javascript>
var source = {
  Title: 'Inception',
  Released: '16 Jul 2010',
  Director: 'Christopher Nolan',
  Plot: 'A thief, who steals corporate secrets through ...'
};
var dest = {};
ctx.map(source, dest, {
  Title: title,
  Released: date,
  Director: director,
  Plot: details,
})
// --> dest = {
//  title: 'Inception',
//  datez: '16 Jul 2010',
//  director: 'Christopher Nolan',
//  details: 'A thief, who steals corporate secrets through ...'
//};

</code>
  * @method map
  * @path ctx.map
  * @param {*} source source object
  * @param {Object} dest destination object
  * @param {Object} mapping transcoding object
  * @return {Object} destination object
  */
  map : function (source, dest, mapping) {
    dest = dest || {};
    if ((typeof source !== 'object') || (typeof dest !== 'object') || (typeof mapping !== 'object')) {
      throw new Error(e.error.InvalidArgument, "ctx.map : source, dest and mapping should be objects.");
    }
    ctx.each(mapping, function(id, value) {
      if ((source[id] !== undefined) && (source[id] !== null)) dest[value] = source[id];
    });
    ctx.notifyAction('ctx.map');
    return dest;
  },

  /**
  * Function used to trace function calls
  * @description
  * __Ex.:__
<code javascript>
ctx.notifyAction('excel.file.open');
</code>
  * @method notifyAction
  * @path ctx.notifyAction
  * @ignore
  * @param {string} name action name
  * @param {*} [res] function result
  * @param {ctx.descriptor} [desc] object descriptor (application, page, item) (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
  * @param {string} [verb] connector language verb
  * @param {Object} [params] function parameters
  * @param {*} [attributes] optional extra attributes
  * @suppress {es5Strict } warning 'arguments.callee'
  */
  notifyAction : function (name, res, desc, verb, params, attributes) {
    if (ctx.noNotify || ctx.lockNoNotify) {
      ctx.noNotify = false;
      return;
    }
    var forceSave = _forceSave[name];
    if (ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkNotify || ctx.options.trace.recording || forceSave) {
      if (ctx.anonymous) {
        params = null;
        ctx.anonymous = false;
      } else {
        //var params3 = Array.prototype.slice.call(arguments);
        params = params || (arguments.callee.caller.arguments ? Array.prototype.slice.call(arguments.callee.caller.arguments) : null);
      }
      var shortParams = ctx.ctxShort(params);
//      var toto = params.length;
//      var titi = shortParams.length;
//      var txt = '';
//      for (var id in shortParams) {
//        if (txt != '') {
//          txt += ', ';
//        }
//        if (typeof shortParams[id] === 'undefined') {
//          txt += 'undefined';
//        } else if (typeof shortParams[id] === 'string') {
//          txt += ctx.serialize(shortParams[id], true, false);
//        } else if (shortParams[id] instanceof ctx.event) {
//          /** @type {ctx.event} */ var ev = shortParams[id];
//          txt += ev.serialize(false, false);
//        } else {
//          txt += ctx.serialize(shortParams[id], false, false);
//        }
//      }
      var obj = {
        ts: ctx.getTime(),
        ctx:'Action',
        action: name,
        params: ((ctx.options.anonymous || ctx.anonymous) ? null : shortParams),
        result: ((ctx.options.anonymous || ctx.anonymous) ? null : res),
        verb: verb
      };
      ctx.anonymous = false;
      if (ctx.currentParentId > 0) {
        obj.parentId = ctx.currentParentId;
      }
      if (desc) {
        if (desc.appliName) {
          obj.appliName = desc.appliName;
          obj.appliInst = desc.appliInst;
        }
        if (desc.pageName) {
          obj.pageName = desc.pageName;
          obj.pageInst = desc.pageInst;
        }
        if (desc.itemName) {
          obj.itemName = desc.itemFullName;
          if (desc.itemInst > 0) { obj.itemInst = desc.itemInst; }
          if (desc.itemOccurs > 0) { obj.itemOccurs = desc.itemOccurs; }
        }
      }
      try {
        if (attributes && ('object' === typeof attributes)) {
          var shortAttributes = ctx.ctxShort(attributes);
          for (var id in shortAttributes) {
            obj[id] = shortAttributes[id];
          }
        }
      } catch (ex) { }

      ctx.notifyDebug(obj, forceSave);
    }
    if (name) {
      if (ctx.counters.actions[name]) ctx.counters.actions[name] ++; else ctx.counters.actions[name] = 1;
    }
  },

  /**
  * Sends a debug string to Studio Debugger
  * @description
  * __Ex.:__
<code javascript>
var obj = {
  ctx: 'State',
  name: name,
  ...
};
ctx.notifyDebug(obj);
</code>
  * @method notifyDebug
  * @ignore
  * @path ctx.notifyDebug
  * @param {Object} obj
  * @param {boolean} [forceSave] if true, trace is saved in any case
  * @param {boolean} [fileOnly] if true, trace in file and not in Debug flow
  */
  notifyDebug : function (obj, forceSave, fileOnly) {
    if (forceSave || ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkNotify || ctx.options.trace.recording) {
      // add timestamp
      if (!obj.ts)
        obj.ts = ctx.getTime();
      var txt = ctx.serialize(obj, false, false, undefined, true);
      // *** send notifications to Studio Debugger ***
      if (ctx.options.trace.frameworkNotify && (typeof Host !== 'undefined') && (Host.Debug) && (!fileOnly)) {
        Host.Debug.write(txt);
      }
      // *** local serialization in a trace file ***
      if (ctx.engineStarted && (forceSave || ctx.options.trace.autoRecordingStarted || ctx.options.trace.recording) && ctx.options.traceFolder) {
        //if (forceSave || ctx.options.trace.recording)
        if (forceSave)
          ctx.wkMng.CtxtWriteFile(ctx.options.path.log + '\\' + ctx.options.traceFolder + '\\traces.pscl', txt + '\n', true);
        //if (ctx.options.trace.autoRecordingStarted && (!ctx.options.trace.recording))
        if (ctx.options.trace.autoRecordingStarted || ctx.options.trace.recording)
          ctx.wkMng.CtxtWriteFile(ctx.options.path.log + '\\' + ctx.options.traceFolderRecording + '\\traces.pscl', txt + '\n', true);
      }
      if (ctx.options.trace.alternativeTraceFile)
        ctx.wkMng.CtxtWriteFile(ctx.options.trace.alternativeTraceFile, txt + '\n', true);
    }
  },

  /**
  * Function used to trace error
  * @description
  * __Ex.:__
  * <code javascript>
  * ctx.notifyError(data);
  * </code>
  * @method notifyError
  * @path ctx.notifyError
  * @ignore
  * @param {*} data data
  * @param {string} label label
  */
  notifyError : function (data, label) {
    ctx.log(data, e.logIconType.Error, label);
  },

  /**
  * Sends an event to Studio Debugger
  * @description
  * __Ex.:__
<code javascript>
var obj = {
  ctx: 'State',
  name: name,
  ...
};
ctx.notifyEvent(obj);
</code>
  * @method notifyEvent
  * @ignore
  * @path ctx.notifyEvent
  * @param {ctx.event} ev
  * @param {boolean} [fileOnly] if true, trace in file and not in Debug flow
  */
  notifyEvent : function (ev, fileOnly) {
    var obj = {
      ts: ctx.getTime(),
      ctx:          'Event',
      event:        ev.name,
      appliName:    ev.appliName,
      appliInst:    ev.appliInst
    };
    if (ev.pageName) {
      obj.pageName = ev.pageName;
      obj.pageInst = ev.pageInst;
    }
    if (ev.itemName) {
      obj.itemName = ev.itemName;
      obj.itemInst = ev.itemInst;
      if (ev.itemIndex) { obj.itemIndex = ev.itemIndex; }
    }
    if (ev.reqAppliName) {
      obj.reqAppliName = ev.reqAppliName;
      obj.reqAppliInst =  ev.reqAppliInst;
    }
    if (ev.reqEventName) { obj.reqEventName = ev.reqEventName; }
    if (ev.reqItemName) { obj.reqItemName = ev.reqItemName; }
    if (ev.data) { obj.data = ev.data; }

    // add screenshot capture
    if (ctx.options.trace.screenshotTraces && ((ev.name == e.event.page.LOAD) || (ev.name == e.event.page.ACTIVATE))) {
      var traceFolder = ((ctx.options.trace.autoRecordingStarted || ctx.options.trace.recording) ? ctx.options.traceFolderRecording : ctx.options.traceFolder)
      if (ev.page && ev.page.hwnd) {
        var file = ctx.getTimestamp(null, true) + '.png';
        ctx.noNotify = true;
        ctx.screenshot( {
          File: ctx.options.path.log + '\\' + traceFolder + "\\" + file,
          HWND: ev.page.hwnd
        } );
        obj.screenshot = {
          file: file,
          folder: traceFolder,
          hwnd: ev.page.hwnd
        };
      }
    }
    ctx.notifyDebug(obj, false, fileOnly);
  },

 /**
  * Function used to trace informations.
  * @description
  *  __Ex.:__
  *  <code javascript> ctx.notifyInfo( 'desktop', data );</code>
  * @method  notifyInfo
  * @path    ctx.notifyInfo
  * @param   {*} data Data
  * @param   {string} name Label associated with data
  * @param   {string} [filename] Filename in which traces are recorded (if omitted, use the default trace files)
  */
  notifyInfo : function (data, name, filename) {
    ctx.log(data, e.logIconType.Data, name);
  },

  /**
   * @ignore
   * Sends a 'State' event to Studio Debugger
   * @method notifyState
   * @path ctx.notifyState
   * @param {string} type
   * @param {string} name
   * @param {number} id
   * @param {string} action
   * @param {*} [data]
   * @param {string} [parentName]
   * @param {number} [parentId]
   * @param {ctx.application} [parentAppli]
   */
  notifyState : function (type, name, id, action, data, parentName, parentId, parentAppli) {
    if (ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkNotify || ctx.options.trace.recording) {
      var obj = {
        ts: ctx.getTime(),
        ctx: 'State',
        type: type,
        name: name,
        id: id,
        action: action
      };
      if (parentAppli && parentAppli.name) {
        obj.appliName = parentAppli.name;
        if (parentAppli.instance > 0) obj.appliInst = parentAppli.instance;
      }
      if (parentName) {
        obj.parentName = parentName;
      }
      if (parentId) {
        obj.parentId = parentId;
      }
      if (data) {
        obj.data = data;
      }
      ctx.notifyDebug(obj);
    }
  },

onEnginePrestart : function () {
    if ('undefined' !== typeof Host) {
  ctx.root = Host;
    }

  ctx.engineStarted = true;

  // Browser emulation
  ctx.emulateBrowser();

  // Standard paths
  ctx.options.path.log = ctx.context.get('//WkMng_Info/CurrentDir');
  ctx.options.path.local = ctx.context.get('//WkMng_Info/CurrentURL');
  ctx.options.path.bin = ctx.options.path.local;
  ctx.options.path.resources = ctx.options.path.bin;
  ctx.options.path.exec = ctx.context.get('//WkMng_Info/ConteXtorDir');
  ctx.options.path.server = ctx.context.get('//WkMng_Info/ServerURL');
  /** @deprecated use ctx.options.path.log instead of ctx.options.currentDir
  * @ignore
  * @path ctx.options.currentDir */ ctx.options.currentDir = ctx.options.path.log;
  /** @deprecated use ctx.options.path.bin instead of ctx.options.currentURL
  * @ignore
  * @path ctx.options.currentURL */ ctx.options.currentURL = ctx.options.path.bin;
  /** @deprecated use ctx.options.path.exec instead of ctx.options.execDir
  * @ignore
  * @path ctx.options.execDir */ ctx.options.execDir = ctx.options.path.exec;
  /** @deprecated use ctx.options.path.resources instead of ctx.options.resourceURL
  * @ignore
  * @path ctx.options.resourceURL */ ctx.options.resourceURL = ctx.options.path.resources;
  /** @deprecated use ctx.options.path.server instead of ctx.options.serverURL
  * @ignore
  * @path ctx.options.serverURL */ ctx.options.serverURL = ctx.options.path.server;

  // machine and user infos
  ctx.options.computerName = ctx.context.get('//WkMng_Info/ComputerName');
  ctx.options.userName = ctx.context.get('//WkMng_Info/UserCode');
  ctx.options.fullUserName = ctx.context.get('//WkMng_Info/FullUserCode');
  ctx.options.canonicalName = ctx.context.get('//WkMng_Info/CanonicalName');
  ctx.options.displayName = ctx.context.get("//GLOBAL/WkMng_Info/DisplayName");
  ctx.options.fullyQualifiedDN = ctx.context.get("//GLOBAL/WkMng_Info/FullyQualifiedDN");

  // product version (get version from WkMng component)
  ctx.updateProductVersion();

  // no redondancy with variables in Context: PrjVersion, PrjName, ...
  ctx.options.projectVersion = ctx.context.get('//GLOBAL/PrjVersion');
  ctx.options.projectClient = ctx.context.get('//GLOBAL/PrjClient');
  ctx.options.projectName = ctx.context.get('//GLOBAL/PrjName');
  ctx.options.projectDate = ctx.context.get('//GLOBAL/PrjDate');
  ctx.options.projectLabel = ctx.context.get('//GLOBAL/PrjLabel');
  ctx.options.projectComment = ctx.context.get('//GLOBAL/PrjComment');
	try {
	  ctx.options.projectUid = ctx.context.getNode('//PROCESS[@Name="GLOBAL"]').getAttribute('CtxtId');
	} catch (ex) {	}
	
  ctx.options.frameworkVersion = ctx.version(); // SDK version
  ctx.options.JScriptVersion = ctx.getEngineVersion(); // JS Engine version

  // *** Traces levels ***
  var traceLevel = ctx.context.get('//WkMng_Param/WkMng_TraceLevel');

  // *** WkMng trace levels (not modifiable, just for display) ***
  ctx.options.trace.errors = ((traceLevel & 1) ? true : false);
  ctx.options.trace.events = ((traceLevel & 2) ? true : false);
  ctx.options.trace.actions = ((traceLevel & 4) ? true : false);
  ctx.options.trace.actionsFull = ((traceLevel & 8) ? true : false);
  ctx.options.trace.context = ((traceLevel & 16) ? true : false);
  ctx.options.trace.extendPilots = ((traceLevel & 32) ? true : false);
  ctx.options.trace.objects = ((traceLevel & 64) ? true : false);
  ctx.options.trace.windowsEvents = ((traceLevel & 128) ? true : false);
  ctx.options.trace.messageBoxes = ((traceLevel & 256) ? true : false);
  ctx.options.trace.debuggerV2 = ((traceLevel & 512) ? true : false);
  ctx.options.trace.advanced = ((traceLevel & 1024) ? true : false);

  // *** ctx framework trace levels ***
  // Studio debug channel
  ctx.options.trace.frameworkNotify = ((traceLevel & 2048) ? true : false);

  // trace recording
  ctx.options.trace.recording = ctx.options.trace.frameworkTraces = ((traceLevel & 4096) ? true : false);
  ctx.options.trace.screenshotTraces = ((traceLevel & 8192) ? true : false);

  // read options from the command line
  _updateOptions();

  // read options from the options file
  //_updateOptionFile();

  if (ctx.options.trace["frameworkTraces"])
    ctx.options.trace.recording = true; // for compatibility

  // test menu display
  ctx.options.isDebug = (ctx.options.trace.debuggerV2 || ctx.options.trace.frameworkNotify);

  // for compatibility, save data in GLOBAL.data
  /** @deprecated use ctx.options.path.log instead of GLOBAL.data.currentDir
  * @ignore
  * @path GLOBAL.data.currentDir */ GLOBAL.data.currentDir = ctx.options.path.log;
  /** @deprecated use ctx.options.path.bin instead of GLOBAL.data.currentURL
  * @ignore
  * @path GLOBAL.data.currentURL */ GLOBAL.data.currentURL = ctx.options.path.bin;
  /** @deprecated use ctx.options.path.exec instead of GLOBAL.data.execDir
  * @ignore
  * @path GLOBAL.data.execDir */ GLOBAL.data.execDir = ctx.options.path.exec;
  /** @deprecated use GLOBAL.data.path.resources instead of GLOBAL.data.execDir
  * @ignore
  * @path GLOBAL.data.resourceURL */ GLOBAL.data.resourceURL = ctx.options.path.resources;
  /** @deprecated use ctx.options.path.server instead of GLOBAL.data.serverURL
  * @ignore
  * @path GLOBAL.data.serverURL */ GLOBAL.data.serverURL = ctx.options.path.server;

  ctx.noNotify = true;
  ctx.wait(function(ev) {
    ctx.switchOrShutdown(true, false);
  }, 100);
  return false;
},

/** callback called at engine startup : initializes some dynamic variables
* @method onEngineStart
* @path ctx.onEngineStart
* @return {boolean}
* @ignore
*/
onEngineStart : function () {

  ctx.eventTriggered = true;

  // check libraries
  if (ctx.popup === undefined) { ctx.log('ctx.popup library should be included', e.logIconType.Error) ; }
  if (ctx.fso === undefined) { ctx.log('ctx.fso library should be included', e.logIconType.Error) ; }
  if (ctx.wmi === undefined) { ctx.log('ctx.wmi library should be included', e.logIconType.Error) ; }
  if (ctx.wscript === undefined) { ctx.log('ctx.wscript library should be included', e.logIconType.Error) ; }
  if (ctx.diagnostic === undefined) { ctx.log('ctx.diagnostic library should be included', e.logIconType.Error) ; }

  var args;
  while ((args = ctx.pendingEvents.shift()) != undefined) {
    ctx.onEvent.apply(ctx, args);
  }

  ctx.lockNoNotify = true;

  // *** Licence informations ***
  //ctx.options.licence = _readLicence("Interactive");
  //ctx.options.studioLicence = _readLicence("Studio");

// clear old trace folders
  ctx.clearTraceFolder();

  // create a new trace folder
  ctx.reinitTraceFolder(false, true);

  if (ctx.options.trace.recording && ctx.diagnostic) {
    ctx.diagnostic.enableRecording(true, false, true);
  }

  // create local job folder
  var jobFolder = ctx.options.path.log + "\\jobs";
  if (!ctx.fso.folder.exist(jobFolder)) {
    ctx.fso.folder.create(jobFolder);
  }

  setInterval(function() {
    // check every tem minutes if day changed : if true, reinitialize trace folder
    var today = ctx.getTimestamp(null, true).substring(0, 10);
    var currentDay = ctx.options.traceTimestamp.substring(0, 10);
    if (today != currentDay) {
      ctx.reinitTraceFolder(false, true);
    }
    // Collect garbage
    CollectGarbage();
  }, 600000);

  // set deadlock protection (not in Studio mode because of breakpoint interruptions)
  if (!ctx.isStudioUsed()) {
    ctx.setExecutionTimeout();
  }
  ctx.lockNoNotify = false;

  return true;
},

  /** callback called at engine stop
  * @method onEngineStop
  * @path ctx.onEngineStop
  * @ignore
  */
  onEngineStop : function () {
    ctx.setExecutionTimeout(0);
    ctx.engineStarted = false;
    ctx.eventTriggered = false;
    CollectGarbage();
  },

  /** Sets or resets execution timeout \
  * @method setExecutionTimeout
  * @path ctx.setExecutionTimeout
  * @param {number} [timeout] new timeout in ms. It omitted, 'ctx.options.executionTimeout' is used. if < 10000 ms, timeout is reset
  */
  setExecutionTimeout : function (timeout) {
    if (timeout === undefined) {
      timeout = ctx.options.executionTimeout;
    } else if (timeout < 10000) {
      // reset deadlock protection
      timeout = 0xffffffff;
    }
    if (ctxHost && ('undefined' !== typeof ctxHost.SetTimeoutValue)) {
      ctxHost.SetTimeoutValue( timeout );
    }
  },


  /**
  * creates / reinits trace folder and triggers archiving
  * @description
  * __Ex.:__
<code javascript>
ctx.reinitTraceFolder(false, true);
</code>
  * @method reinitTraceFolder
  * @ignore internal use
  * @path ctx.reinitTraceFolder
  * @param {boolean} [copyArchive] copy or send archive
  * @param {boolean} [createNew] create a new trace folder
  * @param {boolean} [recording] create a folder for auto or manual recording
  * @param {boolean} [deleteOld] delete folder for auto recording
  * @param {string} [prefix] optional prefix
  * @return {string} new trace folder path
  */
  reinitTraceFolder : function (copyArchive, createNew, recording, deleteOld, prefix) {
    try {
      var traceFolder = (recording ? ctx.options.traceFolderRecording : ctx.options.traceFolder)
      var oldTraceFolder = traceFolder; // reset trace folder
      prefix = prefix || (recording ? e.trace.type.Record : e.trace.type.Log);
      if (createNew) {
        // create a new trace folder
        ctx._fso = ctx._fso || new ActiveXObject("Scripting.FileSystemObject");
        var ts = ctx.getTimestamp(null, true);
        if (!recording) { ctx.options.traceTimestamp = ts; }
        traceFolder = prefix + '.' + ctx.options.computerName + '.' + ctx.options.userName + '.' + ts;
        if(recording)
          ctx.options.traceFolderRecording = traceFolder;
        else
          ctx.options.traceFolder = traceFolder;
        if (!ctx._fso.FolderExists(ctx.options.path.log + '\\' + traceFolder)) {
          ctx._fso.CreateFolder(ctx.options.path.log + '\\' + traceFolder);
        }
        // notify Studio with the folder name for LOGS
        if (!recording) {
          GLOBAL.notify(GLOBAL.events.evUpdateLogFolder, ctx.options.path.log + '\\' + traceFolder);
        }
        if (typeof ctx.onStartTraceCallback === 'function') {
          ctx.onStartTraceCallback(ctx.options.path.log + '\\' + traceFolder);
        }
      } else {
        if(recording)
          ctx.options.traceFolderRecording = '';
        else
          ctx.options.traceFolder = '';
      }
      // archive previous folder
      if (oldTraceFolder) {
        if (deleteOld) {
          if (ctx._fso.FolderExists(ctx.options.path.log + '\\' + oldTraceFolder)) {
            ctx._fso.DeleteFolder(ctx.options.path.log + '\\' + oldTraceFolder);
          }
        } else {
          if (typeof ctx.onStopTraceCallback === 'function') {
            ctx.onStopTraceCallback(ctx.options.path.log + '\\' + oldTraceFolder, copyArchive);
          }
        }
      }
    } catch (ex) {}
    return traceFolder;
  },

  /** Calculates a color as a RGB value
  * @description
  * __Ex.:__
<code javascript>
var color = ctx.rgb(0xff, 0, 0); // 'red color'
</code>
  * @method rgb
  * @path ctx.rgb
  * @param {number} r red color (0 to 0xff)
  * @param {number} g green color (0 to 0xff)
  * @param {number} b blue color (0 to 0xff)
  * @return {number} RGB value
  */
  rgb : function (r, g, b) {
    return r + g * 0x100 + b * 0x10000;
  },

 /** 
  * @ignore
  * Function called to update product versions.
  * @method  updateProductVersion
  * @path    ctx.updateProductVersion
  */
  updateProductVersion : function() {
    ctx.options.productVersions = {};
    var node = ctx.context.getCtx('//GLOBAL/WkMng_Info/Components');
    if (node && node.childNodes) {
      for (var i = 0; i < node.childNodes.length; i ++) {
        var component = node.childNodes[i].tagName;
        var version = node.childNodes[i].childNodes[1].text || node.childNodes[i].childNodes[0].text; // product version, or file version
        ctx.options.productVersions[component] = version;
      }
    }
    ctx.options.productVersion = ctx.options.productVersions['XsWrkMng2'];
  },

 /**
  * Generates a GUID string.
  * @description
  * __Ex.:__
<code javascript>
var uuid = ctx.uuid( ); // uuid = af8a8416-6e18-a307-bd9c-f2c947bbb3aa
</code>
  * Adapted from Slavik Meltser (slavik@meltser.info). See [[http://slavik.meltser.info/?p=142]]
  * @method   uuid
  * @path     ctx.uuid
  * @returns  {string} The generated GUID.
  */
  uuid : function () {
  /**
    * Generates a GUID sub-string.
    * @method _p8
    * @ignore
    * @param {boolean} [s] true: -xxxx-xxxx, false: xxxxxxxx
    * @returns {string} sub-string
    */
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  },

 /**
  * Returns the ctx framework version.
  * @description
  * __Ex.:__
<code javascript>
var vers = ctx.version(); // '3.0.1'
</code>
  * @method  version
  * @path    ctx.version
  * @return  {string} Framework global version
  */
  version : function () {
    ctx.notifyAction('ctx.version', _coreVersion);
    return _coreVersion;
  },

	restartOnProject : function(packageUid, packageVersionUid) {
		if (ctx.compareVersion('1.0.5.0') < 0) {
			// Agent  < 1.0.5 
				// Write packageVersionUid in registry
				// Restart agent
			ctx.registry.set('Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentProject', packageVersionUid, e.registry.root.CurrentUser);
			ctx.shutdownAgent(true, true);
		}
		else {
			// Agent >= 1.0.5
				// New restart method : call workmanager
			ctx.wkMng.SwitchProject(packageUid, packageVersionUid);
		}
	},
	
 /**
  * Handles Agent shutdown (with or without restart).
  * @method shutdownAgent
  * @path ctx.shutdownAgent
  * @param {boolean} [restart] if true, shutdwon then restart
  * @param {boolean} [waitIdle] if true, waits until there is no running scenario
  * @param {string} [message] popup message (if omitted, no popup displayed)
  * @param {string} [title] popup title
  */
  shutdownAgent : function(restart, waitIdle, message, title) {
    var _shutdownAgent = function(restart, waitIdle) {
      if (ctx.isStudioUsed()) {
        ctx.restartAgent = false;   // no restart in Studio mode
      } else {
        ctx.restartAgent = restart;
      }
      if (waitIdle && !ctx.isEmpty(ctx.runningScenarios.map)) {
        ctx.shutdownOnIdle = true;
        if (typeof ctx.galaxyAPI !== 'undefined') {
          ctx.galaxyAPI.setBusy(true, function(code, label) { });
        }
      } else {
        ctx.registry.set(_runningKey, '');
        if (ctx.restartAgent) {
          ctx.registry.set(_restartingKey, '1');
        }
        GLOBAL.notify(GLOBAL.events.PRESTOPCTX);
      }
    }
    if (!(ctx.popups['pCtxtShutdown'] && (ctx.popups['pCtxtShutdown'] instanceof ctx.popupClass))) {
			// standard Shutdown/Restart/Update popup declaration
			ctx.popup({ pCtxtShutdown: {
				template: e.popup.template.YesNo,
				title: GLOBAL.labels.stopPopup.title,
				CX: 500,
				CY: 200,
				message: '<br/><b>' + GLOBAL.labels.stopPopup.label + '</b><br/>', 
				icon: e.popup.icon64.hello
			}});
		}
    if (message && ctx.options.shutdownConfirmation && (ctx.popups['pCtxtShutdown'] instanceof ctx.popupClass)) {
      ctx.popups["pCtxtShutdown"].open({
        title: title,
        message: '<br/><b>' + message + '</b><br/>'
      }).waitResult(function(res) {
        if (res == e.item.id.Yes) {
          _shutdownAgent(restart, waitIdle);
        }
      });
    } else {
      _shutdownAgent(restart, waitIdle);
    }
  },

 /**
  * Handles Agent shutdown (with or without restart).
  * @method shutdownContextor
  * @deprecated use ctx.shutdownAgent instead
	* @ignore
  * @path ctx.shutdownContextor
  * @param {boolean} [restart] if true, shutdwon then restart
  * @param {boolean} [waitIdle] if true, waits until there is no running scenario
  * @param {string} [message] popup message (if omitted, no popup displayed)
  * @param {string} [title] popup title
  */
  shutdownContextor : function(restart, waitIdle, message, title) {
  	return ctx.shutdownAgent(restart, waitIdle, message, title);
  },

 /**
  * Handles Contextor shutdown (with or without restart)
  * @method switchOrShutdown
  * @path ctx.switchOrShutdown
  * @param {boolean} [onStart] if true, function is called at startup
  * @param {boolean} [onUpdate] if true, function is called for update of current project(s)
  * @return {boolean} false if no change required
  */
  switchOrShutdown : function(onStart, onUpdate) {
    ctx.lockNoNotify = true;
    var autoStart = (ctx.registry.get(_autoStartKey) == '1' ? false : true);
    var confirmStart = (ctx.registry.get(_confirmStartKey) == '1'  ? true : false);
    var restarting = (ctx.registry.get(_restartingKey) == '1'  ? true : false);
    var running = (ctx.registry.get(_runningKey) == '1'  ? true : false);
    var serviceStart = (ctx.registry.get(_serviceStartKey) == '1'  ? true : false);

    ctx.registry.set(_runningKey, '1');
    ctx.registry.set(_restartingKey, '');
    ctx.registry.set(_serviceStartKey, '');


    var projectList = ctx.availableProjects;
    ctx.lockNoNotify = false;

    // called at statup
    if (onStart) {
      if (!(autoStart || serviceStart || restarting || ctx.isStudioUsed())) {
        // auto start disabled, launch at session logon --> shutdown
        ctx.shutdownAgent(false, false);
        return true;
      }
      //if ((!confirmStart) || restarting || running || ctx.options.unattended) {
      if ((!confirmStart) || restarting || running || ctx.options.unattended || ctx.isStudioUsed()) {
        // direct launch (no choice popup)
        ctx.onEngineStart();
        return false;
      }
    } else {
      if (onUpdate && (!ctx.isStudioUsed()) && (ctx.options.unattended || (!confirmStart))) {
        // restart on first project
        //var project = projectList[0];

				// GDLV : ignoring the project to start on
				
//        if ((project) &&
//          ((project.name && ctx.options.projectName && (project.name != ctx.options.projectName)) ||
//          (project.date && ctx.options.projectDate && (project.date != ctx.options.projectDate)) ||
//          (project.version && ctx.options.projectVersion && (project.version != ctx.options.projectVersion)))) {
//          var cmdLineName = project.schedule;
//          var cmdLine = project.args;
//          if (cmdLine && cmdLineName) {
//            ctx.log("Switching to project : " + cmdLineName);
//            ctx.registry.set(_cmdLineKey, cmdLine);
//            ctx.registry.set(_cmdLineNameKey, cmdLineName);
//          }
          ctx.shutdownAgent(true, true);
          return true;
//        }
//        return false;
      }
    }

    var current = 0;
    var options = {};
    if (projectList.length > 0) {
      ctx.each(projectList, function(id, project) {
				var label = project['configurationName'] + ' - ' + project.name + ' - '+ project.version;
        options[id] = label;
        if (project.current) {
          current = id;
        }
      });
    } else {
        options[0] = ctx.options.projectLabel || ctx.options.projectName + ' ' + ctx.options.projectVersion;
    }

    var form = {
      group : []
    }
    if (projectList.length > 0) {
      form.group.push({
        width : 12,
        label : {
          type : e.item.type.label,
          value : "   "
        }
      });
      form.group.push({
        width : 12,
        project : {
          type: e.item.type.select,
          options: options,
          value: current
        }
      });
    }
    var buttons;
    var escape = '';
    var disabled = ctx.isStudioUsed() && (!ctx.options.galaxyAPI.enableStudioRestart);

    if (onStart) {
      buttons = {
        start: {
          label: GLOBAL.labels.buttons.start,
          icon:  e.item.icon.refresh,
          disabled: disabled,
          submit : true,
          type: e.item.style.Orange
        },
        shutdown: {
          label: GLOBAL.labels.buttons.stop,
          icon:  e.item.icon.stop,
          submit : true,
          type: e.item.style.Red
        }
      }
      escape = 'shutdown';
    } else {
      buttons = {
        restart: {
          label: GLOBAL.labels.buttons.restart,
          icon:  e.item.icon.refresh,
          disabled: disabled,
          submit : true,
          type: e.item.style.Orange
        },
        shutdown: {
          label: GLOBAL.labels.buttons.stop,
          icon:  e.item.icon.stop,
          submit : true,
          type: e.item.style.Red
        },
        close: {
          label: GLOBAL.labels.buttons.close,
          icon:  e.item.icon.ok,
          submit : true,
          type: e.item.style.Blue
        }
      }
      escape = 'close';
    }

    if (onUpdate && ctx.isStudioUsed()) {
      return false;
    }

    ctx.popup('pCtxtSwitchShutdown').open({
      template: e.popup.template.NoButton,
      canClose: false,
      //IEHost: true,
      size : "small",
      X: e.popup.position.Center,
      Y: e.popup.position.Center,
      CX: 600,
      CY: 300,
      title: GLOBAL.labels.popup.defaultTitle,
      form: form,
      escape: escape,
      buttons: buttons
    }).waitResult(function(res) {
      // save current values
      //ctx.registry.set(_autoStartKey, (res.autoStart ? "" : "1"));
      //ctx.registry.set(_confirmStartKey, (res.confirmStart ? "1" : ""));
      var project = projectList[res.project];
			if(project)
				ctx.registry.set('Software\\SAP\\Intelligent RPA\\Desktop Agent\\CurrentProject', project.packageVersionUid, e.registry.root.CurrentUser, e.registry.type.String);
      if (res.button == 'restart') {
        if ((res.project != current) && project) {
          //var cmdLineName = project.schedule;
          //var cmdLine = project.args;
          //if (cmdLine && cmdLineName) {
          //  ctx.log("Switching to project : " + cmdLineName);
          //  ctx.registry.set(_cmdLineKey, cmdLine);
          // ctx.registry.set(_cmdLineNameKey, cmdLineName);
          //}
        } else if (onStart) {
          ctx.onEngineStart();
        }
        ctx.shutdownAgent(true, true);
      } else if (res.button == 'shutdown') {
        ctx.shutdownAgent(false, true);
      }
    });
    return false;
  }

  };
  return self;
})();

/**
 * Generic iterator function, used to iterate inside objects or arrays
 * @description
 * __Ex.:__
<code javascript>
 ctx.each( [ 'val1', 'val2', 'val3' ], function( value, index ) {
 // called successively with [index=0, value='val1'], [index=1, value='val2'], [index=2, value='val3']
 } );
 ctx.each( { name:'Ford', firstname:'John' }, function( value, index ) {
 // called successively with [index='name', value='Ford'], [index='firstname', value='John']
 } );
</code>
* @method  each
* @path    ctx.each
* @param   {*} obj Object to be enumerated
* @param   {function(string,*)} func Function to be called for each enumeration. First argument is the key, second argument is the value.
*/
ctx.each = function (obj, func) {
  var itemCount = 0;
  var en;
  var res;
  var hasEnumerator = (('undefined' === typeof(Enumerator)) ? false : true);
  if (obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      // It's an array, loop through it
      for (var i = 0; i < obj.length; i++) {
        res = func(String(i), obj[i]);
        if (res === false) break;
      }
    } else if (hasEnumerator && (obj instanceof Enumerator)) {
      // It's an Enumerator
      en = obj;
    } else if (obj instanceof Object) {
      // It's a JS object
      for (var x in obj) {
        if (typeof obj[x] !== 'function') {
          res = func(x, obj[x]);
          if (res === false) break;
        }
      }
    } else if (hasEnumerator) {
      // It's not a JS object, probably ActiveX or native object: make it an Enumerator
      en = new Enumerator(obj);
    }
    if (en) {
      en.moveFirst();
      while (en.atEnd() === false) {
        res = func(String(itemCount), en.item());
        if (res === false) break;
        en.moveNext();
        itemCount++;
      }
    }
  }
};

 /**
  * @ignore
  * @typedef {{
  *    valid: boolean,
  *    index: (number|undefined),
  *    count: number,
  *    key: (string|undefined),
  *    value: (*|undefined)
  * }}
  */
  ctx.iteratorParams = {
    valid: false,
    index: -1,
    count: 0,
    key: '',
    value: undefined
  };

/**
 * @ignore
 * Class used to iterate inside objects or arrays
 * @deprecated use ctx.array instead of ctx.iterator
 * @class ctx.iterator
 * @path ctx.iterator
 * @param {*} [obj] object to be enumerated
 */
ctx.iterator = function (obj) {
  /** @type {number} */ var _index = -1;
  /** @type {number} */ var _count = 0;
  /** @type {Array<string>} */ var _keys = [];
  /** @type {Object} */ var _data = {};
  var self = {

   /**
    * @ignore
    * Returns the count of elements
    * @method count
    * @path ctx.iterator.count
    * @return {number}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator([
  { search: 'Interstellar' },
  { search: 'Pulp Fiction' },
  ...
]);
var count = jobs.count();
</code>
    */
    count: function() {
      return _count;
    },

   /**
    * @ignore
    * Returns the current element
    * @method current
    * @path ctx.iterator.current
    * @param {number} [index] iteration index. If omitted, get current index. If mentioned, set the current index and returns iteration
    * @return {ctx.iteratorParams}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator([
  { search: 'Interstellar' },
  { search: 'Pulp Fiction' },
  ...
]);
var it = jobs.current();
// it = {
//   valid: true,
//   index: 0,
//   count: 5,
//   key: 0,
//   value: { search: 'Interstellar' }
// }
</code>
    */
    current: function(index) {
      if (index !== undefined) {
        if (index >= _count) {
          _index = _count;
        } else if (index < 0) {
          _index = -1;
        } else {
          _index = index;
        }
      }
      if ((_index >= _count) || (_index < 0))
        return { valid: false, index: _index, count: _count, key: undefined, value: undefined}
      else
        return { valid: true, index: _index, count: _count, key: _keys[_index], value: _data[_keys[_index]]}
    },

   /**
    * @ignore
    * Returns if the current element is valid
    * @method currentValid
    * @path ctx.iterator.currentValid
    * @return {*}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
if (jobs.currentValid()) { ... }
</code>
    */
    currentValid: function() {
      return ( ((_index < _count) && (_index >= 0)) ? true : false );
    },

   /**
    * @ignore
    * Returns the value of the current element
    * @method currentValue
    * @path ctx.iterator.currentValue
    * @return {*}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
var val = jobs.currentValid();
</code>
    */
    currentValue: function(index) {
      return ( ((_index < _count) && (_index >= 0)) ? _data[_keys[_index]] : undefined );
    },

   /**
    * @ignore
    * Returns the value of a random element
    * @method getRandomValue
    * @path ctx.iterator.getRandomValue
    * @return {*}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
var val = jobs.getRandomValue();
</code>
    */
    getRandomValue: function() {
      var index = Math.floor ( Math.random () * _count );
      var it = self.current(index);
      //ctx.log(index + " / " + _count, e.logIconType.Info, it);
      return it.value;
    },

   /**
    * @ignore
    * Sets the iterator index to the beginning
    * @method begin
    * @path ctx.iterator.begin
    * @return {*}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
jobs.begin();
</code>
    */
    begin: function() {
      return self.current(-1);
    },

   /**
    * @ignore
    * Sets the iterator index to the end
    * @method end
    * @path ctx.iterator.end
    * @return {*}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
jobs.end();
</code>
    */
    end: function() {
      return self.current(_count);
    },

   /**
    * @ignore
    * Sets the iterator index to the next element
    * @method next
    * @path ctx.iterator.next
    * @return {ctx.iteratorParams}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
jobs.next();
</code>
    */
    next: function() {
      if (_index < _count) _index ++;
      return self.current();
    },

   /**
    * @ignore
    * Removes and returns the last element in the iterator
    * @method pop
    * @path ctx.iterator.pop
    * @return {Object} deleted object
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
var it = jobs.pop();
</code>
    */
    pop: function() {
      var obj = null;
      if (_count > 0) {
        _count --;
        obj = _data[_count];
        delete _data[_count];
        _keys.pop();
        if (_index > _count) _index = _count;
      }
      return obj;
    },

   /**
    * @ignore
    * Sets the iterator index to the previous element
    * @method previous
    * @path ctx.iterator.previous
    * @return {ctx.iteratorParams}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
var it = jobs.previous();
</code>
    */
    previous: function() {
      if (_index >= 0) _index --;
      return self.current();
    },

   /**
    * @ignore
    * Adds an element to the iterator
    * @method push
    * @path ctx.iterator.push
    * @param {*} [value]
    * @return {number} new index
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
var val = 'my value'
jobs.push(val);
</code>
    */
    push: function(value) {
      if (value === undefined) value = null;
      _data[_count] = value;
      _keys.push(String(_count));
      _count ++;
      return _count;
    },

   /**
    * @ignore
    * Sets the iterator with a new oject (or to an empty iterator if object is omitted)
    * @method set
    * @path ctx.iterator.set
    * @param {*} [obj] object to reinitialize the iterator
    * @return {boolean}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
jobs.set([
  'value 1',
  'value 2',
  'value 3'
]);
</code>
    */
    set: function(obj) {
      var res = false;
      _data = {};
      _index = -1;
      _count = 0;
      _keys = [];
      if (obj && ('object' === typeof obj)) {
        ctx.each(obj, function(id, value) {
          _data[id] = value;
          _keys.push(id);
        });
        _count = _keys.length;
      }
      res = (_count > 0);
      return res;
    },

   /**
    * @ignore
    * Resizes the iterator with a new size
    * @method resize
    * @path ctx.iterator.resize
    * @param {number} size
    * @param {*} [defval] default value
    * @return {boolean}
    * @description
    * __Ex.:__
<code javascript>
var jobs = ctx.iterator(...);
jobs.resize(10);
</code>
    */
    resize: function (size, defval) {
      var delta = _count - size;
      while (delta > 0) { self.pop(); delta--; }
      while (delta < 0) { self.push(defval); delta++; }
      return true;
    }
  }
  self.set(obj);
  return self;
};

/**
* Merges a value or set of values in the data object
* @description
* __Ex.:__
* <code javascript>
* GLOBAL.data.set( { name:'Ford', firstname:'John' } ); // adds 'name' and 'firstname' attributes in GLOBAL.data
* </code>
* @method set
* @path ctx.set
* @param {*} data object or string containing data to be set
* @param {Object} target object (or application) to be modified
* @param {string} [path] target path or object
* @param {e.data.format} [format] data format type (see [[:lib:common:ctx.enum#enumeration_edataformat|e.data.format]])
* @param {e.data.initType} [initType] data initialisation type (see [[:lib:common:ctx.enum#enumeration_edatainitType|e.data.initType]])
* @param {e.data.pathType} [pathType] data path type (default is 'e.data.pathType.XPath')\\ (see [[:lib:common:ctx.enum#enumeration_edatapathType|e.data.pathType]])
* @param {boolean} [locked] if 'true', no new attribute can be added
* @param {number} [level] max recursive level
* @param {boolean} [isShort] if 'true', serialize a sort description
* @return {*} destination object after modification
*/
ctx.set = function (data, target, path, format, initType, pathType, locked, level, isShort) {
  /**
  * Merges an object in a given object
  * __Note:__ this function is inspired from **jQuery.extend()** ([[https://api.jquery.com/jquery.extend/]])
  * @ignore
  * @method _set
  * @param {*} data object or string containing data to be set
  * @param {Object} target object (or application) to be modified
  * @param {number} [level] max recursive level
  * @param {boolean} [locked] if 'true', no new attribute can be added
  * @param {boolean} [isShort] if 'true', serialize a sort description
  * @return {Object} destination object after modification
  */
  var _set = function (data, target, level, locked, isShort) {
    var copyIsArray;
    if (level === undefined) level = 10;
    if (data) {
      var properties;
      if (isShort && ('function' === typeof data.ctxShort)) {
        properties = data.ctxShort();
      }
      level--;
      if (properties) {
        ctx.each(properties, function(index, property) {
          if (!(locked && ('undefined' === typeof target[property])))
            target[property] = data[property];
        });
      } else {
        var targetArray = Array.isArray(target);
        ctx.each(data, function(id, value) {
          // anti loop
          if ( value === target[id]) {
            return true;
          }
          if (targetArray) {
            target.push(value);
            return true;
          }
          if (locked && ('undefined' === typeof target[id])) {
            return true;
          }
          if ( value && ((copyIsArray = Array.isArray( value)) || (typeof  value === "object"))) {
            if ((typeof target[id] !== "object" && typeof target[id] !== "function")) {
              if (copyIsArray) {
                copyIsArray = false;
                if (!(target[id] && Array.isArray(target[id])))
                  target[id] = [];
              } else {
                if (!(target[id] && (typeof target[id] === "object")))
                  target[id] = {};
              }
            }
            if (level > 1) {
              _set(value, target[id], level, locked, isShort);
            }
          } else {
            if (value !== undefined) {
              target[id] = value;
            }
          }
        });
      }
    }
    return target;
  }

  var parentAppli = null;
  var targetObject = null;
  var res;
  var sPath = path || '';

  if (target && target.data) {
    parentAppli = target;
    targetObject = target.data;
  } else {
    targetObject = target;
  }
  if (typeof targetObject !== 'object') {
    throw new Error(e.error.InvalidArgument, 'ctx.set: target should be an object');
  }

  if (sPath) {
    switch (pathType) {
      case e.data.pathType.JsonPath :
        throw new Error(e.error.NotImplemented, 'ctx.set: \'JsonPath\' type is not implemented');
        break;
      case e.data.pathType.SQLPath :
        throw new Error(e.error.NotImplemented, 'ctx.set: \'SQLPath\' type is not implemented');
        break;
      case e.data.pathType.XPath :
      default :
        if (typeof format == 'undefined') {
          if (typeof data === 'string')
            format = e.data.format.text;
          else if (typeof data === 'object')
            format = e.data.format.js;
        }
        var obj = {}; // data to be inserted
        /** @type {string} */ var sData = '';
        if (format == e.data.format.js) {
          if (typeof data !== 'object') {
            throw new Error(e.error.InvalidArgument, 'ctx.set: input should be an object');
          }
          obj = data;
        } else {
          if (typeof data === 'object') {
            throw new Error(e.error.InvalidArgument, 'ctx.set: input should be a simple type: string, number, ...');
          }
          sData = String(data);
        }

        if (parentAppli) {
          if (sPath.startsWith('/'))
          {
            // absolute XPath in the global data object
            targetObject = ctx.data;
          }
        }

        var bCreate = true; // force creation if node does not exist
        var bRemove = false;
        switch (initType) {
          case e.data.initType.DEL:
            bRemove = true;
            break;
          case e.data.initType.ADD:
            throw new Error(e.error.NotImplemented, 'ctx.set: e.data.initType.ADD type is not implemented');
            break;
          case e.data.initType.CREATE:
            // only create the node if it does not exist
            if (ctx.exist(targetObject, sPath, pathType))
              return targetObject;
            break;
          case e.data.initType.CRINIT:
          default:
            break;
        }

        switch (format) {
          // *** source is a context node ***
          case e.data.format.ctx:
          case 'CTX':
            if (sData) {
              if (sData.indexOf('/') != 0)
              {
                // use a data template
                if (parentAppli && parentAppli.dataTemplates && parentAppli.dataTemplates[sData]) {
                  obj = parentAppli.dataTemplates[sData];
                  if (!obj)
                    throw new Error(e.error.InvalidArgument, 'ctx.set: unkown data template : \'' + sData + '\'');
                } else {
                  throw new Error(e.error.InvalidArgument, 'ctx.set: invalid data template : \'' + sData + '\'');
                }
              }
              else
              {
                obj = ctx.json.searchXPath(targetObject, sData);
              }
            }
            res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
            return res;
            break;
          // *** source is an external XML or JSON file ***
          case e.data.format.xmlURL:
          case e.data.format.jsonURL:
          case 'URL':
            if (sData) {
              ctx.ajax.call({
                url: sData,
                async: false,
                contentType: (format == e.data.format.jsonURL ? e.ajax.content.json : e.ajax.content.xml ),
                success: function(res, status, xhr) {
                  try {
                    if (format == e.data.format.jsonURL) {
                      // res contains a string with XML data
                      obj = ctx.json.parse(res);
                      res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
                      return res;
                    } else {
                      // res contains a string with XML data
                      obj = ctx.xml.xml2object(res);
                      res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
                      return res;
                    }
                  } catch (ex) {
                    throw new Error(e.error.InvalidArgument, 'ctx.set: invalid data file : \'' + sData + '\'');
                  }
                },
                error: function(xhr, status, statusText) {
                  throw new Error(e.error.InvalidArgument, 'ctx.set: file could not be loaded : \'' + sData + '\'');
                }
              });
            }
            break;
          // *** source is a JSON string ***
          case e.data.format.json:
            if (sData) {
              try {
                obj = ctx.json.parse(sData);
                res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
                return res;
              } catch (ex) {
                throw new Error(e.error.InvalidArgument, 'ctx.set: input should be a JSON string');
              }
            }
            break;
          // *** source is an XML string ***
          case e.data.format.xml:
          case 'XML':
            if (sData) {
              try {
                obj = ctx.xml.xml2object(sData);
                res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
                return res;
              } catch (ex) {
                throw new Error(e.error.InvalidArgument, 'ctx.set: input should be an XML string');
              }
            }
            break;
          // *** source is a JS object or raw text ***
          case e.data.format.js:
          case e.data.format.text:
          default:
            obj = data;
            res = ctx.json.searchXPath(targetObject, sPath, obj, bCreate, bRemove);
            return res;
            break;
        }
        break;
    }
  } else {
    // *** standard 'set' mode ***
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        if (!(target && Array.isArray(target))) {
          target = [];
        } else if (!(target && (typeof target === 'object'))) {
          target = {};
        }
      }
      targetObject = _set(data, targetObject, level, locked, isShort);
    } else {
      /** @type {*} */var tObj = targetObject;
      tObj = data;
    }
  }
  return targetObject;
}

//ctx.fn = ctx.prototype = {
//  constructor: ctx
//};

///**
// * Module extension function
// * __Note:__ this function is directly inspired from **jQuery.extend()** ([[https://api.jquery.com/jquery.extend/]])
// * @ignore
// * @method extend
// * @path ctx.extend
// * @param {...*} args
// * @return {Object} target
// */
//ctx.extend = function (args) {
////ctx.extend = ctx.fn.extend = function (args) {
//  var options, name, src, copy, copyIsArray, clone,
//    target = arguments[0] || {},
//    i = 1,
//    length = arguments.length,
//    deep = false;
//  // Handle a deep copy situation
//  if (typeof target === "boolean") {
//    deep = target;
//    target = arguments[1] || {};
//    // skip the boolean and the target
//    i = 2;
//  }
//  // Handle case when target is a string or something (possible in deep copy)
//  if (typeof target !== "object" && typeof target !== "function") {
//    target = {};
//  }
//  // extend ctx itself if only one argument is passed
//  if (length === i) {
//    target = this;
//    --i;
//  }
//  for (i = 0; i < length; i++) {
//    // Only deal with non-null/undefined values
//    if ((options = arguments[i]) !== null) {
//      // Extend the base object
//      for (name in options) {
//        src = target[name];
//        copy = options[name];
//        // Prevent never-ending loop
//        if (target === copy) {
//          continue;
//        }
//        // Recurse if we're merging plain objects or arrays
//        if (deep && copy && ((typeof copy === "object") || (copyIsArray = Array.isArray(copy)))) {
//          if (copyIsArray) {
//            copyIsArray = false;
//            clone = src && Array.isArray(src) ? src : [];
//          } else {
//            clone = src && (typeof src === "object") ? src : {};
//          }
//          // Never move original objects, clone them
//          target[name] = ctx.extend(deep, clone, copy);
//        // Don't bring in undefined values
//        } else if (typeof copy !== 'undefined') {
//          target[name] = copy;
//        }
//      }
//    }
//  }
//  // Return the modified object
//  return target;
//};

/**
* Emulated WkMng object, only for testing in a Web browser
* @path ctx.ICtxWkMng
* @class ctx.ICtxWkMng
* @ignore
* @constructor
*/
ctx.ICtxWkMng = function () {
  this.WkMgTrtEvent = function (AppliName, Event, ObjectName, ControlName, Data, lIdInstanceAppli, lIdInstanceObjet, lIdInstanceItem, pdispOiApp, ReqPrjName, reqAppliName, reqEventName, reqItemName, lReqIdInstanceAppli) { return ""; }
  this.WkMgTrtEvent2 = function (AppliName, Event, ObjectName, ControlName, lControlIndex, Data, lIdInstanceAppli, lIdInstanceObjet, lIdInstanceItem, pdispOiApp, ReqPrjName, reqAppliName, reqEventName, reqItemName, lReqIdInstanceAppli) { return ""; }
  this.WkMgLog = function (Message, lType) { return ""; }
  this.WkMgLogErrSys = function (Message, ler, lerr) { return ""; }
  this.WkMgSelSingleNode = function (queryString) { return ""; }
  this.WkMgNotify = function (CtxName, AppliName, Event, ObjetName, ControlName, lControlIndex, Data, lIdInstanceAppli, lIdInstanceObjet, lIdInstanceItem, pdispOiApp) { return ""; }
  this.CtxtAction = function (Action, AppliName, PageName, Item, lItemIndex, DataIn, lIdAppliInst, lIdPageInst, lIdItemInst) {
    ctx.log("CtxtAction: " + Action + '|' + AppliName + '(' + lIdAppliInst + ').' + PageName + '(' + lIdPageInst + ')' + (Item !== '' ? '.' + Item + (lIdItemInst ? '(' + lIdItemInst + ')' : '') + (lItemIndex ? '[' + lItemIndex + ']' : '') : '') + '|' + DataIn);
    return "";
  }
  this.CtxtActionApp = function (Action, AppliName, PageName, P1, P2, P3, P4, P5, lIdAppliInst, lIdPageInst, lIdItemInst) {
    ctx.log("CtxtActionApp: " + Action + '|' + AppliName + '(' + lIdAppliInst + ').' + PageName + '(' + lIdPageInst + ')|' + P1 + '|' + P2 + '|' + P3 + '|' + P4 + '|' + P5 + '|' + lIdItemInst);
    return "";
  }
  this.CtxtVerbExec = function (Command, AppliName, PageName, lIdAppliInst, lIdPageInst) {
    ctx.log("CtxtVerbExec: " + Command + '|' + AppliName + '(' + lIdAppliInst + ').' + PageName + '(' + lIdPageInst + ')');
    return "";
  }
	
	this.CtxtLogTick = function () { return ""; }
  this.CtxtLogTime = function (vChrono, Mess) { return ""; }
  this.CtxtWriteFile = function (File, Text, vbEnd) { return ""; }
  this.CtxtCreateObj = function (Object) { return ""; }
  /**
   * Description
   * @ignore
   * @method CtxtGetVal
   * @path ctx.ICtxWkMng
   * @param {string} variable
   * @param {string} nodeCtx
   * @param {string} idApp
   * @param {Object} [pResult]
   * @return {string} result
   */
  this.CtxtGetVal = function (variable, nodeCtx, idApp, pResult) { return ""; }
  /**
   * Description
   * @ignore
   * @method CtxtSetVal
   * @param {string} variable
   * @param {string} value
   * @param {string} nodeCtx
   * @param {string} idApp
   * @param {Object} [pResult]
   * @return {string} result
   */
  this.CtxtSetVal = function (variable, value, nodeCtx, idApp, pResult) { return ""; }
  /**
   * Description
   * @ignore
   * @method CtxtGetCtx
   * @param {string} variable
   * @param {string} nodeCtx
   * @param {string} idApp
   * @param {Object} [pResult]
   * @return {string} result
   */
  this.CtxtGetCtx = function (variable, nodeCtx, idApp, pResult) { return ""; }
  /**
   * Description
   * @ignore
   * @method CtxtSetCtx
   * @param {string} ctxt
   * @param {string} iAction
   * @param {string} model
   * @param {string} iModel
   * @param {string} nodeCtx
   * @param {string} idApp
   * @param {Object} [pResult]
   * @return {string} result
   */
  this.CtxtSetCtx = function (ctxt, iAction, model, iModel, nodeCtx, idApp, pResult) { return ""; }
  /**
   * Description
   * @ignore
   * @method CtxtDelCtx
   * @param {string} variable
   * @param {string} nodeCtx
   * @param {string} idApp
   * @param {Object} [pResult]
   * @return {string} result
   */
  this.CtxtDelCtx = function (variable, nodeCtx, idApp, pResult) { return ""; }
  /**
   * Description
   * @ignore
   * @method CtxtAddBloc
   * @param {string} ctxt
   * @param {string} model
   * @param {string} iModel
   * @param {string} [nodeCtx]
   * @param {string} [idApp]
   * @param {Object} [pResult]
   * @return {string} result
   */
  this.CtxtAddBloc = function (ctxt, model, iModel, nodeCtx, idApp, pResult) { return ""; }
  /**
   * Description
   * @ignore
   * @method WkMgGetPscNode
   * @param {string} pilote
   * @param {Object} [pResult]
   * @return {string} result
   */
  this.WkMgGetPscNode = function (pilote, pResult) { return ""; }
  /**
   * Description
   * @ignore
   * @method WkMgMessErr
   * @param {string} pilot
   * @param {string} func
   * @param {string} code
   * @param {string} error
   * @param {Object} lMess
   * @return {string} result
   */
  this.WkMgMessErr = function (pilot, func, code, error, lMess) { return ""; }
  /**
   * Description
   * @ignore
   * @method CryptProtect
   * @param {string} input
   * @param {string} [password]
   * @return {string} result
   */
  this.CryptProtect = function (input, password) { return ""; }
  /**
   * Description
   * @ignore
   * @method CryptUnprotect
   * @param {string} input
   * @param {string} [password]
   * @return {string} result
   */
  this.CryptUnprotect = function (input, password) { return ""; }
  this.CryptEncryptStringToFile = function (inputString, outputFile, password) { return ""; }
  this.CryptDecryptFileToString = function (inputFile, password) { return ""; }
  this.CryptEncryptFileToFile = function (inputFile, outputFile, password) { return ""; }
  this.CryptDecryptFileToFile = function (inputFile, outputFile, password) { return ""; }
  this.CryptEncryptMessage = function (input, store, certificate) { return ""; }
  this.CryptDecryptMessage = function (input, store, certificate) { return ""; }
  this.CryptSignMessage = function (input) { return ""; }
  this.CryptVerifyMessage = function (input) { return ""; }
  this.SendTxtMsgToSocket = function (txt) { return ""; }
  };

/**
 * The wkMng object :
 *   - if executed in Contextor engine, set it to a WkMng object
 *   - if executed in a test Web page, set it to a dummy emulation object
 * @ignore
 * @method wkMng
 * @path ctx.wkMng
 * @return {ctx.ICtxWkMng}
 */
ctx.wkMng = (
/** @suppress {checkTypes}  */
function()
{
  // real (Interactive engine) or emulated (IE browser) object
  /** @type {ctx.ICtxWkMng} */
  var _wkMng = null;
  if (!_wkMng) {
    if (typeof Contextor !== 'undefined') {
      _wkMng = Contextor;
    } else if (typeof ctx.ICtxWkMng !== 'undefined') {
      _wkMng = new ctx.ICtxWkMng();
    }
  }
  return _wkMng;
})();


/**
* Object describing an object position and size (X, Y, CX, CY, ...)
* @class ctx.position
* @path ctx.position
* @param {number} [x] object left position (relative to screen)
* @param {number} [y] object top position (relative to screen)
* @param {number} [cx] object width
* @param {number} [cy] object height
* @param {number} [x2] object left position (relative to parent window)
* @param {number} [y2] object top position (relative to parent window)
* @param {number} [hwnd] handle of the parent window
* @constructor
*/
ctx.position = function (x, y, cx, cy, x2, y2, hwnd) {
  /** class type
  * @ignore
  * @const
  * @path ctx.position.ctxType
  * @property {string} */ this.ctxType = 'ctx.position';
  /** object left position (relative to screen)
  * @path ctx.position.x
  * @property {number} */ this.x = x || 0;
  /** object top position (relative to screen)
  * @path ctx.position.y
  * @property {number} */ this.y = y || 0;
  /** object width
  * @path ctx.position.cx
  * @property {number} */ this.cx = cx || 0;
  /** object height
  * @path ctx.position.cy
  * @property {number} */ this.cy = cy || 0;
  /** object left position (relative to parent window)
  * @path ctx.position.x2
  * @property {number} */ this.x2 = x2 || 0;
  /** object top position (relative to parent window)
  * @path ctx.position.y2
  * @property {number} */ this.y2 = y2  || 0;
  /** handle of the parent window
  * @path ctx.position.hwnd
  * @property {number} */ this.hwnd = hwnd || 0;
};

/**
* Object describing an object (application, page, item), with given names and instances
* @class ctx.descriptor
* @advanced
* @path ctx.descriptor
* @constructor
*/
ctx.descriptor = function () {
  /** class type
  * @ignore
  * @const
  * @path ctx.descriptor.ctxType
  * @property {string} */ this.ctxType = 'ctx.descriptor';

  /** application or process object
  * @path ctx.descriptor.appli
  * @property {ctx.application} */ this.appli = null;

  /** application or process instance
  * @path ctx.descriptor.appliInst
  * @property {number} */ this.appliInst = -1;

  /** application or process name
  * @path ctx.descriptor.appliName
  * @property {string} */ this.appliName = "";

  /** object name
  * @path ctx.descriptor.name
  * @property {string} */ this.name = "";

  /** occurence list for multi-dimension items
  * @path ctx.descriptor.index
  * @property {Array<string>} */ this.index = [];

  /** item object
  * @path ctx.descriptor.item
  * @property {ctx.item} */ this.item = null;

  /** item full name (including occurences or prefix)
  * @path ctx.descriptor.itemFullName
  * @property {string} */ this.itemFullName = ""; // item name including occurences (item[...][...])

  /** item instance
  * @path ctx.descriptor.itemInst
  * @property {number} */ this.itemInst = 0;

  /** item name
  * @path ctx.descriptor.itemName
  * @property {string} */ this.itemName = "";

  /** item occurence level
  * @path ctx.descriptor.itemOccurs
  * @property {number} */ this.itemOccurs = 0;

  /** object nature
  * @path ctx.descriptor.nature
  * @property {string} */ this.nature = "";

  /** page object
  * @path ctx.descriptor.page
  * @property {ctx.page} */ this.page = null;

  /**  page instance
  * @path ctx.descriptor.pageInst
  * @property {number} */ this.pageInst = -1;

  /** page name
  * @path ctx.descriptor.pageName
  * @property {string} */ this.pageName = "";

  /** object type : application, page, item, ...
  * @path ctx.descriptor.type
  * @property {string} */ this.type = "";

  /** [Internal usage]
   * Returns the short description for serialization
   * @ignore
   * @method ctxShort
   * @path ctx.descriptor.ctxShort
   */
  this.ctxShort = function() {
    return ['ctxType', 'type', 'name', 'appliName', 'appliInst', 'pageName', 'pageInst', 'itemName', 'itemInst', 'itemOccurs', 'index'];
  }
};

  /** Map of ctx.dataManager templates
  * @path ctx.dataManagers
  * @class ctx.dataManagers
  * @type {Object}
  */
  ctx.dataManagers = {
    /** Instanciates and initializes a dataManager object
    * @description
    * __Ex.:__
<code javascript>
MyAppli.on({ evCRMELIGetData: function(ev) {
// create a dataManager, unserialized from the received event
var data = ctx.dataManagers.create(ev.data);
...
}});
</code>
    * @method create
    * @path ctx.dataManagers.create
    * @param {*} data object with initialized values
    * @return {Object|ctx.dataClass} data object
    */
    create : function (data) {
      var obj;
      if (data && data.ctxName) {
        var id = data.ctxName;
        var tId = id.split('.');
        var root = ctx.dataManagers;
        while (tId.length > 1) {
          var category = tId.shift();
          if (root[category]) {
            root = root[category];
          }
        }
        id = tId.shift();
        if (root[id] && (typeof root[id].create  === 'function')) {
          obj = root[id].create(data, true);
        }
      }
      if (!obj) {
        var name = '';
        if (data instanceof ctx.dataClass) { name = data.ctxName; }
        throw new Error(e.error.InvalidArgument, 'ctx.dataManagers.create: unknown data model: ' + name);
      }
      return obj;
    }
  };


  /**
  * Class used to manage data objects
  *
  * __Ex.:__
<code javascript>
ctx.dataManager({ticket : {
  id: '',
  priority: '',
  description: '',
  assigned: '',
  ...
}});
</code>
  * @description
  * @class ctx.dataManager
  * @path ctx.dataManager
  * @constructor
  * @param {ctx.dataClass|Object|string} [obj] object for initialization
  * @param {boolean} [locked] if 'true', no attribute can be added after initialization
  * @suppress {checkTypes}
  * @return {ctx.dataClass} dataManager object
  */
  ctx.dataManager = function (obj, locked) {
    var dataManager = null;
    if (obj instanceof ctx.dataClass) {
      dataManager = obj.create();
    } else if (obj && (typeof (obj) === 'object')) {
      ctx.each(obj, function(id, value) {
        var name = id;
        var tId = id.split('.');
        var root = ctx.dataManagers;
        while (tId.length > 1) {
          var category = tId.shift();
          if (!root[category]) { root[category] = {}; }
          root = root[category];
        }
        id = tId.shift();
        if (!root[id]) {
          if (typeof (value) === 'object') {
            root[id] = new ctx.dataClass(value, name, locked); // create new
            dataManager = root[id];
          }
        } else {
          dataManager = root[id].create();
        }
      });
    } else if (typeof (obj) === 'string') {
      var id = obj;
      var name = id;
      var tId = id.split('.');
      var root = ctx.dataManagers;
      while (tId.length > 1) {
        var category = tId.shift();
        if (!root[category]) { root[category] = {}; }
        root = root[category];
      }
      id = tId.shift();
      if (!root[name]) {
        root[id] = new ctx.dataClass({}, name, false); // create new
        dataManager = root[id];
      } else {
        dataManager = root[name].create();
      }
    } else {
      //var name = 'dataManager_' + ctx.uuid();
      dataManager = new ctx.dataClass({}, '', false); // create a new empty dataManager
    }
    return dataManager;
  };

/**
  * Class to store free data in objects
  * @class ctx.dataClass
  * @path ctx.dataClass
  * @advanced
  * @constructor
  * @param {ctx.dataClass|Object} [obj] optional object or dataManager for initialization
  * @param {string} [name] class name (if omited, a unique name is generated)
  * @param {boolean} [locked] if 'true', no attribute can be added after initialization
  */
  ctx.dataClass = function (obj, name, locked) {
    if (!(this instanceof ctx.dataClass))
      return new ctx.dataClass(obj, name, locked); // in case 'new' was not used

    var self = this;
    /** class type
    * @ignore
    * @const
    * @path ctx.dataClass.ctxType
    * @property {string} */ self.ctxType = 'ctx.dataClass';

    /** class name
    * @ignore
    * @path ctx.dataClass.ctxName
    * @property {string} */ self.ctxName = name || (obj && obj.ctxName);

    // model
    var _model = obj;

    // locked state
    var _locked = locked || false;

    /**
    * Completes an existing object with attributes of the data manager
    * @description
    * __Ex.:__
    * <code javascript>
    * obj = contactData.create(obj);
    * </code>
    * @method complete
    * @path ctx.dataClass.complete
    * @param {Object} obj initialization data
    * @return {Object} returned object
    */
    self.complete = function (obj) {
        if (obj && (typeof obj === 'object')) {
          ctx.each(self, function(id, value) {
            if (typeof obj[id] === 'undefined') {
              obj[id] = value;
            }
          });
        }
      return obj;
    }

    /**
    * Creates an instance of the data manager object
    * @description
    * __Ex.:__
    * <code javascript>
    * var contact = contactData.create();
    * </code>
    * @method create
    * @path ctx.dataClass.create
    * @param {*|ctx.dataClass} [obj] optional initialization data
    * @param {boolean} [checkModel] if true, check the model of initialization data
    * @return {ctx.dataClass|null} returned object (or null if not a compatible model)
    */
    self.create = function (obj, checkModel) {
      var data = null;
      if ((!checkModel) || (obj && (obj.ctxName == self.ctxName))){
        data = new ctx.dataClass(self);
        if (obj && (typeof obj === 'object')) {
          data.set(obj);
        }
      }
      return data;
    }

    /**
    * Tests if a value or set of values exists in the data object
    * @description
    * __Ex.:__
    * <code javascript>
    * if (ScnApp.data.exist("//Data_Popup1", e.data.pathType.XPath)) { ... }
    * </code>
    * @method exist
    * @path ctx.dataClass.exist
    * @param {string} [path] path
    * @param {e.data.pathType} [pathType] data path type (see [[:lib:common:ctx.enum#enumeration_edatapathtype|e.data.pathType]]) (default is 'e.data.pathType.XPath')
    * @return {boolean} returned object or value
    */
    self.exist = function (path, pathType) {
      var parentAppli = null;
      if ((self.appliName) && (self.appliInst !== undefined) && ctx.app[self.appliName]) {
        if (self.appliInst == -1)
          parentAppli = ctx.app[self.appliName];
        else
          parentAppli = ctx.app[self.appliName][self.appliInst];
      }
      /** @type {ctx.descriptor} */ var desc = (parentAppli && parentAppli.getObjectDescriptor ? parentAppli.getObjectDescriptor() : ctx.getDescriptor());
      if (desc && desc.appli) {
        parentAppli = desc.appli;
      }
      return ctx.exist(parentAppli, path, pathType);
    }

    /**
    * Deletes a node in the data object
    * @description
    * __Ex.:__
    * <code javascript>
    * GLOBAL.data.set( { name:'Ford', firstname:'John' } ); // adds 'name' and 'firstname' attributes in GLOBAL.data
    * </code>
    * @method del
    * @path ctx.dataClass.del
    * @param {string} [path] target path or object
    * @param {e.data.pathType} [pathType] data path type (see [[:lib:common:ctx.enum#enumeration_edatapathtype|e.data.pathType]]) (default is 'e.data.pathType.XPath')
    * @return {*} modified object
    */
    self.del = function (path, pathType) {
      return self.set('', path, e.data.format.ctx, e.data.initType.DEL, pathType);
    }

    /**
    * Returns a value or set of values in the data object
    * @description
    * __Ex.:__
    * <code javascript>
    * var val = ScnApp.data.get("//Data_Popup1", e.data.pathType.XPath);
    * </code>
    * @method get
    * @path ctx.dataClass.get
    * @param {string} [path] path
    * @param {e.data.pathType} [pathType] data path type (see [[:lib:common:ctx.enum#enumeration_edatapathtype|e.data.pathType]]) (default is 'e.data.pathType.XPath')
    * @param {e.data.format} [format] output data format (see [[:lib:common:ctx.enum#enumeration_edataformat|e.data.format]])
    * @return {*} returned object or value
    */
    self.get = function (path, pathType, format) {
      var parentAppli = null;
      if ((self.appliName) && (self.appliInst !== undefined) && ctx.app[self.appliName]) {
        if (self.appliInst == -1)
          parentAppli = ctx.app[self.appliName];
        else
          parentAppli = ctx.app[self.appliName][self.appliInst];
      }
      /** @type {ctx.descriptor} */ var desc = (parentAppli && parentAppli.getObjectDescriptor ? parentAppli.getObjectDescriptor() : ctx.getDescriptor());
      if (desc && desc.appli) {
        parentAppli = desc.appli;
      }
      return ctx.get(parentAppli, path, pathType, format);
    }

    /**
    * Resets a set of values in the data object
    * @description
    * __Ex.:__
    * <code javascript>
    * var contact = ctx.dataManagers.myApplication.contact.create();
    * // contact :
    * //   FirstName = '';
    * //   LastName = '';
    * //   Mobile = '';
    * //   Address = '';
    * contact.FirstName = 'John';
    * contact.LastName = 'Smith';
    * ...
    * contact.reset( );
    * </code>
    * @method reset
    * @path ctx.dataClass.reset
    * @return {*} modified object
    */
    self.reset = function () {
      return self.set(_model || {});
    }

    /**
    * Merges a value or set of values in the data object
    * @description
    * __Ex.:__
    * <code javascript>
    * GLOBAL.data.set( { name:'Ford', firstname:'John' } ); // adds 'name' and 'firstname' attributes in GLOBAL.data
    * </code>
    * @method set
    * @path ctx.dataClass.set
    * @param {*} data object or string containing data to be set
    * @param {string} [path] target path or object
    * @param {e.data.format} [format] data format type (see [[:lib:common:ctx.enum#enumeration_edataformat|e.data.format]])
    * @param {e.data.initType} [initType] data initialisation type (see [[:lib:common:ctx.enum#enumeration_edatainittype|e.data.initType]])
    * @param {e.data.pathType} [pathType] data path type (see [[:lib:common:ctx.enum#enumeration_edatapathtype|e.data.pathType]]) (default is 'e.data.pathType.XPath')
    * @param {boolean} [locked] if 'true', no attribute can be added after initialization
    * @return {*} modified object
    */
    self.set = function (data, path, format, initType, pathType, locked) {
      var parentAppli = null;
      if ((self.appliName) && (self.appliInst !== undefined) && ctx.app[self.appliName]) {
        if (ctx.app[self.appliName].isProcess || (self.appliInst == -1))
          parentAppli = ctx.app[self.appliName];
        else
          parentAppli = ctx.app[self.appliName][self.appliInst];
      }
      /** @type {ctx.descriptor} */ var desc = (parentAppli && parentAppli.getObjectDescriptor ? parentAppli.getObjectDescriptor() : ctx.getDescriptor());
      if (desc && desc.appli) {
        parentAppli = desc.appli;
      }
      var res = ctx.set(data, parentAppli || self, path, format, initType, pathType, locked || _locked);
      return res;
    }

    if (obj) {
      self.set(obj, '', undefined, undefined, undefined, _locked);
      if (locked === undefined) _locked = true; // if there is an initialization object, prevent adding further attributes by default
    }

    //self._info.ts = ctx.getTimestamp(); // creation timestamp

    return self;
  };

ctx.construct = function (constructor, args) {
  /** @constructor */
  function F() {
      return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
}

/**
* Class used to manage array objects
* @description
* __Ex.:__
<code javascript>
var array = ctx.array([...]);
</code>
* @class ctx.array
* @path ctx.array
* @param {...*} var_args
* @return {ctx.arrayClass} array object
*/
ctx.array = function (var_args) {
  return ctx.construct(ctx.arrayClass, arguments);
  //return new ctx.arrayClass(arguments);
};

/** create an Array object
* @class ctx.array
* @path ctx.arrayClass
* @constructor
* @advanced
* @param {...*} var_args
*/
ctx.arrayClass = function(var_args)  {
  /*if (!(this instanceof ctx.arrayClass)) {
    return ctx.construct(ctx.array, arguments);
  }*/
  var arr = [ ];
  var _callbacks = {};
  var _singleCallbacks = {};

  var _checkCallbacks = function() {
    if (_callbacks[arr.index] && ('function' === typeof _callbacks[arr.index])) {
      _callbacks[arr.index](arr.index);
      if (_singleCallbacks[arr.index]) {
        delete _callbacks[arr.index];
        delete _singleCallbacks[arr.index];
      }
    }
  }

  /** class type
    * @ignore
    * @const
    * @path ctx.arrayClass.ctxType
    * @property {string}  */
  arr.ctxType = 'ctx.array';

  /** class type
    * @ignore
    * @const
    * @path ctx.arrayClass.ctxArray
    * @property {boolean}  */
  arr.ctxArray = true;

  /**
   * @type {number}
   */
  arr.index = 0;

  /**
  * Clears array content
  * @method clear
  * @path ctx.arrayClass.clear
  * @description
  * __Ex.:__
  <code javascript>
  var jobs = ctx.array([
  { search: 'Interstellar' },
  { search: 'Pulp Fiction' },
  ...
  ]);
  ...
  jobs.clear();
  </code>
  */
  arr.clear = function() {
    arr = ctx.array();
    return arr;
  }

  /**
  * Returns the current element
  * @method item
  * @path ctx.arrayClass.item
  * @param {number} [index] iteration index. If omitted, get current index. If mentioned, set the current index and returns iteration
  * @description
  * __Ex.:__
  <code javascript>
  var jobs = ctx.array([
  { search: 'Interstellar' },
  { search: 'Pulp Fiction' },
  ...
  ]);
  var it = jobs.item();
  </code>
  */
  arr.item = function(index) {
    if ((index !== undefined) && (index < arr.length) && (index >= 0) && (arr.index != index)) {
      arr.index = index;
      _checkCallbacks();
    }
    if ((arr.index < arr.length) && (arr.index >= 0))
      return arr[arr.index];
    else
      return undefined;
  }

//  arr.last = function() {
//    return arr[arr.length - 1];
//  };

  /**
  * Sets the array index to the first element, and returns it. If empty, returns 'undefined'
  * @method moveFirst
  * @path ctx.arrayClass.moveFirst
  * @return {*}
  * @description
  * __Ex.:__
  <code javascript>
  var jobs = ctx.array(...);
  jobs.end();
  </code>
  */
  arr.moveFirst = function() {
    return arr.item((arr.length > 0 ? 0 : -1));
  }

  /**
  * Sets the array index to the last element, and returns it. If empty, returns 'undefined'
  * @method moveLast
  * @path ctx.arrayClass.moveEnd
  * @return {*}
  * @description
  * __Ex.:__
  <code javascript>
  var jobs = ctx.array(...);
  jobs.end();
  </code>
  */
  arr.moveLast = function() {
    return arr.item(arr.length - 1);
  }

  /**
  * Sets the array index to the next element, and returns it. If end is reached, returns 'undefined'
  * @method moveNext
  * @path ctx.arrayClass.moveNext
  * @return {*}
  * @description
  * __Ex.:__
  <code javascript>
  var jobs = ctx.array(...);
  jobs.moveNext();
  </code>
  */
  arr.moveNext = function() {
    if (arr.index < arr.length) {
      arr.index ++;
      _checkCallbacks();
      return arr.item();
    } else {
      return undefined;
    }
  }

  /**
  * Sets the array index to the previous element, and returns it. If beginning is reached, returns 'undefined'
  * @method previous
  * @path ctx.arrayClass.previous
  * @return {*}
  * @description
  * __Ex.:__
  <code javascript>
  var jobs = ctx.array(...);
  var job = jobs.previous();
  </code>
  */
  arr.movePrevious = function() {
    if (arr.index >= 0) {
      arr.index --;
      _checkCallbacks();
      return arr.item();
    } else {
      return undefined;
    }
  }

  /**
  * Sets the array index to the next element, and returns it. If end is reached, returns 'undefined'
  * @method next
  * @path ctx.arrayClass.atEnd
  * @description
  * __Ex.:__
  <code javascript>
  var jobs = ctx.array(...);
  if (jobs.atEnd()) {
    ...
  }
  </code>
  */
  arr.atEnd = function() {
    return ((arr.index < 0) || (arr.index >= arr.length));
  }

  /**
  * Returns the value of a random element
  * @method random
  * @path ctx.arrayClass.random
  * @return {*}
  * @description
  * __Ex.:__
  <code javascript>
  var jobs = ctx.array(...);
  var val = jobs.random();
  </code>
  */
  arr.random = function() {
    if (arr.length > 0) {
      var index = Math.floor ( Math.random () * arr.length );
      return arr[index];
    } else
      return undefined;
  }

  /**
  * increments the counter
  * @description
  * __Ex.:__
<code javascript>
var counter = ctx.counter().onValue(0, function() {
  sc.endStep();
});
...
counter.increment();
...
counter.decrement(); // the callback is called
</code>
  * @method increment
  * @path ctx.arrayClass.increment
  * @return {*}
  */
  arr.increment = function () {
    arr.index ++;
    if (arr.index >= arr.length) {
      arr.length = arr.index + 1;
    }
    _checkCallbacks();
    return arr.item();
  }

  /**
  * decrements the counter
  * @description
  * __Ex.:__
<code javascript>
var counter = ctx.counter().onValue(0, function() {
  sc.endStep();
});
...
counter.increment();
...
counter.decrement(); // the callback is called
</code>
  * @method decrement
  * @path ctx.counterClass.decrement
  * @return {*}
  */
  arr.decrement = function () {
    return arr.movePrevious();
  }

  /**
  * decrements the counter
  * @description
  * __Ex.:__
<code javascript>
var counter = ctx.array().onValue(0, function() {
  sc.endStep();
});
...
counter.check(); // the callback is called if current value is '0'
</code>
  * @method check
  * @path ctx.arrayClass.check
  */
  arr.check = function () {
    _checkCallbacks();
  }

  /**
  * adds a callback to be called on a given value
  * @description
  * __Ex.:__
<code javascript>
var counter = ctx.array().on(0, function() {
  sc.endStep();
});
</code>
  * @method on
  * @path ctx.arrayClass.on
  * @param {number} value value to trigger the callback
  * @param {function(number)} [callback] callback (if omitted, the existing callback is removed)
  * @param {boolean} [single] is true, the callback is called once
  */
  arr.on = function (value, callback, single) {
    if (callback && ('function' === typeof callback)) {
      _callbacks[value] = callback;
      _singleCallbacks[value] = (single ? true : false);
    } else {
      if (_callbacks[value]) delete _callbacks[value];
      if (_singleCallbacks[value]) delete _singleCallbacks[value];
    }
  }

  /**
  * sets current counter value
  * @method setValue
  * @path ctx.arrayClass.setValue
  * @param {number} value new index value
  */
  arr.setIndex = function (value) {
    if ((value !== undefined) && ('number' === typeof(value)) && (arr.index != value)) {
      arr.index = value;
      if (arr.index >= arr.length) {
        arr.length = arr.index + 1;
      }
    _checkCallbacks();
    }
  }

  var args = arguments;
  if ((args.length == 1) && (Array.isArray(args[0])))
    args = args[0];// Array wrapper
  if (args.length > 0)
    arr.push.apply(arr, args);
  return arr;
};

/**
* Class used to manage counter objects
* @class ctx.counter
* @path ctx.counter
* @param {number} [initValue] initial value (0 by default)
* @return {ctx.counterClass} counter object
*/
ctx.counter = function (initValue) {
  var counter = new ctx.counterClass(initValue);
  return counter;
};

/**
* Class used to implement asynchronous counters
* @class ctx.counterClass
* @path ctx.counterClass
* @constructor
* @param {number} [initValue] initial value (0 by default)
*/
ctx.counterClass = function (initValue) {
  /** @type {number}*/ var _value = 0;
  if ((initValue !== undefined) && ('number' === typeof(initValue))) _value = initValue;

  var _callbacks = {};
  var _singleCallbacks = {};

  var _checkCallbacks = function() {
    if (_callbacks[_value] && ('function' === typeof _callbacks[_value])) {
      _callbacks[_value]();
      if (_singleCallbacks[_value]) {
        delete _callbacks[_value];
        delete _singleCallbacks[_value];
      }
    }
  }

  /** class type
  * @ignore
  * @const
  * @path ctx.counterClass.ctxType
  * @property {string}  */ this.ctxType = 'ctx.counterClass';

  /**
  * decrements the counter
  * @description
  * __Ex.:__
<code javascript>
var counter = ctx.counter().onValue(0, function() {
  sc.endStep();
});
...
counter.checkValue(); // the callback is called if current value is '0'
</code>
  * @method checkValue
  * @path ctx.counterClass.checkValue
  * @return {ctx.counterClass}
  */
  this.checkValue = function () {
    _checkCallbacks();
    return this;
  }

  /**
  * decrements the counter
  * @description
  * __Ex.:__
<code javascript>
var counter = ctx.counter().onValue(0, function() {
  sc.endStep();
});
...
counter.increment();
...
counter.decrement(); // the callback is called
</code>
  * @method decrement
  * @path ctx.counterClass.decrement
  * @return {number}
  */
  this.decrement = function () {
    _value --;
    _checkCallbacks();
    return _value;
  }

  /**
  * gets the current counter value
  * @description
  * __Ex.:__
<code javascript>
counter.decrement();
...
if (counter.getValue() <= 0) { ... }
</code>
  * @method getValue
  * @path ctx.counterClass.getValue
  * @return {number}
  */
  this.getValue = function () {
    return _value;
  }

  /**
  * increments the counter
  * @description
  * __Ex.:__
<code javascript>
var counter = ctx.counter().onValue(0, function() {
  sc.endStep();
});
...
counter.increment();
...
counter.decrement(); // the callback is called
</code>
  * @method increment
  * @path ctx.counterClass.increment
  * @return {number}
  */
  this.increment = function () {
    _value ++;
    _checkCallbacks();
    return _value;
  }

  /**
  * adds a callback to be called on a given value
  * @description
  * __Ex.:__
<code javascript>
var counter = new ctx.counter().onValue(0, function() {
  sc.endStep();
});
</code>
  * @method onValue
  * @path ctx.counterClass.onValue
  * @param {number} value value to trigger the callback
  * @param {function()} [callback] callback (if omitted, the existing callback is removed)
  * @param {boolean} [single] is true, the callback is called once
  * @return {ctx.counterClass}
  */
  this.onValue = function (value, callback, single) {
    if (callback && ('function' === typeof callback)) {
      _callbacks[value] = callback;
      _singleCallbacks[value] = (single ? true : false);
    } else {
      if (_callbacks[value]) delete _callbacks[value];
      if (_singleCallbacks[value]) delete _singleCallbacks[value];
    }
    return this;
  }

  /**
  * sets current counter value
  * @description
  * __Ex.:__
<code javascript>
var counter = new ctx.counter().onValue(0, function() {
  sc.endStep();
});
</code>
  * @method setValue
  * @path ctx.counterClass.setValue
  * @param {number} value new counter value
  * @return {ctx.counterClass}
  */
  this.setValue = function (value) {
    if ((value !== undefined) && ('number' === typeof(value))) {
      _value = value;
    _checkCallbacks();
    }
    return this;
  }

};


/**
* Class used to implement technical or functional events
* @class ctx.event
* @path ctx.event
* @constructor
* @advanced
* @param {string|Object} [nameOrObj] event name or initialization parameters
* @param {ctx.application|ctx.page|ctx.item|ctx.popupItem} [parent] parent object
* @param {Object|ctx.dataClass} [dataClass] data model object
* @param {boolean} [technical] if true, technical object
*/
ctx.event = function (nameOrObj, parent, dataClass, technical) {

  var _event = this;
  /** class type
  * @ignore
  * @const
  * @path ctx.event.ctxType
  * @property {string}  */ this.ctxType = 'ctx.event';

  /** parent application or process object
  * @path ctx.event.appli
  * @property {ctx.application} */ this.appli = (parent ? parent.appli : null);

  /** application or process instance
  * @path ctx.event.appliInst
  * @property {number} */ this.appliInst = (parent && parent.appli ? parent.appli.instance : -1);

  /** application or process name
  * @path ctx.event.appliName
  * @property {string} */ this.appliName = (parent && parent.appli ? parent.appli.name : '');

  /** optional data stored in event
  * @path ctx.event.data
  * @property {*|ctx.dataClass} */ this.data = null;

  /** data format
  * @path ctx.event.format
  * @property {e.data.format} */ this.format = e.data.format.none;

  /** internal event (not displayed in debugger)
  * @path ctx.event.internal
  * @property {boolean} */ this.internal = false;

  /** item index
  * @path ctx.event.itemIndex
  * @property {number} */ this.itemIndex = (parent && parent.item ? parent.item.index : 0);

  /** item instance
  * @path ctx.event.itemInst
  * @property {number} */ this.itemInst = (parent && parent.item ? parent.item.instance : 0);

  /** item name
  * @path ctx.event.itemName
  * @property {string} */ this.itemName = (parent && parent.item ? parent.item.name : '');

  /** item occurence level
  * @path ctx.event.itemOccurs
  * @property {number} */ this.itemOccurs = (parent && parent.item ? parent.item.occurs : 0);

  /** Event name
  * @path ctx.event.name
  * @property {string} */ this.name = '';

  /** instance count
  * @path ctx.event.nbInst
  * @property {number} */ this.nbInst = 0;

  /** parent page object
  * @path ctx.event.page
  * @property {ctx.page} */ this.page = (parent ? parent.page : null);

  /** page instance
  * @path ctx.event.pageInst
  * @property {number} */ this.pageInst = (parent && parent.page ? parent.page.instance : -1);

  /** page name
  * @path ctx.event.pageName
  * @property {string} */ this.pageName = (parent && parent.page ? parent.page.name : '');

  /** parent object associated with event (application, page, item)
  * @path ctx.event.parent
  * @property {ctx.application|ctx.page|ctx.item|undefined} */ this.parent = parent;

  /** source application or process instance
  * @path ctx.event.reqAppliInst
  * @property {number} */ this.reqAppliInst = 0;

  /** source application or process name
  * @path ctx.event.reqAppliName
  * @property {string} */ this.reqAppliName = '';

  /** source event name
  * @path ctx.event.reqEventName
  * @property {string} */ this.reqEventName = '';

  /** source item name
  * @path ctx.event.reqItemName
  * @property {string} */ this.reqItemName = '';

  /** technical vs functionnal event
  * @path ctx.event.technical
  * @property {boolean} */ this.technical = technical;

  /**
  * Clears event content
  * @description
  * __Ex.:__
<code javascript>
ev.clear();
</code>
  * @method clear
  * @path ctx.event.clear
  */
  this.clear = function () {
    this.name = '';
    this.parent = null;
    this.appli = null;
    this.page = null;
    this.appliName = '';
    this.pageName = '';
    this.itemName = '';
    this.appliInst = -1;
    this.pageInst = -1;
    this.itemInst = 0;
    this.itemIndex = -1;
    this.itemOccurs = 0;
    this.nbInst = 0;
    ((this.data && this.data.reset) ? this.data.reset() : this.data = {} );
    this.reqAppliName = '';
    this.reqAppliInst = 0;
    this.reqEventName = '';
    this.reqItemName = '';
  }

  /**
  * Returns a copy of the event
  * @description
  * __Ex.:__
<code javascript>
var ev2 = ev.copy();
</code>
  * @method copy
  * @path ctx.event.copy
  * @suppress {checkTypes}
  * @return {ctx.event} copied event
  */
  this.copy = function () {
    var ev = new ctx.event(this.name);
    ctx.each(this, function(id, value) {
      if ((id == 'data') && (typeof value === 'object')) {
        if (typeof ev.data.set === 'function') {
          ev.data.set(value);
        } else {
          ctx.set(value, ev.data);
        }
      } else {
        ev[id] = value;
      }
    });
    return ev;
  }

  /**
  * Creates a new instance of an event
  * @description
  * __Ex.:__
<code javascript>
var ev2 = MyApply.events.ev.create();
</code>
  * @method create
  * @path ctx.event.create
  * @param {Object|ctx.dataClass} [obj] optional initialization data
  * @return {ctx.event} created event
  */
  this.create = function (obj) {
    var ev = this.copy();
    if (obj ) {
      if (this.data.create) {
        ev.data = this.data.create(obj);
      } else {
        ev.data = obj;
      }
    }
    return ev;
  }

  /** @method init
  * @param {Object} [obj]
  * @path ctx.event.init
  * @return {ctx.event} */
  this.init = function(obj) {
    if (obj && ('object' === typeof obj)) {
      ctx.each(obj, function(id, value) {
        if ((_event[id] !== undefined) && (value !== undefined)) {
          _event[id] = value;
        }
      });
    }
    var ev = _event;
    if ((!ev.appli) && ctx.app[ev.appliName]) {
      ev.appli = ctx.app[ev.appliName][ev.appliInst] || ctx.app[ev.appliName];
    }
    if ((!ev.page) && ev.pageName && ev.appli && ev.appli[ev.pageName]) {
      ev.page = ev.appli[ev.pageName][ev.pageInst] || ev.appli[ev.pageName];
    }
    ev.parent = (ev.page ? ev.page : ev.appli);
    return _event;
  }

  if (dataClass instanceof ctx.dataClass) {
    this.data = ctx.dataManager(dataClass);
  } else if (dataClass && (typeof (dataClass) === 'object')) {
    var obj = {};
    obj[_event.name] = dataClass;
    this.data = ctx.dataManager(obj);
  } else {
    //this.data = ctx.dataManager(name);
    this.data = {};
  }

  if (nameOrObj) {
    if ('object' === typeof nameOrObj) {
      _event.init(nameOrObj);
    } else if ('string' === typeof nameOrObj) {
      _event.name = nameOrObj;
    }
  }

  /** [Internal usage]
   * Returns the short description for serialization
   * @ignore
   * @method ctxShort
   * @path ctx.event.ctxShort
   */
  this.ctxShort = function() {
    return ['ctxType', 'name', 'appliName', 'appliInst', 'pageName', 'pageInst', 'itemName', 'itemInst', 'itemIndex', 'itemOccurs', 'nbInst', 'data', 'reqAppliName', 'reqAppliInst', 'reqEventName', 'reqItemName'];
  }

  /**
  * Gets an alias of the event, like <appliName[appliInst].pageName[pageInst].itemName:name>
  * @method getAlias
  * @path ctx.event.getAlias
  * @return {string} result
  */
  this.getAlias = function () {
    var res = this.appliName + '[' + this.appliInst + ']';
    if (this.pageName) {
      res = res + '.' + this.pageName + '[' + this.pageInst + ']';
    }
    if (this.itemName) {
      res = res + '.' + this.itemName;
    }
    res = res + ':' + this.name;
    return res;
  }

  /**
  * Gets an alias of the event source, like <reqAppliName[reqAppliInst].reqPageName[reqPageInst].reqItemName:name>
  * @method getAliasReq
  * @path ctx.event.getAliasReq
  * @return {string} result
  */
  this.getAliasReq = function () {
    var res = this.reqAppliName + '[' + this.reqAppliInst + ']';
    if (this.reqItemName) {
      res = res + '.' + this.reqItemName;
    }
    res = res + ':' + (this.reqEventName || this.name);
    return res;
  }

  /**
  * Retrieves the object descriptor from the given event
  * @method getObjectDescriptor
  * @path ctx.event.getObjectDescriptor
  * @ignore
  * @param {ctx.descriptor} [desc] Optional source descriptor object
  * @return {ctx.descriptor} Object descriptor
  */
  this.getObjectDescriptor = function (desc) {
    if (!desc)
      desc = new ctx.descriptor();
    if (this.parent)
      desc = this.parent.getObjectDescriptor(desc);
    if (this.name) { desc.name = this.name; }
    if (this.type) { desc.type = this.type; }
    if (this.appli) { desc.appli = this.appli; }
    if (this.page) { desc.page = this.page; }
    if (this.appliName) { desc.appliName = this.appliName; }
    if (this.pageName) { desc.pageName = this.pageName; }
    if (this.itemName) { desc.itemName = this.itemName; }
    if (this.appliInst >= 0) { desc.appliInst = this.appliInst; }
    if (this.pageInst >= 0) { desc.pageInst = this.pageInst; }
    if (this.itemInst >= 0) { desc.itemInst = this.itemInst; }
    if (this.itemIndex >= 0) { desc.itemIndex = this.itemIndex; }
    if (this.itemOccurs) { desc.itemOccurs = this.itemOccurs; }
    if (this.index) { desc.index = this.index; }
    return desc;
  };

  /**
  * Sends an event to a target application or page
  * @description
  * __Ex.:__
<code javascript>
// sends a functional event 'evLogin' with data and a 5 s delay
var obj = { name: 'Smith', firstname: 'John' };
ev.notify(MyAppli.events.evLogin, obj, 5000);
</code>
  * @method notify
  * @path ctx.event.notify
  * @param {ctx.event} event event object to be notified
  * @param {*} [data] event data
  * @param {number|string} [timer] timer value (ms)
  * @param {string} [appliInst] appli instance
  * @param {string} [method] optional method name : 'Send' for a synchronous call
  * @param {string} [itemName] item name
  * @return returns result
  */
  this.notify = function (event, data, timer, appliInst, method, itemName) {
    if (this.appli && (typeof this.appli.notify === 'function')) {
      var reqEvent = this;
      return this.appli.notify(event, data, timer, appliInst, method, itemName, reqEvent);
    }
    return '';
  };

  /**
  * Sets a permanent or single handler to listen to a given event
  * @description
  * __Ex.:__
<code javascript>
LinkedIn.events.START.on(function(ev) {...});
</code>
  * @method on
  * @path ctx.event.on
  * @param {function(ctx.event)} func callback to be called on event reception
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {Object} [context] context object to be called with the callback
  * @param {boolean} [single] if 'true', sets a single listening on the event (otherwise, a permanent listening)
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.on = function (func, immediateCondition, context, single, delay, noStepReset) {
    return ctx.on(this, func, immediateCondition, context, single, delay, noStepReset);
  };

  /**
  * Sets a single handler to listen to a given event
  * @description
  * __Ex.:__
<code javascript>
LinkedIn.events.START.once(function(ev) {...});
</code>
  * @method once
  * @path ctx.event.once
  * @param {function(ctx.event)} func callback to be called on event reception
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {Object} [context] context object to be called with the callback
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.once = function (func, immediateCondition, context, delay, noStepReset) {
    return ctx.on(this, func, immediateCondition, context, true, delay, noStepReset);
  };

  /**
  * Sends an event back to the source application or page
  * @description
  * __Ex.:__
<code javascript>
// *** source application ***
// send a functional event to 'MyAppli' application
var obj = { name: 'Smith', firstname: 'John' };
MyAppli.notify(MyAppli.events.evSetId, obj);
});

// *** destination application ***
// handles the event on 'MyAppli' application
MyAppli.on({evSetId: function(ev) {
// handle input data
var data = ev.data;
... = data.name;
...
// add output data
data.result = ...
// send answer to the source application
ev.reply();
}});

// *** source application ***
// handles the answer event on 'MyAppli' application
MyAppli.on({evSetId: function(ev) {
// handle answer here...
var data = ev.data;
... = data.result;
}});
</code>
  * @method reply
  * @path ctx.event.reply
  * @param {Object} [data] optional data values
  * @param {ctx.event} [newEvent] optional event to send to
  * @return {string} result value
  */
  this.reply = function (data, newEvent) {
    var desc = this.getObjectDescriptor();
    if (data) {
      if (typeof this.data !== 'object') {
        this.data = new ctx.dataClass();
      }
      ctx.set(data, this.data);
    }
    var reqEvent = (newEvent && newEvent.name ? newEvent.name : (this.reqEventName ? this.reqEventName : this.name ));
    var reqAppliName = (newEvent && newEvent.appliName ? newEvent.appliName : (this.reqAppliName ? this.reqAppliName : this.appliName ));
    var reqAppliInst = (newEvent && newEvent.reqAppliInst >= 0 ? newEvent.reqAppliInst : (this.reqAppliInst >= 0 ? this.reqAppliInst : this.appliInst ));
    // anti-loop checking
    if ((reqEvent == this.name) && (reqAppliName == this.appliName) && ((this.reqAppliInst == -1) || (this.reqAppliInst == this.appliInst))) {
      return '';
    }

    var strData = ctx.serialize(this.data, false, true);
    return ctx.verbExec(desc, 'reply', 'NOTIFY', {
      Event: reqEvent,
      Appli: reqAppliName,
      InstanceAppli: ((reqAppliInst == -1) ? undefined : reqAppliInst),
      Data: strData,
      EventResp: this.name
    });
  }

  /**
  * Serializes an event content
  * @description
  * __Ex.:__
<code javascript>
var txt = ev.serialize();
</code>
  * @method serialize
  * @path ctx.event.serialize
  * @param {boolean} [doEscape] if 'true', escapes all control characters ("\b" -> "\\b", "\"" -> "\\\"", "\\" -> "\\\\", ...)
  * @param {boolean} [addPrefix] if 'true' and 'data' is an object, adds a prefix to automate unserialisation
  * @return {string} serialized value
  */
  this.serialize = function (doEscape, addPrefix) {
    //var ev = ctx.clone(this);
    // make a shallow copy of the event, remove objects with circular references
    var ev = {};
    for (var id in this) {
      if (!((id == 'parent') || (id == 'appli') || (id == 'page')))
        ev[id] = this[id];
    }
    return ctx.serialize(this, doEscape, addPrefix);
  };

  /**
  * Merges an object in the given event
  * @description
  * __Ex.:__
<code javascript>
ev.set(obj);
</code>
  * @method set
  * @path ctx.event.set
  * @param {Object} obj object to be merged
  */
  this.set = function (obj) {
    return ctx.set(obj, this);
  }

  /**
  * Sets a 'SETPENDING' action
  * @description
  * __Ex.:__
<code javascript>
MyHllApiAppli.on({ evLogin: function(ev) {
if (MyHllApiAppli.nbInst == 1)  {
  // only virtual instance exists : connect session to create a real instance
  MyHllApiAppli.PAGELOAD.connectPS(MyHllApiAppli.data.session);
  MyHllApiAppli.data.isHllConnected = true;
  ev.setpending();
} else {
  // *** real instance ***
  // start scenario
  MyHllApiAppli.scenarios.scLogin.start();
}
}});
</code>
  * @method setpending
  * @path ctx.event.setpending
  * @return {string} action result
  */
  this.setpending = function () {
    var desc = this.getObjectDescriptor();
    return ctx.verbExec(desc, 'setpending', 'SETPENDING', {
      Event : this.name,
      Data : ctx.serialize(this.data, false, true),
      Item : this.itemName,
      ReqAppli : this.reqAppliName,
      ReqIdInstanceAppli : this.reqAppliInst,
      EventResp : this.reqEventName,
      ItemResp : this.reqItemName
    });
  }
};

/**
* Class used to manage promise objects
* @class ctx.promise
* @path ctx.promise
* @ignore
* @param {function(*)} resolver function
* @param {String} [label] optional string for labeling the promise.
* @return {ctx.promiseClass} promise object
*/
ctx.promise = function (resolver, label) {
  return new ctx.promiseClass(resolver); // create new
};

/**
* Class used to implement promise objects
* @class ctx.promiseClass
* @path ctx.promiseClass
* @constructor
* @advanced
* @param {function(*)} resolver function
* @param {String} [label] optional string for labeling the promise.
*/
ctx.promiseClass = function (resolver, label) {
  var _promise = this;
  var _id = ctx.objectIndex ++;
  var _label = label;
  var _state = undefined; // FULFILLED || REJECTED ||
  var _result = undefined;
  var _subscribers = [];
  var _catch = null;

  _subscribers.push( {
    done: resolver,
    fail: undefined,
    label: label
  } );

  /**
  *
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @method all
  * @path ctx.promiseClass.all
  * @ignore
  * @param {Array<ctx.promiseClass>} entries array of promises
  * @param {String} [label] optional string for labeling the promise.
  * @return {ctx.promiseClass} promise object
  */
  this.all = function (entries, label) {
    //return new Enumerator(this, entries, true /* abort on reject */, label).promise;
    return _promise;
  }

  /**
  *
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @method catch
  * @path ctx.promiseClass.catch
  * @advanced
  * @param {function(*)|undefined} onRejection rejection function
  * @param {String} [label] optional string for labeling the promise.
  * @return {ctx.promiseClass} promise object
  */
  this['catch'] = function (onRejection, label) {
    return _promise.then(undefined, onRejection, label);
//    _catch = func;
//    return this;
  }

  /**
  *
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @method finally
  * @path ctx.promiseClass.finally
  * @advanced
  * @param {function(*)} callback callback function
  * @param {String} [label] optional string for labeling the promise.
  * @return {ctx.promiseClass} promise object
  */
  this['finally'] = function (callback, label) {
    var constructor = _promise.constructor;
    return _promise.then(function(value) {
      var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
      return constructor.resolve(callback(lastEvent)).then(function(){
        return value;
      });
    }, function(reason) {
      var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
      return constructor.resolve(callback(lastEvent)).then(function(){
        throw reason;
      });
    }, label);
  }

  /**
  *
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @method reject
  * @path ctx.promiseClass.reject
  * @advanced
  * @static
  * @param {*} reason value that the returned promise will be rejected with.
  * @param {String} [label] optional string for identifying the returned promise.
  * @return {ctx.promiseClass} promise object
  */
  this.reject = function (reason, label) {
    return _promise;
  }

  /**
  *
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @method resolve
  * @path ctx.promiseClass.resolve
  * @advanced
  * @param {*} value result value
  * @return {ctx.promiseClass} promise object
  */
  this.resolve = function (value) {
    var obj = _subscribers.shift();
    if (obj && obj.done) {
      var oldPromise = ctx.currentPromise;
      var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
      ctx.currentPromise = _promise;
      var context;
      if (this != _promise) { context = this; }
      if ((!context) && ctx.currentSubscription) { context = ctx.currentSubscription.context; }
      if ((!context) && lastEvent) {
        if (lastEvent.page) {
          context = lastEvent.page;
        } else if (lastEvent.appli) {
          context = lastEvent.appli;
        }
      }
      obj.done.apply(context, [value])
      ctx.currentPromise = oldPromise;
    }
    return _promise;
  }

  /**
  *
  * @description
  * __Ex.:__
<code javascript>
</code>
  * @method then
  * @path ctx.promiseClass.then
  * @advanced
  * @param {function(*)|undefined} onFulfillment fulfill function
  * @param {function(*)} [onRejection] reject function
  * @param {String} [label] optional string for labeling the promise
  * @return {ctx.promiseClass} promise object
  */
  this.then = function (onFulfillment, onRejection, label) {
    _subscribers.push( {
      done: onFulfillment,
      fail: onRejection,
      label: label
    } );
    return _promise;
  }

  // differed start
  ctx.pendingFunctions.push(function () {
    var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
    _promise.resolve(lastEvent);
  });

  return _promise;
}

/**
 * @ignore
 * Mapper library
 * @class ctx.mapper
 * @path ctx.mapper
 * @constructor
 **/
ctx.mapper = (function () {

  /**
  * This class is derived from 'object-mapper' code \\
  * The MIT License (MIT)
  * Copyright (c) 2012 Daniel L. VerWeire
  * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  * @see https://github.com/wankdanker/node-object-mapper
  * @ignore
  */
  var self =
  /** @lends ctx.mapper */
  {
    /**
     * @ignore
     * Map a object to another using the passed map
     * @path ctx.mapper.map
     * @method map
     * @param {*} fromObject source object
     * @param {Object} toObject destination object, or array of properties to map (if 'propertyMap' is omitted)
     * @param {Object} [propertyMap] array of properties to map
     * @return {*}
     */
    map: function(fromObject, toObject, propertyMap) {
      var propertyKeys;
      var tObj = toObject || {};
      var propMap = propertyMap;
      if (typeof propMap === 'undefined') {
        propMap = tObj;
        tObj = undefined;
      }
      propMap = propMap || {};
      propertyKeys = Object.keys(propMap);
      return _map(fromObject, tObj, propMap, propertyKeys);
    },

    /**
     * @ignore
     * Gets a value with the key in the passed object
     * @path ctx.mapper.get
     * @method get
     * @param {Object} fromObject source object
     * @param {Object} fromKey source key
     * @return {*}
     */
    get : function (fromObject, fromKey) {
      var regDot = /\./g
        , regFinishArray = /.+(\[\])/g
        , keys
        , key
        , result
        , lastValue
        ;

      keys = fromKey.split(regDot);
      key = keys.splice(0, 1);
      lastValue = fromKey.match(regFinishArray);
      if(lastValue != null && lastValue[0] === fromKey){
        fromKey = fromKey.slice(0,-2);
      }else{
        lastValue = null;
      }
      result = _getValue(fromObject, key[0], keys);

      if (Array.isArray(result) && !lastValue) {
        if (result.length) {
          result = result.reduce(function (a, b) {
            if (Array.isArray(a) && Array.isArray(b)) {
              return a.concat(b);
            } else if (Array.isArray(a)) {
              a.push(b);
              return a;
            } else {
              return [a, b];
            }
          });
        }
        if (!Array.isArray(result)) {
          result = [result];
        }
      }

      return result;
    },

    /**
     * @ignore
     * Sets a value withing the key in the passed object
     * @path ctx.mapper.set
     * @method set
     * @param {Object} baseObject
     * @param {Object} destinationKey
     * @param {*} fromValue
     * @return {*|Object}
     */
    set: function (baseObject, destinationKey, fromValue) {
      var regDot = /\./g
        , keys
        , key
        ;

      keys = destinationKey.split(regDot);
      key = keys.splice(0, 1);

      return _setValue(baseObject, key[0], keys, fromValue);
    }
  };

  /**
   * Gets the value of key within passed object, considering if there is a array or object
   * @param fromObject
   * @param key
   * @param keys
   * @returns {*}
   * @ignore
   * @private
   */
  function _getValue(fromObject, key, keys) {
    var regArray = /(\[\]|\[(.*)\])$/g
      , match
      , arrayIndex
      , isValueArray = false
      , result
      ;

    if (!fromObject) {
      return;
    }

    match = regArray.exec(key);
    if (match) {
      key = key.replace(regArray, '');
      isValueArray = (key !== '');
      arrayIndex = match[2];
    }

    if (keys.length === 0) {
      if (isValueArray) {
        if (typeof arrayIndex === 'undefined') {
          result = fromObject[key];
        } else {
          result = fromObject[key][arrayIndex];
        }
      } else if (Array.isArray(fromObject)) {
        if (key === '') {
          if (typeof arrayIndex === 'undefined') {
            result = fromObject;
          } else {
            result = fromObject[arrayIndex];
          }
        } else {
          result = fromObject.map(function (item) {
            return item[key];
          })
        }
      } else {
        result = fromObject[key];
      }
    } else {
      if (isValueArray) {
        if (Array.isArray(fromObject[key])) {
          if (typeof arrayIndex === 'undefined') {
            result = fromObject[key].map(function (item) {
              return _getValue(item, keys[0], keys.slice(1));
            });
          } else {
            result = _getValue(fromObject[key][arrayIndex], keys[0], keys.slice(1));
          }
        } else {
          if (typeof arrayIndex === 'undefined') {
            result = _getValue(fromObject[key], keys[0], keys.slice(1));
          } else {
            result = _getValue(fromObject[key][arrayIndex], keys[0], keys.slice(1));
          }
        }
      } else if (Array.isArray(fromObject)) {
        if (key === '') {
          if (typeof arrayIndex === 'undefined') {
            result = _getValue(fromObject, keys[0], keys.slice(1));
          } else {
            result = _getValue(fromObject[arrayIndex], keys[0], keys.slice(1));
          }
        } else {
          result = fromObject.map(function (item) {
            result = _getValue(item, keys[0], keys.slice(1));
          })
        }
        if (typeof arrayIndex === 'undefined') {
          result = fromObject.map(function (item) {
            return _getValue(item, keys[0], keys.slice(1));
          });
        } else {

          result = _getValue(fromObject[arrayIndex], keys[0], keys.slice(1));
        }
      } else {
        result = _getValue(fromObject[key], keys[0], keys.slice(1));
      }
    }

    return result;
  }

  //module.exports = SetKeyValue;

  /**
   * Set the value within the passed object, considering if is a array or object set
   * @param destinationObject
   * @param key
   * @param keys
   * @param fromValue
   * @return {*}
   * @private
   * @ignore
   */
  function _setValue(destinationObject, key, keys, fromValue) {
    var regArray = /(\[\]|\[(.*)\])$/g
      , regAppendArray = /(\[\]|\[(.*)\]\+)$/g
      , regCanBeNull = /(\?)$/g
      , match
      , appendToArray
      , canBeNull
      , arrayIndex = 0
      , valueIndex
      , isPropertyArray = false
      , isValueArray = false
      , value
      ;

    canBeNull = regCanBeNull.test(key);
    if(canBeNull){
      key = key.replace(regCanBeNull, '');
    }

    match = regArray.exec(key);
    appendToArray = regAppendArray.exec(key);
    if (match) {
      isPropertyArray = true;
      key = key.replace(regArray, '');
      isValueArray = (key !== '');
    }

    if (appendToArray) {
      match = appendToArray;
      isPropertyArray = true;
      isValueArray = (key !== '');
      key = key.replace(regAppendArray, '');
    }

    if (_isEmpty(destinationObject)) {
      if (isPropertyArray) {
        arrayIndex = match[2] || 0;
        if (isValueArray) {
          destinationObject = {};
          destinationObject[key] = [];
        } else {
          destinationObject = [];
        }
      } else {
        destinationObject = {};
      }
    } else {
      if (isPropertyArray) {
        arrayIndex = match[2] || 0;
      }
    }
    if (keys.length === 0) {
      if(!canBeNull && (fromValue === null || fromValue === undefined)){
        return destinationObject;
      }
      if (isValueArray) {
        if (Array.isArray(destinationObject[key]) === false) {
          destinationObject[key] = [];
        }
        if(appendToArray){
            destinationObject[key].push(fromValue);
        } else{
          destinationObject[key][arrayIndex] = fromValue;
        }
      } else if (Array.isArray(destinationObject)) {
          destinationObject[arrayIndex] = fromValue;
      } else {
        destinationObject[key] = fromValue;
      }
    } else {
      if (isValueArray) {
        if (Array.isArray(destinationObject[key]) === false) {
          destinationObject[key] = [];
        }
        if (Array.isArray(fromValue) && _isNextArrayProperty(keys) === false) {
          for (valueIndex = 0; valueIndex < fromValue.length; valueIndex++) {
            value = fromValue[valueIndex];
            destinationObject[key][arrayIndex + valueIndex] = _setValue(destinationObject[key][arrayIndex + valueIndex], keys[0], keys.slice(1), value);
          }
        } else {
          destinationObject[key][arrayIndex] = _setValue(destinationObject[key][arrayIndex], keys[0], keys.slice(1), fromValue);
        }
      } else if (Array.isArray(destinationObject)) {
        if (Array.isArray(fromValue)) {
          for (valueIndex = 0; valueIndex < fromValue.length; valueIndex++) {
            value = fromValue[valueIndex];
            destinationObject[arrayIndex + valueIndex] = _setValue(destinationObject[arrayIndex + valueIndex], keys[0], keys.slice(1), value);
          }
        } else {
          destinationObject[arrayIndex] = _setValue(destinationObject[arrayIndex], keys[0], keys.slice(1), fromValue);
        }
      } else {
        destinationObject[key] = _setValue(destinationObject[key], keys[0], keys.slice(1), fromValue);
      }
    }


    return destinationObject;
  }

  /**
   * Check if next key is a array lookup
   * @param keys
   * @returns {boolean}
   * @private
   * @ignore
   */
  function _isNextArrayProperty(keys) {
    var regArray = /(\[\]|\[(.*)\])$/g
      ;
    return regArray.test(keys[0]);
  }

  /**
   * Check if passed object is empty, checking for object and array types
   * @param object
   * @returns {boolean}
   * @private
   * @ignore
   */
  function _isEmpty(object) {
    var empty = false;
    if (typeof object === 'undefined' || object === null) {
      empty = true;
    } else if (_isEmptyObject(object)) {
      empty = true;
    } else if (_isEmptyArray(object)) {
      empty = true;
    }
    return empty;
  }

  /**
   * Check if passed object is empty
   * @param object
   * @returns {boolean}
   * @private
   * @ignore
   */
  function _isEmptyObject(object) {
    return typeof object === 'object'
      && Array.isArray(object) === false
      && Object.keys(object).length === 0
      ;
  }

  /**
   * Check if passed array is empty or with empty values only
   * @param object
   * @returns {boolean}
   * @private
   * @ignore
   */
  function _isEmptyArray(object) {
    return Array.isArray(object)
      && (object.length === 0
      || object.join('').length === 0)
      ;
  }

  /**
   * Function that handle each key from map
   * @param fromObject
   * @param toObject
   * @param propertyMap
   * @param propertyKeys
   * @returns {*}
   * @private
   * @ignore
   */
  function _map(fromObject, toObject, propertyMap, propertyKeys) {
    var fromKey
      , toKey
      ;

    if (propertyKeys.length) {
      fromKey = propertyKeys.splice(0, 1)[0];
      if (propertyMap.hasOwnProperty(fromKey)) {
        toKey = propertyMap[fromKey];

        toObject = _mapKey(fromObject, fromKey, toObject, toKey);
      } else {
        toObject = null;
      }
      return _map(fromObject, toObject, propertyMap, propertyKeys);
    } else {
      return toObject;
    }
  }

  /**
   * Function that calls get and set key values
   * @param fromObject
   * @param fromKey
   * @param toObject
   * @param toKey
   * @private
   * @ignore
   */
  function _mapKey(fromObject, fromKey, toObject, toKey) {
    var fromValue = {};
    var restToKeys
      , _default = {}
      , transform
      ;

    if (Array.isArray(toKey) && toKey.length) {
      toKey = toKey.slice();
      restToKeys = toKey.splice(1);
      toKey = toKey[0];
    }

    if (toKey instanceof Object && Object.getPrototypeOf(toKey) === Object.prototype) {
      _default = toKey['default'] || {};
      transform = toKey.transform;
      toKey = toKey.key;
    }

    if (Array.isArray(toKey)) {
      transform = toKey[1];
      _default = toKey[2] || {};
      toKey = toKey[0];
    }

    if (typeof _default === 'function') {
      _default = _default(fromObject, fromKey, toObject, toKey);
    }

    fromValue = self.get(fromObject, fromKey);
    if (typeof fromValue === 'undefined' || fromValue === null) {
      fromValue = _default;
    }

    if (typeof fromValue !== 'undefined' && typeof transform === 'function') {
      fromValue = transform(fromValue, fromObject, toObject, fromKey, toKey);
    }

    if (typeof fromValue === 'undefined' || typeof toKey === 'undefined') {
      return toObject;
    }

    fromValue = fromValue || {};
    toObject = self.set(toObject, toKey, fromValue);

    if (Array.isArray(restToKeys) && restToKeys.length) {
      toObject = _mapKey(fromObject, fromKey, toObject, restToKeys);
    }

    return toObject;
  }

  return self;
})();

  /** [internal use]
  * Amplify Core 1.1.2
  *
  * Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
  * Dual licensed under the MIT or GPL licenses.
  * http://appendto.com/open-source-licenses
  *
  * http://amplifyjs.com
  * @ignore
  * @class ctx.amplify
  * @path ctx.amplify
  * @throws {Error}
  * @constructor
  */
  ctx.amplify = (function () {
    var self =
    /** @lends ctx.amplify */
    {
      /** [internal use]
      * Publishes a subscribed event
      * @ignore
      * @method publish
      * @path ctx.amplify.publish
      * @param {string} topic
      * @param {ctx.event} event
      * @return {number} the number of subscriptions for this event
      */
      publish : function (topic, event) {
        if (typeof topic !== "string") {
          throw new Error(e.error.InvalidArgument, "You must provide a valid topic to publish.");
        }

        var args = [],
        topicSubscriptions,
        sub,
        length,
        i = 0,
        nbSubs = 0,
        ret;

        var subs = ctx.subscriptions;
        if (!ctx.subscriptions[topic]) {
          return 0;
        }

        topicSubscriptions = ctx.subscriptions[topic].slice();
        //var bAllSubsAreSingle = true;
        for (length = topicSubscriptions.length; i < length; i++) {
          sub = topicSubscriptions[i];
          var oldSub = ctx.currentSubscription;
          ctx.currentSubscription = sub;
          //args = slice.call(arguments, 1);
          // copy current event as first argument for the callback
          args.push(event.copy());
          // add optional arguments for the callback
          if (sub.argument)
            args.push(sub.argument);
          var context = sub.context;
          if (!context) {
            if (event.page) {
              context = event.page;
            } else if (event.appli) {
              context = event.appli;
            }
          }

          if (sub.active) {
            ctx.currentStep = sub.step;

            ctx.notifyState((sub.single ? 'once' : 'on'), topic, sub.id, 'run', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));
            if (sub.single) {
              // trigger a single time : disable subscription
              sub.active = false
              //this.unsubscribe(topic, sub.context, sub.callback, true);
            }
            //  ctx.subscriptions[topic].splice(i, 1);
            //} else {
            //  bAllSubsAreSingle = false;
            //}

            // 25092015 experimental !! : make systematic asynchronous calls --> cancelled
            //sub.delay = sub.delay || 1;

            if (sub.delay) {
              // call after delay
              var timerIndex = ctx.objectIndex++;
              // Name the timer for debugging
              var strTimeoutName = 'delay(' + sub.delay + ')' ;
              ctx.notifyState('once', strTimeoutName, timerIndex, 'set', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));
              var timerId = setTimeout(function(sub, context, args) { return function() {
                ctx.notifyState('once', strTimeoutName, timerIndex, 'run', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));
                sub.timerId = 0;
                var oldSub = ctx.currentSubscription;
                var oldParentId = ctx.currentParentId;
                ctx.currentSubscription = sub;
                if (sub.step && sub.step.callFunction)
                {
                  var oldStep = ctx.currentStep;
                  ctx.currentStep = sub.step;
                  ctx.currentParentId = sub.id;
                  // call the function in the context of the step
                  ret = sub.step.callFunction(sub.callback, context, args);
                  ctx.currentStep = oldStep;
                } else {
                  // call without step context
                  ret = sub.callback.apply(context, args);
                }
                ctx.currentSubscription = oldSub;
                ctx.currentParentId = oldParentId;
                ctx.notifyState('once', strTimeoutName, timerIndex, 'reset', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));
              }; }(sub, context, args), sub.delay);
              if (sub.step)
              {
                sub.step.timers[timerIndex] = timerId;
              } else {
                sub.timerId = timerId;
              }
            } else {
              // call immediatly
              var oldParentId = ctx.currentParentId;
              ctx.currentParentId = sub.id;
              if (sub.step && sub.step.callFunction)
              {
                // call the function in the context of the step
                ret = sub.step.callFunction(sub.callback, context, args);
              } else {
                // call without step context
                ret = sub.callback.apply(context, args);
              }
              ctx.currentParentId = oldParentId;
            }
          }

          if (sub.single) {
            // trigger a single time : remove subscription
            this.unsubscribe(topic, sub.context, sub.callback);
            //ctx.notifyState((sub.single ? 'once' : 'on'), topic, sub.id, 'reset', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));
          } else {
            // permanent triggering : put it in 'set' state (if still active)
            if (sub.active) {
              ctx.notifyState('on', topic, sub.id, 'set', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));
            }
          }
          //ctx.currentStep = null;
          ctx.currentSubscription = oldSub;
          if (ret === false) {
            break; // cancel loop
          }
          nbSubs ++;
        }
        return nbSubs;
      },

      /** [internal use]
      * Registers a new event subscription
      * @ignore
      * @method subscribe
      * @path ctx.amplify.subscribe
      * @throws {Error}
      * @param {string} topic
      * @param {Object|function(ctx.event)} context or callback
      * @param {function(ctx.event)|Object|string|number} [callback] callback or priority
      * @param {number|string} [priority]
      * @param {*} [argument]
      * @param {boolean} [single]
      * @param {ctx.stepClass} [step]
      * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
      * @return {*} func
      */
      subscribe : function (topic, context, callback, priority, argument, single, step, delay) {
        if (typeof topic !== "string") {
          throw new Error(e.error.InvalidArgument, "You must provide a valid topic to create a subscription.");
        }

        if (arguments.length === 3 && typeof callback === "number") {
          priority = callback;
          callback = context;
          context = null;
        } else if (arguments.length === 2) {
          callback = context;
          context = null;
        }
        priority = priority || 10;

        var topicIndex = 0,
        topics = topic.split(/\s/),
        topicLength = topics.length,
        added;
        for (; topicIndex < topicLength; topicIndex++) {
          topic = topics[topicIndex];
          added = false;
          if (!ctx.subscriptions[topic]) {
            ctx.subscriptions[topic] = [];
          }

          var i = ctx.subscriptions[topic].length - 1,
          sub,
          subscriptionInfo = {
            name : topic,
            id : ctx.objectIndex++,
            active : true,
            callback : callback,
            context : context,
            priority : priority,
            single : single,
            argument : argument,
            step : step,
            timerId : 0,
            delay : delay
          };

          for (; i >= 0; i--) {
            sub = ctx.subscriptions[topic][i];
            if ((sub.callback.toString() === subscriptionInfo.callback.toString()) && (sub.context == subscriptionInfo.context) && (((sub.step && subscriptionInfo.step) ? (sub.step.id == subscriptionInfo.step.id) : true)))
            {
              // don't add several times the same topic/callback/context/step
              added = true;
              break;
            }
            if (sub.priority <= priority) {
              ctx.subscriptions[topic].splice(i + 1, 0, subscriptionInfo);
              added = true;
              break;
            }
          }

          if (!added) {
            ctx.subscriptions[topic].unshift(subscriptionInfo);
            ctx.notifyState((single ? 'once' : 'on'), topic, subscriptionInfo.id, 'set', '', (step ? step.name : ''), (step ? step.id : ''));
          }
        }

        return callback;
      },

      /** [internal use]
      * Unregisters an existing event subscription
      * @method unsubscribe
      * @path ctx.amplify.unsubscribe
      * @throws {Error}
      * @ignore
      * @param {string} topic
      * @param {Object|function(ctx.event)} context context or callback
      * @param {function(ctx.event)|Object} [callback]
      * @param {boolean} [noNotify]
      * @return {boolean} result true | false
      */
      unsubscribe : function (topic, context, callback, noNotify) {
        if (typeof topic !== "string") {
          throw new Error(e.error.InvalidArgument, "You must provide a valid topic to remove a subscription.");
        }

        if (arguments.length === 2) {
          callback = context;
          context = null;
        }

        if (!ctx.subscriptions[topic]) {
          return false;
        }

        var length = ctx.subscriptions[topic].length;
        for (var i = 0; i < length; i++) {
          var sub = ctx.subscriptions[topic][i];
          if (sub.callback === callback) {
            if (!context || sub.context === context) {
              // Adjust counter and length for removed item
              if (sub.timerId) { clearTimeout(sub.timerId); sub.timerId = 0; }
              sub.active = false;
              ctx.subscriptions[topic].splice(i, 1);
              i--;
              length--;
              if (!noNotify) { ctx.notifyState((sub.single ? 'once' : 'on'), topic, sub.id, 'reset', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : '')); }
            }
          }
        }
        if (ctx.subscriptions[topic].length === 0 ) {
          delete ctx.subscriptions[topic];
        }
        return true;
      },
      /** [internal use]
      * Unregisters all existing event subscriptions relative to a given step
      * @method unsubscribeStep
      * @path ctx.amplify.unsubscribeStep
      * @ignore
      * @param {ctx.stepClass} step step to unregister
      * @return {boolean} result true | false
      */
      unsubscribeStep : function (step) {
        if (!step) {
          return false;
        }
        // clear the active timers launched inside the step
        for (var index in step.timers) {
          if (step.timers[index]) {
            clearTimeout(step.timers[index]);
            delete step.timers[index];
            ctx.notifyState('once', 'timer' + index, parseInt(index, 10), 'reset', '', (step ? step.name : ''), (step ? step.id : -1));
          }
        }
        for (var topic in ctx.subscriptions) {
          var length = ctx.subscriptions[topic].length;
          for (var i = 0; i < length; i++) {
            var sub = ctx.subscriptions[topic][i];
            if (sub && (sub.step === step)) {
              // Adjust counter and length for removed item
              if (sub.timerId) {
                clearTimeout(sub.timerId);
                sub.timerId = 0;
              }
              sub.active = false;
              ctx.subscriptions[topic].splice(i, 1);
              i--;
              length--;
              ctx.notifyState((sub.single ? 'once' : 'on'), topic, sub.id, 'reset', '', (sub.step ? sub.step.name : ''), (sub.step ? sub.step.id : ''));
            }
          }
          if (ctx.subscriptions[topic].length === 0 ) {
            delete ctx.subscriptions[topic];
          }
        };
        return true;
      }
    }
    return self;
  }());

/** Project options and settings\\
*
* ''ctx.options'' contains the options for the SDK : a set of data pre-filled by Interactive at startup: versions, project, user, machine, ...
* @path ctx.options
* @class ctx.options
*/
ctx.options = {

  /** Anonymous mode (hides parameters in traces for confidentiality)
  * @property {boolean} anonymous
  * @path ctx.options.anonymous */ anonymous : false,

  /** Auto-test mode
  * @property {boolean} autoTest
  * @path ctx.options.autoTest */ autoTest : false,

  /** Break on exception
  * @property {boolean} breakException
  * @path ctx.options.breakException */ breakException : false,

  /** User canonical name
  * @property {string} canonicalName
  * @readonly
  * @path ctx.options.canonicalName */  canonicalName : '',

  /** Machine name
  * @property {string} computerName
  * @readonly
  * @path ctx.options.computerName */ computerName : '',

  /** Demo mode enabled/disabled
  * @property {boolean} demoMode
  * @path ctx.options.demoMode */ demoMode: false,

  /** timer duration (ms) for demo mode
  * @property {number} demoTimer
  * @path ctx.options.demoTimer */ demoTimer: 0,

  /** User display name
  * @property {string} displayName
  * @readonly
  * @path ctx.options.displayName */  displayName : '',

  /** Project environment (development, qualification, production, ...)
  * @path ctx.options.env
  * @property {string} env */ env : e.env.prod,

  /** Javascript antiloop mechanism (ms): minimum value is 10 000 ms, default is 300 000 ms (5 min)
  * @property {boolean} executionTimeout
  * @path ctx.options.executionTimeout */ executionTimeout: 300000,

  /** Language framework version
  * @property {string} frameworkVersion
  * @readonly
  * @path ctx.options.frameworkVersion */ frameworkVersion: '',

  /** User full login (including dommain)
  * @property {string} fullUserName
  * @readonly
  * @path ctx.options.fullUserName */ fullUserName : '',

  /** User qualified domain name
  * @property {string} fullyQualifiedDN
  * @readonly
  * @path ctx.options.fullyQualifiedDN */   fullyQualifiedDN : '',

  /** highlight color
  * @property {number} highlightColor
  * @path ctx.options.highlightColor */ highlightColor: ctx.rgb(0xff, 0, 0), // red

  /** Debug mode enabled
  * @path ctx.options.isDebug
  * @property {boolean} isDebug */ isDebug : false,

  licence: {
  /** Licence identifier
    * @property {string} licence.id
    * @readonly
    * @path ctx.options.licence.id */ id: '',

  /** Licence name
    * @property {string} licence.name
    * @readonly
    * @path ctx.options.licence.name */ name: '',

  /** Licence serial number
    * @property {string} licence.id
    * @readonly
    * @path ctx.options.licence.serial */ serial: ''

  },

  studioLicence: {
  /** Licence identifier
    * @property {string} licence.id
    * @readonly
    * @path ctx.options.studioLicence.id */ id: '',

  /** Licence name
    * @property {string} licence.name
    * @readonly
    * @path ctx.options.studioLicence.name */ name: '',

  /** Licence serial number
    * @property {string} licence.id
    * @readonly
    * @path ctx.options.studioLicence.serial */ serial: ''

  },

  path: {
  /** Folder containing Interactive binaries
    * @property {string} path.exec
    * @readonly
    * @path ctx.options.path.exec */  exec: '',

    /** Folder containing project files (alias for 'ctx.options.path.local')
    * @property {string} path.bin
    * @readonly
    * @ignore
    * @path ctx.options.path.bin */ bin: '',

    /** Folder containing project files
    * @property {string} path.local
    * @readonly
    * @path ctx.options.path.local */ local: '',

    /** Folder containing log and work files
    * @property {string} path.log
    * @readonly
    * @path ctx.options.path.log */ log: '',

    /** Folder containing resource files (bitmaps, ...)
    * @property {string} path.resources
    * @readonly
    * @path ctx.options.path.resources */ resources: '',

    /** Folder containing server project files
    * @property {string} path.server
    * @readonly
    * @path ctx.options.path.server */  server: ''
  },

  /** JScript engine version
  * @property {Object} JScriptVersion
  * @readonly
  * @path ctx.options.JScriptVersion */ JScriptVersion: '',

  /** options from command line
  * @property {Object} optionFiles
  * @readonly
  * @path ctx.options.optionFiles */ optionFiles: [],

  /** Product version
  * @property {string} productVersion
  * @readonly
  * @path ctx.options.productVersion */ productVersion : '',

  /** Array of component versions
  * @property {Object} productVersions
  * @readonly
  * @path ctx.options.productVersions */ productVersions: [],

  /** Server version
  * @property {string} serverVersion
  * @readonly
  * @path ctx.options.serverVersion */ serverVersion : '',

  /** Client name
  * @property {string} projectClient
  * @readonly
  * @path ctx.options.projectClient */ projectClient : '',

  /** Project free comment
  * @property {string} projectComment
  * @readonly
  * @path ctx.options.projectComment */ projectComment : '',

  /** Project date
  * @property {string} projectDate
  * @readonly
  * @path ctx.options.projectDate */ projectDate : '',

  /** Project icon
  * @property {string} projectIcon
  * @path ctx.options.projectIcon */ projectIcon : '',

  /** Project description
  * @property {string} projectLabel
  * @readonly
  * @path ctx.options.projectLabel */ projectLabel : '',

  /** Project name
  * @property {string} projectName
  * @readonly
  * @path ctx.options.projectName */ projectName : '',

  /** Project Uid
  * @property {string} projectUid
  * @readonly
  * @path ctx.options.projectUid */ projectUid : '',

  /** Project version
  * @property {string} projectVersion
  * @readonly
  * @path ctx.options.projectVersion */ projectVersion : '',

  /** settings container
  * @path ctx.options.settings
  * @property {ctx.dataClass} settings */ settings : null,

  /** simulation mode
  * @property {boolean} simulationMode
  * @path ctx.options.simulationMode */ simulationMode: false,

  /** shutdown confirmation
  * @property {boolean} shutdownConfirmation
  * @path ctx.options.shutdownConfirmation */ shutdownConfirmation: true,

  /** Scenario timeouts disabled (for debugging purpose)
  * @path ctx.options.timeoutDisabled
  * @property {boolean} timeoutDisabled */ timeoutDisabled : false,

  /** Unattended mode : remove all confirmation popups
  * @path ctx.options.unattended
  * @property {boolean} unattended */ unattended : false,

  /** Display a confirmation popup before restarting Contextor
  * @path ctx.options.restartConfirmation
  * @property {boolean} restartConfirmation */ restartConfirmation : false,

  /** Start Contextor Interactive when opening session
  * @path ctx.options.startAtLogon
  * @property {boolean} startAtLogon */ startAtLogon : undefined,

  /** Display a confirmation popup before restarting Contextor
  * @ignore (deprecated)
  * @path ctx.options.updateConfirmation
  * @property {boolean} updateConfirmation */ updateConfirmation : false,

  trace : {
    /** activate low level traces for actions
    * @path ctx.options.trace.actions
    * @advanced
    * @property {boolean} trace.actions */ actions : false,

    /** activate low level traces for actions (verbose)
    * @path ctx.options.trace.actionsFull
    * @advanced
    * @property {boolean} trace.actionsFull */ actionsFull : false,

    /** activate advanced low level traces
    * @path ctx.options.trace.advanced
    * @advanced
    * @property {boolean} trace.advanced */ advanced : false,

    /**
    * @path ctx.options.trace.alternativeTraceFile
    * @ignore
    * @property {string} trace.alternativeTraceFile */ alternativeTraceFile : '',

    /** enable auto-recording
    * @path ctx.options.trace.autoRecording
    * @property {boolean} trace.autoRecording */ autoRecording : false,

    /** result for auto-recording
    * @path ctx.options.trace.autoRecordingCode
    * @ignore
    * @property {e.error} trace.autoRecordingCode */ autoRecordingCode : e.error.OK,

    /** auto-recording status
    * @path ctx.options.trace.autoRecordingStarted
    * @ignore
    * @property {boolean} trace.autoRecordingStarted */ autoRecordingStarted : false,

    /** activate low level traces for context
    * @path ctx.options.trace.context
    * @property {boolean} trace.context */ context : false,

    /** display the Debugger v2 (old version)
    * @path ctx.options.trace.debuggerV2
    * @property {boolean} trace.debuggerV2 */ debuggerV2 : false,

    /** activate low level traces for errors
    * @path ctx.options.trace.errors
    * @property {boolean} trace.errors */ errors : false,

    /** activate low level traces for events
    * @path ctx.options.trace.events
    * @property {boolean} trace.events */ events : false,

    /** activate low level traces for extended connectors
    * @path ctx.options.trace.extendPilots
    * @property {boolean} trace.extendPilots */ extendPilots : false,

    /** activate framework traces notifications to the Studio
    * @path ctx.options.trace.frameworkNotify
    * @ignore
    * @property {boolean} trace.frameworkNotify */ frameworkNotify : false,

    /** activate framework traces to generate trace files (.PSCL)
    * @path ctx.options.trace.frameworkTraces
    * @ignore
    * @deprecated Rather use ctx.options.trace.recording
    * @property {boolean} trace.frameworkTraces */ frameworkTraces : false,

    /** activate framework traces to generate trace files (.PSCL)
    * @path ctx.options.trace.recording
    * @property {boolean} trace.recording */ recording : false,

    /** activate low level traces for message boxes
    * @path ctx.options.trace.messageBoxes
    * @property {boolean} trace.messageBoxes */ messageBoxes : false,

    /** activate low level traces for pages
    * @path ctx.options.trace.objects
    * @property {boolean} trace.objects */ objects : false,

    /** activate screenshot generation with traces
    * @path ctx.options.trace.screenshotTraces
    * @property {boolean} trace.screenshotTraces */ screenshotTraces : false,

    /** activate low level traces for Windows
    * @path ctx.options.trace.windowsEvents
    * @property {boolean} trace.windowsEvents */ windowsEvents : false
  },

  traceArchive: {
    /** max archive duration (number of days)
    * @property {boolean} traceArchive.maxDuration
    * @path ctx.options.traceArchive.maxDuration */ maxDuration: 5, // 5 days max

    /** max archive count (number of folder or ZIP files)
    * @property {boolean} traceArchive.maxCount
    * @path ctx.options.traceArchive.maxCount */ maxCount: 10 // 10 archives max
  },

  /** Folder containing traces
  * @property {string} traceFolder
  * @path ctx.options.traceFolder */ traceFolder : '',

  /** Folder containing traces for recording
  * @property {string} traceFolder
  * @path ctx.options.traceFolder */ traceFolderRecording : '',

  /** Trace level (global trace level for the framework)
  * @property {e.trace.level} traceLevel
  * @path ctx.options.traceLevel */ traceLevel: e.trace.level.None,

  /** Timestamp of the trace folder creation
  * @property {string} traceTimestamp
  * @path ctx.options.traceTimestamp */ traceTimestamp : '',

  /** User login
  * @property {string} userName
  * @path ctx.options.userName */ userName : '',

  /**
  * Reads an option
  * @method read
  * @path ctx.options.read
  * @param {string} module to be updated (part of 'ctx.options')
  * @param {string} option to be updated (part of 'ctx.options[module]')
  * @return {*} read value
  */
  read: function (module, option) {
    ctx.notifyAction('ctx.options.read');
    var node = (module ? ctx.options[module] : ctx.options);
    if (node) {
      // read in registry
      if ('string' === typeof module) module = module.replace(/[.]/g, '\\'); else module = '';
      var root = ctx.registry.getRoot(module, option);
      var value = ctx.registry.get(root);
      if ((node[option] !== undefined) && (value !== undefined)) {
        node[option] = value;
      }
      return node[option];
    }
  },

  /**
  * Updates an option
  * @method save
  * @path ctx.options.save
  * @param {string} module to be updated (part of 'ctx.options')
  * @param {string} option to be updated (part of 'ctx.options[module]')
  * @param {*} [state] self test mode status : true|false|undefined (if undefined, status is toggled)
  * @return {boolean} true if value was changed
  */
  save: function (module, option, state) {
    ctx.notifyAction('ctx.options.save');
    var node = (module ? ctx.options[module] : ctx.options);
    if (node) {
      var value = node[option];
      if ((typeof value === 'boolean') && (state === undefined)) {
        node[option] = !node[option];
      } else {
        node[option] = state;
      }
      if (node[option] !== value) {
        // save in registry
        if ('string' === typeof module) module = module.replace(/[.]/g, '\\'); else module = '';
        var root = ctx.registry.getRoot(module, option);
        ctx.registry.set(root, node[option]);
        return true;
      }
    }
    return false;
  }
};
/**
* __Ex.:__
*
<code javascript>
ctx.options :
{
  // pre-defined data
  currentURL: "D:\\Projects\\Tools\\samplesV3\\demoLanguageV3\\bin",
  currentDir: "D:\\Projects\\Tools\\samplesV3\\demoLanguageV3\\log",
  serverURL: "D:\\Projects\\Tools\\samplesV3\\demoLanguageV3\\server",
  resourceURL: "D:\\Projects\\Tools\\samplesV3\\demoLanguageV3\\bin",
  execDir: "C:\\Program Files (x86)\\SAP\...",
  frameworkVersion: "3.0.17",
  productVersion: "3.0.5.3",
  projectVersion: "1.12",
  projectClient: "R and D",
  projectName: "demoLanguageV3",
  projectDate: "26/05/2015",
  projectLabel: "Language v3 Demo",
  projectComment: "Provides a set of demonstration cases based on language v3",
  traces {
    ...
  }
  ...
}
</code>
*
*/

/**
 * Module for resource management
 * @class ctx.resources
 * @path ctx.resources
 * @constructor
 */
ctx.resources = (function() {
  //var _dom = undefined;
  var _map = [];
  var _dom = undefined;
  var self =
  /** @lends ctx.resources */
  {

    /**
    * Clears the content of the clipboard
    * @description
    * __Ex.:__
<code javascript>
ctx.resources.clear();
</code>
    * @method clear
    * @ignore
    * @path ctx.resources.clear
    */
    clear : function(type) {
      for (var id in self.data) {
      }
    },

    /**
    * Loads an Html file, replaces image files with base 64 string
    * @description
    * __Ex.:__
<code javascript>
</code>
    * @method loadHtml
    * @path ctx.resources.loadHtml
    * @param {string} filePath Html file to be loaded
    * @return {string} file content
    */
    loadHtml: function(filePath) {
      var filename = filePath;
      if (filename && (!ctx.fso.isPathAbsolute(filename))) {
        if ((!filename.startsWith('/')) && (!filename.startsWith('\\')))
          filename = '\\' + filename;
        filename = ctx.options.path.resources + filename;
      }
      var htmlCode = ctx.fso.file.read(filename);
      htmlCode = htmlCode.replace(/[\n\t\r]/gi, '');

      var rootPath = filename.substring(0, Math.max(filename.lastIndexOf("/"), filename.lastIndexOf("\\")));
      var posEnd = -1;
      var posBeg = -1;
      var loop = true;
      var image = '';
      var code;
      while (loop) {
        image = '';
        posEnd = htmlCode.indexOf('.png"', posEnd); // todo : manage all image types, manage ' and "
        if (posEnd > 0) {
          posBeg = htmlCode.lastIndexOf('"', posEnd);
          if (posBeg > 0) {
            image = htmlCode.substring(posBeg + 1, posEnd + 4);
            image = self.loadImageAsBase64(image, rootPath);
            code = htmlCode;
            htmlCode = code.substring(0, posBeg + 1) + image + code.substring(posEnd + 3);
            posEnd += 5;
          }
        } else {
          loop = false;
        }
      }
      return htmlCode;
    },

    /**
    * Loads an image file and converts it to a base 64 string
    * @description
    * __Ex.:__
<code javascript>
var icon = loadImageAsBase64("bmp\\theIcon.png", ctx.options.path.resources);
</code>
    * @method loadImageAsBase64
    * @path ctx.resources.loadImageAsBase64
    * @param {string} filePath image filename
    * @param {string} [rootPath] optional root path (if filePath is a relative path)
    * @return {string} image as a base 64 string
    */
    loadImageAsBase64: function (filePath, rootPath) {
      var filename = filePath;
      if (filePath && (!ctx.fso.isPathAbsolute(filePath))) {
        if ((!filename.startsWith('/')) && (!filename.startsWith('\\')))
          filename = '\\' + filename;
        rootPath = rootPath || ctx.options.path.resources;
        filename = rootPath + filename;
      }
      try {
        var bytes = ctx.fso.file.read(filename, e.file.encoding.Binary);
        //_dom = _dom || new ActiveXObject('Microsoft.XMLDOM');
        var _dom = new ActiveXObject('Microsoft.XMLDOM');
        var elem = _dom.createElement('tmpCtxt');
        elem.dataType = e.ajax.content.base64;
        elem.nodeTypedValue = bytes;
        var res = 'data:image/png;base64,' + elem.text.replace(/[^A-Z\d+=\/]/gi, '');
        return res;
      } catch (ex) {
        ctx.log('ctx.resources.loadImageAsBase64: could not load \'' + filePath + '\'', e.logIconType.Warning);
      }
      return filePath;
    }
  };
  return self;
})();


  /**
  * Function used to implement page and item actions
  * @description
  * __Ex.:__
  * <code javascript>
  * return ctx.action(desc, 'set', 'SETVALUE', 'John');
  * </code>
  * @method action
  * @path ctx.action
  * @throws {Error}
  * @ignore
  * @param {ctx.descriptor} desc object descriptor (application, page, item) (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
  * @param {string} name action name
  * @param {string} language framework language verb
  * @param {string|number|Object} [data] parameter(s) associated with the object
  * @param {string} [prefix] optional prefix used to qualify action
  * @param {string} [minVersion] minimum engine version required for the action
  * @return {string} result value
  * @suppress {es5Strict } warning 'arguments.callee'
  */
  ctx.action = function (desc, language, name, data, prefix, minVersion) {
    var res = '';
    var params = undefined;
    if (ctx.engineStarted) {
      data = ctx.serialize(data, false, false);
      prefix = prefix || '';
      var itemName = (prefix ? prefix + desc.itemFullName : desc.itemFullName) || '';
      try {
        params = (arguments.callee.caller.arguments ? Array.prototype.slice.call(arguments.callee.caller.arguments) : undefined);
        try {
          if (ctx.options.demoTimer > 0) {
            if (desc.item && desc.item.highlight) {
              // demo mode : highlight item with a synchronous tempo
              desc.item.highlight(ctx.options.demoTimer, true, false);
            } else if (desc.page && desc.page.highlight) {
              // demo mode : highlight page with a synchronous tempo
              desc.page.highlight(ctx.options.demoTimer, true, false);
            }
          }
        } catch (ex) { }
        if (minVersion && ctx.compareVersion(minVersion) < 0) {
          ctx.notifyAction(language, res, desc, name, params);
          ctx.log(desc.appliName + '.' + desc.pageName + (itemName ? ('.' + itemName) : '') + '.' + language + ': requires minimum version ' + minVersion, e.logIconType.Warning);
          return res;
        }
        if (desc.appliInst < 0) {
          ctx.log(desc.appliName + '.' + desc.pageName + (itemName ? ('.' + itemName) : '') + '.' + language + ': there is no running instance', e.logIconType.Warning);
        }
        if (ctx.actionFunction[desc.nature])
          res = ctx.actionFunction[desc.nature](name, desc.appliName, desc.pageName, itemName, 0, data, desc.appliInst, desc.pageInst, desc.itemInst);
        else
          res =  ctx.wkMng.CtxtAction(name, desc.appliName, desc.pageName, itemName, 0, data, desc.appliInst, desc.pageInst, desc.itemInst);
        ctx.notifyAction(language, res, desc, name, params);
        if ((!language) || (!name)) {
          throw new Error(e.error.Fail, "ctx.action : action undefined" );
        }
      } catch (ex) {
        ctx.notifyAction(language, res, desc, name, params);
        throw new Error(e.error.Fail, desc.appliName + '.' + desc.pageName + (itemName ? ('.' + itemName) : '') + '.' + language + ': ' + ex.message );
      }
    }
    return res;
  };

  /**
  * Function used to implement page and item actions
  * @description
  * __Ex.:__
<code javascript>
return ctx.actionApp(desc, 'SETTEXT', 'The title');
</code>
  * @method actionApp
  * @ignore
  * @path ctx.actionApp
  * @param {ctx.descriptor} desc object descriptor (application, page, item) (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
  * @param {string} language framework language verb
  * @param {string} name action name
  * @param {string|number|Object} [P1] parameter 1
  * @param {string|number|Object} [P2] parameter 2
  * @param {string|number|Object} [P3] parameter 3
  * @param {string|number|Object} [P4] parameter 4
  * @param {string|number|Object} [P5] parameter 5
  * @param {string} [minVersion] minimum engine version required for the action
  * @return {string} result value
  * @suppress {es5Strict } warning 'arguments.callee'
  */
  ctx.actionApp = function (desc, language, name, P1, P2, P3, P4, P5, minVersion) {
    var res = '';
    var params = '';
    if (ctx.engineStarted) {
      /** @type {string} */ var sP1 = ctx.serialize(P1, false, false);
      /** @type {string} */ var sP2 = ctx.serialize(P2, false, false);
      /** @type {string} */ var sP3 = ctx.serialize(P3, false, false);
      /** @type {string} */ var sP4 = ctx.serialize(P4, false, false);
      /** @type {string} */ var sP5 = ctx.serialize(P5, false, false);
      try {
        params = (arguments.callee.caller.arguments ? Array.prototype.slice.call(arguments.callee.caller.arguments) : undefined);
        try {
          if ((ctx.options.demoTimer > 0) && (name != 'GETRECT')) {
            if (desc.item && desc.item.highlight) {
              // demo mode : highlight item with a synchronous tempo
              desc.item.highlight(ctx.options.demoTimer, true, false);
            } else if (desc.page && desc.page.highlight) {
              // demo mode : highlight page with a synchronous tempo
              desc.page.highlight(ctx.options.demoTimer, true, false);
            }
          }
        } catch (ex) { }
        if (minVersion && ctx.compareVersion(minVersion) < 0) {
          ctx.notifyAction(language, res, desc, name, params);
          ctx.log(desc.appliName + '.' + desc.pageName + '.' + language + ': requires minimum version ' + minVersion, e.logIconType.Warning);
          return res;
        }
        if (desc.appliInst < 0) {
          ctx.log(desc.appliName + '.' + desc.pageName + '.' + language + ': there is no running instance', e.logIconType.Warning);
        }
        if (ctx.actionAppFunction[desc.nature])
          res = ctx.actionAppFunction[desc.nature](name, desc.appliName, desc.pageName, sP1, sP2, sP3, sP4, sP5, desc.appliInst, desc.pageInst, desc.itemInst);
        else
          res = ctx.wkMng.CtxtActionApp(name, desc.appliName, desc.pageName, sP1, sP2, sP3, sP4, sP5, desc.appliInst, desc.pageInst, desc.itemInst);
        if ((!language) || (!name)) {
          throw new Error(e.error.Fail, "ctx.actionApp : action undefined" );
        } else {
          ctx.notifyAction(language, res, desc, name, params);
        }
      } catch (ex) {
        ctx.notifyAction(language, res, desc, name, params);
        throw new Error(e.error.Fail, desc.appliName + '.' + desc.pageName + '.' + language + ': '+ ex.message );
      }
    }
    return res;
  };

	/**
  * Function used to implement global actions
  * @description
  * __Ex.:__
<code javascript>
return ctx.verbExec(desc, 'regHotKey', 'REGHOTKEY', {
  Value: shortcut,
  Proc: event.appliName,
  Event: event.name
});
</code>
  * @method verbExec
  * @path ctx.verbExec
  * @throws {Error}
  * @ignore
  * @param {ctx.descriptor} desc object descriptor (application, page, item) (see [[lib:ctx:ctx.core#class_ctxdescriptor|ctx.descriptor]])
  * @param {string} name action name
  * @param {string} language framework language verb
  * @param {Object} [params] parameters
  * @param {string} [subcommand]
  * @param {boolean} [pageReset] if true, reset page name and instance (false by default)
  * @param {string} [minVersion] minimum engine version required for the action
  * @return {string} result value
  * @suppress {es5Strict } warning 'arguments.callee'
  */
  ctx.verbExec = function (desc, language, name, params, subcommand, pageReset, minVersion) {
    desc = desc || ctx.getDescriptor();
    var res = '';
    var params2 = '';
    if (ctx.engineStarted) {
      try {
        params2 = (arguments.callee.caller.arguments ? Array.prototype.slice.call(arguments.callee.caller.arguments) : undefined);
        if ((!language) || (!name)) {
          throw new Error(e.error.Fail, "ctx.verbExec : action undefined" );
        }
        var noAppli = false;
        if (!desc.appliName) {
          noAppli = true;
          GLOBAL.getObjectDescriptor(desc);
        }
        if (minVersion && ctx.compareVersion(minVersion) < 0) {
          ctx.notifyAction(language, res, desc, name, params2);
          ctx.log('ctx.verbExec \'' + language + '\' : requires minimum version ' + minVersion, e.logIconType.Warning);
          return res;
        }
        var cmd = ctx.getXMLSyntax(name, params, subcommand);
        if (pageReset) {
          // reset page name before calling 'verbExec' (for instance, 'EXIST' is not a 'page' verb, but an 'application' verb)
          desc.pageName = '';
          desc.pageInst = -1;
        }
        if (desc.appliInst < 0) {
          ctx.log('ctx.verbExec \'' + language + '\' : there is no running instance ', e.logIconType.Warning);
        }
        res = ctx.wkMng.CtxtVerbExec(cmd, desc.appliName, desc.pageName, desc.appliInst, desc.pageInst);
        if(noAppli) {
          desc.appliName = 'ctx';
          desc.appliInst = -1;
        }
        ctx.notifyAction(language, res, desc, name, params2);
      } catch (ex) {
        ctx.notifyAction(language, res, desc, name, params2);
        throw new Error(e.error.Fail, 'ctx.verbExec \'' + language + '\' : ' + ex.name + ' ' + ex.message );
      }
    }
    return res;
  };

ctx.execMethod = function (desc, method, params) {
  var param ='';
  var args = Array.prototype.slice.call(arguments);
  for (var i=2; i<args.length; ++i) {
	  var a = args[i];
	  if (i > 2) param +='|';
	  param += typeof a ==="string" ? a.replace("^", "^^").replace("|", "^|") : a;
  }
  return ctx.actionApp(desc, 'execMethod', 'EXECMETHOD', method, desc.itemFullName, param, "", "");
}

ctx.onScriptTimeOut = function(appliName, pageName, itemName, itemIndex, event, data, appliInst, pageInst, itemInst, reqAppliName, reqEventName, reqItemName, reqAppliInst) {
  ctx.log('Execution timeout in event: ' + appliName + '.' + pageName + (itemName ? '.' + itemName : '') + ':' + event, e.logIconType.Error);
};

// ******************************
// *** Event handler callback ***
// ******************************
/**
* Main entry callback to dispatch events from WkMng
* @method onEvent
* @path ctx.onEvent
* @ignore
* @param {string} appliName   application or process name
* @param {string} pageName page name
* @param {string} itemName item name
* @param {number} itemIndex item index
* @param {string} event event name
* @param {*} data
* @param {number} appliInst application or process instance
* @param {number} pageInst page instance
* @param {number} itemInst item instance
* @param {string} reqAppliName source application or process name
* @param {string} reqEventName source event name
* @param {string} reqItemName source item name
* @param {number} reqAppliInst source application or process instance
* @return {boolean} result
*/
ctx.onEvent = function (appliName, pageName, itemName, itemIndex, event, data, appliInst, pageInst, itemInst, reqAppliName, reqEventName, reqItemName, reqAppliInst) {
  var res = false;

  if ((!appliName) && (!event))
    return true; // test at startup to detect framework

  if (event == '_BREAK_EXCEPTION_') {
    ctx.options.breakException = (data == 'Y' ? true : false);
    return true;
  }

  if ((event == 'VERSION') || (event == '_VERSION_')) {
    ctx.updateProductVersion();
    return true;
  }

  // before GLOBAL:START or after GLOBAL:END, don't manage events
  if (!ctx.engineStarted) {
    if ((appliName == GLOBAL.name) && (event == e.event.application.START)) {
      ctx.onEnginePrestart();
    }
  }
  if (!ctx.eventTriggered) {
    // differ GLOBAL START and INIT
    if ((appliName == GLOBAL.name)) {
      ctx.pendingEvents.push([appliName, pageName, itemName, itemIndex, event, data, appliInst, pageInst, itemInst, reqAppliName, reqEventName, reqItemName, reqAppliInst]);
      return true;
    }
  }

  // correct Expbar2 events which are un-coherent. Ex. : event='EXPBAR2', Page='', Item='evVersion'
  if (pageName === '' && itemName !== '') {
    pageName = event;
    event = itemName;
    itemName = '';
  }

  if (itemName) {
    // for occursed item, itemName can be formatted as item[index] : extract name and index
    var posBeg = itemName.indexOf('[');
    if (posBeg > 0)
    {
      var posEnd = itemName.indexOf(']', posBeg);
      if (posEnd > 0)
      {
        itemIndex = parseInt(itemName.substring(posBeg + 1, posEnd), 10);
        itemName = itemName.substring(0, posBeg);
      }
    }
  }

  var bRemovePage = false;
  var bUndefinedPage = false;
  var bRemoveApp = false;

  // build real application or page instances when receiving 'START', 'END', 'LOAD', 'UNLOAD'
  switch (event) {
    case e.event.application.START:
    {
      if (ctx.app[appliName]) {
        ctx.app[appliName].cloneApplication(appliInst)
      }
      break;
    }
    case e.event.application.END:
    {
      if (ctx.app[appliName] && ctx.app[appliName][appliInst]) {
        bRemoveApp = true;
      }
      break;
    }
    case e.event.page.LOAD:
    {
      // undeclared page management (eg. : '_Undefined_' for HLLAPI or WEB)
      if (!ctx.app[appliName][pageName]) {
        bUndefinedPage = true;
        ctx.app[appliName].addPage(pageName);
      }
      // instantiate 'real' instances
      //ctx.app[appliName][pageName].clonePage(ctx.app[appliName], pageInst);
      ctx.app[appliName][pageName].clonePage(ctx.app[appliName][appliInst], -1);
      ctx.app[appliName][pageName].clonePage(ctx.app[appliName][appliInst], pageInst);
      break;
    }
    case e.event.page.UNLOAD:
    {
      bRemovePage = true;
      break;
    }
  }

  var ev = new ctx.event(event);
  if ((event.startsWith('$')) || (event.startsWith('_'))) { ev.internal = true; }

  // set current page for this application
  // set current page and application for the event
  ev.page = ev.appli = null;
  var previousCurrentPage = ctx.app[appliName].currentPage;
  var previousCurrentInstPage = (ctx.app[appliName][appliInst] ? ctx.app[appliName][appliInst].currentPage : null);
  if (appliName !== '' && pageName !== '' && ctx.app[appliName]) {
    ctx.app[appliName].currentPage = null;
    if (ctx.app[appliName][appliInst]) { ctx.app[appliName][appliInst].currentPage = null; }
  }

  if ((appliName !== '') && ctx.app[appliName]) {
    ev.appli = ctx.app[appliName][appliInst];
  }

  if ((appliName !== '') && (pageName !== '') && ctx.app[appliName] && ctx.app[appliName][appliInst] && ctx.app[appliName][appliInst][pageName]) {
    ev.page = ctx.app[appliName][appliInst][pageName][pageInst];
    if (bUndefinedPage && (previousCurrentInstPage || previousCurrentPage)) {
      // undefined page received : keep the previously defined current page
      ctx.app[appliName][appliInst].currentPage = previousCurrentInstPage;
      ctx.app[appliName].currentPage = previousCurrentPage;
    } else if (!bRemovePage) {
      ctx.app[appliName][appliInst].currentPage = ev.page;
      ctx.app[appliName].currentPage = ev.page;
    }
  }

  ev.appliName = appliName;
  ev.appliInst = appliInst;
  ev.pageName = pageName;
  ev.pageInst = pageInst;
  ev.itemName = itemName;
  ev.itemInst = itemInst;
  ev.itemIndex = itemIndex;
  ev.index = []; // [index]
  ev.nbInst = (ctx.app[appliName] ? ctx.app[appliName].nbInst : 0);
  ev.name = event;
  if ('string' === typeof data)
    ev.data = ctx.unserialize(data);
  else
    ev.data = data;
  if (ev.data && ev.data.ctxName) {
    ev.data = ctx.dataManagers.create(ev.data); // create a ctx.dataManager object
  }
  ev.reqAppliName = reqAppliName;
  ev.reqAppliInst = reqAppliInst;
  ev.reqEventName = reqEventName;
  ev.reqItemName = reqItemName;
  ev.parent = (ev.page ? ev.page : ev.appli);

  if (ctx.app[appliName] && ctx.app[appliName].events[event] && ctx.app[appliName].events[event].internal) {
    ev.internal = true;
  } else if (ctx.app[appliName] && ctx.app[appliName][pageName] && ctx.app[appliName][pageName].events[event] && ctx.app[appliName][pageName].events[event].internal) {
    ev.internal = true;
  }

  if (!ev.internal) {
    if (ev.appli)
      ctx.currentAppli = ev.appli;
    if (ev.page)
      ctx.currentPage = ev.page;
    ctx.currentEvent = ev;
  }

  if (event == '_ERROR')
  {
    var sav = ctx.options.trace.frameworkNotify ;
    ctx.options.trace.frameworkNotify = true ;
    ctx.notifyError(data, 'Error');
    ctx.options.trace.frameworkNotify = sav ;
  }

  if (ev.page && ev.page.onLoad && (event == e.event.page.LOAD)) {
    // memorize page hWnd, useful for screenshot for example
    ev.page.onLoad(ev);
  }

  if ((ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkNotify || ctx.options.trace.recording) && (!ev.internal)) {
    ctx.notifyEvent(ev);
  }

  // if ctx.breakException = true : call event callback without catching exceptions
  if (ctx.options.breakException) {
    res = ctx.onEvent2(ev);
  } else {
    try {
      res = ctx.onEvent2(ev);
    } catch (ex) {
      ctx.log(ex, e.logIconType.Error, ex.message );
      return false;
    }
  }

  // if 'UNLOAD' event received, clean up the page instances
  if (bRemovePage) {
    var pg;
    if (ctx.app[appliName]) {
      ctx.app[appliName].removePage(appliInst, pageName, pageInst);
    }
  }
  // if 'END' event received, clean up the application instances
  if (bRemoveApp) {
    if (ctx.app[appliName] && ctx.app[appliName][appliInst]) {
      ctx.app[appliName].removeApplicationInstance(appliInst);
      if (ctx.app[appliName].defaultInst == appliInst) {
        ctx.app[appliName].defaultInst = -1; // the default instance is closed
      }
    }
  }

  // if there are pending callbacks, call them at the end of treatment
  var func = null;
  while ((func= ctx.pendingFunctions.shift()) != null) {
    func.apply();
  }

  // keep a copy of last received event
  ctx.lastEvent = ev.copy()

  // reset current event on exit
  ev.clear();

  // clear legacy variables
  _Work0_ = '';
  _Work1_ = '';
  _Work2_ = '';
  _Work3_ = '';
  _Work4_ = '';
  _Work5_ = '';
  _Work6_ = '';
  _Work7_ = '';
  _Work8_ = '';
  _Work9_ = '';

  // *** engine stopped ***
  if ((appliName == GLOBAL.name) && (event == e.event.application.END)) {
    ctx.onEngineStop();
  }

  return res;
}

/**
 * Sub entry callback to dispatch events from WkMng (without try/catch management)
 * @method onEvent2
 * @path ctx.onEvent2
 * @ignore
 * @param {ctx.event} ev event object
 * @return {boolean} result
 */
ctx.onEvent2 = function (ev) {
  var evName = ev.appliName;
  if (ev.appliName != 'GLOBAL') {
    // publish event for 'GLOBAL'
    if ((ctx.app['GLOBAL'].events[ev.name] !== undefined) && (!ctx.app['GLOBAL'].events[ev.name].technical)) {
      ctx.amplify.publish('GLOBAL' + ":" + ev.name, ev);
    }
    if (ctx.app['GLOBAL'].events[ctx.anyEvent] !== undefined) {
      ctx.amplify.publish('GLOBAL' + ":" + ctx.anyEvent, ev);
    }
  }
  // publish event for 'appli' (if it is declared)
  if (ctx.app[ev.appliName].events) {
    if (ctx.app[ev.appliName].events[ev.name] !== undefined) {
      ctx.amplify.publish(evName + ":" + ev.name, ev);
    }
    if (ctx.app[ev.appliName].events[ctx.anyEvent] !== undefined) {
      ctx.amplify.publish(evName + ":" + ctx.anyEvent, ev);
    }
  }
  if (ev.pageName) {
    // publish event for 'appli.page'
    evName += "." + ev.pageName;
    if (ctx.app[ev.appliName].pages[ev.pageName] && ctx.app[ev.appliName].pages[ev.pageName].events) {
      if (ctx.app[ev.appliName].pages[ev.pageName].events[ev.name] !== undefined)
        ctx.amplify.publish(evName + ":" + ev.name, ev);
      if (ctx.app[ev.appliName].pages[ev.pageName].events[ctx.anyEvent] !== undefined)
        ctx.amplify.publish(evName + ":" + ctx.anyEvent, ev);
    }
  }
  if (ev.itemName) {
    evName += "." + ev.itemName;
    // publish event for 'appli.page.item'
    if (ctx.app[ev.appliName].pages[ev.pageName] && ctx.app[ev.appliName].pages[ev.pageName].items[ev.itemName] && ctx.app[ev.appliName].pages[ev.pageName].items[ev.itemName].events) {
      if (ctx.app[ev.appliName].pages[ev.pageName].items[ev.itemName].events[ev.name] !== undefined) {
        ctx.amplify.publish(evName + ":" + ev.name, ev);
      }
      if (ctx.app[ev.appliName].pages[ev.pageName].items[ev.itemName].events[ctx.anyEvent] !== undefined) {
        ctx.amplify.publish(evName + ":" + ctx.anyEvent, ev);
      }
    }
    if (ev.pageName && ev.pageName.startsWith('_')) {
      var pageName = ev.pageName.substring(1);
      if (ctx.app[ev.appliName].popups[pageName] && ctx.app[ev.appliName].popups[pageName].items[ev.itemName] && ctx.app[ev.appliName].popups[pageName].items[ev.itemName].events) {
        //evName = ev.appliName + "." + pageName + "." + ev.itemName;
        if (ctx.app[ev.appliName].popups[pageName].items[ev.itemName].events[ev.name] !== undefined) {
          ctx.amplify.publish(evName + ":" + ev.name, ev);
        }
        if (ctx.app[ev.appliName].popups[pageName].items[ev.itemName].events[ctx.anyEvent] !== undefined) {
          ctx.amplify.publish(evName + ":" + ctx.anyEvent, ev);
        }
      }
    }
  }
  return true;
};

/** [Internal usage]
* Returns the short description for serialization
* @ignore
* @method ctxShort
* @path ctx.ctxShort
* @param {*} obj
* @return {*} result
*/
ctx.ctxShort = function(obj) {
  var res;
  if (Array.isArray(obj))
    res = [];
  else
    res = {};
  return ctx.set(obj, res, undefined, undefined, undefined, undefined, undefined, 6, true);
}

/**
* Evaluates a JavaScript expression, returns a serialized object
* @description
* __Ex.:__
<code javascript>
var txt = ctx.eval( "MyAppli.start();" );
</code>
* @ignore
* @method eval
* @path ctx.eval
* @param {string} expression JavaScript expression to be evaluated
* @param {boolean} [serialize] if true or omitted, the result is serialized in JSON
* @return {*} evaluation result (serializedi in JSON if result is an object )
*/
ctx.eval = function ( expression, serialize ) {
  try {
    var res = eval ( expression );
    if ((typeof res === 'object') && (serialize !== false)) {
      res = ctx.serialize(res, false, false, '\t', true);
    }
    return res;
  }
  catch(exc) {
    // "!Error: " prefix to identify errors on Debugger side
    return "!Error: " + exc.description;
  }
}

/** Overload the evaluation fonction
* @path CtxtCompute
* @ignore
*/
CtxtCompute = ctx.eval;

/** Add an alias on the event callback to interface with WkMng
* @ignore
* @path onCtxEvent
*/
var onCtxEvent = ctx.onEvent;

/** Add an alias on the event callback for script tiemout notifications
* @ignore
* @path OnScriptTimeOut
*/
var OnScriptTimeOut = ctx.onScriptTimeOut;

