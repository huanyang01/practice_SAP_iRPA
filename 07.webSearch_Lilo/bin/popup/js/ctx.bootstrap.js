ctx.tooltips = {};
ctx.tooltipPlacements = {};
ctx.converter = null;
ctx.autoCloseTimer = 0;

var display = function(text) {
	alert(text);
}

window.addEventListener("message", receiveMessage, false);
function receiveMessage(ev)
{
     if ('object' === typeof(ev.data)) {
		 initialize(ev.data);
         //alert('It works!');
     }
}
// window.onmessage = function(e){
    // if (e.data == 'hello') {
        // alert('It works!');
    // }
// };

ctx.getObject = function(id) {
	var jQObj;
	if (id && ('string' === typeof(id))) {
		jQObj = $("#" + id );
		if (!jQObj.length) {
			jQObj = $("[ctx_name=" + id + "]");
		}
		if (!jQObj.length) {
			jQObj = $("[name=" + id + "]");
		}
	} else if ('object' === typeof(id)) {
		jQObj = $(id);
	}
	return jQObj;
}

ctx.click = function(obj) {
	for (var id in obj) {
		var val = obj[id];
		var item = ctx.itemGet(id);
		if (item && ('function' === typeof(item.click))) {
			item.click();
		} else {
			var jQ = ctx.getObject();
			jQ.click();
		}
	}
}

ctx.enable = function(obj) {
	for (var id in obj) {
		var item = ctx.itemGet(id);
		var enabled = obj[id];
		if ((enabled === true) || (enabled === false)) {
			if (item && ('function' === typeof(item.enable))) {
				item.enable(enabled);
			} else {
				var jQ = ctx.getObject(id);
				jQ.prop('disabled', (!enabled));
			}
		}
	}
}

ctx.get = function(obj) {
	var res = {};
	for (var id in obj) {
		var item = ctx.itemGet(id);
		if (item && ('function' === typeof(item.getAll))) {
			res[id] = item.getAll();
		} else if (item && ('function' === typeof(item.get))) {
			res[id] = item.get();
		} else {
			var jQ = ctx.getObject(id);
			if (jQ[0]) {
				res[id] = (jQ[0].value !== undefined ? jQ.val() : jQ.html());
			} else if (obj[id]) {
				res[id] = obj[id];
			}
		}
	}
	var formObj = $('form').serializeJSON();
	for (var index in formObj) {
		res[index] = formObj[index];
	}
	var sRes = '!json:' + JSON.stringify(res);
	return sRes;
}

ctx.set = function(obj) {
	for (var id in obj) {
		var val = obj[id];
		var item = ctx.itemGet(id);
		if (item && ('function' === typeof(item.setAll))) {
			item.setAll(val);
		} else if (item && ('function' === typeof(item.set))) {
			item.set(val);
		} else {
			var jQ = ctx.getObject(id);
			if (jQ[0]) {
				(jQ[0].value !== undefined ? jQ.val(val) : jQ.html(val));
			}
		}
	}
}

/** Highlight an object to identify it
* @method highlight
* @param {string} el object identifier (id, name, class)
* @param {*} data : optional data (text buffer)
*/
ctx.highlight = function (el) {
    if (el && (el.id || el.name || el.ctx_data)) {
		var jEl = (el.id ? $("#" + el.id) : $("[name=" + el.name + "], [ctx_data=" + el.name + "]"));
		ctx.scrollToView(jEl);
		jEl.addClass('highlighted');
		setTimeout(
			function() { jEl.removeClass('highlighted'); }, 
			2000
		);
	}
	return "";
}

ctx.scrollToView = function (el){
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
}

