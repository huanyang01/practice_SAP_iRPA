/**
 * @file        ctx\ctx.application.js
 * @module      Class for applications management
 * @description The ''ctx.application'' class implements the applications and processes declared in the project, especially to perform actions: start, close, ...\\
 * \\
 * Application objects can also receive notifications : START or END, ...\\
 * \\
 * Typical syntaxes:
 *   * calling a page action:
 * <code javascript>
 *   <application>.<action>( parameters... );
 * </code>
 *
 * __Example:__
 * <code javascript>
 *   // start application
 *   MyAppli.start();
 * </code>
 *
 *   * receiving a notification:
 *     * by setting an handler on an existing event
 * <code javascript>
 *   <application>.events.<event>.on( function( ev ) {
 *     // add code here...
 *   });
 * </code>
 *
 * __Example:__
 * <code javascript>
 *   // detect application START
 *   MyAppli.events.START.on( function( ev ) {
 *     // add code here...
 *   });
 * </code>
 *
 *     * or by declaring a new event and setting an handler
 * <code javascript>
 *   <application>.on( {<event>: function( ev ) {
 *     // add code here...
 *   }});
 * </code>
 *
 * __Example:__
 * <code javascript>
 *    // declare a functional event 'evLogin'
 *    MyAppli.on( { evLogin: function( ev ) {
 *      // add code here...
 *    }} );
 * </code>
 *
 * You can also declare a new event for later use.
 * <code javascript>
 *   // declare a new event on this application
 *   <application>.addEvent( {<event>: ''} );
 *   (...)
 *   // set a single handler on this event
 *   <application>.events.<event>.once( function( ev ) {
 *      // add code here...
 *   } );
 *   ( ... )
 *   // notify this event
 *   <application>.notify( <application>.events.<event>, data );
 * </code>
 *
 * __Example:__
 * <code javascript>
 *   // declare a functional event on MyAppli
 *   MyAppli.addEvent( { evLogin: '' } );
 *   ( ... )
 *   // Login step
 *   MyAppli.step( { stLogin: function( ev, sc, st ) {
 *     var data = sc.data;
 *     (...)
 *     // wait for event in step
 *     MyAppli.events.evLogin.once( function( ev ) {
 *       (...)
 *       sc.endStep( );
 *     } );
 *   } );
 *   (...)
 *   // notify this event
 *   MyAppli.notify( MyAppli.events.evLogin, { ... } );
 * </code>
 * \\
 * // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application.//
 * @author      SAP Intelligent RPA R&D team
 * 
 */

/**
 * application constructor class
 * @class ctx.application
 * @path ctx.application
 * @constructor
 * @advanced
 * @param {string} name application name
 * @param {Object} [obj] optional parameters (internal usage)
 */
