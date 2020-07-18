/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== ctx.page class ======
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
*
* The ''ctx.page'' class implements the pages declared in application, especially to perform actions : navigate, activate, close, ...
*
* Page objects can also receive notifications : page LOAD or UNLOAD, ...
*
* According to application technology (Windows, Web, Java, ...), page objects implement different actions.
*
* __Ex.:__ '''ctx.page.execScript()''' is specific to Web application pages.
*
* Typical syntaxes :\\
*   * calling a page action :
<code javascript><application>.<page>.<action>(parameters...);</code>
*
* __Ex.:__
<code javascript>
// activate page
MyAppli.MyPage.activate();
</code>
*
*   * receiving a notification :
<code javascript>
<application>.<page>.events.<event>.on(function(ev) {
  // add code here...
});
</code>
*
* __Ex.:__
<code javascript>
// detect page LOAD
MyAppli.MyPage.events.LOAD.on(function(ev) {
  ...
});
</code>
* \\
* \\
*
*/

/** object class
* @ignore
* @const
* @path ctx.objectClass
* @property {string} */ ctx.objectClass = 'ctx_objectClass';

/** Options for the 'ctx.page.tooltips' library
* @path ctx.options.tooltips
* @class ctx.options.tooltips
* @struct
*/
ctx.options.tooltips = {
  /** Trace level (see [[:lib:common:ctx.enum#enumeration_etracelevel|e.trace.level]])
  * @property {e.trace.level} traceLevel
  * @path ctx.options.popup.traceLevel */ traceLevel: e.trace.level.None,
  /** Tooltip animation (see [[:lib:common:ctx.enum#enumeration_etooltipanimation|e.tooltip.animation]])
  * @property {e.tooltip.animation} animation
  * @path ctx.options.tooltips.animation */ animation: e.tooltip.animation.fade,
  /** Arrow display
  * @property {boolean} arrow
  * @path ctx.options.tooltips.arrow */ arrow: true,
  /** Tooltip default max show count
  * @property {number} defaultMaxShowCount
  * @path ctx.options.tooltips.defaultMaxShowCount */ defaultMaxShowCount : 3,
  /** Tooltip default auto show count
  * @property {number} defaultAutoShowCount
  * @path ctx.options.tooltips.defaultAutoShowCount */ defaultAutoShowCount : 3,
  /** Tooltip enabled / disabled
  * @property {boolean} enabled
  * @path ctx.options.tooltips.enabled */ enabled: true,
  /** Tooltip library
  * @property {e.tooltip.library} library
  * @path ctx.options.tooltips.library */ library: e.tooltip.library.opentip,
  /** Tooltip max width
  * @property {number} maxWidth
  * @path ctx.options.tooltips.maxWidth */ maxWidth: 600,
  /** Tooltip styles
  * @property {Object} styles
  * @path ctx.options.tooltips.styles */ styles: {},
  /** Tooltip theme (see [[:lib:common:ctx.enum#enumeration_etooltiptheme|e.tooltip.theme]])
  * @property {e.tooltip.theme} theme
  * @path ctx.options.tooltips.theme */ theme: e.tooltip.theme.grey,
  /** Tooltip z-index
  * @property {number} zIndex
  * @path ctx.options.tooltips.zIndex */ zIndex: 10000
};

/**
* Class used to implement tooltip objects
* @description
* __Ex.:__
<code javascript>
ctx.popups[name] = new ctx.tooltipClass(name, template, parentProcess);
</code>
* @class ctx.tooltipClass
* @path ctx.tooltipClass
* @constructor
* @advanced
* @param {Object} params tooltip parameters
* @param {ctx.page} page parent page
*/
ctx.tooltipClass = function (params, page) {
  /** @type {ctx.page} */ var _page = page;
  ///** @type {Object} */ var _params = {};
  /** @type {string} */ var _rootRegistry = ctx.registry.getRoot("Tooltips");
  /** @type {Object} */ var _options = ctx.options.tooltips;

  var _defaultTooltipOptions = {};
  _defaultTooltipOptions[e.tooltip.library.tooltipster] = {
    theme: e.tooltip.theme.grey,
    animation: e.tooltip.animation.fade,
    maxWidth: 600,
    arrow: true,
    contentCloning: true,
    contentAsHTML: true,
    interactive: true
  }
  _defaultTooltipOptions[e.tooltip.library.opentip] = {
  }

  /** class type
  * @ignore
  * @const
  * @path ctx.popupClass.ctxType
  * @property {string} */ this.ctxType = 'ctx.tooltipClass';

    this.inserted = false;

    this.local = {
      id: '',
      helpId: '',
      targetId: '',
      parentId: '',
      enabled: true,
      targetItem: null,
      adjacentItem: null,
      defaultMaxShowCount : 0,
      defaultAutoShowCount : 0,
      autoShowCount: 0,
      maxShowCount: 0,
      autoCloseTimer: 0,
      autoCloseTimerId: 0,
      icon: '',
      look: '',
      style: 'position:absolute',
      afterInit: null,
      after: null,
      beforeInit: null,
      before: null,
      styles: {},
      traceLevel: e.trace.level.None,
      content: '',
      'class': '',
      position: e.html.position.afterEnd,
      jQuery: false,
      polling: false,
      library: e.tooltip.library.opentip,
      noConflict: true,
      file: ''
    };

    this.options = { };


  /** Clones a given tooltip and attaches it to a page [internal use]
  * @description
  * __Ex.:__
<code javascript>
var tt = this.clone(page);
</code>
  * @method clone
  * @path ctx.tooltipClass.clone
  * @ignore
  * @param {ctx.page} parent parent page
  * @return {ctx.tooltipClass} tooltip object
  */
  this.clone = function (parent) {
    if (!parent) {
      return null;
    }
    var tt = new ctx.tooltipClass(null, parent);
    if (tt) {
      tt.local = this.local;
      tt.options = this.options;
    }
    return tt;
  };

  /** Enables or disables a tooltip
  * @method enable
  * @path ctx.tooltipClass.enable
  * @param {boolean} enable
  * @return {string} result
  */
  this.enable = function (enable) {
    if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
      // *** Opentip tooltip ***
      if (enable === false)
        return this.exec('deactivate()');
      else
        return this.exec('activate()');
    } else {
      // *** Tooltipster tooltip ***
      if (enable === false)
        return this.exec('disable');
      else
        return this.exec('enable');
    }
  };


  /** Opens and displays a tooltip
  * @method open
  * @path ctx.tooltipClass.open
  * @return {string} result
  */
  this.open = function () {
    if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
      // *** Opentip tooltip ***
      return this.exec('prepareToShow()');
    } else {
      // *** Tooltipster tooltip ***
      return this.exec('open');
    }
  };

  /** Closes a tooltip
  * @method close
  * @path ctx.tooltipClass.close
  * @return {string} result
  */
  this.close = function () {
    if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
      // *** Opentip tooltip ***
      //return this.exec('hide()');
      return this.exec('prepareToHide()');
    } else {
      // *** Tooltipster tooltip ***
      return this.exec('close');
    }
  };

  /** Destroys a tooltip
  * @method destroy
  * @path ctx.tooltipClass.destroy
  * @return {string} result
  */
  this.destroy = function () {
    var res = '';
    if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
      // *** Opentip tooltip ***
      res = this.exec('deactivate()');
    } else {
      // *** Tooltipster tooltip ***
      res = this.exec('close');
      res = this.exec('destroy');
    }
    this.inserted = false;
    if (this.local.icon) {
      var item = this.local.targetItem;
      if (item && item.name && item.dynamic) {
        _page.deleteObject(item.name);
      }
    }
    return res;
  };

  /** Executes a custom action on the tooltip
  * @method exec
  * @path ctx.tooltipClass.exec
  * @param {string} command tooltip command
  * @param {...*} arg command arguments
  * @return {string} result
  */
  this.exec = function (command, arg) {
    try {
      if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
        if (this.local.id) {
          // *** Opentip tooltip ***
          var args = Array.prototype.slice.call(arguments, 1);
          args.unshift("ctxTooltip.map[\"" + this.local.id + "\"]." + command);
          args.push(e.prefix.tryCatch);
          return _page.execScript.apply(_page, args);
        }
      } else {
        if (this.local.id && (this.local.targetId)) {
          // *** Tooltipster tooltip ***
          var args = Array.prototype.slice.call(arguments);
          args.unshift("$(\"#" + this.local.targetId + "\").tooltipster");
          args.push(e.prefix.tryCatch);
          //return _page.evalScript.apply(_page, args);
          return _page.execScript.apply(_page, args);
        }
      }
    } catch (ex) {
      ctx.log(args, e.logIconType.Warning, "ctx.tooltipClass.exec failed: id=" + this.local.id + ", command=" + command + " : " + ex.message);
    }
    return '';
  };

  /** Gets tooltip content
  * @method getContent
  * @path ctx.tooltipClass.getContent
  * @return {string} result
  */
  this.getContent = function () {
    if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
      // *** Opentip tooltip ***
      // TODO
      return '';
    } else {
      // *** Tooltipster tooltip ***
      return this.exec('content');
    }
  };

  /** Sets or updates tooltip parameters
  * @method set
  * @path ctx.tooltipClass.set
  * @param {Object} params tooltip data
  * @return {boolean} true if the object was inserted
  */
  this.set = function (params) {
    /** @type {ctx.tooltipClass} */ var _tooltip = this;
    //if (params) _params = params;
    //params = params || {};
    var res = false;
    if (params) {
      var _params = {};
      var lib = params.library || _page.tooltipOptions.library || ctx.options.tooltips.library || e.tooltip.library.opentip;
      var libOptions = _defaultTooltipOptions[lib] || {};
      ctx.each(libOptions, function(id, value) {
        _params[id] = value; // initialize with default options
      });
      ctx.each(_page.tooltipOptions, function(id, value) {
        _params[id] = value; // initialize with page options
      });
      ctx.each(params, function(id, value) {
        _params[id] = value; // initialize with tooltip options
      });
      ctx.each(_params, function(id, value) {
        if (id == 'item') {
          _tooltip.local.adjacentItem = value;
        } else if (_tooltip.local[id] !== undefined) {
          _tooltip.local[id] = value;
        } else {
          _tooltip.options[id] = value;
        }
      });
    }

    try {
      // try to insert tooltip if the adjacent item is present
      if (ctx.options.tooltips.enabled && (!_tooltip.inserted) && _tooltip.local.adjacentItem && _page.exist() && _tooltip.local.adjacentItem.exist()) {
        if (!_tooltip.local.id) {
          ctx.log("ctx.tooltipClass.set: no id provided", e.logIconType.Warning);
          return false;
        }
        _tooltip.local.helpId = _tooltip.local.helpId || _tooltip.local.id;
        _tooltip.local.targetId = _tooltip.local.targetId || _tooltip.local.id + 'Target';

        // manage 'clickAndKeep' trigger type
        if (_tooltip.options.trigger == e.tooltip.trigger.clickAndKeep) {
          _tooltip.options.trigger = e.tooltip.trigger.custom;
          _tooltip.options.triggerOpen = {
            click: true
          };
          _tooltip.options.triggerClose = {
            //originClick: true
          };
        }

        if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
          // *** Opentip tooltip specific initialization ***
          _tooltip.options.removeElementsOnHide = true;
          //_tooltip.options.group = _tooltip.local.id;
          if (_tooltip.options.trigger !== undefined) {
            switch (_tooltip.options.trigger) {
              case e.tooltip.trigger.clickAndKeep:
              {
                // TODO : manage close...
                _tooltip.options.showOn = 'click';
                _tooltip.options.hideOn = 'click';
                break;
              }
              case e.tooltip.trigger.click:
              {
                _tooltip.options.showOn = 'click';
                _tooltip.options.hideOn = 'click';
                break;
              }
              case e.tooltip.trigger.none:
              {
                _tooltip.options.showOn = null;
                break;
              }
              case e.tooltip.trigger.hover:
              default:
              {
                _tooltip.options.showOn = 'mouseover';
                break;
              }
            };
            delete _tooltip.options.trigger;
          }
          if (_tooltip.options.side) {
            if (Array.isArray(_tooltip.options.side)) {
              _tooltip.options.targetJoint = _tooltip.options.side.join(' ');
            } else {
              _tooltip.options.targetJoint = _tooltip.options.side;
            }
            delete _tooltip.options.side;
          }
    //              if (tooltip.options.fixed === undefined) {
    //                tooltip.options.fixed = true;
    //              }
    //              if (tooltip.options.target === undefined) {
    //                tooltip.options.target = true
    //              }
          if (_tooltip.local.look) {
            _tooltip.options.style = _tooltip.local.look;
          }
        }

        // 'maxShowCount' option
        if (_tooltip.local.maxShowCount > 0) {
          var root = _rootRegistry + _page.parent.name + "\\" + _page.name + "\\" + _tooltip.local.id + "\\MaxShowCount";
          var sVal = ctx.registry.get(root);
          var val = parseInt(sVal, 10) || 0;
          if (val < _tooltip.local.maxShowCount) {
            val ++;
            ctx.registry.set(root, val);
          } else {
            // skip display
            return true;
          }
        }

        var helpSelector = "#" + _tooltip.local.helpId;
        if (_tooltip.local.icon) {
          // if an icon is mentioned : insert it and associate tooltip to the image
          var icon = ctx.resources.loadImageAsBase64(_tooltip.local.icon);
          var imgObject = {
            id: _tooltip.local.targetId,
            "class": "ctx_img " + ctx.objectClass + (_tooltip.local['class'] ?  " " + _tooltip.local['class'] : ""),
            style: "padding:0px 10px;" + (_tooltip.local.style ?  _tooltip.local.style + ";" : ""),
            src: icon,
            onClick: "try { ctxTooltip.send('evTooltipOpen', '', '" + _tooltip.local.helpId + "'); } catch(ex) {}"
          }
          if (_page.tooltipOptions.library == e.tooltip.library.tooltipster) {
            imgObject["data-tooltip-content"] =  helpSelector;
          }

          // delete any past object not cleaned
          _page.deleteObject(_tooltip.local.targetId);

          if (_tooltip.local.adjacentItem instanceof ctx.item) {
            /** @type {ctx.item} */ var el = _tooltip.local.adjacentItem;
            _page.insertObject('img', el, imgObject, _tooltip.local.position);
            _tooltip.local.targetItem = _page.getItem(_tooltip.local.targetId);
          }
        } else {
          // no icon is mentioned : set tooltip on the object itself
          //tooltip.local.adjacentItem.scriptItem('setAttribute', "data-tooltipster", tooltip.options);
          _tooltip.local.adjacentItem.scriptItem('setAttribute', "data-tooltip-content", helpSelector);
          if (_tooltip.local['class'])
            _tooltip.local.adjacentItem.scriptItem('className += " ' + _tooltip.local['class'] + '"');
          if (_tooltip.local.style)
            _tooltip.local.adjacentItem.scriptItem('style += ";' + _tooltip.local.style + '"');
          // memorize item id (or set it if none)
          var theId = _tooltip.local.adjacentItem.scriptItem('id');
          if (theId) {
            _tooltip.local.targetId = theId;
          } else {
            _tooltip.local.adjacentItem.scriptItem('setAttribute', "id", _tooltip.local.targetId);
          }
          _tooltip.local.targetItem = _tooltip.local.adjacentItem;
        }

        var parentId = _tooltip.local.parentId;
        if (parentId && _tooltip.local.targetId && _page.tooltips[parentId] &&  _page.tooltips[parentId].local.targetId) {
          if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
            // *** Opentip tooltip initialization ***
            _tooltip.options.target = "#" + _page.tooltips[parentId].local.targetId;
            //_tooltip.options.group = parentId;
          } else {
            // *** Tooltipster tooltip initialization ***
            _tooltip.options.functionBefore = e.prefix.rawBegin + "function(instance, helper) { $('#" + _page.tooltips[parentId].local.targetId + "').tooltipster('open'); return false; }" + e.prefix.rawEnd;
          }
        } else {
          _tooltip.options.target = "#" + _tooltip.local.targetId;
        }

        // call pre insertion callback if defined
        if (typeof _tooltip.local.before === 'function') {
          try {
            _tooltip.local.before();
          } catch (ex) {
            ctx.log("ctx.tooltipClass.set: 'before' callback failed on '" + _tooltip.local.id + "' : " + ex.message, e.logIconType.Warning);
          }
        }

        if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
          // *** Opentip tooltip initialization ***
          _tooltip.local.content  = _tooltip.local.content || "";
          //res = _page.execScript("ctxTooltip.map['" + local.id + "'] = new Opentip", "#" + tooltip.local.targetId, text, tooltip.options, e.prefix.tryCatch);
          _page.execScript("ctxTooltip.create", _tooltip.local, _tooltip.options);
          if ((!_tooltip.local.content) && _tooltip.local.helpId) {
            _tooltip.setContentId(_tooltip.local.helpId);
          }
        } else {
          // *** Tooltipster tooltip initialization ***
          _page.execScript("$('#" + _tooltip.local.targetId + "').tooltipster", _tooltip.options, e.prefix.tryCatch);
        }

        // memorize tooltip is inserted
        res = _tooltip.inserted = true;
        ctx.log(null, e.logIconType.Info, "ctx.tooltipClass.set: tooltip inserted '" + _tooltip.local.id, _options);


        // call post insertion callback if defined
        if (typeof _tooltip.local.after === 'function') {
          try {
            _tooltip.local.after();
          } catch (ex) {
            ctx.log("ctx.tooltipClass.set: 'after' callback failed on '" + _tooltip.local.id + "' : " + ex.message, e.logIconType.Warning);
          }
        }

        // 'autoShowCount' option
        if (_tooltip.local.autoShowCount > 0) {
          var root = _rootRegistry + _page.parent.name + "\\" + _page.name + "\\" + _tooltip.local.id + "\\AutoShowCount";
          var sVal = ctx.registry.get(root);
          var val = parseInt(sVal, 10) || 0;
          if (val < _tooltip.local.autoShowCount) {
            val ++;
            ctx.registry.set(root, val);
            _tooltip.open();
            //res = _page.execScript("$('#" + tooltip.local.targetId + "').tooltipster('open')");
          }
        }
      }
    } catch (ex) {
      ctx.log("ctx.tooltipClass.set: could not insert tooltip '" + _tooltip.local.id + "' : " + ex.message, e.logIconType.Warning);
    }
    return res;
  };

  /** Sets tooltip content
  * @method setContent
  * @path ctx.tooltipClass.setContent
  * @param {string} content tooltip content
  * @return {string} result
  */
  this.setContent = function (content) {
    if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
      // *** Opentip tooltip ***
      return this.exec('setContent', content);
    } else {
      // *** Tooltipster tooltip ***
      return this.exec('content', content);
    }
  };

  /** Sets tooltip content based on an id in an html page
  * @method setContentId
  * @path ctx.tooltipClass.setContentId
  * @param {string} contentId tooltip content id
  * @return {string} result
  */
  this.setContentId = function (contentId) {
    if (_page.tooltipOptions.library == e.tooltip.library.opentip) {
      // *** Opentip tooltip ***
      if (ctx.options.tooltips.enabled && this.local.id) {
        var code = "try { var txt = document.getElementById('" + contentId + "').outerHTML; ctxTooltip.map['" + this.local.id + "'].setContent(txt); } catch (ex) {}; ";
        return _page.evalScript(code);
      }
    } else {
      // *** Tooltipster tooltip ***
      if (ctx.options.tooltips.enabled && this.local.id && (this.local.targetId)) {
        return _page.evalScript("$('#" + this.local.targetId + "').tooltipster('content', $('#" + contentId + "'))");
      }
    }
    return '';
  };

  if (params)
    this.set(params);
}