/**
 * @method initialize
**/
ctx.initialize = function(params) {
	//$("#debug").hide();
	
	var obj = {};
	params = params || {};

	if (typeof params === 'object') {
		//uncomment to display content for testing
		//var output = JSON.stringify(params, null, 2); alert(output);
		for (var id in params) {
			if (id == 'header')
				obj.title = params[id]; // rename 'header' to 'title'
			else
				obj[id] = params[id];
		}
	}
	obj.popupId = 'popupDiv';
	obj.containerId = obj.containerId || 'containerDiv';
	obj.contentId = 'dialogDiv';
	obj.content = '#' + obj.contentId;

	obj.message = obj.message || "";
	if (obj.form && (typeof obj.form === 'object')) {
		if (typeof obj.message === 'undefined') { obj.message = ''; }
		// build XML structure (as a JSON object) from form descriptor
		var descObj = { form: obj.form };
		var domObj = { };
		ctx.buildMessage(descObj, domObj);
		// stringify and parse object to 'clean it up' (remove 'undefined' attributes, not supported by json2xml)
		var jsonMessage = JSON.stringify(domObj);
		var dom = JSON.parse(jsonMessage);
		obj.message += json2xml(dom);
	}

	var body;
	if (obj.message) {
		$( '#' + obj.popupId ).empty();
		$( '#' + obj.popupId ).append('<div id="' + obj.containerId + '" class="container-fluid"></div>');
		// add our structures to the default bootbox templates
		//$( '#' + obj.containerId ).append('<div id="' + obj.contentId + '" class="row"></div>');
		$( '#' + obj.containerId ).append('<div id="' + obj.contentId + '"></div>');
		body = $( '#' + obj.contentId );
	}

	// add color class
	if (obj.color) {
		$('#' + obj.containerId).addClass(obj.color);
	}
	
	// set mandatory options
	//obj.closeButton = false;
	//obj.backdrop = false;
	//obj.animate = false;
	//obj.show = false;
	if (obj.appliName) ctx.setProcessName(obj.appliName);
	if (obj.pageName) ctx.setPageName(obj.pageName);
	if (obj.eventName) ctx.setEventName(obj.eventName);
	//obj.size = obj.size || "small";

	
	// add optional icon or not
	//var ourStructureForIcon = '';
	if (body) {
		if (obj.icon) {
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
			//if ((typeof obj.classes!=="undefined" &&typeof obj.classes["icon-class"]!=="undefined") && obj.classes["icon-class"]=="icon-class-tooltip"){
			//	ourStructureForIcon = '<div class="icon-class-tooltip col-xs-2"><img src="' + obj.icon + '"/></div>';
			//	body.addClass("col-xs-10");
			//}else{
				//ourStructureForIcon = '<div class="icon-class-tooltip col-xs-3"><img src="' + obj.icon + '"/></div>';
				//body.addClass("col-xs-9");
				if (obj.iconSize) {
					body.append('<div class="icon-class col-xs-' + obj.iconSize + '"><img src="' + obj.icon + '"' + size + '/></div>');			
					body.append('<div class="col-xs-' + textSize + '">' + obj.message + '</div>');			
				} else {
					body.append('<table><tr><td><div class="icon-class"><img src="' + obj.icon + '"' + size + '/></div></td><td><div class="pull-right">' + obj.message + '</div></td></tr></table>');			
				}
			//}
		}else{
			//body.addClass("col-xs-12");			
			body.append(obj.message);
		}
	}
	
	if (obj.buttons) {
		// customize 'escape key' action
		if (obj.escape && obj.buttons[obj.escape]) {
			$(document).keyup(function(e) {
				 if (e.keyCode == 27) { // escape key maps to keycode `27`
					return ctx.close(obj.escape);
				}
			});			
		}

		var footer = $('#footerDiv');
		if (footer.length == 0) {
			$('#' + obj.containerId).append("<div id='footerDiv' class='row modal-footer'></div>");
			footer = $('#footerDiv');
		}
		$.each(obj.buttons, function (key, options) {
			options = options || {};
			options.close = (options.close !== false); // close by default
			var item = {
				id: key,
				type: 'button',
				options: options
			}
			if (options.escape) {
				$(document).keyup(function(e) {
					 if (e.keyCode == 27) { 
						return ctx.close(key);
					}
				});			
			}
			/*// use key as name
			options.name = key;
		   
			// if icon, then add it to the button
			if(options.icon){
				var tempLabel= options.label || options.value || key;
				options.label= "<span class='glyphicon glyphicon-" + options.icon+"'></span>&nbsp;"+tempLabel;							    
			}else{
				 // if no label, use key as label
				options.label = options.label || options.value || key;	
			}
			// set tooltip 
			if (options.tooltip) {
				ctx.tooltips[key] = options.tooltip;
			}
			if (options.tooltipPlacement) {ctx.tooltipPlacements[key] = options.tooltipPlacement;}

			// set default classname if no classname set for the options
			if (!options.className){options.className = 'btn-default';}
			
			// set the classname coresponding to the options type if it exists
			if (options.type){options.className = 'btn-' + options.type;}
			
			//TODO
			if (options.className.indexOf('btn-') == -1){options.className = 'btn-' + options.className;}

			// if call back undefined, set it to "close('id')"
			var onClickText = '';
			var submit = ((options.type == "submit")  || options.submit || false);
			var close = (options.close !== false);*/
			/*if (!options.callback) { 
				onClickText = "onclick='ctx.sendValues(\"" + key + "\", " + submit + ", " + close + ");'";
			}*/
			//var txt = "<button id='" + key + "' type='button' class='btn " + options.className + "' " + onClickText + ">" + options.label + "</button>";
			var txt = "<button id='" + key +  "'></button>";
			footer.append(txt);
			ctx.itemInit(item);
		});
	}

	// add optional auto-close to the template
	if (obj.autoClose) {
		autoClose = parseInt(obj.autoClose, 10); // timeout in 'ms'
		if (autoClose > 0) {
			// reinitialize auto-close timer
			if (ctx.autoCloseTimer)	{
				clearTimeout(ctx.autoCloseTimer);
				ctx.autoCloseTimer = 0;
			}
			ctx.autoCloseTimer = setTimeout(function() { ctx.close(obj.escape || ''); }, autoClose);
		}
	}

	if (obj.closeOnClick) {
		$('#' + obj.containerId).on("click", "", function(e) {
		  return ctx.close(obj.escape || '');
		});
	}
	
	// hide shadow around dialog
	//$('.modal-content').removeClass('modal-content');

	//$('.modal-dialog').attr('id', 'popupDiv');

	if (obj.CSSContent) {
		$('head').append('<style>' + obj.CSSContent + '</style>')
	}

	
	if (obj.initContent) {
		eval(obj.initContent);
	}

	// replace Markdown sections
	//$('#' + obj.containerId).find( "div[markdown='1']" ).each(function( index ) {
	$('.markdown').each(function( index ) {
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

	// Handlebars template converter
	if (obj.data && (typeof obj.data === 'object')) {
		try {
			var text = $('#' + obj.containerId).html();
			var template = Handlebars.compile(text);
			text = template(obj.data);
			$('#' + obj.containerId).html(text);
		} catch (ex){
			//alert(ex.message);
		}
	} 

	if (obj.testContent) {
		eval(obj.testContent);
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
	//$('[data-toggle="tooltip"]').tooltip(); 
	try {
		for (var id in ctx.tooltips) {
			var jQObj = $("#" + id );
			if (!jQObj.length) {
				jQObj = $("[ctx_name=" + id + "]");
			}
			if (!jQObj.length) {
				jQObj = $("[name=" + id + "]");
			}
			jQObj.tooltip({
				title: ctx.tooltips[id], 
				html: true, 
				placement: ctx.tooltipPlacements[id] || "top"
			});
		}
	} catch (ex) {}
	
	$('[data-toggle="popover"]').popover();
	$('body .dropdown-toggle').dropdown(); 

	$("button, a, li").click(function(e){
	  var id = e.currentTarget.id || e.currentTarget.ctx_name || e.currentTarget.name;
	  if (id && (id != "Ctx_Close") && (id != "Ctx_Notify")) {
		  ctx.notify(id, 'CLICK');
	  }
	}); 

	//focus in the first visible input
	$('input:visible').first().focus();
}

ctx.getClass = function(obj) {
    var cls = obj.className || '';
    if (obj.width)
        cls += ' col-xs-' + obj.width;
    if (obj.offset)
        cls += ' col-xs-offset-' + obj.offset;
    return cls;
}


ctx.getClassDiv = function(obj) {
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
}

ctx.update = function(obj) {
    return cls;
}

/*ctx.getValues = function() {
	var resObj = $('form').serializeJSON();
	var result = '!json:' + JSON.stringify(resObj);
    return result;
}*/


ctx.buildMessage = function(descObj, domObj) {
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
		obj.id = obj.id || id;
		if (obj.id && obj.type) ctx.items.push(obj);
		var type;
		type = obj.type || id; // if type is not mentioned, use node name as type (ex.: 'label')
		if (obj.icon) {
			if (obj.icon.indexOf('glyphicon-') == -1)
				obj.icon = 'glyphicon-' + obj.icon;
		}
		if (obj.tooltip) {
			ctx.tooltips[id] = obj.tooltip;
		}
		if (obj.tooltipPlacement) {
			ctx.tooltipPlacements[id] = obj.tooltipPlacement;					
		}
		type = obj.type = type.replace('ctx.popup.bootstrap.type.', '');
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
                    //var name = id;
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
                        "@class": (obj.className || '') + ' ' + type,
						"input": {
							"@type": type,
							"@name": name,
							"@id": opt,
							"@checked": checked,
							"@value": opt
						},
                        "label": {
							"@for": opt,
							"#text": obj.options[opt]
						}
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

// function aliases
var CtxtHighlight = ctx.highlight;
var initialize = ctx.initialize;
//var update = ctx.update;
//var getValues = ctx.getValues;
var close = ctx.close;