ctx.application = function (name, obj) {
  if (!(this instanceof ctx.application))
    return new ctx.application(name, obj); // in case 'new' was not used

  var _app = this;

  /** class type
  * @ignore
  * @const
  * @path ctx.application.ctxType
  * @property {string} */ this.ctxType = 'ctx.application';

  /** application object
  * @path ctx.application.appli
  * @advanced
  * @property {ctx.application} */ this.appli = this;

  /** application comment
  * @path ctx.application.comment
  * @advanced
  * @property {string} */ this.comment = "";

  /** current page
  * @path ctx.application.currentPage
  * @property {ctx.page} */ this.currentPage = null,

  /** application custom type
  * @path ctx.application.customType
  * @advanced
  * @property {string} customType */ this.customType = '';

  /** data container
  * @path ctx.application.data
  * @property {ctx.dataClass} */ this.data = ctx.dataManager(null);

  // memorize application name and instance in data object
  this.data.appliName = name;
  this.data.appliInst = -1;

  /** internal data container
  * @advanced
  * @path ctx.application.dataInternal
  * @property {ctx.dataClass} */ this.dataInternal = ctx.dataManager(null);

  /** data template container
  * @path ctx.application.dataTemplates
  * @property {ctx.dataClass} */ this.dataTemplates = ctx.dataManager(null);

  /**
  * @path ctx.application.defaultInst
  * @ignore
  * @property {number} */ this.defaultInst = -1;

  /** event list
  * @path ctx.application.events
  * @property {Object<string, ctx.event>} */ this.events = {  };

  /** function list
  * @path ctx.application.functions
  * @property {Object} */ this.functions = {  };

  /** application instance number
  * @path ctx.application.instance
  * @advanced
  * @property {number} */ this.instance = -1;

  /** list of application instances
  * @path ctx.application.instances
  * @property {Object<number, ctx.application>} */ this.instances = {};

  /** 'true' for a process, 'false' for an application
  * @path ctx.application.isProcess
  * @property {boolean} */ this.isProcess = true;

  /** 'true' if the application is a Web application
  * @path ctx.application.isWeb
  * @property {boolean} */ this.isWeb = false;

  /** label manager for the application
  * @path ctx.application.labels
  * @property {ctx.labelManager} */ this.labels = new ctx.labelManager();

  /** application model (root) object
  * @path ctx.application.model
  * @ignore
  * @property {ctx.application} */ this.model = this;

  /** application name
  * @path ctx.application.name
  * @property {string} */ this.name = name;

  /** application nature (technology : Windows, Web, ...)
  * @path ctx.application.nature
  * @advanced
  * @property {e.nature} */ this.nature = "";

  /** for a web application, navigator to use (default is ''e.navigator.IE'')
  * @path ctx.application.navigator
  * @property {e.navigator} */ this.navigator = '';

  /** application server type (RDP, Citrix, M2M, ...)
  * @path ctx.application.server
  * @advanced
  * @property {e.server} */ this.server = "";

//  /**
//  * @path ctx.application.notificationCallbacks
//  * @ignore
//  * @property {Object} */ this.notificationCallbacks = {};

  /** count of application instances
  * @ignore
  * @path ctx.application.nbInst
  * @property {number} */ this.nbInst = 0;

  /** list of pages declared in the application
  * @path ctx.application.pages
  * @property {Object<string, ctx.page>} */ this.pages = {};

  /** list of popups declared in the application
  * @path ctx.application.popups
  * @property {Object<string, ctx.popupClass>} */ this.popups = {};

  /** application launch path (as declared in Explorer)
  * @path ctx.application.path
  * @ignore
  * @property {string} */ this.path = "";

  /** list of paths based on environment (development, production, ...)
  * @path ctx.application.pathList
  * @ignore
  * @property {string} */ this.pathList = {};

//  /** map of requests
//  * @path ctx.application.requests
//  * @property {Object} */ this.requests = {};

  /** map of scenarios
  * @path ctx.application.scenarios
  * @property {ctx.scenarioManager} */ this.scenarios = new ctx.scenarioManager(this);

  /** map of steps
  * @path ctx.application.steps
  * @property {Object<string, ctx.stepClass>} */ this.steps = {};

  /** technical page (connector communication channel)
  * @ignore
  * @path ctx.application.technicalPage
  * @property {ctx.page} */ this.technicalPage = null;

  /** tracked events declared on the application
  * @path ctx.application.trackEvents
  * @advanced
  * @property {Object} */ this.trackEvents = {};

  // copy application definitions
  var _copyData = ['scenarios', 'steps', 'customType', 'navigator', 'trackEvents', 'instance', 'path', 'pathList', 'comment', 'nature', 'server', 'labels', 'dataTemplates', 'functions'];
  var id;
  if (obj) {
    for (var i = 0; i < _copyData.length; i++) {
      id = _copyData[i];
      if (typeof obj[id] !== 'undefined') { this[id] = obj[id]; }
    }
    ctx.set(obj.data, this.data);
  }

  this.isProcess = (this.nature == '');
  this.isWeb = ((this.nature == e.nature.WEB) || (this.nature == e.nature.WEB3));
  this.navigator = (this.isWeb ? e.navigator.IE : '');

  // default instance :
  //  - processus (no nature defined) : 0
  //  - application (nature defined) : -1
  if ((this.instance == -1) && this.isProcess)
    this.instance = 0;

  // update application instance in data object
  this.data.appliInst = this.instance;

  /**
  * Returns object descriptor for the item
  * @description
  * <wrap help> //Example://</wrap>
 <code javascript>
 var desc = MyAppli.getObjectDescriptor();
 </code>
  * @ignore
  * @method getObjectDescriptor
  * @path ctx.application.getObjectDescriptor
  * @param {ctx.descriptor} [desc] initial descriptor object to be completed (if omitted, a new descriptor object is created)
  * @return {ctx.descriptor} application object descriptor
  */
  this.getObjectDescriptor = function (desc) {
    if (!desc)
      desc = new ctx.descriptor();
    desc.type = _app.type;
    desc.nature = _app.nature || desc.nature;
    desc.appli = this;
    if (_app.name !== '') {
      desc.appliName = _app.name;
    } else if (ctx.currentEvent) {
      desc.appliName = ctx.currentEvent.appliName;
    }
    var theInst;
    var apps = ctx.app[desc.appliName];
    if ((_app.instance != -1) && (apps) && (apps[_app.instance])){
      // instance is explicitly mentioned
      desc.appliInst = _app.instance;
    } else if (ctx.currentStep && ((theInst = ctx.currentStep.sc.appliInst[desc.appliName]) > 0) && (apps.instances[theInst] instanceof ctx.application)) {
      // is there a running scenario with a default instance defined ?
      desc.appliInst = theInst;
    } else if (ctx.currentStep && ctx.currentStep.sc && ctx.currentStep.sc.parent && (desc.appliName == ctx.currentStep.sc.parent.name) && ((theInst = ctx.currentStep.sc.parent.instance) > 0) && ctx.app[ctx.currentStep.sc.parent.name] && (ctx.app[ctx.currentStep.sc.parent.name][theInst] instanceof ctx.application)) {
      // is there a running scenario whose parent is this application ?
      desc.appliInst = theInst;
    } else if (ctx.currentEvent && (desc.appliName == ctx.currentEvent.appliName) && ((theInst = ctx.currentEvent.appliInst) > 0) && ctx.app[ctx.currentEvent.appliName] && (ctx.app[ctx.currentEvent.appliName][theInst] instanceof ctx.application)) {
      // the object is the current application
      desc.appliInst = theInst;
    } else if (((theInst = this.defaultInst) > 0) && ((apps.instances[theInst] > 0))){
      // is there a default instance to be used for this application ?
      desc.appliInst = theInst;
    } else { // search valid instance in active applications
      if (apps) {
        if (!(apps.instances[desc.appliInst])) {
          for (var i in apps.instances) {
            // take the first non-null instance (or '0' by default)
            desc.appliInst = parseInt(i, 10);
            if (i > 0)
              break;
          }
        }
      }
    }
    if (desc.appliName == '') {
      // default host process, in case no ctx.currentEvent is defined (usual if action launched using 'Test code' or 'Page tester')
      desc.appliName = 'GLOBAL';
      desc.appliInst = 0;
      desc.pageName = '';
      desc.pageInst = -1;
    }
    if (ctx.app[desc.appliName] && ctx.app[desc.appliName].instances[desc.appliInst]) {
      desc.appli = ctx.app[desc.appliName].instances[desc.appliInst];
    }
    return desc;
  }

  /**
  * Checks if the nature of the application is part of the given list
  * @method _is
  * @ignore
  * @path ctx.application._is
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
  * Adds an event or list of events to an application, or returns an existing event
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// functional event declarations
MyHllApiAppli.addEvent({evLogin:'', evSetCalendar:''});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<application>.addEvent** + 'TAB' :
  *
<code javascript>
<application>.addEvent({ event: ''});
</code>
  * </WRAP>
  * @method addEvent
  * @path ctx.application.addEvent
  * @param {Object} obj object with one or several event names (ex. : { START: ' ', END:' ', ...} )
  * @param {boolean} [technical] if true, technical event
  * @return {ctx.event} event object
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
      // add event(s) in real instances
      if (this.instances) {
        for (var id in this.instances) {
          this.instances[id].addEvent(obj, technical);
        }
      }
    }
    return ev;
  }

  /**
  * Declares an event and sets a permanent or single handler on this event
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// handle 'evLogin' event on 'MyAppli' application (permanent handler)
MyAppli.addOn({evLogin : function(ev) {...}});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<application>.addOn** + 'TAB' :
  *
<code javascript>
<application>.addOn({ event: function(ev) {
  var data = {};
}});
</code>
  * </WRAP>
  * @method addOn
  * @path ctx.application.addOn
  * @param {Object<string, function(ctx.event)>} evCallback event and callback object : { <event>: function(ev) { ... } }
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {boolean} [single] if 'true', sets a single listening on the event (otherwise, a permanent listening)
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.addOn = function (evCallback, immediateCondition, single, delay, noStepReset) {
    /** @type {Object} */ var obj = null;
    if (typeof evCallback === 'string') throw new Error(e.error.InvalidArgument, 'ctx.application.addOn: Invalid argument');
    for (var evName in evCallback) {
      var func = evCallback[evName];
      var evObj = {};
      evObj[evName] = '';
      var ev = this.addEvent(evObj);
      if (ev && (typeof func === 'function')) {
        obj = ctx.on(ev, func, immediateCondition, this, single, delay, noStepReset);
      }
    }
    return obj;
  }

  /**
  * Declares an event and sets a single handler on this event
  * @description
  * Events can be 'functional' or 'technical' events\\
  * The list of pre-defined technical events is defined in enumeration : [[:lib:common:ctx.enum#enumeration_eeventapplication|e.event.application]]
  *
  * <wrap help> //Example://</wrap>
  * <code javascript>
  * // handle once 'evLogin' event on 'MyAppli' application (single handler)
  * MyAppli.addOnce({evLogin: function(ev) {...}});
  * </code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<application>.addOnce** + 'TAB' :
  *
<code javascript>
<application>.addOnce({ event: function(ev) {
  var data = {};
}});
</code>
  * </WRAP>
  * @method addOnce
  * @path ctx.application.addOnce
  * @param {Object<string, function(ctx.event)>} evCallback event and callback object : { <event>: function(ev) { ... } }
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.addOnce = function (evCallback, immediateCondition, delay) {
    //return this.on(event, func, immediateCondition, context, true, delay);
    return this.addOn(evCallback, immediateCondition, true, delay);
  }

  /**
  * Adds a ''ctx.page'' object as child
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
MyAppli.MyPage = MyAppli.addPage('MyPage', {"comment":"Sample MyAppli"});
</code>
  * @method addPage
  * @path ctx.application.addPage
  * @throws {Error}
  * @param {string} pageName page name
  * @param {Object} [obj] page definitions : a set of properties which can be modified
  * @param {number} [pageInst] page instance (default is '-1')
  * @return {ctx.page} page returns page object
  */
  this.addPage = function (pageName, obj, pageInst) {
    if ((!pageInst) && (!this.pages[pageName]) && this[pageName]) {
      throw new Error(e.error.Reserved, this.pageName + " : '" + pageName + "' page can't be added: name is already used or reserved");
    }

    /** @type {ctx.page} */var pg = null;
    if ((!pageInst) || (pageInst < 0)) {
      pg = this.pages[pageName];
      if (!pg) {
        pg = new ctx.page(pageName, this, obj, pageInst);
        this[pageName] = this.pages[pageName] = pg;
      }
    } else if (this.pages[pageName]) {
      pg = this.pages[pageName][pageInst];
      if (!pg) {
        pg = new ctx.page(pageName, this, obj, pageInst);
        this[pageName][pageInst] = this[pageName].instances[pageInst] = this.pages[pageName][pageInst] = pg;
        this[pageName].nbInst++;
      }
    }
    return pg;
  }

  /**
  * Adds a ''ctx.popupClass'' object as child
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
var popup = ctx.popup('pClose');
var popup = MyAppli.popup({ MyPage: {..., ...}});
</code>
  * @path ctx.application.popup
  * @param {string|Object} [params] popup parameters (or name)
  * @suppress {checkTypes}
  * @return {ctx.popupClass} popup object
  */
  this.popup = function (params) {
    /*** @type {ctx.popupClass} */ var popup = null;
    if (typeof params === 'object') {
      for (var name in params) {
        popup = this.popups[name] = this[name] = ctx.popup(params, "", this);
      }
    }
    return popup;
  };

  /**
  * Cancels a pending delayed event (posted with a timer).
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// notify event with a 5 s delay
MyAppli.notify(MyAppli.events.evPing, '', 5000);
...
// cancel event
MyAppli.cancelEvent(MyAppli.events.evPing);
</code>
  * @method cancelEvent
  * @path ctx.application.cancelEvent
  * @param {ctx.event|ctx.descriptor} event event object
  * @param {string} [itemName] optional item name
  * @return {string} result value
  */
  this.cancelEvent = function (event, itemName) {
    /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
    if (event && event.getObjectDescriptor) {
      desc = event.getObjectDescriptor(desc);
    } else if (event && event.event) {
      desc.name = event.event;
      if (event.appliName) {
        desc.appliName = event.appliName;
        if (event.appliInst >= 0) desc.appliInst = event.appliInst;
      }
    }
    return ctx.verbExec(desc, 'cancelEvent', 'CANCELEVENT', {
      Event: desc.name,
      Item: itemName
    });
  }

  /**
  * Clones the pages of an appplication to a target application
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
ctx.app[appliName].cloneApplication(appliInst);
</code>
  * @method cloneApplication
  * @path ctx.application.cloneApplication
  * @private internal usage
  * @ignore internal usage
  * @param {number} instance instance number ('0' for virtual, '> 0' for real)
  * @return {ctx.application} cloned application
  */
  this.cloneApplication = function (instance) {
    /** @type {ctx.application} */ var app = null;
    var obj = {}; // copy characteristics
    for (var i = 0; i < _copyData.length; i++) {
      var id = _copyData[i];
      if (this[id] !== undefined) { obj[id] = this[id]; }
    }
    // copy data object
    obj.data = this.data;
    if (instance >= 0) obj.instance = instance;

    // create application as a copy of the model
    if (!ctx.app[this.name][instance])
      ctx.app[this.name].nbInst++;
    app = ctx.app[this.name][instance] = ctx.app[this.name].instances[instance] = new ctx.application(this.name, obj );
    app.model = this;
    // copy functional events
    for (var id in this.events) {
      if (!app.events[id]) {
        var event = {};
        event[id] = '';
        app.addEvent(event);
      }
    }
    // create application data container
    var data = {};
    data[this.name] = ctx.app[this.name].instances[instance].data;
    ctx.data.push(data);

    // clone pages
    /** @type {ctx.page} */ var pg = null;
    if (app) {
      var appPg;
      for (var id in this.pages) {
        pg = this.pages[id];
        if (pg) {
          appPg = pg.clonePage(app, -1);
          if (pg == this.technicalPage) {
            app.technicalPage = appPg;
          }
        }
      }
    }

    return app;
  }

  /**
  * Closes the application
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
MyAppli.close();
</code>
  * @method close
  * @path ctx.application.close
  * @return {*} return value
  */
  this.close = function () {
    var pg = this.getCurrentPage();
    if (pg && pg.exist())
      return pg.close();
    return '';
  }

  if (this._is( e.nature.HLLAPI )) {
    // this bloc is used for automated connection/disconnection with HLLAPI

    if (this.instance == -1) {
      this.dataInternal.set({
        /** @type {function(boolean)|undefined} */ connectFunc : undefined,
        /** @type {function(boolean)|undefined} */ disconnectFunc : undefined,
        /** @type {string|undefined} */ session : undefined,
        /** @type {string|undefined} */ dll : undefined,
        /** @type {string|undefined} */ api : undefined,
        /** @type {boolean} */ isHllConnected : false
      })

      this.addOn({ evHLLAPIConnect: function(ev) {
        if (!_app.dataInternal.isHllConnected) {
            try {
              _app[0].technicalPage.connectPS(_app.dataInternal.session, _app.dataInternal.dll, _app.dataInternal.api);
              _app.dataInternal.isHllConnected = true;
              if (_app.nbInst == 1)
              {
                // only virtual instance exists : connect session will create a real instance
                ev.setpending();
                return;
              }
            } catch (ex) {
              ctx.log(ex, e.logIconType.Error, 'ctx.page.connectPS failed :')
              if (_app.dataInternal.connectFunc) {
                _app.dataInternal.connectFunc(false); // failure
                _app.dataInternal.connectFunc = undefined;
              }
            }
        }
        this.events.evHLLAPIConnect.internal = true; // no display in debugger
        if (_app.dataInternal.isHllConnected && _app.dataInternal.connectFunc) {
          _app.dataInternal.connectFunc(true); // connected : success
          _app.dataInternal.connectFunc = undefined;
        }
      }});

      /**
      * @method pageDisconnect
      * @ignore
      * @path ctx.page.pageDisconnect
      */
      this.pageDisconnect = function () {
        if (_app.dataInternal.isHllConnected) {
          try {
            // !!  disconnect done on virtual instance
            _app[0].technicalPage.disconnectPS();
            _app.dataInternal.isHllConnected = false;
          } catch (ex) {
            ctx.log(ex, e.logIconType.Error, 'ctx.page.disconnectPS failed :')
            if (_app.dataInternal.disconnectFunc) {
              _app.dataInternal.disconnectFunc(false); // failure
              _app.dataInternal.disconnectFunc = undefined;
            }
          }
        }
        if (!_app.dataInternal.isHllConnected && _app.dataInternal.disconnectFunc) {
          _app.dataInternal.disconnectFunc(true); // disconnected : success
          _app.dataInternal.disconnectFunc = undefined;
        }
      }

      this.addOn({QUIT: function(ev) {
        _app.pageDisconnect();
      }});

      this.addOn({ evHLLAPIDisconnect: function(ev) {
        this.pageDisconnect();
      }});
      this.events['evHLLAPIDisconnect'].internal = true; // no display in debugger
    }
  }

  if (this._is( e.nature.HLLAPI )) {
    /**
    * Connects the HLLAPI channel
    * @description
    * :!: __Technology specific:__ **HLLAPI**
    *
    * <wrap help> //Example://</wrap>
<code javascript>
// connect HLLAPI channel on session 'A'
MyHllApiAppli.connect('A', function (res) {
  ...
});

// connect HLLAPI channel, with a custom emulator
MyHllApiAppli.connect('A', function (res) {
  ...
}, "EHLAPI32.DLL", "HLLAPI");
</code>
    * @method connect
    * @path ctx.application.connect
    * @param {string} session session to use, which had to be declared at the HLLAPI emulator
    * @param {function(boolean)} func function called when the connection is done (parameter is 'true' if succeeded, 'false' if failed)
    * @param {string} [dll] name of the HLLAPI DLL to be used by Agent. This DLL is provided by the emulator. Default value is ''whalpi32.dll''
    * @param {string} [api] name of the entry function to call in the HLLAPI DLL. Default value is ''WinHLLAPI''
    */
    this.connect = function (session, func, dll, api) {
      /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
      ctx.notifyAction('connect', '', desc);
      if (!this.model.technicalPage) {
        throw new Error(e.error.InvalidCommand, this.name + ".connect() failed : no technical page available");
      }
      this.model.dataInternal.session = session || this.model.dataInternal.session;
      this.model.dataInternal.connectFunc = func || this.model.dataInternal.connectFunc;
      this.model.dataInternal.dll = dll || this.model.dataInternal.dll;
      this.model.dataInternal.api = api || this.model.dataInternal.api;
      // notify an event to create a virtual instance if none created
      var event = (this[0] ? this[0].events['evHLLAPIConnect'] : this.events['evHLLAPIConnect']);
      GLOBAL.notify(event);
    }
  }

  /**
  * Returns the number of application instances
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
var nb = MyAppli.count();
</code>
  * @method count
  * @path ctx.application.count
  * @return {number} application instance count
  */
  this.count = function () {
    /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
    var nbInst = 0;
    if (desc && desc.appli && desc.appli.model) { nbInst = desc.appli.model.nbInst; }
    ctx.notifyAction('count', nbInst, desc);
    return nbInst;
  }

  /**
  * Instanciates an extended connector (HLLAPI, UIAutomation, ...)
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// Instanciates the 'UIAutomation' extended connector
GLOBAL.createExtendedConnector(e.extendedConnector.UIAutomation, '', '', '');
// Instanciates the 'ExpBar' extended connector, used to create systrays
_page = _parentProcess.createExtendedConnector(e.extendedConnector.ExpBar, _name);
</code>
  * @method createExtendedConnector
  * @path ctx.application.createExtendedConnector
  * @param {e.extendedConnector} id connector name (COM object id of the component)\\ (see [[:lib:common:ctx.enum#enumeration_eextendedconnector|e.extendedConnector]])
  * @param {string} [pageName] page name : specifies the name of the page which will receive event notifications from the connector
  * @param {string} [event] event name
  * @param {string} [param] optional parameters
  * @return {ctx.page} created page object (or null if 'pageName' is omitted)
  */
  this.createExtendedConnector = function (id, pageName, event, param) {
    /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
    var pg = null;
    if (pageName) {
      //pg = new ctx.page(pageName, this);
      pg = this.addPage(pageName);
    }
    ctx.verbExec(desc, 'createExtendedConnector', 'CREATEPILOTE', {
      Pilote: id,
      PageName: pageName,
      AppliName: desc.appliName,
      EventName: event,
      EXTEND_VALUES : param
    });
    return pg;
  }

  /**
  * Instanciates an extended connector (HLLAPI, UIAutomation, ...)
  * @method createPilot
  * @ignore
  * @deprecated use ''ctx.application.createExtendedConnector'' instead
  * @path ctx.application.createPilot
  * @param {e.extendedConnector} id connector name (COM object id of the component)\\ (see [[:lib:common:ctx.enum#enumeration_eextendedconnector|e.extendedConnector]])
  * @param {string} [page] page name : specifies the name of the page which will receive event notifications from the connector
  * @param {string} [event] event name
  * @param {string} [param] optional parameters
  * @return {ctx.page} created page object
  */
  this.createPilot = this.createExtendedConnector;

  /** [Internal usage]
   * Returns the short description for serialization
   * @ignore
   * @method ctxShort
   * @path ctx.application.ctxShort
   */
  this.ctxShort = function() {
    return ['ctxType', 'name', 'instance', 'data'];
  }

  if (this._is( e.nature.HLLAPI )) {
    /**
    * Disconnects the HLLAPI channel
    * @description
    * :!: __Technology specific:__ **HLLAPI**
    *
    * <wrap help> //Example://</wrap>
<code javascript>
MyHllApiAppli.disconnect();
</code>
    * @method disconnect
    * @path ctx.page.disconnect
    * @param {function(boolean)} func function called when the disconnection is done (parameter is 'true' if succeeded, 'false' if failed)
    */
    this.disconnect = function (func) {
      /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
      ctx.notifyAction('disconnect', '', desc);
      if (!this.technicalPage) {
        throw new Error(e.error.InvalidCommand, this.name + ".connect() failed : no technical page available");
      }
      this.model.dataInternal.disconnectFunc = func || this.model.dataInternal.disconnectFunc;
      var event = (this[0] ? this[0].events['evHLLAPIDisconnect'] : this.events['evHLLAPIDisconnect']);
      GLOBAL.notify(event);
    }
  }

  /**
  * Tests application existence
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
if (MyAppli.exist()) { ... }
</code>
  * @method exist
  * @path ctx.application.exist
  * @return {boolean} result : 'true' if application exists
  */
  this.exist = function () { //
    // --> application :    > 1 instances
    // --> process :    = 1 instance
    var res = ((this.count() > (this.isProcess ? 0 : 1)) ? true : false);
    /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
    ctx.notifyAction('exist', res, desc);
    return res;
  }


  /**
  * Get the list of active pages for the application
  * @description
  *  This function takes into account the default instance of the running scenario
  *
  * <wrap help> //Example://</wrap>
<code javascript>
var pg = MyAppli.getActivePages();
</code>
  * @method getActivePages
  * @path ctx.application.getActivePages
  * @return {Array<ctx.page>} active page array
  */
  this.getActivePages = function () {
    var instances = (this.instance == -1 ? this.instances : [this]); // application model, or real instance
    var pages = [];
    for (var appliInst in instances) {
      for (var pageName in instances[appliInst].pages) {
        var page =  instances[appliInst].pages[pageName];
        for (var pageInst in page.instances) {
          var realPage =  page.instances[pageInst];
          if (realPage && realPage.exist()) {
            pages.push(realPage);
          }
        }
      }
    }
    return pages;
  }

  /**
  * Calculates the current page for an application
  * @description
  *  This function takes into account the default instance of the running scenario
  *
  * <wrap help> //Example://</wrap>
<code javascript>
var pg = MyAppli.getCurrentPage();
</code>
  * @method getCurrentPage
  * @path ctx.application.getCurrentPage
  * @return {ctx.page} page object
  */
  this.getCurrentPage = function () {
    /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
    var page = null;
    if (desc.appli) page = desc.appli.currentPage;
    if (!page) page = this.currentPage;
    return page;
  }

  /**
  * Gets an application page by its name (and creates it if it doesn't exist)
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
var pg = MyAppli.getPage('pHome');
</code>
  * @method getPage
  * @path ctx.application.getPage
  * @advanced
  * @param {string} name
  * @param {string|number} [instance] page instance
  * @param {string} [nature] page nature
  * @return {ctx.page} page object
  */
  this.getPage = function (name, instance, nature) {
    if ((!nature) && (typeof instance === 'string')) {
      nature = instance;
      instance = -1;
    }
    var app = this;

    if (this.pages[name])
      return this.pages[name]; // existing page : return it
    else
      return (this.addPage(name, { instance: instance, nature: nature })); // create a new page
  }

  /**
  * Gets the path of the application for a given (or default) environment ('development', 'production', ...)
  * @description
  * If no path was defined for this environment, the path mentionned in Studio Explorer is returned.
  *
  * <wrap help> //Example://</wrap>
<code javascript>
var path = MyAppli.getPath();
</code>
  * @method getPath
  * @throws {Error}
  * @path ctx.application.getPath
  * @param {e.env} [env] environment ('dev', 'prod', ...). If omitted, 'ctx.options.env' is used. See '[[:lib:common:ctx.enum#enumeration_eenv|e.env]]' for more details
  * @return {string} page path
  */
  this.getPath = function (env) {
    /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
    ctx.notifyAction('getPath', '', desc);
    env = env || ctx.options.env;
    var found = false;
    for (var i in e.env) {
      if (e.env[i] == env) {
        found = true;
        break;
      }
    }
    if (!found) {
      throw new Error(e.error.InvalidArgument,"Invalid environment");
    }
    return this.pathList[env] || this.path;
  }

  if (this._is(e.nature.UIAUTOMATION, e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.OCR)) {
    /**
    * Highlights the items in all active pages
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **WIN**, **WEB3**, **SWG**, **FLEX**, **OCR**
    *
    * <wrap help> //Example://</wrap>
<code javascript>
MyAppli.MyPage.highlightItems();
</code>
    * @method highlightItems
    * @path ctx.application.highlightItems
    * @param {number} [timer] highlight duration and wait in ms (500 ms by default). If '0', the item remains highlighted
    * @param {boolean} [visible] enable/disable highlight (true by default)
    * @param {boolean} [async] if true, and a timer is set, the function is asynchronous (it returns immediately and highlight is removed asynchronously after timer) (true by default)
    * @param {number} [color] default color ('ctx.options.highlightColor' by default)
    * @return {boolean} result value
    */
    this.highlightItems = function (timer, visible, async, color) {
      var res = true;
      var pages = this.getActivePages();
      ctx.each(pages, function(id, value) {
        if (value.highlightItems) { value.highlightItems(timer, visible, async, color); }
      });
      return res;
    }
  }

  /**
  * Checks if the nature of the application is part of the given list
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// Test if application is a WEB application
if ( MyAppli.is(e.nature.WEB, e.nature.WEB3)) {...}
</code>
  * @method is
  * @ignore
  * @path ctx.application.is
  * @param {...string} arg list of natures (ex.: 'WEB', 'WEB3', 'WIN', ...)
  * @return {boolean} result : 'true' if compatible
  */
  this.is = function (arg) {
    return this._is(arg);
  }

  /**
  * Tests application non existence
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
if (MyAppli.notExist()) { ... }
</code>
  * @method notExist
  * @path ctx.application.notExist
  * @return {boolean} result : 'true' if application doesn't exist
  */
  this.notExist = function () { //
    return (!this.exist());
  }

  /**
  * Sends an event to a target application or page
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// send a functional event to itself
MyAppli.notify(MyAppli.events.evStart);
// send a functional event to another application
MyAppli.notify(MyAppli.events.evLogin);
// send a functional event to another page
MyAppli.notify(MyAppli.pLogin.events.evLogin);
// send a functional event with data and a 5 s delay
var obj = { name: 'Smith', firstname: 'John' };
MyAppli.notify(MyAppli.events.evLogin, obj, 5000);
</code>
  * @method notify
  * @path ctx.application.notify
  * @throws {Error}
  * @param {string|ctx.event} event event name or event object to be notified
  * @param {*} [data] event data
  * @param {number} [timer] timer value (ms)
  * @param {number} [appliInst] appli instance
  * @param {string} [method] optional method name : 'Send' for a synchronous call
  * @param {string} [itemName] item name
  * @param {ctx.event} [reqEvent] request event
  * @return returns result
  */
  this.notify = function (event, data, timer, appliInst, method, itemName, reqEvent) {
    /** @type {ctx.descriptor} */ var desc = this.getObjectDescriptor();
    /** {@type string} */var eventName = ((event instanceof ctx.event) ? event.name : event) || '';
    /** @type {ctx.descriptor} */ var targetDesc = ((event instanceof ctx.event) ? event.getObjectDescriptor() : desc );
    appliInst = (appliInst !== undefined ? parseInt(appliInst, 10) : ((targetDesc.appliInst == -1) ? undefined : targetDesc.appliInst));
    var pageInst = ((targetDesc.pageInst == -1) ? undefined : targetDesc.pageInst);
    //if (data && (data instanceof ctx.event)) data = data.data;
    if ((data === undefined) && (event instanceof ctx.event)) data = event.data;
    var reqEventName = ((reqEvent && (reqEvent instanceof ctx.event) && reqEvent.name) ? reqEvent.name : ((event instanceof ctx.event) ? event.reqEventName : undefined ));
    data = ctx.serialize(data, false, true);

    if ((typeof ctx.galaxyAPI !== 'undefined') &&
      (this.name != GLOBAL.name) &&
      (targetDesc.appli.name != GLOBAL.name) &&
      (((this.server == e.server.M2M) && (!targetDesc.appli.server)) ||
      ((targetDesc.appli.server == e.server.M2M) && (!this.server))))
    {
      var ev = {};
      ev.appliName = targetDesc.appliName;
      ev.appliInst = appliInst;
      ev.pageName = targetDesc.pageName;
      ev.pageInst = pageInst;
      ev.data = data;
      ev.name = eventName;
      ev.reqEventName = reqEventName;
      ev.reqAppliName = desc.appliName;
      ev.reqAppliInst = desc.appliInst;
      var evObj = new ctx.event(ev);
      ctx.galaxyAPI.notifyEvent(evObj);
    } else {
      return ctx.verbExec(desc, 'notify', 'NOTIFY', {
        Event: eventName,
        Appli: targetDesc.appliName,
        InstanceAppli: ((appliInst == -1) ? 'All' : appliInst),
        Page: targetDesc.pageName,
        InstancePage: pageInst,
        Timer: timer,
        Data: data,
        Method: method,
        EventResp: reqEventName
      });
    }
  }

  /**
  * @deprecated use 'ctx.application.addOn' instead
  * @method on
  * @ignore
  * @path ctx.application.on
  * @param {Object<string, function(ctx.event)>} evCallback event and callback object : { <event>: function(ev) { ... } }
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {boolean} [single] if 'true', sets a single listening on the event (otherwise, a permanent listening)
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.on = function (evCallback, immediateCondition, single, delay) {
    return this.addOn(evCallback, immediateCondition, single, delay);
  }

  /**
  * @deprecated use 'ctx.application.addOnce' instead
  * @method once
  * @ignore
  * @path ctx.application.once
  * @param {Object<string, function(ctx.event)>} evCallback event and callback object : { <event>: function(ev) { ... } }
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.once = function (evCallback, immediateCondition, delay) {
    return this.addOnce(evCallback, immediateCondition, delay);
  }

  /**
  * Removes a given instance from an application
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
ctx.app[appliName].removeApplicationInstance(appliInst);
</code>
  * @method removeApplicationInstance
  * @path ctx.application.removeApplicationInstance
  * @ignore internal usage
  * @private
  * @param {number} appliInst instance number ('0' for virtual, '> 0' for real)
  * @return {boolean} success
  */
  this.removeApplicationInstance = function (appliInst) {
    // remove data container
    var length = ctx.data.length;
    for (var i = 0; i < length; i++) {
      var data = ctx.data[i];
      if (data && data[this.name] && (data[this.name].appliInst == appliInst) && (data[this.name].appliName == this.name)) {
        ctx.data.splice(i, 1);
        break;
      }
    }
    if (this[appliInst]) {
      delete this[appliInst];
      delete this.instances[appliInst];
      this.nbInst--;
      return true;
    }
    return false;
  }

  /**
  * Removes a given page instance from an application
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
ctx.app[appliName].removePage(appliInst, pageName, pageInst);
</code>
  * @method removePage
  * @path ctx.application.removePage
  * @ignore internal usage
  * @private
  * @param {number} appliInst instance number
  * @param {string} pageName page name
  * @param {number} pageInst instance number
  * @return {boolean} success
  */
  this.removePage = function (appliInst, pageName, pageInst) {
    var pg;
    if (this[pageName] && this[pageName][pageInst]) {
      pg = this.currentPage;
      if (pg && (pg.name == pageName) && (pg.instance == pageInst))
        this.currentPage = null;
      delete this[pageName][pageInst];
      delete this[pageName].instances[pageInst];
    }
    if (this[appliInst] && this[appliInst][pageName] && this[appliInst][pageName][pageInst]) {
      pg = this[appliInst].currentPage;
      if (pg && (pg.name == pageName) && (pg.instance == pageInst))
        this[appliInst].currentPage = null;
      delete this[appliInst][pageName][pageInst];
      delete this[appliInst][pageName].instances[pageInst];
      delete this[appliInst].pages[pageName][pageInst];
      this[appliInst][pageName].nbInst--;
      return true;
    }
    return false;
  }

  /**
  * resource object
  * @path ctx.application.resources
  * @ignore internal usage
  */
  this.resources = {};

  /**
  * Declares a new scenario or returns an existing scenario\\
  * @description
  * This scenario is associated with the application
  *
  * <wrap help> //Example://</wrap>
<code javascript>
// declare scenario belonging to 'MyAppli' application
MyAppli.scenario({ scCRMGetData: function(ev, sc) {
  ...
}});
...
// start scenario
MyAppli.scenarios.scCRMGetData.start();
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<application>.scenario** + 'TAB' :
  *
<code javascript>
<application>.scenario({ sc: function(ev, sc) {
  sc.onTimeout(30000, function(sc, st) { sc.endScenario();  }); // default timeout handler for each step
  sc.onError(function(sc, st, ex) { sc.endScenario(); }); // default error handler
  sc.setMode(e.scenario.mode.clearIfRunning);
  // add steps here...
  var data = sc.data;
  ...
}});
</code>
  * </WRAP>
  * @method scenario
  * @path ctx.application.scenario
  * @param {Object<string, function(ctx.event,ctx.scenarioClass)>} obj scenario declaration :\\
  *   - <scenario name>: function(ctx.event,ctx.scenarioClass) {...}
  * @param {ctx.dataClass} [dataClass] data structure for the scenario
  * @param {string} [comment] scenario comment
  * @param {ctx.cryptography.keyClass} [key] optional key for data cyphering
  * @param {boolean} [register] scenario to be registered (true by default)
  * @return {ctx.scenarioClass} scenario object
  */
  this.scenario = function (obj, dataClass, comment, key, register) {
    /*** @type {ctx.scenarioClass} */ var sc = null;
    if (typeof obj === 'object') {
      for (var scName in obj) {
        var fn = obj[scName];
        if (typeof fn === 'function') {
          if (!this.scenarios[scName]) {
            this.scenarios[scName] = sc = new ctx.scenarioClass(scName, fn, this, undefined, dataClass); // create new
          } else {
            sc = this.scenarios[scName];
            if (fn) sc.scFunc(fn);
          }
          if (comment) sc.comment = comment;
          if (key && key.name) sc.key = key.name;
          if ((typeof ctx.galaxyAPI !== 'undefined') && (register !== false)) ctx.galaxyAPI.registerScenario(sc);
        }
      }
    }
    if (!sc)
      throw new Error(e.error.InvalidArgument, "ctx.application.scenario : invalid scenario object");
    return sc;
  }

  /**
  * Resets the default instance for the application
  * @method resetDefaultInst
  * @path ctx.application.resetDefaultInst
  * @return {boolean} return true if instance was reset
  */
  this.resetDefaultInst = function () {
    return this.setDefaultInst(null);
  }

  /**
  * Memorizes the default instance for the application
  * @method setDefaultInst
  * @path ctx.application.setDefaultInst
  * @param {ctx.application|ctx.event|string|number} obj application, event object, or instance number
  * @return {boolean} return true if instance was memorized
  */
  this.setDefaultInst = function (obj) {
    var desc = this.getObjectDescriptor();
    ctx.notifyAction('setDefaultInst', '', desc);
    var res = false;
    if (!obj) {
      this.defaultInst = -1;
    } else if (obj && (obj instanceof ctx.event)) {
      if (obj.appliInst > 0) {
        this.defaultInst = obj.appliInst;
        res = true;
      }
    } else if (obj && (obj instanceof ctx.application)) {
      if (obj.instance > 0) {
        this.defaultInst = obj.instance;
        res = true;
      }
    } else if (obj && ('number' === typeof obj)) {
        this.defaultInst = obj;
    } else if (obj && ('string' === typeof obj)) {
        this.defaultInst = parseInt(obj, 10);
    }
    return res;
  }

  /**
  * Sets the path of the application for a given environment ('development', 'production', ...)
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
// define production and test URL for MyAppli application
MyAppli.pHome.setPath(e.env.prod, 'https://prodserver/crm/index.html')
MyAppli.pHome.setPath(e.env.dev, 'https://testserver/crm/index.html')
...
// select 'production' as current environment
ctx.options.env = e.env.prod;
...
// start application (with 'production' URL)
MyAppli.pHome.start();
</code>
  * @method setPath
  * @throws {Error}
  * @path ctx.application.setPath
  * @param {e.env} env environment ('dev', 'prod', ...). See '[[:lib:common:ctx.enum#enumeration_eenv|e.env]]' for more details
  * @param {string} path page URL
  * @return {boolean} result
  */
  this.setPath = function (env, path) {
    var desc = this.getObjectDescriptor();
    ctx.notifyAction('setPath', '', desc);
    var found = false;
    for (var i in e.env) {
      if (e.env[i] == env) {
        found = true;
        break;
      }
    }
    if (!found) {
      throw new Error(e.error.InvalidArgument,"Invalid environment");
    }
    this.pathList[env] = path;
    return found;
  }

  /**
  * Starts an application
  * @description
  * The behaviour is the following :
  *   * if the application already exists, and ''(bEvenIfExist == false)'', its current page is activated
  *   * else ''ctx.shellexec'' is called to launch the application
  *
  * <wrap help> //Example://</wrap>
<code javascript>
MyAppli.start();
</code>
  * @method start
  * @path ctx.application.start
  * @throws {Error}
  * @param {string} [path] path to be executed. If path is not mentioned, the environment path is used, otherwise the path declared in Explorer tool ('Launch path' attribute)
  * @param {string} [parm] optional complementary parameter to the path
  * @param {string} [dir] optional working directory. If omitted, current working directory is used
  * @param {e.launchFlag} [flag=e.launchFlag.Show] launch flag. See [[:lib:common:ctx.enum#enumeration_elaunchflag|e.launchFlag]] for more details
  * @param {boolean} [bEvenIfExist] start application even if it already exists (false by default)
  * @return {string} result value
  */
  this.start = function (path, parm, dir, flag, bEvenIfExist) {
    var desc = this.getObjectDescriptor();
    ctx.notifyAction('start', '', desc);
    var res = '';
    if (bEvenIfExist || (!this.exist())) {
      path = path || this.getPath() || ''; // use captured path
      if (!path) { throw new Error(e.error.InvalidArgument, "page.start: no valid path provided"); }
      // for a web application, force the default navigator if needed
      // ex.: launch "iexplore.exe http://......" instead of "http://......"
      if (this.isWeb && path && !parm) {
        parm = path;
        path = this.navigator;
      }
      if (parm) {
        parm = ctx.resolvePath(parm);
        //if (parm.indexOf(' ') >= 0) parm = '"' + parm + '"';
      }
      if (path) {
        path = ctx.resolvePath(path);
        //if (path.indexOf(' ') >= 0) path = '"' + path + '"';
      }
      res = ctx.shellexec(path, parm, dir, flag);
    } else {
      // already started : just activate the current page
      /** @type {ctx.page} */ var pg = this.getCurrentPage();
      if (pg) { res = pg.activate(); }
    }
    return res; // already started
  }

  if (this._is(e.nature.UIAUTOMATION)) {
    /**
    * Enables asynchronous mode
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**
    *
    * <wrap help> //Example://</wrap>
<code javascript>
MyUIAAppli.startAsyncMode();
</code>
    * @method startAsyncMode
    * @path ctx.application.startAsyncMode
    * @return {string} result value
    */
    this.startAsyncMode = function () {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'startAsyncMode', 'START_ASYNCMODE');
    }
  }

  if (this._is(e.nature.SWG)) {
    /**
    * Starts Javaswing Studio user interface
    * @description
    * :!: __Technology specific:__ **SWG**
    *
    * <wrap help> //Example://</wrap>
<code javascript>
MyJavaAppli.startStudio();
</code>
    * @method startStudio
    * @ignore
    * @deprecated useful to start 'old' Javaswing Studio : use new Studio Explorer to capture Java applcations
    * @path ctx.application.startStudio
    * @return {string} result value
    */
    this.startStudio = function () {
      var pg = this.getCurrentPage();
      if (pg && pg.exist()) {
        var desc = pg.getObjectDescriptor();
        return ctx.actionApp(desc, 'startStudio', 'STUDIO');
      }
      throw new Error(e.error.InvalidCommand, this.name + ".startStudio() failed : no valid page available");
    }
  };

  if (this._is(e.nature.SWG)) {

    this.addEvent({ evJavaCaptureApplicationTree: ''});

    /**
    * Captures a Javaswing page structure
    * @description
    * :!: __Technology specific:__ **SWG**
    *
    * <wrap help> //Example://</wrap>
<code javascript>
MyJavaAppli.captureApplicationTree(hwnd, '....xml', '0|0|0|0');
</code>
    * @method captureApplicationTree
    * @ignore
    * @deprecated useful to start 'old' Javaswing Studio : use new Studio Explorer to capture Java applications
    * @path ctx.application.startStudio
    * @return {string} result value
    */
    /**
    * Captures a Java application tree (for Studio Explorer)
    * @description
    *
    * @method captureApplicationTree
    * @ignore [internal usage]
    * @path ctx.application.captureApplicationTree
    * @param {number} [hwnd] window handle. If omitted, current page handle is used
    * @param {string} [filename] filename to save capture
    * @param {string} [position] position and size of the object in the parent page (in format "X|Y|CX|CY")
    * @return {boolean} result true|false
    */
    this.captureApplicationTree = function(hwnd, filename, position) {
      var res = '';
      /** @type {ctx.page} */ var pg = this.getCurrentPage();
      if (!(pg && pg.exist())) {
        // no current page : search an existing page
        var app = this;
        var pages = this.getActivePages();
        if (pages.length > 0) { pg = pages[0]; }
      }
      if (pg && pg.exist()) {
        var data;
        position = position || '0|0|0|0';
        /** @type {number} */ var handle = hwnd || pg.hwnd;
        try {
          var desc = pg.getObjectDescriptor();
          res = ctx.actionApp(desc, 'captureApplicationTree', 'CAPTURE', handle, position, '', '', '', '');
          data = {
            success: true,
            //error: 0,
            data: ''
          }
          if (filename) {
            // write content in a filename
            ctx.fso.file.write(filename, res, e.file.encoding.UTF8);
            data.data = filename;
          } else {
            // set content in event data
            data.data = res;
          }
        } catch (ex) {
          data = {
            success: false,
            //error: ex.number,
            data: ex.message
          }
        }
        this.notify(this.events['evJavaCaptureApplicationTree'], data);
//        pg.addOnce({ evJavaCapture: function(ev) {
//          var data = {
//            success: true,
//            error: '',
//            data: ''
//          };
//          if (ev && ev.data) {
//            if (filename) {
//              // write content in a filename
//              ctx.fso.file.write(filename, ev.data, e.file.encoding.UTF8);
//            } else {
//              // set content in event data
//              data.data = ev.data;
//            }
//          }
//          this.notify(this.events.evJavaCaptureApplicationTree, data);
//        }});
      } else {
        throw new Error(e.error.InvalidCommand, this.name + ".captureApplicationTree() failed : no valid page available");
      }
      return true;
    }
  };

