
ctx.types.table = {
	name: 'table',
	init: function (item, params) {
		var _arrayToTable = function (jQobj, item) {
			"use strict";
			var table = jQobj,
				thead,
				tbody,
				tfoot,
				rows = [],
				row,
				i,
				j,
				defaults = {
					thead: false, //should we incldue a thead element with the first row
					tfoot: false, // should we include a tfoot element with the last row
					attributes: {} // attributes for the table element, can be used to
				};

			table.empty();
			
			$.extend(true, defaults, item.options);
			table.attr(defaults.attributes);

			// loop through all the rows, we will deal with tfoot and thead later
			if (defaults && defaults.columns) {
				row = $('<tr />');
				for (var i in defaults.columns) {
					row.append($('<th />').html(defaults.columns[i]));
				}
				thead = $('<thead />').append(row);
				table.append(thead);
			}

			if (item && item.data) {
				for (var i in item.data) {
					row = $('<tr />');
					for (var j in item.data[i]) {
						if (defaults.thead) {
							row.append($('<th />').html(item.data[i][j]));
						} else {
							row.append($('<td />').html(item.data[i][j]));
						}
					}
					rows.push(row);
				}
			}

			// if we want a thead use shift to get it
			if (defaults.thead) {
				//table.remove( "thead" );
				thead = rows.shift();
				thead = $('<thead />').append(thead);
				table.append(thead);
			}

			// if we want a tfoot then pop it off for later use
			if (item.options.tfoot) {
				tfoot = rows.pop();
			}

			// add all the rows
			//table.remove( "tbody" );
			tbody = $('<tbody />');
			for (i = 0; i < rows.length; i = i + 1) {
				tbody.append(rows[i]);
			}
			table.append(tbody);

			// and finally add the footer if needed
			if (item.options.tfoot) {
				tfoot = $('<tfoot />').append(tfoot);
				table.append(tfoot);
			}

			return table;
		};
		
		item.get = function(iRow, iCol) {
			// todo
		};
		item.getAll = function() {
			// todo
		};
		item.refresh = function(init) {
			//var obj = ctx.itemRefresh(item);
			var jQobj = (item.element ? $(item.element) : $('#' + item.id));
			_arrayToTable(jQobj, item);
		};
		item.set = function(value, iRow, iCol) {
			// todo
		};
		item.setAll = function(data) {
			// todo
			if (data) item.data = data;
			item.refresh(false);
		};
		item.sort = function(index, orderBy) {
			if (item.object) {
				index = index || 0;
				orderBy = orderBy || 'asc';
				var data = item.object.order( [ index, orderBy ] ).draw();
			}
		};
		//item.refresh(true);
	}
}

ctx.types.datatable = {
	name: 'datatable',
	tag: 'table',
	attributes: {
		"class" : "display cell-border table-hover table-striped table-bordered", 
		"cellspacing" : "0", 
		"width" : "100%"
	},	
	options: {
		//info: false,
		paging: false,
		ordering: false,
		//autoWidth: false,
		//scrollY: "100px",
		//scrollCollapse: true,
		searching: false,
		initComplete: function () {
			this.api().columns().every( function () {
				var column = this;
				var select = $('<select><option value=""></option></select>')
					.appendTo( $(column.footer()).empty() )
					.on( 'change', function () {
						var val = $.fn.dataTable.util.escapeRegex(
							$(this).val()
						);
						column
							.search( val ? '^'+val+'$' : '', true, false )
							.draw();
					} );
				column.data().unique().sort().each( function ( d, j ) {
					select.append( '<option value="'+d+'">'+d+'</option>' )
				} );
			} );
		}
	},
	init: function (item) {
		item.get = function(iRow, iCol) {
			// todo
		}
		item.getAll = function() {
			// todo
		}
		item.refresh = function() {
			if (!item.object) {
				var jQobj = (item.element ? $(item.element) : $('#' + item.id));
				item.object = jQobj.DataTable( item.options );
			} else {
				// reinint data source
			    item.object.clear();
				if (item.data) { item.object.rows.add(item.data); }
			    item.object.draw();
			}
		}
		item.set = function(value, iRow, iCol) {
			// todo
		}
		item.setAll = function(data) {
			// todo
			if (data) { item.data = data; }
			item.refresh();
		}
		item.sort = function(index, orderBy) {
			if (item.object) {
				index = index || 0;
				orderBy = orderBy || 'asc';
				var data = item.object.order( [ index, orderBy ] ).draw();
			}
		}
		item.refresh();
	}
}

