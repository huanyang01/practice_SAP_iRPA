ctx.tooltips = {};
ctx.tooltipPlacements = {};
ctx.converter = null;

var display = function(text) {
	alert(text);
}

window.addEventListener("message", receiveMessage, false);
function receiveMessage(ev)
{
     if ('object' === typeof(ev.data)) {
		 ctx.initialize(ev.data);
         //alert('It works!');
     }
}
// window.onmessage = function(e){
    // if (e.data == 'hello') {
        // alert('It works!');
    // }
// };

ctx.test = function(text) {
	alert(text);
}

/**
 * @method initialize
**/
ctx.initialize = function(params) {
	//$("#debug").hide();
	
	params = params || {};
	
	// Markdown converter
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
		}
	} 

	if (typeof params === 'object') {
		//uncomment to display content for testing
		//var output = JSON.stringify(params, null, 2); alert(output);
		var obj = {};
		for (var id in params) {
			if (id == 'header')
				obj.title = params[id]; // rename 'header' to 'title'
			else
				obj[id] = params[id];
		}
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

		// Handlebars template converter
		if (obj.message && obj.data && (typeof obj.data === 'object')) {
			try {
				var template = Handlebars.compile(obj.message);
				obj.message = template(obj.data);
			} catch (ex){
				//alert(ex.message);
			}
		} 

		// parse message content as Markdown text
		//if (obj.message) {
		//	obj.message = Markdown(obj.message);
		//}
		if (ctx.converter && ctx.converter.makeHtml) {
			if (obj.message) {
				obj.message = ctx.converter.makeHtml(obj.message);
			}
			if (obj.title) {
				obj.title = ctx.converter.makeHtml(obj.title);
			}
		}

		// set mandatory options
		obj.container = '#dialogDiv';
		$( obj.container ).empty();
		obj.closeButton = false;
		obj.backdrop = false;
		obj.animate = false;
		obj.show = false;
		ctx.setProcessName(obj.appliName);
		ctx.setPageName(obj.pageName);
		ctx.setEventName(obj.eventName);
		//obj.size = obj.size || "small";
		obj.message = obj.message || " "; // can not be empty

		if (obj.buttons) {
		    $.each(obj.buttons, function (key, button) {
		        // use key as name
	            button.name = key;
		       
				// if icon, then add it to the button
				if(button.icon){
					var tempLabel= button.label || button.value || key;
					button.label= "<span class='glyphicon glyphicon-" + button.icon+"'></span>&nbsp;"+tempLabel;							    
				}else{
					 // if no label, use key as label
					button.label = button.label || button.value || key;	
				}
				// set default class
				if (button.tooltip) {
					ctx.tooltips[key] = button.tooltip;
				}
				// set button tooltip placement
				if (button.tooltipPlacement) {ctx.tooltipPlacements[key] = button.tooltipPlacement;}

				// set default classname if no classname set for the button
		        if (!button.className){button.className = 'btn-default';}
				
				// set the classname coresponding to the button type if it exists
		        if (button.type){button.className = 'btn-' + button.type;}
				
				//TODO
		        if (button.className.indexOf('btn-') == -1){button.className = 'btn-' + button.className;}

		        // if call back undefined, set it to "close('id')"
		        if (!button.callback) { 
					var submit = ((button.type == "submit")  || button.submit);
					var close = (button.close !== false);
					button.callback = function (event) {
						return ctx.sendValues(key, submit, close);
					}
                }
		    });
		}

		// customize 'escape key' action, TODO
		if (obj.escape !== undefined)
			obj.onEscape = function () { return ctx.close(obj.escape || ''); }

		// build dialog object				
		var dialog = bootbox.dialog(obj);

		// add a row structure to the default template 
		var modalBody = dialog.find(".modal-body").addClass(' row');
		
		// add our structures to the default bootbox templates
		var body = dialog.find(".bootbox-body");
		
		// add optional icon or not
		var ourStructureForIcon = '';
		if (obj.icon) {
			if (obj.iconSize) {
				if (!((obj.iconSize > 0) && (obj.iconSize <12))) {
					obj.iconSize = 2;
				}
			}
			var textSize = 12 - obj.iconSize;
			
			var size = '';
			if (obj.iconWidth) { 
				size = ' style="width: ' + obj.iconWidth + '; height: ' + obj.iconWidth + ';"';
			}
			//if ((typeof obj.classes!=="undefined" &&typeof obj.classes["icon-class"]!=="undefined") && obj.classes["icon-class"]=="icon-class-tooltip"){
			//	ourStructureForIcon = '<div class="icon-class-tooltip col-xs-2"><img src="' + obj.icon + '"/></div>';
			//	body.addClass("col-xs-10");
			//}else{
				//ourStructureForIcon = '<div class="icon-class-tooltip col-xs-3"><img src="' + obj.icon + '"/></div>';
				//body.addClass("col-xs-9");
				if (obj.iconSize) {
					ourStructureForIcon = '<div class="icon-class col-xs-' + obj.iconSize + '"><img src="' + obj.icon + '"' + size + '/></div>';
					body.addClass("col-xs-" + textSize);
				} else {
					ourStructureForIcon = '<div class="icon-class"><img src="' + obj.icon + '"' + size + '/></div>';
				}
			//}
		}else{
			body.addClass("col-xs-12");			
		}
		
		// add our structure to the default template
		if (modalBody) {
			modalBody.prepend(ourStructureForIcon);
		}
		 
		// add optional classes to the template
		if (obj.classes) {
			for (var className in obj.classes) {
				var node = dialog.find("." + className);
				if (node) {
					node.addClass(obj.classes[className]);
				}
			}
		}

		// add color class
		if (obj.color) {
			var node = dialog.find(".modal-dialog");
			if (node) {
				node.addClass(obj.color);
			}
		}

		// add optional auto-close to the template
		if (obj.autoClose) {
			autoClose = parseInt(obj.autoClose, 10); // timeout in 'ms'
			if (autoClose > 0) {
				setTimeout(function() { ctx.close(obj.escape || ''); }, autoClose);
			}
		}

		if (obj.closeOnClick) {
			dialog.on("click", ".modal-body", function(e) {
			  return ctx.close(obj.escape || '');
			});
		}
		
		// hide shadow around dialog
		$('.modal-content').removeClass('modal-content');

		$('.modal-dialog').attr('id', 'popupDiv');

		if (obj.initContent) {
			eval(obj.initContent);
		}

		if (obj.testContent) {
			eval(obj.testContent);
		}

		// display dialog
		dialog.modal("show");
		
		//Attach function to keypress enter
/* 		$(document).keypress(function( event ) {
		  if ( event.which == 13 ) {
			 event.preventDefault();
		  }
		//TODO
		});
 */

		// enable rating
		$('input.rating').rating();
		
		// enable tooltips
		//$('[data-toggle="tooltip"]').tooltip(); 
		for (var id in ctx.tooltips) {
			$('[name="' + id + '"]').tooltip({title: ctx.tooltips[id], html: true, placement: ctx.tooltipPlacements[id] || "bottom"});
		}
		
		//focus in the first visible input
		$('input:visible').first().focus();
	 
	}
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