//  /**
//  * Declares a new request or retrieves an existing step, associated with the application.
//  * @description
//  * <wrap help> //Example://</wrap>
//<code javascript>
//</code>
//  * </WRAP>
//  * @method request
//  * @path ctx.application.request
//  * @param {Object<string, Object>} obj request declaration
//  * @param {string|ctx.event} event event name to be called in destination application
//  * @param {string|ctx.event} [reqEvent] event name to be called in source application (if omitted, 'event' is used)
//  * @param {function(ctx.requestClass,(number|string)=)} [sendFunc] optional callback used to override the default callback called on request sending
//  * @param {function(ctx.requestClass,(number|string)=)} [replyFunc] optional callback used to override the default callback called on request answering
//  * @param {Object} [evObj] optional extra event attributes
//  * @return {ctx.requestClass}
//  */
//  this.request = function (obj, event, reqEvent, sendFunc, replyFunc, evObj) {
//    /*** @type {ctx.requestClass} */ var req = null;
//    if (typeof obj === 'object') {
//      for (var reqName in obj) {
//        var data = obj[reqName];
//        if (typeof data === 'object') {
//          if (!this.requests[reqName]) {
//            this.requests[reqName] = req = new ctx.request(data, event, reqEvent, sendFunc, replyFunc, evObj);
//          } else {
//            throw new Error(e.error.DuplicateId, name + '.request: name already used: ' + reqName);
//          }
//        }
//      }
//    }
//    if (!req)
//      throw new Error(e.error.InvalidArgument, "ctx.application.request : invalid request object");
//    return req;
//  }

  /**
  * Declares a new step or retrieves an existing step, associated with the application.
  * @description
  * <wrap help> //Example://</wrap>
<code javascript>
MyAppli.step({MyStep: function(ev, sc, st) {
  // Add code here...
  sc.endStep();
}});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<application>.step** + 'TAB' :
  *
<code javascript>
<application>.step({ st: function(ev, sc, st) {
  var data = sc.data;
  ...
  sc.endStep();
}});
</code>
  * </WRAP>
  * @method step
  * @path ctx.application.step
  * @param {Object<string, function(ctx.event,ctx.scenarioClass,ctx.stepClass)>} obj step declaration :\\
  *   - <step name>: function(ctx.event,ctx.scenarioClass,ctx.stepClass) {...}
  * @param {string} [comment] scenario comment
  * @return {ctx.stepClass}
  */
  this.step = function (obj, comment) {
    /*** @type {ctx.stepClass} */ var st = null;
    if (typeof obj === 'object') {
      for (var stName in obj) {
        var fn = obj[stName];
        if (typeof fn === 'function') {
          if (!this.steps[stName]) {
            this.steps[stName] = st = new ctx.stepClass(stName, fn, this);
            if (comment) st.comment = comment;
          } else {
            throw new Error(e.error.Duplicated, name + '.step: name already used: ' + stName);
          }
        }
      }
    }
    if (!st)
      throw new Error(e.error.InvalidArgument, "ctx.application.step : invalid step object");
    return st;
  }

  if (this._is(e.nature.UIAUTOMATION)) {
    /**
    * Disables asynchronous mode
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**
    *
    * <wrap help> //Example://</wrap>
<code javascript>
MyUIAAppli.stopAsyncMode();
</code>
    * @method stopAsyncMode
    * @path ctx.application.stopAsyncMode
    * @return {string} result value
    */
    this.stopAsyncMode = function () {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'stopAsyncMode', 'STOP_ASYNCMODE');
    }
  }

  if (this._is(e.nature.UIAUTOMATION)) {
    /**
    * Forces application cache synchronization for UIAutomation
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**
    *
    * <wrap help> //Example://</wrap>
<code javascript>
MyUIAAppli.synchronize();
</code>
    * @method synchronize
    * @path ctx.application.synchronize
    * @return {string} result value
    */
    this.synchronize = function () {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'synchronize', 'SYNCHRONIZE');
    }
  }

  /**
  * Waits until an application is present, then calls a callback (single handler)
  * @description
  * The behaviour is the following :
  *   * if the applicaion already exists (with a non null instance), the callback is immediately called
  *   * else it calls the callback on reception of a 'LOAD' event on any page of the application.
  * The handler is set a single time.
  *
  * <wrap help> //Example://</wrap>
<code javascript>
// wait for application 'MyAppli'
MyAppli.wait(function(ev) {
  // add code here, to be executed when application is present (any page is loaded)
});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<application>.wait** + 'TAB' :
  *
<code javascript>
<application>.wait(function(ev) {
  ...
}, 0);
</code>
  * </WRAP>
  * @method wait
  * @path ctx.application.wait
  * @param {function(ctx.event)} callback
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.wait = function (callback, delay) {
    var desc = this.getObjectDescriptor();
    ctx.notifyAction('wait', '', desc);
    // !! don't wait for START event (as instance '0' should be skipped), but 'LOAD' event on any page in the application
    return this.addOn({ LOAD: callback }, this.exist, true, delay);
  }

  /**
  * Waits until an application is present, then calls a callback (permanent handler)
  * @description
  * The behaviour is the following :
  *   * if the applicaion already exists (with a non null instance), the callback is immediately called
  *   * it calls the callback on reception of a 'LOAD' event on any page of the application.
  * The handler is set permanently.
  *
  * <wrap help> //Example://</wrap>
<code javascript>
// wait for application 'MyAppli'
MyAppli.waitAll(function(ev) {
// add code here, to be executed each time application is started
});
</code>
  * @method waitAll
  * @path ctx.application.waitAll
  * @param {function(ctx.event)} callback
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.waitAll = function (callback, delay) {
    var desc = this.getObjectDescriptor();
    ctx.notifyAction('waitAll', '', desc);
    return this.addOn({ LOAD: callback }, this.exist, false, delay);
  }

  /**
  * Waits until an application is closed, then calls a callback
  * @description
  * The behaviour is the following :
  *   * if the application doesn't exist, the callback is immediately called
  *   * else it calls the callback on reception of a 'END' event on the page.
  * The handler on the 'END' event is set a single time.
  *
  * <wrap help> //Example://</wrap>
<code javascript>
// wait for application 'MyAppli'
MyAppli.waitClose(function(ev) {
// add code here, to be executed when application is stopped or absent
});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<application>.waitClose** + 'TAB' :
  *
<code javascript>
<application>.waitClose(function(ev) {
  ...
});
</code>
  * </WRAP>
  * @method waitClose
  * @path ctx.application.waitClose
  * @param {function(ctx.event)} callback callback to be called when application is closed or absent
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.waitClose = function (callback, delay) {
    var desc = this.getObjectDescriptor();
    ctx.notifyAction('waitClose', '', desc);
    return ctx.once(this.events['END'], callback, this.notExist, this, delay);
  }

  /**
  * Waits for any page load for this application, then calls a callback (permanent handler)
  * @description
  * The behaviour is the following :
  *   * it calls the callback on reception of a 'LOAD' event on any page of the application.
  * The handler is set permanently.
  *
  * <wrap help> //Example://</wrap>
<code javascript>
// wait for application 'MyAppli'
MyAppli.waitPages(function(ev) {
  // add code here, to be executed each time a page is loaded
});
</code>
  * @method waitPages
  * @path ctx.application.waitPages
  * @param {function(ctx.event)} callback
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.waitPages = function (callback, delay) {
    var desc = this.getObjectDescriptor();
    ctx.notifyAction('waitPages', '', desc);
    return this.addOn({ LOAD: callback }, false, false, delay);
  }

  // Add application standard technical events
  this.addEvent({ START: '', INIT: '', QUIT: '', END: '' }, true);

  // Applications (of nature 'WEB3', 'HLLAPI', ...) can receive '_Undefined_' pages
  // currentPage is initialized with this page to enable Intellisense
  if (this.nature != '') {
    this.currentPage = this.addPage('_Undefined_');
  }

  // *** delete items dynamically declared in pages when Agent terminates ***
  var appli = this;
  this.events['QUIT'].on( function(ev) {
    var pages = appli.getActivePages();
    ctx.each(pages, function(id, page) {
      if (page && page.cleanUp) page.cleanUp();
    });
  });
}

// implicitly create 'GLOBAL' process which is mandatory
var GLOBAL = ctx.addApplication('GLOBAL');

// specific events
GLOBAL.addEvent( { UPDATECTX:'', PRESTART:'', PRESTOPCTX:'', STOPCTX:'', RESTARTCTX:'', evFileReception:'', evStopRequest: '', evStopBeingHandled: '', evStopDone: '', evUpdateLogFolder: '', evAjaxExOK: '', evAjaxExKO: '' });
// no display in debugger
GLOBAL.events.evFileReception.internal = true;
GLOBAL.events.evStopRequest.internal = true;
GLOBAL.events.evStopBeingHandled.internal = true;
GLOBAL.events.evStopDone.internal = true;
GLOBAL.events.evUpdateLogFolder.internal = true;
GLOBAL.events.evAjaxExOK.internal = true;
GLOBAL.events.evAjaxExKO.internal = true;

GLOBAL.fileMap = {
  id: 1,
  options: {}
};

// file reception internal event
GLOBAL.events.evFileReception.on(function(ev) {
  var content, options;
  if (typeof ev.data === 'object') {
    var id = ev.pageInst;
    if (id !== undefined) {
      ctx.set(ev.data, GLOBAL.fileMap.options[id]);
      options = GLOBAL.fileMap.options[id];
    }
    if (options.errorMessage) {
      // failed
      if (typeof options.error === 'function') {
        options.error.apply(options.context, [options, options.errorMessage]);
      }
      delete GLOBAL.fileMap.options[id];
    }
  } else {
    var id = ev.pageInst;
    if (id !== undefined) {
      options = GLOBAL.fileMap.options[id];
    }
    if ((typeof ev.data === 'string') && (ev.data.indexOf('error:') === 0)){
    } else {
      content = ev.data;
    }
  }
  if (content && options.localFile) {
    //var sContent = ctx.base64.decode(content, options.isBinary);
    var binaryContent = ctx.base64.decodeStream(content);
    //ctx.fso.file.write(options.localFile, sContent, e.file.encoding.ASCII);
    ctx.fso.file.write(options.localFile, binaryContent, e.file.encoding.Binary);
    if (typeof options.success === 'function') {
      options.success.apply(options.context, [options, options.localFile]);
    }
    delete GLOBAL.fileMap.options[id];
  }
});

GLOBAL.addOn({ evAjaxExOK: function(ev) {
	ctx.ajax.onRequestCallback(ev, true);
}});
GLOBAL.addOn({ evAjaxExKO: function(ev) {
	ctx.ajax.onRequestCallback(ev, false);
}});

// I18N Language initialization
GLOBAL.events.START.on(function(ev) {
	try {
		// Give the path where language files are, to workmanager
		GLOBAL.labels.SetI18NPath();
		// Ask workmanager what is the current language
		var curLang = GLOBAL.labels.GetI18NCurrentLang();
		// Get labels list for that language
		var labelList = GLOBAL.labels.GetI18NLabelList(curLang);

		// For debug : deserialisation of labelList
		//var newLabels = ctx.json.parse(labelList);

		// Inject received labels to current language
		GLOBAL.labels.InjectI18NLabels(labelList, 'en');
	}
	catch(ex) {}
});

/**
* Sets restart mode : legacy function (for compatibility)
* @ignore
*/
function CtxtRestart() {
  ctx.restartAgent = true;
}