/**
* ctx.page class
* @class ctx.page
* @path ctx.page
* @constructor
* @advanced
* @param {string} name page name
* @param {ctx.application} parent parent application
* @param {Object} [obj] page definitions
* @param {number} [instance] page instance
*/
ctx.page = function (name, parent, obj, instance) {
  if ( !(this instanceof ctx.page) ) {
    return new ctx.page(name, parent, obj); // in case 'new' was not used
  }
  /** @type {ctx.page} */ var _page = this;
  /** @type {Object} */ var _params = {};

  /** class type
  * @ignore
  * @const
  * @path ctx.page.ctxType
  * @property {string} */ this.ctxType = 'ctx.page';

  /** parent application
  * @path ctx.page.appli
  * @property {ctx.application} */ this.appli = parent;

  /** page comment
  * @path ctx.page.comment
  * @advanced
  * @property {string} comment  */ this.comment = "";

  /** optional technical component
  * @path ctx.page.component
  * @property {Object} component */ this.component = null;

  /** methods to be injected in page at LOAD
  * @path ctx.page.customMethods
  * @ignore
  * @property {Object} */ this.customMethods = {};

  /** page custom type
  * @path ctx.page.customType
  * @advanced
  * @property {string} customType */ this.customType = this.customType || (parent && parent.customType) || '';

  /** page current navigator (for a Web page) (see [[lib:common:ctx.enum#enavigator|e.navigator]])
  * @path ctx.page.currentNavigator
  * @property {e.navigator} */ this.currentNavigator = e.navigator.Undefined;

  /** data container
  * @path ctx.application.data
  * @property {ctx.dataClass} */ this.data = ctx.dataManager(null);

  /** event list
  * @path ctx.page.events
  * @property {Object<string, ctx.event>} */ this.events = {};

  /** list of injected functions (internal use)
  * @ignore
  * @path ctx.page.injectedFunctions
  * @property {Object<string, boolean>} */ this.injectedFunctions = {};
	
  /** function list
  * @path ctx.page.functions
  * @property {Object} */ this.functions = {  };

  /** list of page handlers
  * @path ctx.page.handlers
  * @ignore
  * @property {Object} */ this.handlers = {};

  /** page window handle
  * @path ctx.page.hwnd
  * @property {number} */ this.hwnd = 0;

  /** page main window handle
  * @advanced
  * @path ctx.page.hwnd
  * @property {number} */ this.hwndMain = 0;

  /** page instance number
  * @path ctx.page.instance
  * @advanced
  * @property {number} instance  */ this.instance = ((instance) ? parseInt(instance, 10) : -1);

  /** list of page instances
  * @path ctx.page.instances
  * @property {Object} */ this.instances = {};

  /** list of items declared in the page
  * @path ctx.page.items
  * @property {Object<string, ctx.item>} */ this.items = {};

  /** page model (root) object
  * @path ctx.page.model
  * @ignore
  * @property {ctx.page} */ this.model = this;

  /** page name
  * @path ctx.page.name
  * @property {string} */ this.name = name;

  /** page nature (technology : Windows, Web, ...)
  * @path ctx.page.nature
  * @advanced
  * @property {string} nature  */ this.nature = this.nature || (parent && parent.nature) || "";

  /** count of page instances
  * @path ctx.page.nbInst
  * @ignore
  * @property {number} */ this.nbInst = 0;

  /** page object
  * @path ctx.page.page
  * @advanced
  * @property {ctx.page} page */ this.page = this;

  /** parent application
  * @path ctx.page.parent
  * @property {ctx.application} */ this.parent = parent;

  /** page launch path (as declared in Explorer)
  * @path ctx.page.path
  * @advanced
  * @property {string} path */ this.path = "";

  /** list of paths based on environment (development, production, ...)
  * @advanced
  * @path ctx.application.pathList
  * @property {string} */ this.pathList = {};

  /** page process Id
  * @advanced
  * @path ctx.page.processId
  * @property {number} */ this.processId = 0;

  /** tooltips declared on the page
  * @path ctx.page.tooltips
  * @property {Object} tooltips  */ this.tooltips = {};

  /** tooltip global options declared on the page
  * @path ctx.page.tooltipOptions
  * @property {Object} tooltipOptions  */ this.tooltipOptions = {};

  /** tracked events declared on the page
  * @path ctx.page.trackEvents
  * @advanced
  * @property {Object} trackEvents  */ this.trackEvents = {};

  /** page userAgent (for a Web page)
  * @path ctx.page.userAgent
  * @property {string} */ this.userAgent = '';

  /** definitions for object copy
  * @ignore
  * @type {Array<string>} */ var _copyData = [/*'tooltips',*/ 'customType', 'customMethods', 'component', 'tooltipOptions', 'trackEvents', 'path', 'pathList', 'comment', 'nature', 'data'];
  if (obj) {
    var id;
    var nb = _copyData.length;
    for (var i = 0; i < nb; i++) {
        id = _copyData[i];
        if (obj[id]) { this[id] = obj[id]; }
    }
    if (obj.technicalPage) {
      this.appli.technicalPage = this;
    }
  }

  // set data parent object
  //this.data.setParent(this);

  //this._getObjectDescriptor = function (desc) {
  //}

  /**
  * Checks if the nature of the page is part of the given list
  * @method _is
  * @ignore
  * @path ctx.page._is
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
  * Injects code in page to enable Ajax download
  * @method _initDownload
  * @ignore
  * @path ctx.page._initDownload
  * @return {boolean} result : 'true' if compatible
  */
  this._initAjax = function () {
    var code = "if ('undefined' === typeof e) { e = {}; e.ajax = " + ctx.serialize(e.ajax, false, false) + "; e.prefix = {json:\"" + e.prefix.json + "\"}; };";
    code += "if ('undefined' === typeof ctx) { ctx = {}; ctx.notifyAction = function(name) {}; };";
    code += "if ('undefined' === typeof ctx.ajax) { ctx.ajax = (" + _CtxAjax.toString() + ")(); };";
    code += "if ('undefined' === typeof ctx.base64) { ctx.base64 = (" + _CtxBase64.toString() + ")(); };";
    if (this.exist()) {
      this.execScript(code);
      return true;
    }
    return false;
  }

  /**
  * Calls a low level action verb on a page
  * @description
  * __Ex.:__
<code javascript>
var res = MyAppli.MyPage.actionApp('NAVIGATE', url, dest, post, header);
</code>
  *
  * __Note:__ This method should only be used if an action verb is not wrapped by the language framework. \\
  * In general, any action verb is wrapped by a framework function
  *
  * __Ex.:__
<code javascript>
var res = MyAppli.MyPage.actionApp('NAVIGATE', url, dest, post, header);
// is equivalent to :
var res = MyAppli.MyPage.navigate(url, dest, post, header);
</code>
  * @method actionApp
  * @path ctx.page.actionApp
  * @advanced
  * @param {string} action
  * @param {string|number|Object} [P1] parameter 1
  * @param {string|number|Object} [P2] parameter 2
  * @param {string|number|Object} [P3] parameter 3
  * @param {string|number|Object} [P4] parameter 4
  * @param {string|number|Object} [P5] parameter 5
  * @return {string} result value
  */
  this.actionApp = function (action, P1, P2, P3, P4, P5) {
    var desc = this.getObjectDescriptor();
    return ctx.actionApp(desc, 'actionApp', action, P1, P2, P3, P4, P5);
  }

  /**
  * Activates the page
  * @description
  * __Ex.:__
<code javascript>
MyAppli.MyPage.activate();
</code>
  * @method activate
  * @path ctx.page.activate
  * @return {string} result value
  */
  this.activate = function () {
    var res = '';
    try {
        var desc = this.getObjectDescriptor();
        return ctx.action(desc, 'activate', 'ACTIVATE');
    } catch (ex) {    }
    return res;
  }

  /**
  * Declares an event and sets a permanent or single handler on this event
  * @description
  *
  * __Ex.:__
<code javascript>
MyAppli.MyPage.addOn({evMyFuncEvent: function(ev) {...}});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<page>.addOn** + 'TAB' :
  *
<code javascript>
<page>.addOn({ event: function(ev) {
  var data = {};
  ...
}});
</code>
  * </WRAP>
  * @method addOn
  * @path ctx.page.addOn
  * @param {Object<string, function(ctx.event)>} evCallback event and callback object : { <event>: function(ev) { ... } }
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {boolean} [single] if 'true', sets a single listening on the event (otherwise, a permanent listening)
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.addOn = function (evCallback, immediateCondition, single, delay, noStepReset) {
    /** @type {Object} */ var obj = null;
    if (typeof evCallback === 'string') throw new Error(e.error.InvalidArgument, 'ctx.page.on: Invalid argument');
    for (var evName in evCallback) {
      var func = evCallback[evName];
      var evObj = {};
      evObj[evName] = '';
      var ev = this.addEvent(evObj);
      if ((ev && (typeof func === 'function')) || ctx.currentPromise) {
        obj = ctx.on(ev, func, immediateCondition, this, single, delay, noStepReset);
      }
    }
    return obj;
  }

  /**
  * Declares an event and sets a single handler on this event
  * @description
  * The list of pre-defined events is defined in enumeration : [[:lib:common:ctx.enum#enumeration_eeventpage|e.event.page]]
  *
  * __Ex.:__
<code javascript>
MyAppli.MyPage.addOnce({evMyFuncEvent: function(ev) {...}});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<page>.addOnce** + 'TAB' :
  *
<code javascript>
<page>.addOnce({ event: function(ev) {
  var data = {};
  ...
}});
</code>
  * </WRAP>
  * @method addOnce
  * @path ctx.page.addOnce
  * @param {Object<string, function(ctx.event)>} evCallback event and callback object : { <event>: function(ev) { ... } }
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @param {boolean} [noStepReset] if 'true', and handler is set in a step, it is not reset on step exit
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.addOnce = function (evCallback, immediateCondition, delay, noStepReset) {
    return this.addOn(evCallback, immediateCondition, true, delay, noStepReset);
  }

  /**
  * Adds an event or list of events to a page, or returns an existing event
  * @description
  * __Ex.:__
<code javascript>
MyAppli.MyPage.addEvent({evMyFuncEvent_1:'', evMyFuncEvent_2:''});
</code>
  * @method addEvent
  * @path ctx.page.addEvent
  * @param {Object} obj object with event names (ex. : { LOAD:'', UNLOAD:'', ...} )
  * @param {boolean} [technical] if true, technical event
  * @param {boolean} [addOnParent] if true, also declares event for parent
  * @return {ctx.event} event object
  */
  this.addEvent = function (obj, technical, addOnParent) {
    /** @type {ctx.event} */ var ev = null;
    for (var name in obj) {
      if (!this.events[name]) {
        var data;
        if ((typeof obj[name] === 'object') || (obj[name] instanceof ctx.dataClass)) { data = obj[name]; }
        this.events[name] = new ctx.event(name, this, data, technical);
        if (addOnParent && this.parent && this.parent.events) {
          this.parent.events[name] = new ctx.event(name, this.parent, data, technical);
        }
      }
      ev = this.events[name];
    }
    return ev;
  }

  /**
  * Adds a child item to a page
  * @description
  * __Ex.:__
<code javascript>
// add an item named 'edName' to the page
MyAppli.MyPage.edName = MyAppli.MyPage.addItem('edName');
</code>
  * @method addItem
  * @path ctx.page.addItem
  * @throws {Error}
  * @advanced
  * @param {string} name item name
  * @param {Object} [obj] item definitions
  * @param {boolean} [dynamic] indicates if the item is statically or dynamically declared
  * @return {ctx.item} item item object
  */
  this.addItem = function (name, obj, dynamic) {
    if ((!this.items[name]) && this[name]) {
      throw new Error(e.error.Reserved, this.parent.name + "." + this.name + " : '" + name + "' item can't be added: name is already used or reserved");
    }
    return (this[name] = this.items[name] = new ctx.item(name, this, obj, 0, dynamic));
  }

  // ****************************
  // *** custom type override ***
  // ****************************
  // !! 'addEvent' function should be declared before
  var type = ctx.customTypes[this.nature];
  if (type && typeof type === 'function') {
    type(this, this.customType);
  }
  if (this.customType && ctx.customTypes[this.customType]) {
    type = ctx.customTypes[this.customType].page;
    if (type && typeof type === 'function') {
      type(this, this.customType);
    }
  }

  // ************************
  // *** Windows specific ***
  // ************************
  if (this._is(e.nature.EXEWIN, e.nature.WIN)) {
    /**
    * Clicks a menu in a page, based on its numeric id (advanced usage)
    * @description
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
// click the menu 'Network'
MyWinAppli.MyPage.clickMenuItem('45'); // 45 is the menu numeric identifier
</code>
    * @method clickMenuItem
    * @path ctx.page.clickMenuItem
    * @param {string} menuItem menu item to be clicked
    * @return {string} result value
    */
    this.clickMenuItem = function (menuItem) {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = 'MENUITEM';
      return ctx.action(desc, 'clickMenuItem', 'FCTBTN', menuItem);
    }
  }

  if (this._is(e.nature.EXEWIN, e.nature.WIN)) {
    /**
    * Sends a low level WM_COMMAND message (advanced usage) : Selects a menu in a page TBC
    * @description
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
// click the menu 'Network'
MyWinAppli.MyPage.clickMenuCommand('');
</code>
    * @method clickMenuCommand
    * @path ctx.page.clickMenuCommand
    * @param {string} menuCommand menu command to be executed
    * @return {string} result value
    */
    this.clickMenuCommand = function (menuCommand) {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = 'MENUCOMMAND';
      return ctx.action(desc, 'clickMenuCommand', 'FCTBTN', menuCommand);
    }
  }

  /**
  * Clones a given page and attach it to an application
  * @description
  * __Ex.:__
<code javascript>
// clone a page with a new page instance
ctx.app[appliName][pageName].clonePage(ctx.app[appliName][appliInst], pageInst);
</code>
  * @method clonePage
  * @path ctx.page.clonePage
  * @advanced
  * @param {ctx.application} parent parent
  * @param {number} [pageInst] optional instance number ('-1' is NaN)
  * @return {ctx.page} pg page object
  */
  this.clonePage = function (parent, pageInst) {
    if (!parent) {
        return null;
    }
    var obj = {}, id; // copy characteristics
    var nb = _copyData.length;
    for (var i = 0; i < nb; i++) {
      id = _copyData[i];
      if (this[id]) { obj[id] = this[id]; }
    }
    /** @type {ctx.page} */var pg = parent.addPage(this.name, obj, pageInst);
    pg.model = this;
    if (pg) {
      // copy items
      for (var i in this.items) {
        this.items[i].cloneItem(pg);
      }
      // copy tooltips
      ctx.each(_page.tooltips, function(id, value) {
        if (value instanceof ctx.tooltipClass) {
          pg.tooltips[id] = value.clone(pg);
        }
      });
      // copy events
      var evObj = {};
      for (var i in this.events) {
        evObj[this.events[i].name] = '';
      }
      pg.addEvent(evObj);
    }
    return pg;
  }

  if (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.WEB, e.nature.WEB3)) {
    /**
    * Cleans up the page when closing
    * @description
    * :!: __Technology specific:__ **WIN**, **WEB**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.cleanUp();
</code>
    * @method cleanUp
    * @advanced
    * @path ctx.page.cleanUp
    * @return {string} return value
    */
    this.cleanUp = function () {
      var page = this;
      var res = '';
      if (page && page.deleteObject) {
        ctx.each(page.items, function(id, item) {
          if (item && item.dynamic) {
            try {
              res = page.deleteObject(item.name);
            } catch (ex) { }
          }
        });
      }
      return res;
    }
  }

  if (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.UIAUTOMATION, e.nature.NSDK, e.nature.MESSBOX, e.nature.MESSBOX2, e.nature.MESSBOXALERT)) {
    /**
    * Closes the page
    * @description
    * :!: __Technology specific:__ **WIN**, **WEB**, **SWG**, **UIAUTOMATION**, **NSDK**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.close();
</code>
    * @method close
    * @path ctx.page.close
    * @return {string} return value
    */
    this.close = function () {
      var res = '';
      if (this.exist()) {
        var desc = this.getObjectDescriptor();
        // 'CLOSE' action does not work with IE11+: use a workaround with 'window.open('','_self').close();'
        if (desc && desc.page && this._is(e.nature.WEB, e.nature.WEB3) && (desc.page.currentNavigator == e.navigator.IE)) {
          try {
            ctx.notifyAction('close', '', desc);
            ctx.noNotify = true;
            res = ctx.actionApp(desc, 'close', 'EVALSCRIPT', "try { window.open('','_self').close(); ''; } catch(ex) { 'ko'; }");
          } catch (ex) {
            ctx.noNotify = true;
            res = ctx.actionApp(desc, 'close', 'CLOSE');
          }
          if (res == 'ko') {
            ctx.noNotify = true;
            res = ctx.actionApp(desc, 'close', 'CLOSE');
          }
        } else {
          res = ctx.actionApp(desc, 'close', 'CLOSE');
        }
      }
      return res;
    }
  }

  if (this._is(e.nature.HLLAPI)) {
    /**
    * Connects the HLLAPI channel
    * @description
    * :!: __Technology specific:__ **HLLAPI**
    *
    * __Ex.:__
<code javascript>
// connect HLLAPI channel on session 'A'
MyHllApiAppli.data.session = 'A';
MyHllApiAppli.PAGELOAD.connectPS(MyHllApiAppli.data.session);

// connect HLLAPI channel, with a custom emulator
MyHllApiAppli.PAGELOAD.connectPS(MyHllApiAppli.data.session, "EHLAPI32.DLL", "HLLAPI");
</code>
    * @method connectPS
    * @advanced
    * @path ctx.page.connectPS
    * @param {string} session session to use, which had to be declared at the HLLAPI emulator
    * @param {string} [dll] name of the HLLAPI DLL to be used by Contextor. This DLL is provided by the emulator. Default value is ''whalpi32.dll''
    * @param {string} [api] name of the entry function to call in the HLLAPI DLL. Default value is ''WinHLLAPI''
    * @return {string} result value
    */
    this.connectPS = function (session, dll, api) {
        var desc = this.getObjectDescriptor();
        return ctx.actionApp(desc, 'connectPS', 'CONNECTPS', session, dll, api);
    }
  }

  /**
  * Returns the number of page instances for a given application real instance
  * @description
  * __Ex.:__
<code javascript>
var nb = MyAppli[ev.appliInst].MyPage.count();
</code>
  * @method count
  * @path ctx.page.count
  * @return {number} application instance count
  */
  this.count = function () {
    var desc = this.getObjectDescriptor();
    var nbInst = 0;
    if ((desc.appliName !== '') && (desc.pageName !== '') && ctx.app[desc.appliName] && ctx.app[desc.appliName][desc.appliInst] && ctx.app[desc.appliName][desc.appliInst][desc.pageName]) {
      nbInst = ctx.app[desc.appliName][desc.appliInst][desc.pageName].nbInst;
    }
    //if (desc && desc.page && desc.page.model) { nbInst = desc.page.model.nbInst; }
    ctx.notifyAction('count', nbInst, desc);
    return nbInst;
  }

  if (this._is(e.nature.EXEWIN, e.nature.WIN)) {
    /**
    * Inserts a button in a page
    * @description
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
// create a button with label 'Start scenario' with size (150, 20), inside object MyWinAppli.MyPage.MyItem, and relatively to it at position (10, 100)
MyWinAppli.MyPage.createButton(6002, 'Start scenario', 10, 100, 150, 20, MyWinAppli.MyPage.MyItem);
</code>
    * @method createButton
    * @path ctx.page.createButton
    * @param {number} id button Id (this ID is a Windows numeric Id, its value is free, you should ensure it is unique in the page)
    * @param {string} label button text
    * @param {number} X left position
    * @param {number} Y top position
    * @param {number} CX width
    * @param {number} CY height
    * @param {ctx.item} [relativeItem] parent item used as reference to define the relative position of the button to be created. This field is optional. If omitted, the control is positioned relative to the parent page, as a direct child.
    * @return {string} result value
    */
    this.createButton = function (id, label, X, Y, CX, CY, relativeItem) {
      var desc = this.getObjectDescriptor();
      if ('string' == typeof X) X = parseInt(X, 10) || 0;
      if ('string' == typeof Y) Y = parseInt(Y, 10) || 0;
      if ('string' == typeof CX) CX = parseInt(CX, 10) || 0;
      if ('string' == typeof CY) CY = parseInt(CY, 10) || 0;
      var pos = X + Y * 65536;
      var size = CX + CY * 65536;
      var relativeId;
      if (relativeItem && (relativeItem instanceof ctx.item))
        relativeId = relativeItem.name;
      var res = ctx.actionApp(desc, 'createButton', 'CREATEBT', id, label, pos, size, relativeId);

      // add a dynamically declared item
      if (id) { desc.page.addItem(String(id), null, true); }

      return res;
    }
  }

  if (this._is(e.nature.EXEWIN, e.nature.WIN)) {
    /**
    * Inserts an edit box in a page
    * @description
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
// create an edit box with default text label 'Name...' with size (200, 20), inside object MyWinAppli.MyPage.MyItem, and relatively to it at position (10, 100)
MyWinAppli.MyPage.createEditbox(6003, 'Name...', 10, 100, 200, 20, MyWinAppli.MyPage.MyItem);
</code>
    * @method createEditbox
    * @path ctx.page.createEditbox
    * @param {number} id button Id (this ID is a Windows numeric Id, its value is free, you should ensure it is unique in the page)
    * @param {string} label default text label
    * @param {number} X left position
    * @param {number} Y top position
    * @param {number} CX width
    * @param {number} CY height
    * @param {ctx.item} [relativeItem] parent item used as reference to define the relative position of the button to be created. This field is optional. If omitted, the control is positioned relative to the parent page, as a direct child.
    * @return {string} result value
    */
    this.createEditbox = function (id, label, X, Y, CX, CY, relativeItem) {
      var desc = this.getObjectDescriptor();
      if ('string' == typeof X) X = parseInt(X, 10) || 0;
      if ('string' == typeof Y) Y = parseInt(Y, 10) || 0;
      if ('string' == typeof CX) CX = parseInt(CX, 10) || 0;
      if ('string' == typeof CY) CY = parseInt(CY, 10) || 0;
      var pos = X + Y * 65536;
      var size = CX + CY * 65536;
      var relativeId;
      if (relativeItem && (relativeItem instanceof ctx.item))
        relativeId = relativeItem.name;
      var res = ctx.actionApp(desc, 'createEditbox', 'CREATEED', id, label, pos, size, relativeId);

      // add a dynamically declared item
      if (id) { desc.page.addItem(String(id), null, true); }

      return res;
    }
  }

  if (this._is(e.nature.EXEWIN, e.nature.WIN)) {
    /**
    * Inserts a static text in a page
    * @description
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
// create a static text with text label 'Name : ' with size (200, 20), inside object MyWinAppli.MyPage.MyItem, and relatively to it at position (10, 100)
MyWinAppli.MyPage.createStatic(6004, 'Name:', 10, 100, 200, 20, MyWinAppli.MyPage.MyItem);
</code>
    * @method createStatic
    * @path ctx.page.createStatic
    * @param {number} id button Id (this ID is a Windows numeric Id, its value is free, you should ensure it is unique in the page)
    * @param {string} label default text label
    * @param {number} X left position
    * @param {number} Y top position
    * @param {number} CX width
    * @param {number} CY height
    * @param {ctx.item} [relativeItem] parent item used as reference to define the relative position of the button to be created. This field is optional. If omitted, the control is positioned relative to the parent page, as a direct child.
    * @return {string} result value
    */
    this.createStatic = function (id, label, X, Y, CX, CY, relativeItem) {
      var desc = this.getObjectDescriptor();
      if ('string' == typeof X) X = parseInt(X, 10) || 0;
      if ('string' == typeof Y) Y = parseInt(Y, 10) || 0;
      if ('string' == typeof CX) CX = parseInt(CX, 10) || 0;
      if ('string' == typeof CY) CY = parseInt(CY, 10) || 0;
      var pos = X + Y * 65536;
      var size = CX + CY * 65536;
      var relativeId;
      if (relativeItem && (relativeItem instanceof ctx.item))
        relativeId = relativeItem.name;
      var res = ctx.actionApp(desc, 'createStatic', 'CREATEST', id, label, pos, size, relativeId);

      // add a dynamically declared item
      if (id) { desc.page.addItem(String(id), null, true); }

      return res;
    }
  }

  /** Returns the short description for serialization
  * @ignore [Internal usage]
  * @method ctxShort
  * @path ctx.page.ctxShort
  */
  this.ctxShort = function() {
    return ['ctxType', 'name', 'parent', 'instance'];
  }

  if (this._is(e.nature.WEB3)) {
    /**
    * Calls a low level action verb on Chrome background (internal usage)
    * @ignore
    * @description
    * :!: __Technology specific:__ **WEB3**
    *
    * __Ex.:__
<code javascript>
var res = MyAppli.MyPage.customize('NAVIGATE', url, dest, post, header);
// is equivalent to :
var res = MyAppli.MyPage.navigate(url, dest, post, header);
</code>
    * @method customize
    * @path ctx.page.customize
    * @advanced
    * @param {string} object chrome object
    * @param {string} method function to be called
    * @param {Object} params parameters
    * @return {string} result value
    */
    this.customize = function (object, method, params) {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'customize', 'CUSTOMIZE', object, method, params);
    }
  }

  /**
  * Deletes an item declaration inside a page
  * @description
  * __Ex.:__
<code javascript>
// delete item named 'edName' from the page
MyAppli.MyPage.deleteItem('edName');
</code>
  * @method deleteItem
  * @path ctx.page.deleteItem
  * @advanced
  * @param {string} name
  */
  this.deleteItem = function (name) {
    if (this.items[name]) {
      delete this.items[name];
      if (this[name])
        delete this[name];
    }
  }

  if (this._is(e.nature.EXEWIN, e.nature.WIN, e.nature.WEB, e.nature.WEB3)) {
    /**
    * Deletes a Windows object created using ''ctx.page.createButton'', ''ctx.page.createEditbox'', or ''ctx.page.createStatic'', or removes an html object in a page
    * @description
    * :!: __Technology specific:__ **WIN**, **EXE**, **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// delete an object inserted in a Windows application
MyWinAppli.MyPage.deleteObject('6004');
// remove object with id 'btMyButton',
MyWebAppli.MyPage.deleteObject('btMyButton');
</code>
    * @method deleteObject
    * @path ctx.page.deleteObject
    * @param {string} id object Identifier (for WEB: id, name, tag or class), used to find the object
    * @param {e.html.type} [type] object identifier type (id, name, tag, class, ...): id or name by default
    * @return {string} result value
    */
    this.deleteObject = function (id, type) {
      // function to be injected in web page
      function ctxtDeleteNode(id, type) {
        Contextor.Log(0, 'ctxtDeleteNode: entering');
        var res = '';
        try {
          var el = [];
          if ((type == 'id') || (type == 'name')) {
            el[0] = document.getElementById(id);
            if (!(el && el[0])) {
              el = document.getElementsByName(id);
            }
          } else if (type == 'tag') {
            el = document.getElementsByTagName(id);
          } else if (type == 'class') {
            el = document.getElementsByClassName(id);
          }
          if (el && el[0]) {
            for (var i = 0; i < el.length; i++) {
              el[i].removeNode(true);
              res = 'ok';
            }
          } else {
            Contextor.Log(0, 'ctxtDeleteNode: could not find "' + id + '"');
          }
        } catch ( ex ) {
          Contextor.Log(0, ex.message);
        }
        return res;
      }

      var res = '';
      type = type || e.html.type.id;
      if (this._is(e.nature.EXEWIN, e.nature.WIN)) {
        var desc = this.getObjectDescriptor();
        res = ctx.actionApp(desc, 'deleteObject', 'DELOBJ', id);
      }
      if (this._is(e.nature.WEB, e.nature.WEB3)) {
        if (this.exist())
        {
          var desc = this.getObjectDescriptor();
          var page = desc.page; // real used page
          res = page.injectFunction(ctxtDeleteNode);
          if (res == '') {
            res = page.evalScript(ctxtDeleteNode, id, type);
            if (res == 'ok')
              page.deleteItem(id);
          }
        }
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Disables/enables a Web object created using ''ctx.page.insertObject''
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// disable object with id 'btMyButton',
MyWebAppli.MyPage.disableObject('btMyButton', true);
</code>
    * @method disableObject
    * @path ctx.page.disableObject
    * @param {string} id object Id, used to create the object
    * @param {boolean} disable 'true' to disable, 'false' to enable
    * @return {string} result value
    */
    this.disableObject = function (id, disable) {
      var res = '';
      if (this._is(e.nature.WEB, e.nature.WEB3)) {
        if (this.exist())
        {
          var code = "\
            if ( document.all." + id + ") {\
              try {\
                document.all." + id + ".disabled=" + (disable ? "true" : "false") +";\
              } catch ( ex ) {  }\
            }";
          res = this.execScript(code);
        }
      }
      return res;
    }
  }

  if (this._is(e.nature.HLLAPI)) {
    /**
    * Disconnects the HLLAPI channel
    * @description
    * :!: __Technology specific:__ **HLLAPI**
    *
    * __Ex.:__
<code javascript>
MyHllApiAppli[0].PAGELOAD.disconnectPS();
</code>
    * @method disconnectPS
    * @advanced
    * @path ctx.page.disconnectPS
    * @return {string} result value
    */
    this.disconnectPS = function () {
        var desc = this.getObjectDescriptor();
        return ctx.actionApp(desc, 'disconnectPS', 'DISCONNECTPS');
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Downloads a file from a protected Web site
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
var url = MyWebAppli.MyPage.btConsulter.getAttribute('href');
var localFile = ctx.options.path.log + "\\bill.pdf";
MyWebAppli.MyPage.download({
  url: url,
  localFile: localFile,
  success: function(res, status, xhr) {
    ...
  },
  error: function(res, obj) {
    ...
  }
});
</code>
    * @method download
    * @path ctx.page.download
    * @param {ctx.ajaxParams} params Request parameters
    * @return {string} result value
    */
    this.download = function (params) {
      var res = false;
      params = params || {};
      if ((!params.url) || (!params.localFile)) {
        throw new Error(e.error.InvalidArgument, 'ctx.page.download: url and localFile should be defined');
      }
      this._initAjax();
      params.desc = GLOBAL.events.evFileReception.getObjectDescriptor();
      params.id = GLOBAL.fileMap.id ++;
      params.contentType = e.ajax.content.binary;
      params.requestType = e.ajax.requestType.client;
      params.responseType = e.ajax.responseType.arrayBuffer;
      GLOBAL.fileMap.options[params.id] = params;
      return this.execScript('ctx.ajax.call', params);
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Evaluates a Javascript function in the page, and returns result
    * @description
    * __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// get document title
var title = MyAppli.MyPage.evalScript('document.title');
</code>
    * @method evalScript
    * @path ctx.page.evalScript
    * @param {...*} list code to be executed or function name, then parameters to be used
    * @return {string} result value
    */
    this.evalScript = function (list) { //
      var args = Array.prototype.slice.call(arguments);
      var res = '';
      var code = '';
      var useTryCatch = false;
      var params = '';
      if (args.length > 0) {
        code = args[0];
        if ('function' === typeof code) {
          // get function name from reference
          code = code.toString().match(/function\s+([^\s\(]+)/)[1];
          if (args.length == 1) { code = code + "()"; }
        }
        for (var i = 1; i < args.length; i++) {
          if (args[i] === e.prefix.tryCatch) {
            useTryCatch = true;
          } else {
            if (params != '') {
              params += ', ';
            }
            if (typeof args[i] === 'string') {
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
      if (code) {
        if (useTryCatch) {
          code = "var res = ''; try { res = " + code + " } catch(ex) {}; res;";
        }
        var desc = this.getObjectDescriptor();
        res = ctx.actionApp(desc, 'evalScript', 'EVALSCRIPT', code);
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3, e.nature.MESSBOX, e.nature.MESSBOX2)) {
    /**
    * Executes javascript code in the page
    * @description
    * :!: __Technology specific:__ **WEB, WEB3, MESSBOX**
    *
    * Different syntaxes can be used :
    *   - provide a single block of code to be executed, ex.: 'ReconnectToHub();'
    *   - provide a list with function name, then parameters to be used : 'SendAnswerToHub', id, ev
    *     - each parameter (string, number, object, ...) is serialized in JSON to build the code to be executed : "SendAnswerToHub(\"jsmith\", { name:\"evStart\", appliName:\"MyAppli\", ...});
    *
    * __Ex.:__
<code javascript>
// provide a single block of code to be executed :
MyWebAppli.MyPage.execScript('ReconnectToHub();');
// provide a list with function name, then parameters to be used :
MyWebAppli.MyPage.execScript('SendAnswerToHub', req.info.destination.id, req.ev);
</code>
    * @method execScript
    * @path ctx.page.execScript
    * @throws {Error}
    * @param {...*} list code to be executed or function name, then parameters to be used
    * @return {string} result value
    */
    this.execScript = function (list) {
      var args = Array.prototype.slice.call(arguments);
      var res = '';
      var code = ctx.formatFunction(args);
      if (code) {
        var desc = this.getObjectDescriptor();
        res = ctx.actionApp(desc, 'execScript', 'EXECSCRIPT', code, e.scriptLanguage.JavaScript);
      }
      return res;
    }
  }

  /**
  * Tests page existence
  * @description
  * __Ex.:__
<code javascript>
if (MyAppli.MyPage.exist()) { ... }
</code>
  * @method exist
  * @path ctx.page.exist
  * @return {boolean} result : 'true' if page exists
  */
  this.exist = function () { //
    var desc = this.getObjectDescriptor();
    var res = (this.count() > 0 ? true : false);
    ctx.notifyAction('exist', res, desc);
    return res;
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Gets the position and bounding of the object containing the focus
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// get page content
var obj = MyWebAppli.MyPage.getFocusRect();
// obj = {x:68, y:157, cx:350, cy:32}
</code>
    * @method getFocusRect
    * @path ctx.page.getFocusRect
    * @return {ctx.position} result object (see [[lib:ctx:ctx.core#class_ctxposition|ctx.position]])
    */
    this.getFocusRect = function () {
      var desc = this.getObjectDescriptor();
      var str = ctx.actionApp(desc, 'getFocusRect', 'GETWINFOCUSRECT', '', '', '', '', '', '');
      var obj = ctx.unserialize(str, true);
      /** @type {ctx.position} */ var rect = new ctx.position();
      ctx.set(obj, rect);
      return rect;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Returns an object with informations about current html document / window / navigator
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * ^Attribute  ^Description ^
    * | **navigator** ||
    * | userAgent |navigator.userAgent |
    * | platform |navigator.platform |
    * | language |navigator.language |
    * | **document** ||
    * | title |document.title |
    * | URL |document.URL |
    * | URLUnencoded |document.URLUnencoded |
    * | uniqueID |document.uniqueID |
    * | visibility |document.visibility |
    * | charset |document.charset |
    * | cookie |document.cookie |
    * | domain |document.domain |
    * | protocol |location.protocol |
    * | hostname |location.hostname |
    * | pathname |location.pathname |
    * | hash |location.hash |
    * | search |location.search |
    * | port |location.port |
    * | **window** ||
    * | innerHeight |window.innerHeight  |
    * | innerWidth |window.innerWidth |
    * | outerHeight |window.outerHeight  |
    * | outerWidth |window.outerWidth |
    * | screenLeft |window.screenLeft |
    * | screenTop |window.screenTop |
    * | screenX |window.screenX |
    * | screenY |window.screenY |
    * | scrollX |window.scrollX |
    * | scrollY |window.scrollY |
    *
    * __Ex.:__
<code javascript>
// get page information
var infos = Google.pGoogle.getInfos();
// result :
//{
//  "document": {
//    "title": "Google",
//    "URL": "https://www.google.fr/",
//    "URLUnencoded": "https://www.google.fr/",
//    "uniqueID": "ms__id41",
//    "visibility": "hidden",
//    "protocol": "HyperText Transfer Protocol with Privacy",
//    "charset": "utf-8",
//    "domain": "www.google.fr"
//    ...
//  },
//  "navigator": {
//    ...
//  },
//  ...
//}
</code>
    * @method getInfos
    * @path ctx.page.getInfos
    * @return {*} result value
    */
    this.getInfos = function () {
      function ctxtDocumentSerializer(jsonPrefix) {
        try {
          var jsonFunc = ((typeof JSON !== 'undefined') && JSON.stringify ? JSON.stringify :
            ((typeof jQuery !== 'undefined') && jQuery.parseJSON ? jQuery.parseJSON :
            ((typeof jQuery !== 'undefined') && jQuery.toJSON ? jQuery.toJSON : null )));
          if (jsonFunc) {
            var obj = {
              navigator: {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language
              },
              document: {
                title: document.title,
                URL: document.URL,
                URLUnencoded: document.URLUnencoded,
                uniqueID: document.uniqueID,
                visibility: document.visibilityState,
                charset: document.charset,
                cookie: document.cookie,
                domain: document.domain
              },
              location: {
                protocol: location.protocol,
                hostname: location.hostname,
                pathname: location.pathname,
                origin: location.origin,
                hash: location.hash,
                href: location.href,
                search: location.search,
                port: location.port
              },
              window: {
                innerHeight: window.innerHeight,
                innerWidth: window.innerWidth,
                outerHeight: window.outerHeight,
                outerWidth: window.outerWidth,
                screenLeft: window.screenLeft,
                screenTop: window.screenTop,
                screenX: window.screenX,
                screenY: window.screenY,
                scrollX: window.pageXOffset,
                scrollY: window.pageYOffset
              }
            };
            return jsonPrefix + jsonFunc(obj);
          }
        } catch (ex) {}
        return jsonPrefix + "{ \"navigator\": { \"userAgent\": \"" + navigator.userAgent + "\"}}"; // JSON not supported, just return userAgent value
      }
      var code = this.injectFunction(ctxtDocumentSerializer);
      var res = this.evalScript(ctxtDocumentSerializer, e.prefix.json);
      return ctx.unserialize(res);
    }
  }

  /**
  * Gets a child item by its name
  * @description
  * __Ex.:__
<code javascript>
var it = MyAppli.MyPage.getItem('MyItem');
// equivalent to :
var it = MyAppli.MyPage.MyItem;
</code>
  * @method getItem
  * @path ctx.page.getItem
  * @advanced
  * @param {string} name item name
  * @return {ctx.item} item object
  */
  this.getItem = function (name) {
    return  this.items[name];
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Gets all the item attributes in the page
    * @description
    * Reads the attributes of all declared items in the page, except occursed items. Values are stored in an object.
    * If an item doesn't currently exist in the page, it won't be available in the returned object
    *
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
  <code javascript>
  var data = {};
  MyWebAppli.MyPage.getItemAttributes(data);
  </code>
    * @method getItemAttributes
    * @path ctx.page.getItemAttributes
    * @param {Object} [obj] object to be filled with read values. If omitted, an empty object is created and returned by the function.
    * @return {Object} object with read values, or null if page is absent
    */
    this.getItemAttributes = function (obj) {
      obj = obj || {};
      var desc = this.getObjectDescriptor();
      if (desc.page.exist()) {
        /** @type {ctx.item} */ var it;
        for (var id in desc.page.items) {
          it = desc.page.items[id];
          if (it && it.name && it.getAttributes) {
            try {
              ctx.noNotify = true;
              obj[it.name] = it.getAttributes(); // only set if no exception (thus, object exists)
            } catch (ex) { }
          }
        }
      }
      ctx.notifyAction('getItemAttributes', obj, desc);
      return obj;
    }
  }

  /**
  * Gets all the item values in the page
  * @description
  * Reads all declared items in the page, including occursed items. Values are stored in an object.
  * Occursed items are read as (mono or multi-dimension) arrays.
  * If an item doesn't currently exist in the page, it won't be available in the returned object
  *
  * __Ex.:__
<code javascript>
var data = {};
MyAppli.MyPage.getItems(data);
// 'data' object contains : {edName: 'Smith', edFirstname: 'John', ... }
</code>
  * @method getItems
  * @path ctx.page.getItems
  * @param {Object} [obj] object to be filled with read values. If omitted, an empty object is created and returned by the function.
  * @return {Object} object with read values, or null if page is absent
  */
  this.getItems = function (obj) {
    obj = obj || {};
    var val;
    var desc = this.getObjectDescriptor();
    ctx.notifyAction('getItems', '', desc);
    var page = desc.page; // real used page
    if (page.exist()) {
      /** @type {ctx.item} */ var it;
      for (var id in page.items) {
        it = page.items[id];
        if (it && it.name) {
          if (it.getAll) {
            try {
              //ctx.noNotify = true;
              val = it.getAll(); // occursed item
              obj[it.name] = val; // only set if no exception (thus, object exists)
            } catch (ex) { }
          } else if (it.get) {
            try {
              //ctx.noNotify = true;
              val = it.get(); // non occursed item
              obj[it.name] = val; // only set if no exception (thus, object exists)
            } catch (ex) { }
          }
        }
      }
    }
    return obj;
  }

  if (this._is(e.nature.HLLAPI)) {
    /**
    * Gets a screen line
    * @description
    * :!: __Technology specific:__ **HLLAPI**
    *
    * __Ex.:__
<code javascript>
MyHllApiAppli.MyPage.getLine(0);
</code>
    * @method getLine
    * @path ctx.page.getLine
    * @param {number} index line index
    * @return {*} line content
    */
    this.getLine = function (index) {
        var desc = this.getObjectDescriptor();
        desc.itemFullName = '_Line_[' + index + ']';
        return ctx.action(desc, 'getLine', 'GETVALUE');
    }
  }

  if (this._is(e.nature.WIN, e.nature.EXEWIN)) {
    /**
    * Gets the page menu content (as an XML string)
    * @description
    *
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
var txt = MyWinAppli.MyPage.getMenu();
// returns :
// <Menu>
// </Menu>
</code>
    * @method getMenu
    * @path ctx.page.getMenu
    * @return {*} read menu, as a JSON object
    */
    this.getMenu = function () {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = '_Menu_';
      var xml =  ctx.action(desc, 'getMenu', 'GETVALUE');
      var jsonStr = ctx.xml.xml2json(xml);
      var obj = ctx.unserialize(jsonStr, true);
      return obj;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Returns the navigator for the page
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    *
    * __Ex.:__
<code javascript>
// get page navigator
var navigator = Google.pGoogle.navigator(); // e.navigator.Chrome, e.navigator.Firefox, e.navigator.IE
</code>
    * @method getNavigator
    * @path ctx.page.getNavigator
    * @return {e.navigator} current navigator
    */
    this.getNavigator = function () {
      var desc = this.getObjectDescriptor();
      return desc.page.currentNavigator;
    }
  }

  /**
  * Returns object descriptor for the page
  * @description
  * __Ex.:__
<code javascript>
var desc = MyAppli.MyPage.getObjectDescriptor();
</code>
  * @ignore [internal use]
  * @method getObjectDescriptor
  * @path ctx.page.getObjectDescriptor
  * @param {ctx.descriptor} [desc] initial descriptor object to be completed (if omitted, a new descriptor object is created)
  * @return {ctx.descriptor} page object descriptor
  */
  this.getObjectDescriptor = function (desc) {
    if (!desc)
      desc = new ctx.descriptor();
    desc.page = _page;
    if (_page.parent) {
      desc = _page.parent.getObjectDescriptor(desc); // recursive call for the parent page
      desc.type = _page.type;
      desc.nature = _page.nature || desc.nature;
      if (_page.name !== '') {
        desc.pageName = _page.name;
      } else if (ctx.currentEvent) {
        desc.pageName = ctx.currentEvent.pageName;
      }

      if (_page.instance != -1)
        desc.pageInst = _page.instance; // instance is explicitly mentioned
      else if (ctx.currentEvent && (desc.appliName == ctx.currentEvent.appliName) && (desc.appliInst == ctx.currentEvent.appliInst) && (desc.pageName == ctx.currentEvent.pageName))
        desc.pageInst = ctx.currentEvent.pageInst; // the object is the current page
      else if (ctx.app[desc.appliName] && ctx.app[desc.appliName][desc.appliInst] && ctx.app[desc.appliName][desc.appliInst][desc.pageName]) { // search valid instance in active pages
        var page = ctx.app[desc.appliName][desc.appliInst][desc.pageName];
        if (page) {
          for (var i in page.instances) {
            // take the first non-null instance (or '0' by default)
            desc.pageInst = parseInt(i, 10);
            if (i > 0)
              break;
          }
        }
      }
    }

    if (ctx.app[desc.appliName] && ctx.app[desc.appliName][desc.appliInst] && ctx.app[desc.appliName][desc.appliInst][desc.pageName] && ctx.app[desc.appliName][desc.appliInst][desc.pageName][desc.pageInst]) {
      desc.page = ctx.app[desc.appliName][desc.appliInst][desc.pageName][desc.pageInst];
    }

    return desc;
    //    return this._getObjectDescriptor(desc);
  }

/**
  * Gets the path of the page for a given (or default) environment ('development', 'production', ...)
  * @description
  * If no path was defined for this environment, the path mentionned in Studio Explorer is returned.
  *
  * __Ex.:__
<code javascript>
var path = MyAppli.MyPage.getPath();
</code>
  * @method getPath
  * @throws {Error}
  * @path ctx.page.getPath
  * @param {e.env} [env] environment ('dev', 'prod', ...). If omitted, 'ctx.options.env' is used. See '[[:lib:common:ctx.enum#enumeration_eenv|e.env]]' for more details
  * @return {string} page path
  */
  this.getPath = function (env) {
    var desc = this.getObjectDescriptor();
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
    * Gets the position and bounding of the item
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **WIN**, **WEB3**, **SWG**, **FLEX**, **OCR**
    *
    * __Ex.:__
<code javascript>
// get page content
var obj = MyAppli.MyPage.getRect();
// obj = {x:68, y:157, cx:120, cy:32}
</code>
    * @method getRect
    * @path ctx.page.getRect
    * @param {ctx.descriptor} [desc] descriptor
    * @suppress {checkTypes}
    * @return {ctx.position} position object (see [[lib:ctx:ctx.core#class_ctxposition|ctx.position]])
    */
    this.getRect = function (desc) {
      desc = desc || this.getObjectDescriptor();
      ctx.noNotify = true;
      var str = ctx.actionApp(desc, 'getRect', 'GETRECT', desc.itemFullName, '', '', '', '', '1.0.0.0');
      var obj = ctx.unserialize(str, true);
      /** @type {ctx.position} */ var rect = new ctx.position();
      ctx.set(obj, rect);
      return rect;
    }
  }

  if (this._is(e.nature.HLLAPI)) {
    /**
    * Gets the complete screen content
    * @description
    * :!: __Technology specific:__ **HLLAPI**
    *
    * __Ex.:__
<code javascript>
var xml = MyHllApiAppli.MyPage.getScreen();
</code>
    *
    * It returns an XML structure containing lines :
    *
<code xml>
<Line index="1">line content...</Line>
<Line index="2">line content...</Line>
...
</code>
    * @method getScreen
    * @path ctx.page.getScreen
    * @return {*} XML structure
    *
    */
    this.getScreen = function () {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = '_Screen_';
      return ctx.action(desc, 'getScreen', 'GETVALUE');
    }
  }

  if (this._is(e.nature.EXEWIN), this._is(e.nature.WIN)) {
    /**
    * Gets the page styles
    * @description
    *
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
var txt = MyWinAppli.MyPage.getStyleWin();
</code>
    * @method getStyleWin
    * @path ctx.page.getStyleWin
    * @return {*} read styles
    */
    this.getStyleWin = function () {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = '_Styles_';
      return ctx.action(desc, 'getStyleWin', 'GETVALUE');
    }
  }

  if (this._is(e.nature.EXEWIN), this._is(e.nature.WIN)) {
    /**
    * Gets the page title
    * @description
    *
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
var txt = MyWinAppli.MyPage.getTitle();
</code>
    * @method getTitle
    * @path ctx.page.getTitle
    * @return {*} read title
    */
    this.getTitle = function () {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = '_Title_';
      return ctx.action(desc, 'getTitle', 'GETVALUE');
    }
  }

  if (this._is(e.nature.UIAUTOMATION, e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.OCR)) {
    /**
    * Highlights the page
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **WIN**, **WEB3**, **SWG**, **FLEX**, **OCR**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.highlight();
</code>
    * @method highlight
    * @path ctx.page.highlight
    * @param {number} [timer] highlight duration and wait in ms (500 ms by default). If '0', the item remains highlighted
    * @param {boolean} [visible] enable/disable highlight (true by default)
    * @param {boolean} [async] if true, and a timer is set, the function is asynchronous (it returns immediately and highlight is removed asynchronously after timer) (true by default)
    * @param {number} [color] default color ('ctx.options.highlightColor' by default)
    * @return {boolean} result value
    */
    this.highlight = function (timer, visible, async, color) {
      var res = false;
      try {
        var desc = this.getObjectDescriptor();
        timer = (timer === undefined ? 500 : timer);
        var pos = this.getRect(desc);
        if (pos && (pos.cx || pos.cy)) {
          ctx.highlight(pos, timer, visible, async, color);
          res = true;
        }
      } catch (ex) {  }
      return res;
    }
  }

  if (this._is(e.nature.UIAUTOMATION, e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.SWG, e.nature.OCR, e.nature.SAPGUI)) {
    /**
    * Highlights the items in the page
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **WIN**, **WEB3**, **SWG**, **FLEX**, **OCR**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.highlightItems();
</code>
    * @method highlightItems
    * @path ctx.page.highlightItems
    * @param {number} [timer] highlight duration and wait in ms (2000 ms by default). If '0', the item remains highlighted
    * @param {boolean} [visible] enable/disable highlight (true by default)
    * @param {boolean} [async] if true, and a timer is set, the function is asynchronous (it returns immediately and highlight is removed asynchronously after timer) (true by default)
    * @param {number} [color] default color ('ctx.options.highlightColor' by default)
    * @return {boolean} result value
    */
    this.highlightItems = function (timer, visible, async, color) {
      var res = true;
      timer = (timer === undefined ? 2000 : timer);
      if (this.exist()) {
        /** @type {ctx.item} */ var it;
        for (var id in this.items) {
          it = this.items[id];
          if (it && it.name && it.highlight) {
            it.highlight(timer, visible, async, color);
          }
        }
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Loads the previous URL in the history list
    * @description
    * __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
var title = MyWebAppli.MyPage.historyBack();
</code>
    * @method historyBack
    * @path ctx.page.historyBack
    * @return {string} result value
    */
    this.historyBack = function () { //
      var res = '';
      try {
        var desc = this.getObjectDescriptor();
        var code = 'window.history.back();';
        res = ctx.actionApp(desc, 'historyBack', 'EXECSCRIPT', code, e.scriptLanguage.JavaScript);
      } catch (ex) {
        throw new Error(e.error.NotImplemented, 'window.history.back is not supported by the browser');
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Loads the next URL in the history list
    * @description
    * __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
var title = MyWebAppli.MyPage.historyForward();
</code>
    * @method historyForward
    * @path ctx.page.historyForward
    * @return {string} result value
    */
    this.historyForward = function () { //
      var res = '';
      try {
        var desc = this.getObjectDescriptor();
        var code = 'window.history.forward();';
        res = ctx.actionApp(desc, 'historyForward', 'EXECSCRIPT', code, e.scriptLanguage.JavaScript);
      } catch (ex) {
        throw new Error(e.error.NotImplemented, 'window.history.forward is not supported by the browser');
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Loads a specific URL from the history list.
    * @description
    * __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
var title = MyWebAppli.MyPage.historyGo(-2);
</code>
    * @method historyGo
    * @path ctx.page.historyGo
    * @param {number|string} move The parameter can either be a number which goes to the URL within the specific position (-1 goes back one page, 1 goes forward one page), or a string. The string must be a partial or full URL, and the function will go to the first URL that matches the string.
    * @return {string} result value
    */
    this.historyGo = function (move) { //
      var res = '';
      try {
        var desc = this.getObjectDescriptor();
        var code = 'window.history.go(' + (typeof move === 'number' ? move : '"' + move + '"') + ');';
        res = ctx.actionApp(desc, 'historyGo', 'EXECSCRIPT', code, e.scriptLanguage.JavaScript);
      } catch (ex) {
        throw new Error(e.error.NotImplemented, 'window.history.go is not supported by the browser');
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Returns the length of the history list.
    * @description
    * __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
var count = MyWebAppli.MyPage.historyCount();
</code>
    * @method historyCount
    * @path ctx.page.historyCount
    * @return {number} result value
    */
    this.historyCount = function () { //
      var res = 0;
      try {
        var desc = this.getObjectDescriptor();
        var code = 'window.history.length;';
        var sRes = ctx.actionApp(desc, 'historyCount', 'EVALSCRIPT', code, e.scriptLanguage.JavaScript);
        res = parseInt(sRes, 10);
      } catch (ex) {
        throw new Error(e.error.NotImplemented, 'window.history.length is not supported by the browser');
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Gets the html content of the page
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// get page content
var html = MyWebAppli.MyPage.html();
</code>
    * @method html
    * @path ctx.page.html
    * @return {string} result value
    */
    this.html = function () {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = 'HTML';
      return ctx.action(desc, 'html', 'GETVALUE');
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3, e.nature.MESSBOX, e.nature.MESSBOX2)) {
    /**
    * Injects the code of a Javascript function or set of Javascript functions in the page
    * @description
    * __Technology specific:__ **WEB**, **WEB3**, **MESSBOX**
    *
    * __Ex.:__
<code javascript>
// declare a web page function
function create_iframe(){
  document.body.insertAdjacentHTML("beforeEnd", '<IFRAME id="CtxtFRAME0" src="" width="1024px" height="580px" ');
}
function function_misc(){
  document.body.insertAdjacentHTML("beforeEnd", '<IFRAME id="CtxtFRAME0" src="" width="1024px" height="580px" ');
}
// inject the 2 functions
  MyWebAppli.MyPage.injectFunction(create_iframe, function_misc);
//or :
  MyWebAppli.MyPage.injectFunction([create_iframe, function_misc, ...]);
//or :
  MyWebAppli.MyPage.injectFunction({f1: create_iframe, f2: function_misc, f3:...]);

// execute the function
MyWebAppli.MyPage.execScript('create_iframe();');
</code>
    *
    * :!: __Note__:
    *   * the function reference should be used : ''MyAppli.MyPage.injectFunction(create_iframe);''
    *   * do not use : ''MyAppli.MyPage.injectFunction("create_iframe");'' or ''MyAppli.MyPage.injectFunction(create_iframe());''
    * @method injectFunction
    * @path ctx.page.injectFunction
    * @throws {Error}
    * @param {...function()|Array<function()>|Object} list list of functions to be injected
    * @return {string} result value
    */
    this.injectFunction = function (list) {
      var args;
      if (typeof list === 'object')
        args = list;
      else
        args = Array.prototype.slice.call(arguments);
      var res = '';
      var desc = this.getObjectDescriptor();
      var code = '';
      for (var i in args) {
        var func = args[i];
				var funcContent;
				var funcName;
        if ((typeof func === 'function') && (func.toString)) {
          funcContent = func.toString();
          funcName = funcContent.match(/function\s+([^\s\(]+)/)[1];
          if (funcName) {
            if (!desc.page.injectedFunctions[funcName]) {
              desc.page.injectedFunctions[funcName] = true;
              code = code + "if ('undefined' === typeof(" + funcName + ")) { " + funcContent + " };\n";
            }
          }
        } else if ((typeof func === 'object') && (typeof func.name === 'string') && (typeof func.func === 'function')) {
          funcContent = func.func.toString();
          funcName =  func.name;					
          if (funcName) {
            if (!desc.page.injectedFunctions[funcName]) {
              desc.page.injectedFunctions[funcName] = true;
							if ( func.execute ) {
								code = code + "(" + funcContent + ")();\n";
							} else {
              	code = code + "if ('undefined' === typeof(" + funcName + ")) { " + funcContent + " };\n";
							}
            }
          }
        } else {
          throw new Error(e.error.InvalidArgument, 'ctx.page.injectFunction: parameter is not a valid function reference.');
        }
      }
      if (code) {
        res = ctx.actionApp(desc, 'injectFunction', 'EXECSCRIPT', code, e.scriptLanguage.JavaScript);
      }
      return res;
    }
  }
	

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Injects a Javascript or VBScript file (or set of files) in the page
    * @description
    * __Technology specific:__ **WEB**, **WEB3**, **MESSBOX**
    *
    * __Ex.:__
<code javascript>
// declare a web page function
}
// inject the 2 functions
  MyWebAppli.MyPage.injectFile(create_iframe, function_misc);
//or :
  MyWebAppli.MyPage.injectFunction([create_iframe, function_misc, ...]);
//or :
  MyWebAppli.MyPage.injectFunction({f1: create_iframe, f2: function_misc, f3:...]);

// execute the function
MyWebAppli.MyPage.execScript('create_iframe();');
</code>
    *
    * @method injectFile
    * @path ctx.page.injectFile
    * @throws {Error}
    * @param {string|Array<string>} list list of files to be injected
    * @param {string} [id] identifier
    * @param {boolean} [head] if true, inject in HEAD, otherwise in BODY
    * @param {e.scriptLanguage} [language] JavaScript or VBScript language (see [[:lib:common:ctx.enum#enumeration_escriptlanguage|e.scriptLanguage]]) (JavaScript  by default)
    * @return {string} result value
    */
    this.injectFile = function (list, id, head, language) {
      language = language || e.scriptLanguage.JavaScript;
      //id = id || ctx.uuid();
      if (typeof list === 'string') { list = [list]; }
      var res = '';
      var desc = this.getObjectDescriptor();
      var code = '';
      ctx.each(list, function(id, file) {
        code = code + ctx.fso.file.read(file, e.file.encoding.UTF8) + "\n\n";
      });
      if (code) {
        code = code.replace(/\r\n/g, "\n");
        var scriptObject = {
          id: id,
          type: 'text/' + language,
          '#text': code
        }
        this.insertObject('script', (head ? 'head' : 'body'), scriptObject, e.html.position.beforeEnd);
        res = ctx.actionApp(desc, 'injectFile', 'EXECSCRIPT', code, language);
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Inserts a button in a page
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// insert a button with id 'idButton2', label 'Button 2', after item MyWebAppli.MyPage.btSearch
// - add custom attributes (with '@' prefix), eg. : {... "@class":"btn" ...}
// - add custom child nodes (without '@' prefix), eg. : {... "span":"..." ...}
res = MyWebAppli.MyPage.insertButton('idButton2', MyWebAppli.MyPage.btSearch, 'Button 2', {
  "@class":"btn",
  "@style":"width:260;height:24"
  },
  e.html.position.afterEnd,
  MyWebAppli.MyPage.events.evOnButton2
);

// Add event listener for button click
MyWebAppli.MyPage.addOn({ evOnButton2: function(ev) {
  // add code here
  ctx.log("evTest was clicked");
}});

</code>
    * @method insertButton
    * @path ctx.page.insertButton
    * @param {string} id object DOM id
    * @param {string|ctx.item} adjacentItem Item object or id after which the button should be inserted
    * @param {string} label button label
    * @param {Object} [parameters] optional parameters : class, style, ...
    * @param {e.html.position} [position] insert position relative to 'adjacentItem' (default is 'e.html.position.afterEnd'). See [[:lib:common:ctx.enum#enumeration_ehtmlposition|e.html.position]]
    * @param {ctx.event} [event] Event to be posted when Button is clicked
    * @param {number} [disableTimer] disable duration after click (default is 2 s)
    * @return {string} result value
    */
    this.insertButton = function (id, adjacentItem, label, parameters, position, event, disableTimer) {
      var tag = 'input';
      if (typeof parameters !== 'object') { parameters = {}; }
      parameters['@id'] = id;
      parameters['@type'] = 'button';
      parameters['@value'] = label;
      var res = this.insertObject(tag, adjacentItem, parameters, position, event, disableTimer);
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Inserts an image button in a page
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// insert a button with id 'btNewButton', icon 'MyIcon', after item MyWebAppli.MyPage.MyItem
var sLabel = 'my new button';
var sIcon = 'http://www.canterris.com/templates/default/MyIcon.jpg';
MyWebAppli.MyPage.insertImageButton('btNewButton',
  MyWebAppli.MyPage.MyItem, sIcon, sLabel, {'class':'btn'}, e.html.position.afterEnd, MyAppli.events.evNewButtonClicked );
</code>
    * @method insertImageButton
    * @path ctx.page.insertImageButton
    * @param {string} id object DOM id
    * @param {string|ctx.item} adjacentItem Item object or id after which the button should be inserted
    * @param {string} image URL to the icon bitmap
    * @param {string} label image label ('alt' tag)
    * @param {Object} [parameters] optional parameters : class, style, ...
    * @param {e.html.position} [position] insert position relative to 'adjacentItem' (default is 'e.html.position.afterEnd'). See [[:lib:common:ctx.enum#enumeration_ehtmlposition|e.html.position]]
    * @param {ctx.event} [event] Event to be posted when Button is clicked
    * @param {number} [disableTimer] disable duration after click (default is 2 s)
    * @return {string} result value
    */
    this.insertImageButton = function (id, adjacentItem, image, label, parameters, position, event, disableTimer) {
      if (typeof parameters !== 'object') { parameters = {}; }
      parameters.src = image;
      parameters.alt = parameters.alt || label;
      parameters.title = parameters.title || label;
      var params = {
        id: id,
        href: 'javascript:void(0)',
        img: parameters
      };
      var res = this.insertObject('a', adjacentItem, params, position, event, disableTimer);
      // insert a style to manage disable state
      var style = {
        //id: 'style' + ctx.uuid(),
        type: 'text/css',
        '#text': 'a[disabled] {  pointer-events: none; }'
      }
      this.insertObject('style', adjacentItem, style, position);
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Inserts an image button in a page
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// insert a link with id 'btNewLink', after item MyWebAppli.MyPage.MyItem, to navigate to Contextor site
MyWebAppli.MyPage.insertLink('btNewLink', MyWebAppli.MyPage.MyItem, 'http://contextor.eu', 'Go to Contextor Site');

// insert a link with id 'btNewLink_2', , after item MyWebAppli.MyPage.MyItem
MyWebAppli.MyPage.insertLink('btNewLink_2', MyWebAppli.MyPage.MyItem, '', 'another new link', {'class':'defaultLink'}, e.html.position.afterEnd, MyAppli.events.evNewLinkClicked );
</code>
    * @method insertLink
    * @path ctx.page.insertLink
    * @param {string} id object DOM id
    * @param {string|ctx.item} adjacentItem Item object or id after which the button should be inserted
    * @param {string} href link reference
    * @param {string} label link text
    * @param {Object} [parameters] optional parameters : class, style, ...
    * @param {e.html.position} [position] insert position relative to 'adjacentItem' (default is 'e.html.position.afterEnd'). See [[:lib:common:ctx.enum#enumeration_ehtmlposition|e.html.position]]
    * @param {ctx.event} [event] Event to be posted when Button is clicked
    * @param {number} [disableTimer] disable duration after click (default is 2 s)
    * @return {string} result value
    */
    this.insertLink = function (id, adjacentItem, href, label, parameters, position, event, disableTimer) {
      if (typeof parameters !== 'object') { parameters = {}; }
      var params = {
        id: id,
        //name: id,
        href: href || 'javascript:void(0)',
        //alt: label,
        '#text': label
      };
      var res = this.insertObject('a', adjacentItem, params, position, event, disableTimer);

      // insert a style to manage disable state
      var style = {
        //id: 'style' + ctx.uuid(),
        type: 'text/css',
        '#text': 'a[disabled] {  pointer-events: none; }'
      }
      this.insertObject('style', adjacentItem, style, position);
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Inserts HTML code in a page
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * This function is used to insert 'raw' Html code in a Web page. In the general case, 'ctx.page.insertLink()', 'ctx.page.insertButton()', 'ctx.page.insertObject()', ... should be used instead.
    *
    * __Ex.:__
<code javascript>
var code = '<input class="nothing" id="myHtmlButton" onclick="Contextor.Event( \"evOnClickButton\", \"MyAppli\", \"_Empty_\", \"\", -1, 0, \"myHtmlButton\");var el = this; el.disabled=true; setTimeout( function(el) { return function() { el.disabled=false; }; }(el), 2000);" type="button" value="My Html Button">'
res = MyWebAppli.MyPage.insertHtml(code, MyAppli.MyPage.MyItem);
</code>
    * @method insertHtml
    * @path ctx.page.insertHtml
    * @param {string} htmlCode Html code to be inserted
    * @param {string|ctx.item} adjacentItem Item object or identifier (id, name or tag) after which the button should be inserted
    * @param {e.html.position} [position] insert position relative to 'adjacentItem' (default is 'e.html.position.afterEnd'). See [[:lib:common:ctx.enum#enumeration_ehtmlposition|e.html.position]]
    * @param {string} [id] optional identifier of the object to be inserted
    * @return {string} result value
    */
     this.insertHtml = function (htmlCode, adjacentItem, position, id) {
      var res = '';

      // function to be injected
      function ctxtInsertCode(htmlCode, adjacentItem, position, id) {
        Contextor.Log(0, 'ctxtInsertCode: entering');
        if ( (!id) || (document.getElementById(id) == null )) {
          try {
            var el = [];
            el[0] = document.getElementById(adjacentItem);
            if (!(el && el[0])) {
              el = document.getElementsByName(adjacentItem);
            }
            if (!(el && el[0])) {
              el = document.getElementsByTagName(adjacentItem);
            }
            if (!(el && el[0])) {
              el = document.getElementsByClassName(id);
            }
            if (el && el[0]) {
              el[0].insertAdjacentHTML(position, htmlCode);
            } else {
              Contextor.Log(0, 'ctxtInsertCode: could not find "' + adjacentItem + '"');
            }
          } catch ( ex ) {
            Contextor.Log(0, ex.message);
          }
        }
      }
      position = position || e.html.position.afterEnd;
      var desc = this.getObjectDescriptor();
      var page = desc.page; // real used page
      id = id || '';
      if (id) {
        var it = page.getItem(id);
        if (it && it.dynamic && it.exist()) {
          // already exists, delete it first
          this.deleteObject(id);
        }
      }
      if (adjacentItem instanceof ctx.item) {
        /** @type {ctx.item} */ var el = adjacentItem;
        if (el && el.exist()) {
          try {
            el.wait(function(ev) {
              res = el.scriptItem("insertAdjacentHTML", position, htmlCode);
            }, 0);
          } catch ( ex ) {
            throw new Error(e.error.InvalidArgument, 'ctx.page.insertHtml: ' + ex.message);
          }
        } else {
          throw new Error(e.error.InvalidArgument, 'ctx.page.insertHtml: could not find ' + el.name);
        }
      } else {
        // insert function, then call it
        res = page.injectFunction(ctxtInsertCode);
        if (res == '') {
          res = page.execScript('ctxtInsertCode', htmlCode, adjacentItem, position, id);
        }
      }

      // add a dynamically declared item
      if (id) { page.addItem(id, null, true); }

      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Inserts an HTML object in a page
    * @description
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Remarks.:__
    *   *
    *   *
    *
    * __Ex.:__
<code javascript>
// insert a button with id 'MyNewButton', label 'my new Button', after item MyWebAppli.MyPage.MyItem, send 'evOnMyNewButtonClicked' on click
res = MyWebAppli.MyPage.insertObject('input', MyWebAppli.MyPage.MyItem, {
    id: "MyNewButton",
    type: 'button',
    value: 'my new Button',
    "class": "btn",
    "style": "width:260;height:24"
  },
  e.html.position.afterEnd,
  MyAppli.MyPage.events.evOnMyNewButtonClicked
);
</code>
    * @method insertObject
    * @path ctx.page.insertObject
    * @param {string} tag object tag
    * @param {string|ctx.item} adjacentItem Item object or id after which the button should be inserted
    * @param {Object} parameters optional parameters : class, style, ...
    * @param {e.html.position} [position] insert position relative to 'adjacentItem' (default is 'e.html.position.afterEnd'). See [[:lib:common:ctx.enum#enumeration_ehtmlposition|e.html.position]]
    * @param {ctx.event} [event] Event to be posted when Button is clicked
    * @param {number} [disableTimer] disable duration after click (default is 2 s)
    * @return {string} result value
    */
     this.insertObject = function (tag, adjacentItem, parameters, position, event, disableTimer) {
      var res = '';
      if (this.exist())
      {
        parameters = parameters || {};
        var id = (parameters['@id'] || parameters.id || parameters.name);
        if (!id) { id = parameters.id = tag + ctx.uuid(); }
        //if (!id) { throw new Error(e.error.InvalidArgument, 'ctx.page.insertObject: no \'id\' or \'name\' was provided'); }
        if (!(event && (event instanceof ctx.event))) {
          event = this.events['CLICK'];
        }
        if (event && (event instanceof ctx.event)) {
          var appliName = event.appliName;
          var pageName = event.pageName || '_Empty_';
          var itemName = (event.pageName ? id : '');
          var appliInst = -1;
          var pageInst = -1;
          if (event.appliName == this.appli.name) {
            // the event is attached to this application
            appliInst = (event.appliInst > 0 ? event.appliInst : -1);
            pageInst = (event.pageInst > 0 ? event.pageInst : ((event.pageName == this.name) ? -1 : 0));
          } else {
            // the event is attached to another application
            appliInst = (event.appliInst > 0 ? event.appliInst : 0);
            pageInst = (event.pageInst > 0 ? event.pageInst : 0);
          }
          if( disableTimer === undefined) { disableTimer = 2000; }
          	parameters['@onclick'] = "Contextor.Event( '" + event.name + "', '" + appliName + "', '" + pageName + "', '" + itemName + "', " + appliInst + ", " + pageInst + ", '');";
          if (disableTimer > 0) {
            parameters['@onclick'] += "var el = this; el.disabled=true; setTimeout( function(el) { return function() { el.disabled=false; }; }(el), " + disableTimer + ");"
          }
        }
        var obj = {};
        obj[tag] = parameters;
        //var htmlCode = buildCode(tag, parameters);
        var htmlCode = ctx.xml.json2xml(obj, '');
        this.insertHtml(htmlCode, adjacentItem, position, id);
        if (res) {
          ctx.log('ctx.page.insertObject failed with error : ' + res, e.logIconType.Error);
        }
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * @method tooltip
    * @path ctx.page.tooltip
    * @param {Object} obj tooltip object
    * @suppress {checkTypes}
    */
    this.tooltip = function (obj) {
      obj = obj || {};
      var page = this;
      ctx.each(obj, function(id, value) {
        if (typeof value === 'object') {
          value.id = id;
          page.tooltips[id] = new ctx.tooltipClass(value, _page);
        }
      });
    };



    /**
    * @method tooltipInit
    * @path ctx.page.tooltipInit
    * @param {Object} params tooltip options : theme, ...
    * @suppress {checkTypes}
    */
    this.tooltipInit = function (params) {
      _params = params || {};
      ctx.each(ctx.options.tooltips, function(id, value) {
        _page.tooltipOptions[id] = value; // initialize with global options
      });
      ctx.each(_params, function(id, value) {
        _page.tooltipOptions[id] = value;
      });

      // if page is loaded, inject files and init tooltips
      this.waitAll(function(ev) {
        try {
          var thePage = ev.page; // page currently loaded
          if (thePage.currentNavigator != e.navigator.IE) {
            ctx.log("ctx.page.tooltipInit: 'Tooltips are not enabled : only Internet Explorer browser is supported", e.logIconType.Warning);
            return;
          }
          // remove potential objects which would not have been removed previously (remove object with class ctx.objectClass)
          thePage.deleteObject('ctxTooltipCSS');
          thePage.deleteObject('ctxTooltipJQuery');
          thePage.deleteObject('ctxTooltipLib');
          thePage.deleteObject('ctxMyTooltipLib');
          thePage.deleteObject(ctx.objectClass, e.html.type.className);

          // call pre initialization callback if defined
          if (typeof thePage.tooltipOptions.beforeInit === 'function') {
            try {
              thePage.tooltipOptions.beforeInit(ev);
            } catch (ex) {
              ctx.log("ctx.page.tooltipInit: 'beforeInit' callback failed : " + ex.message, e.logIconType.Warning);
            }
          }

          // inject CSS sheets
          var minSuffix = (thePage.tooltipOptions.debugLib ? '' : '.min');
          var ccsCode = '';
          if (thePage.tooltipOptions.library == e.tooltip.library.opentip) {
            // *** Opentip CSS initialization ***
            ccsCode = ctx.fso.file.read(ctx.options.path.bin + "\\opentip\\opentip.css") + "\n\n";
            ccsCode += ctx.fso.file.read(ctx.options.path.bin + "\\opentip\\ctx.opentip.css") + "\n\n";
          } else {
            // *** Tooltipster CSS initialization ***
            // insert a style block for tooltip CSS
            ccsCode = ctx.fso.file.read(ctx.options.path.bin + "\\tooltip\\tooltipster.bundle.min.css") + "\n\n";
            //switch (thePage.tooltipOptions.theme) {
            //  case e.tooltip.theme.light:
                ccsCode += ctx.fso.file.read(ctx.options.path.bin + "\\tooltip\\tooltipster.light.css") + "\n\n";
            //    break;
            //  case e.tooltip.theme.shadow:
                ccsCode += ctx.fso.file.read(ctx.options.path.bin + "\\tooltip\\tooltipster.shadow.css") + "\n\n";
            //    break;
            //  case e.tooltip.theme.white:
                ccsCode += ctx.fso.file.read(ctx.options.path.bin + "\\tooltip\\tooltipster.white.css") + "\n\n";
            //    break;
            //}
            ccsCode += ctx.fso.file.read(ctx.options.path.bin + "\\tooltip\\tooltipster.custom.css") + "\n\n";
          }

          // insert tooltip custom CSS
          if (thePage.tooltipOptions.css) {
            if (typeof thePage.tooltipOptions.css === 'string') thePage.tooltipOptions.css = [thePage.tooltipOptions.css];
            ctx.each(thePage.tooltipOptions.css, function(id, value) {
              ccsCode += ctx.fso.file.read(ctx.options.path.bin + "\\" + value) + "\n\n";
            });
          }

          ccsCode = ccsCode.replace(/\r\n/g, " ");
          ccsCode = ccsCode.replace(/\n/g, " ");
          //ccsCode = ccsCode.replace(/\r\n/g, "\n");

          // insert CSS using 'document.createStyleSheet' (necessary for < IE 8,not supported anymore since IE11 (see "https://msdn.microsoft.com/library/ms531194"))
          var res = thePage.evalScript("var res = ''; try { document.createStyleSheet('').cssText = '" + ccsCode  + "'; res = 'ok'; } catch(ex) { res = 'ko'; }; res;");

          // for other browsers (FF, Chrome, IE11+, ...)
          if (res != 'ok') {
            var styleObject = {
              id: 'ctxTooltipCSS',
              type: 'text/css',
              '#text': ccsCode
            }
            thePage.insertObject('style', 'head', styleObject, e.html.position.beforeEnd);
          }

          if (thePage.tooltipOptions.library == e.tooltip.library.opentip) {
            // *** Opentip JS library initialization ***
            if (thePage.tooltipOptions.jQuery) {
              // check if jQuery (>= 1.6) is already present : if no, inject the library
              var jQueryVersion = thePage.evalScript("var vers = ''; try { vers = jQuery.fn.jquery; } catch (ex) {}; vers;");
              var jQueryInject = true;
              if (jQueryVersion && (ctx.compareVersion(jQueryVersion, '1.6') < 0)) {
                jQueryInject = false;
              }
              if (jQueryInject) {
                thePage.injectFile(ctx.options.path.bin + "\\opentip\\jQuery" + minSuffix + ".js", 'ctxTooltipJQuery', true);
              }
              thePage.injectFile([ctx.options.path.bin + "\\opentip\\opentip-jquery" + minSuffix + ".js", ctx.options.path.bin + "\\opentip\\excanvas.js"], 'ctxTooltipLib', true);
              //thePage.injectFile(ctx.options.path.bin + "\\opentip\\excanvas.js", 'ExcanvasLib', true);
              //if ((jQueryInject) && (thePage.tooltipOptions.noConflict)) {
              if (jQueryInject) {
                thePage.execScript("jQuery.noConflict();");
              }
            } else {
              thePage.injectFile([ctx.options.path.bin + "\\opentip\\opentip-native" + minSuffix + ".js", ctx.options.path.bin + "\\opentip\\excanvas.js"], 'ctxTooltipLib', true);
              //thePage.injectFile(ctx.options.path.bin + "\\opentip\\excanvas.js", 'ExcanvasLib', true);
            }
            thePage.injectFile(ctx.options.path.bin + "\\opentip\\ctx.opentip.js", 'ctxMyTooltipLib', true);
            if (thePage.tooltipOptions.zIndex)
              thePage.execScript("Opentip.lastZIndex = " + thePage.tooltipOptions.zIndex + ";"); // increase z-index
          } else {
            // *** Tooltipster JS library initialization ***
            // check if jQuery (>= 1.8) is already present : if no, inject the library
            var jQueryVersion = thePage.evalScript("var vers = ''; try { vers = jQuery.fn.jquery; } catch (ex) {}; vers;");
            var jQueryInject = true;
            if (jQueryVersion && (ctx.compareVersion(jQueryVersion, '1.8') < 0)) {
              jQueryInject = false;
            }
            if (jQueryInject || thePage.tooltipOptions.jQuery) {
              thePage.injectFile(ctx.options.path.bin + "\\tooltip\\jQuery" + minSuffix + ".js", 'ctxTooltipJQuery', true);
            }
            thePage.injectFile(ctx.options.path.bin + "\\tooltip\\tooltipster.bundle" + minSuffix + ".js", 'ctxTooltipLib', true);
            thePage.injectFile(ctx.options.path.bin + "\\tooltip\\ctx.tooltip.js", 'ctxMyTooltipLib', true);
          }
          // insert tooltip definitions in an hidden DIV
          if (thePage.tooltipOptions.file) {
            if (typeof thePage.tooltipOptions.file === 'string') thePage.tooltipOptions.file = [thePage.tooltipOptions.file];
            var htmlCode = "";
            ctx.each(thePage.tooltipOptions.file, function(id, value) {
              htmlCode += ctx.resources.loadHtml(ctx.options.path.bin + '\\' + value);
              htmlCode += "\n\n";
            });
            var htmlObject = {
              //id: 'tooltip_templates',
              'class': 'tooltip_templates',
              style: 'display: none',
              '#text': htmlCode
            }
            thePage.insertObject('div', 'body', htmlObject, e.html.position.beforeEnd);
          }

          // call post initialization callback if defined
          if (typeof thePage.tooltipOptions.afterInit === 'function') {
            try {
              thePage.tooltipOptions.afterInit(ev);
            } catch (ex) {
              ctx.log("ctx.page.tooltipInit: 'afterInit' callback failed : " + ex.message, e.logIconType.Warning);
            }
          }
        } catch (ex) {
          ctx.log("ctx.page.tooltipInit: could not inject tooltip libraries : " + ex.message, e.logIconType.Error);
        }

        ctx.polling({
          delay: 1000, // loop 1 s
          nbMax: -1, // infinite loop
          test: function(iLoop) {
            if (!thePage.exist()) return true; // page closed
            ctx.log(null, e.logIconType.Info, "ctx.tooltipInit: " + thePage.appli.name + "[" + thePage.appli.instance + "]."+ thePage.name + " loop " + iLoop, ctx.options.tooltips);
            var stop = true;
            ctx.each(thePage.tooltips, function(id, value) {
              if (!value.inserted) {
                if (!value.set()) {
                  stop = false;
                }
              }
            });
            return stop;
          },
          done: function() { },
          fail: function() { }
        });

        // initialize the tooltip list
//        ctx.each(thePage.tooltips, function(id, value) {
//          if (value instanceof ctx.tooltipClass) {
//            value.set();
//          }
//        });
      //}
      }, 0);

      // clean up when quitting Agent
      this.appli.events.QUIT.on( function(ev) {
        // destroy the tooltip list on page close
        ctx.each(_page.tooltips, function(id, value) {
          try {
            if (value instanceof ctx.tooltipClass) {
              value.destroy();
            }
          } catch (ex) { }
        });
      }, 0);

//      _page.addOn({ evTooltipClose: function(ev) {
//        var helpId = ev.itemName;
//        ctx.each(_page.tooltips, function(id, value) {
//          try {
//            if ((value instanceof ctx.tooltipClass) && (value.helpId == helpId)){
//              value.close();
//              return false; // exit loop
//            }
//          } catch (ex) { }
//        });
//      }});
    };

// TODO : does not work, ctx.registry.del is not recursive
//    /**
//    * Reset tooltip settings and counters saved in registry for the application
//    * @method resetAll
//    * @path ctx.page.tooltips.resetAll
//    * @param {boolean} [allApplications] reset this application only (false) or all applications (true)
//    * @param {boolean} [allPages] reset this page only (false) or all pages (true)
//    */
//    this.tooltips.resetAll = function (allApplications, allPages) {
//      var key = _rootRegistry;
//      if (!allApplications) {
//        key += _page.parent.name + "\\";
//        if (!allPages) {
//          key += _page.name + "\\";
//        }
//      }
//      ctx.registry.del(key, e.registry.root.CurrentUser);
//    };

  }

  /**
  * Checks if the nature of the page is part of the given list
  * @description
  * __Ex.:__
<code javascript>
// Test if page is a WEB page
if ( MyAppli.MyPage.is(e.nature.WEB, e.nature.WEB3)) {...}
</code>
  * @method is
  * @ignore [internal use]
  * @path ctx.page.is
  * @param {...string} arg list of natures (ex.: 'WEB', 'WEB3', 'WIN', ...)
  * @return {boolean} result : 'true' if compatible
  */
  this.is = function (arg) {
    return this._is(arg);
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Checks if page browser is visible
    * @description
    * __Ex.:__
<code javascript>
if (MyWebAppli.MyPage.isBrowserVisible()) { ... }
</code>
    * @method isBrowserVisible
    * @path ctx.page.isBrowserVisible
    * @return {boolean} result true if visible
    */
    this.isBrowserVisible = function () {
      var desc = this.getObjectDescriptor();
      var res = ctx.actionApp(desc, 'isBrowserVisible', 'ISVISIBLE');
      return (res != 'No' ? true : false);
    }
  }

  if (this._is(e.nature.WIN, e.nature.EXEWIN)) {
    /**
    * Gets enabled or disabled state of the page
    * @description
    *
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
var txt = MyWinAppli.MyPage.isEnabled();
</code>
    * @method isEnabled
    * @path ctx.page.isEnabled
    * @return {boolean} 'true' (enabled) or 'false' (disabled)
    */
    this.isEnabled = function () {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = '_Enabled_';
      var res = ctx.action(desc, 'isEnabled', 'GETVALUE');
      return (res != 'No' ? true : false);
    }
  }

  if (this._is(e.nature.WIN, e.nature.EXEWIN)) {
    /**
    * Gets the 'modal' state of the page
    * @description
    *
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
if (MyWinAppli.MyPage.isModal()) { ... }
</code>
    * @method isModal
    * @path ctx.page.isModal
    * @return {boolean} result : modal ('true') or non modal ('false')
    */
    this.isModal = function () {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = '_Modal_';
      var res = ctx.action(desc, 'isModal', 'GETVALUE');
      return (res != 'No' ? true : false);
    }
  }

  if (this._is(e.nature.WIN, e.nature.EXEWIN)) {
    /**
    * Checks if page is visible
    * @description
    *
    * :!: __Technology specific:__ **WIN**
    *
    * __Ex.:__
<code javascript>
if (MyWinAppli.MyPage.isVisible()) { ... }
</code>
    * @method isVisible
    * @path ctx.page.isVisible
    * @return {boolean} result true if visible
    */
    this.isVisible = function () {
      var desc = this.getObjectDescriptor();
      desc.itemFullName = '_Visible_';
      var res = ctx.action(desc, 'isVisible', 'GETVALUE');
      return (res != 'No' ? true : false);
    }
  }

  if (this._is(e.nature.WIN, e.nature.EXEWIN, e.nature.UIAUTOMATION, e.nature.OCR, e.nature.HLLAPI)) {
    /**
    * Sends a sequence of keys to the page
    * @description
    * The list of pre-defined keys is defined in enumeration : [[:lib:common:ctx.enum#enumeration_ekey|e.key]]
    *
    * :!: __Technology specific:__ **WIN**, **UIAUTOMATION**, **OCR**, **HLLAPI**
    *
    * __Ex.:__
<code javascript>
// send a 'Alt F7' shortcut
MyAppli.MyPage.keyStroke(e.key.Alt + e.key.F7);
</code>
    * @method keyStroke
    * @path ctx.page.keyStroke
    * @param {string} command key sequence or text to be sent (see [[:lib:common:ctx.enum#enumeration_ekey|e.key]])
    * @return {string} result value
    */
    this.keyStroke = function (command) {
      var desc = this.getObjectDescriptor();
      if (this._is(e.nature.UIAUTOMATION, e.nature.OCR))
        command = ctx.keyStrokeMapping(command); // UIAutomaion has a specific mapping
      return ctx.action(desc, 'keyStroke', 'SETVALUE', command, '_KeyStroke_');
    }
  }

  if (this._is(e.nature.WIN, e.nature.EXEWIN, e.nature.UIAUTOMATION, e.nature.OCR, e.nature.SWG)) {
    /**
    * Sends a sequence of keys to the page (alternative method compared to ctx.item.keyStroke)
    * @description
    * The list of pre-defined keys if defined in enumeration : [[:lib:common:ctx.enum#enumeration_ekey|e.key]]
    *
    * :!: __Technology specific:__ **WIN**, **UIAUTOMATION**, **OCR**, **SWG**
    *
    * __Ex.:__
<code javascript>
// send a 'Alt F7' shortcut
MyAppli.MyPage.keyStroke2(e.key.Alt + e.key.F7);
</code>
    * @method keyStroke2
    * @path ctx.page.keyStroke2
    * @param {string} command key sequence or text to be sent
    * @return {string} result value
    */
    this.keyStroke2 = function (command) {
      var desc = this.getObjectDescriptor();
      if (this._is(e.nature.UIAUTOMATION, e.nature.OCR))
        command = ctx.keyStrokeMapping(command); // UIAutomaion has a specific mapping
      return ctx.action(desc, 'keyStroke2', 'SETVALUE', command, '_KeyStroke2_');
    }
  }

  // ******************************
  // *** UI Automation specific ***
  // ******************************
  if (this._is(e.nature.UIAUTOMATION)) {
      /**
      * Listens to WinEvents
      * @description
      * :!: __Technology specific:__ **UIAUTOMATION**
      *
      * __Ex.:__
<code javascript>
var name = MyUIAAppli.MyPage.listenWinEvents();
</code>
      * @method listenWinEvents
      * @path ctx.page.listenWinEvents
      * @return {string} result value
      */
      this.listenWinEvents = function () {
          var desc = this.getObjectDescriptor();
          return ctx.actionApp(desc, 'listenWinEvents', 'LISTEN_WINEVENTS');
      }
  }

  if (this._is(e.nature.UIAUTOMATION, e.nature.SAPGUI)) {
    /**
    * Disable polling refresh on this page
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **SAPGUI**
    *
    * __Ex.:__
<code javascript>
MyUIAAppli.MyPage.lockRefresh();
</code>
    * @method lockRefresh
    * @path ctx.page.lockRefresh
    * @return {string} result value
    */
    this.lockRefresh = function () {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'lockRefresh', 'LOCKREFRESH');
    }
  }

  if (this._is(e.nature.WIN, e.nature.WEB, e.nature.WEB3, e.nature.UIAUTOMATION)) {
    /**
    * Maximizes the page
    * @description
    * :!: __Technology specific:__ **WIN**, **WEB**, **WEB3**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.maximize();
</code>
    * @method maximize
    * @path ctx.page.maximize
    * @return {string} result value
    */
    this.maximize = function () { //
      var desc = this.getObjectDescriptor();
      var res = '';
      if (this._is(e.nature.WIN, e.nature.EXEWIN)) {
        res = ctx.actionApp(desc, 'maximize', 'SETSTYLE', 'WS_MAXIMIZE');
      } else if (this._is(e.nature.WEB, e.nature.WEB3)) {
        res = ctx.actionApp(desc, 'maximize', 'SETSTYLEWIN', 'WS_MAXIMIZE');
      } else if (this._is(e.nature.UIAUTOMATION)) {
        res = ctx.actionApp(desc, 'maximize', 'MAXIMIZE');
      }
      return res;
    }
  }

  if (this._is(e.nature.WIN, e.nature.EXEWIN, e.nature.WEB, e.nature.WEB3, e.nature.UIAUTOMATION)) {
    /**
    * Minimizes the page
    * @description
    * :!: __Technology specific:__ **WIN**, **WEB**, **WEB3**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.minimize();
</code>
    * @method minimize
    * @path ctx.page.minimize
    * @return {string} result value
    */
    this.minimize = function () { //
      var desc = this.getObjectDescriptor();
      var res = '';
      if (this._is(e.nature.WIN, e.nature.EXEWIN)) {
        res = ctx.actionApp(desc, 'minimize', 'SETSTYLE', 'WS_MINIMIZE');
      } else if (this._is(e.nature.WEB, e.nature.WEB3)) {
        res = ctx.actionApp(desc, 'minimize', 'SETSTYLEWIN', 'WS_MINIMIZE');
      } else if (this._is(e.nature.UIAUTOMATION)) {
        res = ctx.actionApp(desc, 'minimize', 'MINIMIZE');
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Navigates to a new page from the given page
    * @description
    * See 'Navigate' method for more details: https://msdn.microsoft.com/en-us/library/aa752093(v=vs.85).aspx
    *
    * :!: __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
// navigate to a given URL, opened in a new tab.
MyWebAppli.MyPage.navigate('http://www....', e.targetFrame.Blank);
</code>
    * @method navigate
    * @path ctx.page.navigate
    * @param {string} url expression that evaluates to the URL, full path, or UNC location and name of the resource to display
    * @param {e.targetFrame} [dest] expression that evaluates to the name of the frame in which to display the resource (see [[:lib:common:ctx.enum#enumeration_etargetframe|e.targetFrame]]).
    * @param {string} [post] Data that is sent to the server as part of a HTTP POST transaction. A POST transaction is typically used to send data gathered by an HTML form. If this parameter does not specify any post data, this method issues an HTTP GET transaction. This parameter is ignored if the URL is not an HTTP URL
    * @param {string} [header] A String that contains additional HTTP headers to send to the server. These headers are added to the default Internet Explorer headers. For example, headers can specify the action required of the server, the type of data being passed to the server, or a status code. This parameter is ignored if the URL is not an HTTP URL.
    * @return {string} result value
    */
    this.navigate = function (url, dest, post, header) {
      var desc = this.getObjectDescriptor();
      // both are equivalent : <NAVIGATE .../> or <ACTIONAPP Action='NAVIGATE'.../> ??
      return ctx.actionApp(desc, 'navigate', 'NAVIGATE', url, dest, post, header);
    }
  }

  /**
  * Tests page non existence
  * @description
  * __Ex.:__
<code javascript>
if (MyAppli.MyPage.notExist()) { ... }
</code>
  * @method notExist
  * @path ctx.page.notExist
  * @return {boolean} result : 'true' if page doesn't exist
  */
  this.notExist = function () { //
    return (!this.exist());
  }

  /**
  * Sends an event to a target application or page
  * @description
  * __Ex.:__
<code javascript>
// send a functional event to itself
MyAppli.MyPage.notify(MyAppli.events.evMyFuncEvent);
// send a functional event to another application
MyAppli.MyPage.notify(MyHllApiAppli.events.evMyFuncEvent);

// send a functional event to another page
MyAppli.MyPage.notify(MyHllApiAppli.MyPage.events.evMyFuncEvent);
// send a functional event to the page
MyAppli.MyPage.notify('evLogin');
</code>
  * @method notify
  * @path ctx.page.notify
  * @param {string|ctx.event} event event name or event object
  * @param {*} [data] event data
  * @param {number} [timer] timer value (ms)
  * @param {number} [appliInst] appli instance
  * @param {string} [method] optional method name : 'Send' for a synchronous call
  * @param {string} [itemName] item name
  * @return {*} returns result
  */
  this.notify = function (event, data, timer, appliInst, method, itemName) {
    /** @type {ctx.event} */ var theEvent;
    if (event && (typeof event == 'string')) {
      var evObj = {};
      evObj[event] = '';
      theEvent = this.addEvent(evObj);
    } else if (event instanceof ctx.event) {
      theEvent = event;
    }
    return this.parent.notify(theEvent, data, timer, appliInst, method, itemName);
  }

  /**
  * @deprecated use 'ctx.page.addOn' instead
  * @method on
  * @ignore
  * @path ctx.page.on
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
  * @deprecated use 'ctx.page.addOnce' instead
  * @method once
  * @ignore
  * @path ctx.page.once
  * @param {Object<string, function(ctx.event)>} evCallback event and callback object : { <event>: function(ev) { ... } }
  * @param {boolean|function()} [immediateCondition] if defined, function to be called immediately : if it returns a 'true' result, the 'func' callback is executed
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
  this.once = function (evCallback, immediateCondition, delay) {
    return this.addOn(evCallback, immediateCondition, false, delay);
  }

  /**
  * Extracts informations from the LOAD message
  * @method getLoadInfos
  * @path ctx.page.onLoad
  * @param {ctx.event} ev
  * @ignore
  * @return {boolean} result
  */
  this.onLoad = function (ev) {
    try {
      /** @type{string} */ var sEv = '';
      if (typeof ev.data === 'string') {
        sEv = ev.data;
      };
      this.currentNavigator = e.navigator.IE; // by default, suppose it's I.E.
      var xml = ctx.xml.parse(sEv);
      if (xml) {
        try {
          var xmlNode = xml.selectSingleNode("//_ObjectData_/UserAgent");
          if (xmlNode && xmlNode.text) {
            this.userAgent = xmlNode.text || '';
            if (this.userAgent.indexOf('Chrome') >= 0) {
              this.currentNavigator = e.navigator.Chrome;
            } else if (this.userAgent.indexOf('Firefox') >= 0) {
              this.currentNavigator = e.navigator.Firefox;
            }
          }
          // for a Web page : <_ObjectData_><Tab><HWND>0x260fd0</HWND></Tab></_ObjectData_>
          xmlNode = xml.selectSingleNode("//_ObjectData_/Process");
          if (xmlNode && xmlNode.text) {
            this.processId = parseInt(xmlNode.text, 10);
          }
          xmlNode = xml.selectSingleNode("//_ObjectData_/MainIEFrame/HWND");
          if (xmlNode && xmlNode.text) {
            var str = xmlNode.text.substring(2);
            this.hwndMain = parseInt(str, 16);
          }
          xmlNode = xml.selectSingleNode("//_ObjectData_/Tab/HWND");
          if (xmlNode && xmlNode.text) {
            var str = xmlNode.text.substring(2);
            this.hwnd = parseInt(str, 16);
          } else {
            // for a Windows Page : <_ObjectData_><HWND>35589254</HWND></_ObjectData_>
            try {
              xmlNode = xml.selectSingleNode("//_ObjectData_/HWND");
            } catch (ex) { }
            if (xmlNode && xmlNode.text) {
              if (this.is && this.is(e.nature.SWG))
                this.hwnd = parseInt(xmlNode.text, 16);
              else
                this.hwnd = parseInt(xmlNode.text, 10);
            }
          }
        } catch (ex) { }
      }
			// inject custom methods if any
			if (!ctx.isEmpty(this.customMethods)) {
				this.injectFunction(this.customMethods);
        ctx.sleep(100); // wait 100 ms
			}
    } catch(ex) {
      return false;
    }
    return true;
  }

  if (this._is(e.nature.UIAUTOMATION, e.nature.OCR, e.nature.SAPGUI)) {
    /**
    * Refreshes the page cache from the running application
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **OCR**, **SAPGUI**
    *
    * __Ex.:__
		<code javascript>
			MyUIAAppli.MyPage.refresh();
		</code>
    * @method refresh
    * @path ctx.page.refresh
    * @return {string} result value
    */
    this.refresh = function () {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'refresh', 'REFRESH');
    }
  }

  if (this._is(e.nature.OCR))
  {
    /**
    * Refreshes asynchronously the page cache from the running application
    * @description
    *   The REFRESHED event is sent when the Refresh is done
    * :!: __Technology specific:__ **OCR**
    *
    * __Ex.:__
<code javascript>
MyUIAAppli.MyPage.refreshAsync();
</code>
    * @method refreshAsync
    * @path ctx.page.refreshAsync
    */
      this.refreshAsync = function ()
    {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'refreshAsync', 'REFRESH_ASYNC');
    }
  }

  if (this._is(e.nature.OCR, e.nature.SAPGUI, e.nature.UIAUTOMATION))
  {
    /**
    * Activate Pages recognition when polling occurs
    * @description
    * :!: __Technology specific:__ **OCR**, **SAPGUI**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
MyUIAAppli.MyPage.startRefreshOnPolling();
</code>
    * @method startRefreshOnPolling
    * @path ctx.page.startRefreshOnPolling
    */
      this.startRefreshOnPolling = function ()
    {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'startRefreshOnPolling', 'START_REFRESH_POLLING');
    }

    /**
    * Deactivate Pages recognition when polling occurs
    * @description
    * :!: __Technology specific:__ **OCR**, **SAPGUI**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
MyUIAAppli.MyPage.stopRefreshOnPolling();
</code>
    * @method stopRefreshOnPolling
    * @path ctx.page.stopRefreshOnPolling
    */
      this.stopRefreshOnPolling = function ()
    {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'stopRefreshOnPolling', 'STOP_REFRESH_POLLING');
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Reloads the html page
    * @description
    * __Technology specific:__ **WEB**, **WEB3**
    *
    * Requires I.E. 9 or more
    *
    * __Ex.:__
<code javascript>
MyWebAppli.MyPage.reload();
</code>
    * @method reload
    * @path ctx.page.reload
    * @param {boolean} [forceGet] Reloads the current page from the server (true) or from the cache (false (default))
    * @return {string} result value
    */
    this.reload = function (forceGet) {
      var res = '';
      try {
        var desc = this.getObjectDescriptor();
        var code = 'window.location.reload(' + (forceGet ? 'true' : 'false') + ');';
        res = ctx.actionApp(desc, 'reload', 'EXECSCRIPT', code, e.scriptLanguage.JavaScript);
      } catch (ex) {
        throw new Error(e.error.NotImplemented, 'window.location.reload is not supported by the browser');
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * @deprecated use ctx.page.deleteObject instead
    * @method removeObject
    * @path ctx.page.removeObject
    * @param {string} id object Id, used to create the object
    * @return {string} result value
    */
    this.removeObject = function (id) {
      return this.deleteObject(id);
    }
  }

  if (this._is(e.nature.UIAUTOMATION, e.nature.WIN)) {
    /**
    * Description TODO
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **WIN**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.restore();
</code>
    * @path ctx.page.restore
    * @method restore
    * @return {string} result value
    */
    this.restore = function () {
      var desc = this.getObjectDescriptor();
      var res = '';
      if (this._is(e.nature.UIAUTOMATION)) {
        res = ctx.actionApp(desc, 'restore', 'RESTORE');
      } else if (this._is(e.nature.WIN)) {
        res = ctx.actionApp(desc, 'restore', 'SETSTYLE', 'SW_RESTORE');
      }
      return res;
    }
  }

  /**
  * Generates a screenshot
  * @description
  *
  * __Ex.:__
<code javascript>
MyAppli.MyPage.screenshot(ctx.options.path.log + '\\MyAppli.png');
</code>
  * @path ctx.page.screenshot
  * @method screenshot
  * @param {string} filename filename to be generated
  * @param {boolean} [raw] if true, makes a screenshot in 'raw' mode ('false' by default)
  * @return {string} result value
  */
  this.screenshot = function (filename, raw) {
    var res = '';
    var desc = this.getObjectDescriptor();
    if (desc && desc.page && desc.page.hwnd)
      res = ctx.screenshot( {
        File: filename,
        Raw: raw,
        HWND: desc.page.hwnd
      } );
    return res;
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Scrolls the html page to the specified coordinates
    * @description
    * __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
MyWebAppli.MyPage.scrollTo(0, 0); // scrolls to the top of the page
</code>
    * @method scrollTo
    * @path ctx.page.scrollTo
    * @param {number} xpos The coordinate to scroll to, along the x-axis (horizontal), in pixels
    * @param {number} ypos The coordinate to scroll to, along the y-axis (vertical), in pixels
    * @return {string} result value
    */
    this.scrollTo = function (xpos, ypos) {
      var res = '';
      xpos = xpos || 0;
      ypos = ypos || 0;
      try {
        var desc = this.getObjectDescriptor();
        var code = 'window.scrollTo(' + xpos + ', '+ ypos + ');';
        res = ctx.actionApp(desc, 'scrollTo', 'EXECSCRIPT', code, e.scriptLanguage.JavaScript);
      } catch (ex) {
        throw new Error(e.error.NotImplemented, 'window.scrollTo is not supported by the browser');
      }
      return res;
    }
  }

  if (this._is(e.nature.WEB, e.nature.WEB3)) {
    /**
    * Scrolls the html page by the specified number of pixels
    * @description
    * __Technology specific:__ **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
MyWebAppli.MyPage.scrollBy(100, 0); // Scroll the document by 100px horizontally
</code>
    * @method scrollBy
    * @path ctx.page.scrollBy
    * @param {number} xnum How many pixels to scroll by, along the x-axis (horizontal). Positive values will scroll to the left, while negative values will scroll to the right
    * @param {number} ynum How many pixels to scroll by, along the y-axis (vertical). Positive values will scroll down, while negative values scroll up
    * @return {string} result value
    */
    this.scrollBy = function (xnum, ynum) {
      var res = '';
      xnum = xnum || 0;
      ynum = ynum || 0;
      try {
        var desc = this.getObjectDescriptor();
        var code = 'window.scrollBy(' + xnum + ', '+ ynum + ');';
        res = ctx.actionApp(desc, 'scrollTo', 'EXECSCRIPT', code, e.scriptLanguage.JavaScript);
      } catch (ex) {
        throw new Error(e.error.NotImplemented, 'window.scrollBy is not supported by the browser');
      }
      return res;
    }
  }

  /**
  * Sets all the item values in the page, from a data object
  * @description
  * Note : this method can not be used to set occursed objects
  *
  * __Ex.:__
<code javascript>
var data = {
  edName: 'Smith',
  edFirstname: 'John',
  ... };
MyAppli.MyPage.setItems(data);
</code>
   * @method setItems
   * @path ctx.page.setItems
   * @param {ctx.dataClass} obj object with data to be set in page
   * @return {boolean} result true|false
   */
  this.setItems = function (obj) {
    if (this.exist()) {
      for (var id in obj) {
        // TODO : manage occursed objects
        if (typeof obj[id] !== 'object') {
          /** @type {ctx.item} */ var it = this.items[id];
          if (it && it.name) {
            if (it.setAll) {
              it.setAll(obj[id], true); // occursed item
            }
            if (it.set) {
              it.set(obj[id], true);
            }
          }
        }
      }
      return true;
    }
    return false;
  }

  /**
  * Sets the path of the page for a given environment ('development', 'production', ...)
  * @description
  * __Ex.:__
<code javascript>
// define production and test URL for MyAppli application
MyAppli.MyPage.setPath(e.env.prod, 'https://prodserver/crm/index.html')
MyAppli.MyPage.setPath(e.env.dev, 'https://testserver/crm/index.html')
...
// select 'production' as current environment
ctx.options.env = e.env.prod;
...
// start application (with 'production' URL)
MyAppli.MyPage.start();
</code>
  * @method setPath
  * @throws {Error}
  * @path ctx.page.setPath
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

  if (this._is(e.nature.SAPGUI)) {
	  /**
	  * Sets SAPGui refresh polling frequency
	  * @description
	  * __Ex.:__
	<code javascript>
	MyAppli.MyPage.setRefreshFrequency(2000);
	</code>
	  * @method setRefreshFrequency
	  * @path ctx.page.setRefreshFrequency
	  * @param {number} frequency frequency (in milliseconds)
	  */
	  this.setRefreshFrequency = function (frequency) {
	    var desc = this.getObjectDescriptor();
	    return ctx.actionApp(desc, 'setRefreshFrequency', 'SET_REFRESH_FREQ', frequency);
	  }
  }

  /**
  * Sets page size and position
  * @description
  * __Ex.:__
<code javascript>
MyAppli.MyPage.setPosition(50, 50, 600, 400);
</code>
  * @method setPosition
  * @path ctx.page.setPosition
  * @param {number} X left position
  * @param {number} Y top position
  * @param {number} CX width
  * @param {number} CY height
  * @return {string} result value
  */
  this.setPosition = function (X, Y, CX, CY) {
    var desc = this.getObjectDescriptor();
    // TODO !!! different if WIN, WEB2 or WEB3
    return ctx.actionApp(desc, 'setPosition', 'SETPOS', X, Y, CX, CY);
  }

  if (this._is(e.nature.WIN, e.nature.WEB, e.nature.WEB3)) {
    /**
    * Updates the page style
    * @description
    * :!: __Technology specific:__ **WIN**, **WEB**, **WEB3**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.setWindowStyle(e.windowStyle.MaximizeBox, true);
</code>
    * @method setWindowStyle
    * @path ctx.page.setWindowStyle
    * @param {e.windowStyle} style window style (see [[:lib:common:ctx.enum#enumeration_ewindowstyle|e.windowStyle]])
    * @param {boolean} enable enables the style (default value is true)
    * @return {string} result value
    */
    this.setWindowStyle = function (style, enable) { //
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'setWindowStyle', 'SETSTYLEWIN', style, (enable === false ? 'NO' : 'YES'));
    }
  }

  /**
  * Updates the page title
  * @description
  * __Ex.:__
<code javascript>
MyAppli.MyPage.setTitle('New title');
</code>
  * @method setTitle
  * @path ctx.page.setTitle
  * @param {string} title
  * @return {string} result value
  */
  this.setTitle = function (title) {
    var desc = this.getObjectDescriptor();
    return ctx.actionApp(desc, 'setTitle', 'SETTEXT', title);
  }

  /**
  * Shows or hides the page (or an element of the Web browser )
  * @description
  * __Ex.:__
<code javascript>
// WIN application : hide page
MyWinAppli.MyPage.setVisible(false);

// WEB application : hide Address bar
MyWebAppli.MyPage.setVisible(false, e.windowBarType.AddressBar);
</code>
  * @method setVisible
  * @path ctx.page.setVisible
  * @param {boolean} bVisible shows ('true') or hides ('false') the page or element (if omitted, 'true' by default)
  * @param {e.windowBarType} [barType] element of the Web browser to be shown/hidden (see [[:lib:common:ctx.enum#enumeration_ewindowbartype|e.windowBarType]]).\\ If omitted, the full page is shown/hidden.\\ This parameter is only significative for WEB technology.
  * @return {string} result value
  */
  this.setVisible = function (bVisible, barType) {
    var desc = this.getObjectDescriptor();
    var res = '';
    res = ctx.actionApp(desc, 'setVisible', 'VISIBLE', (bVisible === false ? 'NO' : 'YES'), barType);
    return res;
  }

  /**
  * Starts an application or Web URL if page is absent
  * @description
  * The behaviour is the following :
  *   * if the page already exists, and ''(bEvenIfExist == false)'', nothing is done
  *   * else if the application is started and is a Web application, and the current page is not this page, a navigation to the page is executed
  *   * else ''ctx.shellexec'' is called to launch the application
  *
  * __Ex.:__
<code javascript>
// start a page in normal mode
MyAppli.MyPage.start();
// start a page in maximized mode
MyAppli.MyPage.start(null, null, null, e.launchFlag.ShowMaximized);
// start a page while precizing URL
MyAppli.MyPage.start("http://www.dokuwiki.org/");
</code>
  * @method start
  * @path ctx.page.start
  * @throws {Error}
  * @param {string} [path] path to be executed. If path is not mentioned, the environment path is used, otherwise the path declared in Explorer tool ('Launch path' attribute)
  * @param {string} [parm] optional complementary parameter to the path
  * @param {string} [dir] optional working directory. If omitted, current working directory is used
  * @param {e.launchFlag} [flag=e.launchFlag.Show] launch flag. See [[:lib:common:ctx.enum#enumeration_elaunchflag|e.launchFlag]] for more details
  * @param {boolean} [bEvenIfExist=false] start page even if it already exists (false by default)
  * @return {string} result value
  */
  this.start = function (path, parm, dir, flag, bEvenIfExist) {
    var res = '';
    if (bEvenIfExist || (!this.exist())) {
      path = path || this.getPath() || this.parent.getPath() || ''; // use captured path
      if (!path) { throw new Error(e.error.InvalidArgument, "ctx.page.start: no valid path provided"); }
      // for a web application, force the default navigator if needed
      // ex.: launch "iexplore.exe http://......" instead of "http://......"
      if (this.parent.isWeb && path && !parm) {
        parm = path;
        path = this.parent.navigator;
      }
      if (parm) {
        parm = ctx.resolvePath(parm);
        //if (parm.indexOf(' ') >= 0) parm = '"' + parm + '"';
      }
      if (path) {
        path = ctx.resolvePath(path);
        //if (path.indexOf(' ') >= 0) path = '"' + path + '"';
      }
      // Test if application is already started (with another page active)
      // if yes, navigate from this page to the target page
      var app = this.appli;
      if ((!bEvenIfExist) && app) {
        var pg = app.getCurrentPage();
        if (pg && pg.navigate && pg.exist())
        {
          // already started : just navigate to the page
          return pg.navigate(parm ? parm : path);
        }
      }
      res = ctx.shellexec(path, parm, dir, flag);
    //} else {
    //  res = this.activate();
    }
    return res; // already started
  }

//  if (this.getRect) {
//    /**
//    * Displays a tooltip close to the page
//    * @description
//    * :!: __Technology specific:__ **WEB**, **WEB3**
//    *
//    * __Ex.:__
//<code javascript>
//MyAppli.MyPage.tooltip({
//  message: "<b>This is a tooltip</b><br/>Extra information here<br/> ",
//  icon: e.popup.icon32.info,
//  color: e.popup.color.Green,
//});
//</code>
//    * @method tooltip
//    * @path ctx.page.tooltip
//    * @param {ctx.popupParams} params parameter object
//    * @param {function(*)} [callback] optional callback called when the tooltip is closed
//    * @return {ctx.popupClass} result value
//    */
//    this.tooltip = function (params, callback) {
//      var desc = this.getObjectDescriptor();
//      ctx.notifyAction('tooltip', '', desc);
//      params = params || {};
//      params.name = params.name || 'pPageTooltip';
//      params.template = params.template || e.popup.template.Tooltip;
//      ctx.noNotify = true;
//      params.position = this.getRect();
//      return ctx.popup(params.name).open(params, false, callback);
//    }
//  }

  if (this._is(e.nature.WIN, e.nature.EXEWIN, e.nature.WEB, e.nature.WEB3, e.nature.UIAUTOMATION)) {
    /**
    * Enables or disables the 'top most' position of the page
    * @description
    * :!: __Technology specific:__ **WIN**, **WEB**, **UIAUTOMATION**
    *
    * __Ex.:__
<code javascript>
MyAppli.MyPage.topMost(true);
</code>
    * @method topMost
    * @path ctx.page.topMost
    * @param {boolean} bValue Enables ('true') or disables ('false') the 'top most' position
    * @return {string} result value
    */
    this.topMost = function (bValue) {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'topMost', 'TOPMOST', (bValue ? 'YES' : 'NO'));
    }
  }

  if (this._is(e.nature.UIAUTOMATION, e.nature.SAPGUI)) {
    /**
    * Description TODO
    * @description
    * :!: __Technology specific:__ **UIAUTOMATION**, **SAPGUI**
    *
    * __Ex.:__
<code javascript>
MyUIAAppli.MyPage.unlockRefresh();
</code>
    * @method unlockRefresh
    * @path ctx.page.unlockRefresh
    * @return {string} result value
    */
    this.unlockRefresh = function () {
      var desc = this.getObjectDescriptor();
      return ctx.actionApp(desc, 'unlockRefresh', 'UNLOCKREFRESH');
    }
  }

  if (!this.wait) {
  /**
  * Waits until a page is present, then calls a callback
  * @description
  * The behaviour is the following :
  *   * if the page already exists, the callback is immediately called
  *   * else it calls the callback on reception of a 'LOAD' event on the page.
  * The handler on the 'LOAD' event is set a single time.
  *
  * __Ex.:__
<code javascript>
// wait for page 'MyAppli.MyPage'
MyAppli.MyPage.wait(function(ev) {
  // add code here, to be executed when page is present
});
</code>
  *
  * <WRAP tip>You can use 'snippets' to accelerate development :
  *   * **<page>.wait** + 'TAB' :
  *
<code javascript>
<page>.wait(function(ev) {
  ...
}, 0);
</code>
  * </WRAP>
  * @method wait
  * @path ctx.page.wait
  * @param {function(ctx.event)} callback callback to be called when page is present
  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
  */
	  this.wait = function (callback, delay) {
	    var desc = this.getObjectDescriptor();
	    ctx.notifyAction('wait', '', desc);
	    return this.addOn({ LOAD: callback }, this.exist, true, delay);
	  }
  }

  if (!this.waitAll) {
	  /**
	  * Waits until a page is present, then calls a callback
	  * @description
	  * The behaviour is the following :
	  *   * if the page already exists, the callback is immediately called
	  *   * it calls the callback on reception of a 'LOAD' event on the page.
	  * The handler on the 'LOAD' event is set permanently.
	  *
	  * __Ex.:__
	<code javascript>
	// wait for page 'MyAppli.MyPage'
	MyAppli.MyPage.waitAll(function(ev) {
	  // add code here, to be executed each time the page is loaded
	});
	</code>
	  * @method waitAll
	  * @path ctx.page.waitAll
	  * @param {function(ctx.event)} callback callback to be called when page is present
	  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
	  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
	  */
	  this.waitAll = function (callback, delay) {
	    var desc = this.getObjectDescriptor();
	    ctx.notifyAction('waitAll', '', desc);
	    return this.addOn({ LOAD: callback }, this.exist, false, delay);
	  }
  }

  if (!this.waitClose) {
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
	// wait for page 'MyAppli.MyPage'
	MyAppli.MyPage.waitClose(function(ev) {
	  // add code here, to be executed when page is closed or absent
	});
	</code>
	  *
	  * <WRAP tip>You can use 'snippets' to accelerate development :
	  *   * **<page>.waitClose** + 'TAB' :
	  *
	<code javascript>
	<page>.waitClose(function(ev) {
	  ...
	});
	</code>
	  * </WRAP>
	  * @method waitClose
	  * @path ctx.page.waitClose
	  * @param {function(ctx.event)} callback callback to be called when page is closed or absent
	  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
	  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
	  */
	  this.waitClose = function (callback, delay) {
	    var desc = this.getObjectDescriptor();
	    ctx.notifyAction('waitClose', '', desc);
	    return this.addOn({ UNLOAD: callback }, this.notExist, true, delay);
	  }
  }

  if (!this.waitCloseAll) {
	  /**
	  * Waits until a page is closed, then calls a callback
	  * @description
	  * The behaviour is the following :
	  *   * if the page doesn't exist, the callback is immediately called
	  *   * else it calls the callback on reception of a 'UNLOAD' event on the page.
	  * The handler on the 'UNLOAD' event is set permanently.
	  *
	  * @method waitCloseAll
	  * @path ctx.page.waitCloseAll
	  * @param {function(ctx.event)} callback callback to be called when page is closed or absent
	  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
	  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
	  */
	  this.waitCloseAll = function (callback, delay) {
	    var desc = this.getObjectDescriptor();
	    ctx.notifyAction('waitCloseAll', '', desc);
	    return this.addOn({ UNLOAD: callback }, this.notExist, false, delay);
	  }
  }

  if (!this.waitReady) {
	  /**
	  * Waits until a page is ready, then calls a callback
	  * @description
	  * The behaviour is the following :
	  *   * by default, this function has the same behavior.
	  *   * this function can be overloaded with specific pages to handle a BUSY state in the page.
	  *
	  * @method waitReady
	  * @path ctx.page.waitReady
	  * @param {function(ctx.event)} callback callback to be called when page is closed or absent
	  * @param {number} [delay] optional delay to wait before calling the callback (default is 0)
	  * @return {Object} an object to be provided to 'ctx.off()' to disable listening
	  */
	  this.waitReady = function (callback, delay) {
	    var desc = this.getObjectDescriptor();
	    ctx.notifyAction('waitReady', '', desc);
	    ctx.noNotify = true;
		  return this.wait(callback, delay);
	  }
	}

  // declare dynamically tracked events
  for (var evName in this.trackEvents)
  {
    var objEvent = {};
    objEvent[evName] = '';
    this.addEvent(objEvent, true, true);
  }

  // add standard technical events
  this.addEvent({ ACTIVATE: '', CLICK: '', LOAD: '', UNLOAD: '' }, true, true);
  if (this._is(e.nature.EXEWIN, e.nature.WIN)) {
    this.addEvent({ ENABLE: '', DISABLE: '', SHOW: '', HIDE: '', MENUPOPUP: '', SCROLL: '', SIZE: '' }, true, true);
  } else if (this._is(e.nature.WEB, e.nature.WEB3)) {
    this.addEvent({ RESIZE: '' }, true, true);
  } else if (this._is(e.nature.UIAUTOMATION)) {
  } else if (this._is(e.nature.HLLAPI)) {
    this.addEvent({ UPDATE: '' }, true, true);
  } else if (this._is(e.nature.SWG)) {
  }

  // *** delete items dynamically declared in pages when the page unloads ***
  //var page = this;
  this.events['UNLOAD'].on( function(ev) {
    if (ev.page && ev.page.cleanUp) { ev.page.cleanUp(); }
  });

  if (!this.execMethod && this._is(e.nature.SWG)) {

    /**
    * Executes a native Java method on the page
    * @description
    * :!: __Technology specific:__ **SWG**
    *
    * This method is used for advanced needs to execute native Java functions
    *
    * __Ex.:__
<code javascript>
// disables the page
MyJavaAppli.MyPage.execMethod('setEnabled(boolean)', false);

// hide a page
var res = MyJavaAppli.MyPage.execMethod('hide()');

// gets page  horizontal position (parameters signature can be omitted if no ambiguity)
var res = MyJavaAppli.MyPage.execMethod('getX');

// call static method		
var cal = MyJavaAppli.MyPage.execMethod("java.util.Calendar.getInstance()")

</code>
    * @method execMethod
    * @path ctx.page.execMethod
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

}