ctx.types.treeview = {
	name: 'treeview',
	tag: 'div',
	options: {
		showTags: true
	},
	init: function (item) {
		item.getAll = function() {
			// todo
		}
		item.refresh = function() {
			//var obj = ctx.initRefresh(item);
			//var jQobj = (item.element ? $(item.element) : $('#' + item.id));
			//jQobj.treeview( obj );
			var jQobj = (item.element ? $(item.element) : $('#' + item.id));
			jQobj.treeview( item.options );
		}
		item.setAll = function(data) {
			// todo
			if (data) item.data = data;
			item.refresh();
		}
		item.refresh();
	}
}

ctx.types.select = {
	name: 'select',
	tag: 'select',
	attributes: {
		"class": "form-control"
	},
	init: function (item) {
		if (item.options) {
			if (item.options.multiple !== undefined) {
				item.attributes.multiple = item.options.multiple;
			}
			if (item.options.label !== undefined) {
				var child = "<label for=\"" + item.id + "\">" + item.options.label + "</label>";
				item.previousSiblings = [];
				item.previousSiblings.push(child);
			}
			if (item.options.options ) {
				item.children = [];
				for (var id in item.options.options) {
					var child = "<option value=\"" + id + "\">" + item.options.options[id] + "</option>";
					item.children.push(child);
				}
			}
		}
	}
}

ctx.types.list = {
	name: 'list',
	tag: 'div',
	attributes: {
		"class": "list-group"
	},
	init: function (item) {
		if (item.items ) {
			item.children = [];
			for (var id in item.items) {
				var child = "<a class=\"list-group-item\" id=\"" + id + "\" href=\"#\">" + item.items[id].value + (item.items[id].badge ? "<span class=\"badge\">" + item.items[id].badge + "</span>": "") + "</a>";
				item.children.push(child);
			}
		}
	}
}

ctx.types.accordion = {
	name: 'accordion',
	tag: 'div',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' nav';
		if (item.style !== undefined) {
			item.attributes['class'] += ' nav-' + item.style + 's';
		}
		if (item.items ) {
			item.children = [];
			for (var id in item.items) {
				var child = "<li class=\"tab" + ( item.items[id].active ? " active in " : "") + "\"><a href=\"#" + id + "\"" + (item.style ? " data-toggle=\"" + item.style + "\"" : "") + ">" + item.items[id].value + "</a></li>";
				item.children.push(child);
			}
			var nextNode = '<div class="tab-content">';
			for (var id in item.items) {
				nextNode += "<div class=\"tab-pane fade" + ( item.items[id].active ? " active" : "") + "\" id= \"" + id  + "\">" + item.items[id].content + "</div>";
			}
			nextNode += '</div>';
			item.nextSiblings.push(nextNode);
		}
	}
}

ctx.types.nav = {
	name: 'nav',
	style: 'tab',
	tag: 'ul',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' nav';
		if (item.style !== undefined) {
			item.attributes['class'] += ' nav-' + item.style + 's';
		}
		if (item.items ) {
			item.children = [];
			for (var id in item.items) {
				var child = "<li class=\"tab" + ( item.items[id].active ? " active in " : "") + "\"><a href=\"#" + id + "\"" + (item.style ? " data-toggle=\"" + item.style + "\"" : "") + ">" + item.items[id].value + "</a></li>";
				item.children.push(child);
			}
			var nextNode = '<div class="tab-content">';
			for (var id in item.items) {
				nextNode += "<div class=\"tab-pane fade" + ( item.items[id].active ? " active" : "") + "\" id= \"" + id  + "\">" + item.items[id].content + "</div>";
			}
			nextNode += '</div>';
			item.nextSiblings.push(nextNode);
		}
	}
}

ctx.types.pagination = {
	name: 'pagination',
	tag: 'ul',
	attributes: {
		'class': 'pagination'
	},
	init: function (item) {
		if (item.options ) {
			item.children = [];
			for (var id in item.options) {
				var child = "<li><a href=\"#\" id=\"" + id + "\">" + item.options[id] + "</a></li>";
				item.children.push(child);
			}
		}
	}
}