GLOBAL.events.PRESTOPCTX.on(function(ev) {
  var counter = ctx.counter();
  counter.onValue(0, function() {
    if (ctx.restartAgent) {
      ctx.setAutoRestart(true);
      GLOBAL.notify(GLOBAL.events.RESTARTCTX);
    } else {
      GLOBAL.notify(GLOBAL.events.STOPCTX);
    }
  }, true);
  GLOBAL.notify(GLOBAL.events.evStopRequest);
  var hObj = GLOBAL.events.evStopBeingHandled.on(function(ev) {
    counter.increment();
  });
  var hObjDone = GLOBAL.events.evStopDone.on(function(ev) {
    counter.decrement();
  });
  ctx.wait(function(ev) {
    counter.checkValue(); // check if noone handled event within 2 seconds
  }, 2000);
});

// *** these dummy declarations are used to enable Intellisense inside callbacks ***
ctx.dataManager( { 'empty' : {}} );
/** @path defData
* @type {ctx.dataClass} */
var defData = ctx.dataManagers.empty.create();

/** @path ev
* @type {ctx.event} */
var ev = new ctx.event('evDefault');
ev.data = defData;

/** @path counter
* @type {ctx.counterClass} */
var counter = new ctx.counterClass();

/** @path job
* @type {ctx.jobClass} */
var job = new ctx.jobClass();

/** @path pr
* @type {ctx.promiseClass} */
var pr = new ctx.promiseClass(function(ev) { });

/** @path sc
* @type {ctx.scenarioClass} */
var sc = new ctx.scenarioClass('scDummy', function(ev, sc) {}, GLOBAL, undefined);

/** @path st
* @type {ctx.stepClass} */
var st = new ctx.stepClass('stDummy', function(ev, sc, st) {});

/** @path desc
* @type {ctx.descriptor} */
var desc = ctx.getDescriptor();
/** @path rect
* @type {ctx.position} */
var rect = new ctx.position();
//var it = new ctx.item('oDummy');
//var pg = new ctx.page('pDummy');
//var app = new ctx.application('aDummy');