ctx.getJSValues = function() {
	var resObj = $('form').serializeJSON();
    return resObj;
}

ctx.getValues = function() {
	var resObj = ctx.getJSValues();
	var result = '!json:' + JSON.stringify(resObj);
    return result;
}

ctx.close = function(result) {
	// Default close funtion : set value in 'Ctx_Result' div, then click on 'Ctx_Close'
	Ctx_Result.value = result || '';
	Ctx_Close.click();
	//window.open('','_self').close();
	//window.close();
}

ctx.sendValues = function(key, submit, close) {
	var result;
	if (submit) {
		var resObj = $('form').serializeJSON();
		resObj.button = key;
		result = '!json:' + JSON.stringify(resObj);
	} else {
		result = key;
	}
	if (close) {
		// Default close funtion : set value in 'Ctx_Result' div, then click on 'Ctx_Close'
		ctx.close(result);
	} else {
		ctx.sendEvent('', result);
	}
    return true;
}


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
		var type;
		type = descObj[id].type || id; // if type is not mentioned, use node name as type (ex.: 'label')
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
						'@name': id,
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
						'@name': id,
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
                        //"label": {
                            "input": {
                                "@type": type,
								"@name": id,
                                "@checked": checked,
                                "@value": opt
                            },
                        //},
                        "#text": obj.options[opt]
                    });
                }
                domObj.div.push(dom);
                break;
            case 'select':
                domObj.select = {
                    '@class': 'form-control',
					'@name': id,
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
				var action = "ctx.sendValues('" + id + "', " + (((type == "submit") || obj.submit) ? 'true' : 'false') + ", " + (obj.close ? 'true' : 'false') + ");";
				dom = {
					span: (obj.icon ? { '@class': 'glyphicon ' + obj.icon } : undefined),
					'@class': 'btn ' + cls,
					'@type': type,
					'@name': id,
					'@data-bb-handler': id,
					'@control': obj.control,
					'@disabled': obj.disabled,
					'@data-role': obj.role,
					'@onClick': action,
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
var initialize = ctx.initialize;
var update = ctx.update;
var getValues = ctx.getValues;
var getJSValues = ctx.getJSValues;
var close = ctx.close;
