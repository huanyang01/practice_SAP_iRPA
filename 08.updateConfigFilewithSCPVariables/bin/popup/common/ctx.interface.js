
if (!String.prototype.toCamel) {
	String.prototype.toCamel = function(){
		return this.replace(/([-_ ][a-zA-Z0-9])/g, function($1){return $1.toUpperCase().replace(/[-_ ]/,'');});
	};	
}

(function() {
    function checkCondition(v1, operator, v2) {
        switch(operator) {
            case '==':
                return (v1 == v2);
            case '===':
                return (v1 === v2);
            case '!=':
                return (v1 != v2);
            case '!==':
                return (v1 !== v2);
            case '<':
                return (v1 < v2);
            case '<=':
                return (v1 <= v2);
            case '>':
                return (v1 > v2);
            case '>=':
                return (v1 >= v2);
            case '&&':
                return (v1 && v2);
            case '||':
                return (v1 || v2);
            default:
                return false;
        }
    }

    if ("undefined" !== typeof Handlebars) {
		Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
			return checkCondition(v1, operator, v2)
						? options.fn(this)
						: options.inverse(this);
		});
	}
}());


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
	var _builtPropertiesObject = null;
	var _builtPropertiesType = '';
	var _indexes = {};
	var _mapValues = {};
	var _mapReverseValues = {};
	var _mapKeys = {};
	var _autoCloseTimer = 0;
	var _initInProgress = false;
	var _designMenuDisplayed = false;
	var _currentEditedItem = '';
	var _borderWidth = 20;
	var _borderHeight = 20;

	/** Initializes object used to communicate with Unified Desktop or Contextor project
	* @method : init
	* @ignore
	*/
	var _init = function () {
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

	var _isCollapsable = function (arg) {
		return arg instanceof Object && Object.keys(arg).length > 0;
	}

	/**
	* Check if a string represents a valid url
	* @return boolean
	*/
	var _isUrl = function (string) {
		var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		return regexp.test(string);
	}
	
	var _getRootObject = function() {
		var jQObj;
		jQObj = _getObject(item.parent);
		if (!jQObj.length) { jQObj = $('body'); }
	}
	
	var _getObject = function(id, childId, checkCtxType) {
		var jQObj;
		var childItem;
		var theId;
		if (id && (typeof id === 'object') && id.id) {
			theId = id.id;
		} else if (id && ('string' === typeof(id))) {
			theId = id;
		} else if (id && ('object' === typeof(id))) {
			jQObj = $(id);
		}
		if (theId && (undefined !== childId)) {
			childItem = ctx.getChild(theId, childId);
			if (childItem && childItem.id) {
				theId = childItem.id;
			}
		}
		if (theId) {
			jQObj = $("#" + theId).not('template');
			if (!jQObj.length) {
				jQObj = $("[name=" + theId + "]").not('template');
			}
		}
		var jQObj2 = jQObj;
		if (checkCtxType && jQObj && jQObj.length && (!jQObj.attr('ctxtype'))) {
			jQObj2 = jQObj.closest('[ctxtype]'); // search parent node with 'ctxtype' attribute
			if (!jQObj2.length) {
				jQObj2 = jQObj.find('[ctxtype]'); // search child node with 'ctxtype' attribute
			}
		}
		return jQObj2 || $([]);
	}
	
	var _getJQObjectId = function(jQObj) {
		var id = '';
		if (jQObj) {
			id = jQObj.attr('id') || jQObj.attr('ctxname') || jQObj.attr('name'); 
		}
		return id;
	}

	var _buildProperties = function(data, meta, model, isChild) {
		var obj = {};
		for (var field in meta) {
			if (field === 'ctxType') continue;
			if (isChild && ((field === 'parent') || (field === 'type') || (field === 'auto'))) {
				continue; // skip for children
			} 
			obj[field] = {};
			var metaField = meta[field] || ctx.popup.bootstrap.meta[field];
			var modelField = (model && model[field] ? model[field] : {} ) ;
			var isArray = $.isArray(metaField);
			if (isArray) {
				obj[field] = [];
				var arrayMeta = ctx.popup.bootstrap.meta[field];
				if (arrayMeta) {
					for (var metaAttribute in arrayMeta) {
						obj[field]['_' + metaAttribute] = arrayMeta[metaAttribute];
					}
				}
				if ('string' === typeof metaField[0]) {
					var type = _getByPath(metaField[0]);
					metaField = type.meta;
					modelField = type.model;
					if (modelField) {
						modelField = ctx.unmapReverseValue(modelField);
					}
				}
				if (data[field]) {
					$.each(data[field], function (index, it) {
						var subObj = _buildProperties(it, metaField, modelField, true);
						obj[field].push(subObj);
					});
				}
				obj['pattern_' + field] = {};
				obj['pattern_' + field] = _buildProperties([], metaField, modelField, true);
			} else if (metaField && ('object' === typeof(metaField))) {
				if (field === 'parent') {
					for (var metaAttribute in metaField) {
						obj[field]['_' + metaAttribute] = metaField[metaAttribute];
					}
					obj[field]._type = '_options';
					obj[field]._options = [];
					var itemId = '';
					if (data && data.id) itemId = data.id;
					for (var id in ctx.currentPopup._items) {
						var item = ctx.currentPopup._items[id];
						if (_isContainer(item) && (itemId != id)) {
							obj[field]._options.push({
								value: id,
								text: id
							});
						}
						if (_subContainers(item) && (itemId != id)) {
							var subContainers = _getSubContainers(item);
							if (subContainers) {
								for (var subItem in subContainers) {
									obj[field]._options.push({
										value: subItem,
										text: subItem
									});
								}
							}
						}
					}
				} else if (field === 'value'){
					for (var metaAttribute in metaField) {
						obj[field]['_' + metaAttribute] = metaField[metaAttribute];
					}
					obj[field]._type = '_options';
					obj[field]._options = [];
					for (var id in ctx.htmlTemplates) {
						obj[field]._options.push({
							value: id,
							text: id
						});
					}
				} else {
					for (var metaAttribute in metaField) {
						obj[field]['_' + metaAttribute] = metaField[metaAttribute];
						if (metaField[metaAttribute] && ('object' === typeof(metaField[metaAttribute]))) {
							obj[field]['_' + metaAttribute] = '_options';
							obj[field]._options = [];
							var ctxType = metaField[metaAttribute].ctxType;
							for (var option in metaField[metaAttribute]) {
								if (option !== 'ctxType') {
									obj[field]._options.push({
										value: option,
										text: metaField[metaAttribute][option]
									});
								}
							}
						}
					}
				}
				var value = data[field];
				if (value === undefined) value = obj[field]._value;
				if (value === undefined) value = model[field];
				obj[field]._value = ctx.unmapKey(value);
				obj[field]._name = obj[field]._name || field;
				obj[field]._description = obj[field]._description || obj[field]._name;
			}
		}
		_builtPropertiesObject = obj;
		return obj;
	}

	var _getMeta = function(it) {
		var meta = {};
		if (it && it.sampleObject && it.sampleObject.meta && ('object' === typeof(it.sampleObject.meta))) {
			meta = it.sampleObject.meta;
		} else if (it && it.typeObject && it.typeObject.meta && ('object' === typeof(it.typeObject.meta))) {
			meta = it.typeObject.meta;
		} else if (it && it.typeObject && it.typeObject.root && it.typeObject.root.meta && ('object' === typeof(it.typeObject.root.meta))) {
			meta = it.typeObject.root.meta;
		}
		return meta;
	}
	
	var _getModel = function(it) {
		var model = {};
		if (it && it.sampleObject && it.sampleObject.model && ('object' === typeof(it.sampleObject.model))) {
			model = it.sampleObject.model;
		} else if (it && it.typeObject && it.typeObject.model && ('object' === typeof(it.typeObject.model))) {
			model = it.typeObject.model;
		}
		return model;
	}
	
	var _getIcon = function(it) {
		var icon = '';
		if (it && it.typeObject && it.typeObject.icon) {
			icon = it.typeObject.icon;
		} else if (it && it.typeObject && it.typeObject.root && it.typeObject.root.icon ) {
			icon = it.typeObject.root.icon;
		}
		return icon;
	}
	
	var _getSubIcon = function(it) {
		var icon = '';
		if (it && it.typeObject && it.typeObject.subIcon) {
			icon = it.typeObject.subIcon;
		} else if (it && it.typeObject && it.typeObject.root && it.typeObject.root.subIcon ) {
			icon = it.typeObject.root.subIcon;
		}
		return icon;
	}	
	
	var _getSubAuto = function(it) {
		var auto = false;
		if (it && it.typeObject && it.typeObject.subAuto) {
			auto = it.typeObject.subAuto;
		} else if (it && it.typeObject && it.typeObject.root && it.typeObject.root.subAuto ) {
			auto = it.typeObject.root.subAuto;
		}
		return auto;
	}	
	
	var _isContainer = function(it) {
		var isContainer = false;
		if (it && it.typeObject && it.typeObject.isContainer) {
			isContainer = true;
		} else if (it && it.typeObject && it.typeObject.root && it.typeObject.root.isContainer ) {
			isContainer = true;
		}
		return isContainer;
	}
	
	var _subContainers = function(it) {
		var subContainers = false;
		if (it && it.typeObject && it.typeObject.subContainers) {
			subContainers = true;
		} else if (it && it.typeObject && it.typeObject.root && it.typeObject.root.subContainers ) {
			subContainers = true;
		}
		return subContainers;
	}
	
	var _getSubContainers = function(it) {
		var subContainers = null;
		if (_subContainers(it) && it.items) {
			$.each(it.items, function (index, subItem) {
				if (subItem.id) {
					subContainers = subContainers || {};
					subContainers[subItem.id] = subItem;
				}
			});
		}
		return subContainers;
	}
	
	var _getItemProperties = function(id) {
		var obj = {};
		if (ctx.currentPopup && ctx.currentPopup._items) {
			var it = ctx.currentPopup._items[id];
			var meta = it && it.metaObject;
			var model = it && it.modelObject;
			obj = _buildProperties(it, meta, model);
			//if( obj && obj.style) alert('value: ' + obj.style.value + ', oldValue: ' + obj.style.oldValue);
			_builtPropertiesType = 'ctx.item';
		}
		return obj;
	};

	var _updateItemTooltip = function(item) {
		if (item.tooltip) {
			try {
				var jQObj = _getObject(item.id);
				jQObj.tooltip({
					title: item.tooltip, 
					html: true, 
					placement: item.tooltipPlacement
				});
			} catch (ex) {}
		}
		if (item.items) {
			$.each(item.items, function (index, subItem) {
				_updateItemTooltip(subItem);
			});
		}
	};

	var _updateItemValues = function(item) {
		var meta = item.metaObject;
		if (meta && (meta.value !== undefined)) {
			// update value from an html template
			var jQhtml;
			if (item.id && ctx.htmlTemplates[item.id]) {
				jQhtml = $("template[name=" + item.id + "]");
			} else if (item.value && ctx.htmlTemplates[item.value]) {
				jQhtml = $("template[name=" + item.value + "]");
			}
			if (jQhtml && jQhtml.length) {
				var html = jQhtml.html();
				if (html)
					item.value = html;
			}

			// replace Markdown sections
			if (item.value && item.markdown) {
				try {
					if (!ctx.converter) {
						var options = {
							strikethrough: true,
							tablesHeaderId: true,
							tables: true,
							tasklists: true,
							//extensions: ['icon', 'classify', 'mathjax']
							extensions: ['icon', 'classify']
						}
						ctx.converter = new showdown.Converter(options);
					} 
					item.value = ctx.converter.makeHtml(item.value) ;
				} catch (ex){ 
					item.value = "Could not translate markdown syntax for item '" + item.id + "' : " + ex.message;							
				}
			};

			// Handlebars template converter
			if (item.value && item.data && (typeof item.data === 'object')) {
				try {
					var template = Handlebars.compile(item.value);
					item.value = template(item.data);
				} catch (ex){
					item.value = "Could not run template for item '" + item.id + "' : " + ex.message;							
				}
			}
		}
		return item;
	};


	var _removeSubItems = function(item, keepObject) {
		if (item && item.id) {
			for (var id in ctx.currentPopup._items) {
				var subItem = ctx.currentPopup._items[id];
				if (subItem && (subItem.parent == item.id)) {
					_removeSubItems(subItem, keepObject);
				}
			}
			var jQObjContent = _getObject(item.id + '_content');
			if (jQObjContent.length) {
				jQObj = jQObjContent;
			} else {
				jQObj = _getObject(item.id);
			}
			if (jQObj.length) {
				if (item.type) {
					jQObj.remove();
				} else {
					jQObj.removeAttr('ctxtype');
				}
			}
			if (!keepObject) {
				// remove item
				delete ctx.currentPopup._items[item.id];
			}
		}
	}
	
	var _sortSubItems = function(item, items, sortedItems) {
		if (item && item.items) {
			for (var id in item.items) {
				var subId = item.items[id].id;
				_sortItems(items, sortedItems, subId);
			}
		}
	}
	
	var _sortItems = function(items, sortedItems, parent) {
		var item = null;
		for (var id in items) {
			item = items[id];
			if ((item.parent || "") == parent) {
				if (item.dropped) {
					// skip dropped 
					delete item.dropped;
				} else if (item.dropAfter) {
					var id2 = item.dropAfter;
					delete item.dropAfter;
					delete items[id];
					sortedItems.push(item);
					_sortSubItems(item, items, sortedItems);
					_sortItems(items, sortedItems, item.id);
					var item2 = items[id2];
					if (item2) {
						delete item2.dropped;
						delete items[id2];
						sortedItems.push(item2);
						_sortSubItems(item2, items, sortedItems);
						_sortItems(items, sortedItems, id2);
					}
				} else if (item.dropBefore) {
					var id2 = item.dropBefore;
					delete item.dropBefore;
					var item2 = items[id2];
					if (item2) {
						delete item2.dropped;
						delete items[id2];
						sortedItems.push(item2);
						_sortSubItems(item2, items, sortedItems);
						_sortItems(items, sortedItems, id2);
					}
					delete items[id];
					sortedItems.push(item);
					_sortSubItems(item, items, sortedItems);
					_sortItems(items, sortedItems, item.id);
				} else {
					delete items[id];
					sortedItems.push(item);
					_sortSubItems(item, items, sortedItems);
					_sortItems(items, sortedItems, item.id);
				}
			}
		}
	};


	var _getPopupProperties = function() {
		var obj = {};
		var model = {};
		if (ctx.currentPopup && ctx.currentPopup._params) {
			obj = _buildProperties(ctx.currentPopup._params, ctx.popupMeta, model);
			_builtPropertiesType = 'ctx.popup';
		}
		return obj;
	};

	var _editItem = function(selectedId, highlight) {
		//alert(selectedId);
		var jQObj = $([]);
		if (selectedId) {
			jQObj = _getObject(selectedId);
		}
		if (jQObj.length == 0) {
			jQObj = _getSelectedObject(true);
			if (jQObj.length != 0) {
				selectedId = _getJQObjectId(jQObj);
			}
		} else {
			var parent = jQObj.attr( 'ctxparent' );
			if (parent) { selectedId = parent; }
		}
		if (selectedId) {
			var pos = selectedId.indexOf('_content');
			if (pos > 0) selectedId = selectedId.substring(0, pos);
		}
		var obj;
		if (selectedId) {
			obj = _getItemProperties(selectedId);
			_currentEditedItem = selectedId;
		} else {
			obj = {};
			_currentEditedItem = "";
		} 
		setTimeout(function(){ 
			if (highlight) {
				ctx.highlight(selectedId);
			}
			ctx.notify(selectedId, '_ctxStudioEdit', obj, true);
			//alert("editItem: " + selectedId);
		}, 200);
	};

	var _buildMenu = function(menu, sample, param) {
		if (param && param.display && param.display.folder) {
			var parentIcon = self.unmapValue(param.display.icon); // parent icon
			for (var id in param) {
				if ('display' != id) {
					if (param[id].display) {
						var display = self.unmapValue(param[id].display)
						menu.items = menu.items || {};
						if (display.srczzz) { //temp
							menu.items[id] = {
								type : 'label',
								name : display.name || id,
								description : display.description,
								id : id,
								src : display.src
							};
						} else {
							menu.items[id] = {
								name : display.name || id,
								icon : display.icon || parentIcon
							};
						}
						if (display.folder) {
							_buildMenu(menu.items[id], sample[id], param[id]);
						} else {
							menu.items[id].sample = sample[id];
						}
					}
				}
			}
		}
	}

	var _replacePatterns = function(options) {
		if (!$.isReady) return;
		for (var id in options) {
			if ((id == 'ctxType') || (id == 'typeObject') || (id == 'sampleObject') || (id == 'metaObject') || (id == 'modelObject') || (id == 'jQueryObject') || (id == 'template')) continue;
			var value = options[id];
			if (value && ('object' === typeof value)) {
				_replacePatterns(value);
			} else if (value && ('string' === typeof value)) {
				if (value.indexOf('%index%') >= 0) {
					if (undefined === _indexes[value]) { _indexes[value] = 0; }
					while (true) {
						_indexes[value]++;
						newValue = value.replace('%index%', _indexes[value]);
						if ($('#'+ newValue).length == 0) {
							options[id] = newValue;
							break;
						}
					}
				}
			}
		}
	}

	var _prettyReplacer = function(id, value) {
		if (_mapValues[value] !== undefined) { 
			value = "%<%" + value + "%>%"; 
		}
		return value;
	}
	
	var _prettyStringify = function(params) {
		var json = JSON.stringify(params, _prettyReplacer, '\t');
		json.replace(/\\"/g,"\uFFFF"); //U+ FFFF
		json = json.replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\"");	
		json = json.replace(/\"%<%/g, "").replace(/%>%\"/g, "");
		return json;
	}
	
	var _getSelectedObject = function(checkCtxType) {
		var jQObj = $([]);
		if (ctx.selectedObject) {
			jQObj = _getObject(ctx.selectedObject, undefined, checkCtxType);
		}
		return jQObj;
	}
	
	var _buildParams = function(name) {
		var mixedParams = {};
		if (ctx.popups[name]) {
			if (ctx.popups[name]._params.template && ctx.popups[ctx.popups[name]._params.template]) {
				mixedParams = _buildParams(ctx.popups[name]._params.template);
			} 
			$.extend(true, mixedParams, ctx.popups[name]._params); 
		}
		return mixedParams;
	}

  // /**
   // * Transform a json object into html representation
   // * @return string
   // */
  // var _json2html = function (json, options) {
    // var html = '';
    // if (typeof json === 'string') {
      // /* Escape tags */
      // json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // if (_isUrl(json))
        // html += '<a href="' + json + '" class="json-string">' + json + '</a>';
      // else
        // html += '<span class="json-string">"' + json + '"</span>';
    // }
    // else if (typeof json === 'number') {
      // html += '<span class="json-literal">' + json + '</span>';
    // }
    // else if (typeof json === 'boolean') {
      // html += '<span class="json-literal">' + json + '</span>';
    // }
    // else if (json === null) {
      // html += '<span class="json-literal">null</span>';
    // }
    // else if (json instanceof Array) {
      // if (json.length > 0) {
        // html += '[<ol class="json-array">';
        // for (var i = 0; i < json.length; ++i) {
          // html += '<li>';
          // /* Add toggle button if item is collapsable */
          // if (_isCollapsable(json[i])) {
            // html += '<a href class="json-toggle"></a>';
          // }
          // html += _json2html(json[i], options);
          // /* Add comma if item is not last */
          // if (i < json.length - 1) {
            // html += ',';
          // }
          // html += '</li>';
        // }
        // html += '</ol>]';
      // }
      // else {
        // html += '[]';
      // }
    // }
    // else if (typeof json === 'object') {
      // var key_count = Object.keys(json).length;
      // if (key_count > 0) {
        // html += '{<ul class="json-dict">';
        // for (var key in json) {
          // if (json.hasOwnProperty(key)) {
            // html += '<li>';
            // var keyRepr = options.withQuotes ?
              // '<span class="json-string">"' + key + '"</span>' : key;
            // /* Add toggle button if item is collapsable */
            // if (_isCollapsable(json[key])) {
              // html += '<a href class="json-toggle">' + keyRepr + '</a>';
            // }
            // else {
              // html += keyRepr;
            // }
            // html += ': ' + _json2html(json[key], options);
            // /* Add comma if item is not last */
            // if (--key_count > 0)
              // html += ',';
            // html += '</li>';
          // }
        // }
        // html += '</ul>}';
      // }
      // else {
        // html += '{}';
      // }
    // }
    // return html;
  // }
	
	var _getByPath = function(path, root) {
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

	var self = {

		// item array
		ctxType : 'ctx',
		items : [],
		options : {
			isDebug: false
		},
		//tooltips : {},
		//tooltipPlacements : {},
		converter : null,
		root : window,
		
		showGridEnabled: false,
		selectedObject: null,
		htmlTemplates: {},
		containerIds: {},


	// /**
	// * Transform a json object into html representation
	// * @return string
	// */
	// json2html : function (json, options) {
		// return _json2html(json, options);
	// },


		
	formatFunction : function (args) {
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
			for (var i = 1; i < args.length; i++) {
				if (args[i] === e.prefix.tryCatch) {
					useTryCatch = true;
				} else {
					if (params != '') {
					  params += ', ';
					}
					if (typeof args[i] === 'string') { 
						params += ctx.serialize(args[i], true, false);
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
				code = "try { " + code + " } catch(ex) {};";
			}
		}
		return code;
	},
	
	serialize : function (data, doEscape, addPrefix, space, isShort) {
			if (isShort === undefined) { isShort = true; }
			function escape (key, val) {
			if (typeof(val)!="string") return val;
			return val      
			.replace(/[\b]/g, "\\b")
			.replace(/[\f]/g, "\\f")
			.replace(/[\n]/g, "\\n")
			.replace(/[\r]/g, "\\r")
			.replace(/[\t]/g, "\\t")
			.replace(/[\\]/g, "\\\\")
			.replace(/[\"]/g, "\\\"")
			.replace(/\\\\\\"/g, "&quot;");
			//.replace(/[\']/g, "\\\'")
			//.replace(/[\/]/g, "\\/");
			}
			var str = ''
			if ((typeof data === 'function') && (data.toString)) { 
				str = data.toString();	
			} else if (typeof data === 'number') { 
				str = String(data); 
			}	else if (typeof data === 'string') { 			
				if (data.indexOf(e.prefix.raw) == 0) {
					str = data.substring(e.prefix.raw.length); 
					str = (doEscape ? escape('', str) : str); 
				} else if (doEscape) {
					str = '"' + escape('', data) + '"'; 
				} else {
					str = data; 
				}
			} else if (typeof data === 'object') { 
				// JS Object : stringify it (add e.prefix.json as a pattern to recognize serialized objects)
				str = (addPrefix ? e.prefix.json : '') + JSON.stringify(data, (doEscape ? escape : null), space, undefined, isShort);
			}
			// suppress '"' for raw data
			str = str.replace(/\"%<%/g, "").replace(/%>%\"/g, "");
			return str;
		},

		notifyDeclaredItems : function() {
			var obj = {};
			for (var id in ctx.currentPopup._items) {
				var item = ctx.currentPopup._items[id];
				if (item) {
					obj[id] = {
						id: item.id,
						parent: item.parent,
						auto: (item.auto === false ? false : true)
					}
					var jQ = _getObject(item.id);
					if (jQ.length == 0) {
						jQ = _getObject(item.id + '_content');
						if (jQ.length) {
							obj[id].id = item.id + '_content';
						}
					}
					if (jQ.length) {
						obj[id].tag = jQ[0].tagName;
					}
					var icon = _getIcon(item);
					if (icon) obj[id].icon = icon;
					var subContainers = _getSubContainers(item);
					if (subContainers) {
						var icon = _getSubIcon(item);
						var auto = _getSubAuto(item);
						for (var subItem in subContainers) {
							obj[subItem] = {
								id: subItem,
								parent: item.id,
								auto: auto
							}
							jQ = _getObject(subItem);
							if (jQ.length) {
								obj[subItem].tag = jQ[0].tagName;
							}
							if (icon) obj[subItem].icon = icon;
						}
					}
				}
			}
			self.notify('', '_ctxStudioDeclareItems', obj, true);
			setTimeout(function(){ 
				ctx.notify('', '_ctxStudioPageReady', "", true);
			}, 200);
		},
	
		unmapValue : function(obj) {
			var isArray = $.isArray(obj);
			var newObj = (isArray ? [] : {});
			var val;
			if (obj && ('object' === typeof obj)) {
				for (var id in obj) {
					if ((id == 'ctxType') || (id == 'parent') || (id == 'typeObject') || (id == 'sampleObject') || (id == 'jQueryObject')) {
						val = obj[id];
					} else if ('function' === typeof obj[id]) {
						// skip it
						val = undefined;
					} else if (obj[id] && ('object' === typeof obj[id])) {
						val = self.unmapValue(obj[id]);
					} else if (obj[id] && ('string' === typeof obj[id])) {
						val = (_mapValues[obj[id]] !== undefined ? _mapValues[obj[id]] : obj[id]);
					} else {
						val = obj[id];
					}
					if (isArray) {
						newObj.push(val);
					} else if (val !== undefined) {
						newObj[id] = val;
					}
				}
			} else {
				newObj = (_mapValues[obj] !== undefined ? _mapValues[obj] : obj);
			}
			return newObj;
		},
		
		unmap : function(obj, map) {
			var isArray = $.isArray(obj);
			var newObj = (isArray ? [] : {});
			var val;
			if (obj && ('object' === typeof obj)) {
				for (var id in obj) {
					if ((id == 'ctxType') || (id == 'parent') || (id == 'typeObject') || (id == 'sampleObject') || (id == 'jQueryObject')) {
						val = obj[id];
					} else if ('function' === typeof obj[id]) {
						// skip it
						val = undefined;
					} else if (obj[id] && ('object' === typeof obj[id])) {
						val = self.unmap(obj[id], map);
					} else if (obj[id] && ('string' === typeof obj[id])) {
						val = (map[obj[id]] !== undefined ? map[obj[id]] : obj[id]);
					} else {
						val = obj[id];
					}
					if (isArray) {
						newObj.push(val);
					} else {
						newObj[id] = val;
					}
				}
			} else if ('string' === typeof obj) {
				newObj = (map[obj] !== undefined ? map[obj] : obj);
			} else {
				newObj = obj;
			}
			return newObj;
		},
		
		unmapKey : function(obj) {
			return self.unmap(obj, _mapKeys);
		},
		
		unmapValue : function(obj) {
			return self.unmap(obj, _mapValues);
		},
		
		unmapReverseValue : function(obj) {
			return self.unmap(obj, _mapReverseValues);
		},
		
		mapObject : function(obj) {
			if (obj && obj.ctxType) {
				for (var id in obj) {
					if (id !== 'ctxType') {
						if (obj[id] && (typeof obj[id] === 'function')) {
							obj[id] = obj[id];
						} else if (obj[id] && (typeof obj[id] === 'object')) {
							if (!obj[id].ctxType) {
								obj[id].ctxType = obj.ctxType + '.' + id;
								self.mapObject(obj[id]);
							}
						} else {
							var key = obj.ctxType + '.' + id;
							if (!_mapKeys[key]) {
								_mapValues[key] = obj[id];
								_mapReverseValues[obj[id]] = key;
								_mapKeys[key] = id;
								obj[id] =  key;
							}
							//Object.defineProperty(obj[id], 'ctxType', { value: obj.ctxType + '.' + id });					
						}
					}
				}
			}
		},
		
		/** initialize custom item
		* @method callItem
		* @param {Object} id item id
		* @param {Object} action function name
		* @param {*} [param1] function parameters
		* @param {*} [param2] function parameters
		* @param {*} [param3] function parameters
		* @param {*} [param4] function parameters
		* @return {string} result
		*/
		itemExec : function (id, action, param1, param2, param3, param4) {
			var res = '';
			var item = self.itemGet(id);
			if (item && (typeof item[action] === 'function')) {
				res = item[action].call(this, param1, param2, param3, param4);
			} else {
				// todo throw
			}
			if (res && (typeof res === 'object')) {
				res = '!json:' + JSON.stringify(res);
			}
			return res;
		},
		
		itemEdit : function (selectedId) {
			return _editItem(selectedId, true);
		},
		
		itemDrop : function (droppedItem, targetItem, action) {
			var bChange = false;
			//$( 'body' ).append( "itemDrop: " + droppedItem + " > " + targetItem + " : " + action ); // for test only
			droppedIt = ctx.currentPopup._items[droppedItem];
			targetIt = ctx.currentPopup._items[targetItem];
			if (!targetIt && (action == 'DropOn')) {
				// target can be a sub container
				for (var id in ctx.currentPopup._items) {
					var item = ctx.currentPopup._items[id];
					var subContainers = _getSubContainers(item);
					if (subContainers) {
						for (var subItem in subContainers) {
							if ((subItem === targetItem) && (droppedIt.parent != targetItem)) {
								droppedIt.parent = targetItem;
								bChange = true;
								break;
							}
						}
					}
				}
			}

			if (droppedIt && targetIt) {
				if (action == 'DropOn') {
					if (_isContainer(targetIt)) {
						// set as child item
						if (droppedIt.parent != targetItem) {
							droppedIt.parent = targetItem;
							bChange = true;
						}
					} else {
						// insert after
						action = 'DropAfter';
					}
				}
				if (action == 'DropAfter') {
					targetIt.dropAfter = droppedItem;
					droppedIt.dropped = true;
					droppedIt.parent = targetIt.parent;
					bChange = true;
				} else if (action == 'DropBefore') {
					targetIt.dropBefore = droppedItem;
					droppedIt.dropped = true;
					droppedIt.parent = targetIt.parent;
					bChange = true;
				}
			}

			if (bChange) {
				// rewrite documents
				ctx.savePageCode();
				
				setTimeout(function() { 
					// refresh whole page
					_editItem(droppedIt.id, false);
					ctx.currentPopup.open(undefined, true); 
					//alert('bRefreshPopup')
				}, 100);
			}
			return "";
		},
		
		
		getItems : function () {
			var res = ctx.currentPopup.getItems();
			if (res && (typeof res === 'object')) {
				res = '!json:' + JSON.stringify(res);
			}
			return res;
		},
		
		popupEdit : function () {
			var obj = _getPopupProperties();
			_currentEditedItem = '';
			setTimeout(function(){ 
				ctx.notify('', '_ctxStudioEdit', obj, true);
			}, 200);
		},
		
		/** initialize custom item
		* @method callItem
		* @param {Object} key item parameters
		* @param {Object} action function name
		* @param {...*} [params] function parameters
		* @return {string} result
		*/
		multipleItemExec : function (action, params) {
			var res = {};
			for (var id in params) {
				var item = self.itemGet(id);
				if (item && (typeof item[action] === 'function')) {
					res[id] = item[action].call(this, params[id]);
				} else {
					// todo throw
				}
			}
			if (res && (typeof res === 'object')) {
				res = '!json:' + JSON.stringify(res);
			}
			return res;
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
			if (typeof key === 'string') {
				id = key;
				item = ctx.currentPopup._items[id]
			} else {
				element = key;
				// search item
				for (var i in ctx.currentPopup._items) {
					if (element && (ctx.currentPopup._items[i].element == element)) {
						item = ctx.currentPopup._items[i]; // found
						break;
					}
				}
			}
			return item;
		},
		
		/** update custom item
		* @method getChild
		* @param {string|Object} item
		* @param {string|number} [childId]
		* @return {Object} child item
		*/
		getChild : function (item, childId) {
			var childItem;
			if (item && ('string' === typeof item))
				item = ctx.currentPopup._items[item];
			if (item && item.items && (childId !== undefined)) {
				// search by index
				if ('number' === typeof childId) { 
					if (item.items.length > params.childId) {
						childItem = item.items[childId];
					}
				}
				// search by id
				else if ('string' === typeof childId) {
					for (var index in item.items) {
						if (item.items[index].id == childId) {
							childItem = item.items[index];
							break;
						}
					}
				}
			}
			return childItem;
		},
		
		/** update custom item
		* @method itemUpdate
		* @param {Object} params item parameters
		* @return {Object} item
		*/
		itemUpdate : function (params, firstInit) {
			var item = null;
			params = params || {};
			if (params.id) {
				if (params.oldId && (params.id !== params.oldId)) {
					// id was renamed : delete old and create a new one was the new id
					ctx.currentPopup._items[params.id] = ctx.currentPopup._items[params.oldId];
					delete ctx.currentPopup._items[params.oldId];
					//ctx.itemRemove(params.oldId);
					//delete params.oldId;
				}
				//ctx.currentPopup._items[params.id] = ctx.currentPopup._items[params.id] || item;
				item = ctx.currentPopup._items[params.id];
			}

			if (!item) return null; // not found

			// is it a child item ?
			var childItem;
			if (undefined !== params.childId) {
				childItem = ctx.getChild(item, params.childId);
				if (!childItem) return null; // not found
			}
			if (childItem) {
				delete params.childId;
				delete params.id;
				$.extend(true, childItem, params); 
			}
			else
				$.extend(true, item, params); 

			// implement custom functions, based on item type
			if (item.typeObject && ('function' === typeof(item.typeObject.init))) {
				item.typeObject.init(item);
			} else if (item.typeObject.root && ('function' === typeof(item.typeObject.root.init))) {
				item.typeObject.root.init(item);
			}

			// implement default functions
			item.init = function(params, firstInit) {
				params = params || {};
				params.id = params.id || item.id;
				self.itemInit(params, firstInit);
				
			}
			
			if ('function' !== typeof(item.update)) {
				item.update = function(params, childId) {
					params = params || {};
					params.id = params.id || item.id;
					if (undefined !== childId) params.childId = childId;
					self.itemUpdate(params);
					
				}
			}

			if ((item.collapsable !== undefined) && ('function' !== typeof(item.collapse))) {
				item.collapse = function(collapsed, childId) {
					if (collapsed === undefined) {
						collapsed = !item.collapsed; // toggle state
					}
					item.update({ collapsed: collapsed, childId: childId });
				}
			}
			if ('function' !== typeof(item.click)) {
				item.click = function(childId) {
					var jQ = _getObject(item.id, childId);
					jQ.click();
				}
			}
			if ('function' !== typeof(item.enable)) {
				item.enable = function(enabled, childId) {
					var jQ = _getObject(item.id, childId);
					jQ.prop('disabled', (!enabled));
				}
			}
			if ('function' !== typeof(item.get)) {
				item.get = function(childId) {
					var jQ = _getObject(item.id, childId);
					var res = '';
					if (jQ[0]) {
						res = (jQ[0].value !== undefined ? jQ.val() : jQ.html());
						/*if (res && (typeof res === 'object')) {
							res = '!json:' + JSON.stringify(res);
						}*/
					}
					return res;
				}
			}
			if ('function' !== typeof(item.getParameters)) {
				item.getParameters = function() {
					//var res = '!json:' + JSON.stringify(item);
					return item;
				}
			}
			
			if ('function' !== typeof(item.highlight)) {
				item.highlight = function(childId) {
					ctx.highlight(item.id, childId);
				}
			}
			
			if ('function' !== typeof(item.set)) {
				item.set = function(val, childId) {
					var res = '';
					var jQ = _getObject(item.id, childId);
					if (jQ[0]) {
						(jQ[0].value !== undefined ? jQ.val(val) : jQ.html(val));
					}
					return res;
				}
			}		
			
			if (('function' !== typeof(item.setAll)) && item.metaObject && (item.metaObject.items !== undefined)) {
				item.setAll = function(items, labelTable) {
					var values = [];
					$.each(items, function(id, value) {
						var val = {};
						if (typeof id === 'string')
							val.id = id;
						else if (typeof value === 'string')
							val.id = value;
						else if (value && value.name)
							val.id = value.name
						else 
							val.id = item.id + '_'+ id;
						if (labelTable && (labelTable[val.id] != undefined)) {
							val.value = labelTable[val.id];
						} else {
							val.value = (value && (value.comment || value.name)) || val.id;
						} 
						values.push(val);
					});
					return item.update({ items: values });
				}
			}		
			
			if ('function' !== typeof(item.setData)) {
				item.setData = function(data) {
					params = {};
					params.id = item.id;
					params.data = data;
					self.itemUpdate(params);				
				}
			}
			
			if ('function' !== typeof(item.show)) {
				item.show = function(visible, childId) {
					var jQObj = _getObject(item.id, childId);
					var jQObjContent = _getObject(item.id + '_content', childId);
					if (visible === false) {
						item.visible = false;
						(jQObjContent.length ? jQObjContent.hide() : jQObj.hide());
					} else {
						item.visible = true;
						(jQObjContent.length ? jQObjContent.show() : jQObj.show());
					}
				}
			}

			if ($.isReady) {
				ctx.itemRefresh(item, firstInit);
			}

			return item;
		},
		
		/** initialize custom item
		* @method itemInit
		* @param {Object} params item parameters
		* @return {Object} item
		*/
		itemInit : function (params, firstInit) {
			params = params || {};
			
			// create a new item (or update an existing)
			var item = null;

			item = {
				id: "",
				type: "",
				typeObject: null,
				metaObject: null,
				modelObject: null,
				sample: null,
				sampleObject: null,
				jQueryObject: null
			};
			var sampleObject;
			if (params.sample && ('string' === typeof(params.sample))) {
				var sample = self.unmapValue(params.sample);
				sampleObject = _getByPath(sample);
				if (!sampleObject) {
					if (ctx.currentPopup && ctx.currentPopup._params && ctx.currentPopup._params.type && ctx.currentPopup._params.type.sample) {
						sampleObject = ctx.currentPopup._params.type.sample[params.sample];
					}
				}
			} else {
				sampleObject = params;
			}
			sampleObject = sampleObject || {};

			item.sampleObject = sampleObject;

			// memorize new item, copy initial values
			if (sampleObject.model) {
				if ($.isArray( sampleObject.model )) {
					var firstItem;
					for (var modelId in sampleObject.model) {
						var it = {};
						it.model = sampleObject.model[modelId];
						if (params.parent) { it.parent = params.parent; }
						if (sampleObject.model.parent) { it.model.parent = sampleObject.model.parent; }
						it = self.itemInit(it, firstInit);
						firstItem = firstItem || it;
					} 
					return firstItem;
				} else {
					$.extend(true, item, sampleObject.model); 
				}
			}
			item.sampleObject = sampleObject;

			var typeObject;
			var type = '';
			if (sampleObject.type || item.type || params.type) {
				params.type = params.type || item.type || sampleObject.type ;
				type = self.unmapValue(params.type);
				typeObject = _getByPath(type); // something like 'ctx.popup.bootstrap.item.button'
				if (!typeObject) {
					if (ctx.currentPopup && ctx.currentPopup._params && ctx.currentPopup._params.type && ctx.currentPopup._params.type.type) {
						typeObject = ctx.currentPopup._params.type.type[type];
					}
				}
			}

			//$.extend(true, item, params); 
			if (typeObject) {
				typeObject.name = type.split('.').pop();
				if (typeObject.root && typeObject.root.model) {
					$.extend(true, item, typeObject.root.model); 
				}
				if (typeObject.model) {
					$.extend(true, item, typeObject.model); 
					if (sampleObject && sampleObject.model) {
						$.extend(true, item, sampleObject.model); 
					}
				} else {
				}
				item.typeObject = typeObject;
				item.metaObject = _getMeta(item);
				item.modelObject = _getModel(item);
			}

			if (!sampleObject.model) {
				$.extend(true, item, params); 
			}

			if (item.id) {
				ctx.currentPopup._items[item.id] = item;
			}

			var model = item.model;
			if (item.model) delete item.model;
			var theItem = self.itemUpdate(item, firstInit);

			// if children, recursively build them
			if (model) {
				var it = {};
				it.model = model;
				it.model.parent = item.id;
				self.itemInit( it, firstInit);
				delete item.model;
			}

			if (theItem && theItem.model) { delete theItem.model; } 

			return theItem;
		},

		/** Remove custom item
		* @method itemRemove
		*/
		itemRemove : function (selectedId, keepObject) {
			var jQObj = $([]);
			/*if (selectedId) {
				jQObj = _getObject(selectedId);
			}*/
			if (!selectedId) { // no id provided : select current item
				jQObj = _getSelectedObject(true);
				selectedId = _getJQObjectId(jQObj);
				if (selectedId) {
					var pos = selectedId.indexOf('_content');
					if (pos > 0) selectedId = selectedId.substring(0, pos);
				}
			}
			if (selectedId) {
				var item = ctx.currentPopup._items[selectedId];
				_removeSubItems(item, keepObject);
				if (item) {
					if (!keepObject) {
						_editItem("", false);
						// save code
						ctx.savePageCode();					
					}
				}
			}
		},
		
		/** Refresh custom item
		* @method itemRefresh
		* @param {Object} item object
		* @return {Object} result
		*/
		itemRefresh : function (rawItem, firstInit) {
			var previousId = rawItem.id;							
			_replacePatterns(rawItem);
			var item = self.unmapValue(rawItem);
			if (item) {
				var jQObj;
				var strTemplate = ''
				var html = "";
				//var options = item;
				//$.extend(true, options, item.options); 
				
				if ((rawItem.id != previousId) || (rawItem.id != rawItem.oldId)) { 
					// item id was renamed, or was a pattern name
					if (previousId && ctx.currentPopup._items[previousId]) {
						delete ctx.currentPopup._items[previousId];
					}
					if (rawItem.oldId && ctx.currentPopup._items[rawItem.oldId]) {
						delete ctx.currentPopup._items[rawItem.oldId];
					}
					if (rawItem.oldId) {
						previousId = rawItem.oldId;
						delete rawItem.oldId;
					} else {
						previousId = rawItem.id;
					}
					item.id = rawItem.id;
					ctx.currentPopup._items[rawItem.id] = rawItem;  // ctx.currentPopup._items[previousId];
				};

				_updateItemValues(item);
				
				// substitute with test value for display
				var oldValue = item.value;
				var oldItems = item.items;
				var testUsed = false;
				var testTodo = false;
				if (item.typeObject && item.typeObject.template) {
					strTemplate = item.typeObject.template;
				}
				if (ctx.currentPopup._params.testMode && (item.test !== undefined) && (item.test !== null) && (item.test !== '')) {
					testTodo = true;
					if (strTemplate) {
						if (item.metaObject && (item.metaObject.value !== undefined)) {
							item.value = item.test;
							testUsed = true;
						} else if (item.metaObject && (item.metaObject.items !== undefined) && (typeof item.test === 'object')) {
							item.items = item.test;
							testUsed = true;
						}
					}
				}
				if (strTemplate && (typeof strTemplate === 'string')) {
					if (!ctx.itemTemplates[item.typeObject.name]) {
						ctx.itemTemplates[item.typeObject.name] = Handlebars.compile(strTemplate);
						Handlebars.registerPartial(item.typeObject.name, strTemplate);
					}
					var html = "";
					var template = ctx.itemTemplates[item.typeObject.name];
					try {
						html = template(item);
					} catch (ex){ 
						html = "Could not run template for item '" + item.id + "' : " + ex.message;							
					}

					var jQObjContent = (_getObject(previousId + '_content'));
					if (jQObjContent.length) {
						jQObjContent.replaceWith(html);
						jQObj = jQObjContent;
					} else {
						jQObj = (item.element ? _getObject(item.element) : _getObject(previousId));
						if (jQObj.length) {
							jQObj.replaceWith(html);
						} else {
							jQObj = _getObject(item.parent);
							if (!jQObj.length) { jQObj = $('body'); }
							jQObj.append(html);
							jQObj = _getObject(item.id);
						}
					}
				}

				if (testUsed) {
					// restore original values
					item.value = oldValue;
					item.items = oldItems;
					testTodo = false;
				}
				
				if (!(jQObj && jQObj.length)) {
					jQObj = _getObject(item.id);
				}

				if (typeof rawItem.initItem === 'function') {
					rawItem.initItem(item);
				}
				if (typeof rawItem.refresh === 'function') {
					rawItem.refresh();
				}

				if (jQObj && jQObj.length) {
					if (item.attributes && ('object' === typeof item.attributes)) {
						for (var att in item.attributes) {
							if ((att == 'class') || (att == 'myClass')) {
								jQObj.addClass( item.attributes[att] );
							} else {
								jQObj.attr( att, item.attributes[att] );
							}
						}
					}
					if (item.children) {
						jQObj.children('.ctx_child').remove();
						for (var id =0; id < item.children.length; id ++) {
							jQObj.append( item.children[id] ).addClass('ctx_child');
						}
					}
					if (item.previousSiblings && item.previousSiblings.length) {
						for (var id =0; id < item.previousSiblings.length; id ++) {
							jQObj.before( item.previousSiblings[id] );
						}
					}
					if (item.nextSiblings && item.nextSiblings.length) {
						for (var id =0; id < item.nextSiblings.length; id ++) {
							jQObj.after( item.nextSiblings[id] );
						}
					}

					// add CLICK notifications
					//var links = jQObj.find("button, a, li, .checkbox, .radio").addBack("button, a, li, .checkbox, .radio");
					
					var links;
					jQObjContent = _getObject(item.id + '_content');
					if (jQObjContent.length) {
						links = jQObjContent.find(".ctxlink").addBack(".ctxlink");
					} else {
						links = jQObj.find(".ctxlink").addBack(".ctxlink");
					}
					links.click(function(e){
						var id = e.currentTarget.id || e.currentTarget.ctxname || e.currentTarget.name;
						if (id) {
							ctx.notify(id, 'CLICK');
						}
					}); 
					
					rawItem.jQueryObject = jQObj; // memorize associated jQ object
				}

				// set tooltip 
				_updateItemTooltip(item);
				
				if (item.visible === false) {
					rawItem.show(false);
				}
				
				// display current or test value
				if (testTodo) {
					if ((typeof rawItem.setAll === 'function') && (typeof item.test === 'object')) {
						rawItem.setAll(item.test);
					} else if (typeof rawItem.set === 'function') {
						rawItem.set(item.test);
					}
				}
				

			}
			// refresh grid display
			if (ctx.showGridEnabled) ctx.showGrid(true);
			//ctx.showGridItem(item.id)
			return rawItem;
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
			var id = _getJQObjectId(focused);
			return id;
		},
		
		popups : {},
		currentPopup : null,
		itemTemplates : {},
		
		popup : function (obj) {
			if (obj && ('string' === typeof obj)) {
				var obj2 = {};
				obj2[obj] = {};
				return self.popup(obj2);
			}
			var _popup = {};
			if (!ctx.currentPopup)
				ctx.currentPopup = _popup;
			_popup.ctxType = 'ctx.popup';
			for (var name in obj) {
				ctx.popups[name] = _popup;
				_popup._name = name;
				_popup._testFunction = null;
				_popup._startFunction = null;

				//_popup._testFunctionString = "";
				//_popup._testFunctionChanged = false;
				_popup._items = {};
				//_popup._subItems = {};
				_popup._params = {
					designMode: false,
					showGrid: false,
					testMode: false
				};
				_popup._fullParams = null;
				//_popup.factory = {};
				var params =  obj[name] || {};
				params.id = name;
				params.type = params.type || ctx.popup.bootstrap;
				_popup.initItems = function(items) {
					return _popup.item(items);
				};
				_popup.addItem = function(id, options) {
					var it = null;
					options = options || {};
					if (options && (typeof options === 'object')) {
						options.id = id;
						it = _popup[id] = _popup._items[id] = self.itemInit(options);
					}
					return it;
				};
				_popup.item = function(items) {
					var it = null;
					for (var id in items) {
						var params = items[id] || {};
						if (typeof id === 'number') {
							id = params.id;
						}
						if (params && (typeof params === 'object')) {
							params.id = id;
							_popup[id] = _popup._items[id] = self.itemInit(params);
						}
					}
					return _popup;
				};
				_popup.getItems = function() {
					var res = {}
					var item;
					for (var id in _popup._items) {
						item = _popup._items[id];
						if (item && (item.auto !== false)) {
							if (typeof item.getAll === 'function') {
								res[id] = item.getAll();
							} else if (typeof item.get === 'function') {
								res[id] = item.get();
							} else if (typeof item.items !== undefined) {
								res[id] = item.items;
							} else if (typeof item.value !== undefined) {
								res[id] = item.value;
							}
						} 
					}
					return res;
				};
				_popup.handleException = function(ex) {
					if (ex && ex.stack) {
						var error = ex.stack.split("\n")[1];
						error = error.toLowerCase();
						// ex.: (file:///C:/dev/svn/Projects/SDK/trunk/samplesV3/demoUIDesigner/bin/FormKey/settings.js:17:2)\n   at _popup.showTest 
						var pos;
						var prefix = '/bin/' + _popup._name + '/';
						prefix = prefix.toLowerCase();
						pos = error.indexOf(prefix);
						if (pos > 0) {
							pos = pos + prefix.length;
							error = error.substring(pos);
							pos = error.indexOf(':');
							if (pos > 0) {
								var filename = error.substring(0, pos);
								error = error.substring(pos + 1);
								pos = error.indexOf(':');
								if (pos > 0) {
									var line = error.substring(0, pos);
									ctx.notify(line, '_ctxStudioNavigate', filename, true); // navigate to the error line
									alert("Exception raised on file : '" + filename + "' line " + line + " : "+ ex.message);
								}
							}
						}
					}
				};				
				/*_popup.setData = function(values) {
					return _popup.open({ data: values});
				};*/
				_popup.setItems = function(values) {
					for (var id in values) {
						if (_popup._items[id] && (typeof _popup._items[id].set === 'function')) {
							_popup._items[id].set(values[id]);
						}
					}
				};
				_popup.onInit = function(initFunction) {
					if (initFunction && ('function' == typeof initFunction)) {
						initFunction.apply(_popup, [_popup]);
					}
					return _popup;
				};
				_popup.showGrid = function(enabled) {
					ctx.showGrid(enabled);
					return _popup;
				};
				_popup.showTest = function(testMode) {
					if (testMode ) {
						/*for (var it in _popup._items) {
							var item = _popup._items[it];
							if ((item.test != undefined) && ('function' === typeof(item.set))) {
								item.set(item.test);
							}
						}*/
						if (typeof _popup._testFunction === 'function') {
							try {
								var items = {};
								$.extend(true, items, _popup._items); 
								_popup._testFunction.apply(_popup, [_popup]);
								_popup._items = items; // restore item values without applying test
							} catch(ex) {
								_popup.handleException(ex);
							}
						}
					}
					return _popup;
				};
				_popup.onTest = function(testFunction) {
					_popup._testFunction = testFunction;
					return _popup;
				};
				_popup.close = function() {
				};
				_popup.init = function(params) {
					params = params || {};
					$.extend(true, _popup._params, params);
					if ( _popup._params.type &&  _popup._params.type.type) {
						for (var typeName in  _popup._params.type.type) {
							var template = _popup._params.type.type[typeName].template;
							if (!ctx.itemTemplates[typeName] && template) {
								ctx.itemTemplates[typeName] = Handlebars.compile(template);
								Handlebars.registerPartial(typeName, template);
							}
						}
					}
					if (_popup._params.items) {
						_popup.initItems(_popup._params.items);
					}
					return _popup;
				};
				_popup.open = function(params, refresh) {
					params = params || {};
					_popup._fullParams = _buildParams(_popup._name);
					$.extend(true, _popup._fullParams, params); 
					if (_popup._fullParams && (typeof _popup._fullParams === 'object')) {
						if ($.isReady) {
							ctx.initialize(_popup._fullParams, refresh);
						} else {
							$(function() {
								ctx.initialize(_popup._fullParams, refresh);
							});
						}
					}
					return _popup;
				};
				_popup.wait = function(func) {
					/*if (typeof func === 'function') {
						func.apply(popup, [{}]);
					}*/
				}
				_popup.waitAll = function(func) {
				}
				_popup.init(params);
			}
			return _popup;
		},

		/** Get argument from URL
		* @method queryURL
		* @param {string} search_for parameter name
		* @return {string} result
		*/
		queryURL : function (search_for) {
			try {
				//alert(window.location.hash);
				var query = window.location.hash;
				if (!query) query = window.location.search.substring(1);
				var parms;
				if (query.indexOf('#') >= 0) {  
					parms = query.split('#');
				} else {
					parms = query.split('&');
				}
				for (var i=0; i< parms.length; i++) {
					parms[i] = parms[i].toLowerCase();
					var pos = parms[i].indexOf('=');
					if (pos > 0  && (search_for.toLowerCase() == parms[i].substring(0,pos))) {
						var parm = parms[i].substring(pos+1);
						if (parm == 'true') parm = true;
						if (parm == 'false') parm = false;
						return parm;
					}
				}
			} catch(ex) {}
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
		//initUI : function () {
		//	// function to be overloaded
		//},
		
		/** Function called to test components
		* @method testUI
		* @param {string} test test value
		*/
		//testUI : function (test) {
		//	// function to be overloaded
		//},
		
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

		close : function(id) {
			if (_autoCloseTimer)	{
				clearTimeout(_autoCloseTimer);
				_autoCloseTimer = 0;
			}
			ctx.notify(id, 'CLICK', '', false, true)
		},

		notify : function(id, event, data, noPrefix, close) {
			if ((id == "Ctx_Close") || (id == "Ctx_Notify") || (id == "Ctx_Resize")) {
				return;
			}
			var item = ctx.itemGet(id);
			close = close || false;
			//event = event || 'CLICK'
			var submit = false;
			if (item && item.close) { 
				close = true; 
				submit = true; 
			}
			if (item && item.submit) { 
				submit = true; 
			}
			if (submit && (!data)) {
				data = ctx.currentPopup.getItems();
				data.button = id;
			}
			var strData = '';
			if (data && (typeof data === 'object') && JSON && JSON.stringify)
				strData = (noPrefix ? '' : '!json:') + JSON.stringify(data);
			else if (typeof data === 'string')
				strData = data;
			
			if ('undefined' !== typeof Ctx_Notify) {
				Ctx_Event.value = event || 'CLICK';
				Ctx_Item.value = id || '';
				Ctx_Result.value = strData || id || '';
				if (close) { Ctx_Close.click(); } else { Ctx_Notify.click(); }
				Ctx_Event.value = '';
				Ctx_Item.value = '';
				Ctx_Result.value = '';
				//alert("ctx.notify 1: id=" + (id || '') + ', ev=' + (event || '') + ', data=' + strData);
			} 
			ctx.sendEvent(id, event, strData);
		},

		wait : function(func, delay) {
			if (typeof func === 'function') {
				func.apply(self, [{}]);
			}
		},

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
		},


		/*click : function(obj) {
			for (var id in obj) {
				var item = ctx.itemGet(id);
				if (item && ('function' === typeof(item.click))) {
					item.click();
				}
			}
		},

		enable : function(obj) {
			for (var id in obj) {
				var item = ctx.itemGet(id);
				var enabled = obj[id];
				if ((enabled === true) || (enabled === false)) {
					if (item && ('function' === typeof(item.enable))) {
						item.enable(enabled);
					}
				}
			}
		},

		get : function(obj) {
			var res = {};
			if (!obj) {
				res = $('form').serializeJSON();
			} else {
				for (var id in obj) {
					var item = ctx.itemGet(id);
					if (item && ('function' === typeof(item.get))) {
						res[id] = item.get();
					}
				}
			}
			if (res && (typeof res === 'object')) {
				res = '!json:' + JSON.stringify(res);
			}
			return res;
		},

		set : function(obj) {
			for (var id in obj) {
				var val = obj[id];
				var item = ctx.itemGet(id);
				if (item && ('function' === typeof(item.set))) {
					item.set(val);
				}
			}
		*/

		/*showGridItem : function(id) {
			var jEl = (_getObject(id + '_content'));
			if (jEl.length == 0) {
				jEl = _getObject(id);
			}
			if (!ctx.showGridEnabled) {
				jEl.removeClass('ctxHighlightedItem');
				$('#' + id + '_tag').remove();
			} else {
				jEl.addClass('ctxHighlightedItem');
				jEl.append('<span id="' + id + '_tag" class="ctxTag">' + id + '</span>');			
				//$('<span id="' + id + '_tag" class="ctxTag">' + id + '</span>').insertBefore(jEl);			
			}
		},*/

		showGrid : function(enabled, jQObjList) {
			ctx.showGridEnabled = (enabled !== false);
			if (!ctx.showGridEnabled) {
				//$('div[class*=container]').removeClass('ctxHighlightedContainer');
				//$('div .row').removeClass('ctxHighlightedRow');
				$(this).removeClass('ctxHighlightedCol');
				$(this).removeClass('ctxHighlightedContainer');				
				/*$("[ctxtype]").each(function( index ) {
					var id = this.id;
					if (id) {
						$('#' + id + '_tag').remove();
					}
					$(this).removeClass('ctxHighlightedItem');
				});*/
				$(".ctxTag").remove();
				$(this).removeClass('ctxHighlightedItem');
				/*for (var id in ctx.currentPopup._items) {
					ctx.showGridItem(id);
				}*/
			} else {
				//$('div[class*=container]').addClass('ctxHighlightedContainer');
				//$('div .row').addClass('ctxHighlightedRow');
				$('div[class*=container]').addClass('ctxHighlightedContainer');
				$('div[class*=row]').addClass('ctxHighlightedRow');
				$('div[class*=col-]').addClass('ctxHighlightedCol');
				if (!jQObjList) {
					jQObjList = $("[ctxtype]");
				}
				jQObjList.each(function( index ) {
					var jQObj = $(this);
					var ctxtype = jQObj.attr( "ctxtype" );
					var myClass = '';
					var myTagClass = '';
					switch (ctxtype) {
						case "ctx.popup.bootstrap.type.container":
							myTagClass = 'ctxTagContainer';
							myClass = 'ctxHighlightedContainer';
							break;
						case "ctx.popup.bootstrap.type.row":
							myTagClass = 'ctxTagRow';
							myClass = 'ctxHighlightedRow';
							break;
						case "ctx.popup.bootstrap.type.column":
							myTagClass = 'ctxTagCol';
							myClass = 'ctxHighlightedCol';
							break;
						default:
							myTagClass = 'ctxTag';
							myClass = 'ctxHighlightedItem';
							break;
					}
					var id = _getJQObjectId(jQObj);
					if (id) {
						var pos = id.indexOf('_content');
						if (pos > 0) id = id.substring(0, pos);
						if ($('#'+ id + '_tag').length == 0) {
							switch (this.tagName) {
								case 'INPUT':
								case 'SELECT':
								case 'IMG':
								case 'TEXTAREA':
									$( '<div id="' + id + '_tag" class="' + myTagClass + '">' + id + '</div>' ).insertBefore( this );
									break;
								default:
									$( '<div id="' + id + '_tag" class="' + myTagClass + '">' + id + '</div>' ).appendTo( this );
									break;
							}
						}
					}
					$(this).addClass(myClass);
				});

				// override click event
				//$(document).unbind('click');
				/*document.addEventListener('click', function(e) {
					if (e.target) ctx.selectedObject = e.target;
					e.stopPropagation();
					_editItem();
				}, true);*/
				//$('*').click(function (e) {
				//$('.ctxHighlightedItem').click(function (e) {
				$('.ctxHighlightedItem').click(function (e) {
					if (e.target) ctx.selectedObject = e.target;
					//e.stopPropagation();
					_editItem();
				});
				$('.ctxHighlightedCol').click(function (e) {
					if (e.target) ctx.selectedObject = e.target;
					//e.stopPropagation();
					_editItem();
				});
				$(document).on('contextmenu', function(e) {
					if (e && e.target) ctx.selectedObject = e.target;
				});
			}

			// update contextual menu
			ctx.showDesignMenu();
			
		},

		saveHtmlCode : function() {
			//var htmlCode = '<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n' + $('html').html() + '\n</html>';
			//ctx.notify('index.html', '_ctxStudioSave', htmlCode, true);
		},

		saveJSCode : function() {
			// *** build settings.js file ***

			// build page code
			var params = {};
			$.extend(true, params, ctx.currentPopup._params); 
			var popupId = params.id;
			delete params.id;
			delete params.type;
			delete params.parent;
			delete params.testMode;
			delete params.showGrid;
			delete params.designMode;
			var code = '// This file is regenerated by Desktop Studio : modify it carefully !\n\n';
			code += 'popup = POPUPS.' + popupId + ' = POPUPS.popup({ ';
			code += popupId  + ": ";
			code += _prettyStringify(params);
			code += "});\n\n" ;

			// build test systray
			var startCode = "";
			if (ctx.currentPopup._startFunction && ('function' === typeof (ctx.currentPopup._startFunction)) && ctx.currentPopup._startFunction.toString) {
				startCode = ctx.currentPopup._startFunction.toString();
			} else {
				// auto generate default function
				startCode = 'function (ev) {\n';
				startCode += '	if (ctx.options.isDebug) {\n';
				startCode += '		systray.addMenu("", "TestPopup", "Test popups");\n';
				startCode += '		systray.addMenu("TestPopup", "' + popupId + 'Open" , "Open ' + popupId + '", "", function(ev) {\n';
				startCode += '			POPUPS.' + popupId + '.open({ testMode: true });\n';
				startCode += '		});\n';
				startCode += '		systray.addMenu("TestPopup", "' + popupId + 'Close" , "Close ' + popupId + '", "", function(ev) {\n';
				startCode += '			POPUPS.' + popupId + '.close();\n';
				startCode += '		});\n';
				startCode += '	}\n';
				startCode += '}';
			}
			
			code += "GLOBAL.events.START.on(";
			code += startCode;
			code += ");\n\n" ;

			// build test function
			var testCode = "";
			if (ctx.currentPopup._testFunction && ('function' === typeof (ctx.currentPopup._testFunction)) && ctx.currentPopup._testFunction.toString) {
				testCode = ctx.currentPopup._testFunction.toString();
			} else{
				testCode = "function(popup) {\n	// TODO : add your tests here\n}";
			}
			code += 'POPUPS.' + popupId + '.onTest(';
			code += testCode;
			code += ");\n\n" ;

			// sort items before saving them
			var sortedItems = ctx.sortItems();
			
			// temp CPUG
			//var sortTxt = JSON.stringify(sortedItems);
			//ctx.notify('temp.txt', '_ctxStudioSave', sortTxt, true);
			//alert(sortTxt);
			
			// build item code
			var item;
			for (var id in sortedItems) {
				item = {};
				$.extend(true, item, sortedItems[id]);				
				id = item.id
				delete item.id;
				//if ((item.sample !== undefined) && !item.sample) delete item.sample;
				if (item.sample !== undefined) delete item.sample;
				if (item.ctxType !== undefined) delete item.ctxType;
				if (item.oldId !== undefined) delete item.oldId;
				if (item.typeObject !== undefined) delete item.typeObject;
				if (item.metaObject !== undefined) delete item.metaObject;
				if (item.modelObject !== undefined) delete item.modelObject;
				if (item.sampleObject !== undefined) delete item.sampleObject;
				if (item.jQueryObject !== undefined) delete item.jQueryObject;
				code += "popup.item({ ";
				code += id + ": " ;
				code += _prettyStringify(item);
				code += "});\n\n";
			}
			
			// save...
			ctx.notify('settings.js', '_ctxStudioSave', code, true);
		},

		savePageCode : function() {
			
			// rebuild settings.js
			ctx.saveJSCode();
			
			// rebuild popup.html
			ctx.saveHtmlCode();
			
			// notify declared items
			ctx.notifyDeclaredItems();
		},


		showDesignMenu : function() {
			
			if (ctx.showGridEnabled && (!_designMenuDisplayed)) {
				_designMenuDisplayed = true;
				$(function() {
					
					var items = {
						//"insertGrid": {name: "Insert grid", icon: "fa-plus"},
						//"insert": {name: "Insert item", icon: "fa-plus"},
						//"insertPattern": {name: "Insert pattern", icon: "fa-plus"},
						//"goto": {name: "Goto...", icon: "fa-send"},
						//"editPopup": {name: "Edit popup", icon: "fa-edit"},
						//"edit": {name: "Edit item", icon: "fa-edit"},
						//"declare": {name: "Declare item", icon: "fa-bookmark"}
						//"delete": {name: "Delete item", icon: "fa-remove"},
						//"save": {name: "Save", icon: "fa-save"}
					};
					//items.insertGrid = {name: "Insert grid", icon: "fa-plus"};
					//_buildMenu(items.insertGrid, e.item.sampleGrid, ctx.popup.bootstrap.sampleGrid);
					for (var id in ctx.popup.bootstrap.sample) {
						if (ctx.popup.bootstrap.sample[id] && ctx.popup.bootstrap.sample[id].display) {
							items[id] = ctx.popup.bootstrap.sample[id].display;
							_buildMenu(items[id], e.item.sample[id], ctx.popup.bootstrap.sample[id]);
						}
					}
					//items.insertPattern = {name: "Insert pattern", icon: "fa-plus"};
					//_buildMenu(items.insertPattern, e.item.pattern, ctx.popup.bootstrap.pattern);
					items.editPopup = {name: "Edit popup", icon: "fa-edit"};
					items.edit = {name: "Edit item", icon: "fa-edit"};
					items.declare = {name: "Declare item", icon: "fa-bookmark"};
					//items.button = {type: "label", name: "button", src: "../preview/button.png"};
					//items.progress = {type: "label", name: "progress bar", src: "../preview/progress.png"};

					
					$.contextMenu.types.label = function(item, opt, root) {
						// this === item.$node
						var txt = '<div class="menu_' + item.id + '">' + item.name + '</div>';
						//txt += '<span class="tooltiptext"><div>Tooltip text</div><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cd514331234507.564a1d2324e4e.gif" alt="Smiley face" height="64" width="64"/></span>';
						//if (item.src) txt += '   <img src="' + item.src + '" ></img>';
						$(txt).appendTo(this);
						var tooltip = '<div>';
						if (item.description)
							tooltip += item.description;
						if (item.src)
							tooltip += '<img width="100%" src="' + item.src + '" ></img>';
						tooltip += '</div>';
						//$('.menu_' + item.id).tooltip({title: tooltip, html: true, placement: "bottom"});
						$('.menu_' + item.id).tooltip({title: tooltip, html: true});
						/*this.addClass('labels').on('contextmenu:focus', function(e) {
							// setup some awesome stuff
						}).on('contextmenu:blur', function(e) {
							// tear down whatever you did
						}).on('keydown', function(e) {
							// some funky key handling, maybe?
						});*/
					};				

	
	
					$.contextMenu({
						selector: 'body', 
						zIndex: 100,
						events: {
						   show : function(options){
							   if (options.context && options.context.activeElement) {
								   ctx.selectedObject = options.context.activeElement;
							   }
								return true;
						   }
						},
						callback: function(key, options) {
							//var id = (ctx.selectedObject ? (ctx.selectedObject.id || ctx.selectedObject.name) : "");
							//id = id || 'body';
							//var event = "contextMenu";
							switch (key) {
								case 'goto':
								{
									// TODO
									break;
								}
								case 'delete':
								{
									ctx.itemRemove();
									break;
								}
								case 'save':
								{
									ctx.savePageCode();
									break;
								}
								case 'editPopup':
								{
									ctx.popupEdit();
									break;
								}
								case 'edit':
								{
									_editItem();
									break;
								}
								case 'declare':
								{
									var it = {};
									it.sample = e.item.sampleNone;
									var jQObj = _getSelectedObject();
									if (jQObj.length != 0) {
										it.id = _getJQObjectId(jQObj);
									}
									if (it.id) {
										// insert item
										it = ctx.itemInit(it, true);
										_editItem(it.id, true);
										
										// save document
										ctx.savePageCode();
									}
									break;
								}
								default:
								{
									// snippet generation
									if (options.commands && options.commands[key] && options.commands[key].sample) {
										var it = {};
										it.sample = options.commands[key].sample;
										var jQObj = _getSelectedObject();
										if (jQObj.length != 0) {
											it.parent = _getJQObjectId(jQObj);
										}
										// insert item
										it = ctx.itemInit(it, true);
										if (it && it.id) { _editItem(it.id, true); }
										
										// save document
										ctx.savePageCode();

									}
									break;
								}
							}
							//var strData = key;
							//ctx.notify(id, event, strData);
						},
						items: items
					});
				});		
			} else {
				
			}
		},

		highlight : function (id, childId) {
			//$( 'body' ).append( "highlight: " + id ); // for test only
			var jQ = _getObject(id + '_content', childId);
			if (jQ.length == 0) {
				jQ = _getObject(id, childId);
			}
			if (jQ.length) {
				ctx.scrollToView(jQ);
				jQ.addClass('ctxHighlighted');
				setTimeout(
					function() { jQ.removeClass('ctxHighlighted'); }, 
					2000
				);
			}
			/*var item = ctx.itemGet(id);
			if (item && ('function' === typeof(item.highlight))) {
				item.highlight();
			}*/
			return "";
		},

		scrollToView : function (el){
			try {
				var offset = el.offset().top;
				if(!el.is(":visible")) {
					el.css({"visibility":"hidden"}).show();
					var offset = el.offset().top;
					el.css({"visibility":"", "display":""});
				}

				var visible_area_start = $(window).scrollTop();
				var visible_area_end = visible_area_start + window.innerHeight;

				if(offset < visible_area_start || offset > visible_area_end){
					 // Not in view so scroll to it
					 $('html,body').animate({scrollTop: offset - window.innerHeight/3}, 1000);
					 return false;
				}
			} catch(ex) {}
			return true;
		},
		
		refreshParam : function(param) {
			if( param && ('string' === typeof(param))) {
				//$( 'body' ).append( "<div>" + param + "</div>" ); // for test only
				param = JSON.parse(param);
			}
			if ($.isReady && ctx.currentPopup && _builtPropertiesObject && ('object' === typeof(param)) && ('object' === typeof(_builtPropertiesObject))) {
				var data = {};
				var bChange = false;
				for (var id in param) {
					if (id.indexOf('pattern_') == 0) continue; // skip pattern definition
					if ((_builtPropertiesObject[id]) && (param[id])) {
						var isArray = $.isArray(param[id]);
						if (isArray) {
							var items = [];
							var newItems = param[id];
							var oldItems = _builtPropertiesObject[id];
							for (var index in newItems) {
								var item = {};
								for (var id2 in newItems[index]) {
									if (newItems[index][id2]._options) {
										for (var optionIndex in newItems[index][id2]._options) {
											if (newItems[index][id2]._options[optionIndex].value == newItems[index][id2]._value) {
												newItems[index][id2]._value = newItems[index][id2]._options[optionIndex].text;
												break;
											}
										}
									}
									item[id2] = newItems[index][id2]._value;
									if ((!data[id]) && ((!oldItems[index]) || (!oldItems[index][id2]) || (newItems[index][id2]._value !== oldItems[index][id2]._value))) {
										bChange = true;
									}
									
								}
								items.push(item);
							}
							if ((!data[id]) && (newItems.length !== oldItems.length)) {
								bChange = true;
							}
							if (param && param.id && param.id._value && ctx.currentPopup._items[param.id._value] && ctx.currentPopup._items[param.id._value][id]) {
								ctx.currentPopup._items[param.id._value][id] = []; // reset sub items
								data[id] = items;
							}
						} else {
							if (param[id]._options) {
								for (var index in param[id]._options) {
									if (param[id]._options[index].value == param[id]._value) {
										param[id]._value = param[id]._options[index].text;
										break;
									}
								}
							}
							if ((param[id]._type === "number") && ("string" === typeof param[id]._value)) {
								param[id]._value = parseInt(param[id]._value, 10); // correct property grid typing 'number' as 'string'
							}
							if (param[id]._value !== _builtPropertiesObject[id]._value) {
								bChange = true;
								data[id] = param[id]._value;
							}
						}
					}
				}
				if (bChange) {
					var bRefreshPopup = false;
					if (param.id) {
						data.id = param.id._value || "id%index%";
						data.oldId = _builtPropertiesObject.id._value;
						if (data.id != data.oldId) {
							// check new id is unique
							for (var id in ctx.currentPopup._items) {
								if (id == data.id) {
									data.id = "id%index%"; // replace with a new id
									break;
								}
							}
						}
					}
					var oldParent;
					if (param.parent) {
						data.parent = param.parent._value;
					}
					if (_builtPropertiesObject.parent) {
						oldParent = _builtPropertiesObject.parent._value;
					}
					_builtPropertiesObject = param;
					if (_builtPropertiesType == 'ctx.popup') {
						// update page
						ctx.currentPopup.init(data);
						ctx.currentPopup.open(data);
					} else {
						ctx.itemUpdate(data, true);
						if (data.parent != oldParent) {
							bRefreshPopup = true; // parent was changed 
						}
						if ((!bRefreshPopup) && ctx.currentPopup && ctx.currentPopup._items) {
							for (var it in ctx.currentPopup._items) {
								if (ctx.currentPopup._items[it] && ((ctx.currentPopup._items[it].parent == data.id) || (ctx.currentPopup._items[it].parent == data.oldId))) {
									bRefreshPopup = true;
									break;
								}
							}
						}
					}
					
					// rewrite documents
					ctx.savePageCode();
					
					if (bRefreshPopup) {
						setTimeout(function() { 
							// refresh whole page
							_editItem("", false);
							ctx.currentPopup.open(); 
							//alert('bRefreshPopup')
						}, 500);
					}
				}
			}
		},

		sortItems : function() {
			var sortedItems = [];
			// first loop with root items (no parents)
			_sortItems(ctx.currentPopup._items, sortedItems, "");
			// add orphean items
			for (var itemName in ctx.currentPopup._items) {
				var item = ctx.currentPopup._items[itemName];
				if (item.parent) { item.parent = ''; } // clear parent
				sortedItems.push(item);
				delete ctx.currentPopup._items[itemName];
				_sortItems(ctx.currentPopup._items, sortedItems, item.id);
			}
			ctx.currentPopup._items = {};
			for (var index in sortedItems) {
				var it = sortedItems[index];
				ctx.currentPopup._items[it.id] = it;
			}
			return sortedItems;
		},

		/**
		 * @method initialize
		**/
		initialize : function(params, refresh) {
			if (_initInProgress) return;
			_initInProgress = true;

			var obj = {};
			params = params || {};
			var relativePath = '..';

			if (typeof params === 'object') {
				//uncomment to display content for testing
				//var output = JSON.stringify(params, null, 2); alert(output);
				//$.extend(true, obj, params); 
				obj = self.unmapValue(params);
			}

			if (refresh) {
				for (var itemName in ctx.currentPopup._items) {
					var item = ctx.currentPopup._items[itemName];
					if (item && item.id) {
						ctx.itemRemove(item.id, true); // clear displayed items
					}
				}
			}

			if (obj.title) {
				$(document).attr("title", obj.title);
			} else if (!$(document).attr("title")) {
				$(document).attr("title", obj.id);
			}

			// set mandatory options
			if (obj.appliName) ctx.setProcessName(obj.appliName);
			if (obj.pageName) ctx.setPageName(obj.pageName);
			if (obj.eventName) ctx.setEventName(obj.eventName);

			obj.message = obj.message || "";
			if (obj.form && (typeof obj.form === 'object')) {
				// build XML structure (as a JSON object) from form descriptor
				var descObj = { form: obj.form };
				var domObj = { };
				ctx.buildMessage(descObj, domObj);
				// stringify and parse object to 'clean it up' (remove 'undefined' attributes, not supported by json2xml)
				var jsonMessage = JSON.stringify(domObj);
				var dom = JSON.parse(jsonMessage);
				obj.message += json2xml(dom);
			}

			var popupJQ;
			if (obj.autoSizeId && (obj.autoSizeId != 'body')) {
				popupJQ = $('#' + obj.autoSizeId); // default autosizeId
				if (popupJQ.length == 0) {
					var html = $('body').html();
					$('body').html('<div id="' + obj.autoSizeId + '" >' + html + '</div>');
					popupJQ = $('#' + obj.autoSizeId);
				}
			} else {
				popupJQ = $('body');
			}

			// add color class
			if (obj.color) {
				$('body').addClass(obj.color);
			}
			
			if (obj.message) {
				var containerJQ = $('#containerDiv');
				if (containerJQ.length) { $('#containerDiv').empty(); }
				popupJQ.append('<div id="containerDiv" class="container-fluid"></div>');
				containerJQ = $('#containerDiv');

				if (obj.icon) {
					if ((obj.icon.indexOf("\\") == 0) || (obj.icon.indexOf("/") == 0)) {
						obj.icon = relativePath + obj.icon;
					}
					var textSize = 12;
					var size = '';
					if (obj.iconSize) {
						if (!((obj.iconSize > 0) && (obj.iconSize <12))) {
							obj.iconSize = 2;
						}
						textSize = 12 - obj.iconSize;
					}
					if (obj.iconWidth) { 
						size = ' style="width:' + obj.iconWidth + ';height:' + obj.iconWidth + ';"';
					}
					if (obj.iconSize) {
						containerJQ.append('<div class="icon-class col-xs-' + obj.iconSize + '"><img src="' + obj.icon + '"' + size + '/></div>');			
						containerJQ.append('<div class="col-xs-' + textSize + '">' + obj.message + '</div>');			
					} else {
						containerJQ.append('<table><tr><td><div class="icon-class"><img src="' + obj.icon + '"' + size + '/></div></td><td><div class="pull-right">' + obj.message + '</div></td></tr></table>');			
					}
				}else{
					//obj.popupJQ.addClass("col-xs-12");			
					containerJQ.append(obj.message);
				}

				if (obj.buttons) {
					var footer = $('#footerDiv');
					if (footer.length == 0) {
						containerJQ.append("<div id='footerDiv' class='row modal-footer'></div>");
						footer = $('#footerDiv');
					}
					$.each(obj.buttons, function (key, options) {
						options = options || {};
						options.close = (options.close !== false); // close by default
						options.id = options.id || key; 
						options.text = options.text || options.label; 
						options.style = options.style || options.type ; 
						options.type = e.item.type.button; 
						options.parent = 'footerDiv'; 
						ctx.itemInit(options);
					});
				}
			}
			
			if ($("#Ctx_Result").length == 0) {
				$('body').append('<div style="display: none;"><textarea name="Ctx_Result" id="Ctx_Result"/></textarea><textarea name="Ctx_Event" id="Ctx_Event"></textarea><textarea name="Ctx_Item" id="Ctx_Item"></textarea><button name="Ctx_Resize" id="Ctx_Resize">Resize</button><button name="Ctx_Close" id="Ctx_Close">Close</button><button name="Ctx_Notify" id="Ctx_Notify">Notify</button></div>');
			}

			// add optional auto-close
			if (obj.autoClose) {
				autoClose = parseInt(obj.autoClose, 10); // timeout in 'ms'
				if (autoClose > 0) {
					// reinitialize auto-close timer
					if (_autoCloseTimer)	{
						clearTimeout(_autoCloseTimer);
						_autoCloseTimer = 0;
					}
					_autoCloseTimer = setTimeout(function() { ctx.close(obj.escape || ''); }, autoClose);
				}
			}

			if (obj.closeOnClick) {
				popupJQ.on("click", "", function(e) {
				  return ctx.close(obj.escape || '');
				});
			}
			
			if (obj.CSSContent) {
				$('head').append('<style>' + obj.CSSContent + '</style>')
			}
			
			if (obj.initContent) {
				eval(obj.initContent);
			}

			// build template list
			ctx.htmlTemplates = {};
			$("template").each(function( index ) {
				var jQObj = $(this);
				var id = jQObj.attr("name") || jQObj.attr("id");
				ctx.htmlTemplates[id] = true;
			});
			
			if (ctx.currentPopup && ctx.currentPopup._items) {
				// customize 'escape key' action
				if ((obj.escape) && (ctx.currentPopup._items[obj.escape])) {
					$(document).keyup(function(e) {
						 if (e.keyCode == 27) { // escape key maps to keycode `27`
							return ctx.close(obj.escape);
						}
					});			
				}

				//var sortedItems = ctx.sortItems();
				for (var itemName in ctx.currentPopup._items) {
					var item = ctx.currentPopup._items[itemName];
					if (obj.commands && obj.commands[itemName] && (obj.commands[itemName].update !== undefined) && (obj.commands[itemName].update[0] !== undefined)) {
						$.extend(true, item, obj.commands[itemName].update[0]); 						
					}
					ctx.itemRefresh(item, true);
					if (item.set && obj.commands && obj.commands[itemName] && (obj.commands[itemName].set !== undefined)) {
						item.set.apply(item, obj.commands[itemName].set);					
					}
					if (item.escape) {
						$(document).keyup(function(e) {
							 if (e.keyCode == 27) { // escape key maps to keycode `27`
								return ctx.close(item.id);
							}
						});			
					}
				}
			}
			
			//Attach function to keypress enter
			/* 		$(document).keypress(function( event ) {
				  if ( event.which == 13 ) {
					 event.preventDefault();
				  }
				//TODO
				});
			*/

			// enable rating
			try {
				$('input.rating').rating();
			} catch (ex) {}
			
			// enable tooltips
			/*try {
				for (var id in ctx.tooltips) {
					var jQObj = _getObject(selectedId);
					jQObj.tooltip({
						title: ctx.tooltips[id], 
						html: true, 
						placement: ctx.tooltipPlacements[id]
					});
				}
			} catch (ex) {}*/
			
			//$('[data-toggle="collapse"]').collapse();
			$('[data-toggle="popover"]').popover();
			$('[data-toggle="dropdown"]').dropdown();
			$('[data-ride="carousel"]').carousel();
			$('[data-toggle="tooltip"]').tooltip();
			//$('[tooltip]').tooltip();
			/*$("[tooltip]").each(function( index ) {
				var jQObj = $(this);
				var tooltip = jQObj.attr( "tooltip" );
				jQObj.tooltip({
					title: tooltip, 
				});
			});*/
			
			//focus in the first visible input
			//$('input:visible').first().focus();

			// listen to size change
			if (obj.autoSizeId) {
				popupJQ.resize(function() {
					if (Ctx_Resize) {
						// todo add delay
						Ctx_Resize.click();
					} 
				});
			}
			
			// for testing...
			if (obj.testContent) {
				eval(obj.testContent);
			}
			
			// display test mode
			if (ctx.currentPopup._params.testMode) {
				ctx.currentPopup._params.testMode = false; // prevent loop
				ctx.currentPopup.showTest(true);
				ctx.currentPopup._params.testMode = true;
			}
			
			// display grid
			if (obj.showGrid || ctx.currentPopup._params.showGrid) {
				ctx.showGrid(true);
			}

			if (obj.notifyReady) {
				ctx.notify('', 'READY', "", true);
			}
			
			if (ctx.currentPopup._params.designMode) {
				ctx.notify('', '_ctxStudioPageLoading', "", true);
				$('body').css("border", "1px solid red");
			}
			if (ctx.currentPopup._params.CX > _borderWidth)
				$('body').width(ctx.currentPopup._params.CX - _borderWidth);
			if (ctx.currentPopup._params.CY > _borderHeight)
				$('body').height(ctx.currentPopup._params.CY - _borderHeight);
			
			setTimeout(function() { _initInProgress = false; }, 500);
		},
		 
		getClass: function(obj) {
			var cls = obj.className || '';
			if (obj.width)
				cls += ' col-xs-' + obj.width;
			if (obj.offset)
				cls += ' col-xs-offset-' + obj.offset;
			return cls;
		},

		getClassDiv: function(obj) {
			var cls = '';
			try{
				if (typeof obj.width !=="undefined" && obj.width){cls += ' col-xs-' + obj.width;} 
			}catch (e){
				// No width attached to the obj, we continue
			}
			try{    
				if (obj.offset){cls += ' col-xs-offset-' + obj.offset;}
			}catch(e){
				// No offset attached to the obj, we continue		
			}
			return cls;
		},

		update: function(obj) {
			return cls;
		},

		buildMessage: function(descObj, domObj) {
			var obj;
			var dom;
			var cls;
			var isArray = false;
			// first loop on attributes
			for (var id in descObj) {
				obj = descObj[id];
				if (Object.prototype.toString.call(obj) === '[object Array]') {
					isArray = true;
				}
				cls = ctx.getClass(obj);
				clsDiv = ctx.getClassDiv(obj);
				var type;
				type = descObj[id].type || id; // if type is not mentioned, use node name as type (ex.: 'label')
				if (obj.icon) {
					if (obj.icon.indexOf('glyphicon-') == -1)
						obj.icon = 'glyphicon-' + obj.icon;
				}
				/*if (obj.tooltip) {
					ctx.tooltips[id] = obj.tooltip;
				}
				if (obj.tooltipPlacement) {
					ctx.tooltipPlacements[id] = obj.tooltipPlacement;					
				}*/
				type = type.replace('ctx.popup.bootstrap.type.', '');
				switch (type) {
					case 'form':
						dom = domObj.form = {
							'@id': obj.id || " inputForm",
							//'@method': "post",
							'@class': cls + ' bootbox-form form-horizontal',
							'@role': "form",
							'@data-toggle': "validator"
						}
						// build children
						ctx.buildMessage(obj, dom);
						break;
					case 'group':
						if (isArray) {
							domObj.div = [];
							for (var groupId in obj) {
								cls = ctx.getClass(obj[groupId]);
								dom = {
									'@class': cls + ' form-group'
								}
								// build children
								ctx.buildMessage(obj[groupId], dom);
								domObj.div.push(dom);
							}
						};
						break;
					case 'row':
						if (isArray) {
							domObj.div = {
								'@class': 'row col-xs-12',
								div: []
							};
							for (var rowId in obj) {
								cls = ctx.getClass(obj[rowId]);
								dom = {
									'@class': cls
								}
								// build children
								ctx.buildMessage(obj[rowId], dom);
								domObj.div.div.push(dom);
							}
						};
						break;
					case 'label':
						dom = domObj.label = {
							'@class': cls + ' control-label',
							'#text': obj.value
						};
						break;
					case 'text':
					case 'url':
					case 'email':
					case 'number':
					case 'password':
						domObj.div = {
							'@class': cls,
							input: {
								'@type': type,
								'@class': 'bootbox-input bootbox-input-' + type + ' form-control',
								'@id': id,
								'@control': obj.control,
								'@value': obj.value,
								'@disabled': obj.disabled,
								'@data-role': obj.role
							}
						};
						break;
					case 'textarea':
						domObj.div = {
							'@class': cls,
							textarea: {
								'@class': 'form-control',
								'@id': id,
								'@rows': obj.rows,
								'@control': obj.control,
								'#text': obj.value
							}
						};
						break;
					case 'radio':
					case 'checkbox':
						domObj.div = domObj.div || [];
						dom = {
							'@class': cls,
							div: []
						};
						for (var opt in obj.options) {
							var checked = undefined;
							var name = (type == 'checkbox' ? opt : id);
							if (obj.value == opt) {
								// single value
								checked = true;
							} else {
								// array or object value
								for (var i in obj.value) {
									if (obj.value[i] == opt) {
										checked = true;
										break;
									}
								}
							}
							dom.div.push({
								"@class": obj.className || id,
								"input": {
									"@type": type,
									"@name": name,
									"@checked": checked,
									"@value": opt
								},
								"#text": obj.options[opt]
							});
						}
						domObj.div.push(dom);
						break;
					case 'select':
						domObj.select = {
							'@class': 'form-control',
							'@id': id,
							'@control': obj.control,
							option: []
						};
						for (var opt in obj.options) {
							domObj.select.option.push({
								"@value": opt,
								"#text": obj.options[opt]
							});
						}
						break;
					case 'button':
					case 'submit':
						domObj.button = domObj.button || [];
						if (obj.style) { cls = ' btn-' + obj.style };
						//var action = "ctx.sendValues('" + id + "', " + (((type == "submit") || obj.submit) ? "true" : "false") + ", " + (obj.close ? "true" : "false") + ", 'form');";
						dom = {
							span: (obj.icon ? { '@class': 'glyphicon ' + obj.icon } : undefined),
							'@class': 'btn ' + cls,
							'@type': type,
							'@id': id,
							'@data-bb-handler': id,
							'@control': obj.control,
							'@disabled': obj.disabled,
							'@data-role': obj.role,
							//'@onClick': action,
							'#text': (obj.icon ? ' ' : '') + (obj.value || id)
						};

						domObj.button.push(dom); 
						
						break;
					default:
						// by default, copy attribute 'as is'
						if(id=="width"){
							domObj['@class'] += " col-xs-"+obj;
						}
						domObj['@'+id] = obj;
						break;
				}
			}
		}
	}

	return self;
})();



ctx.labelManager = function () {
	var _defLang = 'en'; // default language
	var _lang = 'en'; // current language
	var _tab = {}; // map of languages
	var _labels = {}; // map of labels
	var _setObject = function (obj, dest, lang) {
		for (var id in obj) {
			if (typeof obj[id] == 'object') {
				if (obj[id][lang]) {
					dest[id] = obj[id][lang];
				} else if (obj[id][_defLang]) {
					if (!dest[id]) { dest[id] = obj[id][_defLang]; }
				} else {
					if (!_tab[id]) {
						dest[id] = dest[id] || {};
						_setObject(obj[id], dest[id], lang);
					}
				}
			} else if (typeof obj[id] == 'string') {
				dest[id] = obj[id];
			}
		}
	}
    this.get = function (id, lang) {
      if (!lang) lang = _lang;
      return (_tab[lang] ? _tab[lang][id] : _tab[_defLang][id]);
    }
	this.set = function (obj) {
		for (var lang in _tab) {
			_setObject(obj, _tab[lang], lang);
		}
		this.setLanguage(_lang);
	}
	this.addLanguage = function (obj) {
		if (typeof obj === 'object') {
			for (var lang in obj) {
				var id = obj[lang];
				if (id && (!_tab[id])) {
					_tab[id] = {};
					_labels[id] = lang;
				}
			}
		}
	}
	this.setLanguage = function (lang) {
	  if (lang) { _lang = lang; }
	  if (!_tab[_lang]) { throw new Error(e.error.InvalidArgument, 'ctx.labelManager.setLanguage: unknown language \'' + lang + '\''); }
	  if (_lang && _tab[_lang]) {
		for (var id in _tab[_lang]) {
		  this[id] = this.get(id);
		}
	  }
	}
	this.addLanguage({ English: 'en', French: 'fr', German: 'de' });
};

ctx.item = function (name, options) {
	var self = {};
	return self;
}

ctx.page = function (name, options) {
	var self = {
		addItem: function(name, options) {
			var item = ctx.item(name, options);
			return item;
		}
	}
	return self;
}

ctx.systrayClass = function (name, options) {
	var self = {
		addMenu: function(parentId, id, label, iconId, func) {
			//$(document).ready(function() {
				if (typeof func === 'function') {
					func.apply(self, [{}]);
				}
			//});
		}
	}
	return self;
}

var systray = new ctx.systrayClass();

ctx.application = function (name, options) {
	var self = {
		addPopup: function(name, options) {
			options = options || {};
			var popup = ctx.popup(name);
			if (options && ('object' === typeof options)) {
				options.parent = self;
				popup.init(options);
			}
			self[name] = popup;
			return popup;
		},
		popup: function(params) {
			var popup;
			for (var name in params) {
				popup = self.addPopup(name, params[name]);
			}
			return popup;
		},
		addPage: function(name, options) {
			var page = new ctx.page(name, options);
			return page;
		}
	}
	return self;
}

ctx.addApplication = function (name, options) {
	return new ctx.application(name, options);
}

var GLOBAL = ctx.addApplication('GLOBAL');
GLOBAL.events = {
	START: {
		on: function(func) {
			if (ctx.currentPopup && typeof func === 'function') {
				ctx.currentPopup._startFunction = func;
				/*$(document).ready(function() {
					func.apply(GLOBAL, [{}]);
				})*/;
			}
		}
	}
}

var POPUPS = ctx.addApplication('POPUPS', {"nature":"POPUP"});

GLOBAL.labels = new ctx.labelManager();

// event callback definition
var OnCtxtEvent = ctx.onEvent;
var CtxtActionApp = ctx.actionApp;
var CtxtItemSelected = ctx.itemSelected;
var CtxtPopupEdit = ctx.popupEdit;
var CtxtItemEdit = ctx.itemEdit;
var CtxtDropItem = ctx.itemDrop;
var CtxtItemDelete = ctx.itemRemove;
//var CtxtRefreshParam = ctx.refreshParam;
//var CtxtEvent = ctx.sendEvent;
// function aliases
var CtxtHighlight = ctx.highlight;
var initialize = ctx.initialize;
//var update = ctx.update;
//var getValues = ctx.getValues;
var close = ctx.close;

function CtxtRefreshParam(param) {
	return ctx.refreshParam(param);
}

window.addEventListener("message", receiveMessage, false);
function receiveMessage(ev)
{
     if ('object' === typeof(ev.data)) {
		ctx.initialize(ev.data);
     }
}

