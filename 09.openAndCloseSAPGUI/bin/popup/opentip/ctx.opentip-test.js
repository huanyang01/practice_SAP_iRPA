

var ctx = (function () {
	var self = {
		ctxType : 'ctx',
		map : [],
		converter : null,
		params : {}
	};
	return self;
})();

ctx.options = {}

/** Options for the 'ctx.page.tooltips' library
* @path ctx.options.tooltips
* @class ctx.options.tooltips
* @struct
*/
ctx.options.tooltips = {
	/** Trace level (see [[lib:common:ctx.enum#etracelevel|e.trace.level]])
	* @property {e.trace.level} traceLevel
	* @path ctx.options.popup.traceLevel */ traceLevel: e.trace.level.None,
	/** Tooltip animation (see [[lib:common:ctx.enum#etooltipanimation|e.tooltip.animation]])
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
	/** Tooltip theme (see [[lib:common:ctx.enum#etooltiptheme|e.tooltip.theme]])
	* @property {e.tooltip.theme} theme
	* @path ctx.options.tooltips.theme */ theme: e.tooltip.theme.grey,
	/** Tooltip z-index
	* @property {number} zIndex
	* @path ctx.options.tooltips.zIndex */ zIndex: 10000
};

ctx.tooltipInit = function (obj) {
	ctx.params = {};
	obj = obj || {};
	for (var id in ctx.options.tooltips) {
		ctx.params[id] = ctx.options.tooltips[id];
	}
	for (var id in obj) {
		ctx.params[id] = obj[id];
	}

	$(document).ready(function() {
		// replace Markdown sections
	});
	
}

ctx.tooltip = function(obj) {
	var _tooltip = {
		options: {},
		local : {
			id: '', 
			helpId: '',
			targetId: '',
			parentId: '', 
			data: null,
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
			library: e.tooltip.library.tooltipster,
			noConflict: true,
			file: ''
		}
	}
	if (obj && ("object" === typeof obj)) {
		for (var ttId in obj) {
			_tooltip.local.id = ttId;
			var options = obj[ttId] || {};
			var ttOptions = {};
			var value;
			for (var id in ctx.params) {
				ttOptions[id] = ctx.params[id];
			}
			for (var id in options) {
				ttOptions[id] = options[id];
			}
			for (var id in ttOptions) {
				value = ttOptions[id];
				if (id == 'item') {
					_tooltip.local.adjacentItem = value;			
				} else if (_tooltip.local[id] !== undefined) {
					_tooltip.local[id] = value;			
				} else {
					_tooltip.options[id] = value;
				}
			}
			_tooltip.local.helpId = _tooltip.local.helpId || ttId;
			_tooltip.local.targetId = _tooltip.local.targetId || ttId + "Target";
			_tooltip.options.target = "#" + _tooltip.local.targetId
			_tooltip.local.content = _tooltip.local.content || "";

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
//							if (tooltip.options.fixed === undefined) {
//								tooltip.options.fixed = true;
//							}							
//							if (tooltip.options.target === undefined) {
//								tooltip.options.target = true
//							}							
			if (_tooltip.local.look) {
				_tooltip.options.style = _tooltip.local.look;
			}		

			
			$(document).ready(function() {
				ctxTooltip.createTarget(_tooltip.local, "ctxTest");
				ctxTooltip.prepareContent(_tooltip.local, _tooltip.options);
				ctxTooltip.create(_tooltip.local, _tooltip.options);
			});
		}
	}
};

ctxTooltip.createTarget = function(local, parentId) {
	var jQ = jQuery('#' + local.targetId);
	var objectId;
	if (local.icon) {
		objectId = local.targetId + "Root";
	} else {
		objectId = local.targetId;
	}
	if (jQ.length == 0) {
		$('#' + parentId).append('<b><span id="' + objectId + '" >' + local.id + '</span></b><br/><br/>');
	}
	if (local.icon) {
		var img = '<img id="' + local.targetId + '" src="../' + local.icon + '" class="ctx_img' + (local['class'] ?  " " + local['class'] : "") + '" style= "padding:0px 10px;' + (local.style ?  local.style + ";" : "") + '" onClick="try { ctxTooltip.send(\'evTooltipOpen\', \'\', \'' + local.helpId + '\'); } catch(ex) {}"></img>';
		$('#' + objectId).append(img);
	}
}

ctxTooltip.prepareContent = function(local, options) {
	var jQ = $( '#' + local.helpId );
	jQ.find('.markdown').each(function( index ) {
		if (!ctx.converter) {
			try {
				var options = {
					strikethrough: true,
					tablesHeaderId: true,
					tables: true,
					tasklists: true,
					//extensions: ['icon', 'classify', 'mathjax']
					extensions: ['icon', 'classify']
				}
				ctx.converter = new showdown.Converter(options);
			} catch (ex){
				//alert(ex.message);
				return false; // showdown can't be instanciated
			}
		} 
		var text = ctx.converter.makeHtml($( this ).html()) ;
		$( this ).html(text) ;
		//$( this ).removeAttr('markdown');
		$( this ).removeClass('markdown');
	});

	jQ.find('[template]').each(function( index ) {
		var template = $( this ).attr( "template" );
		if (template) {
			var htmlString = $( "#" + template ).html();
			if (htmlString) {
				$( this ).replaceWith( htmlString );
			}
		}
	});
	
	// Handlebars template converter
	if (local.data && (typeof local.data === 'object')) {
		try {
			var html = jQ.html();
			var template = Handlebars.compile(html);
			html = template(local.data);
			jQ.html(html);
		} catch (ex){
			//alert(ex.message);
		}
	} 

	
}

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