ctx.types.button = {
	name: 'button',
	tag: 'button',
	attributes: {
		type: 'button'
	},
	options: {
		close: false,
		submit: false
	},
	init: function (item) {
		var options = item.options;
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' btn';
		if (options.style !== undefined) {
			item.attributes['class'] += ' btn-' + options.style;
		}
		if (options.type !== undefined) {
			item.attributes['class'] += ' btn-' + options.type;
		}
		if (options.width !== undefined) {
			item.attributes['class'] += ' col-xs-' + options.width;
		}
		if (options['class'] !== undefined) {
			item.attributes['class'] += ' ' + options['class'];
		}
		if (options.disabled !== undefined) {
			item.attributes.disabled = options.disabled;
		}
		//item.attributes.onclick = "ctx.sendValues('" + item.id + "', false, false);";
		if (options.icon !== undefined) {
			var child = "<span class=\"glyphicon glyphicon-" + options.icon + "\"></span>";
			item.children.push(child);
		}
		// set tooltip 
		if (options.tooltip) {
			ctx.tooltips[item.id] = options.tooltip;
			if (options.tooltipPlacement) {
				ctx.tooltipPlacements[item.id] = options.tooltipPlacement;
			}
		}
		options.value = options.value || options.label;
		if (options.value !== undefined) {
			var child = " " + options.value + " ";
			item.children.push(child);
		}
		if (options.badge !== undefined) {
			var child = "<span class=\"badge\">" + options.badge + "</span>";
			item.children.push(child);
		}
	}
}

ctx.types.label = {
	name: 'label',
	tag: 'span',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' label';
		if (item.style !== undefined) {
			item.attributes['class'] += ' label-' + item.style;
		}
		if (item.width !== undefined) {
			item.attributes['class'] += ' col-xs-' + item.width;
		}
		if (item['class'] !== undefined) {
			item.attributes['class'] += ' ' + item['class'];
		}
		if (item.disabled !== undefined) {
			item.attributes.disabled = item.disabled;
		}
		//item.attributes.onclick = "ctx.sendValues('" + item.id + "', false, false);";
		if (item.icon !== undefined) {
			var child = "<span class=\"glyphicon glyphicon-" + item.icon + "\"></span>";
			item.children.push(child);
		}
		if (item.value !== undefined) {
			var child = " " + item.value + " ";
			delete item.value;
			item.children.push(child);
		}
		if (item.badge !== undefined) {
			var child = "<span class=\"badge\">" + item.badge + "</span>";
			item.children.push(child);
		}
	}
}

ctx.types.input = {
	name: 'input',
	tag: 'input',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' form-control bootbox-input';
		item.style = item.style || 'text';
		item.attributes['class'] += ' bootbox-input-' + item.style;
		item.attributes.type = item.style;
		item.attributes.control = item.style;
		if (item.width !== undefined) {
			item.attributes['class'] += ' col-xs-' + item.width;
		}
		if (item['class'] !== undefined) {
			item.attributes['class'] += ' ' + item['class'];
		}
		if (item.disabled !== undefined) {
			item.attributes.disabled = item.disabled;
		}
		//item.attributes.onclick = "ctx.sendValues('" + item.id + "', false, false);";
		if (item.icon !== undefined) {
			var child = "<span class=\"glyphicon glyphicon-" + item.icon + "\"></span>";
			item.children.push(child);
		}
		/*if (item.value !== undefined) {
			var child = " " + item.value + " ";
			delete item.value;
			item.children.push(child);
		}*/
		if (item.badge !== undefined) {
			var child = "<span class=\"badge\">" + item.badge + "</span>";
			item.children.push(child);
		}
	}
}

ctx.types.img = {
	name: 'img',
	tag: 'img',
	attributes: {
	},
	init: function (item) {
		var options = item.options;
	}
}

ctx.types.textarea = {
	name: 'textarea',
	tag: 'textarea',
	attributes: {
	},
	init: function (item) {
		item.attributes['class'] = item.attributes['class'] || '';
		item.attributes['class'] += ' form-control';
		if (item.rows !== undefined) {
			item.attributes.rows = item.rows;
		}
		if (item.disabled !== undefined) {
			item.attributes.disabled = item.disabled;
		}
		if (item.value !== undefined) {
			var child = " " + item.value + " ";
			delete item.value;
			item.children.push(child);
		}
	}
}

